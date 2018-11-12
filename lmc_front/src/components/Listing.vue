<template>
    <div class="col-sm-6 col-md-4 col-lg-3 my-list-cont" >
            <div class="my-card" v-on:click="goToDetails">
        <div class="my-card-hover"></div>
                <div class="my-img-cont" v-bind:style="{ 'background-image': 'url(' + listing.image + ')' }">
                </div>

                <div class="my-card-body">
                    <h5 class="card-title">{{listing.title}}</h5>
                    <p class="card-text" ref="text">{{listing.price}}€</p>
                </div>

                <div class="my-card-timestamp">
                    {{timeDiff}}
                </div>
            </div>
    </div>
</template>

<script>
    export default {
        name: 'Listing',
        props: ['listing'],
        data: function() {
            return {
                timeDiff: ''
            }
        },
        created: function() {
            this.timeDifference(this.listing.createdAt);
        },
        methods: {
            timeDifference: function(previous) {
                let current = Date.now();

                let msPerMinute = 60 * 1000;
                let msPerHour = msPerMinute * 60;
                let msPerDay = msPerHour * 24;
                let msPerMonth = msPerDay * 30;
                let msPerYear = msPerDay * 365;

                let elapsed = current - previous;
                if (elapsed < msPerMinute) {
                    this.timeDiff = Math.round(elapsed / 1000) + ' seconds ago';
                } else if (elapsed < msPerHour) {
                    this.timeDiff = Math.round(elapsed / msPerMinute) + ' minutes ago';
                } else if (elapsed < msPerDay) {
                    this.timeDiff = Math.round(elapsed / msPerHour) + ' hours ago';
                } else if (elapsed < msPerMonth) {
                    this.timeDiff = 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
                } else if (elapsed < msPerYear) {
                    this.timeDiff = 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
                } else {
                    this.timeDiff = 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
                }
            },
            goToDetails: function() {
                this.$router.push('listing/' + this.listing.id);
            }
        }
    }

</script>

<style>
    .my-card {
        position: relative;
        padding: 0px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .my-card:hover>.my-card-hover {
        opacity: 0.3;
    }

    .my-card-hover {
        position: absolute;
        height: 100%;
        width: 100%;
        opacity: 0;
        background-color: grey;
        /*rgba(102, 102, 153, 0.4);*/
        transition: opacity 0.5s ease;
    }

    .my-card-body {
        padding: 1.25rem;
        height: 6.7rem;
        overflow: hidden;
        background-color: #0f4471;
        color: #f6f6f6;

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
        background-color: #083358;
        color: #f6f6f6;
    }

    .my-list-cont {
        cursor: pointer;
        margin-bottom: 20px;
        padding: 10px;

    }

</style>
