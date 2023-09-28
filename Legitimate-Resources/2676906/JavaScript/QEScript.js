$('#emailToggleBtn').click(function (e) {
    e.preventDefault();
    $('#divBookmarkPan').height('315px');
    $('#bookLogReg').slideToggle('slow');
    $('#bookEmail').slideToggle('slow');
    $('#emailToggleBtn').hide();
    $('#backToggleBtn').show();
});
$('#backToggleBtn').click(function (e) {
    e.preventDefault();
    $('#bookLogReg').slideToggle('slow');
    $('#bookEmail').slideToggle('slow');
    $('#emailToggleBtn').show();
    $('#backToggleBtn').hide();
    $('#divBookmarkPan').height('250px');
})

function StoreProfileToken(_token, _userID) {
	var cu = new Date();
	var year = cu.getFullYear() + 1;

	if (typeof (Storage) !== "undefined") {
		localStorage.setItem("QE_ProfileToken", _token + " : " + _userID);
	}
	else if (document.cookie) {
		document.cookie = 'QE_ProfileToken=' + _token + " : " + _userID + '; expires=Thu, 2 Aug ' + year + ' 20:47:11 UTC; path=/'
	}
}

function GetStoredProfileToken() {
    var _data = "";

    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem("QE_ProfileToken")) {
            _data = localStorage.getItem("QE_ProfileToken");
        }
    }
    else if (document.cookie) {
        var _pos = -1;
        var _cookieData = document.cookie.toLowerCase();
        if ((_pos = _cookieData.indexOf("qe_profiletoken=")) > 0) {
            _cookieData = _cookieData.substring(_pos + 16);

            if (_cookieData.indexOf(";") >= 0) {
                _data = _cookieData.substring(0, _cookieData.indexOf(";"));
            }
            else {
                _data = _cookieData;
            }
        }
    }
    return _data;
}

$('#btnBMSaveEM').click(function () {
    var _errCount = 0;

    if ($('#txtBMTitle').val() == "") {
        _errCount += 1;
        $('#lblBMTitle').html('Please enter bookmark title...');
    }

    if (iSvalidateEmail($('#htdUSession').val()) == false) {
        _errCount += 1;
        $('#lblEmailIDBM').html('Please enter valid email address...');
    }

    if (_errCount == 0) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("QEBookMarkEmailID", $('#htdUSession').val());
        }
        SetCustomBookMark($('#htdUSession').val(), 0);
    }
});

$('#btnLoginSubmitBM').click(function () {
    $('#htd_BookMarkPopup').val('1');
    $('#btnLoginSubmitBM').hide();
    $('#imgLoginSubmitBMReg').hide();
    $('#btnLoginSubmitBMReg').hide();
    $('#imgLoginSubmitBM').show();
    $('#txtRUEmail').val($('#txtLoginIDBM').val());
    $('#txtRUPassword').val($('#txtLoginPasswordBM').val());
    $('#btnUSignIn').trigger('click');
});

$('#btnLoginSubmitBML').click(function () {
    $('#htd_BookMarkPopup').val('3');
    $('#btnLoginSubmitBML').hide();
    $('#imgLoginSubmitBML').show();
    $('#txtRUEmail').val($('#txtLoginIDBML').val());
    $('#txtRUPassword').val($('#txtLoginPasswordBML').val());
    $('#btnUSignIn').trigger('click');
});

$('#btnLoginSubmitBMReg').click(function () {
    $('#htd_BookMarkPopup').val('2');
    $('#btnLoginSubmitBM').hide();
    $('#imgLoginSubmitBM').hide();
    $('#btnLoginSubmitBMReg').hide();
    $('#imgLoginSubmitBMReg').show();
    $('#txtNUEmail').val($('#txtLoginIDBMReg').val());
    $('#txtNUPassword').val($('#txtLoginPasswordBMReg').val());
    $('#txtNURPassword').val($('#txtLoginPasswordBMRegRe').val());
    $('#btnUSignUp').trigger('click');
});

