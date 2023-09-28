
        
        if (navigator.appVersion.indexOf("MSIE 6") != -1)
document.write("<br>")
var request;
var response;
var TafseerDisplay = 0;
var frm1;
var PreTraCall = 0;
var HS_Tafseer_State = 1;
var first_attempt = 1;
var ob1;
var ob2;
var ob3;
var ob4;
var ob5;
var ob6;
var ob8;
var ob10;
var ob11;
var _swfFileLoaded = false;
var LogUsrStart = 0;
var LogUsrStop = 0;
var isPlaying = 0;
var ACCT = 1;
var ACCT_OLD = 1;
var FRuku;
var TRuku;
var VList;
var PosVe = 0;
var Audio = 0;
var ESize = 2.2;
var USize = 5.2;
var ObName;
var MAyats = 10;
var RName = "";
var Sura = 1;
var Juz = 1;
var Hizb = 0;
var TVer = 6;
var FVer = 0;
var Ruku = 1;
var ABac = 0;
var HInd = 0;
var UpFrame = 0;
var UpForm = 0;
var styleToSelect;
var BGColor = "#C4ECBD";
var FGColor = "#000000";

var Adv_Pan_CVer = 1;
var Adv_Pan_Wait = 0;
var Adv_Pan_EVer = 1;
var Adv_Pan_AVer = 1;
var Adv_Pan_Sura = 0;
var Adv_Pan_Rang = 1;
var Adv_Pan_BGCo = "#C4ECBD";
var Adv_Pan_FGCo = "#000000";
var Adv_Pan_Book = 1;
var NextfromAudio = "0";
var PosTakeFromHL = 0;
var BookMarkBGVer = 0;
var Adv_Pan_WaitTemp = 0;
var _scriptAudio = 1;
var _transAudio = 1;

function CallFlashLoad() {
    //alert(_scriptAudio + '      ' + _transAudio);
    UpdateFlash();
}

function SetStatus() {
    if (UpFrame == 3) {
        $('#lblstatus').attr('value', '');
        $('#IMGBLoad').attr('src', '');
        $('#IMGBLoad').attr('width', 0);
        $('#IMGBLoad').attr('height', 0);

        SetValuesinFlash_0();

        SetIndex();
        SetFlash();
        UpFrame = 2;
        UpForm = 1;
    }
    else
        UpFrame++;
}

function SetValuesinFlash_0() {
    try {
        setTimeout(function () {
            window.document.obj1.SetVariable("txtremark", "Ready");
        }, 10);
    }
    catch (e) {
        SetValuesinFlash_0();
    }
}

function SetValuesinFlash_1() {
    try {
        setTimeout(function () {
            if (_scriptAudio == 1)
                window.document.obj1.SetVariable("txtpsc", 1);
            else
                window.document.obj1.SetVariable("txtpsc", 0);

            if (_transAudio == 1)
                window.document.obj1.SetVariable("txtptr", 1);
            else
                window.document.obj1.SetVariable("txtptr", 0);

            window.document.obj1.SetVariable("txtsura", parseInt(ob2.selectedIndex, 0) + 1);
            window.document.obj1.SetVariable("txtfver", parseInt(FVer, 0) + 1); // parseInt(FVer,0));
            window.document.obj1.SetVariable("txttver", parseInt(TVer, 0) + 1);
            window.document.obj1.SetVariable("txtvoice", ob8.options[ob8.selectedIndex].value);
            window.document.obj1.SetVariable("txtscript", ob10.options[ob10.selectedIndex].value);
            window.document.obj1.SetVariable("txttrans", $('#txtfiltra').attr('value'));
            window.document.obj1.SetVariable("txtrepeat", parseInt(Adv_Pan_EVer, 0));
            window.document.obj1.SetVariable("txtserver", ob11.value);
            window.document.obj1.SetVariable("txtcnverse", Adv_Pan_CVer);
            window.document.obj1.SetVariable("txtwait", Adv_Pan_WaitTemp);
            window.document.obj1.SetVariable("txtrange_repeat", Adv_Pan_AVer);
            window.document.obj1.SetVariable("txtcnsura", Adv_Pan_Sura);
            window.document.obj1.SetVariable("txtcnrange", Adv_Pan_Rang);
            window.document.obj1.SetVariable("txtbookmark", Adv_Pan_Book);

            //if ($('#txtfiltra').attr('value') == "Hide")
            //    window.document.obj1.SetVariable("txtptr", 0);
            //else
            //    window.document.obj1.SetVariable("txtptr", 1);
        }, 10);
    }
    catch (e) {
        SetValuesinFlash_1();
    }
}

function SetValuesinFlash_2() {
    try {
        setTimeout(function () {
            window.document.obj1.SetVariable("txtpsc", 0);
            //window.document.obj1.SetVariable("txtvoice", ob8.options[ob8.selectedIndex].value);
        }, 10);
    }
    catch (e) {
        SetValuesinFlash_2();
    }
}

function SetValuesinFlash_3() {
    try {
        setTimeout(function () {
            window.document.obj1.SetVariable("txtpsc", 1);
            //window.document.obj1.SetVariable("txtvoice", ob8.options[ob8.selectedIndex].value);
        }, 10);
    }
    catch (e) {
        SetValuesinFlash_3();
    }
}

function SetValuesinFlash_4() {
    try {
        setTimeout(function () {
            window.document.obj1.SetVariable("txtptr", 0);
            //window.document.obj1.SetVariable("txttrans", ob6.options[ob6.selectedIndex].value);
        }, 10);
    }
    catch (e) {
        SetValuesinFlash_4();
    }
}

function SetValuesinFlash_5() {
    try {
        setTimeout(function () {
            window.document.obj1.SetVariable("txtptr", 1);
            //window.document.obj1.SetVariable("txttrans", ob6.options[ob6.selectedIndex].value);
        }, 10);
    }
    catch (e) {
        SetValuesinFlash_5();
    }
}

function SetValuesinFlash_6() {
    try {
        setTimeout(function () {
            window.document.obj1.SetVariable("txtptr", 1);
        }, 10);
    }
    catch (e) {
        SetValuesinFlash_6();
    }
}

function SetValuesinFlash_7() {
    try {
        setTimeout(function () {
            window.document.obj1.SetVariable("txtfver", parseInt(PosVe, 0)); // parseInt(FVer,0));
        }, 10);
    }
    catch (e) {
        SetValuesinFlash_7();
    }
}

function SetValuesinFlash_8() {
    try {
        setTimeout(function () {
            window.document.obj1.SetVariable("txtremark", "Loading...");
        }, 10);
    }
    catch (e) {
        SetValuesinFlash_8();
    }
}

function SetIndex() {
    try {
        ob3.selectedIndex = Hizb;
        ob3[Hizb].selected = true;

        if ((parseInt(TVer) + 1) != ob5.length)
            return;
        ob4.selectedIndex = FVer;
        ob4[FVer].selected = true;
        ob5.selectedIndex = TVer;
        ob5[TVer].selected = true;
    } catch (e) {
        e = "";
    }
}

function SetFlash() {
    UpdateFlash();
}

function QNext(NextfromAudioTemp) {
    var obl_USession;
    var ob1_UTrackStart;

    NextfromAudio = NextfromAudioTemp;
    obl_USession = document.getElementById("htdUSession");
    ob1_UTrackStart = document.getElementById("htdUTrackStart");

    if (NextfromAudio == "1" && LogUsrStart != "0" && obl_USession.value != "guest-allow@quranexplorer.com" && ob1_UTrackStart.value == "1") {
        LogUsrStop = PosTakeFromHL;
        StartPro('CSuraStop');
    }
    else if (ob2.selectedIndex < (ob2.length - 1) || (ob2.selectedIndex == (ob2.length - 1) && ob5.selectedIndex < (ob5.length - 1))) {
        StartPro("BtnNext");
    }
    else {
        alert("This is the last sura...");
        return;
    }
}

function QBack() {
    if (ob2.selectedIndex > 0 || ob4.selectedIndex > 0) {
        StartPro("BtnBack");
    }
    else {
        alert("This is the first sura...");
        return;
    }
}

function CallFlashUpdate() {
    _swfFileLoaded = true;
    UpdateFlash();
}

function UpdateFlash() {
    var SuraNo;
    StoreURLData(SetCookieURL(0));
    SuraNo = parseInt(ob2.selectedIndex) + 1;
    $('#hrfPrint').attr("href", "/Quran/Print/default.aspx?Sura=" + SuraNo + "&FromVerse=" + ob4.options[ob4.selectedIndex].value + "&ToVerse=" + ob5.options[ob5.selectedIndex].value + "&Script=" + ob10.options[ob10.selectedIndex].value + "&Translation=" + ob6.options[ob6.selectedIndex].value + "&TajweedRules=" + ACCT + "&Zoom=" + USize);

    UpdateTraPre();
    Adv_Pan_WaitTemp = parseInt(Adv_Pan_Wait, 10) * 1000;

    SetValuesinFlash_1();
}

function UpdateFlashScr() {
    var str_src;
    str_src = $('#btsr').attr('src');

    if (str_src.indexOf("sound.gif") >= 0) {
        $('#btsr').attr('src', 'images/mute.gif');
        $('#btsr').attr('alt', 'Audio');

        _scriptAudio = 2;
    }
    else if (str_src.indexOf("mute.gif") >= 0) {
        $('#btsr').attr('src', 'images/sound.gif');
        $('#btsr').attr('alt', 'Mute');

        _scriptAudio = 1;
    }

    UpdateFlash();
}

function UpdateFlashTra() {
    var str_src;
    str_src = $('#bttr').attr('src');

    if (str_src.indexOf("sound.gif") >= 0) {
        $('#bttr').attr('src', 'images/mute.gif');
        $('#bttr').attr('alt', 'Audio');

        _transAudio = 2;
    }
    else if (str_src.indexOf("mute.gif") >= 0) {
        $('#bttr').attr('src', 'images/sound.gif');
        $('#bttr').attr('alt', 'Mute');

        _transAudio = 1;
    }
    UpdateFlash();
}

