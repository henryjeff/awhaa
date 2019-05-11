<template>
  <div v-if="loading === false">
    <div v-if="preppedmeal === undefined">
      <ion-card>
        <ion-card-header >
          <ion-card-title>You don't have any prepared meals</ion-card-title>
          <ion-card-subtitle>Add some meals to your inventory</ion-card-subtitle>
          <hr>
          <ion-button shape="round" fill="outline" primary @click="toRoute('/meals/search')">
            Add Meals
          </ion-button>
        </ion-card-header>
      </ion-card>
    </div>
    <div v-else>
      <ion-card>
        <ion-card-header class="border-bottom">
          <ion-card-title>{{preppedmeal.meal.name}}</ion-card-title>
          <ion-card-subtitle color="primary">{{preppedmeal.meal.calories}} calories</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content style="margin-top: 12px;">
          <MealInformation :meal='preppedmeal.meal'/>
          <MealRecipe :meal='preppedmeal.meal' :creator='creator'/>
          <MealExperationTimer style="padding-bottom:10px; margin-top: 16px;" :preppedmeal='preppedmeal'/>
        </ion-card-content>
        <div class="meal-timer">
          <ion-label class="timer-label" primary>
            53 minutes left
          </ion-label>
          <div class="timer-bar">
            <ion-progress-bar v-bind:value="0.6"></ion-progress-bar>
          </div>
        </div>
      </ion-card>
    </div>
  </div>
</template>

<script>
import MealExperationTimer from '@/components/MealOverview/MealExperationTimer'
import MealInformation from '@/components/MealOverview/MealInformation'
import MealRecipe from '@/components/MealOverview/MealRecipe'

export default {
  name: "NextMeal",
  data () {
    return {
      loading: true,
      preppedmeal: undefined,
      creator: ""
    }
  },
  components: {
    MealExperationTimer,
    MealInformation,
    MealRecipe
  },
  methods: {
    toRoute (route) {
      this.$router.push(route)
    },
    updateTimer () {
      var self = this;
      this.value += 0.1;
      if(this.value > 1.00){
        this.value = 0;
      }
      // setTimeout(function(){ self.updateTimer() }, 200);
    }
  },
  created () {
    // this.updateTimer();
    this.loading = true
    this.$store.dispatch("fetchNextMeal", {'user' : {'id' : this.$store.state.user._id}})
      .then((response) => {
        if(response.data.length == 0){
          this.loading = false
        } else {
          this.preppedmeal = response.data
          this.$store.dispatch("fetchMeal", {'id': this.preppedmeal.meal._id})
          .then((response) => {
            this.creator = response.data.created_by.name.first + " " + response.data.created_by.name.last
            this.loading = false
          })
        }
      })
  }
}
</script>
<style>
.card{
  border-radius: 10px;
  text-align: left;
}

.progress-bar-determinate{
  height: 5px;
  border-radius: 10px;
}

.meal-timer {
  border-top: 1px solid #dddddd;
  padding-top: 10px;
}

.timer-label{
  color: #3880ff;
  margin-bottom: 4px;
  padding-left: 16px;
}

.timer-bar{
  margin:16px;
  margin-top: 7px;
}

</style>
