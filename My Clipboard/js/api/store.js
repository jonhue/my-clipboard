// Initialization
var store_app = Windows.ApplicationModel.Store.CurrentApp;
// var store_app = Windows.ApplicationModel.Store.CurrentAppSimulator;
var licenseInformation = store_app.licenseInformation;

if ( licenseInformation.productLicenses["1"].isActive ) {
    var maxHistoryEvents = 250; // also edit value in checkFeatures() (below)
} else {
    var maxHistoryEvents = 5;
};


function buyPro() {
    // Initialization
    var store_app = Windows.ApplicationModel.Store.CurrentApp;
    // var store_app = Windows.ApplicationModel.Store.CurrentAppSimulator;
    var licenseInformation = store_app.licenseInformation;

    store_app.requestProductPurchaseAsync("1");
};

function donate() {
    // Initialization
    var store_app = Windows.ApplicationModel.Store.CurrentApp;
    // var store_app = Windows.ApplicationModel.Store.CurrentAppSimulator;

    store_app.requestProductPurchaseAsync("2");
};

function checkFeatures() {
    // Initialization
    var store_app = Windows.ApplicationModel.Store.CurrentApp;
    // var store_app = Windows.ApplicationModel.Store.CurrentAppSimulator;
    var licenseInformation = store_app.licenseInformation;

    // Check for My Clipboard pro
    if ( licenseInformation.productLicenses["1"].isActive ) {
        $('section#pro').hide();
        $('section#history .item:nth-last-child(4)').addClass('is-bottom');
        $('section#history #more-arrow').hide();
        $('#navigation h1.pro').hide();
        $('#navigation h1.donate').show();

        // Update History
        var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
        var historyEventsCount = roamingSettings.values["historyEventsCount"];
        var historyEventsMin = roamingSettings.values["historyEventsMin"];
        maxHistoryEvents = 250;
        if ( roamingSettings.values["pro_setup"] == false ) {
            if ( historyEventsCount <= maxHistoryEvents ) {
                historyEventsMin = 0;
            } else {
                historyEventsMin = historyEventsMin - historyEventsCount;
            };
            setHistory();
            roamingSettings.values["pro_setup"] = true;
        };
        roamingSettings.values["historyEventsCount"] = historyEventsCount;
        roamingSettings.values["historyEventsMin"] = historyEventsMin;
    } else {};
};


(function () {
    // Initialization
    var store_app = Windows.ApplicationModel.Store.CurrentApp;
    // var store_app = Windows.ApplicationModel.Store.CurrentAppSimulator;
    var licenseInformation = store_app.licenseInformation;

    // Set Price for My Clipboard Pro
    var price_pro = licenseInformation.productLicenses["1"].formattedPrice;
    $('button#buy-pro').html('Buy for ' + price_pro);

    checkFeatures();
})();
