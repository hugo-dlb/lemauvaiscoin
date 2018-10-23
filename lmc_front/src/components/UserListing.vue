<template>
    <div class="col-sm-6 col-md-4 col-lg-3">
        <div class="my-card">
            <div class="my-img-cont" ref="imgcont" v-bind:style="{ 'background-image': 'url(' + listing.image + ')' }">
            </div>

            <div class="my-card-body">
                <h5 class="card-title">{{listing.title}}</h5>
                <p class="card-text" ref="text">{{listing.description}}</p>
            </div>

            <div class="my-card-timestamp">
                {{listing.createdAt}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'UserListing',
        props: ['listing'],
        created: function() {
        }
    }
</script>

<style>
    .my-card {
        margin-bottom: 20px;
    }

    .my-card-body {
        padding: 1.25rem;
        height: 6.7rem;
        overflow: hidden;

    }

    .my-img-cont {
        height: 10rem;
        width: auto;
        overflow: hidden;

        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

        /*        overflow: hidden;*/
        border-top-left-radius: calc(0.25rem - 1px);
        border-top-right-radius: calc(0.25rem - 1px);
    }

    .my-card-timestamp {
        padding: 0.75rem 1.25rem;
        background-color: rgba(0, 0, 0, 0.03);
        border-top: 1px solid rgba(0, 0, 0, 0.125);
    }
</style>