$('#btnBMLoginReg').click(function () {
    $('#divBookmarkPan').height('380px');
    ResizePopup();
    $('#div_UOption').slideToggle('slow');
    $('#div_LoginReg').slideToggle('slow');
});

$('#emailBMLToggleBtn').click(function () {
    $('#div_BMLLogin').slideToggle('slow');
    $('#div_EmailBML').slideToggle('slow');
});

$('#backToggleBMLBtn').click(function () {
    $('#secBookMarkResult').html('');
    $('#div_BMLLogin').slideToggle('slow');
    $('#div_EmailBML').slideToggle('slow');
});
$('#applyBtn').click(function () {
    $('#lblBMMsg').html('');
    $("#applyBtn").addClass("active");
    $("#viewBtn").removeClass("active");
    $(".apply-bmk").css("display", 'block');
    $(".view-bmk").css("display", 'none');

    $('#divBMViewOpt').hide();
    $('#divBMApplyOpt').show();

    ApplyBMDisplay();
});
$('#btnBMLoginBML').click(function () {
    $('#div_LoginBML').slideToggle('slow');
    $('#div_BMLLogin').slideToggle('slow');
});
$('#hrfBMLoginOptL').click(function () {
    $('#div_LoginBML').slideToggle('slow');
    $('#div_BMLLogin').slideToggle('slow');
});
$('#viewBtn').click(function () {
    $('#lblBMMsg').html('');
    $('#secBookMarkResult').html('');
    $("#applyBtn").removeClass("active");
    $("#viewBtn").addClass("active");
    $(".apply-bmk").css("display", 'none');
    $(".view-bmk").css("display", 'block');

    var _errCount = 0;
    $('#secBookMarkResult').html('');

    if ($('#htdUSession').val() != "guest-allow@quranexplorer.com") {
        if (iSvalidateEmail($('#htdUSession').val()) == false) {
            _errCount += 1;
            $('#lbl_BML_Notification').html('Please enter valid email address...');
        }

        if (_errCount == 0) {
            $('#div_BMLOpts').hide();
            $('#divBookmarkPan').height('280px');
            GetCustomBookMark($('#htdUSession').val())
        }
    }
    else {
        $('#divBookmarkPan').height('300px');
        $('#div_LoginBML').hide();
        $('#div_BMLLogin').show();
        $('#div_BMLOpts').show();
    }
    
});

$('#btnBMOption').click(function () {
    if ($('#h1BMTitle').html() == "Apply Bookmark") {
        $('#h1BMTitle').html("View Bookmark");
        $('#btnBMOption').val("Apply Bookmark");
        $('#divBMApplyOpt').hide();
        $('#divBMViewOpt').show();

        var _errCount = 0;
        $('#secBookMarkResult').html('');

        if ($('#htdUSession').val() != "guest-allow@quranexplorer.com") {
            $('#txt_BML_Email').val($('#htdUSession').val());
        }
        else if (typeof (Storage) != "undefined") {
            if (localStorage.getItem("QEBookMarkEmailID")) {
                $('#txt_BML_Email').val(localStorage.getItem("QEBookMarkEmailID"));
            }
        }

        if (iSvalidateEmail($('#txt_BML_Email').val()) == false) {
            _errCount += 1;
            $('#lbl_BML_Notification').html('Please enter valid email address...');
        }

        if (_errCount == 0) {
            GetCustomBookMark($('#txt_BML_Email').val())
        }
    }
    else {
        $('#h1BMTitle').html("Apply Bookmark");
        $('#btnBMOption').val("View Bookmark");
        $('#divBMViewOpt').hide();
        $('#divBMApplyOpt').show();


    }
});

$('#hrfBMEmailOpt').click(function () {
    $('#divBookmarkPan').height('250px');
    ResizePopup();
    $('#div_LoginReg').slideToggle('slow');
    $('#div_UOption').slideToggle('slow');
});

