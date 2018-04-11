if (window.jQuery) {

    function getClipboard() {
        var content = Windows.ApplicationModel.DataTransfer.Clipboard.getContent();
        if ( content.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text) ) {
            content.getTextAsync().done(function(text){
                $('section#show-clipboard #textarea').text(text);
            });
        } else {
            $('section#show-clipboard #textarea').text('Your clipboard is empty! o_o');
        };
    };

} else {
    // jQuery not loaded!
};
