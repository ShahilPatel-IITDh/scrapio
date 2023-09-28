

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
    window.REBELMOUSE_STDLIB.loadExternalScript("//applets.ebxcdn.com/ebx.js", function() {
        
        var id="ebx"
        
    });
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
    window.REBELMOUSE_STDLIB.loadExternalScript("https://www.googletagmanager.com/gtag/js?id=UA-63502110-8", function() {
        
        //Global site tag (gtag.js) - Google Analytics
window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-63502110-8');
        
    });
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
        let scr = document.createElement("script");
    scr.src = "https://launcher.spot.im/spot/sp_8fvGl692";
    scr.async = true;
    scr.setAttribute("id", "spotim");
    scr.setAttribute("data-spotim-module", "spotim-launcher");
    scr.setAttribute("data-article-tags", "[&#39;biden administration&#39;, &#39;gop&#39;, &#39;joe biden&#39;, &#39;republican party&#39;, &#39;walmart&#39;, &#39;supply chain&#39;, &#39;john furner&#39;]");
    scr.setAttribute("data-post-id", "doug-mcmillon-biden-supply-chain");
    scr.setAttribute("data-post-url", "https://secondnexus.com/doug-mcmillon-biden-supply-chain");
          
    let holder = document.querySelector('div[data-spot-id="sp_8fvGl692"]');
    holder.insertAdjacentElement('afterend', scr);
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
    window.REBELMOUSE_STDLIB.loadExternalScript("https://recirculation.spot.im/spot/sp_8fvGl692", function() {
        
    });
    

});

window.REBELMOUSE_LOWEST_TASKS_QUEUE.push(function(){

    
        let options = { // threshhold for intersection observer, so it triggers before or after element in viewport dependinng upon value
  rootMargin: '0px 0px 0px 0px'
}
window.page_counter=0;
function handleIntersection(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      processAd(entry.target) //your call back here with the element that is intersected or in viewport
      observer.unobserve(entry.target); // if you want to run it only once unobserve it 
    }
  });
}
function createElementChangeListener(selector, callback) { // look for elements that are injected later in the page.
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
createElementChangeListener(".with-taboola-div .widget .body",function(item){ //looks for item in the dom even if they are lazy laoded
observer.observe(item); // observe item
})
function processAd(post_body) {
  var widget=post_body.closest('.widget')
  page_counter++;
  var ad_div=document.createElement('div');
  var taboola_container_id = 'taboola-below-article-' + page_counter;
  ad_div.id=taboola_container_id;
   widget.insertAdjacentElement('afterend',ad_div);
   window._taboola = window._taboola || [];
_taboola.push({mode:'thumbnails-new', container: taboola_container_id, placement: 'Below Article Thumbnails Widget', target_type: 'mix'});
  console.log('Taboola Ad Fired');
console.log('URL Passed: '+ widget.querySelector('.widget__headline-text').href);
_taboola.push({article:'auto', url:widget.querySelector('.widget__headline-text').href});
}
    

});