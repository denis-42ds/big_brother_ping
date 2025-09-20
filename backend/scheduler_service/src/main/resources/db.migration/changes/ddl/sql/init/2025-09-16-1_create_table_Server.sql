CREATE TABLE IF NOT EXISTS server
(
    server_id            UUID                 PRIMARY KEY,
    server_url           VARCHAR(30)          NOT NULL,
    server_name          VARCHAR(30)          NOT NULL
    );
