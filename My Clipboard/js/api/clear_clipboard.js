﻿function clearClipboard() {
    Windows.ApplicationModel.DataTransfer.Clipboard.clear();

    $('#clipboard-icon').addClass('shaking');
    setTimeout(function() {
        $('#clipboard-icon').addClass('cleared');
    }, 750);
};
