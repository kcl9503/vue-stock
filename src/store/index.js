import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import moment from 'moment'

Vue.use(Vuex);

const stockDetail = new Vuex.Store({
  state: {
    companyStockData: []
  },
  mutations: {
    pushData(state, data) {
        //  console.log(state, data)
      state.companyStockData.push(data)
  //  console.log(state)
    }
  },
  actions: {
     getStockData() {
      return new Promise((resolve, reject) => {
        axios.default.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=demo`)
          .then(res => {
            const responseData = res.data["Time Series (Daily)"]
            resolve(res)
    
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
            this.commit('pushData', detailData)
          })
          .catch(err => reject(err));
      })
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
