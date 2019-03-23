<template>
  <div>
    <b-button variant="warning" :href="authUrl">Login with GitKraken</b-button>
  </div>
</template>

<script>
import { BACKEND_URL } from '@/vars.js'
const qs = require('qs')

export default {
  name: 'getstarted',
  components: {},
  computed: {
    authUrl () {
      const path = BACKEND_URL + '/auth/login/gitkraken'
      const callbackUrl =
        window.location.protocol +
        '//' +
        window.location.host +
        '/login-callback'
      return (
        path + qs.stringify({ callback: callbackUrl }, { addQueryPrefix: true })
      )
    }
  },
  data () {
    return {
      BACKEND_URL
    }
  }
}
</script>
