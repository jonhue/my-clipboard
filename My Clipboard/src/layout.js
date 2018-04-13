import $ from '../Scripts/jquery-3.3.1';
import Clipboard from 'clipboard';

class Layout {

    static renderHistory() {
        // ...
    }

    static checkFeatures() {
        if (Account.pro) {
            $('section#pro').hide();
            $('section#history .item:nth-last-child(4)').addClass('is-bottom');
            $('section#history #more-arrow').hide();
            $('#navigation h1.pro').hide();
            $('#navigation h1.donate').show();
            Layout.renderHistory();
        } else {}
    }

    static setPrices() {
        $('button#buy-pro').html( 'Buy for ' + app.licenseInformation.productLicenses['1'].formattedPrice );
    }

    static setVersion() {
        $('#version').append('<p class="small">Version ' + app.version.major + '.' + app.version.minor + '.' + app.version.build + '.' + app.version.revision + '</p>');
    }

    static setReviewUrl() {
        $('nav a.bottom').attr('href', 'ms-windows-store://review/?PFN=' + app.familyNname);
    }

    static clearClipboard() {
        $('#clipboard-icon').addClass('shaking');
        setTimeout(function() {
            $('#clipboard-icon').addClass('cleared');
            $('section#history .item').removeClass('active');
            setTimeout(function() {
                $('#clipboard-icon').removeClass('shaking');
            }, 750);
        }, 750);
    }

    static clipboardCleared() {
        $('#clipboard-icon').addClass('cleared');
        $('section#history .item').removeClass('active');
    }

    static readClipboard() {
        Clipboard.read(function(text) {
            $('section#show-clipboard #textarea').text(text);
        });
    }

    static lastItemActive() {
        $('section#history .item:first-child').addClass('active');
    }

}

export default Layout;
