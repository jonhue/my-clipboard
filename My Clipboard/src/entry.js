class Entry {

    constructor( history, text = 'Click to copy me. (Example)', date = renderDate(new Date()) ) {
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

function renderDate(date) {
    let month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes();

    hour = ( hour + 24 ) % 24;
    let mid = 'AM';
    if ( hour == 0 ) {
        hour = 12;
    } else if ( hour > 12 ) {
        hour = hour % 12;
        mid = 'PM';
    };

    let d = ((''+month).length<2 ? '0' : '') + month + '/' +
        ((''+day).length<2 ? '0' : '') + day + ' - ' +
        ((''+hour).length<2 ? '0' :'') + hour + ':' +
        ((''+minute).length<2 ? '0' :'') + minute + '  ' +
        mid;

    return d;
}

export default Entry;
