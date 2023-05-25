export default{
    name:'BottomNav',

    template:
        `
        <div class="bottom-navbar">
            <a @click="goToHome" href="#" class="nav-item">
                <i class="material-icons">home</i>
                <p>Home</p>
            </a>
            <a @click="goToMyAlbums" href="#" class="nav-item">
                <i class="material-icons">album</i>
                <p>Albums</p>
            </a>
            <a @click="goToMyArtists" href="#" class="nav-item">
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
            },
            goToHome(e){
                e.preventDefault();
                this.$router.push({name:"home"})
            },
            goToMyAlbums(e){
                e.preventDefault();
                this.$router.push({name:"myalbums"})
            },
            goToMyArtists(e){
                e.preventDefault();
                this.$router.push({name:"myartists"})
            },
        }
        
}