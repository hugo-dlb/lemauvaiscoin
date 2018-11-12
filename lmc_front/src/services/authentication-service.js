import Vue from 'vue';

Vue.use(require('vue-resource'));

export class AuthenticationService {

    register(APIParameter) {
        return Vue.http.post('/auth/register', APIParameter);
    }

    login(APIParameter) {
        return Vue.http.post('/auth/login', APIParameter);
    }
}