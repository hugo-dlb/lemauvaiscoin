<template>
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 class="my-0 mr-md-auto font-weight-normal">
            <router-link to="/">Le mauvais coin</router-link>
        </h5>
        <nav class="my-2 my-md-0 mr-md-3">
            <router-link v-if="loggedIn" to="/create-listing" class="p-2 text-dark mr-1">New listing</router-link>
            <router-link v-if="loggedIn" to="/my-listings" class="p-2 text-dark mr-1">My listings</router-link>
            <button type="button" v-if="loggedIn" v-on:click="logout" class="btn btn-danger">Logout</button>
            <router-link v-if="!loggedIn" to="/login" class="btn btn-outline-primary">Login</router-link>
            <router-link v-if="!loggedIn" to="/sign-up" class="btn btn-outline-primary">Sign Up</router-link>
        </nav>
    </div>
</template>

<script>
    import {bus} from '../main.js';
    import jwt_decode from 'jwt-decode';

    export default {
        name: 'Menu',
        data: function () {
            return {
                loggedIn: false
            }
        },
        mounted: function () {
            bus.$on('checkLogin', this.checkLoggedIn);
        },
        created: function () {
            this.checkLoggedIn();
        },
        methods: {
            checkLoggedIn: function () {
                const token = localStorage.getItem('token');
                if (token) {
                    const decodedToken = jwt_decode(token);
                    try {
                        this.assertAlive(decodedToken);
                        this.loggedIn = true;
                    } catch (error) {
                        this.loggedIn = false;
                    }
                } else {
                    this.loggedIn = false;
                }
            },
            assertAlive: function (decoded) {
                const now = Date.now().valueOf() / 1000
                if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
                    throw new Error(`token expired: ${JSON.stringify(decoded)}`)
                }
                if (typeof decoded.nbf !== 'undefined' && decoded.nbf > now) {
                    throw new Error(`token expired: ${JSON.stringify(decoded)}`)
                }
            },
            logout: function () {
                localStorage.removeItem('token');
                this.loggedIn = false;
                this.$router.push('home');
            }
        }
    }
</script>

<style>
    .shadow-sm {
        box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
    }
    .border-bottom {
        border-bottom: 1px solid #dee2e6 !important;
    }
    .btn {
        margin-right: 3px;
    }
</style>