$('#btnBMSaveEME').click(function () {
    var _errCount = 0;

    if ($('#txtBMTitle').val() == "") {
        _errCount += 1;
        $('#lblBMTitle').html('Please enter bookmark title...');
    }

    if (iSvalidateEmail($('#txtEmailIDBME').val()) == false) {
        _errCount += 1;
        $('#lblEmailIDBME').html('Please enter valid email address...');
    }

    if (_errCount == 0) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("QEBookMarkEmailID", $('#txtEmailIDBME').val());
        }
        SetCustomBookMark($('#txtEmailIDBME').val(), 1);
    }
});
                
$('#btnBMLGet').click(function () {
    var _errCount = 0;
    $('#secBookMarkResult').html('');

    if (iSvalidateEmail($('#txt_BML_Email').val()) == false) {
        _errCount += 1;
        $('#lbl_BML_Notification').html('Please enter valid email address...');
    }

    if (_errCount == 0) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("QEBookMarkEmailID", $('#txt_BML_Email').val());
        }
        GetCustomBookMark($('#txt_BML_Email').val())
    }
});

function GetCustomBookMark(_emailID) {
    $('#btnBMLGet').hide();
    $('#secBookMarkResult').html('');
    $('#div_BM_Wait').show();

    var varType;
    var _varUrl;
    var varData;
    var varContentType;
    var varDataType;
    var varProcessData;
    var myServiceURL = "http://webservices.quranexplorer.com/QuranExplorer-Portal2-RestFullServices/Service1.svc";

    //myServiceURL = "http://localhost:3891/Service1.svc";
    //_varUrl = myServiceURL + "/SetBookMark/" + WrapString(_emailID) + "/" + WrapString($('#txtBMTitle').val()) + "/" + WrapString($('#cmbScript option:selected').text()) + "/" + WrapString($('#cmbReciter option:selected').text()) + "/" + WrapString($('#cmbTranslation option:selected').text()) + "?jsoncallback=?";
    //_varUrl = myServiceURL + "/SetBookMark/" + WrapString(_emailID) + "/4/2_3_4_0/3/5/9?jsoncallback=?";
    _varUrl = myServiceURL + "/GetBookMark/" + WrapString(_emailID) + "?jsoncallback=?";

    $.ajax({
        type: "GET",
        url: _varUrl,
        cache: false,
        timeout: 15000,
        dataType: "jsonp",
        success: function (_data) {
            var lop = 0;
            var _strRes = "";

            if (_data.length == 1) {
                if (_data == "") {
                    $('#btnBMLGet').show();
                    $('#secBookMarkResult').html(_strRes);
                    $('#div_BM_Wait').hide();
                    return;
                }
            }
            
            while (lop < _data.length) {
                var _tempStr = _data[lop].BookMarkURL.split('/');
                if (_tempStr.length == 7) {
                    _strRes += "<a href='http://www.QuranExplorer.com/Quran/?Sura=" + _tempStr[0] + "&FromVerse=" + _tempStr[1] + "&ToVerse=" + _tempStr[2] + "&Script=" + _tempStr[3] + "&Reciter=" + _tempStr[4] + "&Translation=" + _tempStr[5] + "&TajweedRules=" + _tempStr[6] + "'>" + _data[lop].BookMarkTitle + "</a><br />";
                }
                lop += 1;
            }

            $('#btnBMLGet').show();
            $('#secBookMarkResult').html(_strRes);
            $('#div_BM_Wait').hide();
        },
        //the error method seems to be unavailable until jquery 1.5
        error: function (xhr, ajaxOptions, thrownError) {
            $('#btnBMLGet').show();
            $('#div_BM_Wait').hide();
            $('#secBookMarkResult').html('');
        }
    });
}

