/**
 * WP Captcha general front-end scripts.
 * @package  WP Captcha
 * @version  1.0.0
 * @author   Devnath verma
*/

jQuery(document).ready(function($){

	$(".refresh_captcha").on("click", function() {
		var src = $(this).data("imgsrc");
		$(this).parent().find("img.c4wp_image").attr("src", src);
	});
	
	$(".c4wp-svg-padding").on("click", function() {
		$(".c4wp-svg").removeClass("c4wp-captcha-selected");
		$(this).find(".c4wp-svg").addClass("c4wp-captcha-selected");
		var c4wp_icons = $(this).find(".c4wp-icons").val();
		$("#c4wp_user_input_captcha").val(c4wp_icons);
	});
});	