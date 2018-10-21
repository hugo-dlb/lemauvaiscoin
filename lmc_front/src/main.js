import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Vue from 'vue';
import App from './App.vue';

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Listing from './components/Listing';
import CreateListingForm from './components/CreateListingForm';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';

Vue.use(VueResource);
Vue.use(VueRouter);

window.$ = window.jQuery = require('jquery');
global.Tether = require('tether');
require('bootstrap');

export const bus = new Vue();

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
    },
    {
        path: '/sign-up',
        name: 'signUp',
        component: SignUpForm
    },
    {
        path: '/login',
        name: 'login',
        component: LoginForm
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
