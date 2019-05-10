<template>
  <div>
    <ion-item class="no-item-padding">
      <ion-textarea placeholder="Enter any notes about these meals here..." @input="$emit('update-meal-notes',$event.target.value)"></ion-textarea>
    </ion-item>
  </div>
</template>

<script>
export default {
  name: "MealInformation",
}
</script>
