/*!vex.js, vex.dialog.js 2.0.1*/(function(){var a;a=function(a){var b,c;return b=!1,a(function(){var d;return d=(document.body||document.documentElement).style,b=void 0!==d.animation||void 0!==d.WebkitAnimation||void 0!==d.MozAnimation||void 0!==d.MsAnimation||void 0!==d.OAnimation,a(window).bind("keyup.vex",function(a){return 27===a.keyCode?c.closeByEscape():void 0})}),c={globalID:1,animationEndEvent:"animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend",baseClassNames:{vex:"vex",content:"vex-content",overlay:"vex-overlay",close:"vex-close",closing:"vex-closing",open:"vex-open"},defaultOptions:{content:"",showCloseButton:!0,escapeButtonCloses:!0,overlayClosesOnClick:!0,appendLocation:"body",className:"",css:{},overlayClassName:"",overlayCSS:{},contentClassName:"",contentCSS:{},closeClassName:"",closeCSS:{}},open:function(b){return b=a.extend({},c.defaultOptions,b),b.id=c.globalID,c.globalID+=1,b.$vex=a("<div>").addClass(c.baseClassNames.vex).addClass(b.className).css(b.css).data({vex:b}),b.$vexOverlay=a("<div>").addClass(c.baseClassNames.overlay).addClass(b.overlayClassName).css(b.overlayCSS).data({vex:b}),b.overlayClosesOnClick&&b.$vexOverlay.bind("click.vex",function(b){return b.target===this?c.close(a(this).data().vex.id):void 0}),b.$vex.append(b.$vexOverlay),b.$vexContent=a("<div>").addClass(c.baseClassNames.content).addClass(b.contentClassName).css(b.contentCSS).append(b.content).data({vex:b}),b.$vex.append(b.$vexContent),b.showCloseButton&&(b.$closeButton=a("<div>").addClass(c.baseClassNames.close).addClass(b.closeClassName).css(b.closeCSS).data({vex:b}).bind("click.vex",function(){return c.close(a(this).data().vex.id)}),b.$vexContent.append(b.$closeButton)),a(b.appendLocation).append(b.$vex),c.setupBodyClassName(b.$vex),b.afterOpen&&b.afterOpen(b.$vexContent,b),setTimeout(function(){return b.$vexContent.trigger("vexOpen",b)},0),b.$vexContent},getAllVexes:function(){return a("."+c.baseClassNames.vex+':not(".'+c.baseClassNames.closing+'") .'+c.baseClassNames.content)},getVexByID:function(b){return c.getAllVexes().filter(function(){return a(this).data().vex.id===b})},close:function(a){var b;if(!a){if(b=c.getAllVexes().last(),!b.length)return!1;a=b.data().vex.id}return c.closeByID(a)},closeAll:function(){var b;return b=c.getAllVexes().map(function(){return a(this).data().vex.id}).toArray(),(null!=b?b.length:void 0)?(a.each(b.reverse(),function(a,b){return c.closeByID(b)}),!0):!1},closeByID:function(d){var e,f,g,h,i;return f=c.getVexByID(d),f.length?(e=f.data().vex.$vex,i=a.extend({},f.data().vex),g=function(){return i.beforeClose?i.beforeClose(f,i):void 0},h=function(){return f.trigger("vexClose",i),e.remove(),i.afterClose?i.afterClose(f,i):void 0},b?(g(),e.unbind(c.animationEndEvent).bind(c.animationEndEvent,function(){return h()}).addClass(c.baseClassNames.closing)):(g(),h()),!0):void 0},closeByEscape:function(){var b,d,e;return e=c.getAllVexes().map(function(){return a(this).data().vex.id}).toArray(),(null!=e?e.length:void 0)?(d=Math.max.apply(Math,e),b=c.getVexByID(d),b.data().vex.escapeButtonCloses!==!0?!1:c.closeByID(d)):!1},setupBodyClassName:function(b){return b.bind("vexOpen.vex",function(){return a("body").addClass(c.baseClassNames.open)}).bind("vexClose.vex",function(){return c.getAllVexes().length?void 0:a("body").removeClass(c.baseClassNames.open)})},hideLoading:function(){return a(".vex-loading-spinner").remove()},showLoading:function(){return c.hideLoading(),a("body").append('<div class="vex-loading-spinner '+c.defaultOptions.className+'"></div>')}}},"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):window.vex=a(jQuery)}).call(this),function(){var a;a=function(a,b){var c,d;return null==b?a.error("Vex is required to use vex.dialog"):(c=function(b){var c;return c={},a.each(b.serializeArray(),function(){return c[this.name]?(c[this.name].push||(c[this.name]=[c[this.name]]),c[this.name].push(this.value||"")):c[this.name]=this.value||""}),c},d={},d.buttons={YES:{text:"OK",type:"submit",className:"vex-dialog-button-primary"},NO:{text:"Cancel",type:"button",className:"vex-dialog-button-secondary",click:function(a){return a.data().vex.value=!1,b.close(a.data().vex.id)}}},d.defaultOptions={callback:function(){},afterOpen:function(){},message:"Message",input:'<input name="vex" type="hidden" value="_vex-empty-value" />',value:!1,buttons:[d.buttons.YES,d.buttons.NO],showCloseButton:!1,onSubmit:function(e){var f,g;return f=a(this),g=f.parent(),e.preventDefault(),e.stopPropagation(),g.data().vex.value=d.getFormValueOnSubmit(c(f)),b.close(g.data().vex.id)},focusFirstInput:!0},d.defaultAlertOptions={message:"Alert",buttons:[d.buttons.YES]},d.defaultConfirmOptions={message:"Confirm"},d.open=function(c){var e;return c=a.extend({},b.defaultOptions,d.defaultOptions,c),c.content=d.buildDialogForm(c),c.beforeClose=function(a){return c.callback(a.data().vex.value)},e=b.open(c),c.focusFirstInput&&e.find('input[type="submit"], textarea, input[type="date"], input[type="datetime"], input[type="datetime-local"], input[type="email"], input[type="month"], input[type="number"], input[type="password"], input[type="search"], input[type="tel"], input[type="text"], input[type="time"], input[type="url"], input[type="week"]').first().focus(),e},d.alert=function(b){return"string"==typeof b&&(b={message:b}),b=a.extend({},d.defaultAlertOptions,b),d.open(b)},d.confirm=function(b){return"string"==typeof b?a.error("dialog.confirm(options) requires options.callback."):(b=a.extend({},d.defaultConfirmOptions,b),d.open(b))},d.prompt=function(b){var c;return"string"==typeof b?a.error("dialog.prompt(options) requires options.callback."):(c={message:'<label for="vex">'+(b.label||"Prompt:")+"</label>",input:'<input name="vex" type="text" class="vex-dialog-prompt-input" placeholder="'+(b.placeholder||"")+'"  value="'+(b.value||"")+'" />'},b=a.extend({},c,b),d.open(b))},d.buildDialogForm=function(b){var c,e,f;return c=a('<form class="vex-dialog-form" />'),f=a('<div class="vex-dialog-message" />'),e=a('<div class="vex-dialog-input" />'),c.append(f.append(b.message)).append(e.append(b.input)).append(d.buttonsToDOM(b.buttons)).bind("submit.vex",b.onSubmit),c},d.getFormValueOnSubmit=function(a){return a.vex||""===a.vex?"_vex-empty-value"===a.vex?!0:a.vex:a},d.buttonsToDOM=function(c){var d;return d=a('<div class="vex-dialog-buttons" />'),a.each(c,function(e,f){return d.append(a('<input type="'+f.type+'" />').val(f.text).addClass(f.className+" vex-dialog-button "+(0===e?"vex-first ":"")+(e===c.length-1?"vex-last ":"")).bind("click.vex",function(c){return f.click?f.click(a(this).parents("."+b.baseClassNames.content),c):void 0}))}),d},d)},"function"==typeof define&&define.amd?define(["jquery","vex"],a):"object"==typeof exports?module.exports=a(require("jquery"),require("vex")):window.vex.dialog=a(window.jQuery,window.vex)}.call(this);