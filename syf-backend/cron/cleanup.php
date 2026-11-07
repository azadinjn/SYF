<?php

if (PHP_SAPI !== "cli") {
    http_response_code(403);
    exit("Access denied.");
}

require_once __DIR__ . "/../config/database.php";
require_once __DIR__ . "/../services/CleanupService.php";

try {

   
    $database = new Database();
    $db = $database->connect();

   
    $cleanupService = new CleanupService($db);

    
    $result = $cleanupService->cleanupExpiredPackages();

    
    echo "====================================\n";
    echo "SYF - Automatic Cleanup\n";
    echo "====================================\n";

    echo "Date: " . gmdate("Y-m-d H:i:s") . " UTC\n";

    echo "Packages checked: " . $result["checked"] . "\n";
    echo "Packages deleted: " . $result["deleted"] . "\n";
    echo "Packages failed: " . $result["failed"] . "\n";

    echo "====================================\n";

} catch (Throwable $e) {

    error_log("[Cleanup] " . $e->getMessage());

    echo "Cleanup process failed.\n";
}