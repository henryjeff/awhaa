<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="secondary">
          <ion-button fill="outline">
            <ion-icon slot="start" name="star"></ion-icon>
            Star
          </ion-button>
        </ion-buttons>
        <ion-title>Outline Buttons</ion-title>
        <ion-buttons slot="primary">
          <ion-button color="danger" fill="outline">
            Edit
            <ion-icon slot="end" name="create"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <ion-button shape="round" fill="outline" @click="goToSignOut">Sign Out</ion-button>
    </ion-content>
  </div>
</template>

<script>

export default {
  name: "UserSettings",
  methods: {
    goToSignOut () {
      return this.$ionic.loadingController
        .create({
          message: 'Loading',
          duration: 1000,
        })
        .then(l => {
          this.$router.push('/signout')
          checkIfSignedOut(loader)
          return l.present()
        })
    },
    checkIfSignedOut(loader) {
      if(!this.$session.exists()){
        setTimeout(function() {
          checkIfSignedOut()
        }, 10)
      } else {
        loader.dismiss()
      }
    }
  }
}
</script>

<style>
</style>
