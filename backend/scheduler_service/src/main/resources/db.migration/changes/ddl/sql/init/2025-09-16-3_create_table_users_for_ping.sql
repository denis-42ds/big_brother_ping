

CREATE TABLE IF NOT EXISTS users_for_ping
(
    id                             UUID PRIMARY KEY,
    first_name                     VARCHAR(30)         NOT NULL,
    last_name                      VARCHAR(30)         NOT NULL,
    mobile_phone                   VARCHAR(12) UNIQUE  NOT NULL,
    user_role                      VARCHAR(20)         CHECK(user_role   IN ('USER', 'ADMIN')) DEFAULT 'USER',
    user_chat_id                   VARCHAR(50)
);
