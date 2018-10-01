<template>
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 class="my-0 mr-md-auto font-weight-normal">Lemauvaiscoin</h5>
        <nav class="my-2 my-md-0 mr-md-3">
            <a class="p-2 text-dark" href="#">New listing</a>
        </nav>
        <a class="btn btn-outline-primary" href="#">Sign up</a>
    </div>
</template>

<script>
    export default {
        name: 'Menu',
        props: {
            msg: String
        }
    }
</script>

<style>
    .shadow-sm {
        box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
    }

    .border-bottom {
        border-bottom: 1px solid #dee2e6!important;
    }
</style>