var isAutoTabOn = true;
var jEnterKeyFunc;
var onBeforeSkip = false;
var onSystemInit = true;
var isPassToParent = false;
var AFLeadFieldMap = { "surveyparam": "SurveyParam", "email": "Email", "firstname": "FirstName", "lastname": "LastName", "gender": "Gender", "dobmonth": "DobMonth", "dobday": "DobDay", "dobyear": "DobYear", "workphone": "WorkPhone", "phonecode": "PhoneCode", "phoneprefix": "PhonePrefix", "phonesuffix": "PhoneSuffix", "telephone": "Telephone", "address1": "Address1", "address2": "Address2", "city": "City", "state": "State", "zippost": "ZipPost", "carrier": "Carrier", "bve": "BVE" };
var BrowserURL = document.referrer.toLowerCase();
if (BrowserURL.indexOf("warmheartfullstomach.org") > -1 || BrowserURL.indexOf("your-next-flight.com") > -1 || BrowserURL.indexOf("com-si.net") > -1 ||
    BrowserURL.indexOf("quickiqtest.net") > -1 || BrowserURL.indexOf("topconsumergifts.com") > -1 || BrowserURL.indexOf("quizstarttraffic.com") > -1 ||
    BrowserURL.indexOf("surveystartweb.com") > -1) {
    location.href = "./?Flow=898b77ac-127d-4893-b217-e5d81b653267&isPrePop=true";
}

$(document).keypress(function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        try {
            var kstr = $("#creativeSettings").data('keystroke');
            if (kstr != undefined && typeof window[kstr.substring(0, kstr.indexOf('('))] == "function") {
                window[kstr.substring(0, kstr.indexOf('('))](kstr.substring(kstr.indexOf('(') + 1, kstr.indexOf(')')));
            }
            else if (jEnterKeyFunc != undefined && typeof (jEnterKeyFunc) == "function") {
                jEnterKeyFunc();
            }
        } catch (ex) { }
        return false;
    }
});

$(document).ready(function () {
    try {
        if ($.browser.msie && AF.SubFlow.v.ExitMessage != undefined && AF.SubFlow.v.ExitMessage != "") {
            // Prevent Alert Exit for IE
            $("a[href*='javascript']").click(function (e) { e.preventDefault(); });
        }
    } catch (ex) { }
    AF.System.VariableConversion();
    AF.Campaign.PhoneFix();
    AF.System.AffiliateFix();
    if (window.initBeforeFlowJS) { initBeforeFlowJS(); }
    AF.System.UpdateBrowserInfo();
    AF.System.Formalize(true, ((AF.System.v.PrePop != undefined && AF.System.v.PrePop && (typeof (AF.Campaign) != "undefined" == true || (typeof (AF.Campaign) != "undefined" && AF.Campaign.v.CPrePop))) || _jORPrePop));
    AF.System.RemoveSurveyPrepop();
    onSystemInit = false;
    AF.Campaign.DynamicHeader();
    AF.Campaign.FlowDynImgTxt();
    AF.System.AutoTab();
    AF.System.AutoDisable();
    AF.Flow.FireLandEvent();
    AF.System.ApplyHolderHolder();
    try { if (document.getElementById('focusElement') && !($.browser.msie)) { document.getElementById('focusElement').focus(); } } catch (ex) { }
    AF.System.AutoHideAddressBarForMobile();
    //if (AF.SubFlow.v.ExitOption != undefined && AF.SubFlow.v.ExitOption != "" && AF.SubFlow.v.ExitSubFlowID != undefined && AF.SubFlow.v.ExitSubFlowID != "" && !isNaN(AF.SubFlow.v.ExitSubFlowID)) AF.SubFlow.FlowUnload();
    if (AF.SubFlow.v.ExitMessage != undefined && AF.SubFlow.v.ExitMessage != "") AF.SubFlow.FlowUnload();
    if (window.initAfterFlowJS) { initAfterFlowJS(); }
    if (AF.System.SurveyAnswerPath != undefined && AF.System.SurveyAnswerPath != "" && typeof (AF.Flow.v.DataFormBankID) != "undefined" && AF.Flow.v.DataFormBankID == "38801") AF.System.LastQuestionTrack(AF.System.SurveyAnswerPath);
    AF.System.AutoWindowSize();
    AF.System.CreateLclStg();
    //AF.System.CreateUserLookup();
    //AF.Campaign.LogUser();
})

AF.System.GetIsMobile = function () { return (AF.System.v != undefined && AF.System.v.IsMobile != "") ? AF.System.v.IsMobile : "0"; }
AF.System.GetBrowser = function () { return (AF.System.v != undefined && AF.System.v.Browser != "") ? AF.System.v.Browser : "NA"; }
AF.System.GetDevice = function () { return (AF.System.v != undefined && AF.System.v.Device != "") ? AF.System.v.Device : "NA"; }
AF.System.GetSurveyParam = function () {
    var SurveyParam = $("input[name='surveyparam']").val();
    SurveyParam = (SurveyParam != "" && SurveyParam != undefined) ? "&" + SurveyParam : "";
    return SurveyParam;
}
AF.System.GetSurveyParamNew = function () {
    var SurveyParamNew = $("input[name='surveynew']").val();
    SurveyParamNew = (SurveyParamNew != "" && SurveyParamNew != undefined) ? "&surveynew=" + SurveyParamNew : "";
    return SurveyParamNew;
}

AF.System.VariableConversion = function () {
    jLead.VID = GetFlowVariable(AF.Lead.v.VID);
    jLead.zippost = GetFlowVariable(AF.Lead.v.ZipPost);
    jLead.firstname = GetFlowVariable(AF.Lead.v.FirstName);
    jLead.lastname = GetFlowVariable(AF.Lead.v.LastName);
    jLead.phone = GetFlowVariable(AF.Lead.v.Telephone);
    jLead.email = GetFlowVariable(AF.Lead.v.Email);
    jLead.address1 = GetFlowVariable(AF.Lead.v.Address1);
    jLead.address2 = GetFlowVariable(AF.Lead.v.Address2);
    jLead.city = GetFlowVariable(AF.Lead.v.City);
    jLead.state = GetFlowVariable(AF.Lead.v.State);
    jLead.gender = GetFlowVariable(AF.Lead.v.Gender);
    jLead.clientip = GetFlowVariable(AF.Lead.v.ClientIP);
    jLead.dobmonth = GetFlowVariable(AF.Lead.v.DobMonth);
    jLead.dobday = GetFlowVariable(AF.Lead.v.DobDay);
    jLead.dobyear = GetFlowVariable(AF.Lead.v.DobYear);
}
AF.System.GetTuneVar = function (s2) {
    var sFlowID = (AF.Flow.v != undefined) ? AF.Flow.v.FlowID : "";
    var sEntranceVID = (AF.Lead.v != undefined && AF.Lead.v.EntranceVID != undefined) ? AF.Lead.v.EntranceVID : "";
    var sCampaignID = (typeof (AF.Campaign.v.CampaignID) != "undefined") ? AF.Campaign.v.CampaignID : "0";
    var sS2 = (s2 != undefined ? "&aff_sub2=" + UC(AF.Flow.v.SubAff.split("_")[1]) : "");
    return ("").concat("&aff_sub=", sFlowID, sS2, "&aff_sub4=", sEntranceVID, "&aff_sub5=", jGetVid(), "_", sCampaignID);
}

var surveyParamList = ["vac", "vaf", "vag", "vai", "val", "van", "vdr", /*"vpf", */"vap", "vae", /*"vjv",*/ "vaq", "vax", "vas", "v2x", "var", "vza", "vkt", "vyy", "v5k", "v8e", "v3b", "vaz"];
AF.System.RemoveSurveyPrepop = function () {
    try {
        $.each(AF.Lead.v, function (i, val) {
            if (i != undefined && typeof (i) != "undefined") {
                i = i.toLowerCase();
            }
            if ((i.length == 3 || i.length == 4) && i.charAt(0) == "v" && i != "vid" && i != "vbck" && $("input[name='" + i + "']").size() > 0) {
                $("input[name='" + i + "']").attr("checked", false);
            }
        })
    } catch (e) { alert(e); }
}

/*********************System Functions START**************************************/
AF.System.AutoDisable = function () { $(".hitbutton").each(function () { AttachTriggerDisable(this); }) }
AF.System.AutoTab = function () { if (isAutoTabOn) { $("input,textarea,select").not("[tabindex=9999]").autotab_magic(); } }
AF.System.AffiliateFix = function () {
    try {
        if (AF.Lead.v != undefined && AF.Lead.v.AffiliateID != undefined && AF.Flow.v != undefined && AF.Flow.v.AffiliateID != undefined) {
            if (AF.Lead.v.AffiliateID != AF.Flow.v.AffiliateID) {
                AF.Lead.v.AffiliateID = AF.Flow.v.AffiliateID;
            }
        }
    } catch (ex) { }
}

AF.System.AutoHideAddressBarForMobile = function () {
    if (AF.System.v.IsMobile == "1") {
        setTimeout(function () { window.scrollTo(0, 1); }, 2000);
    }
}

AF.System.GetEitherValue = function (val1, val2) {
    if (val1 != undefined && val1 != "") return val1;
    if (val2 != undefined && val2 != "") return val2;
    return "";
}

AF.System.AutoWindowSize = function () {
    var width = -1, height = -1;
    if (AF.Campaign.PubSrcParam("width") != "undefined" && !isNaN(AF.Campaign.PubSrcParam("width"))) width = AF.Campaign.PubSrcParam("width");
    if (AF.Campaign.PubSrcParam("height") != "undefined" && !isNaN(AF.Campaign.PubSrcParam("height"))) height = AF.Campaign.PubSrcParam("height");
    if (width > 0 && height > 0) AF.System.ResizeWindow(width, height);
}

AF.System.ResizeWindow = function (width, height) {
    if (window.outerWidth) {
        window.outerWidth = width;
        window.outerHeight = height;
    }
    if (window.resizeTo) {
        window.resizeTo(width, height);
    }
}

AF.System.UpdateBrowserInfo = function () {
    if (AF.Lead.v != undefined && AF.Lead.v.VID != undefined && AF.Lead.v.VID != "" && AF.Lead.v.VID != "L3H4KO4U37BXVMZwJmXFEg2" && AF.System.v != undefined && AF.System.v.isWinInfoRecorded != undefined && AF.System.v.isWinInfoRecorded == false) {
        if (!AF.Flow.isDisableBrowserLogging()) {
            $.post("Services/BrowserInfo.ashx?FlowID=" + AF.Flow.v.FlowID + "&VID=" + AF.Lead.v.VID + "&" + AF.System.GetUserBrowserInfo(), function () {
                AF.Campaign.AppendValue("iswininforecorded", "true");
            });
        } else {
            AF.Campaign.AppendValue("iswininforecorded", "true");
        }
    }
}

AF.System.Formalize = function (isOverWrittenExistingValue, isPrePop) {
    AF.System.CreateFormElement(AF.Campaign.v.NameSpace, isOverWrittenExistingValue, isPrePop);
    AF.System.CreateFormElement(AF.Flow.v.NameSpace, isOverWrittenExistingValue, isPrePop);
    AF.System.CreateFormElement(AF.SubFlow.v.NameSpace, isOverWrittenExistingValue, isPrePop);
    AF.System.CreateFormElement(AF.System.v.NameSpace, isOverWrittenExistingValue, isPrePop);
    AF.System.CreateFormElement(AF.Lead.v.NameSpace, isOverWrittenExistingValue, isPrePop);
    AF.System.AppendUserBrowserInfo();
    AF.System.FixInputLength();
}

AF.System.FixInputLength = function () {
    $("input[maxlength]").each(function () {
        var iMaxLength = $(this).prop("maxlength");
        var sValue = $(this).val();
        if (iMaxLength != undefined && sValue != undefined && sValue.length > parseInt(iMaxLength)) {
            $(this).val(sValue.substring(0, parseInt(iMaxLength)));
        }
    })
}

AF.System.CreateFormElement = function (NameSpace, isOverWrittenExistingValue, isPrePop) {
    if (eval(NameSpace) != undefined) {
        var ArrSetting = eval(NameSpace + ".FormalizeFields");

        if (ArrSetting != undefined) {
            $.each(ArrSetting, function () {
                var CurrentValue = "";
                try {
                    if (this == "var") {
                        CurrentValue = eval(NameSpace + '.v["' + this + '"]');
                    } else {
                        CurrentValue = eval(NameSpace + ".v." + this);
                    }
                } catch (ex) { }
                if (!onSystemInit || (onSystemInit && this.indexOf("fd") != 0)) {
                    if (typeof (CurrentValue) != "string" || (typeof (CurrentValue) == "string" && (CurrentValue.toLowerCase().indexOf("http") != -1 || (CurrentValue.toLowerCase().indexOf("@mobiletest.com") == -1 && CurrentValue.toLowerCase().indexOf("@noemail") == -1 && CurrentValue.toLowerCase().indexOf("@test.com") == -1)))) {
                        AF.Campaign.AppendValue(this, CurrentValue, isOverWrittenExistingValue, isPrePop);
                    }
                }
            });
        }
    }
}

AF.System.ApplyHolderHolder = function () {
    try {
        if ($.browser.msie) {
            $("input[type='text'][placeholder!=''][value='']").each(function () {
                $(this).val($(this).attr("placeholder"));
            }).focus(function () {
                if ($(this).val() == $(this).attr("placeholder")) {
                    $(this).val("");
                }
            }).focusout(function () {
                if ($(this).val() == "") {
                    $(this).val($(this).attr("placeholder"));
                }
            });
        }
    } catch (ex) { }
}

AF.System.GetUserBrowserInfo = function () {
    return "windowx=" + screen.width + "&windowy=" + screen.height + "&resolutionx=" + $(window).width() + "&resolutiony=" + $(window).height();
}

AF.System.AppendUserBrowserInfo = function () {
    AF.Campaign.AppendValue("windowx", screen.width);
    AF.Campaign.AppendValue("windowy", screen.height);
    AF.Campaign.AppendValue("resolutionx", $(window).width());
    AF.Campaign.AppendValue("resolutiony", $(window).height());
}

AF.System.CleanField = function (elem) {
    elem.value = $.trim(elem.value);
    try { return (elem.type == "radio" ? GetFlowVariable($('input[name=' + elem.name + ']:checked').val()) : elem.value); } catch (ex) { }
    return elem.value;
}

