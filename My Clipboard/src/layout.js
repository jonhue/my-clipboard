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

    get barTop() {
        return $('section#bar').offset().top;
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

    fixBar() {
        if ( $(window).scrollTop() > this.barTop ) {
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
        if ( $(window).scrollTop() < this.barTop - 1 ) {
            $('header').removeClass('dark');
            $('#bar').removeClass('dark');
            $('#down').removeClass('hide');
            $('#up').addClass('hide');
        } else if ( $(window).scrollTop() > this.barTop - 1 ) {
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
        $('html, body').stop().animate({ 'scrollTop':  this.barTop }, 350, 'swing');
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

    closeRun() {
        $('section#run').addClass('hide');
        $('header').removeClass('dark');
        $('#layout-wrapper').removeClass('down');
    }

    openResume() {
        $('section#resume').fadeIn(250);
    }
    closeResume() {
        $('section#resume').hide();
    }

    // clearHistoryLayout() {
    //     $('section#history .item').remove();
    //     $('section#history').prepend('<div class="item" id="no-events"><p class="large">Start using your clipboard (CTRL+C) ...</p></div>');
    //     $('#more-arrow').hide();
    // }

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
        layout.renderHistory();

        $(window).resize(() => {
            location.reload();
        });
        $(window).scroll(() => {
            layout.fixBar();
            layout.transformBar();
        });

        $('#run-background-task').click(() => {
            layout.closeRun();
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
            layout.donate();
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
            layout.buyPro();
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
            layout.resetHistory();
            layout.clearHistoryLayout();
        });

        $('section#resume button').click(() => {
            layout.checkFeatures();
            layout.closeResume();
        });

        $('section#history p.large').click(() => {
            layout.copyClipboard($(this).closest('div').prop('id'));
            layout.showMessage('copied');
        });

        $('section#history').hover(() => {
            if ( !$('#click-to-copy').hasClass('hide') ) {
                $('#click-to-copy').addClass('show');
                setTimeout(() => {
                    $('#click-to-copy').removeClass('show');
                    $('#click-to-copy').addClass('hide');
                }, 4000);
            };
        });

        $('#show-clipboard-open, nav .show-clipboard-open').click(() => {
            layout.getClipboard();
            $('section#show-clipboard').addClass('show');
            setTimeout(() => {
                $('section#show-clipboard #textarea').focus();
                $('#layout-wrapper').addClass('hidden');
            }, 750);
        });
        $('#show-clipboard-close').click(() => {
            $('section#show-clipboard').removeClass('show');
            $('#layout-wrapper').removeClass('hidden');
        });
        $('#save-to-clipboard').click(() => {
            layout.saveToClipboard($('section#show-clipboard #textarea').text());
            layout.showMessage('saved');
        });

        return layout;
    }

}

export default Layout;
