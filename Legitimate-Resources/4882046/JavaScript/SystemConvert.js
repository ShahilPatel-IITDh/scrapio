$(document).ready(function () {
    if (typeof ("jOff" + AF.Campaign.v.cIdx + "Sub") != "function") { eval("function jOff" + AF.Campaign.v.cIdx + "Sub(){ return AdFlowValidation.ValidationFields(); }"); }
    if (typeof ("f" + AF.Campaign.v.cIdx + "ConfirmBox") != "function") { eval("function f" + AF.Campaign.v.cIdx + "ConfirmBox(){ return AdFlowValidation.ValidationFields(); }"); }

    _jCid = CID = GetFlowVariable(AF.Campaign.v.CampaignID);
    _jCidx = GetFlowVariable(AF.Campaign.v.cIdx);
    _jSubAtt = GetFlowVariable(AF.Campaign.v.SubmitAttempt);
    _jType = GetFlowVariable(AF.Campaign.v.Type);

    jFlowCfg.FlowID = GetFlowVariable(AF.Flow.v.FlowID);
    jFlowCfg.SFlowID = GetFlowVariable(AF.SubFlow.v.SubFlowID);
    jFlowCfg.AffiliateID = GetFlowVariable(AF.Flow.v.AffiliateID);
    jFlowCfg.retURL = GetFlowVariable(AF.Flow.v.ReturnURL);
    jFlowCfg.SubAff = GetFlowVariable(AF.Flow.v.SubAff);
    jFlowCfg.Ifame = GetFlowVariable(AF.System.v.Iframe);
})



