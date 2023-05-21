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
                      <label> Password </label>
                      <input type="text" v-model="password">
                  </div>
                  <p>Already have an account? <router-link class="signup" to="/login">Login now</router-link></p>
                  <input type="submit" value="Register">
              </form>
          </div>
      </div>  
        `,
  
    methods: {},
  
    data() {
      return {
        email: "",
        password: "",
        name:""
      };
    },
  
    created() {},
  };
  