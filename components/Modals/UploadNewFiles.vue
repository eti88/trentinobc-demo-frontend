<template>
  <v-dialog v-model="dialog" max-width="600px" persistent>
    <v-card>
      <v-layout row wrap justify-end>
        <v-flex shrink>
          <v-btn
            @click="close"
            text
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-container align-center justify-center wrap>
        <v-row>
          <v-col cols="12">
            <h2 class="headline mb-5">
              Test salvataggio file caricamento
            </h2>
            <h4 class="subtitle">Dimensioni massime file 4MB</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-form ref="form" @submit.prevent="onSubmit($event)">
              <ValidationProvider v-slot="{ errors }" rules="required|size:4096" name="files">
                <v-file-input
                  v-model="files"
                  :error="errors != undefined && errors.length > 0"
                  :error-count="1"
                  :error-messages="errors[0]"
                  :show-size="1024"
                  color="deep-purple accent-4"
                  counter
                  label="File input"
                  multiple
                  prepend-icon="mdi-paperclip"
                  outlined
                >
                  <template v-slot:selection="{ index, text }">
                    <v-chip
                      v-if="index < 2"
                      color="deep-purple accent-4"
                      dark
                      label
                      small
                    >
                      {{ text }}
                    </v-chip>
                    <span
                      v-else-if="index === 2"
                      class="overline grey--text text--darken-3 mx-2"
                    >
                      +{{ files.length - 2 }} File(s)
                    </span>
                  </template>
                </v-file-input>
              </ValidationProvider>
            </v-form>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn
              @click="saveData"
              :loading="loading"
              color="success"
            >
              Upload
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { setTimeout } from 'timers'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ModalUpload',
  data () {
    return {
      files: []
    }
  },
  computed: {
    /**
     * Vuex Getters
     */
    ...mapGetters({
      dialog: 'txs/getModal',
      loading: 'txs/getLoading'
    })
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  methods: {
    ...mapActions({
      addFile: 'txs/addFile'
    }),
    close () {
      setTimeout(() => {
        this.files = []
      }, 500)
      this.$store.commit('txs/setModal', false)
    },
    async saveData () {
      let hasErrors = false
      if (this.files.length === 0) {
        this.$notifier.showMessage({ content: 'You must select some file.', color: 'warning' })
        return
      }

      Object.entries(this.$refs.form.errorBag).forEach((entry) => {
        if (entry[1]) {
          this.$notifier.showMessage({ content: 'Form has errors.', color: 'warning' })
          hasErrors = true
        }
      })

      if (hasErrors) {
        return
      }

      const formData = new FormData()
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i]
        formData.append(`files[${i}]`, file)
      }

      const isStatusOk = await this.addFile({ data: formData })
      if (!isStatusOk) {
        return
      }
      this.close()
    },
    onSubmit (e) {
      e.preventDefault()
    }
  }
}
</script>
