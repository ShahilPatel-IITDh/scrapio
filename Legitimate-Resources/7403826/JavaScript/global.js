$(window).on("scroll", function() {
  var get_windows_scroll = $(window).scrollTop();

$(".data-scroll-detect").each(function() {
	var this_elem = $(this);
    var elem_padding_detect_start = parseInt(this_elem.offset().top); 
    if (typeof this_elem.data("padding-start") !== "undefined" && this_elem.data("padding-start") !== "" ) {
      elem_padding_detect_start = elem_padding_detect_start - parseInt(this_elem.data("padding-start"));
    }
	var elem_padding_detect_end = elem_padding_detect_start + parseInt(this_elem.height());
	if (typeof this_elem.data("padding-end") !== "undefined" && this_elem.data("padding-end") !== "" ) {
      elem_padding_detect_end = elem_padding_detect_end - parseInt(this_elem.data("padding-end"));
    }
    
	if ((get_windows_scroll>elem_padding_detect_start) && (get_windows_scroll<elem_padding_detect_end)) {
		this_elem.addClass("scroll-detected");
	} else {
		this_elem.removeClass("scroll-detected");
	}  
	if (get_windows_scroll>elem_padding_detect_start) {
		this_elem.addClass("scroll-detected-toggle");
	}
	if (get_windows_scroll>elem_padding_detect_end) {
		this_elem.addClass("scroll-detected-passed");
	} 
	if (get_windows_scroll<elem_padding_detect_start) {
		this_elem.removeClass("scroll-detected");
		this_elem.removeClass("scroll-detected-passed");
	} 
});
  Header_sticky();
  local_nav_sticky();

});
function Header_sticky() {
  var get_windows_scroll = $(window).scrollTop();
  var get_header_height = $(".header-section").outerHeight();
  if (get_windows_scroll>=2) { 
  	$(".header-section").addClass("sticky");
  	$(".header-background-blank").removeClass("hide");
  	$(".header-background-blank").css("height",get_header_height+"px");
  } else {
  	$(".header-section").removeClass("sticky");
  	$(".header-background-blank").css("height","0px");
  	$(".header-background-blank").addClass("hide");
  }
}
function local_nav_sticky() {
if ($(".data-local-nav-container").length) {
  var get_windows_scroll = $(window).scrollTop();
  var get_header_height = $(".header-section").outerHeight();
  var get_local_nav_height = $(".data-local-nav-container .data-body").outerHeight();
  var elem_pos = $(".data-local-nav-container").position();
  var get_elem_top_pos = elem_pos.top;

	if (get_windows_scroll>=get_elem_top_pos) { 
		$(".data-local-nav-container").addClass("sticky");
		$(".data-local-nav-container .data-body").css("margin-top",get_header_height+"px");
		$(".data-local-nav-blank").css("height",get_local_nav_height+"px");
		$(".data-local-nav-blank").removeClass("hide");
	} else {
		$(".data-local-nav-container").removeClass("sticky");
		$(".data-local-nav-container .data-body").css("margin-top","0px");
		$(".data-local-nav-blank").css("height","0px");
		$(".data-local-nav-blank").addClass("hide");
	}
}

}
var lastScrollTop = 0;
window.addEventListener(
  "scroll",
  function() {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      $(".body-inner").addClass("downscroll").removeClass("upscroll");
    } else {
      $(".body-inner").removeClass("downscroll").addClass("upscroll");
    }
    lastScrollTop = st <= 0 ? 0 : st;
  },
  false
);

$(document).ready(function() {
  if (browser_detect === "safari") {
    $("a").on("click", function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top
          },
          800,
          function() {
            window.location.hash = hash;
          }
        );
      }
    });
  }
//   img_host_replace();
	
});

function img_host_replace() {
setTimeout(function(){
	var img_host = $(".img-host-url").text();
	if (img_host) {
		$("img").each(function(){
			var img_src = $(this).attr("src");
			if (img_src.includes("./pools/") == true) {
			img_src = img_src.replace('./pools/',img_host+'/pools/'); 
			$(this).attr("src",img_src);
			}
		});
	}
}, 300);	
}

function chkInpUpdate() {
	$('.data-chk-update').on('change click', function() {
		const elemId = $(this).attr('data-target');
		if (elemId !== undefined && elemId !== '') {
			const elemTarget = $(`.data-chk-update-${elemId}`);
			elemTarget.val(elemId);
			$('.btn-cta').removeClass('disabled');
// 			console.log(`data-chk-update-${elemId}`, ' click ', elemId)
		}
	});
}