
        window.REBELMOUSE_ACTIVE_TASKS_QUEUE.push(function bootRpm(){
            const INTERNAL_CLASS_PREFIXES = ["tag-", "post-section-", "rm-fl-"];

            function filterOutNoisyClassNames(className) {
                function doesClassNameStartWithPrefix(badPrefix) {
                    return className.indexOf(badPrefix) === 0;
                }
            
                return !INTERNAL_CLASS_PREFIXES.some(doesClassNameStartWithPrefix);
            }
            
            function signatureMaker(id, tagName, classList) {
                const cleanClassList = classList.filter(filterOutNoisyClassNames).sort();
                return [id, tagName, cleanClassList];
            }
            
            window.__rpmOptions = {
                lcpTrackerOptions: {
                signatureMaker: signatureMaker,
                },
            };
            
            
            window.REBELMOUSE_STDLIB.loadExternalScript("https://www.rebelmouse.com/pharos/client/v1/mjs/web.mjs", function(){})
        });

window.REBELMOUSE_ACTIVE_TASKS_QUEUE.push(function(){

    
        localStorage.setItem("userMembershipStatus", 'anonymous');
    

});

window.REBELMOUSE_ACTIVE_TASKS_QUEUE.push(function(){

    
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5WJB5X2');
    

});

window.REBELMOUSE_ACTIVE_TASKS_QUEUE.push(function(){

    
    window.REBELMOUSE_STDLIB.loadExternalScript("//app-ab24.marketo.com/js/forms2/js/forms2.min.js", function() {
        
    });
    

});

window.REBELMOUSE_ACTIVE_TASKS_QUEUE.push(function(){

    
    window.REBELMOUSE_STDLIB.loadExternalScript("https://s3.amazonaws.com/ieee-mkto-cross-domain/enterprise-page-code.js", function() {
        
    });
    

});

window.REBELMOUSE_ACTIVE_TASKS_QUEUE.push(function(){

    
        let favoritProBook = new FontFace("Favorit-Pro-Book", "url(https://partners.rebelmouse.com/IEEE/ABCFavoritProFullWeb/ABCFavoritPro-Book.woff2)", {
  style: 'normal'
});
favoritProBook.load().then(function() {
  document.fonts.add(favoritProBook);
});

let telegrafFont = new FontFace("Telegraf", "url(https://partners.rebelmouse.com/IEEE/Telegraf/Telegraf-UltraBold-800.otf)", {
  style: 'normal'
});
telegrafFont.load().then(function() {
  document.fonts.add(telegrafFont);
});
    

});

window.REBELMOUSE_ACTIVE_TASKS_QUEUE.push(function(){

    
        window.REBELMOUSE_STDLIB.createElementChangeListener("span.comment--item-date", function(dateElement){
  	
  	setTimeout(function(){
      	const datestring = dateElement.innerHTML.split(',');
  		dateElement.setAttribute('data-date', datestring[0] + datestring[1]);
  	}, 3000);
    
});
    

});

window.REBELMOUSE_ACTIVE_TASKS_QUEUE.push(function(){

    
        document.querySelector(".access_links .list__item").href = "https://www.ieee.org/profile/public/createwebaccount/showCreateAccount.html?ShowMGAMarkeatbilityOptIn=true&sourceCode=spectrum&signinurl=" + encodeURIComponent(window.location.origin + "/core/saml/main/login?next_url=" + window.location.origin + "/core/integrations/ieee/changes?redirect=" + window.location.href) + "&url=" + encodeURIComponent(window.location.origin + "/core/saml/main/login?next_url=" + window.location.origin + "/core/integrations/ieee/changes?redirect=" + window.location.href) + "&autoSignin=Y&car=IEEE-Spectrum";
    

});

window.REBELMOUSE_ACTIVE_TASKS_QUEUE.push(function(){

    
        function readCookie() {
  let cookieValue = document.cookie
  .split('; ')
  .find(row => row.startsWith('clicks='));
  console.log(typeof(cookieValue))
  if (cookieValue){
    cookieValue = cookieValue.split('=')[1];
  }
  return cookieValue ? Number(cookieValue) : null;
}

var count = readCookie() ? readCookie() : 0;

function setCookieCounter() {
  const titleLinks = Array.from(document.querySelectorAll('a'));
  const handler = function() {
    count += 1;
    console.log(count);
    document.cookie = `clicks=${count}`;
    setTimeout(checkCookieCounter, 3000);
  }
  titleLinks.map(item => item.addEventListener('click', handler));
}

function setCookie() {
  return readCookie() == null ? document.cookie = `clicks=${count}` : '';
}


function checkCookieCounter() {
  return readCookie() === 3 ? showLightBox() : '';
}


function showLightBox() {
  return document.querySelector('.lightbox-popup').classList.add('lightbox-popup--shown');
}

setCookie();
setCookieCounter();
setTimeout(checkCookieCounter, 1000);
    

});

