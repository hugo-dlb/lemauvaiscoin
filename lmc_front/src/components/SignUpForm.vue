<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <form v-on:submit.prevent="onSubmit">
                     <h1>Sign Up</h1>
                    <p class="error-message" v-if="error">{{message}}</p>
                    <div class="form-group">
                        <label for="Username">Username *</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="Username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password *</label>
                        <input v-model="password" type="password" class="form-control" id="email" placeholder="password" aria-describedby="passwordHelp">
                        <small id="passwordHelp" class="form-text text-muted">Please choose a cool password</small>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>
<style>
    .error-message {
        color: red;
    }

</style>

<script>
    import {
        AuthenticationService
    } from '../services/authentication-service';

    export default {
        name: 'SignUpForm',
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
                authService.register({
                    username: this.username,
                    password: this.password
                }).then(response => {
                    console.log("registerok")
                    this.$router.push('home');
                }).catch(err => {
                    console.log("registernotok")
                    this.message = err.body.message;
                    this.error = true;
                });
            }
        }

    }

</script>
