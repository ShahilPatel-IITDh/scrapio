$(document).ready(function (){
    var acceptCookieDiv = $('#accept-cookie');
    if(acceptCookieDiv.length === 0)
        return;
    var acceptCookie = window.localStorage.getItem('accept-cookie');
    if(!acceptCookie || acceptCookie === "0") {
        acceptCookieDiv.show();
    }
    acceptCookieDiv.find('.cookie-accept').click(function (){
        window.localStorage.setItem('accept-cookie', 1);
        acceptCookieDiv.hide();
    })
    acceptCookieDiv.find('.cookie-close').click(function (){
        window.localStorage.setItem('accept-cookie', 0);
        acceptCookieDiv.hide();
    })
})