var StandardInfoReplaceParam = "#currentparam#";
var StandardInfoReplaceParamFF = "#currentparamff#";
AF.System.GetReturnURL = function (s) {
    if (s != undefined && s == 1 && AF.Flow.v.ReturnURL != undefined && AF.Flow.v.ReturnURL != "") {
        var sURL = AF.Flow.v.ReturnURL;
        if (sURL.indexOf(StandardInfoReplaceParam) != -1 || sURL.indexOf(StandardInfoReplaceParamFF) != -1) {
            AF.System.Formalize(false, true);
            var sPostVar = AF.Campaign.StandardInfo("", true) + AF.Campaign.GetPubSrcParamAsQS(AF.Flow.v.ReturnURL);
            sURL = sURL.replace(StandardInfoReplaceParam, sPostVar).replace(StandardInfoReplaceParamFF, sPostVar);
        }
        if (sURL.indexOf("#") != -1 && sURL.indexOf("#") != sURL.lastIndexOf("#")) {
            sURL = AF.Flow.ReplaceSurveyParams(sURL);
        }
        sURL = AF.System.UpdateDomainRotation(sURL);
        return sURL;
    }

    if (AF.SubFlow.v.ExitURL != undefined && AF.SubFlow.v.ExitURL != "" && (AF.System.v.PageSequence >= AF.System.v.TotalPage || AF.System.v.OAPageSequence >= AF.Flow.v.TotalCampaigns)) {
        if (AF.SubFlow.v.ExitURL.indexOf(StandardInfoReplaceParam) != -1 || AF.SubFlow.v.ExitURL.indexOf(StandardInfoReplaceParamFF) != -1) {
            AF.System.Formalize(false, true);
            var sPostVar = AF.Campaign.StandardInfo("", true) + AF.Campaign.GetPubSrcParamAsQS(AF.SubFlow.v.ExitURL) + AF.Flow.GetSurveyParamAsQS();
            var sURL = AF.SubFlow.v.ExitURL.replace(StandardInfoReplaceParam, sPostVar).replace(StandardInfoReplaceParamFF, sPostVar);
            sURL = AF.System.UpdateDomainRotation(sURL);
            return sURL;
        } else {
            var sURL = AF.SubFlow.v.ExitURL;
            sURL = AF.System.UpdateDomainRotation(sURL);
            return sURL;
        }
    } else if (AF.Flow.v.ReturnURL != undefined && AF.Flow.v.ReturnURL != "" && (AF.System.v.PageSequence >= AF.System.v.TotalPage || AF.System.v.OAPageSequence >= AF.Flow.v.TotalCampaigns)) {
        var sURL = AF.Flow.v.ReturnURL;
        if (sURL.indexOf(StandardInfoReplaceParam) != -1 || sURL.indexOf(StandardInfoReplaceParamFF) != -1) {
            AF.System.Formalize(false, true);
            var sPostVar = AF.Campaign.StandardInfo("", true) + AF.Campaign.GetPubSrcParamAsQS(AF.Flow.v.ReturnURL);
            sURL = sURL.replace(StandardInfoReplaceParam, sPostVar).replace(StandardInfoReplaceParamFF, sPostVar);
        }
        if (sURL.indexOf("#") != -1 && sURL.indexOf("#") != sURL.lastIndexOf("#")) { // For Survey variable
            sURL = AF.Flow.ReplaceSurveyParams(sURL);
        }

        sURL = AF.System.UpdateDomainRotation(sURL);

        return sURL;
    } else {
        return "./ThankYou.aspx?source=P";
    }
}

AF.System.UpdateDomainRotation = function (OrigURL) {
    try {
        if (OrigURL.indexOf("[a-z]") != -1) {
            var OrigURL = OrigURL.replace("[a-z]", String.fromCharCode((Math.floor(Math.random() * 26) + 97)));
            //$.post("Services/ErrorLog.ashx", "i=ReturnURL&Err=" + escape(OrigURL), function (resp) { });
        }
    } catch (ex) { $.post("Services/ErrorLog.ashx", "i=ReturnURLErr&Err=" + escape(OrigURL), function (resp) { }) }
    return OrigURL;
}

AF.System.GetPopupURL = function () {
    if (AF.Flow.v.PopupURL != undefined && AF.Flow.v.PopupURL != "" && (AF.System.v.PageSequence >= AF.System.v.TotalPage || AF.System.v.OAPageSequence >= AF.Flow.v.TotalCampaigns)) {
        if (AF.Flow.v.PopupURL.indexOf(StandardInfoReplaceParam) != -1 || AF.Flow.v.PopupURL.indexOf(StandardInfoReplaceParamFF) != -1) {
            AF.System.Formalize(false, true);
            var sPostVar = AF.Campaign.StandardInfo("", true) + AF.Campaign.GetPubSrcParamAsQS(AF.Flow.v.PopupURL) + AF.Flow.GetSurveyParamAsQS(AF.Flow.v.PopupURL);
            return AF.Flow.v.PopupURL.replace(StandardInfoReplaceParam, sPostVar).replace(StandardInfoReplaceParamFF, sPostVar);
        } else {
            return AF.Flow.v.PopupURL;
        }
    } else {
        return "";
    }
}

AF.System.OpenPopupURL = function () {
    var PopupURL = AF.System.GetPopupURL();
    if (PopupURL != "") {
        window.open(PopupURL);
    }
}

AF.System.PhoneCarrierLookUp = function (p, returnAsJSONFormat) {
    if (p.length != 10) return '';
    var plog = '';
    var ExistingCarrierLog = AF.Campaign.GetValue("phoneCarrierLog");
    if (ExistingCarrierLog == "" || ExistingCarrierLog == undefined || ExistingCarrierLog.toLowerCase().indexOf(p) == -1) {
        plog = AF.Log.PhoneCarrierLookUp(p, returnAsJSONFormat);
        AF.Campaign.AppendValue("phoneCarrierLog", plog);
        return plog;
    }
    return ExistingCarrierLog;
}

AF.System.GetExitStatus = function (SubmitOpt) {
    switch (SubmitOpt) {
        case 0: return 3; //Submit
        case 1: return 2; //Skip
        default: return 4; //Pass
    }
}

AF.System.isSubFlowFinished = function () { return (parseInt(AF.System.v.PageSequence) >= parseInt(AF.System.v.TotalPage) || parseInt(AF.System.v.PageSequence) >= parseInt(AF.Flow.v.TotalCampaigns)) ? 2 : 1; }
AF.System.isFlowFinished = function () { return ((AF.System.isSubFlowFinished() && AF.SubFlow.v != undefined && AF.SubFlow.v.ExitSubFlowID == "" && parseInt(AF.System.v.PageSequence) >= parseInt(AF.System.v.TotalPage)) || parseInt(AF.System.v.PageSequence) >= parseInt(AF.Flow.v.TotalCampaigns)) ? 2 : 1; }
AF.System.Popunder = function (url) { jQuery.popunder(url); }
AF.System.OfferEvtCfgTrigger = function (iEventType) { }
AF.System.FormSubmit = function () { AF.System.Skip(0); }
AF.System.FormSkip = function () { AF.System.Skip(1); }
AF.System.FormPass = function () { AF.System.Skip(4); }
AF.System.GotoURL = function (URL) { AF.SubFlow.SetExitOption(true); window.location.href = URL; }
AF.System.Redirection = function (obj, loc, isOpenNew) {
    if (isOpenNew != undefined && isOpenNew) {
        window.open(loc);
    } else if (obj != undefined) {
        AF.SubFlow.SetExitOption(true);
        obj.location = loc;
    }
}
AF.System.KeyPressHandler = function (e) {
    var evtobj = window.event ? event : e;
    var unicode = evtobj.charCode ? evtobj.charCode : evtobj.keyCode;
    if (!unicode) { return false; }

    if (unicode == 44) {
        //Need to skip all mobile offer
        AF.Campaign.AppendValue("SkipOfferTypeID", "13");

        if (AF.Campaign.v.OfferTypeID == "13") {
            AF.System.Skip(4);
        }
    }
}

AF.System.GettingmGUID = function () {
    if (AF.System.v.pubParams != undefined && AF.System.v.pubParams != "") {
        var mGUID = AF.Campaign.PubSrcParam("mGUID");
        if (mGUID != undefined && mGUID != "") {
            return mGUID;
        }
    }
    return "";
}

AF.System.AppendEmailIfNotExist = function () {
    var sCurEmail = AF.Campaign.GetValue("email");
    if (sCurEmail != undefined) sCurEmail = sCurEmail.toLowerCase();
    if (sCurEmail == "noemail@yahoo.com" || sCurEmail == "something@noemail.com" || sCurEmail == "noemail@noemail.com") {
        AF.Campaign.AppendValue("email", jGetVid() + "@noemail.com");
    }
}

// 0: Submit 1: User Skip 4: System Skip
// Front-end function can use AF.System.Skip(4) to indicate that is a system skip
AF.System.Skip = function (SubmitOpt) {
    if (SubmitOpt == 4 && window.OnBeforeSystemSkip) { OnBeforeSystemSkip(); }
    if (SubmitOpt == 1 && window.OnBeforeUserSkip) { OnBeforeUserSkip(); }
    if (SubmitOpt == 0 && window.OnBeforeUserSubmit) { OnBeforeUserSubmit(); }
    if (window.OnBeforeProgress) { OnBeforeProgress(); }

    var isSubmit = (SubmitOpt == 0);
    AF.Campaign.AppendValue("issubmit", isSubmit);

    AF.System.AppendEmailIfNotExist();
    if (isSubmit) {
        if (AF.Campaign.IsOffer()) {
            if (AF.Campaign.v.OfferTypeID == "13") {
                AF.Campaign.AppendValue("MSubmitTotal", ((AF.System.v.MSubmitTotal != undefined) ? AF.System.v.MSubmitTotal : 0) + 1);
            }
            AF.Campaign.AppendValue("SubmitTotal", ((AF.System.v.SubmitTotal != undefined) ? AF.System.v.SubmitTotal : 0) + 1);
        }
        AF.Campaign.AppendValue("OASubmitTotal", ((AF.System.v.OASubmitTotal != undefined) ? AF.System.v.OASubmitTotal : 0) + 1);
        AF.Flow.FireSubmitEvent(SubmitOpt);
    } else {
        AF.Flow.FireSkipEvent(SubmitOpt);
    }
}

AF.System.SkipFinal = function (SubmitOpt) {
    AF.Campaign.LogUser(AF.System.SkipFinalCore, SubmitOpt);
}


AF.System.SkipFinalCore = function (SubmitOpt) {
    var ExitStatus = AF.System.GetExitStatus(SubmitOpt);

    if (AF.Campaign.IsRegForm()) {
        if (AF.Lead.v.UID != undefined && AF.Lead.v.UID != "") {
            AF.Campaign.AppendValue("RegFormStatus", ExitStatus);
            AF.System.SubmitFire();
        } else {
            alert("Submit function is not enabled in dataform bank mode");
        }
    } else {
        var SubFlowFinished = AF.System.isSubFlowFinished();
        var FlowFinished = AF.System.isFlowFinished();
        //----------------------------
        if (!AF.Flow.isDisableLogging()) {
            if (AF.Lead.v.VID != "L3H4KO4U37BXVMZwJmXFEg2") $.post("./Services/UserExit.ashx?action=f&Step=" + (AF.Campaign.v.CurrentStep) + "&cExitStatus=" + ExitStatus + "&sExitStatus=" + SubFlowFinished + "&fExitStatus=" + FlowFinished + "&VID=" + AF.Lead.v.VID + "&sVID=" + AF.Lead.v.sVID + "&cVID=" + AF.Lead.v.cVID, function () { AF.SubFlow.PgNext(SubmitOpt); });
            else if (AF.Lead.v.sVID != "0") $.post("./Services/UserExit.ashx?action=s&Step=" + (AF.Campaign.v.CurrentStep) + "&cExitStatus=" + ExitStatus + "&sExitStatus=" + SubFlowFinished + "&sVID=" + AF.Lead.v.sVID + "&cVID=" + AF.Lead.v.cVID, function () { AF.SubFlow.PgNext(SubmitOpt); });
            else if (AF.Lead.v.cVID != "0") $.post("./Services/UserExit.ashx?action=c&Step=" + (AF.Campaign.v.CurrentStep) + "&cExitStatus=" + ExitStatus + "&cVID=" + AF.Lead.v.cVID, function () { AF.SubFlow.PgNext(SubmitOpt); });
            else { AF.SubFlow.PgNext(SubmitOpt); }
        } else {
            AF.SubFlow.PgNext(SubmitOpt);
        }
    }
}

AF.System.SubmitFire = function () {
    AF.Campaign.UpdateLatestPhoneData();
    AF.Campaign.HideAllEmptyVisibleFields();
    if (!(AF.System.v.PrePop != undefined && AF.System.v.PrePop)) {
        AF.System.Formalize(false, true);
    }
    var FormID = AF.System.v.OfferFormElemID;
    if ($(AF.System.v.OfferFormElemID).size()) {
        if (window.onBeforeFormSubmit) { onBeforeFormSubmit(); }
        AF.SubFlow.SetExitOption(true);
        $(AF.System.v.OfferFormElemID).submit();
        if (window.onAfterFormSubmit) { onAfterFormSubmit(); }
    }
    else {
        // rerender survey fields if user skips the question by the condition
        try {
            $.each(AF.Lead.FormalizeFields, function () {
                var i = this;
                if (i != undefined && typeof (i) != "undefined") {
                    i = i.toLowerCase();
                    if ((i.length == 3 || i.length == 4) && i.charAt(0) == "v" && i != "vbck" && i != "vid" && $("input[name='" + i + "']:checked").size() == 0 && $("select[name='" + i + "']:selected").size() == 0) {
                        $("input[name='" + i + "']").remove();
                        $("select[name='" + i + "']").remove();
                        var val = eval('AF.Lead.v["' + this + '"]');
                        AF.Campaign.AppendValue(i, val);
                    }
                }
            })
        } catch (ex) { }
        if (window.onBeforeFormSubmit) { onBeforeFormSubmit(); }
        AF.SubFlow.SetExitOption(true); $(AF.System.v.RegFormElemID).submit(); FormID = AF.System.v.RegFormElemID;
        if (window.onAfterFormSubmit) { onAfterFormSubmit(); }
    }

    if ($(FormID).size() > 0 && $(FormID).prop("target") == "_blank") {
        $(FormID).removeAttr("target");
        isExit = false;
    }
}

AF.System.reCaptchaCheck = function (hdler) {
    if (typeof (hdler) != 'undefined') {
        qData = "recaptcha_response_field=" + $("#recaptcha_response_field").val() + "&recaptcha_challenge_field=" + $("#recaptcha_challenge_field").val();
        $.post("Services/reCaptcha.ashx?" + qData, "", function (resp) { hdler(resp); });
    }
}
AF.System.showreCaptcha = function (captchadivid) {
    Recaptcha.create("6Leg6eUSAAAAABEMMykvTRysiYIfcNuNzwOpjbp4", captchadivid, { tabindex: 1, theme: "clean", callback: Recaptcha.focus_response_field });
}

AF.System.CorrectEmail = function (resp) {
    if (resp != undefined && resp != "") {
        if (typeof (resp) == "string" && resp.indexOf("@") != -1) {
            var sCorrectEmail = resp.substring(resp.lastIndexOf("|") + 1);
            AF.Campaign.AppendValue("email", sCorrectEmail);
        }
    }
}

/***********************System Functions END***********************/

/*************************Form Validation Function START***********/
AF.FormValidationV1 = function (fmID) {
    var errMsg = '';
    $(fmID).find("input,select").not(":hidden").each(
        function () {
            var curTitle = $(this).prop("title");
            if (curTitle != undefined) {
                if (curTitle.indexOf("required") > -1 && AF.System.CleanField(this).length == 0) errMsg += "Please enter " + this.name + "\n";
                if (curTitle.indexOf("number") > -1 && isNaN(this.value)) errMsg += "Please enter numeric for " + this.name + "\n";
                if (curTitle.indexOf("email") > -1 && !isValidEmailAddress(this.value)) errMsg += "Please enter a valid email address\n";
                if (curTitle.indexOf("alpha") > -1 && !isAlphabetOnly($(obj).val())) errMsg += "Please enter alphabetic character only for " + this.name + "\n";
            }
        });

    if (errMsg.length > 0) { alert(errMsg); return false; }
    else { AF.System.Skip(0); }
}

