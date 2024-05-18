const baseUrl = "https://pulsemaalerrestapi.azurewebsites.net/api/Persons/"// API URL
Vue.createApp({
    data() {
        return {
            allPersons: [],
            persons:[],
            person:[],
            name: null,
            loginUser: {
                username: '',
                password: ''
            },
            registerData: {
                username: '',
                email: '',
                password: '',
                fullName: '',
                address: ''
              }
        
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
          }, 
          
          showLoginModal() {
            const modal = new bootstrap.Modal(document.getElementById('loginModal'));
            modal.show();
          },  
          showRegisterModal() {
            const modal = new bootstrap.Modal(document.getElementById('registerModal'));
            modal.show();
          },
          login() {
            // Handle the login logic here, for example, using axios to send the login request
            axios.post('https://loginserver2.azurewebsites.net/api/Users/login', {
                Username: this.loginUser.username,
                Password: this.loginUser.password
            })
            .then(response => {
              // Handle successful login
              const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
              modal.hide();
              alert('Login successful!');
            })
            .catch(error => {
              // Handle login error
              alert('Login failed!');
            });
          }, 
          register() {
            // Handle the registration logic here, for example, using axios to send the registration request
            axios.post('https://loginserver2.azurewebsites.net/api/Users/register', {
                Username: this.registerData.username,
                Password: this.registerData.password,
                Email: this.registerData.email,
                FullName: this.registerData.fullName,
                Address: this.registerData.address
            })
            .then(response => {
              // Handle successful registration
              const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
              modal.hide();
              alert('Registration successful!');
            })
            .catch(error => {
              // Handle registration error
              alert('Registration failed!');
            });
          }
       

    }

}).mount("#app")