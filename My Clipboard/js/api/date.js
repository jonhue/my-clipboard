if (window.jQuery) {

    function getDate(seconds) {
        var d = new Date();

        var month = d.getMonth()+1;
        var day = d.getDate();
        var hour = d.getHours();
        var minute = d.getMinutes();

        hour = ( hour + 24 ) % 24;
        var mid='AM';
        if ( hour == 0 ) {
            hour = 12;
        } else if ( hour > 12 ) {
            hour = hour % 12;
            mid = 'PM';
        };

        if ( seconds ) {
            var second = d.getSeconds();

            var date = ((''+month).length<2 ? '0' : '') + month + '/' +
                ((''+day).length<2 ? '0' : '') + day + ' - ' +
                ((''+hour).length<2 ? '0' :'') + hour + ':' +
                ((''+minute).length<2 ? '0' :'') + minute + ':' +
                ((''+second).length<2 ? '0' :'') + second + '  ' +
                mid
        } else {
            var date = ((''+month).length<2 ? '0' : '') + month + '/' +
                ((''+day).length<2 ? '0' : '') + day + ' - ' +
                ((''+hour).length<2 ? '0' :'') + hour + ':' +
                ((''+minute).length<2 ? '0' :'') + minute + '  ' +
                mid
        };

        return date
    };

} else {
    // jQuery not loaded!
};
