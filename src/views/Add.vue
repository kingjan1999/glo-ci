<template>
  <div class="container">
    <h2>Add new integration</h2>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Glo Board" label-for="gloBoard">
        <b-form-select
          @change="updateColumns"
          id="gloBoard"
          :options="boards"
          required
          v-model="form.board"
        />
      </b-form-group>
      <b-form-group label="Trigger when moved in column" label-for="columnTrigger">
        <b-form-select
          :disabled="!form.board"
          id="columnTrigger"
          :options="columns"
          required
          v-model="form.columnTrigger"
        />
      </b-form-group>
      <b-form-group label="Move into column when job was successful" label-for="columnSuccess">
        <b-form-select
          :disabled="!form.board"
          id="columnSuccess"
          :options="columns"
          required
          v-model="form.columnSuccess"
        />
      </b-form-group>
      <b-form-group label="Move into column when job failed" label-for="columnFailed">
        <b-form-select
          :disabled="!form.board"
          id="columnFailed"
          :options="columns"
          required
          v-model="form.columnFailed"
        />
      </b-form-group>
      <b-form-group label="CI Provider" label-for="ciProvider">
        <b-form-radio-group
          id="ciProvider"
          v-model="form.ciProvider"
          :options="ciProviderOptions"
          name="ciProvider"
        />
      </b-form-group>
      <TravisSettings v-model="form.travisSettings" v-if="form.ciProvider === 'travis'"/>
      <GitlabSettings v-model="form.gitlabSettings" v-if="form.ciProvider === 'gitlab'"/>

      <b-button type="submit" variant="success">Add Integration</b-button>
    </b-form>
  </div>
</template>

<script>
import TravisSettings from '@/components/TravisSettings.vue'
import GitlabSettings from '@/components/GitlabSettings.vue'
import { BACKEND_URL } from '@/vars.js'
import { getToken } from '@/util/auth.js'

const axios = require('axios')
const proxyUrl = BACKEND_URL + '/gitkraken/proxy'
const idNameMapper = ({ name, id }) => ({
  text: name,
  value: id
})

export default {
  name: 'add',
  components: { TravisSettings, GitlabSettings },
  data () {
    return {
      token: '',
      form: {
        board: null,
        columnTrigger: null,
        columnSuccess: null,
        columnFailed: null,
        ciProvider: 'travis',
        travisSettings: {
          travisBranch: null,
          travisRepo: null,
          travisToken: '',
          travisEndpoint: null
        },
        gitlabSettings: {
          gitlabToken: '',
          projectId: '',
          gitRef: '',
          gitEndpoint: 'https://gitlab.com/'
        }
      },
      boards: [],
      allBoards: [],
      columns: [],
      ciProviderOptions: [
        { text: 'Travis CI', value: 'travis' },
        { text: 'GitLab CI', value: 'gitlab' }
      ]
    }
  },
  created () {
    this.token = getToken()
    this.fetchData()
  },
  methods: {
    async fetchData () {
      const loader = this.$loading.show()
      try {
        this.allBoards = (await axios.get(proxyUrl + '/boards', {
          headers: {
            Authorization: 'Bearer ' + this.token
          },
          params: {
            fields: ['columns', 'name', 'id']
          }
        })).data
        this.boards = this.allBoards.map(idNameMapper)
      } catch (err) {
        console.log(err)
        this.$swal(
          'Error',
          'An error occured while attempting to fetch your glo boards',
          'error'
        )
      }
      loader.hide()
    },
    updateColumns (boardId) {
      const board = this.allBoards.find(x => x.id === boardId)
      this.columns = board.columns.map(idNameMapper)
    },
    async onSubmit () {
      const loader = this.$loading.show()
      try {
        const response = await axios.post(
          BACKEND_URL + '/integration/',
          this.form,
          {
            headers: {
              Authorization: 'Bearer ' + this.token
            }
          }
        )
        const data = response.data
        console.log(data)
        await this.$swal(
          'Success!',
          'The integration has been created. The webhook url is: ' +
            data.webhook_url,
          'success'
        )
        this.$router.push('/manage')
      } catch (err) {
        this.$swal('Error', 'Error while submitting the integration.', 'error')
      }
      loader.hide()
    }
  }
}
</script>
