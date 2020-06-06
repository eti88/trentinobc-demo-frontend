<template>
  <v-layout
    column
  >
    <v-flex xs12 class="align-stretch">
      <VFileList />
    </v-flex>
      <v-bottom-sheet v-model="sheet" inset>
        <v-sheet class="text-center" height="200px">
          <v-btn
            class="mt-6"
            text
            color="error"
            @click="sheet = !sheet"
          >
            close
          </v-btn>
          <div class="my-3">
            TODO
          </div>
        </v-sheet>
      </v-bottom-sheet>
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
  components: { VFileList, VUploadModal },
  data: () => ({
    sheet: false
  })
}
</script>
