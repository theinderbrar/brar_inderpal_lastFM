const express = require("express");

const router = express.Router();

router.get("/", (req, res) => res.json("User"));

router.get("/data", (req, res) => res.json("data api"));

module.exports = router;
