import ArtistCard from "./ArtistCard.js";

export default {
  name: "ArtistPage",

  template: `
        <div class="artists_page">
            <div class="heading">
                <i :onClick="goBack" class="fa-solid fa-arrow-left"></i>
                <h3>Results for <span>Selena Gomez</span></h3>
            </div>
            <div class="artists_card_section">
                <ArtistCard name="Selena Gomez" imageUrl="" />
                <ArtistCard name="Selena Gomez" imageUrl="" />
                <ArtistCard name="Selena Gomez" imageUrl="" />
                <ArtistCard name="Selena Gomez" imageUrl="" />
                <ArtistCard name="Selena Gomez" imageUrl="" />
                <ArtistCard name="Selena Gomez" imageUrl="" />
                <ArtistCard name="Selena Gomez" imageUrl="" />
                <ArtistCard name="Selena Gomez" imageUrl="" />
                <ArtistCard name="Selena Gomez" imageUrl="" />
                <ArtistCard name="Selena Gomez" imageUrl="" />
                <ArtistCard name="Selena Gomez" imageUrl="" />
                <ArtistCard name="Selena Gomez" imageUrl="" />
            </div>
        </div>
        `,

  components: {
    ArtistCard,
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
};
