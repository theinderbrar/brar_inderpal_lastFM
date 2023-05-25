export default {
  name: "Card",

  template: `
    <div class="card">
      <img :src="data.image[2]['#text']" alt="">
      <p><span>Song:</span> {{ data.name }}</p>
      <p><span>Artist:</span> {{ data.artist.name }}</p>
      <p><span>Listeners:</span> {{ formatPlaycount(data.playcount) }}</p>
    </div>
  `,

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  methods: {
    formatPlaycount(playcount) {
      if (playcount >= 1000000) {
        return (playcount / 1000000).toFixed(1) + "m";
      } else if (playcount >= 1000) {
        return (playcount / 1000).toFixed(1) + "k";
      } else {
        return playcount.toString();
      }
    },
  },
};
