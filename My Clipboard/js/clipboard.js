define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Clipboard = /** @class */ (function () {
        function Clipboard() {
        }
        Clipboard.read = function (callback) {
            var content = Windows.ApplicationModel.DataTransfer.Clipboard.getContent();
            if (content.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text)) {
                content.getTextAsync().done(function (text) {
                    callback(text);
                });
            }
            else {
                callback('Your clipboard is empty! o_o');
            }
        };
        Clipboard.write = function (text) {
            var dataPackage = Windows.ApplicationModel.DataTransfer.DataPackage();
            dataPackage.setText(text);
            Windows.ApplicationModel.DataTransfer.Clipboard.setContent(dataPackage);
        };
        Clipboard.clear = function () {
            Windows.ApplicationModel.DataTransfer.Clipboard.clear();
        };
        return Clipboard;
    }());
    exports.default = Clipboard;
});
