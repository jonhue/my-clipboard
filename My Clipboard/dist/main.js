!function(t){var e={};function o(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=e,o.d=function(t,e,s){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:s})},o.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";o.r(e);var s=class{get app(){return Windows.ApplicationModel}get package(){return this.app.Package.current}get packageId(){return this.package.id}get familyName(){return this.packageId.familyName}get version(){return this.packageId.version}roamingSettings(t){return Windows.Storage.ApplicationData.current.roamingSettings.values[t]}addRoamingSetting(t,e){Windows.Storage.ApplicationData.current.roamingSettings.values[t]=e}localSettings(t){return Windows.Storage.ApplicationData.current.localSettings.values[t]}addLocalSetting(t,e){Windows.Storage.ApplicationData.current.localSettings.values[t]=e}get store(){return this.app.Store.CurrentApp}get licenseInformation(){return this.store.licenseInformation}};var i=class{static read(t){let e=Windows.ApplicationModel.DataTransfer.Clipboard.getContent();e.contains(Windows.ApplicationModel.DataTransfer.StandardDataFormats.text)?e.getTextAsync().done(e=>{t(e)}):t(null)}static write(t){let e=Windows.ApplicationModel.DataTransfer.DataPackage();e.setText(t),Windows.ApplicationModel.DataTransfer.Clipboard.setContent(e)}static clear(){Windows.ApplicationModel.DataTransfer.Clipboard.clear()}};var a=class{constructor(t,e="Click to copy me. (Example)",o=function(t){let e=t.getMonth()+1,o=t.getDate(),s=t.getHours(),i=t.getMinutes(),a="AM";return 0==(s=(s+24)%24)?s=12:s>12&&(s%=12,a="PM"),((""+e).length<2?"0":"")+e+"/"+((""+o).length<2?"0":"")+o+" - "+((""+s).length<2?"0":"")+s+":"+((""+i).length<2?"0":"")+i+"  "+a}(new Date)){this._text=e,this._date=o;let s=t.items;s.unshift(this),t.items=s,t.account.layout&&t.account.layout.renderHistory()}get text(){return this._text}set text(t){this._text=t}get date(){return this._date}set date(t){this._date=t}};class r{constructor(t){this._account=t,this._items=new Array,t.app.addLocalSetting("historyItems",JSON.stringify(this._items))}get account(){return this._account}set account(t){this._account=t}get items(){return this._items=JSON.parse(this.account.app.localSettings("historyItems")),this._items}set items(t){this._items=t,this.account.app.addLocalSetting("historyItems",JSON.stringify(this._items))}ping(){setInterval(()=>{this.track()},1e3)}track(){document.hasFocus()&&i.read(t=>{t&&" "!=t&&""!=t?this.items.length>0&&t!=this.items[0]._text?(new a(this,t),this.account.layout&&this.account.layout.clipboardUncleared()):this.account.layout&&this.account.layout.lastItemActive():this.account.layout&&this.account.layout.clipboardCleared()}),this.items.length=Math.min(this.items.length,r.limit())}static init(t){let e=JSON.parse(t.app.localSettings("historyItems")),o=new r(t);return e.length>0?e.slice().reverse().forEach(t=>{new a(o,t._text,t._date)}):new a(o),o.ping(),o}reset(){let t=new r(this.account);return new a(t),t.ping(),t}static limit(){return 10}}var n=r;var c=class{constructor(t){this._app=t}get app(){return this._app}set app(t){this._app=t}get history(){return this._history}set history(t){this._history=t}get layout(){return this._layout}set layout(t){this._layout=t}get pro(){return this.app.licenseInformation.productLicenses[1].isActive}get limit(){return this.pro?5:n.limit()}get isSetup(){return this.app.roamingSettings("isSetup")}set isSetup(t){this.app.addRoamingSetting("isSetup",t)}buyPro(){this.app.store.requestProductPurchaseAsync("1")}donate(){this.app.store.requestProductPurchaseAsync("2")}};let l=$("section#bar").offset().top;class p{constructor(t){this._account=t}get account(){return this._account}set account(t){this._account=t}renderHistory(){$("section#history .item").remove(),this.account.history.items.forEach((t,e)=>{if(e<=this.account.limit){$("section#history").append('<div class="item" id='+e+'><p class="time">'+t._date+'</p><p class="large" data-text="'+t._text+'">'+t._text+"</p></div>");let o=$("section#history .item#"+e+" p.large");if(o.text().length>300){let t=o.text();t=t.substr(0,300)+"...",o.text(t)}}}),$("section#history p.large").click(()=>{this.copyToClipboard()}),this.account.pro?$("#more-arrow").hide():$("#more-arrow").show(),this.lastItemActive()}checkFeatures(){this.account.pro&&($("section#pro").hide(),$("section#history .item:nth-last-child(4)").addClass("is-bottom"),$("section#history #more-arrow").hide(),$("#navigation h1.pro").hide(),$("#navigation h1.donate").show(),this.renderHistory())}setPrices(){$("button#buy-pro").html("Buy for "+this.account.app.licenseInformation.productLicenses[1].formattedPrice)}setVersion(){$("#version").append('<p class="small">Version '+this.account.app.version.major+"."+this.account.app.version.minor+"."+this.account.app.version.build+"."+this.account.app.version.revision+"</p>")}setReviewUrl(){$("nav a.bottom").attr("href","ms-windows-store://review/?PFN="+this.account.app.familyNname)}clearClipboard(){i.clear(),$("#clipboard-icon").addClass("shaking"),setTimeout(()=>{this.clipboardCleared(),setTimeout(()=>{$("#clipboard-icon").removeClass("shaking")},750)},750)}clipboardCleared(){$("#clipboard-icon").addClass("cleared"),$("section#history .item").removeClass("active")}clipboardUncleared(){$("#clipboard-icon").removeClass("cleared shaking")}openClipboard(){i.read(t=>{$("section#show-clipboard #textarea").text(t||"Your clipboard is empty! o_o"),$("section#show-clipboard").addClass("show"),setTimeout(()=>{$("section#show-clipboard #textarea").focus()},750)})}saveClipboard(){i.write($("section#show-clipboard #textarea").text()),this.showMessage("saved")}closeClipboard(){$("section#show-clipboard").removeClass("show"),$("#layout-wrapper").removeClass("hidden")}copyToClipboard(t){i.write(t),this.showMessage("copied")}lastItemActive(){$("section#history .item#0").addClass("active"),this.clipboardUncleared()}fixBar(){$(window).scrollTop()>l?$("nav").hasClass("show")?$("section#bar").css({position:"fixed",top:"0",width:"50%"}):$("section#bar").css({position:"fixed",top:"0",width:"100%"}):$("section#bar").css({position:"relative",top:"0",width:"100%"})}transformBar(){$(window).scrollTop()<l-1?($("header").removeClass("dark"),$("#bar").removeClass("dark"),$("#down").removeClass("hide"),$("#up").addClass("hide")):$(window).scrollTop()>l-1&&($("header").addClass("dark"),$("#bar").addClass("dark"),$("#down").addClass("hide"),$("#up").removeClass("hide"))}toggleMenu(){$("nav").toggleClass("show"),$("#layout-wrapper").toggleClass("hide")}down(){$("html, body").stop().animate({scrollTop:this.barTop},350,"swing")}up(){$("html, body").stop().animate({scrollTop:0},350,"swing")}openPro(){$("section#history, header, section#pro .wrapper").stop().animate({opacity:"0 !important"},100),setTimeout(()=>{$("section#pro").addClass("fullPage opened"),$("html, body").stop().animate({scrollTop:$(document).height()},750,"swing"),$("section#pro .middle, section#pro .bottom, #pro-close").show(),$("section#pro .wrapper").stop().animate({opacity:"1 !important"},100),$("section#pro .wrapper").stop().fadeIn(350)},500)}closePro(){$("section#pro .wrapper").stop().fadeOut(250,()=>{$("section#pro").removeClass("fullPage"),$("section#pro .middle, section#pro .bottom, #pro-close").hide(),$("html, body").stop().animate({scrollTop:0},350,"swing"),setTimeout(()=>{$("section#pro .wrapper").stop().fadeIn(100),$("section#history, header").stop().animate({opacity:"1 !important"},100)},800)})}closeSetup(){this.account.isSetup=!0,$("section#run").addClass("hide"),$("header").removeClass("dark"),$("#layout-wrapper").removeClass("down")}skipSetup(){this.account.isSetup&&($("section#run").addClass("hide hidden"),$("#layout-wrapper").removeClass("down"))}openResume(){$("section#resume").fadeIn(250)}closeResume(){$("section#resume").hide()}showMessage(t){"copied"==t?($("#copied").addClass("show"),setTimeout(()=>{$("#copied").removeClass("show")},2e3)):"saved"==t&&($("#saved").addClass("show"),setTimeout(()=>{$("#saved").removeClass("show")},2e3))}static init(t){let e=new p(t);return e.checkFeatures(),e.setPrices(),e.setVersion(),e.setReviewUrl(),e.fixBar(),e.transformBar(),e.skipSetup(),e.renderHistory(),$(window).resize(()=>{location.reload()}),$(window).scroll(()=>{e.fixBar(),e.transformBar()}),$("#run-background-task").click(()=>{e.closeSetup()}),$("#up").click(()=>{e.up()}),$("#down").click(()=>{e.down()}),$("#navigation h1.clipboard").click(()=>{e.toggleMenu(),e.closePro(),e.up()}),$("#navigation h1.pro").click(()=>{e.toggleMenu(),e.openPro()}),$("#nav-open, #nav-close").click(()=>{e.toggleMenu()}),$("#donate").click(()=>{t.donate(),e.toggleMenu(),e.openResume()}),$("#pro .top").click(()=>{e.openPro()}),$("#pro-close").click(()=>{e.closePro()}),$("#buy-pro").click(()=>{t.buyPro(),e.closePro(),e.openResume()}),$("#more-arrow").click(()=>{e.openPro()}),$("#clear-clipboard").click(()=>{e.clearClipboard()}),$("#reset-history").click(()=>{e.account.history.reset()}),$("section#resume button").click(()=>{e.checkFeatures(),e.closeResume()}),$("section#history p.large").click(function(){e.copyToClipboard($(this).data("text"))}),$("#show-clipboard-open, nav .show-clipboard-open").click(()=>{e.openClipboard()}),$("#show-clipboard-close").click(()=>{e.closeClipboard()}),$("#save-to-clipboard").click(()=>{e.saveClipboard()}),e}}var d=p;let u=new c(new s);$(document).ready(()=>{u.history=n.init(u),u.layout=d.init(u)})}]);