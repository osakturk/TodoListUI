export default {
    methods: {
        resolveToken() {
            let encryptedData = window.cookieManager.get('user');
            let sessionUser = null;
            if (encryptedData) {

                let decryptedData = CryptoJS.AES.decrypt(encryptedData, window.App.name);
                let jsonString = decryptedData.toString(CryptoJS.enc.Utf8);
                sessionUser = JSON.parse(jsonString);
            }
            else {
                return false;
            }
            let base64Url = sessionUser.token.split('.')[1];
            let base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        },
        getHasAuthorisation(value) {
            let token = this.resolveToken();
            let authorisation = JSON.parse(token.authorisation);

            let scopes = value.split('.');
            let sub = authorisation;

            let authorised = true;

            for (let i = 0; i < scopes.length && authorised; i++) {
                if (sub[scopes[i]]) sub = sub[scopes[i]];
                else authorised = false;
            }

            return authorised;
        },
        getAuthorisationScope() {
            let token = this.resolveToken();
            let organization = JSON.parse(token.organization);
            return organization[this.values.id];
        },
        hasAuthorisationData() {
            let token = this.resolveToken();
            let organization = JSON.parse(token.organization);

            if(organization.company) return true;
            if(organization.site) return true;
            if(organization.department) return true;
            return false;
        },
        getGlobalOption(key) {
            let token = this.resolveToken();
            let globalOptions = JSON.parse(token.global_options);

            return !!parseInt(globalOptions[key]);
        }
    }
}