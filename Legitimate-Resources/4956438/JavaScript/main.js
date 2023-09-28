$(function() {
    'use strict';

    // Initial Navigation Effect
    navigationStick();

    // Timeline Effect
    hideBlocks();

    // Scroll to Top
    $('#scroll-top').scrollToTop();
    $('[data-toggle="tooltip"]').tooltip();

    // Typing Effect
    $('#typed').typed({
        stringsElement: $('#typed-strings'),
        typeSpeed: 30,
        backDelay: 500,
        loop: true,
        contentType: 'html',
        loopCount: false
    });

    // Skills Circle
    $('.skill-circle').circliful({
        animation: 1,
        animationStep: 5,
        animateInView: true,
        foregroundColor: '#222',
        backgroundColor: '#ddd',
        foregroundBorderWidth: 5,
        backgroundBorderWidth: 5,
        fontColor: '#222'
    });

    // Customer Review
    $('#customer-reviews').owlCarousel({
        items: 1,
        loop: true,
        center: true,
        dots: true,
        autoplay: true
    });

    // Customers
    $('#customers').owlCarousel({
        items: 4,
        loop: true
    });

    // Portfolio Lightbox
    $('.portfolio-popup-link').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    // Portfolio Parallax Effect
    $('.counter').parallax({ imageSrc: 'images/banner.jpg' });

    // Counter Animation
    $('.counter-num').counterUp({
        delay: 100,
        time: 2000
    });

    // Delegate on Scroll
    window.addEventListener('scroll', delegate(elem, scrollFunctions));

    //Scroll to Section Event Delegation
    // $('#navbar-collapse').on('click', function(e) {
    //     if ($(e.target).is('a')) {
    //         $('#navbar-collapse').collapse('hide');
    //         $(this).closest('li').addClass('active').siblings().removeClass('active');
    //
    //         var anchorHref = $.trim($(e.target).attr('href'));
    //         if (anchorHref != '' && anchorHref != '#' && anchorHref.startsWith('#')) {
    //             scrollTopSection(e.target);
    //         }
    //
    //         return false;
    //     }
    // });

    // Contact Form AJAX Request
    // var contactForm = $('#contact-form');
    // var contactMsg = $('#contact-msg');
    // contactForm.on('submit', function(e) {
    //     contactMsg.html('');
    //     $.ajax({
    //         type: 'POST',
    //         url: 'contact.php',
    //         data: contactForm.serialize(),
    //         success: function(response) {
    //             contactMsg.html(response);
    //         }
    //     });
    //     e.preventDefault();
    // });
});