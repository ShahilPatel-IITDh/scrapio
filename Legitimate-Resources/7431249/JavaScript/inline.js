jQuery(document).ready(function($){
$('#system-message-container').remove();
$('#rm-cookies-more').click(function(e){
clearTimeout(jQuery.removeOL);
$('#rm-cookies-title').html('Manage cookies used by the website:');
$('#rm-cookies-more').hide();
$('.rm-cookies-details').css('height','auto');
$('.rm-cookies-wrapper-initial').css('opacity','1');
e.preventDefault();
e.stopPropagation();
});
$('.rm-cookies-group-title').off('click').click(function(){
$('.rm-cookies-group').hide();
var tri = $(this).children('.tri').html();
$('.rm-cookies-group-title .tri').html('+'/*'&#9656;'*/);
if (tri == '-') {
$(this).children('.tri').html('+'/*'&#9662;'*/);
} else {
$(this).children('.tri').html('-'/*'&#9662;'*/);
$('#rm-cookies-group-' + $(this).attr('data-group')).show();
}
});
$('.rm-yesNo-button').click(function(){
$(this).siblings('div').addClass('rm-yesNo-grayed');
$(this).removeClass('rm-yesNo-grayed');
$(this).siblings('input').val( $(this).data('value') );
});
$('#rm-cookies-cancel').click(function(e){
$('.rm-cookies-wrapper').removeClass('active');
e.preventDefault();
e.stopPropagation();
});
$('#rm-cookies-reject').click(function(){
$(this).siblings('.rm-cookies-details').find('.rm-yesNo input').each(function(){
$(this).val('0');
});
$('#rm-cookies-message').val('Your cookies permission settings have been saved. <b>Only essential cookies are enabled</b>. You can change this setting at any time by clicking on the cog in the bottom left corner.');
});
$('#rm-cookies-message-wrapper').click(function(){
jQuery('#rm-cookies-message-wrapper').fadeOut(400);
setTimeout(function(){jQuery('#rm-cookies-message-wrapper').remove()},400);
});
setTimeout(function(){
jQuery('#rm-cookies-message-wrapper').fadeOut(400);
setTimeout(function(){
jQuery('#rm-cookies-message-wrapper').remove()
},400);
},6000);
$('#rm-system-message-wrapper span').click(function(){
var el = $(this);
el.fadeOut(400);
setTimeout(function(){
el.remove();
if (!jQuery('#rm-system-message-wrapper span').length)
jQuery('#rm-system-message-wrapper').slideUp();
},400);
});
setTimeout(function(){
jQuery('#rm-system-message-wrapper').slideUp(400);
setTimeout(function(){
jQuery('#rm-system-message-wrapper').remove()
},400);
},6000);
/*$('.rm-cookies-group').first().show();
$('.rm-cookies-group-title').first().children('.tri').html('&#9662;');*/
});
jQuery(window).load(function(){
jQuery('.rm-cookies-wrapper-initial').slideDown();
jQuery.removeOL = setTimeout(function(){jQuery('.rm-cookies-ol').remove()},10000);
});
