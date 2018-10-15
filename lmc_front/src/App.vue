<template>
    <div id="app">
        <Menu/>
        <router-view></router-view>
    </div>
</template>

<script>
    import Menu from './components/Menu.vue';
    import Listing from './components/Listing.vue';
    import CreateListingForm from './components/CreateListingForm.vue';

    export default {
        name: 'app',
        components: {
            Menu,
            Listing,
            CreateListingForm
        }
    };
</script>

<style>
    html, body {
        font-size: 14px !important;
    }

    @media (min-width: 768px) {
        html, body {
            font-size: 16px !important;
        }
    }
</style>
