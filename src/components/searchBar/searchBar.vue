<template>
  <v-card color="red lighten-2" dark>
    <div class="navBar">
      <v-card-title class="headline red lighten-3">
        搜尋公司名稱
      </v-card-title>
      <div class="searchBar">
        <v-card-text>
          <v-autocomplete
            v-model="model"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            color="white"
            hide-no-data
            hide-selected
            item-text="Description"
            item-value="API"
            label="搜尋公司名稱"
            placeholder="請輸入關鍵字"
            prepend-icon="mdi-database-search"
            return-object
          >
          </v-autocomplete>
        </v-card-text>
        <v-expand-transition>
          <v-list
            v-if="model"
            class="red lighten-3"
          >
            <v-list-item
              v-for="(field, i) in fields"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title v-text="field.value"></v-list-item-title>
                <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expand-transition>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!model"
          color="grey darken-3"
          @click="model = null"
        >Clear
          <v-icon right>
            mdi-close-circle
          </v-icon>
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>

export default {
  data() {
    return{
      companyName: [],
      descriptionLimit: 60,
      entries: [],
      imageUrl: '',
      isLoading: false,
      model: null,
      search: null,
    }
  },
  computed: {
    fields () {
      if (!this.model) return []
      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || 'n/a',
        }
      })
    },
    items () {
      return this.entries.map(entry => {
        const Description =`${entry["2. name"]} | ${entry["1. symbol"]}`
          this.companyName.push(Description)
        return Object.assign({}, entry, { Description })
      })
    },
  },

  watch: {
    model(type){
      console.log(type)
      if(!type){
        this.$store.dispatch('sendSwitch', false)
      }
    },
    search (value) {
      if(value){
      this.isLoading = true
      this.entries.length = 0
      this.axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${value}&apikey=4BZ4I65PMOT2H14B`)
        .then(res => {
          if(res.data.bestMatches){
          this.count = res.data.bestMatches.length
          this.entries = res.data.bestMatches}
          if(this.companyName.includes(value)){
            const searchSymbol = value.split(' | ').pop()
            this.searchCompany(searchSymbol)
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
      }else{
        this.model = null
      }
    },
  },
  methods:{
    searchCompany(value){
      this.$store.dispatch('getStockData', value)
    }
  }
};
</script>
<style scoped lang="scss">
$color: white;
.navBar{
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.searchBar{
  width: 80%;
}
</style>