(window.webpackJsonp_wd_s=window.webpackJsonp_wd_s||[]).push([[6],{3:function(e,t,n){}}]),function(e){function t(t){for(var o,i,s=t[0],c=t[1],d=t[2],u=0,m=[];u<s.length;u++)i=s[u],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&m.push(r[i][0]),r[i]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);for(l&&l(t);m.length;)m.shift()();return a.push.apply(a,d||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,s=1;s<n.length;s++){var c=n[s];0!==r[c]&&(o=!1)}o&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},r={5:0},a=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var s=window.webpackJsonp_wd_s=window.webpackJsonp_wd_s||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var d=0;d<s.length;d++)t(s[d]);var l=c;a.push([29,6]),n()}([,function(e,t){e.exports=window.wp.i18n},,,function(e,t,n){},function(e,t,n){},function(e,t){document.body.className=document.body.className.replace("no-js","js")},function(e,t){function n(){document.body.classList.add("ready")}"complete"!==document.readyState&&"loading"===document.readyState||document.documentElement.doScroll?document.addEventListener("DOMContentLoaded",n):n()},function(e,t){function n(){var e=document.querySelectorAll(".accordion-item"),t=document.querySelectorAll(".accordion-item-content");function n(e){t.forEach((function(t){var n=e.target.parentNode.closest(".accordion-item-header");t.previousElementSibling===n?"false"===t.getAttribute("aria-hidden")?(t.setAttribute("aria-hidden","true"),t.parentElement.classList.remove("open")):(t.setAttribute("aria-hidden","false"),t.parentElement.classList.add("open")):(t.setAttribute("aria-hidden","true"),t.parentElement.classList.remove("open"))}))}e.forEach((function(e){e.querySelector(".accordion-item-header").addEventListener("click",n)})),function(){if(!window.location.hash)return!1;document.querySelector(window.location.hash).previousElementSibling.querySelector(".accordion-item-toggle").click()}()}window.acf&&window.acf.addAction("render_block_preview/type=wds-accordion",n),n()},function(e,t){function n(){function e(e){e.preventDefault();var n=e.target.parentNode.closest(".menu-item-has-children"),o=n.querySelector("ul.sub-menu");!function(e){t(e).forEach((function(e){e.classList.remove("is-visible"),e.querySelector(".parent-indicator")&&e.querySelector(".parent-indicator").setAttribute("aria-expanded",!1),e.querySelector(".sub-menu")&&e.querySelector(".sub-menu").classList.remove("is-visible","animated","slideInLeft")}))}(n),function(e,t){e.classList.contains("is-visible")?function(e,t){e.classList.remove("is-visible"),e.querySelector(".parent-indicator").setAttribute("aria-expanded",!1),t.classList.remove("is-visible","animated","slideInLeft")}(e,t):(e.classList.add("is-visible"),e.querySelector(".parent-indicator").setAttribute("aria-expanded",!0),t.classList.add("is-visible","animated","slideInLeft"))}(n,o)}document.querySelectorAll(".mobile-menu li.menu-item-has-children, .utility-navigation li.menu-item-has-children").forEach((function(t){t.querySelector("a").innerHTML+='<button type="button" aria-expanded="false" class="parent-indicator caret-down" aria-label="Open submenu"><span class="down-arrow"></span></button>',document.querySelectorAll(".parent-indicator").forEach((function(t){t.addEventListener("click",e)}))}));var t=function(e){for(var t=[],n=e.parentNode.firstChild;n;)1===n.nodeType&&n!==e&&t.push(n),n=n.nextSibling;return t}}"complete"!==document.readyState&&"loading"===document.readyState||document.documentElement.doScroll?document.addEventListener("DOMContentLoaded",n):n()},function(e,t){function n(){var e=document.querySelectorAll(".modal-trigger"),t=document.querySelectorAll(".modal .close"),n=document.body;function o(e){var t=e.target.getAttribute("data-target"),o=document.querySelector(t),r=o.querySelectorAll("a, input, button");n.classList.add("modal-open"),o.classList.add("modal-open"),o.setAttribute("aria-hidden",!1),0<r.length&&r[0].focus()}function r(e){var t=e.target.getAttribute("data-target"),o=document.querySelector(t);n.classList.remove("modal-open"),o.classList.remove("modal-open"),o.setAttribute("aria-hidden",!0)}e.forEach((function(e){e.addEventListener("click",o)})),t.forEach((function(e){e.addEventListener("click",r)})),n.addEventListener("keydown",(function(e){if(n.classList.contains("modal-open")){var t=document.querySelector(".modal.modal-open"),o=t.querySelector("iframe");if(27===e.keyCode&&(t.setAttribute("aria-hidden",!0),t.classList.remove("modal-open"),n.classList.remove("modal-open"),o)){var r=o.getAttribute("src");o.setAttribute("src",""),o.setAttribute("src",r)}}})),n.addEventListener("mousedown",(function(e){var t=e.target;if(n.classList.contains("modal-open")&&t.classList.contains("modal-open")){var o=t.querySelector("iframe");if(n.classList.remove("modal-open"),t.classList.remove("modal-open"),t.setAttribute("aria-hidden",!0),o){var r=o.getAttribute("src");o.setAttribute("src",""),o.setAttribute("src",r)}}}))}"complete"!==document.readyState&&"loading"===document.readyState||document.documentElement.doScroll?document.addEventListener("DOMContentLoaded",n):n()},function(e,t){function n(){var e=document.querySelector(".off-canvas-screen");if(e){var t=document.querySelector(".off-canvas-container"),n=document.querySelector(".off-canvas-open");n.addEventListener("click",(function(){"true"===n.getAttribute("aria-expanded")?o():(t.classList.add("is-visible"),n.classList.add("is-visible"),e.classList.add("is-visible"),t.setAttribute("aria-hidden",!1),n.setAttribute("aria-expanded",!0))})),e.addEventListener("click",o),document.body.addEventListener("keydown",(function(e){27===e.keyCode&&o()}))}function o(){t.classList.remove("is-visible"),n.classList.remove("is-visible"),e.classList.remove("is-visible"),t.setAttribute("aria-hidden",!0),n.setAttribute("aria-expanded",!1)}}"complete"!==document.readyState&&"loading"===document.readyState||document.documentElement.doScroll?document.addEventListener("DOMContentLoaded",n):n()},function(e,t){var n,o,r;n=-1<navigator.userAgent.toLowerCase().indexOf("webkit"),o=-1<navigator.userAgent.toLowerCase().indexOf("opera"),r=-1<navigator.userAgent.toLowerCase().indexOf("msie"),(n||o||r)&&document.getElementById&&window.addEventListener&&window.addEventListener("hashchange",(function(){var e=location.hash.substring(1);if(/^[A-z0-9_-]+$/.test(e)){var t=document.getElementById(e);t&&(/^(?:a|select|input|button|textarea)$/i.test(t.tagName)||(t.tabIndex=-1),t.focus())}}),!1)},function(e,t){document.querySelectorAll("table").forEach((function(e){var t=e.querySelectorAll("th");0!==t.length&&e.querySelectorAll("tbody tr").forEach((function(e){e.querySelectorAll("td").forEach((function(e,n){t[n].textContent&&e.setAttribute("data-label",t[n].textContent)}))}))}))},function(e,t){!function(){function e(e){var t=e.target.parentNode,n=t.querySelector(".video-background");t.classList.toggle("video-toggled"),t.classList.contains("video-toggled")?n.pause():n.play()}document.querySelectorAll(".video-toggle").forEach((function(t){t.addEventListener("click",e)}))}()},function(e,t){function n(){var e=document.querySelector(".secondary-search-form .search-close"),t=document.querySelector(".secondary-search-form .search-field"),n=document.querySelector(".secondary-search-form .search-clear"),o=document.body;function r(e){var n=document.querySelector(".secondary-search-form");n.classList.toggle("search-open"),t!==e.target||n.classList.contains("search-open")||n.classList.toggle("search-open"),n.classList.contains("search-open")&&t.focus(),""!==t.value?n.classList.add("has-value"):n.classList.remove("has-value")}!t||e||n||(t.addEventListener("click",r),n.addEventListener("click",r),e.addEventListener("click",(function(e){e&&e.preventDefault();var n=document.querySelector(".secondary-search-form");n.classList.remove("has-value"),n.classList.remove("search-open"),t.setAttribute("value",""),""!==t.value&&n.reset()})),o.addEventListener("load",(function(e){e&&e.preventDefault();var n=document.querySelector(".secondary-search-form");n.classList.remove("has-value"),t.setAttribute("value",""),""!==t.value&&n.reset()})),window.addEventListener("load",(function(){""!==document.querySelector(".secondary-search-form .search-field").value&&document.querySelector(".secondary-search-form").classList.add("has-value")})))}"complete"!==document.readyState&&"loading"===document.readyState||document.documentElement.doScroll?document.addEventListener("DOMContentLoaded",n):n()},function(e,t){function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function o(){var e="https://www.care.com",t=document.getElementById("caregiver-category"),o=document.getElementById("distance-dropdown"),r=document.getElementById("caregiver-search-form"),a=document.getElementById("zip-code"),i=document.getElementById("caregiver-category-items"),s=document.getElementById("distance-dropdown-items");function c(e,t){e.preventDefault(),e.stopPropagation(),"distance"===t?(i.classList.remove("shown"),s.classList.add("shown")):(s.classList.remove("shown"),i.classList.add("shown"))}function d(e){e.stopPropagation(),s.classList.contains("shown")?s.classList.remove("shown"):i.classList.contains("shown")&&i.classList.remove("shown"),document.removeEventListener("click",d)}function l(r,a){var i,s=r.target.dataset.value,c=function(e,t){var o="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!o){if(Array.isArray(e)||(o=function(e,t){if(e){if("string"==typeof e)return n(e,void 0);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?n(e,void 0):void 0}}(e))||t&&e&&"number"==typeof e.length){o&&(e=o);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,c=!1;return{s:function(){o=o.call(e)},n:function(){var e=o.next();return s=e.done,e},e:function(e){c=!0,i=e},f:function(){try{s||null==o.return||o.return()}finally{if(c)throw i}}}}(r.target.parentNode.children);try{for(c.s();!(i=c.n()).done;)i.value.classList.remove("selected")}catch(e){c.e(e)}finally{c.f()}if(r.target.classList.add("selected"),"distance"===a)s&&(o.value=s);else{t.value=s;var d=t.selectedIndex,l=t.value;u(t[d].dataset)&&(window.location.href="".concat(e,"/").concat(l.replace(/^\//,"")))}}function u(e){return e.isUrl&&!!parseInt(e.isUrl,10)}null==r||r.addEventListener("submit",(function(n){return function(n){n.preventDefault();var i=e,s={zipCode:"01776",milesFromZipCode:"10",_qs:1};r.classList.contains("visitor")||(i="".concat(e,"/visitor/captureSearchBar.do"),s={sitterService:"nanny",zipCode:"01776",milesFromZipCode:"10",urlParams:window.caregiver_search_params.url_params});var c=t.selectedIndex,d=t.value,l=null;if(t[c].dataset.isUrl&&u(t[c].dataset))r.reportValidity()&&(window.location.href="".concat(e,"/").concat(d.replace(/^\//,"")));else{t[c].dataset.key&&(delete s.sitterService,l=t[c].dataset.key,s[l]=d),r.classList.contains("visitor")&&(i="".concat(i,"/").concat(d)),s.zipCode=a.value?a.value:s.zipCode,s.milesFromZipCode=o.value?o.value:s.milesFromZipCode;var m=Object.keys(s).map((function(e){return"".concat(e,"=").concat(s[e])})).join("&");r.reportValidity()&&(window.location.href="".concat(i,"?").concat(m))}}(n)})),null==t||t.addEventListener("click",(function(e){return c(e,"caregiver")})),null==o||o.addEventListener("click",(function(e){return c(e,"distance")})),null==i||i.addEventListener("click",(function(e){return l(e,"caregiver")})),null==s||s.addEventListener("click",(function(e){return l(e,"distance")})),r&&document.addEventListener("click",(function(e){return d(e)})),null==t||t.addEventListener("mousedown",(function(e){return e.preventDefault()})),null==o||o.addEventListener("mousedown",(function(e){return e.preventDefault()}))}"complete"!==document.readyState&&"loading"===document.readyState||document.documentElement.doScroll?document.addEventListener("DOMContentLoaded",o):o()},function(e,t){function n(){var e=document.getElementById("user-menu-trigger"),t=document.getElementById("user-menu"),n=document.getElementById("user-menu-wrap"),o=document.getElementById("user-menu-close"),r=document.querySelectorAll(".heading-toggle > a, .heading-toggle > button"),a=document.getElementById("off-canvas-open"),i=document.querySelectorAll(".primary-nav .menu-parent"),s=document.querySelectorAll("[class^=child-menu-back]"),c=document.querySelector(".search-mobile");function d(o){t.style.outline="Enter"!==o.key?"none":"",t.classList.contains("shown")?("user-menu-trigger"===this.id&&this.parentElement.classList.remove("toggled"),t.tabIndex=-1,null==e||e.setAttribute("aria-expanded","false"),a.setAttribute("aria-expanded","false"),a.setAttribute("aria-label","Open Menu"),n.classList.contains("toggled")?setTimeout((function(){t.classList.remove("shown")}),200):t.classList.remove("shown"),l(o,!0),setTimeout((function(){t.style.display="none";var e=t.querySelectorAll(".menu-item-has-children");1!==e.length&&e.forEach((function(e){e.querySelector("a, button").classList.remove("toggled"),e.querySelector(".sub-menu").classList.remove("shown"),e.querySelector(".sub-menu").setAttribute("aria-expanded","false")}))}),700)):("user-menu-trigger"===this.id&&this.parentElement.classList.add("toggled"),t.style.display="block",t.tabIndex=0,t.focus(),null==e||e.setAttribute("aria-expanded","true"),a.setAttribute("aria-expanded","true"),a.setAttribute("aria-label","Close Menu"),setTimeout((function(){t.classList.add("shown")}),50))}function l(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.preventDefault(),t?(document.querySelectorAll(".child-menu-wrap").forEach((function(e){e.classList.remove("shown"),e.setAttribute("aria-expanded","false")})),n.classList.remove("toggled")):(e.target.parentElement.classList.remove("shown"),e.target.parentElement.setAttribute("aria-expanded","false"),n.classList.remove("toggled"))}null==e||e.addEventListener("click",d),null==e||e.addEventListener("keypress",d),a.addEventListener("click",d),a.addEventListener("keypress",d),null==c||c.addEventListener("click",d),o.addEventListener("click",d),o.addEventListener("keypress",d),r.forEach((function(e){t.classList.contains("expand-primary-nav")?function(e){var t=e.nextElementSibling;e.classList.add("toggled"),t.classList.add("shown"),t.setAttribute("aria-expanded","true")}(e):e.addEventListener("click",(function(e){!function(e){e.preventDefault();var t=e.target,n=e.target.parentElement.querySelector(".sub-menu");n.classList.contains("shown")?(e.target.classList.remove("toggled"),n.classList.remove("shown"),t.setAttribute("aria-expanded","false")):(e.target.classList.add("toggled"),n.classList.add("shown"),t.setAttribute("aria-expanded","true"))}(e)}))})),i.forEach((function(e){e.addEventListener("click",(function(e){!function(e){e.preventDefault();var t=e.target.parentElement.querySelector(".child-menu-wrap");t.classList.add("shown"),t.setAttribute("aria-expanded","true"),n.classList.add("toggled")}(e)}))})),s.forEach((function(e){e.addEventListener("click",(function(e){l(e)}))}))}"complete"!==document.readyState&&"loading"===document.readyState||document.documentElement.doScroll?document.addEventListener("DOMContentLoaded",n):n()},function(e,t){!function(){function e(e){for(var t=document.getElementsByClassName("tabcontent"),n=0;n<t.length;n++)t[n].classList.remove("active");for(var o,r,a=document.getElementsByClassName("tablinks"),i=0;i<a.length;i++)a[i].className=a[i].className.replace(" active","");o=this.id,r=window.location.protocol+"//"+window.location.host+window.location.pathname+"?t="+o,window.history.pushState({path:r},"",r),this.classList.add("active");for(var s=this.classList,c=0;c<t.length;c++)for(var d=0;d<s.length;d++)t[c].classList.contains(s[d])&&t[c].classList.add("active")}document.querySelectorAll(".tablinks").forEach((function(t){t.addEventListener("click",e)}))}()},function(e,t){function n(){var e=jQuery,t=e(".wp-block-careblocks-related-posts-layout .trending-post"),n=[];0<t.length&&e(t).each((function(){n.push(e(this).data("trending-post-id"))}));var o=e(".wp-block-careblocks-featured-post .post-content-inner");if(0<o.length&&n.push(o.data("featured-post-id")),0===n.length)return!1;var r=e(".wp-block-careblocks-related-posts-layout");e(r).each((function(){var t=e(this).find(".care-loadmore");if(0<t.length){var o={action:"test_loadmore",query:care_view_more_params.posts,page:"1",post_to_show:t.data("posts-to-show"),days_limit:t.data("days-limit"),order:t.data("order"),terms:t.data("terms"),order_by:t.data("order-by"),attributes:t.data("attributes"),page_id:t.data("page-id"),member_type:t.data("member-type"),exclude_posts:n.join(",")};e.ajax({url:care_view_more_params.ajaxurl,method:"POST",data:o,success:function(e){JSON.parse(e).have_posts||t.hide()}})}}))}document.addEventListener("care-successful-load-more",n),jQuery(document).ready((function(e){n(),e(".load-more-posts").on("click",(function(t){t.preventDefault();var n=e(this),o=e(this).text(),r=new URL(window.location.href).searchParams,a={action:"archive_loadmore",nonce:load_more_posts_params.nonce,query:load_more_posts_params.posts,page:load_more_posts_params.current_page,"max-pages":load_more_posts_params.max_page};r.has("filter_year")&&(a.query.filter_year=r.get("filter_year")),e.ajax({url:load_more_posts_params.ajaxurl,data:a,type:"POST",beforeSend:function(){n.text("Loading...")},success:function(t){t?(t=JSON.parse(t),n.text(o),load_more_posts_params.current_page++,e(".posts-loader").append(t.content).append((function(){var t=parseInt(load_more_posts_params.current_page,10)-2,n=parseInt(load_more_posts_params.posts_per_page,10),o=parseInt(t,10)*parseInt(n,10);e(".posts-loader").find("article > a").eq(o).get(0).focus({preventScroll:!0})})),parseInt(t.current_page,10)>=parseInt(t.max_page,10)&&n.hide()):n.hide()}})}))}))},function(e,t){window.searchSortFilters={},function(e,t,n){n.init=function(){n.cache(),n.meetsRequirements()&&n.bindEvents()},n.cache=function(){n.$c={window:t(e),body:t(document.body),sortFiltersWrap:t(".filters-sort-wrap"),filterItem:t(".filter-dropdown-item"),sortItem:t(".sort-dropdown-item"),filterCurrent:t(".filter-current"),dropdownTrigger:t(".sort-filter-dropdown-trigger"),dropDown:t(".sort-filter-dropdown")}},n.bindEvents=function(){n.$c.filterItem.on("click",n.applySortFilter),n.$c.sortItem.on("click",n.applySortFilter),n.$c.filterCurrent.on("click",n.deleteFilter),n.$c.dropdownTrigger.on("click",n.toggleDropdown)},n.meetsRequirements=function(){return n.$c.sortFiltersWrap.length},n.toggleDropdown=function(e){e.stopPropagation(),t(this).hasClass("search")?(t(".sort-filter-dropdown").removeClass("visible"),n.$c.body.off("click",n.toggleDropdown)):t(this).next().hasClass("visible")?t(this).next().removeClass("visible"):(t(this).next().addClass("visible"),t(this).next().find("li").first().find("button").focus(),n.$c.body.on("click",n.toggleDropdown))},n.deleteFilter=function(n){n.preventDefault();var o,r=t(this).data("filter"),a=new URL(e.location.href),i="",s=new URLSearchParams(a.search),c="";if(-1<s.get("filter").indexOf(",")){c=s.get("filter").split(",");for(var d=0;d<c.length;d++)r===c[d]&&c.splice(d,1);s.set("filter",c.toString())}else s.delete("filter");s.toString()&&(i="?"+s.toString()),o=e.location.href.split("?")[0],t(location).attr("href",o+i)},n.applySortFilter=function(n){n.preventDefault();var o,r=t(this).data("filter"),a=t(this).data("sort"),i=new URL(e.location.href),s="",c="",d=!1,l=new URLSearchParams(i.search),u=l.get("filter");if(u&&-1<u.indexOf(","))for(var m=l.get("filter").split(","),f=0;f<m.length;f++)r===m[f]&&(d=!0);else r===u&&(d=!0);r&&!d&&(l.get("filter")?l.set("filter","".concat(l.get("filter"),",").concat(r)):l.append("filter",r)),a&&(l.get("sort")?l.set("sort",a):l.append("sort",a)),l.toString()&&(c="?"+l.toString()),-1!==(o=(s=e.location.href.split("?")[0]).indexOf("page/"))&&(s=s.slice(0,o)),d||t(location).attr("href",s+c)},t(n.init)}(window,jQuery,window.searchSortFilters)},function(e,t){window.downloadContract={},function(e,t,n){n.init=function(){n.cache(),n.meetsRequirements()&&n.bindEvents()},n.cache=function(){n.$c={window:t(e),downloadContractBlock:t(".download-contract"),downloadContractForm:t("#download-form")}},n.bindEvents=function(){n.$c.downloadContractForm.on("submit",n.submitForm)},n.submitForm=function(o){o.preventDefault();var r=e.careContractDownload.route,a=n.createFormDataObject(t(this));n.ajaxRequest(a,r,"post")},n.ajaxRequest=function(o,r,a){Object.keys(o).forEach((function(e){return""===o[e]&&delete o[e]}));var i=o;i.token=e.careContractDownload.token,i=JSON.stringify(i),t.ajax({url:r,type:a,contentType:"application/json",data:i,dataType:"json",beforeSend:function(n){n.setRequestHeader("X-WP-Nonce",e.careContractDownload.token),t(".download-form-submit").attr("disabled",!0),t(".download-form-loading, .download-form-loading-spinner").removeClass("hidden").addClass("flex")}}).done((function(){t(".download-form-loading, .download-form-loading-spinner").addClass("hidden").removeClass("flex"),n.$c.downloadContractForm[0].reset(),document.querySelector(".modal .close").dispatchEvent(new Event("click")),e.open(n.$c.downloadContractForm.data("download"),"_blank"),t(".download-form-submit").attr("disabled",!1)})).fail((function(e){t(".download-form-loading, .download-form-loading-spinner").addClass("hidden").removeClass("flex"),t(".download-form-response-wrapper, .download-form-response-error .notice-title, .download-form-response-error .notice-default").removeClass("hidden").addClass("flex"),t(".download-form-response-error .notice-default").append(" ".concat(e.responseJSON.message,".")),t(".download-form-submit").attr("disabled",!1)}))},n.createFormDataObject=function(e){var n=e.serializeArray(),o={};return t.map(n,(function(e){"true"===e.value&&(e.value=!0),o[e.name]=e.value})),o},n.meetsRequirements=function(){return n.$c.downloadContractBlock.length},n.init()}(window,jQuery,window.downloadContract)},function(e,t){!function(){var e=document.querySelectorAll(".subhead-primary-nav .menu-item-dropdown");function t(e){o(e.target.parentNode,".menu-item-dropdown").forEach((function(e){e.classList.add("focus")}))}function n(e){o(e.target.parentNode,".menu-item-dropdown").forEach((function(e){e.classList.remove("focus")}))}document.addEventListener("DOMContentLoaded",(function(){e.forEach((function(e){e.addEventListener("focusin",t),e.addEventListener("focusout",n)}))}));var o=function(e,t){Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),n=t.length;0>=--n&&t.item(n)!==this;);return-1>n});for(var n=[];e&&e!==document;e=e.parentNode)t?e.matches(t)&&n.push(e):n.push(e);return n}}()},function(e,t){!function(){var e,t=document.querySelectorAll(".extended-menu-toggle");function n(){var e=document.getElementById(this.getAttribute("aria-controls")),t=!1;this.classList.toggle("open"),e.classList.toggle("open"),e.classList.contains("open")?(e.setAttribute("aria-hidden",!1),t=!0):(e.setAttribute("aria-hidden",!0),c()),this.classList.contains("mobile")&&(document.getElementById("user-menu-wrap").classList.toggle("toggled-extended-level-one"),e.querySelector(".extended-menu-tablist").classList.toggle("open")),l(t)}function o(){a(this)}function r(){this.closest(".toggled-extended-level-one").classList.add("toggled-extended-level-two"),a(this)}function a(e){if(e){var t=document.getElementById(e.getAttribute("aria-controls")),n=document.querySelectorAll(".extended-menu-tabpanel");document.querySelectorAll(".extended-menu-container .extended-menu-tab-button").forEach((function(e){e.setAttribute("aria-selected","false")})),n.forEach((function(e){e.classList.remove("open")})),e.setAttribute("aria-selected","true"),t.classList.add("open")}}function i(){var e=document.getElementById("user-menu-wrap"),t=document.getElementById(this.getAttribute("aria-controls"));e.classList.remove("toggled-extended-level-two"),t.classList.remove("open")}function s(){if(e=document.querySelectorAll(".extended-menu-desktop .extended-menu-tab-button"),t=!1,e.forEach((function(e){"true"===e.getAttribute("aria-selected")&&(t=!0)})),!t){var e,t,n=document.getElementById(this.getAttribute("aria-controls"));document.querySelectorAll(".extended-menu-tabpanel").forEach((function(e){e.classList.remove("open")})),n.classList.add("open")}}function c(){var e=document.querySelectorAll(".extended-menu-tabpanel.open"),t=document.querySelectorAll(".extended-menu-tab-button");e.forEach((function(e){e.classList.remove("open")})),t.forEach((function(e){e.setAttribute("aria-selected",!1)}))}function d(){var e,t,n;e=this.getAttribute("data-root"),t=this.getAttribute("data-label"),n=new CustomEvent("Extended_Menu_Interacted_Two",{detail:{rootMenu:e,anchorText:t}}),window.dispatchEvent(n)}function l(e){var t=new CustomEvent("Extended_Menu_Interacted_One",{detail:{isMenuOpen:e}});window.dispatchEvent(t)}t&&(t.forEach((function(e){e.addEventListener("click",n)})),document.addEventListener("click",(function(e){var t=document.getElementById("extended-menu-desktop"),n=document.querySelector(".extended-menu-toggle.desktop");t.contains(e.target)||n===e.target||t.classList.contains("open")&&(t.classList.remove("open"),n.classList.remove("open"),t.setAttribute("aria-hidden",!0),c(),l(!1))})),(e=document.querySelectorAll(".extended-menu-desktop .extended-menu-tab-button"))&&e.forEach((function(e){e.addEventListener("click",o),e.addEventListener("mouseover",s)})),function(){var e=document.querySelectorAll(".extended-menu-mobile .extended-menu-tab-button");if(e){var t=document.querySelectorAll(".extended-menu-mobile .child-menu-back-to-level-one"),o=document.querySelectorAll(".extended-menu-mobile .child-menu-back-to-main");e.forEach((function(e){e.addEventListener("click",r)})),t.forEach((function(e){e.addEventListener("click",i)})),o.forEach((function(e){e.addEventListener("click",n)}))}}(),document.querySelectorAll(".extended-menu-container .extended-menu-content a").forEach((function(e){e.addEventListener("click",d)})))}()},,,,,,function(e,t,n){"use strict";n.r(t),n(3),n(4),n(5),n(6),n(7),n(8),n(9),n(10),n(11),n(12),n(13),n(14),n(15),n(16),n(17),n(18),n(19),n(20);var o=n(1);function r(){window.landing_page_params.is_logged_in&&document.querySelectorAll(".wp-block-careblocks-newsletter").forEach((function(e){e.remove()}));var e=document.querySelectorAll(".wp-block-careblocks-newsletter");e&&e.forEach((function(e){!function(e){var t=e.querySelector("form");t&&t.addEventListener("submit",(function(e){e.preventDefault();var n=t.querySelector('input[name="email"]');!function(e,t){var n=t?t.value:"";if(n&&e&&function(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}(n)){var r=e.parentNode;if(!e.classList.contains("sending")){var i=e.querySelector(".loader")||document.createElement("div");i.classList.add("loader");var s=e.querySelector("button");i.innerHTML=s.dataset.loading,e.appendChild(i),e.classList.add("sending");var c={email:n,password:"Letmein1!",legallyEligible:!0,memberInclination:{SEEKER:"SEEKER",PROVIDER:"SITTER",ALL:"SEEKER"}[window.landing_page_params.member_type],serviceId:{children:"CHILDCARE",seniors:"SENIRCARE",pets:"PETCAREXX","house-home":"HOUSEKEEP"}[window.landing_page_params.vertical]};window.careAppApi.enroll.liteMinimal(c).then((function(t){var n=t.status;t.json().then((function(t){var s=r.querySelector(".feedback")||document.createElement("div");s.classList.add("feedback"),s.innerHTML=t.data&&t.data.enrollment.email+" has been added.",setTimeout((function(){201!==n&&a(r,e,i,s),400!==n&&404!==n&&500!==n||(s.innerHTML=Object(o.__)("Please enter a valid email.","care-blog"),a(r,e,i,s)),1310===t.statusCode&&(s.innerHTML=Object(o.__)("This email is already registered.","care-blog"),a(r,e,i,s)),(201===n||200===t.statusCode&&200===n)&&function(e,t,n,o){n.classList.add("success"),e.appendChild(n),t.parentNode.removeChild(t),o.parentNode.removeChild(o)}(r,e,s,i)}),250)}))})).catch((function(t){console.log("Fetch Error: ",t),e.classList.remove("sending"),i.parentNode.removeChild(i)}))}}}(e.target,n)}))}(e)}))}function a(e,t,n,o){o.classList.add("error"),e.appendChild(o),t.style.display="none",setTimeout((function(){t.classList.remove("sending"),t.style.display="",n.parentNode.removeChild(n),o.parentNode.removeChild(o)}),2500)}"complete"!==document.readyState&&"loading"===document.readyState||document.documentElement.doScroll?document.addEventListener("DOMContentLoaded",r):r(),n(21),n(22),n(23)}]);