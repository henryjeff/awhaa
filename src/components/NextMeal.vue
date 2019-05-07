<template>
  <ion-card>
    <ion-card-header>
      <ion-card-subtitle>Next Meal - 500 calories</ion-card-subtitle>
      <ion-card-title>Chicken Salad</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      Located In Fridge, Prep Info below:
      Microwave for 50 seconds
      <!-- <ion-spinner name="crescent"></ion-spinner> -->
      <!-- <ion-item>
        <ion-icon name="pin" slot="start"></ion-icon>
        <ion-label>ion-item in a card, icon left, button right</ion-label>
        <ion-button round slot="end">View</ion-button>
      </ion-item> -->
      <!-- <ion-item-divider>
        <ion-label>
          Eat by 1:01 pm
        </ion-label>
        <ion-label>
          Time left 53 minutes
        </ion-label>
      </ion-item-divider> -->
    </ion-card-content>
    <div class="meal-timer">
      <ion-label class="timer-label" primary>
        53 minutes left
      </ion-label>
      <div class="timer-bar">
        <ion-progress-bar v-bind:value="value"></ion-progress-bar>
      </div>
      <!-- <ion-item style="padding-right: 8px;"> -->
      <!-- </ion-item> -->
    </div>
    <!-- <ion-item> -->
    <!-- </ion-item> -->
    <!-- <ion-toolbar>
      <ion-button full @click="eatMeal"> Eat</ion-button>
    </ion-toolbar> -->
    <!-- <ion-toolbar>
     <ion-buttons slot="secondary">
       <ion-button>
         <ion-icon slot="icon-only" name="contact"></ion-icon>
       </ion-button>
       <ion-button>
         <ion-icon slot="icon-only" name="search"></ion-icon>
       </ion-button>
     </ion-buttons>
     <ion-buttons slot="primary">
       <ion-button color="secondary">
         <ion-icon slot="icon-only" name="more"></ion-icon>
       </ion-button>
     </ion-buttons>
     <ion-title>Default Buttons</ion-title>
   </ion-toolbar> -->
      <!-- <ion-button>
        Cancel
      </ion-button> -->
    <!-- <ion-toolbar>
      <ion-buttons slot="secondary">
        <ion-button>
          <ion-icon slot="icon-only" name="contact"></ion-icon>
        </ion-button>
        <ion-button>
          <ion-icon slot="icon-only" name="search"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-label>Default Buttons</ion-label>
      <ion-buttons slot="primary">
        <ion-button color="secondary">
          <ion-icon slot="icon-only" name="more"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar> -->
  </ion-card>
</template>

<script>

export default {
  name: "NextMeal",
  data () {
    return {
      value: 0.5
    }
  },
  methods: {
    updateTimer: function () {
      var self = this;
      this.value += 0.1;
      if(this.value > 1.00){
        this.value = 0;
      }
      // setTimeout(function(){ self.updateTimer() }, 200);
    }
  },
  created: function () {
    this.updateTimer();
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
