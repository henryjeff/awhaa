<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button primary @click="toRoute('/home')">
            <ion-icon slot="icon-only" color="primary" name="arrow-back"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Add Prepared Meals</ion-title>
        <ion-buttons slot="primary">
          <ion-button primary @click="toRoute('/home')">
            <ion-icon slot="icon-only" color="primary" name="information-circle-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <div style="text-align:left!important;">
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
      </div>
      <div v-else-if="results.length === 0">
        <ion-card-subtitle>No dishes found...</ion-card-subtitle>
      </div>
      <div v-else-if="results !== []" v-for="(meal, index) in results" class="fade-in-item" v-bind:key="index">
        <MealSearchPreview :meal='meal' class="fade-in-item"></MealSearchPreview>
      </div>
    </ion-content>
  </div>
</template>

<script>
import MealSearchPreview from '@/components/MealSearchPreview'

export default {
  name: "MealsSearch",
  data() {
    return {
      loading: false,
      search: "",
      results: [],
      total_results: 0,
    }
  },
  components: {
    MealSearchPreview
  },
  created() {
    this.fetchAllMeals()
    this.debouncedFetchSearch = _.debounce(this.fetchSearch, 250)
  },
  watch: {
    search: function (new_search, old_search) {
      this.loading = true
      this.debouncedFetchSearch()
    }
  },
  methods: {
    toRoute(route) {
      this.$router.push(route);
    },
    fetchAllMeals() {
      this.$store.dispatch("fetchMeals", { 'name': ''})
        .then((response) => {
          this.loading = false
          this.total_results = response.data.length
          this.results = response.data
          if(response.data.length == 0) this.results = []
        })
    },
    fetchSearch() {
      if(this.search == "") {
        this.results = []
        this.loading = false
        return
      }
      if(this.search == "*" || this.search == "all"){
        this.fetchAllMeals()
        return
      }
      this.$store.dispatch("fetchMeals", { 'name': this.search})
        .then((response) => {
          this.loading = false
          this.results = response.data
          if(response.data.length == 0) this.results = []
        })
    }
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