$('a.close, #fade').live('click', function () { $('#fade, #popup1').fadeOut(); });
/*************************Form Validation Function End***********/

AF.Log.PhoneCarrierLookUp = function (Phone, returnAsJSONFormat) {
    var sReturnString = $.ajax({ url: "Services/PhoneCarrierLog.ashx?flowid=" + AF.Flow.v.FlowID + "&vid=" + AF.Lead.v.VID + "&phone=" + Phone, async: false }).responseText;
    if (typeof returnAsJSONFormat == "undefined" && returnAsJSONFormat != true) {
        sReturnString = sReturnString.replace(/"/g, " ");
    }
    return sReturnString;
}

/*************************Campaign Function START***********/
AF.Campaign.HideAllEmptyVisibleFields = function () {
    $("select,input[type=text],input[type=checkbox],input[type=radio]").not("[name='vjv'],[name='fdc']").hide();
}

AF.Campaign.SQRT = function (CID, SQ, qData, hdler) {
    qData = "VID=" + AF.Lead.v.VID + "&cIdx=" + _jCidx + "&FlowID=" + AF.Flow.v.FlowID + "&SFlowID=" + AF.SubFlow.v.SubFlowID + "&CID=" + CID + "&AffID=" + AF.Flow.v.AffiliateID + "&" + qData;
    if (_jCidSubmited) {
        _jCidSubmited = false;
        $.post("Services/FlowLogSq.ashx?" + qData, "", function (resp) { _jCidSubmited = true; if (typeof (hdler) != 'undefined') hdler(resp); });
    }
}

AF.Campaign.INTSQRT = function (Ctrl, qData, hdler) {
    data = "Ctrl=" + Ctrl + "&VID=" + AF.Lead.v.VID + "&cIdx=" + _jCidx + "&FlowID=" + AF.Flow.v.FlowID + "&SFlowID=" + AF.SubFlow.v.SubFlowID + "&CID=" + AF.Campaign.v.CampaignID + "&AffID=" + AF.Flow.v.AffiliateID + "&qdata=" + escape(qData);
    if (_jCidSubmited) {
        _jCidSubmited = false;
        $.post("Services/InternalCD.ashx?" + data, "", function (resp) { _jCidSubmited = true; if (typeof (hdler) != 'undefined') hdler(resp); });
    }
}

AF.Campaign.FlowLTURL = function (ltCID, afID, exPara) {
    var iframe_source = window.location.protocol + "//www.fmstrax.com/click.track?CID=" + ltCID + "&AFID=" + afID + "&SID=" + AF.Flow.v.FlowID + "&AffiliateReferenceID=" + jGetVid() + "_" + _jCid + "&retURL=" + AF.Campaign.FrameRetURL(1);
    if (exPara != undefined) iframe_source = iframe_source + "&" + exPara;
    if ($("#LTAFFIDSRC").prop("src") != undefined) {
        $('#LTAFFIDSRC').prop("src", iframe_source);
    } else if ($("#LTAFFIDSRC").prop("href") != undefined) {
        $('#LTAFFIDSRC').prop("href", iframe_source);
    }
}

AF.Campaign.FlowCakeURL = function (CakeAffID, CakeID, ExtraParameter) {
    var iframe_source = window.location.protocol + "//t.afftrackr.com/?a=" + CakeAffID + "&c=" + CakeID + "&s5=" + jGetVid() + "_" + _jCid + "&s4=" + AF.Lead.v.EntranceVID;
    if (ExtraParameter != undefined) iframe_source = iframe_source + "&" + ExtraParameter;
    if ($("#CakeOffer").prop("src") != undefined) {
        $('#CakeOffer').prop("src", iframe_source);
    } else if ($("#CakeOffer").prop("href") != undefined) {
        $('#CakeOffer').prop("href", iframe_source);
    }
}

AF.Campaign.RegOfferSubmitWithCB = function (CidcIdxPair, CBFunc, CBFuncArgs, sz) {
    AF.Campaign.LogUser(AF.Campaign.RegOfferSubmitWithCBCore, CidcIdxPair, CBFunc, CBFuncArgs, sz);
}

AF.Campaign.RegOfferSubmitWithCBCore = function (CidcIdxPair, CBFunc, CBFuncArgs, sz) {
    var CIDView = "", cIdxView = "";
    if (typeof CidcIdxPair == "string") { CidcIdxPair = [CidcIdxPair]; }
    for (var i = 0; i < CidcIdxPair.length; i++) {
        if (CIDView != "") { CIDView += ","; cIdxView += ","; }
        CIDView += CidcIdxPair[i].split(",")[0];
        cIdxView += CidcIdxPair[i].split(",")[1];
    }
    AF.System.AppendEmailIfNotExist();
    var sEVID = (AF.Lead.v.EntranceVID != undefined) ? "&EntranceVID=" + AF.Lead.v.EntranceVID : "";
    var AFTimeSpan = Math.round(+new Date() / 1000) - AF.System.v.PageStartTime;
    if (sz != undefined) {
        $.post("Services/ServiceCenter.ashx?FlowID=" + AF.Flow.v.FlowID + "&ProfileID=0&SubFlowID=0&PgSq=0" + sEVID + "&Vid=" + AF.Lead.v.VID + "&sVID=0&cVID=0&type=2&attempt=1&OfferTypeID=0&CampaignID=" + CIDView + "&cIdx=" + cIdxView + "&AffiliateID=" + AF.Flow.v.AffiliateID + "&SubAff=" + AF.Flow.v.SubAff + "&AffSecID=" + AF.Flow.v.AffSecID + "&Status=" + sz + "&TimeSpan=" + AFTimeSpan, AF.Campaign.StandardInfo(), function (resp) { AF.System.CorrectEmail(resp); if (CBFunc != undefined && typeof (CBFunc) == "function") CBFunc(CBFuncArgs) });
    } else {
        $.post("Services/ServiceCenter.ashx?FlowID=" + AF.Flow.v.FlowID + "&ProfileID=0&SubFlowID=0&PgSq=0" + sEVID + "&Vid=" + AF.Lead.v.VID + "&sVID=0&cVID=0&type=2&attempt=1&OfferTypeID=0&CampaignID=" + CIDView + "&cIdx=" + cIdxView + "&AffiliateID=" + AF.Flow.v.AffiliateID + "&SubAff=" + AF.Flow.v.SubAff + "&AffSecID=" + AF.Flow.v.AffSecID + "&TimeSpan=" + AFTimeSpan, AF.Campaign.StandardInfo(), function (resp) { AF.System.CorrectEmail(resp); if (CBFunc != undefined && typeof (CBFunc) == "function") CBFunc(CBFuncArgs) });
    }
}

AF.Campaign.SurveySubmit = function (CBFunc, CBFuncArgs) {
    AF.Campaign.LogUser(AF.Campaign.SurveySubmitCore, CBFunc, CBFuncArgs);
}

AF.Campaign.SurveySubmitCore = function (CBFunc, CBFuncArgs) {
    AF.System.AppendEmailIfNotExist();
    if (AF.Flow.v.DataFormBankID != undefined && AF.Flow.v.DataFormBankID != "" && AF.Flow.v.FlowID != undefined && AF.Flow.v.FlowID != "") {
        var SurveyParam = AF.System.GetSurveyParam();
        var SurveyParamNew = AF.System.GetSurveyParamNew();
        var isTrack = (AF.System.SurveyAnswerPath != undefined && AF.System.SurveyAnswerPath != "") ? "1" : "0";
        var AFTimeSpan = Math.round(+new Date() / 1000) - AF.System.v.PageStartTime;
        var PubSrc = (AF.System.v.pubParams != undefined && AF.System.v.pubParams != "undefined") ? unescape(AF.System.v.pubParams) : "";
        var iPage = (AF.System.v.iPage != undefined && AF.System.v.iPage != "undefined") ? unescape(AF.System.v.iPage) : "";
        var sTCPAOffers = (AF.System.v != undefined && typeof (AF.System.v.TCPAOffers) != "undefined") ? AF.System.v.TCPAOffers : "";
        var sTID = "", sProcessPage = "Services/ServiceCenterSurveyTCPA.ashx";
        if (AF.Flow.v != undefined && typeof (AF.Flow.v.TTID) != "undefined") {
            sTID += "&TTID=" + AF.Flow.v.TTID;
            sTID += "&TID=" + AF.Flow.v.TID;
            //sProcessPage = "Services/ServiceCenterSurveyTCPA.ashx";
        }
        $.post(sProcessPage + "?FlowID=" + AF.Flow.v.FlowID + "&DataFormBankID=" + AF.Flow.v.DataFormBankID + "&DataFormID=" + AF.Flow.v.RegFormID + "&UID=" + AF.Lead.v.UID + "&EntranceVID=" + AF.Lead.v.EntranceVID + "&Vid=" + AF.Lead.v.VID + "&AffiliateID=" + AF.Flow.v.AffiliateID + "&SubAff=" + AF.Flow.v.SubAff + "&AffSecID=" + AF.Flow.v.AffSecID + "&TimeSpan=" + AFTimeSpan + "&isMobile=" + AF.System.GetIsMobile() + "&Browser=" + AF.System.GetBrowser() + "&Device=" + AF.System.GetDevice() + "&isTrack=" + isTrack, AF.Campaign.StandardInfo("", true, true) + SurveyParam + SurveyParamNew + PubSrc + iPage + sTID + "&TCPAOffers=" + sTCPAOffers, function (resp) { AF.System.CorrectEmail(resp); if (CBFunc != undefined && typeof (CBFunc) == "function") CBFunc(CBFuncArgs) });
    } else {
        CBFunc(CBFuncArgs);
    }
}

AF.Campaign.Getsz = function () {
    var sSZValue = AF.System.GetEitherValue(AF.Campaign.GetValue("sz"), AF.Campaign.GetValue("Status"))
    if (sSZValue != undefined && sSZValue != "" && AF.Campaign.v.OfferTypeID != "13") {
        return "&Status=" + sSZValue;
    } else {
        return "";
    }
}

AF.Campaign.CrossCampaignView = function (CidcIdxPair, Option, CBFunc, CBFuncArgs, Status, CustomcVID) {
    AF.Campaign.LogUser(AF.Campaign.CrossCampaignViewCore, CidcIdxPair, Option, CBFunc, CBFuncArgs, Status, CustomcVID);
}

// AF.Campaign.v.CrossSubmitOption = { ViewOnly: "0", SubmitOnly: "1", ViewAndSubmit: "2", SubmitOnlyWithcVID: "3" }
AF.Campaign.CrossCampaignViewCore = function (CidcIdxPair, Option, CBFunc, CBFuncArgs, Status, CustomcVID) {
    var CIDView = "", cIdxView = "", sStackPosition = "", sStackLMPosition = "", StatusParam = ((Status != undefined && Status != "") ? "&Status=" + Status : "");
    var sCPAStyleID = "", sStackID = "", sCPAOfferID = "";
    if (typeof CidcIdxPair == "string") { CidcIdxPair = [CidcIdxPair]; }
    for (var i = 0; i < CidcIdxPair.length; i++) {
        if (CIDView != "") { CIDView += ","; cIdxView += ","; sStackPosition += ","; sStackLMPosition += ","; sCPAStyleID += ","; sStackID += ","; sCPAOfferID += ","; }
        CIDView += CidcIdxPair[i].split(",")[0];
        cIdxView += CidcIdxPair[i].split(",")[1];
        sStackPosition += (CidcIdxPair[i].split(",").length >= 3) ? CidcIdxPair[i].split(",")[2] : "0";
        sStackLMPosition += (CidcIdxPair[i].split(",").length >= 4) ? CidcIdxPair[i].split(",")[3] : "0";
        sCPAStyleID += (CidcIdxPair[i].split(",").length >= 5) ? CidcIdxPair[i].split(",")[4] : "0";
        sStackID += (CidcIdxPair[i].split(",").length >= 6) ? CidcIdxPair[i].split(",")[5] : "0";
        sCPAOfferID += (CidcIdxPair[i].split(",").length >= 7) ? CidcIdxPair[i].split(",")[6] : "0";
    }
    AF.System.AppendEmailIfNotExist();
    var sEVID = (AF.Lead.v.EntranceVID != undefined) ? "&EntranceVID=" + AF.Lead.v.EntranceVID : "";
    var sMasterCampaignID = (typeof (AF.Campaign.v.CampaignID) != "undefined") ? AF.Campaign.v.CampaignID : "0";
    var AFTimeSpan = Math.round(+new Date() / 1000) - AF.System.v.PageStartTime;
    if (Option == AF.Campaign.v.CrossSubmitOption.ViewOnly) {
        sEVID = (AF.Lead.v.EntranceVID != undefined) ? "&EVID=" + AF.Lead.v.EntranceVID : "";
        $.post("Services/CrossCampaignViewV2.ashx?WithSubmit=0&FlowID=" + AF.Flow.v.FlowID + "&ProfileID=" + ((AF.SubFlow.v.ProfileID == undefined) ? "0" : AF.SubFlow.v.ProfileID) + "&SubFlowID=" + ((AF.SubFlow.v.SubFlowID == undefined) ? "0" : AF.SubFlow.v.SubFlowID) + "&PgSq=" + ((AF.System.v.PageSequence != undefined) ? AF.System.v.PageSequence : 0) + sEVID + "&Vid=" + AF.Lead.v.VID + "&sVID=" + AF.Lead.v.sVID + "&cVID=" + AF.Lead.v.cVID + "&AffiliateID=" + AF.Flow.v.AffiliateID + "&SubAff=" + AF.Flow.v.SubAff + /*"&CampaignID=" + CIDView + "&cIdx=" + cIdxView +*/ "&SQ=" + sStackPosition + "&LMPOS=" + sStackLMPosition + "&CPAStyleID=" + sCPAStyleID + "&StackID=" + sStackID + "&CPAOfferID=" + sCPAOfferID + "&MasterCampaignID=" + sMasterCampaignID + "&TimeSpan=" + AFTimeSpan, "CampaignID=" + CIDView + "&cIdx=" + cIdxView + "&" +AF.Campaign.StandardInfo(), function (resp) { if (CBFunc != undefined && typeof (CBFunc) == "function") CBFunc(CBFuncArgs, resp) });
    } else if (Option == AF.Campaign.v.CrossSubmitOption.SubmitOnly) {
        $.post("Services/ServiceCenter.ashx?FlowID=" + AF.Flow.v.FlowID + "&ProfileID=" + ((AF.SubFlow.v.ProfileID == undefined) ? "0" : AF.SubFlow.v.ProfileID) + "&SubFlowID=" + ((AF.SubFlow.v.SubFlowID == undefined) ? "0" : AF.SubFlow.v.SubFlowID) + "&PgSq=" + ((AF.System.v.PageSequence != undefined) ? AF.System.v.PageSequence : 0) + sEVID + "&Vid=" + AF.Lead.v.VID + "&sVID=" + AF.Lead.v.sVID + "&cVID=0&type=2&attempt=1&OfferTypeID=0&AffiliateID=" + AF.Flow.v.AffiliateID + "&SubAff=" + AF.Flow.v.SubAff + /*"&CampaignID=" + CIDView + "&cIdx=" + cIdxView +*/ "&SQ=" + sStackPosition + "&LMPOS=" + sStackLMPosition + "&CPAStyleID=" + sCPAStyleID + "&StackID=" + sStackID + "&CPAOfferID=" + sCPAOfferID + "&MasterCampaignID=" + sMasterCampaignID + "&AffSecID=" + AF.Flow.v.AffSecID + "&TimeSpan=" + AFTimeSpan + "" + StatusParam, "CampaignID=" + CIDView + "&cIdx=" + cIdxView + "&" +AF.Campaign.StandardInfo(), function (resp) { AF.System.CorrectEmail(resp); if (CBFunc != undefined && typeof (CBFunc) == "function") CBFunc(CBFuncArgs, resp) });
    } else if (Option == AF.Campaign.v.CrossSubmitOption.ViewAndSubmit) {
        sEVID = (AF.Lead.v.EntranceVID != undefined) ? "&EVID=" + AF.Lead.v.EntranceVID : "";
        $.post("Services/CrossCampaignViewV2.ashx?WithSubmit=1&FlowID=" + AF.Flow.v.FlowID + "&ProfileID=" + ((AF.SubFlow.v.ProfileID == undefined) ? "0" : AF.SubFlow.v.ProfileID) + "&SubFlowID=" + ((AF.SubFlow.v.SubFlowID == undefined) ? "0" : AF.SubFlow.v.SubFlowID) + "&PgSq=" + ((AF.System.v.PageSequence != undefined) ? AF.System.v.PageSequence : 0) + sEVID + "&Vid=" + AF.Lead.v.VID + "&sVID=" + AF.Lead.v.sVID + "&AffiliateID=" + AF.Flow.v.AffiliateID + "&SubAff=" + AF.Flow.v.SubAff + /*"&CampaignID=" + CIDView + "&cIdx=" + cIdxView +*/ "&SQ=" + sStackPosition + "&LMPOS=" + sStackLMPosition + "&CPAStyleID=" + sCPAStyleID + "&StackID=" + sStackID + "&CPAOfferID=" + sCPAOfferID + "&MasterCampaignID=" + sMasterCampaignID + "&TimeSpan=" + AFTimeSpan + "" + StatusParam, "CampaignID=" + CIDView + "&cIdx=" + cIdxView + "&" +AF.Campaign.StandardInfo(), function (resp) { AF.System.CorrectEmail(resp); if (CBFunc != undefined && typeof (CBFunc) == "function") CBFunc(CBFuncArgs, resp) });
    } else if (Option == AF.Campaign.v.CrossSubmitOption.SubmitOnlyWithcVID && typeof CustomcVID != "undefined") {
        if (AF.Campaign.v.SubmittedcVID.indexOf(CustomcVID) == -1) {
            $.post("Services/ServiceCenter.ashx?FlowID=" + AF.Flow.v.FlowID + "&ProfileID=" + ((AF.SubFlow.v.ProfileID == undefined) ? "0" : AF.SubFlow.v.ProfileID) + "&SubFlowID=" + ((AF.SubFlow.v.SubFlowID == undefined) ? "0" : AF.SubFlow.v.SubFlowID) + "&PgSq=" + ((AF.System.v.PageSequence != undefined) ? AF.System.v.PageSequence : 0) + sEVID + "&Vid=" + AF.Lead.v.VID + "&sVID=" + AF.Lead.v.sVID + "&cVID=" + CustomcVID + "&type=2&attempt=1&OfferTypeID=0&AffiliateID=" + AF.Flow.v.AffiliateID + "&SubAff=" + AF.Flow.v.SubAff + /*"&CampaignID=" + CIDView + "&cIdx=" + cIdxView +*/ "&SQ=" + sStackPosition + "&LMPOS=" + sStackLMPosition + "&CPAStyleID=" + sCPAStyleID + "&StackID=" + sStackID + "&CPAOfferID=" + sCPAOfferID + "&MasterCampaignID=" + sMasterCampaignID + "&AffSecID=" + AF.Flow.v.AffSecID + "&TimeSpan=" + AFTimeSpan + "" + StatusParam, "CampaignID=" + CIDView + "&cIdx=" + cIdxView + "&" +AF.Campaign.StandardInfo(), function (resp) { AF.System.CorrectEmail(resp); if (CBFunc != undefined && typeof (CBFunc) == "function") CBFunc(CBFuncArgs, resp) });
            $.post("Services/UserExit.ashx?action=c&FlowID=" + AF.Flow.v.FlowID + "&cExitStatus=3&cVID=" + CustomcVID, function (resp) { });
            try {
                AF.Campaign.v.SubmittedcVID.push(CustomcVID);
            } catch (ex) { console.log("ACS"); }
        }
    }
}

AF.Campaign.FrameRetURL = function (opt) {
    var sRetURL = document.location.protocol + "//" + document.location.host + "/NextOffer.aspx";
    return (opt == 1) ? encodeURIComponent(sRetURL) : sRetURL;
}

AF.Campaign.URLExclude = function (url, excluded) {
    var arrU1 = url.toString().split('?');
    var arrU2; var retURL = '';
    if (arrU1.length == 1) {
        arrU2 = arrU1[0].split('&');
    } else {
        arrU2 = arrU1[1].split('&');
        retURL = arrU1[0] + '?';
    }
    var arrEx = excluded.toString().split('&');
    var isIncde = true;
    for (var i = 0; i < arrU2.length; i++) {
        var arrPair = arrU2[i].split('=');
        for (var j = 0; j < arrEx.length; j++) {
            if (arrEx[j].toLowerCase() == arrPair[0].toLowerCase()) isIncde = false;
        }
        if (isIncde) retURL += "&" + arrU2[i];
        isIncde = true;
    }
    return retURL.replace('?&', '?').replace('&&', '&');
}

AF.Campaign.OfferSubmit = function (cid, sz, CBFunc, CBArg1, CBArg2) {
    if (typeof (window['jOff' + cid + 'Check']) == 'function' && sz != "24") {
        if (!window['jOff' + cid + 'Check'](9)) return false;
    }
    try {
        if (cid != AF.Campaign.v.CampaignID && cid > 0 && AF.Campaign.v.CampaignID > 0) {//Compare the submit cid with dom
            AF.System.Skip(4);
            return false;
        }
    } catch (ex) { }
    if (sz != undefined) {
        AF.Campaign.AppendValue("Status", sz);
    }
    AF.Campaign.RPOFFSubmit(CBFunc, CBArg1, CBArg2);
}

AF.Campaign.RPOFFSubmitSystemValidate = function () {
    if (AdFlowValidation != undefined) AdFlowValidation.ValidationFields();
    else AF.Campaign.RPOFFSubmit();
}

AF.Campaign.LogUser = function (CBFunc) {
    try {
        var sCBFunc = CBFunc;
        var sArguments1 = arguments[1]; var sArguments2 = arguments[2]; var sArguments3 = arguments[3];
        var sArguments4 = arguments[4]; var sArguments5 = arguments[5]; var sArguments6 = arguments[6];
        var sCurrentURL = window.location.href;
        sCurrentURL = sCurrentURL.toLowerCase();
        if (sCurrentURL.indexOf("default.aspx") != -1 || sCurrentURL.indexOf("/?") != -1) {
            var isDisableInitLog = ((AF.Lead.v.UID == "0" && typeof (AF.Flow.v.DataFormBankID) != "undefined" && AF.Flow.v.DataFormBankID != "0") || ((typeof (AF.Flow.v.DataFormBankID) == "undefined" || AF.Flow.v.DataFormBankID == "0") && (AF.Lead.v.sVID == "0" || AF.Lead.v.cVID == "0")));
            console.log("i:" + isDisableInitLog);
            if (isDisableInitLog) {
                var StandardFields = ["title", "campaignid", "cidx", "clientip", "subaff", "vid", "svid", "cvid", "uid", "pgsq", "flowid", "subflowid", "profileid", "affsecid", "offertypeid", "affiliateid"];
                var LeadFields = ["entrancevid", "surveyparam", "email", "firstname", "lastname", "gender", "dobmonth", "dobday", "dobyear", "workphone", /*"workcode", "workprefix", "worksuffix", */"cellphone", "cellcode", "cellprefix", "cellsuffix", "phone", "phonecode", "phoneprefix", "phonesuffix", "address1", "address2", "city", "state", "zippost", "carrier", "mmn", "fd0", "fd1", "fd2", "fd3", "fd4", "fd5", "fd6", "fd7", "fd8", "fd9", "fda", "fdb", "fdc", "fdd", "fde", "fdf", "fdg", "fdh", "fdi", "fdj", "fdk", "fdl", "fdm", "fdn", "fdo", "fdp", "fdq", "fdr", "fds", "fdt", "fdu", "fdv", "fdw", "fdx", "fdy", "fdz"];
                var LoggingFields = ["returnurl", "landingurl", "postdata", "referurl", "platformid", "campaignid", "cidx", "globalprofileid", "browser", "browserversion"];
                var sLogGetVar = "Services/ServiceLog.ashx?1=1";
                var sLogPostVar = AF.System.GetUserBrowserInfo() + "&flow=" + AF.Flow.v.Flow;
                try { if (typeof (AF.System.v.DvID) != "undefined") { sLogPostVar += "&dvid=" + AF.System.v.DvID; } } catch (ex) { console.log(ex); }
                try { if (typeof (AF.SubFlow.v.SubFlowTemplateID) != "undefined") { sLogPostVar += "&subflowtemplateid=" + AF.SubFlow.v.SubFlowTemplateID; } } catch (ex) { console.log(ex); }
                try { if (typeof (AF.Campaign.v.CreativeVersion) != "undefined") { sLogPostVar += "&creativeversion=" + AF.Campaign.v.CreativeVersion; } } catch (ex) { console.log(ex); }
                try { if (typeof (AF.Lead.v.VID) != "undefined") { sLogPostVar += "&vid=" + AF.Lead.v.VID; } } catch (ex) { console.log(ex); }
                try { if (typeof (AF.Flow.v.DataFormBankID) != "undefined") { sLogPostVar += "&dataformbankid=" + AF.Flow.v.DataFormBankID; } } catch (ex) { console.log(ex); }
                try { if (typeof (AF.Flow.v.DataFormTestCaseID) != "undefined") { sLogPostVar += "&dataformtestcaseid=" + AF.Flow.v.DataFormTestCaseID; } } catch (ex) { console.log(ex); }
                try { if (typeof (AF.Flow.v.DataFormTemplateID) != "undefined") { sLogPostVar += "&dataformtemplateid=" + AF.Flow.v.DataFormTemplateID; } } catch (ex) { console.log(ex); }
                try { if (typeof (AF.Flow.v.RegFormID) != "undefined") { sLogPostVar += "&regformid=" + AF.Flow.v.RegFormID; } } catch (ex) { console.log(ex); }
                try { if (typeof (AF.Flow.v.RegFormStatus) != "undefined") { sLogPostVar += "&regformstatus=" + AF.Flow.v.RegFormStatus; } } catch (ex) { console.log(ex); }

                sLogPostVar += "&isSubFlowExit=" + (AF.System.isSubFlowFinished() ? "1" : "0");

                $.each(LoggingFields, function () {
                    if (AF.Campaign.CheckFieldAvailable(this)) {
                        var sCurrentValue = AF.Campaign.GetValue(this);
                        sErrName = this;
                        if (sCurrentValue != null && sCurrentValue != undefined) {
                            sCurrentValue = sCurrentValue.replace(/#/g, "%23").replace(/&/g, "%26").replace(/"/g, "").replace(/'/g, "");
                            sLogPostVar += "&" + this + "=" + sCurrentValue;
                        }
                    }
                })
                $.each(StandardFields, function () {
                    if (AF.Campaign.CheckFieldAvailable(this)) {
                        sErrName = this;
                        var sCurrentValue = AF.Campaign.GetValue(this);
                        if (sCurrentValue != null && sCurrentValue != undefined) {
                            sCurrentValue = sCurrentValue.replace(/#/g, "%23").replace(/&/g, "%26").replace(/"/g, "").replace(/'/g, "");
                            sLogGetVar += "&" + this + "=" + sCurrentValue;
                        }
                    }
                })
                $.each(LeadFields, function () {
                    try {
                        if (AF.Campaign.CheckFieldAvailable(this)) {
                            var sCurrentValue = AF.Campaign.GetValue(this);
                            sErrName = this;
                            if (sCurrentValue != null && sCurrentValue != undefined) {
                                sCurrentValue = sCurrentValue.replace(/#/g, "%23").replace(/&/g, "%26").replace(/"/g, "").replace(/'/g, "");
                                sLogPostVar += "&" + this + "=" + sCurrentValue;
                            }
                        } else {

                            var sLeadFieldKey = AFLeadFieldMap[this];
                            if (sLeadFieldKey == undefined || sLeadFieldKey == null || sLeadFieldKey == "") sLeadFieldKey = this;
                            if (AF.Lead.v[sLeadFieldKey] != "" && AF.Lead.v[sLeadFieldKey] != undefined) {
                                sCurrentValue = AF.Lead.v[sLeadFieldKey];
                                sLogPostVar += "&" + this + "=" + sCurrentValue;
                            }
                        }
                    } catch (ex) { console.log(ex); }
                })

                $.ajax({
                    type: 'POST', url: sLogGetVar, data: sLogPostVar,
                    success: function (resp) {
                        try {
                            var splVID = resp.split("_");
                            if (splVID.length == 3 && typeof (AF.Lead.v) != "undefined") {
                                var vUID = splVID[0];
                                var vsVID = splVID[1];
                                var vcVID = splVID[2];
                                if (vUID != "0") {
                                    AF.Lead.v.UID = vUID;
                                    AF.Campaign.AppendValue("uid", vUID);
                                }
                                if (vsVID != "0") {
                                    AF.Lead.v.sVID = vsVID;
                                    AF.Campaign.AppendValue("svid", vsVID);
                                }
                                if (vcVID != "0") {
                                    AF.Lead.v.cVID = vcVID;
                                    ttcVID = AF.Lead.v.cVID;
                                    AF.Campaign.AppendValue("cvid", vcVID);
                                }
                            }
                        } catch (ex) { }
                    }
                }).always(function () {

                    if (sCBFunc != undefined && typeof (sCBFunc) == "function") sCBFunc(sArguments1, sArguments2, sArguments3, sArguments4, sArguments5, sArguments6);
                });
            } else {
                if (sCBFunc != undefined && typeof (sCBFunc) == "function") sCBFunc(sArguments1, sArguments2, sArguments3, sArguments4, sArguments5, sArguments6);
            }
        } else {
            if (sCBFunc != undefined && typeof (sCBFunc) == "function") sCBFunc(sArguments1, sArguments2, sArguments3, sArguments4, sArguments5, sArguments6);
        }
    } catch (ex2) { console.log("b2"); }
}

AF.Campaign.RPOFFSubmit = function (CBFunc, CBArg1, CBArg2) {
    AF.Campaign.LogUser(AF.Campaign.RPOFFSubmitCore, CBFunc, CBArg1, CBArg2);
}

AF.Campaign.RPOFFSubmitCore = function (CBFunc, CBArg1, CBArg2) {
    if (AF.Campaign.v.Submitted) {
        var sErrName = "";
        try {
            AF.System.AppendEmailIfNotExist();
            var AFTimeSpan = Math.round(+new Date() / 1000) - AF.System.v.PageStartTime;
            var StandardFields = ["title", "campaignid", "cidx", "invalid", "clientip", "subaff", "vid", "svid", "cvid", "pgsq", "flowid", "subflowid", "profileid", "affsecid", "offertypeid", "affiliateid"];
            var LeadFields = ["entrancevid", "surveyparam", "email", "firstname", "lastname", "gender", "dobmonth", "dobday", "dobyear", "workphone", /*"workcode", "workprefix", "worksuffix", */"cellphone", "cellcode", "cellprefix", "cellsuffix", "phone", "phonecode", "phoneprefix", "phonesuffix", "address1", "address2", "city", "state", "zippost", "carrier", "mmn", "fd0", "fd1", "fd2", "fd3", "fd4", "fd5", "fd6", "fd7", "fd8", "fd9", "fda", "fdb", "fdc", "fdd", "fde", "fdf", "fdg", "fdh", "fdi", "fdj", "fdk", "fdl", "fdm", "fdn", "fdo", "fdp", "fdq", "fdr", "fds", "fdt", "fdu", "fdv", "fdw", "fdx", "fdy", "fdz"];
            var sGetVar = "Services/ServiceCenter.ashx?i=" + AF.Lead.v.cVID + "&" + AF.Campaign.Getsz();
            try {
                if (typeof (ttcVID) != "undefined" && ttcVID != undefined && ttcVID > 0) { sGetVar += "&ci=" + ttcVID; }
            } catch (ex) { }
            sGetVar += "&TimeSpan=" + (Math.round(+new Date() / 1000) - AF.System.v.PageStartTime);
            sGetVar += "&PgSq=" + ((AF.System.v.PageSequence != undefined) ? AF.System.v.PageSequence : 0);
            var sPostVar = "1=1";
            $.each(StandardFields, function () {
                if (AF.Campaign.CheckFieldAvailable(this)) {
                    sErrName = this;
                    var sCurrentValue = AF.Campaign.GetValue(this);
                    if (sCurrentValue != null && sCurrentValue != undefined) {
                        sCurrentValue = sCurrentValue.replace(/#/g, "%23").replace(/&/g, "%26").replace(/"/g, "").replace(/'/g, "");

                        if (this == "campaignid" && typeof (tCID) != "undefined" && tCID != undefined && tCID > 0 && sCurrentValue != tCID) { sCurrentValue = tCID; }
                        if (this == "cidx" && typeof (tcIdx) != "undefined" && tcIdx != undefined && tcIdx > 0 && sCurrentValue != tcIdx) { sCurrentValue = tcIdx; }
                        if (this == "cvid" && typeof (ttcVID) != "undefined" && ttcVID != undefined && ttcVID > 0 && sCurrentValue != ttcVID) { sCurrentValue = ttcVID; }

                        sGetVar += "&" + this + "=" + sCurrentValue;
                    }
                }
            })
            $.each(LeadFields, function () {
                var isValueExists = false;
                var sCurrentValue = "";
                sErrName = this;
                try {
                    if (AF.Campaign.CheckFieldAvailable(this)) {
                        sCurrentValue = AF.Campaign.GetValue(this);
                    } else {
                        var sLeadFieldKey = AFLeadFieldMap[this];
                        if (sLeadFieldKey == undefined || sLeadFieldKey == null || sLeadFieldKey == "") sLeadFieldKey = this;
                        if (AF.Lead.v[sLeadFieldKey] != "" && AF.Lead.v[sLeadFieldKey] != undefined) {
                            sCurrentValue = AF.Lead.v[sLeadFieldKey];
                        }
                    }
                    if (sCurrentValue != null && sCurrentValue != undefined && sCurrentValue != "") {
                        sCurrentValue = sCurrentValue.replace(/#/g, "%23").replace(/&/g, "%26").replace(/"/g, "").replace(/'/g, "");
                        sPostVar += "&" + this + "=" + sCurrentValue;
                    }
                } catch (ex) { console.log(sErrName + ":" + ex); }
            })

            var sGetVarLowerCase = ("&" + sGetVar).toLowerCase();
            sGetVar += (sGetVarLowerCase.indexOf("&flowid=") == -1) ? "&FlowID=" + AF.Flow.v.FlowID : "";
            sGetVar += (sGetVarLowerCase.indexOf("&profileid=") == -1) ? "&ProfileID=" + AF.SubFlow.v.ProfileID : "";
            sGetVar += (sGetVarLowerCase.indexOf("&subflowid=") == -1) ? "&SubFlowID=" + AF.SubFlow.v.SubFlowID : "";
            sGetVar += (sGetVarLowerCase.indexOf("&pgsq=") == -1) ? "&PgSq=" + ((AF.System.v.PageSequence != undefined) ? AF.System.v.PageSequence : 0) : "";
            sGetVar += (sGetVarLowerCase.indexOf("&vid=") == -1) ? "&Vid=" + AF.Lead.v.VID : "";
            sGetVar += (sGetVarLowerCase.indexOf("&svid=") == -1) ? "&sVID=" + AF.Lead.v.sVID : "";
            sGetVar += (sGetVarLowerCase.indexOf("&cvid=") == -1) ? "&cVID=" + AF.Lead.v.cVID : "";
            sGetVar += (sGetVarLowerCase.indexOf("&campaignid=") == -1) ? "&CampaignID=" + AF.Campaign.v.CampaignID : "";
            sGetVar += (sGetVarLowerCase.indexOf("&offertypeid=") == -1) ? "&OfferTypeID=" + AF.Campaign.v.OfferTypeID : "";
            sGetVar += (sGetVarLowerCase.indexOf("&affiliateid=") == -1) ? "&AffiliateID=" + AF.Flow.v.AffiliateID : "";
            sGetVar += (sGetVarLowerCase.indexOf("&subaff=") == -1) ? "&SubAff=" + AF.Flow.v.SubAff : "";
            sGetVar += (sGetVarLowerCase.indexOf("&cidx=") == -1) ? "&cIdx=" + AF.Campaign.v.cIdx : "";
            sGetVar += (sGetVarLowerCase.indexOf("&affsecid=") == -1) ? "&AffSecID=" + AF.Flow.v.AffSecID : "";
            sGetVar += (sGetVarLowerCase.indexOf("&type=") == -1) ? "&type=2" : "";
            sGetVar += (sGetVarLowerCase.indexOf("&attempt=") == -1) ? "&attempt=" + AF.Campaign.v.SubmitAttempt : "";
            sPostVar += (AF.Lead.v.EntranceVID != undefined && ("&" + sPostVar).toLowerCase().indexOf("&entrancevid=") == -1) ? "&entrancevid=" + AF.Lead.v.EntranceVID : "";
            sPostVar += (AF.Lead.v.SurveyParam != undefined && ("&" + sPostVar).toLowerCase().indexOf("&surveyparam=") == -1) ? "&surveyparam=" + escape(AF.Lead.v.SurveyParam) : "";
            if ((sGetVarLowerCase.indexOf("&dstep=") == -1) && typeof AF.Campaign.v.DSFilter != "undefined" && AF.Campaign.v.DSFilter != '') {
                try {
                    DSFilter = jQuery.parseJSON(AF.Campaign.v.DSFilter);
                    var sDStepID = eval("DSFilter.c" + AF.Campaign.v.CampaignID + "_" + AF.Campaign.v.cIdx);
                    if (typeof sDStepID != "undefined") {
                        sPostVar += "&DStep=" + sDStepID;
                    }
                } catch (ex) { console.log("DS Error"); }
            }

            $.post(sGetVar, sPostVar, function (resp) {
                AF.System.CorrectEmail(resp); AF.Campaign.RPOFFSubmitHandler(resp);
                if (CBFunc != undefined && typeof (CBFunc) == "function") CBFunc(CBArg1, CBArg2);
            });
            AF.Campaign.v.SubmitAttempt++;
        } catch (ex) {
            $.post("Services/ErrorLog.ashx?Err=" + escape("i=" + AF.Lead.v.cVID + "&" + ex + "&c=" + sErrName), "", function (resp) {
                AF.Campaign.RPOFFSubmitHandler("success|-| Log");
                if (CBFunc != undefined && typeof (CBFunc) == "function") CBFunc(CBArg1, CBArg2);
            })
        }
    }
}

AF.Campaign.RPOFFSubmitHandler = function (resp) {
    AF.Campaign.v.Submitted = true;
    var respArr = resp.toString().split('|-|');
    if (respArr[0].toLowerCase() == 'success' || respArr[0].toLowerCase() == 'fail') {

        if (typeof (jOfferSubmitPostAction) != 'undefined' && typeof (jOfferSubmitPostAction) == 'function') {
            jOfferSubmitPostAction(resp);
        }
        if (_jCSumbitFG) {
            AF.System.Skip(0);
        }
        _jCSumbitFG = true;
    }
    else if (respArr.length > 1 && respArr[1].toString().length > 1) {
        alert(respArr[1]);
    }
    _jCSumbitFG = true;
}

AF.Campaign.PgSecCheck = function (opt) { } // implemented on backend
AF.Campaign.PgSkipCheck = function () { } // implemented on backend
AF.Campaign.DisplayToggle = function (Sh, Hd) { $("#" + Sh).show(); $("#" + Hd).hide(); }
AF.Campaign.GetCurrentFormID = function () { return ($(AF.System.v.RegFormElemID).size() > 0) ? AF.System.v.RegFormElemID : AF.System.v.OfferFormElemID; }
AF.Campaign.IsRegForm = function () { return ($(AF.System.v.RegFormElemID).size() > 0); }
AF.Campaign.IsOffer = function () { return ($(AF.System.v.OfferFormElemID).size() > 0); }
AF.Campaign.OfferPreSubmit = function (cid, sz, CBFunc, CBArg1, CBArg2) {
    try {
        if (window.SubmitFlowEvent) { SubmitFlowEvent(); }
        else if (window.SubmitEvent) { SubmitEvent(); }
    } catch (ex) { }
    _jCSumbitFG = false;
    AF.Campaign.OfferSubmit(cid, sz, CBFunc, CBArg1, CBArg2);
}

// Replace header script
AF.Campaign.DynamicHeader = function () {
    var fn_find = $(AF.System.v.OfferFormElemID).size() ? AF.System.v.OfferFormElemID : AF.System.v.RegFormElemID;
    var ishtmlortext = false;
    header_info = AF.System.v.header;
    if ((header_info == undefined) || (!header_info) || (header_info.length == 0)) {
        header_info = '';
        $("body *").replaceText(/#header#/gi, '');
    }
    else {
        ishtmlortext = true;
        if (((header_info.substr(0, 4).toLowerCase() == 'http') || (header_info.substr(0, 3).toLowerCase() == '../') || (header_info.substr(0, 2).toLowerCase() == '//')) && ((header_info.substr(header_info.length - 3, 3).toLowerCase() == 'jpg') || (header_info.substr(header_info.length - 3, header_info.length).toLowerCase() == 'png') || (header_info.substr(header_info.length - 3, header_info.length).toLowerCase() == 'gif') || (header_info.substr(header_info.length - 3, header_info.length).toLowerCase() == 'bmp') || (header_info.substr(header_info.length - 3, header_info.length).toLowerCase() == 'svg') || (header_info.substr(header_info.length - 4, 4).toLowerCase() == 'jpeg'))) {
            ishtmlortext = false;
        }
        if (ishtmlortext) {
            $("body *").replaceText(/#header#/gi, unescape(unescape(header_info.toString())));
        }
        else {
            $("body *").replaceText(/#header#/gi, '<img src="' + unescape(unescape(header_info)) + '" alt="dynimg" />');
        }
    }
}

AF.Campaign.MobileOneFieldFormat = function (obj, cid) {
    if (!evt) evt = window.event;

    if (evt.keyCode > 47 && evt.keyCode < 58) {
        if (obj.value.length > 3) {
            var phone = obj.value.replace(/[^0-9]/ig, '');
            if (phone.length == 10) phone = phone.substring(0, 3) + "-" + phone.substring(3, 6) + "-" + phone.substring(6);
            else if (phone.length > 6) phone = phone.substring(0, 3) + "-" + phone.substring(3, 6) + "-" + phone.substring(6);
            else if (phone.length > 3) phone = phone.substring(0, 3) + "-" + phone.substring(3);
            obj.value = phone;
        }
    }
}

AF.Campaign.MobileOneFieldClean = function (obj, cid) {
    var phone = obj.value.replace(/[^0-9]/ig, '');
    obj.value = phone;
    if (phone.length == 10) {
        AF.Campaign.AppendValue("phonecode", phone.substring(0, 3));
        AF.Campaign.AppendValue("phoneprefix", phone.substring(3, 6));
        AF.Campaign.AppendValue("phonesuffix", phone.substring(6));
    }
}

AF.Campaign.MobileSubmit = function (cid, ph, sz) {
    if (sz != undefined) {
        AF.Campaign.AppendValue("Status", sz);
    }
    if (AF.Campaign.GetValue("email") == undefined || AF.Campaign.GetValue("email") == "") {
        AF.Campaign.AppendValue("email", (isValidEmailAddress(AF.Lead.v.email)) ? AF.Lead.v.email : "M_" + ph + "@jmobile.com");
    }
    if (AdFlowValidation != undefined) AdFlowValidation.SubmitLead();
    else AF.Campaign.RPOFFSubmit();
}


AF.Campaign.ProcessSkip = function () {
    if (AF.System.v.PageSequence >= AF.System.v.TotalPage || AF.System.v.OAPageSequence >= AF.Flow.v.TotalCampaigns) {
        AF.System.OpenPopupURL();
        AF.System.GotoURL(AF.System.GetReturnURL());
    } else {
        AF.System.CreateFormElement();
        AF.System.SubmitFire();
    }
}

AF.Flow.ReplaceSurveyParams = function (sURL) {
    try {
        if (typeof (AF.System.v) != "undefined" && typeof (AF.System.v.pubParams) != "undefined") sURL = AF.System.ReplaceCustomParams(sURL, AF.System.v.pubParams);
        if (typeof (AF.Lead.v) != "undefined" && typeof (AF.Lead.v.SurveyParam) != "undefined") sURL = AF.System.ReplaceCustomParams(sURL, AF.Lead.v.SurveyParam);
    } catch (ex) { }
    return sURL;
}

AF.System.ReplaceCustomParams = function (sURL, ReplaceParamsQS) {
    if (ReplaceParamsQS != "") {
        try {
            ReplaceParamsQS = "&" + unescape(ReplaceParamsQS) + "&";
            var iCounter = 0;
            while (sURL.indexOf("#") != -1 && sURL.indexOf("#") != sURL.lastIndexOf("#") && iCounter++ <= 50) {
                var sReplaceParam = sURL.substring(sURL.indexOf("#"), sURL.indexOf("#", sURL.indexOf("#") + 1) + 1);
                var sStart = ReplaceParamsQS.indexOf("&" + sReplaceParam.replace(/#/g, "")) + 1;
                if (sStart != -1) {
                    var sParamValue = ReplaceParamsQS.substring(sStart, ReplaceParamsQS.indexOf("&", sStart));
                    sURL = sURL.replace(sReplaceParam, "&" + sParamValue);
                }
            }
            return sURL.replace("?&", "?").replace(/&&/g, "&");
        } catch (ex) { return sURL; }

    }
    return sURL;
}

AF.System.ReplaceCustomParamsNew = function (sURL, ReplaceParamsQS) {
    try {
        ReplaceParamsQS = "&" + unescape(ReplaceParamsQS) + "&";
        var ParamsBetweenAtSignArray = AF.System.GetParamsBetweenATSign(sURL);
        jQuery.each(ParamsBetweenAtSignArray, function (i, val) {
            var sParamValue = ReplaceParamsQS.substring(ReplaceParamsQS.indexOf("&" + val), ReplaceParamsQS.indexOf("&", ReplaceParamsQS.indexOf("&" + val) + 1));
            sURL = sURL.replace("#" + val + "#", sParamValue);
        })
        return sURL.replace(/##/g, "#").replace("?&", "?").replace(/&&/g, "&");
    } catch (ex) { }
    return sURL;

}

AF.System.GetParamsBetweenATSign = function (sURL) {
    var ParamsBetweenAtSignArray = [];
    try {
        if (typeof (sURL) == "undefined") return "";
        var iStartingLoc = sURL.indexOf('#'); var iEndingLoc = sURL.lastIndexOf('#');
        var sParam = "";
        var isStart = false;
        for (var i = iStartingLoc; i <= iEndingLoc; i++) {
            var sCurrentChar = sURL.charAt(i);
            if (sCurrentChar != '#') {
                sParam += sCurrentChar;
            } else if (!isStart) {
                isStart = true;
            } else {
                isStart = false;
                if (sParam != "" && sParam != "currentparam" && sParam != "currentparamff") ParamsBetweenAtSignArray.push(sParam);
                sParam = "";
            }
        }
        return ParamsBetweenAtSignArray;
    } catch (ex) { }
    return ParamsBetweenAtSignArray;
}

AF.Flow.GetSurveyParamAsQS = function () {
    try {
        if (AF.Lead.v != undefined && AF.Lead.v.SurveyParam != undefined && AF.Lead.v.SurveyParam != "") {
            var sReturnSurveyQS = "";
            var sCurrentValue = unescape(AF.Lead.v.SurveyParam).replace(/#/g, "%23").replace(/"/g, "").replace(/'/g, "");
            var arrAllCurrentNameValue = sCurrentValue.split("&");
            for (var i = 0; i < arrAllCurrentNameValue.length; i++) {
                var arrCurrentNameValue = arrAllCurrentNameValue[i].split("=");
                if (arrCurrentNameValue.length == 2 && (arrCurrentNameValue[0].length == 3 || arrCurrentNameValue[0].length == 4) && arrCurrentNameValue[0][0].toLowerCase() == 'v' && arrCurrentNameValue[0].toLowerCase() != "vid" && arrCurrentNameValue[0].toLowerCase() != "vbck") {
                    sReturnSurveyQS += "&" + arrCurrentNameValue[0] + "=" + arrCurrentNameValue[1];
                }
            }
            return sReturnSurveyQS;
        }
        return "";
    } catch (ex) {
        return "";
    }
}

AF.Campaign.PhoneFix = function () {
    if ($("[name='telephone']").size()) {
        $("[name='telephone']").bind("change", function () { AF.Campaign.MobileOneFieldClean(this); });
    }
}

AF.Campaign.GetPubSrcParamAsQS = function (sURL) {
    var PubSrc = (AF.System.v.pubParams != undefined && AF.System.v.pubParams != "undefined") ? unescape(AF.System.v.pubParams) : "";
    var iPage = (AF.System.v.iPage != undefined && AF.System.v.iPage != "undefined") ? unescape(AF.System.v.iPage) : "";
    PubSrc = (AF.Campaign.URLparam(iPage, "pubsrc1").length > 0) ? AF.Campaign.URLExclude(PubSrc, "pubsrc1") : PubSrc;
    PubSrc = (AF.Campaign.URLparam(iPage, "pubsrc2").length > 0) ? AF.Campaign.URLExclude(PubSrc, "pubsrc2") : PubSrc;
    PubSrc = (AF.Campaign.URLparam(iPage, "pubsrc3").length > 0) ? AF.Campaign.URLExclude(PubSrc, "pubsrc3") : PubSrc;
    PubSrc = (AF.Campaign.URLparam(iPage, "pubsrc4").length > 0) ? AF.Campaign.URLExclude(PubSrc, "pubsrc4") : PubSrc;
    PubSrc = (AF.Campaign.URLparam(iPage, "pubsrc5").length > 0) ? AF.Campaign.URLExclude(PubSrc, "pubsrc5") : PubSrc;
    var SubAff = "";
    if (AF.Flow.v.SubAff != undefined && AF.Flow.v.SubAff != "undefined") {
        var sTmpSubAff = AF.Flow.v.SubAff;
        if (typeof (sURL) != "undefined" && sURL.indexOf(StandardInfoReplaceParamFF) != -1 && typeof (AF.Flow.v.FlowID) != "undefined") {
            var arrSubAff = sTmpSubAff.split("_");
            if (arrSubAff.length == 0) { sTmpSubAff = "____" + AF.Flow.v.FlowID; }
            if (arrSubAff.length == 1) { sTmpSubAff = arrSubAff[0] + "____" + AF.Flow.v.FlowID; }
            else if (arrSubAff.length == 2) { sTmpSubAff = arrSubAff[0] + "_" + arrSubAff[1] + "___" + AF.Flow.v.FlowID; }
            else if (arrSubAff.length == 3) { sTmpSubAff = arrSubAff[0] + "_" + arrSubAff[1] + "_" + arrSubAff[2] + "__" + AF.Flow.v.FlowID; }
            else if (arrSubAff.length == 4) { sTmpSubAff = arrSubAff[0] + "_" + arrSubAff[1] + "_" + arrSubAff[2] + "_" + arrSubAff[3] + "_" + AF.Flow.v.FlowID; }
        }
        SubAff = "&SubAff=" + sTmpSubAff;
    }
    var AffSecID = (AF.Flow.v.AffSecID != undefined && AF.Flow.v.AffSecID != "undefined") ? "&AffSecID=" + AF.Flow.v.AffSecID : "";
    var Header = (AF.System.v.header != undefined && AF.System.v.header != "undefined") ? "&header=" + AF.System.v.header : "";
    var EVID = (AF.Lead.v.EntranceVID != undefined && AF.Lead.v.EntranceVID != "undefined") ? "&EntranceVID=" + AF.Lead.v.EntranceVID : "";
    var sFIRE = (AF.System.v.FIRE != undefined && AF.System.v.FIRE != "undefined" && AF.System.v.FIRE != "1") ? "&FIRE=" + AF.System.v.FIRE : "";
    var sFromFIRE = (AF.System.v.FromFire != undefined && AF.System.v.FromFire != "undefined" && AF.System.v.FromFire != 0) ? "&FromFire=" + AF.System.v.FromFire : "";
    var sDvID = (AF.System.v.DvID != undefined && AF.System.v.DvID != "undefined") ? "&DvID=" + AF.System.v.DvID : "";
    return PubSrc + iPage + SubAff + AffSecID + Header + EVID + sFIRE + sFromFIRE + sDvID;
}

AF.Campaign.FlowDynImgTxt = function () {
    var ishtmlortext = false;
    var pub_src = new Array();

    pub_src[0] = 'Not In Use';
    pub_src[1] = AF.Campaign.PubSrcParam('pubsrc1');
    pub_src[2] = AF.Campaign.PubSrcParam('pubsrc2');
    pub_src[3] = AF.Campaign.PubSrcParam('pubsrc3');
    pub_src[4] = AF.Campaign.PubSrcParam('pubsrc4');
    pub_src[5] = AF.Campaign.PubSrcParam('pubsrc5');
    if ((!pub_src[1]) || (pub_src[1].length == 0)) {
        var image1 = AF.Campaign.PubSrcParam('img1');
        if ((image1) || (image1.length != 0))
            pub_src[1] = image1;
    }
    if ((!pub_src[2]) || (pub_src[2].length == 0)) {
        var text1 = AF.Campaign.PubSrcParam('txt1');
        if ((text1) || (text1.length != 0))
            pub_src[2] = text1;
    }
    for (var i = 1; i < 6; i++) {
        if ((pub_src[i]) || (pub_src[i].length != 0)) {
            ishtmlortext = true;
            if (((pub_src[i].substr(0, 4).toLowerCase() == 'http') || (pub_src[i].substr(0, 3).toLowerCase() == '../') || (pub_src[i].substr(0, 2).toLowerCase() == '//')) && ((pub_src[i].substr(pub_src[i].length - 3, 3).toLowerCase() == 'jpg') || (pub_src[i].substr(pub_src[i].length - 3, pub_src[i].length).toLowerCase() == 'png') ||
                (pub_src[i].substr(pub_src[i].length - 3, pub_src[i].length).toLowerCase() == 'gif') || (pub_src[i].substr(pub_src[i].length - 3, pub_src[i].length).toLowerCase() == 'bmp') || (pub_src[i].substr(pub_src[i].length - 3, pub_src[i].length).toLowerCase() == 'svg') ||
                (pub_src[i].substr(pub_src[i].length - 4, 4).toLowerCase() == 'jpeg'))) {
                ishtmlortext = false;
            }
            if (ishtmlortext) {
                $('.DynDivCont' + i).html(unescape(pub_src[i].toString()));
            }
            else {
                var dynelement = document.createElement('img');
                dynelement.setAttribute('src', unescape(pub_src[i].toString()));
                dynelement.setAttribute('alt', "");
                //$('.DynDivCont' + i).append(dynelement);
                $('.DynDivCont' + i).html(dynelement);
            }
        }
    }
}

AF.Campaign.RemoveElement = function (sElemType, Name) { $(sElemType).filter(function () { return this.name.toLowerCase() == Name; }).remove(); }
AF.Campaign.AppendValue = function (Name, Value, isOverWrittenExistingValue, isPrePop) {
    try {
        Name = Name.toLowerCase();

        if (Name == 'vjv' && AF.Campaign.IsRegForm()) return true;

        if ((Value == undefined || Value == "") && Name != "iframe" && Name != "fire" && !onBeforeSkip) {
            return true;
        }
        if (isPrePop != undefined && !isPrePop) {
            if (Value != undefined && Value != "" && $("input[type='hidden'][title!='nopop']").filter(function () { return this.name.toLowerCase() == Name; }).size()) {
                $("input[type='hidden']").filter(function () { return this.name.toLowerCase() == Name; }).val(Value);
            }
            return true;
        }
        if (isOverWrittenExistingValue != undefined && !isOverWrittenExistingValue) {
            var sExistingValue = AF.Campaign.GetValue(Name);
            if (sExistingValue != undefined && sExistingValue != "") {
                return true;
            }
        }
        if ($("input[name=" + Name.toLowerCase() + "][title=nopop],select[name=" + Name.toLowerCase() + "][title=nopop]").size() && !onBeforeSkip) {

            return true;
        }

        var FormID = AF.Campaign.GetCurrentFormID();
        //For Input
        if ($("input").filter(function () { return this.name.toLowerCase() == Name; }).size()) {
            if (Name.toLowerCase() != "gender") {
                var radioElem = $("input[type=radio]").filter(function () { return this.name.toLowerCase() == Name; });
                if (radioElem.size()) {
                    if (AF.Campaign.IsRegForm()) {
                        return true;
                    } else if ($(radioElem).filter(function () { return this.value.toLowerCase() == Value.toLowerCase(); }).size()) {
                        $(radioElem).filter(function () { return this.value.toLowerCase() == Value.toLowerCase(); }).prop('checked', 'checked');
                    }
                } else {
                    //var chkboxElem = $("input[type=checkbox]").filter(function () { return (this.name.toLowerCase() == Name && this.value != "undefined" && this.value.toLowerCase() == Value); });
                    var chkboxElem = $("input[type=checkbox]").filter(function () { return (this.name.toLowerCase() == Name); });
                    if (chkboxElem.size()) {
                        if ($(chkboxElem).filter(function () { return (this.value != "undefined" && this.value.toLowerCase() == Value); }).size()) {
                            chkboxElem.prop('checked', 'checked');
                        }
                    } else {
                        var inputElem = $("input").filter(function () { return this.name.toLowerCase() == Name; });
                        if (inputElem.prop("title") == "pop3" && Value.length >= 3) {
                            inputElem.val(Value.substring(0, 3));
                        } else if (inputElem.prop("title") == "pop6" && Value.length >= 6) {
                            inputElem.val(Value.substring(0, 6));
                        } else inputElem.val(Value);
                    }
                }
            } else if ($("input[type=hidden]").filter(function () { return this.name.toLowerCase() == Name; }).size()) {
                $("input[type=hidden]").filter(function () { return this.name.toLowerCase() == Name; }).val(Value);
            } else if (Name.toLowerCase() == "gender") {
                var FemaleOptions = ["female", "f", "false", "0"];
                var MaleOptions = ["male", "m", "true", "1"];
                var GenderOptions = [FemaleOptions, MaleOptions];
                $.each(GenderOptions, function () {
                    var thisGenderOptions = this;
                    $.each(eval(thisGenderOptions), function () {
                        $this = this;
                        if (Value.toLowerCase() == $this) {
                            $.each(eval(thisGenderOptions), function () {
                                $$this = this;
                                var radioElem = $("input[type=radio]").filter(function () { return this.name.toLowerCase() == Name; }).filter(function () { return this.value.toLowerCase() == $$this.toLowerCase(); });
                                if (radioElem.size()) {
                                    var curValue = this.toString();
                                    radioElem.prop('checked', 'checked');
                                    return true;
                                }
                            });
                        }
                    });
                });
            }
        }
        //For Select
        else if ($("select").filter(function () { return this.name.toLowerCase() == Name; }).size()) {
            if (Name == "gender") {
                var FemaleOptions = ["female", "f", "false", "0"];
                var MaleOptions = ["male", "m", "true", "1"];
                var GenderOptions = [FemaleOptions, MaleOptions];
                $.each(GenderOptions, function () {
                    var thisGenderOptions = this;
                    $.each(eval(thisGenderOptions), function () {
                        $this = this;
                        if (Value.toLowerCase() == $this) {
                            $.each(eval(thisGenderOptions), function () {
                                $$this = this;
                                var selectElem = $("select").filter(function () { return this.name.toLowerCase() == Name; }).find("option").filter(function () { return this.value.toLowerCase() == $$this.toLowerCase(); });
                                if (selectElem.size()) {
                                    var curValue = this.toString();
                                    selectElem.prop('selected', 'selected');
                                    return true;
                                }
                            });
                        }
                    });
                });
            } else if ((Name == "dobmonth" || Name == "dobday" || Name == "dobyear")) {
                var selectElem = $("select").filter(function () { return this.name.toLowerCase() == Name; }).find("option").filter(function () { return this.value.toLowerCase() == Value; });
                if (selectElem.size()) {
                    selectElem.prop('selected', 'selected');
                } else if (isNumber(Value) && parseInt(Value) < 10) {
                    $("select").filter(function () { return this.name.toLowerCase() == Name; }).find("option").filter(function () { return this.value.toLowerCase() == "0" + Value; }).prop('selected', 'selected');
                }

            } else {
                if (AF.Campaign.IsRegForm()) {
                    return true;
                }
                var selectElem = $("select").filter(function () { return this.name.toLowerCase() == Name; }).find("option").filter(function () { return this.value.toLowerCase() == Value.toLowerCase(); });
                if (selectElem.size()) {
                    selectElem.prop('selected', 'selected');
                }
            }
        }
        else { $(FormID).append("<input type='hidden' name='" + Name + "' id='" + Name + "' value='" + Value + "'/>"); }
    } catch (ex) { }
}

AF.Campaign.UpdateLatestPhoneData = function () {
    AF.Campaign.CentralizePhoneData("telephone", "phonecode", "phoneprefix", "phonesuffix")
    AF.Campaign.CentralizePhoneData("cellphone", "cellcode", "cellprefix", "cellsuffix")
}

AF.Campaign.CentralizePhoneData = function (sOnePhoneField, sPhoneCode, sPhonePrefix, sPhoneSuffix) {
    if ($("input").not(":hidden").filter(function () { return this.name.toLowerCase() == sPhoneCode; }).size()) {
        AF.Campaign.RemoveElement("input", sOnePhoneField);
    } else {
        if ($("input").not(":hidden").filter(function () { return this.name.toLowerCase() == sOnePhoneField; }).size() && $("input").not(":hidden").filter(function () { return this.name.toLowerCase() == sOnePhoneField; }).val().length >= 8) {
            AF.Campaign.RemoveElement("input", sPhoneCode);
            AF.Campaign.RemoveElement("input", sPhonePrefix);
            AF.Campaign.RemoveElement("input", sPhoneSuffix);
        } else {
            AF.Campaign.RemoveElement("input", sOnePhoneField);
        }
    }
}

AF.Campaign.GetValue = function (Name) {
    try {
        var inputElem = $("input,select").filter(function () { return this.name.toLowerCase() == Name.toLowerCase(); });
        if (inputElem.size() > 0) {
            var ElementType = inputElem.attr("type");
            if (ElementType == "checkbox" || ElementType == "radio") {
                var allVals = []
                $.each(inputElem, function () {
                    if ($(this).attr("checked")) {
                        allVals.push($(this).val());
                    }
                });
                return allVals.join();
            } else if (ElementType == "hidden" || ElementType == "text" || $(inputElem).prop("tagName").toLowerCase() == "select") {
                return $(inputElem).val();
            } else {
                return $(inputElem).val();
            }
        }
    } catch (ex) { return "err"; }
}

AF.Campaign.GetValueOld = function (Name) {
    var FormID = AF.Campaign.GetCurrentFormID();
    var inputElem = $(FormID + ' input:radio').filter(function () { return this.name.toLowerCase() == Name.toLowerCase(); });
    if (inputElem.size() > 0) {
        var inputElem = $(FormID + ' input:radio:checked').filter(function () { return this.name.toLowerCase() == Name.toLowerCase(); });
        if (inputElem.size() > 0) {
            return inputElem.val();
        } else {
            return "";
        }
    } else {
        var inputElem = $(FormID + ' input:checkbox').filter(function () { return this.name.toLowerCase() == Name.toLowerCase(); });
        if (inputElem.size() > 0) {
            if ($(FormID + ' input:checkbox:checked').filter(function () { return this.name.toLowerCase() == Name.toLowerCase(); }).size() > 1) {
                var allVals = []
                $(FormID + ' input:checkbox:checked').filter(function () { return this.name.toLowerCase() == Name.toLowerCase(); }).each(function () {
                    allVals.push($(this).val());
                });
                return allVals.join();
            } else {
                var returnValue = $(FormID + ' input:checkbox:checked').filter(function () { return this.name.toLowerCase() == Name.toLowerCase(); }).val();
                return (returnValue == undefined) ? "" : returnValue;
            }
        } else {
            return $(FormID + ' input, ' + FormID + ' select').filter(function () { return this.name.toLowerCase() == Name.toLowerCase(); }).val();
        }
    }
}

AF.Campaign.CheckFieldAvailable = function (Name) {
    var FormID = AF.Campaign.GetCurrentFormID();
    return ($(FormID + ' input, ' + FormID + ' select').filter(function () { return this.name.toLowerCase() == Name.toLowerCase(); }).size() > 0);
}

AF.Campaign.PubSrcParam = function (param_name) {
    var iPage = (typeof (AF.System.v) !== "undefined" && typeof (AF.System.v.iPage) !== "undefined") ? unescape(AF.System.v.iPage) : "";
    var pubParams = (typeof (AF.System.v) !== "undefined" && typeof (AF.System.v.pubParams) !== "undefined") ? unescape(AF.System.v.pubParams) : "";
    var p = AF.Campaign.URLparam(iPage, param_name);

    if (p && p.length > 0)
        return p;
    else
        return AF.Campaign.URLparam(unescape(pubParams), param_name);
}

AF.Campaign.URLparam = function (pURL, param) {
    if (param.length == 0) return '';
    var regex = '[?&]' + param + '=([^&#]*)';
    var results = (new RegExp(regex)).exec(pURL);
    if (results) return $.trim(results[1]);
    return '';
}

AF.Campaign.CampaignCookie = function (opt) { }
AF.Campaign.StandardInfo = function (arrExtraFields, isNeedEscaped, isExcludeSurveyField) {
    var StandardFields = ["email", "firstname", "lastname", "gender", "dobmonth", "dobday", "dobyear", "workphone", /*"workcode", "workprefix", "worksuffix",*/ "cellcode", "cellprefix", "cellsuffix", "phonecode", "phoneprefix", "phonesuffix", "address1", "address2", "city", "state", "zippost", "carrier", "iswireless", "mmn", "fd0", "fd1", "fd2", "fd3", "fd4", "fd5", "fd6", "fd7", "fd8", "fd9", "fda", "fdb", "fdc", "fdd", "fde", "fdf", "fdg", "fdh", "fdi", "fdj", "fdk", "fdl", "fdm", "fdn", "fdo", "fdp", "fdq", "fdr", "fds", "fdt", "fdu", "fdv", "fdw", "fdx", "fdy", "fdz", "isuserlookup", "bve"];
    if (arrExtraFields != undefined) {
        StandardFields.concat(arrExtraFields);
    }
    var sReturnString = "1=1";
    $.each(StandardFields, function () {
        try {
            var sCurrentValue = ""
            if (AF.Campaign.CheckFieldAvailable(this)) {
                sCurrentValue = AF.Campaign.GetValue(this);
            } else {
                var sLeadFieldKey = AFLeadFieldMap[this];
                if (sLeadFieldKey == undefined || sLeadFieldKey == null || sLeadFieldKey == "") sLeadFieldKey = this;
                if (AF.Lead.v[sLeadFieldKey] != "" && AF.Lead.v[sLeadFieldKey] != undefined) {
                    sCurrentValue = AF.Lead.v[sLeadFieldKey];
                }
            }
            if (sCurrentValue != '') {
                if (isNeedEscaped != undefined && sCurrentValue != "") {
                    sCurrentValue = sCurrentValue.replace(/#/g, "%23").replace(/&/g, "%26").replace(/"/g, "").replace(/'/g, "");
                }
                sReturnString += "&" + this + "=" + sCurrentValue;
            }
        } catch (ex) { console.log(this + ":err"); }
    })
    if (isExcludeSurveyField != true) {
        $.each(AF.Lead.v, function (i, val) {
            try {
                if (i != undefined && typeof (i) != "undefined") {
                    i = i.toLowerCase();
                    if ((i.length == 3 || i.length == 4) && i.charAt(0) == "v" && i != "vid" && i != "vbck") {
                        if (AF.Campaign.CheckFieldAvailable(i)) {
                            var sCurrentValue = AF.Campaign.GetValue(i);
                            if (isNeedEscaped != undefined && sCurrentValue != "") {
                                sCurrentValue = sCurrentValue.replace(/#/g, "%23").replace(/&/g, "%26").replace(/"/g, "").replace(/'/g, "");
                            }
                            if (sCurrentValue != '') {
                                sReturnString += "&" + i + "=" + sCurrentValue;
                            }
                        } else if (val != "" && val != undefined) {
                            sReturnString += "&" + i + "=" + val;
                        }
                    }
                }
            } catch (ex) { console.log(i + ":err"); }
        })
    }

    if ($("input[name='phonecode']").size() == 0 && $("input[name='telephone']").size()) {
        var sLeadPhone = AF.Campaign.GetValue("telephone");
        if (sLeadPhone.length == 10) {
            sReturnString += "&phonecode=" + sLeadPhone.substring(0, 3) + "&phoneprefix=" + sLeadPhone.substring(3, 6) + "&phonesuffix=" + sLeadPhone.substring(6);
        }
    }
    if ($("input[name='cellcode']").size() == 0 && $("input[name='cellphone']").size()) {
        var sLeadCellPhone = AF.Campaign.GetValue("cellphone");
        if (sLeadCellPhone.length == 10) {
            sReturnString += "&cellcode=" + sLeadCellPhone.substring(0, 3) + "&cellprefix=" + sLeadCellPhone.substring(3, 6) + "&cellsuffix=" + sLeadCellPhone.substring(6);
        }
    }
    return sReturnString;
}

AF.Flow.ExitUser = function (obj, loc, isOpenNew) {
    AF.Campaign.LogUser(AF.Flow.ExitUserCore, obj, loc, isOpenNew);
}

AF.Flow.ExitUserCore = function (obj, loc, isOpenNew) {
    if (AF.Lead.v.VID != "L3H4KO4U37BXVMZwJmXFEg2") $.post("./Services/UserExit.ashx?action=f&FlowID=" + AF.Flow.v.FlowID + "&Step=0&cExitStatus=1&sExitStatus=1&fExitStatus=2&VID=" + AF.Lead.v.VID + "&sVID=0&cVID=0", function () { AF.System.Redirection(obj, loc, isOpenNew); });
    else AF.System.Redirection(obj, loc, isOpenNew);
}

AF.Campaign.ExitUser = function (obj, loc, isOpenNew) {
    AF.Campaign.LogUser(AF.Campaign.ExitUserCore, obj, loc, isOpenNew);
}

AF.Campaign.ExitUserCore = function (obj, loc, isOpenNew) {
    var ExitStatus = 2;

    if (AF.Campaign.IsRegForm()) {
        if (AF.Lead.v.UID != undefined && AF.Lead.v.UID != "") {
            if (!AF.Flow.isDisableLogging()) {
                $.post("./Services/UserExit.ashx?action=r&FlowID=" + AF.Flow.v.FlowID + "&UID=" + (AF.Lead.v.UID) + "&rExitStatus=" + ExitStatus, function () {
                    AF.System.Redirection(obj, loc, isOpenNew);
                });
            }
        } else {
            alert("Submit function is not enabled in dataform bank mode");
        }
    } else {
        var SubFlowFinished = AF.System.isSubFlowFinished();
        var FlowFinished = AF.System.isFlowFinished();
        if (!AF.Flow.isDisableLogging()) {
            var sFinalcVID = (ttcVID > 0 && ttcVID != AF.Lead.v.cVID) ? ttcVID : AF.Lead.v.cVID;
            if (AF.Lead.v.VID != "L3H4KO4U37BXVMZwJmXFEg2") $.post("./Services/UserExit.ashx?action=f&FlowID=" + AF.Flow.v.FlowID + "&Step=" + (AF.Campaign.v.CurrentStep) + "&cExitStatus=" + ExitStatus + "&sExitStatus=" + SubFlowFinished + "&fExitStatus=" + FlowFinished + "&VID=" + AF.Lead.v.VID + "&sVID=" + AF.Lead.v.sVID + "&cVID=" + sFinalcVID, function () { AF.System.Redirection(obj, loc, isOpenNew); });
            else if (AF.Lead.v.sVID != "0") $.post("./Services/UserExit.ashx?action=s&FlowID=" + AF.Flow.v.FlowID + "&Step=" + (AF.Campaign.v.CurrentStep) + "&cExitStatus=" + ExitStatus + "&sExitStatus=" + SubFlowFinished + "&sVID=" + AF.Lead.v.sVID + "&cVID=" + sFinalcVID, function () { AF.System.Redirection(obj, loc, isOpenNew); });
            else if (sFinalcVID != "0") $.post("./Services/UserExit.ashx?action=c&FlowID=" + AF.Flow.v.FlowID + "&Step=" + (AF.Campaign.v.CurrentStep) + "&cExitStatus=" + ExitStatus + "&cVID=" + sFinalcVID, function () { AF.System.Redirection(obj, loc, isOpenNew); });
            else AF.System.Redirection(obj, loc, isOpenNew);
        } else {
            AF.System.Redirection(obj, loc, isOpenNew)
        }
    }
}

AF.Campaign.LinkoutSubmit = function (CBFunc, CBFuncArgs) { AF.Campaign.UpdateStep(0, 3, CBFunc, CBFuncArgs); }

AF.Campaign.UpdateStep = function (iStep, iExitStatus, CBFunc, CBFuncArgs) {
    AF.Campaign.LogUser(AF.Campaign.UpdateStepCore, iStep, iExitStatus, CBFunc, CBFuncArgs);
}

AF.Campaign.UpdateStepCore = function (iStep, iExitStatus, CBFunc, CBFuncArgs) {
    if (!AF.Flow.isDisableLogging()) {
        $.post("./Services/UserExit.ashx?action=c&FlowID=" + AF.Flow.v.FlowID + "&Step=" + iStep + "&cExitStatus=" + iExitStatus + "&cVID=" + AF.Lead.v.cVID, function (resp) { if (CBFunc != undefined && typeof (CBFunc) == "function") CBFunc(CBFuncArgs) });
    } else {
        if (CBFunc != undefined && typeof (CBFunc) == "function") CBFunc(CBFuncArgs)
    }
    //AF.System.v.ExitStatus. Land:"1" Skip:"2" Submit:"3" Pass:"4" Entry:"5" (1,3,4)
}

AF.Campaign.PixelLog = function (PixelEvtID, Method) {
    AF.Campaign.PixelLogCore(PixelEvtID, Method);
}

var pixelParameters = ["fbclid", "gclid", "ckmc", "ckmscn","ckmsc"];
AF.Campaign.PixelLogCore = function (PixelEvtID, Method) {
    try {
        var sExtraParams = "";
        var sLocation = window.location.href;
        $.each(pixelParameters, function () {
            var sCurParamValue = AF.Campaign.URLparam(sLocation, this);
            sExtraParams += "&" + this + "=" + sCurParamValue;
        })

        var sParam = "FlowID=" + AF.Flow.v.FlowID + "&VID=" + AF.Lead.v.VID + "&PixelEvtID=" + PixelEvtID + sExtraParams;
        if (Method == AF.Campaign.v.EventPixelMethod.Iframe) {
            $("body").append("<iframe src='/PixelEventLogIframe.aspx?" + sParam + "' style='display:none;' width='200' height='200' border='1'></iframe>");
        } else {
            $.getScript("Services/PixelEventLog.ashx?" + sParam, function () { });
        }
    } catch (ex) { console.log("Pxl"); }
}

var _jSaveBack = false, isExit;
AF.SubFlow.FlowUnload = function () {
    document.onmouseover = function () { isExit = true; };
    document.onmouseout = function () { isExit = false; _jSaveBack = false; };

    window.onbeforeunload = AF.SubFlow.FlowUnloadHandler;
}

$(document).ready(function () {
    if (typeof extOnExitPopImgPlaceholder !== 'undefined') {
        $("body").append(extOnExitPopImgPlaceholder);
        $("#extOnExitPopImgPlaceholder").css({ width: $(window).width() + "px", height: $(window).height() + "px" });
    } else if (typeof extOnExitPopHref !== 'undefined') {
        $("body").append("<iframe src='" + extOnExitPopHref + "' height='" + $(window).height() + "' width='" + $(window).width() + "' frameborder='0' style='display:none; position:absolute; left:0;top:0' id='extOnExitPopHrefIframe'></iframe>");
    }
})
AF.SubFlow.SetExitOption = function (v) {
    isExit = v;
    if (typeof isWExit != 'undefined') isWExit = v;
    if (typeof isFormSubmit != 'undefined') isFormSubmit = v;
}
AF.SubFlow.FlowUnloadHandler = function () {
    if (!isExit && !_jSaveBack) {
        window.unloadTimer = setInterval(AF.SubFlow.FlowUnloadSaveHandler, 500); // It will run always
        window.onunload = AF.SubFlow.LastAction; // It will run always

        if (typeof extOnExitPopHref !== 'undefined') {
            $("#extOnExitPopHrefIframe").show();

            if (typeof extOnExitPopImgPlaceholder !== 'undefined') {
                $("body").append("<iframe src='" + extOnExitPopHref + "' height='" + $(window).height() + "' width='" + $(window).width() + "' frameborder='0' style='position:absolute; left:0;top:0' id='extOnExitPopHrefIframe'></iframe>");
                $("#extOnExitPopImgPlaceholder").show();
            }

            if (typeof extOnExitPopSubmit !== 'undefined') {
                eval(extOnExitPopSubmit);
            }
            if (typeof extOnExitPopMessage !== 'undefined') {
                alert(extOnExitPopMessage);
            }
        }
        return AF.SubFlow.v.ExitMessage;
    }
}


AF.SubFlow.LastAction = function () { // Only run when the user close the page
    if ((AF.SubFlow.v.ExitOption == AF.SubFlow.v.ExitOptionCode.E2D || AF.SubFlow.v.ExitOption == AF.SubFlow.v.ExitOptionCode.ES2E || AF.SubFlow.v.ExitOption == AF.SubFlow.v.ExitOptionCode.ES2P) && !_jSaveBack) {
        AF.SubFlow.FlowUnloadOpenURL(1);
    };
    clearInterval(window.unloadTimer);
};

AF.SubFlow.FlowUnloadSaveHandler = function () {
    _jSaveBack = true;
    if (AF.SubFlow.v.ExitOption == AF.SubFlow.v.ExitOptionCode.S2P || AF.SubFlow.v.ExitOption == AF.SubFlow.v.ExitOptionCode.ES2P) { AF.SubFlow.FlowUnloadOpenURL(1); }
    else if (AF.SubFlow.v.ExitOption == AF.SubFlow.v.ExitOptionCode.S2E || AF.SubFlow.v.ExitOption == AF.SubFlow.v.ExitOptionCode.ES2E) { AF.SubFlow.FlowUnloadOpenURL(0); }
    clearInterval(window.unloadTimer);
}

AF.SubFlow.FlowUnloadOpenURL = function (isOpenNew) {
    if (AF.Campaign.IsRegForm()) {
        if (AF.SubFlow.v.ExitOption == AF.SubFlow.v.ExitOptionCode.S2P) {
            if (isOpenNew == 1) {
                AF.Flow.ExitUser(window, unescape(AF.System.GetReturnURL()), true);
            } else {
                AF.Flow.ExitUser(window, unescape(AF.System.GetReturnURL()));
            }
        } else {
            if (isOpenNew == 1) {
                $(AF.System.v.RegFormElemID).prop("target", "_blank");
            }
            AF.System.Skip(1);
        }
    } else {
        if (AF.SubFlow.v.ExitSubFlowID != undefined && AF.SubFlow.v.ExitSubFlowID != "" && !isNaN(AF.SubFlow.v.ExitSubFlowID)) {
            if (isOpenNew == 1) {
                $(AF.System.v.OfferFormElemID).prop("target", "_blank");
            }
            AF.SubFlow.FlowNextSubFlow(isOpenNew, 1);
        }
        else if (AF.Flow.v.ExitURL != undefined && AF.Flow.v.ExitURL.length > 4) {
            if (isOpenNew == 1) {
                AF.Flow.ExitUser(window, unescape(AF.System.GetReturnURL()), true);
            } else {
                AF.Flow.ExitUser(window, unescape(AF.System.GetReturnURL()));
            }
        }
        else {
            if (isOpenNew == 1) {
                AF.Flow.ExitUser(window, unescape(AF.System.GetReturnURL()), true)
            } else {
                AF.Flow.ExitUser(window, unescape(AF.System.GetReturnURL()))
            }
        }
    }
}
var isEnteredNextSubFlow = false;
AF.SubFlow.FlowNextSubFlow = function (isOpenNew, SubmitOpt) {
    isExit = true;
    var FormID = AF.Campaign.GetCurrentFormID();
    if (AF.SubFlow.v.SubFlowID != undefined && AF.SubFlow.v.SubFlowID != "") {
        AF.Campaign.AppendValue("isNextNewSubFlow", "true");
    }
    if (!isEnteredNextSubFlow) {
        isEnteredNextSubFlow = true;
    }
    AF.System.SubmitFire();
    if ($(FormID).size() > 0 && $(FormID).prop("target") == "_blank") {
        $(FormID).removeAttr("target");
        isExit = false;
    }
}

AF.SubFlow.NextOfferHdlr = function (status, cp) {
    if (status == "3") {
        AF.Campaign.AppendValue("Status", "13");
        if (AF.Campaign.GetValue("email") == undefined || AF.Campaign.GetValue("email") == "") {
            AF.Campaign.AppendValue("email", "NxtCF@noemail.com");
        }
        AF.System.AppendEmailIfNotExist();
        AF.Campaign.RPOFFSubmit();
    }
    else { AF.System.Skip(0); }
}

AF.SubFlow.NextStepHdlr = function (qstr) {
    if (typeof (jFlowNextStepHandle) == 'function') return jFlowNextStepHandle(qstr);
}

var StandardInclusiveFieldsForParent = ["email", "firstname", "lastname", "gender", "dobmonth", "dobday", "dobyear", "workphone",/* "workcode", "workprefix", "worksuffix", */"cellcode", "cellprefix", "cellsuffix", "phonecode", "phoneprefix", "phonesuffix", "address1", "address2", "city", "state", "zippost", "carrier", "iswireless", "mmn", "fd0", "fd1", "fd2", "fd3", "fd4", "fd5", "fd6", "fd7", "fd8", "fd9", "fda", "fdb", "fdc", "fdd", "fde", "fdf", "fdg", "fdh", "fdi", "fdj", "fdk", "fdl", "fdm", "fdn", "fdo", "fdp", "fdq", "fdr", "fds", "fdt", "fdu", "fdv", "fdw", "fdx", "fdy", "fdz"];
//User javascript to trigger data pullback to parent
AF.System.PassInfoToParent = function () {
    $("input").not("#campaignid,#cidx,#affiliateid,#typeid,#vid,#cvid,#svid,#__VIEWSTATE,#__EVENTVALIDATION,#resolutionx,#resolutiony,#returnurl,#windowx,#windowy,#groupid,#groupopt,#priority,#categoryid,#nextgroupid,#ipage,#pubparams,#returnurl,#flow,#dataformbankid,#regformid,#pagesequence,#oapagesequence,#totalpage,#entrancevid,#leadid").each(function () {
        if ($(this).attr("name") != undefined && $.inArray($(this).attr("name"), StandardInclusiveFieldsForParent)) {
            window.parent.AF.Campaign.AppendValue($(this).attr("name"), $(this).val(), true, true);
        }
    })
}

AF.SubFlow.PgNext = function (SubmitOpt) {
    isExit = true;

    if (SubmitOpt == 1) {
        onBeforeSkip = true;
        AF.System.Formalize(true, true);
        if (AF.Campaign.IsOffer()) {
            AF.Campaign.AppendValue("SkipTotal", ((AF.System.v.SkipTotal != undefined) ? AF.System.v.SkipTotal : 0) + 1);
        }
        AF.Campaign.AppendValue("OASkipTotal", ((AF.System.v.OASkipTotal != undefined) ? AF.System.v.OASkipTotal : 0) + 1);
    }

    if (AF.Campaign.IsRegForm()) {
        AF.System.SubmitFire();
        return true;
    }

    if (parseInt(AF.System.v.OAPageSequence) < parseInt(AF.Flow.v.TotalCampaigns) && parseInt(AF.System.v.PageSequence) < parseInt(AF.System.v.TotalPage)) {
        AF.System.CreateFormElement();
        if (!_jEventSubmitPause) {
            AF.System.SubmitFire();
        } else {
            setTimeout("AF.System.SubmitFire();", 500);
        }
    }
    else {
        if (!_jEventSubmitPause) {
            AF.Flow.FlowExit(SubmitOpt);
        } else {
            setTimeout("AF.Flow.FlowExit(" + SubmitOpt + ");", 500);
        }
    }
}

//Fire Event Pixel function
AF.Flow.FireLandEvent = function () {
    if (window.LandEvent) { LandEvent(); }
}
AF.Flow.FireSkipEvent = function (SubmitOpt) {
    if (window.SkipEvent) { SkipEvent(); }
    AF.Flow.CallPendingSubmitorSkip(SubmitOpt);
}
AF.Flow.FireSubmitEvent = function (SubmitOpt) {
    try {
        if (window.SubmitFlowEvent) { SubmitFlowEvent(); }
        else if (window.SubmitEvent) { SubmitEvent(); }
    } catch (ex) { }
    AF.Flow.CallPendingSubmitorSkip(SubmitOpt);
}
AF.Flow.ChangeReturnURL = function (url) {
    if (AF.Flow.v != undefined && AF.Flow.v.ReturnURL != undefined) { AF.Flow.v.ReturnURL = url; }
    AF.Campaign.AppendValue("returnurl", url);
}

AF.Flow.ChangePopupURL = function (url) {
    if (AF.Flow.v != undefined && AF.Flow.v.PopupURL != undefined) { AF.Flow.v.PopupURL = url; }
    AF.Campaign.AppendValue("popupurl", url);
}

var LongEventCount;
AF.Flow.CallPendingSubmitorSkip = function (SubmitOpt) {
    //give 3 second max for the ajax then we will continue
    LongEventCount = (AF.Flow.v.InlineEvent >= AF.Flow.v.IframeEvent) ? AF.Flow.v.InlineEvent : AF.Flow.v.IframeEvent;
    if (($.active > 0 && AF.Flow.v.SubmitEventCounter < LongEventCount) || (AF.Flow.v.SubmitEventCounter < LongEventCount)) {
        AF.Flow.v.SubmitEventCounter++;
        setTimeout("AF.Flow.CallPendingSubmitorSkip(" + SubmitOpt + ")", 2000);
    } else {
        AF.System.SkipFinal(SubmitOpt);
    }
}
AF.Flow.isDisableLogging = function () { return (AF.Flow != undefined && AF.Flow.v != undefined && AF.Flow.v.DisableLogging != undefined); }
AF.Flow.isDisableBrowserLogging = function () { return (AF.Flow != undefined && AF.Flow.v != undefined && AF.Flow.v.DisableBrowserResLogging != undefined); }

AF.Flow.FlowExit = function (SubmitOpt) {
    isExit = true;
    var sAFRetURL = (AF.Flow.v.ReturnURL != undefined && AF.Flow.v.ReturnURL != "") ? AF.Flow.v.ReturnURL : "";
    if ($(AF.System.v.OfferFormElemID).length > 0 && ((AF.Flow.v.ExitURL != undefined && AF.Flow.v.ExitURL != "" && !isNaN(AF.Flow.v.ExitURL)) || (AF.SubFlow.v.ExitSubFlowID != undefined && AF.SubFlow.v.ExitSubFlowID != "") || (sAFRetURL.indexOf("ecurrentparam") != -1))) {
        AF.SubFlow.FlowNextSubFlow(false, SubmitOpt);
    }
    else { AF.Flow.FlowSkip2Exit(0); }
}

AF.Flow.FlowSkip2Exit = function (opt) {
    if (AF.System.v.Iframe) { document.location.href = AF.System.GetReturnURL(); }
    else { window.top.location.href = AF.System.GetReturnURL(); }
    AF.System.OpenPopupURL();
}

AF.Flow.FlowSkipReg = function () {
    if (AF.Campaign.IsRegForm()) {
        AF.System.SkipFinal(1);
    }
}

AF.Flow.FrameNextStepURL = function (opt) {
    if (opt == 1)
        return encodeURIComponent(document.location.protocol + "//" + document.location.host + "/NextStep.aspx");
    else
        return document.location.protocol + "//" + document.location.host + "/NextStep.aspx";
}

AF.System.ProxyCall = function (id, params, CallBackFunction) {
    $.ajax({
        type: "GET", url: "./svcg.aspx", data: "SvcTP=3&apikey=6C0E62C4-FB5C-42A5-9D3B-10457F314A81&pID=" + id + "&params=" + escape(params),
        success: CallBackFunction
    });
}

var QueUpdateTimer = 0;
AF.System.CallQuestionLastUpdate = function (Qid) {
    $.ajax({
        type: "POST",
        url: "./Services/SurveyLastQuestion.ashx",
        data: { "QID": Qid, "VID": AF.Lead.v.VID },
        success: function (msg) { }
    })
}


AF.System.LastQuestionTrack = function (AnswerPath) {
    $(AnswerPath).click(function () {
        var Qid = $(this).parents("div.SurveyQue").prop("id");
        Qid = Qid.replace(/^\D+/g, '');
        clearTimeout(QueUpdateTimer);
        QueUpdateTimer = setTimeout("AF.System.CallQuestionLastUpdate('" + Qid + "')", 2000);
    })
}

AF.System.GetCakeVar = function (s2) {
    var sFlowID = (AF.Flow.v != undefined) ? AF.Flow.v.FlowID : "";
    var sEntranceVID = (AF.Lead.v != undefined && AF.Lead.v.EntranceVID != undefined) ? AF.Lead.v.EntranceVID : "";
    var sCampaignID = (typeof (AF.Campaign.v.CampaignID) != "undefined") ? AF.Campaign.v.CampaignID : "0";
    var sS2 = (s2 != undefined ? "&s2=" + UC(AF.Flow.v.SubAff.split("_")[1]) : "");
    return ("").concat("&s1=", sFlowID, sS2, "&s4=", sEntranceVID, "&s5=", jGetVid(), "_", sCampaignID);
}

AF.System.CreateLclStg = function () {
    var sUIToken = "", sLSEmail = "", sVID = "", sLSURL = "https://www.clicken.us/tag/LocalStorageSetNew.html?1=1";
    try {
        var sHostName = window.location.hostname;
        if (sHostName.toLowerCase().indexOf("appgiant.com") != -1) { return; }

        if (typeof (AF.Lead.v) != "undefined" && AF.Lead.v["Email"] != "" && AF.Lead.v["Email"] != undefined) {
            sLSEmail = AF.Lead.v["Email"];
        }
        if (typeof (AF.System.v) != "undefined" && AF.System.v["UIToken"] != "" && AF.System.v["UIToken"] != undefined) {
            sUIToken = AF.System.v["UIToken"];
        }
        if (typeof (AF.Lead.v) != "undefined" && AF.Lead.v["VID"] != "" && AF.Lead.v["VID"] != undefined) {
            sVID = AF.Lead.v["VID"];
        }

        sLSURL += (sVID != "") ? "&vid=" + sVID : "";
        sLSURL += (sUIToken != "") ? "&uitoken=" + sUIToken : "";
        //sLSURL += (sLSEmail != "") ? "&email=" + sLSEmail : "";

        if (sUIToken != "" || (sLSEmail != "" && sLSEmail.indexOf("@noemail.com") == -1) || sVID != "") {
            var iLSIframe = "<iframe src='" + sLSURL + "' style='display:none;' width='1' height='1'></iframe>";
            $("body").append(iLSIframe);
        }
    } catch (ex) { console.log("Create lclstorage failed"); }
}
document.onkeyup = AF.System.KeyPressHandler;