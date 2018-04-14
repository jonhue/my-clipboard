!function(t){var e={};function i(s){if(e[s])return e[s].exports;var a=e[s]={i:s,l:!1,exports:{}};return t[s].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:s})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";i.r(e);var s=class{constructor(t,e,i=new Date){this._history=t,this._text=e,this._date=i,this._history.items.unshift(this),this._history.account.layout&&this._history.account.layout.renderHistory()}get history(){return this._history}set history(t){this._history=t}get text(){return this._text}set text(t){this._text=t}get date(){return this._date}set date(t){this._date=t}};class a{constructor(t){this._account=t,this._items=[],t.app.addLocalSetting("historyItems",this._items)}get account(){return this._account}set account(t){this._account=t}get items(){return this._items}set items(t){this._items=t,this.account.app.addLocalSetting("historyItems",this._items)}last(){return length(this.items)>0?this.items[length(this.items)-1]:null}ping(){setInterval(()=>{this.track()},1e3)}track(){document.hasFocus()&&Clipboard.read(t=>{this.last&&t!=this.last.text?" "===t||""===t?this.account.layout.clipboardCleared():(length(this.items)==a.limit&&this.items.pop(),new s(this,t)):this.account.layout.lastItemActive()})}static init(t){let e=new a(t);return t.app.localSettings.historyItems===Array?t.app.localSettings.values.historyItems.forEach(t=>{new s(e,t.text,t.date)}):new s(e,"Click to copy me. (Example)"),e.ping(),e}static reset(){return new a}static limit(){return 250}}var r=a;var o=class{static read(t){let e=Windows.ApplicationModel.DataTransfer.Clipboard.getContent();e.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text)?e.getTextAsync().done(e=>{t(e)}):t("Your clipboard is empty! o_o")}static write(t){let e=Windows.ApplicationModel.DataTransfer.DataPackage();e.setText(t),Windows.ApplicationModel.DataTransfer.Clipboard.setContent(e)}static clear(){Windows.ApplicationModel.DataTransfer.Clipboard.clear()}};class n{constructor(t){this._account=t}get account(){return this._account}set account(t){this._account=t}renderHistory(){}checkFeatures(){this.account.pro&&($("section#pro").hide(),$("section#history .item:nth-last-child(4)").addClass("is-bottom"),$("section#history #more-arrow").hide(),$("#navigation h1.pro").hide(),$("#navigation h1.donate").show(),this.renderHistory())}setPrices(){$("button#buy-pro").html("Buy for "+this.account.app.licenseInformation.productLicenses[1].formattedPrice)}setVersion(){$("#version").append('<p class="small">Version '+this.account.app.version.major+"."+this.account.app.version.minor+"."+this.account.app.version.build+"."+this.account.app.version.revision+"</p>")}setReviewUrl(){$("nav a.bottom").attr("href","ms-windows-store://review/?PFN="+this.account.app.familyNname)}clearClipboard(){$("#clipboard-icon").addClass("shaking"),setTimeout(()=>{$("#clipboard-icon").addClass("cleared"),$("section#history .item").removeClass("active"),setTimeout(()=>{$("#clipboard-icon").removeClass("shaking")},750)},750)}clipboardCleared(){$("#clipboard-icon").addClass("cleared"),$("section#history .item").removeClass("active")}readClipboard(){o.read(t=>{$("section#show-clipboard #textarea").text(t)})}lastItemActive(){$("section#history .item:first-child").addClass("active")}static init(t){let e=new n(t);return e.checkFeatures(),e.setPrices(),e.setVersion(),e.setReviewUrl(),e.renderHistory(),e}}var c=n;let l=new class{constructor(t){this._app=t}get app(){return this._app}set app(t){this._app=t}get history(){return this._history}set history(t){this._history=t}get layout(){return this._layout}set layout(t){this._layout=t}get pro(){return this.app.licenseInformation.productLicenses[1].isActive}get limit(){return this.pro?5:r.limit}get isSetup(){return this.app.roamingSettings.isSetup}set isSetup(t){this.app.addRoamingSetting("isSetup",t)}buyPro(){this.app.store.requestProductPurchaseAsync("1")}donate(){this.app.store.requestProductPurchaseAsync("2")}}(new class{get app(){return Windows.ApplicationModel}get package(){return this.app.Package.current}get packageId(){return this.package.id}get familyName(){return this.packageId.familyName}get version(){return this.packageId.version}get roamingSettings(){return Windows.Storage.ApplicationData.current.roamingSettings}addRoamingSetting(t,e){Windows.Storage.ApplicationData.current.roamingSettings[t]=e}get localSettings(){return Windows.Storage.ApplicationData.current.localSettings}addLocalSetting(t,e){Windows.Storage.ApplicationData.current.localSettings[t]=e}get store(){return this.app.Store.CurrentApp}get licenseInformation(){return this.store.licenseInformation}});$(document).ready(()=>{l.history=r.init(l),l.layout=c.init(l)})}]);