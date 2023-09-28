//Shared functionality between RS3 and OSRS
var JXGLOBAL = JXGLOBAL || {};
JXGLOBAL.user = {
 browser: function() {
  return {
   // Global vars that help us detect the browser
         isOpera: !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
         // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
         isFirefox: typeof InstallTrigger !== 'undefined', // Firefox 1.0+
         isSafari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
         // At least Safari 3+: "[object HTMLElementConstructor]"
         isChrome: !!window.chrome && !(!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) && navigator.userAgent.indexOf("Edge") < 0, // Chrome 1+
         isIE: /*@cc_on!@*/false || !!document.documentMode, // At least IE6
   // Is Microsoft Edge
   isEdge: navigator.userAgent.indexOf("Edge") >= 0
     }
 },
 os: function() {
     var win32           = false,
         win64           = false,
         mac             = false,
         linux64         = false,
         linux           = false,
         linuxUniversal  = false,
         mobile          = false,
         unknown      = false;
 
     if      ( navigator.platform === 'Win64' || navigator.userAgent.indexOf('WOW64') !== -1 || navigator.userAgent.indexOf('Win64') !== -1 ) win64 = true;
     else if ( navigator.platform === 'Win32' ) win32 = true;
 
     else if ( navigator.platform === 'MacIntel' ) mac = true;
 
     else if ( navigator.platform === 'Linux i686_64 X11' ) linux64 = true;
     else if ( navigator.platform.substring(0,10) === 'Linux i686' ) linux = true;
     else if ( navigator.platform.substring(0,5) === 'Linux' ) linuxUniversal = true;
 
     else if ( navigator.platform === 'iPhone' ||
               navigator.platform === 'iPod'  ||
               navigator.platform === 'iPad' ||
               navigator.platform === 'Android' ||
               navigator.platform === 'BlackBerry' ||
               navigator.platform === 'iPod' ||
               navigator.platform === 'iPod' ) {
         mobile = true;
     }
 
     else unknown = true;
 
     return {
         isWin32: win32,
         isWin64: win64,
         isMac: mac,
         isLinux64: linux64,
         isLinux: linux,
         isLinuxUniversal: linuxUniversal,
         isUnknown: unknown,
         isMobile: mobile,
         installerMatch: function () {
             var installer = null;
 
             if (win32 && _.where(JXGLOBAL.client, { platform: 'Windows_x86' }).length > 0) {
                 installer = _.where(JXGLOBAL.client, { platform: 'Windows_x86' })[0];
             }
             else if (win64) {
                 /* If 64 isn't available, fall to 32 */
                 if(_.where(JXGLOBAL.client, { platform: 'Windows_x86_64' }).length > 0) {
                     installer = _.where(JXGLOBAL.client, { platform: 'Windows_x86_64' })[0];
                 } else if (_.where(JXGLOBAL.client, { platform: 'Windows_x86' }).length > 0) {
                     installer = _.where(JXGLOBAL.client, { platform: 'Windows_x86' })[0];
                 }
             }
             else if (mac && _.where(JXGLOBAL.client, { platform: 'OSX_x86' }).length > 0) {
                 installer = _.where(JXGLOBAL.client, { platform: 'OSX_x86' })[0];
             }
             else if (linux && _.where(JXGLOBAL.client, { platform: 'Linux_x86' }).length > 0) {
                 installer = _.where(JXGLOBAL.client, { platform: 'Linux_x86' })[0];
             }
             else if (linux64) {
                 /* If 64 isn't available, fall to 32 */
                 if(_.where(JXGLOBAL.client, { platform: 'Linux_x86_64' }).length > 0) {
                     installer = _.where(JXGLOBAL.client, { platform: 'Linux_x86_64' })[0];
                 } else if (_.where(JXGLOBAL.client, { platform: 'Linux_x86' }).length > 0) {
                     installer = _.where(JXGLOBAL.client, { platform: 'Linux_x86' })[0];
                 }
             }
             else if (linuxUniversal && _.where(JXGLOBAL.client, { platform: 'linuxUniversal' }).length > 0) {
                 installer = _.where(JXGLOBAL.client, { platform: 'linuxUniversal' })[0];
             }
 
             return installer;
         }
     };
 } 
};