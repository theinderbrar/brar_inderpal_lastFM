export default {
  name: "Signup",

  template: `
      <div class="login_section">
          <h1>
              join the <span>fun.</span>
          </h1>
          <div class="login_box">
              <form>
                  <h1>Signup</h1>
                  <div>
                    <label> Name </label>
                    <input type="text" v-model="name">
                  </div>
                  <div>
                      <label> E-mail </label>
                      <input type="text" v-model="email">
                  </div>
                  <div>
                  <label> Username </label>
                    <input type="text" v-model="username">
                  </div>
                  <div>
                      <label> Password </label>
                      <input type="text" v-model="password">
                  </div>
                  <p>Already have an account? <router-link class="signup" to="/login">Login now</router-link></p>
                  <input @click="register" type="submit" value="Register">
              </form>
          </div>
      </div>  
        `,

  methods: {
    async register(e) {
      e.preventDefault();
      const data = {
        name: this.name,
        email: this.email,
        username: this.username,
        password: this.password,
      };
      console.log(data);
      axios
        .post("http://localhost:5000/api/user/register/", data)
        .then((response) => {
          console.log("User added successfully");
          console.log(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          console.error("Failed to add user:", error);
          if (error.response) {
            console.log(error.response.data);
          }
        });
    },
  },

  data() {
    return {
      email: "",
      password: "",
      name: "",
      username: "",
    };
  },

  created() {},
};
