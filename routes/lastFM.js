const express = require("express");
const {
  searchArtists,
  getTopTracks,
  getSimilarArtists,
  getArtistInfo,
  getAlbumInfo,
  getTrackInfo,
  getAlbumTracks,
  getArtistTopAlbums,
  topTracks,
} = require("./lastFMInterface");

const router = express.Router();
const db = require("../db");

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
/*
API Example Respones
http://localhost:5000/api/lastfm/search?artistName=ed sheeran

{
  "name": "Ed Sheeran",
  "listeners": "2929236",
  "mbid": "b8a7c51f-362c-4dcb-a259-bc6e0095f0a6",
  "url": "https://www.last.fm/music/Ed+Sheeran",
  "streamable": "0",
  "image": [
    {
      "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
      "size": "small"
    },
    {
      "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
      "size": "medium"
    },
    {
      "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
      "size": "large"
    },
    {
      "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
      "size": "extralarge"
    },
    {
      "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
      "size": "mega"
    }
  ]
}

*/

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

/*
API Example Respones
http://localhost:5000/api/lastfm/top-tracks?artistName=ed sheeran
[
  {
    "name": "The A Team",
    "playcount": "7377530",
    "listeners": "867852",
    "mbid": "9b9257d2-8f1b-44e9-ae32-45a5d163a541",
    "url": "https://www.last.fm/music/Ed+Sheeran/_/The+A+Team",
    "streamable": "0",
    "artist": {
      "name": "Ed Sheeran",
      "mbid": "b8a7c51f-362c-4dcb-a259-bc6e0095f0a6",
      "url": "https://www.last.fm/music/Ed+Sheeran"
    },
    "image": [
      {
        "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
        "size": "small"
      },
      {
        "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
        "size": "medium"
      },
      {
        "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
        "size": "large"
      },
      {
        "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        "size": "extralarge"
      }
    ],
    "@attr": {
      "rank": "1"
    }
  },
  .....
  .....
  .....

50 songs

*/

// Get similar artists for an artist
router.get("/similar-artists", async (req, res) => {
  const { artistName } = req.query;
  try {
    const similarArtists = await getSimilarArtists(artistName);
    res.json(similarArtists);
  } catch (error) {
    res.status(500).json({ error: "Failed to get similar artists" });
  }
});
/*
http://localhost:5000/api/lastfm/similar-artists?artistName=ed sheeran

[
  {
    "name": "Sam Smith",
    "mbid": "5a85c140-dcf9-4dd2-b2c8-aff0471549f3",
    "match": "1",
    "url": "https://www.last.fm/music/Sam+Smith",
    "image": [
      {
        "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
        "size": "small"
      },
      {
        "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
        "size": "medium"
      },
      {
        "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
        "size": "large"
      },
      {
        "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        "size": "extralarge"
      },
      {
        "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        "size": "mega"
      },
      {
        "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
        "size": ""
      }
    ],
    "streamable": "0"
  },

50...


*/

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
    const artistInfo = await getArtistInfo(artistName);
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
