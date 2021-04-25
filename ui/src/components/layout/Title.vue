<template>
  <v-row class="justify-center my-10">
    <v-col class="d-flex justify-center">
      <span class="display-2">{{ title }}</span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      default: 'Title',
    },
  },
}
</script>

<style>

</style>
