

			jQuery(document).ready(function($) {
			var leaderHeight = $("#zox-lead-top").outerHeight();
			var botHeight = $("#zox-bot-head-wrap").outerHeight();
			var navHeight = $("#zox-main-head-wrap").outerHeight();
			var headerHeight = navHeight + leaderHeight;
			var stickHeight = headerHeight - botHeight;
			var previousScroll = 0;
			$(window).scroll(function(event){
				var scroll = $(this).scrollTop();
				if ( typeof leaderHeight !== "undefined" ) {
					if ($(window).scrollTop() > headerHeight){
						$("#zox-bot-head-wrap").addClass("zox-fix-up");
						$("#zox-site-grid").css("margin-top", botHeight);
						$(".zox-post-soc-scroll").addClass("zox-post-soc-scroll-out");
						$(".zox-fly-top").addClass("zox-to-top");
					} else {
						$("#zox-bot-head-wrap").removeClass("zox-fix-up");
						$("#zox-site-grid").css("margin-top", "0" );
						$(".zox-post-soc-scroll").removeClass("zox-post-soc-scroll-out");
						$(".zox-fly-top").removeClass("zox-to-top");
					}
					if ($(window).scrollTop() > headerHeight - botHeight){
						$("#zox-bot-head-wrap").addClass("zox-fix");
						if(scroll < previousScroll) {
							$("#zox-bot-head-wrap").addClass("zox-fix");
							$("#zox-site-grid").css("margin-top", botHeight);
						} else {
							$("#zox-bot-head-wrap").removeClass("zox-fix");
						}
					} else {
						$("#zox-bot-head-wrap").removeClass("zox-fix");
						$("#zox-site-grid").css("margin-top", "0" );
					}
				} else {
					if ($(window).scrollTop() > navHeight){
						$("#zox-bot-head-wrap").addClass("zox-fix-up");
						$("#zox-site-grid").css("margin-top", botHeight);
						$(".zox-post-soc-scroll").addClass("zox-post-soc-scroll-out");
						$(".zox-fly-top").addClass("zox-to-top");
					} else {
						$("#zox-bot-head-wrap").removeClass("zox-fix-up");
						$("#zox-site-grid").css("margin-top", "0" );
						$(".zox-post-soc-scroll").removeClass("zox-post-soc-scroll-out");
						$(".zox-fly-top").removeClass("zox-to-top");
					}
					if ($(window).scrollTop() > navHeight - botHeight){
						$("#zox-bot-head-wrap").addClass("zox-fix");
						if(scroll < previousScroll) {
							$("#zox-bot-head-wrap").addClass("zox-fix");
							$("#zox-site-grid").css("margin-top", botHeight);
						} else {
							$("#zox-bot-head-wrap").removeClass("zox-fix");
						}
					} else {
						$("#zox-bot-head-wrap").removeClass("zox-fix");
						$("#zox-site-grid").css("margin-top", "0" );
					}
				}
				previousScroll = scroll;
			});
			$(".zox-alp-side-in").niceScroll({cursorcolor:"#ccc",cursorwidth: 5,cursorborder: 0,zindex:999999});
			});
			

	jQuery(document).ready(function($) {
	$(".zox-fly-nav-menu .menu-item-has-children a").click(function(event){
	  event.stopPropagation();
  	});

	$(".zox-fly-nav-menu .menu-item-has-children").click(function(){
    	  $(this).addClass("toggled");
    	  if($(".menu-item-has-children").hasClass("toggled"))
    	  {
    	  $(this).children("ul").toggle();
	  $(".zox-fly-nav-menu").getNiceScroll().resize();
	  }
	  $(this).toggleClass("tog-minus");
    	  return false;
  	});

	// Main Menu Scroll
	  $(".zox-fly-nav-menu").niceScroll({cursorcolor:"#888",cursorwidth: 7,cursorborder: 0,zindex:999999});
	});
	

	jQuery(document).ready(function($) {
		var headwrap = $("#zox-bot-head-wrap");
		var position = headwrap.offset();
		var headWidth = $("#zox-bot-head-wrap").outerWidth();
		$(".zox-mega-dropdown").css("width", headWidth );
		$(".zox-mega-dropdown").offset({
			left: position.left,
			width: headwrap.offsetWidth
		});
		$(window).resize(function(){
			var headwrap = $("#zox-bot-head-wrap");
			var position = headwrap.offset();
			var headWidth = $("#zox-bot-head-wrap").outerWidth();
			$(".zox-mega-dropdown").css("width", headWidth );
			$(".zox-mega-dropdown").offset({
  				left: position.left,
				width: headwrap.offsetWidth
			});
		});
	});
	

	jQuery(document).ready(function($) {
	$(".infinite-content").infinitescroll({
	  navSelector: ".zox-nav-links",
	  nextSelector: ".zox-nav-links a:first",
	  itemSelector: ".infinite-post",
	  errorCallback: function(){ $(".zox-inf-more-wrap").css("display", "none") }
	});
	$(window).unbind(".infscr");
	$(".zox-inf-more-but").click(function(){
   		$(".infinite-content").infinitescroll("retrieve");
        	return false;
	});
	if ($(".zox-nav-links a").length) {
		$(".zox-inf-more-wrap").css("display","inline-block");
	} else {
		$(".zox-inf-more-wrap").css("display","none");
	}
	});
	

	jQuery(document).ready(function($) {
	var leaderHeight = $("#zox-lead-top").outerHeight();
	$("#zox-lead-top-wrap").css("height", leaderHeight );

	$(window).resize(function(){
		var leaderHeight = $("#zox-lead-top").outerHeight();
		$("#zox-lead-top-wrap").css("height", leaderHeight );
	});

	});
  	

	jQuery(document).ready(function($) {
		var adWidth = $(".zox-post-ad-in1").outerWidth();
		$(".zox-post-ad-in2").css("width", adWidth );
		$(window).resize(function(){
		var adWidth = $(".zox-post-ad-in1").outerWidth();
		$(".zox-post-ad-in2").css("width", adWidth );
		});

	});
	

			jQuery(document).ready(function($) {
				$(".zox-com-click-38320").on("click", function(){
	  	    	$(".zox-com-click-id-38320").show();
		    	$(".disqus-thread-38320").show();
	  	    	$(".zox-com-but-38320").hide();
		  		});
			});
		
