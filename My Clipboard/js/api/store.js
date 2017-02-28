if (window.jQuery) {

    function buyPro() {
        store_app.requestProductPurchaseAsync("1");
    };

    function donate() {
        store_app.requestProductPurchaseAsync("2");
    };

    function checkFeatures() {
        // Check for My Clipboard pro
        if ( licenseInformation.productLicenses["1"].isActive ) {
            $('section#pro').hide();
            $('section#history .item:nth-last-child(4)').addClass('is-bottom');
            $('section#history #more-arrow').hide();
            $('#navigation h1.pro').hide();
            $('#navigation h1.donate').show();

            // Update History
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
        // Set Price for My Clipboard Pro
        var price_pro = licenseInformation.productLicenses["1"].formattedPrice;
        $('button#buy-pro').html('Buy for ' + price_pro);

        checkFeatures();
    })();

} else {
    // jQuery not loaded!
};
