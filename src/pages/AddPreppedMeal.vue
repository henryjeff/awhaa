<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Add Prepared Meal</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content" padding>
      <br>
      <ion-searchbar class="meal-search"></ion-searchbar>
    </ion-content>
  </div>
</template>
<script>

export default {
  name: "AddPreppedMeal",
}

</script>

<style>

.searchbar-input.sc-ion-searchbar-md{
  border-radius: 100px!important;
  text-align: left!important;
}

</style>
