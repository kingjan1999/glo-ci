<template>
  <div>
    <h2>Manage your integrations</h2>
    <b-table :fields="tableFields" striped hover :items="tableItems">
      <template slot="more" slot-scope="data">
        <b-button-group class="mx-1">
          <!-- <b-button variant="warning" :to="'/edit/' + data.item.id">Edit</b-button> -->
          <b-button @click="deleteIntegration(data.item.id)" variant="danger">Delete</b-button>
        </b-button-group>
      </template>
    </b-table>
    <b-btn :to="'/add'">Add new</b-btn>
  </div>
</template>

<script>
import { BACKEND_URL } from '@/vars.js'
const axios = require('axios')

export default {
  name: 'manage',
  components: {},
  data () {
    return {
      integrations: [],
      token: '',
      tableFields: [
        'board',
        { key: 'ci_provider', label: 'CI Provider' },
        { key: 'webhook_url', label: 'Webhook URL' },
        'secret',
        'more'
      ]
    }
  },
  computed: {
    tableItems () {
      const readableProvider = {
        travis: 'Travis CI',
        gitlab: 'GitLab CI'
      }
      return this.integrations.map(integration => {
        return {
          id: integration._id,
          board: integration.board.name,
          secret: integration.secret,
          webhook_url: integration.webhook_url,
          ci_provider: readableProvider[integration.ciProvider]
        }
      })
    }
  },
  created () {
    this.token = localStorage.getItem('token')
    this.fetchData()
  },
  methods: {
    async fetchData () {
      const loader = this.$loading.show()
      try {
        const response = await axios.get(BACKEND_URL + '/integration', {
          headers: {
            Authorization: 'Bearer ' + this.token
          }
        })
        this.integrations = response.data.integrations || []
      } catch (err) {
        console.log(err)
        this.$swal(
          'Error!',
          'An error occured while trying to fetch your integrations!'
        )
      }
      loader.hide()
    },
    async deleteIntegration (id) {
      const sure = await this.$swal(
        'Are you sure to delete this integration?',
        {
          buttons: {
            cancel: 'No',
            yes: true
          },
          icon: 'warning'
        }
      )
      if (!sure) return
      const loader = this.$loading.show()
      try {
        const response = await axios.delete(
          BACKEND_URL + '/integration/' + id,
          {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }
        )
        console.log(response)
        this.$swal('Success', 'The integration has been deleted!', 'success')
      } catch (err) {
        this.$swal('Error!', 'Error while deleting this integration.', 'error')
      }
      loader.hide()
      this.fetchData()
    }
  }
}
</script>
