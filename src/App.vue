<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  created() {
    this.timeout();
  },
  methods: {
    timeout: function() {
      let self = this;
      setTimeout(function () {
          console.log("polling")
          if(self.$session.exists()){
            if(self.$session.has('is_tracking') && self.$session.has('session_id')){
              // console.log("we are going to track you")
              if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                  console.log("making api call")
                  axios.post("/api/loc?lat=" + position.coords.latitude + "&long=" + position.coords.longitude + "&event_id=" + self.$session.get('current_event') + "&user_id=" + self.$session.get('session_id') + "&date=" + Date.now().toString())
                  .then((response) => {
                    console.log(response)
                  })
                  .catch((errors) => {
                    console.log("Database Error: Pushing Location")
                    console.log(errors)
                  })
                })
              } else {
                console.log("geolocation not supported")
              }
            }
          }
          self.timeout();
       }, 30000);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
