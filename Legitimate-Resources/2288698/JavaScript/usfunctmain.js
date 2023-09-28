if($(window).width()<468){$(document).ready(function(){$('div.ads-ad-wrapper,div.main-catname').addClass('mob');$("div.mob").click(function(){window.location=$(this).find("a").attr("href");return false;});});}
function showsub(thechosenone){$('.main-subcats-xs').each(function(index){if($(this).attr("data-id")==thechosenone){$(this).show(200);}
else{$(this).hide(600);}});}