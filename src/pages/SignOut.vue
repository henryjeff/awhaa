<template>
</template>

<script>
export default {
  name: "SignOut",
  beforeCreate: function () {
    if (this.$session.exists()) {
      if(this.$session.has('session_id') == true){
        this.$session.destroy()
        this.$router.push("/");
      } else {
        console.log("Error Signing out")
        this.$router.push("/error");
      }
    }
    if (!this.$session.exists()) {
      this.$router.push("/");
    }
  },
}
</script>
