//Function to set the cookie with multiple value
//----------------------------------------------
function setCookieMultipleValue(cookieName, valueName, value) {
    cookieValue = getCookie(cookieName);
    if (cookieValue != "") {
        var cookieAlertValue = getCookieMultipleValue(cookieName, valueName);
        if (cookieAlertValue == "") {
            document.cookie = cookieName + '=' + cookieValue + "|" + valueName + ":" + value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT;domain=.bil.com; path=/";
        }
    } else {
        document.cookie = cookieName + '=' + valueName + ":" + value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT;domain=.bil.com; path=/";
    }
}

//Function to get a cookie with multiple value
//--------------------------------------------
function getCookieMultipleValue(cookieName, valueName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            var cookieValue = c.substring(name.length, c.length);
            var cookieValueSplitted = cookieValue.split('|');
            for (var j = 0; j <= cookieValueSplitted.length; j++) {
                if (j != cookieValueSplitted.length) {
                    if (cookieValueSplitted[j].indexOf(valueName) > -1) {
                        return cookieValueSplitted[j].substring(valueName.length + 1, cookieValueSplitted[j].length);
                    }
                }
            }
        }
    }
    return "";
}

//Function to set the a cookie 
//----------------------------
function setCookie(name, value) {
    document.cookie = name + '=' + value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT;domain=.bil.com; path=/";
}

//Function to get a cookie with the name
//--------------------------------------
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

//Function to hide an element by class name
//-----------------------------------------
function hideElementByClassName(cname) {
    var elements = document.getElementsByClassName(cname);

    for (i = 0; i < elements.length; i++){
        elements[i].style.display = 'none';
    }
    
}

//Function to hide an element by ID
//---------------------------------
function hideElementByID(cname) {
    var element = document.getElementById(cname);

    if (element != null){
        element.style.display = 'none';
    }

}

//Function to get the Navigation menu
//-----------------------------------
function GetNavigation(xsl, divId) {
    $.get(_spPageContextInfo.webAbsoluteUrl + "/_vti_bin/BIL/Internet/BILClientService.svc/getMobileNavigation/" + xsl, function (response) {
        $("#" + divId).html(response);
    }).error(function () {
        //alert("Sorry could not proceed");
    });

    //return data;
}

//Function to get the Key Configuration
//-------------------------------------
function GetValueFromWebConfig(key) {
    var result;
    $.ajax(
    {
        url: _spPageContextInfo.webAbsoluteUrl + "/_vti_bin/BIL/Internet/BILClientService.svc/getValueFromWebConfig/" + key,
        async: false,
        success: function (data) {
            result = data;
        },
        error: function () {
            //alert("Sorry could not proceed");
        }

    });

    return result;
}

//Function to load Cross-Domain ressources
//----------------------------------------
function LoadCrossDomainRessources(ressourceUrl) {

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        type: "GET",
        url: ressourceUrl,
    }).done(function (data) {
        //console.log(data);
    });

}

//Content Search Web Part
//------------------------
function GetBILPublishingImage(itemUrl) {
    var BILImage;
    jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_vti_bin/BIL/Internet/BILClientService.svc/GetPublishingImageFromItemUrl?url=" + itemUrl,
        type: "GET",
        async: false,
        headers: { "accept": "application/json;odata=verbose" },
        success: function (image) {
            BILImage = image;
        },
        error: function (xhr) {
            console.log(xhr.status + ': ' + xhr.statusText);
        }
    });
    return BILImage;
};

//Content Search Web Part
//------------------------
function replaceKeyinString(sinput) {
    var returnvalue;
    jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_vti_bin/BIL/Internet/BILClientService.svc/replaceKeyinString",
        data: JSON.stringify({ input: sinput }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        async: false,
        success: function (value) {
            returnvalue = value;
        },
        error: function (xhr) {
            console.log(xhr.status + ': ' + xhr.statusText);
        }
    });
    return returnvalue;
};



//function hide() {
//    $("#MobileNav").css("display", "none");
//}

$(document).ready(function () {
    // Get the relative url to the current language and universe to set it in the cookie
    var relativeURL = _spPageContextInfo.webServerRelativeUrl;
    var RootDomain = GetValueFromWebConfig("BIL_Internet_Root_URL_Luxembourg");

    var relativeURLSplitted = relativeURL.split("/");
    var UrlToSetInCookie = "";
    if (relativeURLSplitted.length >= 3) {
        UrlToSetInCookie = "/" + relativeURLSplitted[1] + "/" + relativeURLSplitted[2] + "/";
        setCookie("BILInternet_HomePage_" + RootDomain.split("/")[2], _spPageContextInfo.siteAbsoluteUrl + UrlToSetInCookie);
    }

})

//if (window.jQuery) {
//    // jQuery is loaded  
//    GetNavigation("MobileTemplateTopNav.xslt", "TopNav");
//    GetNavigation("MobileTemplateSubNav.xslt", "SubNav");
//}





