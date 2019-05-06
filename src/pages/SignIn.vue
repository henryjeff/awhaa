<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
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
}
</script>

<style>
</style>
