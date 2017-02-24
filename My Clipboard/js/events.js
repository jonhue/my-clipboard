$(document).ready(function() {
    if (window.jQuery) {

        fixBar();
        transformBar();

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

    } else {
        // jQuery not loaded!
    };
});