function UpdateTra(Page) {
    var Hv = 0;

    if (Page == 4 && TafseerDisplay == 1) {
        TafseerDisplay = 0;

        $('#frmTran1').height($('#frmTran1').height() + $('#Tafsfrm').height() + $('#sliderTafsChd').height());
        $('#frmTran2').height($('#frmTran2').height() + $('#Tafsfrm').height() + $('#sliderTafsChd').height());
        $('#sliderTafsChd').css("display", "none");
        $('#Tafsfrm').css('display', 'none');

        ResizeWindow();
    }

    if (Page == 3 || Page == 6) {
        if (ob4.selectedIndex > ob5.selectedIndex) {
            if (Page == 3) {
                ob5.selectedIndex = ob4.selectedIndex;
                ob5[ob4.selectedIndex].selected = true;
            }
            else {
                ob4.selectedIndex = ob5.selectedIndex;
                ob4[ob5.selectedIndex].selected = true;
            }
        }

        Juz = ob1.options[ob1.selectedIndex].value;
        Sura = ob2.options[ob2.selectedIndex].value;
        Hizb = ob3.selectedIndex;
        RName = ob6.options[ob6.selectedIndex].value;
        FVer = ob4.selectedIndex;
        TVer = ob5.selectedIndex;
        PosVe = parseInt(FVer) + 1;

        if (FVer != TVer)
            MAyats = (TVer - FVer) + 1;
        else
            MAyats = 1;
        Page = 1;
        Hv = 2;
        StartPro("Verse");

        if (ob6.options[ob6.selectedIndex].value == "Eng-Mufti-Taqi-Usmani-Audio") {
            //ResizeWindow();
            var FGAlt;
            FGAlt = FGColor.substring(1, 7);
            frmTafs.location = "Translation.aspx?Page=3&Sura=" + Sura + "&Juz=" + Juz + "&Hizb=" + Hizb + "&FVer=" + FVer + "&TVer=" + TVer + "&RName=" + ob6.options[ob6.selectedIndex].value + "&USize=" + USize + "&ESize=" + ESize + "&FGColor=" + FGAlt + "&Script=" + ob10.options[ob10.selectedIndex].value + "&ACCT=" + ACCT;
        }
    }
    else if (Page == 4) {
        if (ob6.options[ob6.selectedIndex].value == "Eng-Mufti-Taqi-Usmani-Audio") {
            TafseerDisplay = 1;
            ResizeWindow();
            var FGAlt;
            FGAlt = FGColor.substring(1, 7);
        }

        if (ob6.options[ob6.selectedIndex].value == "Hide") {
            var iframeElement1 = document.getElementById('frmttr');
            var size = "1px";
            iframeElement1.setAttribute("width", size);

            if (ob10.options[ob10.selectedIndex].value != "Hide") {
                var iframeElement2 = document.getElementById('frmtsc');
                size = "100%";
                iframeElement2.setAttribute("width", size);
            }


            var str_src;
            str_src = $('#bttr').attr('src');
            if (str_src.indexOf("sound.gif") >= 0) {
                $('#bttr').attr('src', 'images/sound_disabled.gif');
                $('#bttr').attr('alt', '');
                _transAudio = 2;
            }
            else if (str_src.indexOf("mute.gif") >= 0) {
                $('#bttr').attr('src', 'images/mute_disabled.gif');
                $('#bttr').attr('alt', '');
                _transAudio = 2;
            }
            var SuraNo;
            SuraNo = parseInt(ob2.selectedIndex) + 1;
            $('#hrfPrint').attr("href", "/Quran/Print/default.aspx?Sura=" + SuraNo + "&FromVerse=" + ob4.options[ob4.selectedIndex].value + "&ToVerse=" + ob5.options[ob5.selectedIndex].value + "&Script=" + ob10.options[ob10.selectedIndex].value + "&Translation=" + ob6.options[ob6.selectedIndex].value + "&TajweedRules=" + ACCT + "&Zoom=" + USize);
            //                    hrfPrint.href = "/Quran/Print/default.aspx?Sura=" + SuraNo + "&FromVerse=" + ob4.options[ob4.selectedIndex].value + "&ToVerse=" + ob5.options[ob5.selectedIndex].value + "&Script=" + ob10.options[ob10.selectedIndex].value + "&Translation=" + ob6.options[ob6.selectedIndex].value + "&TajweedRules=" + ACCT + "&Zoom=" + USize;
            return;
        }
        else {
            var str_src;

            str_src = $('#bttr').attr('src');

            if (ob6.options[ob6.selectedIndex].value == "Urdu-Ahmed Ali" || ob6.options[ob6.selectedIndex].value == "Urdu-Ashraf Thanwi" || ob6.options[ob6.selectedIndex].value == "Eng-Yusuf Ali" || ob6.options[ob6.selectedIndex].value == "Eng-Abdul Daryabadi" || ob6.options[ob6.selectedIndex].value == "Eng-Dr. Mohsin" || ob6.options[ob6.selectedIndex].value == "Indonesian" || ob6.options[ob6.selectedIndex].value == "Deutsch" || ob6.options[ob6.selectedIndex].value == "French" ||
ob6.options[ob6.selectedIndex].value == "Spanish" || ob6.options[ob6.selectedIndex].value == "Turkish" || ob6.options[ob6.selectedIndex].value == "Malaysian") {

                if (str_src.indexOf("sound.gif") >= 0) {
                    $('#bttr').attr('src', 'images/sound_disabled.gif');
                    $('#bttr').attr('alt', '');
                    _transAudio = 2;
                }
                else if (str_src.indexOf("mute.gif") >= 0) {
                    $('#bttr').attr('src', 'images/mute_disabled.gif');
                    $('#bttr').attr('alt', '');
                    _transAudio = 2;
                }
            }
            else {
                if (str_src.indexOf("sound_disabled.gif") >= 0) {
                    $('#bttr').attr('src', 'images/sound.gif');
                    $('#bttr').attr('alt', 'Mute');
                    _transAudio = 1;
                }
                else if (str_src.indexOf("mute_disabled.gif") >= 0) {
                    $('#bttr').attr('src', 'images/mute.gif');
                    $('#bttr').attr('alt', 'Audio');
                    _transAudio = 2;
                }
            }

            if (ob10.options[ob10.selectedIndex].value != "Hide") {
                var iframeElement1 = document.getElementById('frmttr');
                var size = "50%";
                iframeElement1.setAttribute("width", size);

                var iframeElement2 = document.getElementById('frmtsc');
                var size = "50%";
                iframeElement2.setAttribute("width", size);
            } else {
                var iframeElement1 = document.getElementById('frmttr');
                var size = "100%";
                iframeElement1.setAttribute("width", size);
            }
        }
        Juz = ob1.options[ob1.selectedIndex].value;
        Sura = ob2.options[ob2.selectedIndex].value;
        Hizb = ob3.selectedIndex;
        RName = ob6.options[ob6.selectedIndex].value;
        //                FVer=ob4.selectedIndex;
        //                TVer=ob5.selectedIndex;
        UpFrame = 2;
        Page = 1;
    }
    else if (Page == 5) {
        if (ob10.options[ob10.selectedIndex].value == "Hide") {
            UpFrame = 3;
            SetStatus();
            var iframeElement1 = document.getElementById('frmtsc');
            var size = "1px";
            iframeElement1.setAttribute("width", size);

            if (ob6.options[ob6.selectedIndex].value != "Hide") {
                var iframeElement2 = document.getElementById('frmttr');
                var size = "100%";
                iframeElement2.setAttribute("width", size);
            }

            var str_src;
            str_src = $('#btsr').attr('src');
            if (str_src.indexOf("sound.gif") >= 0) {
                $('#btsr').attr('src', 'images/sound_disabled.gif');
                $('#btsr').attr('alt', '');
                _scriptAudio = 2;
            }
            else if (str_src.indexOf("mute.gif") >= 0) {
                $('#btsr').attr('src', 'images/mute_disabled.gif');
                $('#btsr').attr('alt', '');
                _scriptAudio = 2;
            }

            if (parseInt(Sura) == 1) {
                if (ob6.options[ob6.selectedIndex].value != "Hide") {
                    var FGAlt;
                    FGAlt = FGColor.substring(1, 7);

                    frmTran1.location = "Translation.aspx?Page=1&Sura=" + Sura + "&Juz=" + Juz + "&Hizb=" + Hizb + "&FVer=" + FVer + "&TVer=" + TVer + "&RName=" + RName + "&USize=" + USize + "&ESize=" + ESize + "&FGColor=" + FGAlt + "&Script=" + ob10.options[ob10.selectedIndex].value + "&ACCT=" + ACCT;
                }
                else
                    frmTran1.location = "htmlpage.htm";

                UpdateFlash();
            }
            var SuraNo;
            SuraNo = parseInt(ob2.selectedIndex) + 1;
            $('#hrfPrint').attr("href", "/Quran/Print/default.aspx?Sura=" + SuraNo + "&FromVerse=" + ob4.options[ob4.selectedIndex].value + "&ToVerse=" + ob5.options[ob5.selectedIndex].value + "&Script=" + ob10.options[ob10.selectedIndex].value + "&Translation=" + ob6.options[ob6.selectedIndex].value + "&TajweedRules=" + ACCT + "&Zoom=" + USize);
            //                    hrfPrint.href = "/Quran/Print/default.aspx?Sura=" + SuraNo + "&FromVerse=" + ob4.options[ob4.selectedIndex].value + "&ToVerse=" + ob5.options[ob5.selectedIndex].value + "&Script=" + ob10.options[ob10.selectedIndex].value + "&Translation=" + ob6.options[ob6.selectedIndex].value + "&TajweedRules=" + ACCT + "&Zoom=" + USize;
            return;
        }
        else {
            var iframeElement12 = document.getElementById('lblhizb');
            if (ob10.options[ob10.selectedIndex].value == "IndoPak")
                iframeElement12.setAttribute("innerText", "Ruku")
            else
                iframeElement12.setAttribute("innerText", "Hizb")

            if (ob6.options[ob6.selectedIndex].value != "Hide") {
                var iframeElement1 = document.getElementById('frmtsc');
                var size = "50%";
                iframeElement1.setAttribute("width", size);

                var iframeElement2 = document.getElementById('frmttr');
                var size = "50%";
                iframeElement2.setAttribute("width", size);
            } else {
                var iframeElement1 = document.getElementById('frmtsc');
                var size = "100%";
                iframeElement1.setAttribute("width", size);
            }
            var str_src;
            str_src = $('#btsr').attr('src');

            if (str_src.indexOf("sound_disabled.gif") >= 0) {
                $('#btsr').attr('src', 'images/sound.gif');
                $('#btsr').attr('alt', 'Mute');
                _scriptAudio = 1;
            }
            else if (str_src.indexOf("mute_disabled.gif") >= 0) {
                $('#btsr').attr('src', 'images/mute.gif');
                $('#btsr').attr('alt', 'Audio');
                _scriptAudio = 2;
            }
        }
        Juz = ob1.options[ob1.selectedIndex].value;
        Sura = ob2.options[ob2.selectedIndex].value;
        Hizb = ob3.selectedIndex;
        RName = ob6.options[ob6.selectedIndex].value;
        //                FVer=ob4.selectedIndex;
        //                TVer=ob5.selectedIndex; 
        UpFrame = 3;

        if (parseInt(Sura) == 1) {
            if (ob6.options[ob6.selectedIndex].value != "Hide") {
                var FGAlt;
                FGAlt = FGColor.substring(1, 7);

                frmTran1.location = "Translation.aspx?Page=1&Sura=" + Sura + "&Juz=" + Juz + "&Hizb=" + Hizb + "&FVer=" + FVer + "&TVer=" + TVer + "&RName=" + RName + "&USize=" + USize + "&ESize=" + ESize + "&FGColor=" + FGAlt + "&Script=" + ob10.options[ob10.selectedIndex].value + "&ACCT=" + ACCT;
            }
            else
                frmTran1.location = "htmlpage.htm";

            UpdateFlash();
        }
        Page = 2;
    }

    if (Page == 1) {
        if (ob6.options[ob6.selectedIndex].value != "Hide") {
            var FGAlt;
            FGAlt = FGColor.substring(1, 7);

            frmTran1.location = "Translation.aspx?Page=" + Page + "&Sura=" + Sura + "&Juz=" + Juz + "&Hizb=" + Hizb + "&FVer=" + FVer + "&TVer=" + TVer + "&RName=" + RName + "&USize=" + USize + "&ESize=" + ESize + "&FGColor=" + FGAlt + "&Script=" + ob10.options[ob10.selectedIndex].value + "&ACCT=" + ACCT;

            if (ob6.options[ob6.selectedIndex].value == "Eng-Mufti-Taqi-Usmani-Audio") {
                frmTafs.location = "Translation.aspx?Page=3&Sura=" + Sura + "&Juz=" + Juz + "&Hizb=" + Hizb + "&FVer=" + FVer + "&TVer=" + TVer + "&RName=" + ob6.options[ob6.selectedIndex].value + "&USize=" + USize + "&ESize=" + ESize + "&FGColor=" + FGAlt + "&Script=" + ob10.options[ob10.selectedIndex].value + "&ACCT=" + ACCT;
            }
        }
        else
            frmTran1.location = "htmlpage.htm";

        UpdateFlash();
    }
    else {
        var FGAlt;
        FGAlt = FGColor.substring(1, 7);

        if (ob10.options[ob10.selectedIndex].value != "Hide")
            frmTran2.location = "Translation.aspx?Page=" + Page + "&Sura=" + Sura + "&Juz=" + Juz + "&Hizb=" + Hizb + "&FVer=" + FVer + "&TVer=" + TVer + "&RName=" + RName + "&USize=" + USize + "&ESize=" + ESize + "&FGColor=" + FGAlt + "&Script=" + ob10.options[ob10.selectedIndex].value + "&ACCT=" + ACCT;
        else
            frmTran2.location = "htmlpage.htm";

        UpdateFlash();
    }
    //alert("££");
    var SuraNo;
    SuraNo = parseInt(ob2.selectedIndex) + 1;
    $('#hrfPrint').attr("href", "/Quran/Print/default.aspx?Sura=" + SuraNo + "&FromVerse=" + ob4.options[ob4.selectedIndex].value + "&ToVerse=" + ob5.options[ob5.selectedIndex].value + "&Script=" + ob10.options[ob10.selectedIndex].value + "&Translation=" + ob6.options[ob6.selectedIndex].value + "&TajweedRules=" + ACCT + "&Zoom=" + USize);
    //            hrfPrint.href = "/Quran/Print/default.aspx?Sura=" + SuraNo + "&FromVerse=" + ob4.options[ob4.selectedIndex].value + "&ToVerse=" + ob5.options[ob5.selectedIndex].value + "&Script=" + ob10.options[ob10.selectedIndex].value + "&Translation=" + ob6.options[ob6.selectedIndex].value + "&TajweedRules=" + ACCT + "&Zoom=" + USize;
    if (Hv == 2)
        UpdateTra(2);
}

