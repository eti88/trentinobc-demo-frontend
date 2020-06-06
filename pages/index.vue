<template>
  <v-layout
    column
  >
    <v-flex xs12 class="align-stretch">
      <VFileList />
    </v-flex>
    <VUploadModal />
  </v-layout>
</template>

<script>
import VFileList from '~/components/general/FileList.vue'
import VUploadModal from '~/components/Modals/UploadNewFiles.vue'

export default {
  middleware ({ store, redirect }) {
    // If the user is not authenticated
    if (typeof store.state.auth === 'undefined' || !store.state.auth.loggedIn) {
      return redirect('/login')
    }
  },
  layout: 'authenticated',
  components: { VFileList, VUploadModal }
}
</script>
