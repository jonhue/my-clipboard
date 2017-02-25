function copyClipboard(i) {
    // Initialization
    var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

    // Get text
    var item = roamingSettings.values[i];
    var text = item["value"];

    saveToClipboard(text);
};

function saveToClipboard(text) {
    // Create Data Package
    var data_package = Windows.ApplicationModel.DataTransfer.DataPackage();
    data_package.setText(text);

    // Save to Clipboard
    Windows.ApplicationModel.DataTransfer.Clipboard.setContent(data_package);
};
