
<?php

class Database {

    private $host = "localhost";
    private $database = "syf_database";
    private $username = "root";
    private $password = "";

    public function connect() {

        $connection = null;

        try {

            $connection = new PDO(
                "mysql:host=" . $this->host .
                ";dbname=" . $this->database .
                ";charset=utf8mb4",

                $this->username,
                $this->password
            );

            $connection->setAttribute(
                PDO::ATTR_ERRMODE,
                PDO::ERRMODE_EXCEPTION
            );

            $connection->setAttribute(
                PDO::ATTR_DEFAULT_FETCH_MODE,
                PDO::FETCH_ASSOC
            );

        } catch (PDOException $e) {

            error_log($e->getMessage());

            throw new Exception(
                "Database connection failed."
            );
        }

        return $connection;
    }
}
