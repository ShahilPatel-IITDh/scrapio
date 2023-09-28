// Accordeon

var controlPanels = function(accordion, event) {
    var target = event.target;
    
    if (target.classList.contains('stl_accordion-header')) {
        var isExpanded = target.getAttribute('aria-expanded') == 'true';
        var active = accordion.querySelector('[aria-expanded="true"]');

        if (!isExpanded) {
            target.setAttribute('aria-expanded', 'true');
            target.nextElementSibling.classList.add("stl_accordion-content-active");
            target.parentElement.classList.add("stl_accordion-item-active");
        } else {
            active.setAttribute('aria-expanded', 'false');
            active.parentElement.classList.remove("stl_accordion-item-active");
            active.nextElementSibling.classList.remove("stl_accordion-content-active");
        }
    }

}

document.addEventListener("DOMContentLoaded", function(event) {   
    
    Array.prototype.slice.call(document.querySelectorAll('.stl_accordion')).forEach(function (accordion) {
        
        accordion.addEventListener('click', function (event) {
            controlPanels(accordion, event);
        });
        
        accordion.addEventListener("keydown", function(event) {
            if (event.key == "Enter" || event.key == " ") {
                controlPanels(accordion, event);
                event.preventDefault();
            }
        });
    });
});

// Modal

function trapFocus(element) {
    var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    var firstFocusableEl = focusableEls[0];
    var lastFocusableEl = focusableEls[focusableEls.length - 1];

    element.addEventListener('keydown', function(e) {
        var isTabPressed = (e.key === 'Tab');

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) /* shift + tab */ {
            if (document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus();
                e.preventDefault();
            }
        } else /* tab */ {
            if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
            }
        }
    });

    // setTimeout(function() {
    //     focusableEls[1].focus();
        
        
    // }, 200);
}

function show(el) {
    console.log('show: ', el);
    el.classList.add("is-visible");
}

function hide(el) {
    el.classList.remove("is-visible");
}

function showOverLay(state) {
    var overlays = document.getElementsByClassName("stl_modal-mask");
    
    if(state == true) {
        for(var i = 0; i < overlays.length; i++){
            show(overlays[i]);
        }
    } else {
        for(var i = 0; i < overlays.length; i++){
            hide(overlays[i]);
        }
    }
}