function UpdateTraPre() {
    var Translation_Audio = "Hide";

    Translation_Audio = ob6.options[ob6.selectedIndex].value;
    if (Translation_Audio.indexOf("-Audio") != -1)
        Translation_Audio = Translation_Audio.substring(0, Translation_Audio.indexOf("-Audio"));
    else
        Translation_Audio = "Hide";

    $('#txtfiltra').attr('value', Translation_Audio);
}

function MakeCommentActive(str) {
    parent.frmTafs.CommentActiveNow(str);
}

function SetColorVar() {
    try {
        var ob1_selColorBP = document.getElementById("selColorBP");
        BGColor = ob1_selColorBP.options[ob1_selColorBP.selectedIndex].value;
    }
    catch (e) {
        e = "";
    }
}

function VCBREmail() {
    var str;

    str = $('#txtBREmail').attr('value');
    if ($('#txtBRSummary').attr('value') == "" || str.indexOf("@") == -1) {
        var obBRSE;
        obBRSE = document.getElementById("btnSendEmail");
        obBRSE.setAttribute("disabled", true);
    }
    else {
        var obBRSE;
        obBRSE = document.getElementById("btnSendEmail");
        obBRSE.setAttribute("disabled", false);
    }
}

function pickfmsg() {
    //alert("scr");
}
function AudioPlayStart(scr) {
    var obl_USession;
    var ob1_UTrackStart;
    obl_USession = document.getElementById("htdUSession");
    ob1_UTrackStart = document.getElementById("htdUTrackStart");

    if (obl_USession.value != "guest-allow@quranexplorer.com" && ob1_UTrackStart.value == "1" && isPlaying == 0) {
        isPlaying = 1;
        LogUsrStart = scr;
        StartPro('CSuraStart');
    }
}

function AudioPlayStop(Scr) {
    isPlaying = 0;

    if (parseInt(Scr) != -1) {
        var posVTrack = 0;

        Scr = PosTakeFromHL;
        PosVe = parseInt(Scr);
        if (ob2.selectedIndex == 0 && PosVe == 8 && (ob10.options[ob10.selectedIndex].value == "Hide" || ob10.options[ob10.selectedIndex].value == "Usmani"))
            PosVe = 7

        if (PosVe <= 0)
            PosVe = 1

        FVer = parseInt(ob4.selectedIndex);

        //posVTrack = PosVe - (ob4.selectedIndex+1)
        //PosVe = PosVe + posVTrack;
        Scr = PosTakeFromHL;

        SetValuesinFlash_7();
        BookMark(Scr);

        if (LogUsrStart != "0" && PosVe >= 1) {
            LogUsrStop = PosTakeFromHL;
            StartPro('CSuraStop');
        }

        Audio = 0;
        PosVe = 0;
        PosTakeFromHL = 0;
    }
    else {
        Audio = 1;
        PosVe = 0;
        PosTakeFromHL = 0;
    }
    UpdateFlash();
}

function flashmsg(pos) {
    if ($('#lblstatus').attr('value') != "Loading...")
        BacGround(pos);
}

function BacGround(pos) {
    try {
        if (TVer != ob5.selectedIndex)
            return;
                
        PosTakeFromHL = pos;
        BookMarkBGVer = pos;

        if (ob6.selectedIndex > 0)
            parent.frmTran1.BackGroundCol(ob4, ob5, pos, ob2.selectedIndex + 1, $('#lblstatus').attr('value'), BGColor, ob10.options[ob10.selectedIndex].value);
        if (ob10.selectedIndex > 0)
            parent.frmTran2.BackGroundCol(ob4, ob5, pos, ob2.selectedIndex + 1, $('#lblstatus').attr('value'), BGColor, ob10.options[ob10.selectedIndex].value);

        StoreURLData(SetCookieURL(pos));
    }
    catch (e) {
        e = "";
    }
}

function ClrBacGround() {
    if (ob6.selectedIndex > 0)
        parent.frmTran1.ClrBackGroundCol(ob4, ob5, ob2.selectedIndex + 1, $('#lblstatus').attr('value'), BGColor);
    if (ob10.selectedIndex > 0)
        parent.frmTran2.ClrBackGroundCol(ob4, ob5, ob2.selectedIndex + 1, $('#lblstatus').attr('value'), BGColor);
}

function SetCookieURL(_lastVerse) {
    var _url = "";
    var _url_isColorCoding = "Tajweed-ON";

    if (ACCT == 0)
        _url_isColorCoding = "Tajweed-OFF";

    PosVe = _lastVerse;
    if (parseInt(PosVe, 10) > parseInt(ob5.length, 10)) {
        PosVe = parseInt(ob5.length, 10);
    }

    if (parseInt(PosVe, 10) > parseInt(ob4.selectedIndex + 1)) {
        _url = parseInt(ob2.selectedIndex + 1) + "/" + PosVe + "/" + parseInt(ob5.selectedIndex + 1) + "/" + ob10.options[ob10.selectedIndex].value + "/" + ob8.options[ob8.selectedIndex].value + "/" + ob6.options[ob6.selectedIndex].value + "/" + _url_isColorCoding;
    }
    else {
        _url = parseInt(ob2.selectedIndex + 1) + "/" + parseInt(ob4.selectedIndex + 1) + "/" + parseInt(ob5.selectedIndex + 1) + "/" + ob10.options[ob10.selectedIndex].value + "/" + ob8.options[ob8.selectedIndex].value + "/" + ob6.options[ob6.selectedIndex].value + "/" + _url_isColorCoding;
    }
    return _url;
}

function UpdateURLParam() {           
    var _url_isColorCoding = "Tajweed-ON";

    if (ACCT == 0)
        _url_isColorCoding = "Tajweed-OFF";

    var _makeURL = "?Sura=" + parseInt(ob2.selectedIndex + 1) + "&FromVerse=" + parseInt(ob4.selectedIndex + 1) + "&ToVerse=" + parseInt(ob5.selectedIndex + 1) + "&Script=" + ob10.options[ob10.selectedIndex].value + "&Reciter=" + ob8.options[ob8.selectedIndex].value + "&Translation=" + ob6.options[ob6.selectedIndex].value + "/" + _url_isColorCoding; // + "/" + _size;
    if ($.browser.msie == false || $.browser.msie == undefined) {
        window.history.pushState("", "Quran - Recite & Listen Quran Online", _makeURL);
    }
    else {
        document.location.hash = _makeURL;
    }

    StoreURLData(SetCookieURL(0));
}

function StoreURLData(_url) {
    var cu = new Date();
    var _arrayURL = _url.split('/');
    var year = cu.getFullYear() + 1;

    if (_arrayURL.length == 7) {
        document.cookie = 'Sura=' + _arrayURL[0] + '; expires=Thu, 2 Aug ' + year + ' 20:47:11 UTC; path=/'
        document.cookie = 'FromVerse=' + _arrayURL[1] + '; expires=Thu, 2 Aug ' + year + ' 20:47:11 UTC; path=/'

        document.cookie = 'ToVerse=' + _arrayURL[2] + '; expires=Thu, 2 Aug ' + year + ' 20:47:11 UTC; path=/'
        document.cookie = 'Script=' + _arrayURL[3] + '; expires=Thu, 2 Aug ' + year + ' 20:47:11 UTC; path=/'
        document.cookie = 'Reciter=' + _arrayURL[4] + '; expires=Thu, 2 Aug ' + year + ' 20:47:11 UTC; path=/'
        document.cookie = 'Translation=' + _arrayURL[5] + '; expires=Thu, 2 Aug ' + year + ' 20:47:11 UTC; path=/'
        document.cookie = 'TajweedRules=' + _arrayURL[6] + '; expires=Thu, 2 Aug ' + year + ' 20:47:11 UTC; path=/'
        //if (_arrayURL.length == 7) {
        //    document.cookie = 'TajweedRules=' + _arrayURL[6] + '; expires=Thu, 2 Aug ' + year + ' 20:47:11 UTC; path=/'
        //}
        //else {
        //    document.cookie = 'Zoom=' + _arrayURL[6] + '; expires=Thu, 2 Aug ' + year + ' 20:47:11 UTC; path=/'
        //    document.cookie = 'TajweedRules=' + _arrayURL[7] + '; expires=Thu, 2 Aug ' + year + ' 20:47:11 UTC; path=/'
        //}
    }

    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("QEPortalURL", _url);
    }
}

function GetStoredURLData() {
    var _data = "";

    if (document.cookie) {
        var _pos = -1;
        var _cookieData = document.cookie.toLowerCase();

        if ((_pos = _cookieData.indexOf("sura=")) > 0) {
            _cookieData = _cookieData.substring(_pos + 5);
            _data = _cookieData.substring(0, _cookieData.indexOf(";")) + "/";
        }

        if ((_pos = _cookieData.indexOf("fromverse=")) > 0) {
            _cookieData = _cookieData.substring(_pos + 10);
            _data += _cookieData.substring(0, _cookieData.indexOf(";")) + "/";
        }

        if ((_pos = _cookieData.indexOf("toverse=")) > 0) {
            _cookieData = _cookieData.substring(_pos + 8);
            _data += _cookieData.substring(0, _cookieData.indexOf(";")) + "/";
        }

        if ((_pos = _cookieData.indexOf("reciter=")) > 0) {
            _cookieData = _cookieData.substring(_pos + 8);
            _data += _cookieData.substring(0, _cookieData.indexOf(";")) + "/";
        }

        if ((_pos = _cookieData.indexOf("script=")) > 0) {
            _cookieData = _cookieData.substring(_pos + 7);
            _data += _cookieData.substring(0, _cookieData.indexOf(";")) + "/";
        }

        if ((_pos = _cookieData.indexOf("translation=")) > 0) {
            _cookieData = _cookieData.substring(_pos + 12);
            _data += _cookieData.substring(0, _cookieData.indexOf(";")) + "/";
        }

        if ((_pos = _cookieData.indexOf("zoom=")) > 0) {
            _cookieData = _cookieData.substring(_pos + 12);
            _data += _cookieData.substring(0, _cookieData.indexOf(";")) + "/";
        }

        if ((_pos = _cookieData.indexOf("tajweedrules=")) > 0) {
            _cookieData = _cookieData.substring(_pos + 13);
            _data += _cookieData.substring(0, _cookieData.indexOf(";"));
        }
    }

    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem("QEPortalURL")) {
            _data = localStorage.getItem("QEPortalURL");
        }
    }

    return _data;
}

