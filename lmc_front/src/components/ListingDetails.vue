<template>
    <div class="container">
        <div class="row">
            <div v-if="listing" class="col-sm-12">
                <div class="card">
                    <div style="text-align: center;">
                        <img class="card-img-top" :src="listing.image" style="width: 300px; height: auto;">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">
                            {{listing.title}}
                        </h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                            {{listing.formattedTime}}
                        </h6>
                        <p class="card-text">
                            {{listing.description}}
                        </p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><i class="fa fa-at blue"></i> {{listing.user.email}}</li>
                        <li class="list-group-item"><i class="fa fa-phone blue"></i> {{listing.user.phoneNumber}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ListingsService} from '../services/listings-service';

    export default {
        name: 'ListingDetails',
        data: function () {
            return {
                'listing': null
            }
        },
        created: function () {
            const listingsService = new ListingsService();
            listingsService.getListing(this.$route.params.id).then(response => {
                this.listing = response.body.data.listing;
                const date = new Date(this.listing.createdAt);
                this.listing.formattedTime = date.toLocaleString();
            });
        }
    }
</script>

<style>
    .blue {
        color: #007bff;
    }
</style>
