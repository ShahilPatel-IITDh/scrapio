!function(){const e=e=>{var t;return null!==(t=e?.parentNode?.dataset?.sidebarId)&&void 0!==t?t:"gutenberg-block"},t=()=>{document.querySelectorAll(".wp-block-ione-newsletter-sign-up").forEach((t=>{(e=>{const t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)})(t)&&"yes"!==t.dataset.noticed&&(t.dataset.noticed="yes","function"==typeof window?.ione3?.sendGAEvent&&window.ione3.sendGAEvent("newsletter-signup","view",e(t)))}))};var n;window.addEventListener("scroll",t),window.addEventListener("DOMContentLoaded",t),(n=jQuery)(".sailthru-add-subscriber-form").on("submit",(function(){const t=n(this),o=t.get(0).closest(".wp-block-ione-newsletter-sign-up"),i=t.find('button[type="submit"]');n(i).html("Please wait...");const s=(t,d)=>{if("User Subscribed"===d.responseJSON.message){const t=o.querySelector(".success");t.removeAttribute("hidden"),t.style.height="82px",o.querySelector(".wp-block-ione-newsletter-sign-up__privacy").remove(),"function"==typeof window?.ione3?.sendGAEvent&&window.ione3.sendGAEvent("newsletter-signup","submit",e(o))}else n(i).html("Subscribe");n(document).off("ajaxComplete",s)};n(document).on("ajaxComplete",s)}))}();