const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/", (req, res) => res.json("User"));

router.get("/data", (req, res) => res.json("data api"));

// Add a new user
router.post("/register", (req, res) => {
  const { name, username, email, password } = req.body;
  console.log(req.body);
  const insertQuery =
    "INSERT INTO users (name, username, email, password) VALUES (?,?, ?, ?)";

  const selectQuery = "SELECT name,username,id FROM users WHERE username = ?";

  req.db.query(
    insertQuery,
    [name, username, email, password],
    (err, result) => {
      if (err) {
        console.error("Error adding user:", err);
        res.status(500).json({ error: "Failed to add user" });
      } else {
        req.db.query(selectQuery, [username], (err, userResult) => {
          if (err) {
            console.error("Error fetching user:", err);
            res.status(500).json({ error: "Failed to fetch user" });
          } else {
            const user = userResult[0];
            res.json({ message: "User added successfully", user });
          }
        });
      }
    }
  );
});

// Perform login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  req.db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error("Error performing login:", err);
      res.status(500).json({ error: "Failed to perform login" });
    } else if (result.length === 0) {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      const user = {
        name: result[0].name,
        username: result[0].username,
        id: result[0].id,
      };
      res.json({ message: "Login successful", user });
    }
  });
});

// Get artists for a user
router.get("/:userId/artists", (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const query = `SELECT * FROM likedArtists WHERE userId = ${userId}`;
  req.db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Error retrieving artists:", err);
      res.status(500).json({ error: "Failed to retrieve artists" });
    } else if (result.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      console.log(result);
      res.json(result);
      // const likedArtists = result.map((row) => row.artistName);
      // res.json({ likedArtists });
    }
  });
});

router.post("/add-artist", (req, res) => {
  const { userId, artist, image } = req.body;

  // Insert the artist details into the likedArtists table
  const query =
    "INSERT INTO likedArtists (userId, artist, image) VALUES (?, ?, ?)";
  db.query(query, [userId, artist, image], (err, result) => {
    if (err) {
      console.error("Error adding artist: ", err);
      res
        .status(500)
        .json({ error: "An error occurred while adding the artist." });
      return;
    }
    res.status(200).json({ message: "Artist added successfully." });
  });
});

router.post("/rem-artist", (req, res) => {
  const { userId, artist } = req.body;

  // Delete the artist from the likedArtists table for the specified user
  const query = "DELETE FROM likedArtists WHERE userId = ? AND artist = ?";
  db.query(query, [userId, artist], (err, result) => {
    if (err) {
      console.error("Error removing artist: ", err);
      res
        .status(500)
        .json({ error: "An error occurred while removing the artist." });
      return;
    }
    res.status(200).json({ message: "Artist removed successfully." });
  });
});



module.exports = router;
