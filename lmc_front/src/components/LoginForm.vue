<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <form v-on:submit.prevent="onSubmit">
                    <h1>Login</h1>
                    <p class="error-message" v-if="error">{{message}}</p>
                    <div class="form-group">
                        <label for="Username">Username *</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="Username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password *</label>
                        <input v-model="password" type="password" class="form-control" id="email" placeholder="password" >
                    </div>
                    <button type="submit" class="btn my-btn">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>
<style>
    .error-message {
        color: red;
    }

    .my-btn {
        color: #083358;
        background-color: transparent;
        background-image: none;
        border-color: #083358;
    }

    .my-btn:hover {
        background-color: #083358;
        color: #f6f6f6;
    }

</style>

<script>
    import {
        AuthenticationService
    } from '../services/authentication-service';

    export default {
        name: 'LoginForm',
        data: function() {
            return {
                username: '',
                password: '',
                error: false,
                message: ''
            }
        },
        methods: {
            onSubmit: function() {
                const authService = new AuthenticationService();
                authService.login({
                    username: this.username,
                    password: this.password
                }).then(response => {
                    localStorage.setItem('token', response.body.data.token);
                    this.$router.push('home');
                }).catch(err => {
                    this.message = err.body.message;
                    this.error = true;
                });
            }
        }

    }

</script>
