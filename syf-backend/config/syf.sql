-- =====================================
-- PACKAGES TABLE
-- =====================================

CREATE TABLE IF NOT EXISTS packages (

    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    code CHAR(5) NOT NULL UNIQUE,

    package_name VARCHAR(100) DEFAULT NULL,

    password_hash VARCHAR(255) DEFAULT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    expires_at DATETIME NOT NULL

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- =====================================
-- FILES TABLE
-- =====================================

CREATE TABLE IF NOT EXISTS files (

    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    package_id BIGINT UNSIGNED NOT NULL,

    original_name VARCHAR(255) NOT NULL,

    stored_name VARCHAR(255) NOT NULL,

    mime_type VARCHAR(150) DEFAULT NULL,

    size_bytes BIGINT UNSIGNED NOT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_files_package_id (package_id),

    CONSTRAINT fk_files_package

        FOREIGN KEY (package_id)

        REFERENCES packages(id)

        ON DELETE CASCADE

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;