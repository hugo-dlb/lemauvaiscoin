<template>
    <div class="container">
        <div class="row">
            <UserListing
                    v-for="listing in listings"
                    v-bind:key="listing.id"
                    v-bind:listing="listing"
            ></UserListing>
        </div>
    </div>
</template>

<script>
    import {ListingsService} from '../services/listings-service';
    import UserListing from './UserListing';

    export default {
        name: 'MyListings',
        data: function () {
            return {
                'listings': []
            }
        },
        created: function () {
            const listingsService = new ListingsService();
            listingsService.getUserListings().then(response => {
                response.body.data.listings.forEach(listing => {
                    const date = new Date(listing.createdAt);
                    listing.formattedTime = date.toLocaleString();
                });
                this.listings = response.body.data.listings;
            });
        },
        components: {
            UserListing
        }
    }
</script>

<style>
</style>
