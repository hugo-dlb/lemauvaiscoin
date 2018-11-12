import Vue from 'vue';

Vue.use(require('vue-resource'));

export class ListingsService {

    index() {
        return Vue.http.get('/api/listings');
    }

    getListing(id) {
        return Vue.http.get('/api/listings/' + id);
    }

    getUserListings() {
        return Vue.http.get('/api/userListings', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}});
    }

    deleteListing(id) {
        return Vue.http.delete('/api/listings/' + id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}});
    }

    updateListing(listing) {
        return Vue.http.post('/api/listings/' + listing.id, listing, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}});
    }

    createListing(listing) {
        return Vue.http.put('/api/listings', listing, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        return Vue.http.put(process.env.VUE_APP_API_BASE_URL + '/listings', listing, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}});
    }
}
