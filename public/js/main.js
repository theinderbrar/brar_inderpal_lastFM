import Home from "./components/Home.js";
import LoginPage from "./components/LoginPage.js";
import SignUpPage from "./components/SignUpPage.js";
import ArtistsPage from "./components/ArtistsPage.js";
import MyAlbums from "./components/MyAlbums.js";
import MyArtists from "./components/MyArtists.js";

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        isUser: true, // Mark as protected route
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
      meta: {
        isUser: false, // Exclude from protected routes
      },
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpPage,
      meta: {
        isUser: false, // Exclude from protected routes
      },
    },
    {
      path: "/artists",
      name: "artists",
      component: ArtistsPage,
      meta: {
        isUser: true, // Mark as protected route
      },
    },
    {
      path: "/my-albums",
      name: "myalbums",
      component: MyAlbums,
      meta: {
        isUser: true, // Mark as protected route
      },
    },
    {
      path: "/my-artists",
      name: "myartists",
      component: MyArtists,
      meta: {
        isUser: true, // Mark as protected route
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user");

  // Check if user is logged in
  if (user) {
    // Redirect to home if user is already logged in
    if (to.name === "login" || to.name === "signup") {
      next({ name: "home" });
    } else {
      // Allow navigation to the route
      next();
    }
  } else {
    // Redirect to login if user is not logged in
    if (to.meta.isUser) {
      next({ name: "login" });
    } else {
      // Allow navigation to non-protected routes
      next();
    }
  }
});

const app = Vue.createApp({});

app.use(router);
app.mount("#app");
