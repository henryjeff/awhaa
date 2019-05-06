<template>
  <ion-app>
    <ion-page class="show-page">
      <ion-header>
        <ion-toolbar>
          <ion-title>Sign in with Google</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="content" padding>
        <ion-row style="height: 20%"></ion-row>
        <ion-thumbnail slot="start">
          <img class='small-logo' :src='logo'></img>
        </ion-thumbnail>
        <ion-title>
          Sign in with Google
        </ion-title>
        <ion-title>
          <p style="font-size:14px;">to continue with Clean Up Crew</p>
        </ion-title>
        <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError">
          <i class="fab fa-google"></i>
          Sign in with Google
        </g-signin-button>
      </ion-content>
    </ion-page>
  </ion-app>
</template>
<script>
import Logo from "@/img/logo.png"
import axios from "axios";
export default {
  name: "GoogleSignIn",
  data () {
    return {
      logo: Logo,
      googleSignInParams: {
        client_id: '889061426778-8stvujmooeeuduncj5f3ouiep7iplt1r.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      const profile = googleUser.getBasicProfile() // etc etc
      var user_id = profile.Eea;
      var user_fullname = profile.ig;
      var user_email = profile.U3;

      var o_str = "";
      if(this.$session.get("is_organizer") == true){
        o_str = "&organizer=true";
      }
      axios.get("/api/user?id_token=" + user_id)
        .then((response) => {
          console.log(response.data);
          if(response.data == ""){
            axios.post("/api/user?id_token=" + user_id + "&name=" + user_fullname + "&email=" + user_email + o_str)
                .then((response) => {
                    console.log(response)
                    this.$session.set('session_id', user_id)
                    this.$session.set('name', user_fullname)
                    if(this.$session.get("is_organizer") == true) {
                      this.$router.push('/dash')
                    } else {
                      this.$router.push('/search')
                    }
                })
                .catch((errors) => {
                    console.log("Database Error: Creating User")
                    console.log(errors)
                    this.$router.push('/')
                })
          } else {
            this.$session.set('session_id', user_id)
            this.$session.set('name', user_fullname)
            if(this.$session.get("is_organizer") == true) {
              this.$router.push('/dash')
            } else {
              this.$router.push('/search')
            }
          }
        })
        .catch((errors) => {
          console.log("Database Error: Getting User")
          console.log(errors)
        })
        // axios.post("/api/user?id_token=" + user_id + "&name=" + user_fullname + "&email=" + user_email + o_str)
        //     .then((response) => {
        //         console.log(response)
        //         this.$session.set('session_id', user_id)
        //         this.$router.push('/search')
        //     })
        //     .catch((errors) => {
        //         console.log("Database Error: Creating User")
        //         console.log(errors)
        //         this.$router.push('/')
        //     })
    },
    onSignInError (error) {
      console.log('Big problem', error)
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
