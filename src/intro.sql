CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ALTER TABLE users ADD COLUMN status TEXT;

-- DROP TABLE users;

INSERT INTO users (name, username)
VALUES ('John Smith', 'loot405'), ("Charlie Brown", 'charlie.brown');

SELECT * FROM users;
LIMIT 2; -- 5 most recent users

UPDATE users SET email = 'newemail@gmail.com' WHERE id = 1;

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- I should comment some of the above