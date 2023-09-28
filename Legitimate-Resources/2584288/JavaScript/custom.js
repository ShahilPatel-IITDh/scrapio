/*start right box js */
  $(document).ready(function() {
	  
		 $("#productLinks").show();
		 $("#connectUs").hide();
		 $("#otherProducts").hide();			   
		  
		 $("#hConnectUs").click(function(){
			 $("#connectUs").slideDown();
			 $("#productLinks").slideUp();
			 $("#otherProducts").slideUp();
		 });
 
		$("#hOtherProducts").click(function(){
			 $("#otherProducts").slideDown();
			 $("#productLinks").slideUp();
			 $("#connectUs").slideUp();
		 });
		 
		 $("#hProductLinks").click(function(){
			 $("#productLinks").slideDown();
			 $("#otherProducts").slideUp();
			 $("#connectUs").slideUp();
		 });
		 
  });
 

/*start Search box js */
$(".search").click(function() {
	$(".search-result").toggle();
	$("#search_query").focus();
    //Changes are made for RAKSelect
    //$(".search").hide();

});
$(document).click(function(e) {
    if (!$(e.target).parents().andSelf().is('.search')) {
        $(".search-result").hide();
        $(".search").show();
    }
});
$(".serch-from").click(function(e) {
    e.stopPropagation();
});
/*end Search box js */

/*start Search box js */
$(".search1").click(function() {
    $(".search-block").toggle();

});
$(document).click(function(e) {
    if (!$(e.target).parents().andSelf().is('.search1')) {
        $(".search-block").hide();
    }
});
$(".search-block").click(function(e) {
    e.stopPropagation();
});
/*end Search box js */
/*start moblie-button box js */
$('.moblie-button').click(function() {
    $('.moblie-menus').toggleClass('open');
    $('body').toggleClass('move');
});

$('.row, section,footer,.moblie-logo ').click(function() {

    $('.moblie-menus').removeClass('open');
    $('body').removeClass('move');

});
$('.row, section,footer,.moblie-logo,.moblie-header').click(function() {

    $('span.dropdown').removeClass('open');

});


/*end moblie-button box js */
$('.moblie-menus-top .dropdown').click(function() {
    $(this).toggleClass('open').siblings().removeClass('open');
    //$(this).toggleClass('open');


});

/*end moblie-button box js */
$('.moblie-menus-bottom .dropdown').click(function() {
    $(this).toggleClass('open').siblings().removeClass('open');
    //$(this).toggleClass('open');


});
//owl-carousel js

$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: false,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: true,
            loop: true,
        },
        374: {
            items: 2,
            nav: true,
            loop: true,
        },
        768: {
            items: 2,
            nav: true,
            loop: true,
        },
        991: {
            items: 4,
            nav: false,
            loop: false,
            margin: 10
        }
    }
})

$('.owl-carousel1').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: false,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: true,
            loop: true,
        },
        374: {
            items: 2,
            nav: true,
            loop: true,
        },
        768: {
            items: 2,
            nav: true,
            loop: true,
        },
        991: {
            items: 3,
            nav: false,
            loop: false,
            margin: 10
        }
    }
})

