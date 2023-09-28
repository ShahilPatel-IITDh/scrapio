
    OneTrust.OnConsentChanged(etrackerSetCookieConsent);

    function etrackerSetCookieConsent() {

        $.ajax({
            dataType: "html",
            cache: false,
            type: "GET",
            url: window.location.href,
            data: {},
            success: {},
            error: function (request, status, error) {
                console.log(request.responseText);
            }
        });


    };

