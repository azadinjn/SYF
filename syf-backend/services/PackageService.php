
<?php

require_once __DIR__ . "/../models/Package.php";
require_once __DIR__ . "/../models/File.php";
require_once __DIR__ . "/FileService.php";
require_once __DIR__ . "/RateLimitService.php";

class PackageService {

    private $db;
    private $packageModel;
    private $fileModel;
    private $fileService;
    private $rateLimitService;

    private $allowedExpirationHours = [24, 48, 72, 168];

    private $shareCodeCharacters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    // ______________________________________________

    public function __construct(PDO $db) {

        $this->db = $db;

        $this->packageModel = new Package($db);
        $this->fileModel = new File($db);
        $this->fileService = new FileService();
        $this->rateLimitService = new RateLimitService($db);
    }

    // ______________________________________________

    private function validatePackageSettings($settings) {

        if (!is_array($settings)) {
            throw new InvalidArgumentException(
                "Invalid package settings."
            );
        }

        // 1. Validate package name

        $packageName = $settings["packageName"] ?? "";

        if (!is_string($packageName)) {
            throw new InvalidArgumentException(
                "Invalid package name."
            );
        }

        $packageName = trim($packageName);

        if (function_exists("mb_strlen")) {
            $nameLength = mb_strlen($packageName, "UTF-8");
        } else {
            $nameLength = preg_match_all('/./us', $packageName);

            if ($nameLength === false) {
                throw new InvalidArgumentException(
                    "Invalid package name."
                );
            }
        }

        if ($nameLength > 100) {
            throw new InvalidArgumentException(
                "Package name cannot exceed 100 characters."
            );
        }

        if ($packageName === "") {
            $packageName = null;
        }

        // 2. Validate expiration period

        $expirationHours = filter_var(
            $settings["expirationHours"] ?? null,
            FILTER_VALIDATE_INT
        );

        if (
            $expirationHours === false ||
            !in_array(
                $expirationHours,
                $this->allowedExpirationHours,
                true
            )
        ) {
            throw new InvalidArgumentException(
                "Invalid expiration period."
            );
        }

        // 3. Validate optional password

        $password = $settings["password"] ?? "";

        if (!is_string($password)) {
            throw new InvalidArgumentException(
                "Invalid password."
            );
        }

        if (strlen($password) > 72) {
            throw new InvalidArgumentException(
                "Password cannot exceed 72 bytes."
            );
        }

        $passwordHash = null;

        if ($password !== "") {

            $passwordHash = password_hash(
                $password,
                PASSWORD_DEFAULT
            );

            if ($passwordHash === false) {
                throw new RuntimeException(
                    "Password could not be secured."
                );
            }
        }

        return [
            "packageName" => $packageName,
            "expirationHours" => $expirationHours,
            "passwordHash" => $passwordHash
        ];
    }

    // ______________________________________________

    private function generateShareCode() {

        $code = "";

        $charactersLength = strlen($this->shareCodeCharacters);

        for ($i = 0; $i < 5; $i++) {

            $index = random_int(0, $charactersLength - 1);

            $code .= $this->shareCodeCharacters[$index];
        }

        return $code;
    }

    // ______________________________________________

    private function createUniquePackage($data) {

        $maxAttempts = 10;

        for ($attempt = 0; $attempt < $maxAttempts; $attempt++) {

            $code = $this->generateShareCode();

            // Check whether the code already exists

            if ($this->packageModel->findByCode($code)) {
                continue;
            }

            $data["code"] = $code;

            // Generate an automatic name if the user left it empty

            if ($data["packageName"] === null) {
                $data["packageName"] = "Transfer-" . $code;
            }

            try {

                return $this->packageModel->create($data);

            } catch (PDOException $e) {

                // MySQL error 1062 means duplicate entry

                $mysqlErrorCode = $e->errorInfo[1] ?? null;

                if ((int) $mysqlErrorCode !== 1062) {
                    throw $e;
                
                }

                // Retry only when the generated code already exists
            }
        }

        throw new RuntimeException(
            "Could not generate a unique share code."
        );
    }

    // ______________________________________________

