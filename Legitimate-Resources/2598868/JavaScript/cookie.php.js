(function() {

    /*
    function createCookie(name,value,days,path) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(90*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path="+path + "; secure=true; samesite=lax";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    }; */

    function createMessage() {
        var el = document.createElement('div');
        el.setAttribute('id', 'KSCookieConsent');
        el.innerHTML = 'For the presentation of this website and improvement of our service the use of cookies is necessary. For more information please review our <a href="/legal">cookie policy</a>. I acknowledge having been notified. <a href="javascript:void(0)" onclick="closeKSCookieConsent()" class="KSCookieConsentBtn">Ok</a>';
        document.body.appendChild(el);
        document.body.classList.add('withkscookieconsent');
        var style = document.createElement('style');
        style.innerHTML = '#KSCookieConsent { transition: height .3s, padding .3s; background: #657786; position: fixed; width: calc(100% - 22px); bottom: 0; z-index: 100000; font-size: 11px; text-align: center; padding: 11px; line-height: 22px; color: white } #KSCookieConsent.closed {height: 0; padding: 0; overflow: hidden} #KSCookieConsent a { text-decoration: underline; color: #c2d9eb } #KSCookieConsent a.KSCookieConsentBtn { color: white; text-decoration: none; border: 1px solid white; border-radius: 4px; padding: 4px 8px; margin-left: 6px }';
        document.body.appendChild(style);
            };

    function init () {
        if(window.addEventListener){
          window.addEventListener('load', function(){
            findCookie();
          });
        } else {
          window.attachEvent('onload', function(){
            findCookie();
          });
        }
    };

    function findCookie () {
        createMessage();
        /*
        var cookie = readCookie('seen-cookie-message');
        console.log(cookie);
        if (cookie != null && cookie == 'yes') {
            createMessage();
        } else {
            // cookieMessage.style.display = 'block'; // Schreibe Cookie-Message
            createMessage();
        }
        
        // Set/update cookie
        var cookieExpiry = 30;
        if (cookieExpiry == null) {
            cookieExpiry = 30;
        }
        var cookiePath = "/";
        if (cookiePath == null) {
            cookiePath = "/";
        }
        createCookie('seen-cookie-message','yes',cookieExpiry,cookiePath); */
    }
    init();
    
})();

function closeKSCookieConsent() {
    document.body.classList.remove('withkscookieconsent');
    var elem = document.getElementById("KSCookieConsent");
    //elem.parentNode.removeChild(elem);
    elem.classList.add('closed');
    setTimeout(function(){
        // elem.parentNode.removeChild(elem);
    }, 1500);
    return false;
}