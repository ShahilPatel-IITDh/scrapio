'use strict';
var timelineBlocks = $('.cd-timeline-block');
var offset = 0.8;

var delegate = function(criteria, listener) {
    'use strict';
    return function(e) {
        var el = e.target;
        do {
            if (!criteria(el)) continue;
            e.delegateTarget = el;
            listener.apply(this, arguments);
            return;
        } while ((el = el.parentNode));
    };
};

var elem = function(elem) {
    'use strict';
    return elem;
}

// Function to Call on Scroll
function scrollFunctions() {
    'use strict';
    navigationStick();
    setTimelineAnimation();
}

// Navigation Effect
function navigationStick() {
    'use strict';
    if ($(window).scrollTop() > 0) {
        $('.navigation').addClass('stick');
        $('.navbar-brand').css('display','block');
    } else {
        $('.navigation').removeClass('stick');
        $('.navbar-brand').css('display','none');
    }
}

// Scroll to Section
function scrollTopSection(eventSource) {
    'use strict';
    if (location.pathname.replace(/^\//, '') == eventSource.pathname.replace(/^\//, '') && location.hostname == eventSource.hostname) {
        var targetX = $(eventSource.hash);
        targetX = targetX.length ? targetX : $('[name=' + eventSource.hash.slice(1) + ']');
        if (targetX.length) {
            $('html, body').animate({
                scrollTop: targetX.offset().top
            }, 1000);
        }
    }

    return false;
}

// Hide Timeline Image
function hideBlocks() {
    'use strict';
    timelineBlocks.each(function() {
        ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
        ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.cd-timeline-dot, .cd-timeline-content').addClass('is-hidden');
    });
}

// Show Timeline Image
function showBlocks() {
    'use strict';
    timelineBlocks.each(function() {
        ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden')) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
        ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-dot').hasClass('is-hidden')) && $(this).find('.cd-timeline-dot, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
    });
}

// Timeline Animation
function setTimelineAnimation() {
    'use strict';
    (!window.requestAnimationFrame) ?
    setTimeout(function() {
        showBlocks();
    }, 100): window.requestAnimationFrame(function() {
        showBlocks();
    });
}