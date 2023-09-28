if (typeof window.flyLoaderCfg == 'undefined') {
  var flyLoaderCfg = JSON.parse("{\"3168\":{\"capping\":0,\"closeButton\":true,\"contentTime\":5,\"cssPriorityPlace\":\"head\",\"customLogo_clickthrough\":\"https:\\/\\/flyads.com\",\"customLogo_height\":12,\"customLogo_width\":46,\"delay\":6,\"destroyOnClose\":true,\"floating_size\":0,\"height\":0,\"hidecontrols\":true,\"hideOnInput\":false,\"Impression\":5,\"infrm\":false,\"inpageHeader\":true,\"inpageHeader_bg\":\"#FFFFFF\",\"interscroller_bg\":\"#FFFFFF\",\"interscroller_height\":1,\"interscroller_minheight\":600,\"interscroller_mode\":0,\"loglevel\":0,\"logo\":true,\"max_width\":432,\"max_width_inpage\":432,\"MaxRun\":10,\"midrolltime\":2,\"muted\":true,\"noadsdelay\":10,\"onNoAds\":\"\",\"overlay_bottom\":35,\"overlay_left\":5,\"place_x\":\"Right\",\"place_y\":\"Bottom\",\"playerVersion\":1,\"posDfp\":false,\"pos_bottom\":0,\"pos_left\":0,\"pos_right\":0,\"pos_top\":0,\"preloader_click\":\"\",\"preloader_hls_link\":\"https://data.displayfly.com/demo/stories/20_travel_eng.m3u8\",\"preloader_link\":\"https://data.displayfly.com/demo/stories/20_travel_eng.mp4\",\"report_able\":false,\"restartOnClose\":0,\"runcheck\":false,\"scroll\":\"\",\"scrollValue\":0,\"skip\":false,\"skipText\":\"\",\"soundButton\":true,\"stopnoads\":false,\"width\":100,\"x_after\":5,\"x_click_area\":0,\"x_pos_logo\":\"Right\",\"x_size\":24,\"zindex\":2147483648,\"zone_type\":\"video\",\"closeCountdownVisibility\":false,\"type\":\"slider\",\"autoplay\":\"ON\",\"content_mode\":\"pre\",\"floating_floatOnBottom\":false,\"autoSize\":false,\"sticky_size\":1,\"position\":\"Bottom-Right\",\"closePosition\":\"left\",\"closeInside\":false,\"logoPosition\":\"right\",\"closeSwipe\":false,\"passbackMode\":\"ALWAYS\",\"passbackType\":\"SCRIPT\",\"passbackUrl\":\"https:\\/\\/ads.vidoomy.com\\/ecbahia_7050.js\",\"uuid\":\"5b7679bd-8d9d-4088-be2d-559260e2fe31\",\"region\":\"eu.\",\"ldom\":\"stat.displayfly.com\",\"tdom\":\"e.displayfly.com\",\"content\":{\"type\":\"video\",\"mode\":\"old\",\"hls\":\"https:\\/\\/data.displayfly.com\\/stories\\/19ce4\\/1e4fd4029625deb6d9befe69c3db591d.m3u8\",\"url\":\"https:\\/\\/data.displayfly.com\\/stories\\/19ce4\\/1e4fd4029625deb6d9befe69c3db591d.mp4\",\"preroll\":2,\"midroll\":2,\"segments\":[{\"text\":\"Bahia est\\u00e1 perto de contratar lateral-esquerdo uruguaio\",\"clickthrough\":\"https:\\/\\/www.ecbahia.com\\/mercado\\/bahia-esta-perto-de-contratar-lateral-esquerdo-uruguaio\",\"duration\":5000},{\"text\":\"Bahia inicia semana com treino t\\u00e1tico de olho no Gr\\u00eamio\",\"clickthrough\":\"https:\\/\\/www.ecbahia.com\\/copa-do-brasil\\/bahia-inicia-semana-com-treino-tatico-de-olho-no-gremio\",\"duration\":5000},{\"text\":\"Bahia dobra oferta, mas Sport recusa e fica com Juba at\\u00e9 agosto\",\"clickthrough\":\"https:\\/\\/www.ecbahia.com\\/mercado\\/bahia-dobra-oferta-mas-sport-recusa-e-fica-com-juba-ate-agosto\",\"duration\":5000},{\"text\":\"Bahia tem 3 jogadores na transi\\u00e7\\u00e3o f\\u00edsica; Cauly segue sem treinar\",\"clickthrough\":\"https:\\/\\/www.ecbahia.com\\/departamento-medico\\/bahia-tem-3-jogadores-na-transicao-fisica-cauly-segue-sem-treinar-\",\"duration\":5000},{\"text\":\"Aguirre explica trabalho como CEO e integra\\u00e7\\u00e3o do Bahia ao Grupo City\",\"clickthrough\":\"https:\\/\\/www.ecbahia.com\\/entrevista\\/aguirre-explica-trabalho-como-ceo-e-integracao-do-bahia-ao-grupo-city\",\"duration\":5000},{\"text\":\"S\\u00e9rie A: 10 times com a campanha atual do Bahia terminaram rebaixados\",\"clickthrough\":\"https:\\/\\/www.ecbahia.com\\/brasileiro\\/serie-a-10-times-com-a-campanha-atual-do-bahia-terminaram-rebaixados\",\"duration\":5000}]}}}");
}

