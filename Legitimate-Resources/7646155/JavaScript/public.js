$(document).ready(function() {
	/*Your Js*/
	
	$("#lang").click(function(e){
		$(this).toggleClass("on").find("ul").toggle();
		e.stopPropagation();
	})
	$(document).click(function(){
		$("#lang").removeClass("on").find("ul").hide();
	})
});

$(function() {
				$('.hnews').slick({
					slidesToShow:4,
					slidesToScroll: 1,
					autoplay: true,
					autoplaySpeed: 3000
				});
			})



$(document).ready(function () {
  var hdheLoc = window.location.pathname.split('/');
  if (hdheLoc[1] == 'qzdphj' && hdheLoc[2] == 'a1lz1.shtml')
  {
    $('.proshow .btn a').each(function (index) {
      $(this).attr('href', '#' + index);
      var hash = window.location.hash.substring(1);
      if (hash==3) {
        $('.proshow .btn a').eq(hash).addClass('cur').siblings().removeClass('cur');
        $('.proshow_list').eq(hash).show().siblings().hide();
      }
    });
  }
});    