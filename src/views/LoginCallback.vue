<template>
  <div></div>
</template>

<script>
import { setToken } from '@/util/auth.js'
const qs = require('qs')

export default {
  name: 'logincallback',
  components: {},
  async created () {
    const parsedQuery = qs.parse(window.location.search, {
      ignoreQueryPrefix: true
    })
    console.log(parsedQuery)
    const token = parsedQuery.token
    setToken(token)

    await this.$swal('Login successful', 'Your login was successful', 'success')
    this.$router.push('/manage')
  }
}
</script>
