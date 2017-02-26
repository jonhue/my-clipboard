function clearClipboard() {
    Windows.ApplicationModel.DataTransfer.Clipboard.clear();

    $('#clipboard-icon').addClass('shaking');
    setTimeout(function() {
        $('#clipboard-icon').addClass('cleared');
        $('section#history .item').removeClass('active');
        setTimeout(function() {
            $('#clipboard-icon').removeClass('shaking');
        }, 750);
    }, 750);
};
