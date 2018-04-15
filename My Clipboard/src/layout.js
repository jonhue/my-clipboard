import Clipboard from './clipboard';

let barTop = $('section#bar').offset().top;

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
        $('section#history .item').remove();
        this.account.history.items.forEach(( entry, i ) => {
            if ( i < this.account.limit ) {
                $('section#history').append('<div class="item" id=' + i + '><p class="time">' + entry._date + '</p><p class="large" data-text="' + entry._text + '">' + entry._text + '</p></div>');
                let item = $('section#history .item#' + i + ' p.large');
                if ( item.text().length > 300 ) {
                    let text = item.text();
                    text = text.substr(0,300) + '...';
                    item.text(text);
                };
            }
        });
        let layout = this;
        $('section#history .item p.large').click(function() {
            layout.copyToClipboard($(this).data('text'));
        });
        if (this.account.pro) {
            $('#more-arrow').hide();
        } else {
            $('#more-arrow').show();
        };
        this.lastItemActive();
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
        Clipboard.clear();
        $('#clipboard-icon').addClass('shaking');
        setTimeout(() => {
            this.clipboardCleared();
            setTimeout(() => {
                $('#clipboard-icon').removeClass('shaking');
            }, 750);
        }, 750);
    }
    clipboardCleared() {
        $('#clipboard-icon').addClass('cleared');
        $('section#history .item').removeClass('active');
    }
    clipboardUncleared() {
        $('#clipboard-icon').removeClass('cleared shaking');
    }

    openClipboard() {
        Clipboard.read((text) => {
            $('section#show-clipboard #textarea').text(text || 'Your clipboard is empty! o_o');
            $('section#show-clipboard').addClass('show');
            setTimeout(() => {
                $('section#show-clipboard #textarea').focus();
            }, 750);
        });
    }
    saveClipboard() {
        Clipboard.write($('section#show-clipboard #textarea').text());
        this.showMessage('saved');
    }
    closeClipboard() {
        $('section#show-clipboard').removeClass('show');
        $('#layout-wrapper').removeClass('hidden');
    }

    copyToClipboard(text) {
        Clipboard.write(text);
        this.showMessage('copied');
    }

    lastItemActive() {
        $('section#history .item#0').addClass('active');
        this.clipboardUncleared();
    }

    fixBar() {
        if ( $(window).scrollTop() > barTop ) {
            if ($('nav').hasClass('show')) {
                $('section#bar').css({ position: 'fixed', top: '0', width: '50%' });
            } else {
                $('section#bar').css({ position: 'fixed', top: '0', width: '100%' });
            }
        } else {
            $('section#bar').css({ position: 'relative', top: '0', width: '100%' });
        }
    }

    transformBar() {
        if ( $(window).scrollTop() < barTop - 1 ) {
            $('header').removeClass('dark');
            $('#bar').removeClass('dark');
            $('#down').removeClass('hide');
            $('#up').addClass('hide');
        } else if ( $(window).scrollTop() > barTop - 1 ) {
            $('header').addClass('dark');
            $('#bar').addClass('dark');
            $('#down').addClass('hide');
            $('#up').removeClass('hide');
        }
    }

    toggleMenu() {
        $('nav').toggleClass('show');
        $('#layout-wrapper').toggleClass('hide');
    }

    down() {
        $('html, body').stop().animate({ 'scrollTop':  barTop }, 350, 'swing');
    }
    up() {
        $('html, body').stop().animate({ 'scrollTop':  0 }, 350, 'swing');
    }

    openPro() {
        $('section#history, header, section#pro .wrapper').stop().animate({ opacity: '0 !important' }, 100);
        setTimeout(() => {
            $('section#pro').addClass('fullPage opened');
            $('html, body').stop().animate({ 'scrollTop':  $(document).height() }, 750, 'swing');
            $('section#pro .middle, section#pro .bottom, #pro-close').show();
            $('section#pro .wrapper').stop().animate({ opacity: '1 !important' }, 100);
            $('section#pro .wrapper').stop().fadeIn(350);
        }, 500);
    }
    closePro() {
        $('section#pro .wrapper').stop().fadeOut( 250, () => {
            $('section#pro').removeClass('fullPage');
            $('section#pro .middle, section#pro .bottom, #pro-close').hide();
            $('html, body').stop().animate({ 'scrollTop':  0 }, 350, 'swing');
            setTimeout(() => {
                $('section#pro .wrapper').stop().fadeIn(100);
                $('section#history, header').stop().animate({ opacity: '1 !important' }, 100);
            }, 800);
        });
    }

    closeSetup() {
        this.account.isSetup = true;
        $('section#run').addClass('hide');
        $('header').removeClass('dark');
        $('#layout-wrapper').removeClass('down');
    }
    skipSetup() {
        if (this.account.isSetup) {
            $('section#run').addClass('hide hidden');
            $('#layout-wrapper').removeClass('down');
        }
    }

    openResume() {
        $('section#resume').fadeIn(250);
    }
    closeResume() {
        $('section#resume').hide();
    }

    showMessage(type) {
        if ( type == 'copied' ) {
            $('#copied').addClass('show');
            setTimeout(() => {
                $('#copied').removeClass('show');
            }, 2000);
        } else if ( type == 'saved' ) {
            $('#saved').addClass('show');
            setTimeout(() => {
                $('#saved').removeClass('show');
            }, 2000);
        }
    }

    static init(account) {
        let layout = new Layout(account);

        layout.checkFeatures();
        layout.setPrices();
        layout.setVersion();
        layout.setReviewUrl();
        layout.fixBar();
        layout.transformBar();
        layout.skipSetup();
        layout.renderHistory();

        $(window).resize(() => {
            location.reload();
        });
        $(window).scroll(() => {
            layout.fixBar();
            layout.transformBar();
        });

        $('#run-background-task').click(() => {
            layout.closeSetup();
        });

        $('#up').click(() => {
            layout.up();
        });
        $('#down').click(() => {
            layout.down();
        });

        $('#navigation h1.clipboard').click(() => {
            layout.toggleMenu();
            layout.closePro();
            layout.up();
        });
        $('#navigation h1.pro').click(() => {
            layout.toggleMenu();
            layout.openPro();
        });
        $('#nav-open, #nav-close').click(() => {
            layout.toggleMenu();
        });
        $('#donate').click(() => {
            account.donate();
            layout.toggleMenu();
            layout.openResume();
        });

        $('#pro .top').click(() => {
            layout.openPro();
        });
        $('#pro-close').click(() => {
            layout.closePro();
        });
        $('#buy-pro').click(() => {
            account.buyPro();
            layout.closePro();
            layout.openResume();
        });
        $('#more-arrow').click(() => {
            layout.openPro();
        });


        $('#clear-clipboard').click(() => {
            layout.clearClipboard();
        });
        $('#reset-history').click(() => {
            layout.account.history.reset();
        });

        $('section#resume button').click(() => {
            layout.checkFeatures();
            layout.closeResume();
        });

        $('section#history .item p.large').click(function() {
            layout.copyToClipboard($(this).data('text'));
        });

        $('#show-clipboard-open, nav .show-clipboard-open').click(() => {
            layout.openClipboard();
        });
        $('#show-clipboard-close').click(() => {
            layout.closeClipboard();
        });
        $('#save-to-clipboard').click(() => {
            layout.saveClipboard();
        });

        return layout;
    }

}

export default Layout;
