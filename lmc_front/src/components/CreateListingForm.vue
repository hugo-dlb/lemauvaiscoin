<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <form v-on:submit.prevent="onSubmit">
                    <div class="form-group">
                        <label for="title">Title *</label>
                        <input v-model="title" type="text" class="form-control" id="title" placeholder="Title">
                    </div>
                    <div class="form-group">
                        <label for="description">Description *</label>
                        <textarea v-model="description" rows="5" type="text" class="form-control" id="description" placeholder="Description"></textarea>
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

<script>
    import {ListingsService} from '../services/listings-service';

    export default {
        name: 'CreateListingForm',
        data: function () {
            return {
                title: '',
                description: '',
                email: '',
                phone: ''
            }
        },
        methods: {
            onSubmit: function () {
                const listingsService = new ListingsService();
                listingsService.createListing({
                    title: this.title,
                    description: this.description,
                    email: this.email,
                    phoneNumber: this.phone
                }).then(response => {
                    this.$router.push('home');
                });
            }
        }
    }
</script>
