if (window.jQuery) {

    function setSetting(type, name, value) {
        if ( type == 'roaming' ) {
            roamingSettings.values[name] = value;
        } else if ( type == 'local' ) {
            localSettings.values[name] = value;
        };
    };

    function setHistory() {
        $('section#history .item').remove();

        var historyEventsCount = localSettings.values["historyEventsCount"];
        var historyEventsMin = localSettings.values["historyEventsMin"];
        if ( historyEventsCount > 0 ) {
            try {
                if ( !licenseInformation.productLicenses["1"].isActive ) {
                    $('#more-arrow').show();
                };
            } catch(error) {};

            for ( var i = historyEventsMin; i < historyEventsCount; i++ ) {
                var item = localSettings.values[i]
                if ( item["value"] != " " && item["value"] != "" ) {
                    $('section#history').prepend('<div class="item" id=' + i + '><p class="time">' + item["date"] + '</p><p class="large">' + item["value"] + '</p></div>');

                    item = $('section#history .item#' + i + ' p.large');
                    if ( item.html().length > 300 ) {
                        var text = item.text();
                        text = text.substr(0,300) + '...';
                        item.text(text);
                    };
                };
            };
            if ( (localSettings.values[historyEventsCount])["value"] != " " && (localSettings.values[historyEventsCount])["value"] != "" ) {
                $('section#history .item:first-child').addClass('active');
            } else {
                $('#clipboard-icon').addClass('cleared');
            };
            try {
                if ( historyEventsMin > 0 && licenseInformation.productLicenses["1"].isActive ) {
                    $('section#history').append('<div class="item" id="history-full"><p class="large">We cannot find older copies :-(</p></div>');
                };
            } catch(error) {};
        } else {
            $('section#history').prepend('<div class="item" id="no-events"><p class="large">Start using your clipboard (CTRL+C) ...</p></div>');
            $('#more-arrow').hide();
        };

        if ( roamingSettings.values["click_to_copy_setup"] ) {
            $('#click-to-copy').addClass('hide');
        };
    };

    function resetHistory() {
        // Reset History
        var historyEventsCount = localSettings.values["historyEventsCount"];
        for ( var i = historyEventsCount; i > 0; i-- ) {
            localSettings.values.remove(i);
        };

        // Reset Counters
        localSettings.values["historyEventsCount"] = 0;
        localSettings.values["historyEventsMin"] = 0;

        // Example History Event
        var composite = new Windows.Storage.ApplicationDataCompositeValue();
        var date = getDate(false);
        composite["date"] = date;
        composite["value"] = "Click to copy me. (Example)";
        localSettings.values[0] = composite;
    };


    (function () {
        "use strict"

        // Initialize values
        if ( roamingSettings.values["click_to_copy_setup"] === null ) {
            roamingSettings.values["click_to_copy_setup"] = false;
        };
        if ( roamingSettings.values["pro_setup"] === null ) {
            roamingSettings.values["pro_setup"] = false;
        };

        if ( localSettings.values["historyEventsCount"] === null ) {
            localSettings.values["historyEventsCount"] = 0;
        };
        if ( localSettings.values["historyEventsMin"] === null ) {
            localSettings.values["historyEventsMin"] = 0;
        };
        if ( localSettings.values["listening"] === null ) {
            localSettings.values["listening"] = false;
        };

        // Example History Event
        var composite = new Windows.Storage.ApplicationDataCompositeValue();
        var date = getDate(false);
        composite["date"] = date;
        composite["value"] = "Click to copy me. (Example)";
        localSettings.values[0] = composite;

        setHistory();
    })();

} else {
    // jQuery not loaded!
};
