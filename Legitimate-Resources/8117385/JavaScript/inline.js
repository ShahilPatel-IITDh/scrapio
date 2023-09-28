
  window.addEventListener && window.addEventListener("load", function() {
    if (page.data.env === "test") return;

    var user = typeof page.data.user === "string"
        ? JSON.parse(page.data.user)
        : page.data.user;

    // bugsnag
    page.util.loadScript("https://d2wy8f7a9ursnm.cloudfront.net/bugsnag-2.min.js", function() {
      window.Bugsnag.apiKey = "3ccfcd9e88e95e331e94f54ded423d62";
      window.Bugsnag.releaseStage = "production";
      window.Bugsnag.notifyReleaseStages = ["production", "test", "development"];
      window.Bugsnag.beforeNotify = function (payload, metaData) {
        // inform Amplitude about sending a bugsnag (for overall error rate metric)
        window.analytics.track("error.report", {
          severity: payload.severity,
        });
      };
      window.Bugsnag.user = { email: user && user.email };

      window.dispatchEvent( new Event('bugsnag.loaded') );
    });

    function isCoreUser(user) {
      var thirtyDays = 1000 * 60 * 60 * 24 * 30;
      var joinedOn = user.joined_on.$date;
      return new Date() - new Date(joinedOn) > thirtyDays;
    }

    window.analytics.page();
    var userId = user && user._id && user._id.$oid;
    if (userId) {
      var org = user.organization;
      var payment = user.payment;
      window.analytics.identify(userId, {
        email: user.email,
        has_user_id: true,
        payment_type: payment && payment.payment_type,
        plan: user.plan,
        orgId: org && org.organization_id,
        isCoreUser: isCoreUser(user)
      });
    }
    window.analytics.ready(function set_domain() {
      window.amplitude.setDomain("plangrid.com");
      window.ampSetDomain = true;
    });

    if (page.features.FF_OLARK_CHAT) {
      //olark
      /*{literal}<![CDATA[*/window.olark||(function(i){var e=window,h=document,a=e.location.protocol=="https:"?"https:":"http:",g=i.name,b="load";(function(){e[g]=function(){(c.s=c.s||[]).push(arguments)};var c=e[g]._={},f=i.methods.length; while(f--){(function(j){e[g][j]=function(){e[g]("call",j,arguments)}})(i.methods[f])} c.l=i.loader;c.i=arguments.callee;c.f=setTimeout(function(){if(c.f){(new Image).src=a+"//"+c.l.replace(".js",".png")+"&"+escape(e.location.href)}c.f=null},20000);c.p={0:+new Date};c.P=function(j){c.p[j]=new Date-c.p[0]};function d(){c.P(b);e[g](b)}e.addEventListener?e.addEventListener(b,d,false):e.attachEvent("on"+b,d); (function(){function l(j){j="head";return["<",j,"></",j,"><",z,' onl'+'oad="var d=',B,";d.getElementsByTagName('head')[0].",y,"(d.",A,"('script')).",u,"='",a,"//",c.l,"'",'"',"></",z,">"].join("")}var z="body",s=h[z];if(!s){return setTimeout(arguments.callee,100)}c.P(1);var y="appendChild",A="createElement",u="src",r=h[A]("div"),G=r[y](h[A](g)),D=h[A]("iframe"),B="document",C="domain",q;r.style.display="none";s.insertBefore(r,s.firstChild).id=g;D.frameBorder="0";D.id=g+"-loader";if(/MSIE[ ]+6/.test(navigator.userAgent)){D.src="javascript:false"} D.allowTransparency="true";G[y](D);try{D.contentWindow[B].open()}catch(F){i[C]=h[C];q="javascript:var d="+B+".open();d.domain='"+h.domain+"';";D[u]=q+"void(0);"}try{var H=D.contentWindow[B];H.write(l());H.close()}catch(E){D[u]=q+'d.write("'+l().replace(/"/g,String.fromCharCode(92)+'"')+'");d.close();'}c.P(2)})()})()})({loader:(function(a){return "static.olark.com/jsclient/loader0.js?ts="+(a?a[1]:(+new Date))})(document.cookie.match(/olarkld=([0-9]+)/)),name:"olark",methods:["configure","extend","declare","identify"]});
      /* custom configuration goes here (www.olark.com/documentation) */
      window.olark.identify("9071-164-10-9592");/*]]>{/literal}*/
      page.actions.olarkInit(window.location.pathname);
    }

    var CSS_STYLES = ".embeddedServiceHelpButton .helpButton .uiButton { background-color: #005290; font-family: \"Arial\", sans-serif; } .embeddedServiceHelpButton .helpButton .uiButton:focus { outline: 1px solid #005290; } .embeddedServiceHelpButton .helpButton, .embeddedServiceSidebar.sidebarMaximized.layout-docked .dockableContainer { left: 10px; right: auto; max-height: 570px; } .wrapper.chatMessage { min-height:auto !important; } .helpButton { width: 168px; } .pg-header { color: #40525E; font-size: 14px; padding: 0 12px; } .uiInput { align-items: flex-start; display: flex; flex-direction: column; padding: 5px 10px; } .uiInput label { color: #40525E; font-size: 14px; padding: 0 0 2px 3px; } .uiInput input { border: 1px solid #CDD9E2; border-radius: 3px; font-size: 14px; height: 26px; padding: 4px 6px; width: 100%; } .uiInput select { background: #FFF; border: 1px solid #CDD9E2; font-size: 16px; width: 100%; } .pg-innerbody { font-size: 14px; margin: 15px 0 18px; } .pg-innerbody a { color: #175FA1; } .uiButton--default { background: #0085DE; border: none; box-shadow: none; padding: 8px 15px; text-shadow: none; } .uiButton--default span { color: #FFF; } .offlineSupportUI .embeddedServiceSidebarForm .fieldList { padding: 0; } .offlineSupportUI .fieldList:before { content: 'Sorry we missed you!\\APlease leave a message and weâ€™ll get back to\\Ayou via email or you can check out our help site:\\Ahttps://help.plangrid.com\\AOur hours of operation are:\\AMon-Thurs: 2:00am - 1:00am EST (next day) \\A Friday: 2:00am - 7:00pm EST'; display: block; font-size: 12px; margin-left: 16px; text-align: left; white-space: pre; } .featureBody div.pg-header { margin: 5px 20px; } .featureBody ul.fieldsList { padding: 10px 34px 5px; } .slds-form-element { text-align: left; } .slds-form-element__label slds-no-flex { display: block; font-size: 12px; margin-bottom: 2px; } .slds-required { margin-right: 2px; text-decoration: none; } .slds-input { border: 1px solid #DDD; border-radius: 4px; font-size: 14px; height: 38px; outline: none; margin-bottom: 10px; padding: 0px 12px; width: 100%; } .startButtonWrapper .startButton { background: #015190; border: none; box-shadow: none; color: #FFF; margin: 0; padding: 12px 0; text-shadow: none; width: calc(100% - 68px); } .startButtonWrapper .startButton .label { color: #FFF; font-size: 16px; font-weight: normal; text-shadow: none; }";

    function loadOldChatWidget() {
      function initialize() {
        const initESW = function(gslbBaseURL) {
          window.embedded_svc.settings.displayHelpButton = true; // Or false
          window.embedded_svc.settings.language = ""; // For example, enter 'en' or 'en-US'
          window.embedded_svc.settings.defaultMinimizedText = "Chat with us!"; // Defaults to Chat with an Expert
          window.embedded_svc.settings.disabledMinimizedText =
            "We are Offline. Please leave us a message!"; // Defaults to Agent Offline
          window.embedded_svc.settings.loadingText = "Hang On!"; // Defaults to Loading
          window.embedded_svc.settings.offlineSupportMinimizedText =
            "We are Offline. Please leave us a message!"; // Defaults to Contact Us
          window.embedded_svc.settings.enabledFeatures = ["LiveAgent"];
          window.embedded_svc.settings.entryFeature = "LiveAgent";
          window.embedded_svc.init(
            "https://plangrid.my.salesforce.com",
            "https://adsk-acs.force.com",
            gslbBaseURL,
            "00Dd0000000hAll",
            "Chat_Deployment",
            {
              baseLiveAgentContentURL:
                "https://c.la3-c2-phx.salesforceliveagent.com/content",
              deploymentId: "5720W000001YVMK",
              buttonId: "5730W000001Q75T",
              baseLiveAgentURL: "https://d.la3-c2-phx.salesforceliveagent.com/chat",
              eswLiveAgentDevName:
                "EmbeddedServiceLiveAgent_Parent04I0W000000blJTUAY_17046436fda",
              isOfflineSupportEnabled: true,
            }
          );
        };

        if (!window.embedded_svc) {
          const s = document.createElement("script");
          s.setAttribute(
            "src",
            "https://plangrid.my.salesforce.com/embeddedservice/5.0/esw.min.js"
          );
          s.onload = function() {
            initESW(null);
          };
          document.body.appendChild(s);
        } else {
          initESW("https://service.force.com");
        }
      }

      const style = document.createElement("style");

      document.head.appendChild(style);
      style.type = "text/css";
      style.appendChild(document.createTextNode(CSS_STYLES));

      (function() {
        const esw = document.createElement("script");
        esw.type = "text/javascript";
        esw.src = "https://service.force.com/embeddedservice/5.0/esw.min.js";
        esw.onload = initialize;
        const s = document.getElementsByTagName("script")[0];
        (s.parentNode).insertBefore(esw, s);
      })();
    }

    function loadChatWidget() {
      function addScript(attributes, onload) {
        const script = document.createElement("script");
        Object.keys(attributes).forEach(key => {
          script[key] = attributes[key];
        });
        script.type = "text/javascript";
        script.onload = onload;
        const s = document.getElementsByTagName("script")[0];
        (s.parentNode).insertBefore(script, s);
      }

      function addScripts(sources, onLastLoad) {
        const onload = sources.slice(1).length
          ? addScripts.bind(null, sources.slice(1), onLastLoad)
          : onLastLoad;
        addScript(sources[0], onload);
      }

      function initialize() {
        const isProduction = !window.location.host.includes(".planfront.net");
        const initESW = function(gslbBaseURL) {
          window.embedded_svc.settings.displayHelpButton = true; // Or false
          window.embedded_svc.settings.language = ""; // For example, enter 'en' or 'en-US'
          window.embedded_svc.settings.defaultMinimizedText = "Chat with us!"; // Defaults to Chat with an Expert
          window.embedded_svc.settings.disabledMinimizedText =
            "We are Offline. Please leave us a message!"; // Defaults to Agent Offline
          window.embedded_svc.settings.loadingText = "Hang On!"; // Defaults to Loading
          window.embedded_svc.settings.offlineSupportMinimizedText =
            "We are Offline. Please leave us a message!"; // Defaults to Contact Us
          window.embedded_svc.settings.enabledFeatures = ["LiveAgent"];
          window.embedded_svc.settings.entryFeature = "LiveAgent";
          window.embedded_svc.init(
            isProduction
              ? "https://plangrid.my.salesforce.com"
              : "https://plangrid--acs.my.salesforce.com",
            isProduction
              ? "https://adsk-acs.force.com"
              : "https://acs-adsk-acs.cs97.force.com",
            gslbBaseURL,
            isProduction ? "00Dd0000000hAll" : "00D0U000000H3r5",
            "Solvvy_PlanGrid_Chat",
            {
              baseLiveAgentContentURL: isProduction
                ? "https://c.la3-c2-dfw.salesforceliveagent.com/content"
                : "https://c.la2-c1cs-ord.salesforceliveagent.com/content",
              deploymentId: "5720W000001YVMK",
              buttonId: "5730W000001Q75T",
              baseLiveAgentURL: isProduction
                ? "https://d.la3-c2-dfw.salesforceliveagent.com/chat"
                : "https://d.la2-c1cs-ord.salesforceliveagent.com/chat",
              eswLiveAgentDevName: isProduction
                ? "EmbeddedServiceLiveAgent_Parent04I0W000000fxSQUAY_1763f69c25c"
                : "EmbeddedServiceLiveAgent_Parent04I0U000000CamPUAS_1762b43226f",
              isOfflineSupportEnabled: false,
            }
          );
        };

        if (!window.embedded_svc) {
          const s = document.createElement("script");
          s.setAttribute(
            "src",
            isProduction
              ? "https://plangrid.my.salesforce.com/embeddedservice/5.0/esw.min.js"
              : "https://plangrid--acs.my.salesforce.com/embeddedservice/5.0/esw.min.js"
          );
          s.onload = function() {
            initESW(null);
          };
          document.body.appendChild(s);
        } else {
          initESW("https://service.force.com");
        }
      }

      const style = document.createElement("style");

      document.head.appendChild(style);
      style.type = "text/css";
      style.appendChild(document.createTextNode(CSS_STYLES));

      (function() {
        // Load Solvvy ahead of chat widget
        const scripts = [
          {
            async: true,
            src:
              "https://cdn.solvvy.com/deflect/customization/autodesk_plangrid/solvvy.js",
          },
          {
            src: "https://service.force.com/embeddedservice/5.0/esw.min.js",
          },
        ];

        addScripts(scripts, initialize);
      })();
    }

    var override = window.location.href.indexOf("?chat=1") > -1;
    var time = override ? "Thu, Feb 25 2021 20:00:00 GMT" : "Tue Apr 27 2021 15:00:00 GMT";
    if (time && new Date(time) < new Date()) {
      loadChatWidget();
    } else {
      loadOldChatWidget();
    }
  });
