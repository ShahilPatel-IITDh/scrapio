 
$(document).ready(function(){  
$('#readyf').click(function(){
$(".loading").removeClass("hide");        
setTimeout(function(){      
$(".loading").addClass("hide");    
$("#register_form fieldset:not(:first-of-type), .submit").removeAttr("style");
$("#register_form fieldset").css({ "display": "block"});
$(".next-form, .previous-form, .verifyit").css({ "display": "none"});    
}, 1000);    
});    
    
$('[data-toggle="popover"]').popover();
 
});    
