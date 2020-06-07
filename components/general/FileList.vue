<template>
  <v-content>
    <v-list
      two-line
      subheader
    >
      <v-subheader inset>
        Files
      </v-subheader>
      <v-list-item-group v-model="item" color="primary">
        <VFileItem
          v-for="item in files"
          :key="item.title"
          :value="item"
          class="item"
          @updateMeta="updatedInfo"
        />
        </v-list-item-group>
      </v-list>
      <v-bottom-sheet v-model="sheet" inset>
        <v-sheet class="text-center" height="400px">
          <v-btn
            class="mt-6"
            text
            color="error"
            @click="sheet = !sheet"
          >
            close
          </v-btn>
          <div class="my-2">
            Informations
          </div>
          <div class="my-2 scrollable-y">
            <tree-view :data="meta" :options="{maxDepth: 4}"></tree-view>
          </div>
        </v-sheet>
      </v-bottom-sheet>
  </v-content>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VFileItem from '~/components/general/FileItem.vue'

export default {
  components: { VFileItem },
  async fetch () {
    await this.fetchTxs()
    this.files = this.list
    console.log(`Loaded ${this.files.length} items.`)
  },
  fetchOnServer: false,
  data () {
    return {
      files: [],
      sheet: false,
      meta: {}
    }
  },
  computed: {
    /**
     * Vuex Getters
     */
    ...mapGetters({
      loading: 'txs/getLoading',
      list: 'txs/getList'
    })
  },
  watch: {
    item (n) {
      this.$store.commit('txs/setItem', n)
    }
  },
  methods: {
    ...mapActions({
      reset: 'txs/reset',
      fetchTxs: 'txs/fetchTxs'
    }),
    updatedInfo (val) {
      console.log('-- event update --')
      this.meta = val
      this.sheet = true
    }
  }
}
</script>

<style scoped>
  .item:hover {
    background: #8686861f;
  }
  .scrollable-y {
    overflow-y: auto;
    height: inherit;
  }
</style>
