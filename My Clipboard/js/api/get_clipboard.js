function getClipboard() {
    var content = Windows.ApplicationModel.DataTransfer.Clipboard.getContent();
    if ( content.contains(Windows.System.string) ) {
        var text = content.getTextAsync();
        $('section#show-clipboard textarea').val(text);
    } else {
        $('section#show-clipboard textarea').val('Unable to show clipboard content');
    };
};
