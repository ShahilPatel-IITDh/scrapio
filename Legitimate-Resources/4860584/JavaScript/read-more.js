(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    }
    else if(typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('jquery'));
    }
    else {
        factory(jQuery);
    }
}(function ($, undefined) {
    $(document).ready(function(){
        $(document).on("click", ".stars-testimonials .stars-read-more", function(e){
            e.preventDefault();
            addStarsPopupCode();
            var htmlContent = $(this).closest(".premio-read-more-content").find(".read-more-content").html();
            $("#stars-content-area").html(htmlContent);
            $("#star-testimonial-box").addClass("active");
            setTimeout(function(){
                $(".star-testimonial-content-area").addClass("active");
            }, 100);
        });

        $(document).on("click", "#star-testimonial-box", function(){

            $("#star-testimonial-content-area").removeClass("active");
            setTimeout(function(){
                $("#star-testimonial-box").removeClass("active");
            }, 100);
        });

        $(document).on("click", ".close-stars-testimonial", function(e){
            e.stopPropagation();
            e.preventDefault();
            $("#star-testimonial-content-area").removeClass("active");
            setTimeout(function(){
                $("#star-testimonial-box").removeClass("active");
            }, 100);
        });

        $(document).on("click", "#star-testimonial-content", function(e){
            e.stopPropagation();
        });
    });

    function addStarsPopupCode() {
        if(!$("#star-testimonial-box").length) {
            $("body").append("<div id='star-testimonial-box' class='star-testimonial-box'></div>");
            $("#star-testimonial-box").append("<div id='star-testimonial-content' class='star-testimonial-content'></div>");
            $("#star-testimonial-content").append("<div id='star-testimonial-content-area' class='star-testimonial-content-area'></div>");
            $("#star-testimonial-content-area").append("<a href='#' class='close-stars-testimonial'><span></span></a>");
            $("#star-testimonial-content-area").append("<div id='stars-content-area' class='stars-content-area'></div>");
        }
    }
}));