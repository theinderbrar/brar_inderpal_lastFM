import ArtistCard from "./ArtistCard.js";
import BottomNav from "./BottomNav.js";

export default {
  name: "MyArtists",

  template: `
    <BottomNav/>
    <div class="my_artist_wrapper">
      <h1 style="color:#fff">My Artists</h1>

      <div class="artists_card_section">
        <div v-for="artist in artists" class="artist_card">
          <img :src="artist.image" alt="">
          <p>{{ artist.artist }}</p>
          <i style="color:#23e5b5" @click="removeFromFav(artist)" class="fa-solid fa-heart"></i>
        </div>
      </div>
    </div>
  `,

  components: {
    BottomNav,
    ArtistCard,
  },

  data() {
    return {
      artists: [],
      userId: 0,
    };
  },

  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.userId = user.id;

    const getFavArtists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${this.userId}/artists`
        );
        this.artists = response.data;
        console.log(this.artists);
      } catch (error) {
        console.error("Error retrieving favorite artists:", error);
      }
    };

    getFavArtists();
    window.scrollTo(0, 0);
  },

  methods: {
    async removeFromFav(artist) {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/user/rem-artist`,
          {
            userId: artist.userId,
            artist: artist.artist,
          }
        );
        this.artists = this.artists.filter(function (value, index, arr) {
          return !(value == artist);
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
