<template>
  <div>
    <b-form-group
      label="Trigger Token"
      label-for="gitlabToken"
      description="Create a new trigger on the CI/CD settings page of your GitLab project."
    >
      <b-input
        id="gitlabToken"
        required
        :value="value.gitlabToken"
        @input="(value) => emitEvent('gitlabToken', value)"
      />
    </b-form-group>
    <b-form-group
      label="Project ID"
      label-for="projectId"
      description="It's part of the urls given on the page where you created the trigger above."
    >
      <b-input
        id="projectId"
        required
        :value="value.projectId"
        @input="(value) => emitEvent('projectId', value)"
      />
    </b-form-group>
    <b-form-group label="Git Ref" label-for="gitRef" description="A branch or tag to build">
      <b-input
        id="gitRef"
        required
        :value="value.gitRef"
        @input="(value) => emitEvent('gitRef', value)"
      />
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'GitlabSettings',
  props: ['value'],
  methods: {
    emitEvent (key, value) {
      this.$emit('input', { ...this.value, [key]: value })
    }
  }
}
</script>

<style scoped>
</style>
