function getDate(seconds) {
    var d = new Date();

    var month = d.getMonth()+1;
    var day = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();

    hour = ( hour + 24 ) % 24;
    var mid='AM';
    if ( hour == 0 ) {
        hour = 12;
    } else if ( hour > 12 ) {
        hour = hour % 12;
        mid = 'PM';
    };

    if ( seconds ) {
        var second = d.getSeconds();

        var date = ((''+month).length<2 ? '0' : '') + month + '/' +
            ((''+day).length<2 ? '0' : '') + day + ' - ' +
            ((''+hour).length<2 ? '0' :'') + hour + ':' +
            ((''+minute).length<2 ? '0' :'') + minute + ':' +
            ((''+second).length<2 ? '0' :'') + second + '  ' +
            mid
    } else {
        var date = ((''+month).length<2 ? '0' : '') + month + '/' +
            ((''+day).length<2 ? '0' : '') + day + ' - ' +
            ((''+hour).length<2 ? '0' :'') + hour + ':' +
            ((''+minute).length<2 ? '0' :'') + minute + '  ' +
            mid
    };

    return date
};

function trackHistory() {
    // Initialization
    // var store_app = Windows.ApplicationModel.Store.CurrentApp;
    var store_app = Windows.ApplicationModel.Store.CurrentAppSimulator;
    var licenseInformation = store_app.licenseInformation;

    // get Clipboard if changed to last event
    Windows.UI.Xaml.Window.activate();
    var content = Windows.ApplicationModel.DataTransfer.Clipboard.getContent();
    if ( content.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text) ) {
        content.getTextAsync().done(function(text){
            var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;
            var historyEventsCount = roamingSettings.values["historyEventsCount"];
            var item = roamingSettings.values[historyEventsCount];

            if ( text != item["value"] ) {
                // Check if Clipboard is empty
                if ( text == " " || text == "" ) {
                    $('#clipboard-icon').addClass('cleared');
                    $('section#history .item').removeClass('active');
                } else {
                    if ( !licenseInformation.productLicenses["1"].isActive ) {
                        $('#more-arrow').show();
                    };

                    // Update historyEventsCount
                    historyEventsCount++;
                    if ( historyEventsCount > 0 ) {
                        $('section#history .item#no-events').fadeOut(250, function() {
                            $('section#history .item#no-events').remove();
                        });
                    };

                    // Add new Event to History
                    var composite = new Windows.Storage.ApplicationDataCompositeValue();
                    var date = getDate(false);
                    composite["date"] = date;
                    composite["value"] = text;
                    roamingSettings.values[historyEventsCount] = composite;

                    // Update historyEventsMin
                    if ( historyEventsCount > maxHistoryEvents ) {
                        var historyEventsMin = roamingSettings.values["historyEventsMin"];
                        historyEventsMin = historyEventsCount - maxHistoryEvents;

                        $('section#history .item:not(#history-full, #no-items)').last().remove();
                        if ( licenseInformation.productLicenses["1"].isActive && !$('section#history .item#history-full').length ) {
                            $('section#history').append('<div class="item" id="history-full"><p class="large">We cannot find older copies :-(</p></div>');
                        };
                    };

                    // Add new Event to View
                    $('section#history .item:first-child').removeClass('active');
                    setTimeout(function() {
                        $('section#history').prepend('<div class="item active" id=' + historyEventsCount + '><p class="time">' + composite["date"] + '</p><p class="large">' + composite["value"] + '</p></div>');

                        item = $('section#history .item#' + historyEventsCount + ' p.large');
                        if ( item.html().length > 300 ) {
                            var text = item.text();
                            text = text.substr(0,300) + '...';
                            item.text(text);
                        };

                        $('#clipboard-icon').removeClass('shaking cleared');

                        // Update Cloud
                        roamingSettings.values["historyEventsCount"] = historyEventsCount;
                        roamingSettings.values["historyEventsMin"] = historyEventsMin;

                        // Reinitialize Event Listeners
                        $('section#history p.large').click(function() {
                            copyClipboard($(this).closest('div').prop('id'));
                            showMessage('copied');
                        });
                    }, 100);
                };
            };
        });
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