function enableScroll() {
    var body = document.body;
    var scrollY = body.style.top;
    
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

function disableScroll() {
    var scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    var body = document.body;
    
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`; //Not a syntax error !! do not fix it
}

document.addEventListener("DOMContentLoaded", function(event) {
    var openEls = document.querySelectorAll("[data-open]");
    var closeEls = document.querySelectorAll("[data-close]");
    var isVisible = "is-visible";
    var oldFocus;

    //open modal
    for (var el of openEls) {
        el.addEventListener("click", function() {
            var modalId = this.dataset.open;
            document.getElementById(modalId).classList.add(isVisible);
            trapFocus(document.getElementById(modalId));
            oldFocus = document.querySelector('[data-open="'+ modalId +'"]');
            disableScroll();
            showOverLay(true);
        });
    }

    //close modal
    for (var el of closeEls) {
        el.addEventListener("click", function() {
            this.parentElement.parentElement.parentElement.classList.remove(isVisible);
            enableScroll();
            showOverLay(false);
        });
    }

    //click 'Escape' key
    document.addEventListener("keyup", function(e) {
        if (e.key == "Escape" && document.querySelector(".stl_modal-wrap.is-visible")) {
            document.querySelector(".stl_modal-wrap.is-visible").classList.remove(isVisible);
            oldFocus.focus();
            enableScroll();
            showOverLay(false);
        }
    });

    //click 'Enter' or 'Space' key
    document.addEventListener("keyup", function(e) {
        if ((e.key == "Enter" || e.key == " ") && document.querySelector(".stl_modal-wrap.is-visible")) {
            document.querySelector(".stl_modal-wrap.is-visible").classList.remove(isVisible);
            oldFocus.focus();
            enableScroll();
            showOverLay(false);
        }
    });
    
    window.addEventListener('scroll', function() {
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    });
});

// AutoTag
"use strict";!function(){class AutoPDM{constructor(sectionNode){this.rootEl=sectionNode,this.currentSection(this.rootEl)}currentSection(el){const _thisEl=el,listlink=Array.from(_thisEl.getElementsByTagName("a")),listbutton=Array.from(_thisEl.getElementsByTagName("button"));[...listlink,...listbutton].forEach(link=>{const _thisLink=link;_thisLink.hasAttribute("data-bouton")&&!_thisLink.getAttribute("onclick")?_thisLink.addEventListener("click",(function(e){let zone,sujet,bouton;if("#recette-pdm"===window.location.hash&&e.preventDefault(),_thisEl.hasAttribute("data-zone")?zone=replaceCarSpec(_thisEl.getAttribute("data-zone")):_thisEl.querySelector("[data-zone]")&&(zone=replaceCarSpec(returnValueAttribute(_thisEl.querySelector("[data-zone]"),"data-zone"))),_thisLink.querySelector("[data-sujet]"))_thisEl.querySelector("[data-parent]")?(_thisLink.parentNode.querySelector(".stl_title")!==_thisLink.querySelector(".stl_title")&&("stl_title"===_thisLink.parentNode.firstChild.nextSibling.classList[0]?sujet=replaceCarSpec(returnValueAttribute(_thisLink.parentNode.querySelector("[data-sujet]"),"data-sujet")):"stl_card"===_thisLink.parentNode.firstChild.nextSibling.classList[0]||(sujet=replaceCarSpec(returnValueAttribute(_thisLink.parentNode.querySelector("[data-sujet]"),"data-sujet")))),bouton=replaceCarSpec(returnValueAttribute(_thisLink.querySelector("[data-sujet]"),"data-sujet"))):(sujet=replaceCarSpec(returnValueAttribute(_thisLink.querySelector("[data-sujet]"),"data-sujet")),_thisLink.querySelector("span.stl_btn")?bouton=replaceCarSpec(_thisLink.querySelector("span.stl_btn").innerText):_thisLink.querySelector("span.stl_link")&&(bouton=replaceCarSpec(_thisLink.querySelector("span.stl_link").innerText)));else{if(0===_thisEl.querySelectorAll("a.stl_card").length&&_thisEl.querySelector("[data-sujet]"))if(_thisEl.querySelector("[data-parent]")){const elParent=detectParent(_thisLink);null!==elParent&&(sujet=replaceCarSpec(returnValueAttribute(elParent.querySelector(".stl_title"),"data-sujet")))}else sujet=replaceCarSpec(returnValueAttribute(_thisEl.querySelector("[data-sujet]"),"data-sujet"));bouton=replaceCarSpec(returnValueAttribute(_thisLink,"data-bouton"))}sendTracking(zone,sujet,bouton)})):_thisLink.hasAttribute("data-bouton")&&_thisLink.getAttribute("onclick")&&"#recette-pdm"===window.location.hash&&(_thisLink.style.cssText="border:2px dashed #ffc100; position:relative;",_thisLink.addEventListener("click",(function(e){e.stopPropagation()})))})}}const sendTracking=function(zone,sujet,bouton){let clickGlobal;const sectionRecette=document.querySelector(".showCode");clickGlobal=zone?sujet?"hero-banner"===zone?tc_vars.page_name+"::"+zone+"-"+sujet+"::clic-sur-"+bouton:tc_vars.page_name+"::"+zone+"::"+sujet+"::clic-sur-"+bouton:tc_vars.page_name+"::"+zone+"::clic-sur-"+bouton:tc_vars.page_name+"::"+sujet+"::clic-sur-"+bouton,sectionRecette&&(sectionRecette.innerHTML="",sectionRecette.innerHTML+="$page::"+tc_vars.page_name+"<br/>",zone&&(sectionRecette.innerHTML+="$zone::"+zone+"<br/>"),sujet&&(sectionRecette.innerHTML+="$sujet::"+sujet+"<br/>"),bouton&&(sectionRecette.innerHTML+="$bouton::clic-sur-"+bouton+"<br/>"),sectionRecette.innerHTML+="<br/>EVENTNAME : "+clickGlobal),bddfTms.trackEvent(this,"click",{event_name:clickGlobal})},returnValueAttribute=function(elt,attr){return elt.getAttribute(attr).length>0?elt.getAttribute(attr):elt.innerText},detectParent=function(link){for(let index=0;index<10;index++){const parent=getParentNode(link,index);if(parent.hasAttribute("data-parent"))return parent;if("stl_section"===parent.classList[0])return null}},getParentNode=function(element,level=1){for(;level-- >0;)if(!(element=element.parentNode))return null;return element},replaceCarSpec=function(str){const wordsArray=["-le-","-la-","-les-","-de-","-du-","-et-","-une-","-un-"],expStr=wordsArray.join("\\b|\\b");str=str.toLowerCase();const from="àáäâèéëêìíïîòóöôùúüûñç·/_,;",to="aaaaeeeeiiiioooouuuunc-----";for(let i=0,l=from.length;i<l;i++)str=str.replace(new RegExp(from.charAt(i),"gi"),to.charAt(i));return str=str.replace(/€+/gi,"euros").replace(/%+/gi,"pourcent").replace(/ *\([^)]*\) */gi,"").replace(/\.\.\./gi,"-").replace(/[^a-z0-9 -]/gi,"").replace(/^\s+|\s+$/gi,"").replace(/\s+/gi,"-").replace(/:+/gi,"").replace(/--+/gi,"-")},modeRecette=function(){if("#recette-pdm"===window.location.hash){const wrapper=document.createElement("section");wrapper.classList.add("showCode"),wrapper.style.cssText="display: flex; padding: 1rem; font-size: 14px; text-align: center; width: 100%; min-height: 0px; height: auto; background: white; position: fixed; bottom: 0px; left: 0px; z-index: 1000; box-shadow: rgba(0, 0, 0, 0.12) 8px -3px 9px 0px; font-weight: 600; justify-content: center; opacity: .95;",document.body.appendChild(wrapper)}};addEventListener("load",event=>{const sections=document.querySelectorAll(".stl_section");sections.forEach(elSection=>{new AutoPDM(elSection)}),modeRecette()})}();;