const baseUrl = "https://pulsemaalerrestapi.azurewebsites.net/api/Persons/"// API URL
Vue.createApp({
    data() {
        return {
            allPersons: [],
            persons:[],
            person:[],
            name: null,
            pulseType: '',
            user: null,
            currentUser: null,
            loginUser: {
                username: '',
                password: ''
            },
            registerData: {
                username: '',
                password: '',
                email: '',
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
        
        filteredPulse() {
          if (!this.person || !this.person.pulsHistories) {
              return [];
          }
          return this.person.pulsHistories.filter(history => history[this.pulseType] !== 0);
      }
        
    }, 

    methods: {
        // get persons pulse data
        async getbyName(name) { 
            try {
               
                const response = await axios.get(baseUrl+name.toLowerCase()+"/histories")
                this.person = await response.data
                this.drawChart();
                console.log("Filtered Pulse Data: ", this.filteredPulse);
               
                
            } catch (ex) {
                alert(ex.message) 
            }
        },
       
          //google chart drawchart
        drawChart() {
          google.charts.load('current', { packages: ['corechart'] });
          google.charts.setOnLoadCallback(this.renderChart);
      },
      // google chart 
      renderChart() {
          if (!this.filteredPulse || this.filteredPulse.length === 0) {
              console.log("No data to display.");
              return;
          }

          
          console.log("Pulse Type: ", this.pulseType);
          console.log("Filtered Pulse Data: ", this.filteredPulse);

          const data = google.visualization.arrayToDataTable([
              ['Date', this.pulseType],
              ...this.filteredPulse.map(history => [this.formatDate(history.recordTime), history[this.pulseType]])
          ]);

          const options = {
              title: `${this.pulseType.charAt(0).toUpperCase() + this.pulseType.slice(1)} Trend`,
              hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
              vAxis: { minValue: 0 }
          };

          const chart = new google.visualization.LineChart(document.getElementById('chart_div'));
          chart.draw(data, options);
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

          //login 
          login() {
            axios.post('https://loginserver2.azurewebsites.net/api/Users/login', {
                username: this.loginUser.username,
                password: this.loginUser.password
            })
            .then(response => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                modal.hide();
                alert('Login successful!');
                console.log(response.data.username);
                localStorage.setItem('username', response.data.username);
                window.location.reload(); // Refresh the page to show the user data
              
        
             
            })
            .catch(error => {
                alert('Login failed!');
            });
        },
        //logout
        logout() {
            this.currentUser = null;
            localStorage.removeItem('username');
            alert('Logout successful!');
        },

       //register
          register() {
            // Handle the registration logic here, for example, using axios to send the registration request
            axios.post('https://loginserver2.azurewebsites.net/api/Users/register', {
                username: this.registerData.username,
                password: this.registerData.password,
                email: this.registerData.email,
                fullName: this.registerData.fullName,
                address: this.registerData.address
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
          
          
       

    },
    
    mounted() {
      this.pulseType = document.getElementById('app').getAttribute('data-pulse-type');
      this.currentUser = localStorage.getItem('username');
      if (this.currentUser) {
          console.log("current user: " + this.currentUser);
          // 
          this.getbyName(this.currentUser);
      } else {
          console.log("not found user");
      }
     
        
  }

}).mount("#app")