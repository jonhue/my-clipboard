define(["require", "exports", "../Scripts/jquery-3.3.1", "clipboard"], function (require, exports, jquery_3_3_1_1, clipboard_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Layout = /** @class */ (function () {
        function Layout() {
        }
        Layout.renderHistory = function () {
            // ...
        };
        Layout.checkFeatures = function () {
            if (Account.pro) {
                jquery_3_3_1_1.default('section#pro').hide();
                jquery_3_3_1_1.default('section#history .item:nth-last-child(4)').addClass('is-bottom');
                jquery_3_3_1_1.default('section#history #more-arrow').hide();
                jquery_3_3_1_1.default('#navigation h1.pro').hide();
                jquery_3_3_1_1.default('#navigation h1.donate').show();
                Layout.renderHistory();
            }
            else { }
        };
        Layout.setPrices = function () {
            jquery_3_3_1_1.default('button#buy-pro').html('Buy for ' + app.licenseInformation.productLicenses['1'].formattedPrice);
        };
        Layout.setVersion = function () {
            jquery_3_3_1_1.default('#version').append('<p class="small">Version ' + app.version.major + '.' + app.version.minor + '.' + app.version.build + '.' + app.version.revision + '</p>');
        };
        Layout.setReviewUrl = function () {
            jquery_3_3_1_1.default('nav a.bottom').attr('href', 'ms-windows-store://review/?PFN=' + app.familyNname);
        };
        Layout.clearClipboard = function () {
            jquery_3_3_1_1.default('#clipboard-icon').addClass('shaking');
            setTimeout(function () {
                jquery_3_3_1_1.default('#clipboard-icon').addClass('cleared');
                jquery_3_3_1_1.default('section#history .item').removeClass('active');
                setTimeout(function () {
                    jquery_3_3_1_1.default('#clipboard-icon').removeClass('shaking');
                }, 750);
            }, 750);
        };
        Layout.clipboardCleared = function () {
            jquery_3_3_1_1.default('#clipboard-icon').addClass('cleared');
            jquery_3_3_1_1.default('section#history .item').removeClass('active');
        };
        Layout.readClipboard = function () {
            clipboard_1.default.read(function (text) {
                jquery_3_3_1_1.default('section#show-clipboard #textarea').text(text);
            });
        };
        Layout.lastItemActive = function () {
            jquery_3_3_1_1.default('section#history .item:first-child').addClass('active');
        };
        return Layout;
    }());
    exports.default = Layout;
});
