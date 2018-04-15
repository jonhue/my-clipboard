import History from './history';

class Account {

    constructor(app) {
        this._app = app;
    }

    get app() {
        return this._app;
    }
    set app(val) {
        this._app = val;
    }

    get history() {
        return this._history;
    }
    set history(val) {
        this._history = val;
    }

    get layout() {
        return this._layout;
    }
    set layout(val) {
        this._layout = val;
    }

    get pro() {
        return this.app.licenseInformation.productLicenses['1'].isActive;
    }

    get limit() {
        if (this.pro) {
            return History.limit();
        } else {
            return 5;
        }
    }

    get isSetup() {
        return this.app.roamingSettings('isSetup');
    }
    set isSetup(val) {
        this.app.addRoamingSetting( 'isSetup', val );
    }

    buyPro() {
        this.app.store.requestProductPurchaseAsync('1');
    }

    donate() {
        this.app.store.requestProductPurchaseAsync('2');
    }

}

export default Account;
