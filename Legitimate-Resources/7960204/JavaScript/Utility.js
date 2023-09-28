function RenewCookiebot() {

    if (typeof Cookiebot != "undefined") {
        return Cookiebot.renew();
    }

}