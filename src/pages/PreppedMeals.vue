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
            <ion-icon slot="icon-only" color="primary" name="help-circle-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <ion-segment class="border-bottom">
        <ion-segment-button checked v-if="showing == 'avalible'">
          <ion-label>Avalible Meals</ion-label>
        </ion-segment-button>
        <ion-segment-button @click="updateMeals('avalible')" v-else-if="showing == 'archive'">
          <ion-label>Avalible Meals</ion-label>
        </ion-segment-button>
        <ion-segment-button checked v-if="showing == 'archive'">
          <ion-label>Eaten Meals</ion-label>
        </ion-segment-button>
        <ion-segment-button @click="updateMeals('archive')" v-else-if="showing == 'avalible'">
          <ion-label>Eaten Meals</ion-label>
        </ion-segment-button>
      </ion-segment>
      <hr>
      <hr>
      <div v-if="loading === true">
        <ion-spinner name="crescent" color="primary"></ion-spinner>
      </div>
      <div v-else-if="meals.length === 0">
        <ion-card-subtitle>No meals found...</ion-card-subtitle>
      </div>
      <div v-else-if="meals !== []" v-for="(meal, index) in meals" v-bind:key="index">
        <PreppedMealPreview :preppedmeal='meal'></PreppedMealPreview>
      </div>
    </ion-content>
  </div>
</template>

<script>
import { EventBus } from '../events';

import PreppedMealPreview from '@/components/PreppedMealPreview'

export default {
  name: "PreppedMeals",
  data() {
    return {
      loading: true,
      showing: "avalible",
      meals: []
    }
  },
  components: {
    PreppedMealPreview
  },
  created() {
    this.fetchAllPreppedMeals(false)
  },
  methods: {
    toRoute(route) {
      this.$router.push(route);
    },
    updateMeals(e) {
      this.showing = e
      if(e == "avalible"){
        this.fetchAllPreppedMeals(false)
      } else {
        this.fetchAllPreppedMeals(true)
      }
    },
    fetchAllPreppedMeals(eaten) {
      this.loading = true
      this.$store.dispatch("fetchPreppedMeals", {'user' : {'id' : this.$store.state.user._id}, 'eaten' : eaten})
        .then((response) => {
          this.loading = false
          this.meals = response.data
          if(response.data.length == 0) this.meals = []
        })
    },
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
