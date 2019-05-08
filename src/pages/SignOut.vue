<template>
</template>

<script>
import { EventBus } from '../events';

export default {
  name: "SignOut",
  data() {
    return {
      loading: false
    }
  },
  created () {
    EventBus.$emit('start-loading', {'self':this,'redirect':'/'})

    if (this.$session.exists()) {
      this.$session.destroy()
      this.loading = false
      this.$router.push('/')
    } else {
      this.$router.push('/error/ERR_SIGN_OUT');
    }
  },
}
</script>
