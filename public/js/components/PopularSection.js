import Card from "../components/Card.js";

export default {
  template: `
        <div class="card-container">
            <Card v-for="data in details" :key="data.id" :data="data" />
        </div>
        `,
  components: {
    Card,
  },

  props: {
    details: {
      type: Array,
      required: true,
    },
  },

  // mounted() {
  //   console.log(this.details);
  // },
};
