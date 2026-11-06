
<?php

class FileService {

    private $maxFileSize = 10 * 1024 * 1024;
    private $maxTotalSize = 10 * 1024 * 1024;
    private $maxFiles = 20;

    private $allowedExtensions = [
        "pdf", "txt", "csv",
        "jpg", "jpeg", "png", "gif", "webp",
        "doc", "docx", "xls", "xlsx",
        "ppt", "pptx", "zip"
    ];

    private $allowedMimeTypes = [
        "pdf"  => ["application/pdf"],
        "txt"  => ["text/plain"],
        "csv"  => ["text/plain", "text/csv", "application/csv"],
        "jpg"  => ["image/jpeg"],
        "jpeg" => ["image/jpeg"],
        "png"  => ["image/png"],
        "gif"  => ["image/gif"],
        "webp" => ["image/webp"],

        "doc"  => ["application/msword", "application/x-ole-storage"],
        "docx" => [
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/zip"
        ],

        "xls"  => ["application/vnd.ms-excel", "application/x-ole-storage"],
        "xlsx" => [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/zip"
        ],

        "ppt"  => ["application/vnd.ms-powerpoint", "application/x-ole-storage"],
        "pptx" => [
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "application/zip"
        ],

        "zip" => [
            "application/zip",
            "application/x-zip",
            "application/x-zip-compressed"
        ]
    ];

    // ______________________________________________

    private function getStoragePath() {

        return __DIR__ . "/../storage/files/";
    }

    // ______________________________________________

    private function sanitizeOriginalName($name) {

        if (!is_string($name) || trim($name) === "") {
            throw new InvalidArgumentException(
                "A file is invalid or not allowed."
            );
        }

        // Handle both Windows and Unix path separators
        $name = basename(str_replace("\\", "/", $name));

        // Remove control characters
        $cleanName = preg_replace('/[\x00-\x1F\x7F]/u', '', $name);

        if ($cleanName === null || trim($cleanName) === "") {
            throw new InvalidArgumentException(
                "A file is invalid or not allowed."
            );
        }

        // Database column supports VARCHAR(255)
        if (function_exists("mb_strlen")) {
            $nameLength = mb_strlen($cleanName, "UTF-8");
        } else {
            $nameLength = preg_match_all('/./us', $cleanName);

            if ($nameLength === false) {
                throw new InvalidArgumentException(
                    "A file is invalid or not allowed."
                );
            }
        }

        if ($nameLength > 255) {
            throw new InvalidArgumentException(
                "File name cannot exceed 255 characters."
            );
        }

        return $cleanName;
    }

    // ______________________________________________

    public function validateFiles($files) {

        $requiredKeys = ["name", "tmp_name", "size", "error"];

        // 1. Validate the structure
        if (!is_array($files)) {
            throw new InvalidArgumentException(
                "No files were received."
            );
        }

        foreach ($requiredKeys as $key) {

            if (!isset($files[$key]) || !is_array($files[$key])) {
                throw new InvalidArgumentException(
                    "No files were received."
                );
            }
        }

        // 2. Check file count
        $fileCount = count($files["name"]);

        if ($fileCount === 0) {
            throw new InvalidArgumentException(
                "No files were received."
            );
        }

        if ($fileCount > $this->maxFiles) {
            throw new InvalidArgumentException(
                "Upload between 1 and 20 files."
            );
        }

        // 3. Ensure all arrays have identical indexes
        $expectedKeys = array_keys($files["name"]);

        foreach ($requiredKeys as $key) {

            if (array_keys($files[$key]) !== $expectedKeys) {
                throw new InvalidArgumentException(
                    "A file is invalid or not allowed."
                );
            }
        }

        // 4. Validate each uploaded file
        foreach ($files["name"] as $index => $name) {

            $tmpName = $files["tmp_name"][$index];
            $size = $files["size"][$index];
            $error = $files["error"][$index];

            if (!is_string($name) || trim($name) === "") {
                throw new InvalidArgumentException(
                    "A file is invalid or not allowed."
                );
            }

            if ($error !== UPLOAD_ERR_OK) {
                throw new InvalidArgumentException(
                    "A file could not be uploaded."
                );
            }

            if (
                !is_string($tmpName) ||
                $tmpName === "" ||
                !is_numeric($size) ||
                !is_uploaded_file($tmpName)
            ) {
                throw new InvalidArgumentException(
                    "A file is invalid or not allowed."
                );
            }

            $size = (int) $size;

            if ($size <= 0 || $size > $this->maxFileSize) {
                throw new InvalidArgumentException(
                    "A file is invalid or not allowed."
                );
            }

            // Verify the actual temporary file size
            $actualSize = filesize($tmpName);

            if ($actualSize === false || $actualSize !== $size) {
                throw new InvalidArgumentException(
                    "A file is invalid or not allowed."
                );
            }
        }

        // 5. Check total size
        if ($this->calculateTotalSize($files) > $this->maxTotalSize) {
            throw new InvalidArgumentException(
                "Total file size exceeds 10 MB."
            );
        }

        return true;
    }

    // ______________________________________________

    private function validateZipStructure($filePath, $extension) {

        if (!class_exists("ZipArchive")) {
            throw new RuntimeException(
                "ZIP validation is not available on the server."
            );
        }

        $zip = new ZipArchive();

        $result = $zip->open($filePath);

        if ($result !== true) {
            throw new InvalidArgumentException(
                "A file is invalid or not allowed."
            );
        }

        try {

            // Normal ZIP files must be valid archives
            if ($extension === "zip") {
                return true;
            }

            // Required internal files for Office formats
            $requiredEntries = [
                "docx" => [
                    "[Content_Types].xml",
                    "word/document.xml"
                ],
                "xlsx" => [
                    "[Content_Types].xml",
                    "xl/workbook.xml"
                ],
                "pptx" => [
                    "[Content_Types].xml",
                    "ppt/presentation.xml"
                ]
            ];

            foreach ($requiredEntries[$extension] as $entry) {

                if ($zip->locateName($entry) === false) {
                    throw new InvalidArgumentException(
                        "A file is invalid or not allowed."
                    );
                }
            }

            return true;

        } finally {

            $zip->close();
        }
    }

