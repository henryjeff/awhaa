<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button primary @click="toBack">
            <ion-icon slot="icon-only" color="primary" name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>User Settings</ion-title>
        <ion-buttons slot="primary">
          <ion-button primary @click="toBack">
            <ion-icon slot="icon-only" color="primary" name="create"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <ion-button shape="round" fill="outline" @click="toSignOut">Sign Out</ion-button>
    </ion-content>
  </div>
</template>

<script>

export default {
  name: "UserSettings",
  methods: {
    toSignOut () {
      return this.$ionic.loadingController
        .create({
          message: 'Loading',
          duration: 1000,
        })
        .then(l => {
          this.checkIfSignedOut(l)
          this.$router.push('/signout')
          return l.present()
        })
    },
    checkIfSignedOut(loader) {
      if(!this.$session.exists()){
        setTimeout(function() {
          this.checkIfSignedOut(loader)
        }, 50)
      } else {
        loader.dismiss()
      }
    },
    toBack() {
      this.$router.push('/home')
    }
  }
}
</script>

<style>
</style>