$('.owl-carousel2').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: false,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: true,
            loop: true,
        },
        374: {
            items: 2,
            nav: true,
            loop: true,
        },
        768: {
            items: 2,
            nav: true,
            loop: true,
        },
        991: {
            items: 4,
            nav: false,
            loop: false,
            margin: 10
        }
    }
})
$('.owl-carousel3').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: false,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: true,
            loop: true,
        },
        374: {
            items: 2,
            nav: true,
            loop: true,
        },
        768: {
            items: 2,
            nav: true,
            loop: true,
        },
        991: {
            items: 4,
            nav: false,
            loop: false,
            margin: 10
        }
    }
})
$('.owl-carousel4').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: false,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: true,
            loop: true,
        },
        374: {
            items: 2,
            nav: true,
            loop: true,
        },
        768: {
            items: 2,
            nav: true,
            loop: true,
        },
        991: {
            items: 4,
            nav: false,
            loop: false,
            margin: 10
        }
    }
})
/*
$(document).ready(function() {
    //alert("hi");
    if ($(window).width() < 991) {
        //alert("hi");
        $('#accordion5 .collapse').removeClass('in');
        $('#accordion5 .panel-title').addClass('collape');
        $('#accordion4 .collapse').removeClass('in');
        $('#accordion4 .panel-title').addClass('collape');
        $('#accordion3 .collapse').removeClass('in');
        $('#accordion3 .panel-title').addClass('collape');
        $('#accordion9 .collapse').removeClass('in');
        $('#accordion9 .panel-title').addClass('collape');
        $('#accordion8 .collapse').removeClass('in');
        $('#accordion8 .panel-title').addClass('collape');
		$('#accordion-info .collapse').removeClass('in');
        $('#accordion-info .panel-title').addClass('collape');
		$('#accordion-ora .collapse').removeClass('in');
        $('#accordion-ora .panel-title').addClass('collape');
    } else {
        $('#accordion5 .collapse').addClass('in');
        $('#accordion4 .collapse').addClass('in');
        $('#accordion3 .collapse').addClass('in');
        $('#accordion8 .collapse').addClass('in');
        $('#accordion9 .collapse').addClass('in');

    }
});
*/
$(".panel-title").click(function() {
    $(this).removeClass('collape');

});
/* $(document).ready( function() {

    if ( $(window).width() > 991) {
      $('.offers-block-main').addClass('owl-carousel3');
    }
    else {$('.offers-block-main').removeClass('owl-carousel3');}
 });
 $(window).resize(function() {

    if ($(window).width() > 991) {
		//$("body").addClass("dssd");
     $('.offers-block-main').addClass('owl-carousel3');
    }
    else {$('.offers-block-main').removeClass('owl-carousel3');}
 });*/

$(document).ready(function() {

    $('.mobile-dispaly-iiner').click(function() {
        var tab_id = $(this).attr('data-tab');

        $('.mobile-dispaly-iiner').removeClass('current');
        $('.Install-block').removeClass('current');

        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    })

})

/*start select box js */
$(".custom-select").each(function() {
    $(this).wrap("<span class='select-wrapper'></span>");
    $(this).after("<span class='holder'></span>");
});
$(".custom-select").change(function() {
    var selectedOption = $(this).find(":selected").text();
    $(this).next(".holder").text(selectedOption);
}).trigger('change');

/*end select box js */

$(document).ready(function() {
    $("input[type='text'], textarea").attr('spellcheck', false);
});

/*atm adresses slideup slidedown jquery*/

$(document).ready(function() {
    $(".location-address ul li").click(function() {

        if ($(this).children(".address-pan").hasClass('active')) {
            $(this).children(".address-pan").removeClass('active');
            $(this).children().children("address").slideUp(300);
        } else {
            $("address").slideUp(300);
            $(".address-pan").removeClass("active");
            $(this).children().children("address").slideToggle(300);
            $(this).children(".address-pan").toggleClass("active");
            $(this).children().children("p").toggleClass("hidep");
        }
    });

});

/*default map hide*/
$(".nav-tabs li").click(function() {
    $("#default-map").hide();
    $(".address-pan").removeClass("active");
    $(".location-map").removeClass("fullwidth");
    $(".location-address").removeClass("slideLeft");
    $("address").slideUp(300);
});
$(".full-map").click(function() {
    $("address").slideUp(300);
});

/*map slide 100%*/
$("#default-map .full-map").click(function() {
    $("#default-map .location-address").toggleClass("slideLeft");
    $("#default-map .location-map").toggleClass("fullwidth");
});

$("#atms .full-map").click(function() {
    $("#atms .location-address").toggleClass("slideLeft");
    $("#atms .location-map").toggleClass("fullwidth");
});

$("#depositmachine .full-map").click(function() {
    $("#depositmachine .location-address").toggleClass("slideLeft");
    $("#depositmachine .location-map").toggleClass("fullwidth");
});

$("#branches .full-map").click(function() {
    $("#branches .location-address").toggleClass("slideLeft");
    $("#branches .location-map").toggleClass("fullwidth");
});

