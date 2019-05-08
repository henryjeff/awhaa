<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button primary @click="toRoute('/home')">
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
      <ion-button shape="round" fill="outline" @click="toRoute('/signout')">Sign Out</ion-button>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: "UserSettings",
  methods: {
    toRoute(route){
      this.$router.push(route)
    }
  }
}
</script>

<style>
</style>