function BookMark(_lastVerse) {
    var _url_isColorCoding = "Tajweed-OFF";

    LastVer = parseInt(TVer) + 1;
    if (BookMarkBGVer <= 0)
        BookMarkBGVer = 1;

    if (ACCT == 1)
        _url_isColorCoding = "Tajweed-ON";

    if (parseInt(_lastVerse, 10) == 0) {
        _lastVerse = parseInt(ob4.selectedIndex + 1);
    }
    if (parseInt(_lastVerse, 10) > parseInt(ob5.selectedIndex + 1)) {
        _lastVerse = parseInt(ob5.selectedIndex + 1);
    }
    //


    //if (Audio == 1) {
    //    if (document.all) {
    //        window.external.AddFavorite('http://www.QuranExplorer.com/Quran/?Sura=' + parseInt(ob2.selectedIndex + 1) + '&FromVerse=' + BookMarkBGVer + "&ToVerse=" + LastVer + '&Reciter=' + ob8.options[ob8.selectedIndex].value + '&Translation=' + ob6.options[ob6.selectedIndex].value + '&Zoom=' + USize + '&TajweedRules=' + ACCT, "Quran Bookmark | " + mo + " " + cu1.getDate() + " | Sura " + parseInt(ob2.selectedIndex + 1) + " - Verse " + BookMarkBGVer);
    //    }
    //    else if (window.sidebar)
    //        window.sidebar.addPanel("Quran Bookmark | " + mo + " " + cu1.getDate() + " | Sura " + parseInt(ob2.selectedIndex + 1) + " - Verse " + BookMarkBGVer, 'http://www.QuranExplorer.com/Quran/?Sura=' + parseInt(ob2.selectedIndex + 1) + '&FromVerse=' + BookMarkBGVer + "&ToVerse=" + LastVer + '&Reciter=' + ob8.options[ob8.selectedIndex].value + '&Translation=' + ob6.options[ob6.selectedIndex].value + '&Zoom=' + USize + '&TajweedRules=' + ACCT, "")
    //}
    //else {
    //    if (document.all) {
    //        window.external.AddFavorite("http://www.QuranExplorer.com/Quran/?Sura=" + parseInt(ob2.selectedIndex + 1) + "&FromVerse=" + parseInt(ob4.selectedIndex + 1) + "&ToVerse=" + LastVer + "&Reciter=" + ob8.options[ob8.selectedIndex].value + "&Translation=" + ob6.options[ob6.selectedIndex].value + "&Zoom=" + USize + "&TajweedRules=" + ACCT, "Quran Bookmark | " + mo + " " + cu1.getDate() + " | Sura " + parseInt(ob2.selectedIndex + 1) + " - Verse " + parseInt(ob4.selectedIndex + 1));
    //    }
    //    else if (window.sidebar) {
    //        window.sidebar.addPanel("Quran Bookmark | " + mo + " " + cu1.getDate() + " | Sura " + parseInt(ob2.selectedIndex + 1) + " - Verse " + parseInt(ob4.selectedIndex + 1), 'http://www.QuranExplorer.com/Quran/?Sura=' + parseInt(ob2.selectedIndex + 1) + '&FromVerse=' + parseInt(ob4.selectedIndex + 1) + "&ToVerse=" + LastVer + '&Reciter=' + ob8.options[ob8.selectedIndex].value + '&Translation=' + ob6.options[ob6.selectedIndex].value + '&Zoom=' + USize + '&TajweedRules=' + ACCT, "");
    //    }
    //}


    //
    //if (parseInt(LastVer, 10) > $("#cmbFVerse option:selected").val()) {
    //    if ($.browser.msie == false || $.browser.msie == undefined) {
    //        window.history.pushState("", "Quran - Recite & Listen Quran Online", "/" + $("#cmbSura option:selected").val() + "/" + LastVer + "/" + $("#cmbScript option:selected").text() + "/" + $("#cmbReciter option:selected").text() + "/" + $('#cmbTranslation option:selected').text() + "/" + _url_isColorCoding);
    //    }
    //    else {
    //        document.location.hash = $("#cmbSura option:selected").val() + "/" + LastVer + "/" + $('#cmbScript option:selected').text() + "/" + $('#cmbReciter option:selected').text() + "/" + $('#cmbTranslation option:selected').text() + "/" + _url_isColorCoding; // + "/" + _size;
    //    }
    //    _currentfirstVerse = LastVer;
    //    $('#cmbFVerse option')[parseInt(_currentfirstVerse, 10) - 1].selected = true;

    //    _updateCustomCtrl('cmbFVerse');
    //    GetVerseResources(_curSura, _curScript, _curTranslation, _currentfirstVerse, _currentlastVerse, _totalNoVersesInSura);
    //}
    //else {
    //    LastVer = parseInt($("#cmbFVerse option:selected").val(), 10);
    //}

    var cu1;
    var mo;
    cu1 = new Date();
    mo = cu1.getMonth();
    if (parseInt(cu1.getMonth()) == 0)
        mo = "Jan";
    if (parseInt(cu1.getMonth()) == 1)
        mo = "Feb";
    if (parseInt(cu1.getMonth()) == 2)
        mo = "Mar";
    if (parseInt(cu1.getMonth()) == 3)
        mo = "Apr";
    if (parseInt(cu1.getMonth()) == 4)
        mo = "May";
    if (parseInt(cu1.getMonth()) == 5)
        mo = "Jun";
    if (parseInt(cu1.getMonth()) == 6)
        mo = "Jul";
    if (parseInt(cu1.getMonth()) == 7)
        mo = "Aug";
    if (parseInt(cu1.getMonth()) == 8)
        mo = "Sep";
    if (parseInt(cu1.getMonth()) == 9)
        mo = "Oct";
    if (parseInt(cu1.getMonth()) == 10)
        mo = "Nov";
    if (parseInt(cu1.getMonth()) == 11)
        mo = "Dec";

    $('#htd_BookMarkTitle').val("" + mo + " " + cu1.getDate());
    $('#txtBMTitle').val("Quran Bookmark | " + mo + " " + cu1.getDate() + " | Sura " + parseInt(ob2.selectedIndex + 1) + " - Verse " + _lastVerse);           
    $('#txtBMURL').attr('href', "http://www.QuranExplorer.com/Quran/?Sura=" + parseInt(ob2.selectedIndex + 1) + "&FromVerse=" + _lastVerse + "&ToVerse=" + parseInt(ob5.selectedIndex + 1) + "&Script=" + ob10.options[ob10.selectedIndex].value + "&Reciter=" + ob8.options[ob8.selectedIndex].value + "&Translation=" + ob6.options[ob6.selectedIndex].value + "&TajweedRules=" + _url_isColorCoding);
    $('#txtBMURL').text("http://www.QuranExplorer.com/Quran/?Sura=" + parseInt(ob2.selectedIndex + 1) + "&FromVerse=" + _lastVerse + "&ToVerse=" + parseInt(ob5.selectedIndex + 1) + "&Script=" + ob10.options[ob10.selectedIndex].value + "&Reciter=" + ob8.options[ob8.selectedIndex].value + "&Translation=" + ob6.options[ob6.selectedIndex].value + "&TajweedRules=" + _url_isColorCoding);

    if (ACCT == 1)
        $('#htd_BookMarkURL').val(parseInt(ob2.selectedIndex + 1) + "_" + _lastVerse + "_" + parseInt(ob5.selectedIndex + 1) + "_1");
    else
        $('#htd_BookMarkURL').val(parseInt(ob2.selectedIndex + 1) + "_" + _lastVerse + "_" + parseInt(ob5.selectedIndex + 1) + "_0");

    ApplyBMDisplay();
            
    loadPopup(7);
}

function ApplyBMDisplay() {
    $('#lblBMMsg').html('');

    var obl_USession;
    obl_USession = document.getElementById("htdUSession");

    if (obl_USession.value.toLowerCase() != "guest-allow@quranexplorer.com") {
        $('#divBookmarkPan').height('200px');
        ResizePopup();
        $('#div_UOption').hide();
        $('#div_Login').hide();
        $('#div_LoginReg').hide();
        $('#div_UOptionLoggedIn').show();
    }
    else {
        $('#divBookmarkPan').height('250px');
        ResizePopup();
        //$('#emailToggleBtn').trigger('click');
        //$('#backToggleBtn').trigger('click');
        $('#backToggleBtn').hide();
        $('#bookEmail').hide();
        $('#bookLogReg').show();
        $('#emailToggleBtn').show();
        $('#div_LoginReg').hide();
        $('#div_Login').hide();
        //$('#div_UOptionLoggedIn').hide();
        $('#div_UOption').show();

        if (typeof (Storage) !== "undefined") {
            if (localStorage.getItem("QEBookMarkEmailID")) {
                $('#txtEmailIDBME').val(localStorage.getItem("QEBookMarkEmailID"));
                $('#txt_BML_Email').val(localStorage.getItem("QEBookMarkEmailID"));
            }
        }
    }
}

function increase() {
    if ($('#lblstatus').attr('value') == "Loading...")
        return;
    if (TVer != ob5.selectedIndex)
        return;
    var Lang = RName.substring(0, 3);
    var touch = 0;
    if (ob6.options[ob6.selectedIndex].value != "Hide") {
        if (USize < 7) {
            parent.frmTran1.increaseFontSize(ob4, ob5, Lang, ob2.selectedIndex, ob10.options[ob10.selectedIndex].value, 1);

            if (ob6.options[ob6.selectedIndex].value == "Eng-Mufti-Taqi-Usmani-Audio") {
                parent.frmTafs.increaseFontSize(ob4, ob5, Lang, ob2.selectedIndex, ob10.options[ob10.selectedIndex].value, 3);
            }
            UpForm = 1;
            GFontSize(1);
            touch = 1;
        }
    }

    Lang = "Urd";
    if (ob10.options[ob10.selectedIndex].value != "Hide") {
        if (touch == 1)
            USize--;
        if (USize < 7) {
            parent.frmTran2.increaseFontSize(ob4, ob5, Lang, ob2.selectedIndex, ob10.options[ob10.selectedIndex].value, 2);
            UpForm = 1;
            GFontSize(1);
        }
    }
    var SuraNo;
    SuraNo = parseInt(ob2.selectedIndex) + 1;
    $('#hrfPrint').attr("href", "/Quran/Print/default.aspx?Sura=" + SuraNo + "&FromVerse=" + ob4.options[ob4.selectedIndex].value + "&ToVerse=" + ob5.options[ob5.selectedIndex].value + "&Script=" + ob10.options[ob10.selectedIndex].value + "&Translation=" + ob6.options[ob6.selectedIndex].value + "&TajweedRules=" + ACCT + "&Zoom=" + USize);
}

function decrease() {
    if ($('#lblstatus').attr('value') == "Loading...")
        return;
    if (TVer != ob5.selectedIndex)
        return;
    var Lang = RName.substring(0, 3);
    var touch = 0;
    if (ob6.options[ob6.selectedIndex].value != "Hide") {
        if (USize > 3.2) {
            parent.frmTran1.decreaseFontSize(ob4, ob5, Lang, ob2.selectedIndex, ob10.options[ob10.selectedIndex].value, 1);

            if (ob6.options[ob6.selectedIndex].value == "Eng-Mufti-Taqi-Usmani-Audio") {
                parent.frmTafs.decreaseFontSize(ob4, ob5, Lang, ob2.selectedIndex, ob10.options[ob10.selectedIndex].value, 3);
            }
            UpForm = 1;
            GFontSize(1);
            touch = 1;
        }
    }

    Lang = "Urd";
    if (ob10.options[ob10.selectedIndex].value != "Hide") {
        if (touch == 1)
            USize++;
        if (USize > 3.2) {
            parent.frmTran2.decreaseFontSize(ob4, ob5, Lang, ob2.selectedIndex, ob10.options[ob10.selectedIndex].value, 2);
            UpForm = 1;
            GFontSize(1);
        }
    }
    var SuraNo;
    SuraNo = parseInt(ob2.selectedIndex) + 1;
    $('#hrfPrint').attr("href", "/Quran/Print/default.aspx?Sura=" + SuraNo + "&FromVerse=" + ob4.options[ob4.selectedIndex].value + "&ToVerse=" + ob5.options[ob5.selectedIndex].value + "&Script=" + ob10.options[ob10.selectedIndex].value + "&Translation=" + ob6.options[ob6.selectedIndex].value + "&TajweedRules=" + ACCT + "&Zoom=" + USize);
}

function GFontSize(GFrame) {
    if (UpForm != 1)
        return;
    if (TVer != ob5.selectedIndex)
        return;
    if (GFrame == 1) {
        var Lang = RName.substring(0, 3);
        if (Lang == "Eng") {
            USize = parent.frmTran2.GetFontSize(ob2.selectedIndex, ob10.options[ob10.selectedIndex].value);
            ESize = USize - 3;
        }
        else {
            USize = parent.frmTran2.GetFontSize(ob2.selectedIndex, ob10.options[ob10.selectedIndex].value);
        }
    }
    else {
        USize = parent.frmTran2.GetFontSize(ob2.selectedIndex, ob10.options[ob10.selectedIndex].value);
    }
}

