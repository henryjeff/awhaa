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
      <div v-if="meals.length === 0">
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
      meals: []
    }
  },
  components: {
    PreppedMealPreview
  },
  created() {
    this.fetchAllPreppedMeals()
  },
  methods: {
    toRoute(route) {
      this.$router.push(route);
    },
    fetchAllPreppedMeals() {
      // EventBus.$emit('start-loading', {'self':this})
      this.$store.dispatch("fetchPreppedMeals", {'user':{'id':this.$store.state.user._id}})
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
