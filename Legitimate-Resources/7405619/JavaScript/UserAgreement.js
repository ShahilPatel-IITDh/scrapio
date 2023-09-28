var wid
// This uses ajax and modal popup extender
function ShowUserAgreement(utype) {

    //var url = "/Modals/UserAgreement.aspx" + ( (utype)?"?utype="+utype :"");
    //var specs = "width=710,height=550,location=no,menubar=no,status=no,toolbar=no,scrollbars=yes,resizable=yes,titlebar=no";
    //var win = window.open(url, "_blank", specs, false);
    //win.focus();
    //return false;

    var url = 'https://www.confirmation.com/legal-security-privacy/index.html';
    var currentLang = ''; 
    var subDom = window.location.host.split('.')[0];

    if ((subDom.indexOf('-') == -1 || subDom == 'www') && subDom != 'tr' && subDom != 'es' && subDom != 'fr' && subDom != 'de' && subDom != 'zh' && subDom != 'zs' && subDom != 'ja' && subDom != 'pt') {
        currentLang = 'us';
    } else {
        if (subDom.indexOf('-') > -1) {
            currentLang = subDom.split('-')[0];
        } else {

            if (subDom != 'tr' && subDom != 'es' && subDom != 'fr' && subDom != 'de' && subDom != 'zh' && subDom != 'zs' && subDom != 'ja' && subDom != 'pt') {
                currentLang = 'us';
            }
            else {
                currentLang = subDom;
            }            
        }
    }     
 
    if (currentLang == "us") {
        url = 'https://www.confirmation.com/legal-security-privacy/index.html';
    }
    else if (currentLang == "es") {
        url = 'https://eu-es.confirmation.com/legal-security-privacy/index.html';
    }
    else if (currentLang == "fr") {
        url = 'https://eu-fr.confirmation.com/legal-security-privacy/index.html';
    }
    else if (currentLang == "de") {
        url = 'https://eu-de.confirmation.com/legal-security-privacy/index.html';
    }
    else if (currentLang == "zh") {
        url = 'https://ap-zh.confirmation.com/legal-security-privacy/index.html';
    }
    else if (currentLang == "zs") {
        url = 'https://ap-zs.confirmation.com/legal-security-privacy/index.html';
    }
    else if (currentLang == "ja") {
        url = 'https://ap-jp.confirmation.com/legal-security-privacy/index.html';
    }
    else if (currentLang == "pt") {
        url = 'https://am-pt.confirmation.com/legal-security-privacy/index.html';
    }

    var win = window.open(url, '_blank');
    win.focus();
    return false;

}

function ShowPrivacy() {
    //var url = "/Modals/PrivacyPolicy.aspx";
    //var specs = "width=710,height=550,location=no,menubar=no,status=no,toolbar=no,scrollbars=yes,resizable=yes,titlebar=no";
    //var win = window.open(url, "_blank", specs, false);
    //win.focus();
    //alert('Privacy');

    var url = 'https://www.confirmation.com/legal-security-privacy/index.html';    
    var win = window.open(url, '_blank');
    win.focus();
    return false;
}
function SystemStatus() {
    var url = 'https://taxprofessionals-status.hostedtax.thomsonreuters.com/';
    var win = window.open(url, '_blank');
    win.focus();
    return false;
}

var ModalCloser;

// Read Cookie (across subdomains)
var readCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function ChangeAgreement() {

    var utype = $("#ddlUserTypes").val();
    var langPref = readCookie('language');
    var learn = $('#appType').val();

    if (utype) {
        if (utype == "1" || utype == "2" || utype == "3" || utype == "4" || utype == "5") {
            if (utype == "1") { utype = "Accountant" }
            if (utype == "5") { utype = "Accountant" }
            if (utype == "2") { utype = "Client"; learn = '';  }
            if (utype == "3") { utype = "Responder"; learn = ''; }
            if (utype == "4") { utype = "LawFirm"; learn = ''; }
            if (utype == "4") { langPref = "us" }
            if (!langPref || langPref.indexOf('en') >= 0) { langPref = 'us'; }
            var url = "/" + langPref + "-CapitalConfirmation" + utype + "UserAgreementTermsandConditions" + learn + ".pdf";
            $("#ifrUserAgreement").attr("src", url);
        }
    }
}


function InitialViewAgreement(view, closer) 
{
    $("#ddlUserTypes").prop("value", view);
    ChangeAgreement();
    ModalCloser = closer;
}

function HideMe() 
{
    window.close();
};

function wopen(url, name, w, h, langSpecific) {
    // Fudge factors for window decoration space.
    w += 32;
    h += 96;

    if (langSpecific != 'undefined') {
        if (langSpecific == true) {
            var strPrePath = url.substring(0, url.lastIndexOf('/') + 1);
            var langPrefix = Lang.getCurrentLang();
            langPrefix = langPrefix.split('-');
            langPrefix = langPrefix[0];
            if (langPrefix == 'en' || langPrefix == '') { langPrefix = 'us'; }
            url = strPrePath + langPrefix + '-' + url.substring(url.lastIndexOf('/') + 1);
        }
    }

    var win = window.open(url,name,'width=' + w + ', height=' + h + ', ' +'location=no, menubar=no, ' +'status=no, toolbar=no, scrollbars=yes, resizable=yes');
    win.resizeTo(w, h);
    win.focus();
}

function ShowUserAgreementPopup() {

    var url = 'https://www.confirmation.com/legal-security-privacy/index.html';
    var currentLang = '';
    var subDom = window.location.host.split('.')[0];

    if ((subDom.indexOf('-') == -1 || subDom == 'www') && subDom != 'tr' && subDom != 'es' && subDom != 'fr' && subDom != 'de' && subDom != 'zh' && subDom != 'zs' && subDom != 'ja' && subDom != 'pt') {
        currentLang = 'us';
    } else {
        if (subDom.indexOf('-') > -1) {
            currentLang = subDom.split('-')[0];
        } else {

            if (subDom != 'tr' && subDom != 'es' && subDom != 'fr' && subDom != 'de' && subDom != 'zh' && subDom != 'zs' && subDom != 'ja' && subDom != 'pt') {
                currentLang = 'us';
            }
            else {
                currentLang = subDom;
            }
        }
    }

    if (currentLang == "us") {
        url = 'https://www.confirmation.com/legal-security-privacy/index.html';
    }
    else if (currentLang == "es") {
        url = 'https://eu-es.confirmation.com/legal-security-privacy/index.html';
    }
    else if (currentLang == "fr") {
        url = 'https://eu-fr.confirmation.com/legal-security-privacy/index.html';
    }
    else if (currentLang == "de") {
        url = 'https://eu-de.confirmation.com/legal-security-privacy/index.html';
    }
    else if (currentLang == "zh") {
        url = 'https://ap-zh.confirmation.com/legal-security-privacy/index.html';
    }
    else if (currentLang == "zs") {
        url = 'https://ap-zs.confirmation.com/legal-security-privacy/index.html';
    }
    else if (currentLang == "ja") {
        url = 'https://ap-jp.confirmation.com/legal-security-privacy/index.html';
    }
    else if (currentLang == "pt") {
        url = 'https://am-pt.confirmation.com/legal-security-privacy/index.html';
    }

    var specs = "width=710,height=550,location=no,menubar=no,status=no,toolbar=no,scrollbars=yes,resizable=yes,titlebar=no";
    var win = window.open(url, "_blank", specs, false);
    win.focus();
    return false;
}
