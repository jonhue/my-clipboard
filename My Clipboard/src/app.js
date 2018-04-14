class App {

    get app() {
        return Windows.ApplicationModel;
    }
    get package() {
        return this.app.Package.current;
    }
    get packageId() {
        return this.package.id;
    }
    get familyName() {
        return this.packageId.familyName;
    }
    get version() {
        return this.packageId.version;
    }

    roamingSettings(key) {
        return Windows.Storage.ApplicationData.current.roamingSettings.values[key];
    }
    addRoamingSetting( key, value ) {
        Windows.Storage.ApplicationData.current.roamingSettings.values[key] = value;
    }

    localSettings(key) {
        return Windows.Storage.ApplicationData.current.localSettings.values[key];
    }
    addLocalSetting( key, value ) {
        Windows.Storage.ApplicationData.current.localSettings.values[key] = value;
    }

    get store() {
        return this.app.Store.CurrentApp;
    }
    get licenseInformation() {
        return this.store.licenseInformation;
    }

}

export default App;
