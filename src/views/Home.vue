<template>
  <div class="home">
    <b-jumbotron header="Glo CI" lead="CI Integration for GitKraken Glo">
      <p>
        With Glo CI you can trigger your CI / CD builds by moving a card in a specific column.
        When the build succeeds / fails the card can then be moved in another column.
        Supported providers are Gitlab CI and Travis CI.
      </p>
      <b-button variant="warning" :href="authUrl" v-if="!loggedIn">Login with GitKraken</b-button>
      <b-button variant="warning" :href="'/manage'" v-if="loggedIn">Manage your integrations</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
import { BACKEND_URL } from '@/vars.js'
import { hasValidToken } from '@/util/auth.js'
const qs = require('qs')

export default {
  name: 'home',
  components: {},
  computed: {
    loggedIn () {
      return hasValidToken()
    },
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
  }
}
</script>
