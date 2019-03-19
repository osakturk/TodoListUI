require('babel-polyfill');
require('url-search-params-polyfill');

window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');
require('promise.prototype.finally').shim();

let CryptoJS = require("crypto-js");

let encryptedData = window.cookieManager.get('user');
let sessionUser = null;
if(encryptedData) {

    let decryptedData = CryptoJS.AES.decrypt(encryptedData, window.App.name);
    let jsonString = decryptedData.toString(CryptoJS.enc.Utf8);
    sessionUser = JSON.parse(jsonString);

    window.App.user.name = sessionUser.name;
    window.App.user.locale = sessionUser.locale;
    window.App.user.profile = sessionUser.profile_name;
    window.App.user.extensions = sessionUser.extensions;

    let tokenData = sessionUser.token.split('.')[1];
    let userData = JSON.parse(window.atob(tokenData.replace('-', '+').replace('_', '/')));

    window.App.user.username = userData.sub;
}

window.App.checkResponseErrorsAndRedirect = function(json) {
    if(json.status === 401) {
        window.location.replace('/login')
    }
    else if(json.status === 403) {
        window.location.replace('/forbidden');
    }
    else if(json.status === 404) {
        window.location.replace('/not-found');
    }
    else if(json.status === 500) {
        window.location.replace('/internal-server-error');
    }
}

axios.interceptors.request.use(function (config) {
    let token = sessionUser ? sessionUser.token : null;

    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }

    return config;
}, function (err) {
    return Promise.reject(err);
});

window.axios.defaults.baseURL = App.apiRoot;

window.axios.interceptors.response.use(function (response) {
    window.App.checkResponseErrorsAndRedirect(response);

    return response;
}, function(error) {
    console.log("this error: " + JSON.stringify(error));

    window.App.checkResponseErrorsAndRedirect(error.response);

    return Promise.reject(error.response);
});


/*window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';*/

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */
/*
let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}*/

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });
