class Entry {

    constructor( history, text = 'Click to copy me. (Example)', date = renderDate(new Date()), id = null ) {
        if (id) {
            this._id = id;
        } else {
            if (history.account.app.roamingSettings('entryId')) {
                this._id = parseInt(history.account.app.roamingSettings('entryId')) + 1;
            } else {
                this._id = 1;
            }
        }
        history.account.app.addRoamingSetting( 'entryId', this._id );
        this._text = text;
        this._date = date;
        history.addItem(this);
        if (history.account.layout) {
            history.account.layout.renderHistory();
        }
    }

    get id() {
        return this._id;
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
