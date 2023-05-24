export default {
  name: "ArtistCard",

  template: `
        <div class="artist_card">
            <img src="images/artist.png" alt="">
            <p>{{ name }}</p>
        </div>
        `,

  props: {
    imageUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
