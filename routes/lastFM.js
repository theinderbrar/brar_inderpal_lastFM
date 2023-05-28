const express = require("express");
const {
  searchArtists,
  getTopTracks,
  getArtistInfo,
  getAlbumInfo,
  getTrackInfo,
  getAlbumTracks,
  getArtistTopAlbums,
  topTracks,
} = require("./lastFMInterface");

const router = express.Router();

// Search for artists
router.get("/search", async (req, res) => {
  const { artistName } = req.query;
  try {
    const artists = await searchArtists(artistName);
    res.json(artists[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to search for artists" });
  }
});

// Get top tracks for an artist
router.get("/:userId/top-tracks", async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const query = `SELECT * FROM likedArtists WHERE userId = ${userId}`;

  try {
    const result = await new Promise((resolve, reject) => {
      req.db.query(query, [userId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (result.length === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const likedArtistAlbums = await Promise.all(
      result.map(async (item) => {
        try {
          const topTracks = await getTopTracks(item.artist);
          return topTracks;
        } catch (error) {
          throw new Error("Failed to get top tracks");
        }
      })
    );

    res.status(200).json(likedArtistAlbums);
  } catch (error) {
    console.error("Error retrieving artists:", error);
    res.status(500).json({ error: "Failed to retrieve artists" });
  }
});

// Get top artists
router.get("/tracks", async (req, res) => {
  try {
    const topTracksData = await topTracks();
    res.status(200).json(topTracksData);
  } catch (error) {
    console.error("Failed to get top tracks:", error);
    res.status(500).json({ error: "Failed to get top tracks" });
  }
});

// Get artist info
router.get("/artist-info", async (req, res) => {
  const { artistName } = req.query;
  try {
    if (artistName === "") {
      const artistInfo = await getArtistInfo(artistName);
    } else {
      const artistInfo = await getTopArtists();
    }
    res.json(artistInfo);
  } catch (error) {
    res.status(500).json({ error: "Failed to get artist info" });
  }
});

// Get album info
router.get("/album-info", async (req, res) => {
  const { artistName, albumName } = req.query;
  try {
    const albumInfo = await getAlbumInfo(artistName, albumName);
    res.json(albumInfo);
  } catch (error) {
    res.status(500).json({ error: "Failed to get album info" });
  }
});

// Get track info
router.get("/track-info", async (req, res) => {
  const { artistName, trackName } = req.query;
  try {
    const trackInfo = await getTrackInfo(artistName, trackName);
    res.json(trackInfo);
  } catch (error) {
    res.status(500).json({ error: "Failed to get track info" });
  }
});

// Get album tracks
router.get("/album-tracks", async (req, res) => {
  const { artistName, albumName } = req.query;
  try {
    const albumTracks = await getAlbumTracks(artistName, albumName);
    res.json(albumTracks);
  } catch (error) {
    res.status(500).json({ error: "Failed to get album tracks" });
  }
});

// Get artist top albums
router.get("/artist-top-albums", async (req, res) => {
  const { artistName } = req.query;
  try {
    const artistTopAlbums = await getArtistTopAlbums(artistName);
    res.json(artistTopAlbums);
  } catch (error) {
    res.status(500).json({ error: "Failed to get artist top albums" });
  }
});

module.exports = router;
