if (window.jQuery) {

    var barTop = $('section#bar').offset().top;

    function toggleMenu() {
        $('nav').toggleClass('show');
        $('#layout-wrapper').toggleClass('hide');
    };

    function down() {
        $('html, body').stop().animate({
            'scrollTop':  barTop
        }, 350, 'swing');
    };

    function up() {
        $('html, body').stop().animate({
            'scrollTop':  0
        }, 350, 'swing');
    };

    function openPro() {
        $('section#history, header').stop().animate({ opacity: '0 !important' }, 100);
        $('section#pro .wrapper').stop().fadeOut(100);
        setTimeout(function() {
            $('section#pro').addClass('fullPage opened');
            $('html, body').stop().animate({
                'scrollTop':  $(document).height()
            }, 750, 'swing');
            $('section#pro .middle, section#pro .bottom, #pro-close').show();
            $('section#pro .wrapper').stop().fadeIn(350);
        }, 500);
    };

    function closePro() {
        $('section#pro .wrapper').stop().fadeOut(250, function() {
            $('section#pro').removeClass('fullPage');
            $('section#pro .middle, section#pro .bottom, #pro-close').hide();
            $('html, body').stop().animate({
                'scrollTop':  0
            }, 350, 'swing');
            setTimeout(function() {
                $('section#pro .wrapper').stop().fadeIn(100);
                $('section#history, header').stop().animate({ opacity: '1 !important' }, 100);
            }, 800);
        });
    };

} else {
    // jQuery not loaded!
};
