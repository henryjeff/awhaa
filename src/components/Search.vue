<template>
  <ion-app>
    <ion-page class="show-page">
      <ion-header>
        <ion-toolbar>
          <ion-title>Search Cleanups</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="content" padding>
        <ion-label style="color:	#C0C0C0">Logged in as {{user}}</ion-label>
        <ion-thumbnail slot="start">
          <img class='small-logo' :src='logo'></img>
        </ion-thumbnail>
        <ion-title>Enter in an Event Name</ion-title>
        <ion-label>Enter in a event name to filter the events!</ion-label>
        <ion-item>
          <ion-input id='search' value='' placeholder="Unique Cleanup Name"></ion-input>
          <ion-button @click="searchItems()">Submit</ion-button>
        </ion-item>
        <ion-row style="height:20px"/>
        <ion-title>Find nearby Cleanups!</ion-title>
        <ion-label>Below are just some of the closest cleanups to you!</ion-label>
        <ion-list id="list" @onLo>
          <ion-item v-for="item of items" v-bind:key="item['public_id']">
            <ion-label @click="goToCleanup(item['event_name'], item['public_id'], item['address'])" full>{{item['event_name']}}</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-page>
  </ion-app>
</template>
<script>
import Logo from "@/img/logo.png"
import axios from "axios";

export default {
  name: 'Search',
  data() {
    return {
      logo: Logo,
      items: [],
      user: this.$session.get("name")
    }
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$session.destroy()
      this.$router.push("/");
    }
    axios.get("/api/all_events")
      .then((response) => {
        console.log(response.data);
        if(response.data == ""){
          console.log("No events populated")
        } else {
          this.items = response.data['event_arr'];
        }
      })
      .catch((errors) => {
        console.log("Database Error: Getting Event")
        console.log(errors)
      })
  },
  methods: {
    goToCleanup: function(eventName, publicID, eventLoc) {
      this.$router.push('/event/'+eventName+'/'+publicID+'/'+eventLoc)
    },
    searchItems () {
      let self = this
      this.items.forEach(function(element) {
        if(element['public_id'] == search.value) {
          self.goToCleanup(element['event_name'], element['public_id'], element['address'])
        }
      });
    }
  }
}
</script>

<style>
.small-logo{
  width:30%;
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
