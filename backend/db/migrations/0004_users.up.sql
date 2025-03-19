CREATE TABLE users (
    id SERIAL PRIMARY KEY,               -- Unique identifier for each user
    name VARCHAR(255) NOT NULL,          -- User's full name
    email VARCHAR(255) UNIQUE NOT NULL,  -- User's email (must be unique)
    username VARCHAR(50) UNIQUE NOT NULL,-- Username (must be unique)
    password VARCHAR(255) NOT NULL,      -- Hashed password
    role VARCHAR(50) NOT NULL,           -- User's role (e.g., admin, user)
    access_token TEXT,                   -- Optional: Access token for authentication
    created_at TIMESTAMP DEFAULT NOW(),  -- Timestamp for when the user was created
    updated_at TIMESTAMP DEFAULT NOW()   -- Timestamp for when the user was last updated
);