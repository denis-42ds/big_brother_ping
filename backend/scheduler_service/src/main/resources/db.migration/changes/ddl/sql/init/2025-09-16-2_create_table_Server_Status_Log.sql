
CREATE TABLE IF NOT EXISTS server_status_log
(
    server_id                        UUID          PRIMARY KEY,
    server_url                       VARCHAR(30)   NOT NULL,
    server_name                      VARCHAR(30)   NOT NULL,
    server_status                    VARCHAR(20)   CHECK(server_status IN ('ONLINE', 'OFFLINE', 'CONNECT_ERROR')) DEFAULT 'OFFLINE',
    local_date_time                  TIMESTAMP     NOT NULL,
    response_code                    VARCHAR(100),
    latency                          VARCHAR(100)
    );
