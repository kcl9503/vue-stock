import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import vuetify from "./plugins/vuetify";

// import VueMoment from 'vue-moment'
// import moment from 'moment-timezone'
// Vue.use(VueMoment, {
//     moment,
// })

import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import stockInit from 'highcharts/modules/stock'
import exportingInit from 'highcharts/modules/exporting'
stockInit(Highcharts)
exportingInit(Highcharts);
Vue.use(HighchartsVue)

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
