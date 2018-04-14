class Entry {

    constructor( history, text, date = new Date() ) {
        this._text = text;
        this._date = date;
        let items = history.items;
        items.unshift(this);
        history.items = items;
        if (history.account.layout) {
            history.account.layout.renderHistory();
        }
    }

    get text() {
        return this._text;
    }
    set text(val) {
        this._text = val;
    }

    get date() {
        return this._date;
    }
    set date(val) {
        this._date = val;
    }

}

export default Entry;
