function _extends(){return(_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function _inheritsLoose(e,t){e.prototype=Object.create(t.prototype),(e.prototype.constructor=e).__proto__=t}!function(a,c){"use strict";var e={onIdle:function(e){var t,n=["mousedown","mousemove","keypress","scroll","touchstart","click"];function o(){clearTimeout(t),t=setTimeout(i,e.time)}function i(){e.callback(),n.forEach(function(e){c.removeEventListener(e,o)})}this.start=function(){o(),a.addEventListener("load",o),n.forEach(function(e){c.addEventListener(e,o)})},this.bind=function(){this.start()}},onAdBlockDetect:function(e){function t(){n||!function(){var e=c.createElement("div");e.className="adsbygoogle pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links ad-text adSense adBlock adContent adBanner ebAdDetector",e.setAttribute("style","width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;"),c.body.appendChild(e);var t="none"===getComputedStyle(e,null).display;return setTimeout(function(){e.remove()},5e3),t}()||(n=!0,e.callback())}var n=!1;return this.bind=function(){t(),a.onload=t,a.onload=setTimeout(t,1e3)},this},onHover:function(e){function t(){o=setTimeout(function(){e.callback()},e.delay)}function n(){clearTimeout(o)}var o,i=c.querySelectorAll(e.selector);if(i.length)return this.bind=function(){i.forEach(function(e){e.addEventListener("mouseover",t),e.addEventListener("mouseout",n)})},this.unbind=function(){i.forEach(function(e){e.removeEventListener("mouseover",t),e.removeEventListener("mouseout",n)})},this},onExit:function(t){var e=this;t=EngageBox.extend({sensitivity:20,aggressive:!1,timer:2e3,delay:0,callback:null},t);function n(e){e.relatedTarget||e.toElement||e.clientY>t.sensitivity||(i=setTimeout(r,t.delay))}function o(){i&&(clearTimeout(i),i=null)}var i=null,r=function(){t.callback(),t.aggressive||e.unbind()};return this.bind=function(){setTimeout(function(){c.addEventListener("mouseout",n),c.addEventListener("mouseenter",o)},t.timer)},this.unbind=function(){c.removeEventListener("mouseout",n),c.removeEventListener("mouseenter",o)},this},onScrollDepth:function(t){var e,n=this;t=EngageBox.extend({scroll_depth:"percentage",scroll_depth_value:80,scroll_dir:"down",callback:null,once:!0},t);function o(){var e="percentage"==t.scroll_depth?function(){var e=c.documentElement,t=c.body,n="scrollTop",o="scrollHeight";return(e[n]||t[n])/((e[o]||t[o])-e.clientHeight)*100}():a.scrollY;return"up"==r()?e<=t.scroll_depth_value:e>=t.scroll_depth_value}function i(){var e=r()==t.scroll_dir;o()&&e&&"function"==typeof t.callback&&(t.callback(),t.once&&n.unbind()),s=c.body.getBoundingClientRect().top}var r=function(){var e=c.body.getBoundingClientRect().top;return s<e?"up":"down"},s=0;return this.bind=function(){e=EngageBox.throttle(i,10),i(),a.addEventListener("scroll",e)},this.unbind=function(){a.removeEventListener("scroll",e)},this},onClick:function(t){if((t=EngageBox.extend({selector:null,callback:null},t)).selector){var e=function(e){e.target.closest(t.selector)&&(t.prevent_default&&e.preventDefault(),t.callback(e))};return this.bind=function(){return c.addEventListener("click",e)},this.unbind=function(){return c.removeEventListener("click",e)},this}},onExternalLink:function(o){o=EngageBox.extend({selector:null,callback:null},o);function e(e){var t=e.target;if("a"!=t.nodeName.toLocaleLowerCase()){var n=t.closest("a");if(!n)return;t=n}t.classList.contains("eb-btn-continue")||o.selector&&!t.matches(o.selector)||location.hostname!==t.hostname&&t.hostname.length&&(e.preventDefault(),o.callback(t))}return this.bind=function(){c.addEventListener("click",e)},this.unbind=function(){c.removeEventListener("click",e)},this},onPageReady:function(e){return this.bind=function(){e.callback()},this},onPageLoad:function(e){return this.bind=function(){a.addEventListener("load",function(){e.callback()})},this},onElementVisibility:function(t){var n=this;if((t=EngageBox.extend({selector:"",threshold:.5,on:"",off:"",once:!0},t)).selector&&a.IntersectionObserver){var e=c.querySelectorAll(t.selector);if(e.length){var o=!1,i=new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting?(t.on(),o=!0,"function"!=typeof t.off&&t.once&&n.unbind()):"function"==typeof t.off&&(t.off(),o&&t.once&&n.unbind())})},{threshold:t.threshold});return this.bind=function(){e.forEach(function(e){i.observe(e)})},this.unbind=function(){e.forEach(function(e){i.unobserve(e)})},this}}}};a.EngageBoxTriggers=e}(window,document),function(i,s,a){"use strict";var o,n=[],e=function(r){function l(t,e){var n;(n=r.call(this)||this).name="EngageBox",n.el=t,n.el.box=t.querySelector(".eb-dialog"),n.id=parseInt(t.dataset.id),n.activeTriggers=[];var o,i={trigger:"onPageLoad",trigger_selector:"",prevent_default:!(n.opened=!1),delay:0,scroll_depth:"percentage",scroll_depth_value:80,scroll_dir:"down",firing_frequency:1,reverse_scroll_close:!1,threshold:.5,close_out_viewport:!1,exit_timer:2e3,idle_time:1e4,animation_open:"transition.fadeIn",animation_close:"transition.fadeOut",animation_duration:400,backdrop:!0,backdrop_color:"rgba(0,0,0,.8)",backdrop_click:!0,disable_page_scroll:!1,ga_tracking:!1,ga_tracking_id:"",ga_tracking_label:n.name,css_class_prefix:"eb-",auto_focus:!1,test_mode:!1,debug:!1};try{o=JSON.parse(t.dataset.options)}catch(e){console.warn("EngageBox: Cannot parse box's data-options property. Using default settings.",t)}return n.options=n.constructor.extend(i,e||(o||[])),n.init(),n}_inheritsLoose(l,r);var e=l.prototype;return e.open=function(n){var o=this,i=this.constructor.extend(_extends({},this.options),n);setTimeout(function(){if(o.opened)o.log("Open Fail: Already opened.");else if(o.isTransitioning())o.log("Open Fail: Is triggering..");else if(!1!==o.emitEvent("beforeOpen")){o.el.classList.add("triggering");var e=function(){o.el.classList.remove("eb-hide"),o.emitEvent("open",n)},t=function(){o.opened=!0,o.el.classList.remove("triggering"),o.emitEvent("afterOpen",n)};if(!a)return e(),void o.constructor.animateCSS(o.el.box,"eb-fadeIn",function(){t()});a(o.el.box,i.animation_open,{duration:i.animation_duration,begin:function(){e(),-1<i.animation_open.indexOf("callout.")&&(o.el.box.style.display="block",o.el.box.style.opacity="1")},complete:function(){t()}})}else o.log("Open aborted")},i.delay)},e.close=function(e){var t=this,n=this.constructor.extend(_extends({},this.options),e);if(this.opened)if(this.isTransitioning())this.log("Close Fail: Is triggering.");else if(!1!==this.emitEvent("beforeClose")){this.el.classList.add("triggering");var o=function(){t.emitEvent("close",e)},i=function(){t.opened=!1,t.el.classList.remove("triggering"),t.emitEvent("afterClose",e),t.el.classList.add("eb-hide")};if(!a)return o(),void this.constructor.animateCSS(this.el.box,"eb-fadeOut",function(){i()});a(this.el.box,n.animation_close,{duration:n.animation_duration,begin:function(){o()},complete:function(){i()}})}else this.log("Close aborted");else this.log("Close Fail: Already closed")},e.getCSRFToken=function(){var e=this.constructor.getJoomlaOption("csrf.token");return e||this.options.token},e.getBaseURL=function(){var e=this.constructor.getJoomlaOption("system.paths");return(e?e.root+"/":i.location.pathname)+"index.php?option=com_ajax&plugin=rstbox&format=raw&task=trackevent&box="+this.id},e.request=function(t,n){n=this.constructor.extend({onSuccess:null},n);var e=Object.keys(t).map(function(e){return e+"="+t[e]}).join("&"),o=new XMLHttpRequest;o.open("POST",this.getBaseURL()+"&"+e,!0),o.setRequestHeader("X-Ajax-Engine",this.name),o.setRequestHeader("X-CSRF-Token",this.getCSRFToken()),o.onload=function(){var e=o.response;try{e=JSON.parse(e)}catch(e){}200===o.status&&n.onSuccess&&n.onSuccess.call(i,e,o)},o.send()},e.isTransitioning=function(){return this.el.classList.contains("triggering")},e.toggle=function(e){this.opened?this.close(e):this.open(e)},e.unbindTriggers=function(){this.activeTriggers.forEach(function(e){e.hasOwnProperty("unbind")&&e.unbind()}),this.log("Triggers unbound")},e.trigger_onScrollDepth=function(e){var t=this,n=this.constructor.extend(_extends({},this.options),e);return new EngageBoxTriggers.onScrollDepth({scroll_depth:n.scroll_depth,scroll_depth_value:n.scroll_depth_value,scroll_dir:n.scroll_dir,once:1==n.firing_frequency,callback:function(){t.open(),n.reverse_scroll_close&&new EngageBoxTriggers.onScrollDepth({scroll_depth:n.scroll_depth,scroll_depth_value:n.scroll_depth_value,scroll_dir:"up"==n.scroll_dir?"down":"up",callback:function(){t.close({temporary:!0})}}).bind()}})},e.trigger_onElementVisibility=function(e){var t=this,n=this.constructor.extend(_extends({},this.options),e);return new EngageBoxTriggers.onElementVisibility({selector:n.trigger_selector,threshold:n.threshold,once:1==n.firing_frequency,on:function(){t.open()},off:n.close_out_viewport?function(){return t.close({temporary:!0})}:null})},e.trigger_onHover=function(e){var t=this,n=this.constructor.extend(_extends({},this.options),e);return new EngageBoxTriggers.onHover({selector:n.trigger_selector,delay:n.delay,callback:function(){t.open({delay:0})}})},e.trigger_onClick=function(e){var t=this,n=this.constructor.extend(_extends({},this.options),e);return new EngageBoxTriggers.onClick({selector:n.trigger_selector,prevent_default:n.prevent_default,callback:function(e){t.triggerElement=e.target,t.open()}})},e.trigger_onExternalLink=function(e){var n=this,t=this.constructor.extend(_extends({},this.options),e);return new EngageBoxTriggers.onExternalLink({selector:t.trigger_selector,callback:function(e){n.triggerElement=e,n.open();var t=n.el.querySelector(".eb-btn-continue");t&&(t.setAttribute("href",e.getAttribute("href")),null!==e.getAttribute("target")&&t.setAttribute("target",e.getAttribute("target")))}})},e.trigger_onExit=function(e){var t=this,n=this.constructor.extend(_extends({},this.options),e);return this.constructor.isTouchDevice()?new EngageBoxTriggers.onScrollDepth({scroll_depth_value:40,scroll_dir:"up",once:!0,callback:function(){t.open()}}):new EngageBoxTriggers.onExit({timer:n.exit_timer,aggressive:2==n.firing_frequency,callback:function(){t.open({delay:0})}})},e.trigger_onPageLoad=function(e){var t=this;return new EngageBoxTriggers.onPageLoad({callback:function(){t.open()}})},e.trigger_onPageReady=function(e){var t=this;return new EngageBoxTriggers.onPageReady({callback:function(){t.open()}})},e.trigger_onAdBlockDetect=function(){var e=this;return new EngageBoxTriggers.onAdBlockDetect({callback:function(){e.open()}})},e.trigger_onIdle=function(e){var t=this,n=this.constructor.extend(_extends({},this.options),e),o=new EngageBoxTriggers.onIdle({time:n.idle_time,callback:function(){t.open({delay:0})}});return 2==n.firing_frequency&&this.on("afterClose",function(){o.start()}),o},e.bindTrigger=function(e,t){var n="trigger_"+(e=e||this.options.trigger);if("function"==typeof this[n]){var o=this[n](t);if(!o.hasOwnProperty("bind")){var i="Cannot bind trigger "+e+". ";return o.error&&(i+=o.error),void this.warn(i)}o.bind(),this.activeTriggers.push(o),this.log("Bind Trigger: "+e)}else this.log("Trigger not found: "+e)},e.emitEvent=function(e,t){(t=t||{}).instance=this;var n="EngageBox"+(e.charAt(0).toUpperCase()+e.slice(1)),o=new CustomEvent(n,{detail:t,cancelable:!0});return s.dispatchEvent(o),this.emit(e,this,t)},e.HTMLAttributes=function(){var c=this;0<n.length||s.addEventListener("click",function(e){var t=e.target;if(t.hasAttribute("data-ebox-cmd")||t.hasAttribute("data-ebox")){var n=t.dataset.ebox?t.dataset.ebox:t.closest(".eb-inst").dataset.id;if(n){var o=l.getInstance(n);if(o){for(var i=t.getAttribute("data-ebox-cmd"),r={},s=0;s<t.attributes.length;s++){var a=t.attributes[s];if(/^data-ebox-/.test(a.nodeName))r[a.nodeName.replace(/^data-ebox-/,"")]=a.nodeValue}switch(c.triggerElement=t,i){case"open":o.open(r);break;case"close":o.close(r);break;case"closeKeep":case"hide":console.warn('The "'+i+'" command is deprecated. Please, use "close" command instead.'),o.close(r);break;default:o.toggle(r)}"0"!=t.getAttribute("data-ebox-prevent")&&e.preventDefault()}else console.warn('EngageBox with ID "#'+n+'" not found on the page. Make sure it is published.')}}})},e.bindActions=function(){var o=this;this.on("beforeOpen",function(){if(!o.options.test_mode&&o.constructor.getCookie(o.name.toLowerCase()+"_"+o.id))return!1});var e,t=s.querySelector("html"),n=this.options.css_class_prefix;this.options.backdrop&&this.on("open",function(){(e=s.createElement("div")).classList.add(n+"backdrop"),e.style.backgroundColor=o.options.backdrop_color,o.el.appendChild(e),o.constructor.animateCSS(e,n+"fadeIn"),o.options.backdrop_click&&e.addEventListener("click",function(){o.close()})}).on("close",function(){o.constructor.animateCSS(e,n+"fadeOut",function(){e.parentNode.removeChild(e)})});this.options.disable_page_scroll&&this.on("open",function(){t.classList.add(n+"page_no_scroll")}).on("afterClose",function(){t.classList.remove(n+"page_no_scroll")}),this.HTMLAttributes(),this.on("open",function(){t.classList.add(n+this.id+"-opening")}).on("afterOpen",function(){if(this.options.auto_focus){var e=this.el.querySelector(".eb-content").querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');e.length&&e[0].focus()}this.el.classList.add(n+"visible"),t.classList.add(n+this.id+"-open"),t.classList.remove(n+this.id+"-opening"),t.classList.add(n+this.el.dataset.type)}).on("close",function(){t.classList.add(n+this.id+"-closing")}).on("afterClose",function(){this.el.classList.remove(n+"visible"),t.classList.remove(n+this.id+"-open"),t.classList.remove(n+this.id+"-closing"),t.classList.remove(n+this.el.dataset.type)}),this.on("open",function(){o.request({event:"open"})}).on("afterClose",function(e,t){var n={event:"close"};t&&Object.keys(t).forEach(function(e){n["options["+e+"]"]=t[e]}),o.request(n,{onSuccess:function(e){"stop"==e.action&&o.destroy()}})})},e.destroy=function(){return this.off(),this.unbindTriggers(),this.log("Destroyed"),this.el.parentNode.removeChild(this.el),this},e.update=function(){return this.off(),this.unbindTriggers(),this.bindActions(),this.bindTrigger(),this},e.warn=function(e){this.options.debug&&(e=this.name+" #"+this.id+": "+e,console.warn(e))},e.log=function(e){this.options.debug&&(e=this.name+" #"+this.id+": "+e,console.log(e))},e.getContent=function(){return this.el.querySelector(".eb-content")},l.getCookie=function(e){for(var t=e+"=",n=s.cookie.split(";"),o=0;o<n.length;o++){for(var i=n[o];" "==i.charAt(0);)i=i.substring(1);if(0==i.indexOf(t))return i.substring(t.length,i.length)}return""},l.getInstance=function(t){return n.find(function(e){return e.id==t})},l.closeAll=function(){n.forEach(function(e){e.close()})},l.getInstances=function(t){return void 0===t?n:n.filter(function(e){return e.el.dataset.type==t})},l.getTotalOpened=function(){var t=0;return n.forEach(function(e){e.opened&&t++}),t},l.onReady=function(e){"loading"==s.readyState?s.addEventListener("DOMContentLoaded",e):e()},l.getJoomlaOption=function(e,t){if("undefined"!=typeof Joomla)return Joomla.getOptions(e);if(!o){var n=s.querySelector(".joomla-script-options");if(!n)return;o=JSON.parse(n.text||n.textContent)}return void 0!==o[e]?o[e]:t},l.throttle=function(o,i){var r=this,s=!1;return function(){if(!s){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];o.apply(r,t),s=!0,setTimeout(function(){s=!1},i)}}},l.isTouchDevice=function(){var e=" -webkit- -moz- -o- -ms- ".split(" ");if("ontouchstart"in i||i.DocumentTouch&&s instanceof DocumentTouch)return!0;var t,n=["(",e.join("touch-enabled),("),"heartz",")"].join("");return t=n,i.matchMedia(t).matches},l.extend=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},l.animateCSS=function(t,n,o){t.classList.add("eb-animate",n),t.addEventListener("animationend",function e(){t.classList.remove("eb-animate",n),t.removeEventListener("animationend",e),"function"==typeof o&&o()})},e.init=function(){var t=this;this.el.classList.contains(this.options.css_class_prefix+"init")||n.some(function(e){return e.id==t.id})||(this.bindActions(),this.bindTrigger(),this.el.classList.add(this.options.css_class_prefix+"init"),n.push(this),this.el.engagebox=this)},l}(function(){function e(){}var t=e.prototype;return t.on=function(e,t){return this._callbacks=this._callbacks||{},this._callbacks[e]||(this._callbacks[e]=[]),this._callbacks[e].push(t),this},t.emit=function(e){this._callbacks=this._callbacks||{};var t=this._callbacks[e];if(t){for(var n=arguments.length,o=new Array(1<n?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];var r=t,s=Array.isArray(r),a=0;for(r=s?r:r[Symbol.iterator]();;){var c;if(s){if(a>=r.length)break;c=r[a++]}else{if((a=r.next()).done)break;c=a.value}if(0==c.apply(this,o))return!1}}return this},t.off=function(e,t){if(!this._callbacks||0===arguments.length)return this._callbacks={},this;var n=this._callbacks[e];if(!n)return this;if(1===arguments.length)return delete this._callbacks[e],this;for(var o=0;o<n.length;o++){if(n[o]===t){n.splice(o,1);break}}return this},e}());i.EngageBox=e}(window,document,window.jQuery?window.jQuery.Velocity:window.Velocity),EngageBox.onReady(function(){document.querySelectorAll(".eb-inst").forEach(function(e){new EngageBox(e)})}),function(){"use strict";document.addEventListener("EngageBoxBeforeClose",function(e){var t=e.detail.instance,n=t.getContent();n&&t.on("afterClose",function(){var e=n.querySelectorAll("video, audio");e.length&&e.forEach(function(e){return e.pause()});var t=n.querySelectorAll('iframe[src*="youtube.com"]');t.length&&t.forEach(function(e){return e.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}',"*")})})})}();

