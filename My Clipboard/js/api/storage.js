(function () {
    "use strict"

    // Initialization
    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
    var localSettings = Windows.Storage.ApplicationData.current.localSettings;

    // Save value
    roamingSettings.values["historyEventsCount"] = 2;
    localSettings.values["listening"] = true;

    // Composite setting
    var composite = new Windows.Storage.ApplicationDataCompositeValue();
    composite["date"] = "10:25 AM";
    composite["value"] = "string";
    roamingSettings.values["1"] = composite;
    var composite = new Windows.Storage.ApplicationDataCompositeValue();
    composite["date"] = "10:25 AM";
    composite["value"] = "string";
    roamingSettings.values["2"] = composite;

    // Retrieve value
    var num = roamingSettings.values["historyEventsCount"];
    if ( num > 0 ) {
        for ( var i = num; i > 0; i-- ) {
            var item = roamingSettings.values[i]
            $('section#history').prepend('<div class="item" id=' + "0" + '><p class="time">' + item["date"] + '</p><p class="large">' + item["value"] + '</p></div>');
            $('#more-arrow').show();
        };
    } else {
        $('section#history').prepend('<div class="item" id="no-events"><p class="large">Start using your clipboard (CTRL+C) ...</p></div>');
        $('#more-arrow').hide();
    };
})();
