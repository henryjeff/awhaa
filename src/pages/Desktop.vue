<template>
  <div class="ion-page">
    <ion-content class="content" padding>
      <div class="vcenter">
        <ion-title>You appear to be on a computer</ion-title>
        <p>Awhaa is currently only supported on mobile browsers</p>
        <ion-button shape="round" fill="outline" @click="refresh">Refresh Page</ion-button>
        <p class="error">{{this.$route.params.code}}</p>
      </div>
    </ion-content>
  </div>
</template>

<script>
export default {
  name: "Desktop",
  methods: {
    refresh(){
      this.$router.go('/')
    }
  }
}
</script>

<style>
.vcenter{
  margin-top: 40%;
}
</style>
