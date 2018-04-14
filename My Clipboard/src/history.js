import Clipboard from './clipboard';
import Entry from './entry';

class History {

    constructor(account) {
        this._account = account;
        this._items = new Array();
        account.app.addLocalSetting( 'historyItems', JSON.stringify(this._items) );
    }

    get account() {
        return this._account;
    }
    set account(val) {
        this._account = val;
    }

    get items() {
        this._items = JSON.parse(this.account.app.localSettings('historyItems'));
        return this._items;
    }
    set items(val) {
        this._items = val;
        this.account.app.addLocalSetting( 'historyItems', JSON.stringify(this._items) );
    }

    last() {
        if (this.items.length > 0) {
            return this.items[this.items.length - 1];
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
                // Check if Clipboard is empty
                if ( text == ' ' || text == '' ) {
                    this.account.layout.clipboardCleared();
                } else {
                    // If Clipboard changed to last event
                    if ( this.last && text != this.last.text ) {
                        if (this.items.length >= History.limit) {
                            let items = this.items
                            items.pop();
                            this.items = items;
                        }
                        new Entry( this, text );
                    } else {
                        this.account.layout.lastItemActive();
                    }
                }
            });
        }
    }

    static init(account) {
        let items = JSON.parse(account.app.localSettings('historyItems')),
            history = new History(account);
        if ( items.length > 0 ) {
            items.forEach((entry) => {
                new Entry( history, entry.text, entry.date );
            });
        } else {
            new Entry( history, 'Click to copy me. (Example)' );
        }
        history.ping();
        return history;
    }

    reset() {
        let history = new History(this.account);
        new Entry( history, 'Click to copy me. (Example)' );
        history.ping();
        return history;
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
