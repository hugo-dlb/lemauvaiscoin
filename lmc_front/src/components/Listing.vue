<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="card">
                    <img class="card-img-top" src="https://images.caradisiac.com/images/9/8/6/7/109867/S0-mercedes-4-millions-de-suv-ecoules-et-un-label-maybach-qui-se-vend-bien-385454.jpg" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {ListingsService} from '../services/listings-service';

    export default {
        name: 'Listing',
        created: function () {
            const listingsService = new ListingsService();
            listingsService.index().then(response => {
                console.log(response.body.data);
            });
        }
    }
</script>

<style>
    .card {
        margin-bottom: 20px;
    }
</style>
