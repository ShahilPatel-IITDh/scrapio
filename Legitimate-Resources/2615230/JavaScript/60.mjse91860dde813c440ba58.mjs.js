(window.webpackJsonpDelete=window.webpackJsonpDelete||[]).push([[60],{125:function(e,o,a){"use strict";a.d(o,"a",(function(){return i}));var l=a(423),n=a(2),t=a(61),d=a(35);const s=new l.a;s.init({autoCloseOnClickOutside:!1,onModalInit:e=>{n.b.init(e.element)},onModalDestroy:e=>{n.b.destroy(e.element)},onBeforeFirstModalOpen:()=>{t.a.lock("modal")},onAfterLastModalClose:()=>{t.a.unlock("modal")},defaultModalTemplate:({bemList:e,title:o})=>`\n        <div data-modal class="${Object(d.a)("modal",e)}" aria-hidden="true" role="dialog">\n            <div class="modal__head" data-modal-head>\n                ${o?`<div class="modal__title">${o}</div>`:""}\n                <button class="modal__close btn" data-modal-close type="button" aria-label="Close popup" role="button">\n                    <svg class="icon modal__close-icon modal__close-icon--cross" width="16" height="16" focusable="false">\n                        <use xlink:href="#icon-cross"/>\n                    </svg>\n                 </button>\n            </div>\n            <div class="modal__wrapper" data-modal-wrapper>\n                <div class="modal__content" data-modal-content></div>\n            </div>\n\n        </div>\n        `});var i=s;Object.freeze({}),Object.freeze({OPEN:"modal:open",CLOSE:"modal:close"})}}]);