    public function createPackage($files, $settings) {

        // 1. Validate package settings

        $validatedSettings = $this->validatePackageSettings($settings);

        $storedFiles = [];

        try {

            // 2. Store uploaded files

            $storedFiles = $this->fileService->storeFiles($files);

            // 3. Calculate creation and expiration dates in UTC

            $createdAt = new DateTimeImmutable(
                "now",
                new DateTimeZone("UTC")
            );

            $expiresAt = $createdAt->modify(
                "+" . $validatedSettings["expirationHours"] . " hours"
            );

            if ($expiresAt === false) {
                throw new RuntimeException(
                    "Expiration date could not be calculated."
                );
            }

            $packageData = [
                "code" => null,
                "packageName" => $validatedSettings["packageName"],
                "passwordHash" => $validatedSettings["passwordHash"],
                "expiresAt" => $expiresAt->format("Y-m-d H:i:s")
            ];

            // 4. Start database transaction

            $this->db->beginTransaction();

            // 5. Create package with its final name

            $packageId = $this->createUniquePackage($packageData);

            // 6. Save file information

            $responseFiles = [];

            foreach ($storedFiles as $file) {

                $fileId = $this->fileModel->create(
                    $packageId,
                    $file
                );

                $responseFiles[] = [
                    "id" => $fileId,
                    "name" => $file["originalName"],
                    "size" => $file["size"],
                    "type" => $file["mimeType"]
                ];
            }

            // 7. Retrieve the created package

            $package = $this->packageModel->findById($packageId);

            if (!$package) {
                throw new RuntimeException(
                    "Package could not be retrieved."
                );
            }

            // 8. Calculate statistics before committing

            $totalSize = $this->fileService->calculateTotalSize([
                "size" => array_column($storedFiles, "size")
            ]);

            // 9. Prepare response data before committing

            $transfer = [
                "id" => $packageId,
                "code" => $package["code"],
                "packageName" => $package["package_name"],
                "createdAt" => $package["created_at"],
                "expiresAt" => $package["expires_at"],
                "hasPassword" => !empty($package["password_hash"]),
                "files" => $responseFiles,
                "statistics" => [
                    "filesCount" => count($responseFiles),
                    "totalSize" => $totalSize
                ]
            ];

            // 10. Commit database transaction

            $this->db->commit();

            return $transfer;

        } catch (Throwable $e) {

            // 11. Roll back database changes if transaction is active

            if ($this->db->inTransaction()) {

                try {
                    $this->db->rollBack();

                } catch (Throwable $rollbackError) {

                    error_log(
                        "[PackageService] Rollback failed: " .
                        $rollbackError->getMessage()
                    );
                }
            }

            // 12. Remove files stored during this operation

            try {
                $deleted = $this->fileService->deleteStoredFiles($storedFiles);

                if (!$deleted) {
                    error_log(
                        "[PackageService] Some files could not be deleted during cleanup."
                    );
                }

            } catch (Throwable $cleanupError) {

                error_log(
                    "[PackageService] Cleanup exception: " .
                    $cleanupError->getMessage()
                );
            }

            // Preserve the original error

            throw $e;
        }
    }

    // ______________________________________________

    public function getPackageByCode($code, $password = "") {

        // 1. Validate share code

        if (!is_string($code)) {
            throw new InvalidArgumentException("Invalid share code.");
        }

        $code = strtoupper(trim($code));

        if (!preg_match('/^[A-HJ-NP-Z2-9]{5}$/', $code)) {
            throw new InvalidArgumentException("Invalid share code.");
        }

        // 2. Find package

        $package = $this->packageModel->findByCode($code);

        if (!$package) {
            throw new RuntimeException("Package not found.", 404);
        }

        // 3. Check expiration

        $now = new DateTimeImmutable(
            "now",
            new DateTimeZone("UTC")
        );

        $expiresAt = new DateTimeImmutable(
            $package["expires_at"],
            new DateTimeZone("UTC")
        );

        if ($expiresAt <= $now) {
            throw new RuntimeException("Package has expired.", 410);
        }

        // 4. Check password if package is protected

        $passwordHash = $package["password_hash"];
        
        if (!empty($passwordHash)) {
        
            if (!is_string($password)) {
                throw new InvalidArgumentException(
                    "Invalid password."
                );
            }
        
            // Ask for password if none was provided
            if ($password === "") {
                return [
                    "requiresPassword" => true,
                    "code" => $code
                ];
            }
        
            // Identify the user using IP + package code
            $identifier = (
                $_SERVER["REMOTE_ADDR"] ?? "unknown"
            ) . ":" . $code;
        
            // Check whether the user is blocked
            $limit = $this->rateLimitService->checkLimit(
                "package_password",
                $identifier,
                5,
                900
            );
        
            if ($limit["blocked"]) {
                throw new RuntimeException(
                    "Too many password attempts.",
                    429
                );
            }
        
            // Verify password
            if (!password_verify($password, $passwordHash)) {
        
                $this->rateLimitService->recordFailure(
                    "package_password",
                    $identifier,
                    5,
                    900
                );
        
                throw new RuntimeException(
                    "Incorrect password.",
                    401
                );
            }
        
            // Clear failed attempts after successful verification
            $this->rateLimitService->clearLimit(
                "package_password",
                $identifier
            );
        }

        // 5. Retrieve files only after password verification

        $files = $this->fileModel->findByPackageId($package["id"]);

        $responseFiles = [];
        $totalSize = 0;

        foreach ($files as $file) {

            $size = (int) $file["size_bytes"];
            $totalSize += $size;

            $responseFiles[] = [
                "id" => (int) $file["id"],
                "name" => $file["original_name"],
                "size" => $size,
                "type" => $file["mime_type"]
            ];
        }

        // 6. Return safe package information

        return [
            "requiresPassword" => false,
            "id" => (int) $package["id"],
            "code" => $package["code"],
            "packageName" => $package["package_name"],
            "createdAt" => $package["created_at"],
            "expiresAt" => $package["expires_at"],
            "hasPassword" => !empty($passwordHash),
            "files" => $responseFiles,
            "statistics" => [
                "filesCount" => count($responseFiles),
                "totalSize" => $totalSize
            ]
        ];
    }
}
