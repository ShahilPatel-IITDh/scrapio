$(document).ready(function () {

    $(document).on("click", "ul.contact-form-redesign > li.inactive", function(){

        var categoryName = $(this).attr('data-categoryname');
        $('ul.contact-form-subcategories').hide();
        var pos = $(this).position();

        if(window.matchMedia('(max-width: 740px)').matches){

            $(this).append($('.contact-form-subcategories.' + categoryName));
        
        }else{
            $('.contact-form-subcategories.' + categoryName).css({
                position: "absolute",
                top: pos.top + "px",
                width: "80%"
            });

            $("ul.contact-form-redesign").closest(".col-xs-12.col-sm-4").siblings(".col-xs-12.col-sm-8").find("#faqAccordion").hide();
            $("ul.contact-form-redesign").closest(".col-xs-12.col-sm-4").siblings(".col-xs-12.col-sm-8").find("h2").hide();
        }    

        $('.contact-form-subcategories.' + categoryName).css({
            display: "block",
            visibility: "visible",
            opacity: 1,
            transition: "all 500ms linear"
        })

        $("ul.contact-form-redesign > li").removeClass("active");
        $("ul.contact-form-redesign > li").addClass("inactive");
        $(this).removeClass("inactive");
        $(this).addClass("active");

    });

    $(document).on("click", "ul.contact-form-redesign > li.active", function(){

        var categoryName = $(this).attr('data-categoryname');
        var pos = $(this).position();

        $('ul.contact-form-subcategories').hide();

        if(!window.matchMedia('(max-width: 740px)').matches){  
            $("ul.contact-form-redesign").closest(".col-xs-12.col-sm-4").siblings(".col-xs-12.col-sm-8").find("#faqAccordion").show();
            $("ul.contact-form-redesign").closest(".col-xs-12.col-sm-4").siblings(".col-xs-12.col-sm-8").find("h2").show();
        }

        $('.contact-form-subcategories.' + categoryName).hide();
        $(this).removeClass("active");
        $(this).addClass("inactive");
    });

});