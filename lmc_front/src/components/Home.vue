<template>
    <div class="container">
        <div class="row">
            <Listing
                    v-for="listing in listings"
                    v-bind:key="listing.id"
                    v-bind:listing="listing"
            ></Listing>
        </div>
    </div>
</template>

<script>
    import {
        ListingsService
    } from '../services/listings-service';
    import Listing from './Listing';

    export default {
        name: 'Home',
        data: function() {
            return {
                listings: []
            }
        },
        created: function() {
            const listingsService = new ListingsService();
            listingsService.index().then(response => {
                const gotListings = response.body.data.listings;
                gotListings.sort(function(a, b) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                this.listings = gotListings;
            });

        },

        components: {
            Listing
        }
    }

</script>
