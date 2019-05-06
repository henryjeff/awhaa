<template>
  <g-signin-button
    :params="googleSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    <i class="fab fa-google"></i>
    Sign in with Google
  </g-signin-button>
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
          if(response.data.message == "No user found"){
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
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 15px 15px;
  border-radius: 50px;
  background-color: #3c82f7;
  color: #fff;
  margin-top: 10px;
  /* box-shadow: 0 3px 0 #0f69ff; */
  font-size: 16px;
}
.fa-google{
  padding-right:10px;
}
</style>
