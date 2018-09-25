import Vue from 'vue';
import App from './App.vue';

import VueResource from 'vue-resource';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

Vue.use(VueResource);

window.$ = window.jQuery = require('jquery');
global.Tether = require('tether');
require('bootstrap');

new Vue({
    render: h => h(App)
}).$mount('#app');
