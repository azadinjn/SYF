
<?php

require_once __DIR__ . "/../services/PackageService.php";
require_once __DIR__ . "/../services/DownloadService.php";
require_once __DIR__ . "/../services/RateLimitService.php";

class DownloadController {

    private $packageService;
    private $downloadService;
    private $rateLimitService;

    public function __construct(PDO $db) {

        $this->packageService = new PackageService($db);
        $this->downloadService = new DownloadService($db);
        $this->rateLimitService = new RateLimitService($db);
    }

    public function prepareDownload($data) {

        if (!is_array($data)) {
            throw new InvalidArgumentException("Invalid request data.");
        }

        $code = $data["code"] ?? "";
        $password = $data["password"] ?? "";

        // 1. Verify package code, password and expiration

        $package = $this->packageService->getPackageByCode(
            $code,
            $password
        );

        if ($package["requiresPassword"]) {
            throw new RuntimeException(
                "Package password is required.",
                401
            );
        }

        //  Check download rate limit

        $identifier = $_SERVER["REMOTE_ADDR"] ?? "unknown";

        $downloadAll = ($data["downloadAll"] ?? false) === true;

        $action = $downloadAll
            ? "download_zip"
            : "download_file";

        $maxAttempts = $downloadAll ? 5 : 20;

        $limit = $this->rateLimitService->checkLimit(
            $action,
            $identifier,
            $maxAttempts,
            900
        );

        if ($limit["blocked"]) {
            throw new RuntimeException(
                "Too many download requests. Try again later.",
                429
            );
        }
        //  Record download request

        $this->rateLimitService->recordFailure(
            $action,
            $identifier,
            $maxAttempts,
            900
        );

        // 2. Download all package files as ZIP

        if (($data["downloadAll"] ?? false) === true) {

            return $this->downloadService->prepareZip(
                $package["id"],
                $package["code"],
                $package["packageName"]
            );
        }

        // 3. Download one specific file

        $fileId = filter_var(
            $data["fileId"] ?? null,
            FILTER_VALIDATE_INT
        );

        if ($fileId === false || $fileId === null || $fileId < 1) {
            throw new InvalidArgumentException("Invalid file ID.");
        }

        return $this->downloadService->prepareSingleFile(
            $package["id"],
            $fileId
        );
    }
}
