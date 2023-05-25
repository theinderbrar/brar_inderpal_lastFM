export default {
  name: "ArtistCard",

  template: `
  <div class="artist_card">
    <img :src="data.image[2]['#text']" alt="">
    <p>{{ data.name }}</p>
    <i  class="fa-solid fa-heart" :style="{ color: isLiked ? '#23e5b5' : 'white' }" @click="toggleLike"></i>
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
      isLiked: false,
    };
  },

  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.userId = user.id;
      this.checkIfLiked();
    }
  },

  methods: {
    async checkIfLiked() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/${this.userId}/artists`
        );
        const likedArtists = res.data.map((artist) => artist.artist);
        this.isLiked = likedArtists.includes(this.data.name);
      } catch (error) {
        console.error(error);
      }
    },

    async toggleLike() {
      if (this.isLiked) {
        await this.removeArtist();
      } else {
        await this.addArtist();
      }
      this.isLiked = !this.isLiked;
    },

    async addArtist() {
      const data = {
        artist: this.data.name,
        image: this.data.image[2]["#text"],
        id: this.data.mbid,
        userId: this.userId,
      };

      try {
        const res = await axios.post(
          "http://localhost:5000/api/user/add-artist",
          data
        );
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    },

    async removeArtist() {
      try {
        const res = await axios.post(
          `http://localhost:5000/api/user/rem-artist`,
          {
            userId: this.userId,
            artist: this.data.name,
          }
        );
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
