-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS musicApp;

-- Use the musicApp database
USE musicApp;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Create the likedArtists table
CREATE TABLE IF NOT EXISTS likedArtists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  artist VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id)
);