function SetCustomBookMark(_emailID, _rType) {
    $('#lblBMMsg').html('');

    $('#pBMSUBtn').hide();
    $('#pBMSUL').show();
    //if (_rType == 0) {
    //    $('#pBMSUBtn').hide();
    //    $('#pBMSUL').show();
    //}
    //else if (_rType == 1) {
    //    $('#pBMSUBtnE').hide();
    //    $('#pBMSULE').show();
    //}

    var varType;
    var _varUrl;
    var varData;
    var varContentType;
    var varDataType;
    var varProcessData;
    var myServiceURL = "http://webservices.quranexplorer.com/QuranExplorer-Portal2-RestFullServices/Service1.svc";

    _varUrl = myServiceURL + "/SetBookMark/" + WrapString(_emailID) + "/" + WrapString($('#htd_BookMarkTitle').val()) + "/" + WrapString($('#htd_BookMarkURL').val()) + "/" + WrapString(ob10.options[ob10.selectedIndex].value) + "/" + WrapString(ob8.options[ob8.selectedIndex].value) + "/" + WrapString(ob6.options[ob6.selectedIndex].value) + "?jsoncallback=?";
		            
    $.ajax({
        type: "GET",
        url: _varUrl,
        cache: false,
        timeout: 15000,
        dataType: "jsonp",
        success: function (_data) {
            $('#pBMSUL').hide();
            $('#pBMSUBtn').show();
            //if (_rType == 0) {
            //    $('#pBMSUL').hide();
            //    $('#pBMSUBtn').show();
            //}
            //else if (_rType == 1) {
            //    $('#pBMSULE').hide();
            //    $('#pBMSUBtnE').show();
            //}
            //else if (_rType == 2) {
            //    $('#imgLoginSubmitBM').hide();
            //    $('#btnLoginSubmitBM').show();
            //}
            //else if (_rType == 3) {
            //    $('#imgLoginSubmitBMReg').hide();
            //    $('#btnLoginSubmitBMReg').show();
            //}            

            if (parseInt(_data.ResponseID, 10) == 1) {
                $('#lblBMMsg').css('color', 'green');
                $('#lblBMMsg').html(_data.ResponseText);
            }
            else {
                $('#lblBMMsg').css('color', 'red');
                $('#lblBMMsg').html(_data.ResponseText);
            }

            $('#txtLoginIDBM').val('');
            $('#txtLoginPasswordBM').val('');
            $('#txtLoginIDBMReg').val('');
            $('#txtLoginPasswordBMReg').val('');
            $('#txtLoginPasswordBMRegRe').val('');
        },
        //the error method seems to be unavailable until jquery 1.5
        error: function (xhr, ajaxOptions, thrownError) {
            if (_rType == 0) {
                $('#pBMSUL').hide();
                $('#pBMSUBtn').show();
            }
            else if (_rType == 1) {
                $('#pBMSULE').hide();
                $('#pBMSUBtnE').show();
            }
            else if (_rType == 2) {
                $('#imgLoginSubmitBM').hide();
                $('#btnLoginSubmitBM').show();
                $('#imgLoginSubmitBMReg').hide();
                $('#btnLoginSubmitBMReg').show();
            }
            else if (_rType == 3) {
                $('#imgLoginSubmitBM').hide();
                $('#btnLoginSubmitBM').show();
                $('#imgLoginSubmitBMReg').hide();
                $('#btnLoginSubmitBMReg').show();
            }
            $('#lblBMMsg').css('color', 'red');
            $('#lblBMMsg').html("Error  " + xhr.status + "    " + thrownError);
        }
    });
}

$('#_DonationBox').click(function () {
    var _url = "https://donations.quranexplorer.com"; //"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=G6TKK7TLUH6VN";
    var _name = "Donate";
    window.open(_url, _name);
});

function panlogoutOKS() {
    $('#htdUSession').val('');
    $('#htdBookMark').val('');
    //window.location="http://localhost:1145/QuranP2/"; 
    window.location = "?Sura=1"; //"http://www.quranexplorer.com/Quran/";
    //window.location="http://www.quranexplorer.com/quran/";
}