window.flyActiveZones = window.flyActiveZones || [];
var flyLoaderDrivers = {};

flyLoaderDrivers["video"] = function(cfg, cb) {
    var { zoneId, container, containerId, onError, onComplete, onStart, onClose } = cb;
    
    cfg.logErrors = false;
    cfg.floating_mode = 2;
    cfg.vpaidTryVisibility = !1;
    cfg.noadsdelay = 5;
    cfg.playerVersion = '91';
    cfg.tracesSampleRate = 0.01;
    cfg.prerollDelay = 0;
    cfg.preloaderLogo = false;
    cfg.ws = !0;
    cfg.loglevel = 0;
    cfg.timeouts = {waterfallstart: 1000, waterfallend: 10000, vpaidstart: 5000, googleImaInit: 10000};
    cfg.libHLS = 'https://e.displayfly.com/libs/common.js';
    cfg.syncJS = 'https://e.displayfly.com/105700/js/sync.js?zone='+zoneId+'gdpr=(gdpr)&consent=(gdpr_consent)';
    
    window['flyLoaderCfg'][zoneId] = cfg;
    
    if (!cfg.content || cfg.content.length == 0) {
        var content = {type:"video",preroll:2,midroll:2,mode:"old",hls:"https://data.displayfly.com/demo/stories/20_travel_eng.m3u8",url:"https://data.displayfly.com/demo/stories/20_travel_eng.mp4",segments:[{duration:5000,clickthrough:""},{duration:5000,clickthrough:""},{duration:5000,clickthrough:""},{duration:5000,clickthrough:""}]}
        cfg.content = content;
    }
    function flyInit(doc) {
        if (cfg.type == "slider" || cfg.type == "interstitial") { container = doc.document.body; } else {
          if (containerId !== undefined) {
            container = doc.document.getElementById(containerId);
          }
        }
        if (container == null) {
          container = doc.document.getElementById('adspot');
        }
        (new Image).src = "https://stat.displayfly.com/req/site?sid=105700&zone=" + zoneId + "&uid=5b7679bd-8d9d-4088-be2d-559260e2fe31&event=playerLoaded&v="+ cfg.playerVersion +"&cb=" + Date.now();
                onClose = function () { if (cfg.restartOnClose) { setTimeout(function() { if (doc.vadsPlayerController.isRunning() === false) { doc.vadsPlayerController.start({ sid: 105700, zone: zoneId, container: container , callbacks: {onError, onComplete, onStart, onClose}}); } }, cfg.restartOnClose*1000);} }
        if (typeof(doc.vadsPlayer) === "undefined") {
            (function(a, b, c, d, e, f, g) {
                var s = b.createElement(c);
                s.src = d;
                s.type = "application/javascript";
                s.async = !0;
                s.defer = !0;
                b.body.appendChild(s);
                a[f] = a[f] || [];
                a[e] = function() {
                    var _a$f;	
                    (_a$f = a[f]).push.apply(_a$f, arguments);
                }
                a[g] = {[zoneId]:cfg};
            })(doc, doc.document, "script", "https://e.displayfly.com/libs/1a7b40c1/main.js", "vadsPlayer", "vadsPlayerCaller", "vadsPlayerCfg");
            (new doc.vadsPlayer({ sid: 105700, zone: zoneId, container: container, callbacks: {onError, onComplete, onStart, onClose}}));
        } else {
            if (doc.vadsPlayerController.isRunning() === false) { doc.vadsPlayerController.start({ sid: 105700, zone: zoneId, container: container, callbacks: {onError, onComplete, onStart, onClose}}); }
        }
    }
    
    if (cfg.capping && cfg.capping > 0) {
        var lr = localStorage.getItem('flyads_105700_lr'),
        time_now  = (new Date()).getTime();
        if (lr && (time_now - lr) > 60000 * cfg.capping) {            
            setTimeout(function () {
    				flyInit(!cfg.infrm && window.frameElement ? window.parent : window);
            }, cfg.delay * 1000);
        } else {
            if (!lr) setTimeout(function () { flyInit(!cfg.infrm && window.frameElement ? window.parent : window); }, cfg.delay * 1000);           
        }
     } else {
        setTimeout(function () {
          flyInit(!cfg.infrm && window.frameElement ? window.parent : window);
        }, cfg.delay * 1000);      
     }
};

window.flyLoaderQueue = new Proxy(window.flyLoaderQueue || [], {
  set(target, prop, value) {
    if (prop !== "length") {
      if (typeof value !== "function") {
        throw new Error("function expected");
      }
      value.call();
    }

    target[prop] = value;
    return true;
  }
});

window.flyLoader = {};
window.flyLoader.run = function(a) {
    for (let entry of a) {
        if (flyLoaderCfg[entry.zoneId] !== undefined) {
          if (!window.flyActiveZones.includes(entry.zoneId)) {
            flyLoaderDrivers[flyLoaderCfg[entry.zoneId].zone_type](flyLoaderCfg[entry.zoneId], entry);
            window.flyActiveZones.push(entry.zoneId);
          }
        }
    }
}

if (window.flyLoaderQueue && window.flyLoaderQueue.length) {
    window.flyLoaderQueue.forEach((runCall) => runCall.call());
}