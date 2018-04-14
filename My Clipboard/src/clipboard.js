class Clipboard {

    static read(callback) {
        let content = Windows.ApplicationModel.DataTransfer.Clipboard.getContent();
        if (content.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text)) {
            content.getTextAsync().done((text) => {
                callback(text);
            });
        } else {
            callback(null);
        }
    }

    static write(text) {
        let dataPackage = Windows.ApplicationModel.DataTransfer.DataPackage();
        dataPackage.setText(text);
        Windows.ApplicationModel.DataTransfer.Clipboard.setContent(dataPackage);
    }

    static clear() {
        Windows.ApplicationModel.DataTransfer.Clipboard.clear();
    }

}

export default Clipboard;
