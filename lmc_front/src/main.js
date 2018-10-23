import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Vue from 'vue';
import App from './App.vue';

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import Home from './components/Home';
import CreateListingForm from './components/CreateListingForm';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import ListingDetails from './components/ListingDetails';
import MyListings from './components/MyListings';

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
        component: Home
    },
    {
        path: '/create-listing',
        name: 'createListing',
        component: CreateListingForm
    },
    {
        path: '/listing/:id',
        name: 'listingDetails',
        component: ListingDetails
    },
    {
        path: '/my-listings',
        name: 'myListings',
        component: MyListings
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
