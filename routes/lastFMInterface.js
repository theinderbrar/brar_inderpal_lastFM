const axios = require("axios");

const API_KEY = "ef4a8f6f178086b89b5aa48b0a533fe2";

// Function to search for artists
async function searchArtists(artistName) {
  try {
    const response = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(
        artistName
      )}&api_key=${API_KEY}&format=json`
    );
    return response.data.results.artistmatches.artist;
  } catch (error) {
    console.error("Error searching for artists:", error.response.data);
    throw error;
  }
}

// Function to get top tracks for an artist
async function getTopTracks(artistName) {
  try {
    const response = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(
        artistName
      )}&api_key=${API_KEY}&format=json`
    );
    return response.data.toptracks.track;
  } catch (error) {
    console.error("Error getting top tracks:", error.response.data);
    throw error;
  }
}

// Function to get similar artists for an artist
async function getSimilarArtists(artistName) {
  try {
    const response = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${encodeURIComponent(
        artistName
      )}&api_key=${API_KEY}&format=json`
    );
    return response.data.similarartists.artist;
  } catch (error) {
    console.error("Error getting similar artists:", error.response.data);
    throw error;
  }
}

async function getArtistInfo(artistName) {
  try {
    const response = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(
        artistName
      )}&api_key=${API_KEY}&format=json`
    );
    return response.data.artist;
  } catch (error) {
    console.error("Error getting artist info:", error.response.data);
    throw error;
  }
}

async function getAlbumInfo(artistName, albumName) {
  try {
    const response = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${encodeURIComponent(
        artistName
      )}&album=${encodeURIComponent(albumName)}&api_key=${API_KEY}&format=json`
    );
    return response.data.album;
  } catch (error) {
    console.error("Error getting album info:", error.response.data);
    throw error;
  }
}

async function getTrackInfo(artistName, trackName) {
  try {
    const response = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=track.getinfo&artist=${encodeURIComponent(
        artistName
      )}&track=${encodeURIComponent(trackName)}&api_key=${API_KEY}&format=json`
    );
    return response.data.track;
  } catch (error) {
    console.error("Error getting track info:", error.response.data);
    throw error;
  }
}

async function getAlbumTracks(artistName, albumName) {
  try {
    const response = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${encodeURIComponent(
        artistName
      )}&album=${encodeURIComponent(albumName)}&api_key=${API_KEY}&format=json`
    );
    return response.data.album.tracks.track;
  } catch (error) {
    console.error("Error getting album tracks:", error.response.data);
    throw error;
  }
}

async function getArtistTopAlbums(artistName) {
  try {
    const response = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${encodeURIComponent(
        artistName
      )}&api_key=${API_KEY}&format=json`
    );
    return response.data.topalbums.album;
  } catch (error) {
    console.error("Error getting artist top albums:", error.response.data);
    throw error;
  }
}

async function getArtistTopTracks(artistName) {
  try {
    const response = await axios.get(
      `http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(
        artistName
      )}&api_key=${API_KEY}&format=json`
    );
    return response.data.toptracks.track;
  } catch (error) {
    console.error("Error getting artist top tracks:", error.response.data);
    throw error;
  }
}

module.exports = {
  searchArtists,
  getTopTracks,
  getSimilarArtists,
  getArtistInfo,
  getAlbumInfo,
  getTrackInfo,
  getAlbumTracks,
  getArtistTopAlbums,
};
