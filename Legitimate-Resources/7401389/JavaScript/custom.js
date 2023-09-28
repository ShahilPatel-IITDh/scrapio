jQuery(document).ready( function() {
    window.addEventListener("form-submit", function(event){
        console.log(event.detail.response_id);
        var response_id = event.detail.response_id;
        jQuery.ajax({
            type : "post",
            dataType : "json",
            url : localize.ajaxurl,
            data : {action: "wsl_typeform", response_id:response_id},
            success: function(response) {
               console.log("ok");
            }
         })
    }, false);
});