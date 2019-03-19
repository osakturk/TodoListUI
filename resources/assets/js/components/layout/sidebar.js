import Authorisation from './../mixins/authorisation';
import LinkManager from './../mixins/link-manager';

Vue.component('sidebar', {
    mixins : [Authorisation, LinkManager],

    data: () => ({}),

    methods: {
    updateLocale(locale) {
        window.App.user.locale = locale;
    },

},
});
