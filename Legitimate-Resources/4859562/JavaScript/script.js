;
"use strict";
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
var isSafari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);
var detectOS = "";
var stepName = "";
var currentYear = new Date().getFullYear();
var uri = '';
if(window.location.href.split("?").length > 1){
    uri = decodeURIComponent(window.location.href.split("?")[1].split("#")[0]);
}
var queryString = $jq.parseKeyValueString(uri);
var logRegSurvey = MatchCore.CPX.Logging.logRegSurvey,
logRegFunnel = MatchCore.CPX.Logging.logRegFunnel,
logRegEvent = MatchCore.CPX.Logging.logRegEvent,
logRegError = MatchCore.CPX.Logging.logRegError;


var facebookFields = ['dobStep', 'firstnameStep', 'emailStep'];
var fbUserFields = [];
var noLoggingStep = ['fbStep', 'ageCheckStep'];
var emailUpdate = false;

var _fb = MatchCore.CPX.Facebook._fb,
    getFBData = MatchCore.CPX.Facebook.getFBData,
    fbConnect = MatchCore.CPX.Facebook.fbConnect,
    UploadFacebookPhoto = MatchCore.CPX.Facebook.UploadFacebookPhoto,
    SaveFacebookAuth = MatchCore.CPX.Facebook.SaveFacebookAuth,
    linkFacebookAccount = MatchCore.CPX.Facebook.linkFacebookAccount,
    getAuthUrl = MatchCore.CPX.Facebook.getAuthUrl,
    getProfileImage = MatchCore.CPX.Facebook.getProfileImage;

_fb.appId = (MatchCore.Application.FBAppID) ? MatchCore.Application.FBAppID : "114828211898596";


var _googleAdwordsZipReg;


