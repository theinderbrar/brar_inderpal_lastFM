export default {
  name: "Login",

  template: `
    <div class="login_section">
        <h1>
            join the <span>fun.</span>
        </h1>
        <div class="login_box">
            <form>
                <h1>Login</h1>
                <div>
                    <label> E-mail </label>
                    <input type="text" v-model="email">
                </div>
                <div>
                    <label> Password </label>
                    <input type="text" v-model="password">
                </div>
                <p>New to SoundSpot? <router-link class="signup" to="/signup">Sign up now</router-link></p>
                <input @click="login" type="submit" value="Login">
            </form>
        </div>
    </div>  
      `,

  methods: {
    async login(e) {
      e.preventDefault();

      const userData = {
        email: this.email,
        password: this.password,
      };

      try {
        const res = await axios.post(
          "http://localhost:5000/api/user/login",
          userData
        );
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          this.$router.push({ name: "home" });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },

  data() {
    return {
      email: "",
      password: "",
    };
  },

  created() {},
};
