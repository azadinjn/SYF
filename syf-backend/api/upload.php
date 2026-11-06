
<?php

// ______________________________________________
// 1. Basic API configuration

header("Content-Type: application/json; charset=utf-8");

ini_set("display_errors", "0");
ini_set("log_errors", "1");


// ______________________________________________
// 2. CORS configuration

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

function sendJsonResponse($statusCode, $data) {

    http_response_code($statusCode);

    echo json_encode(
        $data,
        JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE
    );

    exit;
}


// ______________________________________________
// 4. Handle preflight requests

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {

    http_response_code(204);
    exit;
}


// ______________________________________________
// 5. Allow POST requests only

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    header("Allow: POST, OPTIONS");

    sendJsonResponse(405, [
        "success" => false,
        "message" => "Method not allowed."
    ]);
}


// ______________________________________________
// 6. Check request size against post_max_size

function convertIniSizeToBytes($value) {

    $value = trim($value);

    if ($value === "") {
        return 0;
    }

    $unit = strtolower(substr($value, -1));

    $number = (float) $value;

    switch ($unit) {

        case "g":
            $number *= 1024;

        case "m":
            $number *= 1024;

        case "k":
            $number *= 1024;
    }

    return (int) $number;
}

$postMaxSize = convertIniSizeToBytes(
    ini_get("post_max_size")
);

$contentLength = (int) ($_SERVER["CONTENT_LENGTH"] ?? 0);

if (
    $postMaxSize > 0 &&
    $contentLength > $postMaxSize
) {

    sendJsonResponse(413, [
        "success" => false,
        "message" => "The uploaded request exceeds the server limit."
    ]);
}


// ______________________________________________
// 7. Load controller

require_once __DIR__ . "/../controllers/UploadController.php";


// ______________________________________________
// 8. Execute upload operation

try {

    $controller = new UploadController();

    $result = $controller->upload();

    $statusCode = http_response_code();

    if ($statusCode === false || $statusCode < 100) {
        $statusCode = 200;
    }

    sendJsonResponse($statusCode, $result);

} catch (Throwable $e) {

    // Log internal error without exposing details to the client
    error_log(
        "[Upload API] " .
        get_class($e) . ": " .
        $e->getMessage()
    );

    sendJsonResponse(500, [
        "success" => false,
        "message" => "An unexpected error occurred. Please try again later."
    ]);
}
