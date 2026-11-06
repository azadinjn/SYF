
<?php

require_once __DIR__ . "/../models/File.php";

class DownloadService {

    private $fileModel;
    private $storageDirectory;

    public function __construct(PDO $db) {

        $this->fileModel = new File($db);

        $this->storageDirectory = __DIR__ . "/../storage/files";
    }

    // Resolve and validate the physical storage path
    private function getSafeFilePath($storedName) {

        if (
            !is_string($storedName) ||
            !preg_match('/^[a-f0-9]{32}(?:\.[a-z0-9]{1,10})?$/i', $storedName)
        ) {
            throw new RuntimeException("Invalid stored filename.", 500);
        }

        $storagePath = realpath($this->storageDirectory);

        if ($storagePath === false) {
            throw new RuntimeException("Storage directory not found.", 500);
        }

        $filePath = realpath(
            $storagePath . DIRECTORY_SEPARATOR . $storedName
        );

        if (
            $filePath === false ||
            !is_file($filePath) ||
            !is_readable($filePath) ||
            strpos(
                $filePath,
                $storagePath . DIRECTORY_SEPARATOR
            ) !== 0
        ) {
            throw new RuntimeException("File not found.", 404);
        }

        return $filePath;
    }

    // Prepare one file for download
    public function prepareSingleFile($packageId, $fileId) {

        $file = $this->fileModel->findByIdAndPackageId(
            $fileId,
            $packageId
        );

        if (!$file) {
            throw new RuntimeException("File not found.", 404);
        }

        $path = $this->getSafeFilePath($file["stored_name"]);

        return [
            "path" => $path,
            "filename" => $file["original_name"],
            "mimeType" => $file["mime_type"] ?: "application/octet-stream",
            "deleteAfterSend" => false
        ];
    }

    // Make ZIP entry names safe and unique
    private function makeUniqueZipName($filename, &$usedNames) {

        $filename = basename(str_replace("\\", "/", $filename));

        $filename = preg_replace(
            '/[\/\\\\:*?"<>|]/u',
            "_",
            $filename
        );

        $filename = trim($filename);

        if ($filename === "" || $filename === "." || $filename === "..") {
            $filename = "file";
        }

        $pathInfo = pathinfo($filename);

        $name = $pathInfo["filename"] ?? "file";

        $extension = isset($pathInfo["extension"])
            ? "." . $pathInfo["extension"]
            : "";

        $candidate = $name . $extension;
        $counter = 2;

        while (isset($usedNames[strtolower($candidate)])) {

            $candidate = $name . " (" . $counter . ")" . $extension;
            $counter++;
        }

        $usedNames[strtolower($candidate)] = true;

        return $candidate;
    }

    // Generate a safe ZIP download filename
    private function makeSafeArchiveFilename($packageName, $packageCode) {

        // Use an automatic name if the package name is empty
        if (!is_string($packageName) || trim($packageName) === "") {
            $packageName = "Transfer-" . $packageCode;
        }

        $filename = trim($packageName);

        // Remove characters that are not allowed in filenames
        $filename = preg_replace(
            '/[\/\\\\:*?"<>|]/u',
            "_",
            $filename
        );

        // Remove control characters
        $filename = preg_replace(
            '/[\x00-\x1F\x7F]/u',
            "",
            $filename
        );

        if ($filename === null || trim($filename, " .\t\n\r\0\x0B") === "") {
            $filename = "Transfer-" . $packageCode;
        }

        $filename = trim($filename, " .\t\n\r\0\x0B");

        // Avoid adding .zip twice
        if (!preg_match('/\.zip$/i', $filename)) {
            $filename .= ".zip";
        }

        return $filename;
    }

    // Prepare all package files inside one ZIP archive
    public function prepareZip($packageId, $packageCode, $packageName) {

        if (!class_exists("ZipArchive")) {
            throw new RuntimeException("ZIP extension is not available.", 500);
        }

        $files = $this->fileModel->findDownloadableByPackageId(
            $packageId
        );

        if (empty($files)) {
            throw new RuntimeException("No files found in this package.", 404);
        }

        $tempPath = tempnam(sys_get_temp_dir(), "syf_");

        if ($tempPath === false) {
            throw new RuntimeException("Could not create temporary archive.", 500);
        }

        $zip = new ZipArchive();

        $openResult = $zip->open(
            $tempPath,
            ZipArchive::CREATE | ZipArchive::OVERWRITE
        );

        if ($openResult !== true) {
            @unlink($tempPath);

            throw new RuntimeException("Could not create ZIP archive.", 500);
        }

        $usedNames = [];

        try {

            foreach ($files as $file) {

                $filePath = $this->getSafeFilePath(
                    $file["stored_name"]
                );

                $zipName = $this->makeUniqueZipName(
                    $file["original_name"],
                    $usedNames
                );

                if (!$zip->addFile($filePath, $zipName)) {
                    throw new RuntimeException("Could not add a file to ZIP.", 500);
                }
            }

            if (!$zip->close()) {
                throw new RuntimeException("Could not finish ZIP archive.", 500);
            }

        } catch (Throwable $e) {

            $zip->close();
            @unlink($tempPath);

            throw $e;
        }

        if (!is_file($tempPath) || filesize($tempPath) === 0) {
            @unlink($tempPath);

            throw new RuntimeException("Generated ZIP archive is empty.", 500);
        }

        return [
            "path" => $tempPath,
            "filename" => $this->makeSafeArchiveFilename(
                $packageName,
                $packageCode
            ),
            "mimeType" => "application/zip",
            "deleteAfterSend" => true
        ];
    }
}
