
<?php

require_once __DIR__ . "/../config/database.php";
require_once __DIR__ . "/../services/PackageService.php";
require_once __DIR__ . "/../services/RateLimitService.php";

class UploadController {

    private $packageService;
    private $rateLimitService;

    public function __construct() {

        $database = new Database();
        $db = $database->connect();

        $this->packageService = new PackageService($db);
        $this->rateLimitService = new RateLimitService($db);
    }

    // ______________________________________________

    public function upload() {

        // 1. Check request method
        if ($_SERVER["REQUEST_METHOD"] !== "POST") {

            http_response_code(405);

            return [
                "success" => false,
                "message" => "Method not allowed."
            ];
        }

        //  Rate limiting
        $identifier = $_SERVER["REMOTE_ADDR"] ?? "unknown";

        $limit = $this->rateLimitService->checkLimit(
            "upload",
            $identifier,
            10,
            900
        );

        if ($limit["blocked"]) {
            //  Record upload request
            $this->rateLimitService->recordFailure(
                "upload",
                $identifier,
                10,
                900
            );
            http_response_code(429);

            return [
                "success" => false,
                "message" => "Too many upload requests. Try again later."
            ];
        }

        // 2. Check if files exist
        if (!isset($_FILES["files"])) {

            http_response_code(400);

            return [
                "success" => false,
                "message" => "No files were received."
            ];
        }

        // 3. Get package settings
        $settings = [
            "packageName" => $_POST["packageName"] ?? "",
            "expirationHours" => $_POST["expirationHours"] ?? null,
            "password" => $_POST["password"] ?? ""
        ];

        try {

            // 4. Create package
            $transfer = $this->packageService->createPackage(
                $_FILES["files"],
                $settings
            );

            // 5. Success response
            http_response_code(201);

            return [
                "success" => true,
                "message" => "Package created successfully.",
                "transfer" => $transfer
            ];

        } catch (InvalidArgumentException $e) {

            // Expected validation errors
            http_response_code(400);

            return [
                "success" => false,
                "message" => $e->getMessage()
            ];

        } catch (Throwable $e) {

            // Log internal errors
            error_log(
                "[UploadController] " .
                get_class($e) . ": " .
                $e->getMessage()
            );

            // Hide internal details
            http_response_code(500);

            return [
                "success" => false,
                "message" => "An unexpected error occurred. Please try again later."
            ];
        }
    }
}
