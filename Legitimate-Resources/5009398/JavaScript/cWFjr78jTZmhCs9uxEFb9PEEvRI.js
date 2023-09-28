;window.CloudflareApps=window.CloudflareApps||{};CloudflareApps.siteId="b62750bf1c482262930e2d73e3880b7b";CloudflareApps.installs=CloudflareApps.installs||{};;(function(){'use strict'
CloudflareApps.internal=CloudflareApps.internal||{}
var errors=[]
CloudflareApps.internal.placementErrors=errors
var errorHashes={}
function noteError(options){var hash=options.selector+'::'+options.type+'::'+(options.installId||'')
if(errorHashes[hash]){return}
errorHashes[hash]=true
errors.push(options)}
var initializedSelectors={}
var currentInit=false
CloudflareApps.internal.markSelectors=function markSelectors(){if(!currentInit){check()
currentInit=true
setTimeout(function(){currentInit=false})}}
function check(){var installs=window.CloudflareApps.installs
for(var installId in installs){if(!installs.hasOwnProperty(installId)){continue}
var selectors=installs[installId].selectors
if(!selectors){continue}
for(var key in selectors){if(!selectors.hasOwnProperty(key)){continue}
var hash=installId+'::'+key
if(initializedSelectors[hash]){continue}
var els=document.querySelectorAll(selectors[key])
if(els&&els.length>1){noteError({type:'init:too-many',option:key,selector:selectors[key],installId:installId})
initializedSelectors[hash]=true
continue}else if(!els||!els.length){continue}
initializedSelectors[hash]=true
els[0].setAttribute('cfapps-selector',selectors[key])}}}
CloudflareApps.querySelector=function querySelector(selector){if(selector==='body'||selector==='head'){return document[selector]}
CloudflareApps.internal.markSelectors()
var els=document.querySelectorAll('[cfapps-selector="'+selector+'"]')
if(!els||!els.length){noteError({type:'select:not-found:by-attribute',selector:selector})
els=document.querySelectorAll(selector)
if(!els||!els.length){noteError({type:'select:not-found:by-query',selector:selector})
return null}else if(els.length>1){noteError({type:'select:too-many:by-query',selector:selector})}
return els[0]}
if(els.length>1){noteError({type:'select:too-many:by-attribute',selector:selector})}
return els[0]}}());(function(){'use strict'
var prevEls={}
CloudflareApps.createElement=function createElement(options,prevEl){options=options||{}
CloudflareApps.internal.markSelectors()
try{if(prevEl&&prevEl.parentNode){var replacedEl
if(prevEl.cfAppsElementId){replacedEl=prevEls[prevEl.cfAppsElementId]}
if(replacedEl){prevEl.parentNode.replaceChild(replacedEl,prevEl)
delete prevEls[prevEl.cfAppsElementId]}else{prevEl.parentNode.removeChild(prevEl)}}
var element=document.createElement('cloudflare-app')
var container
if(options.pages&&options.pages.URLPatterns&&!CloudflareApps.matchPage(options.pages.URLPatterns)){return element}
try{container=CloudflareApps.querySelector(options.selector)}catch(e){}
if(!container){return element}
if(!container.parentNode&&(options.method==='after'||options.method==='before'||options.method==='replace')){return element}
if(container===document.body){if(options.method==='after'){options.method='append'}else if(options.method==='before'){options.method='prepend'}}
switch(options.method){case'prepend':if(container.firstChild){container.insertBefore(element,container.firstChild)
break}
case'append':container.appendChild(element)
break
case'after':if(container.nextSibling){container.parentNode.insertBefore(element,container.nextSibling)}else{container.parentNode.appendChild(element)}
break
case'before':container.parentNode.insertBefore(element,container)
break
case'replace':try{var id=element.cfAppsElementId=Math.random().toString(36)
prevEls[id]=container}catch(e){}
container.parentNode.replaceChild(element,container)}
return element}catch(e){if(typeof console!=='undefined'&&typeof console.error!=='undefined'){console.error('Error creating Cloudflare Apps element',e)}}}}());(function(){'use strict'
CloudflareApps.matchPage=function matchPage(patterns){if(!patterns||!patterns.length){return true}
var loc=document.location.host+document.location.pathname
if(window.CloudflareApps&&CloudflareApps.proxy&&CloudflareApps.proxy.originalURL){var url=CloudflareApps.proxy.originalURL.parsed
loc=url.host+url.path}
for(var i=0;i<patterns.length;i++){var re=new RegExp(patterns[i],'i')
if(re.test(loc)){return true}}
return false}}());CloudflareApps.installs["ZuUfa4ZNm8CR"]={appId:"nt4L5NPJq1za",scope:{}};;CloudflareApps.installs["ZuUfa4ZNm8CR"].options={"blocks":[{"code":"\u003cdiv style=\"\n\t\t\t\n\t\t\tbackground: red;\n    position: fixed;\nbottom:0;\n    z-index: 999;\n    width: 100%;\n    text-align: center;\n\t\t\"\u003e\n\u003cdiv style=\"\npadding: 6px 6px 6px 6px;\n    font-weight: bold;\n    font-size: 16px;\n\"\u003e\u003cp style=\"\n    color: white;\n\"\u003eChanges are coming to your website services! Please read more \u003ca href=\"https://www.vistaprint.com/customer-care/help-center/16116844818573/\" target=\"_blank\"\u003ehere\u003c/a\u003e\u003c/p\u003e\n\u003c/div\u003e\n\n\t\t\t\u003c/div\u003e","location":{"method":"prepend","pages":{"URLPatterns":["^members.webs.com/sites/?.*$"]},"selector":"body"}},{"code":"\u003cdiv style=\"\n\t\t\t\n\t\t\tbackground: red;\n    position: fixed;\nbottom:0;\n    z-index: 999;\n    width: 100%;\n    text-align: center;\n\t\t\"\u003e\n\u003cdiv style=\"\npadding: 6px 6px 6px 6px;\n    font-weight: bold;\n    font-size: 16px;\n\"\u003e\u003cp style=\"\n    color: white;\nmargin: 16px;\n\"\u003eChanges are coming to your website services! Please read more \u003ca href=\"https://www.vistaprint.com/customer-care/help-center/16116844818573/\" target=\"_blank\"\u003ehere\u003c/a\u003e\u003c/p\u003e\n\u003c/div\u003e\n\n\t\t\t\u003c/div\u003e","location":{"method":"prepend","pages":{"URLPatterns":["^members.webs.com/s/panel/?.*$"]},"selector":"body"}}]};;CloudflareApps.installs["ZuUfa4ZNm8CR"].selectors={"blocks[0].location.selector":"body","blocks[1].location.selector":"body"};;if(CloudflareApps.matchPage(CloudflareApps.installs['ZuUfa4ZNm8CR'].URLPatterns)){(function(){'use strict'
if(!document.addEventListener)return
var options=CloudflareApps.installs['ZuUfa4ZNm8CR'].options
var elements={}
var prevElements={}
var initialized=false;function updateElements(){options.blocks.forEach(function(block,index){var locationHash=[block.location.selector,block.location.method,index].join('!')
var element
if(elements[locationHash]){element=elements[locationHash]}else{if(block.location.method==='replace'){prevElements[locationHash]=document.querySelector(block.location.selector)}
element=CloudflareApps.createElement(block.location)
elements[locationHash]=element}
element.foundInBlocks=true
element.innerHTML=block.code
var scripts=Array.prototype.slice.call(element.querySelectorAll('script'))
if(scripts){scripts.forEach(function(script){var newScript=document.createElement('script')
for(var key=script.attributes.length;key--;){var attr=script.attributes[key]
if(attr.specified){newScript.setAttribute(attr.name,attr.value)}}
newScript.innerHTML=script.innerHTML
element.replaceChild(newScript,script)})}})
for(var hash in elements){if(!elements[hash].foundInBlocks){if(prevElements[hash]){elements[hash].parentNode.replaceChild(prevElements[hash],elements[hash])
delete prevElements[hash]}else{elements[hash].parentNode.removeChild(elements[hash])}
delete elements[hash]}else{delete elements[hash].foundInBlocks}}}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',function(){if(initialized==false){initialized=true;updateElements();}})}else{updateElements()}
window.CloudflareApps.installs['ZuUfa4ZNm8CR'].scope={setOptions:function(nextOptions){options=nextOptions
updateElements()}}}())}