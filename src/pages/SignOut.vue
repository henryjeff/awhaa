<template>
</template>

<script>
export default {
  name: "SignOut",
  beforeCreate: function () {
    if (this.$session.exists()) {
      if(this.$session.has('session_id') == true){
        this.$session.destroy()
        let self = this
        self.$router.push("/");
      } else {
        console.log("Error Signing out")
        this.$router.push("/error");
      }
    } else {
      this.$router.push("/");
    }
  },
}
</script>
