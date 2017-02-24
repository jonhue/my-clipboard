if (window.jQuery) {

    var barTop = $('section#bar').offset().top;

    function fixBar() {
        if ($(window).scrollTop() > barTop) {
            if ($('nav').hasClass('show')) {
                $('section#bar').css({position: 'fixed', top: '0', width: '50%'});
            } else {
                $('section#bar').css({position: 'fixed', top: '0', width: '100%'});
            };
        } else {
            $('section#bar').css({position: 'relative', top: '0', width: '100%'});
        };
    };

    function transformBar() {
        if ($(window).scrollTop() < barTop - 1) {
            $('header').removeClass('dark');
            $('#bar').removeClass('dark');
            $('#down').removeClass('hide');
            $('#up').addClass('hide');
        } else if ($(window).scrollTop() > barTop - 1) {
            $('header').addClass('dark');
            $('#bar').addClass('dark');
            $('#down').addClass('hide');
            $('#up').removeClass('hide');
        };
    };

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
        $('section#history, header, section#pro .wrapper').stop().animate({ opacity: '0 !important' }, 100);
        setTimeout(function() {
            $('section#pro').addClass('fullPage opened');
            $('html, body').stop().animate({
                'scrollTop':  $(document).height()
            }, 750, 'swing');
            $('section#pro .middle, section#pro .bottom, #pro-close').show();
            $('section#pro .wrapper').stop().animate({ opacity: '1 !important' }, 100);
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

    function closeRun() {
        $('section#run').addClass('hide');
        $('header').removeClass('dark');
        $('#layout-wrapper').removeClass('down');
    };

    function openResume() {
        $('section#resume').fadeIn(250);
    };
    function closeResume() {
        $('section#resume').hide();
    };

    function clearHistoryLayout() {
        $('section#history .item').remove();
        $('section#history').prepend('<div class="item" id="no-events"><p class="large">Start using your clipboard (CTRL+C) ...</p></div>');
        $('#more-arrow').hide();
    };

    function showMessage(type) {
        if ( type == "copied" ) {
            $('#copied').addClass('show');
            setTimeout(function() {
                $('#copied').removeClass('show');
            }, 2000);
        };
    };

} else {
    // jQuery not loaded!
};
