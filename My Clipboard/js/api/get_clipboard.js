function getClipboard() {
    var content = Windows.ApplicationModel.DataTransfer.Clipboard.getContent();
    if ( content.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text) ) {
        var text = JSON.stringify(content.getTextAsync(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text));
        $('section#show-clipboard #textarea').text(text);
    } else {
        $('section#show-clipboard #textarea').text('Unable to show clipboard content');
    };
};
