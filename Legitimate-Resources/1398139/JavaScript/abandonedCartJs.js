
    if (!getCookie('loggedIn') && getCookie('acmodal') && !checkReferrer('verizon.com')) {
        var acCookied = new Event("acCookied");
        // console.log('cookied for acmodal')
        document.body.dispatchEvent(acCookied);
    } else {
        // console.log('not cookied for acmodal')
    }

    function getCookie(name) {
        var value = "; " + document.cookie;
        var parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    function checkReferrer(domain) {
        if (document.referrer !== null) {
            const referrer = document.referrer;

            if (referrer.includes(domain)) {
                return true;
            }
        }
        return false;
    }
