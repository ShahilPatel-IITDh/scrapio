function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
jQuery(function() {
  if(getCookie("gdpr_accepted") != "true"){
    jQuery("#gdpr_banner").css("display","block");
  }
  jQuery("#gdpr_accept").click(function(){
    document.cookie = "gdpr_accepted=true; max-age=2592000; path=/"
    jQuery("#gdpr_banner").hide();
  })
}) 
