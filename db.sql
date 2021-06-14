CREATE TABLE users(
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    active Boolean
);

INSERT INTO users VALUES("4981ca80-9a48-4857-9b64-97a3af644662", "admin", "admin");