$(document).ready(function() {
    if (window.jQuery) {

        $(window).scroll(function(){
            if ($(window).scrollTop() > barTop) {
                if ($('nav').hasClass('show')) {
                    $('section#bar').css({position: 'fixed', top: '0', width: '50%'});
                } else {
                    $('section#bar').css({position: 'fixed', top: '0', width: '100%'});
                };
            } else {
                $('section#bar').css({position: 'relative', top: '0', width: '100%'});
            };
        });

        $(window).scroll(function(){
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
        });

        // $(window).scroll(function(){
        //     if (((window.innerHeight + window.scrollY) >= document.body.offsetHeight) && (!$('section#pro').hasClass('fullPage')) && (!$('section#pro').hasClass('opened'))) {
        //         openPro();
        //     };
        // });

        $('#nav-open, #nav-close').click(function() {
            toggleMenu();
        });
        $('#up').click(function() {
            up();
        });
        $('#down').click(function() {
            down();
        });
        $('#more-arrow').click(function() {
            openPro();
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
        $('#pro .top').click(function() {
            openPro();
        });
        $('#pro-close').click(function() {
            closePro();
        });

    } else {
        // jQuery not loaded!
    };
});