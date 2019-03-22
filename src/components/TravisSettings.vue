<template>
  <div>
    <b-form-group
      label="CI Token"
      label-for="travisToken"
      description="Get it on your travis profile page"
    >
      <b-input
        @input="(value) => fetchRepos('travisToken', value)"
        id="travisToken"
        required
        v-model="value.travisToken"
      />
    </b-form-group>
    <b-form-group label="Select endpoint" label-for="travisEndpoint">
      <b-form-select
        @input="(value) => fetchRepos('travisEndpoint', value)"
        id="travisEndpoint"
        :options="endpoints"
        required
        v-model="value.travisEndpoint"
      />
    </b-form-group>
    <b-form-group label="Select repository to trigger" label-for="travisRepo">
      <b-form-select
        @input="(value) => fetchBranches('travisRepo', value)"
        :disabled="!value.travisToken || !value.travisEndpoint"
        id="travisRepo"
        :options="repos"
        required
        v-model="value.travisRepo"
      />
    </b-form-group>
    <b-form-group label="Select branch to build" label-for="travisBranch">
      <b-form-select
        @input="(value) => emitEvent('travisBranch', value)"
        :disabled="!value.travisToken || !value.travisEndpoint || !value.travisRepo"
        id="travisBranch"
        :options="branches"
        required
        :value="value.travisBranch"
      />
    </b-form-group>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  name: 'TravisSettings',
  props: ['value'],
  data () {
    return {
      endpoints: [
        { text: 'travis-ci.org (OSS)', value: 'https://api.travis-ci.org' },
        { text: 'travis-ci.com (Private)', value: 'https://api.travis-ci.com' }
      ],
      repos: [],
      branches: []
    }
  },
  methods: {
    async fetchRepos (key, newValue) {
      this.emitEvent(key, newValue)
      if (!this.value.travisToken || !this.value.travisEndpoint) return
      const loader = this.$loading.show()
      let repoResponse = {}
      try {
        repoResponse = await axios.get(this.value.travisEndpoint + '/repos', {
          headers: {
            'Travis-API-Version': 3,
            Authorization: 'token ' + this.value.travisToken
          }
        })
      } catch (err) {
        console.log(err)
        this.$swal(
          'Error!',
          'An error occured while fetching your repositories!',
          'error'
        )
        loader.hide()
        return
      }
      const repos = repoResponse.data.repositories
      this.repos = repos
        .filter(x => x.active)
        .map(({ id, slug }) => ({ value: id, text: slug }))
      loader.hide()
    },
    async fetchBranches (key, newValue) {
      this.emitEvent(key, newValue)
      if (
        !this.value.travisToken ||
        !this.value.travisEndpoint ||
        !this.value.travisRepo
      ) { return }
      const loader = this.$loading.show()
      const url =
        this.value.travisEndpoint +
        '/repo/' +
        this.value.travisRepo +
        '/branches'

      let branchesResponse = {}
      try {
        branchesResponse = await axios.get(url, {
          headers: {
            'Travis-API-Version': 3,
            Authorization: 'token ' + this.value.travisToken
          }
        })
      } catch (err) {
        console.log(err)
        this.$swal(
          'Error!',
          'An error occured while fetching your branches!',
          'error'
        )
        loader.hide()
        return
      }
      const branches = branchesResponse.data.branches
      this.branches = branches
        .filter(x => x.exists_on_github)
        .map(({ name }) => ({ value: name, text: name }))
      loader.hide()
    },
    emitEvent (key, value) {
      this.$emit('input', { ...this.value, [key]: value })
    }
  }
}
</script>

<style scoped>
</style>