    // ______________________________________________

    public function validateFileType($file) {

        $extension = strtolower(
            pathinfo($file["name"], PATHINFO_EXTENSION)
        );

        // 1. Check extension
        if (!in_array($extension, $this->allowedExtensions, true)) {
            throw new InvalidArgumentException(
                "A file is invalid or not allowed."
            );
        }

        // 2. Detect actual MIME type
        if (!class_exists("finfo")) {
            throw new RuntimeException(
                "File type validation is not available on the server."
            );
        }

        $finfo = new finfo(FILEINFO_MIME_TYPE);

        $mimeType = $finfo->file($file["tmp_name"]);

        if ($mimeType === false) {
            throw new InvalidArgumentException(
                "A file is invalid or not allowed."
            );
        }

        // 3. Check MIME compatibility
        if (!in_array(
            $mimeType,
            $this->allowedMimeTypes[$extension],
            true
        )) {
            throw new InvalidArgumentException(
                "A file is invalid or not allowed."
            );
        }

        // 4. Validate ZIP-based formats
        if (in_array($extension, ["zip", "docx", "xlsx", "pptx"], true)) {
            $this->validateZipStructure(
                $file["tmp_name"],
                $extension
            );
        }

        return $mimeType;
    }

    // ______________________________________________

    public function calculateTotalSize($files) {

        if (!isset($files["size"]) || !is_array($files["size"])) {
            throw new InvalidArgumentException(
                "Invalid file size information."
            );
        }

        return array_sum($files["size"]);
    }

    // ______________________________________________

    public function generateStoredName($file) {

        $extension = strtolower(
            pathinfo($file["name"], PATHINFO_EXTENSION)
        );

        if (!in_array($extension, $this->allowedExtensions, true)) {
            throw new InvalidArgumentException(
                "A file is invalid or not allowed."
            );
        }

        return bin2hex(random_bytes(16)) . "." . $extension;
    }

    // ______________________________________________

    public function storeFiles($files) {

        // 1. Validate all uploaded files
        $this->validateFiles($files);

        $preparedFiles = [];

        // 2. Validate file types before storing anything
        foreach ($files["name"] as $index => $originalName) {

            $safeName = $this->sanitizeOriginalName($originalName);

            $file = [
                "name" => $safeName,
                "tmp_name" => $files["tmp_name"][$index]
            ];

            $mimeType = $this->validateFileType($file);

            $preparedFiles[] = [
                "originalName" => $safeName,
                "tmpName" => $file["tmp_name"],
                "mimeType" => $mimeType,
                "size" => (int) $files["size"][$index]
            ];
        }

        // 3. Prepare storage directory
        $storagePath = $this->getStoragePath();

        if (!is_dir($storagePath)) {

            if (
                !mkdir($storagePath, 0750, true) &&
                !is_dir($storagePath)
            ) {
                throw new RuntimeException(
                    "Storage directory could not be created."
                );
            }
        }

        if (!is_writable($storagePath)) {
            throw new RuntimeException(
                "Storage directory is not writable."
            );
        }

        // 4. Store files
        $storedFiles = [];

        try {

            foreach ($preparedFiles as $file) {

                $storedName = null;
                $destination = null;

                // Generate a unique stored name
                for ($attempt = 0; $attempt < 10; $attempt++) {

                    $storedName = $this->generateStoredName([
                        "name" => $file["originalName"]
                    ]);

                    $destination = $storagePath . $storedName;

                    if (!file_exists($destination)) {
                        break;
                    }

                    $destination = null;
                }

                if ($destination === null) {
                    throw new RuntimeException(
                        "Could not generate a unique stored filename."
                    );
                }

                if (!move_uploaded_file(
                    $file["tmpName"],
                    $destination
                )) {
                    throw new RuntimeException(
                        "A file could not be stored."
                    );
                }

                $storedFiles[] = [
                    "originalName" => $file["originalName"],
                    "storedName" => $storedName,
                    "mimeType" => $file["mimeType"],
                    "size" => $file["size"]
                ];
            }

        } catch (Throwable $e) {

            // Remove files already moved during this operation
            $this->deleteStoredFiles($storedFiles);

            throw $e;
        }

        return $storedFiles;
    }

    // ______________________________________________

   
public function deleteStoredFiles($storedFiles)
{
    $storagePath = $this->getStoragePath();

    $allDeleted = true;

    foreach ($storedFiles as $file) {

        if (
            !isset($file["storedName"]) ||
            !is_string($file["storedName"])
        ) {
            $allDeleted = false;
            continue;
        }

        $storedName = $file["storedName"];

        // Prevent path traversal and invalid filenames
        if (
            basename($storedName) !== $storedName ||
            !preg_match('/^[a-f0-9]{32}\.[a-z0-9]+$/i', $storedName)
        ) {
            error_log(
                "[FileService] Invalid stored filename: " . $storedName
            );

            $allDeleted = false;
            continue;
        }

        $path = $storagePath . $storedName;

        // File is already missing: consider it deleted
        if (!file_exists($path) && !is_link($path)) {
            continue;
        }

        // Attempt to delete the physical file
        if (!@unlink($path)) {

            error_log(
                "[FileService] Could not delete stored file: " .
                $storedName
            );

            $allDeleted = false;
        }
    }

    return $allDeleted;
}

}
