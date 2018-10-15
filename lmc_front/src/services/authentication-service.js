import Vue from 'vue';

Vue.use(require('vue-resource'));

export class AuthenticationService {

    register(APIParameter) {
        return Vue.http.post(process.env.VUE_APP_API_BASE_URL + '/auth/register', APIParameter);
    }

    login(APIParameter) {
        return Vue.http.post(process.env.VUE_APP_API_BASE_URL + '/auth/login', APIParameter);
    }
}