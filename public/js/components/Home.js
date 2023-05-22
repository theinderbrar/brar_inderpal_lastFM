import PopularSection from "./PopularSection.js";
import BottomNav from "./BottomNav.js";

export default {
    name: "Home",
  
    template: 
      `
      <div class="home_wrapper">
        <h1>Hi There,<br><span>Anima</span></h1>
        <div class="input_wrapper">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input v-on:change="changeText" @input="e => artist = e.target.value" :value="artist" type="text"
                placeholder="Search Artists">
        </div>

        <div class="your_playlist_card">
            <h1>Your Playlist</h1>
            <div class="playlist_card">
                <div class="playlist_card_image">
                    <img src="images/playlist_1.jpg" alt="">
                </div>
                <div class="playlist_card_image">
                    <img src="images/playlist_1.jpg" alt="">
                </div>
                <div class="playlist_card_image">
                    <i class="fa-sharp fa-light fa-music-note"></i>
                </div>
                <div class="playlist_card_image">

                </div>
            </div>
            <div class="total_artists">
                <h2>Favorite Artists</h2>
                <p>2 Artists</p>
            </div>
        </div>
        <div class="popular_section">
            <h1>Popular</h1>
            <PopularSection />
        </div>

        <div class="popular_section">
            <h1>Popular</h1>
            <PopularSection />
        </div>

        <div class="popular_section">
            <h1>Popular</h1>
            <PopularSection />
        </div>
      </div>
      <BottomNav/>
      `,
  
      data() {
        return {
            artist: ""
        }
    },
    methods:{
        changeText:function(){
          this.$router.push("/artists")
        }
    },

    components:{
      PopularSection,
      BottomNav
    }

  };
  