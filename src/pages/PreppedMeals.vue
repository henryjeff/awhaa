<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button primary @click="toRoute('/home')">
            <ion-icon slot="icon-only" color="primary" name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>My Prepared Meals</ion-title>
        <ion-buttons slot="primary">
          <ion-button primary @click="toRoute('/home')">
            <ion-icon slot="icon-only" color="primary" name="information-circle-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <!-- <div style="text-align:left!important;">
        <ion-title>
          Search
        </ion-title>
        <ion-title>
          <p style="font-size:14px;">Search for meals and add them to your inventory</p>
        </ion-title>
      </div>
      <ion-searchbar class="meal-search chip-outline" color="light" :value="search" @input="search = $event.target.value"></ion-searchbar>
      <ion-item class="results-label">
        <ion-card-subtitle>{{results.length}} results of {{total_results}} dishes</ion-card-subtitle>
      </ion-item>
      <hr>
      <div v-if="loading === true">
        <ion-spinner name="crescent" color="primary"></ion-spinner>
      </div>
      <div v-else-if="search === '' && results === []">
        <ion-card-subtitle>Start typing to search for dishes</ion-card-subtitle>
      </div> -->
      <div v-if="meals.length === 0">
        <ion-card-subtitle>No meals found...</ion-card-subtitle>
      </div>
      <div v-else-if="meals !== []" v-for="(meal, index) in meals" class="fade-in-item" v-bind:key="index">
        <PreppedMealPreview :meal='meal' class="fade-in-item"></PreppedMealPreview>
      </div>
    </ion-content>
  </div>
</template>

<script>
// import PreppedMealPreview from '@/components/PreppedMealPreview'

export default {
  name: "PreppedMeals",
  data() {
    return {
      loading: false,
      meals: []
    }
  },
  // components: {
  //   // PreppedMealPreview
  // },
  // created() {
  //   this.fetchAllPreppedMeals()
  // },
  methods: {
    toRoute(route) {
      this.$router.push(route);
    },
  //   fetchAllPreppedMeals() {
  //     this.$store.dispatch("fetchPreppedMeals", {'eaten':false})
  //       .then((response) => {
  //         this.loading = false
  //         this.preppedmeals = response.data
  //         if(response.data.length == 0) this.preppedmeals = []
  //       })
  //   },
  }
}
</script>

<style>
.searchbar-input.sc-ion-searchbar-md{
  border-radius: 100px!important;
  text-align: left!important;
}
.results-label{
  padding-right: 8px;
}

</style>
