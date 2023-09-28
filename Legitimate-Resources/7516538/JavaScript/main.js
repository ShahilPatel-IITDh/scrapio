
$('[data-color]').click(function(){
    $("[data-color]").removeClass("active");
    $(this).addClass("active");
    var color = this.getAttribute('data-color');
    document.documentElement.style.setProperty('--color', color);
});



var swiper = new Swiper('.featured-swiper', {
	slidesPerView: 1,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	}
});


$('.fixed-menu').click(function(){
    $(".navbar").toggleClass("fixed-top");
});


/* Sticky Navbar */
var nav = $(".navbar");
var fix = "fix";

$(window).scroll(function() {
	if( $(this).scrollTop() > 160 ) {
		nav.addClass(fix);
	} else {
		nav.removeClass(fix);
	}
});


$( function() {
	$( "#slider" ).slider({
		range: "min",
		value: 60
	});
} );