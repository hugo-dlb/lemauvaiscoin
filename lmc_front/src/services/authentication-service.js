import Vue from 'vue';

Vue.use(require('vue-resource'));

export class AuthenticationService {

    register(APIParameter) {
        return Vue.http.post('/api/auth/register', APIParameter);
    }

    login(APIParameter) {
        return Vue.http.post('/api/auth/login', APIParameter);
    }
}