<template>
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 shadow-sm my-menu">
        <h5 class="my-0 mr-md-auto font-weight-normal">
            <router-link to="/" exact><img src="../img/logo.png" class="logo" alt="logo"/></router-link>
        </h5>
        <nav class="my-2 my-md-0 mr-md-3">
            <router-link v-if="loggedIn" to="/create-listing" class="p-2 mr-1 my-text" exact>New listing</router-link>
            <router-link v-if="loggedIn" to="/my-listings" class="p-2 mr-1 my-text" exact>My listings</router-link>
            <button type="button" v-if="loggedIn" v-on:click="logout" class="btn my-btn-danger" exact>Logout</button>
            <router-link v-if="!loggedIn" to="/login" class="btn my-info-btn mr-1" exact>Login</router-link>
            <router-link v-if="!loggedIn" to="/sign-up" class="btn my-info-btn" exact>Sign Up</router-link>
        </nav>
    </div>
</template>

<script>
    import {
        bus
    } from '../main.js';
    import jwt_decode from 'jwt-decode';

    export default {
        name: 'Menu',
        data: function() {
            return {
                loggedIn: false
            }
        },
        mounted: function() {
            bus.$on('checkLogin', this.checkLoggedIn);
        },
        created: function() {
            this.checkLoggedIn();
        },
        methods: {
            checkLoggedIn: function() {
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
            assertAlive: function(decoded) {
                const now = Date.now().valueOf() / 1000
                if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
                    throw new Error(`token expired: ${JSON.stringify(decoded)}`)
                }
                if (typeof decoded.nbf !== 'undefined' && decoded.nbf > now) {
                    throw new Error(`token expired: ${JSON.stringify(decoded)}`)
                }
            },
            logout: function() {
                localStorage.removeItem('token');
                this.loggedIn = false;
                this.$router.push('home');
            }
        }
    }

</script>

<style>
    .my-menu {
        background-color: #083358;
        position: relative;
    }

    .my-text {
        color: #f6f6f6;
        transition: all 0.15s ease-in-out;

    }

    .my-text:hover {
        color: #f6f6f6;
    }

    .logo {
        height: 50px;
    }

    .my-info-btn {
        color: #f6f6f6;
        background-color: transparent;
        background-image: none;
        border-color: #f6f6f6;
    }

    .my-btn-danger {
        color: #dc3545;
        background-color: transparent;
        background-image: none;
        border: 2px solid #dc3545;
        font-weight: 600;
    }

    .my-btn-danger:hover {
        background-color: #dc3545;
        color: #f6f6f6;
    }

    .my-info-btn:hover {
        background-color: #f6f6f6;
        color: #083358;
    }

    .shadow-sm {
        box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
    }

    .border-bottom {
        border-bottom: 1px solid #dee2e6 !important;
    }

    .btn {
        margin-right: 3px;
    }

    a.text-dark.router-link-exact-active:focus {
        color: #027bff !important;
    }

</style>
