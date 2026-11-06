
<?php

class Package
{
    private $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function create($data)
    {
        $sql = "INSERT INTO packages (
                    code,
                    package_name,
                    password_hash,
                    expires_at
                ) VALUES (
                    :code,
                    :package_name,
                    :password_hash,
                    :expires_at
                )";

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            ":code" => $data["code"],
            ":package_name" => $data["packageName"],
            ":password_hash" => $data["passwordHash"],
            ":expires_at" => $data["expiresAt"]
        ]);

        return (int) $this->db->lastInsertId();
    }

    public function findById($id)
    {
        $sql = "SELECT *
                FROM packages
                WHERE id = :id
                LIMIT 1";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([":id" => $id]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function findByCode($code)
    {
        $sql = "SELECT *
                FROM packages
                WHERE code = :code
                LIMIT 1";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([":code" => $code]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * Find all packages whose expiration date has passed.
     */
   public function findExpired()
{
    $sql = "SELECT id, code, package_name, expires_at
            FROM packages
            WHERE expires_at <= UTC_TIMESTAMP()
            ORDER BY expires_at ASC";

    $stmt = $this->db->prepare($sql);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

    public function delete($id)
    {
        $sql = "DELETE FROM packages
                WHERE id = :id";

        $stmt = $this->db->prepare($sql);
        return $stmt->execute([":id" => $id]);
    }
}
