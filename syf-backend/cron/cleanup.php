<?php

// منع تشغيل الملف من المتصفح
// هذا الملف مخصص للتشغيل عبر PHP CLI أو Cron Job
if (PHP_SAPI !== "cli") {
    http_response_code(403);
    exit("Access denied.");
}

require_once __DIR__ . "/../config/database.php";
require_once __DIR__ . "/../services/CleanupService.php";

try {

    // الاتصال بقاعدة البيانات
    $database = new Database();
    $db = $database->connect();

    // إنشاء CleanupService
    $cleanupService = new CleanupService($db);

    // تنظيف Packages المنتهية الصلاحية
    $result = $cleanupService->cleanupExpiredPackages();

    // عرض النتيجة
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