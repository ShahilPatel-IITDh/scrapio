((function(){
    var allow = document.querySelector('#age-allow');
    var deny = document.querySelector('#age-deny');
    var adultConsentCookieName = 'adult_content';
    var now = new Date();
    if (!allow || !deny) {
        return;
    }
    now.setFullYear( now.getFullYear() + 100 );
    var cookieString = adultConsentCookieName + "={value}; domain=" + window.location.hostname + ";expires=" + now.toGMTString();
    allow.addEventListener('click', function(e) {
        e.preventDefault();
        document.cookie = cookieString.replace('{value}', 'true');
        window.location = destination;
    });
    deny.addEventListener('click', function(e) {
        e.preventDefault();
        document.cookie = cookieString.replace('{value}', 'false');
        window.location = "/";
    });
})());
