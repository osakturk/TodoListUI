/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

window.Popper = require('popper.js');
require('./bootstrap');
require('./adminlte.min');
window.Tether = require('tether');
require('bootstrap');
require('select2');
// require('bootstrap/js/src/tooltip');
// require('bootstrap/js/src/popover');
// require('bootstrap/js/src/modal');


require('datatables.net');
require('datatables.net-bs4');
require('datatables.net-colreorder');
require('datatables.net-fixedcolumns');
require('datatables.net-buttons');
require('datatables.net-buttons-bs4');
require('datatables.net-buttons/js/buttons.colVis');
require('datatables.net-responsive');
require('datatables.net-responsive-bs4');

require('bootstrap-daterangepicker');

window.moment = require('moment');

window.bootbox = require('bootbox');

window.Vue = require('vue');

window.CryptoJS = require('crypto-js');

window._ = require('lodash');

import Popover from 'vue-js-popover';

import VueI18n from 'vue-i18n';

window.FileSaver = require('file-saver');
window.toastr = require('toastr');

window.eventHub = new Vue();

/**
 *
 */
window.highChartsOptions = {
    colors: [
        "#7cb5ec",
        "#f7a35c",
        "#90ed7d",
        "#8085e9",
        "#f15c80",
        "#cccccc",
        "#e4d354",
        "#2b908f",
        "#f45b5b",
        "#91e8e1"
    ],
    // colors: [
    //     "#EE692B",
    //     "#EFB53A",
    //     "#E5DA33",
    //     "#BCEA3B",
    //     "#45E353",
    //     "#CCCCCC",//"#13ECA0",
    //     "#13ECD0",
    //     "#13D5EC",
    //     "#13A5EC",
    //     "#1374EC",
    //     "#0D2EA3"
    // ],
    // colors: [
    //     "rgba(238,105,43,0.8)",
    //     "rgba(239,181,58,0.8)",
    //     "rgba(229,218,51,0.8)",
    //     "rgba(188,234,59,0.8)",
    //     "rgba(69,227,83,0.8)",
    //     "rgba(204,204,204,0.8)",
    // ],
    exporting: {enabled: false},
    credits: false
};

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.use(VueI18n);
Vue.use(Popover);


const translationMessages = {
};

let application = window.App;
let userLang = navigator.language || navigator.userLanguage;

if (userLang !== 'en' && userLang !== 'tr') userLang = null;

let locale = 'en';
if (application.user && application.user.locale) {
    locale = application.user.locale;
}
else if (userLang) {
    locale = userLang;
}

const i18n = new VueI18n({
    locale: locale,
    messages: translationMessages,
});

$(function () {
    $('[data-toggle="popover"]').popover();
});

require('./components/layout/navbar');
require('./components/layout/sidebar');
require('./components/layout/login-component');
require('./components/layout/register-component');


Vue.component('todo-list', require('./components/todo/todo-list').default);
Vue.component('todo-modal', require('./components/todo/todo-modal').default);
Vue.component('todo-add-modal', require('./components/todo/todo-list-modal').default);


const app = new Vue({
    i18n,
    el: '#app',

    created() {
        document.title = 'To-do List Project';

    },

});
