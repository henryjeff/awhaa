<template>
  <div>
    <ion-card-subtitle>Number of Meals</ion-card-subtitle>
    <ion-item class="no-item-padding ">
      <ion-button class="small-button" shape="round" fill="outline" @click="addToMealCount(-5)" color="danger">
        <p>-5</p>
      </ion-button>
      <ion-button class="small-button" shape="round" fill="outline" @click="addToMealCount(-1)" color="danger">
        <p>-1</p>
      </ion-button>
      <ion-input style="text-align:center;" type="number" :value="num_meals" @input="num_meals = $event.target.value"></ion-input>
      <ion-button class="small-button" shape="round" fill="outline" @click="addToMealCount(1)" primary>
        <p>+1</p>
      </ion-button>
      <ion-button class="small-button" shape="round" fill="outline" @click="addToMealCount(5)" primary>
        <p>+5</p>
      </ion-button>
    </ion-item>
  </div>
</template>

<script>
export default {
  name: "MealCounter",
  data() {
    return {
      num_meals: 1
    }
  },
  props: {
    meal: Object
  },
  watch: {
    num_meals: function(new_num) {
      this.$emit('update-meal-count',new_num)
    }
  },
  methods: {
    addToMealCount(num) {
      this.num_meals = parseInt(this.num_meals) + num
      if(this.num_meals < 1) this.num_meals = 1
    }
  }
}
</script>

<style>
.add-buttons{
  margin-bottom: 10px;
}
.small-button{
  width: 43px;
  height: 50px;
  font-size: 23px;
  padding-bottom: 7px;
}
.small-button > p {
  font-size: 14px;
}
</style>
