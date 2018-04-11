if (window.jQuery) {

    function trackHistory() {
        if ( document.hasFocus() ) {
            // Get Clipboard
            var content = Windows.ApplicationModel.DataTransfer.Clipboard.getContent();
            if ( content.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text) ) {
                content.getTextAsync().done(function(text){
                    var historyEventsCount = localSettings.values["historyEventsCount"];
                    try {
                        var text_before = (localSettings.values[historyEventsCount])["value"];
                    } catch(error) {
                        dialog = new Windows.UI.Popups.MessageDialog("We cannot connect to your history" , "No network connection");
                        dialog.showAsync();
                    };

                    // If Clipboard changed to last event
                    if ( text != text_before ) {
                        // Check if Clipboard is empty
                        if ( text == " " || text == "" ) {
                            $('#clipboard-icon').addClass('cleared');
                            $('section#history .item').removeClass('active');
                        } else {
                            try {
                                if ( !licenseInformation.productLicenses["1"].isActive ) {
                                    $('#more-arrow').show();
                                };
                            } catch(error) {};

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
                            localSettings.values[historyEventsCount] = composite;

                            // Update historyEventsMin
                            if ( historyEventsCount > maxHistoryEvents ) {
                                var historyEventsMin = localSettings.values["historyEventsMin"];
                                if ( historyEventsCount > maxHistoryEventsPro ) {
                                    localSettings.values.remove(historyEventsMin);
                                };
                                historyEventsMin = historyEventsCount - maxHistoryEvents;

                                $('section#history .item:not(#history-full, #no-items)').last().remove();
                                try {
                                    if ( licenseInformation.productLicenses["1"].isActive && !$('section#history .item#history-full').length ) {
                                        $('section#history').append('<div class="item" id="history-full"><p class="large">We cannot find older copies :-(</p></div>');
                                    };
                                } catch(error) {};
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
                                localSettings.values["historyEventsCount"] = historyEventsCount;
                                localSettings.values["historyEventsMin"] = historyEventsMin;

                                // Reinitialize Event Listeners
                                $('section#history p.large').click(function() {
                                    copyClipboard($(this).closest('div').prop('id'));
                                    showMessage('copied');
                                });
                            }, 100);
                        };
                    } else {
                        $('section#history .item:first-child').addClass('active');
                    };
                });
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

        if ( localSettings.values["listening"] = true ) {
            pingClipboard();
            $('section#run').addClass('hide hidden');
            $('#layout-wrapper').removeClass('down');
        };
    })();

} else {
    // jQuery not loaded!
};
