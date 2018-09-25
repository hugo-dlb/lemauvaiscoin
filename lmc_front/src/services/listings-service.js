import Vue from 'vue';
Vue.use(require('vue-resource'));

export default {
    index() {
        return Vue.http.get(process.env.VUE_APP_API_BASE_URL + '/listings');
    },

    getListing(id) {
        return Vue.http.get(process.env.VUE_APP_API_BASE_URL + '/listings/' + id);
    },

    deleteListing(id) {
        return Vue.http.delete(process.env.VUE_APP_API_BASE_URL + '/listings/' + id);
    },

    updateListing(listing) {
        return Vue.http.post(process.env.VUE_APP_API_BASE_URL + '/listings/' + listing.id, listing);
    },

    createListing(listing) {
        return Vue.http.put(process.env.VUE_APP_API_BASE_URL + '/listings', listing);
    }
}