<template>
  <div>Your login was successful!</div>
</template>

<script>
const qs = require('qs')

export default {
  name: 'getstarted',
  components: {},
  created: () => {
    const parsedQuery = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    console.log(parsedQuery)
    const token = parsedQuery.token
    localStorage.setItem('token', token)
  }
}
</script>
