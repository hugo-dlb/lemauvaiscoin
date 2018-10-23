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
                        <label for="image">Image URL</label>
                        <input v-model="image" rows="5" class="form-control" id="image" placeholder="Image URL">
                    </div>
                    <div class="form-group">
                        <label for="description">Description *</label>
                        <textarea v-model="description" rows="5" type="text" class="form-control" id="description" placeholder="Description"></textarea>
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
                image: '',
                description: ''
            }
        },
        methods: {
            onSubmit: function () {
                const listingsService = new ListingsService();
                listingsService.createListing({
                    title: this.title,
                    image: this.image,
                    description: this.description
                }).then(response => {
                    this.$router.push('home');
                });
            }
        }
    }
</script>