function StartPro(object) {
    if (ob3.length == 240 && object == "CmbScript" && (ob10.options[ob10.selectedIndex].value == "Hide" || ob10.options[ob10.selectedIndex].value == "Usmani")) {
        UpdateTra('5');
        return;
    }
    else if (object == "CmbScript") {
        if (parseInt(Sura) == 1) {
            if (ob6.options[ob6.selectedIndex].value != "Hide") {
                var FGAlt;
                FGAlt = FGColor.substring(1, 7);

                frmTran1.location = "Translation.aspx?Page=1&Sura=" + Sura + "&Juz=" + Juz + "&Hizb=" + Hizb + "&FVer=" + FVer + "&TVer=" + TVer + "&RName=" + RName + "&USize=" + USize + "&ESize=" + ESize + "&FGColor=" + FGAlt + "&Script=" + ob10.options[ob10.selectedIndex].value + "&ACCT=" + ACCT;
            }
            else
                frmTran1.location = "htmlpage.htm";

            UpdateFlash();
        }
    }

    if (object != "MailScript" && object != "CSuraStart" && object != "CSuraStop") {
        $('#lblstatus').attr('value', 'Loading...');
        $('#IMGBLoad').attr('src', 'images/indicator.gif');
        $('#IMGBLoad').attr('width', '16');
        $('#IMGBLoad').attr('height', '16');

        SetValuesinFlash_8();
    }
    ObName = object;
    Juz = ob1.options[ob1.selectedIndex].value;
    Sura = ob2.options[ob2.selectedIndex].value;

    Hizb = ob3.selectedIndex;
    RName = ob6.options[ob6.selectedIndex].value;
    return SendRequest(object);
}

function InitializeRequest() {
    try {
        request = new XMLHttpRequest();
        request.onload = handler;
        request.onerror = handler;
    }
    catch (Ex) {
        return;
    }

    if (!request && typeof XMLHttpRequest != 'undefined') {
        request = new XMLHttpRequest();
    }
}

function SendRequest(object) {
    InitializeRequest(); //Call InitializeRequest to set request object

    var obl_USession;
    obl_USession = document.getElementById("htdUSession");

    var url = "UpdateDropDownCtr.aspx?Juz=" + Juz + "&Sura=" + Sura + "&Hizb=" + Hizb + "&FVer=" + FVer + "&TVer=" + TVer + "&COFAction=" + ObName + "&MAyats=" + MAyats + "&Script=" + ob10.options[ob10.selectedIndex].value + "&Zoom=" + USize + "&Reciter=" + ob8.options[ob8.selectedIndex].value + "&Translation=" + ob6.options[ob6.selectedIndex].value + "&User_Email=" + obl_USession.value + "&LogUsrStop=" + LogUsrStop + "&ACCT=" + ACCT + "&CurrPos=" + PosTakeFromHL; //Create the url to send the request to
    request.onreadystatechange = ProcessRequest; //Delegate ProcessRequest to onreadystatechange property so it gets called for every change in readyState value
    request.open("GET", url, true); //Open a GET request to the URL
    request.send(null); //Send the request with a null body.
}

function ProcessRequest() {
    if (request.readyState == 4)//If the readyState is in the "Ready" state
    {
        if (request.status == 200)//If the returned status code was 200. Everything was OK.
        {
            if (request.responseText != "")//If responseText is not blank
            {
                populateList(request.responseText); //Call the populateList fucntion
            }
            else {
                alert("Unable to connect quran explorer's server...");
            }
        }
    }
    return true;
}

function populateList(response) {
    var XMLArray = new Array();
    var aind = 0;
    while (true) {
        var s = response.indexOf("<QuranInfo InfoID=", 0)
        if (s >= 0) {
            var s1 = response.indexOf("'/>", s + 19);
            XMLArray[aind] = response.substring(s + 19, s1);
            response = response.substring(s1, response.length)
            aind++;
        }
        else
            break;
    }
    var opt;
    if (ObName == "CmbJuz") {
        if (XMLArray.length == 6 || XMLArray.length == 245) {
            clearSelect(ob3);
            clearSelect(ob4);
            clearSelect(ob5);
            ob2.selectedIndex = XMLArray[0];
            ob3.selectedIndex = XMLArray[1];
            Hizb = XMLArray[1];
            FVer = XMLArray[2];
            TVer = XMLArray[3];
            PosVe = parseInt(FVer) + 1;

            for (var i = 1; i <= XMLArray[4]; i++)//Loop through the XML TERRITORIES nodes
            {
                var textNode1 = document.createTextNode(i); //Create a TextNode
                appendToSelect(ob4, i, textNode1); //Call appendToSelect to append the text elements to the Territory dropdown
                var textNode2 = document.createTextNode(i); //Create a TextNode
                appendToSelect(ob5, i, textNode2); //Call appendToSelect to append the text elements to the Territory dropdown
            }

            if (XMLArray.length == 245) {
                for (var i = 5; i < 245; i++)//Loop through the XML TERRITORIES nodes
                {
                    var textNode1 = document.createTextNode(XMLArray[i]); //Create a TextNode
                    appendToSelect(ob3, i, textNode1); //Call appendToSelect to append the text elements to the Territory dropdown
                }
            }
            else {
                for (var i = 1; i <= XMLArray[5]; i++)//Loop through the XML TERRITORIES nodes
                {
                    var textNode1 = document.createTextNode(i); //Create a TextNode
                    appendToSelect(ob3, i, textNode1); //Call appendToSelect to append the text elements to the Territory dropdown
                }
            }

            Juz = ob1.options[ob1.selectedIndex].value;
            Sura = ob2.options[ob2.selectedIndex].value;

            UpdateTra(1);
            UpdateTra(2);
        }
        else {
            alert("Error! in retrieval of data...");
            return;
        }
    }
    else if (ObName == "CmbSura") {
        if (XMLArray.length == 6 || XMLArray.length == 245) {
            clearSelect(ob3);
            clearSelect(ob4);
            clearSelect(ob5);
            ob1.selectedIndex = XMLArray[0];
            ob3.selectedIndex = XMLArray[1];
            Hizb = XMLArray[1];
            FVer = XMLArray[2];
            TVer = XMLArray[3];
            PosVe = parseInt(FVer) + 1;

            for (var i = 1; i <= XMLArray[4]; i++)//Loop through the XML TERRITORIES nodes
            {
                var textNode1 = document.createTextNode(i); //Create a TextNode
                appendToSelect(ob4, i, textNode1); //Call appendToSelect to append the text elements to the Territory dropdown
                var textNode2 = document.createTextNode(i); //Create a TextNode
                appendToSelect(ob5, i, textNode2); //Call appendToSelect to append the text elements to the Territory dropdown
            }

            if (XMLArray.length == 245) {
                for (var i = 5; i < 245; i++)//Loop through the XML TERRITORIES nodes
                {
                    var textNode1 = document.createTextNode(XMLArray[i]); //Create a TextNode
                    appendToSelect(ob3, i, textNode1); //Call appendToSelect to append the text elements to the Territory dropdown
                }
            }
            else {
                for (var i = 1; i <= XMLArray[5]; i++)//Loop through the XML TERRITORIES nodes
                {
                    var textNode1 = document.createTextNode(i); //Create a TextNode
                    appendToSelect(ob3, i, textNode1); //Call appendToSelect to append the text elements to the Territory dropdown
                }
            }
            Juz = ob1.options[ob1.selectedIndex].value;
            Sura = ob2.options[ob2.selectedIndex].value;
            UpdateTra(1);
            UpdateTra(2);
        }
        else {
            alert("Error! in retrieval of data...");
            return;
        }
    }
    else if (ObName == "CmbScript") {
        if (XMLArray.length == 2) {
            clearSelect(ob3);
            for (var i = 1; i <= XMLArray[0]; i++)//Loop through the XML TERRITORIES nodes
            {
                var textNode1 = document.createTextNode(i); //Create a TextNode
                appendToSelect(ob3, i, textNode1); //Call appendToSelect to append the text elements to the Territory dropdown
            }

            Hizb = XMLArray[1];
            UpdateTra('5');
            Hizb = XMLArray[1];
        }
        else if (XMLArray.length == 241) {
            clearSelect(ob3);
            for (var i = 0; i < 240; i++)//Loop through the XML TERRITORIES nodes
            {
                var textNode1 = document.createTextNode(XMLArray[i]); //Create a TextNode
                appendToSelect(ob3, i, textNode1); //Call appendToSelect to append the text elements to the Territory dropdown
            }

            Hizb = XMLArray[240];
            UpdateTra('5');
            Hizb = XMLArray[240];
        }
        else {
            alert("Error! in retrieval of data...");
            return;
        }
    }
    else if (ObName == "CmbHizb") {
        if (XMLArray.length == 5) {
            clearSelect(ob4);
            clearSelect(ob5);
            ob1.selectedIndex = XMLArray[0];
            ob2.selectedIndex = XMLArray[1];
            FVer = XMLArray[2];
            TVer = XMLArray[3];
            PosVe = parseInt(FVer) + 1;

            for (var i = 1; i <= XMLArray[4]; i++)//Loop through the XML TERRITORIES nodes
            {
                var textNode1 = document.createTextNode(i); //Create a TextNode
                appendToSelect(ob4, i, textNode1); //Call appendToSelect to append the text elements to the Territory dropdown
                var textNode2 = document.createTextNode(i); //Create a TextNode
                appendToSelect(ob5, i, textNode2); //Call appendToSelect to append the text elements to the Territory dropdown
            }

            Juz = ob1.options[ob1.selectedIndex].value;
            Sura = ob2.options[ob2.selectedIndex].value;
            Hizb = ob3.selectedIndex;
            setTimeout('ob4.selectedIndex=FVer;', 5);
            setTimeout('ob5.selectedIndex=TVer;', 5);

            UpdateTra(1);
            UpdateTra(2);
        }
        else if (XMLArray.length == 3) {
            ob1.selectedIndex = XMLArray[0];
            FVer = XMLArray[1];
            if (ob5.length - 1 > XMLArray[2])
                TVer = XMLArray[2];
            else
                TVer = ob5.length - 1;
            PosVe = parseInt(FVer) + 1;

            Juz = ob1.options[ob1.selectedIndex].value;
            Sura = ob2.options[ob2.selectedIndex].value;
            Hizb = ob3.selectedIndex;
            setTimeout('ob4.selectedIndex=FVer;', 5);
            setTimeout('ob5.selectedIndex=TVer;', 5);

            UpdateTra(1);
            UpdateTra(2);
        }
        else {
            alert("Error! in retrieval of data...");
            return;
        }
    }
    else if (ObName == "CSuraStart") {
        if (XMLArray.length == 1) {
            if (ob4.options[ob4.selectedIndex].value != XMLArray[0]) {
                LogUsrStart = 0;
                alert("This action will NOT track your reading. To track your progress you will need to read a Sura/Chapter continuously from start to finish.  Skipping verses or reading out of order will NOT track your progress. ");
                //QNext();
            }
        }
        else {
            alert("Error! in retrieval of data...");
            return;
        }
    }
    else if (ObName == "CSuraStop") {
        if (XMLArray.length == 7) {
            LogUsrStop = 0;
            var obl_TStatus;
            var ob1_TrackComp;
            var ob1_RedBarFVal;
            var ob1_GrayBarFVal;
            var ob1_GreenBarFVal;
            var ob1_lblTrGrText;
            var ob1_lblTrReText;
            var ob1_CallFromPro;

            obl_TStatus = document.getElementById("lblTStatus");
            ob1_CallFromPro = document.getElementById("htdCallFromPro");

            ob1_RedBarFVal = document.getElementById("htdRedBarFVal")
            ob1_GrayBarFVal = document.getElementById("htdGrayBarFVal")
            ob1_GreenBarFVal = document.getElementById("htdGreenBarFVal")

            ob1_TrackComp = document.getElementById("htdUTarComp");
            ob1_lblTrGrText = document.getElementById("htdTrGrText");
            ob1_lblTrReText = document.getElementById("htdTrReText");

            ob1_CallFromPro.value = "0";
            ob1_TrackComp.value = XMLArray[0];
            obl_TStatus.innerHTML = XMLArray[1];
            ob1_RedBarFVal = XMLArray[2];
            ob1_GrayBarFVal = XMLArray[3];
            ob1_GreenBarFVal = XMLArray[4];
            ob1_lblTrGrText.value = XMLArray[5];
            ob1_lblTrReText.value = XMLArray[6];
        }
        else if (XMLArray.length == 1) {
            LogUsrStop = 0;
        }
        else {
            alert("Error! in retrieval of data...");
            return;
        }

        if (NextfromAudio == "1" && ob2.selectedIndex < (ob2.length - 1) || (ob2.selectedIndex == (ob2.length - 1) && ob5.selectedIndex < (ob5.length - 1))) {
            NextfromAudio = "0";
            StartPro("BtnNext");
        }
        else if (NextfromAudio == "1") {
            NextfromAudio = "0";
            alert("This is the last sura...");
            return;
        }
    }
    else if (ObName == "Verse") {
        if (XMLArray.length == 2) {
            ob1.selectedIndex = XMLArray[0];
            ob3.selectedIndex = XMLArray[1];
            Juz = ob1.options[ob1.selectedIndex].value;
            Hizb = ob3.selectedIndex;
        }
        else {
            alert("Error! in retrieval of data...");
            return;
        }
    }
    else if (ObName == "MailScript") {
        Juz = Juz;
    }
    else if (ObName == "BtnNext" || ObName == "BtnBack") {
        if (XMLArray.length == 5) {
            ob1.selectedIndex = XMLArray[4];
            ob2.selectedIndex = XMLArray[3];
            Hizb = XMLArray[2];
            TVer = XMLArray[1];
            FVer = XMLArray[0];
            PosVe = parseInt(FVer) + 1;
            Juz = ob1.options[ob1.selectedIndex].value;
            Sura = ob2.options[ob2.selectedIndex].value;
            ob4.selectedIndex = FVer;
            ob5.selectedIndex = TVer;
            UpdateTra(1);
            UpdateTra(2);
        }
        else if (XMLArray.length == 6) {
            clearSelect(ob4);
            clearSelect(ob5);
            ob1.selectedIndex = XMLArray[4];
            ob2.selectedIndex = XMLArray[3];
            Hizb = XMLArray[2];
            TVer = XMLArray[1];
            FVer = XMLArray[0];
            PosVe = parseInt(FVer) + 1;

            for (var i = 1; i <= XMLArray[5]; i++)//Loop through the XML TERRITORIES nodes
            {
                var textNode1 = document.createTextNode(i); //Create a TextNode
                appendToSelect(ob4, i, textNode1); //Call appendToSelect to append the text elements to the Territory dropdown
                var textNode2 = document.createTextNode(i); //Create a TextNode
                appendToSelect(ob5, i, textNode2); //Call appendToSelect to append the text elements to the Territory dropdown
            }
            Juz = ob1.options[ob1.selectedIndex].value;
            Sura = ob2.options[ob2.selectedIndex].value;
            UpdateTra(1);
            UpdateTra(2);
        }
        else if (XMLArray.length == 7) {
            clearSelect(ob3);
            clearSelect(ob4);
            clearSelect(ob5);
            ob1.selectedIndex = XMLArray[4];
            ob2.selectedIndex = XMLArray[3];
            Hizb = XMLArray[2];
            TVer = XMLArray[1];
            FVer = XMLArray[0];
            PosVe = parseInt(FVer) + 1;

            for (var i = 1; i <= XMLArray[5]; i++)//Loop through the XML TERRITORIES nodes
            {
                var textNode1 = document.createTextNode(i); //Create a TextNode
                appendToSelect(ob4, i, textNode1); //Call appendToSelect to append the text elements to the Territory dropdown
                var textNode2 = document.createTextNode(i); //Create a TextNode
                appendToSelect(ob5, i, textNode2); //Call appendToSelect to append the text elements to the Territory dropdown
            }
            for (var i = 1; i <= XMLArray[6]; i++)//Loop through the XML TERRITORIES nodes
            {
                var textNode1 = document.createTextNode(i); //Create a TextNode
                appendToSelect(ob3, i, textNode1); //Call appendToSelect to append the text elements to the Territory dropdown
            }

            Juz = ob1.options[ob1.selectedIndex].value;
            Sura = ob2.options[ob2.selectedIndex].value;
            UpdateTra(1);
            UpdateTra(2);
        }
        else {
            alert("Error! in retrieval of data...");
            return;
        }
    }
}

