<template>
  <ion-app>
    <ion-page class="show-page">
      <ion-header>
        <ion-toolbar>
          <ion-title>Event</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="content" padding>
        <ion-item>
          <ion-thumbnail slot="start">
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
          </ion-thumbnail>
            <ion-list>
              <ion-item>
                <ion-label style="font-size:20px; font-weight:bold">{{eventName}}</ion-label>
              </ion-item>
              <ion-item>
                <ion-label>{{eventLoc}}</ion-label>
              </ion-item>
            </ion-list>
        </ion-item>
        <ion-row style="height:100px"/>
        <ion-button @click="toggleTracking()" full>Toggle Tracking</ion-button>
      </ion-content>
    </ion-page>
  </ion-app>
</template>
<script>
import axios from "axios";

export default {
  name: 'EventDisplay',
  props: ['eventName','publicID','eventLoc'],
  methods: {
    data() {
      return {
        tracking_text: "Join Cleanup"
      }
    },
    beforeCreate: function () {
      if (!this.$session.exists()) {
        this.$session.destroy()
        this.$router.push("/");
      }
      pubID = this.publicID
      userID = this.$session.get("session_id")
    },
    toggleTracking() {
      if(!this.$session.has('is_tracking')){
        this.$session.set('is_tracking', true)
        this.$session.set('current_event', this.publicID)
      }else{
        if(this.$session.get('is_tracking') == true){
          this.$session.set('is_tracking', false)
          this.$session.set('current_event', null)
        }else{
          this.$session.set('is_tracking', true)
          this.$session.set('current_event', this.publicID)
        }
      }
    }
  }
}
</script>
<style>
</style>
