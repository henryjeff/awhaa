<template>
  <ion-button shape="round" fill="outline">
    <g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError">
      <i class="fab fa-google"></i>
      Sign in with Google
    </g-signin-button>
  </ion-button>
</template>

<script>
import axios from "axios";

export default {
  name: "GoogleSignInButton",
  data () {
    return {
      googleSignInParams: {
        client_id: '889061426778-8stvujmooeeuduncj5f3ouiep7iplt1r.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      const profile = googleUser.getBasicProfile()

      var user = {
        gid: profile.Eea,
        username: profile.ig.toLowerCase().replace(/ /g,"_") + profile.Eea.toString().substr(profile.Eea.toString().length - 5),
        first: profile.ofa,
        last: profile.wea,
        email: profile.U3,
      }

      axios.get(`/api/users/${user.gid}`)
        .then((response) => {
          if(response.data.gid != user.gid){
            axios.post("/api/users/", user)
                .then((response) => {
                    this.$session.set('session_id', user.gid)
                    this.$router.push('/home')
                })
                .catch((errors) => {
                    console.log("Database Error: Creating User")
                    console.log(errors)
                    this.$router.push('/error')
                })
          } else {
            this.$session.set('session_id', user.gid)
            this.$router.push('/home')
          }
        })
        .catch((errors) => {
          console.log("Database Error: Getting User")
          console.log(errors)
          this.$router.push('/error')
        })
    },
    onSignInError (error) {
      console.log("Google Error: Can't Sign In User")
      console.log(error)
      this.$router.push('/error')
    }
  }
}
</script>
<style>
.small-logo{
  width:30%;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
