function sgr_2() {
    console.log('SGR_2 loaded!');
    let recaptcha = document.getElementsByClassName('sgr-main');
    for (let i = 0; i < recaptcha.length; i++) {
        grecaptcha.render(recaptcha.item(i), {'sitekey': sgr.sgr_site_key});
    }
}

function sgr_3() {
    console.log('SGR_3 loaded!');
    let actionName = window.location.pathname;
    actionName = actionName.replace(/[^a-zA-Z/]/g, '_');
    grecaptcha.execute(sgr.sgr_site_key, {action: 'sgr_' + actionName}).then(function (token) {
        let recaptcha = document.getElementsByClassName('sgr-main');
        for (let i = 0; i < recaptcha.length; i++) {
            recaptcha.item(i).value = token;
        }
    });

    setTimeout(sgr_3, 1000 * 60);
}

document.addEventListener('DOMContentLoaded', function (event) {
    let sgr_version = document.getElementById('sgr_version');

    if (sgr_version) {
        console.log('SGR admin loaded!');
        sgr_version.addEventListener('click', removeKeys);

        function removeKeys() {
            let sgr_site_key = document.getElementById('sgr_site_key');
            let sgr_secret_key = document.getElementById('sgr_secret_key');

            if (sgr_site_key.value === sgr.sgr_site_key) {
                sgr_site_key.value = '';
                sgr_secret_key.value = '';
            }
        }
    }
});
