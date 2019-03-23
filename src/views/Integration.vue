<template>
  <div class="container">
    <h2 v-if="isEditing">Edit integration</h2>
    <h2 v-else>Add new integration</h2>
    <div v-if="isEditing" class="secrets">
      <strong>Webhook URL: &nbsp;</strong>
      <code>{{form.webhook_url}}</code>
      <br>
      <strong>Secret: &nbsp;</strong>
      <code>{{form.secret}}</code>
    </div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Glo Board" label-for="gloBoard">
        <b-form-select
          @change="updateColumns"
          v-validate="'required'"
          id="gloBoard"
          name="gloBoard"
          :options="boards"
          required
          :state="validateState('form.board')"
          v-model="form.board"
        />
        <b-form-invalid-feedback id="gloBoardFeedback">This is a required field</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Trigger when moved in column" label-for="columnTrigger">
        <b-form-select
          :disabled="!form.board"
          id="columnTrigger"
          name="columnTrigger"
          :options="columns"
          required
          v-model="form.columnTrigger"
          v-validate="'required'"
          :state="validateState('form.columnTrigger')"
        />
        <b-form-invalid-feedback id="columnTriggerFeedback">This is a required field</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Move into column when job was successful" label-for="columnSuccess">
        <b-form-select
          :disabled="!form.board"
          id="columnSuccess"
          name="columnSuccess"
          :options="columns"
          required
          v-model="form.columnSuccess"
          v-validate="'required'"
          :state="validateState('form.columnSuccess')"
        />
        <b-form-invalid-feedback id="columnSuccessFeedback">This is a required field</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="Move into column when job failed" label-for="columnFailed">
        <b-form-select
          :disabled="!form.board"
          id="columnFailed"
          name="columnFailed"
          :options="columns"
          required
          v-model="form.columnFailed"
          v-validate="'required'"
          :state="validateState('form.columnFailed')"
        />
        <b-form-invalid-feedback id="columnFailedFeedback">This is a required field</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="CI Provider" label-for="ciProvider">
        <b-form-radio-group
          id="ciProvider"
          v-model="form.ciProvider"
          :options="ciProviderOptions"
          name="ciProvider"
          v-validate="'required'"
          :state="validateState('form.ciProvider')"
        />
        <b-form-invalid-feedback id="ciProviderFeedback">This is a required field</b-form-invalid-feedback>
      </b-form-group>
      <TravisSettings v-model="form.travisSettings" v-if="form.ciProvider === 'travis'"/>
      <GitlabSettings v-model="form.gitlabSettings" v-if="form.ciProvider === 'gitlab'"/>

      <b-button type="submit" variant="success" :disabled="errors.any()">Save Integration</b-button>
    </b-form>
  </div>
</template>

<script>
import TravisSettings from '@/components/TravisSettings.vue'
import GitlabSettings from '@/components/GitlabSettings.vue'
import { getToken, getAxiosInstance } from '@/util/auth.js'

const proxyUrl = '/gitkraken/proxy'
const idNameMapper = ({ name, id }) => ({
  text: name,
  value: id
})

export default {
  name: 'integration',
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
  computed: {
    isEditing () {
      return !!this.$route.params.id
    }
  },
  created () {
    this.token = getToken()
    this.fetchData()
  },
  provide () {
    return { parentValidator: this.$validator }
  },
  methods: {
    async fetchData () {
      const loader = this.$loading.show()
      try {
        this.allBoards = (await getAxiosInstance().get(proxyUrl + '/boards', {
          params: {
            fields: ['columns', 'name', 'id']
          }
        })).data
        this.boards = this.allBoards.map(idNameMapper)
        if (this.isEditing) {
          this.form = (await getAxiosInstance().get(
            '/integration/' + this.$route.params.id
          )).data
          this.updateColumns(this.form.board)
        }
      } catch (err) {
        console.log(err)
        this.$swal(
          'Error',
          'An error occured while attempting to fetch data from backend',
          'error'
        )
      }
      loader.hide()
    },
    updateColumns (boardId) {
      const board = this.allBoards.find(x => x.id === boardId)
      this.columns = board.columns.map(idNameMapper)
    },
    validateState (ref) {
      // console.log('validating...')
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.errors.has(ref)
      }
      return null
    },
    async onSubmit () {
      await this.$validator.validateAll()
      if (this.errors.any()) return
      const loader = this.$loading.show()
      try {
        const response = await getAxiosInstance().post(
          '/integration/' + (this.isEditing ? this.form._id : ''),
          this.form
        )
        const data = response.data
        console.log(data)
        const verb = this.isEditing ? 'updated' : 'created'
        await this.$swal(
          'Success!',
          `The integration has been ${verb}. The webhook url is: ${
            data.webhook_url
          }. Please configure the webhooks.`,
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

<style lang="css" scoped>
.secrets {
  margin: 2em 0;
}
</style>
