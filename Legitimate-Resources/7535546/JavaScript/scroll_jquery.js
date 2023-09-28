// JavaScript Document
$.fn.infiniteCarousel = function () {

    function repeat(str, num) {
        return new Array( num + 1 ).join( str );
    }
  
    return this.each(function () {
        var $wrapper = $('> div', this).css('overflow', 'hidden'),
            $slider = $wrapper.find('> ul'),
            $items = $slider.find('> li'),
            $single = $items.filter(':first'),
            
            singleWidth = $single.outerWidth(), 
            visible = Math.ceil($wrapper.innerWidth() / singleWidth),
            currentPage = 1,
            pages = Math.ceil($items.length / visible);  
        // create a public interface to move to a specific page
        $(this).bind('goto', function (event, page) {
            gotoPage(page);
        });		
    });  
};

$(document).ready(function () {
  $('.infiniteCarousel').infiniteCarousel();
  $('.wrapper').jCarouselLite({
    auto: 2000,
    speed: 1000,
	visible:5,
	btnNext: ".LeftBotton",
    btnPrev: ".RightBotton"

});

});

