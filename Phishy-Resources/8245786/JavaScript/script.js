(function($) {
    'use strict';
    new WOW().init();
    var ClockDate = $('#clock').data("date");
    $('#clock').countdown(ClockDate, function(event) {
        var $this = $(this).html(event.strftime('' +
            '<ul>' +
            '<li><span>%D<em>days</em></span></li>' +
            '<li><span>%H<em>hours </em></span></li>' +
            '<li><span>%M<em>minutes</em></span></li>' +
            '<li><span>%S<em>seconds</em></span></li>' +
            '</ul>'));
    });
})(jQuery);