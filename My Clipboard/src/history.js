import Clipboard from './clipboard';
import Entry from './entry';

class History {

    constructor(account) {
        this._account = account;
        this._items = [];
        account.app.addLocalSetting( 'historyItems', JSON.stringify(this._items) );
    }

    get account() {
        return this._account;
    }
    set account(val) {
        this._account = val;
    }

    get items() {
        if (this.account.app.localSettings('historyItems')) {
            this._items = JSON.parse(this.account.app.localSettings('historyItems'));
        } else {
            this._items = [];
        }
        return this._items;
    }
    set items(val) {
        this._items = val;
        this.account.app.addLocalSetting( 'historyItems', JSON.stringify(this._items) );
    }

    ping() {
        setInterval(() => {
            this.track();
        }, 1000);
    }

    track() {
        if (document.hasFocus()) {
            Clipboard.read((text) => {
                // Check if Clipboard is empty
                if ( text && text != ' ' && text != '' ) {
                    // If Clipboard changed to last event
                    if ( this.items.length > 0 && text != this.items[0]._text ) {
                        new Entry( this, text );
                        if (this.account.layout)
                            this.account.layout.clipboardUncleared();
                    } else {
                        if (this.account.layout)
                            this.account.layout.lastItemActive();
                    }
                } else {
                    if (this.account.layout)
                        this.account.layout.clipboardCleared();
                }
            });
        }
        this.items.length = Math.min(this.items.length, History.limit());
    }

    static init(account) {
        let items = [];
        if (account.app.localSettings('historyItems')) {
            items = JSON.parse(account.app.localSettings('historyItems'));
        }
        let history = new History(account);
        if ( items.length > 0 ) {
            items.reverse().forEach((entry) => {
                new Entry( history, entry._text, entry._date );
            });
        } else {
            new Entry(history);
        }
        history.ping();
        return history;
    }

    reset() {
        delete this;
        let history = new History(this.account);
        new Entry(history);
        history.ping();
        return history;
    }

    static limit() {
        return 250;
    }

}

export default History;