function CallOnQELoad() {
    var obl_PTitle;
    var obl_TStatus;
    var ob1_Progress;
    var obl_USession;
    var ob1_TrackComp;
    var obl_BookMark;
    var obl_CBookMark;
    var ob1_CallFromPro;

    obl_PTitle = document.getElementById("lblProTitle");
    obl_TStatus = document.getElementById("lblTStatus");
    obl_USession = document.getElementById("htdUSession");
    ob1_TrackComp = document.getElementById("htdUTarComp");
    obl_BookMark = document.getElementById("htdBookMark");
    ob1_CallFromPro = document.getElementById("htdCallFromPro");
		            
    ob1_CallFromPro.value = "0";
    obl_TStatus.innerHTML = ob1_TrackComp.value + "% Complete";
    obl_PTitle.innerHTML = "Welcome [Email : " + obl_USession.value + "]";
    //alert('jfksjdfkdjfksdjksd');
    if (obl_USession.value == "guest-allow@quranexplorer.com") {
        document.title = "Quran Explorer";
        $('#divLogin').css('display', 'block');
        $('#divProg').css('display', 'none');
    }
    else {
        document.title = "Quran Explorer - [User : " + obl_USession.value + "]";

        $('#divLogin').css('display', 'none');
        $('#divProg').css('display', 'block');
    }

    var _resDonation = $('#htdDonation').val().split(";");

    if (_resDonation[0] != "-1") {
        if (parseInt(_resDonation[0], 10) > 100) {
            $(".bar_box").animate({ width: '100%' }, 2500);
        } else {
            $(".bar_box").animate({ width: _resDonation[0] + '%' }, 2500);
        }
        $('#lblDonationPer').html(_resDonation[0] + '%');
        $('#lblDonationAmt').html('Raised ' + _resDonation[1] + ' of 35,000');
    }
    else {
        $(".bar_box").animate({ width: '0%' }, 2500);
        $('#lblDonationPer').html('0%');
        $('#lblDonationAmt').html('Raised $0.00 of 35,000');
    }
}

Sys.WebForms.PageRequestManager.getInstance().add_endRequest(
function CallOnE(sender, e) {
                      
    if ($('#htd_Pan_RessetSession').val() == "1") {
        $('#htdUSession').val('');
        $('#htdBookMark').val('');
        $('#htd_Pan_RessetSession').val('0');

        $('#imgLoginSubmitBM').hide();
        $('#imgLoginSubmitBMReg').hide();
        $('#btnLoginSubmitBM').show();
        $('#btnLoginSubmitBMReg').show();
        return;
    }

    var obl_htdLogout;
    obl_htdLogout = document.getElementById("htdLogout");

    if (obl_htdLogout.value == "1") {
        obl_htdLogout.value = "";
        panlogoutOKS();
        StoreProfileToken("", $('#htdUSession').val());
        return;
    }
    //alert($('#htd_EmailIDQE').val() + ' hhhhhh');
    //alert($('#htdUSession').val()  + '  kkkkkkkkk');
    if ($('#htd_BookMarkPopup').val() == "1") {
        if ($('#htdLoginError').val() == "1") {
            $('#lblBMMsg').css('color', 'red');
            $('#lblBMMsg').html($('#lblLoginMsg').html());
            Pan_EndRequest();
        }
        else {
            $('#imgLoginSubmitBM').hide();
            $('#btnLoginSubmitBM').show();
            $('#div_LoginReg').hide();
            $('#div_UOption').hide();
            $('#divBookmarkPan').height('200px');
            $('#div_UOptionLoggedIn').show();
            SetCustomBookMark($('#txtLoginIDBM').val(), 2);
            CallOnQELoad();
        }
    }
    else if ($('#htd_BookMarkPopup').val() == "3") {
        if ($('#htdLoginError').val() == "1") {
            $('#lblBMMsg').css('color', 'red');
            $('#lblBMMsg').html($('#lblLoginMsg').html());
            Pan_EndRequest();
        }
        else {
            $('#imgLoginSubmitBML').hide();
            $('#btnLoginSubmitBML').show();
            $('#div_BMLOpts').slideToggle('slow');

            GetCustomBookMark($('#txtLoginIDBML').val());
            CallOnQELoad();
        }
    }
    else if ($('#htd_BookMarkPopup').val() == "2") {
        if ($('#htdLoginError').val() == "1") {
            $('#lblBMMsg').css('color', 'red');
            $('#lblBMMsg').html($('#lblLoginMsg').html());
            Pan_EndRequest();
        }
        else {
            $('#imgLoginSubmitBMReg').hide();
            $('#btnLoginSubmitBMReg').show();
            $('#div_LoginReg').hide();
            $('#div_UOption').hide();
            $('#divBookmarkPan').height('200px');
            $('#div_UOptionLoggedIn').show();

            SetCustomBookMark($('#txtLoginIDBMReg').val(), 3);
            CallOnQELoad();
        }
    }
    else {
        Pan_EndRequest();
    }
});