function jFlow_gVID() { return "3_" + AF.Lead.v.VID; } //This is supposed to be gVID in V2
//Cookies VID
function jGetVid() { return "3_" + AF.Lead.v.VID; } // This is supposed to be VID in V2
//function GetFlowVariable(v) {return (v == undefined) ? "" : v; }
function jIsEmail(email) {return isValidEmailAddress(email); }
function _jRPOFFSubmit() { AF.Campaign.RPOFFSubmitSystemValidate(); }
//function _jRPOFFSubmit() { AF.Campaign.RPOFFSubmit(); }
function jPgNext(opt) { AF.System.Skip(opt); }
function jPClkup(p, returnAsJSONFormat) { return AF.System.PhoneCarrierLookUp(p, returnAsJSONFormat); }
function _jPClkupC(p, returnAsJSONFormat) { return AF.Log.PhoneCarrierLookUp(p, returnAsJSONFormat); }
function jSQRT(CID, SQ, qData, hdler) { AF.Campaign.SQRT(CID, SQ, qData, hdler); }
function jURLExclude(url, excluded) { return AF.Campaign.URLExclude(url, excluded); }
function jCleanField(elem) { return AF.System.CleanField(elem); }
function jOR4PrePop() { _jORPrePop = true; }
function jFormValidate(frmID) { AF.FormValidationV1(frmID); }
function jOfferSubmit(cid, sz) { AF.Campaign.OfferSubmit(cid, sz); }
function jOfferPreSubmit(cid, sz) { AF.Campaign.OfferPreSubmit(cid, sz); }
function _jRPOFFSubmitHandler(resp) { AF.Campaign.RPOFFSubmitHandler(resp); }
function _jPgIsCompleted() {AF.Campaign.PgIsCompleted(); }
function PgSubmitCheck() {AF.Campaign.PgSubmitCheck(); }
function _jPgSecCheck(opt) {AF.Campaign.PgSecCheck(opt); }
function _jFlowOfferInfoKAL() {AF.Campaign.FlowOfferInfoKAL(); }
function jMobileSubmit(cid, ph, sz) { AF.Campaign.MobileSubmit(cid, ph, sz); }
function _jPgSubmitCheck() {AF.Campaign.PgSubmitCheck(); }
function jMobileOneFieldClean(obj, cid) {AF.Campaign.MobileOneFieldClean(obj, cid); }
function jMobileOneFieldFormat(obj, evt) {AF.Campaign.MobileOneFieldFormat(obj, evt);}
function disableEnterKey(event) { return false; };
function jPubSrcParam(param_name) { return AF.Campaign.PubSrcParam(param_name); }
function jURLparam(pURL, param) { return AF.Campaign.URLparam(pURL, param); }
function GetDynamicImage() { AF.Campaign.GetDynamicImage(); }
function jCampaignCookie(opt) { AF.Campaign.CampaignCookie(opt); }
function jNextOfferHdlr(status, cp) { AF.SubFlow.NextOfferHdlr(status, cp); }
function jNextStepHdlr(qstr) { AF.SubFlow.NextStepHdlr(qstr); }
function jFlowSkip2Exit(opt) { AF.Flow.FlowSkip2Exit(opt); }
function jFlowLTURL(ltCID, afID, exPara) { AF.Campaign.FlowLTURL(ltCID, afID, exPara); }
function jFlowCakeOffer(CakeAffID, CakeID, ExtraParameter) { AF.Campaign.FlowCakeURL(CakeAffID, CakeID, ExtraParameter); }
function jFrameRetURL(opt) { return AF.Campaign.FrameRetURL(opt);}
function jDisplayToggle(Sh, Hd) { AF.Campaign.DisplayToggle(Sh, Hd); }
function jFlowSkipReg(){ AF.Flow.FlowSkipReg(); }
function jPopunder(url) { AF.System.Popunder(url); }
function jFrameNextStepURL(opt) {AF.Flow.FrameNextStepURL(opt); }
function jRegOfferSubmit(cid, cidx) { AF.Campaign.RegOfferSubmitWithCB([cid + "," + cidx], null, null); }
function jOfferCrossSubmit(cid, cidx) { AF.Campaign.CrossCampaignView([cid + "," + cidx], AF.Campaign.v.CrossSubmitOption.SubmitOnly, null, null, ""); }
function jOfferCrossSubmitWithStatusCPC(O_CampID, O_CreativeID, O_Status) { AF.Campaign.CrossCampaignView([O_CampID + "," + O_CreativeID], AF.Campaign.v.CrossSubmitOption.SubmitOnly, null, null, (O_Status == undefined ? '43' : O_Status)); }
function SetExitOption(Val) { AF.SubFlow.SetExitOption(Val); }
function jProxyCall(id, params, CallBackFunction) { AF.System.ProxyCall(id, params, CallBackFunction); }
/*
function jOfferFrameWork() {
    this.FrameWorkVersion = "1.0";
    this.MachineID = "0";
    this.ClientIP = "";
    this.Initialized = false;
    this.CampaignID = AF.Campaign.v.CampaignID;
    this.cIdx = AF.Campaign.v.cIdx;
    this.Vid = jGetVid();
    this.FullVid = jGetVid();
    this.BTN = AF.Lead.v.Telephone;
    this.ClientIP = AF.Lead.v.ClientIP;
    this.FlowID = AF.Flow.v.FlowID;
    this.SFlowID = AF.SubFlow.v.SubFlowID;
    this.SFPID = AF.SubFlow.v.ProfileID; //  jFlowCfg.SFPID;
    this.MinimumPhoneNumberLength = 10;
    this.OfferDivID = "#RPc" + this.CampaignID + "dv";
    this.OfferFieldCheck = eval("jOff" + this.CampaignID + "Check");

    if (this.Vid.toString().indexOf("_") > -1) {
        var TmpStr = this.Vid.toString().split('_');
        this.MachineID = TmpStr[0];
        this.Vid = TmpStr[1];
    } else {
        this.MachineID = "1";
    }
    if (this.OfferDivID != undefined) {
        if ($(this.OfferDivID).find('[name="fds"]').val() == undefined) {
            $(this.OfferDivID).append('<input type="hidden" name="fds" value="" />');
        }
        if ($(this.OfferDivID).find('[name="fdt"]').val() == undefined) {
            $(this.OfferDivID).append('<input type="hidden" name="fdt" value="" />');
        }
    }

    this.Initialized = true;
    this.EnableCookiePixel = function () {
        if (this.Initialized) {
            jCampaignCookie(1);
        } else { alert("Offer Obj is not initialized.") };
    }

    // Carrier Change
    this.CarrierChangePhoneLengthAutoSkip = -1;
    this.CarrierChangeOriginalCarrierAutoSkip = "";
    this.EnableMobileCarrierChangeAutoSkip = function (OriginalCarrier, PhoneLength, FrameWorkObj) {
        if (typeof (FrameWorkObj) != "object") { alert("FrameWorkObj is not an object."); return false; }
        if (typeof (PhoneLength) != "undefined" && !isNaN(PhoneLength)) { this.CarrierChangePhoneLengthAutoSkip = PhoneLength; } else { alert("PhoneLength is not a number."); return false; }
        if (typeof (OriginalCarrier) == "string") { this.CarrierChangeOriginalCarrierAutoSkip = OriginalCarrier };
        $(this.OfferDivID).find('input[name="phonecode"]').keyup(function () { FrameWorkObj.CheckMobileCarrierChange(); });
        $(this.OfferDivID).find('input[name="phoneprefix"]').keyup(function () { FrameWorkObj.CheckMobileCarrierChange(); });
        $(this.OfferDivID).find('input[name="phonesuffix"]').keyup(function () { FrameWorkObj.CheckMobileCarrierChange(); });
        $(this.OfferDivID).find('input[name="telephone"]').keyup(function () { FrameWorkObj.CheckMobileCarrierChange(); });
    }

    this.CheckMobileCarrierChange = function () {
        if (typeof (this.CarrierChangeOriginalCarrierAutoSkip) != "string") return true;
        if (this.CarrierChangeOriginalCarrierAutoSkip.length < 2) return true;
        var PhoneNumber = $.trim($(this.OfferDivID).find('input[name="phonecode"]').val()) + $.trim($(this.OfferDivID).find('input[name="phoneprefix"]').val()) + $.trim($(this.OfferDivID).find('input[name="phonesuffix"]').val());
        if ($(this.OfferDivID).find('input[name="phonecode"]').is(':hidden') && typeof ($.trim($(this.OfferDivID).find('input[name="phonecode"]').val())) != "undefined") {
            PhoneNumber = $.trim($(this.OfferDivID).find('input[name="telephone"]').val()); // If phonecode is hidden and telephone is present, we use telephone value.
        }
        if (PhoneNumber.length >= this.CarrierChangePhoneLengthAutoSkip) {
            var NewCarrier = AF.Log.PhoneCarrierLookUp(PhoneNumber);
            if (NewCarrier.length > 20) {
                if (NewCarrier.indexOf(this.CarrierChangeOriginalCarrierAutoSkip) == -1) { jPgNext(2); }
            }
        }
        return true;
    }
    // End of Carrier Change


    // Step 0
    this.Step0MaximumSubmitAttempt = -1;
    this.Step0SubmitAttempted = 0;
    this.EnableStep0MobileSubmitAttempRestruction = function (MaximumAttempt) {
        if (MaximumAttempt > 0)
            this.Step0MaximumSubmitAttempt = MaximumAttempt;
        else
            alert("Step0MaximumSubmitAttempt Attempt is less than 1 or undefined.");
    }

    this.AutoSubmitStep0PhoneLength = -1;
    this.EnableMobileAutoSubmitStep0 = function (PhoneLength, FrameWorkObj) {
        if (typeof (this.Step0ExtraParameter) == "undefined") { alert("Step0ExtraParameter is not defined."); return false; }
        if (typeof (this.Step0Handler) == "undefined") { alert("Step0Handler is not defined."); return false; }
        if (typeof (FrameWorkObj) != "object") { alert("FrameWorkObj is not an object."); return false; }
        if (typeof (PhoneLength) != "undefined" && !isNaN(PhoneLength)) { this.AutoSubmitStep0PhoneLength = PhoneLength; } else { alert("PhoneLength is not a number."); return false; }
        $(this.OfferDivID).find('input[name="phonecode"]').keyup(function () { FrameWorkObj.MobileStep0(); });
        $(this.OfferDivID).find('input[name="phoneprefix"]').keyup(function () { FrameWorkObj.MobileStep0(); });
        $(this.OfferDivID).find('input[name="phonesuffix"]').keyup(function () { FrameWorkObj.MobileStep0(); });
        $(this.OfferDivID).find('input[name="telephone"]').keyup(function () { FrameWorkObj.MobileStep0(); });
    }

    this.Step0ExtraParameter;
    this.Step0Handler;
    this.Step0SubmitNumber;
    this.Step0SubmitPhoneNumberPrefix = "";
    this.Step0ExtraParameterOnly;
    this.Step0SkipParameters;
    this.IsPrePopBTNChecked = false;
    this.Step0WirelessOnly = false;
    this.Step0CarrierLookupResult = "";
    this.EnableMobileStep0 = function (ExtraParameter, ExtraParameterOnly, Handler, PrePopCheck, SubmitPhoneNumberPrefix, SkipParameters) {
        if (typeof (ExtraParameter) == "undefined") {
            alert("Step0ExtraParameter is not defined");
        } else
            if (typeof (ExtraParameterOnly) != "boolean") {
                alert("Step0ExtraParameterOnly is not a Boolean!");
            } else
                if (typeof (Handler) != "function") {
                    alert("Step0Handler is not a function!");
                } else
                    if (typeof (PrePopCheck) != "boolean") {
                        alert("Step0PrePopCheck is not a Boolean!");
                    }
                    else {
                        this.Step0ExtraParameter = ExtraParameter;
                        this.Step0ExtraParameterOnly = ExtraParameterOnly;
                        this.Step0Handler = Handler;
                        this.Step0SkipParameters = SkipParameters;
                        if (typeof (SubmitPhoneNumberPrefix) == "string") { this.Step0SubmitPhoneNumberPrefix = SubmitPhoneNumberPrefix; }
                        if (PrePopCheck) {
                            if ((this.BTN.length >= this.MinimumPhoneNumberLength && typeof (this.BTN) != "undefined") || this.IsParameterSkip(this.Step0SkipParameters, "btn")) {
                                if (this.IsParameterSkip(this.Step0SkipParameters, "btn") && this.BTN.length >= this.MinimumPhoneNumberLength) {
                                    this.Step0SubmitNumber = this.BTN;
                                } else
                                    if (this.BTN.length >= this.MinimumPhoneNumberLength && typeof (this.BTN) != "undefined") {
                                        this.Step0SubmitNumber = this.BTN;
                                    } else {
                                        this.Step0SubmitNumber = "";
                                    }
                                if (this.Step0WirelessOnly) { // Step 0 Submit Wireless Number only.
                                    if (this.Step0SubmitNumber.length >= this.MinimumPhoneNumberLength) {
                                        this.Step0CarrierLookupResult = jPClkup(this.Step0SubmitNumber);
                                        if (this.Step0CarrierLookupResult.indexOf("wless=y") > 0) {
                                            this.MobileStep0Action();
                                        }
                                    }
                                } else {
                                    this.MobileStep0Action();
                                }
                                this.IsPrePopBTNChecked = true;
                            }
                        }
                    }
    }

    this.MobileStep0 = function () {
        if (typeof (this.Step0ExtraParameter) == "undefined") { alert("Step0ExtraParameter is not defined."); return false; }
        if (typeof (this.Step0Handler) == "undefined") { alert("Step0Handler is not defined."); return false; }
        if (this.AutoSubmitStep0PhoneLength > -1) { // Auto Submit Enabled.
            var PhoneNumber = $.trim($(this.OfferDivID).find('input[name="phonecode"]').val()) + $.trim($(this.OfferDivID).find('input[name="phoneprefix"]').val()) + $.trim($(this.OfferDivID).find('input[name="phonesuffix"]').val());
            if ($(this.OfferDivID).find('input[name="phonecode"]').is(':hidden') && typeof ($.trim($(this.OfferDivID).find('input[name="phonecode"]').val())) != "undefined") {
                PhoneNumber = $.trim($(this.OfferDivID).find('input[name="telephone"]').val()); // If phonecode is hidden and telephone is present, we use telephone value.
            }
            if (PhoneNumber.length >= this.AutoSubmitStep0PhoneLength) {
                if (this.Step0MaximumSubmitAttempt > -1) {
                    if (++this.Step0SubmitAttempted > this.Step0MaximumSubmitAttempt) { jPgNext(2); }
                }
                this.Step0SubmitNumber = PhoneNumber;
                this.MobileStep0Action();
            }
        } else { // Auto Submit is not enabled.
            if (this.Step0MaximumSubmitAttempt > -1) {
                if (++this.Step0SubmitAttempted > this.Step0MaximumSubmitAttempt) { jPgNext(2); }
            }
            PhoneNumber = $.trim($(this.OfferDivID).find('input[name="phonecode"]').val()) + $.trim($(this.OfferDivID).find('input[name="phoneprefix"]').val()) + $.trim($(this.OfferDivID).find('input[name="phonesuffix"]').val());
            this.Step0SubmitNumber = PhoneNumber;
            this.MobileStep0Action();
        }
        return true;
    }

    this.MobileStep0Action = function (DynamicParameter) {
        var isSkipBTN = this.IsParameterSkip(this.Step0SkipParameters, "btn");
        if (!isSkipBTN) {
            if (typeof (this.Step0SubmitNumber) == "undefined") { alert("Step0SubmitNumber undefined."); return false; }
        }
        var Param = this.Step0ExtraParameter + "&BTN=" + this.Step0SubmitPhoneNumberPrefix + this.Step0SubmitNumber + "&CID=" + this.CampaignID + "&SQ=0&IPAddress=" + this.ClientIP + "&cIdx=" + this.cIdx + "&FlowID=" + this.FlowID + "&sFlowID=" + this.SFlowID + "&SFPID=" + this.SFPID + "&FMV=" + this.FrameWorkVersion + "&VID=" + this.FullVid;
        if (this.Step0ExtraParameterOnly) {
            Param = this.Step0ExtraParameter;
        }
        if (typeof (DynamicParameter) == "string") { Param = Param + "&" + DynamicParameter; }
        Param = this.HelperFieldReplace(Param, 0, this.Step0SubmitPhoneNumberPrefix + this.Step0SubmitNumber, "");
        if (typeof (this.Step0SkipParameters) != "undefined") {
            if ($.isArray(this.Step0SkipParameters)) {
                for (loopX = 0; loopX < this.Step0SkipParameters.length; loopX++) {
                    if (this.Step0SkipParameters[loopX].toLowerCase() == "btn" && this.Step0SubmitNumber != "") { continue; }
                    Param = jURLExclude(Param, this.Step0SkipParameters[loopX]);
                }
            } else {
                if ($.trim(this.Step0SkipParameters).toLowerCase() == "btn" && this.Step0SubmitNumber != "") {
                } else {
                    Param = jURLExclude(Param, this.Step0SkipParameters);
                }
            }
        }
        var Parameter = "SQ=0&LogHD=" + this.Step0SubmitNumber + "&param=" + escape(Param);
        jSQRT(this.CampaignID, 0, Parameter, this.Step0Handler);
    }
    // End of Step 0
    // Step 1
    this.Step1MaximumSubmitAttempt = -1;
    this.Step1SubmitAttempted = 0;
    this.EnableStep1MobileSubmitAttempRestruction = function (MaximumAttempt) {
        if (MaximumAttempt > 0)
            this.Step1MaximumSubmitAttempt = MaximumAttempt;
        else
            alert("Step1MaximumSubmitAttempt Attempt is less than 1 or undefined.");
    }

    this.Step1ExtraParameter;
    this.Step1Handler;
    this.Step1SubmitNumber;
    this.Step1ExtraParameterOnly;
    this.Step1SubmitPhoneNumberPrefix = "";
    this.Step1SkipParameters;
    this.EnableMobileStep1 = function (ExtraParameter, ExtraParameterOnly, Handler, SubmitPhoneNumberPrefix, SkipParameters) {
        if (typeof (ExtraParameter) == "undefined") {
            alert("Step1ExtraParameter is not defined");
        } else
            if (typeof (ExtraParameterOnly) != "boolean") {
                alert("Step1ExtraParameterOnly is not a Boolean!");
            } else
                if (typeof (Handler) != "function") {
                    alert("Step1Handler is not a function!");
                }
                else {
                    this.Step1ExtraParameter = ExtraParameter;
                    this.Step1Handler = Handler;
                    this.Step1ExtraParameterOnly = ExtraParameterOnly;
                    this.Step1SkipParameters = SkipParameters;
                    if (typeof (SubmitPhoneNumberPrefix) == "string") { this.Step1SubmitPhoneNumberPrefix = SubmitPhoneNumberPrefix; }
                }

    }
    this.MobileStep1 = function () {
        if (typeof (this.Step1ExtraParameter) == "undefined") { alert("Step1ExtraParameter is not defined."); return false; }
        if (typeof (this.Step1Handler) == "undefined") { alert("Step1Handler is not defined."); return false; }
        //if (!eval("jOff" + this.CampaignID + "Check(9)")) { return false; }
        if (!this.OfferFieldCheck(9)) { return false; }
        var PhoneNumber = $.trim($(this.OfferDivID).find('input[name="phonecode"]').val()) + $.trim($(this.OfferDivID).find('input[name="phoneprefix"]').val()) + $.trim($(this.OfferDivID).find('input[name="phonesuffix"]').val());
        if ((PhoneNumber == undefined || PhoneNumber == "") && $(this.OfferDivID).find('input[name="telephone"]').size()==1 && $(this.OfferDivID).find('input[name="telephone"]').val() != "") {
            PhoneNumber = $.trim($(this.OfferDivID).find('input[name="telephone"]').val()); // If phonecode is hidden and telephone is present, we use telephone value.
        }
        this.Step1SubmitNumber = PhoneNumber;
        if (this.Step1MaximumSubmitAttempt > -1) {
            if (++this.Step1SubmitAttempted > this.Step1MaximumSubmitAttempt) { jPgNext(2); }
        }
        this.MobileStep1Action();
        return true;
    }
    this.MobileStep1Action = function (DynamicParameter) {
        var isSkipBTN = this.IsParameterSkip(this.Step1SkipParameters, "btn");
        if (!isSkipBTN) {
            if (typeof (this.Step1SubmitNumber) == "undefined") { alert("Step1SubmitNumber undefined."); return false; }
        }
        var Param = this.Step1ExtraParameter + "&BTN=" + this.Step1SubmitPhoneNumberPrefix + this.Step1SubmitNumber + "&CID=" + this.CampaignID + "&SQ=1&IPAddress=" + this.ClientIP + "&cIdx=" + this.cIdx + "&FlowID=" + this.FlowID + "&sFlowID=" + this.SFlowID + "&SFPID=" + this.SFPID + "&FMV=" + this.FrameWorkVersion + "&VID=" + this.FullVid;
        if (this.Step1ExtraParameterOnly) {
            Param = this.Step1ExtraParameter;
        }
        if (typeof (DynamicParameter) == "string") { Param = Param + "&" + DynamicParameter; }
        Param = this.HelperFieldReplace(Param, 1, this.Step1SubmitPhoneNumberPrefix + this.Step1SubmitNumber, "");
        if (typeof (this.Step1SkipParameters) != "undefined") {
            if ($.isArray(this.Step1SkipParameters)) {
                for (loopX = 0; loopX < this.Step1SkipParameters.length; loopX++) {
                    Param = jURLExclude(Param, this.Step1SkipParameters[loopX]);
                }
            } else {
                Param = jURLExclude(Param, this.Step1SkipParameters);
            }
        }
        var Parameter = "SQ=1&LogHD=" + this.Step1SubmitNumber + "&param=" + escape(Param);
        jSQRT(this.CampaignID, 1, Parameter, this.Step1Handler);
    }
    // End of Step1
    // Step 2

    this.Step2MaximumSubmitAttempt = -1;
    this.Step2SubmitAttempted = 0;
    this.EnableStep2MobileSubmitAttempRestruction = function (MaximumAttempt) {
        if (MaximumAttempt > 0)
            this.Step2MaximumSubmitAttempt = MaximumAttempt;
        else
            alert("Step2MaximumSubmitAttempt Attempt is less than 1 or undefined.");
    }

    this.Step1ExtraParameter;
    this.Step2Handler;
    this.Step2SubmitNumber;
    this.Step2Pin;
    this.Step2ExtraParameterOnly;
    this.Step2SubmitPhoneNumberPrefix = "";
    this.Step2SkipParameters;
    this.Step2JumpToNextOfferAfterSubmit = true;
    this.EnableMobileStep2 = function (ExtraParameter, ExtraParameterOnly, Handler, SubmitPhoneNumberPrefix, SkipParameters) {
        if (typeof (ExtraParameter) == "undefined") {
            alert("Step2ExtraParameter is not defined");
        } else
            if (typeof (ExtraParameterOnly) != "boolean") {
                alert("Step2ExtraParameterOnly is not a Boolean!");
            } else
                if (typeof (Handler) != "function") {
                    alert("Step2Handler is not a function!");
                }
                else {
                    this.Step2ExtraParameter = ExtraParameter;
                    this.Step2ExtraParameterOnly = ExtraParameterOnly;
                    this.Step2Handler = Handler;
                    this.Step2SkipParameters = SkipParameters;
                    if (typeof (SubmitPhoneNumberPrefix) == "string") { this.Step2SubmitPhoneNumberPrefix = SubmitPhoneNumberPrefix; }
                }

    }
    this.MobileStep2 = function () {
        if (typeof (this.Step2ExtraParameter) == "undefined") { alert("Step2ExtraParameter is not defined."); return false; }
        if (typeof (this.Step2Handler) == "undefined") { alert("Step2Handler is not defined."); return false; }
        if (!this.OfferFieldCheck(9)) { return false; }
        this.Step2Pin = $(this.OfferDivID).find('input[name="fd9"]').val();
        if (typeof (this.Step2Pin) == "undefined") { alert("Step2Pin is not defined."); return false; }
        if (this.Step2Pin.length == 0) { alert("Please enter your pin.\n"); return false; }
        var PhoneNumber = $.trim($(this.OfferDivID).find('input[name="phonecode"]').val()) + $.trim($(this.OfferDivID).find('input[name="phoneprefix"]').val()) + $.trim($(this.OfferDivID).find('input[name="phonesuffix"]').val());
        if ((PhoneNumber == undefined || PhoneNumber == "") && $(this.OfferDivID).find('input[name="telephone"]').size() == 1 && $(this.OfferDivID).find('input[name="telephone"]').val() != "") {
            PhoneNumber = $.trim($(this.OfferDivID).find('input[name="telephone"]').val()); // If phonecode is hidden and telephone is present, we use telephone value.
        }
        if ($.active == 0) {
            this.Step2SubmitNumber = PhoneNumber;
            if (this.Step2MaximumSubmitAttempt > -1) {
                if (++this.Step2SubmitAttempted > this.Step2MaximumSubmitAttempt) { jPgNext(2); }
            }
            this.MobileStep2Action();
            return true;
        } else {
            alert("Your request is sent. Please wait for the response. It may take up to a couple seconds.");
        }
    }

    this.MobileStep2Action = function (DynamicParameter) {
        var isSkipBTN = this.IsParameterSkip(this.Step2SkipParameters, "btn");
        if (!isSkipBTN) {
            if (typeof (this.Step2SubmitNumber) == "undefined") { alert("Step2SubmitNumber undefined."); return false; }
        }
        var Param = this.Step2ExtraParameter + "&BTN=" + this.Step2SubmitPhoneNumberPrefix + this.Step2SubmitNumber + "&CID=" + this.CampaignID + "&SQ=2&IPAddress=" + this.ClientIP + "&cIdx=" + this.cIdx + "&FlowID=" + this.FlowID + "&sFlowID=" + this.SFlowID + "&SFPID=" + this.SFPID + "&FMV=" + this.FrameWorkVersion + "&PIN=" + this.Step2Pin + "&VID=" + this.FullVid;
        if (this.Step1ExtraParameterOnly) {
            Param = this.Step2ExtraParameter;
        }
        if (typeof (DynamicParameter) == "string") { Param = Param + "&" + DynamicParameter; }
        Param = this.HelperFieldReplace(Param, 2, this.Step2SubmitPhoneNumberPrefix + this.Step2SubmitNumber, this.Step2Pin);
        if (typeof (this.Step2SkipParameters) != "undefined") {
            if ($.isArray(this.Step2SkipParameters)) {
                for (loopX = 0; loopX < this.Step2SkipParameters.length; loopX++) {
                    Param = jURLExclude(Param, this.Step2SkipParameters[loopX]);
                }
            } else {
                Param = jURLExclude(Param, this.Step2SkipParameters);
            }
        }

        var mGUID = AF.System.GettingmGUID();
        if (mGUID != "") {
            Param += "&mGUID=" + mGUID;
        }

        var Parameter = "SQ=2&LogHD=" + this.Step2SubmitNumber + "&param=" + escape(Param);
        jSQRT(this.CampaignID, 2, Parameter, this.Step2Handler);
    }
    // End of Step2
    // Final step. Mobile Offer Succeess Leads Submit.
    this.MobileOfferLeadSubmit = function () {
        if (typeof (this.Step2JumpToNextOfferAfterSubmit) != "undefined") _jCSumbitFG = this.Step2JumpToNextOfferAfterSubmit;
        if (this.OfferFieldCheck(9)) {
            $(this.OfferDivID).find('[name="status"]').val("13");
            jMobileSubmit(this.CampaignID, this.Step2SubmitNumber, 13);
        }
    }
    // Helper Function
    this.HelperFieldReplace = function (InputStr, StepSQ, BTN, PIN) {
        SessionID = $(this.OfferDivID).find('input[name="fds"]').val();
        vKey = $(this.OfferDivID).find('input[name="fdt"]').val();
        InputStr = InputStr.replace(/#cid#/gi, this.CampaignID).replace(/#sq#/gi, StepSQ).replace(/#btn#/gi, BTN).replace(/#ipaddress#/gi, this.ClientIP).replace(/#vid#/gi, this.FullVid).replace(/#cidx#/gi, this.cIdx).replace(/#flowid#/gi, this.FlowID).replace(/#sflowid#/gi, this.SFlowID).replace(/#sfpid#/gi, this.SFPID).replace(/#fmv#/gi, this.FrameWorkVersion).replace(/#pin#/gi, PIN).replace(/#sessionid#/gi, SessionID).replace(/#vkey#/gi, vKey);
        return InputStr;
    }

    this.IsParameterSkip = function (SkipParameters, Parameter) {
        if (typeof (SkipParameters) != "undefined") {
            if ($.isArray(SkipParameters)) {
                for (loopX = 0; loopX < SkipParameters.length; loopX++) {
                    if (SkipParameters[loopX].toLowerCase() == Parameter.toLowerCase()) {
                        return true;
                        break;
                    }
                }
            } else {
                if (SkipParameters.toLowerCase() == Parameter.toLowerCase()) {
                    return true;
                }
            }
        }
        return false;
    }
};
*/
// End FW