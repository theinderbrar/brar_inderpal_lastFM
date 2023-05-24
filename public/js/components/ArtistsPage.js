// import axios from "axios";
import ArtistCard from "./ArtistCard.js";

export default {
  name: "ArtistPage",

  template: `
        <div class="artists_page">
            <div class="heading">
                <i :onClick="goBack" class="fa-solid fa-arrow-left"></i>
                <h3>Results for <span>{{ artistName }}</span></h3>
            </div>
            <div class="artists_card_section">
                <ArtistCard :name="artist.name" :imageUrl="image" />
            </div>
        </div>
        `,

  components: {
    ArtistCard,
  },
  computed: {
    artistName() {
      return this.$route.query.artist || "";
    },
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
  data() {
    return {
      artist: {},
      image: "",
    };
  },

  created() {
    const getArtist = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/lastfm/search?artistName=" + this.artistName
      );
      this.artist = res.data;
      this.image = this.artist.image[3]["#text"];
    };
    getArtist();
  },
};
