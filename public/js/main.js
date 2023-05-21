import Home from "./components/Home.js"

const app = Vue.createApp({});

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        }
    ]
})

app.use(router);
app.mount("#app");