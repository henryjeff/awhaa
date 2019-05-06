<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Home In</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <ion-title>
        Sign in Google $$$$$$$$$$$$$
      </ion-title>
      <ion-title>
        <p style="font-size:14px;">to continue with Clean Up Crew</p>
      </ion-title>
      <NextMeal/>
    </ion-content>
  </div>
</template>

<script>

import NextMeal from '@/components/NextMeal'

export default {
  name: "Home",
  components: {
    NextMeal
  }
}
</script>

<style>
</style>
