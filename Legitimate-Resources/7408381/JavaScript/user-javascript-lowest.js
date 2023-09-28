

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
        window.RM_AD_LOADER.push({
  options: {
    threshold: 500,
  },
  staticSelectors: [],
  dynamicSelectors: [],
  dependencies: ["https://htlbid.com/v3/spectrum.ieee.org/rblbid.js"],
  onDependanciesLoaded: function () {
    window.rblbid = window.rblbid || {};
    rblbid.cmd = rblbid.cmd || [];
    rblbid.cmd.push(function() {
      rblbid.layout('universal');
      rblbid.setTargeting("is_testing","no");
      rblbid.setTargeting("is_home", "no");
      rblbid.setTargeting("ieee_post_id", window.postid);
      rblbid.setTargeting("ieee_category", window.category);
      rblbid.setTargeting("ieee_tags", window.tags);
    });
  },
  onInit: function() {
  },
});
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
        let floatingShares = document.querySelector('.floating-shares');
        
floatingShares.onclick = function() {
  if (navigator.share) { 
    navigator.share({
      url: window.location.href
    }).then(() => {
      console.log('Thanks for sharing!');
    }).catch(console.error);
  } else {
    alert("sharing "+ window.location.href);
  }
}
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
        let topbarHeadline = document.querySelector('.topbar__sticky-headline--post .text-element');
let windowHeight = window.innerHeight/2;

if(!!window.IntersectionObserver){
  let headlineObserver = new IntersectionObserver((entries) => { 
    entries.forEach(entry => {
      if(entry.isIntersecting){
        var currentHeadline = entry.target.querySelector('.widget__headline-text');
        
        if(currentHeadline) {
          topbarHeadline.textContent = currentHeadline.textContent;
        }
      }
    });
  }, {rootMargin: "0px 0px -" + windowHeight + "px 0px"});
  
  createElementChangeListener(".infinite_scroll .widget", (el) => {
    headlineObserver.observe(el)
  });
  createElementChangeListener(".article_column .widget", (el) => {
    headlineObserver.observe(el)
  });
  createElementChangeListener(".feature_post_full .widget", (el) => {
    headlineObserver.observe(el)
  });
}
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
        var popupLightBoxElement=document.querySelector('.lightbox-popup'),
    closeLightbox,
    lightboxCloseBtn = '.js--close-lightbox',
    lightboxShownClass = 'lightbox-popup--shown';

closeLightbox = function () {
  popupLightBoxElement.parentNode.removeChild(popupLightBoxElement);
};

document.querySelector(lightboxCloseBtn).onclick= closeLightbox;

function setCookie() {
  var now = new Date();
  now.setTime(now.getTime() + 72 * 3600 * 1000);
  var expires = "pop_expires="+now;
  document.cookie = expires + ";path=/";
}

function checkCookie() {
  var today = new Date();
  var cookieset = document.cookie.split(';');
  var value_expires = "";
  cookieset.forEach((e) => {
    if(e.includes("pop_expires")) {
      value_expires = e;
    }
  })

  var time_expire = new Date(value_expires.split("=")[1]);
  if(today <= time_expire){
    return false;
  }else{
    return true;
  } 
}

var checkPage = true;
if(window.location.href.indexOf("the-great-ai-reckoning") > -1) {
  //console.log("AI Special Report");
  checkPage = false;
}

function checkPopup(){
  if(checkCookie() && checkPage){
    setTimeout(function(){
      popupLightBoxElement.classList.add(lightboxShownClass);
      setCookie();	
      
      gtag('event', 'impression', {
  				'event_category': 'Pop Up',
  				'event_label': 'Third Click',
				});

      document.querySelectorAll(".popup_links.signin_button .list__item")[0].href = 
        "https://www.ieee.org/profile/public/createwebaccount/showCreateAccount.html?ShowMGAMarkeatbilityOptIn=true&sourceCode=spectrum&signinurl=" + encodeURIComponent(window.location.origin + "/core/saml/main/login?next_url=" + window.location.origin + "/core/integrations/ieee/changes?redirect=" + window.location.href) + "&url=" + encodeURIComponent(window.location.origin + "/core/saml/main/login?next_url=" + window.location.origin + "/core/integrations/ieee/changes?redirect=" + window.location.href) + "&autoSignin=Y&car=IEEE-Spectrum";
      
      	var signUpButton = document.querySelectorAll(".popup_links.signin_button .list__item")[0];
          signUpButton.addEventListener('click', function(){
          
          gtag('event', 'click', {
  				'event_category': 'Pop Up',
  				'event_label': 'Third Click',
				});
          })

      document.querySelectorAll(".popup_links.signin_button .list__item")[1].href =  "https://spectrum.ieee.org/core/saml/main/login?next_url=" + encodeURIComponent("https://spectrum.ieee.org/core/integrations/ieee/changes?redirect=" + window.location.href);

    }, 30000);
  }
}

/* Handler for GDPR -------------------------------------------------*/
if(localStorage.getItem("gdpr-cookie") != "accepted" && !localStorage.getItem("gdpr")){
  document.querySelector(".gdpr-cookie-accept").addEventListener("click", checkPopup);
}else{	
  //checkPopup();
}
console.log("Third click")
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
        function menuClick() {
  	document.getElementsByClassName('huge-menu')[0].style.display = 'block';
    document.getElementsByClassName('hambg-btn')[0].classList.add('js--active');
    document.body.classList.add("huge-menu-opened");
    document.body.classList.remove("menu-opened");
}

