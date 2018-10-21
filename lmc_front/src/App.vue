<template>
    <div id="app">
        <Menu/>
        <router-view></router-view>
    </div>
</template>

<script>
    import Menu from './components/Menu.vue';
    import Listing from './components/Listing.vue';
    import CreateListingForm from './components/CreateListingForm.vue';
    import SignUpForm from './components/SignUpForm.vue';
    import LoginForm from './components/LoginForm.vue';
    import {
        AuthenticationService
    } from './services/authentication-service';
    import jwt_decode from 'jwt-decode';
    import {
        bus
    } from './main.js';

    export default {
        name: 'app',
        components: {
            Menu,
            Listing,
            CreateListingForm,
            SignUpForm,
            LoginForm
        },
        watch: {
            $route(home, login) {
                bus.$emit('checkLogin');
            }
        }
    };

</script>

<style>
    html,
    body {
        font-size: 14px !important;
    }

    @media (min-width: 768px) {
        html,
        body {
            font-size: 16px !important;
        }
    }

</style>
