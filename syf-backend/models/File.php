<?php

class File {

    private $db;

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    // Create a new file record
    public function create($packageId, $file) {

        $sql = "INSERT INTO files (
                    package_id,
                    original_name,
                    stored_name,
                    mime_type,
                    size_bytes
                )
                VALUES (
                    :package_id,
                    :original_name,
                    :stored_name,
                    :mime_type,
                    :size_bytes
                )";

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            ":package_id" => $packageId,
            ":original_name" => $file["originalName"],
            ":stored_name" => $file["storedName"],
            ":mime_type" => $file["mimeType"],
            ":size_bytes" => $file["size"]
        ]);

        return (int) $this->db->lastInsertId();
    }

    // Get public file information
    public function findByPackageId($packageId) {

        $sql = "SELECT
                    id,
                    original_name,
                    mime_type,
                    size_bytes,
                    created_at
                FROM files
                WHERE package_id = :package_id";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([":package_id" => $packageId]);

        return $stmt->fetchAll();
    }

    // Get stored filenames
    public function findStoredFilesByPackageId($packageId) {

        $sql = "SELECT stored_name
                FROM files
                WHERE package_id = :package_id";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([":package_id" => $packageId]);

        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    // Find one file belonging to a specific package
    public function findByIdAndPackageId($fileId, $packageId) {

        $sql = "SELECT
                    id,
                    package_id,
                    original_name,
                    stored_name,
                    mime_type,
                    size_bytes
                FROM files
                WHERE id = :id
                AND package_id = :package_id
                LIMIT 1";

        $stmt = $this->db->prepare($sql);

        $stmt->execute([
            ":id" => $fileId,
            ":package_id" => $packageId
        ]);

        return $stmt->fetch();
    }

    // Get all files required for ZIP download
    public function findDownloadableByPackageId($packageId) {

        $sql = "SELECT
                    id,
                    original_name,
                    stored_name,
                    mime_type,
                    size_bytes
                FROM files
                WHERE package_id = :package_id";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([":package_id" => $packageId]);

        return $stmt->fetchAll();
    }

    // Delete database records
    public function deleteByPackageId($packageId) {

        $sql = "DELETE FROM files
                WHERE package_id = :package_id";

        $stmt = $this->db->prepare($sql);
        $stmt->execute([":package_id" => $packageId]);

        return $stmt->rowCount();
    }
}