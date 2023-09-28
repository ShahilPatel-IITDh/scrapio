$(function () {            
            $(window).bind("scroll", function () {
                var sTop = $(window).scrollTop();
                var sTop = parseInt(sTop);
                if (sTop >=1) {
                    $(".header").addClass("header1"); 
                }
            });
        });
$(function () {            
            $(window).bind("scroll", function () {
                var sTop = $(window).scrollTop();
                var sTop = parseInt(sTop);
                if (sTop <=1) {
					$(".header").removeClass("header1"); 	
                }
            });
        });