import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import moment from 'moment'

Vue.use(Vuex);

const stockDetail = new Vuex.Store({
  state: {
    companyStockData: [],
    chartBoolean: null
  },
  mutations: {
    pushData(state, data) {
      state.companyStockData = data
    },
    pushBoolean(state, data) {
      state.chartBoolean = data
    }
  },
  actions: {
    getStockData(actData, company) {
      return new Promise((resolve, reject) => {
        axios.default.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${company}&outputsize=full&apikey=4BZ4I65PMOT2H14B`)
          .then(res => {
            const responseData = res.data["Time Series (Daily)"]
            resolve(res)
            console.log(res)
            let formatData = Object.keys(responseData)
            let detailData = []
            formatData.forEach(d => {
              let timeStamp = moment(d).valueOf()
              let open = Number(responseData[d]["1. open"])
              let high = Number(responseData[d]["2. high"])
              let low = Number(responseData[d]["3. low"])
              let close = Number(responseData[d]["4. close"])
              let volume = Number(responseData[d]["5. volume"])
              detailData.push([timeStamp, open, high, low, close, volume])
            })
            detailData.sort((a, b) => {
              return a[0] - b[0]
            })
            this.commit('pushData', detailData)
          })
          .catch(err => reject(err));
      })
    },
    sendSwitch(actData, booleanType) {
      this.commit('pushBoolean', booleanType)
    }
  },
  getters: {
    stockDetail: state => {
      return state.companyStockData
    }
  },
  modules: {},
});
export default stockDetail
