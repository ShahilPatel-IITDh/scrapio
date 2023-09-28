$(function () {
    'use strict';

    /**** UI START ****/
    window.initDotDotDot = (function () {
        $(".dotdotdot").dotdotdot({
            wrap: 'letter',
            watch: true
        });
    })
    window.strip_tags = (function (content) {
        return $('<div>').html(content).text();
    });
    /**** UI END ****/

    window.initDotDotDot();
});