window.REBELMOUSE_ACTIVE_TASKS_QUEUE.push(function(){

    
        window.REBELMOUSE_STDLIB.createElementChangeListener(".widget", (el) => {
      addPopSave();
});
    

});

window.REBELMOUSE_ACTIVE_TASKS_QUEUE.push(function(){

    
        var LightBoxLayout=document.querySelector('.lightbox-layout'), closeLightbox;

function closeLightbox(){
    var LightBoxElement=document.querySelector('.lightbox');
    LightBoxElement.classList.remove('lightbox--shown');
    LightBoxElement.classList.remove('lightbox');
    LightBoxLayout.classList.remove('lightbox--shown');
    document.body.classList.remove("fixed_scrolling");
}

function checkLightboxForPost(item){
  	let theIds = item.querySelector(".custom-field-lightbox-img-shortcode-ids");
  	let lightboxImages = JSON.parse(theIds.innerText);
    let postLightbox = lightboxImages["imageShortcodeIds"];
  
    for (var i=0; i<postLightbox.length; i++) {
    	let theImgs = item.querySelectorAll("img"), getImg, theImage;

        for (var y=0; y<theImgs.length; y++) {
        	if(theImgs[y].getAttribute('data-runner-src') != null){
            	getImg = theImgs[y].getAttribute('data-runner-src');
            }else{
            	getImg = theImgs[y].src;
        	}
            if(getImg.indexOf(postLightbox[i]) != -1){
              	if(theImgs[y].parentElement.classList.contains("share-tab-img")){
                	theImage = theImgs[y].parentElement.parentElement;
                }else{
                	theImage = theImgs[y].parentElement;
                }
              	theImage.classList.add("lightbox_icon");
              	theImage.classList.add("lightbox_"+i);

              	theImage.addEventListener("click", function(event) {
                	this.classList.add('lightbox--shown');
                	this.classList.add('lightbox');
                	LightBoxLayout.classList.add('lightbox--shown');
                	document.body.classList.add("fixed_scrolling");
              	});
        	}
    	}
	}
}

window.REBELMOUSE_STDLIB.createElementChangeListener(".widget", (el) => {
      let theIds = el.querySelector(".custom-field-lightbox-img-shortcode-ids");
  	  if(theIds){
        
        let lightboxImages = JSON.parse(theIds.innerText);
        let postLightbox = lightboxImages["imageShortcodeIds"];
        let foundAll = postLightbox.length;

      	for (var i=0; i<postLightbox.length; i++) {
        	let theImgs = el.querySelectorAll("img"), getImg, theImage;

          	for (var y=0; y<theImgs.length; y++) {
              if(theImgs[y].getAttribute('data-runner-src') != null){
              	getImg = theImgs[y].getAttribute('data-runner-src');
              }else{
              	getImg = theImgs[y].src;
              }
              if(getImg.indexOf(postLightbox[i]) != -1){
                if(theImgs[y].parentElement.classList.contains("share-tab-img")){
                	theImage = theImgs[y].parentElement.parentElement;
                }else{
                	theImage = theImgs[y].parentElement;
                }
                foundAll = foundAll - 1;
              	theImage.classList.add("lightbox_icon");
              	theImage.classList.add("lightbox_"+i);

              	theImage.addEventListener("click", function(event) {
                	this.classList.add('lightbox--shown');
                	this.classList.add('lightbox');
                	LightBoxLayout.classList.add('lightbox--shown');
                	document.body.classList.add("fixed_scrolling");
              	});
              }
        	}
		}
        
        if(foundAll != 0){
          	el.querySelector(".widget__show-more").addEventListener("click", function(event) {
             	checkLightboxForPost(this.parentElement.parentElement.parentElement);
            });
        }
      }
});

document.querySelector('.lightbox__close').onclick= closeLightbox;

document.addEventListener("keyup", function(event) {
  // Number 27 is the "esc" key on the keyboard
  if (event.keyCode === 27) {
    closeLightbox();
  }
});
    

});