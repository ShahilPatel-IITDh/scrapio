$(document).ready(function() {
	if (navigator.userAgent.indexOf("Android 2") >= 0){
		$('body').addClass('android2-fix');
	}
	if (navigator.userAgent.indexOf("Android") >= 0){
		$('body').addClass('android-fix');
	}
	if (navigator.userAgent.indexOf("BlackBerry") >= 0 && navigator.userAgent.indexOf('Version/7') >= 0 ){
		$('body').addClass('bb7-fix');
	}

	var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	if (iOS && ($('#drawer-menu').length>0)){
		document.getElementById('drawer-menu').addEventListener('touchstart', function(event) {
		    this.upLimit = (this.scrollTop > 0);
		    this.downLimit = (this.scrollTop < this.scrollHeight - this.clientHeight);
		    this.slideStart = event.pageY;
		});

		document.getElementById('drawer-menu').addEventListener('touchmove', function(event) {
		    var up = (event.pageY > this.slideStart);
		    var down = (event.pageY < this.slideStart);
		    this.slideStart = event.pageY;
		    if ((up && this.upLimit) || (down && this.downLimit)) {
		        event.stopPropagation();
		    }
		    else {
		        event.preventDefault();
		    }
		});
	}
});


$(document).on("click", "#drawer-toggle-label", function(){
	if (/\bBB10\b|\bBlackBerry\b/.test(navigator.userAgent)){
		return;
	}
	if (navigator.userAgent.indexOf("Android 2") >= 0){
		return;
	}
	$('#drawer-menu').scrollTop(0);
	if (!$('#drawer-toggle-chk').is(':checked')){
		var currentScroll = $(document).scrollTop();
		if ($('#main-page').hasClass("undraggable")){
			return;
		}
		$('#main-page').css({"top":(currentScroll*-1)+"px"}).addClass("undraggable");
	} else {
		var lastScroll = parseInt($('#main-page').css('top'))*-1;
		$('#main-page').css({"top":""}).removeClass("undraggable");
		$('html, body').animate({
		    scrollTop: lastScroll
		 }, 10);
	}
});

$(document).on("touchstart", function(){
	if($('#main-page').hasClass('undraggable')){
		$('nav').focus();
		window.scrollTo(0, 1);
	}
});
