<template>
  <div>
    <b-button variant="warning" :href="BACKEND_URL + '/auth/login/gitkraken'">Login with GitKraken</b-button>
  </div>
</template>

<script>
import { BACKEND_URL } from '@/vars.js'

export default {
  name: 'getstarted',
  components: {},
  data () {
    return {
      BACKEND_URL
    }
  }
}
</script>
