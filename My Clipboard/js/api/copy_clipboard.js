function copyClipboard(i) {
    // For Get Clipboard
    // var content = Windows.ApplicationModel.DataTransfer.Clipboard.getContent();
    // var text = content.getTextAsync();

    // Initialization
    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

    // Get text
    var item = roamingSettings.values[i];
    var text = item["value"];

    // Create Data Package
    var data_package = Windows.ApplicationModel.DataTransfer.DataPackage();
    data_package.setText(text);

    Windows.ApplicationModel.DataTransfer.Clipboard.setContent(data_package);
};
