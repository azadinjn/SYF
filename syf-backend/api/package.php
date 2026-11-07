
<?php

// ______________________________________________
// 1. API configuration

header("Content-Type: application/json; charset=utf-8");

ini_set("display_errors", "0");
ini_set("log_errors", "1");


// ______________________________________________
// 2. CORS

$allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174"
];

$origin = $_SERVER["HTTP_ORIGIN"] ?? "";

if ($origin !== "" && in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: " . $origin);
    header("Vary: Origin");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


// ______________________________________________
// 3. JSON response helper

function sendPackageJson($statusCode, $data) {

    http_response_code($statusCode);

    echo json_encode(
        $data,
        JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE
    );

    exit;
}


// ______________________________________________
// 4. Handle OPTIONS

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}


// ______________________________________________
// 5. Allow POST only

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    header("Allow: POST, OPTIONS");

    sendPackageJson(405, [
        "success" => false,
        "message" => "Method not allowed."
    ]);
}

$contentType = $_SERVER["CONTENT_TYPE"] ?? "";

if (stripos($contentType, "application/json") !== 0) {
    sendPackageJson(415, [
        "success" => false,
        "message" => "Unsupported content type."
    ]);
}

// Check request body size
$maxRequestSize = 4096;

$contentLength = (int) ($_SERVER["CONTENT_LENGTH"] ?? 0);

if ($contentLength > $maxRequestSize) {
    sendPackageJson(413, [
        "success" => false,
        "message" => "Request body is too large."
    ]);
}


// ______________________________________________
// 6. Read JSON request body

$rawInput = file_get_contents("php://input");

if (strlen($rawInput) > $maxRequestSize) {
    sendPackageJson(413, [
        "success" => false,
        "message" => "Request body is too large."
    ]);
}

$data = json_decode($rawInput, true);

if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {

    sendPackageJson(400, [
        "success" => false,
        "message" => "Invalid JSON request."
    ]);
}


// ______________________________________________
// 7. Connect database and execute controller

try {

    require_once __DIR__ . "/../config/database.php";
    require_once __DIR__ . "/../controllers/PackageController.php";

    $database = new Database();
    $db = $database->connect();

    $controller = new PackageController($db);

    $result = $controller->getPackage($data);

    $statusCode = http_response_code();

    if ($statusCode === false || $statusCode < 100) {
        $statusCode = 200;
    }

    sendPackageJson($statusCode, $result);

} catch (Throwable $e) {

    error_log(
        "[Package API] " .
        get_class($e) . ": " .
        $e->getMessage()
    );

    sendPackageJson(500, [
        "success" => false,
        "message" => "An unexpected error occurred. Please try again later."
    ]);
}
