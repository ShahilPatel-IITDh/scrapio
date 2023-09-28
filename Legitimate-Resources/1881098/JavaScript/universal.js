
// $(window).on('resize',function() {
//     if($('.page-nav').css("text-align") == "center" ){
//         $('.page-nav').css({
//              "position": "relative",
//              "top": "auto",
//              "left": "auto"
//              });
//     } else {
//        if($('.page-nav').css("position") == "absolute" ){
//                 var nav = $('.page-nav');
//                 var offset = nav.offset(); // get the offset
//                 var post = offset.top
//                 var posl = offset.left
//                 $('.page-nav').css({
//                     "position": "fixed", // fix it's position
//                     "top": post, // set it's offset to the current top
//                     "left": posl // and left postion.
//                     });
//        } else {
//             $('.page-nav').css({
//                 "position": "absolute",
//                 "top": "0",
//                 "left": "0"
//                 });
//             var nav = $('.page-nav');
//             var offset = nav.offset(); // get the offset
//             var post = offset.top
//             var posl = offset.left
//             $('.page-nav').css({
//                 "position": "fixed", // fix it's position
//                 "top": post, // set it's offset to the current top
//                 "left": posl // and left postion.
//                 });
//        }
//     }
// });

// Modernizr Checks - Interior/Search Pages
// Modernizr.load([
//     {
//         test: Modernizr.placeholder,
//         nope: '/ly/lycos/3/js/ie-placeholder-polyfill.js'
//     }
// ]);


$(document).ready(function(){
    var height = $(window).height(); // get the height of the viewport. Used in various places
    var contentHeight = height - 69; // height of the content = height of the viewport - height of the header
    // Network Panel
    // Show and hide the network panel by toggleing the active class on click of the hamburger icon and by clicking outside of the panel.

    // $('.network-panel').css( {'height': contentHeight}); // set the panel height = to the viewport height

    $('.network-toggle').on('click', function(){ // when the mouseneters .network-toggle
        $('.uvt-dog').toggleClass('active'); // add active class to icon
        $('.network-panel').toggleClass('active'); // add active class to icon
    });

    $('html').on('click', function(){
        $('.uvt-dog').toggleClass('active', false); // add active class to icon
        $('.network-panel').toggleClass('active', false); // add active class to icon
    });

     $('html').on('tap', function(){
        $('.uvt-dog').toggleClass('active', false); // add active class to icon
        $('.network-panel').toggleClass('active', false); // add active class to icon
    });


    $('.uvt-dog, .network-panel, .uvt-menu-button, .uvt-list').on('click', function(event){
        event.stopPropagation();
    });

    $('.uvt-dog, .network-panel, .uvt-menu-button, .uvt-list').on('tap', function(event){
        event.stopPropagation();
    });


    $('.uvt-menu-button, .uvts-menu-button').on('click', function(){
        $('.uvt-menu-icon').toggleClass('active');
        $('.uvt-list, .uvts-search-block').toggleClass('active');
    });


    // $(window).trigger('resize');

    if ($('.wd-p').height() > 250) {
        $('.wd-p').addClass('wd-p-script');
        $('.wd-p-script').height('159px');
        $('.wd-trigger').show();
    }
    $('.wd-trigger').on('click', function(){
        if ($('.wd-p').hasClass('open')) {
            $('.wd-p').height('129px').removeClass('open');
            $(this).text($('.wd-trigger').data("para-more"));
        } else {
            $('.wd-p').height('auto').addClass('open');
            $(this).text($('.wd-trigger').data("para-less"));
        };
    });

    var wd_t_height = $('.wd-t').height();
    if ($('.wd-t').height() > 150) {
        $('.wd-t').addClass('wd-t-script');
        $('.wd-t-script').height('114px');
        $('.wd-t-trigger').show();
    }
    $('.wd-t-trigger').on('click', function(){
        if ($('.wd-t').hasClass('open')) {
            $('.wd-t').height('84px').removeClass('open');
            $(this).text($('.wd-t-trigger').data("para-more"));
        } else {
            $('.wd-t').height('auto').addClass('open');
            $(this).text($('.wd-t-trigger').data("para-less"));
        };
    });

});










