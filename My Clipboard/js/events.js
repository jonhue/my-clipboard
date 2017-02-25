$(document).ready(function() {
    if (window.jQuery) {

        fixBar();
        transformBar();

        $('#run-background-task').click(function() {
            pingClipboard();
            closeRun();
        });

        $(window).resize(function() {
            location.reload();
        });

        $(window).scroll(function(){
            fixBar();
            transformBar();
        });

        // $(window).scroll(function(){
        //     if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && (!$('section#pro').hasClass('fullPage')) && (!$('section#pro').hasClass('opened'))) {
        //         openPro();
        //     };
        // });

        $('#up').click(function() {
            up();
        });
        $('#down').click(function() {
            down();
        });

        $('#navigation h1.clipboard').click(function() {
            toggleMenu();
            closePro();
            up();
        });
        $('#navigation h1.pro').click(function() {
            toggleMenu();
            openPro();
        });
        $('#nav-open, #nav-close').click(function() {
            toggleMenu();
        });
        $('#donate').click(function() {
            donate();
            toggleMenu();
            openResume();
        });

        $('#pro .top').click(function() {
            openPro();
        });
        $('#pro-close').click(function() {
            closePro();
        });
        $('#buy-pro').click(function() {
            buyPro();
            closePro();
            openResume();
        });
        $('#more-arrow').click(function() {
            openPro();
        });


        $('#clear-clipboard').click(function() {
            clearClipboard();
        });
        $('#reset-history').click(function() {
            resetHistory();
            clearHistoryLayout();
        });

        $('section#resume button').click(function() {
            checkFeatures();
            closeResume();
        });

        $('section#history p.large').click(function() {
            copyClipboard($(this).closest('div').prop('id'));
            showMessage('copied');
        });

        $('section#history').hover(function() {
            if ( !$('#click-to-copy').hasClass('hide') ) {
                $('#click-to-copy').addClass('show');
                setTimeout(function() {
                    $('#click-to-copy').removeClass('show');
                    setSetting('roaming', 'click_to_copy_setup', true)
                    $('#click-to-copy').addClass('hide');
                }, 4000);
            };
        });

        $('#show-clipboard-open').click(function() {
            getClipboard();
            $('section#show-clipboard').addClass('show');
            setTimeout(function() {
                $('section#show-clipboard #textarea').focus();
                $('#layout-wrapper').addClass('hidden');
            }, 750);
        });
        $('#show-clipboard-close').click(function() {
            $('section#show-clipboard').removeClass('show');
            $('#layout-wrapper').removeClass('hidden');
        });
        $('#save-to-clipboard').click(function() {
            saveToClipboard($('section#show-clipboard #textarea').text());
            showMessage('saved');
        });

    } else {
        // jQuery not loaded!
    };
});
