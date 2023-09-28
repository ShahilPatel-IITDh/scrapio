/* Shows the live editor based on cookie */

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
  return null;

}


function checkECCookie() {
    var myCookie = getCookie("expresscache_advcachemgmt");
    // console.log(myCookie);
    if (myCookie == null) {
        // do cookie doesn't exist stuff;
    }
    else {
        console.log(myCookie);
        $(function() { $('#expresscache_liveeditor').show();});
    }
}

checkECCookie();