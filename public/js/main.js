import Home from "./components/Home.js"
import LoginPage from "./components/LoginPage.js";

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
        }
    ]
})

app.use(router);
app.mount("#app");