const mysql = require("mysql2");

// MySQL database connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Antony@123",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  createDatabase();
});

function createDatabase() {
  connection.query("CREATE DATABASE IF NOT EXISTS musicApp", (err) => {
    if (err) {
      console.error("Error creating database:", err);
      return;
    }
    console.log("Database created or already exists");
    useDatabase();
  });
}

function useDatabase() {
  connection.query("USE musicApp", (err) => {
    if (err) {
      console.error("Error selecting database:", err);
      return;
    }
    console.log("Changed to musicApp database");
    createUsersTable();
  });
}

function createUsersTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )
  `;
  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
      return;
    }
    console.log("Users table created or already exists");
    createLikedArtistsTable();
  });
}

function createLikedArtistsTable() {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS likedArtists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    artist VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)
  )`;
  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating likedArtists table:", err);
      return;
    }
    console.log("likedArtists table created or already exists");
  });
}

module.exports = connection;
