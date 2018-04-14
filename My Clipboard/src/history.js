import Clipboard from './clipboard';
import Entry from './entry';

class History {

    constructor(account) {
        this._account = account;
        this._items = [];
        account.app.addLocalSetting( 'historyItems', this._items );
    }

    get account() {
        return this._account;
    }
    set account(val) {
        this._account = val;
    }

    get items() {
        return this._items;
    }
    set items(val) {
        this._items = val;
        this.account.app.addLocalSetting( 'historyItems', this._items );
    }

    last() {
        if (length(this.items) > 0) {
            return this.items[length(this.items) - 1];
        } else {
            return null;
        }
    }

    ping() {
        setInterval(() => {
            this.track();
        }, 1000);
    }

    track() {
        if (document.hasFocus()) {
            // Get Clipboard
            Clipboard.read((text) => {
                // If Clipboard changed to last event
                if ( this.last && text != this.last.text ) {
                    // Check if Clipboard is empty
                    if ( text === ' ' || text === '' ) {
                        this.account.layout.clipboardCleared();
                    } else {
                        if (length(this.items) == History.limit) {
                            this.items.pop();
                        }
                        new Entry( this, text );
                    }
                } else {
                    this.account.layout.lastItemActive();
                }
            });
        }
    }

    static init(account) {
        let history = new History(account);
        if ( account.app.localSettings.historyItems === Array ) {
            account.app.localSettings.values.historyItems.forEach((entry) => {
                new Entry( history, entry.text, entry.date );
            });
        } else {
            new Entry( history, 'Click to copy me. (Example)' );
        }
        history.ping();
        return history;
    }

    static reset() {
        return new History();
    }

    static limit() {
        return 250;
    }

}

export default History;




// function setHistory() {
//     $('section#history .item').remove();
//
//     var historyEventsCount = localSettings.values["historyEventsCount"];
//     var historyEventsMin = localSettings.values["historyEventsMin"];
//     if ( historyEventsCount > 0 ) {
//         try {
//             if ( !licenseInformation.productLicenses["1"].isActive ) {
//                 $('#more-arrow').show();
//             };
//         } catch(error) {};
//
//         for ( var i = historyEventsMin; i < historyEventsCount; i++ ) {
//             var item = localSettings.values[i]
//             $('section#history').prepend('<div class="item" id=' + i + '><p class="time">' + item["date"] + '</p><p class="large">' + item["value"] + '</p></div>');
//
//             item = $('section#history .item#' + i + ' p.large');
//             if ( item.html().length > 300 ) {
//                 var text = item.text();
//                 text = text.substr(0,300) + '...';
//                 item.text(text);
//             };
//         };
//         if ( (localSettings.values[historyEventsCount])["value"] != " " && (localSettings.values[historyEventsCount])["value"] != "" ) {
//             $('section#history .item:first-child').addClass('active');
//         } else {
//             $('#clipboard-icon').addClass('cleared');
//         };
//         try {
//             if ( historyEventsMin > 0 && licenseInformation.productLicenses["1"].isActive ) {
//                 $('section#history').append('<div class="item" id="history-full"><p class="large">There are no older clipboard contents.</p></div>');
//             };
//         } catch(error) {};
//     } else {
//         clearHistoryLayout();
//     };
//
//     if ( roamingSettings.values["click_to_copy_setup"] ) {
//         $('#click-to-copy').addClass('hide');
//     };
// };
