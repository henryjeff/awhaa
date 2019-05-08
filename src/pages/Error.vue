<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Error</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <div class="vcenter">
        <ion-title>Oh No!</ion-title>
        <p>Something has gone wrong, probably on us<br> Sorry about that...</p>
        <ion-button shape="round" fill="outline" @click="toSafty">Back To Safty</ion-button>
        <p class="error">{{this.$route.params.code}}</p>
      </div>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: "Error",
  methods: {
    toSafty(){
      this.$session.destroy()
      this.$router.push('/')
    }
  }
}
</script>

<style>
.vcenter{
  margin-top: 40%;
}
.error {
  font-size: 12px;
  color: #C6C6C6;
}
</style>
