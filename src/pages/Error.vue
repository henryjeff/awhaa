<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Error</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <div class="vcenter">
        <!-- <BounceLoader/> -->
        <ion-title>Oh No!</ion-title>
        <p>Something has gone wrong, probably on us<br> Sorry about that...</p>
        <!-- <ion-row style="height:20px"/> -->
        <ion-button full round @click="toSafty">Back To Safty</ion-button>
      </div>
    </ion-content>
  </div>
</template>
<script>
// import { BounceLoader } from '@saeris/vue-spinners'

export default {
  name: "Error",
  // components: {
  //   BounceLoader
  // },
  methods: {
    toSafty(){
      this.$router.push("/")
    }
  }
}

</script>

<style>
.vcenter{
  margin-top: 40%;
}
</style>
