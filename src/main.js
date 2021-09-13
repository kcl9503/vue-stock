import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import vuetify from "./plugins/vuetify";
import HighchartsVue from 'highcharts-vue'
import Highcharts from "highcharts";
import Stock from "highcharts/modules/stock";
Stock(Highcharts);
Vue.use(HighchartsVue)

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
