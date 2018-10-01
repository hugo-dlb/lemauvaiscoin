<template>
    <div id="app">
        <Menu/>
        <Listing msg="tes"/>
    </div>
</template>

<script>
    import Menu from './components/Menu.vue';
    import Listing from './components/Listing.vue';

    export default {
        name: 'app',
        components: {
            Menu,
            Listing
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
