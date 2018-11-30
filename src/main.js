import Vue from 'vue';
import App from './App.vue';

import AttrPlugin from "gsap/AttrPlugin";

// eslint-disable-next-line no-unused-vars
const GsapPlugins = [AttrPlugin];

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
