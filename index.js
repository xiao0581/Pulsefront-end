const baseUrl = "https://pulsemaalerrestapi.azurewebsites.net/api/pulses"
Vue.createApp({
    data() {
        return {
            allPersons: [],
         persons:[],
         person:[],
        name: null
        
        }
    },
    async created() { // life cycle method. Called when browser reloads page
        this.getAll(baseUrl)
    },
    methods: {
        async getAll(baseUrl) {
            try {
                const response = await axios.get(baseUrl)
                this.allPersons = await response.data
                this.persons = this.allPersons
                console.log(this.allPersons)
                console.log(this.persons)
            } catch (ex) {
                alert(ex.message) 
            }
        },
        filterByName(name) {
          
            this.person = this.allPersons.filter(b => b.name.includes(name))
            console.log(this.person)
        }

    }

}).mount("#app")