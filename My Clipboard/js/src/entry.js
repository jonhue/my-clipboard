define(["require", "exports", "layout"], function (require, exports, layout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Entry = /** @class */ (function () {
        function Entry(history, text, date) {
            if (date === void 0) { date = new Date(); }
            this._history = history;
            this._text = text;
            this._date = date;
            this._history.items.unshift(this);
            layout_1.default.renderHistory();
        }
        Object.defineProperty(Entry.prototype, "history", {
            get: function () {
                return this._history;
            },
            set: function (val) {
                this._history = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entry.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (val) {
                this._text = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entry.prototype, "date", {
            get: function () {
                return this._date;
            },
            set: function (val) {
                this._date = val;
            },
            enumerable: true,
            configurable: true
        });
        return Entry;
    }());
    exports.default = Entry;
});
