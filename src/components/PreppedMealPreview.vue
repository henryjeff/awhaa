<template>
  <ion-card class="fade-in-item">
    <div style="padding: 7px;">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-card-subtitle style="text-align:left!important">{{preppedmeal.meal.calories}} calories</ion-card-subtitle>
            <ion-card-title style="text-align:left!important">{{preppedmeal.meal.name}}</ion-card-title>
          </ion-col>
          <ion-col align-self-end style="text-align:right!important">
            <ion-chip class="no-end-margin" color="primary" outline="true" @click="routeToMeal()">
              <ion-icon name="information-circle-outline"color="primary"></ion-icon>
              <ion-label>More Info</ion-label>
            </ion-chip>
          </ion-col>
        </ion-row>
        <MealExperationTimer :preppedmeal='preppedmeal'/>
      </ion-grid>
    </div>
  </ion-card>
</template>

<script>
import MealExperationTimer from '@/components/MealOverview/MealExperationTimer'

export default {
  name: "PreppedMealPreview",
  props: {
    preppedmeal: Object
  },
  components: {
    MealExperationTimer
  },
  methods: {
    routeToMeal(){
      this.$router.push(`/mymeals/overview/${this.preppedmeal._id}`)
    },
  }
}
</script>

<style>
.card{
  border-radius: 10px;
  text-align: left;
}
</style>
