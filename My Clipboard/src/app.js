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

    get roamingSettings() {
        return Windows.Storage.ApplicationData.current.roamingSettings;
    }
    addRoamingSetting( key, value ) {
        Windows.Storage.ApplicationData.current.roamingSettings[key] = value;
    }

    get localSettings() {
        return Windows.Storage.ApplicationData.current.localSettings;
    }
    addLocalSetting( key, value ) {
        Windows.Storage.ApplicationData.current.localSettings[key] = value;
    }

    get store() {
        return this.app.Store.CurrentApp;
    }
    get licenseInformation() {
        return this.store.licenseInformation;
    }

}

export default App;
