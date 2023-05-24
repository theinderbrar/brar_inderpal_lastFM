export default{
    name:'BottomNav',

    template:
        `
        <div class="bottom-navbar">
            <a href="#" class="nav-item">
                <i class="material-icons">home</i>
                <p>Home</p>
            </a>
            <a href="#" class="nav-item">
                <i class="material-icons">album</i>
                <p>Albums</p>
            </a>
            <a href="#" class="nav-item">
                <i class="material-icons">person</i>
                <p>Artists</p>
            </a>
            <a @click="logout" href="#" class="nav-item">
                <i class="material-icons">logout</i>
                <p>Logout</p>
            </a>
        </div>
        `,

        methods:{
            logout(e){
                e.preventDefault()
                localStorage.removeItem("user")
                this.$router.push({name:"login"})
            }
        }
        
}