function appendToSelect(select, value, content) {
    var opt;
    opt = document.createElement("option"); //Create an Element of type option
    opt.value = value; //Set the option's value

    opt.appendChild(content); //Attach the text content to the option
    select.appendChild(opt);
}
        
function Increment(par_index) {
    if (par_index == 1 && parseInt($('#txteverse').attr('value')) < 99)
        $('#txteverse').attr('value', parseInt($('#txteverse').attr('value')) + 1);
    else if (par_index == 2 && parseInt($('#txtaverse').attr('value')) < 99)
        $('#txtaverse').attr('value', parseInt($('#txtaverse').attr('value')) + 1);
    else if (par_index == 3 && parseInt($('#txtwait').attr('value')) < 99 && $('#txtwait').is(':disabled') == false)
        $('#txtwait').attr('value', parseInt($('#txtwait').attr('value')) + 1);

    UpdValue(par_index);
}

function Decrement(par_index) {
    if (par_index == 1 && parseInt($('#txteverse').attr('value')) > 1)
        $('#txteverse').attr('value', parseInt($('#txteverse').attr('value')) - 1);
    else if (par_index == 2 && parseInt($('#txtaverse').attr('value')) > 1)
        $('#txtaverse').attr('value', parseInt($('#txtaverse').attr('value')) - 1);
    else if (par_index == 3 && parseInt($('#txtwait').attr('value')) > 1 && $('#txtwait').is(':disabled') == false)
        $('#txtwait').attr('value', parseInt($('#txtwait').attr('value')) - 1);

    UpdValue(par_index);
}

function CHModal() {
    //$find("ModalPopupExtender1")._show();
    alert("Your reading would not be tracked if you have the “Auto play next Surah” option enabled in the option menu.");
}

function clearSelect(select) {
    select.options.length = 0; //Set the select box's length to 1 so only "--Select--" is availale in the selection on calling this function.
    //You may want to write your own clearSelect logic
}

function LoadMeMP() {
    if ($('#RdoTra')[0].checked == true) {
        $('#RdoQuran').attr('disabled', 'false');
        $('#RdoJuz').attr('disabled', 'false');
        $('#RdoSura').attr('disabled', 'false');
        $('#RdoVerse').attr('disabled', 'false');
        tblQuran.className = "ddl";
        tblJuz.className = "ddl";
        tblSura.className = "ddl";
        tblVerse.className = "ddl";
        tblTra.className = "ddl";
        var TransMP;
        TransMP = document.getElementById("CmbTransMP")
        TransMP.disabled = false;
    }
    else {
        $('#RadioQuran').attr('disabled', 'true');
        $('#RdoJuz').attr('disabled', 'true');
        $('#RdoSura').attr('disabled', 'true');
        $('#RdoVerse').attr('disabled', 'true');

        tblQuran.className = "ddlG";
        tblJuz.className = "ddlG";
        tblSura.className = "ddlG";
        tblVerse.className = "ddlG";
        tblTra.className = "ddlG";
        var TransMP;
        TransMP = document.getElementById("CmbTransMP")
        TransMP.disabled = true;
    }
}

function onOk_Pan2() {
    try {
        UpdateFlash();

        var ob1_selColorFP = document.getElementById('selColorFP');
        if (FGColor != ob1_selColorFP.options[ob1_selColorFP.selectedIndex].value) {
            if (TVer != ob5.selectedIndex)
                return;
            FGColor = ob1_selColorFP.options[ob1_selColorFP.selectedIndex].value;

            if (ob6.selectedIndex > 0)
                parent.frmTran1.ForeGroundCol(ob4, ob5, ob2.selectedIndex + 1, $('#lblstatus').attr('value'), FGColor, ob10.options[ob10.selectedIndex].value, 1);
            if (ob10.selectedIndex > 0)
                parent.frmTran2.ForeGroundCol(ob4, ob5, ob2.selectedIndex + 1, $('#lblstatus').attr('value'), FGColor, ob10.options[ob10.selectedIndex].value, 2);
            if (ob6.options[ob6.selectedIndex].value == "Eng-Mufti-Taqi-Usmani-Audio")
                parent.frmTafs.ForeGroundCol(ob4, ob5, ob2.selectedIndex + 1, $('#lblstatus').attr('value'), FGColor, ob10.options[ob10.selectedIndex].value, 3);
        }
        SetColorVar();
        disablePopup(1);

    }
    catch (e) {
        e = "";
    }
}

function onOk_Pan6() {
    try {
        disablePopup(3);
        $('#txtBRSummary').attr('value', '');
        $('#txtBREmail').attr('value', '');
        $('#txtBRComments').attr('value', '');
        $('#cmbBugTyp').attr('selectedIndex', '0');

        var obBRSE;
        obBRSE = document.getElementById("lblSubmitBugR");
        obBRSE.innerHTML = "";


    }
    catch (e) {
        e = "";
    }
}

function UpdValue(task) {
    if (task == 1) {
        if (parseInt($('#txteverse').attr('value')) <= 0)
            Adv_Pan_EVer = 1;
        else
            Adv_Pan_EVer = parseInt($('#txteverse').attr('value'));
    }
    else if (task == 2) {
        if (parseInt($('#txtaverse').attr('value')) <= 0)
            Adv_Pan_AVer = 1;
        else
            Adv_Pan_AVer = parseInt($('#txtaverse').attr('value'));
    }
    else if (task == 3) {
        if (parseInt($('#txtwait').attr('value')) <= 0)
            Adv_Pan_Wait = 0;
        else
            Adv_Pan_Wait = parseInt($('#txtwait').attr('value'), 10);
    }
    else if (task == 4) {
        if ($('#ChkAPS')[0].checked == true)
            Adv_Pan_Sura = 1;
        else
            Adv_Pan_Sura = 0;
    }
    else if (task == 5) {
        if ($('#ChkAPR')[0].checked == true)
            Adv_Pan_Rang = 1;
        else
            Adv_Pan_Rang = 0;
    }
    else if (task == 6) {
        if ($('#ChkABM')[0].checked == true)
            Adv_Pan_Book = 1;
        else
            Adv_Pan_Book = 0;
    }
    else if (task == 7) {
        var size;
        if (ACCT == 0) {
            ACCT = 1;

            $('#frmTran1').height($('#frmTran1').height() - $('#frmTran3').height());
            $('#frmTran2').height($('#frmTran2').height() - $('#frmTran3').height());

            $('#frmTran3').css('display', 'block');
            $('#Img2').attr('src', 'Images/color_off.gif');  //color_on.gif
            $('#Img2').attr('alt', 'Tajweed Rules');

            setTimeout("Update_Timer();", 100);
        }
        else {
            ACCT = 0;
                    
            $('#frmTran1').height($('#frmTran1').height() + $('#frmTran3').height());
            $('#frmTran2').height($('#frmTran2').height() + $('#frmTran3').height());
                    
            $('#frmTran3').css('display', 'none');
            $('#Img2').attr('src', 'Images/color_on.gif'); //color_off.gif
            $('#Img2').attr('alt', 'Tajweed Rules');

            setTimeout("Update_Timer();", 100);
        }
    }
}

function Update_Timer() {
    var FGAlt;
    FGAlt = FGColor.substring(1, 7);
    if (ob10.options[ob10.selectedIndex].value != "Hide")
        frmTran2.location = "Translation.aspx?Page=2&Sura=" + Sura + "&Juz=" + Juz + "&Hizb=" + Hizb + "&FVer=" + FVer + "&TVer=" + TVer + "&RName=" + RName + "&USize=" + USize + "&ESize=" + ESize + "&FGColor=" + FGAlt + "&Script=" + ob10.options[ob10.selectedIndex].value + "&ACCT=" + ACCT;
    else
        frmTran2.location = "htmlpage.htm";
}

function popup(name, width, height) {
    var options = "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,width=" + width + ",height=" + height;
    QE = window.open(name, "popup", options);
}

function popupex(name, width, height) {
    var URL;
    var ValSu;
    var ValFv;
    var ValTv;
    var Taj_Ru;

    if (ACCT == 0)
        Taj_Ru = "Off";
    else
        Taj_Ru = "On";

    ValSu = parseInt(ob2.selectedIndex, 0) + 1;
    ValFv = parseInt(ob4.selectedIndex, 0) + 1;
    ValTv = parseInt(ob5.selectedIndex, 0) + 1;

    URL = "http://www.quranexplorer.com/quran?Sura=" + ValSu + "&FromVerse=" + ValFv + "&ToVerse=" + ValTv + "&Script=" + ob10.options[ob10.selectedIndex].value + "&Reciter=" + ob8.options[ob8.selectedIndex].value + "&Translation=" + ob6.options[ob6.selectedIndex].value + "&TajweedRules=" + Taj_Ru + "&Zoom=" + USize;
    window.open(URL);
}

