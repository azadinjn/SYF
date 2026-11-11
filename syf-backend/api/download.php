<?php

// Prevent PHP errors from being displayed in the response.
ini_set("display_errors", "0");
ini_set("log_errors", "1");

header("Content-Type: application/json; charset=UTF-8");

// Allowed frontend origins.
$allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174","http://localhost:4173"
];

$origin = $_SERVER["HTTP_ORIGIN"] ?? "";

if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: " . $origin);
    header("Vary: Origin");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Expose download filename to JavaScript.
header("Access-Control-Expose-Headers: Content-Disposition");

// Handle preflight request.
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

// Only POST requests are allowed.
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."
    ]);

    exit;
}

$downloadPath = null;
$deleteAfterSend = false;
$downloadStarted = false;

try {

    // Read JSON request.
    $data = json_decode(file_get_contents("php://input"), true);

    if (!is_array($data)) {
        throw new InvalidArgumentException("Invalid request data.");
    }

    // Load dependencies.
    require_once __DIR__ . "/../config/database.php";
    require_once __DIR__ . "/../controllers/DownloadController.php";

    // Connect to database.
    $database = new Database();
    $db = $database->connect();

    // Create controller.
    $downloadController = new DownloadController($db);

    // Prepare download.
    $download = $downloadController->prepareDownload($data);

    $downloadPath = $download["path"] ?? null;
    $filename = $download["filename"] ?? "download";
    $mimeType = $download["mimeType"] ?? "application/octet-stream";
    $deleteAfterSend = ($download["deleteAfterSend"] ?? false) === true;

    // Validate file path.
    if (
        !is_string($downloadPath) ||
        !is_file($downloadPath) ||
        !is_readable($downloadPath)
    ) {
        throw new RuntimeException("Download file not found.", 404);
    }

    // Get file size.
    $fileSize = filesize($downloadPath);

    if ($fileSize === false) {
        throw new RuntimeException("Could not read file size.");
    }

    // Validate MIME type.
    if (
        !is_string($mimeType) ||
        !preg_match(
            '/^[a-zA-Z0-9.+-]+\/[a-zA-Z0-9.+-]+$/',
            $mimeType
        )
    ) {
        $mimeType = "application/octet-stream";
    }

    // Clean filename.
    if (!is_string($filename) || $filename === "") {
        $filename = "download";
    }

    // Remove dangerous header characters.
    $filename = str_replace(
        ["\r", "\n", '"', "\\"],
        "",
        $filename
    );

    // UTF-8 filename with safe ASCII fallback.
    $asciiFilename = preg_replace(
        '/[^A-Za-z0-9._-]/',
        "_",
        $filename
    );

    if (!is_string($asciiFilename) || $asciiFilename === "") {
        $asciiFilename = "download";
    }

    // Prepare download headers.
    header("Content-Type: " . $mimeType);

    header(
        'Content-Disposition: attachment; filename="' .
        $asciiFilename .
        '"; filename*=UTF-8\'\'' .
        rawurlencode($filename)
    );

    header("Content-Length: " . $fileSize);
    header("Cache-Control: no-store, no-cache, must-revalidate");
    header("Pragma: no-cache");
    header("Expires: 0");
    header("X-Content-Type-Options: nosniff");

    // Clear output buffers before sending binary data.
    while (ob_get_level() > 0) {
        ob_end_clean();
    }

    // Mark that the binary response is starting.
    $downloadStarted = true;

    // Send file to browser.
    $bytesSent = readfile($downloadPath);

    // Check transmission result.
    if ($bytesSent === false || $bytesSent !== $fileSize) {
        error_log(
            "[Download API] File transmission may be incomplete."
        );
    }

    // Delete temporary ZIP after sending.
    if ($deleteAfterSend && is_file($downloadPath)) {

        if (!@unlink($downloadPath)) {
            error_log(
                "[Download API] Could not delete temporary ZIP."
            );
        }
    }

    exit;

} catch (InvalidArgumentException $e) {

    error_log("[Download API] " . $e->getMessage());

    // Remove temporary ZIP if it was created.
    if ($deleteAfterSend && is_string($downloadPath) && is_file($downloadPath)) {
        @unlink($downloadPath);
    }

    if (!$downloadStarted && !headers_sent()) {
        http_response_code(400);

        echo json_encode([
            "success" => false,
            "message" => $e->getMessage()
        ]);
    }

} catch (RuntimeException $e) {

    error_log("[Download API] " . $e->getMessage());

    // Remove temporary ZIP if it was created.
    if ($deleteAfterSend && is_string($downloadPath) && is_file($downloadPath)) {
        @unlink($downloadPath);
    }

    if (!$downloadStarted && !headers_sent()) {

       $statusCode = $e->getCode();
        
        if (!in_array($statusCode, [401, 404, 410, 429], true)) {
            $statusCode = 500;
        }
        
        http_response_code($statusCode);
        
        $message = match ($statusCode) {
            401 => $e->getMessage(),
            404 => $e->getMessage(),
            410 => $e->getMessage(),
            429 => "Too many attempts. Try again later.",
            default => "An unexpected error occurred."
        };
        
        echo json_encode([
            "success" => false,
            "message" => $message
        ]);
    }

} catch (Throwable $e) {

    error_log("[Download API] " . $e->getMessage());

    // Remove temporary ZIP if it was created.
    if ($deleteAfterSend && is_string($downloadPath) && is_file($downloadPath)) {
        @unlink($downloadPath);
    }

    // Never send JSON after binary download has started.
    if (!$downloadStarted && !headers_sent()) {

        http_response_code(500);

        echo json_encode([
            "success" => false,
            "message" => "An unexpected error occurred."
        ]);
    }
}