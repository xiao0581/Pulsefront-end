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
        // viser ikke hvilepulse hvis der er 0
        hvilePulsFiltereds() {
            if (!this.person || !this.person.pulsHistories) {
                return [];
            }
            return this.person.pulsHistories.filter(history => history.hvilePuls !== 0);
        },
        // viser ikke aktivpuls hvis der  er 0
        aktivPulsFiltered() {
            if (!this.person || !this.person.pulsHistories) {
                return [];
            }
            return this.person.pulsHistories.filter(history => history.aktivPuls !== 0);
        },
        // viser ikke afterTrainingpuls hvis der er 0
        afterTrainingPulsFiltered() {
            if (!this.person || !this.person.pulsHistories) {
                return [];
            }
            return this.person.pulsHistories.filter(history => history.afterTrainingPuls !== 0);
        },
        // viser ikke stresspuls hvis der  er 0
        stresspulsFiltered() {
            if (!this.person || !this.person.pulsHistories) {
                return [];
            }
            return this.person.pulsHistories.filter(history => history.stresspuls !== 0);
        },
        
    }, 
    methods: {
        //  get persons history by name
        async getbyName(name) { 
            try {
                const response = await axios.get(baseUrl+name.toLowerCase()+"/histories")
                this.person = await response.data
               
                console.log(this.persons)
            } catch (ex) {
                alert(ex.message) 
            }
        },
        // Dateformat for visning dato
        formatDate(datetime) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            return new Date(datetime).toLocaleDateString(undefined, options);
          },
            // Dateformat for visning tid
          formatTime(datetime) {
            const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
            return new Date(datetime).toLocaleTimeString(undefined, options);
          }
       

    }

}).mount("#app")