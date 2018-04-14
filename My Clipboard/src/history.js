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
                        // new Entry( this, text );
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
                new Entry( history, entry._text, entry._date );
            });
        } else {
            new Entry(history);
        }
        history.ping();
        return history;
    }

    reset() {
        let history = new History(this.account);
        new Entry(history);
        history.ping();
        return history;
    }

    static limit() {
        return 10;
    }

}

export default History;
