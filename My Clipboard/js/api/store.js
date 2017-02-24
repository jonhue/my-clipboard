function buyPro() {
    // Initialization
    // var store_app = Windows.ApplicationModel.Store.CurrentApp;
    var store_app = Windows.ApplicationModel.Store.CurrentAppSimulator;
    var licenseInformation = store_app.licenseInformation;

    store_app.requestProductPurchaseAsync("1", false);
};

function donate() {
    // Initialization
    // var store_app = Windows.ApplicationModel.Store.CurrentApp;
    var store_app = Windows.ApplicationModel.Store.CurrentAppSimulator;

    var purchaseResults = store_app.requestProductPurchaseAsync("2");
    switch ( purchaseResults.status ) {
        case productPurchaseStatus.succeeded:
            var transaction_id = purchaseResults.transactionId;
            store_app.reportConsumableFulfillment("2", transaction_id);
            break;
        case productPurchaseStatus.notFulfilled:
            var transaction_id = purchaseResults.transactionId;
            store_app.reportConsumableFulfillment("2", transaction_id);
            break;
    };
};

function checkFeatures() {
    // Initialization
    // var store_app = Windows.ApplicationModel.Store.CurrentApp;
    var store_app = Windows.ApplicationModel.Store.CurrentAppSimulator;
    var licenseInformation = store_app.licenseInformation;

    // Check for My Clipboard pro
    if (licenseInformation.productLicenses["1"].isActive) {
        $('section#pro').hide();
        $('section#history .item:nth-last-child(2)').addClass('is-bottom');
        $('section#history #more-arrow').hide();
        $('#navigation h1.pro').hide();
        $('#navigation h1.donate').show();
    } else {};

    // Check if donated
    if (licenseInformation.productLicenses["2"].isActive) {
        $('#navigation h1.donate').hide();
    } else {};
};


(function () {
    // Initialization
    // var store_app = Windows.ApplicationModel.Store.CurrentApp;
    var store_app = Windows.ApplicationModel.Store.CurrentAppSimulator;
    var licenseInformation = store_app.licenseInformation;

    // Set Price for My Clipboard Pro
    var price_pro = licenseInformation.productLicenses["1"].formattedPrice;
    $('button#buy-pro').html('Buy for ' + price_pro);

    // Check for My Clipboard Pro
    if (licenseInformation.productLicenses["1"].isActive) {
        $('section#pro').hide();
        $('section#history .item:nth-last-child(2)').addClass('is-bottom');
        $('section#history #more-arrow').hide();
        $('#navigation h1.pro').hide();
        $('#navigation h1.donate').show();
    } else {};

    // Check if donated
    if (licenseInformation.productLicenses["2"].isActive) {
        $('#navigation h1.donate').hide();
    } else {};
})();
