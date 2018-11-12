<template>
    <div class="col-sm-12">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{listing.title}}</h5>
                <img class="image" :src="listing.image" />
                <div class="card-desc">
                    <p class="card-text" ref="text">{{listing.description}}</p>
                </div>
            </div>
            <div class="card-footer">
                <p class="float-left">{{listing.formattedTime}}</p>
                <button v-on:click="deleteListing" class="btn btn-danger float-right"><i class="fa fa-times mr-1"></i>Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'UserListing',
        props: ['listing'],
        created: function() {},
        methods: {
            deleteListing: function() {
                this.$emit('deleteClicked', this.listing);
            }
        }
    }

</script>

<style>
    .image {
        height: 160px;
        width: auto;
        display: inline-block;
    }

    .card {
        box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .card-desc {
        position: absolute;
        padding-top: 10px;
        padding-left: 20px;
        display: inline-block;
        height: 160px;
        overflow-y: auto;
    }

    .card {
        margin-bottom: 20px;
    }

</style>
