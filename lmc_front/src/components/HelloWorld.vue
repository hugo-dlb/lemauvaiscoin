<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <p>
            <button v-on:click="call('index')" class="ui button">
                Get all listings
            </button>

            <button v-on:click="call('get')" class="ui button">
                Get listing with id 1
            </button>

            <button v-on:click="call('create')" class="ui button">
                Create listing
            </button>

            <button v-on:click="call('delete')" class="ui button">
                Delete listing 1
            </button>

            <button v-on:click="call('update')" class="ui button">
                Update listing 1
            </button>
        </p>
    </div>
</template>

<script>
    import ListingsService from '../services/listings-service';

    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },

        created() {
        },

        methods: {
            call: function (type) {
                switch(type) {
                    case 'index':
                        ListingsService.index().then(res => {
                            console.log(res.body);
                        });
                        break;
                    case 'get':
                        ListingsService.getListing(1).then(res => {
                            console.log(res.body);
                        });
                        break;
                    case 'create':
                        ListingsService.createListing({
                            'title': 'New listing',
                            'description': 'Description',
                            'email': 'Email',
                            'phoneNumber': 'phoneNumber'
                        }).then(res => {
                            console.log(res.body);
                        });
                        break;
                    case 'delete':
                        ListingsService.deleteListing(1).then(res => {
                            console.log(res.body);
                        });
                        break;
                    case 'update':
                        ListingsService.updateListing({
                            id: 1,
                            'title': 'Updated title!'
                        }).then(res => {
                            console.log(res.body);
                        });
                        break;
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
