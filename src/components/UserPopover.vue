<template>
  <ion-list>
    <ion-list-header>
        <ion-label>User Options</ion-label>
    </ion-list-header>
    <ion-item href="#">
      <ion-label>
        My Statistics
      </ion-label>
      <ion-icon name="stats" slot="end"></ion-icon>
    </ion-item>
    <ion-item href="#" @click="toRoute('/mymeals/')">
      <ion-label>
        My Preppared Meals
      </ion-label>
      <ion-icon name="cube" slot="end"></ion-icon>
    </ion-item>
    <ion-item href="#">
      <ion-label>
        Settings
      </ion-label>
      <ion-icon name="settings" slot="end"></ion-icon>
    </ion-item>
    <ion-item href="#">
      <ion-label>
        Sign out
      </ion-label>
      <ion-icon name="arrow-back" slot="end"></ion-icon>
    </ion-item>
    <br>
  </ion-list>
</template>

<script>
import { EventBus } from '../events';

export default {
  name: "UserPopover",
  methods: {
    toRoute(route){
      EventBus.$emit('close-popover', route)
    }
  },
}
</script>

<style>
</style>
