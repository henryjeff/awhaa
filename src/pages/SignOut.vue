<template>
</template>

<script>
export default {
  name: "SignOut",
  created () {
    if (this.$session.exists()) {
      if(this.$session.has('session_id') == true){
        this.$session.destroy()
        this.$router.push('/');
        return
      } else {
        console.log("Error Signing out")
        this.$router.push('/error');
      }
    } else {
      this.$session.destroy()
      this.$router.push('/');
    }
  },
}
</script>