function LoadKhatamQuranDua() {
    loadPopup(8);
}

function PanLoadProgUpd() {
    var ob1_TGreen = 0;
    var ob1_TGray = 0;
    var ob1_TRed = 0;
    var obl_PTitle;
    var obl_TStatus;
    var ob1_TrackComp;
    var ob1_imgGreenBar;
    var ob1_imgRedBar;
    var ob1_imgGrayBar;
    var ob1_UTarDate;
    var ob1_txtTargetDate;
    var ob1_btnTrack;
    var ob1_btnRTrack;
    var ob1_lblTrGrText;
    var ob1_lblTrReText;
    var ob1_htdTrGrText;
    var ob1_htdTrReText;
    var ob1_CallFromPro;
    var ob1_UTrackStart;
    var ob1_RedBarFVal;
    var ob1_GrayBarFVal;
    var ob1_GreenBarFVal;


    obl_TStatus = document.getElementById("lblTStatus");
    obl_PTitle = document.getElementById("lblProTitle");
    ob1_btnTrack = document.getElementById("btnTrack");
    ob1_txtTargetDate = document.getElementById("txtTargetDate");
    ob1_btnRTrack = document.getElementById("btnResetTr");
    ob1_CallFromPro = document.getElementById("htdCallFromPro");
    ob1_lblTrGrText = document.getElementById("lblTrGrText");
    ob1_lblTrReText = document.getElementById("lblTrReText");

    if (ob1_CallFromPro.value == "1") {
        ob1_UTarDate = document.getElementById("htdUTarDatePro")
        ob1_TrackComp = document.getElementById("htdUTarCompPro");
        ob1_htdTrGrText = document.getElementById("htdTrGrTextPro");
        ob1_htdTrReText = document.getElementById("htdTrReTextPro");

        ob1_RedBarFVal = document.getElementById("htdRedBarFValPro")
        ob1_GrayBarFVal = document.getElementById("htdGrayBarFValPro")
        ob1_GreenBarFVal = document.getElementById("htdGreenBarFValPro")

        var ob1_temp1;
        var ob1_temp2;
        var ob1_temp3;
        var ob1_temp4;

        ob1_temp1 = document.getElementById("htdUTarDate")
        ob1_temp2 = document.getElementById("htdUTarComp");
        ob1_temp3 = document.getElementById("htdTrGrText")
        ob1_temp4 = document.getElementById("htdTrReText");

        ob1_temp1.value = ob1_UTarDate.value;
        ob1_temp2.value = ob1_TrackComp.value;

        ob1_temp3.value = ob1_htdTrGrText.value;
        ob1_temp4.value = ob1_htdTrReText.value;
    }
    else {
        ob1_UTarDate = document.getElementById("htdUTarDate")
        ob1_TrackComp = document.getElementById("htdUTarComp");

        ob1_htdTrGrText = document.getElementById("htdTrGrText");
        ob1_htdTrReText = document.getElementById("htdTrReText");

        ob1_RedBarFVal = document.getElementById("htdRedBarFVal")
        ob1_GrayBarFVal = document.getElementById("htdGrayBarFVal")
        ob1_GreenBarFVal = document.getElementById("htdGreenBarFVal")
    }

    ob1_lblTrGrText.innerHTML = ob1_htdTrGrText.value;
    ob1_lblTrReText.innerHTML = ob1_htdTrReText.value;
    $('#txtTargetDate').attr('value', ob1_UTarDate.value);
    obl_PTitle.innerHTML = "Progress";

    ob1_imgGrayBar = document.getElementById("imgGrayBar");
    ob1_imgGreenBar = document.getElementById("imgGreenBar");
    ob1_imgRedBar = document.getElementById("imgRedBar");

    if (ob1_TrackComp.value == "" || ob1_TrackComp.value == "0")
        ob1_TrackComp.value = "0";

    obl_TStatus.innerHTML = ob1_TrackComp.value + "% Complete";
    //ob1_TGreen=parseInt(ob1_TrackComp.value)*3;
    //ob1_TRed=600-parseInt(ob1_TGreen);
    //ob1_TGray=600-parseInt(ob1_TGreen);
    ob1_UTrackStart = document.getElementById("htdUTrackStart");
    //alert(ob1_TGreen)

    if ($('#txtTargetDate').attr('value') == "") {
        ob1_TGray = 600;
        ob1_TGreen = 0;
        ob1_TRed = 0;
        ob1_UTrackStart.value = "0";
        ob1_btnTrack.disabled = false;
        ob1_txtTargetDate.disabled = false;
        ob1_btnRTrack.disabled = true;
    }
    else {
        //ob1_TGray=0;
        ob1_TRed = parseInt(ob1_RedBarFVal.value);
        ob1_TGray = parseInt(ob1_GrayBarFVal.value);
        ob1_TGreen = parseInt(ob1_GreenBarFVal.value);

        ob1_UTrackStart.value = "1";
        ob1_btnTrack.disabled = true;
        ob1_txtTargetDate.disabled = true;
        ob1_btnRTrack.disabled = false;
    }

    ob1_imgGreenBar.width = ob1_TGreen;
    ob1_imgGrayBar.width = ob1_TGray;
    ob1_imgRedBar.width = ob1_TRed;
    ob1_CallFromPro.value = "0";

    loadPopup(5);
}

function PanLoadProgress() {
    disablePopup(5);
    var obl_BookMark;
    var obl_CBookMark;

    obl_BookMark = document.getElementById("htdBookMark");
    obl_CBookMark = document.getElementById("htdCBookMark");

    if (obl_CBookMark.value == "2" && obl_BookMark.value != "") {
        obl_CBookMark.value = "0";
        window.location = obl_BookMark.value;
    }
}

function PanLoadBugReport() {
    var ob1_LG;
    var ob2_LG;
    var ob3_LG;
    var ob4_LG;
    var ob5_LG;
    var ob6_LG;
    var ob7_LG;
    var Taj_Ru;

    loadPopup(3);

    if (ACCT == 0)
        Taj_Ru = "Off";
    else
        Taj_Ru = "On";

    ob1_LG = document.getElementById("lblBRSura");
    ob2_LG = document.getElementById("lblBRVerse");
    ob3_LG = document.getElementById("lblBRScript");
    ob4_LG = document.getElementById("lblBRTR");
    ob5_LG = document.getElementById("lblBRReciter");
    ob6_LG = document.getElementById("lblBRTranslation");
    ob7_LG = document.getElementById("btnSendEmail");

    ob1_LG.innerHTML = ob2.options[ob2.selectedIndex].value;
    ob2_LG.innerHTML = ob4.options[ob4.selectedIndex].value + " - " + ob5.options[ob5.selectedIndex].value;
    ob3_LG.innerHTML = ob10.options[ob10.selectedIndex].value;
    ob4_LG.innerHTML = Taj_Ru;
    ob5_LG.innerHTML = ob8.options[ob8.selectedIndex].value;
    ob6_LG.innerHTML = ob6.options[ob6.selectedIndex].value;
    ob7_LG.disabled = false;
}

function PanLoadLinkGen() {
    var Detail;
    var ob1_LG;
    var ob2_LG;
    var ob3_LG;
    var ob4_LG;
    var ob5_LG;
    var ob6_LG;
    var ob7_LG;
    var Taj_Ru;

    loadPopup(2);

    if (ACCT == 0)
        Taj_Ru = "Off";
    else
        Taj_Ru = "On";

    ob1_LG = document.getElementById("lblSuraLG");
    ob2_LG = document.getElementById("lblVerseLG");
    ob3_LG = document.getElementById("lblScriptLG");
    ob4_LG = document.getElementById("lblColorCodingLG");
    ob5_LG = document.getElementById("lblReciterLG");
    ob6_LG = document.getElementById("lblTranslationLG");

    ob1_LG.innerHTML = ob2.options[ob2.selectedIndex].value;
    ob2_LG.innerHTML = ob4.options[ob4.selectedIndex].value + " - " + ob5.options[ob5.selectedIndex].value;
    ob3_LG.innerHTML = ob10.options[ob10.selectedIndex].value;
    ob4_LG.innerHTML = Taj_Ru;
    ob5_LG.innerHTML = ob8.options[ob8.selectedIndex].value;
    ob6_LG.innerHTML = ob6.options[ob6.selectedIndex].value;

    var URL;
    var ValSu;
    var ValFv;
    var ValTv;

    ValSu = parseInt(ob2.selectedIndex, 0) + 1;
    ValFv = parseInt(ob4.selectedIndex, 0) + 1;
    ValTv = parseInt(ob5.selectedIndex, 0) + 1;

    URL = "http://www.quranexplorer.com/quran?Sura=" + ValSu + "&FromVerse=" + ValFv + "&ToVerse=" + ValTv + "&Script=" + ob10.options[ob10.selectedIndex].value + "&Reciter=" + ob8.options[ob8.selectedIndex].value + "&Translation=" + ob6.options[ob6.selectedIndex].value + "&TajweedRules=" + Taj_Ru + "&Zoom=" + USize;
    Detail = "<!--HTML Link -->\r\n";
    Detail = Detail + '<a href="JavaScript:popup(' + URL + ',800,600)">Quran Explorer - [Sura : ' + ValSu + ', Verse : ' + ValFv + ' - ' + ValTv + ']</a>\r\n\r\n';
    Detail = Detail + "<!--Popup Code-->\r\n";
    Detail = Detail + '    <script type="text/javascript" language="JavaScript">\r\n';
    Detail = Detail + '    <!--\r\n';
    Detail = Detail + '    function popup (name,width,height)\r\n';
    Detail = Detail + '    {\r\n';
    Detail = Detail + '        var options = "toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1,width="+width+",height="+height;\r\n';
    Detail = Detail + '        QE=window.open(name,"popup",options);\r\n';
    Detail = Detail + '    }\r\n';
    Detail = Detail + '    //-->\r\n    </';
    Detail = Detail + 'script>';

    $('#txtDetail').attr('value', Detail);
    Detail = 'Quran Explorer - [Sura : ' + ValSu + ', Verse : ' + ValFv + ' - ' + ValTv + ']';
    $('#txtORLink').attr('value', '<a href="' + URL + '" target="_blank">' + Detail + '</a>');
    ob7_LG = document.getElementById("lblLinkText");
    ob7_LG.innerHTML = Detail;
}
        
        
               
function Ikhfa() {
    document.write('<span class="tooltip"><span class="middle">');
    document.write('<table align="left" border="0" width="322" height="170px" cellspacing="0" cellpadding="0">');
    document.write('<tr>');
    document.write('<td style="width:322; height:22" background="images/snap_top.gif">&nbsp;</td>');
    document.write('</tr>');
    document.write('<tr>');
    document.write('<td background="images/span_bk.gif">');
    document.write('<table cellspacing="0" cellpadding="0" width="300" align="center" border="0">');
    document.write('<tr>');
    document.write('<td valign="middle" align="left" style="width:18px">');
    document.write('<span class="circle_blue" style="display:inline">•</span>');
    document.write('</td>');
    document.write('<td align="left" valign="middle">');
    document.write('<span class="text_eng_head_blue" style="display:inline">Ikhfa</span>');
    document.write('</td>');
    document.write('</tr>');
    document.write('<tr>');
    document.write('<td colspan="2" style="width:100%; height:0%" valign="top" align="left">');
    document.write('<table dir="ltr" cellspacing="0" cellpadding="0" width="299" border="0">');
    document.write('<tr>');
    document.write('<td class="text_urdu_blue" dir="ltr" align="center">');
    document.write('<span class="text_urdu_blue" style="display:inline">ت&nbsp;ث&nbsp;ج&nbsp;د&nbsp;ذ&nbsp;ز&nbsp;س&nbsp;ش&nbsp;ص&nbsp;ض&nbsp;ط&nbsp;ظ&nbsp;ف&nbsp;ق&nbsp;ك</span>');
    document.write('</td>');
    document.write('</tr>');
    document.write('<tr>');
    document.write('<td align="left">');
    document.write('<table id="table1" cellspacing="0" cellpadding="0" width="100%" border="0">');
    document.write('<tr>');
    document.write('<td style="width: 40%">');
    document.write('<span class="text_eng" style="display:inline">appear after a</span>');
    document.write('<span class="text_urdu_plan" style="display:inline">&nbspنُ&nbsp;</span>');
    document.write('<span class="text_eng" style="display:inline">or&nbsp;</span>');
    document.write('</td>');
    document.write('<td style="width: 40%">');
    document.write('<img height="21" src="images/word.gif" width="100" border="0" alt="" />');
    document.write('</td>');
    document.write('<td style="width: 20%">');
    document.write('<span class="text_eng" style="display:inline">it will be</span>');
    document.write('</td>');
    document.write('</tr>');
    document.write('<tr>');
    document.write('<td colspan="3">');
    document.write('<span class="text_eng" style="display:inline">pronounced with a light nasal sound.<br /></span>');
    document.write('</td>');
    document.write('</tr>');
    document.write('</table>');
    document.write('</td>');
    document.write('</tr>');
    document.write('</table>');
    document.write('</td>');
    document.write('</tr>');
    document.write('</table>');
    document.write('</td>');
    document.write('</tr>');
    document.write('<tr>');
    document.write('<td style="background-color:Transparent">');
    document.write('<img border="0" src="images/span__botbk.gif" alt="" />');
    document.write('</td>');
    document.write('</tr>');
    document.write('</table>')
    document.write('</span></span>');
}