(function ($) {
    MatchCore.CPX.progressive = function () {
    var _container,
        _clientData,
        _form,
        _steps,
        _startFunnelStep = 0,
        _funnelPrefix = 'step',
        /*_shaker,*/
        _btnValidate,
        dataLayer = dataLayer || window.dataLayer,
        flow = [
            { fields: ["fb"], id: 'fbStep' },
            { fields: ["gc"], id: 'gcStep' },
            { fields: ["tr"], id: 'trStep' },
            { fields: ["dob"], id: 'dobStep' },
            { fields: ["zip"], id: 'zipStep' },
            { fields: ["firstname"], id: 'firstnameStep' },
            { fields: ["email"], id: 'emailStep' },
            { fields: ["password"], id: 'passwordStep' },
        ],
        formData = {
            lage: queryString.lage || "25",
            uage: queryString.uage || "35",
            gc: queryString.gc || '',
            tr: queryString.tr || '',
            postalCode: queryString.pc || '',
            birthMonth: 0,
            birthDay: 0,
            birthYear: 0,
            email: '',
            firstname:''
        };

        function currentLogStep(step){
            if(step){
                return step + self.startFunnelStep;
            }else{
                return self.currentStep + self.startFunnelStep;
            }
        }
        function removeFromFlow(field){
            self.flow = self.flow.filter(function(step){
                return step.fields.indexOf(field) == -1;
            })
            self.totalSteps = self.flow.length;
        }

        function addToFlow(newStep, beforeField){
            self.flow.map(function(step, index){
                if(step.id == newStep.id){
                    self.flow.splice(index, 1);
                }
            })
            var insertIndex = self.currentStep + 1;
            if(beforeField !== undefined){
                if(beforeField == 0){
                    insertIndex = 0
                }else{
                    self.flow.map(function(step, index){
                        if(step.fields.indexOf(beforeField) !== -1){
                            insertIndex = index
                        }
                    })
                }
            }
            self.flow.splice(insertIndex, 0, newStep);
            self.totalSteps = self.flow.length;
        }

        function setFormData(form){
            var formDataUpdate = {
                lage: form.ageSeekLow.value,
                uage: form.ageSeekHigh.value,
                gc: $("input[type=radio][name=gender]:checked").val(),
                tr: $("input[type=radio][name=genderSeek]:checked").val(),
                postalCode: form.postalCode.value,
                birthMonth: parseInt(form.birthMonth.value),
                birthDay: parseInt(form.birthDay.value),
                birthYear: parseInt(form.birthYear.value),
                email: form.email.value,
                firstname : form.firstname.value
            };
            formData = formDataUpdate;
        }

        function getFormData(){
            return formData;
        }

        function pushDataLayer(step){
            setFormData(_form);
            var stepData = self.flow;
            var fields = stepData[step].fields.join(' | ');
            // var prevFields = ['ggs', 'lage', 'uage', 'zip'];
            var data = {
            'cpStep': step,
            'cpFields': fields,
            }
            if(self.currentStep > 0){
                data['cpPrevFields'] = stepData[step-1].fields.join(' | ');
            }else{
                data['cpPrevFields'] = 'none';
            }
            if(self.currentStep < stepData.length-1){
                data['cpNextFields'] = stepData[step+1].fields.join(' | ');
            }else{
                data['cpNextFields'] = 'none';
            }
            
            if(data['cpPrevFields'].indexOf('gc') !== -1){
                data['selfgender'] = formData.gc;
            }
            if(data['cpPrevFields'].indexOf('tr') !== -1){
                data['genderseek'] = formData.tr;
            }

            if(data['cpFields'].indexOf('ageCheck') !== -1){
                data['cpPrevFields'] = 'dob';
            }

            data['device'] = 'd';

            dataLayer.push(data);
            dataLayer.push({'event': 'registrationProgress'});

        }
        function validateForm(e, button) {
            
            _btnValidate = button ? button : this;
            if($(_btnValidate).hasClass('loading')){
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            setFormData(_form);
            // createSearchCookie();
            if (e !== undefined) e.preventDefault();  
            // MatchCore.CPX.Messaging.reset();
            // MatchCore.CPX.progressive.clearErrors();

            if (self.currentStep >= self.flow.length-1) {
                $(_btnValidate).addClass('loading');
                // showSurvey();
                MatchCore.CPX.Registration.submit.apply(this);
            }
            else {
                validate().then(
                    function valid() {                           
                        // Submit partial validation
                        MatchCore.CPX.Registration.validate.apply(_btnValidate);
                        $("input").blur();     
                    },
                    function invalid(errors) {
                        MatchCore.CPX.progressive.showErrors(errors)
                    }
                );
            }           
        }

        function isValidDate(m, d, y) {
            var c = new Date();
            var minYear = c.getFullYear() - 109;
            var a = new Date(y, m-1, d);
            if (a.getFullYear() == y && c.getFullYear() > y && minYear <= y && a.getMonth() == m-1 && a.getDate() == d) { 
                return true; 
            } else {
                return false;
            }
        }

        function validateDOB(birthDay, birthMonth, birthYear){
            var errors = [];
            if ((birthMonth == 0) || (birthDay == 0) || (birthYear == 0)) {
                if (birthMonth == 0) errors.push({ "Field": "birthMonth", "Text": "Please enter the month of your birth." });
                if (birthDay == 0)  errors.push({ "Field": "birthDay", "Text": "Please enter the day of your birth." });
                if (birthYear == 0) errors.push({ "Field": "birthYear", "Text": "Please enter the year of your birth." });
            } else if ((birthMonth > 0) && (birthDay > 0) && (birthYear > 0)) {
                if (((birthMonth == 2) && (birthYear % 4 != 0) && (birthDay > 28))) errors.push({ "Field": "birthDay", "Text": "Please enter a valid date for your birthday." });
                else if (((birthMonth == 2) && (birthYear % 4 == 0) && (birthDay > 29))) errors.push({ "Field": "birthDay", "Text": "Please enter a valid date for your birthday." });
                else if (((birthMonth == 4 || birthMonth == 6 || birthMonth == 9 || birthMonth == 11) && (birthDay > 30))) errors.push({ "Field": "birthDay", "Text": "Please enter a valid date for your birthday." });
            }
            return errors;
        }

        function validate() {
            var formData = getFormData(_form)
            var postalCode = formData.postalCode;
            var password = formData.password;
            var month = formData.birthMonth;
            var day = formData.birthDay;
            var year = formData.birthYear;
            var email = formData.email;
            var firstname = formData.firstname;
            var promise = new Cortado.Promise();
            var errors = [];
            var passwordRegex = /^\w+$/;

            var stepId = currentStepId();

            switch (stepId) {
                case 'fbStep':
                    //do we need to validate data coming back from FB here?
                    if(_fb.redirectFromFacebook){
                        // console.log('facebook data', _fb.data);
                    }
                    break;
                case 'dobStep':
                    // Date of Birth  
                    var dobErrors = [];        
                    if(!isValidDate(month, day, year)){
                        dobErrors.push({ "Field": "birthDate", "Text": "Please enter a valid date for your birthday." });
                    }
                    errors = errors.concat(dobErrors); 
                    break;
                case 'zipStep':
                     // Zipcode
                     var zipErrors = [];
                     if (postalCode == "") {
                        zipErrors.push({ "Field": "postalCode", "Text": "Please enter a zip/postal code.", "Value": postalCode });
                     }
                     else if (!MatchCore.CPX.Validation.isValidPostalCode(postalCode)) {
                        zipErrors.push({ "Field": "postalCode", "Text": "Please enter a valid zip/postal code.", "Value": postalCode });   
                     } 
                    // if(zipErrors.length > 0){
                    //     $(".errorMessageSummary").addClass('zipStepError');   
                    // }    
                    errors = errors.concat(zipErrors);      
                    break;

                case 'firstnameStep':
                    //First Name
                    if ($.trim(firstname).length == 0) { 
                        errors.push({ "Field": "firstname", "Text": "Please enter a first name" }); 
                        // return;
                    }
                    else if ($.trim(firstname).length < 2 || $.trim(firstname).length > 16) {
                        errors.push({ "Field": "firstname", "Text": "Please enter a first name that is minimum of 2 characters and maximum of 16 characters in length."});
                        // return;
                    }
                    break;
                case 'emailStep':
                     // Email
                     if (email == "")  {
                         errors.push({ "Field": "email", "Text": "Please enter an email address." });
                     }
                    break;

                case 'passwordStep':
                    // Password
                    if (password == "") {
                        errors.push({ "Field": "password", "Text": "Please enter a password." });
                    }
                    else if ( !passwordRegex.test(password)) {
                        errors.push({ "Field": "password", "Text": "The password you entered is invalid. Remember to use only letters, numbers, and underscores in your password." });
                    }
                    break;
            }

            if (errors.length > 0) {
                promise.reject(errors);
            } else {
                promise.resolve();
            }

            return promise;
        }   

        function wireUpEvents() {
            setupPlaceholders();
            logGrayButton();

            if(isSafari){
                $('#passwordStep input').addClass('safari');
            }

            var cleave = new Cleave('#birthDate', {
                date: true,
                delimiter: ' / ',
                datePattern: ['m', 'd', 'Y']
            });

            $('.alreadyMember').click(function (e) {
                e.preventDefault();
                var url = "https://www.match.com/login/?regflow=https://www.match.com/cpx/en-us/match/indexpage"
                logRegEvent(self.currentLogStep(),'{ redirect: "Login" }');
                window.location.href=url;
              });

            _container.on('click touchstart', '.fieldset.active .button-progressive', validateForm);


            $("[name='email']").on('keyup', function (e) {   
                if (e.which == 13) {
                    return;
                }         
                var emailCheckVal = this.value;
                var emailCheck = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                if (emailCheck.test(emailCheckVal) && $("[name='email']").val().length != '') {
                    self.clearErrors();
                    $("#emailStep .button-submit").addClass('button-ready');
                    $("#emailStep .button-submit").removeClass('logGray');
                } else {
                    $("#emailStep .button-submit").removeClass('button-ready');
                    $("#emailStep .button-submit").addClass('logGray');
                }         
            });


            $("[name='birthDate']").on('keyup', function(e){

                $('select[name="birthDay"]').empty();
                $('select[name="birthMonth"]').empty();
                $('select[name="birthYear"]').empty();
                
                if (e.which == 13) {
                    return;
                }
                
                var date = new Date()
                var validYear = date.getFullYear() - 20;

                $('#dobStep .invalidField').removeClass("invalidField");
                $("#dobStep .button-submit").removeClass('button-progressive').removeClass('button-ready').addClass('logGray');
                
                var inputString = this.value;
                var month = inputString.split('/')[0];
                if(month) month = month.trim();
                var day = inputString.split('/')[1];
                if(day) day = day.trim();
                var year = inputString.split('/')[2];
                if(year) year = year.trim();


                var imonth = month || 01;
                var iday = day || 01;
                var iyear = year || validYear;
                
                if(day) $('select[name="birthDay"]').empty().append("<option value=" + day + ">" + day + "</option>");
                if(month) $('select[name="birthMonth"]').empty().append("<option value=" + month + ">" + month + "</option>");
                if(year) $('select[name="birthYear"]').empty().append("<option value=" + year + ">" + year + "</option>");

                if(isValidDate(imonth, iday, iyear)){
                    $(".fieldError").fadeOut("fast");
                }

                if(year && year.length == 4 && month && day){
                    if(isValidDate(month, day, year)){
                        $(".fieldError").fadeOut("fast");
                        $("#dobStep .button-submit").addClass('button-progressive').addClass('button-ready').removeClass('logGray');
                    }else{
                        $("#dobStep .button-submit").removeClass('button-progressive').removeClass('button-ready').addClass('logGray');
                        $("#birthDate").addClass('invalidField');
                        var errors = [];
                        errors.push({ "Field": "birthDate", "Text": "Please enter a valid date for your birthday." });
                        MatchCore.CPX.progressive.showErrors(errors);
                    }
                }
            })

            $('#dobStep .button-submit').on('click', function(){
                
            var month = $('select[name="birthMonth"]').val() || 0;
            var day = $('select[name="birthDay"]').val() || 0;
            var year = $('select[name="birthYear"]').val() || 0;

            if(isValidDate(month, day, year)){
                $(".fieldError").fadeOut("fast");
                $("#dobStep .button-submit").addClass('button-progressive').addClass('button-ready');
            }else{
                $("#dobStep .button-submit").removeClass('button-progressive').removeClass('button-ready');
                $("#birthDate").addClass('invalidField');
                var errors = [];
                errors.push({ "Field": "birthDate", "Text": "Please enter a valid date for your birthday." });
                MatchCore.CPX.progressive.showErrors(errors);
            }
                
                // var errors = validateDOB(birthMonth, birthDay, birthYear);

                // if(errors.length > 0){
                //     MatchCore.CPX.progressive.showErrors(errors);
                // }
            });
            
            $(".btIam, .btGlook, .showMeBtn").hover(function(e){
                $(this).removeClass("weightGrow");
            });

            $(".btIam").on('click',function (e) {
                if(!$(this).find("input").is(':focus')){
                    $(this).find("input").data("mouse",true);
                }
            });

            $(".btIam input").on('click',function (e) {   
                var mouse = false; 
                if($(this).data("mouse")){
                    mouse = true;
                }
                $(".btIam").removeClass('weightGrow');
                $(this).parent().addClass('weightGrow');
                if ($(this).is(':checked')) {
                    if($(this).val() === "0"){
                        $(".selfGender .chatButtons .more-options").addClass("live");
                        $(".selfGender .chatButtons .button-submit").removeClass("button-progressive");
                        if(mouse){
                            $(".selfGender .chatButtons .more-options").click();
                        }
                    }else{
                        $(".selfGender .chatButtons .more-options").removeClass("live");
                        $(".selfGender .chatButtons .button-submit").addClass("button-progressive");
                        if(mouse){
                            $(".selfGender .chatButtons .button-submit").click();
                        }
                    }
                }
                $(this).removeData("mouse");
            });

            $(".more-options").click(function(e){
                e.preventDefault();
                $(".selfGender .chatButtons").hide();
                $(".selfGender .chatButtonsMore").show();
                $(".matchLetterMarkBox").addClass('nologo');
                $("input[name='gender']:checked").prop("checked", false);
                $('.gcMoreBtn:first').focus();
            })

            $(".gcMoreBtn").click(function () {
                $(".gcMoreBtn").removeClass('weightGrow');
                $(this).addClass('weightGrow');
                if ($(this).find("input").is(':checked')) {
                    $(".selfGender .chatButtonsMore .button-submit").removeClass('logGray');
                    $(".selfGender .chatButtonsMore .button-submit").addClass('button-ready');
                    $(".selfGender .chatButtonsMore").addClass('active');
                    // $(".selfGender .chatButtonsMore.active .button-submit").addClass("button-progressive");
                }
            });

            $(".selfGender .chatButtonsMore .button-submit").click(function(){
                var genderIdentity = $("input[name='genderIdentity']:checked").val();
                if(genderIdentity){
                    if( genderIdentity == "1075" || genderIdentity == "1076" ){
                        $(".selfGender .chatButtonsMore .button-submit").addClass('button-progressive');
                    }else{
                        $(".showMeGender").show();
                        $(".selfGender").hide();
                        $(".showMeGender").find("input").focus();
                    }
                }
                $(".matchLetterMarkBox").removeClass('nologo');
                $(".selfGender .chatButtons .more-options").removeClass("live");
            });

            $(".showMeBtn").on('click',function (e) {
                if(!$(this).find("input").is(':focus')){
                    $(this).find("input").data("mouse",true);
                }
            })

            $(".showMeBtn input").click(function (e) {
                var mouse = false; 
                if($(this).data("mouse")){
                    mouse = true;
                }
                // console.log('showmeBtn');
                $(".showMeBtn").removeClass("weightGrow");
                $(this).parent().addClass("weightGrow");
                if ($(this).is(':checked')) {
                    $(".showMeGender .chatButtons .button-submit").addClass("button-progressive");
                    if(mouse){
                        $(".showMeGender .chatButtons .button-submit").click();
                    }
                }
                $(this).removeData("mouse");
            });

            $(".btGlook").on('click',function (e) {
                if(!$(this).find("input").is(':focus')){
                    $(this).find("input").data("mouse",true);
                }
            })

            $(".btGlook input").click(function (e) {
                var mouse = false; 
                if($(this).data("mouse")){
                    mouse = true;
                }
                $(".btGlook").removeClass("weightGrow");
                $(this).parent().addClass("weightGrow");
                if ($(this).is(':checked')) {
                    $("#trStep .chatButtons .button-submit").addClass("button-progressive");
                    if(mouse){
                        $("#trStep .button-submit").click();
                    }
                }
                $(this).removeData("mouse");
            });

            setTimeout(function(){ 
                $('#gcMoreContainer')[0].scrollTop = 0;
            }, 200);

        
            $('#gcMoreContainer').on('scroll', function(){
                var $this = $(this)[0];
                if($this.scrollTop > 0){
                    $(this).parent().addClass('scrolled');
                }else{
                    $(this).parent().removeClass('scrolled');
                }

                if(($this.scrollTop + $this.offsetHeight) == $this.scrollHeight){
                    $(this).parent().addClass('scrollbottom');
                }else{
                    $(this).parent().removeClass('scrollbottom');
                }
            })
        
            $("[name='postalCode']").on('keyup change', function (e) {
                if (e.which == 13) {
                    return;
                }
            
                var zipVal = this.value;
                if (validateZip(zipVal)) {
                    //if it's an enter key then we're validating on server as well... so skip this
                    self.clearErrors();
                    // $(".errorMessageSummary").fadeOut("fast");
                    // $("#zipStep input").removeClass('invalidField');
                    $("#zipStep .button-submit").addClass('button-ready');
                    $("#zipStep .button-submit").removeClass('logGray');
                    //show bgcheck msg for IL/NJ/CT
                    var ILZIP = (zipVal >= 60001 && zipVal <= 62999);
                    var NJZIP = (zipVal >= 7001 && zipVal <= 8989);
                    var CTZIP = ((zipVal >= 6001 && zipVal <= 6389) || (zipVal >= 6401 && zipVal <= 6928));
                    if (ILZIP || NJZIP || CTZIP) {
                        $('.bgcheck').show(); return
                    }
                } else {
                    $("#zipStep .button-submit").removeClass('button-ready');
                    $("#zipStep .button-submit").addClass('logGray');
                }
                
                $('.bgcheck').hide();
                
            });

            $("[name='password']").on('keyup change', function (e) {
                if (e.which == 13) {
                    return;
                }
                var passWrdVal = this.value;
                var passWrd = /^\w+$/;
                if (passWrd.test(passWrdVal) && $("[name='password']").val().length >= 1) {
                    // $(".errorMessageSummary").fadeOut("fast");
                    // $(".password input").removeClass('invalidField');
                    self.clearErrors();
                    $("#passwordStep .button-submit").addClass('button-ready');
                    $("#passwordStep .button-submit").removeClass('logGray');
                } else {
                    $("#passwordStep .button-submit").removeClass('button-ready');
                    $("#passwordStep .button-submit").addClass('logGray');
                } 
            });

            $("[name='firstname']").on('keyup change', function (e) {
                if (e.which == 13) {
                    return;
                }
                var userVal = this.value;
                var usrReg = /^[a-zA-Z'-]+$/;
                if (usrReg.test(userVal) && $("[name='firstname']").val().length >= 2) {
                    self.clearErrors();
                    $("#firstnameStep .button-submit").addClass('button-ready');
                    $("#firstnameStep .button-submit").removeClass('logGray');
                    
                } else {
                    $("#firstnameStep .button-submit").removeClass('button-ready');
                    $("#firstnameStep .button-submit").addClass('logGray');
                }
            });


            $('.togglepassword').click(function () {
                if($(this).text() === "hide"){
                    $(this).text("show");
                }else{
                    $(this).text("hide");
                }
                var input = $(this).siblings("input")[0];
                if (input.type === "password") {
                    logRegEvent(self.currentLogStep(), "Show Password");
                    input.type = "text"
                }
                else {
                    logRegEvent(self.currentLogStep(), "Mask Password");
                    input.type = "password";
                }
            })    

            $(".lstClick").click(function (event) {
                $(".fieldset").removeClass('lstAnimate');
            });

            $('.fb-login').on('click', function (e) {
                e.preventDefault();
                logRegEvent(self.currentLogStep(), '{facebook: "accepted"}')
                // Redirect to facebook for authentication
                var zipCode = $("INPUT[name='postalCode']", _container).val();
                zipCode = zipCode.replace(/ /g, '');
                var showSurveyFlag = $("INPUT[name='showSurvey']").val();
                var existingQs = (document.location.href.split("?")[1] == undefined) ? "" : document.location.href.split("?")[1] + "&";
                var qs = document.location.href.split("?")[0] + "?" + existingQs + "fb=1" + "&showSurvey=" + showSurveyFlag;                 
                logRegEvent(self.currentLogStep(), '{facebook: "redirect to fb" }')
                window.location = getAuthUrl(qs)// "https://www.facebook.com/v2.7/dialog/oauth?scope=email,user_photos&client_id=" + _fb.appId + "&redirect_uri=" + redirectUrl;
            });

            

        }

        function initializeFlow(){
            var promise = new Cortado.Promise();
            var gc = queryString.gc;
            var tr = queryString.tr;
            var lage = queryString.lage;
            var uage = queryString.uage;
            var pc = queryString.pc; 

            if(lage !== undefined){
                $("input[name='ageSeekLow']").val(queryString.lage);
            }
            if(uage !== undefined){
                $("input[name='ageSeekHigh']").val(queryString.uage);
            }
            
            if (gc !== undefined || tr !== undefined) {

                if(gc !== undefined){
                    if(gc === "1" || gc === "2"){
                        $("input[name='gender']").val([queryString.gc]);
                    }
                }else{
                    if(tr === "1"){
                        $("input[name='gender']").val(["2"]);
                    }else if(tr === "2"){
                        $("input[name='gender']").val(["1"]);
                    }
                }
                if(tr !== undefined){
                    if(tr === "1" || tr === "2"){
                        $("input[name='genderSeek']").val([queryString.tr]);
                    }
                }else{
                    if(gc === "1"){
                        $("input[name='genderSeek']").val(["2"]);
                    }else if(gc === "2"){
                        $("input[name='genderSeek']").val(["1"]);
                    }
                }

                if(!_fb.redirectFromFacebook){
                    // calculateGGS();
                    if (tr && tr !== "3"){
                        removeFromFlow('gc');
                        removeFromFlow('tr');
                        $('#dobStep .laraChatText').css({'display': 'none'});
                        $('#dobStep .laraChatText.preFilled').css({'display': 'inline-block'});
                        logRegEvent(0, '{prefilled: "gc"}');//funnel logic
                        logRegEvent(0, '{prefilled: "tr"}');//funnel logic
                    }
                    switch(tr){
                        case "2": 
                        break;
                        case "3":
                            $(".selfGender .chatButtons").hide();
                            $(".selfGender .chatButtonsMore").show();
                            $(".matchLetterMarkBox").addClass('nologo');
                            setTimeout(function(){ 
                                $('#gcMoreContainer')[0].scrollTop = 0;
                            }, 200);
                            $('.gcMoreBtn:first').focus();
                        break;
                    }
                }
            }

            if(validateZip(pc)){
                $("input[name='postalCode']").val(pc);
                removeFromFlow('zip');
                if(!_fb.redirectFromFacebook){
                logRegEvent(0, '{prefilled: "zip"}');//funnel logic
                }
            }

            $("INPUT[name='showSurvey']").val(queryString.showSurvey || $("INPUT[name='showSurvey']").val());
            
            /*
            fbConnect(function (fb) {
                _fb.data = fb;
                // if (queryString.error_code == 200 && !queryString.code) {
                //     console.log('facebook error');
                //     promise.reject('facebook error');
                //     //need to show an error here
                // }
                if (fb.status === 'connected'){
                    self.fbAuthorized = true;
                    if(_fb.redirectFromFacebook){
                        // self.funnelPrefix = 'facebook-manual';
                        logRegEvent(self.currentLogStep(), '{facebook: "authorized"}');
                        removeFromFlow('fb');
                        // pushDataLayer(self.currentStep);
                        getFBData(function (data, fbUser) {
                            // console.log('fbUser', fbUser);
                            populateFormFB(data, fbUser, function(){
                                $('#dobStep').find('.laraChatText').html("Awesome! What's your <strong>birthdate?</strong>");
                                // logRegEvent(self.currentLogStep(), '{facebook: "Data Autofilled"}');
                                
                                // self.startFunnelStep = 2;
                                promise.resolve();
                            });
                        }); 
                    }else{
                        logRegEvent(self.currentLogStep(), '{facebook: "logged"}');
                        promise.resolve();
                    }

                }
                else if(fb.status == 'unknown'){
                    if(_fb.redirectFromFacebook){
                        logRegEvent(self.currentLogStep(), '{facebook: not authorized"}');
                        self.fbAuthorized = false;
                        self.startFunnelStep = 2;
                        removeFromFlow('fb');
                    }else{
                        logRegEvent(self.currentLogStep(), '{facebook: not logged"}');
                        // console.log('not logged in to facebook');
                        removeFromFlow('fb');
                    }
                    promise.resolve();
                } 
                else if (fb.status == 'not_authorized'){
                    promise.resolve();
                    logRegEvent(self.currentLogStep(), '{facebook: logged"}');
                    // console.log('logged in to facebook but the app is not authorized yet');
                }
            });
            */

            removeFromFlow('fb');
            promise.resolve();

            return promise;

        }

        function currentStepId(){
            var step = self.flow[self.currentStep];
            return step.id;
        }

        function nextStepId(){
            var step = self.flow[self.currentStep+1];
            return step.id;
        }

        function currentStepErrors(){
            var step = self.flow[self.currentStep];
            var errors = step.errors;
            if(errors){
                delete step.errors;
            }
            return errors;
        }

        function showErrors(errors){
            $('.fieldset.active input').focus().addClass('invalidField');
            MatchCore.CPX.Messaging.show(errors);

            errors.forEach(function (error) {
                var details = '{error : ' + error.Text + '}';//funnel logic
                var value = error.Value
                logRegError(MatchCore.CPX.progressive.currentLogStep(), details, value);//funnel logic 
            });

            
        }

        function clearErrors(){
            $(".errorMessageSummary").fadeOut("fast");
            $(".fieldError").fadeOut("fast");
            $(".invalidField").removeClass('invalidField');
            MatchCore.CPX.Messaging.reset();
        }

        function getStepNumber(field){
            var stepNumber = 0;
            self.flow.map(function(step, index){
                if(step.fields.indexOf(field) !== -1){
                    stepNumber = index;
                }
            })
            return stepNumber
        }

        function next() {   
            // console.log('next');
            self.clearErrors();

            if(self.flow.length > 1){
                if(_fb.redirectFromFacebook){
                    if(!self.init){
                        self.currentStep++;
                    }
                }else{
                    self.currentStep++;
                }
            }
            //is this still needed? what does prestine do?
            if (self.currentStep > 0) {
                _container.removeClass("prestine");
            } else {
                _container.addClass("prestine");
            }
            _steps.removeClass('active');
            $("#"+self.currentStepId()).addClass("active");

            var errors = self.currentStepErrors();
            if(errors && errors.length > 0){
                self.showErrors(errors);
            }
            $("#"+self.currentStepId()).find("input").focus();
            setProgressBar();
            pushDataLayer(self.currentStep);
            if(self.init){
                self.init = false;
            }
        }

        function setProgressBar(){
            var total = self.totalSteps + 1;
            var current = self.currentStep + 1;
            var progress = (current/total).toFixed(2) * 100;
            // console.log('total', total);
            // console.log('current', current);
            // console.log('progress', progress);
            $('.progressBarStatus').css({width: progress + '%'});
        }

        function setupPlaceholders(){
            if(isIE11){
                $('input[type="text"], input[type="password"]').attr('placeholder', '');
                $('.placeholder').show();
                $('input[type="text"], input[type="password"]').on('keyup', function(){
                    var $this = $(this);
                    var $placeholder = $this.siblings('.placeholder');
                    if($this.val() !== ''){
                        $placeholder.hide();
                    }else{
                        $placeholder.show();
                    }
                })
            }
        }

        function updateSteps(){
            // console.log('updateSteps');
            self.clearErrors();
            _steps.removeClass('active');
            $("#"+self.currentStepId()).addClass("active");
            var errors = self.currentStepErrors();
            if(errors && errors.length > 0){
                self.showErrors(errors);
            }
            $("#"+self.currentStepId()).find("input").focus();
            pushDataLayer(self.currentStep); 
            if(self.init){
                self.init = false;
            }
        }
        
        var self = {
            init: function () {
                _container = $("#progressive"),
                _clientData = _container.data(),
                _form = _container[0],
                _steps = $('.fieldset', _container);
                this.formData = formData;
                this.flow = flow;
                this.totalSteps = flow.length;
                this.currentStep = 0;
                this.meta = _clientData;
                this.funnelPrefix = _funnelPrefix;
                this.startFunnelStep = _startFunnelStep;
                this.fbAuthorized = false;
                this.init = true;
                initializeFlow()
                .then(function(){
                    
                    wireUpEvents();
                    
                        //this is where the logging prefix will be set
                    if(_fb.redirectFromFacebook){
                        // this.currentStep = 0;
                        if(self.fbAuthorized){
                            self.currentStep = 0;
                                validate().then(
                                    function valid() {                           
                                        // Submit partial validation
                                        MatchCore.CPX.Registration.validate.apply(_container.find('.registerView'));
                                        $("input").blur();     
                                    },
                                    function invalid(msg) {
                                        // MatchCore.CPX.Messaging.reset();
                                        var currentStepId = self.currentStepId();
                                        if(_fb.user.birthday){
                                        // if(_fb.user.birthday && currentStepId == 'dobStep'){
                                            MatchCore.CPX.Registration.validate.apply(_container.find('.registerView'));
                                        }else{
                                            updateSteps();
                                        }

                                    }
                                );
                        }else{
                            updateSteps();
                        } 
                        self.startFunnelStep = 2;
                    }
                    else {
                        if (!_fb.redirectFromFacebook) {
                            logRegFunnel(currentLogStep(), '{step: "load"}');
                        }
                        // MatchCore.CPX.Registration.validate.apply(_container.find('.registerView'));
                        updateSteps();
                    }
                    
                    setProgressBar();
                });
            },
            currentStepId: currentStepId,
            nextStepId: nextStepId,
            currentStepErrors: currentStepErrors,
            getStepNumber: getStepNumber,
            currentLogStep: currentLogStep,
            addToFlow: addToFlow,
            removeFromFlow: removeFromFlow,
            showErrors: showErrors,
            clearErrors: clearErrors,
            next: next,
            updateSteps: updateSteps,
            hideAll: function () {
                _steps.hide();
            },
        };
        return self;
    }();

    MatchCore.CPX.Detection.setCookiesView($("#progressive"), $("#no_cookies"));

    MatchCore.CPX.Registration.onInvalid(function (response) {
        onFailure(response);
    });
    MatchCore.CPX.Registration.onValid(function (response) {
        var progFlow = MatchCore.CPX.progressive;
        var currentLogStep = progFlow.currentLogStep();
        // createSearchCookie();
        var fbAuthorized = progFlow.fbAuthorized;
        var stepId = progFlow.currentStepId();
        var step = progFlow.currentStep;
        var addToFlow = progFlow.addToFlow;
        // var removeFromFlow = progFlow.removeFromFlow;

        var fields = progFlow.flow[progFlow.currentStep].fields;
        var prefix = progFlow.funnelPrefix;
        if(progFlow.currentStep !== progFlow.totalSteps - 1){
            if(noLoggingStep.indexOf(stepId) == -1){//stepId !== 'fbStep' && stepId !== 'ageCheckStep'){
                if(facebookFields.indexOf(stepId) !== -1 && _fb.redirectFromFacebook && progFlow.fbAuthorized){
                    prefix = 'facebook-manual'
                    if(stepId == 'emailStep' && emailUpdate && fbUserFields.indexOf(stepId) !== -1){
                        prefix = 'facebook-update'; 
                    }
                }
                if(!progFlow.init){
                    logRegFunnel(currentLogStep, '{'+prefix+': "' + fields.join(',') + '"}');//funnel logic
                }
            }
        }

        /*** this is only needed for PAID */
        if(step == 0){
            $('.mobFooter').hide();
            $('.alreadyMember').hide();
        }
        
        if(step == self.totalSteps){
            $('#'+stepId).find('.button-submit').addClass('loading');
        }

        switch(stepId){
            case 'gcStep':
                var selfGender = $("input[name='gender']:checked").val();
                if(selfGender){
                    switch(selfGender){
                        case "1":
                            logRegFunnel(currentLogStep, '{self gender} | {Man}');
                            break;
                        case "2":
                            logRegFunnel(currentLogStep, '{self gender} | {Woman}');
                            break;
                    }
                } else {
                    logRegFunnel(currentLogStep, '{self gender} | {More Options}');
                }

                var genderIdentity = $("input[name='genderIdentity']:checked").val();
                if(genderIdentity){
                    $(".lookingFor .laraChatText").css({'display': 'none'});
                    $(".lookingFor .laraChatText.both").css({'display': 'inline-block'});
                    $(".lookingFor .btGlook.both").css({'display': 'block'});

                    if( genderIdentity == "1075" || genderIdentity == "1076" ){
                        // MatchCore.CPX.progressive.removeFromFlow('showMe');
                        $("input[name='gender']:checked").prop('checked', false);
                        if(genderIdentity == "1075"){
                            $('#man').prop('checked', true);
                            $('#moreMan').prop('checked', false);
                            logRegFunnel(currentLogStep+"a", '{non-binary} | {Man}');
                        }else{
                            $('#woman').prop('checked', true);
                            $('#moreWoman').prop('checked', false);
                            logRegFunnel(currentLogStep+"a", '{non-binary} | {Woman}');
                        }
                    } else {
                        // addToFlow({ fields: ["showMe"], id: 'showMeStep' }, 'tr');
                        logRegFunnel(currentLogStep+"a", '{non-binary} | {Non-binary}');
                    }
                }

                var showMeValue = $("input[name='genderPick']:checked").val();
                if(showMeValue){
                    switch(showMeValue){
                        case "1":
                            $('#man').prop('checked', true);
                            logRegFunnel(currentLogStep+"b", '{shown to} | {Men}');
                            break;
                        case "2":
                            $('#woman').prop('checked', true);
                            logRegFunnel(currentLogStep+"b", '{shown to} | {Women}');
                            break;
                    }
                }
                
                
                
                break;
            case 'trStep':
                if (detectOS != "iOS") {
                    // $("#birthDate").css("display", "none");               
                } else {
                    // $(".birthMonth, .birthDay, .birthYear").css("display", "none"); 
                }
                // calculateGGS();
                var trValue = $("input[name='genderSeek']:checked").val();
                switch(trValue){
                    case "1":
                        logRegFunnel(currentLogStep, '{"interest"} | {Men}');
                        break;
                    case "2":
                        logRegFunnel(currentLogStep, '{"interest"} | {Women}');
                        break;
                    case "3":
                        logRegFunnel(currentLogStep, '{"interest"} | {Everyone}');
                        break;
                }
                TrackGGSEvent();
                break;
            case 'gcMoreStep':
                
                break;
            case 'showMeStep':
                var showMeValue = $("input[name='genderPick']:checked").val();
                switch(showMeValue){
                    case "1":
                        logRegFunnel(currentLogStep, '{shown to} | {Men}');
                        break;
                    case "2":
                        logRegFunnel(currentLogStep, '{shown to} | {Women}');
                        break;
                }
                break;
            case 'zipStep': 
                TrackZipEvent();
                TrackGAZipEvent().then(function () {
                    _googleAdwordsZipReg();
                });  
                break;
            case 'fbStep':
                logRegEvent(currentLogStep, '{facebook: "ignored"}');
                break;
            case 'emailStep':
                TrackGAEmailEvent();
                break;
        }

        MatchCore.CPX.progressive.next();
    });
    MatchCore.CPX.Registration.onFailure(function (response) {
        onFailure(response);
    });
    MatchCore.CPX.Registration.onSuccess(function (response) {
        // findFunnelLoggingStepByActiveClass();
        createSearchCookie();
        TrackGAHandleEvent();
        MatchCore.CPX.ui_busy();
        var currentStep = MatchCore.CPX.progressive.currentStep;
        var funnelPrefix = MatchCore.CPX.progressive.funnelPrefix;
        var fields = MatchCore.CPX.progressive.flow[currentStep].fields;
        logRegFunnel(MatchCore.CPX.progressive.currentLogStep(),  '{'+funnelPrefix+': "' + fields.join(',') + '"}');
        logRegFunnel(MatchCore.CPX.progressive.currentLogStep()+1, '{step: "success"}');//funnel logic
        var showSurveyFlag = $("INPUT[name='showSurvey']").val();
        if (showSurveyFlag == "True"){
            showSurvey().then(redirectPostRegistration);
        }
        else {
            redirectPostRegistration();
        }
    });

    $(document).ready(function () {
        
        MatchCore.CPX.progressive.init();
    });

    $(document).keypress(function (e) {
        if (e.which == 13) {
            if ($(".registerView").css("display") !== "none") {
                $('.fieldset.active').find('.button-progressive').trigger('click');
                $('.fieldset.active .active').find('.button-submit').trigger('click');
                $('.fieldset.active').find('.more-options.live').trigger('click');
                $('.fieldset.active').find('.btnInactiveSubmit').trigger('click');
                $('#dobStep.fieldset.active').find('.button-submit:not(.button-ready)').trigger('click');
                $('#surveyStep.fieldset.active').find('.button-ready').trigger('click');
                return false;
            }
            e.preventDefault();
        }
    });

    function redirectPostRegistration() {
        var redirectUrl = "/profile/myprofile.aspx";
        if (queryString.ux)
            redirectUrl = (queryString.ux === "1") ? "http://match.com/search" : (queryString.ux === "2") ? "http://match.com/user" : "http://match.com/profile/edit";
        else
            $("#success").find('.link').attr("href", redirectUrl + "/?regstate=1");
        
        logRegEvent(MatchCore.CPX.progressive.currentLogStep()+1, '{redirect:"myprofile"}');//funnel logic
        window.location.href = redirectUrl + "/?regstate=1"; //+ mobileToken;
    }
    
    /**/
    function validateZip(zipval) {
        var zpCode = /^[0-9]{5}$/;
        var zpCodeCanada = /^[ABCEGHJKLMNPRSTVXY][0-9][A-Z][\s]*[0-9][A-Z][0-9]$/i;
        if (zpCode.test(zipval) || zpCodeCanada.test(zipval))
            return true;
    }

    function onFailure(data) {
        var stepId = MatchCore.CPX.progressive.currentStepId();
        $('#'+stepId).find('.button-submit').removeClass('loading');
        $('BODY').removeClass('ui-loading-block');
        // var errorMessage = data[0].Messages[0].Text;
        // var messageValue = data[0].Messages[0].Value;
        // MatchCore.CPX.Messaging.reset();
        var errors = [];
        var showErrorsFlag = true;
        data[0].Messages.map(function(error){
            //if Email Address is already in use
            
            if(error.Text.indexOf("Sorry! Match is only for adults.") > -1) {
                var currentStepId = MatchCore.CPX.progressive.currentStepId();
                if(currentStepId == 'dobStep'){
                    var currentStep = MatchCore.CPX.progressive.currentStep;
                    var funnelPrefix = MatchCore.CPX.progressive.funnelPrefix;
                    var fields = MatchCore.CPX.progressive.flow[currentStep].fields;
                    logRegFunnel(MatchCore.CPX.progressive.currentLogStep(), '{'+funnelPrefix+': "' + fields.join(',') + '"}');//funnel logic
                }
                
                var details = '{error : ' + error.Text + '}';//funnel logic
                var value = error.Value
                logRegError(MatchCore.CPX.progressive.currentLogStep(), details, value);//funnel logic  
                logRegEvent(MatchCore.CPX.progressive.currentLogStep(), '{"underage gate"}');//funnel logic
                
                MatchCore.CPX.progressive.flow = [{ fields: ["ageCheck"], id: 'ageCheckStep' }];
                MatchCore.CPX.progressive.currentStep = 0;
                MatchCore.CPX.progressive.next();
            }
            else if (error.Text.indexOf("Your password cannot be the same as your username") > -1) {
                    errors.push({ "Field": "password", "Text": "Your password cannot be the same as your first name. Please enter a different password and re-submit your information."});
                    $("INPUT[name='password']").val('');
                    $(".button-submit").removeClass('button-ready');
            }
            else if (error.Text.indexOf("Please enter a valid zip/postal code.") > -1){
                errors.push({ "Field": "postalCode", "Text": "Please enter a valid zip/postal code."});
            }
            else if (error.Text.indexOf("First names can only contain letters, apostrophes, and hyphens.") > -1){
                errors.push({ "Field": "firstname", "Text": "First names can only contain letters, apostrophes, and hyphens."});
            }
            else if (error.Text.indexOf("The email address you entered is invalid. Please re-enter your email address and re-submit your information") > -1) {
                    $("#emailStep input").addClass('invalidField');
                    $("#emailStep .button-submit").removeClass('button-ready');
                    $("#emailStep .button-submit").addClass('logGray');
                    $("#emailStep .label").addClass('labeActive');
                    errors.push({ "Field": "email", "Text": "The email address you entered is invalid. Please re-enter your email address and re-submit your information."});
            }
            else if (error.Text.indexOf("The email address you entered cannot be used to register") > -1){
                    $("#emailStep input").addClass('invalidField');
                    $("#emailStep .button-submit").removeClass('button-ready');
                    $("#emailStep .button-submit").addClass('logGray');
                    $("#emailStep .label").addClass('labeActive');
                    error.Text = "The email address you entered cannot be used to register. Please enter another email address.";
                    error.Field = "email";
                    MatchCore.CPX.progressive.addToFlow({ fields: ["email"], id: 'emailStep', errors: [error] }, 'password');
                    var currentStepId = MatchCore.CPX.progressive.currentStepId();
                    var currentStep = MatchCore.CPX.progressive.currentStep;
                    var nextStepId = MatchCore.CPX.progressive.nextStepId();
                    if(_fb.redirectFromFacebook){
                        emailUpdate = true;
                    }
                    if(currentStepId !== 'emailStep'){
                        $("#emailStep input").val('');
                        if(nextStepId == 'emailStep'){
                            // errors.push(error);
                        }
                        MatchCore.CPX.progressive.next();
                        showErrorsFlag = false;
                        return;
                    }else{
                        $("#emailStep input").val('');
                        // errors.push(error);
                        MatchCore.CPX.progressive.updateSteps();
                        return;
                    }
            }
            else {
                    errors.push(error);
            }

        })
        var stepId = MatchCore.CPX.progressive.currentStepId();
        switch(stepId){
            case 'ageCheckStep':
                MatchCore.CPX.progressive.clearErrors();
            break;
            case 'dobStep':
                $("input, #dob").addClass('invalidField');
                $("#bdayText").removeClass('bText');
                $("#thankYou").removeClass('Thanks');
            break;
            case 'zipStep':
                $("#zipStep .button-submit").removeClass('button-ready');
                $("#zipStep .button-submit").addClass('logGray');
            break;
            default:
                $('.fieldset.active input').focus().addClass('invalidField');
            break;
        }
        if(showErrorsFlag && errors && errors.length > 0){
            MatchCore.CPX.progressive.showErrors(errors);
        }

        if (MatchCore.CPX.progressive.currentStep === MatchCore.CPX.progressive.totalSteps - 1){
            $('.fieldset.active input').focus().addClass('invalidField');
        }
    }

    function createSearchCookie() {
        var formData = MatchCore.CPX.progressive.formData;
        var basicSearchCookieKeys = [];
        basicSearchCookieKeys['K01'] = formData.gc.toString();
        basicSearchCookieKeys['K02'] = formData.tr.toString();
        basicSearchCookieKeys['K03'] = formData.lage;
        basicSearchCookieKeys['K04'] = formData.uage;
        $.eraseCookie('dMatchSearch2');
        $.createCookie('dMatchSearch2', basicSearchCookieKeys, false, true);
    }

    function logGrayButton(){
        $("#progressive").on('click touchstart', '.logGray', function (e) {
               
            if (validateZip(queryString.pc)) {
                logRegEvent(MatchCore.CPX.progressive.currentLogStep(), '{action: "click disabled button"}');
            }else{
                logRegEvent(MatchCore.CPX.progressive.currentLogStep(), '{action: "click disabled button"}');
            }
                e.preventDefault();
                return false;
            });
    }

    function showSurvey() {
        var defer = $.Deferred();
        $('.skipSurvey').show();
        $('.alreadyMember').hide();
        $('.member-link').hide();
        $('.skipSurvey').contextmenu(function () {
            return false;
        });

        logRegSurvey(0, '{Show Survey}');//funnel logic

        function submitSurvey() {
            var quespos = $("#surveyStep label").index($("#surveyStep .weightGrow"));
            var quesvalue = $('input[name="Answers"]:checked').val();
            $("#surveyStep .weightGrow").addClass('loading');
            var saveSurvey = "QuestionID=1&OtherText=&QuestionPos=" + quespos + "&" + "Answers="+quesvalue;
            $.ajax({
                type: "POST",
                url: '/Registration/SubmitPostRegistrationSurvey/',
                data: saveSurvey
            }).always(function () {
                logRegSurvey(1, '{Success}');//funnel logic
                defer.resolve();
            });
        }
        function randomize() {
            var ul = $("#surveyStep .chatButtons"), elems = ul.children("label:not(.fixed)");
            elems.detach().sort(function () { return (Math.round(Math.random()) - 0.5); }).prependTo(ul);
        }
        $("#surveyStep .button-submit").on('click', function(e) {
            submitSurvey();
        });

        $(".surveyBtn").on('click', function (e) {
            if($('.surveyBtn').hasClass('loading')){
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            if(!$(this).find("input").is(':focus')){
                $(this).find("input").data("mouse",true);
            }
        })

        $(".surveyBtn input").on('click', function (e) {
            var mouse = false; 
            if($(this).data("mouse")){
                mouse = true;
            }
            $(".surveyBtn").removeClass("weightGrow");
            $(this).parent().addClass("weightGrow");
            if ($(this).is(':checked')) {
                $("#surveyStep .chatButtons .button-submit").addClass("button-ready");
                if(mouse){
                    $("#surveyStep .button-ready").click();
                }
            }
            $(this).removeData("mouse");
        });

        $("a.skipSurvey").on('click', function () {
            logRegSurvey(0, '{action: "click skip survey"}');//funnel logic
            defer.resolve();
        });
        randomize();
        
        $('.fieldset.active').removeClass("active");
        $(".surveyView").addClass('active');
        $(".surveyBtn:first").focus();
        return defer.promise();
    }

    //Google pixel tracking ZIP and GGS to be fired after submitting the Info
    function TrackZipEvent() {
        var zipCode = ($("INPUT[name='postalCode']").val());

        var _trackZipEvent = document.createElement('div');
        _trackZipEvent.innerHTML = '_gaq.push(["_trackEvent", "Homepage Callout", "Paid Desktop Flow", "Zip Submit" ]); _gaq.push(["_setCustomVar", 4, "Zip Code", "' + zipCode + '", 1]);';
        document.getElementsByTagName("head")[0].appendChild(_trackZipEvent);
            
        _gaq.push(["_trackEvent", "Homepage Callout", "Paid Desktop Flow", "Zip Submit"]);
         _gaq.push(["_setCustomVar", 4, "Zip Code", zipCode, 1]); 

    }

    //Add Google Adwords Tag on Zip Event
    var TrackGAZipEvent = function () {
        try {
            var _googleAdwordsTag;
            _googleAdwordsTag = document.createElement('div');
            _googleAdwordsTag.innerHTML = '<script type="text/javascript">goog_snippet_vars = function(){ var w = window; w.google_conversion_id = 1066653409; w.google_conversion_label = "7do4CJmPz4UBEOGtz_wD";w.google_remarketing_only = false; } goog_report_conversion = function (url) { goog_snippet_vars(); window.google_conversion_format = "3"; var opt = new Object(); opt.onload_callback = function () { if (typeof (url) != "undefined") { window.location = url; } }var conv_handler = window["google_trackConversion"]; if (typeof (conv_handler) == "function") { conv_handler(opt); } }</script > <script type="text/javascript" src="//www.googleadservices.com/pagead/conversion_async.js"></script>';
            document.getElementsByTagName("head")[0].appendChild(_googleAdwordsTag);
            goog_snippet_vars = function () { var w = window; w.google_conversion_id = 1066653409; w.google_conversion_label = "7do4CJmPz4UBEOGtz_wD"; w.google_remarketing_only = false; }// DO NOT CHANGE THE CODE BELOW.
            _googleAdwordsZipReg = goog_report_conversion = function (url) {
                goog_snippet_vars(); window.google_conversion_format = "3"; var opt = new Object(); opt.onload_callback = function () { if (typeof (url) != 'undefined') { window.location = url; } }
                var conv_handler = window['google_trackConversion']; if (typeof (conv_handler) == 'function') { conv_handler(opt); }
            };
            var promise = new Cortado.Promise();
            var tag = document.createElement('script');
            tag.src = '//www.googleadservices.com/pagead/conversion_async.js';
            tag.async = true;
            tag.onload = function () {
                promise.resolve();
            };
            document.getElementsByTagName("head")[0].appendChild(tag);
            return promise;
        } catch (e) {}
    };
    
    function TrackGGSEvent() {       
        var _gc = $("input[type=radio][name=gender]:checked").val(); 
        var _tr = $("input[type=radio][name=genderSeeek]:checked").val();

        var _trackGGSEvent = document.createElement('div');
        _trackGGSEvent.innerHTML = '_gaq.push(["_trackEvent", "Homepage Callout", "Paid Desktop Flow", "Gender Submit" ]); _gaq.push(["_setCustomVar", 2, "Gender seeking Gender", "' + _gc + '":"' + _tr + '", 1]); ';
        document.getElementsByTagName("head")[0].appendChild(_trackGGSEvent);

        _gaq.push(["_trackEvent", "Homepage Callout", "Paid Desktop Flow", "Gender Submit"]);
        _gaq.push(["_setCustomVar", 2, "Gender seeking Gender", _gc+":"+_tr, 1]); 
    }

    // Start---Google pixel tracking Email and user steps to be fired after submitting the Info
    function TrackGAEmailEvent() {
        var _trackEmailEvent = document.createElement('div');
        _trackEmailEvent.innerHTML = '_gaq.push(["_trackEvent", "Homepage Callout", "Paid Desktop Flow", "Email Submit"]);';
        document.getElementsByTagName("head")[0].appendChild(_trackEmailEvent);
        _gaq.push(["_trackEvent", "Homepage Callout", "Paid Desktop Flow", "Email Submit"]);
    }

    function TrackGAHandleEvent() {
        var _user = document.createElement('div');
        _user.innerHTML = '_gaq.push(["_trackEvent", "Homepage Callout", "Paid Desktop Flow", "Username Submit"]);';
        document.getElementsByTagName("head")[0].appendChild(_user);
        _gaq.push(["_trackEvent", "Homepage Callout", "Paid Desktop Flow", "Username Submit"]);

    }
     // End---Google pixel tracking Email and user steps to be fired after submitting the Info

})(jQuery);


createCjEventCookie();

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); name.toLowerCase();
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search.toLowerCase());
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function createCjEventCookie() {
    var cjeventid = getParameterByName('cjevent');
    var now = new Date();
    var time = now.getTime();
    var expTime = time + 1000 * 31536000;
    now.setTime(expTime);
    if (cjeventid) {
        if (window.location.hostname.indexOf("ca") > -1)
            document.cookie = "cjevent=" + cjeventid + "; expires=" + now.toGMTString() + "; domain=.match.ca; path = /";
        else
            document.cookie = "cjevent=" + cjeventid + "; expires=" + now.toGMTString() + "; domain=.match.com; path = /";
    }
}