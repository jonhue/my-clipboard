import Clipboard from './clipboard';

class Layout {

    constructor(account) {
        this._account = account;
    }

    get account() {
        return this._account;
    }
    set account(val) {
        this._account = val;
    }

    renderHistory() {
        // ...
    }

    checkFeatures() {
        if (this.account.pro) {
            $('section#pro').hide();
            $('section#history .item:nth-last-child(4)').addClass('is-bottom');
            $('section#history #more-arrow').hide();
            $('#navigation h1.pro').hide();
            $('#navigation h1.donate').show();
            this.renderHistory();
        } else {}
    }

    setPrices() {
        $('button#buy-pro').html( 'Buy for ' + this.account.app.licenseInformation.productLicenses['1'].formattedPrice );
    }

    setVersion() {
        $('#version').append('<p class="small">Version ' + this.account.app.version.major + '.' + this.account.app.version.minor + '.' + this.account.app.version.build + '.' + this.account.app.version.revision + '</p>');
    }

    setReviewUrl() {
        $('nav a.bottom').attr('href', 'ms-windows-store://review/?PFN=' + this.account.app.familyNname);
    }

    clearClipboard() {
        $('#clipboard-icon').addClass('shaking');
        setTimeout(() => {
            $('#clipboard-icon').addClass('cleared');
            $('section#history .item').removeClass('active');
            setTimeout(() => {
                $('#clipboard-icon').removeClass('shaking');
            }, 750);
        }, 750);
    }

    clipboardCleared() {
        $('#clipboard-icon').addClass('cleared');
        $('section#history .item').removeClass('active');
    }

    readClipboard() {
        Clipboard.read((text) => {
            $('section#show-clipboard #textarea').text(text);
        });
    }

    lastItemActive() {
        $('section#history .item:first-child').addClass('active');
    }

    static init(account) {
        let layout = new Layout(account);
        layout.checkFeatures();
        layout.setPrices();
        layout.setVersion();
        layout.setReviewUrl();
        layout.renderHistory();
        return layout;
    }

}

export default Layout;
