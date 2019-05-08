<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Welcome</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <ion-container>
        <ion-button shape="round" fill="outline" @click="goToSignIn">Sign In</ion-button>
      </ion-container>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: "Index",
  beforeCreate: function () {
    if (this.$session.exists()) {
      this.$router.push('/home')
    }
  },
  methods: {
    goToSignIn () {
      this.$session.destroy()
      this.$session.start()
      this.$router.push('/signin')
    }
  }
}
</script>

<style>
</style>
