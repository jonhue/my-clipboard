function trackHistory() {
    // Initialization
    // var store_app = Windows.ApplicationModel.Store.CurrentApp;
    var store_app = Windows.ApplicationModel.Store.CurrentAppSimulator;
    var licenseInformation = store_app.licenseInformation;

    // Check for My Clipboard pro
    if (licenseInformation.productLicenses["1"].isActive) {
        var maxHistoryEvents = 500;
    } else {
        var maxHistoryEvents = 5;
    };

    // get Clipboard if changed to last event
    var text = "dsypurghdsyolp"

    if ( text == " " || text == "" ) {
        $('#clipboard-icon').addClass('cleared');
    } else {
        // Update historyEventsCount
        var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
        var historyEventsCount = roamingSettings.values["historyEventsCount"];
        historyEventsCount++;
        if ( historyEventsCount > 0 ) {
            $('section#history .item#no-events').fadeOut(250, function() {
                $('section#history .item#no-events').remove();
            });
        };

        // Add new Event to History
        var dt = new Date();
        var date = dt.getDate() + "." + (dt.getMonth()+1) + "  -  " + dt.getHours() + ":" + dt.getMinutes();
        var composite = new Windows.Storage.ApplicationDataCompositeValue();
        composite["date"] = date;
        composite["value"] = text;
        roamingSettings.values[historyEventsCount] = composite;

        // Update historyEventsMin
        if ( historyEventsCount > maxHistoryEvents ) {
            var historyEventsMin = roamingSettings.values["historyEventsMin"];
            historyEventsMin++;

            $('section#history .item:last-child').hide();
            if (licenseInformation.productLicenses["1"].isActive) {
                // show Message that limit has been reached ...
            };
        };

        // Add new Event to View
        $('section#history').prepend('<div class="item" id=' + historyEventsCount + '><p class="time">' + composite["date"] + '</p><p class="large">' + composite["value"] + '</p></div>').css('opacity', 0).slideDown('slow').animate({ opacity: 1 }, { queue: false, duration: 'slow' });

        item = $('section#history .item#' + historyEventsCount + ' p.large');
        if ( item.html().length > 300 ) {
            var text = item.text();
            text = text.substr(0,300) + '...';
            item.text(text);
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
