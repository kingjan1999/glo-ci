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
    </b-form>
  </div>
</template>

<script>
const axios = require('axios')
const proxyUrl = 'http://localhost:3000/v1/gitkraken/proxy'
const idNameMapper = ({ name, id }) => ({
  text: name,
  value: id
})

export default {
  name: 'add',
  components: {},
  data () {
    return {
      token: '',
      form: {
        board: null,
        columnTrigger: null,
        columnSuccess: null,
        columnFailed: null
      },
      boards: [],
      allBoards: [],
      columns: []
    }
  },
  created () {
    this.token = localStorage.getItem('token')
    if (!this.token) {
      this.$router.push('/?unauth=true')
    }
    this.fetchData()
  },
  methods: {
    async fetchData () {
      this.allBoards = (await axios.get(proxyUrl + '/boards', {
        headers: {
          Authorization: 'Bearer ' + this.token
        },
        params: {
          fields: ['columns', 'name', 'id']
        }
      })).data
      this.boards = this.allBoards.map(idNameMapper)
    },
    updateColumns (boardId) {
      const board = this.allBoards.find(x => x.id === boardId)
      this.columns = board.columns.map(idNameMapper)
    },
    onSubmit () {}
  }
}
</script>
