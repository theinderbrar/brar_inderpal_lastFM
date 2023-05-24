import PopularSection from "./PopularSection.js";
import BottomNav from "./BottomNav.js";

export default {
  name: "Home",

  template: `
      <div class="home_wrapper">
        <h1>Hi There,<br><span>{{ name }}</span></h1>
        <div class="input_wrapper">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input v-on:change="changeText" @input="e => artist = e.target.value" :value="artist" type="text"
                placeholder="Search Artists">
        </div>

        <div class="your_playlist_card">
            <h1>Your Artists</h1>
            <div class="playlist_card">
                <div class="playlist_card_image">
                    <img :src="getImage(0)" alt="">
                </div>
                <div class="playlist_card_image">
                    <img :src="getImage(1)" alt="">
                </div>
                <div class="playlist_card_image">
                    <img :src="getImage(2)" alt="">
                </div>
                <div class="playlist_card_image">
                    <img :src="getImage(3)" alt="">
                </div>
            </div>
            <div class="total_artists">
                <h2>Favorite Artists</h2>
                <p>{{ favArtists.length }} Artists</p>
            </div>
        </div>
        <div class="popular_section">
            <h1>Popular Songs</h1>
            <PopularSection :details="topTracks"/>
        </div>


      </div>
      <BottomNav/>
      `,

  //       <div class="popular_section">
  //       <h1>Popular</h1>
  //       <PopularSection />
  //   </div>

  //   <div class="popular_section">
  //       <h1>Popular</h1>
  //       <PopularSection />
  //   </div>

  data() {
    return {
      artist: "",
      name: "",
      topTracks: [],
      favArtists: [],
      userId: 0,
    };
  },
  methods: {
    changeText: function () {
      this.$router.push({
        path: "/artists",
        query: { artist: this.artist },
      });
    },

    getImage(index) {
      return this.favArtists[index]
        ? this.favArtists[index].image
        : "/images/artist_icon.png";
    },
  },

  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.name = user.name;
      this.userId = user.id;
    }

    const getTopTracks = async () => {
      const res = await axios.get("http://localhost:5000/api/lastfm/tracks");
      const data = res.data;
      this.topTracks = data.slice(0, 10);
    };

    const getMyArtists = async () => {
      const res = await axios(
        `http://localhost:5000/api/user/${this.userId}/artists`
      );
      this.favArtists = res.data;
      console.log(res.data);
    };

    getMyArtists();
    getTopTracks();
  },

  components: {
    PopularSection,
    BottomNav,
  },
};
