(function($) {



    var isDisplay = false;


    $('.hotword.hotword-hook').click(function() {

        if(isDisplay) {
            $('.input-wrapper-float').hide();
            isDisplay = false;
        }else {
            $('.input-wrapper-float').show();
            isDisplay = true;
        }

        return false;
    });

    $(document).click(function() {

        if(isDisplay) {
            $('.input-wrapper-float').hide();
            isDisplay = false;
        }

    });

    

    $('.input-wrapper-float').click(function(e) {
        e.stopPropagation();
    });


  /*  var search = $('.hao123-search');
    var searchPos = $('.hao123-search').offset().top;
    $(window).scroll(function() {

        if($(this).scrollTop() > searchPos) {
            search.addClass('top');
        }else {
            search.removeClass('top');
        }

    });
*/
})(jQuery);

