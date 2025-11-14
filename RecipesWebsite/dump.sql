CREATE DATABASE IF NOT EXISTS Recipe_app; -- (MySQL/MariaDB)
-- Or use: CREATE DATABASE Recipe_app; (Standard SQL, used if IF NOT EXISTS is not supported)

-- 2. Select the Database for use
USE Recipe_app; -- (Used in MySQL/MariaDB)
-- Or you would typically connect to the database in your SQL client/tool.

-- 3. Create the Users Table
-- We will use standard SQL types. VARCHAR is used for names and email, and TEXT is a common choice for
-- storing hashed passwords (which should always be long strings).

CREATE TABLE users (
    -- Primary Key: A unique identifier for each user
    user_id INT AUTO_INCREMENT PRIMARY KEY, -- Use SERIAL PRIMARY KEY in PostgreSQL for auto-increment

    -- User's first name
    first_name VARCHAR(50) NOT NULL,

    -- User's last name
    last_name VARCHAR(50) NOT NULL,

    -- Email address: MUST be unique for login and SHOULD NOT be empty.
    email VARCHAR(100) NOT NULL UNIQUE,

    -- Password: Store the HASHED password (NEVER the plain text password!)
    password VARCHAR(255) NOT NULL,

    -- Optional: Add a column to track when the user joined
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY, -- Use SERIAL PRIMARY KEY in PostgreSQL

    -- Foreign Key linking the recipe back to the user who uploaded it
    user_id INT NOT NULL,

    recipe_title VARCHAR(150) NOT NULL,

    -- Category column, constrained to specific values like 'breakfast', 'lunch', etc.
    recipe_category ENUM('breakfast', 'lunch', 'dinner', 'dessert', 'drinks', 'quick meals') NOT NULL,
    -- Supported categories: 'breakfast', 'lunch', 'dinner', 'dessert', 'drinks', 'quick meals'

    -- Detailed cooking instructions
    instructions TEXT NOT NULL,

    -- Stores the URL or file path to the uploaded image (NEVER store the image data itself!)
    image longblob,

    -- Timestamp for when the recipe was created
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Define the Foreign Key constraint
    FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE -- If a user is deleted, all their recipes are also deleted
        ON UPDATE CASCADE
);