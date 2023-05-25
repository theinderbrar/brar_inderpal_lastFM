import PopularSection from "./PopularSection.js";
import BottomNav from "./BottomNav.js";

export default {
  name: "MyAlbums",

  template: `
    <BottomNav/>
    <div class="myAlbums_section">

        <h1 style="color:#fff;">My Albums</h1>

        <div style="margin-top:30px;margin-bottom:50px" v-for="album in myalbums" class="popular_section">
            <h1>Popular Songs of {{ album[0].artist?.name }}</h1>
            <PopularSection :details="album"/>
        </div>

    </div>
    `,

  components: {
    PopularSection,
    BottomNav
  },

  data() {
    return {
      myalbums: [],
      userId: 0,
    };
  },

  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.userId = user.id;
    console.log(this.userId);

    const getTopTracks = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/lastfm/${this.userId}/top-tracks`
      );
      this.myalbums = res.data;
      console.log(res.data)
    };
    getTopTracks();
  },
};
