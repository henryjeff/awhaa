<template>
  <ion-app>
    <ion-page class="show-page">
      <ion-header>
        <ion-toolbar>
          <ion-title>Select the location of your cleanup:</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="content">
        <ion-content>
          <div id="map" style="width:100%; height:88%; margin:0 auto">
            <GmapMap v-bind:center="center" v-bind:zoom="7" style="height: 100%">
              <GMapMarker v-bind:position="center" v-bind:clickable="true" v-bind:draggable="true" v-bind:visible="true">
              </GMapMarker>
            </GMapMap>
            <div>
              <ion-button margin="30px" full>Submit</ion-button>
            </div>
          </div>
        </ion-content>
      </ion-content>
    </ion-page>
  </ion-app>
</template>


<script>
  export default {
    data() {
      return {
        center: { lat: 10, lng: 10 },
        // markers: [
        //   {
        //     position: { lat: 44, lng: -75.0 }
        //   },
        //   {
        //     position: { lat: 61.75, lng: 11.0 }
        //   },
        // ]
      };
    },

  };
</script>
