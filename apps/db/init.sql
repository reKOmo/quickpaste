SELECT 'CREATE DATABASE quickpaste' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'quickpaste')\gexec

\c quickpaste;

CREATE TABLE IF NOT EXISTS users (
    id serial,
    joined TIMESTAMP NOT NULL DEFAULT NOW(),
    api_token_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS pastes (
    id serial,
    uuid VARCHAR(8) NOT NULL,
    owner_id int NOT NULL,
    password VARCHAR,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    last_visited TIMESTAMP NOT NULL DEFAULT NOW(),
    is_private BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    UNIQUE (uuid),
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);