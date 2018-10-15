<template>
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 class="my-0 mr-md-auto font-weight-normal">
            <router-link to="/">Le mauvais coin</router-link>
        </h5>
        <nav class="my-2 my-md-0 mr-md-3">
            <router-link to="/create-listing" class="p-2 text-dark">New listing</router-link>
        </nav>
        <a v-if="!loggedIn" v-on:click="testLogin" class="btn btn-outline-primary login-btn" href="#">Test Login</a>
        <a v-if="!loggedIn" class="btn btn-outline-primary login-btn">Login</a>
        <button type="button" v-if="loggedIn" v-on:click="logout" class="btn btn-danger">Logout</button>
        <a v-if="!loggedIn" class="btn btn-primary">Sign up</a>
    </div>
</template>

<script>
    import {AuthenticationService} from '../services/authentication-service';
    import jwt_decode from 'jwt-decode';

    export default {
        name: 'Menu',
        data: function () {
            return {
                loggedIn: false
            }
        },
        created: function () {
            this.checkLoggedIn();
        },
        methods: {
            testLogin: function () {
                // for testing purpose only
                const authenticationService = new AuthenticationService();
                authenticationService.login({
                    username: 'hugo',
                    password: 'hugo'
                }).then(response => {
                    localStorage.setItem('token', response.body.data.token);
                    this.checkLoggedIn();
                });
            },
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

    .login-btn {
        margin-right: 5px;
    }
</style>