function IkhfaMeemSaakin() {
    document.write('<span class="tooltip1"><span class="middle">');
    document.write('<table border="0" cellspacing="0" height="160px" align="center" cellpadding="0" width="300">');
    document.write('<tr>');
    document.write('<td style="height:21; width:322" background="images/snap_top.gif">&nbsp;</td>');
    document.write('</tr>');
    document.write('<tr>');
    document.write('<td background="images/span_bk.gif" style="height:100%">');
    document.write('<div align="center">');
    document.write('<table cellspacing="0" cellpadding="0" style="height:100%" width="95%" border="0">');
    document.write('<tr>');
    document.write('<td valign="middle" width="18px" align="center">');
    document.write('<span class="circle_pink" style="display:inline">•</span>');
    document.write('</td>');
    document.write('<td align="left" valign="middle">');
    document.write('<span class="text_eng_head_pink" style="display:inline">Ikhfa Meem Saakin</span>');
    document.write('</td>');
    document.write('</tr>');
    document.write('<tr>');
    document.write('<td colspan="2" align="left" valign="top" style="width:100%; height:0%">');
    document.write('<table dir="ltr" cellspacing="0" cellpadding="0" width="95%" border="0">');
    document.write('<tr>');
    document.write('<td class="text_eng" align="left">');
    document.write('<table border="0" width="100%" cellspacing="0" cellpadding="0">');
    document.write('<tr>');
    document.write('<td class="text_eng" align="left" height="28">When the letter <span class="text_urdu_pink" style="display:inline">ب</span> ');
    document.write('apperars after a <span class="text_urdu_pink" style="display:inline">مَ</span> ');
    document.write('it will be pronounced with a light sound in the nose</td>');
    document.write('</tr>');
    document.write('</table>');
    document.write('</td>');
    document.write('</tr>');
    document.write('</table>');
    document.write('</td>');
    document.write('</tr>');
    document.write('</table>');
    document.write('</div>');
    document.write('</td>');
    document.write('</tr>');
    document.write('<tr>');
    document.write('<td>');
    document.write('<img border="0" src="images/span__botbk.gif" alt="" /></td>');
    document.write('</tr>');
    document.write('</table>');
    document.write('</span></span>');
}

function Qalqala() {
    document.write('<span class="tooltip2"><span class="middle">');
    document.write('<table border="0" align="center" height = "190px" cellspacing="0" cellpadding="0" width="200">');
    document.write('<tr><td style="height:21; width:322" background="images/snap_top.gif">&nbsp;</td></tr>');
    document.write('<tr><td background="images/span_bk.gif">');
    document.write('<div align="center">');
    document.write('<table cellspacing="0" cellpadding="0" width="95%" border="0">');
    document.write('<tr><td valign="middle" width="18px" align="left">');
    document.write('<span class="circle_red" style="display:inline">•</span></td>');
    document.write('<td align="left" valign="middle"><span class="text_eng_head_red" style="display:inline">Qalqala</span>');
    document.write('</td></tr><tr><td colspan="2" align="left" valign="top" style="width:100%; height:0%">');
    document.write('<table dir="ltr" align="left" cellspacing="0" cellpadding="0" width="93%" border="0">');
    document.write('<tr><td class="text_eng" align="left" style="height:0%">The five letters of Qalqala are<span class="text_urdu_red" style="display:inline"> ');
    document.write('ق ط ب ج د</span></td></tr><tr><td class="text_eng" style="height:0%">When any of these letters in a word has ');
    document.write('a Sukoon on it or if deciding on pausing on any of these ');
    document.write('letters which appear at the end of a sentence it will ');
    document.write('appear to have an echoing or jerking sound. </td>');
    document.write('</tr></table></td></tr></table></div><br /></td></tr>');
    document.write('<tr><td><img border="0" src="images/span__botbk.gif" alt="" /></td></tr>');
    document.write('</table>');
    document.write('</span></span>');
}

function Qalb() {
    document.write('<span class="tooltip3"><span class="middle">');
    document.write('<table border="0" align="center" height="190px" cellspacing="0" cellpadding="0" width="200"><tr>');
    document.write('<td style="height:21; width:322" background="images/snap_top.gif">&nbsp;</td></tr>');
    document.write('<tr><td background="images/span_bk.gif"><div align="center">');
    document.write('<table cellspacing="0" cellpadding="0" width="95%" border="0">');
    document.write('<tr><td valign="middle" width="18px" align="left"><span class="circle_purple" style="display:inline">•</span></td>');
    document.write('<td align="left" valign="middle"><span class="text_eng_head_purple" style="display:inline">Qalb</span></td></tr>');
    document.write('<tr><td colspan="2" align="center" valign="top" style="width:100%; height:0%">');
    document.write('<table dir="ltr" align="left" cellspacing="0" cellpadding="0" width="93%" border="0">');
    document.write('<tr><td><table border="0" width="100%" id="table8" cellspacing="0" cellpadding="0" height="0%">');
    document.write('<tr><td class="text_eng" align="left" style="width:25%">If after a <span class="text_urdu_purple">نُ</span> or </td>');
    document.write('<td class="text_eng" style="width:30%"><img src="images/word.gif" width="100" height="21" border="0" alt="" /></td>');
    document.write('<td class="text_eng" style="width:40%">&nbsp;the letter <span class="text_urdu_purple" style="display:inline">ب</span> appears</td>');
    document.write('</tr><tr><td class="text_eng" style="height: 20px" align="left" valign="top" colspan="3">then the Noon Saakin or ');
    document.write('Tanween will be incorporated into the letter <strong><span class="text_urdu_purple" style="display:inline">م</span></strong> an will be recited with Ghunna.<br />&nbsp;</td>');
    document.write('</tr></table></td></tr></table></td></tr></table></div></td></tr><tr>');
    document.write('<td><img border="0" src="images/span__botbk.gif" alt="" /></td>');
    document.write('</tr></table>');
    document.write('</span></span>');
}

function Idghaam() {
    document.write('<span class="tooltip4"><span class="middle">');
    document.write('<table border="0" style="height:180px" align="center" cellspacing="0" cellpadding="0" width="200">');
    document.write('<tr><td style="height:21; width:322" background="images/snap_top.gif">&nbsp;</td>');
    document.write('</tr><tr><td background="images/span_bk.gif"><div align="center">');
    document.write('<table cellspacing="0" cellpadding="0" width="95%" style="height:100%" border="0">');
    document.write('<tr><td valign="middle" width="18px" style="height:0%" align="left"><span class="circle_green" style="display:inline">•</span></td>');
    document.write('<td align="left" style="height:0%" valign="middle"><span class="text_eng_head_green" style="display:inline">Idghaam</span></td></tr><tr>');
    document.write('<td colspan="2" align="center" valign="top" style="width:100%; height:0%">');
    document.write('<table dir="ltr" align="left" cellspacing="0" cellpadding="0" width="93%" border="0" style="height:0%">');
    document.write('<tr><td align="left" style="height:0%" valign="middle">');
    document.write('<table align="left" class="text_eng" border="0" width="100%" style="height:0%" cellspacing="0" cellpadding="0">');
    document.write('<tr><td width="25%" valign="middle" class="text_eng" style="height:0%">If after a <span class="text_urdu_plan" style="display:inline">نُ</span> or </td>');
    document.write('<td width="33%" style="height:0%">&nbsp;<img src="images/word.gif" width="100" height="21" border="0" alt="" /></td>');
    document.write('<td width="30%" class="text_eng" style="height:0%">there appear any</td></tr>');
    document.write('<tr><td colspan="3" valign="top" align="left" class="text_eng" style="height:0%">of these letters <span class="text_urdu_green" style="display:inline">');
    document.write('(ي&nbsp;ن&nbsp;م&nbsp;و)</span>  it will become assimilated</td>');
    document.write('</tr><tr><td colspan="3" align="left" valign="middle" style="height:0%" class="text_eng">into the letterand will be read with Ghunna.</td>');
    document.write('</tr></table></td></tr></table></td></tr></table></div></td></tr>');
    document.write('<tr><td><img border="0" src="images/span__botbk.gif" alt="" /></td></tr></table>');
    document.write('</span></span>');
}

function IdghaamMeemSaakin() {
    document.write('<span class="tooltip5"><span class="middle">');
    document.write('<table align="center" border="0" style="height:170px" cellspacing="0" cellpadding="0" width="280">');
    document.write('<tr><td style="height:21; width:322" background="images/snap_top.gif">&nbsp;</td>');
    document.write('</tr><tr><td background="images/span_bk.gif"><div align="center">');
    document.write('<table cellspacing="0" style="height:100%" cellpadding="0" width="95%" border="0">');
    document.write('<tr><td valign="middle" width="18px" align="left">');
    document.write('<span class="circle_ygreen" style="display:inline">•</span>');
    document.write('</td><td valign="middle" align="left"><span class="text_eng_head_ygreen" style="display:inline">Idghaam Meem Saakin</span>');
    document.write('</td></tr><tr><td colspan="2" align="left" valign="top" style="width:100%; height:45px">');
    document.write('<table dir="ltr" cellspacing="0" cellpadding="0" border="0">');
    document.write('<tr><td class="text_eng" align="left">If after a <span class="text_urdu_ygreen" style="display:inline">مُ</span> there appear another <span class="text_urdu_ygreen" style="display:inline">مَ</span> the two meems will <br />become incorporated and will be read with Ghunna.');
    document.write('</td></tr></table></td></tr></table></div></td></tr><tr>');
    document.write('<td><img border="0" src="images/span__botbk.gif" alt="" /></td>');
    document.write('</tr></table>');
    document.write('</span></span>');
}

function Ghunna() {
    document.write('<span class="tooltip6"><span class="middle">');
    document.write('<table align="center" border="0" style="height:170px" cellspacing="0" cellpadding="0" width="280">');
    document.write('<tr><td style="height:21; width:322" background="images/snap_top.gif">&nbsp;</td>');
    document.write('</tr><tr><td background="images/span_bk.gif"><div align="center">');
    document.write('<table cellspacing="0" style="height:100%" cellpadding="0" width="95%" border="0">');
    document.write('<tr><td valign="middle" width="18px" align="left">');
    document.write('<span class="circle_orange" style="display:inline">•</span>');
    document.write('</td><td valign="middle" align="left"><span class="text_eng_head_orange" style="display:inline">Ghunna</span>');
    document.write('</td></tr><tr><td colspan="2" align="left" valign="top" style="width:100%; height:45px">');
    document.write('<table dir="ltr" cellspacing="0" cellpadding="0" border="0">');
    document.write('<tr><td class="text_eng" align="left">The sound emanates from the nose is observed on the <br /><span class="text_urdu_orange" style="display:inline">نُ</span> & <span class="text_urdu_orange" style="display:inline">مَ</span>');
    document.write('</td></tr></table></td></tr></table></div></td></tr><tr>');
    document.write('<td><img border="0" src="images/span__botbk1.gif" alt="" /></td>');
    document.write('</tr></table>');
    document.write('</span></span>');
}
