<template>
  <div id="app">
    <b-navbar>
      <b-navbar-brand to="/">
        <img src="@/assets/hatchful/logo_transparent.png" class="d-inline-block align-top"> Glo CI
      </b-navbar-brand>

      <b-navbar-toggle target="nav_collapse"/>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="header-footer-link" to="/">Home</b-nav-item>
          <b-nav-item class="header-footer-link" to="/manage">Manage</b-nav-item>
          <b-nav-item class="header-footer-link" to="/how-to">How To</b-nav-item>
          <b-nav-item class="header-footer-link" @click="logout" v-if="loggedIn">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="container">
      <router-view/>
    </div>
    <footer class="page-footer">
      <div class="container">
        <ul>
          <li>
            <router-link class="header-footer-link" to="/about">About</router-link>
          </li>
          <li>
            <router-link class="header-footer-link" to="/imprint">Imprint</router-link>
          </li>
        </ul>
        <p class="copyright">
          This site is not affiliated with Glo, GitKraken or Axosoft, LLC.
          <br>&copy; Jan Beckmann 2019
        </p>
      </div>
      <cookie-law
        theme="dark-lime"
        message="When logged in, this website uses a cookie or a similar storage techniques to keep you logged in.
        This is an essential cookie. Additionally, your cookie preference is stored."
      ></cookie-law>
    </footer>
  </div>
</template>
<script>
import CookieLaw from 'vue-cookie-law'
import { hasValidToken, clearToken } from '@/util/auth.js'

export default {
  name: 'app',
  components: { CookieLaw },
  computed: {
    loggedIn () {
      return hasValidToken()
    }
  },
  methods: {
    logout () {
      clearToken()
      window.location.reload(true)
    }
  }
}
</script>

<style scoped>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
} */
/* #nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */

.navbar-brand > img {
  height: 1.5em;
  padding-right: 0.5em;
}

#app > .container {
  margin-top: 2em;
  margin-bottom: 2em;
}
</style>
