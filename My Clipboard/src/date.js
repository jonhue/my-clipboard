function renderDate(date) {
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();

    hour = ( hour + 24 ) % 24;
    var mid='AM';
    if ( hour == 0 ) {
        hour = 12;
    } else if ( hour > 12 ) {
        hour = hour % 12;
        mid = 'PM';
    };

    var d = ((''+month).length<2 ? '0' : '') + month + '/' +
        ((''+day).length<2 ? '0' : '') + day + ' - ' +
        ((''+hour).length<2 ? '0' :'') + hour + ':' +
        ((''+minute).length<2 ? '0' :'') + minute + '  ' +
        mid

    return d
}
