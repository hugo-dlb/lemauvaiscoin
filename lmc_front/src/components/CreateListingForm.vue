<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <form v-on:submit.prevent="onSubmit">
                    <h1>Create new listing</h1>
                    <p class="error-message" v-if="error">{{message}}</p>
                    <div class="form-group">
                        <label for="title">Title *</label>
                        <input type="text" v-model="title" class="form-control" id="title" placeholder="Title">
                    </div>
                    <div class="form-group">
                        <label for="image">Image URL</label>
                        <input type="text" v-model="image" class="form-control" id="image" placeholder="Image URL">
                    </div>
                    <div class="form-group">
                        <label for="price">Price *</label>
                        <input type="number" min="1" v-model="price" class="form-control" id="price" placeholder="Price">
                    </div>
                    <div class="form-group">
                        <label for="description">Description *</label>
                        <textarea v-model="description" rows="5" class="form-control" id="description" placeholder="Description"></textarea>
                    </div>
                    <button type="submit" class="btn my-btn">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>
<style>
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
        ListingsService
    } from '../services/listings-service';

    export default {
        name: 'CreateListingForm',
        data: function() {
            return {
                title: '',
                image: '',
                price: 0,
                description: '',
                error: false,
                message: ''
            }
        },
        methods: {
            onSubmit: function() {
                const listingsService = new ListingsService();
                listingsService.createListing({
                    title: this.title,
                    image: this.image,
                    price: this.price || 0,
                    description: this.description
                }).then(res => {
                    this.$router.push('home');
                }).catch(err => {
                    this.message = err.body.message;
                    this.error = true;
                });
            }
        }
    }

</script>
