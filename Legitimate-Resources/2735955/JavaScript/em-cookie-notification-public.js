!function r(c,a,s){function u(t,o){if(!a[t]){if(!c[t]){var e="function"==typeof require&&require;if(!o&&e)return e(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var i=a[t]={exports:{}};c[t][0].call(i.exports,function(o){return u(c[t][1][o]||o)},i,i.exports,r,c,a,s)}return a[t].exports}for(var f="function"==typeof require&&require,o=0;o<s.length;o++)u(s[o]);return u}({1:[function(o,t,e){"use strict";!function(n){var i=window.EmCookieNotification||{},r="1"===i.hide_in_us,t=i.api,c="has-cookie";function a(o,t,e){var n="";if(e){var i=new Date;i.setTime(i.getTime()+24*e*60*60*1e3),n="; expires="+i.toUTCString()}document.cookie=o+"="+t+n+"; path=/"}function s(o){for(var t=o+"=",e=document.cookie.split(";"),n=0;n<e.length;n++){for(var i=e[n];" "==i.charAt(0);)i=i.substring(1,i.length);if(0==i.indexOf(t))return i.substring(t.length,i.length)}return null}function u(){var o=new Date,t=o.getDate(),e=o.getMonth()+1,n=o.getFullYear();return t<10&&(t="0"+t),e<10&&(e="0"+e),parseInt(""+n+e+t)}function f(e){n.ajax({type:"POST",url:"https://www.googleapis.com/geolocation/v1/geolocate?key="+t,data:JSON.stringify({considerIp:"true"}),contentType:"application/json",success:function(o){void 0!==o.location.lat&&void 0!==o.location.lng&&n.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+o.location.lat+", "+o.location.lng+"&key="+t,function(o){var t=function(o){for(var t=0;t<o.length;t++){if("country"==o[t].types[0])return o[t].short_name;if(2==o[t].types.length&&"political"==o[t].types[0])return o[t].short_name}return!1}(o.results[0].address_components);"US"!==t?(l(),!0===e&&a("em_cookie_notification_country",t,31)):a("em_cookie_notification_country",t,31)})},error:function(o){console.log("💥 Ups! We have an error: "),console.log(o)}})}function l(){var o=!1;if(s("em_cookie_notification")){var t=JSON.parse(s("em_cookie_notification")),e=parseInt(i.effective);(void 0!==t?t.dateAccepted:u())<e&&(o=e<=u())}else o=!0;o&&(n(".cookie-notification").show(),n("body").addClass(c),n(".cookie-notification__button button").click(function(o){o.preventDefault();var t={dateAccepted:u()};r&&f(!0),a("em_cookie_notification",JSON.stringify(t),parseInt(i.expiry)),n(".cookie-notification").css("opacity","0"),setTimeout(function(){n(".cookie-notification").css("display","none")},300),n("body").removeClass(c)}))}n(document).ready(function(){r&&!s("em_cookie_notification_country")?f():r&&"US"!==s("em_cookie_notification_country")?l():!1===r&&l()})}(jQuery)},{}]},{},[1]);
//# sourceMappingURL=../maps/em-cookie-notification-public.js.map
