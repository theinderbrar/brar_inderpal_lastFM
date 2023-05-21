export default {
    name: "Home",
  
    template: 
      `
      <div>
        <h1 class='h' @click="counter">Hello {{ message }}</h1>
        <p @click="hi">Click me too!</p>
        <button @click="hi">Click Here</button>
      </div>
      `,
  
    methods:{
      async counter(){
        const res = await fetch("http://localhost:5000/api/user/")
        const json = await res.json()
        this.message = json
      },
      hi(){
        console.log("hii")
      }
    },
  
    data() {
      return {
        message: "Antony",
      };
    },
  
    created() {
      this.counter();
    },
  };
  