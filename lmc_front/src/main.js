import Vue from 'vue';
import App from './App.vue';

import VueResource from 'vue-resource';

Vue.use(VueResource);

window.$ = window.jQuery = require('jquery');
require('semantic-ui-css/semantic.css');
require('semantic-ui-css/semantic.js');

new Vue({
    render: h => h(App)
}).$mount('#app');
