<template>
  <div id="app">
    <Listing msg="tes"/>
    <img alt="Vue logo" src="./assets/logo.png">
    <Menu msg="tes"/>
    <HelloWorld msg="tes"/>
  </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import Menu from './components/Menu.vue'
    import Listing from './components/Listing.vue'

    export default {
        name: 'app',
        components: {
            HelloWorld,
            Menu,
            Listing
        }
    }

</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

</style>
