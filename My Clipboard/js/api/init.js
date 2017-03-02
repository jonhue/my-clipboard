if (window.jQuery) {

    // Internet Access
    var connections = Windows.Networking.Connectivity.NetworkInformation.getInternetConnectionProfile();
    if ( connections != null && connections.getNetworkConnectivityLevel() == Windows.Networking.Connectivity.NetworkConnectivityLevel.internetAccess ) {
        var connected = true;
    } else {
        var connected = false;
    };

    // App Info Initialization
    var app = Windows.ApplicationModel;
    var package = app.Package.current;
    var package_id = package.id;
    var family_name = package_id.familyName;
    var version = package_id.version;


    // Storage Initialization
    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
    var localSettings = Windows.Storage.ApplicationData.current.localSettings;


    // Store Initialization
    if ( connected ) {
        var store_app = Windows.ApplicationModel.Store.CurrentApp;
    };
    // if ( connected ) {
        // var store_app = Windows.ApplicationModel.Store.CurrentAppSimulator;
        // var licenseInformation = store_app.licenseInformation;
    // };
    if ( connected ) {
        var licenseInformation = store_app.licenseInformation;
    };

    if ( connected ) {
        if ( licenseInformation.productLicenses["1"].isActive ) {
            var maxHistoryEvents = 250; // also edit value in checkFeatures() (store.js)
        } else {
            var maxHistoryEvents = 5;
        };
    } else {
        maxHistoryEvents = 5;
    };
    var maxHistoryEventsPro = 250;

} else {
    // jQuery not loaded!
};
