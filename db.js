const fs = require("fs");
const mysql = require("mysql2");

// MySQL database connection configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  executeSQLCommandsFromFile("./db/db.sql");
});

function executeSQLCommandsFromFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading SQL file:", err);
      return;
    }

    const sqlCommands = data.split(";");

    connection.query(sqlCommands[0], (err) => {
      if (err) {
        console.error("Error executing SQL command:", err);
        return;
      }
      console.log("Database created or already exists");
      executeNextCommand(sqlCommands, 1);
    });
  });
}

function executeNextCommand(sqlCommands, index) {
  if (index >= sqlCommands.length - 1) {
    console.log("All SQL commands executed successfully");
    return;
  }

  connection.query(sqlCommands[index], (err) => {
    if (err) {
      console.error("Error executing SQL command:", err);
      return;
    }

    console.log(`SQL command ${index + 1} executed successfully`);
    executeNextCommand(sqlCommands, index + 1);
  });
}

module.exports = connection;
