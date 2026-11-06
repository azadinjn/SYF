<?php

class RateLimitService
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    /**
     * Generate a private key for the action and identifier.
     */
    private function generateKeyHash(string $identifier): string
    {
        return hash("sha256", $identifier);
    }

    /**
     * Validate rate limit parameters.
     */
    private function validateParameters(
        string $action,
        string $identifier,
        int $maxAttempts,
        int $windowSeconds
    ): void {

        if (
            !preg_match('/^[a-z_]{1,30}$/', $action) ||
            trim($identifier) === "" ||
            $maxAttempts < 1 ||
            $windowSeconds < 1
        ) {
            throw new InvalidArgumentException(
                "Invalid rate limit parameters."
            );
        }
    }

    /**
     * Check whether an identifier is blocked.
     */
    public function checkLimit(
        string $action,
        string $identifier,
        int $maxAttempts,
        int $windowSeconds
    ): array {

        $this->validateParameters(
            $action,
            $identifier,
            $maxAttempts,
            $windowSeconds
        );

        $keyHash = $this->generateKeyHash($identifier);

        $sql = "SELECT attempts, window_started_at, blocked_until
                FROM rate_limits
                WHERE action = :action
                AND key_hash = :key_hash";

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            ":action" => $action,
            ":key_hash" => $keyHash
        ]);

        $record = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$record) {
            return [
                "blocked" => false,
                "retryAfter" => 0
            ];
        }

        $now = new DateTimeImmutable(
            "now",
            new DateTimeZone("UTC")
        );

        $blockedUntil = null;

        if (!empty($record["blocked_until"])) {
            $blockedUntil = new DateTimeImmutable(
                $record["blocked_until"],
                new DateTimeZone("UTC")
            );
        }

        // Check active blocking before checking the window expiration.
        if ($blockedUntil !== null && $blockedUntil > $now) {
            return [
                "blocked" => true,
                "retryAfter" => max(
                    1,
                    $blockedUntil->getTimestamp() - $now->getTimestamp()
                )
            ];
        }

        $windowStartedAt = new DateTimeImmutable(
            $record["window_started_at"],
            new DateTimeZone("UTC")
        );

        $windowExpired =
            ($now->getTimestamp() - $windowStartedAt->getTimestamp())
            >= $windowSeconds;

        // Reset when the window or blocking period has expired.
        if (
            $windowExpired ||
            ($blockedUntil !== null && $blockedUntil <= $now)
        ) {

            $resetSql = "UPDATE rate_limits
                         SET attempts = 0,
                             window_started_at = UTC_TIMESTAMP(),
                             blocked_until = NULL
                         WHERE action = :action
                         AND key_hash = :key_hash";

            $resetStmt = $this->db->prepare($resetSql);

            $resetStmt->execute([
                ":action" => $action,
                ":key_hash" => $keyHash
            ]);

            return [
                "blocked" => false,
                "retryAfter" => 0
            ];
        }

        return [
            "blocked" => false,
            "retryAfter" => 0
        ];
    }

    /**
     * Record one failed attempt.
     */
    public function recordFailure(
        string $action,
        string $identifier,
        int $maxAttempts,
        int $windowSeconds
    ): int {

        $this->validateParameters(
            $action,
            $identifier,
            $maxAttempts,
            $windowSeconds
        );

        $keyHash = $this->generateKeyHash($identifier);

        $now = new DateTimeImmutable(
            "now",
            new DateTimeZone("UTC")
        );

        $this->db->beginTransaction();

        try {

            // Create the record if it does not exist.
            $insertSql = "INSERT IGNORE INTO rate_limits
                          (action, key_hash, attempts, window_started_at)
                          VALUES (
                              :action,
                              :key_hash,
                              0,
                              :window_started_at
                          )";

            $insertStmt = $this->db->prepare($insertSql);

            $insertStmt->execute([
                ":action" => $action,
                ":key_hash" => $keyHash,
                ":window_started_at" => $now->format("Y-m-d H:i:s")
            ]);

            // Lock the record to prevent simultaneous updates.
            $selectSql = "SELECT attempts, window_started_at, blocked_until
                          FROM rate_limits
                          WHERE action = :action
                          AND key_hash = :key_hash
                          FOR UPDATE";

            $selectStmt = $this->db->prepare($selectSql);

            $selectStmt->execute([
                ":action" => $action,
                ":key_hash" => $keyHash
            ]);

            $record = $selectStmt->fetch(PDO::FETCH_ASSOC);

            if (!$record) {
                throw new RuntimeException(
                    "Rate limit record not found."
                );
            }

            $blockedUntil = null;

            if (!empty($record["blocked_until"])) {
                $blockedUntil = new DateTimeImmutable(
                    $record["blocked_until"],
                    new DateTimeZone("UTC")
                );
            }

            // Do not count attempts while the identifier is blocked.
            if ($blockedUntil !== null && $blockedUntil > $now) {

                $this->db->commit();

                return (int) $record["attempts"];
            }

            $windowStartedAt = new DateTimeImmutable(
                $record["window_started_at"],
                new DateTimeZone("UTC")
            );

            $windowExpired =
                ($now->getTimestamp() - $windowStartedAt->getTimestamp())
                >= $windowSeconds;

            // Start a new window if the previous one expired.
            $resetWindow =
                $windowExpired ||
                ($blockedUntil !== null && $blockedUntil <= $now);

            $attempts = $resetWindow
                ? 0
                : (int) $record["attempts"];

            $attempts++;

            $newBlockedUntil = null;

            if ($attempts >= $maxAttempts) {
                $newBlockedUntil = $now
                    ->modify("+" . $windowSeconds . " seconds")
                    ->format("Y-m-d H:i:s");
            }

            $updateSql = "UPDATE rate_limits
                          SET attempts = :attempts,
                              window_started_at = :window_started_at,
                              blocked_until = :blocked_until
                          WHERE action = :action
                          AND key_hash = :key_hash";

            $updateStmt = $this->db->prepare($updateSql);

            $updateStmt->execute([
                ":attempts" => $attempts,
                ":window_started_at" => $resetWindow
                    ? $now->format("Y-m-d H:i:s")
                    : $record["window_started_at"],
                ":blocked_until" => $newBlockedUntil,
                ":action" => $action,
                ":key_hash" => $keyHash
            ]);

            $this->db->commit();

            return $attempts;

        } catch (Throwable $e) {

            if ($this->db->inTransaction()) {
                $this->db->rollBack();
            }

            throw $e;
        }
    }

    /**
     * Clear failed attempts after successful password verification.
     */
    public function clearLimit(
        string $action,
        string $identifier
    ): void {

        $this->validateParameters(
            $action,
            $identifier,
            1,
            1
        );

        $keyHash = $this->generateKeyHash($identifier);

        $sql = "DELETE FROM rate_limits
                WHERE action = :action
                AND key_hash = :key_hash";

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            ":action" => $action,
            ":key_hash" => $keyHash
        ]);
    }
}
