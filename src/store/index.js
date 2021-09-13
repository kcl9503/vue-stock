import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
     getDog() {
      return new Promise((resolve, reject) => {
        axios.default.get('https://dog.ceo/api/breeds/image/random')
          .then(res => {
            console.log(41561)
            resolve(res.data)
          })
          .catch(err => reject(err));
      })
    }
  },
  modules: {},
});
