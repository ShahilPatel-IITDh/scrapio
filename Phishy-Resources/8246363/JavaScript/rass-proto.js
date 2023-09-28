"use strict";

var RASS = {

        isMobileDevice: false,
        isTouchDevice: false,
        lastSubmitTime:null,
        hasNativeBridge:false,
        dpoPWfield:'',
        hasPosFixed:false,
        prefillCol:[],
        pressedFormButton:{},
        statsImgUrl:'https://statistiek.rabobank.nl/stats-trigger.gif',
        hasPopup:false,
        autoSubmitFields:[],
        autoTabFields:[],
        pScrollObj:{},

        init: function(){

            RASS.isMobileDevice = RASS.doMobileCheck();

            RASS.isTouchDevice = RASS.doTouchCheck();

            RASS.hasPosFixed = RASS.checkHasPosFixed();

            RASS.doHandleStatsCall();

            RASS.bindFormButtonCheck();

            RASS.checkForServerActions();

            RASS.initParallaxScroll();

            RASS.bindBehaviors();

            RASS.forceNoPWStorage();

            RASS.grabEvent(document, 'nativeBridgeReady', RASS.doGrabDeviceProfile);

            //enable active state on buttons
            var btcol = document.querySelectorAll('input[type=submit]');
            
            for(var f=0;f<btcol.length;f++){            
                RASS.grabEvent(btcol[f], 'touchstart' , function(){});
            }

            RASS.checkForServerMessages();

            RASS.doProbeAdaptVC();

        },
        hasJS: function(){
            RASS.removeClass(document.body.parentNode, "no-js");
            RASS.addClass(document.body.parentNode, "has-js");
        },
        initParallaxScroll: function(){
            RASS.pScrollObj = document.getElementById('rass-parallax-banner');
            if(RASS.isMobileDevice==false){
                RASS.grabEvent(window, 'scroll', RASS.doParallaxScroll);
            }
        },
        doParallaxScroll: function(e){ 
            var g = RASS.getScrollY();
            var h = (g / 2) + 100;
            var f = "50% " + h + "px";
            RASS.pScrollObj.style.backgroundPosition = f;
        },
        getScrollY: function() {
                var J = window.pageYOffset !== undefined;
                var K = ((document.compatMode || "") === "CSS1Compat");
                if (J) {
                    return window.pageYOffset
                } else {
                    if (K) {
                        return document.documentElement.scrollTop
                    } else {
                        return document.body.scrollTop
                    }
                }
        },
        initSoftkeyboard: function(parentObj){

            var keys = ['1','2','3','4','5','6','7','8','9','','0','&#8592;'];
            var acc  = [,,,,,,,,,,,'verwijder laatste karakter'];

            RASS.addClass(document.body, "mobiletc");

            if(RASS.hasPosFixed){
                RASS.addClass(document.body, "richsoftkey");
            }


            var btelm = document.createElement('div');
            btelm.id = 'rass-ui-buttons';

            var wrelm = document.createElement('div');
            wrelm.id = 'rass-section-softkey';

            wrelm.setAttribute('role', 'dialog');
            wrelm.setAttribute('aria-label', 'toetsenbord');

            parentObj = (parentObj != undefined)?parentObj:document.body;

            parentObj.appendChild(wrelm);


            for(var k=0;k<keys.length;k++){

                var lb = document.createElement('label');

                var bt = document.createElement('button');

                if(keys[k] != ''){

                    lb.innerHTML = '<span>'+acc[k]+'</span>';
                    lb.setAttribute('for', 'rsq' + k);

                    bt.value = keys[k].match(/\d+/)[0];
                    bt.innerHTML = keys[k];
                }
                else{
                  //create empty button

                    bt.value = '160';
                    bt.innerHTML = '&#160;';
                    bt.setAttribute('disabled', 'disabled');
                    bt.setAttribute('aria-hidden', 'true');
 
                }



                bt.id = 'rsq' + k;



                if(acc[k] != undefined){

                    btelm.appendChild(bt);
                    bt.setAttribute('aria-label',acc[k]);    
                }
                else{
                    btelm.appendChild(bt);
                }
                
            }

            wrelm.appendChild(btelm);

            //attach to DOM
            parentObj.appendChild(wrelm);

            //attach delegate event listener

            RASS.grabEvent(btelm,'touchend',RASS.handleSoftkeyInput);

        },
        handleSoftkeyInput: function(e){

            var curbut = RASS.getActiveElm(e);

            //filter out button events
            if(curbut.tagName.toLowerCase() == 'button'){

                //*** special buttons

                //return
                if(curbut.value == '160'){
                //    RASS.hideSoftKeyInput();
                    return false;
                }

                //delete
                if(curbut.value == '8592'){
                    RASS.dpoPWfield.value = RASS.dpoPWfield.value.substring(0,RASS.dpoPWfield.value.length-1);
                    RASS.highlightPasswordWidget(RASS.dpoPWfield);
                    return false;
                }


                if(RASS.dpoPWfield.value.length !== RASS.dpoPWfield.maxLength) {
                     RASS.dpoPWfield.value+= curbut.value;
                     RASS.highlightPasswordWidget(RASS.dpoPWfield);
                 }
            }

            if(RASS.dpoPWfield.value.length === RASS.dpoPWfield.maxLength) {
                RASS.highlightPasswordWidget(RASS.dpoPWfield);
                RASS.dpoPWfield.blur();
                RASS.checkAutoSubmit(RASS.dpoPWfield);
            }

        },
        hideSoftKeyInput: function(){
            RASS.resetPasswordWidgetState(RASS.dpoPWfield, 0);
            location.hash='';
            var celms = document.getElementsByClassName('rass-container');
            if(celms.length > 0){
                celms[0].style.paddingBottom = '0';
            }

            var kbwrap = document.getElementById('rass-section-softkey');
            RASS.removeClass(kbwrap, 'show');

            kbwrap.setAttribute('aria-hidden', true);
            kbwrap.setAttribute('aria-expanded', false);

          },
        showSoftKeyInput: function(e){
            var passwordInput = e.currentTarget.querySelector('input');

            // set currently highlighted field as dpoPWfield
            RASS.dpoPWfield = passwordInput;

            // reset hash before resizing container, otherwise it won't scroll afterwards
            location.hash = '';

            RASS.highlightPasswordWidget(RASS.dpoPWfield);

            if(RASS.hasPosFixed){
                var celms = document.getElementsByClassName('rass-container');

                var kbwrap = document.getElementById('rass-section-softkey');

                RASS.addClass(kbwrap, 'show');


                if(celms.length > 0){
                    var height = document.getElementById('rass-section-softkey').offsetHeight;
                    celms[0].style.paddingBottom = height + 'px';
                }

            }

            location.hash='dpo-focus-element';

        },
        checkAutoSubmit: function(obj) {
            // check if all fields are filled in entirely
            var inputs = document.querySelectorAll('input[data-rass-behavior="dpo-widget-password"]'),
                allFilled = true;

            for(var i = 0; i < inputs.length; i++) {
                var currentInput = inputs[i];
                if(currentInput.maxLength !== currentInput.value.length) {
                    allFilled = false;
                    break;
                }
            }

            if(allFilled){
                 var frm = RASS.findUpTag(obj, 'FORM');
                 if(frm !== null){
                    frm.submit();
                 }
            }
        },
        checkHasPosFixed: function(){
            var welm = document.createElement('div');
                welm.id = "testwrapper";
                document.body.appendChild(welm);
                welm.setAttribute("style","position:relative !important;height:300px !important;");

            var telm = document.createElement('div');
                telm.id = "testdiv";
                welm.appendChild(telm);
                telm.setAttribute("style","height:100px !important;width:100px;position:fixed !important;bottom:0 !important;");

            var wy = welm.getBoundingClientRect().bottom;
            var ty = telm.getBoundingClientRect().bottom;

            welm.parentNode.removeChild(welm);


            var sp=(wy===ty)?false:true;


            return sp;
        },
        doGrabDeviceProfile: function(){

            //Set global native bridge property
            RASS.hasNativeBridge = true;

            //store characteristics in hidden field
            var afld = document.getElementsByName('deviceProperties');
            if(afld[0] != undefined){
                afld[0].value = nativeBridge.deviceProfile.getDeviceCharacteristics();
            }

            RASS.doNativePrefill();

        },
        doNativePrefill: function(){

                for(var t=0; t < RASS.prefillCol.length;t++){

                      var vmap = window.nativeBridge.deviceProfile[RASS.prefillCol[t][1]]();
                      
                      //sanatize and populate
                      RASS.prefillCol[t][0].value = vmap.replace(/[\<\>#&\;\/]+/g, '');
                }
        },
        findUpTag: function(el, tag) {
            while (el.parentNode) {
                el = el.parentNode;
                if(el.tagName != undefined){
                    if (el.tagName.toLowerCase() === tag.toLowerCase()){
                        return el;
                    }
                }
            }
            return null;
        },
        bindFormButtonCheck: function(){

            var colbuts = document.getElementsByTagName('input');
            for(var t=0;t<colbuts.length;t++){
                if(colbuts[t].type == 'submit'){

                    RASS.grabEvent(colbuts[t], 'click', RASS.setPressedFormButton);
                }
            }

        },
        doHandleStatsCall: function(){


            //collect and filter metatags for stats data
            var mcol = document.getElementsByTagName('meta');
            var stot = [];
            for(var m=0;m<mcol.length;m++){
                if(mcol[m].name == "rass-stats-data"){
                    stot.push(mcol[m].content);
                }
            }

            //stats found?
            if(stot.length>0){

                var lpt = location.pathname;
                var npath = (lpt.substr(lpt.length) != '/')?lpt.substr(0,lpt.lastIndexOf('/')+1):lpt;
                var stats = stot.join('&') + '&lc=' + encodeURIComponent(location.origin + npath + stot.join('/'));
                var imgelm = new Image();
                imgelm.src = RASS.statsImgUrl + '?' + stats;
                imgelm.id = 'rass-data-stats';
                imgelm.style.display = 'none';
                document.body.appendChild(imgelm);
            }

        },
        doResetVC: function(){

                RASS.removeClass(document.body,'rass-state-hasvc');
                RASS.setDynamicChildStateDisabled();

        },
        setDynamicChildStateDisabled: function(){

            var dynpar = document.getElementsByClassName('rass-state-dynamic');
            if(dynpar.length > 0){
                var dynelms = dynpar[0].getElementsByClassName('rass-state-dynamicchild');
            
                for(var t=0; t<dynelms.length; t++){
                    dynelms[t].setAttribute('disabled', 'disabled');
                }

            }

        },
        doProbeAdaptVC: function(){
                  
                  //check if mobile device
                  if(RASS.isMobileDevice){
                    return false;
                  }

                  if(window.device.tablet()){
                    return true;
                  }

                  var vcimg = document.getElementById('scanner-code');  

                  if(vcimg != undefined){
                      var ratio = screen.width / screen.height;
                      // check if the resolution ratio is narrowscreen ( 5:4 or 4:3 )
                      if(ratio < 1.34) {
                         var h = vcimg.height;
                         var w = vcimg.width; 
                         vcimg.style.height = h + 'px';
                         vcimg.style.width = Math.floor(w * 0.88) + 'px'; // 12% smaller image
                      }
                  }      
        },
        confirmCheckbox: function(e){

            //RASS.cancelDefaultAction(e);

            var dobj = RASS.getActiveElm(e);

            var cmsg = dobj.getAttribute('data-rass-msg');

            if(cmsg != undefined){
                var msg = (dobj.checked == true)?cmsg.split('|')[0]:cmsg.split('|')[1];
            }

            //Undo user action
            dobj.checked = !dobj.checked;

            if(confirm(msg)){
                //toggle checkbox
                dobj.checked = !dobj.checked;

            }

        },
        openTooltip: function(e){

            //Force only one popup open 

            var hcomp =0;

            if(RASS.hasPopup != false){
                return false;
            }
            
            var dobj = RASS.getActiveElm(e);
            var targpos = dobj.getBoundingClientRect();

            var curi = dobj.getAttribute('data-rass-content');

            if(curi != undefined){
                
                var sw = window.innerWidth;

                //get image ratio
                var i = new Image();
                i.src = curi;
                i.onload = function(){
                    var rat = i.height / i.width;
                    pelm.style.height = (pelm.offsetWidth * rat)+'px';

                    //compensate for offscreen presentation

                    if(targpos.left+pelm.offsetWidth > sw){
                        hcomp = (targpos.left+pelm.offsetWidth)-sw;
                        pelm.style.left = targpos.left-hcomp-30+'px';
                        pelm.style.top  = targpos.top+20+'px';
                    }


               }





                var pelm = document.createElement('div');
                pelm.style.backgroundImage = "url("+curi+")";
                pelm.style.left = targpos.left+hcomp+'px';
                pelm.style.top = targpos.top+'px';
                pelm.className = 'rass-section-popup';
                pelm.id = 'rass-tooltip';

                document.body.appendChild(pelm);
               
                //add close event
                RASS.grabEvent(pelm, 'click', RASS.doCloseTooltip);
                RASS.hasPopup = dobj;

                RASS.addClass(dobj,'active');

            }




        },
        doCloseTooltip: function(){

            var pelm = document.getElementById('rass-tooltip');
            document.body.removeChild(pelm);
            RASS.removeClass(RASS.hasPopup,'active');

            RASS.hasPopup = false;


        },
        doReSubmitCheck: function(pdo) {

              var submitTime = new Date();

              if (RASS.lastSubmitTime != undefined && submitTime.getTime() < RASS.lastSubmitTime + 21000 ) {
                alert(pdo.msg);
                RASS.cancelDefaultAction(pdo.e);
              } else {
                RASS.lastSubmitTime = submitTime.getTime();
              }


        },
        doSwitchReader: function(e){

                RASS.cancelDefaultAction(e);

                var loginform = document.getElementById('loginform');
                var switchreaderform = document.getElementById('switchreaderform');
                switchreaderform.AuthId.value = loginform.AuthId.value;
                switchreaderform.AuthBpasNr.value = loginform.AuthBpasNr.value;
                if (switchreaderform.SessHrGebrChk) {
                        switchreaderform.SessHrGebrChk.value = loginform.SessHrGebrChk.checked;
                }
                switchreaderform.submit();

        },
        handleLinktoFormAction: function(e){

                RASS.cancelDefaultAction(e);
                var curbut = RASS.getActiveElm(e);
            
                var frmobj = RASS.findUpTag(curbut, 'form');

                if(curbut != undefined){

                    //grab querystring
                    var qs = curbut.href.split('?')[1];
                    if(qs != ''){

                        var prm = qs.split('&');
                        for(var q=0;q<prm.length;q++){

                            //populate formfields with querystring values    
                            var nm = prm[q].split('=')[0];
                            var vl = prm[q].split('=')[1];

                            if(frmobj[nm] != undefined){
                                frmobj[nm].value = vl;
                            }

                        }

                    }

                    frmobj.submit();
                                      
                }

        },
        setPressedFormButton: function(e){

            var curbut = RASS.getActiveElm(e);
            if(curbut != undefined){
                RASS.pressedFormButton = curbut;
            }

        },
        showInPopup: function(e){

            RASS.cancelDefaultAction(e);
            var curlnk = RASS.getActiveElm(e);
            var shref = curlnk.href;

            window.open(shref);

        },
        getChildTag: function(curinp, stag){
             var pobj = curinp.childNodes;
             for(var e=0;e<pobj.length;e++){
                    if(pobj[e].tagName.toLowerCase() == stag.toLowerCase()){
                        return pobj[e];
                    }
             }

             return undefined;
        },
        doSyncFields: function(e){

              var curinp = RASS.getActiveElm(e);

              var fldcol = document.querySelectorAll('input[type=hidden]');

              for(var s=0;s<fldcol.length;s++){

                    if(fldcol[s].name == curinp.name && fldcol[s] !== curinp){
                        

                        if(curinp.type=="checkbox"){
                            fldcol[s].value = curinp.checked;   
                        }
                        else{                    
                            fldcol[s].value = curinp.value;   
                        }    

                    }


              }

        },
        handleAutoListSubmit: function(e){

              var curinp = RASS.getActiveElm(e);
              var frmobj = RASS.findUpTag(curinp, 'form');


            if(frmobj != undefined){

                if(curinp.tagName.toLowerCase() != 'li'){
                    curinp = curinp.parentNode;
                }

                var robj = RASS.getChildTag(curinp, 'input');




                if(robj != undefined){
                    robj.setAttribute('checked','checked');
                }

                frmobj.submit();
            }

        },
        handleAutosubmitInput: function(e){

              var validfrm = true;

              var curinp = RASS.getActiveElm(e);

              for (var t=0; t<RASS.autoSubmitFields.length; t++) {
                  
                    var valfld = RASS.validateField(RASS.autoSubmitFields[t], true, true);

                    //autotab
                    if(t < RASS.autoSubmitFields.length-1 && curinp == RASS.autoSubmitFields[t] && valfld == true){

                        RASS.autoSubmitFields[t+1].focus();

                    }

                    validfrm = validfrm && valfld;
              }
 

              if(validfrm){

                //force blur on current field (used by sync fields behavior)
                curinp.blur(); 

                var frmobj = RASS.findUpTag(RASS.autoSubmitFields[0], 'form');
                frmobj.submit();

              }




        },
        handleAutotabInput: function(e){


              var curinp = RASS.getActiveElm(e);

              for (var t=0; t<RASS.autoTabFields.length; t++) {
        
                    if( RASS.autoTabFields[t] === curinp ){          
                            
                            var valfld = RASS.validateField(RASS.autoTabFields[t], true, true);

                            //autotab
                            if(t < RASS.autoTabFields.length-1 && curinp == RASS.autoTabFields[t] && valfld == true){

                                RASS.autoTabFields[t+1].focus();

                            }
                    }        

              }
 
        },
        bindBehaviors: function(){

            // get all data-rass-behaviors from DOM

            var bhcol = document.querySelectorAll('[data-rass-behavior]');

            //iterate through found elements with behavior parm
            for(var t=0;t<bhcol.length;t++){



                       var bhparm = bhcol[t].getAttribute('data-rass-behavior');


                       //iterate through (possible) multiple behaviors on element
                       var bhvar = bhparm.split(' ');

                       for(var b = 0;b<bhvar.length;b++){


                            var bhname = bhvar[b];

                            switch(bhname){

                               case 'reset-vc':

                                        var trgobj = bhcol[t].querySelectorAll('.rass-data-target')[0];
                                        if(trgobj != undefined){

                                            RASS.grabEvent(trgobj, 'change', RASS.doResetVC);

                                        }

                                    break;

                               case 'rass-state-autofocus':

                                        var trgobj = bhcol[t];

                                        if(trgobj != undefined){

                                            trgobj.focus();

                                        }

                                    break;                                    


                                 case 'prefill-native':

                                        var trgobj = bhcol[t];
                                        if(trgobj != undefined){

                                          //RASS.grabEvent(trgobj, 'click', RASS.doSwitchReader) ;

                                          var nmap = trgobj.getAttribute('data-native-map');

                                          if(nmap != undefined){
                                            
                                            RASS.prefillCol.push([trgobj, nmap]);
 
                                          }

                                        }

                                    break;

                                   case 'switch-reader':

                                            var trgobj = bhcol[t];
                                            if(trgobj != undefined){

                                              RASS.grabEvent(trgobj, 'click', RASS.doSwitchReader) ;

                                            }

                                        break;

                                 case 'action-showinpopup':

                                        var trgobj = bhcol[t];
                                        if(trgobj != undefined){

                                          RASS.grabEvent(trgobj, 'click', RASS.showInPopup) ;

                                        }

                                        break;


                                 case 'validate-iban':

                                        var trgobj = bhcol[t].querySelectorAll('.rass-data-target')[0];
                                        if(trgobj != undefined){

                                            RASS.grabEvent(trgobj, 'blur', RASS.calculateChecksum);
                                            RASS.grabEvent(trgobj, 'focus', RASS.setActiveState);

                                            //init routine
                                            RASS.calculateChecksum(trgobj,true);

                                        }

                                        break;

                                 case 'validate-form':

                                        var trgobj = bhcol[t];
                                        if(trgobj != undefined){

                                          RASS.grabEvent(trgobj, 'submit', RASS.handleFormSubmit) ;

                                        }

                                        break;

                                 case 'rass-action-linktoform':

                                        var trgobj = bhcol[t];
                                        if(trgobj != undefined){

                                          RASS.grabEvent(trgobj, 'click', RASS.handleLinktoFormAction) ;

                                        }

                                        break;

                                 case 'confirm-checkbox':

                                        var trgobj = bhcol[t];
                                        if(trgobj != undefined){

                                          RASS.grabEvent(trgobj, 'click', RASS.confirmCheckbox) ;

                                        }

                                        break;


                                case 'validate-pasnr':

                                        var trgobj = bhcol[t].querySelectorAll('.rass-data-target')[0];
                                        if(trgobj != undefined){

                                            RASS.grabEvent(trgobj, 'blur', RASS.validateField);

                                        }

                                        break;


                                case 'validate-phonenumber':

                                        var trgobj = bhcol[t].querySelectorAll('.rass-data-target')[0];
                                        if(trgobj != undefined){

                                            RASS.grabEvent(trgobj, 'blur', RASS.validateField);

                                        }

                                        break;

                              case 'validate-input':

                                        var trgobj = bhcol[t].querySelectorAll('.rass-data-target')[0];
                                        if(trgobj != undefined){

                                            RASS.grabEvent(trgobj, 'blur', RASS.validateField);

                                        }

                                        break;

                               case 'show-in-tooltip':

                                        var trgobj = bhcol[t];
                                        if(trgobj != undefined){

                                            //RASS.grabEvent(trgobj, 'click', RASS.openTooltip);
                                            RASS.grabEvent(trgobj, 'focus', RASS.openTooltip);
                                            RASS.grabEvent(trgobj, 'blur' , RASS.doCloseTooltip);

                                        }

                                        break;

                                case 'validate-inlogcode':

                                        var trgobj = bhcol[t].querySelectorAll('.rass-data-target')[0];
                                        if(trgobj != undefined){

                                            RASS.grabEvent(trgobj, 'blur', RASS.validateField);

                                        }

                                        break;

                               case 'action-cancel':


                                       // RASS.grabEvent(bhcol[t], 'click', RASS.handleFormSubmit);


                                        break;

                                case 'rass-data-sync':

                                        var trgobj = bhcol[t];
                                        if(trgobj != undefined){

                                          RASS.grabEvent(trgobj, 'blur', RASS.doSyncFields);

                                        }

                                        break;

                              case 'action-back':

                                        // RASS.grabEvent(bhcol[t], 'click', RASS.handleFormSubmit);


                                   break;

                              case 'rass-autosubmit-list':

                                        var listobj = bhcol[t].getElementsByTagName('li');

                                        for(var v=0; v<listobj.length;v++){
                                            RASS.grabEvent(listobj[v], 'click', RASS.handleAutoListSubmit);
                                        }



                                    break;

                              case 'dpo-widget-password':

                                        //init
                                        RASS.createPasswordWidget(bhcol[t]);

                                        //bind events
                                        RASS.grabEvent(bhcol[t], 'input', RASS.handlePasswordWidgetInput);
                                        RASS.grabEvent(bhcol[t], 'click', RASS.handlePasswordWidgetClick);
                                        RASS.grabEvent(bhcol[t], 'focus', RASS.handlePasswordWidgetFocus);

                                        //inject softkeyboard when mobile
                                        if(RASS.isMobileDevice || RASS.isTouchDevice){
                                            RASS.initSoftkeyboard();
                                            RASS.highlightPasswordWidget(RASS.dpoPWfield);
                                    }

                                    break;

                             case 'autosubmit-form':

                                    var trgobj = bhcol[t];
                                    if(trgobj != undefined){

                                      
                                      //get all inputs from form and set oninput

                                      var cinp = trgobj.querySelectorAll('input[data-rass-validation]');

                                      for(var v=0;v<cinp.length;v++){

                                            RASS.grabEvent(cinp[v], 'input', RASS.handleAutosubmitInput);
                                            RASS.autoSubmitFields.push(cinp[v]);

                                      }

                                    }

                                break;

                            case 'autotab-form':

                                    var trgobj = bhcol[t];
                                    if(trgobj != undefined){

                                      
                                      //get all inputs from form and set oninput

                                      var cinp = trgobj.querySelectorAll('input[data-rass-validation]');

                                      for(var v=0;v<cinp.length;v++){

                                            RASS.grabEvent(cinp[v], 'input', RASS.handleAutotabInput);
                                            RASS.autoTabFields.push(cinp[v]);

                                      }

                                    }

                                break;

                              case 'force-numkeypad':

                                      var trgobj = bhcol[t].querySelectorAll('.rass-data-target')[0];
                                        if(trgobj != undefined){

                                              //simple OS check
                                              var ua = navigator.userAgent;
                                              var ios = (ua.match(/iPhone/i) || ua.match(/iPod/i) || ua.match(/iPad/i))?true:false;


                                                if(RASS.isMobileDevice){
                                                    if(ios){
                                                        trgobj.type = 'tel';
                                                    }
                                                    else{
                                                        trgobj.type = 'tel';
                                                        //trgobj.type = 'number'; 
                                                    }
                                                 }

                                        }



                                    break;

                        }


                  }



            }

        },
        createPasswordWidget: function(el){

                //if mobile the use a input type hidden
                if(RASS.isMobileDevice || RASS.isTouchDevice){


                    //nelm = document.createElement('input');
                    var nelm = el.cloneNode(false);
                    nelm.type = 'hidden';

                    el.parentNode.replaceChild(nelm, el);

                    el = nelm;
                }


                //insert container element
                var prnt = el.parentNode;

                var wc = document.createElement('div');
                wc.className = 'dpo-widget-container';


                var wr = document.createElement('div');
                wr.className = 'dpo-clipping-container';
                wr.id = 'dpo-focus-element';
                wc.appendChild(wr);

                prnt.replaceChild(wc, el);

                wr.appendChild(el);
                //el.type = 'tel';

                if(RASS.isMobileDevice || RASS.isTouchDevice){
                    //RASS.grabEvent(wr, 'click', RASS.showSoftKeyInput);
                }


                RASS.addClass(wc, 'dpo-widget-password');

                wc.setAttribute('role', 'textbox');
                wc.setAttribute('aria-label',el.getAttribute('alt'));


                var ninp = el.maxLength;
                el.submasks = [];
                var pref = el.value.length;

                //add submasks
                for(var t=0;t<ninp;t++){
                    var inp = document.createElement('span');
                    RASS.addClass(inp, 'submask');

                    if(t<pref){
                        RASS.addClass(inp, 'touched');
                    }


                    el.submasks.push(inp);
                    wr.appendChild(inp);
                }

                //add error element

                var errobj = document.createElement('span');
                errobj.className = 'ph-error';
                el.parentNode.parentNode.appendChild(errobj);




                //register pwfield object
                RASS.dpoPWfield = el;

        },
        handlePasswordWidgetInput: function(e){
                var obj = RASS.getActiveElm(e);
                var ninp = obj.maxLength;

                // filter out non-numeric input
                obj.value = obj.value.replace(/[^\d]/g, '');

                if(obj.value.length > ninp) {
                    obj.value = obj.value.substr(0,ninp);
                }

                RASS.highlightPasswordWidget(obj);

                if(obj.value.length === obj.maxLength) {
                    RASS.dpoPWfield.blur();
                    RASS.checkAutoSubmit(RASS.dpoPWfield);
                }

        },
        handlePasswordWidgetClick: function(e){
            var obj = RASS.getActiveElm(e);
            //var ntch = obj.value.length;

            if(obj.parentNode.parentNode.className.indexOf("haserror") != -1){
                obj.value="";
                RASS.resetPasswordWidgetState(obj);
                RASS.addClass(obj.submasks[0], "active");
            }
        },
        handlePasswordWidgetFocus: function(e){
             var obj = RASS.getActiveElm(e);
 
            obj.value = '';
            RASS.resetPasswordWidgetState(obj);
            RASS.addClass(obj.submasks[0], "active");
        },
        highlightPasswordWidget: function(obj) {
            for(var t=0;t<obj.submasks.length;t++){
                if(obj.value.length < obj.submasks.length) {
                    RASS.removeClass(obj.submasks[obj.value.length], "touched");
                }

                RASS.removeClass(obj.submasks[t], "active");

                if(t < obj.value.length) {
                    RASS.addClass(obj.submasks[t], "touched");
                }
                if(t === obj.value.length && obj.value.length < obj.submasks.length){
                    RASS.addClass(obj.submasks[t], "active");
                }
                if( obj.value.length === obj.submasks.length){
                    RASS.removeClass(obj.submasks[t], "active");
                    RASS.addClass(obj.submasks[t], "touched");
                }
            }
        },
        resetPasswordWidgetState: function(obj, limit){

            RASS.dpoPWfield.value = '';

            limit = (limit != null)?limit:0;

            RASS.removeClass(obj.parentNode.parentNode, "haserror");

            for(var t=obj.maxLength-1;t>=limit;t--){
                RASS.removeClass(obj.submasks[t], "touched");
                RASS.removeClass(obj.submasks[t], "active");
            }

        },
        forceNoPWStorage: function(){

                var aelms = document.getElementsByTagName('input');
                var cnt = 0;
                var lcntobj;

                for(var pw = 0; pw < aelms.length; pw++){

                    if(aelms[pw].type == "password" ){
                        cnt++;
                        lcntobj = aelms[pw];
                    }

                }

                //If only one password field then add dummy field (pw storage is not triggered when 2 or more password fields exist)
                if(cnt == 1){

                    //hack with extra dummy password field to avoid prefilling in IOS
                    var dmpw = document.createElement('input');
                    dmpw.type = 'password';
                    dmpw.name = 'dummypass';
                    dmpw.value = 'dummyvalue';


                    dmpw.style.display = 'inline';
                    dmpw.style.width = '0';
                    dmpw.style.height = '0';
                    dmpw.style.border = 'none';
                    dmpw.style.margin = '0';
                    dmpw.style.padding = '0';

                    document.body.appendChild(dmpw);

                }


        },
        doServerActions: function(){

               if(document.getElementById('rass-serveraction-showtop') != undefined){

                    //check for existing hash sign
                    if(location.hash != undefined){

                        //scroll to defined id
                        location.hash = 'rass-serveraction-showtop';
                    }
               }

 
        },
       checkForServerActions: function(){

               if(document.getElementById('rass-serveraction-showtop') != undefined){

                    //check for existing hash sign
                    if(location.hash != undefined){

                        //scroll to defined id
                        location.hash = 'rass-serveraction-showtop';
                    }
               }

        },
        checkForServerMessages: function(){

               //Check for servermessages to show in popup

               if(RASS.isMobileDevice){

                   var msgwrp = document.getElementById('rass-serveraction-showalert');
                   if(msgwrp != undefined){
                        var msgcont = msgwrp.getElementsByTagName('div')[0];
                   
                        if(msgcont != undefined){
                            var smsg = msgcont.innerHTML;
                            msgcont.innerHTML = '';
                       
                            if(smsg != ''){
                                alert(RASS.doReplaceEntities(smsg));
                            }  
                       }
                    }   
               }


        },
        doReplaceEntities: function(s){
            var ret = s.replace('&nbsp;',' ');
            return ret; 
        },
        doMobileCheck: function() {
          var check = false;
          (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
          return check;
        },
        doTouchCheck: function() {
            return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
        },
        grabEvent: function(tobj, evnt , fnc){

            if(typeof tobj !== 'object'){
                tobj = document.getElementById(tobj);
            }

            if(tobj != undefined){

                if(window.addEventListener){ // modern browsers including IE9+
                    tobj.addEventListener(evnt, fnc, false);
                } else if(window.attachEvent) { // IE8 and below
                    tobj.attachEvent('on' + evnt, fnc);
                } else {
                    tobj['on' + evnt] = fnc;
                }

            }

        },
        resetNumkey: function(e){

           if(RASS.isMobileDevice){
                var dobj = RASS.getActiveElm(e);
                dobj.stype = dobj.type;

                dobj.setAttribute('type',dobj.stype);
                dobj.removeAttribute('pattern');
                dobj.removeAttribute('max');
            }

        },
        forceNumkey: function(e){

            if(RASS.isMobileDevice){
                var dobj = RASS.getActiveElm(e);
                dobj.stype = dobj.type;

                dobj.setAttribute('type','number');
                dobj.setAttribute('pattern','[0-9]*');
                dobj.setAttribute('max',dobj.maxLength);
            }

        },

        //!! validation methods must not use camelcased names !!

        islength: function(val, len){
            if(val.length != len){
                return false;
            }
            else{
                return true;
            }
        },
        isclength: function(val, len){
            if(val.replace(/\s/g,'').length != len){
                return false;
            }
            else{
                return true;
            }
        },
        isbadchars: function(val){
            if(val.match(/[\<\>#&\;\/\\]+/i)){
                return false;
            }
            else{
                return true;
            }
        },
        isnotsame: function(val){

            if(val.length < 2){return true;}

            //check for same numbers
            var aval = val.split("");

            var valid = false;

            for(var t=0;t<aval.length-1;t++){
                if(aval[t] != aval[t+1]){
                    valid = true;
                    break;
                }
            }

            return valid;
        },
        issameas: function(val, prm){

            var elma = document.getElementById(prm);
            if(elma != undefined){

                var elmaval = elma.value;

                if(elmaval == val){
                    return true;
                }
                else{
                    return false;
                }

            }


        },
        isnotdesc: function(val){

            if(val.length < 2){return true;}

            //check for enumerated down
            var aval = val.split("");

            var valid = false;


            for(var t=0;t<aval.length-1;t++){

                if(aval[t+1] != aval[t]*1-1){

                    valid = true;
                    break;
                }
            }

            return valid;


        },
        isnotasc: function(val){

            if(val.length < 2){return true;}

            //check for enumerated up
            var aval = val.split("");


                var valid = false;

                for(var t=0;t<aval.length-1;t++){

                    if(aval[t+1] != aval[t]*1+1){

                        valid = true;
                        break;
                    }
                }

                return valid;

        },
        isnumeric: function(val){

            if(/^[0-9]+$/.test(val)){
                return true;
            }
            else {
                return false;
            }


        },
       iscnumeric: function(val){

            var tst = val.replace(/\s/g,'');

            if(/^[0-9]+$/.test(tst)){
                return true;
            }
            else {
                return false;
            }


        },
        ishavingvc: function(val){

              var cls = document.body.className;
              if(cls.indexOf('rass-state-hasvc') != -1){
                return true;
              }
              else{
                return false;
              }  

        },
        isphonenumber: function(val){


            //check for non valid characters
            var tstchr = val.replace(/[^\d+\-\(\)]/g, '');


            //strip non number chars
            var tst = val.replace(/[^\d+]/g, '');

            //check first digit
            if(!(tst.substr(0,1) == '+' || tst.substr(0,1) == '0')){
                return false;
            }

            //is foreign number, leave as is
            if((tst.substr(0,1) == '+' && tst.substr(1,2) != '31') || (tst.substr(0,2) == '00' && tst.substr(1,2) != '31')){
                return true;
            }

            //filter out actual identifier
            var pref = tst.substring(0,tst.length-8);

            //check remainder for valid prefixes
            if(pref == '06' || pref == '00316' || pref == '003106' || pref == '+316' || pref == '+3106'){
                return true;
            }

            //not valid
            return false;

        },
        ismandatory: function(val){
            return (val == '')?false:true;
        },
        ismandatorylist: function(val, frm, trg){
               //var srcElm = RASS.getActiveElm(e);

               var inplist = trg.getElementsByTagName('input');

               for(var t=0;t<inplist.length;t++){
                    if(inplist[t].checked){
                        return true;
                    }
               }

               return false;
        },
        getActiveElm: function(e){
                 var evt = e || window.event;
                 var telm = evt.target || evt.srcElement;

                 return telm;
        },
        registerEvent: function(elm,evnt,func){

                if (elm.addEventListener) {
                    // For all major browsers, except IE 8 and earlier
                    elm.addEventListener(evnt, func);
                }
                else if (elm.attachEvent) {
                    // For IE 8 and earlier versions
                    elm.attachEvent("on"+evnt, func);
                }
        },
        setActiveState: function(e){
               var srcElm = RASS.getActiveElm(e);

               var tobj = srcElm.parentNode.parentNode.parentNode;
               RASS.addClass(tobj,'rass-state-active');

        },
        cancelDefaultAction: function(e){

                 var evt = e ? e:window.event;

                 if (evt.preventDefault){
                        evt.preventDefault();
                 }
                 else{
                    evt.returnValue = false;
                 }

                 //return false;

        },
        handleFormSubmit: function(e){
              var frmobj = RASS.getActiveElm(e);
              var initelm = RASS.pressedFormButton;

           //grab resubmit msg
           var resubmsg = frmobj.getAttribute('data-rass-resubmitmsg');    

           //handle back button or 'skip validation'
            if(initelm.getAttribute('data-rass-behavior') == 'action-back' || initelm.getAttribute('data-rass-behavior') == 'skip-validation'){
                // Do nothing

                var pdo = {};
                pdo.e = e;
                pdo.msg = resubmsg;
                RASS.doReSubmitCheck(pdo);

                return true;
            }


            //handle cancel button
            if(initelm.getAttribute('data-rass-behavior') == 'action-cancel'){

                var stxt = initelm.getAttribute('data-rass-msg');
                if(!RASS.showConfirm(stxt)){
                    RASS.cancelDefaultAction(e);
                 }
                else{
                    return true;
                }


            }
            else{

                  //input elements
                  var colinpi = [].slice.call(frmobj.getElementsByTagName('input'));

                  //section elements
                  var colinps = [].slice.call(frmobj.getElementsByTagName('section'));

                  var colinp = colinpi.concat(colinps);

                  for(var i=0;i < colinp.length;i++){
                        if(colinp[i].type != 'submit' && colinp[i].type != 'button' && colinp[i].getAttribute('data-rass-msg') != undefined && colinp[i].getAttribute('disabled') != 'disabled'){

                            if(!RASS.validateField(colinp[i],true)){

                                //invalid
                                RASS.cancelDefaultAction(e);
                                return false;
                            }

                        }
                  }

                var pdo = {};
                pdo.e = e;
                pdo.msg = resubmsg;

                RASS.doReSubmitCheck(pdo);

                  //no invalids found
                  return true;
            }




        },
        showConfirm: function(stxt){
                return(confirm(stxt));
        },

        //Beter crossbrowser implementation
        addClass: function(elem,value){
         var rspaces = /\s+/;
         var classNames = (value || "").split( rspaces );
         var className = " " + elem.className + " ",
         setClass = elem.className;
         for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
          if ( className.indexOf( " " + classNames[c] + " " ) < 0 ) {
           setClass += " " + classNames[c];
          }
         }
         elem.className = setClass.replace(/^\s+|\s+$/g,'');//trim
        },
        removeClass: function(elem,value){
         var rspaces = /\s+/;
         var rclass = /[\n\t]/g
         var classNames = (value || "").split( rspaces );
         var className = (" " + elem.className + " ").replace(rclass, " ");
         for ( var c = 0, cl = classNames.length; c < cl; c++ ) {
          className = className.replace(" " + classNames[c] + " ", " ");
         }
         elem.className = className.replace(/^\s+|\s+$/g,'');//trim
        },
        showErrorMsg: function(elm, msg){
               var perr = (elm.parentNode.tagName.toLowerCase() == 'label')?elm.parentNode:elm.parentNode.parentNode.parentNode;

                RASS.addClass(perr, 'rass-state-error');

                var aerr = perr.getElementsByTagName('em');
                for(var t=0;t<aerr.length;t++){
                    if(aerr[t].className == 'rass-ui-error'){
                        aerr[t].innerHTML = msg;
                    }
                }
        },
       validateField: function(inp, frmcheck, nofeedback){

                if(inp.nodeName == undefined){
                   //inp is an event
                   var srcElem = RASS.getActiveElm(inp);
                }
                else {
                    var srcElem = inp;
                }

               var fval = srcElem.value;
               var flen = srcElem.maxLength;
               var chklen = (srcElem.getAttribute('max-length') != undefined)?true:false;



                     //return on empty value
                     if(fval == '' && !frmcheck){


                        //remove previous msgs
                        RASS.showErrorMsg(srcElem, '');
                        var perr = (srcElem.parentNode.tagName.toLowerCase() == 'label')?srcElem.parentNode:srcElem.parentNode.parentNode.parentNode;
                        RASS.removeClass(perr,'rass-state-error');

                        var svrerr =  document.getElementById('rass-state-servererror');
                        if(svrerr != undefined){
                            svrerr.innerHTML = '';
                        }

                        return true;
                     }

                     //get validation definitions from field
                     var sval = srcElem.getAttribute('data-rass-validation');
                     if(sval != undefined){
                        var valcol = sval.split(' ');
                        var parm = null;

                         //loop through validations and check
                         for(var t = 0; t < valcol.length;t++){


                                var valitem = valcol[t];

                                if(valitem != ''){

                                        //check for embedded parms
                                        if(!isNaN(parseInt(valitem))){
                                            parm = parseInt(valcol[t]);
                                            valitem = valitem.substr(parm.toString().length);
                                        }

                                        //check for pipe separated parms
                                        if(valitem.indexOf('|') != -1){
                                            var aprm = valitem.split('|');

                                            parm = aprm[1];
                                            valitem = aprm[0];
                                        }

                                        var valid = RASS['is'+valitem](fval, parm, srcElem);

                                        //not valid
                                        if(!valid){

                                           var msgcol =  srcElem.getAttribute('data-rass-msg').split('|');
                                           if(t < msgcol.length){
                                               var smsg = msgcol[t];
                                           }
                                           else{
                                                var smsg = msgcol[msgcol.length-1];
                                           }

                                           if(!nofeedback){
                                            RASS.showErrorMsg(srcElem, smsg);
                                           }

                                           return false;


                                        }

                                }



                         }

                         //validation passed

                        //remove previous error msgs
                        RASS.showErrorMsg(srcElem, '');
                        var svrerr =  document.getElementById('rass-state-servererror');
                        if(svrerr != undefined){
                            svrerr.innerHTML = '';
                        }

                        var perr = (srcElem.parentNode.tagName.toLowerCase() == 'label')?srcElem.parentNode:srcElem.parentNode.parentNode.parentNode;
                        RASS.removeClass(perr,'rass-state-error');
                        return true;

                     }



        },
       groupStringBy: function(nprfx, gn, str){
                  //nprfx = number of prefix characters used
                 
                  var aOut = [];
                  var aStr = str.replace(/\s/g,'').split('');
                 
                  //add dummy prefix characters
                  for(var t=0;t<nprfx;t++){
                    aStr.unshift('0');
                  }
                 
                  for (var i=0;i<aStr.length;i++) {
                    if((i+1)%5 == 0){
                      aStr.splice(i,0,' ');
                    }
                  };
                 
                  //remove dummy characters
                  aStr.splice(0,nprfx);
                 
                  return aStr.join('');
                },
        removeChecksum: function(e){
                var chksobj = document.getElementById('rass-extend-prefix');
                if(chksobj != undefined){
                    //chksobj.value = 'NL\u25CF\u25CF RABO 0';
                    chksobj.innerHTML = 'NL \u2022 \u2022 RABO 0';
                }
        },
        calculateChecksum: function(inp, init){

                if(inp.nodeName == undefined){
                   //inp is an event
                   var srcElem = RASS.getActiveElm(inp);
                }
                else {
                    var srcElem = inp;
                }


                var bban = srcElem.value;



                if(!init){
                    //validate
                    if(!RASS.validateField(inp)){
                        RASS.removeChecksum();
                        return false;
                    }
                }

                //Format bban field
                var frmval = RASS.groupStringBy(1,4,bban);
                srcElem.value = frmval;

               var tobj = srcElem.parentNode.parentNode.parentNode;
               RASS.removeClass(tobj,'rass-state-active');


                //handle empty field
                if(bban == ''){
                    RASS.removeChecksum();
                    return false;
                }

                var chksobj = document.getElementById('rass-extend-prefix');

                var countrycode = '2321', // NL
                        bankcode = '27101124', // RABO
                        digitString,
                        lengthDigitString,
                        checksum,
                        m = 0,
                        i = 0;

                    bban = bban.replace(/\s+/g, ''); // clean

                    digitString = bankcode + '0' + bban + countrycode + '00';
                    lengthDigitString = digitString.length;

                    // Modulo 97 for huge numbers given as digit strings.
                    for (; i < lengthDigitString; i += 1) {
                        m = (m * 10 + parseInt(digitString.charAt(i), 10)) % 97;
                    }

                    checksum = '' + (98 - m);

                    // Fill the string with leading zeros until length is reached.
                    if (checksum.length < 2) {
                        checksum = '0' + checksum;
                    }

                    //return checksum;

                    //chksobj.removeAttribute('readonly');
                    chksobj.innerHTML = 'NL' + checksum + '&nbsp;RABO&nbsp;0';
                    //chksobj.setAttribute('readonly','readonly');





            }


}


//extend shortcommings for older browsers
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)? Math.ceil(from): Math.floor(from);

    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

RASS.hasJS();

window.onload = function(){
    RASS.init();
};
