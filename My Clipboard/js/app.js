define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = /** @class */ (function () {
        function App() {
        }
        Object.defineProperty(App.prototype, "app", {
            get: function () {
                return Windows.ApplicationModel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App.prototype, "package", {
            get: function () {
                return this.app.Package.current;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App.prototype, "packageId", {
            get: function () {
                return this.package.id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App.prototype, "familyName", {
            get: function () {
                return this.packageId.familyName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App.prototype, "version", {
            get: function () {
                return this.packageId.version;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App.prototype, "roamingSettings", {
            get: function () {
                return Windows.Storage.ApplicationData.current.roamingSettings;
            },
            enumerable: true,
            configurable: true
        });
        App.prototype.addRoamingSetting = function (key, value) {
            Windows.Storage.ApplicationData.current.roamingSettings[key] = value;
        };
        Object.defineProperty(App.prototype, "localSettings", {
            get: function () {
                return Windows.Storage.ApplicationData.current.localSettings;
            },
            enumerable: true,
            configurable: true
        });
        App.prototype.addLocalSetting = function (key, value) {
            Windows.Storage.ApplicationData.current.localSettings[key] = value;
        };
        Object.defineProperty(App.prototype, "store", {
            get: function () {
                return this.app.Store.CurrentApp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App.prototype, "licenseInformation", {
            get: function () {
                return this.store.licenseInformation;
            },
            enumerable: true,
            configurable: true
        });
        return App;
    }());
    exports.default = App;
});
