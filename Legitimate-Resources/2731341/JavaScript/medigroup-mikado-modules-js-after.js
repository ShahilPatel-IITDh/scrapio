
jQuery(".mkd-team-name a*").prop("target", "_self");

jQuery(".product-title a*").removeAttr("href");

/** Auto adjust height of award sections based on responsive page dimensions   **/
$(document).ready(resizeDetailsBox);
$(window).resize(resizeDetailsBox);

function resizeDetailsBox(){
    $( ".vc_custom_1571584916120" ).css( "min-height", $(".detailsBox").height()+"px");
    $( ".vc_custom_1571360325143" ).css( "min-height", $(".detailsBox").height()+"px");
    $( ".vc_custom_1571360325143" ).css( "min-height", $(".detailsBox").height()+"px");
    $( ".vc_custom_1571360325143" ).css( "min-height", $(".detailsBox").height()+"px");
};