function close(){
	document.getElementsByClassName('huge-menu')[0].style.display = 'none';
    document.getElementsByClassName('hambg-btn')[0].classList.remove('js--active');
    document.body.classList.remove("huge-menu-opened");
    document.body.classList.remove("menu-opened");
}

function addMenuClickListener() {
  var rebelMenu_first = document.getElementsByClassName('rebelbar__menu-toggle')[0];
  var rebelMenu_second = document.getElementsByClassName('rebelbar__menu-toggle')[1];
  var menuClose = document.getElementsByClassName('hm__close')[0];

  rebelMenu_first.addEventListener('click', menuClick);
  rebelMenu_second.addEventListener('click', menuClick);
  menuClose.addEventListener('click', close);
}

addMenuClickListener();
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
        function createIdleScrollListener(callback) {
  let ticking = false;

  return function onScrollIdle() {
    if (ticking) {
      return;
    }
    ticking = true;
    requestAnimationFrame(function A() {
      callback();
      ticking = false;
    });
  };
}

var stickyEl = document.querySelector('.topbar-sticky');
var startPosition = stickyEl.offsetTop;
var darkTopbarHeight = document.querySelector('.topbar .dark_top_bar').offsetHeight;
var currentPosition;

stickyEl.style.height = stickyEl.offsetHeight + 'px';

document.addEventListener("scroll", createIdleScrollListener(function B() {
  currentPosition = stickyEl.getBoundingClientRect().top + darkTopbarHeight;
  
  if( currentPosition < startPosition ) { 
    if( !stickyEl.classList.contains('active') ) {
       stickyEl.classList.add('active'); 
    }
  } else { 
    if( stickyEl.classList.contains('active') ) {
       stickyEl.classList.remove('active');
    }
  }

}));
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
        document.querySelectorAll(".social-author__bio").forEach(function (item) {
  if(item.querySelector("a")){
    item.querySelector("a").remove();
  }
  var text = item.innerHTML;
  var dotSpace = text.indexOf(". ") === -1 ? text.length : text.indexOf(". ");
  var dotEnd = text.indexOf(".<") === -1 ? text.length : text.indexOf(".<");
  var dotBr = text.indexOf(".\n") === -1 ? text.length : text.indexOf(".\n");

  var firstDot = Math.min(dotSpace, dotEnd, dotBr);

  var newtext = text.substring(0, firstDot+1);
  item.innerHTML = newtext;
});
let authorsList = document.querySelectorAll(".post-author-list .social-author__name");
let authorsListBios = document.querySelectorAll(".post-author-list  .social-author__bio p");

for (let i = 0; i < authorsList.length; i++) {
  authorsListBios[i].innerHTML += ' <a href="'+ authorsList[i].href + '" target="_blank">See full bio &#8594;</a>';
}
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
        const lightboxesArray = Array.from(document.querySelectorAll('.lightbox_icon'))
const fullWidth = function(){
  const lightbox = this
  const windowWidth = window.innerWidth
  let imageSource = lightbox.querySelector('img').src
  const initialWidth = imageSource.match(/width=([^&]+)/)[1];
  const result = imageSource.replace(initialWidth, windowWidth);
  return lightbox.querySelector('img').setAttribute('src', `${result}`)
} 
lightboxesArray.map(lightbox => {
  lightbox.addEventListener('click', fullWidth)
})
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
        let scnt=1;
let options = { // threshhold for intersection observer, so it triggers before or after element in viewport dependinng upon value
  rootMargin: '0px 0px 400px 0px'
}

function handleIntersection(entries) {

  entries.map((entry) => {
    if (entry.isIntersecting) {
      if(!entry.target.classList.contains('sidebar_sticky_parent')){
        processAd(entry.target) //your call back here with the element that is intersected or in viewport
      }
      else {
        sidebar_ad_repeat(entry.target)
      }
      observer.unobserve(entry.target); // if you want to run it only once unobserve it 
    }
  });
}
window.IcreateElementChangeListener=function(selector, callback) { // look for elements that are injected later in the page.
  const initializedNodes = new Set([]);

  document.querySelectorAll(selector).forEach((node) => {
    callback(node);
    initializedNodes.add(node);
  });

  const mutationObserver = new MutationObserver(() => {
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((node) => {
      if (!initializedNodes.has(node)) {
        callback(node);
        initializedNodes.add(node);
      }
    });
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
const observer = new IntersectionObserver(handleIntersection,options); 
IcreateElementChangeListener(".sidebar_sticky_parent",function(item){ //looks for item in the dom even if they are lazy laoded
  observer.observe(item); // observe item
})

function sidebar_ad_repeat(sidebar_div){
  let ad_id="ieee_sidebar_"+scnt;
  rblbid.cmd.push(function() {
    sidebar_div.querySelector(".sidebar_repeat_ad").id=ad_id;
    sidebar_div.style.height="1800px";
    scnt++;

    sidebar_div.insertAdjacentHTML('afterend','<div class="sidebar_sticky_parent"><div class="stick_in_parent"><div class="sidebar_repeat_ad rblad-ieee_sidebar"></div></div></div>')
  });
}
    

});