define(["require", "exports", "entry", "layout"], function (require, exports, entry_1, layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var History = /** @class */ (function () {
        function History(account, items) {
            if (items === void 0) { items = []; }
            this._account = account;
            this._items = items;
            this._app.addLocalSetting('historyItems', this._items);
            window.history = this;
        }
        Object.defineProperty(History.prototype, "account", {
            get: function () {
                return this._account;
            },
            set: function (val) {
                this._account = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(History.prototype, "items", {
            get: function () {
                return this._items;
            },
            set: function (val) {
                this._items = val;
                this.app.addLocalSetting('historyItems', this._items);
            },
            enumerable: true,
            configurable: true
        });
        History.prototype.last = function () {
            if (length(this.items) > 0) {
                return this.items[length(this.items) - 1];
            }
            else {
                return null;
            }
        };
        History.prototype.ping = function () {
            setInterval(function () {
                this.track();
            }, 1000);
        };
        History.prototype.track = function () {
            if (document.hasFocus()) {
                // Get Clipboard
                Clipboard.read(function (text) {
                    // If Clipboard changed to last event
                    if (this.last && text != this.last.text) {
                        // Check if Clipboard is empty
                        if (text === ' ' || text === '') {
                            layout_1.default.clipboardCleared();
                        }
                        else {
                            if (length(this.items) == History.limit) {
                                this.items.pop();
                            }
                            new entry_1.default(this, text);
                        }
                    }
                    else {
                        layout_1.default.lastItemActive();
                    }
                });
            }
        };
        History.init = function (account) {
            if (this.app.localSettings.historyItems === Array) {
                var items_1 = [];
                this.app.localSettings.values.historyItems.forEach(function (entry) {
                    items_1.push(new entry_1.default(entry.text, entry.date));
                });
                history = new History(account, items_1);
            }
            else {
                history = new History(account);
                new entry_1.default(history, 'Click to copy me. (Example)');
            }
            history.ping();
            return history;
        };
        History.reset = function () {
            return new History();
        };
        History.limit = function () {
            return 250;
        };
        return History;
    }());
    exports.default = History;
});
// function setHistory() {
//     $('section#history .item').remove();
//
//     var historyEventsCount = localSettings.values["historyEventsCount"];
//     var historyEventsMin = localSettings.values["historyEventsMin"];
//     if ( historyEventsCount > 0 ) {
//         try {
//             if ( !licenseInformation.productLicenses["1"].isActive ) {
//                 $('#more-arrow').show();
//             };
//         } catch(error) {};
//
//         for ( var i = historyEventsMin; i < historyEventsCount; i++ ) {
//             var item = localSettings.values[i]
//             $('section#history').prepend('<div class="item" id=' + i + '><p class="time">' + item["date"] + '</p><p class="large">' + item["value"] + '</p></div>');
//
//             item = $('section#history .item#' + i + ' p.large');
//             if ( item.html().length > 300 ) {
//                 var text = item.text();
//                 text = text.substr(0,300) + '...';
//                 item.text(text);
//             };
//         };
//         if ( (localSettings.values[historyEventsCount])["value"] != " " && (localSettings.values[historyEventsCount])["value"] != "" ) {
//             $('section#history .item:first-child').addClass('active');
//         } else {
//             $('#clipboard-icon').addClass('cleared');
//         };
//         try {
//             if ( historyEventsMin > 0 && licenseInformation.productLicenses["1"].isActive ) {
//                 $('section#history').append('<div class="item" id="history-full"><p class="large">There are no older clipboard contents.</p></div>');
//             };
//         } catch(error) {};
//     } else {
//         clearHistoryLayout();
//     };
//
//     if ( roamingSettings.values["click_to_copy_setup"] ) {
//         $('#click-to-copy').addClass('hide');
//     };
// };
