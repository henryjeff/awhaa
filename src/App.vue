<template>
  <div id="app">
    <ion-app>
      <ion-vue-router />
    </ion-app>
  </div>
</template>

<script>
import axios from "axios";
import { EventBus } from './events';

export default {
  name: 'App',
  created() {
    this.checkSession();
  },
  mounted() {
    let self = this
    EventBus.$on('start-loading', data => {
      self.startLoading(data)
    })
  },
  methods: {
    checkSession() {
      console.log("checking session")
      if(!this.$session.exists()){
        console.log("session doesn't exist")
        this.$router.push("/");
        return
      } else {
        if(this.$session.get('session_id') == undefined){
          console.log("session is bad")
          this.$session.destroy()
          this.$router.push("/")
        } else if (this.$session.get('session_id') != undefined && this.$store.state.user == undefined) {
          this.$store.dispatch("fetchUser", { 'user' : {gid : this.$session.get('session_id')}, 'signin' : true})
            .then((response) => {
              console.log(response.data)
              console.log("refreshed user")
              this.$router.push("/home")
            })
        } else {
          console.log("all else is good")
          this.$router.push("/home")
        }
      }
    },
    async startLoading(payload) {
      // console.log("started")
      payload.self.loading = true
      return await this.$ionic.loadingController.create({
        message: "Loading",
        duration: 5000,
      }).then(a => {
        a.present().then(() => {
          this.checkLoading(payload.self, a, payload.redirect)
        });
      });
    },
    checkLoading(self, a, redirect) {
      if (self.loading) {
        setTimeout(function() {
          this.checkLoading(self, a, redirect)
        }, 100)
      } else {
        a.dismiss()
        router.push(redirect)
      }
    },
  // methods: {
  //   timeout: function() {
  //     let self = this;
  //     setTimeout(function () {
  //         console.log("polling")
  //         if(self.$session.exists()){
  //           if(self.$session.has('is_tracking') && self.$session.has('session_id')){
  //             // console.log("we are going to track you")
  //             if(navigator.geolocation) {
  //               navigator.geolocation.getCurrentPosition(function(position){
  //                 console.log("making api call")
  //                 axios.post("/api/loc?lat=" + position.coords.latitude + "&long=" + position.coords.longitude + "&event_id=" + self.$session.get('current_event') + "&user_id=" + self.$session.get('session_id') + "&date=" + Date.now().toString())
  //                 .then((response) => {
  //                   console.log(response)
  //                 })
  //                 .catch((errors) => {
  //                   console.log("Database Error: Pushing Location")
  //                   console.log(errors)
  //                 })
  //               })
  //             } else {
  //               console.log("geolocation not supported")
  //             }
  //           }
  //         }
  //         self.timeout();
  //      }, 30000);
  //   }
  // }
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  /* -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
