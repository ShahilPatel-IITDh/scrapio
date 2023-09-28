/**************************Helper Functions***************************/
function isUndefinedOfNull(v) {
    return (v == undefined || v == null);
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function isAlphabetOnly(n) {
    return (n != undefined && n.match(/^[a-z]+$/gi));
}

function isValidEmailAddress(emailAddress) {
    if (emailAddress == undefined || emailAddress == "undefined") {
        return false;
    } else if (emailAddress.toLowerCase().indexOf("@noemail.com") != -1) {
        return true;
    } else {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    }
}

function NewGUID() {
    var res = [], hv;
    var rgx = new RegExp("[2345]");
    for (var i = 0; i < 8; i++) {
        hv = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        if (rgx.exec(i.toString()) != null) {
            if (i == 3) { hv = "6" + hv.substr(1, 3); }
            res.push("-");
        }
        res.push(hv.toUpperCase());
    }
    value = res.join('');
    return value;
}

function DisplayTodayDate(tarDiv, msg) {
    var currentTime = new Date();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    msg = msg.replace('#dd#', month + "/" + day + "/" + year);
    msg = msg.replace('#DOW#', days[currentTime.getDay()]);
    $(tarDiv).html(msg);
}

function toggleBgColor() { }

var tempDisableObject; var tempDisableTimer = 3000;
function AttachTriggerDisable(elem) {
    var onClickEvent = $(elem).attr("onclick");
    if (onClickEvent != undefined) {
        onClickEvent = "AttachTempDisable(this);" + onClickEvent;
        $(elem).attr("onclick", onClickEvent);
    }
}

function AttachTempDisable(elem) {
    var onClickEvent = $(elem).attr("onclick");
    if (onClickEvent != undefined) {
        onClickEvent = "return false; " + onClickEvent;
        $(elem).attr("onclick", onClickEvent);
    }
    tempDisableObject = elem;
    setTimeout("RemoveDisable();", tempDisableTimer);
}

function RemoveDisable() {
    var onClickEvent = $(tempDisableObject).attr("onclick");
    if (onClickEvent != undefined) {
        onClickEvent = onClickEvent.replace("return false; ", "");
        $(tempDisableObject).attr("onclick", onClickEvent);
    }
}

//Replace Text Plugin.
(function ($) { $.fn.replaceText = function (b, a, c) { return this.each(function () { var f = this.firstChild, g, e, d = []; if (f) { do { if (f.nodeType === 3) { g = f.nodeValue; e = g.replace(b, a); if (e !== g) { if (!c && /</.test(e)) { $(f).before(e); d.push(f) } else { f.nodeValue = e } } } } while (f = f.nextSibling) } d.length && $(d).remove() }) } })(jQuery);
//Replace Text plugin ends.

//Popunder
(function ($) { $.popunder = function (sUrl) { var _parent = self; var bPopunder = $.browser.msie && parseInt($.browser.version, 10) < 9; if (top != self) { try { if (top.document.location.toString()) { _parent = top } } catch (err) { } } var sOptions = "toolbar=1,scrollbars=1,location=1,statusbar=1,menubar=0,resizable=1,width=" + (screen.availWidth - 10).toString(); sOptions += ",height=" + (screen.availHeight - 122).toString() + ",screenX=0,screenY=0,left=0,top=0"; var popunder = _parent.window.open(sUrl, "pu_" + Math.floor(89999999 * Math.random() + 1e7), sOptions); if (popunder) { popunder.blur(); if (bPopunder) { window.focus(); try { opener.window.focus() } catch (err) { } } else { popunder.init = function (e) { with (e) { (function () { if (typeof window.mozPaintCount != "undefined") { var a = window.open("about:blank"); a.close() } try { opener.window.focus() } catch (b) { } })() } }; popunder.params = { url: sUrl }; popunder.init(popunder) } } return this } })(jQuery)
//OuterHtml
jQuery.fn.outerHTML = function (s) { return s ? this.before(s).remove() : $("<p>").append(this.eq(0).clone()).html(); };


var IsSkipFormStep = true;
var States = [{ "name": "Alabama", "state": "AL" }, { "name": "Alaska", "state": "AK" }, { "name": "Arizona", "state": "AZ" }, { "name": "Arkansas", "state": "AR" }, { "name": "California", "state": "CA" }, { "name": "Colorado", "state": "CO" }, { "name": "Connecticut", "state": "CT" }, { "name": "Delaware", "state": "DE" }, { "name": "Florida", "state": "FL" }, { "name": "Georgia", "state": "GA" }, { "name": "Hawaii", "state": "HI" }, { "name": "Idaho", "state": "ID" }, { "name": "Illinois", "state": "IL" }, { "name": "Indiana", "state": "IN" }, { "name": "Iowa", "state": "IA" }, { "name": "Kansas", "state": "KS" }, { "name": "Kentucky", "state": "KY" }, { "name": "Louisiana", "state": "LA" }, { "name": "Maine", "state": "ME" }, { "name": "Maryland", "state": "MD" }, { "name": "Massachusetts", "state": "MA" }, { "name": "Michigan", "state": "MI" }, { "name": "Minnesota", "state": "MN" }, { "name": "Mississippi", "state": "MS" }, { "name": "Missouri", "state": "MO" }, { "name": "Montana", "state": "MT" }, { "name": "Nebraska", "state": "NE" }, { "name": "Nevada", "state": "NV" }, { "name": "New Hampshire", "state": "NH" }, { "name": "New Jersey", "state": "NJ" }, { "name": "New Mexico", "state": "NM" }, { "name": "New York", "state": "NY" }, { "name": "North Carolina", "state": "NC" }, { "name": "North Dakota", "state": "ND" }, { "name": "Ohio", "state": "OH" }, { "name": "Oklahoma", "state": "OK" }, { "name": "Oregon", "state": "OR" }, { "name": "Pennsylvania", "state": "PA" }, { "name": "Rhode Island", "state": "RI" }, { "name": "South Carolina", "state": "SC" }, { "name": "South Dakota", "state": "SD" }, { "name": "Tennessee", "state": "TN" }, { "name": "Texas", "state": "TX" }, { "name": "Utah", "state": "UT" }, { "name": "Vermont", "state": "VT" }, { "name": "Virginia", "state": "VA" }, { "name": "Washington", "state": "WA" }, { "name": "West Virginia", "state": "WV" }, { "name": "Wisconsin", "state": "WI" }, { "name": "Wyoming", "state": "WY" }];
var DFStyles = [{ F: ["33311"], S: "fsf" },
{ F: ["21952", "22102", "23591", "42331", "41201", "41211", "42741"], S: "rewards" },
{ F: ["32911", "42281", "41711"], S: "samples" },
{ F: ["28481", "29891", "31231", "36581", "37931", "38041", "38571", "39561", "39711", "41061", "41881", "41911", "42291", "42301", "43531", "37731", "39671", "39751", "39861", "40341", "40401", "40461", "41771"], S: "sweeps" },
{ F: ["38681", "39121", "42341", "40211"], S: "svoices" },
{ F: ["40811"], S: "horoscopes" },
{ F: ["42211"], S: "aas" },
{ F: ["36221"], S: "fdj" }
];
var FL = {
    erObj: {
        email: {
            emptyValue: "Please enter your Email Address",
            regex: {
                msg: "Please enter a valid Email Address", str: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            }
        }
        ,
        firstname: {
            emptyValue: "Please enter your First Name",
            regex: {
                msg: "Please enter a valid First Name", str: /^[a-zA-Z\s]*$/
            }
        }
        ,
        lastname: {
            emptyValue: "Please enter your Last Name",
            regex: {
                msg: "Please enter a valid Last Name", str: /^[a-zA-Z\s]*$/
            }
        }
        ,
        telephone: {
            emptyValue: "Please enter your Phone Number",
            regex: {
                msg: "Please enter valid Phone Number", str: /^\(?([2-9][0-8][0-9])\)?[-. ]?([2-9][0-9]{2})[-. ]?([0-9]{4})$/
            }
        }
        ,
        phonecode: {
            emptyValue: "Please enter your Phonecode",
            minlength: {
                msg: "Please enter 3 digit Phonecode", length: 3
            }
        }
        ,
        phoneprefix: {
            emptyValue: "Please enter your Phoneprefix",
            minlength: {
                msg: "Please enter 3 digit Phoneprefix", length: 3
            }
        }
        ,
        phonesuffix: {
            emptyValue: "Please enter your Phonesuffix",
            minlength: {
                msg: "Please enter 4 digit Phonesuffix", length: 4
            }
        }
        ,
        dobmonth: {
            minlength: {
                msg: "Please select your Birth Month", length: 1
            }
        }
        ,
        dobday: {
            minlength: {
                msg: "Please select your Birth Day", length: 1
            }
        }
        ,
        dobyear: {
            minlength: {
                msg: "Please select your Birth Year", length: 4
            }
        }
        ,
        address1: {
            emptyValue: "Please enter your Address"
        }
        ,
        city: {
            emptyValue: "Please enter your City"
        }
        ,
        state: {
            emptyValue: "Please select your State"
        }
        ,
        zippost: {
            emptyValue: "Please enter your Zip",
            regex: {
                msg: "Zip must be 5 digits", str: /(^\d{5}$)|(^\d{5}-\d{4}$)/
            }
        }
        ,
        vp5: {
            minlength: {
                msg: "Password must be at least 8 characters.",
                length: 8
            }
            ,
            regex: {
                msg: "Password must be 8-10 characters and must contain at least 1 number ",
                str: /^(?=.*[0-9])[a-zA-Z0-9]{8,10}$/
            }
        }
        ,
        date: {
            minlength: {
                msg: "Please enter your date in MM/DD/YYYY format.",
                length: 10
            }
            ,
            regex: {
                msg: "Please enter correct date.",
                str: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
            }
        }
    }
};
FL.genderLookUp = function (firstname) {
    var fn = (firstname ? firstname : $('input[name=firstname]').val());
    if (fn.length > 0) {
        $.get('/svcg.aspx?SvcTP=3&apikey=6C0E62C4-FB5C-42A5-9D3B-10457F314A81&pID=9&params=FName%3D' + fn + '%26apikey%3DCA5E311B-DC48-43B3-8E89-972B38E64910', function (data) {
            if (isNaN(data)) {
                if (data == 'F') {
                    $('body').find('[name="gender"]').val("False");
                } else if (data == 'M') {
                    $('body').find('[name="gender"]').val("True");
                }
            }
        });
    }
}

FL.zipLookUp = function (zip) {
    var zp = (zip ? zip : $('input[name=zippost]').val());
    if (zp.length == 5 && !isNaN(zp)) {
        $.get('/svcg.aspx?SvcTP=3&apikey=6C0E62C4-FB5C-42A5-9D3B-10457F314A81&pID=4&params=zip%3D' + zp + '%26apikey%3D50479670-5D5C-48FA-8384-98A28758BFA4', function (data) {
            if (data && data != 0) {
                var zip_obj = $.parseJSON(data);
                $('body').find('[name="city"]').val(zip_obj.City);
                $('body').find('[name="state"]').val(zip_obj.State);
            }
        }
        );
    }
}
FL.geoIpLookUp = function () {
    var ip = AF.Lead.v.ClientIP;
    $.get('/svcg.aspx?SvcTP=3&apikey=6C0E62C4-FB5C-42A5-9D3B-10457F314A81&pID=16&params=ip%3D' + ip + '%26apikey%3D17905175-9ED5-E983-5451-14439B152AB54C115399', function (data) {
        var loc_obj = $.parseJSON(data);
        $('body').find('[name="state"]').val(loc_obj.region);
        $('body').find('[name="zippost"]').val(loc_obj.postalCode);
        $('body').find('[name="city"]').val(loc_obj.city);
    }
    );
}
FL.getInputVal = function (name, keepCase) {
    var obj = $('input[name="' + name + '"], select[name="' + name + '"]').get(0),
        returnValue = '';
    keepCase = keepCase || false;
    if ($(obj).attr('type') == 'radio') {
        returnValue = UC($('input[name="' + name + '"]:checked').val());
    }
    else if ($(obj).attr('type') == 'checkbox') {
        var valArr = [];
        $('input[name="' + name + '"]').each(function () {
            if (this.checked)
                valArr.push(this.value);
        }
        );
        returnValue = valArr.join(',');
    }
    else {
        returnValue = obj == undefined ? '' : obj.value;
    }
    return keepCase ? returnValue : returnValue.toLowerCase();
}
FL.saveInputVal = function (fname, val, prnt, type) {
    var inpt = $('input[name=' + fname + ']').get(0);
    if (inpt) {
        $(inpt).val(val);
    } else {
        $(prnt).append('<input type="' + (type || 'text') + '" name="' + fname + '" value="' + val + '" />');
    }
}
FL.checkFields = function (alrt, id, callback, cbprms) {
    var alertMsg = '';
    $("#" + id).find("input,select").each(function () {
        if (FL.validate(this) != '') {
            alertMsg += FL.validate(this) + '\n';
        }
    }
    );
    if (alertMsg.length > 0) {
        if (alrt) alert(alertMsg);
        return false;
    }
    if (alrt && callback != undefined && typeof (callback) == "function") {
        callback(cbprms);
    }
    return true;
}
FL.validate = function (obj) {
    var inputVal = obj.value = $.trim(obj.value);
    var inputName = obj.name;
    var wObj = FL.erObj[(obj.getAttribute('data-erobj') || inputName)];
    var allValid = '';
    if (wObj != undefined) {
        var ret = false;
        $.each(wObj, function (key, value) {
            switch (key) {
                case "emptyValue":
                    if (inputVal.length == 0) {
                        ret = true;
                        allValid = value;
                    }
                    break;
                case "minlength":
                    if (obj.type == "checkbox" && $('input[name=' + inputName + ']:checked').length < value.length) {
                        ret = true;
                        allValid = value.msg;
                    } else if (obj.type != "checkbox" && inputVal.length < value.length) {
                        ret = true;
                        allValid = value.msg;
                    }
                    break;
                case "maxlength":
                    if (obj.type == "checkbox" && $('input[name=' + inputName + ']:checked').length > value.length) {
                        ret = true;
                        allValid = value.msg;
                    } else if (obj.type != "checkbox" && inputVal.length < value.length) {
                        ret = true;
                        allValid = value.msg;
                    }
                    break;
                case "regex":
                    if (!value.str.test(inputVal)) {
                        ret = true;
                        allValid = value.msg;
                    }
                    break;
            }
            if (ret) return false;
        }
        );
    }
    return allValid;
}
FL.getRptSurvey = function (chkVS) {
    var surveyData = "";
    var chkVSArr = [];
    $.each(chkVS.split('&'), function () {
        var param = UC(this.split('=')[0]);
        if (param && param.substring(0, 1) == "v") chkVSArr.push(param);
    })

    for (var key in AF.Lead.v) {
        if ((key.length == 3 || key.length == 4) && key.substring(0, 1) == "v" && $.inArray(key, chkVSArr) < 0) {
            surveyData += "&" + key + "=" + AF.Lead.v[key];
        }
    }
    return surveyData;
}
FL.UpdateSurveyQuery = function (sSurvey1, sSurvey2) {
    var sReturnSurvey = "";
    sSurvey1 = "&" + sSurvey1;
    if (!isUndefinedOfNull(sSurvey2)) {
        $.each(sSurvey2.split("&"), function () {
            try {
                var sCurrentSurveyName2 = UC(this.split('=')[0]);
                var sCurrentSurveyValue2 = UC(this.split('=')[1]);
                if (sSurvey1.indexOf("&" + sCurrentSurveyName2 + "=") != -1) {
                    var sSuvey1Value = AF.Campaign.URLparam(sSurvey1, sCurrentSurveyName2);
                    sSurvey1 = sSurvey1.replace(sCurrentSurveyName2 + "=" + sSuvey1Value, this)
                } else if (sCurrentSurveyName2 != "") { sSurvey1 = sSurvey1 + "&" + sCurrentSurveyName2 + "=" + sCurrentSurveyValue2; }
            } catch (ex) { console.log("Error update SQuery") }
        })
    }
    return sSurvey1;
}

FL.getSurvey = function () {
    var surveyPrm = AF.Flow.GetSurveyParamAsQS();
    if (surveyPrm == "") {
        var params = unescape(GetFlowVariable(AF.System.v.pubParams)).split("&");
        if (params.length > 0) {
            for (var i = 0; i < params.length; i++) {
                var srvParam = params[i].split("=")[0];
                if ((srvParam.length == 3 || srvParam.length == 4) && srvParam.substring(0, 1) == "v") {
                    surveyPrm += "&" + params[i];
                }
            }
        }
    }
    return surveyPrm;
}
FL.isSP = function (val) {
    val = val || "";
    return (val.length == 3 || val.length == 4) && val.substring(0, 1) == "v";
}
var CG = {
    TFEnabled:false,
    JRNYEnabled: false,
    Location: "",
    Identity: "",
    CurrentStep: "load"
};


FL.ClickGen = function (Seq, CurrentAction, NextStep) {

    if (CG.TFEnabled && (CG.Identity["vtfurl"] == undefined || CG.Identity["vtfurl"] == "")) { CG.Identity["vtfurl"] = $("input[name=xxTrustedFormCertUrl_TCPA]").val(); }
    if (CG.JRNYEnabled && (CG.Identity["vjtoken"] == undefined || CG.Identity["vjtoken"]=="")) { CG.Identity["vjtoken"] = $("input[name=universal_leadid]").val(); }
    try {
        var request = $.ajax({
            type: 'POST',
            url: '//www.clicken.us/Click/',
            dataType: 'json',
            data: {
                Seq: Seq, CS: CG.CurrentStep, CA: CurrentAction, NS: NextStep, Loc: CG.Location, Ide: CG.Identity
            }
        }
        );
        setTimeout(function () { request.abort() }, 2000);
        CG.CurrentStep = NextStep;
    }
    catch (err) {
        var request = $.ajax({
            type: 'POST',
            url: '//www.clicken.us/Click/',
            dataType: 'json',
            data: {
                Seq: Seq, CS: CG.CurrentStep, CA: CurrentAction, NS: NextStep, Loc: CG.Location, Ide: CG.Identity, err: err.message
            }
        }
        );
        setTimeout(function () { request.abort() }, 2000);
    }
}
FL.bic = function (t, e) { var r = !1; if (t.length > e) { r = !0; for (var n = 1; n <= e; n++) FL.checkArr(t[t.length - n], t[t.length - (n + 1)]) || (r = !1) } return r }
FL.checkArr = function (t, e) { var r = !0; return $.each(t, function (n, a) { (Math.abs(t[n] - e[n]) > 5 && n < 2 && "0" == AF.System.v.IsMobile || Math.abs(t[n] - e[n]) > 5 && 0 == n && "1" == AF.System.v.IsMobile || (Math.abs(t[n] - e[n]) > 100 || t[n] < 170 || e[n] < 170) && 2 == n) && (r = !1) }), r }

FL.LoadTF = function () {
    var field = 'xxTrustedFormCertUrl_TCPA';
    var provideReferrer = false;
    var invertFieldSensitivity = false;
    var tf = document.createElement('script');
    tf.type = 'text/javascript';
    tf.async = true;
    tf.src = 'http' + ('https:' == document.location.protocol ? 's' : '') +
        '://api.trustedform.com/trustedform.js?provide_referrer=' + escape(provideReferrer) + '&field=' + escape(field) + '&l=' + new Date().getTime() + Math.random() + '&invert_field_sensitivity=' + invertFieldSensitivity;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(tf, s);
}

FL.LoadJRNY = function () {

    var s = document.createElement('script');
    s.id = 'LeadiDscript_campaign';
    s.type = 'text/javascript';
    s.async = true;
    s.src = '//create.lidstatic.com/campaign/bc5a2e3b-feed-beef-cafe-959326831a15.js?snippet_version=2';
    var LeadiDscript = document.getElementById('leadid_token');
    LeadiDscript.parentNode.insertBefore(s, LeadiDscript);

}

function SL() {
    this.Version = 1;
    this.TotalAnsweredQ = 0;
    this.allSurvey = "";
    //V2 starts
    this.start2 = function (oSurvey) {
        if (typeof (oSurvey) != "object") {
            alert("oSurvey is not an object.");
            return false;
        }
        if (UC(AF.Lead.v.ZipPost) != "" && (UC(AF.Lead.v.State) == "" || UC(AF.Lead.v.City) == "")) {
            FL.zipLookUp(UC(AF.Lead.v.ZipPost));
        } else if (UC(AF.Lead.v.State) == "") {
            FL.geoIpLookUp();
        }
        if (UC(AF.Lead.v.FirstName) != "" && UC(AF.Lead.v.Gender) == "") {
            FL.genderLookUp(UC(AF.Lead.v.FirstName));
        }

        $.getJSON('/Services/GetAllConditions.ashx?dataformid=' + AF.Flow.v.RegFormID +
            '&gender=' + FL.getInputVal('gender') +
            '&age=' + FL.getInputVal('age') +
            '&dataformbankid=' + AF.Flow.v.DataFormBankID +
            '&flowid=' + AF.Flow.v.FlowID +
            '&allc=' + (oSurvey.tcpaLinkOut ? 0 : 1),
            function (data) {
                if (data) {
                    oSurvey.tcpaList = data.TCPA;
                    //oSurvey.ConditionList = data.SurveyCondition;
                    oSurvey.tfList = data.TF;
                    //oSurvey.scMap = data.SCMap;
                    $.each(oSurvey.tfList, function () {
                        oSurvey.iframetagstf += "<iframe id=\"off" + this.ID + "iframe\" src=\"/campaign.aspx?campaign=" + this.PlacementID + "\" style=\"display: none\"></iframe>";
                    });
                    $("#tf_ex").append(oSurvey.iframetagstf);
                    oSurvey.getQuestion();
                    //oSurvey.getTemplate();
                }
            }
        );
        $("#RgForm").append('<input type="hidden" name="device" value="' + AF.System.v.Device + '" />');
        $("#RgForm").append('<input type="hidden" name="esp" value="' + UC($.trim(UC(AF.Lead.v.Email)).split('@')[1]) + '" />');
        if (oSurvey.TFEnabled) FL.LoadTF();
        if (oSurvey.JRNYEnabled) {
            $("#RgForm").append('<input id="leadid_token" name="universal_leadid" type="hidden" value="" />');
            FL.LoadJRNY();
        }
    }
    this.AnswerPanel = "";
    this.SurveyPanel = "";
    this.CSSJS = "";
    this.getQuestion = function (qna = "", hasSubQ = 0) {
        console.log(qna);
        oSurvey = this;
        $.ajax({
            type: 'POST',
            url: 'https://v5rs.regflow.com/SurveyAPI/Survey/QuestionAPI?'  + qna, //+ window.location.search.substring(1)
            data: {
                VID: AF.Lead.v.VID,
                DataFormBankID: AF.Flow.v.DataFormBankID,
                SurveyRecency: UC(AF.Lead.v.SurveyResponseRecency_Enc),
                gender: UC(AF.Lead.v.Gender),
                age: UC(AF.Lead.v.Age),
                city: UC(AF.Lead.v.City),
                state: UC(AF.Lead.v.State),
                zippost: UC(AF.Lead.v.ZipPost),
                phone: UC(AF.Lead.v.Telephone),
                carrier: UC(AF.Lead.v.carrier),
                email: UC(AF.Lead.v.Email),
                firstname: UC(AF.Lead.v.FirstName),
                lastname: UC(AF.Lead.v.LastName),
                address1: UC(AF.Lead.v.Address1).replace(/#/g, "%23"),
                ismobile: UC(AF.System.v.IsMobile),
                reward: AF.Campaign.URLparam(unescape(AF.System.v.pubParams).toLowerCase(), "reward"),
                subaff: UC(AF.Flow.v.SubAff),
                subaff2: UC(AF.Flow.v.SubAff.split('_')[1]),
                affiliateid: UC(AF.Flow.v.AffiliateID),
                flowid: UC(AF.Flow.v.FlowID)
            },
            dataType: 'json',
            crossDomain: true,
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
            },

            success: function (data) {
                if (data.SurveyQnA.length > 0 && (oSurvey.QCap == 0 || oSurvey.TotalAnsweredQ++ < oSurvey.QCap)) {
                    if (data.SurveyTemplate.AnswerPanel) { oSurvey.AnswerPanel = data.SurveyTemplate.AnswerPanel; }
                    if (data.SurveyTemplate.SurveyPanel) { oSurvey.SurveyPanel = data.SurveyTemplate.SurveyPanel; }
                    if (data.SurveyTemplate.CSSJS) { oSurvey.CSSJS = data.SurveyTemplate.CSSJS; }

                    // initial question
                    if (qna == "") {
                        $("#df-loader").hide();
                        $("#surveyContainer").show();
                        //$(".SurveyQue").show();
                    }

                    // sub question
                    if (hasSubQ > 0 && data.isSubQ == true) {
                        var html = oSurvey.displayQ(data);
                        $("#surveyContainer").append(html);
                        $('html, body').animate({ scrollTop: ($('#surveyContainer').last().offset().top) }, 500);
                    }
                    else {
                        $("#surveyContainer").html("");
                        var html = oSurvey.displayQ(data);
                        $("#surveyContainer").append(html);
                        $('html, body').animate({ scrollTop: 0 }, 500);
                    }

                    var sCurrentAns = "";
                    // answers
                    // if ($(".SurveyQue").attr("qtype")!="checkbox"){
                    //$(".AnswerBlock").on('click', ".answers", function (event) {
                    $(".AnswerBlock").on('click', ".ansinput", function (event) {
                        //event.preventDefault();
                        if ($(this).attr("disabled") != "true") {

                            var QID = $(this).attr("QID");
                            var AID = $(this).attr("AID");
                            var PQs = $(this).attr("PQs");
                            var SubQ = $(this).attr("SubQ");
                            var SID = $(this).attr("SID");

                            if ($(this).attr("type") == "radio") {
                                $(this).attr('checked', "checked");

                                sCurrentAns = $("#surveyContainer").find('input,select').serialize();
                                oSurvey.allSurvey += sCurrentAns + "&";
                                // disabled all answers after click.
                                $(this).parent().find(".ansinput").each(function () {
                                    $(this).attr("disabled", true);
                                });

                                if (oSurvey.trck) FL.ClickGen(parseInt(PQs)+1, sCurrentAns, QID);

                                oSurvey.getQuestion("&surveyresponse=" + escape(oSurvey.allSurvey) + "&AID=" + AID + "&PQs=" + PQs + "&SubQ=" + SubQ + "&QID=" + QID + "&SID=" + SID + "&QCap=" + oSurvey.QCap, SubQ);
                            }
                            else if ($(this).attr("type") == "checkbox") {
                                // multiple selections
                                /*if ($(this).siblings(".btnstyle").hasClass("selected")) {
                                    $(this).siblings(".btnstyle").removeClass("selected");
                                }
                                else {
                                    $(this).siblings(".btnstyle").addClass("selected");
                                }*/
                            }
                            else {
                                alert("undefined type, not able to handle yet.");
                            }
                        }
                    });
                    //}

                    $(".btnSubmit").click(function () {
                        var isNoneAnswer = true;
                        var QID = 0, AID = "", PQs = 0, SubQ = 0, SID = 0;

                        //$(".answers").find("label.btnstyle.selected").each(function () {
                        $("input.ansinput:selected, input.ansinput:checked").each(function () {
                            isNoneAnswer = false;
                            //oSurvey.allSurvey += $(this).parent().find("input:checkbox,select").serialize();
                            QID = $(this).attr("QID");
                            AID += $(this).attr("AID") + ",";
                            PQs = $(this).attr("PQs");
                            SubQ = $(this).attr("SubQ");
                            SID = $(this).attr("SID");
                            //}
                        });
                        // no answer
                        if (oSurvey.trck) FL.ClickGen(parseInt(PQs) + 1, sCurrentAns, QID);
                        if (!isNoneAnswer) {
                            oSurvey.allSurvey += $("#surveyContainer").find('input,select').serialize() + "&";
                            oSurvey.getQuestion("&surveyresponse=" + escape(oSurvey.allSurvey) + '&AID=' + AID + '&PQs=' + PQs + '&SubQ=' + SubQ + "&QID=" + QID + "&SID=" + SID + "&QCap=" + oSurvey.QCap, SubQ);
                        }
                        else {
                            alert("Please provide at least one answer to continue.");
                        }
                    });
                }
                else {
                    if (oSurvey.TCPA && oSurvey.showTCPA()) {
                        $("#TCPAStep").fadeIn();
                        $("#surveyContainer").hide();
                    }else {
                        //if (oSurvey.reg == "uk" && typeof (AF.Flow.v.TTID) == 'undefined') { AF.Flow.v.TTID = AF.Flow.v.TID; }
                        if (oSurvey.reg == "uk" && typeof (AF.Flow.v.TTID) == 'undefined') { AF.Flow.v.TTID = AF.Flow.v.UK_TID; AF.Flow.v.TID = AF.Flow.v.UK_TID; }
                        if (oSurvey.reg == "ca" && typeof (AF.Flow.v.TTID) == 'undefined') { AF.Flow.v.TTID = AF.Flow.v.CA_TID; AF.Flow.v.TID = AF.Flow.v.CA_TID; }
                        oSurvey.submit();
                    }
                }
            },
            error: function (error) {
                console.log(error);
                if (oSurvey.TCPA && oSurvey.showTCPA()) {
                    $("#TCPAStep").fadeIn();
                    $("#surveyContainer").hide();
                } else {
                    //if (oSurvey.reg == "uk" && typeof (AF.Flow.v.TTID) == 'undefined') { AF.Flow.v.TTID = AF.Flow.v.TID; }
                    if (oSurvey.reg == "uk" && typeof (AF.Flow.v.TTID) == 'undefined') { AF.Flow.v.TTID = AF.Flow.v.UK_TID; AF.Flow.v.TID = AF.Flow.v.UK_TID; }
                    if (oSurvey.reg == "ca" && typeof (AF.Flow.v.TTID) == 'undefined') { AF.Flow.v.TTID = AF.Flow.v.CA_TID; AF.Flow.v.TID = AF.Flow.v.CA_TID; }
                    oSurvey.submit();
                }
            }
        });
    }

    this.displayQ = function (data) {
        oSurvey = this;
        var isMultiple = data.QuestionType == "checkbox";  //var html = `<div class="SurveyQue rand-engagement {QsCss}" style="display: block;"><span class="question">{QuestionText}</span><table border="0"><tbody><tr><td><div class="AnswerBlock">{AnswerBlock}{CheckBoxButton}</td></tr></tbody></table></div>`;
        if (UC(data.QuestionText) != '') {
            var tokens = data.QuestionText.match(/\{\{(.*?)\}\}/g) || [];
            if (tokens.length) {
                var thisQ = this;
                tokens.forEach(function (v) {
                    var rplKey = v.replace("{{", "").replace("}}", "").toLowerCase(),
                        rplVal = FL.getInputVal(rplKey, 1),
                        regexv = new RegExp(v, 'g');

                    if (rplKey === "statename") {
                        rplVal = UC((States.find(function (e, i) {
                            return e.state.toLowerCase() === FL.getInputVal("state");
                        }) || {}).name);
                    }

                    data.QuestionText = data.QuestionText.replace(regexv, rplVal);
                });
            }
        }
        var html = oSurvey.SurveyPanel.replace(/\{IsMultiple}/gi, (isMultiple ? "multiple Qid" + data.QuestionID : "single Qid" + data.QuestionID)).replace(/\{QsCss}/gi, `${data.QsCss}`).replace(/\{QuestionText}/gi, `${data.QuestionText}`);
        //{ AnswerID }, {AnsCss}, {inputpanel}, {checkboxbutton}, {QsCss}, {QuestionText}, {answertext}, {AnswerBlock}

        var sAnswers = "";
        var counter = 0;
        $.each(data.SurveyQnA, function (index, ans) {
            var AnswerPanel = oSurvey.AnswerPanel; // `<answerpanel><i class="isolated "></i><div class="Aid${ans.AnswerID} answers ${ans.AnsCss}">{inputpanel}<label for="Aid${ans.AnswerID}" class="btnstyle">{answertext}</label></div></answerpanel>`;
            AnswerPanel = AnswerPanel.replace(/\{AnswerID}/gi, `${ans.AnswerID}`).replace(/\{AnsCss}/gi, `${ans.AnsCss}`);

            var sInputPanel = `<input type="${data.QuestionType}" name="${ans.AnswerName}" value="${ans.AnswerValue}" id="Aid${ans.AnswerID}" aid="${ans.AnswerID}" SQID="${data.QuestionBankID}" QID="${data.QuestionBankID}" PQs="${data.AnsweredQIDs}" SubQ="${data.SubQuestion}" SID="${data.SID}" class="ansinput"/>`;
            var sAnswerText = `<span>${ans.AnswerText}</span>`;
            var sAnswerBlock = $(AnswerPanel).html().replace(/\{inputpanel}/gi, sInputPanel).replace(/\{answertext}/gi, sAnswerText);

            sAnswers += sAnswerBlock; /*answers += `<i class="isolated "></i><div class="Aid${ans.AnswerID} answers ${ans.AnsCss}"><input type="${data.QuestionType}" name="${ans.AnswerName}" value="${ans.AnswerValue}" id="Aid${ans.AnswerID}" aid="${ans.AnswerID}" SQID="${data.QuestionBankID}" QID="${data.QuestionBankID}" PQs="${data.AnsweredQIDs}" SubQ="${data.SubQuestion}" SID="${data.SID}"/><label for="Aid${ans.AnswerID}" class="btnstyle"><span>${ans.AnswerText}</span></label></div>`;*/
        });
        var checkboxdiv = "";
        if (data.QuestionType == "checkbox") {
            checkboxdiv = `<i class="isolated "></i><div align="center" class="btnSubmit btnstyle"><a href="javascript:void(0);">Done</a></div>`;
        }

        html = html.replace(/\{checkboxbutton}/gi, checkboxdiv).replace(/\{AnswerBlock}/gi, sAnswers);

        return html;
    };
    // V2 Ends

    this.totalQuestionsNum = $(".SurveyQue").not(".SubQue").length;
    this.currentQuestionNum = 0;
    this.Qnum = this.step = 0;
    this.TCPA = true;
    this.reg = "us";
    this.trck = false;
    this.QCap = parseInt((DFSettings || {}).QuestionCap || 0) || 0;
    this.QCap = (parseInt(UC(AF.Flow.v.TotalQuestionViewCap)) || 0) > 0 ? parseInt(UC(AF.Flow.v.TotalQuestionViewCap)) : this.QCap; // df view cap overrides the dataformbank level view cap
    this.tcpaLinkOut = (AF.System.v.IsMobile == "1");
    this.GetAllTCPA = false;
    this.ApplyDynamicTCPAonPage = true;
    this.iframetagstf = this.tcpaList = '';
    this.ConditionList;
    this.CompList;
    this.TFEnabled = false;
    this.JRNYEnabled = false;
    this.lc = Date.now();
    this.cl = new Array();
    this.Questions = new Array();
    this.AnsweredQuestions = new Array();
    this.question = function (num, name, qid, cls, dpndpr, prgr, filtered, type) {
        this.Number = num;
        this.Pname = name;
        this.QID = qid;
        this.Class = cls || "";
        this.Shown = false;
        this.Filtered = (filtered ? filtered : false);
        this.DependParam = dpndpr;
        this.Progress = prgr;
        this.Type = type;
    }
    this.animateBefore = function () { }
    this.animateAfter = function (qNum) { }
    this.getNextQuestion = function (obj, oSurvey, e) {
        var that = this;
        if (typeof (oSurvey) != "object") {
            alert("oSurvey is not an object.");
            return false;
        }
        if ($.inArray($(obj).parents('.SurveyQue').attr("id"), this.AnsweredQuestions) > -1) {
            return false;
        }
        this.AnsweredQuestions.push($(obj).parents('.SurveyQue').attr("id"));
        if (e) {
            this.cl.push([e.clientX, e.clientY, Date.now() - this.lc]);
            this.lc = Date.now();
        }
        this.animateBefore();
        if (obj != null) {
            var dependQs = $.grep(oSurvey.Questions, function (n, i) {
                var tgt = false;
                $.each(n.DependParam, function () {
                    if (this.name == obj.name) {
                        tgt = true;
                        return false;
                    }
                });
                return (!n.Shown && !n.Filtered && tgt);
            });
            $.each(dependQs, function () {
                var q = this;
                $.each(this.DependParam, function () {
                    var values = this.value.split(',');
                    if ((!this.excl && (obj.name == this.name || (this.name == 'multicond' && this.value.indexOf(obj.name + '=') > -1)) && $.inArray(obj.value, values) == -1) ||
                        (this.excl && (obj.name == this.name || (this.name == 'multicond' && this.value.indexOf(obj.name + '=') > -1)) && $.inArray(obj.value, values) > -1)) {
                        oSurvey.Questions[q.Number - 1].Filtered = true;
                        $.each(oSurvey.Questions, function () {
                            var deepQ = this;
                            var qName = oSurvey.Questions[q.Number - 1].Pname;
                            if (!this.Shown && !this.Filtered) {
                                $.each(this.DependParam, function () {
                                    if (qName == this.name || (this.name == 'multicond' && this.value.indexOf(qName + '=') > -1 && !survey.ConditionMet(this.name, this.value))) {
                                        deepQ.Filtered = true;
                                    }
                                });
                            }
                        });
                        return false;
                    }
                });
            });
        }
        this.showNextQuestion(obj, oSurvey);
    }

    this.showNextQuestion = function (obj, oSurvey) {
        var remainQuestions = $.grep(this.Questions, function (n, i) {
            return !n.Shown && !n.Filtered;
        });
        var totalQuestions = $.grep(this.Questions, function (n, i) {
            return !n.Filtered;
        });
        this.totalQuestionsNum = totalQuestions.length;
        var niq = 0;
        do {
            var skipQuestion = false;
            if (remainQuestions[niq] != undefined) {
                $.each(remainQuestions[niq].DependParam, function () {
                    var formVal = (FL.getInputVal(this.name) == "" ? UC(AF.Lead.v[this.name]) : FL.getInputVal(this.name)).toLowerCase();
                    if (formVal == "") {
                        formVal = "[empty]";
                    }
                    var fValues = this.value.toLowerCase().split(',');
                    if (this.value != "" && (((this.name.length == 3 || this.name.length == 4) && this.name.substring(0, 1) == 'v' &&
                        ((!this.excl && $.inArray(formVal, fValues) == -1) || (this.excl && $.inArray(formVal, fValues) > -1))) || (this.name == 'multicond' && !survey.ConditionMet(this.name, this.value)))) {
                        skipQuestion = true;
                        oSurvey.Questions[remainQuestions[niq].Number - 1].Filtered = true;
                        if (remainQuestions[niq + 1] != undefined) niq++;
                        else remainQuestions.shift();
                        return false;
                    }
                });
            }
        }
        while (skipQuestion);
        var answer = (obj != null ? $(obj).parents('.SurveyQue').find('input,select').serialize() : "");
        if (FL.bic(this.cl, 5)) { FL.saveInputVal('vbic', 1, '#tf_ex'); }
        if (remainQuestions.length > 0 && remainQuestions[niq] != undefined && $('#Qnum' + remainQuestions[niq].Number).get(0) != undefined &&
            ((this.QCap > 0 && this.step < this.QCap) || this.QCap <= 0)) {
            this.animateAfter(remainQuestions[niq].Number);
            var Qid = UC($('#Qnum' + remainQuestions[niq].Number).attr('class').match(/(Qid\d+(\.\d)*)/g)[0]).replace(/\D+/g, '');
            if (oSurvey.trck) FL.ClickGen(this.step++, answer, Qid);
            this.Qnum = remainQuestions[niq].Number;
            if (remainQuestions[niq].Type != "SubQ") {
                $(".SurveyQue").hide();
                ++this.currentQuestionNum;
                $('html,body').scrollTop(0);
            }
            if ($("#Qnum" + remainQuestions[niq].Number).find("[data-cond]").length) {
                this.answerCondCheck(remainQuestions[niq].Number);
            }
            $('#Qnum' + remainQuestions[niq].Number).show();
            if (remainQuestions[niq].Type == "SubQ") {
                $('html,body').scrollTop($('#Qnum' + remainQuestions[niq].Number).position().top);
            }
            this.Questions[remainQuestions[niq].Number - 1].Shown = true;
            this.updateQuestionNum();
        } else {
            this.animateAfter();
            $("#surveyContainer").hide();
            $("#toast-container").slideUp();
            if (!FL.checkFields(false, 'FormStep', oSurvey.complete, oSurvey) && typeof (IsSkipFormStep) == "undefined") {
                if (oSurvey.trck) FL.ClickGen(this.step++, answer, "ShowForm");
                $("#FormStep").fadeIn();
            } else if (this.TCPA && this.showTCPA()) {
                if (oSurvey.trck) FL.ClickGen(this.step++, answer, "ShowTCPA");

                $("#TCPAStep").fadeIn();
            } else {
                if (oSurvey.reg == "uk" && typeof (AF.Flow.v.TTID) == 'undefined') { AF.Flow.v.TTID = AF.Flow.v.UK_TID; AF.Flow.v.TID = AF.Flow.v.UK_TID; }
                if (oSurvey.reg == "ca" && typeof (AF.Flow.v.TTID) == 'undefined') { AF.Flow.v.TTID = AF.Flow.v.CA_TID; AF.Flow.v.TID = AF.Flow.v.CA_TID; }
                if (oSurvey.trck) FL.ClickGen(this.step++, answer, "SubmitSurvey");
                oSurvey.submit();
            }
            $('html,body').scrollTop(0);
        }
    }
    this.answerCondCheck = function (Qnum) {
        var that = this;
        $("#Qnum" + Qnum).find("[data-cond]").each(function () {
            var cond = $(this).data('cond').split('==');
            if (cond[1] && !that.ConditionMet(cond[0], cond[1] || "")) {
                $(this).parents('.answers').hide();
            }
        });
    }
    this.updateQuestionNum = function () {
        $("#totalQ").html(this.totalQuestionsNum);
        $("#curQ").html(this.currentQuestionNum);
    }
    this.start = function (oSurvey) {
        if (typeof (oSurvey) != "object") {
            alert("oSurvey is not an object.");
            return false;
        }
        var cgSubAffArr = UC(AF.Flow.v.SubAff).split('_');
        CG.TFEnabled = oSurvey.TFEnabled;
        CG.JRNYEnabled = oSurvey.JRNYEnabled;
        CG.Location = { f: UC(AF.Flow.v.FlowID), df: UC(AF.Flow.v.RegFormID), dfb: UC(AF.Flow.v.DataFormBankID), affid: UC(AF.Flow.v.AffiliateID) };
        CG.Identity = {
            vid: AF.Lead.v.VID,
            evid: AF.Lead.v.EntranceVID,
            gender: UC(AF.Lead.v.Gender).toLowerCase(),
            age: UC(AF.Lead.v.Age),
            state: UC(AF.Lead.v.State),
            esp: UC(AF.Lead.v.Email).split('@')[1],
            device: UC(AF.System.v.Device),
            browser: UC(AF.System.v.Browser) + ' ' + UC(AF.System.v.BrowserVersion),
            rcpt: UC(AF.Lead.v.RcptScore),
            sa1: UC(cgSubAffArr[0]),
            sa2: UC(cgSubAffArr[1]),
            sa3: UC(cgSubAffArr[2]),
            sa4: UC(cgSubAffArr[3]),
            sa5: UC(cgSubAffArr[4]),
        };
        if (oSurvey.Version == 2) { this.start2(oSurvey); return; }

        if (UC(AF.Lead.v.ZipPost) != "" && (UC(AF.Lead.v.State) == "" || UC(AF.Lead.v.City) == "")) {
            FL.zipLookUp(UC(AF.Lead.v.ZipPost));
        } else if (UC(AF.Lead.v.State) == "") {
            FL.geoIpLookUp();
        }
        if (UC(AF.Lead.v.FirstName) != "" && UC(AF.Lead.v.Gender) == "") {
            FL.genderLookUp(UC(AF.Lead.v.FirstName));
        }
        $.getJSON('/Services/GetAllConditions.ashx?dataformid=' + AF.Flow.v.RegFormID +
            '&gender=' + FL.getInputVal('gender') +
            '&age=' + FL.getInputVal('age') +
            '&dataformbankid=' + AF.Flow.v.DataFormBankID +
            '&flowid=' + AF.Flow.v.FlowID +
            '&allc=' + (oSurvey.tcpaLinkOut && !oSurvey.GetAllTCPA ? 0 : 1),
            function (data) {
                if (data) {
                    oSurvey.tcpaList = data.TCPA;
                    oSurvey.ConditionList = data.SurveyCondition;
                    oSurvey.tfList = data.TF;
                    oSurvey.scMap = data.SCMap;
                    oSurvey.sData = data.SData;
                    oSurvey.run(oSurvey);
                }
            }
        );
        $("#RgForm").append('<input type="hidden" name="device" value="' + AF.System.v.Device + '" />');
        $("#RgForm").append('<input type="hidden" name="esp" value="' + UC($.trim(UC(AF.Lead.v.Email)).split('@')[1]) + '" />');
        if (oSurvey.TFEnabled) FL.LoadTF();
        if (oSurvey.JRNYEnabled) {
            $("#RgForm").append('<input id="leadid_token" name="universal_leadid" type="hidden" value="" />');
            FL.LoadJRNY();
        }
    }
    this.skip = function (oSurvey) {
        $("#surveyContainer").hide();
        $("#toast-container").slideUp();
        if (!FL.checkFields(false, 'FormStep', oSurvey.complete, oSurvey) && typeof (IsSkipFormStep) == "undefined") {
            if (oSurvey.trck) FL.ClickGen(this.step++, "Skip", "ShowForm");
            $("#FormStep").fadeIn();
        } else if (this.TCPA && this.showTCPA()) {
            if (oSurvey.trck) FL.ClickGen(this.step++, "Skip", "ShowTCPA");

            $("#TCPAStep").fadeIn();
        } else {
            if (oSurvey.reg == "uk" && typeof (AF.Flow.v.TTID) == 'undefined') { { AF.Flow.v.TTID = AF.Flow.v.UK_TID; AF.Flow.v.TID = AF.Flow.v.UK_TID; } }
            if (oSurvey.reg == "ca" && typeof (AF.Flow.v.TTID) == 'undefined') { { AF.Flow.v.TTID = AF.Flow.v.CA_TID; AF.Flow.v.TID = AF.Flow.v.CA_TID; } }
            if (oSurvey.trck) FL.ClickGen(this.step++, "Skip", "SubmitSurvey");
            oSurvey.submit();
        }
    }

    this.run = function (oSurvey) {
        $.each(this.tfList, function () {
            oSurvey.iframetagstf += "<iframe id=\"off" + this.ID + "iframe\" src=\"/campaign.aspx?campaign=" + this.PlacementID + "\" style=\"display: none\"></iframe>";
        });
        $("#tf_ex").append(oSurvey.iframetagstf);
        var cappedQids = [];
        if (AF.Flow.v.CappedSurveyQuestionID != undefined) {
            cappedQids = AF.Flow.v.CappedSurveyQuestionID.split(',');
            $.each(cappedQids, function (index, value) {
                $(".Qid" + value).addClass("Pre_");
            });
        }
        var randDisQ = [];
        var randGroups = [];
        $('.SurveyQue').each(function (ind, vl) {
            var filtered = false,
                QID = $(this).attr('class').match(/(Qid\d+(\.\d)*)/g)[0].replace(/[^0-9]+/g, ""),
                type = "";
            var Condisions = $.grep(oSurvey.scMap, function (n, i) {
                return n.Qid == QID;
            });

            if (!filtered && $.inArray(QID, cappedQids) > -1) {
                filtered = true;
                --oSurvey.totalQuestionsNum;
            }
            /* QRand */
            var randClass = $(this).attr('class').match(/(rand-([a-zA-Z]*?)*)/g);
            if (randClass) {
                if ($.inArray(randClass[0], randGroups) == -1) {
                    var rndQs = [];
                    $('.SurveyQue.' + randClass[0]).toArray().forEach(function (v, i) {
                        rndQs.push($(v).attr('class').match(/(Qid\d+(\.\d)*)/g)[0].replace(/[^0-9]+/g, ""));
                    });
                    rndQs.splice(Math.floor(Math.random() * rndQs.length), 1);
                    randDisQ = randDisQ.concat(rndQs);
                    randGroups.push(randClass[0]);
                }
            }
            if (!filtered && $.inArray(QID, randDisQ) > -1) {
                filtered = true;
                --oSurvey.totalQuestionsNum;
            }
            /* QRand end */

            /* token replacement */
            var tokens = $(this).find('.question').html().match(/\{\{(.*?)\}\}/g) || [];
            if (tokens.length) {
                var thisQ = this;
                tokens.forEach(function (v) {
                    var rplKey = v.replace("{{", "").replace("}}", "").toLowerCase(),
                        rplVal = FL.getInputVal(rplKey, 1),
                        regexv = new RegExp(v, 'g');

                    if (rplKey === "statename") {
                        rplVal = UC((States.find(function (e, i) {
                            return e.state.toLowerCase() === FL.getInputVal("state");
                        }) || {}).name);
                    }

                    $(thisQ).find('.question').html($(thisQ).find('.question').html().replace(regexv, rplVal));
                });
            }
            /* token replacement end */
            var dependParam = [];
            if (Condisions != null) {
                $.each(Condisions, function () {
                    var curCond = this;
                    type = curCond.Type;
                    var c = $.grep(oSurvey.ConditionList, function (n, i) {
                        return n.ID == curCond.Scid;
                    });
                    if (c[0] != undefined) {
                        if ('age,gender,State,device,esp,carrier,subaff2,subaff4,ismobile,flowid,ipage,bve,bvc,bva'.indexOf(c[0].FieldName) == -1) {
                            dependParam.push({
                                name: c[0].FieldName,
                                value: c[0].Value,
                                excl: c[0].Exclusive
                            });
                        }
                        if (!filtered && ((c[0].Value == "" && UC(AF.Lead.v[c[0].FieldName]) != "") ||
                            (('age,gender,State,device,esp,carrier,subaff2,subaff4,ismobile,flowid,ipage,bve,bvc,bva'.indexOf(c[0].FieldName) > -1 || ind == 0) &&
                                ((!c[0].Exclusive && !oSurvey.ConditionMet(c[0].FieldName, c[0].Value)) || (c[0].Exclusive && oSurvey.ConditionMet(c[0].FieldName, c[0].Value)))))) {
                            filtered = true;
                            --oSurvey.totalQuestionsNum;
                        }
                    }
                });
            }
            oSurvey.Questions.push(new oSurvey.question(parseInt(this.id.replace(/[^0-9]+/g, "")), $(this).find('input,select').first().attr('name'),
                parseInt(QID),
                $(this).attr('class'), dependParam, 0, filtered, type));
        });
        var tq = $.grep(oSurvey.Questions, function (n, i) {
            return !n.Filtered;
        }),
            ttq = tq.length,
            pck = Math.round(ttq / 3),
            onep = 100 / ttq,
            accum = 0,
            ow = 1.2;
        $.each(oSurvey.Questions, function (ind, vl) {
            if (!this.Filtered) {
                var prgr = (100 - pck * ow * onep - pck * 0.8 * ow * onep) / (ttq - 2 * pck);
                if (ind + 1 <= pck) {
                    prgr = ow * onep;
                } else if (ind + 1 > pck && ind + 1 <= 2 * pck) {
                    prgr = 0.8 * ow * onep;
                }
                accum += prgr;
            }
            this.Progress = accum;
        });
        this.showNextQuestion(null, oSurvey);
    }

    this.ConditionMet = function (fieldName, fieldValue) {
        fieldName = fieldName.toLocaleLowerCase();
        fieldValue = fieldValue.toLocaleLowerCase();
        var formVal = (FL.getInputVal(fieldName) == "" ? UC(AF.Lead.v[fieldName]) : FL.getInputVal(fieldName)).toLocaleLowerCase();
        if (fieldName == 'multicond2') {
            try {
                var cond = fieldValue.split('||');
                var isOrCase = true;
                if (fieldValue.indexOf("&") != -1) {
                    cond = fieldValue.split('&');
                    isOrCase = false;
                }
                var condMetArr = [], seperatorArr = ["=", "<", ">"];

                for (var z = 0; z < cond.length; z++) {
                    var fValues = "";
                    var fValuesArr = "";
                    var fname = "";

                    var currentSeperator = "=";
                    for (var zz = 0; zz < seperatorArr.length; zz++) {
                        var currentSeperator = seperatorArr[zz];
                        if (cond[z].indexOf(currentSeperator) != -1) {
                            fValues = cond[z].split(currentSeperator)[1];
                            fValuesArr = fValues.split(',');
                            fname = cond[z].split(currentSeperator)[0];
                            formVal = (FL.getInputVal(fname) == "" ? UC(AF.Lead.v[fname]) : FL.getInputVal(fname)).toLocaleLowerCase();
                            break;
                        }
                    }
                    if (fname == 'gender') {
                        condMetArr.push(formVal.substring(0, 1).replace('m', 't') == fValues.substring(0, 1));
                    } else if (fname == 'age') {
                        var age = UC(AF.Lead.v.Age);
                        condMetArr.push(eval(cond[z]));
                    } else if (fname == 'clientip') {
                        var clientip = UC(AF.Lead.v.ClientIP);
                        if (fValues == "ipv6") condMetArr.push(clientip.indexOf(":") != -1);
                        else if (fValues == "ipv4") condMetArr.push(clientip.indexOf(":") == -1);
                    } else if (fname == 'ipage') {
                        var fn = fname,
                            fv = UC(fValues.split('=')[1]).split(',');
                        condMetArr.push(($.inArray(jPubSrcParam(fn), fv) > -1));
                    } else if (fname.indexOf('subaff') > -1) {
                        //var fValues = fieldValue.split(','),
                        var snum = parseInt(UC(fname.split('subaff')[1]));
                        formVal = UC(UC(FL.getInputVal('subaff').split('_'))[snum - 1]);
                        condMetArr.push(($.inArray(formVal, fValuesArr) > -1));
                    } else {
                        var cVal = (FL.getInputVal(cond[z].split('=')[0]) == "" ?
                            UC(AF.Lead.v[cond[z].split('=')[0]]) : FL.getInputVal(cond[z].split('=')[0])).toLocaleLowerCase();
                        if (cVal == "") {
                            cVal = "[empty]"; // Added for empty value comparison
                        }
                        condMetArr.push($.inArray(cVal, fValuesArr) > -1);
                    }
                }
                if (isOrCase) { return $.inArray(true, condMetArr) > -1; }
                else { return $.inArray(false, condMetArr) == -1; }
            } catch (ex) { console.log("MultiCond" + ex); return false; }
        }
        else if (fieldName == 'multicond') {
            var cond = fieldValue.split('||'),
                condMetArr = [];
            for (var z = 0; z < cond.length; z++) {
                var fValues = cond[z].split('=')[1].split(',');
                var cVal = (FL.getInputVal(cond[z].split('=')[0]) == "" ?
                    UC(AF.Lead.v[cond[z].split('=')[0]]) : FL.getInputVal(cond[z].split('=')[0])).toLocaleLowerCase();
                if (cVal == "") {
                    cVal = "[empty]";
                }
                condMetArr.push($.inArray(cVal, fValues) > -1);
            }
            if ($.inArray(true, condMetArr) > -1) return true;
        } else if (fieldName == 'gender') {
            if (formVal.substring(0, 1).replace('m', 't') == fieldValue.substring(0, 1))
                return true;
        } else if (fieldName == 'age') {
            var age = UC(AF.Lead.v.Age);
            if (eval(fieldValue.replace('&', ' && '))) return true;
        } else if (fieldName == 'clientip') {
            var clientip = UC(AF.Lead.v.ClientIP);
            if (fieldValue == "ipv6" && clientip.indexOf(":") != -1) return true;
            else if (fieldValue == "ipv4" && clientip.indexOf(":") == -1) return true;
        }
        else if (fieldName == 'ipage') {
            var fn = fieldValue.split('=')[0],
                fv = UC(fieldValue.split('=')[1]).split(',');
            if ($.inArray(jPubSrcParam(fn), fv) > -1) return true;
        } else if (fieldName.indexOf('subaff') > -1) {
            var fValues = fieldValue.split(','),
                snum = parseInt(UC(fieldName.split('subaff')[1]));
            formVal = UC(UC(FL.getInputVal('subaff').split('_'))[snum - 1]);
            if ($.inArray(formVal, fValues) > -1) return true;
        } else if (fieldValue.indexOf(',') > -1) {
            var fValues = fieldValue.split(',');
            if (formVal == "") {
                formVal = "[empty]"; // Added for empty value comparison
            }
            if ($.inArray(formVal, fValues) > -1) return true;
        } else if (formVal == fieldValue) return true;
        return false;
    }

    this.complete = function (oSurvey) {
        $("#FormStep").hide();
        if (oSurvey.TCPA && oSurvey.showTCPA()) {
            if (oSurvey.trck) FL.ClickGen(this.step++, "FormValidate", "ShowTCPA");

            $("#TCPAStep").fadeIn();
        } else {
            //if (oSurvey.reg == "uk" && typeof (AF.Flow.v.TTID) == 'undefined') { AF.Flow.v.TTID = AF.Flow.v.TID; }
            if (oSurvey.reg == "uk" && typeof (AF.Flow.v.TTID) == 'undefined') { { AF.Flow.v.TTID = AF.Flow.v.UK_TID; AF.Flow.v.TID = AF.Flow.v.UK_TID; } }
            if (oSurvey.reg == "ca" && typeof (AF.Flow.v.TTID) == 'undefined') { { AF.Flow.v.TTID = AF.Flow.v.CA_TID; AF.Flow.v.TID = AF.Flow.v.CA_TID; } }
            if (oSurvey.trck) FL.ClickGen(this.step++, "FormValidate", "SubmitSurvey");
            oSurvey.submit();
        }
    }

    this.showTCPA = function () {
        var oSurvey = this;
        var dtnames = this.dynNames();
        if (dtnames === undefined || dtnames === null) {
            var tnames = $.grep(oSurvey.tcpaList, function (n, i) {
                return n.Pname == "allC";
            });
            dtnames = tnames[0].Pvalue;
        }
        var tcpaExist = false;
        if ($('#tcpaterms').get(0) != undefined && ((oSurvey.tcpaList.length > 2 && oSurvey.tcpaLinkOut) || (oSurvey.tcpaList.length > 3 && !oSurvey.tcpaLinkOut))) {
            $("#TCPAStep").find("label").each(function () {
                var apndVal = $('[name="' + this.id.replace('l', '') + '"]').val();
                if ($.inArray(this.id, ["lphone", "ltelephone"]) > -1) apndVal = apndVal.substr(0, 3).concat('-', apndVal.substr(3, 3), '-', apndVal.substr(6, 4));
                $(this).html(apndVal);
            });

            $.each(oSurvey.tcpaList, function (index, value) {
                var pValues = this.Pvalue.split('||');
                var formVal = (FL.getInputVal(this.Pname) == "" ? UC(AF.Lead.v[this.Pname]) : FL.getInputVal(this.Pname)).toLocaleLowerCase();
                $.each(pValues, function () {
                    if (formVal != "" && formVal == this.toLowerCase()) {
                        tcpaExist = true;
                        return false;
                    }
                });

                if (tcpaExist)
                    return false;
            });

        }
        //tcpaExist = true; //temp set for testing
        if (tcpaExist) {
            oSurvey.setTcpa();
            //$("#tnames").html(dtnames);
            $("#tnames").html('<input type="hidden" id="leadid_tcpa_disclosure_c" /><label for="leadid_tcpa_disclosure_c">' + dtnames + '</label>');
            if (oSurvey.ApplyDynamicTCPAonPage == true) { $("#all_tcpa_place_holder").html(dtnames); }
            AF.System.v.TCPAOffers = oSurvey.CompList;
        }
        return tcpaExist;
    }
    this.submit = function () {
        if (this.trck) FL.ClickGen(this.step++, "SubmitSurvey", "Exit");
        $('[id ^=off][id $=iframe]').each(function () {
            var tfid = $(this).prop('id').match(/off(\d+)/)[1];
            $("#tf_ex").append('<input type="text" name="vtf' + tfid + '" value="' + $(this).contents().find('[name="tf' + tfid + '"]').val() + '" />');
        });

        if (this.TFEnabled) FL.saveInputVal("vtfurl", $("input[name=xxTrustedFormCertUrl_TCPA]").val(), "#RgForm", "hidden");
        if (this.JRNYEnabled) FL.saveInputVal("vjtoken", $("input[name=universal_leadid]").val(), "#RgForm", "hidden");

        var newSv = [];
        var survey_param_new = $('#RgForm').find('[name^="v"]').not('input[name=vid],select[value=""],input[type=hidden]').serialize();
        survey_param_new.split('&').forEach(function (v) {
            if (v.split('=')[0].length === 3 || v.split('=')[0].length === 4)
                newSv.push(v.split('=')[0]);
        });
        if (this.Version == 2) {
            oSurvey.allSurvey.split('&').forEach(function (v) {
                if (v.split('=')[0].length === 3 || v.split('=')[0].length === 4)
                    newSv.push(v.split('=')[0]);
            });
        }

        FL.saveInputVal('surveynew', newSv.join(','), '#RgForm', 'hidden');
        var survey_param = $('#RgForm').find('[name^="v"]').not('input[name=vid],select[value=""]').serialize();
        survey_param += '&age=' + $('#RgForm').find('[name="age"]').val();
        survey_param += '&ttid=' + FL.getInputVal("ttid");
        survey_param += FL.getRptSurvey(survey_param);
        FL.saveInputVal('surveyparam', survey_param, '#RgForm', 'hidden');
        if (this.beforeSubmit) { this.beforeSubmit(); } else { $("#surveyContainer, #TCPAStep, #FormStep").fadeOut(); }
        AF.Campaign.SurveySubmit(SumbitRegform, null);
    }
    this.setTcpa = function (partners) {
        var hd = $.grep(this.tcpaList, function (n, i) {
            return n.Pname == "TcpaH";
        })[0].Pvalue;
        var ft = $.grep(this.tcpaList, function (n, i) {
            return n.Pname == "TcpaF";
        })[0].Pvalue;
        var mrktPartners = $('<a id="tcpaLink">Marketing Partners</a>');
        var mrktPartnersHere = $('<a id="tcpaLink2">here</a>');
        if (partners != undefined) {
            mrktPartners.attr({
                target: "_blank",
                href: partners
            });
            mrktPartnersHere.attr({
                target: "_blank",
                href: partners
            });
        } else {
            mrktPartners.attr({
                href: "javascript:void(0);",
                onclick: "javascript: $('#tcpadark').show(); $('#tcpalight').fadeIn(250);"
            });
            mrktPartnersHere.attr({
                href: "javascript:void(0);",
                onclick: "javascript: $('#tcpadark').show(); $('#tcpalight').fadeIn(250);"
            });
        }
        var tcpaCont = "".concat(
            hd, "and our ",
            mrktPartners.outerHTML(),
            ft);
        //$("#tcpaterms").html(tcpaCont);
        $("#tcpaterms").html('<input type="hidden" id="leadid_tcpa_disclosure_a" /><label for="leadid_tcpa_disclosure_a">' + tcpaCont + ' </label>');
        if (this.GetAllTCPA) {
            $("#tcpaLink").after(' (see list below or by clicking ' + mrktPartnersHere.outerHTML()+') ');
        }
    }
    this.dynNames = function () {
        //if (this.reg != "uk") { AF.Flow.v.TTID = AF.Flow.v.TID; return null; }
        var survey_param = $('#RgForm').find('[name^="v"]').not('input[name=vid],select[value=""]').serialize();
        survey_param += '&age=' + $('#RgForm').find('[name="age"]').val();
        survey_param += FL.getRptSurvey(survey_param);
        if (this.Version == 2) { survey_param = FL.UpdateSurveyQuery(survey_param, oSurvey.allSurvey); }

        var newSv = [];
        var survey_param_new = $('#RgForm').find('[name^="v"]').not('input[name=vid],select[value=""],input[type=hidden]').serialize();
        survey_param_new.split('&').forEach(function (v) {
            if (v.split('=')[0].length === 3 || v.split('=')[0].length === 4)
                newSv.push(v.split('=')[0]);
        });
        if (this.Version == 2) {
            oSurvey.allSurvey.split('&').forEach(function (v) {
                if (v.split('=')[0].length === 3 || v.split('=')[0].length === 4)
                    newSv.push(v.split('=')[0]);
            });
        }

        var p = {};
        //-- if (AF.Lead.v.State == "PA") { return null; }
        $.ajax({
            type: "POST",
            url: "Services/TCPACheck.ashx?FlowID=" + AF.Flow.v.FlowID +
                "&DataFormBankID=" + AF.Flow.v.DataFormBankID +
                "&DataFormID=" + AF.Flow.v.RegFormID +
                "&UID=" + AF.Lead.v.UID +
                "&EntranceVID=" + AF.Lead.v.EntranceVID +
                "&Vid=" + AF.Lead.v.VID +
                "&AffiliateID=" + AF.Flow.v.AffiliateID +
                "&SubAff=" + AF.Flow.v.SubAff +
                "&AffSecID=" + AF.Flow.v.AffSecID +
                "&isMobile=" + AF.System.GetIsMobile() +
                "&Browser=" + AF.System.GetBrowser() +
                "&Device=" + AF.System.GetDevice() +
                "&reward=" + AF.Campaign.URLparam(unescape(AF.System.v.pubParams).toLowerCase(), "reward") +
                "&product=" + AF.Campaign.URLparam(unescape(AF.System.v.pubParams).toLowerCase(), "product"),
            data: AF.Campaign.StandardInfo("", true, true) + "&" + survey_param + "&surveynew=" + newSv.join(','),
            async: false,
            complete: function (resp) {
                try {
                    p = JSON.parse(resp.responseText);
                } catch (e) {
                    console.log(e);
                }
                if (this.reg == "uk") { p.TTID = AF.Flow.v.UK_TID; } // override the TID if it's uk
                else if (this.reg == "ca") { p.TTID = AF.Flow.v.CA_TID; } // override the TID if it's ca
                FL.saveInputVal('ttid', p.TTID, '#RgForm', 'hidden');
                AF.Flow.v.TTID = p.TTID;
                if (p.TID) {
                    if (this.reg == "ca") AF.Flow.v.TID = AF.Flow.v.CA_TID;
                    else if (this.reg == "uk") AF.Flow.v.TID = AF.Flow.v.UK_TID;
                    else AF.Flow.v.TID = p.TID
                };
            }
        });

        return p.Name;
    }
}


function Stack() {
    this.settings = typeof stackSettings === "object" ? stackSettings : {};
    this.TS = this.settings.templateSelector || "#topCPA";
    this.DefaultTokens = { _cta: "CLAIM DEAL" };
    this.OC = $(this.TS).children().get(0).classList[0];
    this.Regex = /\{\{(.*?)\}\}/g;
    this.Template = $(this.TS).html();
    this.Tokens = this.Template.match(this.Regex) || [];
    this.List = [];
    this.vwArr = [];
    this.vCC;
    this.rnd = this.settings.rnd || false;
    this.uls = this.settings.uselocalstorage || false;
    this.page = this.settings.pg || "Silver";
    this.storage = new Store('stack');
    this.render = function () {
        if (typeof (this.beforeRender) === "function") {
            this.beforeRender();
        }
        var oCnt = 0,
            takeFiltered = 0,
            tHtml = "";
        var filteredCount = this.List.filter(function (el) {
            return el.Filtered == true
        }).length;
        if (this.List.length > 0) {
            var min = AF.Campaign.v.MinCPAO || 0,
                max = AF.Campaign.v.MaxCPAO || 20;
            //if (this.List.length >= min && this.List.length - filteredCount < min) {
            // takeFiltered = min - (this.List.length - filteredCount);
            //}
            for (var i = 0; i < this.List.length; i++) {
                if (typeof this.List[i].pp !== "object" || this.List[i].pp === null) {
                    this.List[i].pp = $.parseJSON(this.List[i].pp) || {};
                }
                if (typeof this.List[i].cp !== "object" || this.List[i].cp === null) {
                    this.List[i].cp = $.parseJSON(this.List[i].cp) || {};
                }
                if (typeof this.List[i].flts !== "object" || this.List[i].flts === null) {
                    this.List[i].flts = $.parseJSON(this.List[i].flts) || [];
                }
                var shownOnOtherPages = false;
                for (var key in this.List[i].Shown) {
                    if (key !== this.page || !(key === this.page && this.List[i].Shown[key] === _jCid + _jCidx)) {
                        shownOnOtherPages = true;
                    }
                }
                if (this.filtersPassed(this.List[i].flts) && !this.List[i].Filtered && !shownOnOtherPages) {
                    if (oCnt >= max) {
                        break;
                    }
                    oCnt++;
                    this.List[i].Shown = {};
                    this.List[i].Shown[this.page] = _jCid + _jCidx;
                    if (this.uls) this.storage.save({ Shown: this.List[i].Shown }, this.List[i].id);
                    this.vwArr.push(''.concat(this.List[i].sCid, ",", _jCidx, ",", oCnt, ",", this.List[i].LMPOS, ",", this.List[i].CPAStyleID, ",", this.List[i].StackID, ",", this.List[i].id));
                    this.List[i].pos = oCnt;
                    if (this.List[i].Filtered) {
                        --takeFiltered;
                    }
                    this.List[i].ratingClass = this.getRatingClass(this.List[i].Rating);
                    if (!this.List[i].pp._reviews) {
                        this.List[i].pp._reviews = (Math.floor(Math.random() * 800) + 300);
                    }
                    tHtml += this.Template;
                    var that = this;
                    this.Tokens.forEach(function (v) {
                        var rplKey = v.replace("{{", "").replace("}}", ""),
                            rplVal = that.List[i].cp["_" + rplKey] || that.List[i][rplKey] || that.List[i].cp["_" + rplKey] || that.List[i].pp["_" + rplKey] || that.DefaultTokens["_" + rplKey] || "",
                            regexv = new RegExp(v, 'g');
                        if (rplKey === "img") {
                            tHtml = tHtml.replace(v, '<img src="' + that.List[i].img + '">')
                        } else tHtml = tHtml.replace(regexv, rplVal);
                    });
                }
                if ((this.List.length - 1) === i && this.uls && min > oCnt) {
                    this.List.forEach(function (v) {
                        for (var key in v.Shown) {
                            v.Shown = {};
                        }
                    });
                    i = -1;
                }
            }
        }
        $(this.TS).html(tHtml);
        AF.Campaign.CrossCampaignView(this.vwArr, AF.Campaign.v.CrossSubmitOption.ViewOnly, this.saveResp, 'vCC', 1);
        if (typeof (this.afterRender) == "function") {
            this.afterRender();
        }
        this.bind();
        $(this.TS).fadeIn();
    }

    this.filtersPassed = function (filters) {
        if (filters == null || typeof filters != "object" || (filters.length || 0) == 0)
            return true;
        const schema = ["Name", "Operator", "Values"];
        for (let i = 0; i < filters.length; i++) {
            const f = filters[i];
            let schemaIsCorrect = true;
            for (let j = 0; j < schema.length; j++) {
                if (f[schema[j]] == undefined) {
                    schemaIsCorrect = false;
                    break;
                }
            }
            if (!schemaIsCorrect) continue;
            let fieldVal = FL.getInputVal(f.Name);
            let checkValues = f.Values.split(',');
            switch (f.Operator) {
                case "equals":
                case "notequals": {
                    let passed = checkValues.indexOf(fieldVal) > -1;
                    if (f.Operator == 'equals' && !passed || f.Operator == 'notequals' && passed)
                        return false;
                    break;
                }
                case "contains":
                case "notcontains": {
                    let passed = false;
                    for (let j = 0; j < checkValues.length; j++) {
                        if (fieldVal.indexOf(checkValues[j]) > -1) {
                            passed = true;
                            break;
                        }
                    }
                    if (f.Operator == 'contains' && !passed || f.Operator == 'notcontains' && passed)
                        return false;
                    break;
                }
            }
        }
        return true;
    }
    this.load = function () {
        var that = this;
        var sEPT = stackSettings.bysf ? "stackbysf" : "lostcpawithfilterparamsnew";
        if (this.page === "Silver" || this.page==="page1" || (this.page !== "Silver" && this.page!=="page1" && !this.uls) || (this.uls && !localStorage.stack)) {
            var prepop = "".concat(
                "&gender=", UC(AF.Lead.v.Gender),
                "&age=", UC(AF.Lead.v.Age),
                "&state=", UC(AF.Lead.v.State),
                "&zippost=", UC(AF.Lead.v.ZipPost),
                "&email=", UC(AF.Lead.v.Email),
                "&firstname=", UC(AF.Lead.v.FirstName),
                "&lastname=", UC(AF.Lead.v.LastName),
                "&phone=", UC(AF.Lead.v.Telephone),
                "&address1=", UC(AF.Lead.v.Address1).replace(/#/g, "%23"),
                "&ismobile=", UC(AF.System.v.IsMobile),
                "&browser=", UC(AF.System.v.Browser),
                "&vuagent=", escape(navigator.userAgent),
                "&device=", UC(AF.System.v.Device),
                "&reward=", AF.Campaign.URLparam(unescape(AF.System.v.pubParams).toLowerCase(), "reward"),
                "&subaff=", UC(AF.Flow.v.SubAff),
                "&subaff2=", UC(AF.Flow.v.SubAff.split('_')[1]),
                "&affiliateid=", UC(AF.Flow.v.AffiliateID),
                "&subflowid=", UC(AF.SubFlow.v.SubFlowID),
                "&profileid=", UC(AF.SubFlow.v.ProfileID),
                "&flowid=", UC(AF.Flow.v.FlowID),
                "&BVA=", UC(AF.Lead.v.BVA),
                "&BVE=", UC(AF.Lead.v.BVE),
                "&BVC=", UC(AF.Lead.v.BVC),
                "&ip=", UC(AF.Lead.v.ClientIP),
                "&screenwidth=", screen.width,
                "&screenheight=", screen.height,
                //"&appliedwallml=", UC(AF.Flow.v.AppliedWallML),
                "&vid=", UC(AF.Lead.v.VID),
                "&evid=", UC(AF.Lead.v.EntranceVID),
                "&page=", UC(this.page));

            try {
                if (typeof (AF.System.v.pubParams) != "undefined") {
                    var arrExcludedFields = ["pubsrc", "fd7vjtoken", "aff_pixel", "termspid", "pubsrc1", "pubsrc2", "reward"];
                    var params = unescape(AF.System.v.pubParams).split("&");
                    var sUpdatedParams = "";
                    for (var i = 0; i < params.length; i++) {
                        if (params[i].split("=").length > 1 && arrExcludedFields.indexOf(params[i].split("=")[0].toLowerCase()) == -1) {
                            sUpdatedParams += "&" + params[i].split("=")[0] + "=" + encodeURI(params[i].split("=")[1]);
                        }
                    }
                    prepop += sUpdatedParams;
                }
            } catch(ex) { console.log("PPErr"); }
            
            $.ajax({
                type: 'POST',
                url: "/Services/" + sEPT + ".ashx?c=" + _jCid + "&cidx=" + _jCidx + (that.rnd ? "&rnd=1" : "") + prepop,
                data: "".concat(FL.getSurvey(), FL.getRptSurvey(FL.getSurvey())),
                dataType: 'json',
                success: function (data) {
                    if (localStorage && that.uls) { localStorage.stack = JSON.stringify(data); }
                    that.List = data;
                    that.tcheck();
                    that.render();
                }
            });
        } else {
            this.List = JSON.parse(localStorage.stack);
            this.tcheck();
            this.render();
        }
    }
    this.init = function () {
        if (typeof (this.beforeInit) === "function") {
            this.beforeInit();
        }
        FL.saveInputVal('fdr', UC(AF.Lead.v.isUserLookUp), '#RPc' + _jCid + 'dv', 'hidden');
        FL.saveInputVal('fdb', UC(AF.System.v.Device), '#RPc' + _jCid + 'dv', 'hidden');
        FL.saveInputVal('fd6', UC(AF.Campaign.PubSrcParam('reward')), '#RPc' + _jCid + 'dv', 'hidden');
        FL.saveInputVal('fd7', UC(AF.Campaign.PubSrcParam('pubsrc1')), '#RPc' + _jCid + 'dv', 'hidden');
        FL.saveInputVal('fd8', UC(AF.Campaign.PubSrcParam('pubsrc2')), '#RPc' + _jCid + 'dv', 'hidden');
        FL.saveInputVal('fd9', UC(location.host), '#RPc' + _jCid + 'dv', 'hidden');
        this.load();
        if (typeof moment === "undefined") {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '../CampImg/3442/js/moment.min.js';
            $("head").append(script);
        }
    }
    /*this.afterClick = function () {
        if (typeof window.pageSettings !== "undefined" && typeof window.pageSettings.minmax !=="undefined" &&  typeof window.pageSettings.minmax.max !== "undefined") {
            if (window.pageSettings.minmax.max === 1) {
                jPgNext(1);
            }
        }
    }*/
    this.bind = function () {
        var that = this;
        $("." + this.OC).live("click", function () {
            that.go($(this).data("id"));
        });
    }
    this.go = function (id, trckp) {
        var that = this;
        var s = this.List.find(function (e, i) {
            if (e.id == id) {
                that.List[i]["Clicked"] = true;
            }
            return e.id === id;
        });
        if (this.uls) this.storage.save({ Clicked: true }, s.id);
        var pp = s.pp,
            status = pp._status || (pp.p == "c" ? 13 : 1),
            width = pp._width || 950,
            height = pp._height || 500,
            trgt = pp._trgt || "_blank",
            extraparam = "",
            mType = this.page,
            subaff = AF.Flow.v.SubAff,
            s2 = UC(UC(AF.Flow.v.SubAff).split('_')[1]),
            flowid = AF.Flow.v.FlowID;//(AF.Flow.v.AffSecID == '' || UC(AF.Flow.v.AffSecID).length > 5 ? AF.Flow.v.FlowID : AF.Flow.v.AffSecID),
            cakeparams = "&s1=" + flowid + "_" + s2 + (pp.s2 ? "" : "&s2=" + subaff) + "&s3=" + _jCid + "_" + _jCidx + "_" + this.page + "&s5=" + jGetVid() + "_" + s.sCid + "&s4=" + AF.Lead.v.EntranceVID + "&source=" + s.CPAStyleID + "_" + UC(AF.SubFlow.v.SubFlowTemplateID),
            tuneparams = "&aff_sub=" + flowid + "_" + s2 + (pp.s2 ? "" : "&aff_sub2=" + subaff) + "&aff_sub3=" + _jCid + "_" + _jCidx + "_" + this.page + "&aff_sub5=" + jGetVid() + "_" + s.sCid + "&aff_sub4=" + AF.Lead.v.EntranceVID + "&source=" + s.CPAStyleID + "_" + UC(AF.SubFlow.v.SubFlowTemplateID),
            cakeurl = s.URL + (s.URL.substr(0, 4) === "tel:" ? "" : (pp._platform == 'cake' ? cakeparams : tuneparams)),
            imgpxlurl = pp._imgpxlurl || "";

        for (var key in pp) {
            try {
                if (key.substr(0, 1) != "_" || (s.id == 1081 && key != "_link")) {
                    var val = "";
                    if (pp[key].toLowerCase().indexOf("jlead") > -1) {
                        val = UC(jLead[UC(pp[key].split('.')[1])]);
                    } else if (pp[key].toLowerCase().indexOf("jlead") < 0 && pp[key].toLowerCase().indexOf("dob") > -1) {
                        //DOB handler dob^dateFormat
                        var dob = moment(jLead.dobmonth + "/" + jLead.dobday + "/" + jLead.dobyear, "M/D/YYYY");
                        val = (dob.isValid() && pp[key].split('^')[1] != undefined ? dob.format(pp[key].split('^')[1]) : "");
                    } else if (pp[key].toLowerCase().indexOf("gender") > -1) {
                        //Gender handler gender^maleValue|femaleValue
                        val = (pp[key].split('^')[1] != undefined ? (jLead.gender == "True" ? UC(pp[key].split('^')[1].split('|')[0]) : (jLead.gender == "False" ? UC(pp[key].split('^')[1].split('|')[1]) : "")) : "");
                    } else if (pp[key].toLowerCase().indexOf("phonecode") > -1) {
                        val = UC(jLead.phone).substr(0, 3);
                    } else if (pp[key].toLowerCase().indexOf("phoneprefix") > -1) {
                        val = UC(jLead.phone).substr(3, 3);
                    } else if (pp[key].toLowerCase().indexOf("phonesuffix") > -1) {
                        val = UC(jLead.phone).substr(6, 4);
                    } else if (pp[key].toLowerCase().indexOf("phone^") > -1) {
                        var sep = UC(pp[key].split('^')[1]);
                        val = UC(jLead.phone).substr(0, 3) + sep + UC(jLead.phone).substr(3, 3) + sep + UC(jLead.phone).substr(6, 4);
                    } else if (key.toLowerCase() == "surveyparams") {
                        extraparam += "&" + FL.getSurvey();
                        continue;
                    } else if (pp[key].substr(0, 1) == "=") {
                        var cp = UC(pp[key].split('=')[1]);
                        val = eval("if(" + cp.replace("()", "") + ") eval(cp); else '';");
                        //eval($.undCheck(pp[key].split('=')[1]));
                    } else
                        val = pp[key];
                    extraparam += "&" + key + "=" + val;
                }
            } catch (ex) {  }
        }

        cakeurl = cakeurl + (cakeurl.substr(0, 4) === "tel:" ? "" : extraparam)
        try {
            if (imgpxlurl != "") {
                imgpxlurl += (imgpxlurl.indexOf("?") == -1) ? "?" : "";
                imgpxlurl += extraparam;
                var imgPixelTag = document.createElement("IMG");
                imgPixelTag.src = imgpxlurl;
                imgPixelTag.style.display = "none";
                $("body").append(imgPixelTag);
            }
        } catch (ex) { console.log("IPxl"); }
        FL.saveInputVal("fda", this.page, "#RPc" + _jCid + "dv", "hidden");
        if (typeof (this.beforeClick) == "function") {
            this.beforeClick(id);
        }
        if (s.sCid != 0) {
            var temp = {};
            if (typeof trckp === "object") {
                for (var key in trckp) {
                    temp[key] = FL.getInputVal(key);
                    FL.saveInputVal(key, trckp[key], "#FlowSQForm", "hidden");
                }
            }
            AF.Campaign.CrossCampaignView([s.sCid + "," + _jCidx + "," + s.pos], AF.Campaign.v.CrossSubmitOption.SubmitOnlyWithcVID, null, null, status, vCC[s.sCid]);
            if (typeof trckp === "object") {
                for (var key in trckp) {
                    FL.saveInputVal(key, temp[key], "#FlowSQForm", "hidden");
                }
            }
        }

        if (s.URL != '') {
            if ($("#RPc" + _jCid + "dv").find('input[name=mpop]').val() == 'true') window.open(cakeurl, trgt, 'scrollbars=yes,width=' + width + ',height=' + height);
            else window.open(cakeurl, trgt);
        }
        if (typeof (this.afterClick) == "function") {
            this.afterClick(id);
        }
    }
    this.saveResp = function (varName, resp) {
        window[varName] = resp;
    }
    this.getRatingClass = function (rating) {
        var ratingClass = '';
        if (!rating) {
            rating = (Math.floor(Math.random() * 3) + 8) / 2;
        }
        switch (rating) {
            case 5:
                ratingClass = 'five_stars';
                break;
            case 4.5:
                ratingClass = 'four_half_stars';
                break;
            case 4:
                ratingClass = 'four_stars';
                break;
            default:
                ratingClass = 'five_stars';
                break;
        }
        return ratingClass;
    }
    this.tcheck = function () {
        var tl = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'],
            tier = (this.List[0].Tier || 2),
            treq = tier == 1 ? [1, 1, 2] : [1, 1, 8];
        $('.silverNum').html(treq[0]);
        $('.goldNum').html(treq[1]);
        $('.platinumNum').html(treq[2]);
        $('.platinumNumL').html(tl[treq[2]]);
        if (typeof pageSettings != "undefined" && typeof pageSettings.tmap === "object") {
            $('.dealsToComplete').html(pageSettings.tmap[tier][pageSettings.pagenum] || 8);
        }
    }
}

(function (window) {
    'use strict';

    function Store(name) {
        this._dbName = name;
    }

    Store.prototype.save = function (updateData, id) {
        var data = JSON.parse(localStorage[this._dbName]);

        for (var i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                for (var key in updateData) {
                    data[i][key] = updateData[key];
                }
                break;
            }
        }
        localStorage[this._dbName] = JSON.stringify(data);
    };
    window.Store = Store;
})(window);

if (!Array.prototype.filter) {
    Array.prototype.filter = function (fun /*, thisp*/) {
        var len = this.length >>> 0;
        if (typeof fun != "function")
            throw new TypeError();
        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this) {
                var val = this[i];
                // in case fun mutates this
                if (fun.call(thisp, val, i, this))
                    res.push(val);
            }
        }
        return res;
    };
}
if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this == null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}