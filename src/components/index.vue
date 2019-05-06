<template>
  <ion-app>
    <ion-page class="show-page">
      <ion-header>
        <ion-toolbar>
          <ion-title>Index</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="content" padding>
        <ion-button @click="goToSignup" full>Go Home</ion-button>
      </ion-content>
    </ion-page>
  </ion-app>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
    goToSignup(){
       this.$router.push('signup')
   }
  }
}
</script>
