<template>
  <ion-app>
    <ion-page class="show-page">
      <ion-header>
        <ion-toolbar>
          <ion-title>Dashboard</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="content" padding>
        <ion-input placeholder="Event Name" required></ion-input>
        <ion-item>
          <!-- <ion-label>Date</ion-label> -->
          <!-- <ion-datetime picker-format="DD MMMM YYYY HH:mm"></ion-datetime> -->
        </ion-item>
        <ion-button @click="goToEventCreate()" full>Submit</ion-button>
        <ion-row style="height:100px"/>
      </ion-content>
    </ion-page>
  </ion-app>
</template>
<script>

export default {
  name: 'Dash',
  methods: {
    data() {
      return {
        buttonDisplay: "Start Cleanup"
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$session.destroy()
        this.$router.push("/");
      }
    },
    goToEventCreate() {
      this.$router.push("/eventcreate")
    }
  }
}
</script>
<style>
</style>
