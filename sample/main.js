import Vue from 'vue';

import AttrPlugin from 'gsap/AttrPlugin';
import TextPlugin from 'gsap/TextPlugin';
import App from './App.vue';

// eslint-disable-next-line no-unused-vars
const GsapPlugins = [AttrPlugin, TextPlugin];

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
