function trackHistory() {
    // Initialization
    // var store_app = Windows.ApplicationModel.Store.CurrentApp;
    var store_app = Windows.ApplicationModel.Store.CurrentAppSimulator;
    var licenseInformation = store_app.licenseInformation;

    // Check for My Clipboard pro
    if (licenseInformation.productLicenses["1"].isActive) {
        var max = 500;
    } else {
        var max = 5;
    };

    // get Clipboard if changed to last event
    var text = "dsypurghdsyolp"

    if ( text == " " || text == "" ) {
        $('#clipboard-icon').addClass('cleared');
    } else {
        // Update associated values
        var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
        roamingSettings.values["historyEventsCount"] = roamingSettings.values["historyEventsCount"] + 1
        if ( roamingSettings.values["historyEventsCount"] == 1 ) {
            $('section#history .item#no-events').remove();
        };

        // Add new Event to History
        var dt = new Date();
        var date = dt.getDate() + "." + (dt.getMonth()+1) + " - " + dt.getHours() + ":" + dt.getMinutes();
        var composite = new Windows.Storage.ApplicationDataCompositeValue();
        composite["date"] = date;
        composite["value"] = text;
        roamingSettings.values[roamingSettings.values["historyEventsCount"]] = composite;

        // Update Min value
        if ( roamingSettings.values["historyEventsCount"] > max ) {
            roamingSettings.values["historyEventsMin"] = roamingSettings.values["historyEventsMin"] + 1
            $('section#history .item:last-child').hide();
            if (licenseInformation.productLicenses["1"].isActive) {
                // show Message that limit has been reached ...
            };
        };

        // Add new Event to View
        var i = roamingSettings.values["historyEventsCount"];
        $('section#history').prepend('<div class="item" id=' + i + '><p class="time">' + composite["date"] + '</p><p class="large">' + composite["value"] + '</p></div>');

        composite = $('section#history .item#' + i + ' p.large');
        if ( composite.html().length > 300 ) {
            var text = composite.text();
            text = text.substr(0,300) + '...';
            composite.text(text);
        };
    };
};

function pingClipboard() {
    window.setInterval(function(){
        trackHistory();
    }, 1000);
};


(function () {
    "use strict"

    var localSettings = Windows.Storage.ApplicationData.current.localSettings;

    if ( localSettings.values["listening"] = true ) {
        pingClipboard();
        $('section#run').addClass('hide hidden');
        $('#layout-wrapper').removeClass('down');
    };
})();
