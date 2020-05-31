<template>
  <v-layout
    column
  >
    <v-flex xs12 class="align-stretch">
      <VFileList />
    </v-flex>
  </v-layout>
</template>

<script>
import VFileList from '~/components/general/FileList.vue'

export default {
  components: { VFileList }
}
</script>
