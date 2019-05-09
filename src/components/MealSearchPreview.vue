<template>
  <ion-card>
    <div style="padding: 7px;">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-card-subtitle style="text-align:left!important">{{meal.calories}} calories</ion-card-subtitle>
            <ion-card-title style="text-align:left!important">{{meal.name}}</ion-card-title>
          </ion-col>
          <ion-col align-self-end style="text-align:right!important">
            <ion-chip color="primary" outline="true" @click="routeToMeal()">
              <ion-icon name="restaurant"color="primary"></ion-icon>
              <ion-label>Prepare</ion-label>
            </ion-chip>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>
  </ion-card>
</template>

<script>
export default {
  name: "MealSearchPreview",
  data () {
    return {
      formatted_times: ""
    }
  },
  props: {
    meal: Object
  },
  methods: {
    routeToMeal(){
      this.$router.push(`/meals/overview/${this.meal._id}`)
    }
  }
}
</script>

<style>
.card{
  border-radius: 10px;
  text-align: left;
}
</style>
