SELECT 'CREATE DATABASE quickpaste' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'quickpaste')\gexec

\c quickpaste;

CREATE TABLE IF NOT EXISTS users (
    id serial,
    ext_id VARCHAR,
    username VARCHAR,
    joined TIMESTAMP NOT NULL DEFAULT NOW(),
    perma_token_id INT,
    PRIMARY KEY (id)
);

INSERT INTO users (id, username) VALUES ('Guest', 0);

CREATE TABLE IF NOT EXISTS pastes (
    id serial,
    uuid VARCHAR(8) NOT NULL,
    owner_id int NOT NULL,
    title VARCHAR NOT NULL,
    password VARCHAR,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    last_visited TIMESTAMP NOT NULL DEFAULT NOW(),
    is_private BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    UNIQUE (uuid),
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS content_modification (
    id serial,
    api_key VARCHAR NOT NULL,
    accessed DATE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE FUNCTION delete_old_access_records() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  DELETE FROM content_modification WHERE accessed < NOW() - interval '1' day;
  RETURN NEW;
END;
$$;

CREATE TRIGGER delete_old_access_records_trigger
    AFTER INSERT ON content_modification
    EXECUTE PROCEDURE delete_old_access_records();