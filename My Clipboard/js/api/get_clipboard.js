function getClipboard() {
    var content = Windows.ApplicationModel.DataTransfer.Clipboard.getContent();
    if ( content.contains(Windows.System.string) ) {
        var text = content.getTextAsync();
        $('section#show-clipboard #textarea').text(text);
    } else {
        $('section#show-clipboard #textarea').text('Unable to show clipboard content');
    };
};
