(window.webpackJsonpDelete=window.webpackJsonpDelete||[]).push([[63],{156:function(o,a,n){"use strict";n.d(a,"a",(function(){return i})),n(17);var e=n(506),t=n(2),l=n(88),d=n(57),c=new e.a;c.init({autoCloseOnClickOutside:!1,onModalInit:function(o){t.b.init(o.element)},onModalDestroy:function(o){t.b.destroy(o.element)},onBeforeFirstModalOpen:function(){l.a.lock("modal")},onAfterLastModalClose:function(){l.a.unlock("modal")},defaultModalTemplate:function(o){var a=o.bemList,n=o.title,e=Object(d.a)("modal",a);return'\n        <div data-modal class="'.concat(e,'" aria-hidden="true" role="dialog">\n            <div class="modal__head" data-modal-head>\n                ').concat(n?'<div class="modal__title">'.concat(n,"</div>"):"",'\n                <button class="modal__close btn" data-modal-close type="button" aria-label="Close popup" role="button">\n                    <svg class="icon modal__close-icon modal__close-icon--cross" width="16" height="16" focusable="false">\n                        <use xlink:href="#icon-cross"/>\n                    </svg>\n                 </button>\n            </div>\n            <div class="modal__wrapper" data-modal-wrapper>\n                <div class="modal__content" data-modal-content></div>\n            </div>\n\n        </div>\n        ')}});var i=c;n(118),Object.freeze({}),Object.freeze({OPEN:"modal:open",CLOSE:"modal:close"})}}]);