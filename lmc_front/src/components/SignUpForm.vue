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
                        <input v-model="password" type="password" class="form-control" id="password" placeholder="password" aria-describedby="passwordHelp">
                        <small id="passwordHelp" class="form-text text-muted">Please choose a cool password</small>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone number *</label>
                        <input v-model="phone" type="text" class="form-control" id="phone" placeholder="Phone number">
                    </div>
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input v-model="email" type="email" class="form-control" id="email" placeholder="Email" aria-describedby="emailHelp">
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
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
                email: '',
                phone: '',
                error: false,
                message: ''
            }
        },
        methods: {
            onSubmit: function() {
                const authService = new AuthenticationService();
                authService.register({
                    username: this.username,
                    password: this.password,
                    email: this.email,
                    phoneNumber: this.phone
                }).then(res => {
                    this.$router.push('login');
                }).catch(err => {
                    this.message = err.body.message;
                    this.error = true;
                });
            }
        }

    }

</script>
