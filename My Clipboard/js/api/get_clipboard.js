function getClipboard() {
    var content = Windows.ApplicationModel.DataTransfer.Clipboard.getContent();
    if ( content.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text) ) {
        var text = content.getTextAsync().then(function(result){
            $('section#show-clipboard #textarea').text(text);
        });
    } else {
        $('section#show-clipboard #textarea').text('Unable to show clipboard content');
    };
};