$('.owl-carousel5').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: false,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: true,
            loop: true,
        },
        374: {
            items: 2,
            nav: true,
            loop: true,
        },
        768: {
            items: 2,
            nav: true,
            loop: true,
        },
        992: {
            items: 4,
            nav: false,
            loop: false,
            margin: 10
        }
    }
})

$('.owl-carousel6').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: false,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: true,
            loop: false,
        },
        374: {
            items: 2,
            nav: true,
            loop: false,
            margin: 20,
        },
        768: {
            items: 3,
            nav: false,
            loop: false,
        },
        992: {
            items: 3,
            nav: false,
            loop: false,
            margin: 10
        }
    }
})

$('.owl-carousel7').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: false,
    responsiveClass: true,
    responsive: {
        0: {
            items: 2,
            nav: true,
            loop: true,
        },
        374: {
            items: 2,
            nav: true,
            loop: true,
        },
        768: {
            items: 3,
            nav: true,
            loop: true,
        },
        992: {
            items: 3,
            nav: true,
            loop: false,
            margin: 10
        }
    }
})

$(document).ready(function() {
    var slideCount = $('.right-table ul li').length;
    var slideWidth = $('.right-table ul li').width();
    //var slideHeight = $('.right-table ul li').height();
    var sliderUlWidth = slideCount * slideWidth;
    $('.right-table').css({
        width: slideWidth
    });
    $('.right-table ul').css({
        width: sliderUlWidth,
        marginLeft: -slideWidth
    });
    //$('.right-table ul li:last-child').prependTo('.right-table ul');

    $('a.control_prev').click(function() {
        $(this).parent().prev('div.right-table').children('ul').animate({
            left: +slideWidth
        }, 200, function() {
            var str = $(this).children('li:last-child');
            $(this).prepend(str);
            $(this).css('left', '');

        });
    });
    $('a.control_next').click(function() {

        $(this).parent().prev('div.right-table').children('ul').animate({
            left: -slideWidth
        }, 200, function() {
            var str = $(this).children('li:first-child');
            $(this).append(str);
        //    $(this).css('left', '');

        });
    });
});

$(document).ready(function() {

    $(".learnmore-pan").click(function() {
        $(".learnmore-block").fadeIn();
        $(".prepaeid-home").hide();
    });

    $(".backto-home").click(function() {
        $(".prepaeid-home").fadeIn();
        $(".learnmore-block").hide();
    });

    $(".tab-content-block2 ul .clickableTab").click(function() {
        $(".prepaeid-home").hide();
        $(".learnmore-block").hide();
        $(".tab-content1").fadeIn();
    });

    $(".tab-content1 .backto-home").click(function() {
        $(".prepaeid-home").fadeIn();
        $(".learnmore-block").hide();
        $(".tab-content1").hide();
    });

    $("ul#main-level-tabs li").click(function(e) {
        if (!$(this).hasClass("active")) {
            var tabNum = $(this).index();
            var nthChild = tabNum + 1;
            $("ul#main-level-tabs li.active").removeClass("active");
            $(this).addClass("active");
            $("#sub-level-tabs div.sub-links.active").removeClass("active");
            $("#sub-level-tabs div.sub-links:nth-child(" + nthChild + ")").addClass("active");
        }
    });

    $("#sub-tab-1 ul li").click(function(e) {
        if (!$(this).hasClass("active")) {
            var tabNum = $(this).index();
            var nthChild = tabNum + 1;
            $("#sub-tab-1 ul li.active").removeClass("active");
            $(this).addClass("active");
            $("#product-block-1 div.pro-tab-cont.active").removeClass("active");
            $("#product-block-1 div.pro-tab-cont:nth-child(" + nthChild + ")").addClass("active");
        }
    });

    $("#sub-tab-2 ul li").click(function(e) {
        if (!$(this).hasClass("active")) {
            var tabNum = $(this).index();
            var nthChild = tabNum + 1;
            $("#sub-tab-2 ul li.active").removeClass("active");
            $(this).addClass("active");
            $("#product-block-2 div.pro-tab-cont.active").removeClass("active");
            $("#product-block-2 div.pro-tab-cont:nth-child(" + nthChild + ")").addClass("active");
        }
    });

    $("#main-level-tabs li:first-child").click(function() {
        $("#product-block-1").fadeIn();
        $("#product-block-2").hide();
    });
    $("#main-level-tabs li:nth-child(2)").click(function() {
        $("#product-block-1").hide();
        $("#product-block-2").fadeIn();
    });
});