function Pan_EndRequest() {
    if ($('#chkSkipWelcome')[0].checked)
        PanLoadProgUpd();

    var obl_PTitle;
    var obl_TStatus;
    var obl_USession;
    var obl_BookMark;
    var obl_CBookMark;
    var obl_htdLogout;

    obl_PTitle = document.getElementById("lblProTitle");
    obl_TStatus = document.getElementById("lblTStatus");
    obl_USession = document.getElementById("htdUSession");

    obl_BookMark = document.getElementById("htdBookMark");
    obl_CBookMark = document.getElementById("htdCBookMark");
    obl_htdLogout = document.getElementById("htdLogout");
    //alert($('#htd_BookMarkPopup').val() + "     " + obl_CBookMark.value);

    if ($('#htd_EmailIDQE').val() != "") {
        StoreProfileToken($('#htdProfileToken').val(), obl_USession.value);
        obl_PTitle.innerHTML = "Welcome [Email : " + obl_USession.value + "]";

        if (obl_USession.value == "guest-allow@quranexplorer.com") {
            document.title = "Quran Explorer";
        }
        else {
            document.title = "Quran Explorer - [User : " + obl_USession.value + "]";
            var obl_hypVSG;
            obl_hypVSG = document.getElementById("hypVSG");
            obl_hypVSG.href = "http://www.quranexplorer.com/Report/SuraTrack.aspx?EmailRef=" + obl_USession.value;
        }

        CallOnQELoad();
        UpdateTra(4);
        UpdateTra(5);
        UpdateFlash();
    }
    else if (obl_CBookMark.value == "1") {
        StoreProfileToken($('#htdProfileToken').val(), $('#htdUSession').val());
        if ($('#htd_BookMarkPopup').val() == "1" || $('#htd_BookMarkPopup').val() == "2" || $('#htd_BookMarkPopup').val() == "3")
            disablePopup(7);
        else
            disablePopup(4);

        obl_CBookMark.value = "0";

        if (obl_BookMark.value != "") {
            window.location = obl_BookMark.value;
        }
    }
    else if (obl_CBookMark.value == "2") {
        if ($('#htd_BookMarkPopup').val() == "1" || $('#htd_BookMarkPopup').val() == "2" || $('#htd_BookMarkPopup').val() == "3")
            disablePopup(7);
        else
            disablePopup(4);

        StoreProfileToken($('#htdProfileToken').val(), $('#htdUSession').val());
        obl_PTitle.innerHTML = "Welcome [Email : " + obl_USession.value + "]";

        if (obl_USession.value == "guest-allow@quranexplorer.com") {
            document.title = "Quran Explorer";
        }
        else {
            document.title = "Quran Explorer - [User : " + obl_USession.value + "]";

            var obl_hypVSG;
            obl_hypVSG = document.getElementById("hypVSG");
            obl_hypVSG.href = "http://www.quranexplorer.com/Report/SuraTrack.aspx?EmailRef=" + obl_USession.value;
        }
        alert('asdasdmmmmm');
        loadPopup(5);
    }		            
    else if (obl_htdLogout.value == "1") {
        disablePopup(6);
        $('#divLogin').css('display', 'block');
        $('#divProg').css('display', 'none');
    }

    $('#imgLoginSubmitBM').hide();
    $('#imgLoginSubmitBML').hide();
    $('#imgLoginSubmitBMReg').hide();
    $('#btnLoginSubmitBM').show();
    $('#btnLoginSubmitBMReg').show();
    $('#btnLoginSubmitBML').show();
    $('#htd_BookMarkPopup').val('0');
}
		        
