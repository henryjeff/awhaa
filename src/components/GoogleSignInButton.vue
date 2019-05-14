<template>
  <div>
    <script src="https://apis.google.com/js/api:client.js"></script>
    <div v-on:start-loading="si()"/>
    <ion-button shape="round" fill="outline">
      <g-signin-button
        :params="googleSignInParams"
        @success="onSignInSuccess"
        @error="onSignInError">
        <i class="fab fa-google"></i>
        Sign in with Google
      </g-signin-button>
    </ion-button>
  </div>
</template>

<script>
import { EventBus } from '../events';

export default {
  name: "GoogleSignInButton",
  data () {
    return {
      googleSignInParams: {
        client_id: '889061426778-8stvujmooeeuduncj5f3ouiep7iplt1r.apps.googleusercontent.com'
      },
      loading: false
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      const profile = googleUser.getBasicProfile()

      if(this.$session.exists()){
        this.$session.destroy()
      }

      var user = {
        gid: profile.Eea,
        username: profile.ig.toLowerCase().replace(/ /g,"_") + profile.Eea.toString().substr(profile.Eea.toString().length - 5),
        first: profile.ofa,
        last: profile.wea,
        email: profile.U3,
      }

      EventBus.$emit('start-loading', {'self':this,'redirect':'/home'})

      this.$store.dispatch("fetchUser", {'user':user,'signin':true})
        .then((response) => {
          if(response.data.gid != user.gid){
            this.$store.dispatch("postUser", {'user':user})
              .then((response) => {
                this.$session.start()
                this.loading = false;
                this.$session.set('session_id', user.gid)
              })
          } else {
            this.$session.start()
            this.loading = false;
            this.$session.set('session_id', user.gid)
          }
        })
    },
    onSignInError (error) {
      this.$router.push('/error/ERR_GOOG_SIGN_IN')
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
