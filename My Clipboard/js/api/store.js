if (window.jQuery) {

    function buyPro() {
        try {
            store_app.requestProductPurchaseAsync("1");
        } catch(error) {};
    };

    function donate() {
        try {
            store_app.requestProductPurchaseAsync("2");
        } catch(error) {};
    };

    function checkFeatures() {
        try {
            // Check for My Clipboard pro
            if ( licenseInformation.productLicenses["1"].isActive ) {
                $('section#pro').hide();
                $('section#history .item:nth-last-child(4)').addClass('is-bottom');
                $('section#history #more-arrow').hide();
                $('#navigation h1.pro').hide();
                $('#navigation h1.donate').show();

                // Update History
                var historyEventsCount = localSettings.values["historyEventsCount"];
                var historyEventsMin = localSettings.values["historyEventsMin"];
                maxHistoryEvents = 250;
                if ( roamingSettings.values["pro_setup"] == false ) {
                    if ( historyEventsCount <= maxHistoryEvents ) {
                        historyEventsMin = 0;
                    } else {
                        historyEventsMin = historyEventsMin - historyEventsCount;
                    };
                };
                setHistory();
                roamingSettings.values["pro_setup"] = true;
                localSettings.values["historyEventsCount"] = historyEventsCount;
                localSettings.values["historyEventsMin"] = historyEventsMin;
            } else {};
        } catch(error) {};
    };


    (function () {
        try {
            // Set Price for My Clipboard Pro
            var price_pro = licenseInformation.productLicenses["1"].formattedPrice;
            $('button#buy-pro').html('Buy for ' + price_pro);

            checkFeatures();
        } catch(error) {};
    })();

} else {
    // jQuery not loaded!
};
