define(["require", "exports", "./history"], function (require, exports, history_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Account = /** @class */ (function () {
        function Account(app) {
            this._app = app;
        }
        Object.defineProperty(Account.prototype, "app", {
            get: function () {
                return this._app;
            },
            set: function (val) {
                this._app = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Account.prototype, "pro", {
            get: function () {
                return this.app.licenseInformation.productLicenses['1'].isActive;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Account.prototype, "limit", {
            get: function () {
                if (this.pro) {
                    return 5;
                }
                else {
                    return history_1.default.limit;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Account.prototype, "isSetup", {
            get: function () {
                return this.app.roamingSettings.isSetup;
            },
            set: function (val) {
                this.app.addRoamingSetting('isSetup', val);
            },
            enumerable: true,
            configurable: true
        });
        Account.prototype.buyPro = function () {
            this.app.store.requestProductPurchaseAsync('1');
        };
        Account.prototype.donate = function () {
            this.app.store.requestProductPurchaseAsync('2');
        };
        return Account;
    }());
    exports.default = Account;
});