ob1 = document.getElementById("CmbJuz");
ob2 = document.getElementById("CmbSura");
ob3 = document.getElementById("CmbHizb");
ob4 = document.getElementById("CmbFverse");
ob5 = document.getElementById("CmbTverse");
ob6 = document.getElementById("CmbTrans");
ob8 = document.getElementById("CmbRec");
ob9_zoom = document.getElementById("Zoom_ob9");
ob10 = document.getElementById("CmbScript");
ob11 = document.getElementById("htdserver");

//ob11.value="http://www.quranexplorer.com/quranpii/audio/";
//ob11.value="audio/";
//alert(ob1);

FRuku = document.getElementById("HF_FRuku");
TRuku = document.getElementById("HF_TRuku");
VList = document.getElementById("HF_VeList");

RName = ob6.options[ob6.selectedIndex].value;
Sura = ob2.options[ob2.selectedIndex].value;
Juz = ob1.options[ob1.selectedIndex].value;
Hizb = ob3.selectedIndex;
TVer = ob5.selectedIndex;
FVer = ob4.selectedIndex;

if (parseInt(ob9_zoom.value) >= 3 && parseInt(ob9_zoom.value) <= 7) {
    USize = parseInt(ob9_zoom.value);
    ESize = USize - 3;
}

$("#obj1").on("load", function () {
    //CallFlashLoad();
});



var iframeElementHFS = document.getElementById('HFS');
iframeElementHFS.setAttribute("value", USize);

$(document).ready(function () {
    var _pos = -1;
    var _tempTokenUID = "";
    _tempTokenUID = GetStoredProfileToken();

    if ((_pos = _tempTokenUID.indexOf(" : ")) > 0) {
        var _tempToken = _tempTokenUID.substr(0, _pos);
        _pos += 3;
        var _tempUID = _tempTokenUID.substr(_pos);

        if (_tempToken != "" && _tempUID != "") {
            if (_tempUID.toLowerCase() != "guest-allow@quranexplorer.com") {
                $('#htd_EmailIDQE').val(_tempUID);
                $('#htdProfileToken').val(_tempToken);
                $('#btnUSignInToken').trigger('click');
            }
            else {
                CallOnQELoad();
                UpdateTra(4);
                UpdateTra(5);
                //UpdateFlash();
            }
        }
        else {
            CallOnQELoad();
            UpdateTra(4);
            UpdateTra(5);
            //UpdateFlash();
        }
    }
    else {
        CallOnQELoad();
        UpdateTra(4);
        UpdateTra(5);
        //UpdateFlash();
    }

    $('#sliderTafs').hover(function () {
        $(this).attr("class", "sliderhover");
        if (HS_Tafseer_State == 1)
            $('#sliderTafsChd').attr("class", "sliderChd2");
        else
            $('#sliderTafsChd').attr("class", "sliderChd4");
    }, function () {
        $(this).attr("class", "slidernormal");
        if (HS_Tafseer_State == 1)
            $('#sliderTafsChd').attr("class", "sliderChd1");
        else
            $('#sliderTafsChd').attr("class", "sliderChd3");
    });

    $('#sliderTafs').click(function () {
        if (HS_Tafseer_State == 1) {
            $('#sliderTafsChd').attr("class", "sliderChd3");
            $('#frmTran1').height($('#frmTran1').height() + $('#Tafsfrm').height());
            $('#frmTran2').height($('#frmTran2').height() + $('#Tafsfrm').height());
            $('#Tafsfrm').css('display', 'none');
            HS_Tafseer_State = 2;
        }
        else {
            $('#sliderTafsChd').attr("class", "sliderChd1");
            $('#frmTran1').height($('#frmTran1').height() - $('#Tafsfrm').height());
            $('#frmTran2').height($('#frmTran2').height() - $('#Tafsfrm').height());
            $('#Tafsfrm').css('display', 'block');
            HS_Tafseer_State = 1;
        }

        //ResizeWindow();
    });
});
