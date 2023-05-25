export default {
  name: "ArtistCard",

  template: `
    <div class="artist_card">
      <img :src="data.image[2]['#text']" alt="">
      <p>{{ data.name }}</p>
      <i @click="addFavArtist(data)" class="material-icons-outlined">favorite</i>
    </div>
        `,

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      userId: 0,
    };
  },

  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.userId = user.id;
    }
    console.log(this.userId);
  },

  methods: {
    async addFavArtist(artistData) {
      const data = {
        artist: artistData.name,
        image: artistData.image[2]["#text"],
        id: artistData.mbid,
        userId: this.userId,
      };

      // Perform the logic to add the artist to favorites
      try {
        const res = await axios.post(
          "http://localhost:5000/api/user/add-artist",
          data
        );
        console.log(res.data);
        this.$router.push({ name: "home" });
      } catch (error) {
        console.error(error);
      }
    },

    getImage(){
      
    }
  },
};
