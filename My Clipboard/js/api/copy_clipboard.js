if (window.jQuery) {

    ﻿function copyClipboard(i) {
        // Get text
        var item = roamingSettings.values[i];
        if (item) {
            var text = item["value"];
            saveToClipboard(text);
        }
    };

    function saveToClipboard(text) {
        // Create Data Package
        var data_package = Windows.ApplicationModel.DataTransfer.DataPackage();
        data_package.setText(text);

        // Save to Clipboard
        if (text && data_package) {
            Windows.ApplicationModel.DataTransfer.Clipboard.setContent(data_package);
        }
    };

} else {
    // jQuery not loaded!
};
