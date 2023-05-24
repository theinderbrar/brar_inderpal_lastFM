const mysql = require("mysql2");

// MySQL database connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Antony@123"
});
connection.connect((err) => {
  createDatabase();
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

function createDatabase() {
  connection.query("CREATE DATABASE IF NOT EXISTS musicApp", (err) => {
    if (err) {
      console.error("Error creating database:", err);
    } else {
      console.log("Database created or already exists");
      connection.query("USE musicApp", (err) => {
        if (err) {
          console.error("Error selecting database:", err);
        } else {
          console.log("Changed to musicApp database");
          connection.query(
            `CREATE TABLE IF NOT EXISTS users (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              username VARCHAR(255) NOT NULL UNIQUE,
              email VARCHAR(255) NOT NULL UNIQUE,
              password VARCHAR(255) NOT NULL,
              likedArtists TEXT
            )`,
            (err) => {
              if (err) {
                console.error("Error creating table:", err);
              } else {
                console.log("User table created or already exists");
              }
            }
          );
        }
      });
    }
  });
}

module.exports = connection;
