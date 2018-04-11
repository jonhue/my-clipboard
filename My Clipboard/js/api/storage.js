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
                $('section#history').prepend('<div class="item" id=' + i + '><p class="time">' + item["date"] + '</p><p class="large">' + item["value"] + '</p></div>');

                item = $('section#history .item#' + i + ' p.large');
                if ( item.html().length > 300 ) {
                    var text = item.text();
                    text = text.substr(0,300) + '...';
                    item.text(text);
                };
            };
            if ( (localSettings.values[historyEventsCount])["value"] != " " && (localSettings.values[historyEventsCount])["value"] != "" ) {
                $('section#history .item:first-child').addClass('active');
            } else {
                $('#clipboard-icon').addClass('cleared');
            };
            try {
                if ( historyEventsMin > 0 && licenseInformation.productLicenses["1"].isActive ) {
                    $('section#history').append('<div class="item" id="history-full"><p class="large">There are no older clipboard contents.</p></div>');
                };
            } catch(error) {};
        } else {
            clearHistoryLayout();
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
    };


    (function () {
        "use strict"

        // Initialize values
        if ( roamingSettings.values["click_to_copy_setup"] === 'undefined' ) {
            roamingSettings.values["click_to_copy_setup"] = false;
        };
        if ( roamingSettings.values["pro_setup"] === 'undefined' ) {
            roamingSettings.values["pro_setup"] = false;
        };

        if ( localSettings.values["historyEventsCount"] === 'undefined' ) {
            localSettings.values["historyEventsCount"] = 0;
        };
        if ( localSettings.values["historyEventsMin"] === 'undefined' ) {
            localSettings.values["historyEventsMin"] = 0;
        };
        if ( localSettings.values["listening"] === 'undefined' ) {
            localSettings.values["listening"] = false;
        };

        setHistory();
    })();

} else {
    // jQuery not loaded!
};
