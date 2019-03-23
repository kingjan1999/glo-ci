<template>
  <div>
    <b-form-group
      label="GitLab Endpoint"
      label-for="gitEndpoint"
      description="Endpoint of the GitLab instance (ex. https://gitlab.com/"
    >
      <b-input
        id="gitEndpoint"
        required
        v-validate="'required|url:require_protocol'"
        name="gitEndpoint"
        :state="validateState('gitEndpoint')"
        :value="value.gitEndpoint"
        @input="(value) => emitEvent('gitEndpoint', value)"
      />
      <b-form-invalid-feedback id="gitEndpointFeedback">This is a required field and must be an url.</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      label="Trigger Token"
      label-for="gitlabToken"
      description="Create a new trigger on the CI/CD settings page of your GitLab project."
    >
      <b-input
        id="gitlabToken"
        required
        name="gitlabToken"
        :value="value.gitlabToken"
        @input="(value) => emitEvent('gitlabToken', value)"
        :state="validateState('gitlabToken')"
        v-validate="'required'"
      />
      <b-form-invalid-feedback id="gitlabTokenFeedback">This is a required field.</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group
      label="Project ID"
      label-for="projectId"
      description="It's part of the urls given on the page where you created the trigger above."
    >
      <b-input
        id="projectId"
        required
        name="projectId"
        :value="value.projectId"
        @input="(value) => emitEvent('projectId', value)"
        :state="validateState('projectId')"
        v-validate="'required|numeric'"
      />
      <b-form-invalid-feedback id="projectIdFeedback">This is a required field und must be numeric.</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group label="Git Ref" label-for="gitRef" description="A branch or tag to build">
      <b-input
        id="gitRef"
        required
        name="gitRef"
        :value="value.gitRef"
        @input="(value) => emitEvent('gitRef', value)"
        :state="validateState('gitRef')"
        v-validate="'required'"
      />
      <b-form-invalid-feedback id="gitRefFeedback">This is a required field.</b-form-invalid-feedback>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'GitlabSettings',
  props: ['value'],
  inject: ['parentValidator'],
  created () {
    this.$validator = this.parentValidator
  },
  methods: {
    emitEvent (key, value) {
      this.$emit('input', { ...this.value, [key]: value })
    },
    validateState (ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.errors.has(ref)
      }
      return null
    }
  }
}
</script>

<style scoped>
</style>
