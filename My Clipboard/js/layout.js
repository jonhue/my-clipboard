define(["require", "exports", "clipboard"], function (require, exports, clipboard_1) {
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
                $('section#pro').hide();
                $('section#history .item:nth-last-child(4)').addClass('is-bottom');
                $('section#history #more-arrow').hide();
                $('#navigation h1.pro').hide();
                $('#navigation h1.donate').show();
                Layout.renderHistory();
            }
            else { }
        };
        Layout.setPrices = function () {
            $('button#buy-pro').html('Buy for ' + app.licenseInformation.productLicenses['1'].formattedPrice);
        };
        Layout.setVersion = function () {
            $('#version').append('<p class="small">Version ' + app.version.major + '.' + app.version.minor + '.' + app.version.build + '.' + app.version.revision + '</p>');
        };
        Layout.setReviewUrl = function () {
            $('nav a.bottom').attr('href', 'ms-windows-store://review/?PFN=' + app.familyNname);
        };
        Layout.clearClipboard = function () {
            $('#clipboard-icon').addClass('shaking');
            setTimeout(function () {
                $('#clipboard-icon').addClass('cleared');
                $('section#history .item').removeClass('active');
                setTimeout(function () {
                    $('#clipboard-icon').removeClass('shaking');
                }, 750);
            }, 750);
        };
        Layout.clipboardCleared = function () {
            $('#clipboard-icon').addClass('cleared');
            $('section#history .item').removeClass('active');
        };
        Layout.readClipboard = function () {
            clipboard_1.default.read(function (text) {
                $('section#show-clipboard #textarea').text(text);
            });
        };
        Layout.lastItemActive = function () {
            $('section#history .item:first-child').addClass('active');
        };
        return Layout;
    }());
    exports.default = Layout;
});
