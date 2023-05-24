export default {
  name: "ArtistCard",

  template: `
    <div class="artist_card">
      <img :src="imageUrl" alt="">
      <p>{{ name }}</p>
      <i @click="() => addfavArtist(name)" class="material-icons-outlined">favorite</i>
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
