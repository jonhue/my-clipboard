import Clipboard from './clipboard';
import Entry from './entry';

class History {

    constructor(account) {
        this._account = account;
        this.items = [];
    }

    get account() {
        return this._account;
    }
    set account(val) {
        this._account = val;
    }

    get items() {
        let itemIds = [];
        if (this.account.app.roamingSettings('historyItems')) {
            itemIds = JSON.parse(this.account.app.roamingSettings('historyItems'));
        }
        let items = [];
        itemIds.forEach((entryId) => {
            if (this.account.app.roamingSettings(JSON.stringify(entryId))) {
                items.push(JSON.parse(this.account.app.roamingSettings(JSON.stringify(entryId))));
            }
        });
        this._items = itemIds;
        return items;
    }
    set items(val) {
        this._items = val;
        this.account.app.addRoamingSetting( 'historyItems', JSON.stringify(this._items) );
    }
    addItem(val) {
        this.account.app.addRoamingSetting( JSON.stringify(val.id), JSON.stringify(val) );
        let itemIds = [];
        if (this.account.app.roamingSettings('historyItems')) {
            itemIds = JSON.parse(this.account.app.roamingSettings('historyItems'));
        }
        itemIds.unshift(val.id);
        this.items = itemIds;
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
        let itemIds = [],
            items = [];
        if (account.app.roamingSettings('historyItems')) {
            itemIds = JSON.parse(account.app.roamingSettings('historyItems'));
        }
        itemIds.forEach((entryId) => {
            if (account.app.roamingSettings(JSON.stringify(entryId))) {
                items.unshift(JSON.parse(account.app.roamingSettings(JSON.stringify(entryId))));
            }
        });
        let history = new History(account);
        if ( items.length > 0 ) {
            items.forEach((entry) => {
                new Entry( history, entry._text, entry._date, entry._id );
            });
        } else {
            new Entry(history);
        }
        history.ping();
        return history;
    }

    reset() {
        this.account.app.addRoamingSetting( 'entryId', 0 )
        let history = new History(this.account);
        delete this;
        new Entry(history);
        history.ping();
        return history;
    }

    static limit() {
        return 250;
    }

}

export default History;
