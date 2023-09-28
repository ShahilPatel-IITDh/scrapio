const WBOTdata = {
    token: document.currentScript.getAttribute('token') || document.querySelector('script[src="https://wbot.chat/index.js"]').getAttribute('token'),
    messagesBeingSentCount: 0,
    isChatNeverOpenedBefore: true,
    isFirstAccess: true,
    api: 'https://megazap.chat',
    url: 'https://wbot.chat'
};

WBOTdata.sessionId = WBOTgetSessionId();

//var WBOTmd5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
(function(n){function d(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function f(n,t,r,e,o,u){return d((u=d(d(t,n),d(e,u)))<<o|u>>>32-o,r)}function l(n,t,r,e,o,u,c){return f(t&r|~t&e,n,t,o,u,c)}function g(n,t,r,e,o,u,c){return f(t&e|r&~e,n,t,o,u,c)}function v(n,t,r,e,o,u,c){return f(t^r^e,n,t,o,u,c)}function m(n,t,r,e,o,u,c){return f(r^(t|~e),n,t,o,u,c)}function c(n,t){var r,e,o,u;n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t;for(var c=1732584193,f=-271733879,i=-1732584194,a=271733878,h=0;h<n.length;h+=16)c=l(r=c,e=f,o=i,u=a,n[h],7,-680876936),a=l(a,c,f,i,n[h+1],12,-389564586),i=l(i,a,c,f,n[h+2],17,606105819),f=l(f,i,a,c,n[h+3],22,-1044525330),c=l(c,f,i,a,n[h+4],7,-176418897),a=l(a,c,f,i,n[h+5],12,1200080426),i=l(i,a,c,f,n[h+6],17,-1473231341),f=l(f,i,a,c,n[h+7],22,-45705983),c=l(c,f,i,a,n[h+8],7,1770035416),a=l(a,c,f,i,n[h+9],12,-1958414417),i=l(i,a,c,f,n[h+10],17,-42063),f=l(f,i,a,c,n[h+11],22,-1990404162),c=l(c,f,i,a,n[h+12],7,1804603682),a=l(a,c,f,i,n[h+13],12,-40341101),i=l(i,a,c,f,n[h+14],17,-1502002290),c=g(c,f=l(f,i,a,c,n[h+15],22,1236535329),i,a,n[h+1],5,-165796510),a=g(a,c,f,i,n[h+6],9,-1069501632),i=g(i,a,c,f,n[h+11],14,643717713),f=g(f,i,a,c,n[h],20,-373897302),c=g(c,f,i,a,n[h+5],5,-701558691),a=g(a,c,f,i,n[h+10],9,38016083),i=g(i,a,c,f,n[h+15],14,-660478335),f=g(f,i,a,c,n[h+4],20,-405537848),c=g(c,f,i,a,n[h+9],5,568446438),a=g(a,c,f,i,n[h+14],9,-1019803690),i=g(i,a,c,f,n[h+3],14,-187363961),f=g(f,i,a,c,n[h+8],20,1163531501),c=g(c,f,i,a,n[h+13],5,-1444681467),a=g(a,c,f,i,n[h+2],9,-51403784),i=g(i,a,c,f,n[h+7],14,1735328473),c=v(c,f=g(f,i,a,c,n[h+12],20,-1926607734),i,a,n[h+5],4,-378558),a=v(a,c,f,i,n[h+8],11,-2022574463),i=v(i,a,c,f,n[h+11],16,1839030562),f=v(f,i,a,c,n[h+14],23,-35309556),c=v(c,f,i,a,n[h+1],4,-1530992060),a=v(a,c,f,i,n[h+4],11,1272893353),i=v(i,a,c,f,n[h+7],16,-155497632),f=v(f,i,a,c,n[h+10],23,-1094730640),c=v(c,f,i,a,n[h+13],4,681279174),a=v(a,c,f,i,n[h],11,-358537222),i=v(i,a,c,f,n[h+3],16,-722521979),f=v(f,i,a,c,n[h+6],23,76029189),c=v(c,f,i,a,n[h+9],4,-640364487),a=v(a,c,f,i,n[h+12],11,-421815835),i=v(i,a,c,f,n[h+15],16,530742520),c=m(c,f=v(f,i,a,c,n[h+2],23,-995338651),i,a,n[h],6,-198630844),a=m(a,c,f,i,n[h+7],10,1126891415),i=m(i,a,c,f,n[h+14],15,-1416354905),f=m(f,i,a,c,n[h+5],21,-57434055),c=m(c,f,i,a,n[h+12],6,1700485571),a=m(a,c,f,i,n[h+3],10,-1894986606),i=m(i,a,c,f,n[h+10],15,-1051523),f=m(f,i,a,c,n[h+1],21,-2054922799),c=m(c,f,i,a,n[h+8],6,1873313359),a=m(a,c,f,i,n[h+15],10,-30611744),i=m(i,a,c,f,n[h+6],15,-1560198380),f=m(f,i,a,c,n[h+13],21,1309151649),c=m(c,f,i,a,n[h+4],6,-145523070),a=m(a,c,f,i,n[h+11],10,-1120210379),i=m(i,a,c,f,n[h+2],15,718787259),f=m(f,i,a,c,n[h+9],21,-343485551),c=d(c,r),f=d(f,e),i=d(i,o),a=d(a,u);return[c,f,i,a]}function i(n){for(var t="",r=32*n.length,e=0;e<r;e+=8)t+=String.fromCharCode(n[e>>5]>>>e%32&255);return t}function a(n){var t=[];for(t[(n.length>>2)-1]=void 0,e=0;e<t.length;e+=1)t[e]=0;for(var r=8*n.length,e=0;e<r;e+=8)t[e>>5]|=(255&n.charCodeAt(e/8))<<e%32;return t}function e(n){for(var t,r="0123456789abcdef",e="",o=0;o<n.length;o+=1)t=n.charCodeAt(o),e+=r.charAt(t>>>4&15)+r.charAt(15&t);return e}function r(n){return unescape(encodeURIComponent(n))}function o(n){return i(c(a(n=r(n)),8*n.length))}function u(n,t){return function(n,t){var r,e=a(n),o=[],u=[];for(o[15]=u[15]=void 0,16<e.length&&(e=c(e,8*n.length)),r=0;r<16;r+=1)o[r]=909522486^e[r],u[r]=1549556828^e[r];return t=c(o.concat(a(t)),512+8*t.length),i(c(u.concat(t),640))}(r(n),r(t))}function t(n,t,r){return t?r?u(t,n):e(u(t,n)):r?o(n):e(o(n))}"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:n.WBOTmd5=t})(this);


let WBOTverifyActiveAttendanceFromApiInterval = null;
let WBOTgetPendingMessagesFromApiInterval = null;

(async function() {
    document.body.insertAdjacentHTML('beforeend', '<div id="wbot-chat-container"></div>');

    await fetch(`${WBOTdata.api}/api/botSites/${WBOTdata.token}/customizacao`)
        .then(response => response.json())
        .then(customization => {
            const customColorInHSL = WBOTconvertRGBToHSL(WBOTparseToRGB(customization.cor));

            WBOTdata.customization = {
                themePrimaryColor: WBOThslToString(customColorInHSL),
                themeSecondaryColor: WBOThslToString({ h: customColorInHSL.h, s: customColorInHSL.s - .05, l: customColorInHSL.l + .12 }),
                messageInAvatarUrl: customization.imagem,
                greetingMessage: customization.mensagem,
                chatSide: customization.posicaoHorizontal == 'ESQUERDA' ? 'left' : 'right',
                clientName: customization.cliente
            };
        });    

    fetch(`${WBOTdata.url}/index.html`)
        .then(response => response.text())
        .then(chatHtml => WBOT$("#wbot-chat-container").innerHTML = chatHtml
                .replace(/chatSide/g, WBOTdata.customization.chatSide)
                .replace(/clientName/g, WBOTdata.customization.clientName))
        .then(() => {
                // FASE 2
                /*var observer = new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                                if (entry.isIntersecting)
                                    entries[0].target.classList.remove('wbot-unread');
                            })
                    }, { root: $('#wbot-chat main'), threshold: 0.75 });
                
                // observing a target element
                observer.observe(document.querySelector(".message.unread"));*/
            });

    fetch(`${WBOTdata.url}/index.css`)
        .then(response => response.text())
        .then(cssText => {
            document.head.insertAdjacentHTML("beforeend", `<style>${
                cssText.replace(/themePrimaryColor/g, WBOTdata.customization.themePrimaryColor)
                    .replace(/themeSecondaryColor/g, WBOTdata.customization.themeSecondaryColor)
                    .replace(/messageInAvatarUrl/g, WBOTdata.customization.messageInAvatarUrl)
                    .replace(/greetingMessage/g, WBOTdata.customization.greetingMessage)
                    .replace(/chatSide/g, WBOTdata.customization.chatSide)
            }</style>`);
        });
})();

function WBOTparseToRGB(rgbString) {
    return {
        r: parseInt(rgbString.substr(1, 2), 16),
        g: parseInt(rgbString.substr(3, 2), 16),
        b: parseInt(rgbString.substr(5, 2), 16)
    };
}

function WBOTconvertRGBToHSL(rgb) {
    let r = rgb.r / 255;
    let g = rgb.g / 255;
    let b = rgb.b / 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return { h, s, l };
}

function WBOThslToString(hsl) {
    return `hsl(${Math.round(hsl.h * 360)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`;
}

function WBOTopenChat() {
    return WBOTgetPendingMessagesFromApi()
        .then(() => {
            if (WBOTdata.isChatNeverOpenedBefore) {
                if (WBOTdata.isFirstAccess) {
                    WBOTsendMessagesToApi([{ type: 'TEXT', text: 'Iniciar' }]);
                } else {
                    WBOTgetLastMessagesFromApi();
                }
            }
        })
        .then(() => {
            WBOTverifyActiveAttendanceFromApiInterval = setInterval(WBOTverifyActiveAttendanceFromApi, 1000 * 4);

            WBOTdata.isChatNeverOpenedBefore = false;
        })
        .then(() => {
            WBOT$('#wbot-chat-container #wbot-chat').classList.add('wbot-active');

            if (WBOTisMobile())
                WBOT$('body').style.overflow = 'hidden';

            WBOTfocusMessageInput();
        });
}

function WBOTcloseChat() {
    WBOT$('#wbot-chat-container #wbot-chat').classList.remove('wbot-active');
    
    WBOT$('body').style.overflow = null;

    clearInterval(WBOTverifyActiveAttendanceFromApiInterval);
    clearInterval(WBOTgetPendingMessagesFromApiInterval);
}

function WBOTattachFile() {
    let filesInput = document.createElement('input');
    filesInput.type = 'file';
    filesInput.setAttribute('multiple', '');

    filesInput.onchange = e => { 
        WBOTdata.selectedFiles = Array.from(e.target.files);

        let messageAttachmentsListElement = WBOT$('#wbot-chat-container #wbot-message-attachments-list');
        messageAttachmentsListElement.querySelector('.wbot-content').innerHTML = WBOTdata.selectedFiles.map(file => `<u>${file.name}</u>`).join(',&nbsp;');
        messageAttachmentsListElement.classList.remove('wbot-hidden');

        WBOT$('#wbot-chat-container #wbot-cancel-attach-file').classList.remove('wbot-hidden');

        WBOT$('#wbot-chat-container #wbot-attach-file').classList.add('wbot-hidden');
        WBOT$('#wbot-chat-container #wbot-message-input').classList.add('wbot-hidden');

        WBOT$('#wbot-chat-container #wbot-chat #wbot-footer').classList.add('attachments-listed');
     };

    filesInput.click();
}
 
function WBOTcancelAttachFile() {
    WBOTdata.selectedFiles = null;

    WBOT$('#wbot-chat-container #wbot-message-attachments-list').classList.add('wbot-hidden');
    WBOT$('#wbot-chat-container #wbot-cancel-attach-file').classList.add('wbot-hidden');

    WBOT$('#wbot-chat-container #wbot-attach-file').classList.remove('wbot-hidden');
    WBOT$('#wbot-chat-container #wbot-message-input').classList.remove('wbot-hidden');

    WBOT$('#wbot-chat-container #wbot-chat #wbot-footer').classList.remove('attachments-listed');

    WBOTfocusMessageInput();
}

function WBOTmessageInputOnFocusOut(event) {
    if (!event.target.innerText.trim().length)
        event.target.innerHTML = '';
    else
        WBOTdata.text = event.target.innerText;
}

function WBOTmessageInputOnKeyDown(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault();

        WBOTdata.text = event.target.innerText;

        WBOTsendMessage();
    }
}

function WBOTclearText() {
    WBOTdata.text = null;
    WBOTdata.label = null;
    
    WBOT$('#wbot-chat-container #wbot-message-input').innerHTML = '';

    WBOTfocusMessageInput();
}

function WBOTfocusMessageInput() {
    if (!WBOTisMobile())
        WBOT$('#wbot-chat-container #wbot-message-input').focus();
}

function WBOTisMobile() {
    return window.innerWidth < 480;
}

function WBOTonSendingMessages() {
    return new Promise(resolve => {
        ++WBOTdata.messagesBeingSentCount;

        if (!WBOT$('#wbot-chat-container #wbot-waiting-response')) {
            WBOT$("#wbot-chat-container #wbot-chat #wbot-main").insertAdjacentHTML('beforeend', '<div id="wbot-waiting-response" class="wbot-message wbot-in"><div class="wbot-content wbot-text"><span><img src="https://wbot.chat/images/waiting-response-animation.svg"></img></span></div></div>');
            
            WBOTscrollChatMain();
        }

        if (!WBOTdata.timeStartedSendingMessages) {
            WBOTdata.timeStartedSendingMessages = new Date().getTime();

            setTimeout(() => {
                const waitingResponseElement = WBOT$('#wbot-chat-container #wbot-waiting-response');

                if (waitingResponseElement)
                    waitingResponseElement.parentNode.removeChild(waitingResponseElement);

                resolve();
            }, 500 + Math.random() * 500);
        }
    });
}

function WBOTonMessagesSent() {
    --WBOTdata.messagesBeingSentCount;

    if (WBOTdata.messagesBeingSentCount == 0)
        WBOTdata.timeStartedSendingMessages = null;
}

function WBOTsendMessage() {
    if (WBOTdata.selectedFiles) {
        return Promise.all(WBOTdata.selectedFiles.map(selectedFile => {
                    const formData = new FormData();
                    formData.append('file', selectedFile);

                    const bearerToken = WBOTmd5(location.origin + selectedFile.name);
                
                    return fetch('https://lb-v2.mz-css.net', { method: 'POST', body: formData, headers: { 'Authorization': 'Bearer ' + bearerToken } })
                        .then(response => response.json())
                        .then(data => data.url)
                        .catch(console.log);
                }))
            .then(selectedFilesUrls => {
                    const messages = [];

                    for (let i = 0; i < selectedFilesUrls.length; ++i) {
                        let selectedFile = WBOTdata.selectedFiles[i];

                        let selectedFileType = '';

                        let selectedFileMimeTypePart = selectedFile.type.split('/')[0];

                        switch (selectedFileMimeTypePart) {
                            case 'image':
                            case 'video':
                            case 'audio':
                                selectedFileType = selectedFileMimeTypePart.toUpperCase();
                                break;
                            case 'application':
                                if (selectedFile.type === 'application/pdf') {
                                    selectedFileType = 'DOCUMENT';
                                    break;
                                }
                            default:
                                selectedFileType = 'FILE';
                                break;
                        }

                        messages.push({
                            file: { name: selectedFile.name, url: selectedFilesUrls[i] },
                            type: selectedFileType
                        });
                    }

                    return messages;
                })
            .then(messages =>  {
                WBOTaddNewMessagesToChat(messages, 'out');
                WBOTcancelAttachFile();

                return WBOTonSendingMessages()
                    .then(() => WBOTsendMessagesToApi(messages));
            })
            .then(WBOTonMessagesSent);
    } else if (WBOTdata.text) {
        const messages = [{ text: WBOTdata.text, label: WBOTdata.label, type: 'TEXT' }];

        WBOTaddNewMessagesToChat(messages, 'out');
        WBOTclearText();

        return WBOTonSendingMessages()
            .then(() => WBOTsendMessagesToApi(messages))
            .then(WBOTonMessagesSent);
    }
}

function WBOThtmlEscape(str) {
    if (!str) {
        return '';
    }

    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#wbot-39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br>');
}

function WBOTaddNewMessagesToChat(messages, direction, scrollToLastMessage) {
    messages.forEach((message, i) => {
        if (message.type == 'IMAGE' && messages[i + 1] && messages[i + 1].type == 'TEXT') {
            messages[i + 1].file = message.file;

            message.type = 'DELETED';
        }
    });

    messages.forEach(message => {
        let newMessageHtml = '';

        if (!message.direction) {
            message.direction = direction;
        }

        switch (message.type) {
            case 'TEXT':
                newMessageHtml = `
                    <div class="wbot-message wbot-${message.direction}">
                        <div class="wbot-content wbot-text">
                            ${message.file ? '<div class="wbot-image"><a onclick="WBOTopenImage()" href="#"><img src="' + message.file.url + '" onload="WBOTscrollChatMain()"></a></div>' : ''}
                            <p>${(message.label || WBOThtmlEscape(message.text)).replace(/(https?:\/\/[\w\.:%\+~#=\-\?\/&]+)/g, '<a href="$1" target="_blank">$1</a>') + ''}</p>
                            <div class="wbot-menu">
                                ${message.menuItems && message.menuItems.length > 0 ? message.menuItems.map(menuItem => '<button title="' + menuItem.label.replace(/\<.+?\>/g, '').replace(/"/g, '\\"') + '" onclick="WBOTonMessageClickableClick(\'' + [menuItem.option, menuItem.label.replace(/'/g, "\\'")].join("','") + '\')"><div>' + menuItem.label + '</div></button>').join('') : ''}                                
                                ${message.quickResponses && message.quickResponses.length > 0 ? '<div class="wbot-quick-replies">' + message.quickResponses.map(quickResponse => '<button title="' + quickResponse.label.replace(/\<.+?\>/g, '') + '" onclick=\'WBOTonMessageClickableClick("' + [quickResponse.option, quickResponse.label.replace(/"/g, '\\"')].join('","') + '")\'><div>' + quickResponse.label + '</div></button>').join('') + '</div>' : ''}
                            </div>
                        </div>
                    </div>`;
                break;
            case 'IMAGE':
                newMessageHtml = `<div class="wbot-message wbot-${message.direction}"><div class="wbot-content wbot-image"><a onclick="WBOTopenImage()"><img src="${message.file.url}" onload="WBOTscrollChatMain()"></a></div></div>`;
                break;
            case 'VIDEO':
                newMessageHtml = `<div class="wbot-message wbot-${message.direction}"><div class="wbot-content wbot-video"><video controls><source src="${message.file.url}" type="video/mp4" onload="WBOTscrollChatMain()"></video></div></div>`;
                break;
            case 'AUDIO':
                newMessageHtml = `<div class="wbot-message wbot-${message.direction}"><div class="wbot-content wbot-audio"><audio controls><source src="${message.file.url}" type="audio/mpeg"></audio></div></div>`;
                break;
            case 'DOCUMENT':
            case 'FILE':
                newMessageHtml = `<div class="wbot-message wbot-${message.direction}"><div class="wbot-content wbot-file"><a onclick="window.open('${message.file.url}', '_blank', 'location=no,enableviewportscale=yes')">${message.file.name}</a></div></div>`;
                break;
            default:
                break;
        }

        if (newMessageHtml.length)
            WBOT$("#wbot-chat-container #wbot-chat #wbot-main").insertAdjacentHTML('beforeend', newMessageHtml);
    });

    if (messages.length > 0)
        WBOTscrollChatMain(scrollToLastMessage);
}

function WBOTonMessageClickableClick(option, label) {
    if (WBOTdata.selectedFiles)
        WBOTcancelAttachFile();

    WBOTdata.text = option;
    WBOTdata.label = label;

    WBOTsendMessage();
}

function WBOTscrollChatMain(toLastMessage) {
    try {
        //TO-DO: optimise
        Array.from(document.querySelectorAll('#wbot-chat-container ' + toLastMessage ? '.wbot-message:not(.wbot-hidden)' : '.wbot-message.wbot-out')).pop()
            .scrollIntoView();
    } catch (e) {}
}

function WBOTopenImage() {
    let modalElement = WBOT$('#wbot-chat-container #wbot-modal-image');

    modalElement.querySelector('img').src = event.target.getAttribute("src");
    modalElement.classList.add('wbot-show');
}

function WBOTcloseModalImage() {
    WBOT$('#wbot-chat-container #wbot-modal-image').classList.remove('wbot-show');
}

function WBOTupdateHeader(attendance) {
    const avatarElement = WBOT$('#wbot-chat-container #wbot-chat #wbot-header .wbot-avatar');
    const attendantElement = WBOT$('#wbot-chat-container #wbot-chat #wbot-header .wbot-info .wbot-attendant');
    
    if (attendance.id) {
        if (attendance.imagemAtendente)
            avatarElement.style.backgroundImage = `url('${attendance.imagemAtendente}')`;

        attendantElement.innerText = attendance.nomeAtendente;
    } else {
        avatarElement.style.removeProperty('background');
        attendantElement.innerHTML =  '';
    }
}

function WBOT$(selector) {
    return document.querySelector(selector);
}

function WBOTgetSessionId() {
    let sessionId = localStorage.getItem("wbot.chat-sessionid");

    if (!sessionId) {
        sessionId = Math.random().toString(36).substr(2);
        localStorage.setItem("wbot.chat-sessionid", sessionId);
    } else {
        WBOTdata.isFirstAccess = false;
    }

    return sessionId;
}

function WBOTsendMessagesToApi(messages) {    
    let token = localStorage.getItem("ngStorage-token");
    let headers = {}

    if (token) {
        headers = {                    
            'WBot-Authorization': token
        }
    }
    
    return fetch(`${WBOTdata.api}/api/botSites/${WBOTdata.token}/${WBOTdata.sessionId}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(messages.map(WBOTprepareMessageToApi).filter(message => message))
            })
        .then(response => response.ok ? response.json() : [])
        .then(messages => messages.map(WBOTprepareMessageToChat))
        .then(preparedMessages => WBOTaddNewMessagesToChat(preparedMessages, 'in'));
}

function WBOTgetLastMessagesFromApi() {
    return fetch(`${WBOTdata.api}/api/botSites/${WBOTdata.token}/${WBOTdata.sessionId}/messages`)
        .then(response => response.ok ? response.json() : [])
        .then(messages => messages.map(WBOTprepareMessageToChat))
        .then(preparedMessages => WBOTaddNewMessagesToChat(preparedMessages, null, true))
        .catch(() => {});
}

function WBOTgetPendingMessagesFromApi() {
    return fetch(`${WBOTdata.api}/api/botSites/${WBOTdata.token}/${WBOTdata.sessionId}/queue`)
        .then(response => response.ok ? response.json() : [])
        .then(messages => messages.map(WBOTprepareMessageToChat))
        .then(preparedMessages => WBOTaddNewMessagesToChat(preparedMessages, 'in', true));
}

function WBOTverifyActiveAttendanceFromApi() {
    return fetch(`${WBOTdata.api}/api/botSites/${WBOTdata.token}/${WBOTdata.sessionId}/attendance`)
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(attendance => {
            if (!attendance.id) {
                clearInterval(WBOTgetPendingMessagesFromApiInterval);
                WBOTgetPendingMessagesFromApiInterval = null;

                WBOTgetPendingMessagesFromApi();
            } else if (!WBOTgetPendingMessagesFromApiInterval)
                WBOTgetPendingMessagesFromApiInterval = setInterval(WBOTgetPendingMessagesFromApi, 1000 * 2);

            WBOTupdateHeader(attendance);
            
            return attendance;
        })
	.catch(() => {});
}

function WBOTprepareMessageToApi(message) {
    let apiMessageType = null;

    switch (message.type) {
        case 'IMAGE':
            apiMessageType = 'IMAGEM';
            break;
        case 'DOCUMENT':
            apiMessageType = 'DOCUMENTO';
            break;
        case 'TEXT':
            apiMessageType = 'TEXTO';
            break;
        case 'FILE':
            apiMessageType = 'ARQUIVO';
            break;
        default:
            apiMessageType = message.type;
            break;
    }

    if (!apiMessageType)
        return null;

    return { tipo: apiMessageType, [message.file ? "url" : "mensagem"]: message.file ? message.file.url : message.text };
}

function WBOTprepareMessageToChat(message) {
    let chatMessageType = null;

    if(message.categoria == 'INFO'){
        return {}
    }

    switch (message.tipo) {
        case 'TEXTO':
            chatMessageType = 'TEXT';
            break;
        case 'IMAGEM':
            chatMessageType = 'IMAGE';
            break;
        case 'VIDEO':
            chatMessageType = 'VIDEO';
            break;
        case 'AUDIO':
            chatMessageType = 'AUDIO';
            break;
        case 'DOCUMENTO':
            chatMessageType = 'DOCUMENT';
            break;
        case 'ARQUIVO':
            chatMessageType = 'FILE';
            break;
    }

    const preparedMessage = { type: chatMessageType };

    if (chatMessageType == 'TEXT') {
        let textDocument = new DOMParser().parseFromString(message.mensagem, 'text/html');
        
        let textDocumentBodyClone = textDocument.body.cloneNode(true);
        let textDocumentBodyCloneChildNodes = Array.from(textDocumentBodyClone.childNodes);

        let textDocumentBodyCloneFirstButtonIndex = textDocumentBodyCloneChildNodes.findIndex(childNode => childNode.nodeName == 'BUTTON');

        for (let i = textDocumentBodyCloneFirstButtonIndex; i >= 0 && i < textDocumentBodyCloneChildNodes.length; ++i)
            textDocumentBodyCloneChildNodes[i].remove();

        for (let i = Math.min(textDocumentBodyCloneFirstButtonIndex, textDocumentBodyCloneChildNodes.length) - 1; i >= 0 && textDocumentBodyCloneChildNodes[i].nodeName == 'BR'; --i)
            textDocumentBodyCloneChildNodes[i].remove();

        preparedMessage.label = textDocumentBodyClone.innerHTML;

        preparedMessage.menuItems = Array.from(textDocument.body
            .querySelectorAll('button:not(.m-t-15):not(.inline)'))
            .map(menuButton =>
                ({
                    option: menuButton.getAttribute('text'),
                    label: menuButton.innerHTML
                })
            );
        
        preparedMessage.quickResponses = Array.from(textDocument.body
            .querySelectorAll('button.m-t-15,button.inline'))
            .map(quickResponseButton => 
                ({
                    option: quickResponseButton.getAttribute('text'),
                    label: quickResponseButton.textContent
                })
            );

        preparedMessage.direction = message.direction;
    } else {
        if (message.file_url)
            message.url = message.file_url;

        preparedMessage.file = { url: message.url, name: message.url.substring(message.url.lastIndexOf('/') + 1) };
        preparedMessage.direction = message.direction;
    }

    return preparedMessage;
}
