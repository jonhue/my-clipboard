function getClipboard() {
    var content = Windows.ApplicationModel.DataTransfer.Clipboard.getContent();
    if ( content.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text) ) {
        content.getTextAsync().done(function(result){
            $('section#show-clipboard #textarea').text(result);
        });
    } else {
        $('section#show-clipboard #textarea').text('Unable to show clipboard content');
    };
};
