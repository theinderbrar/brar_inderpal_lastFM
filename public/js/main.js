import Home from "./components/Home.js"
import LoginPage from "./components/LoginPage.js";
import SignUpPage from "./components/SignUpPage.js";
import ArtistsPage from "./components/ArtistsPage.js";
import MyAlbums from "./components/MyAlbums.js";
import MyArtists from "./components/MyArtists.js";

const app = Vue.createApp({});

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUpPage
        },
        {
            path: '/artists',
            name: 'artists',
            component: ArtistsPage
        },
        {
            path: '/my-albums',
            name: 'myalbums',
            component: MyAlbums
        },
        {
            path: '/my-artists',
            name: 'myartists',
            component: MyArtists
        }
    ]
})

app.use(router);
app.mount("#app");