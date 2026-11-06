
<?php

require_once __DIR__ . "/../services/PackageService.php";
require_once __DIR__ . "/../services/RateLimitService.php";

class PackageController {

    private PackageService $packageService;
    private RateLimitService $rateLimitService;

    public function __construct(PDO $db) {
        $this->packageService = new PackageService($db);
        $this->rateLimitService = new RateLimitService($db);
    }

    // ______________________________________________

    public function getPackage($data) {

        if ($_SERVER["REQUEST_METHOD"] !== "POST") {

            http_response_code(405);

            return [
                "success" => false,
                "message" => "Method not allowed."
            ];
        }

        try {

            if (!is_array($data)) {
                throw new InvalidArgumentException(
                    "Invalid request data."
                );
            }

            $code = $data["code"] ?? null;
            $password = $data["password"] ?? "";

            $identifier = $_SERVER["REMOTE_ADDR"] ?? "unknown";

            $limit = $this->rateLimitService->checkLimit(
                "package_lookup",
                $identifier,
                20,
                900
            );

            if ($limit["blocked"]) {
                throw new RuntimeException(
                    "Too many attempts. Try again later.",
                    429
                );
            }

            try {

                    $transfer = $this->packageService->getPackageByCode(
                        $code,
                        $password
                    );

            } catch (InvalidArgumentException $e) {

                $this->rateLimitService->recordFailure(
                    "package_lookup",
                    $identifier,
                    20,
                    900
                );

                throw $e;

            } catch (RuntimeException $e) {

                if ($e->getCode() === 404) {

                    $this->rateLimitService->recordFailure(
                        "package_lookup",
                        $identifier,
                        20,
                        900
                    );
                }

                throw $e;
            }

                        http_response_code(200);

                        return [
                            "success" => true,
                            "transfer" => $transfer
                        ];

                    } catch (InvalidArgumentException $e) {

            http_response_code(400);

            return [
                "success" => false,
                "message" => $e->getMessage()
            ];

        } catch (RuntimeException $e) {

            $statusCode = (int) $e->getCode();

            if (!in_array($statusCode, [401, 404, 410,429], true)) {
                $statusCode = 500;

                error_log(
                    "[PackageController] " .
                    $e->getMessage()
                );
            }

            http_response_code($statusCode);

            return [
                "success" => false,
                "message" => match ($statusCode) {
                    401 => "Incorrect password.",
                    404 => "Package not found.",
                    410 => "Package has expired.",
                    429 => "Too many attempts. Try again later.",
                    default => "An unexpected error occurred."
                }
            ];

        } catch (Throwable $e) {

            error_log(
                "[PackageController] " .
                get_class($e) . ": " .
                $e->getMessage()
            );

            http_response_code(500);

            return [
                "success" => false,
                "message" => "An unexpected error occurred. Please try again later."
            ];
        }
    }
}