$(document).on("click", ".product-list li .close-product", function(e) {
	//alert($(this).parents('li').attr('id'));
       var parentref = $(this).parents('.product-list');
    var list_id = $(this).parents('li').attr('id');

    $(this).parent().parent().children(".option-level").addClass("option-none");
    $(this).parent().children("section").fadeOut(0);
    $(this).parent().children("article").fadeIn(500);
    $(this).fadeOut(100);
	 $(this).parent().children('article').css({"display": "block","opacity": "1" });
	  $(this).css('display', 'none');
	var listhtml = "<li id=" + list_id + ">" + $(this).parents('li').html() + "</li>";
	 $(this).parents('ul').append(listhtml);
	 $(this).parents('li').remove();
	 var deleted_listvalues = [];
	 $(parentref).children('li').children('.main-level').children('section').each(function(){
	 	if($(this).css('display') =="none"){
	 	 var section_id = $(this).attr('id').split('-')[1];
	 	 var str = "<p ><a class='view_list'  href='javascript:void(0)' listid='list-" + section_id + "'>" + $(this).children('h5').text() + "</a></p>";
            deleted_listvalues.push(str);
	 	}
	 });
	// alert(deleted_listvalues);
	  $(parentref).children('li').children('.main-level').children("article").each(function(){
	 	if($(this).css('display') !="none"){
	 	$(this).empty();
	 	$(this).append("<h5>Add Product</h5>");
	 	$(this).append(deleted_listvalues);
	 	}
	 });
});
$(document).on("click", "a.view_list", function(e) {
 	var list_id = $(this).attr('listid');
	var listhtml="";
	var indexval="";
	var object
	$(this).parents('.product-list').children('li').each(function() {
		 if ($(this).attr('id') == list_id){
		  $(this).children('.main-level').children('.close-product').css('display','block');
		 $(this).children('.main-level').children('section').css('display','block');
		 $(this).children('.main-level').children('article').css('display','none');
		 $(this).children(".option-level").removeClass("option-none");
             listhtml = $(this).html();
			indexval=$(this).index();
		}
	});
	$(this).parents('.product-list').children('li').children('.main-level').children('section').each(function(e){
		if($(this).css('display') =="none"){

		var liElement = $(this).parents('.product-list').children('li').get(indexval);
		var object=$(this).parents('li');

		$(liElement).insertBefore(object).fadeIn(500);
		var deleted_listvalues = [];

		$(this).parents('.product-list').children('li').children('.main-level').children('section').each(function(){
		 	if($(this).css('display') =="none"){
		 	 var section_id = $(this).attr('id').split('-')[1];
		 	 var str = "<p ><a class='view_list'  href='javascript:void(0)' listid='list-" + section_id + "'>" + $(this).children('h5').text() + "</a></p>";
	            deleted_listvalues.push(str);

		 	}
		 });

		 $(this).parents('.product-list').children('li').children('.main-level').children("article").each(function(){
		 	if($(this).css('display') !="none"){
		 	$(this).empty();
		 	$(this).append("<h5>Add Product</h5>");
		 	$(this).append(deleted_listvalues);
		 	}
		 });
		e.stopPropagation();
		}
	});
});


$('#sub-level-tabs').hide();
$('#main-level-tabs li').click(function() {
	$('#sub-level-tabs').show();
										
});

$('.owl-carousel8').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:2
        },
        600:{
            items:2
        },
        991:{
            items:2,
			stagePadding: 50
        }
    }
})

$(document).ready(function() {
    $('.controls .next').click(function(event) {
		//alert('hi');
        event.preventDefault();
        $('.collect-table-inner').animate({scrollLeft:'+=100'}, 'slow');  
		$("#mob-scroll").smoothTouchScroll({ continuousScrolling: true });	      
    });
    $('.controls .prev').click(function(event) {
		//alert('pre');
        event.preventDefault();
        $('.collect-table-inner').animate({scrollLeft:'-=100'}, 'slow'); 
		$("#mob-scroll").smoothTouchScroll({ continuousScrolling: true });    		   
    });
});
$('.owl-carousel11').owlCarousel({
    loop: true,
    autoplay: true,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: true,
            loop: true,
        },
        374: {
            items: 1,
            nav: true,
            loop: true,
        },
        768: {
            items: 1,
            nav: true,
            loop: true,
        },
        992: {
            items: 1,
            nav: true,
            loop: true,
            margin: 10
        }
    }
})


