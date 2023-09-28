//JS Redirect to app create account + keep prov in url
let btnsCreateAccount = document.querySelectorAll('.btn-create-account');
if (btnsCreateAccount){
    btnsCreateAccount.forEach(btn => {

        btn.addEventListener('click', function(e){
            e.preventDefault();
            let prov = window.location.href;
            if(prov){
                window.location.assign("https://account.sarbacane.com/auth/signup?prov=" + encodeURIComponent(prov));
            }
        })
    })
}

//JS Redirect to app shop + keep prov in url
let btnsAccessShop = document.querySelectorAll('.btn-access-shop');
if (btnsAccessShop){
    btnsAccessShop.forEach(btn => {

        btn.addEventListener('click', function(e){
            e.preventDefault();
            let prov = window.location.href;
            if(prov){
                window.location.assign("https://store-suite.sarbacane.com/apps?prov=" + encodeURIComponent(prov));
            }
        })
    })
}

//Homepage JS Redirect to app create account + keep email & prov in url
let registerFormHome = document.querySelectorAll('.home-header__register__form');
if(registerFormHome){
    //Save registration email in local storage 
    registerFormHome.forEach(form => {
        let formInput = form.querySelector('input');
        let formSubmit = form.querySelector('a');

        formSubmit.addEventListener('click', function(e){
            e.preventDefault();
            let registrationEmail = formInput.value;
            let prov = window.location.href;
            if(registrationEmail && prov){
                window.location.assign("https://account.sarbacane.com/auth/signup;email=" + registrationEmail + "?prov=" + encodeURIComponent(prov));
            }
        })
    })
}

//JS Redirect to app create account + keep email & prov in url
let registerForms = document.querySelectorAll('.header-product__register__form');
if(registerForms){
    //Save registration email in local storage 
    registerForms.forEach(form => {
        let formInput = form.querySelector('input');
        let formSubmit = form.querySelector('a');

        formSubmit.addEventListener('click', function(e){
            e.preventDefault();
            let registrationEmail = formInput.value;
            let prov = window.location.href;
            if(registrationEmail && prov){
                window.location.assign("https://account.sarbacane.com/auth/signup;email=" + registrationEmail + "?prov=" + encodeURIComponent(prov));
            }
        })
    })
}

