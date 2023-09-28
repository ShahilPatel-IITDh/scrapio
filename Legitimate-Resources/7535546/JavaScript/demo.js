//fixed-nav
$(document).on("scroll",function(){
	if($(document).scrollTop()>20){ 
		$("header").removeClass("large").addClass("small");
	}
	else{
		$("header").removeClass("small").addClass("large");
	}
});


//language
$(function(){
	$(".select").each(function(){
		var s=$(this);
		var z=parseInt(s.css("z-index"));
		var dt=$(this).children("dt");
		var dd=$(this).children("dd");
		var _show=function(){dd.slideDown(200);dt.addClass("cur");s.css("z-index",z+1);};   //展开效果
		var _hide=function(){dd.slideUp(200);dt.removeClass("cur");s.css("z-index",z);};    //关闭效果
		dt.click(function(){dd.is(":hidden")?_show():_hide();});
		dd.find("a").click(function(){dt.html($(this).html());_hide();});     //选择效果（如需要传值，可自定义参数，在此处返回对应的“value”值 ）
		$("body").click(function(i){ !$(i.target).parents(".select").first().is(s) ? _hide():"";});
	})
})


//search
 $(function(){
     $(".attr-nav").each(function(){  
                $(".search", this).on("click", function(e){
                    e.preventDefault();
                    $(".top-search").slideToggle();
                });
            });
            $(".input-group-addon.close-search").on("click", function(){
                $(".top-search").slideUp();
            })
  })


//back-top
$(function(){
	$(window).scroll(function(){
		var _top = $(window).scrollTop();
		if(_top>300){
			$('.back_top').fadeIn(600);
		}else{
			$('.back_top').fadeOut(600);
		}
	});
	$(".back_top").click(function(){
		$("html,body").animate({scrollTop:0},500);
	});
});



$(function() {
	$(".tcon").hover(function() {
		$(this).children(".tcon a").css("left", "34px");
	}, function() {
		$(this).children(".tcon a").css("left", "-200px");
	});
});


//fixed inquiry
$(document).ready(function(){

    $("#floatShow").bind("click",function(){
	
        $("#onlineService").animate({
            height:"show", 
            opacity:"show"
        }, "normal" ,function(){
            $("#onlineService").show();
        });
		
        $("#floatShow").attr("style","display:none");
        $("#floatHide").attr("style","display:block");
		
        return false;
    });
	
    $("#floatHide").bind("click",function(){
	
        $("#onlineService").animate({
            height:"hide", 
            opacity:"hide"
        }, "normal" ,function(){
            $("#onlineService").hide();
        });
		
        $("#floatShow").attr("style","display:block");
        $("#floatHide").attr("style","display:none");
		
        return false;
    });
  
});


$(function(){
	$('.autoplay1').slick({
		infinite: true,
		speed: 1500,
		slidesToShow: 3,
		slidesToScroll: 3,
		autoplay: true,
		autoplaySpeed:3000,
		pauseOnHover:false,
		dots:true,
		responsive: [
		{
		  breakpoint: 992,
		  settings: {
		    slidesToShow:2,
		    slidesToScroll: 1,
		    autoplay: true,
		    autoplaySpeed:3000,
	        infinite: true,
		    dots:true,
			}
		},
		{
		  breakpoint:768,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		},
		{
		  breakpoint:488,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		},
		{
		  breakpoint: 420,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		}
	]
	})
})


$(function(){
	$('.autoplay2').slick({
		infinite: true,
		speed: 1500,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed:3000,
		pauseOnHover:false,
		dots:true,
		responsive: [
		{
		  breakpoint: 992,
		  settings: {
		    slidesToShow:3,
		    slidesToScroll: 1,
		    autoplay: true,
		    autoplaySpeed:3000,
	        infinite: true,
		    dots:true,
			}
		},
		{
		  breakpoint:768,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		},
		{
		  breakpoint: 420,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		}
	]
	})
})


$(function(){
	$('.autoplay3').slick({
		infinite: true,
		speed: 1500,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed:3000,
		pauseOnHover:false,
		dots:true,
		responsive: [
		{
		  breakpoint: 992,
		  settings: {
		    slidesToShow:4,
		    slidesToScroll: 1,
		    autoplay: true,
		    autoplaySpeed:3000,
	        infinite: true,
		    dots:true,
			}
		},
		{
		  breakpoint:768,
		  settings: {
			slidesToShow: 3,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		},
		{
		  breakpoint: 480,
		  settings: {
			slidesToShow: 2,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		},
		{
		  breakpoint: 420,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		}
	]
	})
})

$(function(){
	$('.autoplay5').slick({
		infinite: true,
		speed: 1500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed:3000,
		pauseOnHover:false,
		dots:true,
		responsive: [
		{
		  breakpoint: 992,
		  settings: {
		    slidesToShow:1,
		    slidesToScroll: 1,
		    autoplay: true,
		    autoplaySpeed:3000,
	        infinite: true,
		    dots:true,
			}
		},
		{
		  breakpoint:768,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		},
		{
		  breakpoint: 420,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed:3000,
			dots:true,
		  }
		}
	]
	})
})
