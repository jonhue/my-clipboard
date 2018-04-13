import Layout from 'layout';

class Entry {

    constructor( history, text, date = new Date() ) {
        this._history = history;
        this._text = text;
        this._date = date;
        this._history.items.unshift(this);
        Layout.renderHistory();
    }

    get history() {
        return this._history;
    }
    set history(val) {
        this._history = val;
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
