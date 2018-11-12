import Vue from 'vue';

Vue.use(require('vue-resource'));

export class ListingsService {

    index() {
        return Vue.http.get('/listings');
    }

    getListing(id) {
        return Vue.http.get('/listings/' + id);
    }

    getUserListings() {
        return Vue.http.get('/userListings', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}});
    }

    deleteListing(id) {
        return Vue.http.delete('/listings/' + id, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}});
    }

    updateListing(listing) {
        return Vue.http.post('/listings/' + listing.id, listing, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}});
    }

    createListing(listing) {
        return Vue.http.put('/listings', listing, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        return Vue.http.put(process.env.VUE_APP_API_BASE_URL + '/listings', listing, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}});
    }
}
