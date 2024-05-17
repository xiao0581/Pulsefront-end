const baseUrl = "https://pulsemaalerrestapi.azurewebsites.net/api/Persons/"// API URL
Vue.createApp({
    data() {
        return {
            allPersons: [],
         persons:[],
         person:[],
        name: null
        
        }
    },  
    computed: {
        hvilePulsFiltereds() {
            if (!this.person || !this.person.pulsHistories) {
                return [];
            }
            return this.person.pulsHistories.filter(history => history.hvilePuls !== 0);
        },
        aktivPulsFiltered() {
            if (!this.person || !this.person.pulsHistories) {
                return [];
            }
            return this.person.pulsHistories.filter(history => history.aktivPuls !== 0);
        },
        afterTrainingPulsFiltered() {
            if (!this.person || !this.person.pulsHistories) {
                return [];
            }
            return this.person.pulsHistories.filter(history => history.afterTrainingPuls !== 0);
        },
        stresspulsFiltered() {
            if (!this.person || !this.person.pulsHistories) {
                return [];
            }
            return this.person.pulsHistories.filter(history => history.stresspuls !== 0);
        },
        
    }, 
    methods: {
        async getbyName(name) { // get all persons from API
            try {
                const response = await axios.get(baseUrl+name.toLowerCase()+"/histories")
                this.person = await response.data
               
                console.log(this.persons)
            } catch (ex) {
                alert(ex.message) 
            }
        },
        formatDate(datetime) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            return new Date(datetime).toLocaleDateString(undefined, options);
          },
          formatTime(datetime) {
            const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
            return new Date(datetime).toLocaleTimeString(undefined, options);
          }
       

    }

}).mount("#app")