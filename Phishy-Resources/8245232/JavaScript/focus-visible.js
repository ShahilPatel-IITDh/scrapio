function applyFocusVisiblePolyfill(scope){var hadKeyboardEvent=true;var hadFocusVisibleRecently=false;var hadFocusVisibleRecentlyTimeout=null;var inputTypesAllowlist={text:true,search:true,url:true,tel:true,email:true,password:true,number:true,date:true,month:true,week:true,time:true,datetime:true,'datetime-local':true};function isValidFocusTarget(el){if(el&&el!==document&&el.nodeName!=='HTML'&&el.nodeName!=='BODY'&&'classList'in el&&'contains'in el.classList){return true;}
return false;}
function focusTriggersKeyboardModality(el){var type=el.type;var tagName=el.tagName;if(tagName==='INPUT'&&inputTypesAllowlist[type]&&!el.readOnly){return true;}
if(tagName==='TEXTAREA'&&!el.readOnly){return true;}
if(el.isContentEditable){return true;}
return false;}
function addFocusVisibleClass(el){if(el.classList.contains('focus-visible')){return;}
el.parentElement.classList.add('focus-visible');el.parentElement.setAttribute('data-focus-visible-added','');el.classList.add('focus-visible');el.setAttribute('data-focus-visible-added','');}
function removeFocusVisibleClass(el){if(!el.hasAttribute('data-focus-visible-added')){return;}
el.classList.remove('focus-visible');el.parentElement.classList.remove('focus-visible');el.removeAttribute('data-focus-visible-added');el.parentElement.removeAttribute('data-focus-visible-added');}
function onKeyDown(e){if(e.keyCode===9){hadKeyboardEvent=true;}else{return;}
if(isValidFocusTarget(scope.activeElement)){addFocusVisibleClass(scope.activeElement);}}
function onPointerDown(e){hadKeyboardEvent=false;}
function onFocus(e){if(!isValidFocusTarget(e.target)){return;}
if(hadKeyboardEvent){addFocusVisibleClass(e.target);}}
function onBlur(e){if(!isValidFocusTarget(e.target)){return;}
if(e.target.classList.contains('focus-visible')||e.target.hasAttribute('data-focus-visible-added')){hadFocusVisibleRecently=true;window.clearTimeout(hadFocusVisibleRecentlyTimeout);hadFocusVisibleRecentlyTimeout=window.setTimeout(function(){hadFocusVisibleRecently=false;},100);removeFocusVisibleClass(e.target);}}
function onVisibilityChange(e){if(document.visibilityState==='hidden'){if(hadFocusVisibleRecently){hadKeyboardEvent=true;}
addInitialPointerMoveListeners();}}
function addInitialPointerMoveListeners(){document.addEventListener('mousemove',onInitialPointerMove);document.addEventListener('mousedown',onInitialPointerMove);document.addEventListener('mouseup',onInitialPointerMove);document.addEventListener('pointermove',onInitialPointerMove);document.addEventListener('pointerdown',onInitialPointerMove);document.addEventListener('pointerup',onInitialPointerMove);document.addEventListener('touchmove',onInitialPointerMove);document.addEventListener('touchstart',onInitialPointerMove);document.addEventListener('touchend',onInitialPointerMove);}
function removeInitialPointerMoveListeners(){document.removeEventListener('mousemove',onInitialPointerMove);document.removeEventListener('mousedown',onInitialPointerMove);document.removeEventListener('mouseup',onInitialPointerMove);document.removeEventListener('pointermove',onInitialPointerMove);document.removeEventListener('pointerdown',onInitialPointerMove);document.removeEventListener('pointerup',onInitialPointerMove);document.removeEventListener('touchmove',onInitialPointerMove);document.removeEventListener('touchstart',onInitialPointerMove);document.removeEventListener('touchend',onInitialPointerMove);}
function onInitialPointerMove(e){if(e.target.nodeName&&e.target.nodeName.toLowerCase()==='html'){return;}
hadKeyboardEvent=false;removeInitialPointerMoveListeners();}
document.addEventListener('keydown',onKeyDown,true);document.addEventListener('mousedown',onPointerDown,true);document.addEventListener('pointerdown',onPointerDown,true);document.addEventListener('touchstart',onPointerDown,true);document.addEventListener('visibilitychange',onVisibilityChange,true);addInitialPointerMoveListeners();scope.addEventListener('focus',onFocus,true);scope.addEventListener('blur',onBlur,true);if(scope.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&scope.host){scope.host.setAttribute('data-js-focus-visible','');}else if(scope.nodeType===Node.DOCUMENT_NODE){document.documentElement.classList.add('js-focus-visible');document.documentElement.setAttribute('data-js-focus-visible','');}}
if(typeof window!=='undefined'&&typeof document!=='undefined'){window.applyFocusVisiblePolyfill=applyFocusVisiblePolyfill;var event;try{event=new CustomEvent('focus-visible-polyfill-ready');}catch(error){event=document.createEvent('CustomEvent');event.initCustomEvent('focus-visible-polyfill-ready',false,false,{});}
window.dispatchEvent(event);}
if(typeof document!=='undefined'){applyFocusVisiblePolyfill(document);}