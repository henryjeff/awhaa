<template>
  <div id="app">
    <ion-app  v-if="!loading">
      <ion-vue-router />
    </ion-app>
  </div>
</template>

<script>
import axios from "axios";
import { EventBus } from './events';

export default {
  name: 'App',
  data() {
    return {
      loading: true
    }
  },
  mounted() {
    setTimeout(async () => {
      this.startLoading({'self':self, 'dont_load':true});
    }, 0);
    this.checkSession();
    EventBus.$on('start-loading', data => {
      this.startLoading(data)
    })
    EventBus.$on('success-toast', data => {
      this.successToast(data)
    })
    EventBus.$on('danger-toast', data => {
      this.dangerToast(data)
    })
  },
  methods: {
    async checkSession() {
      console.log("checking session")
      if(!this.$session.exists()){
        console.log("session doesn't exist")
        this.loading = false
        this.$router.push("/");
        return
      } else {
        if(this.$session.get('session_id') == undefined){
          console.log("session is bad")
          this.loading = false
          this.$session.destroy()
          this.$router.push("/")
        } else if (this.$session.get('session_id') != undefined && this.$store.state.user == undefined) {
          let self = this
          this.$store.dispatch("fetchUser", { 'user' : {gid : this.$session.get('session_id')}, 'signin' : true})
            .then((response) => {
              this.loading = false
              console.log("refreshed user")
            })
        } else {
          this.loading = false
          console.log("all else is good")
        }
      }
    },
    async startLoading(payload) {
      if(!payload.dont_load) payload.self.loading = true
      return await this.$ionic.loadingController.create({
        message: "Loading",
        duration: 100000,
      }).then(a => {
        a.present().then(() => {
          this.checkLoading(payload.self, a, payload.redirect, 0)
        });
      });
    },
    checkLoading(self, a, redirect, times) {
      let me = this
      if(times * 10 >= 100000){
        a.dismiss()
        this.$router.push('/error/ERR_TIMEOUT')
        return
      }
      if (self.loading) {
        setTimeout(function() {
          times += 1
          me.checkLoading(self, a, redirect, times)
        }, 10)
      } else {
        a.dismiss()
        if(redirect != undefined){
          this.$router.push(redirect)
        }
      }
    },
    async successToast (payload) {
      const toast = await this.$ionic.toastController.create({
        message: payload.message,
        color: "primary",
        duration: 3000
      })
      await toast.present();
    },
    async dangerToast (payload) {
      const toast = await this.$ionic.toastController.create({
        message: payload.message,
        color: "danger",
        duration: 3000
      })
      await toast.present();
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
  text-align: center;
}
</style>
