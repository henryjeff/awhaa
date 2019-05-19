<template>
  <div class="ion-page">
    <ion-content class="content" padding>
      <div class="vcenter">
        <ion-title class="break-word">You appear to be on a computer</ion-title>
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
  width: 30%;
	height: 16%;
  position: absolute;
	top:0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}
.break-word {
  word-wrap: break-word!important;
  overflow: visible!important;
  text-overflow: none!important;
}
</style>
