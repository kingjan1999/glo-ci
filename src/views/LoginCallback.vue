<template>
  <div></div>
</template>

<script>
const qs = require('qs')

export default {
  name: 'getstarted',
  components: {},
  async created () {
    const parsedQuery = qs.parse(window.location.search, {
      ignoreQueryPrefix: true
    })
    console.log(parsedQuery)
    const token = parsedQuery.token
    localStorage.setItem('token', token)

    await this.$swal('Login successful', 'Your login was successful', 'success')
    this.$router.push('/manage')
  }
}
</script>
