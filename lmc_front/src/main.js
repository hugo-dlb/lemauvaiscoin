import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Vue from 'vue';
import App from './App.vue';

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Listing from './components/Listing';
import CreateListingForm from './components/CreateListingForm';

Vue.use(VueResource);
Vue.use(VueRouter);

window.$ = window.jQuery = require('jquery');
global.Tether = require('tether');
require('bootstrap');

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: Listing
    },
    {
        path: '/create-listing',
        name: 'createListing',
        component: CreateListingForm
    }
];

const router = new VueRouter({
    routes: routes
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});