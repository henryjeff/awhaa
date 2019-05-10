<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button primary @click="toRoute('/')">
            <ion-icon slot="icon-only" color="primary" name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button primary>
            <ion-icon slot="icon-only" color="primary" name="help-circle-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Sign In</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <ion-title>
        Sign In with Google
      </ion-title>
      <ion-title>
        <p style="font-size:14px;">to continue with awhaa</p>
      </ion-title>
      <GoogleSignInButton/>
    </ion-content>
  </div>
</template>

<script>
import GoogleSignInButton from '@/components/GoogleSignInButton'

export default {
  name: "SignIn",
  components: {
    GoogleSignInButton,
  },
  methods: {
    toRoute(route) {
      this.$router.push(route);
    },
  }
}
</script>

<style>
</style>
