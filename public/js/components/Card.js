export default {
  name: "Card",

  template: `
        <div class="card">
            <img :src="data.image[2]['#text']" alt="">
            <p> <span>Song : </span> {{ data.name }}</p>
            <p> <span>Artist : </span> {{ data.artist.name }}</p>
            <p> <span>Listeners : </span> {{ data.playcount}}</p>
        </div>
        `,
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  //src="images/playlist_1.jpg"

  // mounted() {
  //   console.log(this.data);
  // },
};
