
<?php

require_once __DIR__ . "/../models/Package.php";
require_once __DIR__ . "/../models/File.php";
require_once __DIR__ . "/FileService.php";

class CleanupService
{
    private $db;
    private $packageModel;
    private $fileModel;
    private $fileService;

    public function __construct(PDO $db)
    {
        $this->db = $db;

        $this->packageModel = new Package($db);
        $this->fileModel = new File($db);
        $this->fileService = new FileService();
    }

    /**
     * Delete all expired packages and their physical files.
     */
    public function cleanupExpiredPackages()
    {
        $packages = $this->packageModel->findExpired();

        $result = [
            "checked" => count($packages),
            "deleted" => 0,
            "failed" => 0
        ];

        foreach ($packages as $package) {

            $packageId = (int) $package["id"];

            try {

                // 1. Get stored filenames from database
                $storedNames =
                    $this->fileModel->findStoredFilesByPackageId(
                        $packageId
                    );

                if (!is_array($storedNames)) {
                    throw new RuntimeException(
                        "Could not retrieve package files."
                    );
                }

                // 2. Prepare filenames for FileService
                $storedFiles = [];

                foreach ($storedNames as $storedName) {

                    if (!is_string($storedName)) {
                        throw new RuntimeException(
                            "Invalid stored filename."
                        );
                    }

                    $storedFiles[] = [
                        "storedName" => $storedName
                    ];
                }

                // 3. Delete physical files first
                $filesDeleted =
                    $this->fileService->deleteStoredFiles(
                        $storedFiles
                    );

                if (!$filesDeleted) {
                    throw new RuntimeException(
                        "Some physical files could not be deleted."
                    );
                }

                // 4. Delete database records
                $this->db->beginTransaction();

                try {

                    $filesRemoved =
                        $this->fileModel->deleteByPackageId(
                            $packageId
                        );

                    if (!$filesRemoved) {
                        throw new RuntimeException(
                            "Could not delete file records."
                        );
                    }

                    $packageRemoved =
                        $this->packageModel->delete(
                            $packageId
                        );

                    if (!$packageRemoved) {
                        throw new RuntimeException(
                            "Could not delete package record."
                        );
                    }

                    $this->db->commit();

                    $result["deleted"]++;

                } catch (Throwable $e) {

                    if ($this->db->inTransaction()) {
                        $this->db->rollBack();
                    }

                    throw $e;
                }

            } catch (Throwable $e) {

                $result["failed"]++;

                error_log(
                    "[CleanupService] Package ID " .
                    $packageId .
                    " cleanup failed: " .
                    $e->getMessage()
                );
            }
        }

        return $result;
    }
}
