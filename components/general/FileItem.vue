<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-icon class="blue white--text">
        mdi-file
      </v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title v-text="value.fileName" />
      <v-list-item-subtitle v-text="value.created_at.substring(0, 10)" />
    </v-list-item-content>

    <v-list-item-action>
      <v-menu
        :close-on-click="closeOnClick"
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon color="grey lighten-1">
              mdi-dots-vertical
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            @click="onDownload(value)"
          >
            <v-list-item-title>
              Download
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="onShowInformation(value)"
          >
            <v-list-item-title>
              Informazioni
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    value: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      closeOnClick: true
    }
  },
  computed: {
    /**
     * Vuex Getters
     */
    ...mapGetters({
      getTx: 'txs/getItem'
    })
  },
  methods: {
    ...mapActions({
      reset: 'files/reset',
      fetchTx: 'files/fetchTx',
      downloadFile: 'files/downloadFile',
      fetchMeta: 'files/fetchMeta'
    }),
    async onShowInformation (item) {
      console.log('--- on info ---')
      const data = await this.fetchTx(item.hash)
      console.log(data)
      const meta = await this.fetchMeta(data.tx.msg.value.meta_uri)
      this.$emit('updateMeta', meta)
    },
    async onDownload (item) {
      console.log('--- on download ---')
      const data = await this.fetchTx(item.hash)
      const body = {
        originalName: item.originalName,
        ipfs: data.tx.msg.value.content_uri
      }
      this.downloadFile(body)
    }
  }
}
</script>
