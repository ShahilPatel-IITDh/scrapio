jQuery(document).ready(function(e){function t(e){for(var t=/\s+/,a=Math.floor(e.length/2),n=0;n<a;n++){var o=a-n,i=a+n;if(-1!==e[o].search(t))return o;if(-1!==e[i].search(t))return i}return e.length}function a(t){e(".masthead").on("onscreen",function(a,n){n.percentInviewVertical<t?e(".sticky-header").addClass("visible"):e(".sticky-header").removeClass("visible")})}function n(t,a,n){e(t).on("onscreen",function(t,o){o.percentInview>a?e(n||this).addClass("ready-to-animate"):e(n||this).removeClass("ready-to-animate")})}function o(){var e=new Date,t=new Date(e.getFullYear()+1,e.getMonth(),e.getDate());document.cookie=f+"="+Date.now()+"; expires="+t.toUTCString()}function i(){-1!==document.cookie.indexOf(p)?(document.cookie=p+"= ; expires="+new Date(0).toUTCString(),o()):-1!==document.cookie.indexOf(b)&&o()}function r(){for(var e=document.cookie.split(";"),t=0;t<e.length;t++)if(-1!==e[t].indexOf(f)){var a=e[t].split("=");return Date.now()>Number(a[1])+h}return!0}function s(){return-1!==document.cookie.indexOf(f)&&r()||-1===document.cookie.indexOf(f)&&-1===document.cookie.indexOf(p)}function l(){e("#mobile-speedbump").addClass("launched"),e("#mobile-speedbump").attr("aria-hidden","false"),e.each(v,function(t,a){e(a).attr("tabindex","-1")}),e("#mobile-speedbump [tabindex]").attr("tabindex","0"),e("#mobile-speedbump .secondary a").focus(),e("body").addClass("locked"),e(y).ontouchend=function(e){e.preventDefault()}}function d(){e("[tabindex]").attr("tabindex","0"),e("#mobile-speedbump [tabindex]").attr("tabindex","-1"),e("#mobile-speedbump").removeClass("launched"),e("#mobile-speedbump").attr("aria-hidden","true"),e("body").removeClass("locked")}e("body").removeClass("preload"),vhCheck(),e("a:not(.internal)").each(function(){e(this).attr("target","_blank")});var c=getOS();e("body").attr("data-likely-os",getOS()),"iOS"==c||"Android"==c?e("body").attr("data-is-probably-mobile-os","true"):e("body").attr("data-is-probably-mobile-os","false"),isCandidateForOutlookLite()?e("body").attr("data-is-probably-outlook-lite","true"):e("body").attr("data-is-probably-outlook-lite","false"),e(".user-agent-test li i").html(c);var m=window.location.search;0===m.length?m="?nlp=1":-1===m.indexOf("nlp=1")&&(m+="&nlp=1"),e(".sign-in-link").attr("href",window.location.protocol+"//"+window.location.host+window.location.pathname+m),"fr"!=document.documentElement.lang&&e(".fr_accessibility").attr("style","display:none"),e(".premium-appeal p a").each(function(t,a){e(a).html(e(a).html().replace(/([^\s]+)$/,function(e,t){return'<i class="final-phrase">'+t+"</i>"}))}),e(".halve-me").each(function(a,n){var o=e(n).html(),i=t(o),r=o.slice(0,i).trim(),s=o.slice(i,o.length).trim();e(n).html(r+"</span><span>"+s)});var u;e("[name='a-simple-experience']").find(".buttons-captions").attr("data-current","1"),e("[name='a-simple-experience']").find(".buttons-track li:nth-of-type(1)").addClass("current"),e("[name='a-simple-experience'] .buttons-track li").on("focus mouseover",function(){u=e(this).index(),u+=1,e("[name='a-simple-experience'] .buttons-track li").attr("class",""),e(this).addClass("current"),e("[name='a-simple-experience'] .buttons-captions").attr("data-current",u),e(".monitor .scenario").removeClass("active"),e(".monitor .scenario[data-scenario='"+u+"']").addClass("active")}),a("iOS"==c|"Android"==c?55:90),e('[name="productivity-apps"] header span').on("onscreen",function(t,a){a.percentInview>90?e(this).addClass("visible"):e(this).removeClass("visible")}),n(".masthead",0,".masthead .primary-content"),n(".productivity-row",1),n(".premium-appeal .plate",1,".premium-appeal .plate"),n('[name="accessibility-addendum"]',1),n('[name="productivity-apps"] .visualization',1),n(".links-graveyard .bound",1,".links-graveyard"),n(".welcome-to-outlook .text",1,".welcome-to-outlook"),n(".welcome-to-outlook .icons-row",1,".welcome-to-outlook .icons-row"),n('[name="security"]',1),n(".features .icon",99),n('[name="time-management"] .family-photograph',1),n('[name="time-management"] .scenario',1),n('[name="a-simple-experience"] header',1),n(".hotmail-explanation",1);var p=(new LazyLoad({elements_selector:".lazy",threshold:800}),"X-OPS"),b="speedbumpShown=speedbump",f="speedbumpShown",h=2592e6,v=e("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]"),y=e("#mobile-speedbump")[0],k=e("#mobile-speedbump .secondary a")[0],w=e(".mobile-speedbump-close")[0],c=getOS();if("iOS"===c||"Android"===c){var x=s();i(),e("[data-task='signin']").click(function(){x&&(event.preventDefault(),o(),l(),x=!1)})}e(y).on("keydown",function(e){"Tab"===e.key?e.shiftKey&&document.activeElement===w?(e.preventDefault(),k.focus()):e.shiftKey||document.activeElement!==k||(e.preventDefault(),w.focus()):"Escape"==e.key&&d()}),e("#mobile-speedbump .mobile-speedbump-close").click(function(){d()})});