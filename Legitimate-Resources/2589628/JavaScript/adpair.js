$(function() {
	background_post();	
});

function get_value_by(key)
{
    var url = window.location.href; /// load URL
    var url_string_list = url.split("?");

    if (url_string_list.length == 0)
        return "";

    var pair_list = url_string_list[1] ? url_string_list[1].split("&") : '';
    if (pair_list == '')
        return '';
    var value = "";
    for (i = 0 ; i < pair_list.length ; i++)
    {
        var pair = pair_list[i].split("=");
        if (pair[0] == key)
        {
            value = pair[1];
            break;
        }
    }

    value = unescape(value);
    value.replace(/\+/g," ");
    return value;
}

function insert_pair_info_img()
{
    var server_url = "http://wtrk.c.appier.net/p?";
    var parameter_set = 'dummy=';

    var _atrk_ia  = get_value_by('_atrk_ia'); /// idfa
    var _atrk_ai = get_value_by('_atrk_ai'); /// android id or android id SHA1

    var iOS_idfa = (mobile_osname() == "ios" && _atrk_ia) ? _atrk_ia : '';
    var android_idfa = (mobile_osname() == "android" && _atrk_ia) ? _atrk_ia : '';
    var android_id = (mobile_osname() == "android" && _atrk_ai) ? _atrk_ai : '';

    /// The length of idfa is 128bit.
    /// The length of android id is 64bit while the length of SHA1 is 160bit.
    if (iOS_idfa.length != 36) iOS_idfa = null;
    if (android_idfa.length != 36) android_idfa = null;
    if (android_id.length == 0 || (android_id.length > 16 && android_id.length != 40)) android_id = null;

    if (iOS_idfa)
        parameter_set += '&ios_idfa=' + iOS_idfa;
    if (android_idfa)
        parameter_set += '&android_idfa=' + android_idfa;
    if (android_id)
        parameter_set += '&android_id=' + android_id;

    (function(){var oImg=document.createElement("img");
        oImg.setAttribute('src', server_url + parameter_set);
        oImg.style.display = 'none';
        oImg.setAttribute('height', '1px');
        oImg.setAttribute('width', '1px');
        document.body.appendChild(oImg);})()
}

function background_post()
{
    var server_url = "http://wtrk.c.appier.net/p";

    var _atrk_ia  = get_value_by('_atrk_ia'); /// idfa
    var _atrk_ai = get_value_by('_atrk_ai'); /// android id or android id SHA1

    var iOS_idfa = (mobile_osname() == "ios" && _atrk_ia) ? _atrk_ia : '';
    var android_idfa = (mobile_osname() == "android" && _atrk_ia) ? _atrk_ia : '';
    var android_id = (mobile_osname() == "android" && _atrk_ai) ? _atrk_ai : '';
    console.log('iOS_idfa = ' + iOS_idfa);
    console.log('android_idfa = ' + android_idfa);
    console.log('android_id = ' + android_id);

    /// The length of idfa is 128bit.
    /// The length of android id is 64bit while the length of SHA1 is 160bit.
    if (iOS_idfa.length != 36) iOS_idfa = null;
    if (android_idfa.length != 36) android_idfa = null;
    if (android_id.length == 0 || (android_id.length > 16 && android_id.length != 40)) android_id = null;

    var iframe = document.createElement('iframe');
    iframe.name = "hidden_frame_bebe9fb";
    iframe.width = "1";
    iframe.height = "1";
    iframe.style.display = "none";
    iframe.style.visibility= "hidden";
    document.body.appendChild(iframe);

    var f = document.createElement("form");
    f.setAttribute('target',"hidden_frame_bebe9fb");
    f.setAttribute('method',"post");
    f.setAttribute('action',server_url);

    if (iOS_idfa)
    {
        var i = document.createElement("input");
        i.setAttribute('type',"hidden");
        i.setAttribute('name',"ios_idfa");
        i.setAttribute('value',iOS_idfa);
        f.appendChild(i);
    }

    if (android_idfa)
    {
        var i = document.createElement("input");
        i.setAttribute('type',"hidden");
        i.setAttribute('name',"android_idfa");
        i.setAttribute('value',android_idfa);
        f.appendChild(i);
    }


    if (android_id)
    {
        var i = document.createElement("input");
        i.setAttribute('type',"hidden");
        i.setAttribute('name',"android_id");
        i.setAttribute('value',android_id);
        f.appendChild(i);
    }

    f.submit();
}

function mobile_osname()
{
    var osname="unknown";
    var app_version = navigator.appVersion;
    app_version = (app_version) ? app_version.toLowerCase() : '';
    if (app_version.indexOf("iphone")!=-1) osname="ios";
    if (app_version.indexOf("ipad")!=-1) osname="ios";
    if (app_version.indexOf("ipod")!=-1) osname="ios";
    if (app_version.indexOf("android")!=-1) osname="android";
    return osname;
}