$(document).ready(function($){
    $(".select-wrapper .holder").addClass("highlight");
    $('select').change(function(){
       // $(".select-wrapper .holder").removeClass("highlight");
       // $('.' + this.name).attr('class', this.name + ' ' + this.value.toLowerCase());
	   var self = this;
    var parent = $(self).parent();
    
    parent.find('.highlight').removeClass('highlight');    
    });

});
/*
$('.live-icon,.live-silder-bar').click(function() {
	 $('.live-chat-popup').removeClass('close');
    $('.live-chat-popup').toggleClass('open');
    $('.live-icon').toggleClass('active');
});
$('.send-button').click(function() {
    $('.live-chat-popup').toggleClass('close');
	$('.live-chat-popup').toggleClass('open');
    $('.live-icon').removeClass('active');
});*/
/*$('#myModal1').modal()*/

/*start datepicker js */
$( "#datepicker" ).datepicker();
/*end datepicker js */
$(document).ready(function(){
	
	$('.card-form-block button').click(function(){
		var tab_id = $(this).attr('data-tab');
		//$('ul.tabs li').removeClass('current');
		$('.modal-body').removeClass('current');
		//$(this).addClass('current');
		$("."+tab_id).addClass('current');
	})
	$('#apply-now').click(function(){
		$(".step-1").addClass('current');
		$(".step-2").removeClass('current');
		$(".step-3").removeClass('current');
	});
	$('#apply-now1').click(function(){
		$(".step-4").addClass('current');
		$(".step-5").removeClass('current');
		
	});
})

$(function () {
  $("#feedback-related").change(function() {
    var val = $(this).val();
    if(val === "Transaction Account") {
        $(".hidden-form").show();
       // $("#client_graph_form").hide();
    }
    else if(val != "Transaction Account") {
         $(".hidden-form").hide();
    }
  });
});
$('.owl-carousel13').owlCarousel({
    loop: true,
    margin: 10,
    autoplay: false,
    responsiveClass: true,
	 nav: false,
    responsive: {
        0: {
            items: 1,
            loop: true,
        },
        374: {
            items: 2,
            loop: true,
        },
        768: {
            items: 2,
            loop: true,
        },
        991: {
            items: 3,
            loop: false,
            margin: 10
        }
    }
})
$(document).click(function(e) {
    if (!$(e.target).parents().andSelf().is('.live-icon')) {
        $(".live-chat-popup").removeClass('open');
    }
});
$(".live-form-field-left, .live-form-field-left1, .select-wrapper, .live-form-field-right").click(function(e) {
    e.stopPropagation();
});
$('.owl-carousel10').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{ 
            items:2
        },
        600:{
            items:3
        },
        991:{
            items:3,
        }
    }
})
$('.owl-carousel-bcc').owlCarousel({
	loop : true,
	margin : 10,
	autoplay : false,
	responsiveClass : true,
	responsive : {
		0 : {
			items : 1,
			nav : true,
			loop : true,
		},
		768 : {
			items : 2,
			nav : true,
			loop : true,
		},
		991 : {
			items : 3,
			nav : false,
			loop : false,
			margin : 10
		}
	}
})
$( document).ready(function() {
	if(window.location.href.indexOf("?apply-calc")>=0){
       $("#popupContainer").show();
       $(".overly").toggleClass('active');
    } else {
       $("#popupContainer").hide();
    }
    $("#popup-calc").click(function(){
         $("#popupContainer").show();
         $(".overly").toggleClass('active');
    });
    $("#popCloseBox").click(function(){
         $("#popupContainer").fadeOut();
         $(".overly").toggleClass('active');
    });
});
$('.tab-content-block ul li:last-child').click(function(){
	 $(this).removeClass('active');
});
