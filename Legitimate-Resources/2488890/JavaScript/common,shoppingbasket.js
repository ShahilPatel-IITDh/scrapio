window.apsinth={util:{},msg:{}};if(window.console==null){window.console={log:function(){},error:function(){},warn:function(){},debug:function(){}}
}jQuery.ui||(function(p){var j=p.fn.remove,o=p.browser.mozilla&&(parseFloat(p.browser.version)<1.9);p.ui={version:"1.7.2",plugin:{add:function(c,b,e){var a=p.ui[c].prototype;
for(var d in e){a.plugins[d]=a.plugins[d]||[];a.plugins[d].push([b,e[d]])}},call:function(d,b,c){var e=d.plugins[b];
if(!e||!d.element[0].parentNode){return}for(var a=0;a<e.length;a++){if(d.options[e[a][0]]){e[a][1].apply(d.element,c)
}}}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)
},hasScroll:function(a,c){if(p(a).css("overflow")=="hidden"){return false}var d=(c&&c=="left")?"scrollLeft":"scrollTop",b=false;
if(a[d]>0){return true}a[d]=1;b=(a[d]>0);a[d]=0;return b},isOverAxis:function(b,c,a){return(b>c)&&(b<(c+a))
},isOver:function(e,c,f,a,d,b){return p.ui.isOverAxis(e,f,d)&&p.ui.isOverAxis(c,a,b)},keyCode:{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38}};
if(o){var m=p.attr,n=p.fn.removeAttr,k="http://www.w3.org/2005/07/aaa",r=/^aria-/,q=/^wairole:/;p.attr=function(c,d,b){var a=b!==undefined;
return(d=="role"?(a?m.call(this,c,d,"wairole:"+b):(m.apply(this,arguments)||"").replace(q,"")):(r.test(d)?(a?c.setAttributeNS(k,d.replace(r,"aaa:"),b):m.call(this,c,d.replace(r,"aaa:"))):m.apply(this,arguments)))
};p.fn.removeAttr=function(a){return(r.test(a)?this.each(function(){this.removeAttributeNS(k,a.replace(r,""))
}):n.call(this,a))}}p.fn.extend({remove:function(){p("*",this).add(this).each(function(){p(this).triggerHandler("remove")
});return j.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable","off").css("MozUserSelect","").unbind("selectstart.ui")
},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none").bind("selectstart.ui",function(){return false
})},scrollParent:function(){var a;if((p.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){a=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(p.curCSS(this,"position",1))&&(/(auto|scroll)/).test(p.curCSS(this,"overflow",1)+p.curCSS(this,"overflow-y",1)+p.curCSS(this,"overflow-x",1))
}).eq(0)}else{a=this.parents().filter(function(){return(/(auto|scroll)/).test(p.curCSS(this,"overflow",1)+p.curCSS(this,"overflow-y",1)+p.curCSS(this,"overflow-x",1))
}).eq(0)}return(/fixed/).test(this.css("position"))||!a.length?p(document):a}});p.extend(p.expr[":"],{data:function(a,b,c){return !!p.data(a,c[3])
},focusable:function(b){var a=b.nodeName.toLowerCase(),c=p.attr(b,"tabindex");return(/input|select|textarea|button|object/.test(a)?!b.disabled:"a"==a||"area"==a?b.href||!isNaN(c):!isNaN(c))&&!p(b)["area"==a?"parents":"closest"](":hidden").length
},tabbable:function(a){var b=p.attr(a,"tabindex");return(isNaN(b)||b>=0)&&p(a).is(":focusable")}});function l(a,f,e,b){function c(g){var h=p[a][f][g]||[];
return(typeof h=="string"?h.split(/,?\s+/):h)}var d=c("getter");if(b.length==1&&typeof b[0]=="string"){d=d.concat(c("getterSetter"))
}return(p.inArray(e,d)!=-1)}p.widget=function(b,c){var a=b.split(".")[0];b=b.split(".")[1];p.fn[b]=function(e){var g=(typeof e=="string"),f=Array.prototype.slice.call(arguments,1);
if(g&&e.substring(0,1)=="_"){return this}if(g&&l(a,b,e,f)){var d=p.data(this[0],b);return(d?d[e].apply(d,f):undefined)
}return this.each(function(){var h=p.data(this,b);(!h&&!g&&p.data(this,b,new p[a][b](this,e))._init());
(h&&g&&p.isFunction(h[e])&&h[e].apply(h,f))})};p[a]=p[a]||{};p[a][b]=function(e,f){var d=this;this.namespace=a;
this.widgetName=b;this.widgetEventPrefix=p[a][b].eventPrefix||b;this.widgetBaseClass=a+"-"+b;this.options=p.extend({},p.widget.defaults,p[a][b].defaults,p.metadata&&p.metadata.get(e)[b],f);
this.element=p(e).bind("setData."+b,function(h,i,g){if(h.target==e){return d._setData(i,g)}}).bind("getData."+b,function(g,h){if(g.target==e){return d._getData(h)
}}).bind("remove",function(){return d.destroy()})};p[a][b].prototype=p.extend({},p.widget.prototype,c);
p[a][b].getterSetter="option"};p.widget.prototype={_init:function(){},destroy:function(){this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").removeAttr("aria-disabled")
},option:function(b,a){var c=b,d=this;if(typeof b=="string"){if(a===undefined){return this._getData(b)
}c={};c[b]=a}p.each(c,function(f,e){d._setData(f,e)})},_getData:function(a){return this.options[a]},_setData:function(b,a){this.options[b]=a;
if(b=="disabled"){this.element[a?"addClass":"removeClass"](this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").attr("aria-disabled",a)
}},enable:function(){this._setData("disabled",false)},disable:function(){this._setData("disabled",true)
},_trigger:function(b,a,g){var e=this.options[b],d=(b==this.widgetEventPrefix?b:this.widgetEventPrefix+b);
a=p.Event(a);a.type=d;if(a.originalEvent){for(var c=p.event.props.length,f;c;){f=p.event.props[--c];a[f]=a.originalEvent[f]
}}this.element.trigger(a,g);return !(p.isFunction(e)&&e.call(this.element[0],a,g)===false||a.isDefaultPrevented())
}};p.widget.defaults={disabled:false};p.ui.mouse={_mouseInit:function(){var a=this;this.element.bind("mousedown."+this.widgetName,function(b){return a._mouseDown(b)
}).bind("click."+this.widgetName,function(b){if(a._preventClickEvent){a._preventClickEvent=false;b.stopImmediatePropagation();
return false}});if(p.browser.msie){this._mouseUnselectable=this.element.attr("unselectable");this.element.attr("unselectable","on")
}this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName);(p.browser.msie&&this.element.attr("unselectable",this._mouseUnselectable))
},_mouseDown:function(b){b.originalEvent=b.originalEvent||{};if(b.originalEvent.mouseHandled){return}(this._mouseStarted&&this._mouseUp(b));
this._mouseDownEvent=b;var c=this,a=(b.which==1),d=(typeof this.options.cancel=="string"?p(b.target).parents().add(b.target).filter(this.options.cancel).length:false);
if(!a||d||!this._mouseCapture(b)){return true}this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){c.mouseDelayMet=true
},this.options.delay)}if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){this._mouseStarted=(this._mouseStart(b)!==false);
if(!this._mouseStarted){b.preventDefault();return true}}this._mouseMoveDelegate=function(e){return c._mouseMove(e)
};this._mouseUpDelegate=function(e){return c._mouseUp(e)};p(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);
(p.browser.safari||b.preventDefault());b.originalEvent.mouseHandled=true;return true},_mouseMove:function(a){if(p.browser.msie&&!a.button){return this._mouseUp(a)
}if(this._mouseStarted){this._mouseDrag(a);return a.preventDefault()}if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,a)!==false);
(this._mouseStarted?this._mouseDrag(a):this._mouseUp(a))}return !this._mouseStarted},_mouseUp:function(a){p(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){this._mouseStarted=false;this._preventClickEvent=(a.target==this._mouseDownEvent.target);
this._mouseStop(a)}return false},_mouseDistanceMet:function(a){return(Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance)
},_mouseDelayMet:function(a){return this.mouseDelayMet},_mouseStart:function(a){},_mouseDrag:function(a){},_mouseStop:function(a){},_mouseCapture:function(a){return true
}};p.ui.mouse.defaults={cancel:null,distance:1,delay:0}})(jQuery);(jQuery.ui&&jQuery.ui.draggable)||(function(b){b.widget("ui.draggable",b.extend({},b.ui.mouse,{_init:function(){if(this.options.helper=="original"&&!(/^(?:r|a|f)/).test(this.element.css("position"))){this.element[0].style.position="relative"
}(this.options.addClasses&&this.element.addClass("ui-draggable"));(this.options.disabled&&this.element.addClass("ui-draggable-disabled"));
this._mouseInit()},destroy:function(){if(!this.element.data("draggable")){return}this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
this._mouseDestroy()},_mouseCapture:function(a){var d=this.options;if(this.helper||d.disabled||b(a.target).is(".ui-resizable-handle")){return false
}this.handle=this._getHandle(a);if(!this.handle){return false}return true},_mouseStart:function(a){var d=this.options;
this.helper=this._createHelper(a);this._cacheHelperProportions();if(b.ui.ddmanager){b.ui.ddmanager.current=this
}this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();
this.offset=this.element.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
b.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;
if(d.cursorAt){this._adjustOffsetFromHelper(d.cursorAt)}if(d.containment){this._setContainment()}this._trigger("start",a);
this._cacheHelperProportions();if(b.ui.ddmanager&&!d.dropBehaviour){b.ui.ddmanager.prepareOffsets(this,a)
}this.helper.addClass("ui-draggable-dragging");this._mouseDrag(a,true);return true},_mouseDrag:function(a,e){this.position=this._generatePosition(a);
this.positionAbs=this._convertPositionTo("absolute");if(!e){var f=this._uiHash();this._trigger("drag",a,f);
this.position=f.position}if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"}if(b.ui.ddmanager){b.ui.ddmanager.drag(this,a)
}return false},_mouseStop:function(f){var e=false;if(b.ui.ddmanager&&!this.options.dropBehaviour){e=b.ui.ddmanager.drop(this,f)
}if(this.dropped){e=this.dropped;this.dropped=false}if((this.options.revert=="invalid"&&!e)||(this.options.revert=="valid"&&e)||this.options.revert===true||(b.isFunction(this.options.revert)&&this.options.revert.call(this.element,e))){var a=this;
b(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){a._trigger("stop",f);
a._clear()})}else{this._trigger("stop",f);this._clear()}return false},_getHandle:function(a){var d=!this.options.handle||!b(this.options.handle,this.element).length?true:false;
b(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==a.target){d=true}});
return d},_createHelper:function(f){var e=this.options;var a=b.isFunction(e.helper)?b(e.helper.apply(this.element[0],[f])):(e.helper=="clone"?this.element.clone():this.element);
if(!a.parents("body").length){a.appendTo((e.appendTo=="parent"?this.element[0].parentNode:e.appendTo))
}if(a[0]!=this.element[0]&&!(/(fixed|absolute)/).test(a.css("position"))){a.css("position","absolute")
}return a},_adjustOffsetFromHelper:function(a){if(a.left!=undefined){this.offset.click.left=a.left+this.margins.left
}if(a.right!=undefined){this.offset.click.left=this.helperProportions.width-a.right+this.margins.left
}if(a.top!=undefined){this.offset.click.top=a.top+this.margins.top}if(a.bottom!=undefined){this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top
}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var a=this.offsetParent.offset();
if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&b.ui.contains(this.scrollParent[0],this.offsetParent[0])){a.left+=this.scrollParent.scrollLeft();
a.top+=this.scrollParent.scrollTop()}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&b.browser.msie)){a={top:0,left:0}
}return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}
},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}
}else{return{top:0,left:0}}},_cacheMargins:function(){this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0)}
},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},_setContainment:function(){var f=this.options;if(f.containment=="parent"){f.containment=this.helper[0].parentNode
}if(f.containment=="document"||f.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,b(f.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(b(f.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]
}if(!(/^(document|window|parent)$/).test(f.containment)&&f.containment.constructor!=Array){var h=b(f.containment)[0];
if(!h){return}var g=b(f.containment).offset();var a=(b(h).css("overflow")!="hidden");this.containment=[g.left+(parseInt(b(h).css("borderLeftWidth"),10)||0)+(parseInt(b(h).css("paddingLeft"),10)||0)-this.margins.left,g.top+(parseInt(b(h).css("borderTopWidth"),10)||0)+(parseInt(b(h).css("paddingTop"),10)||0)-this.margins.top,g.left+(a?Math.max(h.scrollWidth,h.offsetWidth):h.offsetWidth)-(parseInt(b(h).css("borderLeftWidth"),10)||0)-(parseInt(b(h).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,g.top+(a?Math.max(h.scrollHeight,h.offsetHeight):h.offsetHeight)-(parseInt(b(h).css("borderTopWidth"),10)||0)-(parseInt(b(h).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]
}else{if(f.containment.constructor==Array){this.containment=f.containment}}},_convertPositionTo:function(j,d){if(!d){d=this.position
}var l=j=="absolute"?1:-1;var k=this.options,a=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&b.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,i=(/(html|body)/i).test(a[0].tagName);
return{top:(d.top+this.offset.relative.top*l+this.offset.parent.top*l-(b.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(i?0:a.scrollTop()))*l)),left:(d.left+this.offset.relative.left*l+this.offset.parent.left*l-(b.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:a.scrollLeft())*l))}
},_generatePosition:function(n){var k=this.options,a=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&b.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,j=(/(html|body)/i).test(a[0].tagName);
if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()
}var o=n.pageX;var p=n.pageY;if(this.originalPosition){if(this.containment){if(n.pageX-this.offset.click.left<this.containment[0]){o=this.containment[0]+this.offset.click.left
}if(n.pageY-this.offset.click.top<this.containment[1]){p=this.containment[1]+this.offset.click.top}if(n.pageX-this.offset.click.left>this.containment[2]){o=this.containment[2]+this.offset.click.left
}if(n.pageY-this.offset.click.top>this.containment[3]){p=this.containment[3]+this.offset.click.top}}if(k.grid){var l=this.originalPageY+Math.round((p-this.originalPageY)/k.grid[1])*k.grid[1];
p=this.containment?(!(l-this.offset.click.top<this.containment[1]||l-this.offset.click.top>this.containment[3])?l:(!(l-this.offset.click.top<this.containment[1])?l-k.grid[1]:l+k.grid[1])):l;
var m=this.originalPageX+Math.round((o-this.originalPageX)/k.grid[0])*k.grid[0];o=this.containment?(!(m-this.offset.click.left<this.containment[0]||m-this.offset.click.left>this.containment[2])?m:(!(m-this.offset.click.left<this.containment[0])?m-k.grid[0]:m+k.grid[0])):m
}}return{top:(p-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(b.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(j?0:a.scrollTop())))),left:(o-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(b.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():j?0:a.scrollLeft())))}
},_clear:function(){this.helper.removeClass("ui-draggable-dragging");if(this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval){this.helper.remove()
}this.helper=null;this.cancelHelperRemoval=false},_trigger:function(a,f,e){e=e||this._uiHash();b.ui.plugin.call(this,a,[f,e]);
if(a=="drag"){this.positionAbs=this._convertPositionTo("absolute")}return b.widget.prototype._trigger.call(this,a,f,e)
},plugins:{},_uiHash:function(a){return{helper:this.helper,position:this.position,absolutePosition:this.positionAbs,offset:this.positionAbs}
}}));b.extend(b.ui.draggable,{version:"1.7.2",eventPrefix:"drag",defaults:{addClasses:true,appendTo:"parent",axis:false,cancel:":input,option",connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,delay:0,distance:1,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false}});
b.ui.plugin.add("draggable","connectToSortable",{start:function(j,h){var i=b(this).data("draggable"),g=i.options,a=b.extend({},h,{item:i.element});
i.sortables=[];b(g.connectToSortable).each(function(){var c=b.data(this,"sortable");if(c&&!c.options.disabled){i.sortables.push({instance:c,shouldRevert:c.options.revert});
c._refreshItems();c._trigger("activate",j,a)}})},stop:function(h,f){var g=b(this).data("draggable"),a=b.extend({},f,{item:g.element});
b.each(g.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;g.cancelHelperRemoval=true;
this.instance.cancelHelperRemoval=false;if(this.shouldRevert){this.instance.options.revert=true}this.instance._mouseStop(h);
this.instance.options.helper=this.instance.options._helper;if(g.options.helper=="original"){this.instance.currentItem.css({top:"auto",left:"auto"})
}}else{this.instance.cancelHelperRemoval=false;this.instance._trigger("deactivate",h,a)}})},drag:function(j,g){var h=b(this).data("draggable"),a=this;
var i=function(r){var d=this.offset.click.top,e=this.offset.click.left;var t=this.positionAbs.top,o=this.positionAbs.left;
var q=r.height,f=r.width;var c=r.top,s=r.left;return b.ui.isOver(t+d,o+e,c,s,q,f)};b.each(h.sortables,function(c){this.instance.positionAbs=h.positionAbs;
this.instance.helperProportions=h.helperProportions;this.instance.offset.click=h.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;
this.instance.currentItem=b(a).clone().appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper=this.instance.options.helper;
this.instance.options.helper=function(){return g.helper[0]};j.target=this.instance.currentItem[0];this.instance._mouseCapture(j,true);
this.instance._mouseStart(j,true,true);this.instance.offset.click.top=h.offset.click.top;this.instance.offset.click.left=h.offset.click.left;
this.instance.offset.parent.left-=h.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=h.offset.parent.top-this.instance.offset.parent.top;
h._trigger("toSortable",j);h.dropped=this.instance.element;h.currentItem=h.element;this.instance.fromOutside=h
}if(this.instance.currentItem){this.instance._mouseDrag(j)}}else{if(this.instance.isOver){this.instance.isOver=0;
this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",j,this.instance._uiHash(this.instance));
this.instance._mouseStop(j,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();
if(this.instance.placeholder){this.instance.placeholder.remove()}h._trigger("fromSortable",j);h.dropped=false
}}})}});b.ui.plugin.add("draggable","cursor",{start:function(h,g){var a=b("body"),f=b(this).data("draggable").options;
if(a.css("cursor")){f._cursor=a.css("cursor")}a.css("cursor",f.cursor)},stop:function(a,f){var e=b(this).data("draggable").options;
if(e._cursor){b("body").css("cursor",e._cursor)}}});b.ui.plugin.add("draggable","iframeFix",{start:function(a,f){var e=b(this).data("draggable").options;
b(e.iframeFix===true?"iframe":e.iframeFix).each(function(){b('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css(b(this).offset()).appendTo("body")
})},stop:function(a,d){b("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)
})}});b.ui.plugin.add("draggable","opacity",{start:function(h,g){var a=b(g.helper),f=b(this).data("draggable").options;
if(a.css("opacity")){f._opacity=a.css("opacity")}a.css("opacity",f.opacity)},stop:function(a,f){var e=b(this).data("draggable").options;
if(e._opacity){b(f.helper).css("opacity",e._opacity)}}});b.ui.plugin.add("draggable","scroll",{start:function(f,e){var a=b(this).data("draggable");
if(a.scrollParent[0]!=document&&a.scrollParent[0].tagName!="HTML"){a.overflowOffset=a.scrollParent.offset()
}},drag:function(i,h){var j=b(this).data("draggable"),g=j.options,a=false;if(j.scrollParent[0]!=document&&j.scrollParent[0].tagName!="HTML"){if(!g.axis||g.axis!="x"){if((j.overflowOffset.top+j.scrollParent[0].offsetHeight)-i.pageY<g.scrollSensitivity){j.scrollParent[0].scrollTop=a=j.scrollParent[0].scrollTop+g.scrollSpeed
}else{if(i.pageY-j.overflowOffset.top<g.scrollSensitivity){j.scrollParent[0].scrollTop=a=j.scrollParent[0].scrollTop-g.scrollSpeed
}}}if(!g.axis||g.axis!="y"){if((j.overflowOffset.left+j.scrollParent[0].offsetWidth)-i.pageX<g.scrollSensitivity){j.scrollParent[0].scrollLeft=a=j.scrollParent[0].scrollLeft+g.scrollSpeed
}else{if(i.pageX-j.overflowOffset.left<g.scrollSensitivity){j.scrollParent[0].scrollLeft=a=j.scrollParent[0].scrollLeft-g.scrollSpeed
}}}}else{if(!g.axis||g.axis!="x"){if(i.pageY-b(document).scrollTop()<g.scrollSensitivity){a=b(document).scrollTop(b(document).scrollTop()-g.scrollSpeed)
}else{if(b(window).height()-(i.pageY-b(document).scrollTop())<g.scrollSensitivity){a=b(document).scrollTop(b(document).scrollTop()+g.scrollSpeed)
}}}if(!g.axis||g.axis!="y"){if(i.pageX-b(document).scrollLeft()<g.scrollSensitivity){a=b(document).scrollLeft(b(document).scrollLeft()-g.scrollSpeed)
}else{if(b(window).width()-(i.pageX-b(document).scrollLeft())<g.scrollSensitivity){a=b(document).scrollLeft(b(document).scrollLeft()+g.scrollSpeed)
}}}}if(a!==false&&b.ui.ddmanager&&!g.dropBehaviour){b.ui.ddmanager.prepareOffsets(j,i)}}});b.ui.plugin.add("draggable","snap",{start:function(h,g){var a=b(this).data("draggable"),f=a.options;
a.snapElements=[];b(f.snap.constructor!=String?(f.snap.items||":data(draggable)"):f.snap).each(function(){var c=b(this);
var d=c.offset();if(this!=a.element[0]){a.snapElements.push({item:this,width:c.outerWidth(),height:c.outerHeight(),top:d.top,left:d.left})
}})},drag:function(r,D){var J=b(this).data("draggable"),B=J.options;var d=B.snapTolerance;var i=D.offset.left,l=i+J.helperProportions.width,K=D.offset.top,L=K+J.helperProportions.height;
for(var o=J.snapElements.length-1;o>=0;o--){var t=J.snapElements[o].left,E=t+J.snapElements[o].width,F=J.snapElements[o].top,C=F+J.snapElements[o].height;
if(!((t-d<i&&i<E+d&&F-d<K&&K<C+d)||(t-d<i&&i<E+d&&F-d<L&&L<C+d)||(t-d<l&&l<E+d&&F-d<K&&K<C+d)||(t-d<l&&l<E+d&&F-d<L&&L<C+d))){if(J.snapElements[o].snapping){(J.options.snap.release&&J.options.snap.release.call(J.element,r,b.extend(J._uiHash(),{snapItem:J.snapElements[o].item})))
}J.snapElements[o].snapping=false;continue}if(B.snapMode!="inner"){var M=Math.abs(F-L)<=d;var a=Math.abs(C-K)<=d;
var H=Math.abs(t-l)<=d;var G=Math.abs(E-i)<=d;if(M){D.position.top=J._convertPositionTo("relative",{top:F-J.helperProportions.height,left:0}).top-J.margins.top
}if(a){D.position.top=J._convertPositionTo("relative",{top:C,left:0}).top-J.margins.top}if(H){D.position.left=J._convertPositionTo("relative",{top:0,left:t-J.helperProportions.width}).left-J.margins.left
}if(G){D.position.left=J._convertPositionTo("relative",{top:0,left:E}).left-J.margins.left}}var I=(M||a||H||G);
if(B.snapMode!="outer"){var M=Math.abs(F-K)<=d;var a=Math.abs(C-L)<=d;var H=Math.abs(t-i)<=d;var G=Math.abs(E-l)<=d;
if(M){D.position.top=J._convertPositionTo("relative",{top:F,left:0}).top-J.margins.top}if(a){D.position.top=J._convertPositionTo("relative",{top:C-J.helperProportions.height,left:0}).top-J.margins.top
}if(H){D.position.left=J._convertPositionTo("relative",{top:0,left:t}).left-J.margins.left}if(G){D.position.left=J._convertPositionTo("relative",{top:0,left:E-J.helperProportions.width}).left-J.margins.left
}}if(!J.snapElements[o].snapping&&(M||a||H||G||I)){(J.options.snap.snap&&J.options.snap.snap.call(J.element,r,b.extend(J._uiHash(),{snapItem:J.snapElements[o].item})))
}J.snapElements[o].snapping=(M||a||H||G||I)}}});b.ui.plugin.add("draggable","stack",{start:function(a,h){var f=b(this).data("draggable").options;
var g=b.makeArray(b(f.stack.group)).sort(function(c,d){return(parseInt(b(c).css("zIndex"),10)||f.stack.min)-(parseInt(b(d).css("zIndex"),10)||f.stack.min)
});b(g).each(function(c){this.style.zIndex=f.stack.min+c});this[0].style.zIndex=f.stack.min+g.length}});
b.ui.plugin.add("draggable","zIndex",{start:function(h,g){var a=b(g.helper),f=b(this).data("draggable").options;
if(a.css("zIndex")){f._zIndex=a.css("zIndex")}a.css("zIndex",f.zIndex)},stop:function(a,f){var e=b(this).data("draggable").options;
if(e._zIndex){b(f.helper).css("zIndex",e._zIndex)}}})})(jQuery);(jQuery.ui&&jQuery.ui.droppable)||(function(b){b.widget("ui.droppable",{_init:function(){var d=this.options,a=d.accept;
this.isover=0;this.isout=1;this.options.accept=this.options.accept&&b.isFunction(this.options.accept)?this.options.accept:function(c){return c.is(a)
};this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};b.ui.ddmanager.droppables[this.options.scope]=b.ui.ddmanager.droppables[this.options.scope]||[];
b.ui.ddmanager.droppables[this.options.scope].push(this);(this.options.addClasses&&this.element.addClass("ui-droppable"))
},destroy:function(){var a=b.ui.ddmanager.droppables[this.options.scope];for(var d=0;d<a.length;d++){if(a[d]==this){a.splice(d,1)
}}this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable")
},_setData:function(a,d){if(a=="accept"){this.options.accept=d&&b.isFunction(d)?d:function(c){return c.is(d)
}}else{b.widget.prototype._setData.apply(this,arguments)}},_activate:function(d){var a=b.ui.ddmanager.current;
if(this.options.activeClass){this.element.addClass(this.options.activeClass)}(a&&this._trigger("activate",d,this.ui(a)))
},_deactivate:function(d){var a=b.ui.ddmanager.current;if(this.options.activeClass){this.element.removeClass(this.options.activeClass)
}(a&&this._trigger("deactivate",d,this.ui(a)))},_over:function(d){var a=b.ui.ddmanager.current;if(!a||(a.currentItem||a.element)[0]==this.element[0]){return
}if(this.options.accept.call(this.element[0],(a.currentItem||a.element))){if(this.options.hoverClass){this.element.addClass(this.options.hoverClass)
}this._trigger("over",d,this.ui(a))}},_out:function(d){var a=b.ui.ddmanager.current;if(!a||(a.currentItem||a.element)[0]==this.element[0]){return
}if(this.options.accept.call(this.element[0],(a.currentItem||a.element))){if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)
}this._trigger("out",d,this.ui(a))}},_drop:function(h,g){var a=g||b.ui.ddmanager.current;if(!a||(a.currentItem||a.element)[0]==this.element[0]){return false
}var f=false;this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var c=b.data(this,"droppable");
if(c.options.greedy&&b.ui.intersect(a,b.extend(c,{offset:c.element.offset()}),c.options.tolerance)){f=true;
return false}});if(f){return false}if(this.options.accept.call(this.element[0],(a.currentItem||a.element))){if(this.options.activeClass){this.element.removeClass(this.options.activeClass)
}if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)}this._trigger("drop",h,this.ui(a));
return this.element}return false},ui:function(a){return{draggable:(a.currentItem||a.element),helper:a.helper,position:a.position,absolutePosition:a.positionAbs,offset:a.positionAbs}
}});b.extend(b.ui.droppable,{version:"1.7.2",eventPrefix:"drop",defaults:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"}});
b.ui.intersect=function(a,v,r){if(!v.offset){return false}var A=(a.positionAbs||a.position.absolute).left,B=A+a.helperProportions.width,s=(a.positionAbs||a.position.absolute).top,t=s+a.helperProportions.height;
var y=v.offset.left,C=y+v.proportions.width,l=v.offset.top,u=l+v.proportions.height;switch(r){case"fit":return(y<A&&B<C&&l<s&&t<u);
break;case"intersect":return(y<A+(a.helperProportions.width/2)&&B-(a.helperProportions.width/2)<C&&l<s+(a.helperProportions.height/2)&&t-(a.helperProportions.height/2)<u);
break;case"pointer":var x=((a.positionAbs||a.position.absolute).left+(a.clickOffset||a.offset.click).left),w=((a.positionAbs||a.position.absolute).top+(a.clickOffset||a.offset.click).top),z=b.ui.isOver(w,x,l,y,v.proportions.height,v.proportions.width);
return z;break;case"touch":return((s>=l&&s<=u)||(t>=l&&t<=u)||(s<l&&t>u))&&((A>=y&&A<=C)||(B>=y&&B<=C)||(A<y&&B>C));
break;default:return false;break}};b.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(l,j){var a=b.ui.ddmanager.droppables[l.options.scope];
var k=j?j.type:null;var i=(l.currentItem||l.element).find(":data(droppable)").andSelf();droppablesLoop:for(var m=0;
m<a.length;m++){if(a[m].options.disabled||(l&&!a[m].options.accept.call(a[m].element[0],(l.currentItem||l.element)))){continue
}for(var n=0;n<i.length;n++){if(i[n]==a[m].element[0]){a[m].proportions.height=0;continue droppablesLoop
}}a[m].visible=a[m].element.css("display")!="none";if(!a[m].visible){continue}a[m].offset=a[m].element.offset();
a[m].proportions={width:a[m].element[0].offsetWidth,height:a[m].element[0].offsetHeight};if(k=="mousedown"){a[m]._activate.call(a[m],j)
}}},drop:function(a,f){var e=false;b.each(b.ui.ddmanager.droppables[a.options.scope],function(){if(!this.options){return
}if(!this.options.disabled&&this.visible&&b.ui.intersect(a,this,this.options.tolerance)){e=this._drop.call(this,f)
}if(!this.options.disabled&&this.visible&&this.options.accept.call(this.element[0],(a.currentItem||a.element))){this.isout=1;
this.isover=0;this._deactivate.call(this,f)}});return e},drag:function(a,d){if(a.options.refreshPositions){b.ui.ddmanager.prepareOffsets(a,d)
}b.each(b.ui.ddmanager.droppables[a.options.scope],function(){if(this.options.disabled||this.greedyChild||!this.visible){return
}var i=b.ui.intersect(a,this,this.options.tolerance);var c=!i&&this.isover==1?"isout":(i&&this.isover==0?"isover":null);
if(!c){return}var h;if(this.options.greedy){var j=this.element.parents(":data(droppable):eq(0)");if(j.length){h=b.data(j[0],"droppable");
h.greedyChild=(c=="isover"?1:0)}}if(h&&c=="isover"){h.isover=0;h.isout=1;h._out.call(h,d)}this[c]=1;this[c=="isout"?"isover":"isout"]=0;
this[c=="isover"?"_over":"_out"].call(this,d);if(h&&c=="isout"){h.isout=0;h.isover=1;h._over.call(h,d)
}})}}})(jQuery);(jQuery.ui&&jQuery.ui.resizable)||(function(f){f.widget("ui.resizable",f.extend({},f.ui.mouse,{_init:function(){var m=this,b=this.options;
this.element.addClass("ui-resizable");f.extend(this,{_aspectRatio:!!(b.aspectRatio),aspectRatio:b.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:b.helper||b.ghost||b.animate?b.helper||"ui-resizable-helper":null});
if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){if(/relative/.test(this.element.css("position"))&&f.browser.opera){this.element.css({position:"relative",top:"auto",left:"auto"})
}this.element.wrap(f('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));
this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;
this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});
this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=this.originalElement.css("resize");
this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));
this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize()}this.handles=b.handles||(!f(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});
if(this.handles.constructor==String){if(this.handles=="all"){this.handles="n,e,s,w,se,sw,ne,nw"}var a=this.handles.split(",");
this.handles={};for(var l=0;l<a.length;l++){var c=f.trim(a[l]),n="ui-resizable-"+c;var i=f('<div class="ui-resizable-handle '+n+'"></div>');
if(/sw|se|ne|nw/.test(c)){i.css({zIndex:++b.zIndex})}if("se"==c){i.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
}this.handles[c]=".ui-resizable-"+c;this.element.append(i)}}this._renderAxis=function(j){j=j||this.element;
for(var g in this.handles){if(this.handles[g].constructor==String){this.handles[g]=f(this.handles[g],this.element).show()
}if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var q=f(this.handles[g],this.element),k=0;
k=/sw|ne|nw|se|n|s/.test(g)?q.outerHeight():q.outerWidth();var h=["padding",/ne|nw|n/.test(g)?"Top":/se|sw|s/.test(g)?"Bottom":/^e$/.test(g)?"Right":"Left"].join("");
j.css(h,k);this._proportionallyResize()}if(!f(this.handles[g]).length){continue}}};this._renderAxis(this.element);
this._handles=f(".ui-resizable-handle",this.element).disableSelection();this._handles.mouseover(function(){if(!m.resizing){if(this.className){var g=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
}m.axis=g&&g[1]?g[1]:"se"}});if(b.autoHide){this._handles.hide();f(this.element).addClass("ui-resizable-autohide").hover(function(){f(this).removeClass("ui-resizable-autohide");
m._handles.show()},function(){if(!m.resizing){f(this).addClass("ui-resizable-autohide");m._handles.hide()
}})}this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(c){f(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
};if(this.elementIsWrapper){b(this.element);var a=this.element;a.parent().append(this.originalElement.css({position:a.css("position"),width:a.outerWidth(),height:a.outerHeight(),top:a.css("top"),left:a.css("left")})).end().remove()
}this.originalElement.css("resize",this.originalResizeStyle);b(this.originalElement)},_mouseCapture:function(b){var a=false;
for(var c in this.handles){if(f(this.handles[c])[0]==b.target){a=true}}return this.options.disabled||!!a
},_mouseStart:function(l){var b=this.options,m=this.element.position(),n=this.element;this.resizing=true;
this.documentScroll={top:f(document).scrollTop(),left:f(document).scrollLeft()};if(n.is(".ui-draggable")||(/absolute/).test(n.css("position"))){n.css({position:"absolute",top:m.top,left:m.left})
}if(f.browser.opera&&(/relative/).test(n.css("position"))){n.css({position:"relative",top:"auto",left:"auto"})
}this._renderProxy();var a=d(this.helper.css("left")),k=d(this.helper.css("top"));if(b.containment){a+=f(b.containment).scrollLeft()||0;
k+=f(b.containment).scrollTop()||0}this.offset=this.helper.offset();this.position={left:a,top:k};this.size=this._helper?{width:n.outerWidth(),height:n.outerHeight()}:{width:n.width(),height:n.height()};
this.originalSize=this._helper?{width:n.outerWidth(),height:n.outerHeight()}:{width:n.width(),height:n.height()};
this.originalPosition={left:a,top:k};this.sizeDiff={width:n.outerWidth()-n.width(),height:n.outerHeight()-n.height()};
this.originalMousePosition={left:l.pageX,top:l.pageY};this.aspectRatio=(typeof b.aspectRatio=="number")?b.aspectRatio:((this.originalSize.width/this.originalSize.height)||1);
var c=f(".ui-resizable-"+this.axis).css("cursor");f("body").css("cursor",c=="auto"?this.axis+"-resize":c);
n.addClass("ui-resizable-resizing");this._propagate("start",l);return true},_mouseDrag:function(z){var w=this.helper,x=this.options,r={},b=this,u=this.originalMousePosition,o=this.axis;
var a=(z.pageX-u.left)||0,c=(z.pageY-u.top)||0;var v=this._change[o];if(!v){return false}var s=v.apply(this,[z,a,c]),t=f.browser.msie&&f.browser.version<7,y=this.sizeDiff;
if(this._aspectRatio||z.shiftKey){s=this._updateRatio(s,z)}s=this._respectSize(s,z);this._propagate("resize",z);
w.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});
if(!this._helper&&this._proportionallyResizeElements.length){this._proportionallyResize()}this._updateCache(s);
this._trigger("resize",z,this.ui());return false},_mouseStop:function(q){this.resizing=false;var p=this.options,b=this;
if(this._helper){var r=this._proportionallyResizeElements,t=r.length&&(/textarea/i).test(r[0].nodeName),s=t&&f.ui.hasScroll(r[0],"left")?0:b.sizeDiff.height,n=t?0:b.sizeDiff.width;
var a={width:(b.size.width-n),height:(b.size.height-s)},o=(parseInt(b.element.css("left"),10)+(b.position.left-b.originalPosition.left))||null,c=(parseInt(b.element.css("top"),10)+(b.position.top-b.originalPosition.top))||null;
if(!p.animate){this.element.css(f.extend(a,{top:c,left:o}))}b.helper.height(b.size.height);b.helper.width(b.size.width);
if(this._helper&&!p.animate){this._proportionallyResize()}}f("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");
this._propagate("stop",q);if(this._helper){this.helper.remove()}return false},_updateCache:function(b){var a=this.options;
this.offset=this.helper.offset();if(e(b.left)){this.position.left=b.left}if(e(b.top)){this.position.top=b.top
}if(e(b.height)){this.size.height=b.height}if(e(b.width)){this.size.width=b.width}},_updateRatio:function(c,j){var b=this.options,a=this.position,k=this.size,l=this.axis;
if(c.height){c.width=(k.height*this.aspectRatio)}else{if(c.width){c.height=(k.width/this.aspectRatio)
}}if(l=="sw"){c.left=a.left+(k.width-c.width);c.top=null}if(l=="nw"){c.top=a.top+(k.height-c.height);
c.left=a.left+(k.width-c.width)}return c},_respectSize:function(v,A){var x=this.helper,y=this.options,b=this._aspectRatio||A.shiftKey,c=this.axis,D=e(v.width)&&y.maxWidth&&(y.maxWidth<v.width),u=e(v.height)&&y.maxHeight&&(y.maxHeight<v.height),z=e(v.width)&&y.minWidth&&(y.minWidth>v.width),a=e(v.height)&&y.minHeight&&(y.minHeight>v.height);
if(z){v.width=y.minWidth}if(a){v.height=y.minHeight}if(D){v.width=y.maxWidth}if(u){v.height=y.maxHeight
}var B=this.originalPosition.left+this.originalSize.width,o=this.position.top+this.size.height;var w=/sw|nw|w/.test(c),C=/nw|ne|n/.test(c);
if(z&&w){v.left=B-y.minWidth}if(D&&w){v.left=B-y.maxWidth}if(a&&C){v.top=o-y.minHeight}if(u&&C){v.top=o-y.maxHeight
}var t=!v.width&&!v.height;if(t&&!v.left&&v.top){v.top=null}else{if(t&&!v.top&&v.left){v.left=null}}return v
},_proportionallyResize:function(){var a=this.options;if(!this._proportionallyResizeElements.length){return
}var i=this.helper||this.element;for(var k=0;k<this._proportionallyResizeElements.length;k++){var c=this._proportionallyResizeElements[k];
if(!this.borderDif){var l=[c.css("borderTopWidth"),c.css("borderRightWidth"),c.css("borderBottomWidth"),c.css("borderLeftWidth")],b=[c.css("paddingTop"),c.css("paddingRight"),c.css("paddingBottom"),c.css("paddingLeft")];
this.borderDif=f.map(l,function(j,g){var h=parseInt(j,10)||0,o=parseInt(b[g],10)||0;return h+o})}if(f.browser.msie&&!(!(f(i).is(":hidden")||f(i).parents(":hidden").length))){continue
}c.css({height:(i.height()-this.borderDif[0]-this.borderDif[2])||0,width:(i.width()-this.borderDif[1]-this.borderDif[3])||0})
}},_renderProxy:function(){var i=this.element,a=this.options;this.elementOffset=i.offset();if(this._helper){this.helper=this.helper||f('<div style="overflow:hidden;"></div>');
var j=f.browser.msie&&f.browser.version<7,c=(j?1:0),b=(j?2:-1);this.helper.addClass(this._helper).css({width:this.element.outerWidth()+b,height:this.element.outerHeight()+b,position:"absolute",left:this.elementOffset.left-c+"px",top:this.elementOffset.top-c+"px",zIndex:++a.zIndex});
this.helper.appendTo("body").disableSelection()}else{this.helper=this.element}},_change:{e:function(a,b,c){return{width:this.originalSize.width+b}
},w:function(c,k,l){var a=this.options,j=this.originalSize,b=this.originalPosition;return{left:b.left+k,width:j.width-k}
},n:function(c,k,l){var a=this.options,j=this.originalSize,b=this.originalPosition;return{top:b.top+l,height:j.height-l}
},s:function(a,b,c){return{height:this.originalSize.height+c}},se:function(a,b,c){return f.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[a,b,c]))
},sw:function(a,b,c){return f.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[a,b,c]))
},ne:function(a,b,c){return f.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[a,b,c]))
},nw:function(a,b,c){return f.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[a,b,c]))
}},_propagate:function(a,b){f.ui.plugin.call(this,a,[b,this.ui()]);(a!="resize"&&this._trigger(a,b,this.ui()))
},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}
}}));f.extend(f.ui.resizable,{version:"1.7.2",eventPrefix:"resize",defaults:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,cancel:":input,option",containment:false,delay:0,distance:1,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1000}});
f.ui.plugin.add("resizable","alsoResize",{start:function(c,b){var h=f(this).data("resizable"),a=h.options;
_store=function(g){f(g).each(function(){f(this).data("resizable-alsoresize",{width:parseInt(f(this).width(),10),height:parseInt(f(this).height(),10),left:parseInt(f(this).css("left"),10),top:parseInt(f(this).css("top"),10)})
})};if(typeof(a.alsoResize)=="object"&&!a.alsoResize.parentNode){if(a.alsoResize.length){a.alsoResize=a.alsoResize[0];
_store(a.alsoResize)}else{f.each(a.alsoResize,function(j,g){_store(j)})}}else{_store(a.alsoResize)}},resize:function(n,l){var o=f(this).data("resizable"),c=o.options,m=o.originalSize,a=o.originalPosition;
var b={height:(o.size.height-m.height)||0,width:(o.size.width-m.width)||0,top:(o.position.top-a.top)||0,left:(o.position.left-a.left)||0},p=function(h,g){f(h).each(function(){var j=f(this),i=f(this).data("resizable-alsoresize"),k={},r=g&&g.length?g:["width","height","top","left"];
f.each(r||["width","height","top","left"],function(v,q){var u=(i[q]||0)+(b[q]||0);if(u&&u>=0){k[q]=u||null
}});if(/relative/.test(j.css("position"))&&f.browser.opera){o._revertToRelativePosition=true;j.css({position:"absolute",top:"auto",left:"auto"})
}j.css(k)})};if(typeof(c.alsoResize)=="object"&&!c.alsoResize.nodeType){f.each(c.alsoResize,function(h,g){p(h,g)
})}else{p(c.alsoResize)}},stop:function(b,a){var c=f(this).data("resizable");if(c._revertToRelativePosition&&f.browser.opera){c._revertToRelativePosition=false;
el.css({position:"relative"})}f(this).removeData("resizable-alsoresize-start")}});f.ui.plugin.add("resizable","animate",{stop:function(r,b){var a=f(this).data("resizable"),q=a.options;
var s=a._proportionallyResizeElements,v=s.length&&(/textarea/i).test(s[0].nodeName),u=v&&f.ui.hasScroll(s[0],"left")?0:a.sizeDiff.height,o=v?0:a.sizeDiff.width;
var t={width:(a.size.width-o),height:(a.size.height-u)},p=(parseInt(a.element.css("left"),10)+(a.position.left-a.originalPosition.left))||null,c=(parseInt(a.element.css("top"),10)+(a.position.top-a.originalPosition.top))||null;
a.element.animate(f.extend(t,c&&p?{top:c,left:p}:{}),{duration:q.animateDuration,easing:q.animateEasing,step:function(){var g={width:parseInt(a.element.css("width"),10),height:parseInt(a.element.css("height"),10),top:parseInt(a.element.css("top"),10),left:parseInt(a.element.css("left"),10)};
if(s&&s.length){f(s[0]).css({width:g.width,height:g.height})}a._updateCache(g);a._propagate("resize",r)
}})}});f.ui.plugin.add("resizable","containment",{start:function(z,b){var B=f(this).data("resizable"),v=B.options,t=B.element;
var y=v.containment,u=(y instanceof f)?y.get(0):(/parent/.test(y))?t.parent().get(0):y;if(!u){return}B.containerElement=f(u);
if(/document/.test(y)||y==document){B.containerOffset={left:0,top:0};B.containerPosition={left:0,top:0};
B.parentData={element:f(document),left:0,top:0,width:f(document).width(),height:f(document).height()||document.body.parentNode.scrollHeight}
}else{var o=f(u),w=[];f(["Top","Right","Left","Bottom"]).each(function(g,h){w[g]=d(o.css("padding"+h))
});B.containerOffset=o.offset();B.containerPosition=o.position();B.containerSize={height:(o.innerHeight()-w[3]),width:(o.innerWidth()-w[1])};
var c=B.containerOffset,A=B.containerSize.height,p=B.containerSize.width,x=(f.ui.hasScroll(u,"left")?u.scrollWidth:p),a=(f.ui.hasScroll(u)?u.scrollHeight:A);
B.parentData={element:u,left:c.left,top:c.top,width:x,height:a}}},resize:function(A,c){var D=f(this).data("resizable"),y=D.options,B=D.containerSize,o=D.containerOffset,u=D.size,t=D.position,b=D._aspectRatio||A.shiftKey,C={top:0,left:0},z=D.containerElement;
if(z[0]!=document&&(/static/).test(z.css("position"))){C=o}if(t.left<(D._helper?o.left:0)){D.size.width=D.size.width+(D._helper?(D.position.left-o.left):(D.position.left-C.left));
if(b){D.size.height=D.size.width/y.aspectRatio}D.position.left=y.helper?o.left:0}if(t.top<(D._helper?o.top:0)){D.size.height=D.size.height+(D._helper?(D.position.top-o.top):D.position.top);
if(b){D.size.width=D.size.height*y.aspectRatio}D.position.top=D._helper?o.top:0}D.offset.left=D.parentData.left+D.position.left;
D.offset.top=D.parentData.top+D.position.top;var v=Math.abs((D._helper?D.offset.left-C.left:(D.offset.left-C.left))+D.sizeDiff.width),a=Math.abs((D._helper?D.offset.top-C.top:(D.offset.top-o.top))+D.sizeDiff.height);
var w=D.containerElement.get(0)==D.element.parent().get(0),x=/relative|absolute/.test(D.containerElement.css("position"));
if(w&&x){v-=D.parentData.left}if(v+D.size.width>=D.parentData.width){D.size.width=D.parentData.width-v;
if(b){D.size.height=D.size.width/D.aspectRatio}}if(a+D.size.height>=D.parentData.height){D.size.height=D.parentData.height-a;
if(b){D.size.width=D.size.height*D.aspectRatio}}},stop:function(w,h){var b=f(this).data("resizable"),v=b.options,r=b.position,o=b.containerOffset,x=b.containerPosition,u=b.containerElement;
var t=f(b.helper),a=t.offset(),c=t.outerWidth()-b.sizeDiff.width,s=t.outerHeight()-b.sizeDiff.height;
if(b._helper&&!v.animate&&(/relative/).test(u.css("position"))){f(this).css({left:a.left-x.left-o.left,width:c,height:s})
}if(b._helper&&!v.animate&&(/static/).test(u.css("position"))){f(this).css({left:a.left-x.left-o.left,width:c,height:s})
}}});f.ui.plugin.add("resizable","ghost",{start:function(c,b){var j=f(this).data("resizable"),a=j.options,i=j.size;
j.ghost=j.originalElement.clone();j.ghost.css({opacity:0.25,display:"block",position:"relative",height:i.height,width:i.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof a.ghost=="string"?a.ghost:"");
j.ghost.appendTo(j.helper)},resize:function(c,b){var h=f(this).data("resizable"),a=h.options;if(h.ghost){h.ghost.css({position:"relative",height:h.size.height,width:h.size.width})
}},stop:function(c,b){var h=f(this).data("resizable"),a=h.options;if(h.ghost&&h.helper){h.helper.get(0).removeChild(h.ghost.get(0))
}}});f.ui.plugin.add("resizable","grid",{resize:function(v,c){var a=f(this).data("resizable"),s=a.options,p=a.size,r=a.originalSize,q=a.originalPosition,b=a.axis,o=s._aspectRatio||v.shiftKey;
s.grid=typeof s.grid=="number"?[s.grid,s.grid]:s.grid;var t=Math.round((p.width-r.width)/(s.grid[0]||1))*(s.grid[0]||1),u=Math.round((p.height-r.height)/(s.grid[1]||1))*(s.grid[1]||1);
if(/^(se|s|e)$/.test(b)){a.size.width=r.width+t;a.size.height=r.height+u}else{if(/^(ne)$/.test(b)){a.size.width=r.width+t;
a.size.height=r.height+u;a.position.top=q.top-u}else{if(/^(sw)$/.test(b)){a.size.width=r.width+t;a.size.height=r.height+u;
a.position.left=q.left-t}else{a.size.width=r.width+t;a.size.height=r.height+u;a.position.top=q.top-u;
a.position.left=q.left-t}}}}});var d=function(a){return parseInt(a,10)||0};var e=function(a){return !isNaN(parseInt(a,10))
}})(jQuery);(function(Z,ac){function aa(){}function I(a){ab=[a]}function R(a){Y.insertBefore(a,Y.firstChild)
}function S(a,c,b){return a&&a.apply(c.context||c,b)}function T(a){return/\?/.test(a)?"&":"?"}var Q="async",J="charset",M="",N="error",K="_jqjsp",F="on",P=F+"click",O=F+N,ad=F+"load",V=F+"readystatechange",C="removeChild",X="<script/>",G="success",D="timeout",E=Z.browser,Y=Z("head")[0]||document.documentElement,H={},U=0,ab,W={callback:K,url:location.href};
function L(b){b=Z.extend({},W,b);var d=b.complete,p=b.dataFilter,h=b.callbackParameter,c=b.callback,n=b.cache,k=b.pageCache,l=b.charset,a=b.url,i=b.data,e=b.timeout,f,j=0,m=aa;
b.abort=function(){!j++&&m()};if(S(b.beforeSend,b,[b])===false||j){return b}a=a||M;i=i?((typeof i)=="string"?i:Z.param(i,b.traditional)):M;
a+=i?(T(a)+i):M;h&&(a+=T(a)+encodeURIComponent(h)+"=?");!n&&!k&&(a+=T(a)+"_"+(new Date()).getTime()+"=");
a=a.replace(/=\?(&|$)/,"="+c+"$1");function g(q){!j++&&ac(function(){m();k&&(H[a]={s:[q]});p&&(q=p.apply(b,[q]));
S(b.success,b,[q,G]);S(d,b,[b,G])},0)}function o(q){!j++&&ac(function(){m();k&&q!=D&&(H[a]=q);S(b.error,b,[b,q]);
S(d,b,[b,q])},0)}k&&(f=H[a])?(f.s?g(f.s[0]):o(f)):ac(function(s,t,r){if(!j){r=e>0&&ac(function(){o(D)
},e);m=function(){r&&clearTimeout(r);s[V]=s[P]=s[ad]=s[O]=null;Y[C](s);t&&Y[C](t)};window[c]=I;s=Z(X)[0];
s.id=K+U++;if(l){s[J]=l}function q(u){(s[P]||aa)();u=ab;ab=undefined;u?g(u[0]):o(N)}if(E.msie){s.event=P;
s.htmlFor=s.id;s[V]=function(){/loaded|complete/.test(s.readyState)&&q()}}else{s[O]=s[ad]=q;E.opera?((t=Z(X)[0]).text="jQuery('#"+s.id+"')[0]."+O+"()"):s[Q]=Q
}s.src=a;R(s);t&&R(t)}},0);return b}L.setup=function(a){Z.extend(W,a)};Z.jsonp=L})(jQuery,setTimeout);
apsinth.msg.main_MessageDialog={close:"Close",save:"Save",cancel:"Cancel",abort:"No",discard:"Discard",reset:"Reset",ok:"OK"};
apsinth.msg.main_Error={requestError:"An error has occurred. Please try again later."};apsinth.lang="en_US";
var AjaxUtil=Klazz.extend({errorHandler:null,initialize:function(a){this.errorHandler=a},postRequest:function(a,c,d,b){this._executeRequest(true,a,c,this._handleAjaxSuccess,this._handleAjaxError,d,b)
},getRequest:function(a,c,d,b){this._executeRequest(false,a,c,this._handleAjaxSuccess,this._handleAjaxError,d,b)
},rpcRequest:function(b,g,e,f,c,a){var d={jsonrpc:"2.0",method:g,params:e,id:AjaxUtil.requestId++};this._executeRequest(true,b,d,this._handleAjaxRpcSuccess,this._handleAjaxError,f,c,a)
},evalJSON:function(text){try{return eval("("+text+")")}catch(exc){throw new Error("Parsing JSON failed - "+exc+"\n[[START]]"+text+"[[END]]")
}},_escape_unicode:function(a){a=a.replace(/\u0080/g,"&euro;");return a},_executeRequest:function(b,c,g,e,i,m,n,d){if(n){m=m.bind(n)
}var f=apsinth.util.ErrorUtil.wrap(e,this).curry(m);var h=apsinth.util.ErrorUtil.wrap(i,this).curry(m);
var l=null;var a=null;var j=null;if(b){var k=jQuery.toJSON(g);k=k.replace("#","\\u0023","g");a="post";
l=k;j="application/json"}else{a="get";l=g}jQuery.ajax({url:c,type:a,contentType:j,data:l,beforeSend:function(){},success:f,error:h})
},_handleResponse:function(d,b,c){try{if(b.html){b.html=this._escape_unicode(b.html)}d(b,c);if(c&&!c.handled){this._handleError(c)
}}catch(a){if(this.errorHandler){this.errorHandler(a)}}},_handleError:function(a){if(this.errorHandler){this.errorHandler(a)
}else{if(console){console.log(a)}}},_handleAjaxSuccess:function(e,d){if(e){var b;var c=null;try{b=this.evalJSON(d);
if(b.status!="OK"){c={httpCode:d.status,errors:b.errors,exception:b.exception,handled:false}}}catch(a){c={httpCode:d.status,errors:["Parsing JSON response from '"+d.url+"' failed:\n"+d,a],handled:false}
}this._handleResponse(e,b,c)}},_handleAjaxRpcSuccess:function(h,g){if(h){var c;var d=null;var b=null;
try{c=this.evalJSON(g);b=c.result;if((c.error&&c.error!="null")||(c.result instanceof Array&&c.result.status&&c.result.status!="OK")){var e=(c.error.data&&c.error.data.exception)?c.error.data.exception:null;
var f=(c.error&&c.error.message)?c.error.message:null;b=c;d={httpCode:g.status,errors:[f],exception:e,handled:false}
}}catch(a){d={httpCode:g.status,errors:["Parsing JSON response from '"+g.url+"' failed:\n"+g,a],handled:false}
}this._handleResponse(h,b,d)}},_handleAjaxError:function(c,b){if(c){var a={httpCode:b.status,errors:[b.statusText],handled:false};
this._handleResponse(c,null,a)}}});AjaxUtil.requestId=0;apsinth.util.EventingMixin={mixin:function(a){if(a._lstMap==null){a._lstMap={};
a.bind=this._onBind;a.unbind=this._onUnbind;a.trigger=this._onTrigger;a.toHandler=this.toHandler}},toHandler:function(b,a){if(a==null){a=this
}return function(d){try{if(d!=null&&d.target!=null&&d.originalEvent!=null&&d.currentTarget==null){d.currentTarget=this
}b.apply(a,arguments)}catch(c){apsinth.util.ErrorUtil.onError("Calling handler failed",c)}}},_onBind:function(c,b,a,d){if(c==null){throw new Error("type is null")
}if(b==null){throw new Error("handler is null")}var e=this._lstMap[c];if(e==null){e=this._lstMap[c]=[]
}e.push({handler:b,scope:a,data:d})},_onUnbind:function(f,e,d,g){var h=this._lstMap[f];var a=false;if(h!=null){for(var b=0;
b<h.length;b++){var c=h[b];if(c.handler==e&&c.scope==d&&c.data==g){h.splice(b,1);a=true;break}}}if(!a&&window.console){console.warn("Unbinding handler for "+f+" failed. Handler not found:",e)
}},_onTrigger:function(e,b){var f=this._lstMap[e];if(f!=null){for(var c=0;c<f.length;c++){var d=f[c];
try{d.handler.call(d.scope,b,d.data)}catch(a){apsinth.util.ErrorUtil.onError("Calling "+e+" handler failed",a)
}}}}};apsinth.util.Blocker=function(a){this._options=jQuery.extend({},this._defaultOptions,a)};var clazz=apsinth.util.Blocker;
var proto=clazz.prototype;proto._defaultOptions={visible:false,zIndex:1,onClick:null};proto.show=function(){this.flashContentPrepare();
var b=this._options;if(this._blockerJQ==null){this._blockerJQ=jQuery(document.createElement("div"));jQuery(document.body).append(this._blockerJQ);
this._blockerJQ.addClass("apsinth-blocker").css({zIndex:b.zIndex});if(b.onClick){this._blockerJQ.click(b.onClick)
}}var a;a=apsinth.util.DomUtil.getViewRect();if(apsinth.util.Browser.isIe6){this._positionBlockerPane(a);
jQuery(window).bind("resize scroll",this._getWindowResizeScrollHandler())}if(b.visible){this._blockerJQ.fadeTo(0,0).addClass("apsinth-blocker-visible").fadeTo("normal",0.2)
}else{this._blockerJQ.show()}this._showIe6Iframe(this._blockerJQ,a)};proto.hide=function(){this.flashContentUnprepare();
if(this._blockerJQ){var b=this._options;if(b.visible){var a=this;this._blockerJQ.fadeOut("normal",function(){if(a._blockerJQ){a._blockerJQ.remove();
a._blockerJQ=null}if(a._iframeFixJQ){a._iframeFixJQ.remove();a._iframeFixJQ=null}})}else{this._blockerJQ.remove();
this._blockerJQ=null;if(this._iframeFixJQ){this._iframeFixJQ.remove();this._iframeFixJQ=null}}if(apsinth.util.Browser.isIe6){jQuery(window).unbind("resize scroll",this._getWindowResizeScrollHandler())
}}};proto._showIe6Iframe=function(b,a){if(!this._iframeFixJQ){this._iframeFixJQ=jQuery('<iframe src="javascript:\'<html></html>\'" style="filter:alpha(opacity=0.0);">');
this._iframeFixJQ.addClass("apsinth-blocker").hide();this._iframeFixJQ.css({zIndex:b.css("zIndex")-1});
if(apsinth.util.Browser.isIe6){this._iframeFixJQ.css({position:"absolute"})}}this._positionIe6Iframe(a);
b.before(this._iframeFixJQ);this._iframeFixJQ.show()};proto._positionIe6Iframe=function(a){this._positionElementJQ(this._iframeFixJQ,a)
};proto._positionBlockerPane=function(a){this._positionElementJQ(this._blockerJQ,a)};proto._positionElementJQ=function(b,a){if(b){if(apsinth.util.Browser.isIe6){b.css({width:a.width,height:a.height,top:a.y,left:a.x})
}else{b.css({width:a.width,height:a.height,top:0,left:0})}}};proto._getWindowResizeScrollHandler=function(){if(!this._windowResizeScrollHandler){var a=this;
this._windowResizeScrollHandler=function(){var b=apsinth.util.DomUtil.getViewRect();a._positionIe6Iframe(b);
a._positionBlockerPane(b)}}return this._windowResizeScrollHandler};proto.flashContentPrepare=function(){for(var e=document.embeds,d=0,c;
c=e[d];d++){c.setAttribute("wmode","transparent");var a=c.nextSibling,b=c.parentNode;b.removeChild(c);
b.insertBefore(c,a)}};proto.flashContentUnprepare=function(){for(var e=document.embeds,d=0,c;c=e[d];d++){var f=c.getAttribute("wmode");
c.removeAttribute("wmode");var a=c.nextSibling,b=c.parentNode;b.removeChild(c);if(f){c.setAttribute("wmode",f)
}b.insertBefore(c,a)}};apsinth.util.DomUtil={placeInView:function(d,c,b){if(b==null){b=this.getViewRect()
}var a=c.x+c.width;var e=c.y+c.height;if((b.x+b.width)<(a+d.width)&&b.x<=(c.x-d.width)){a=c.x-d.width
}if((b.y+b.height)<(e+d.height)&&b.y<=(c.y-d.height)){e=c.y-d.height}return{x:Math.round(a),y:Math.round(e),width:d.width,height:d.height}
},getViewRect:function(){var b=jQuery(window);var a={x:b.scrollLeft(),y:b.scrollTop()};if(document.documentElement){a.width=document.documentElement.clientWidth;
a.height=document.documentElement.clientHeight}else{var c=jQuery(document.body);a.width=c.innerWidth();
a.height=c.innerHeight()}return a}};apsinth.util.ErrorUtil={onError:function(){var h="",b="";for(var d=0;
d<arguments.length;d++){var a=arguments[d];var c=null;if(a instanceof Error){b=a.stack;c=a.toString()
}else{if(typeof a=="string"){c=a.trim()}else{if(typeof a=="object"){c="";if(a.message){c+=a.message}else{if(a.errors&&a.errors.length>0){c+=a.errors.join("\n")
}}if(a.exception||(a.httpCode&&a.httpCode!=200)){c+="\n(See console for details)";if(console&&console.log){if(a.httpCode&&a.httpCode!=200){console.log("HTTP Code:"+a.httpCode)
}if(a.exception){console.log(a.exception)}}}}else{if(a){if(console&&console.log){console.log(a)}}}}}if(h.length>0&&c){h+="\n"
}if(c){h+=c}}var e=h;if(e.length==0){e="Error during request, see console"}if(!apsinth.debug){e=apsinth.msg.main_Error.requestError
}var f=(jQuery)?jQuery:(top.jQuery?top.jQuery:false);var g=function(i){if(console&&console.error){console.error(i)
}};if(f&&f(top.window).humanMsg){f(top.document).trigger("error.diy-editor",{message:h,stack:b});f(top.window).humanMsg(e.replace(/\n/gm,"<br/>"))
}g(h)},wrap:function(b,a){return function(){try{return b.apply(a||this,arguments)}catch(c){apsinth.util.ErrorUtil.onError(c)
}}}};apsinth.util.TextUtil={trim:function(a){return a.replace(/^\s+|\s+$/g,"")},escapeHTML:function(a){return a.replace(/<|>|&|"/gi,function(b){switch(b){case"<":return"&lt;";
case">":return"&gt;";case"&":return"&amp;";case'"':return"&quot;"}})},escapeRegexpChars:function(a){return a.replace(/([.*+?\^${}()|\[\]\/\\])/g,"\\$1")
}};apsinth.util.Layer=function(c,b){if(c==false){return}apsinth.util.EventingMixin.mixin(this);b=jQuery.extend({},this._defaultOptions,b);
this._usingUiDialog=b.usingUiDialog;if(c==null){c=jQuery(document.createElement("div"));this._autoCreatedMainJQ=true
}this._mainJQ=c;var d=b.zIndex;if(!this._usingUiDialog){if(d==null){d=b.isDialog?apsinth.util.Layer._zIndex.dialog:apsinth.util.Layer._zIndex.control
}c.css("z-index",d);var a={zIndex:d-1};if(b.visibleBlocker){a.visible=true;a.onClick=this.toHandler(this.shake)
}else{a.visible=false;a.onClick=this.toHandler(this.hide)}this._blocker=new apsinth.util.Blocker(a)}else{this._dlgClassName=b.dlgClassName||"diy_dialog";
this._dlg=c[this._dlgClassName](jQuery.extend({modal:b.visibleBlocker,autoOpen:false,resizable:false},b.dlgOptions))
}};var clazz=apsinth.util.Layer;var proto=clazz.prototype;clazz._zIndex={dialog:110,control:210};proto._defaultOptions={visibleBlocker:true,isDialog:true,usingUiDialog:false,dlgOptions:null};
proto._active=false;proto.getContent=function(){return this._mainJQ};proto.isActive=function(){return this._active
};proto.showBelow=function(e,d,c,a){var b=(d?e.outerWidth():null);if(c){b+=c}var f=e.offset();this.show(jQuery.extend({x:f.left,y:f.top+e.outerHeight(),width:b},a))
};proto.showAbove=function(d,c,f,a){var b=(c?d.innerWidth():null);var e=d.offset();this.show(jQuery.extend({x:e.left,y:e.top,width:b+f},a))
};proto.showLeftOf=function(c,b,a){var d=c.offset();this.show({x:d.left+b,y:d.top+a,alignRight:true})
};proto.show=function(l){l=jQuery.extend({x:0,y:0,centerX:false,centerY:false,alignRight:false,winWidthMargin:50,winHeightMargin:50,width:null,height:null,addParentWidth:false,addParentHeight:false,addWinWidth:false,addWinHeight:false,effect:"slide",minWidth:0,reposition:false,zIndex:null},l);
if(!this._usingUiDialog){this._blocker.show();if(this._autoCreatedMainJQ){jQuery(document.body).append(this._mainJQ)
}else{if(!l.reposition){this._mainJQ.show()}}this._mainJQ.addClass("apsinth-dialog")}else{if(this._autoCreatedMainJQ){}else{if(!l.reposition){this._mainJQ[this._dlgClassName]("open")
}}}var c=(document.documentElement?document.documentElement.clientWidth:window.innerWidth);var d=(document.documentElement?document.documentElement.clientHeight:window.innerHeight);
var a=l.width;if(l.addParentWidth){a+=this._mainJQ.parent().width()}if(l.addWinWidth){a+=c-l.winWidthMargin
}if(a!=null){a=Math.max(a,l.minWidth)}var i=l.height;if(l.addParentHeight){i+=this._mainJQ.parent().height()
}if(l.addWinHeight){i+=d-l.winHeightMargin}var b=this._mainJQ.find("img.origImg").prop("complete");if(this._mainJQ.find("img.origImg").length>0&&!b){this.options=l;
var j=this;window.setTimeout(function(){j.show(j.options)},1000);return}var h=l.x;if(l.alignRight){h-=this._mainJQ.width()
}else{if(l.centerX){h+=(c-(a?a:this._mainJQ.width()))/2}}var g=l.y;if(l.centerY){g+=this.getScrollTop()+(d-(i?i:this._mainJQ.height()))/2
}var e=[Math.round(h)+"px",Math.round(g)+"px"];if(!this._usingUiDialog){this._mainJQ.css({left:e[0],top:e[1]})
}else{this._mainJQ[this._dlgClassName]("option","position",e)}var k={};if(a!=null){k.width=Math.round(a)+"px"
}if(i!=null){k.height=Math.round(i)+"px"}if(!this._usingUiDialog){this._mainJQ.css(k)}else{this._mainJQ[this._dlgClassName]("option",k)
}if(l.zIndex!==null){if(!this._usingUiDialog){this._mainJQ.css("zIndex",l.zIndex)}else{this._mainJQ[this._dlgClassName]("option","zIndex",l.zIndex)
}}var j=this;var f=function(){j._active=true};if(jQuery(document.body).hasClass("facebookTab")&&typeof FB!="undefined"&&typeof FB.Canvas!="undefined"&&typeof FB.Canvas.getPageInfo=="function"){var j=this;
FB.Canvas.getPageInfo(function(m){var n;if(l.centerY){g=l.y+m.scrollTop-m.offsetTop+(m.clientHeight-(i?i:j._mainJQ.height()))/2;
n=Math.round(g)+"px"}j._mainJQ.css("top",n);j.scrollIntoView();if(!j._usingUiDialog){if(l.effect=="slide"){j._mainJQ.slideUp(0).slideDown(undefined,f)
}else{if(l.effect=="fade"){j._mainJQ.fadeOut(0).fadeIn(undefined,f)}else{j._mainJQ.show();f()}}}else{j._mainJQ[this._dlgClassName]("open");
f()}jQuery(j).trigger("showLayer")});return}this.scrollIntoView();if(!this._usingUiDialog){if(l.effect=="slide"){this._mainJQ.slideUp(0).slideDown(undefined,f)
}else{if(l.effect=="fade"){this._mainJQ.fadeOut(0).fadeIn(undefined,f)}else{this._mainJQ.show();f()}}}else{this._mainJQ[this._dlgClassName]("open");
f()}jQuery(this).trigger("showLayer")};proto.scrollIntoView=function(){var f=this._mainJQ.offset().top;
var a=this._mainJQ.outerHeight();var c=this.getScrollTop();var b=window.document.body.clientHeight||window.innerHeight;
var e=10;var d=c;if(f+a+e>d+b){d=f+a+e-b}if(f-e<d){d=f-e}if(d!=c){window.scrollTo(0,d)}};proto.getScrollTop=function(){return window.pageYOffset||window.document.body.scrollTop||window.document.documentElement.scrollTop
};proto.hide=function(){this._active=false;var a=this;if(!this._usingUiDialog){this._blocker.hide();this._mainJQ.slideUp(undefined,jQuery.proxy(this.doHide,this))
}else{this.doHide()}jQuery(this).trigger("hideLayer")};proto.doHide=function(){if(this._autoCreatedMainJQ){this._mainJQ.remove()
}else{if(!this._usingUiDialog){this._mainJQ.hide()}else{this._mainJQ[this._dlgClassName]("close")}}};
proto.shake=function(){if(this._usingUiDialog){return}if(this._shaking){return}this.scrollIntoView();
var b=20;var d=100;var a=this;var c=function(){a._shaking=false};this._shaking=true;this._mainJQ.animate({left:"-="+b+"px"},d).animate({left:"+="+(2*b)+"px"},d).animate({left:"-="+(2*b)+"px"},d).animate({left:"+="+b+"px"},d,undefined,c)
};proto.destroy=function(){if(this._usingUiDialog){this._mainJQ.remove()}};apsinth.util.Tabs=function(d,a){a=a||".tabnav";
this.tabParentJQ=d;var c=this;var e=d.find(a+" li > a");var b=jQuery(e[0]).attr("href");this.selectedTab=b.substr(b.indexOf("#")+1);
e.click(function(f){f.preventDefault();e.each(function(){var i=jQuery(this);apsinth.util.Tabs.setButtonStyle(false,i,d);
c._paneForBtn(i).hide()});var k=jQuery(this);apsinth.util.Tabs.setButtonStyle(true,k,d);var g=c._paneForBtn(k).show();
var j=k.attr("href");c.selectedTab=j.substr(j.indexOf("#")+1);if(c._tabChangedLstArr){for(var h=0;h<c._tabChangedLstArr.length;
h++){c._tabChangedLstArr[h].listener.call(c._tabChangedLstArr[h].context,g)}}}).each(function(f){var g=jQuery(this);
if(f==0){apsinth.util.Tabs.setButtonStyle(true,g,d)}else{c._paneForBtn(g).hide()}})};var clazz=apsinth.util.Tabs;
var proto=clazz.prototype;clazz.setButtonStyle=function(b,d,c){var a=b?"1px solid "+c.css("backgroundColor"):"";
d.css({borderBottom:a})};proto._paneForBtn=function(b){var a=b.attr("href");return this.tabParentJQ.find("."+a.substr(a.indexOf("#")+1))
};proto.bindTabChanged=function(a,b){b=b||this;if(this._tabChangedLstArr==null){this._tabChangedLstArr=[]
}this._tabChangedLstArr.push({listener:a,context:b})};apsinth.util.Browser={isIe:/MSIE/i.test(navigator.userAgent),isIe6:/MSIE 6/i.test(navigator.userAgent)};
apsinth.ApsinthModule=Klazz.extend(Modul,{CONFIG_MIN_WIDTH:550,proxy:null,static_proxy:null,handler_proxy:null,view_proxy:null,configSaveHandler:"config",mainView:"main",data_web:null,data_admin:null,configIsOpen:false,appendError:false,errorTarget:"auto",fieldErrorsTarget:"auto",loadMainViewAfterSave:true,ajaxUtil:null,initialize:function(e,d,b,g){try{apsinth.util.EventingMixin.mixin(this);
this.instance_id=d;this.module_name=b;this.mode=g;this.internalContainerId="NGH"+e;this.idPrefix=this.internalContainerId;
var f=window["__NGHModuleInstanceData"+e];this.moduleServer=f.server;this.data_web=f.data_web;this.data_admin=f.data_admin;
var c;if(window.webserverProtocol){c=window.webserverProtocol=="https://"?sslServerUrl:""}else{c=systemurl.slice(0,-1)
}this.proxy=c+"/proxy";this.static_proxy=this.proxy+"/static";this.handler_proxy=this.proxy+"/handler";
this.view_proxy=this.proxy+"/view";this._super(e);this.bind("open-config",this._setMinWidthStyles,this);
this.bind("close-config",this._removeMinWidthStyles,this);this.ajaxUtil=new AjaxUtil(this.toHandler(this.onError))
}catch(a){apsinth.util.ErrorUtil.onError(a)}},initView_main:function(){(apsinth.util.ErrorUtil.wrap(this._initMainView,this))()
},initView_config:function(){(apsinth.util.ErrorUtil.wrap(this._initConfigView,this))();this._initDefaultInputValues()
},_initMainView:function(){},_initConfigView:function(){},getMainJQ:function(){var a=jQuery("#modul_"+this.moduleId+"_content");
if(!a.length){return jQuery("#modul_"+this.moduleId)}else{return a}},getConfigJQ:function(){return jQuery("#modul_"+this.moduleId+"_config")
},getBasisId:function(){return window.script_basisID},replaceInternalLinks:function(b){var a=new RegExp('href\\s*=\\s*"http://page-(\\d+)/"',"g");
return b.replace(a,'href="/app/'+this.getBasisId()+'/$1"')},getFilesUrl:function(a,b){if(typeof b=="undefined"){b=this.module_name
}return this.proxy+"/static/mod/"+b+"/files/"+a},getUploadUrl:function(d){if(typeof d=="undefined"){d=this.module_name
}var c=this.getBasisId();var b=(new Array(9-c.length+1).join("0")+c);var a=(window.webserverProtocol&&(window.webserverProtocol=="https://")?window.sslServerUrl:"")+"/remotemodules/";
if(this.mode=="admin"){a+=b.substr(0,3)+"/"+b.substr(3,3)+"/"+b.substr(6,3)+"/"}a+=d+"/"+this.instance_id;
return a},getHandlerUrl:function(c,b){var a=this.handler_proxy+"?mod.module="+this.module_name+"&mod.handler="+c+"&mod.instance_id="+this.instance_id+(this.mode=="admin"?"&mod.admin=1":"")+"&mod.locale="+apsinth.lang;
return this.buildUrl(a,b)},getViewUrl:function(a,c){var b=this.view_proxy+"?mod.module="+this.module_name+"&mod.view="+a+"&mod.instance_id="+this.instance_id+"&mod.externalModuleId="+this.moduleId+(this.mode=="admin"?"&mod.admin=1":"")+"&mod.locale="+apsinth.lang;
return this.buildUrl(b,c)},buildUrl:function(b,a){if(typeof a=="object"){jQuery.each(a,function(c,d){b+="&"+encodeURIComponent(c)+"="+encodeURIComponent(d)
})}return b},getView:function(a,b,d,c){this.ajaxUtil.getRequest(this.getViewUrl(a),b,d,c)},callRpc:function(c,a,e,b){var d=this.module_name+"."+c;
if(!a){a={}}a["mod.instance_id"]=this.instance_id;a["mod.locale"]=apsinth.lang;a["mod.externalModuleId"]=this.moduleId;
if(this.mode=="admin"){a["mod.admin"]=1;if(mm[this.moduleId] instanceof Modul){a._diyNewlyAdded=mm[this.moduleId].getIsNew()?1:0
}}this.ajaxUtil.rpcRequest(this.proxy+"/rpc/",d,a,e,b)},sendData:function(b,c,d,a){this.ajaxUtil.postRequest(this.getHandlerUrl(b),c,d,a)
},onError:function(b,a){apsinth.util.ErrorUtil.onError(b,a)},save:apsinth.util.ErrorUtil.wrap(function(){jQuery(".error-msg").hide();
this._removeDefaultInputValues();if(!this.validateConfig()){this._initDefaultInputValues();return}var a={data:this.getConfigData(),mod_saveEdit:1};
this._initDefaultInputValues();var b="private."+this.configSaveHandler;this.callRpc(b,a,this.toHandler(this.onConfigSaved),this)
}),onConfigSaved:function(c,b){if(b){this.onConfigSaveFailed(b)}else{if((c.status==="FAIL")&&(c.errors)){this.onValidationFailed(c)
}else{this.close(false,false,undefined,true);if(this.loadMainViewAfterSave){this.showLoading();var a=this;
this.reloadMainView(null,function(){a.hideLoading()})}jQuery(document).trigger("diy-editor-module-saved",this.moduleId)
}}},getDiyForm:function(){var a=this.getConfigJQ().find("form");if(!a.is(":diy-form")){a.diy_form({appendMessage:this.appendError,messageTarget:this.errorTarget})
}return a},clearErrors:function(){this.getDiyForm().diy_form("clearErrors")},onValidationFailed:function(c){var b=this.getDiyForm(),a=this;
b.diy_form("clearErrors");jQuery.each(c.errors,function(d,h){var f=[];jQuery.each(h,function(e,i){f.push(i)
});f=f.join("<br/>");var g=b.find('input[name="'+d+'"]');if(g.length>0){if(g.attr("type")=="text"&&!g.is(":diy-formField")){g.diy_textField()
}if(a.fieldErrorsTarget=="auto"||a.fieldErrorsTarget=="field"||a.fieldErrorsTarget=="both"){b.diy_form("addError",f,g)
}}else{if(a.fieldErrorsTarget=="auto"){b.diy_form("addError",f)}}if(a.fieldErrorsTarget=="general"||a.fieldErrorsTarget=="both"){b.diy_form("addError",f)
}})},onConfigSaveFailed:function(c){var g="";var j=[];var a=[];if(c.errors instanceof Array){for(var d=0,f=c.errors.length;
d<f;d++){var h=c.errors[d];if(h instanceof Object&&h.field){a.push(h)}else{j.push(h)}}var b="";if(a&&a instanceof Array&&a.length>0){b="\n<br/> - User-side errors:\n<br/>";
for(var d=0,f=a.length;d<f;d++){b+=" "+a[d].message+"\n<br/>"}}g=" - Server-side error:\n"+j.join("\n")+b
}if(c.httpCode!=200){g+="\nHTTP Code: "+c.httpCode}if(c.exception){console.log(c.exception)}if(a.length>0&&this.getConfigJQ().find(".x-error-msg").size()>0){this._handleUserErrors(a)
}else{apsinth.util.ErrorUtil.onError("Saving config failed"+g)}c.handled=true},_handleUserErrors:function(e){if(!e&&!(e instanceof Object)){return
}var d=this.getConfigJQ();if(d.find(".x-error-msg").size()>0){var c="<ul>";for(var a=0,b=e.length;a<b;
a++){c+="<li>"+e[a].message+"</li>"}c+="</ul>";d.find(".x-error-msg").html(c).hide();d.find(".x-error-msg").html(c).fadeIn("100")
}},reloadMainView:function(b,d,c){var a=this;var e="public.view"+a.mainView.substring(0,1).toUpperCase()+a.mainView.substr(1);
this.callRpc(e,b,function(f,g){if(g){if(g.errors&&g.errors instanceof Array&&g.errors.length>0){a.onError(g.errors.join("\n"))
}}else{if(d){d(f)}}if(f.html){a.getMainJQ().html(f.html);a.getMainJQ().trigger("contentUpdated");a.initView_main();
if(c){c()}}})},open:apsinth.util.ErrorUtil.wrap(function(){if(typeof(Modul.prototype.open)==="function"){Modul.prototype.open.apply(this,arguments)
}if(!this.configIsOpen&&this.hasConfigView){this.trigger("open-config",this);this.configIsOpen=true}}),close:apsinth.util.ErrorUtil.wrap(function(){if(typeof(Modul.prototype.close)==="function"){Modul.prototype.close.apply(this,arguments)
}this.clearErrors();this.trigger("close-config",this);this.configIsOpen=false}),validateConfig:function(){return true
},getConfigData:function(){return null},_iFrameJQ:null,_iFrame:function(d){var b=null;if(this._iFrameJQ===null){var a=this;
b="ewoao"+Math.floor(Math.random()*123456);var f=a.getConfigJQ();var e=null;if(jQuery.browser.msie){e=jQuery('<iframe src="about:blank" id="'+b+'" name="'+b+'" style="display: none;" />')
}else{var c=document.createElement("iframe");c.setAttribute("style","display:none");c.setAttribute("id",b);
c.setAttribute("name",b);e=jQuery(c)}e.load((function(){var g=Array.prototype.slice.call(arguments,0);
g=g.concat([d]);return a.loaded.apply(a,g)}));f.append(e);this._iFrameJQ=e}else{b=this._iFrameJQ.attr("name")
}return b},upload:apsinth.util.ErrorUtil.wrap(function(d,c){d=jQuery(d);var a=this;var e=d.find("input[type=file]:first");
var b=a._iFrame(d);if(e.val()===""){return false}d.attr("action",a.getHandlerUrl(c));d.attr("target",b);
if(typeof(a.uploadStart)=="function"){return a.uploadStart()}else{return true}}),loaded:function(f,e){var d=f.currentTarget;
var b=this;var h=null;if(d.contentDocument){h=d.contentDocument}else{if(d.contentWindow){h=d.contentWindow.document
}else{h=window.frames[id].document}}contentJQ=jQuery(h);try{var c=contentJQ.contents().find("body").html();
if(c!=""){response=jQuery.evalJSON(c);if(response.status&&response.status!="OK"){var g={errors:(response.errors?response.errors:null)};
e.trigger("uploadError");b._uploadError(g)}else{if(typeof(b.uploadComplete)=="function"){e.trigger("uploadSuccess");
b.uploadComplete(response)}}}}catch(a){b._uploadError(a)}},_uploadError:function(a){if(typeof(this.uploadError)=="function"){this.uploadError(a)
}else{var b=apsinth.msg.conf_Upload.uploadError;if(a&&a.errors&&a.errors instanceof Array&&a.errors.length>0){b+=":\n";
b+=a.errors.join("\n")}this.onError(b)}},uploadComplete:function(a){},uploadStart:function(){},_setMinWidthStyles:function(){var a=this.getConfigJQ();
if(a.width()<this.CONFIG_MIN_WIDTH){this._minWidthSet=true;a.css({width:this.CONFIG_MIN_WIDTH});this.trigger("width-adjusted")
}else{if(a.width()==this.CONFIG_MIN_WIDTH){a.css("width","auto")}}},_removeMinWidthStyles:function(){if(this._minWidthSet){this._minWidthSet=false;
var b=this.getConfigJQ();b.css("width","auto");if(this._moduleElPosition){var a=jQuery("#modul_"+this.moduleId);
a.css("position",this._moduleElPosition);a.css("z-index","")}this.getMainJQ().css("backgroundColor","transparent")
}},_initDefaultInputValues:function(b){var b=b||this.getConfigJQ();var a=b.find("input[data-default-value]");
a.each(function(e,d){var g=(d===document.activeElement&&(d.type||d.href));d=jQuery(d);var f=d.val();var c=d.attr("data-default-value");
if((f==""||f==null||f=="null")&&c!=""){if(!g){d.addClass("apsinth-default-value");d.val(c)}d.bind("change.defaultValues",function(k){var i=jQuery(k.currentTarget);
var j=i.val();var h=i.attr("data-default-value");if(h){if(j==""){i.addClass("apsinth-default-value");
i.val(h)}else{if(j!=h){i.removeClass("apsinth-default-value")}}}});d.bind("focus.defaultValues",function(k){var i=jQuery(k.currentTarget);
var j=i.val();var h=i.attr("data-default-value");if(h&&j==h){i.val("");i.removeClass("apsinth-default-value")
}});d.bind("blur.defaultValues",function(k){var i=jQuery(k.currentTarget);var j=i.val();var h=i.attr("data-default-value");
if(h&&j==""){i.addClass("apsinth-default-value");i.val(h)}})}})},_removeDefaultInputValues:function(){var b=this.getConfigJQ();
var a=b.find("input[data-default-value]");a.each(function(e,d){d=jQuery(d);var f=d.val();var c=d.attr("data-default-value");
if(c&&f==c&&d.hasClass("apsinth-default-value")){d.removeClass("apsinth-default-value");d.val("");d.unbind("change.defaultValues");
d.unbind("focus.defaultValues");d.unbind("blur.defaultValues")}})}});(function($){$.extend($.ui,{datepicker16:{version:"1.6"}});
var PROP_NAME="datepicker16";function Datepicker(){this.debug=false;this._curInst=null;this._keyEvent=false;
this._disabledInputs=[];this._datepickerShowing=false;this._inDialog=false;this._mainDivId="ui-datepicker16-div";
this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";this._triggerClass="ui-datepicker-trigger";
this._dialogClass="ui-datepicker-dialog";this._promptClass="ui-datepicker-prompt";this._disableClass="ui-datepicker-disabled";
this._unselectableClass="ui-datepicker-unselectable";this._currentClass="ui-datepicker-current-day";this._dayOverClass="ui-datepicker-days-cell-over";
this._weekOverClass="ui-datepicker-week-over";this.regional=[];this.regional[""]={clearText:"Clear",clearStatus:"Erase the current date",closeText:"Close",closeStatus:"Close without change",prevText:"&#x3c;Prev",prevStatus:"Show the previous month",prevBigText:"&#x3c;&#x3c;",prevBigStatus:"Show the previous year",nextText:"Next&#x3e;",nextStatus:"Show the next month",nextBigText:"&#x3e;&#x3e;",nextBigStatus:"Show the next year",currentText:"Today",currentStatus:"Show the current month",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],monthStatus:"Show a different month",yearStatus:"Show a different year",weekHeader:"Wk",weekStatus:"Week of the year",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],dayStatus:"Set DD as first week day",dateStatus:"Select DD, M d",dateFormat:"mm/dd/yy",firstDay:0,initStatus:"Select a date",isRTL:false};
this._defaults={showOn:"focus",showAnim:"show",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,closeAtTop:true,mandatory:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,showBigPrevNext:false,gotoCurrent:false,changeMonth:true,changeYear:true,showMonthAfterYear:false,yearRange:"-10:+10",changeFirstDay:true,highlightWeek:false,showOtherMonths:false,showWeeks:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",showStatus:false,statusForDate:this.dateStatus,minDate:null,maxDate:null,duration:"normal",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,rangeSelect:false,rangeSeparator:" - ",altField:"",altFormat:"",constrainInput:true};
$.extend(this._defaults,this.regional[""]);this.dpDiv=$('<div id="'+this._mainDivId+'" style="display: none;"></div>')
}$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",log:function(){if(this.debug){console.log.apply("",arguments)
}},setDefaults:function(settings){extendRemove(this._defaults,settings||{});return this},_attachDatepicker:function(target,settings){var inlineSettings=null;
for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};
try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase();
var inline=(nodeName=="div"||nodeName=="span");if(!target.id){target.id="dp"+(++this.uuid)}var inst=this._newInst($(target),inline);
inst.settings=$.extend({},settings||{},inlineSettings||{});if(nodeName=="input"){this._connectDatepicker(target,inst)
}else{if(inline){this._inlineDatepicker(target,inst)}}},_newInst:function(target,inline){var id=target[0].id.replace(/([:\[\]\.])/g,"\\\\$1");
return{id:id,input:target,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:inline,dpDiv:(!inline?this.dpDiv:$('<div class="'+this._inlineClass+'"></div>'))}
},_connectDatepicker:function(target,inst){var input=$(target);if(input.hasClass(this.markerClassName)){return
}var appendText=this._get(inst,"appendText");var isRTL=this._get(inst,"isRTL");if(appendText){input[isRTL?"before":"after"]('<span class="'+this._appendClass+'">'+appendText+"</span>")
}var showOn=this._get(inst,"showOn");if(showOn=="focus"||showOn=="both"){input.focus(this._showDatepicker)
}if(showOn=="button"||showOn=="both"){var buttonText=this._get(inst,"buttonText");var buttonImage=this._get(inst,"buttonImage");
var trigger=$(this._get(inst,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:buttonImage,alt:buttonText,title:buttonText}):$('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage==""?buttonText:$("<img/>").attr({src:buttonImage,alt:buttonText,title:buttonText})));
input[isRTL?"before":"after"](trigger);trigger.click(function(){if($.datepicker16._datepickerShowing&&$.datepicker16._lastInput==target){$.datepicker16._hideDatepicker()
}else{$.datepicker16._showDatepicker(target)}return false})}input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).bind("setData.datepicker16",function(event,key,value){inst.settings[key]=value
}).bind("getData.datepicker16",function(event,key){return this._get(inst,key)});$.data(target,PROP_NAME,inst)
},_inlineDatepicker:function(target,inst){var divSpan=$(target);if(divSpan.hasClass(this.markerClassName)){return
}divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker16",function(event,key,value){inst.settings[key]=value
}).bind("getData.datepicker16",function(event,key){return this._get(inst,key)});$.data(target,PROP_NAME,inst);
this._setDate(inst,this._getDefaultDate(inst));this._updateDatepicker(inst);this._updateAlternate(inst)
},_dialogDatepicker:function(input,dateText,onSelect,settings,pos){var inst=this._dialogInst;if(!inst){var id="dp"+(++this.uuid);
this._dialogInput=$('<input type="text" id="'+id+'" size="1" style="position: absolute; top: -100px;"/>');
this._dialogInput.keydown(this._doKeyDown);$("body").append(this._dialogInput);inst=this._dialogInst=this._newInst(this._dialogInput,false);
inst.settings={};$.data(this._dialogInput[0],PROP_NAME,inst)}extendRemove(inst.settings,settings||{});
this._dialogInput.val(dateText);this._pos=(pos?(pos.length?pos:[pos.pageX,pos.pageY]):null);if(!this._pos){var browserWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
var browserHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;var scrollY=document.documentElement.scrollTop||document.body.scrollTop;
this._pos=[(browserWidth/2)-100+scrollX,(browserHeight/2)-150+scrollY]}this._dialogInput.css("left",this._pos[0]+"px").css("top",this._pos[1]+"px");
inst.settings.onSelect=onSelect;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);this._showDatepicker(this._dialogInput[0]);
if($.blockUI){$.blockUI(this.dpDiv)}$.data(this._dialogInput[0],PROP_NAME,inst);return this},_destroyDatepicker:function(target){var $target=$(target);
if(!$target.hasClass(this.markerClassName)){return}var nodeName=target.nodeName.toLowerCase();$.removeData(target,PROP_NAME);
if(nodeName=="input"){$target.siblings("."+this._appendClass).remove().end().siblings("."+this._triggerClass).remove().end().removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress)
}else{if(nodeName=="div"||nodeName=="span"){$target.removeClass(this.markerClassName).empty()}}},_enableDatepicker:function(target){var $target=$(target);
if(!$target.hasClass(this.markerClassName)){return}var nodeName=target.nodeName.toLowerCase();if(nodeName=="input"){target.disabled=false;
$target.siblings("button."+this._triggerClass).each(function(){this.disabled=false}).end().siblings("img."+this._triggerClass).css({opacity:"1.0",cursor:""})
}else{if(nodeName=="div"||nodeName=="span"){$target.children("."+this._disableClass).remove()}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)
})},_disableDatepicker:function(target){var $target=$(target);if(!$target.hasClass(this.markerClassName)){return
}var nodeName=target.nodeName.toLowerCase();if(nodeName=="input"){target.disabled=true;$target.siblings("button."+this._triggerClass).each(function(){this.disabled=true
}).end().siblings("img."+this._triggerClass).css({opacity:"0.5",cursor:"default"})}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);
var offset=inline.offset();var relOffset={left:0,top:0};inline.parents().each(function(){if($(this).css("position")=="relative"){relOffset=$(this).offset();
return false}});$target.prepend('<div class="'+this._disableClass+'" style="'+($.browser.msie?"background-color: transparent; ":"")+"width: "+inline.width()+"px; height: "+inline.height()+"px; left: "+(offset.left-relOffset.left)+"px; top: "+(offset.top-relOffset.top)+'px;"></div>')
}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)});
this._disabledInputs[this._disabledInputs.length]=target},_isDisabledDatepicker:function(target){if(!target){return false
}for(var i=0;i<this._disabledInputs.length;i++){if(this._disabledInputs[i]==target){return true}}return false
},_getInst:function(target){try{return $.data(target,PROP_NAME)}catch(err){throw"Missing instance data for this datepicker"
}},_optionDatepicker:function(target,name,value){var settings=name||{};if(typeof name=="string"){settings={};
settings[name]=value}var inst=this._getInst(target);if(inst){if(this._curInst==inst){this._hideDatepicker(null)
}extendRemove(inst.settings,settings);var date=new Date();extendRemove(inst,{rangeStart:null,endDay:null,endMonth:null,endYear:null,selectedDay:date.getDate(),selectedMonth:date.getMonth(),selectedYear:date.getFullYear(),currentDay:date.getDate(),currentMonth:date.getMonth(),currentYear:date.getFullYear(),drawMonth:date.getMonth(),drawYear:date.getFullYear()});
this._updateDatepicker(inst)}},_changeDatepicker:function(target,name,value){this._optionDatepicker(target,name,value)
},_refreshDatepicker:function(target){var inst=this._getInst(target);if(inst){this._updateDatepicker(inst)
}},_setDateDatepicker:function(target,date,endDate){var inst=this._getInst(target);if(inst){this._setDate(inst,date,endDate);
this._updateDatepicker(inst);this._updateAlternate(inst)}},_getDateDatepicker:function(target){var inst=this._getInst(target);
if(inst&&!inst.inline){this._setDateFromField(inst)}return(inst?this._getDate(inst):null)},_doKeyDown:function(event){var inst=$.datepicker16._getInst(event.target);
var handled=true;inst._keyEvent=true;if($.datepicker16._datepickerShowing){switch(event.keyCode){case 9:$.datepicker16._hideDatepicker(null,"");
break;case 13:var sel=$("td."+$.datepicker16._dayOverClass+", td."+$.datepicker16._currentClass,inst.dpDiv);
if(sel[0]){$.datepicker16._selectDay(event.target,inst.selectedMonth,inst.selectedYear,sel[0])}else{$.datepicker16._hideDatepicker(null,$.datepicker16._get(inst,"duration"))
}return false;break;case 27:$.datepicker16._hideDatepicker(null,$.datepicker16._get(inst,"duration"));
break;case 33:$.datepicker16._adjustDate(event.target,(event.ctrlKey?-$.datepicker16._get(inst,"stepBigMonths"):-$.datepicker16._get(inst,"stepMonths")),"M");
break;case 34:$.datepicker16._adjustDate(event.target,(event.ctrlKey?+$.datepicker16._get(inst,"stepBigMonths"):+$.datepicker16._get(inst,"stepMonths")),"M");
break;case 35:if(event.ctrlKey||event.metaKey){$.datepicker16._clearDate(event.target)}handled=event.ctrlKey||event.metaKey;
break;case 36:if(event.ctrlKey||event.metaKey){$.datepicker16._gotoToday(event.target)}handled=event.ctrlKey||event.metaKey;
break;case 37:if(event.ctrlKey||event.metaKey){$.datepicker16._adjustDate(event.target,-1,"D")}handled=event.ctrlKey||event.metaKey;
if(event.originalEvent.altKey){$.datepicker16._adjustDate(event.target,(event.ctrlKey?-$.datepicker16._get(inst,"stepBigMonths"):-$.datepicker16._get(inst,"stepMonths")),"M")
}break;case 38:if(event.ctrlKey||event.metaKey){$.datepicker16._adjustDate(event.target,-7,"D")}handled=event.ctrlKey||event.metaKey;
break;case 39:if(event.ctrlKey||event.metaKey){$.datepicker16._adjustDate(event.target,+1,"D")}handled=event.ctrlKey||event.metaKey;
if(event.originalEvent.altKey){$.datepicker16._adjustDate(event.target,(event.ctrlKey?+$.datepicker16._get(inst,"stepBigMonths"):+$.datepicker16._get(inst,"stepMonths")),"M")
}break;case 40:if(event.ctrlKey||event.metaKey){$.datepicker16._adjustDate(event.target,+7,"D")}handled=event.ctrlKey||event.metaKey;
break;default:handled=false}}else{if(event.keyCode==36&&event.ctrlKey){$.datepicker16._showDatepicker(this)
}else{handled=false}}if(handled){event.preventDefault();event.stopPropagation()}},_doKeyPress:function(event){var inst=$.datepicker16._getInst(event.target);
if($.datepicker16._get(inst,"constrainInput")){var chars=$.datepicker16._possibleChars($.datepicker16._get(inst,"dateFormat"));
var chr=String.fromCharCode(event.charCode==undefined?event.keyCode:event.charCode);return event.ctrlKey||(chr<" "||!chars||chars.indexOf(chr)>-1)
}},_showDatepicker:function(input){input=input.target||input;if(input.nodeName.toLowerCase()!="input"){input=$("input",input.parentNode)[0]
}if($.datepicker16._isDisabledDatepicker(input)||$.datepicker16._lastInput==input){return}var inst=$.datepicker16._getInst(input);
var beforeShow=$.datepicker16._get(inst,"beforeShow");extendRemove(inst.settings,(beforeShow?beforeShow.apply(input,[input,inst]):{}));
$.datepicker16._hideDatepicker(null,"");$.datepicker16._lastInput=input;$.datepicker16._setDateFromField(inst);
if($.datepicker16._inDialog){input.value=""}if(!$.datepicker16._pos){$.datepicker16._pos=$.datepicker16._findPos(input);
$.datepicker16._pos[1]+=input.offsetHeight}var isFixed=false;$(input).parents().each(function(){isFixed|=$(this).css("position")=="fixed";
return !isFixed});if(isFixed&&$.browser.opera){$.datepicker16._pos[0]-=document.documentElement.scrollLeft;
$.datepicker16._pos[1]-=document.documentElement.scrollTop}var offset={left:$.datepicker16._pos[0],top:$.datepicker16._pos[1]};
$.datepicker16._pos=null;inst.rangeStart=null;inst.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});
$.datepicker16._updateDatepicker(inst);inst.dpDiv.width($.datepicker16._getNumberOfMonths(inst)[1]*$(".ui-datepicker",inst.dpDiv[0])[0].offsetWidth);
offset=$.datepicker16._checkOffset(inst,offset,isFixed);inst.dpDiv.css({position:($.datepicker16._inDialog&&$.blockUI?"static":(isFixed?"fixed":"absolute")),display:"none",left:offset.left+"px",top:offset.top+"px"});
if(!inst.inline){var showAnim=$.datepicker16._get(inst,"showAnim")||"show";var duration=$.datepicker16._get(inst,"duration");
var postProcess=function(){$.datepicker16._datepickerShowing=true;if($.browser.msie&&parseInt($.browser.version,10)<7){$("iframe.ui-datepicker-cover").css({width:inst.dpDiv.width()+4,height:inst.dpDiv.height()+4})
}};if($.effects&&$.effects[showAnim]){inst.dpDiv.show(showAnim,$.datepicker16._get(inst,"showOptions"),duration,postProcess)
}else{inst.dpDiv[showAnim](duration,postProcess)}if(duration==""){postProcess()}if(inst.input[0].type!="hidden"){inst.input[0].focus()
}$.datepicker16._curInst=inst}},_updateDatepicker:function(inst){var dims={width:inst.dpDiv.width()+4,height:inst.dpDiv.height()+4};
inst.dpDiv.empty().append(this._generateHTML(inst)).find("iframe.ui-datepicker-cover").css({width:dims.width,height:dims.height});
var numMonths=this._getNumberOfMonths(inst);inst.dpDiv[(numMonths[0]!=1||numMonths[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");
inst.dpDiv[(this._get(inst,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");if(inst.input&&inst.input[0].type!="hidden"&&inst==$.datepicker16._curInst){$(inst.input[0]).focus()
}},_checkOffset:function(inst,offset,isFixed){var pos=inst.input?this._findPos(inst.input[0]):null;var browserWidth=window.innerWidth||(document.documentElement?document.documentElement.clientWidth:document.body.clientWidth);
var browserHeight=window.innerHeight||(document.documentElement?document.documentElement.clientHeight:document.body.clientHeight);
var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;var scrollY=document.documentElement.scrollTop||document.body.scrollTop;
if(this._get(inst,"isRTL")||(offset.left+inst.dpDiv.width()-scrollX)>browserWidth){offset.left=Math.max((isFixed?0:scrollX),pos[0]+(inst.input?inst.input.width():0)-(isFixed?scrollX:0)-inst.dpDiv.width()-(isFixed&&$.browser.opera?document.documentElement.scrollLeft:0))
}else{offset.left-=(isFixed?scrollX:0)}if((offset.top+inst.dpDiv.height()-scrollY)>browserHeight){offset.top=Math.max((isFixed?0:scrollY),pos[1]-(isFixed?scrollY:0)-(this._inDialog?0:inst.dpDiv.height())-(isFixed&&$.browser.opera?document.documentElement.scrollTop:0))
}else{offset.top-=(isFixed?scrollY:0)}return offset},_findPos:function(obj){while(obj&&(obj.type=="hidden"||obj.nodeType!=1)){obj=obj.nextSibling
}var position=$(obj).offset();return[position.left,position.top]},_hideDatepicker:function(input,duration,noDate){var inst=this._curInst;
if(!inst||(input&&inst!=$.data(input,PROP_NAME))){return}var elemJQ=this._get(inst,"element");var noEndDate=this._get(inst,"noEndDate");
if(noDate){elemJQ.val(noEndDate)}var rangeSelect=this._get(inst,"rangeSelect");if(rangeSelect&&inst.stayOpen){this._selectDate("#"+inst.id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear))
}inst.stayOpen=false;if(this._datepickerShowing){duration=(duration!=null?duration:this._get(inst,"duration"));
var showAnim=this._get(inst,"showAnim");var postProcess=function(){$.datepicker16._tidyDialog(inst)};
if(duration!=""&&$.effects&&$.effects[showAnim]){inst.dpDiv.hide(showAnim,$.datepicker16._get(inst,"showOptions"),duration,postProcess)
}else{inst.dpDiv[(duration==""?"hide":(showAnim=="slideDown"?"slideUp":(showAnim=="fadeIn"?"fadeOut":"hide")))](duration,postProcess)
}if(duration==""){this._tidyDialog(inst)}var onClose=this._get(inst,"onClose");if(onClose){onClose.apply((inst.input?inst.input[0]:null),[(inst.input?inst.input.val():""),inst])
}this._datepickerShowing=false;this._lastInput=null;inst.settings.prompt=null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});
if($.blockUI){$.unblockUI();$("body").append(this.dpDiv)}}this._inDialog=false}this._curInst=null},_tidyDialog:function(inst){inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker");
$("."+this._promptClass,inst.dpDiv).remove()},_checkExternalClick:function(event){if(!$.datepicker16._curInst){return
}var $target=$(event.target);if(($target.parents("#"+$.datepicker16._mainDivId).length==0)&&!$target.hasClass($.datepicker16.markerClassName)&&!$target.hasClass($.datepicker16._triggerClass)&&$.datepicker16._datepickerShowing&&!($.datepicker16._inDialog&&$.blockUI)){$.datepicker16._hideDatepicker(null,"")
}},_adjustDate:function(id,offset,period){var target=$(id);var inst=this._getInst(target[0]);this._adjustInstDate(inst,offset,period);
this._updateDatepicker(inst)},_gotoToday:function(id){var target=$(id);var inst=this._getInst(target[0]);
if(this._get(inst,"gotoCurrent")&&inst.currentDay){inst.selectedDay=inst.currentDay;inst.drawMonth=inst.selectedMonth=inst.currentMonth;
inst.drawYear=inst.selectedYear=inst.currentYear}else{var date=new Date();inst.selectedDay=date.getDate();
inst.drawMonth=inst.selectedMonth=date.getMonth();inst.drawYear=inst.selectedYear=date.getFullYear()}this._notifyChange(inst);
this._adjustDate(target)},_selectMonthYear:function(id,select,period){var target=$(id);var inst=this._getInst(target[0]);
inst._selectingMonthYear=false;inst["selected"+(period=="M"?"Month":"Year")]=inst["draw"+(period=="M"?"Month":"Year")]=parseInt(select.options[select.selectedIndex].value,10);
this._notifyChange(inst);this._adjustDate(target)},_clickMonthYear:function(id){var target=$(id);var inst=this._getInst(target[0]);
if(inst.input&&inst._selectingMonthYear&&!$.browser.msie){inst.input[0].focus()}inst._selectingMonthYear=!inst._selectingMonthYear
},_changeFirstDay:function(id,day){var target=$(id);var inst=this._getInst(target[0]);inst.settings.firstDay=day;
this._updateDatepicker(inst)},_selectDay:function(id,month,year,td){if($(td).hasClass(this._unselectableClass)){return
}var target=$(id);var inst=this._getInst(target[0]);var rangeSelect=this._get(inst,"rangeSelect");if(rangeSelect){inst.stayOpen=!inst.stayOpen;
if(inst.stayOpen){$(".ui-datepicker td",inst.dpDiv).removeClass(this._currentClass);$(td).addClass(this._currentClass)
}}inst.selectedDay=inst.currentDay=$("a",td).html();inst.selectedMonth=inst.currentMonth=month;inst.selectedYear=inst.currentYear=year;
if(inst.stayOpen){inst.endDay=inst.endMonth=inst.endYear=null}else{if(rangeSelect){inst.endDay=inst.currentDay;
inst.endMonth=inst.currentMonth;inst.endYear=inst.currentYear}}this._selectDate(id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear));
if(inst.stayOpen){inst.rangeStart=this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay));
this._updateDatepicker(inst)}else{if(rangeSelect){inst.selectedDay=inst.currentDay=inst.rangeStart.getDate();
inst.selectedMonth=inst.currentMonth=inst.rangeStart.getMonth();inst.selectedYear=inst.currentYear=inst.rangeStart.getFullYear();
inst.rangeStart=null;if(inst.inline){this._updateDatepicker(inst)}}}},_clearDate:function(id){var target=$(id);
var inst=this._getInst(target[0]);if(this._get(inst,"mandatory")){return}inst.stayOpen=false;inst.endDay=inst.endMonth=inst.endYear=inst.rangeStart=null;
this._selectDate(target,"")},_selectDate:function(id,dateStr){var target=$(id);var inst=this._getInst(target[0]);
dateStr=(dateStr!=null?dateStr:this._formatDate(inst));if(this._get(inst,"rangeSelect")&&dateStr){dateStr=(inst.rangeStart?this._formatDate(inst,inst.rangeStart):dateStr)+this._get(inst,"rangeSeparator")+dateStr
}if(inst.input){inst.input.val(dateStr)}this._updateAlternate(inst);var onSelect=this._get(inst,"onSelect");
if(onSelect){onSelect.apply((inst.input?inst.input[0]:null),[dateStr,inst])}else{if(inst.input){inst.input.trigger("change")
}}if(inst.inline){this._updateDatepicker(inst)}else{if(!inst.stayOpen){this._hideDatepicker(null,this._get(inst,"duration"));
this._lastInput=inst.input[0];if(typeof(inst.input[0])!="object"){inst.input[0].focus()}this._lastInput=null
}}},_updateAlternate:function(inst){var altField=this._get(inst,"altField");if(altField){var altFormat=this._get(inst,"altFormat")||this._get(inst,"dateFormat");
var date=this._getDate(inst);dateStr=(isArray(date)?(!date[0]&&!date[1]?"":this.formatDate(altFormat,date[0],this._getFormatConfig(inst))+this._get(inst,"rangeSeparator")+this.formatDate(altFormat,date[1]||date[0],this._getFormatConfig(inst))):this.formatDate(altFormat,date,this._getFormatConfig(inst)));
$(altField).each(function(){$(this).val(dateStr)})}},noWeekends:function(date){var day=date.getDay();
return[(day>0&&day<6),""]},iso8601Week:function(date){var checkDate=new Date(date.getFullYear(),date.getMonth(),date.getDate());
var firstMon=new Date(checkDate.getFullYear(),1-1,4);var firstDay=firstMon.getDay()||7;firstMon.setDate(firstMon.getDate()+1-firstDay);
if(firstDay<4&&checkDate<firstMon){checkDate.setDate(checkDate.getDate()-3);return $.datepicker16.iso8601Week(checkDate)
}else{if(checkDate>new Date(checkDate.getFullYear(),12-1,28)){firstDay=new Date(checkDate.getFullYear()+1,1-1,4).getDay()||7;
if(firstDay>4&&(checkDate.getDay()||7)<firstDay-3){return 1}}}return Math.floor(((checkDate-firstMon)/86400000)/7)+1
},dateStatus:function(date,inst){return $.datepicker16.formatDate($.datepicker16._get(inst,"dateStatus"),date,$.datepicker16._getFormatConfig(inst))
},parseDate:function(format,value,settings){if(format==null||value==null){throw"Invalid arguments"}value=(typeof value=="object"?value.toString():value+"");
if(value==""){return null}var shortYearCutoff=(settings?settings.shortYearCutoff:null)||this._defaults.shortYearCutoff;
var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;
var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;
var year=-1;var month=-1;var day=-1;var doy=-1;var literal=false;var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);
if(matches){iFormat++}return matches};var getNumber=function(match){lookAhead(match);var origSize=(match=="@"?14:(match=="y"?4:(match=="o"?3:2)));
var size=origSize;var num=0;while(size>0&&iValue<value.length&&value.charAt(iValue)>="0"&&value.charAt(iValue)<="9"){num=num*10+parseInt(value.charAt(iValue++),10);
size--}if(size==origSize){throw"Missing number at position "+iValue}return num};var getName=function(match,shortNames,longNames){var names=(lookAhead(match)?longNames:shortNames);
var size=0;for(var j=0;j<names.length;j++){size=Math.max(size,names[j].length)}var name="";var iInit=iValue;
while(size>0&&iValue<value.length){name+=value.charAt(iValue++);for(var i=0;i<names.length;i++){if(name==names[i]){return i+1
}}size--}throw"Unknown name at position "+iInit};var checkLiteral=function(){if(value.charAt(iValue)!=format.charAt(iFormat)){throw"Unexpected literal at position "+iValue
}iValue++};var iValue=0;for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false
}else{checkLiteral()}}else{switch(format.charAt(iFormat)){case"d":day=getNumber("d");break;case"D":getName("D",dayNamesShort,dayNames);
break;case"o":doy=getNumber("o");break;case"m":month=getNumber("m");break;case"M":month=getName("M",monthNamesShort,monthNames);
break;case"y":year=getNumber("y");break;case"@":var date=new Date(getNumber("@"));year=date.getFullYear();
month=date.getMonth()+1;day=date.getDate();break;case"'":if(lookAhead("'")){checkLiteral()}else{literal=true
}break;default:checkLiteral()}}}if(year==-1){year=new Date().getFullYear()}else{if(year<100){year+=new Date().getFullYear()-new Date().getFullYear()%100+(year<=shortYearCutoff?0:-100)
}}if(doy>-1){month=1;day=doy;do{var dim=this._getDaysInMonth(year,month-1);if(day<=dim){break}month++;
day-=dim}while(true)}var date=this._daylightSavingAdjust(new Date(year,month-1,day));if(date.getFullYear()!=year||date.getMonth()+1!=month||date.getDate()!=day){throw"Invalid date"
}return date},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TIMESTAMP:"@",W3C:"yy-mm-dd",formatDate:function(format,date,settings){if(!date){return""
}var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;
var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;
var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);
if(matches){iFormat++}return matches};var formatNumber=function(match,value,len){var num=""+value;if(lookAhead(match)){while(num.length<len){num="0"+num
}}return num};var formatName=function(match,value,shortNames,longNames){return(lookAhead(match)?longNames[value]:shortNames[value])
};var output="";var literal=false;if(date){for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false
}else{output+=format.charAt(iFormat)}}else{switch(format.charAt(iFormat)){case"d":output+=formatNumber("d",date.getDate(),2);
break;case"D":output+=formatName("D",date.getDay(),dayNamesShort,dayNames);break;case"o":var doy=date.getDate();
for(var m=date.getMonth()-1;m>=0;m--){doy+=this._getDaysInMonth(date.getFullYear(),m)}output+=formatNumber("o",doy,3);
break;case"m":output+=formatNumber("m",date.getMonth()+1,2);break;case"M":output+=formatName("M",date.getMonth(),monthNamesShort,monthNames);
break;case"y":output+=(lookAhead("y")?date.getFullYear():(date.getYear()%100<10?"0":"")+date.getYear()%100);
break;case"@":output+=date.getTime();break;case"'":if(lookAhead("'")){output+="'"}else{literal=true}break;
default:output+=format.charAt(iFormat)}}}}return output},_possibleChars:function(format){var chars="";
var literal=false;for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false
}else{chars+=format.charAt(iFormat)}}else{switch(format.charAt(iFormat)){case"d":case"m":case"y":case"@":chars+="0123456789";
break;case"D":case"M":return null;case"'":if(lookAhead("'")){chars+="'"}else{literal=true}break;default:chars+=format.charAt(iFormat)
}}}return chars},_get:function(inst,name){return inst.settings[name]!==undefined?inst.settings[name]:this._defaults[name]
},_setDateFromField:function(inst){var dateFormat=this._get(inst,"dateFormat");var dates=inst.input?inst.input.val().split(this._get(inst,"rangeSeparator")):null;
inst.endDay=inst.endMonth=inst.endYear=null;var date=defaultDate=this._getDefaultDate(inst);if(dates.length>0){var settings=this._getFormatConfig(inst);
if(dates.length>1){date=this.parseDate(dateFormat,dates[1],settings)||defaultDate;inst.endDay=date.getDate();
inst.endMonth=date.getMonth();inst.endYear=date.getFullYear()}try{date=this.parseDate(dateFormat,dates[0],settings)||defaultDate
}catch(event){this.log(event);date=defaultDate}}inst.selectedDay=date.getDate();inst.drawMonth=inst.selectedMonth=date.getMonth();
inst.drawYear=inst.selectedYear=date.getFullYear();inst.currentDay=(dates[0]?date.getDate():0);inst.currentMonth=(dates[0]?date.getMonth():0);
inst.currentYear=(dates[0]?date.getFullYear():0);this._adjustInstDate(inst)},_getDefaultDate:function(inst){var date=this._determineDate(this._get(inst,"defaultDate"),new Date());
var minDate=this._getMinMaxDate(inst,"min",true);var maxDate=this._getMinMaxDate(inst,"max");date=(minDate&&date<minDate?minDate:date);
date=(maxDate&&date>maxDate?maxDate:date);return date},_determineDate:function(date,defaultDate){var offsetNumeric=function(offset){var date=new Date();
date.setDate(date.getDate()+offset);return date};var offsetString=function(offset,getDaysInMonth){var date=new Date();
var year=date.getFullYear();var month=date.getMonth();var day=date.getDate();var pattern=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
var matches=pattern.exec(offset);while(matches){switch(matches[2]||"d"){case"d":case"D":day+=parseInt(matches[1],10);
break;case"w":case"W":day+=parseInt(matches[1],10)*7;break;case"m":case"M":month+=parseInt(matches[1],10);
day=Math.min(day,getDaysInMonth(year,month));break;case"y":case"Y":year+=parseInt(matches[1],10);day=Math.min(day,getDaysInMonth(year,month));
break}matches=pattern.exec(offset)}return new Date(year,month,day)};date=(date==null?defaultDate:(typeof date=="string"?offsetString(date,this._getDaysInMonth):(typeof date=="number"?(isNaN(date)?defaultDate:offsetNumeric(date)):date)));
date=(date&&date.toString()=="Invalid Date"?defaultDate:date);if(date){date.setHours(0);date.setMinutes(0);
date.setSeconds(0);date.setMilliseconds(0)}return this._daylightSavingAdjust(date)},_daylightSavingAdjust:function(date){if(!date){return null
}date.setHours(date.getHours()>12?date.getHours()+2:0);return date},_setDate:function(inst,date,endDate){var clear=!(date);
var origMonth=inst.selectedMonth;var origYear=inst.selectedYear;date=this._determineDate(date,new Date());
inst.selectedDay=inst.currentDay=date.getDate();inst.drawMonth=inst.selectedMonth=inst.currentMonth=date.getMonth();
inst.drawYear=inst.selectedYear=inst.currentYear=date.getFullYear();if(this._get(inst,"rangeSelect")){if(endDate){endDate=this._determineDate(endDate,null);
inst.endDay=endDate.getDate();inst.endMonth=endDate.getMonth();inst.endYear=endDate.getFullYear()}else{inst.endDay=inst.currentDay;
inst.endMonth=inst.currentMonth;inst.endYear=inst.currentYear}}if(origMonth!=inst.selectedMonth||origYear!=inst.selectedYear){this._notifyChange(inst)
}this._adjustInstDate(inst);if(inst.input){inst.input.val(clear?"":this._formatDate(inst)+(!this._get(inst,"rangeSelect")?"":this._get(inst,"rangeSeparator")+this._formatDate(inst,inst.endDay,inst.endMonth,inst.endYear)))
}},_getDate:function(inst){var startDate=(!inst.currentYear||(inst.input&&inst.input.val()=="")?null:this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
if(this._get(inst,"rangeSelect")){return[inst.rangeStart||startDate,(!inst.endYear?inst.rangeStart||startDate:this._daylightSavingAdjust(new Date(inst.endYear,inst.endMonth,inst.endDay)))]
}else{return startDate}},_generateHTML:function(inst){var today=new Date();today=this._daylightSavingAdjust(new Date(today.getFullYear(),today.getMonth(),today.getDate()));
var showStatus=this._get(inst,"showStatus");var initStatus=this._get(inst,"initStatus")||"&#xa0;";var isRTL=this._get(inst,"isRTL");
var clear=(this._get(inst,"mandatory")?"":'<div class="ui-datepicker-clear"><a onclick="jQuery.datepicker16._clearDate(\'#'+inst.id+"');\""+this._addStatus(showStatus,inst.id,this._get(inst,"clearStatus"),initStatus)+">"+this._get(inst,"clearText")+"</a></div>");
var controls='<div class="ui-datepicker-control">'+(isRTL?"":clear)+'<div class="ui-datepicker-close"><a onclick="jQuery.datepicker16._hideDatepicker();"'+this._addStatus(showStatus,inst.id,this._get(inst,"closeStatus"),initStatus)+">"+this._get(inst,"closeText")+"</a></div>"+(isRTL?clear:"")+"</div>";
var prompt=this._get(inst,"prompt");var closeAtTop=this._get(inst,"closeAtTop");var hideIfNoPrevNext=this._get(inst,"hideIfNoPrevNext");
var navigationAsDateFormat=this._get(inst,"navigationAsDateFormat");var showBigPrevNext=this._get(inst,"showBigPrevNext");
var numMonths=this._getNumberOfMonths(inst);var showCurrentAtPos=this._get(inst,"showCurrentAtPos");var stepMonths=this._get(inst,"stepMonths");
var stepBigMonths=this._get(inst,"stepBigMonths");var isMultiMonth=(numMonths[0]!=1||numMonths[1]!=1);
var currentDate=this._daylightSavingAdjust((!inst.currentDay?new Date(9999,9,9):new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
var minDate=this._getMinMaxDate(inst,"min",true);var maxDate=this._getMinMaxDate(inst,"max");var drawMonth=inst.drawMonth-showCurrentAtPos;
var drawYear=inst.drawYear;if(drawMonth<0){drawMonth+=12;drawYear--}if(maxDate){var maxDraw=this._daylightSavingAdjust(new Date(maxDate.getFullYear(),maxDate.getMonth()-numMonths[1]+1,maxDate.getDate()));
maxDraw=(minDate&&maxDraw<minDate?minDate:maxDraw);while(this._daylightSavingAdjust(new Date(drawYear,drawMonth,1))>maxDraw){drawMonth--;
if(drawMonth<0){drawMonth=11;drawYear--}}}var prevText=this._get(inst,"prevText");prevText=(!navigationAsDateFormat?prevText:this.formatDate(prevText,this._daylightSavingAdjust(new Date(drawYear,drawMonth-stepMonths,1)),this._getFormatConfig(inst)));
var prevBigText=(showBigPrevNext?this._get(inst,"prevBigText"):"");prevBigText=(!navigationAsDateFormat?prevBigText:this.formatDate(prevBigText,this._daylightSavingAdjust(new Date(drawYear,drawMonth-stepBigMonths,1)),this._getFormatConfig(inst)));
var prev='<div class="ui-datepicker-prev">'+(this._canAdjustMonth(inst,-1,drawYear,drawMonth)?(showBigPrevNext?"<a onclick=\"jQuery.datepicker16._adjustDate('#"+inst.id+"', -"+stepBigMonths+", 'M');\""+this._addStatus(showStatus,inst.id,this._get(inst,"prevBigStatus"),initStatus)+">"+prevBigText+"</a>":"")+"<a onclick=\"jQuery.datepicker16._adjustDate('#"+inst.id+"', -"+stepMonths+", 'M');\""+this._addStatus(showStatus,inst.id,this._get(inst,"prevStatus"),initStatus)+">"+prevText+"</a>":(hideIfNoPrevNext?"":(showBigPrevNext?"<label>"+prevBigText+"</label>":"")+"<label>"+prevText+"</label>"))+"</div>";
var nextText=this._get(inst,"nextText");nextText=(!navigationAsDateFormat?nextText:this.formatDate(nextText,this._daylightSavingAdjust(new Date(drawYear,drawMonth+stepMonths,1)),this._getFormatConfig(inst)));
var nextBigText=(showBigPrevNext?this._get(inst,"nextBigText"):"");nextBigText=(!navigationAsDateFormat?nextBigText:this.formatDate(nextBigText,this._daylightSavingAdjust(new Date(drawYear,drawMonth+stepBigMonths,1)),this._getFormatConfig(inst)));
var next='<div class="ui-datepicker-next">'+(this._canAdjustMonth(inst,+1,drawYear,drawMonth)?"<a onclick=\"jQuery.datepicker16._adjustDate('#"+inst.id+"', +"+stepMonths+", 'M');\""+this._addStatus(showStatus,inst.id,this._get(inst,"nextStatus"),initStatus)+">"+nextText+"</a>"+(showBigPrevNext?"<a onclick=\"jQuery.datepicker16._adjustDate('#"+inst.id+"', +"+stepBigMonths+", 'M');\""+this._addStatus(showStatus,inst.id,this._get(inst,"nextBigStatus"),initStatus)+">"+nextBigText+"</a>":""):(hideIfNoPrevNext?"":"<label>"+nextText+"</label>"+(showBigPrevNext?"<label>"+nextBigText+"</label>":"")))+"</div>";
var currentText=this._get(inst,"currentText");var gotoDate=(this._get(inst,"gotoCurrent")&&inst.currentDay?currentDate:today);
currentText=(!navigationAsDateFormat?currentText:this.formatDate(currentText,gotoDate,this._getFormatConfig(inst)));
var html=(closeAtTop&&!inst.inline?controls:"")+'<div class="ui-datepicker-links">'+(isRTL?next:prev)+(this._isInRange(inst,gotoDate)?'<div class="ui-datepicker-current"><a onclick="jQuery.datepicker16._gotoToday(\'#'+inst.id+"');\""+this._addStatus(showStatus,inst.id,this._get(inst,"currentStatus"),initStatus)+">"+currentText+"</a></div>":"")+(isRTL?prev:next)+"</div>"+(prompt?'<div class="'+this._promptClass+'"><span>'+prompt+"</span></div>":"");
var firstDay=parseInt(this._get(inst,"firstDay"),10);firstDay=(isNaN(firstDay)?0:firstDay);var changeFirstDay=this._get(inst,"changeFirstDay");
var dayNames=this._get(inst,"dayNames");var dayNamesShort=this._get(inst,"dayNamesShort");var dayNamesMin=this._get(inst,"dayNamesMin");
var monthNames=this._get(inst,"monthNames");var beforeShowDay=this._get(inst,"beforeShowDay");var highlightWeek=this._get(inst,"highlightWeek");
var showOtherMonths=this._get(inst,"showOtherMonths");var showWeeks=this._get(inst,"showWeeks");var calculateWeek=this._get(inst,"calculateWeek")||this.iso8601Week;
var weekStatus=this._get(inst,"weekStatus");var status=(showStatus?this._get(inst,"dayStatus")||initStatus:"");
var dateStatus=this._get(inst,"statusForDate")||this.dateStatus;var endDate=inst.endDay?this._daylightSavingAdjust(new Date(inst.endYear,inst.endMonth,inst.endDay)):currentDate;
var defaultDate=this._getDefaultDate(inst);for(var row=0;row<numMonths[0];row++){for(var col=0;col<numMonths[1];
col++){var selectedDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,inst.selectedDay));html+='<div class="ui-datepicker-one-month'+(col==0?" ui-datepicker-new-row":"")+'">'+this._generateMonthYearHeader(inst,drawMonth,drawYear,minDate,maxDate,selectedDate,row>0||col>0,showStatus,initStatus,monthNames)+'<table class="ui-datepicker" cellpadding="0" cellspacing="0"><thead><tr class="ui-datepicker-title-row">'+(showWeeks?"<td"+this._addStatus(showStatus,inst.id,weekStatus,initStatus)+">"+this._get(inst,"weekHeader")+"</td>":"");
for(var dow=0;dow<7;dow++){var day=(dow+firstDay)%7;var dayStatus=(status.indexOf("DD")>-1?status.replace(/DD/,dayNames[day]):status.replace(/D/,dayNamesShort[day]));
html+="<td"+((dow+firstDay+6)%7>=5?' class="ui-datepicker-week-end-cell"':"")+">"+(!changeFirstDay?"<span":"<a onclick=\"jQuery.datepicker16._changeFirstDay('#"+inst.id+"', "+day+');"')+this._addStatus(showStatus,inst.id,dayStatus,initStatus)+' title="'+dayNames[day]+'">'+dayNamesMin[day]+(changeFirstDay?"</a>":"</span>")+"</td>"
}html+="</tr></thead><tbody>";var daysInMonth=this._getDaysInMonth(drawYear,drawMonth);if(drawYear==inst.selectedYear&&drawMonth==inst.selectedMonth){inst.selectedDay=Math.min(inst.selectedDay,daysInMonth)
}var leadDays=(this._getFirstDayOfMonth(drawYear,drawMonth)-firstDay+7)%7;var numRows=(isMultiMonth?6:Math.ceil((leadDays+daysInMonth)/7));
var printDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,1-leadDays));for(var dRow=0;dRow<numRows;
dRow++){html+='<tr class="ui-datepicker-days-row">'+(showWeeks?'<td class="ui-datepicker-week-col"'+this._addStatus(showStatus,inst.id,weekStatus,initStatus)+">"+calculateWeek(printDate)+"</td>":"");
for(var dow=0;dow<7;dow++){var daySettings=(beforeShowDay?beforeShowDay.apply((inst.input?inst.input[0]:null),[printDate]):[true,""]);
var otherMonth=(printDate.getMonth()!=drawMonth);var unselectable=otherMonth||!daySettings[0]||(minDate&&printDate<minDate)||(maxDate&&printDate>maxDate);
html+='<td class="ui-datepicker-days-cell'+((dow+firstDay+6)%7>=5?" ui-datepicker-week-end-cell":"")+(otherMonth?" ui-datepicker-other-month":"")+((printDate.getTime()==selectedDate.getTime()&&drawMonth==inst.selectedMonth&&inst._keyEvent)||(defaultDate.getTime()==printDate.getTime()&&defaultDate.getTime()==selectedDate.getTime())?" "+$.datepicker16._dayOverClass:"")+(unselectable?" "+this._unselectableClass:"")+(otherMonth&&!showOtherMonths?"":" "+daySettings[1]+(printDate.getTime()>=currentDate.getTime()&&printDate.getTime()<=endDate.getTime()?" "+this._currentClass:"")+(printDate.getTime()==today.getTime()?" ui-datepicker-today":""))+'"'+((!otherMonth||showOtherMonths)&&daySettings[2]?' title="'+daySettings[2]+'"':"")+(unselectable?(highlightWeek?" onmouseover=\"jQuery(this).parent().addClass('"+this._weekOverClass+"');\" onmouseout=\"jQuery(this).parent().removeClass('"+this._weekOverClass+"');\"":""):" onmouseover=\"jQuery(this).addClass('"+this._dayOverClass+"')"+(highlightWeek?".parent().addClass('"+this._weekOverClass+"')":"")+";"+(!showStatus||(otherMonth&&!showOtherMonths)?"":"jQuery('#ui-datepicker-status-"+inst.id+"').html('"+(dateStatus.apply((inst.input?inst.input[0]:null),[printDate,inst])||initStatus)+"');")+'" onmouseout="jQuery(this).removeClass(\''+this._dayOverClass+"')"+(highlightWeek?".parent().removeClass('"+this._weekOverClass+"')":"")+";"+(!showStatus||(otherMonth&&!showOtherMonths)?"":"jQuery('#ui-datepicker-status-"+inst.id+"').html('"+initStatus+"');")+'" onclick="jQuery.datepicker16._selectDay(\'#'+inst.id+"',"+drawMonth+","+drawYear+', this);"')+">"+(otherMonth?(showOtherMonths?printDate.getDate():"&#xa0;"):(unselectable?printDate.getDate():"<a>"+printDate.getDate()+"</a>"))+"</td>";
printDate.setDate(printDate.getDate()+1);printDate=this._daylightSavingAdjust(printDate)}html+="</tr>"
}drawMonth++;if(drawMonth>11){drawMonth=0;drawYear++}html+="</tbody></table></div>"}}var elemJQ=jQuery(inst.input);
var endDateClass=this._get(inst,"endDateClass");var repetitionEndDateClass=this._get(inst,"repetitionEndDateClass");
if(elemJQ.hasClass(endDateClass)||elemJQ.hasClass(repetitionEndDateClass)){var noEndDateButton=this._get(inst,"noEndDateButton");
html+='<div class="cancel-date"><input class="cancel" type="button" value="'+noEndDateButton+"\" onclick=\"jQuery.datepicker16._hideDatepicker('','',true);\" /></div>"
}html+=(showStatus?'<div style="clear: both;"></div><div id="ui-datepicker-status-'+inst.id+'" class="ui-datepicker-status">'+initStatus+"</div>":"")+(!closeAtTop&&!inst.inline?controls:"")+'<div style="clear: both;"></div>'+($.browser.msie&&parseInt($.browser.version,10)<7&&!inst.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover"></iframe>':"");
inst._keyEvent=false;return html},_generateMonthYearHeader:function(inst,drawMonth,drawYear,minDate,maxDate,selectedDate,secondary,showStatus,initStatus,monthNames){minDate=(inst.rangeStart&&minDate&&selectedDate<minDate?selectedDate:minDate);
var changeMonth=this._get(inst,"changeMonth");var changeYear=this._get(inst,"changeYear");var showMonthAfterYear=this._get(inst,"showMonthAfterYear");
var html='<div class="ui-datepicker-header">';var monthHtml="";if(secondary||!changeMonth){monthHtml+=monthNames[drawMonth]
}else{var inMinYear=(minDate&&minDate.getFullYear()==drawYear);var inMaxYear=(maxDate&&maxDate.getFullYear()==drawYear);
monthHtml+='<select class="ui-datepicker-new-month" onchange="jQuery.datepicker16._selectMonthYear(\'#'+inst.id+"', this, 'M');\" onclick=\"jQuery.datepicker16._clickMonthYear('#"+inst.id+"');\""+this._addStatus(showStatus,inst.id,this._get(inst,"monthStatus"),initStatus)+">";
for(var month=0;month<12;month++){if((!inMinYear||month>=minDate.getMonth())&&(!inMaxYear||month<=maxDate.getMonth())){monthHtml+='<option value="'+month+'"'+(month==drawMonth?' selected="selected"':"")+">"+monthNames[month]+"</option>"
}}monthHtml+="</select>"}if(!showMonthAfterYear){html+=monthHtml+(secondary||changeMonth||changeYear?"&#xa0;":"")
}if(secondary||!changeYear){html+=drawYear}else{var years=this._get(inst,"yearRange").split(":");var year=0;
var endYear=0;if(years.length!=2){year=drawYear-10;endYear=drawYear+10}else{if(years[0].charAt(0)=="+"||years[0].charAt(0)=="-"){year=endYear=new Date().getFullYear();
year+=parseInt(years[0],10);endYear+=parseInt(years[1],10)}else{year=parseInt(years[0],10);endYear=parseInt(years[1],10)
}}year=(minDate?Math.max(year,minDate.getFullYear()):year);endYear=(maxDate?Math.min(endYear,maxDate.getFullYear()):endYear);
html+='<select class="ui-datepicker-new-year" onchange="jQuery.datepicker16._selectMonthYear(\'#'+inst.id+"', this, 'Y');\" onclick=\"jQuery.datepicker16._clickMonthYear('#"+inst.id+"');\""+this._addStatus(showStatus,inst.id,this._get(inst,"yearStatus"),initStatus)+">";
for(;year<=endYear;year++){html+='<option value="'+year+'"'+(year==drawYear?' selected="selected"':"")+">"+year+"</option>"
}html+="</select>"}if(showMonthAfterYear){html+=(secondary||changeMonth||changeYear?"&#xa0;":"")+monthHtml
}html+="</div>";return html},_addStatus:function(showStatus,id,text,initStatus){return(showStatus?" onmouseover=\"jQuery('#ui-datepicker-status-"+id+"').html('"+(text||initStatus)+"');\" onmouseout=\"jQuery('#ui-datepicker-status-"+id+"').html('"+initStatus+"');\"":"")
},_adjustInstDate:function(inst,offset,period){var year=inst.drawYear+(period=="Y"?offset:0);var month=inst.drawMonth+(period=="M"?offset:0);
var day=Math.min(inst.selectedDay,this._getDaysInMonth(year,month))+(period=="D"?offset:0);var date=this._daylightSavingAdjust(new Date(year,month,day));
var minDate=this._getMinMaxDate(inst,"min",true);var maxDate=this._getMinMaxDate(inst,"max");date=(minDate&&date<minDate?minDate:date);
date=(maxDate&&date>maxDate?maxDate:date);inst.selectedDay=date.getDate();inst.drawMonth=inst.selectedMonth=date.getMonth();
inst.drawYear=inst.selectedYear=date.getFullYear();if(period=="M"||period=="Y"){this._notifyChange(inst)
}},_notifyChange:function(inst){var onChange=this._get(inst,"onChangeMonthYear");if(onChange){onChange.apply((inst.input?inst.input[0]:null),[inst.selectedYear,inst.selectedMonth+1,inst])
}},_getNumberOfMonths:function(inst){var numMonths=this._get(inst,"numberOfMonths");return(numMonths==null?[1,1]:(typeof numMonths=="number"?[1,numMonths]:numMonths))
},_getMinMaxDate:function(inst,minMax,checkRange){var date=this._determineDate(this._get(inst,minMax+"Date"),null);
return(!checkRange||!inst.rangeStart?date:(!date||inst.rangeStart>date?inst.rangeStart:date))},_getDaysInMonth:function(year,month){return 32-new Date(year,month,32).getDate()
},_getFirstDayOfMonth:function(year,month){return new Date(year,month,1).getDay()},_canAdjustMonth:function(inst,offset,curYear,curMonth){var numMonths=this._getNumberOfMonths(inst);
var date=this._daylightSavingAdjust(new Date(curYear,curMonth+(offset<0?offset:numMonths[1]),1));if(offset<0){date.setDate(this._getDaysInMonth(date.getFullYear(),date.getMonth()))
}return this._isInRange(inst,date)},_isInRange:function(inst,date){var newMinDate=(!inst.rangeStart?null:this._daylightSavingAdjust(new Date(inst.selectedYear,inst.selectedMonth,inst.selectedDay)));
newMinDate=(newMinDate&&inst.rangeStart<newMinDate?inst.rangeStart:newMinDate);var minDate=newMinDate||this._getMinMaxDate(inst,"min");
var maxDate=this._getMinMaxDate(inst,"max");return((!minDate||date>=minDate)&&(!maxDate||date<=maxDate))
},_getFormatConfig:function(inst){var shortYearCutoff=this._get(inst,"shortYearCutoff");shortYearCutoff=(typeof shortYearCutoff!="string"?shortYearCutoff:new Date().getFullYear()%100+parseInt(shortYearCutoff,10));
return{shortYearCutoff:shortYearCutoff,dayNamesShort:this._get(inst,"dayNamesShort"),dayNames:this._get(inst,"dayNames"),monthNamesShort:this._get(inst,"monthNamesShort"),monthNames:this._get(inst,"monthNames")}
},_formatDate:function(inst,day,month,year){if(!day){inst.currentDay=inst.selectedDay;inst.currentMonth=inst.selectedMonth;
inst.currentYear=inst.selectedYear}var date=(day?(typeof day=="object"?day:this._daylightSavingAdjust(new Date(year,month,day))):this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));
return this.formatDate(this._get(inst,"dateFormat"),date,this._getFormatConfig(inst))}});function extendRemove(target,props){$.extend(target,props);
for(var name in props){if(props[name]==null||props[name]==undefined){target[name]=props[name]}}return target
}function isArray(a){return(a&&(($.browser.safari&&typeof a=="object"&&a.length)||(a.constructor&&a.constructor.toString().match(/\Array\(\)/))))
}$.fn.datepicker16=function(options){if(!$.datepicker16.initialized){$(document.body).append($.datepicker16.dpDiv).mousedown($.datepicker16._checkExternalClick);
$.datepicker16.initialized=true}var otherArgs=Array.prototype.slice.call(arguments,1);if(typeof options=="string"&&(options=="isDisabled"||options=="getDate")){return $.datepicker16["_"+options+"Datepicker"].apply($.datepicker16,[this[0]].concat(otherArgs))
}return this.each(function(){typeof options=="string"?$.datepicker16["_"+options+"Datepicker"].apply($.datepicker16,[this].concat(otherArgs)):$.datepicker16._attachDatepicker(this,options)
})};$.datepicker16=new Datepicker();$.datepicker16.initialized=false;$.datepicker16.uuid=new Date().getTime();
$.datepicker16.version="1.6"})(jQuery);
;window.shoppingbasket={msg:{}};var Shoppingbasket=apsinth.ApsinthModule.extend({CONFIG_MIN_WIDTH:500,msg_main:null,tax_activeAdress:"inv",tax_cityCheck:0,tax_stateCheck:0,tax_zipCheck:0,initialize:function(c,b,a,d){this._super(c,b,a,d);
this.msg_main=shoppingbasket.msg.main_Shoppingbasket},_initMainView:function(){var a=this;var b=this.getMainJQ();
a._setTaxHandler("inv");b.find("#del_addr").parent().parent().nextAll("tr:has(td[id^='del'])").hide();
b.find("#del_addr").click(this.toHandler(function(){if(b.find("#del_addr").is(":checked")){b.find("#del_addr").parent().parent().nextAll("tr:has(td[id^='del'])").show();
a._setTaxHandler("del")}else{b.find("#del_addr").parent().parent().nextAll("tr:has(td[id^='del'])").hide();
a._setTaxHandler("inv")}}));b.find("input[id^='count_']").keydown(this.toHandler(function(c){revertCount=jQuery(c.target).val()
}));b.find("input[id^='count_']").keyup(this.toHandler(function(d){if(jQuery(d.target).val()!=="0"){this._refreshPrices(d)
}else{if(confirm(this.msg_main.delete_article)){var c=jQuery(d.currentTarget).attr("id").split("_");this._deleteArticle(c[1],jQuery(d.target).parent().parent())
}else{if(revertCount){jQuery(d.target).val(revertCount)}}}}));b.find("input[id^='delete_art_']").click(this.toHandler(function(d){if(confirm(this.msg_main.delete_article)){var c=jQuery(d.currentTarget).attr("id").split("_");
this._deleteArticle(c[2],jQuery(d.target).parent().parent())}else{}},this));b.find("#submit").click(this.toHandler(function(c){this._formSubmit()
},this));b.find("#terms_accept_link").click(this.toHandler(function(c){this.callRpc("public.getTerms",null,function(e,d){if(!d&&e&&!e.errors&&e.terms_text){jQuery(".terms-dialog .dlg-text .terms_text").html(e.terms_text);
a._showDialog("terms")}})},this));b.find("#shoppingBasketDialogs").hide()},_initConfigView:function(){var b=this.getConfigJQ();
var a=this;b.find("#payment_pp").click(this.toHandler(function(c){if(b.find("#payment_pp").is(":checked")){b.find("#fieldset-pp_data").show()
}else{b.find("#fieldset-pp_data").hide()}}));(new apsinth.util.Tabs(b)).bindTabChanged(function(c){a._onTabChange(c)
})},_onTabChange:function(a){if(a.hasClass("skins-tab")){this._skinSelector.updateSkins()}},getConfigData:function(){var a=this.getConfigJQ();
this.bind("open-config",this._onOpen,this)},_refreshPrices:function(c){var a=this;var b=[];jQuery("#shoppingBasketTable tbody tr").each(function(d,e){var g=jQuery(e).find("td input[id^='id']").val();
var f=jQuery(e).find("td input[id^='count']").val();b.push([g,f])});if(jQuery("#localeGenuine").val()=="en_CA"||jQuery("#localeGenuine").val()=="en_US"){if(Shoppingbasket.tax_activeAdress=="inv"){activeCity=jQuery("#inv_city").val();
activeState=jQuery("#inv_state").val();activeZip=jQuery("#inv_pc").val()}else{if(Shoppingbasket.tax_activeAdress=="del"){activeCity=jQuery("#del_city").val();
activeState=jQuery("#del_state").val();activeZip=jQuery("#del_pc").val()}}a.callRpc("public.update",{orders:b,city:activeCity,state:activeState,zip:activeZip},function(e,d){if(!d&&e.status&&e.status==="OK"){a._updateView(e)
}else{a._showErrorDlg(a.msg_main.update_errors)}},this)}else{a.callRpc("public.update",{orders:b},function(e,d){if(!d&&e.status&&e.status==="OK"){a._updateView(e)
}else{a._showErrorDlg(a.msg_main.update_errors)}},this)}},_deleteArticle:function(a,c){var b=[];jQuery("#shoppingBasketTable tbody tr").each(function(d,e){if(!jQuery(e).find("#id_"+a).length){var g=jQuery(e).find("td input[id^='id']").val();
var f=jQuery(e).find("td input[id^='count']").val();b.push([g,f])}});if(jQuery("#localeGenuine").val()=="en_CA"||jQuery("#localeGenuine").val()=="en_US"){if(Shoppingbasket.tax_activeAdress=="inv"){activeCity=jQuery("#inv_city").val();
activeState=jQuery("#inv_state").val();activeZip=jQuery("#inv_pc").val()}else{if(Shoppingbasket.tax_activeAdress=="del"){activeCity=jQuery("#del_city").val();
activeState=jQuery("#del_state").val();activeZip=jQuery("#del_pc").val()}}this.callRpc("public.update",{orders:b,city:activeCity,state:activeState,zip:activeZip},function(e,d){if(!d&&e.status&&e.status==="OK"){jQuery(c).remove();
this._updateView(e)}else{this._showErrorDlg(this.msg_main.update_errors)}},this)}else{this.callRpc("public.update",{orders:b},function(e,d){if(!d&&e.status&&e.status==="OK"){jQuery(c).remove();
this._updateView(e)}else{this._showErrorDlg(this.msg_main.update_errors)}},this)}},_updateView:function(d){var c=this.getMainJQ();
var a=this;var b;c.find("#nodata").remove();if(d.nodata){c.find("#shoppingBasketTable tbody").append('<tr id="nodata"><td colspan="7">'+a.msg_main.no_items+"</td></tr>");
c.find("#price_subtotal").html("");c.find("#price_shipping").html("");c.find("#price_total").html("");
c.find("#price_total_vat").html("");c.find("#amount").html("")}else{if(d.products){c.find("td[id^='price_total_']").each(function(f,j){var g=j.id.split("_");
if(g[2]){for(var h in d.products){if(d.products[h].instance_id==g[2]){jQuery(j).html(d.products[h].price_total);
b=d.products[h].currency}}}})}if(d.price_subtotal){c.find("#price_subtotal").html(d.price_subtotal)}if(d.price_shipping){c.find("#price_shipping").html(d.price_shipping)
}var e=d.price_total.replace(b,"");if(d.price_total){c.find("#price_total").html(d.price_total);c.find("#amount").val(d.price_total_clean);
if(c.find("#localeGenuine").val()=="en_CA"||c.find("#localeGenuine").val()=="en_US"){c.find("td#taxContainer_totalValue").html(d.price_total);
c.find("#externalTax").val(d.externalTax);c.find("#amount").val(e)}}if(d.price_total_vat){c.find("#price_total_vat").html(d.price_total_vat);
if(c.find("#localeGenuine").val()=="en_CA"||c.find("#localeGenuine").val()=="en_US"){c.find("#taxContainer_taxValue").html(d.price_total_vat);
c.find("#externalTax").val(d.externalTax);c.find("#amount").val(e)}}}},_formSubmit:function(){var b=this;
var e=this.getMainJQ();var c={};var a=false;jQuery("#shoppingBasketTable tbody tr").each(function(g,h){var k=jQuery(h).find("td input[id^='id']").val();
var j=jQuery(h).find("td input[id^='count']").val();if(k&&j){a=true;c[k]=j}});var d={};jQuery("#shoppingBasketForm input").each(function(h,j){var g=jQuery(j).attr("name");
if(jQuery(j).attr("type")=="checkbox"){if(jQuery(j).is(":checked")){d[g]=1}else{d[g]=false}}else{if(jQuery(j).attr("type")=="radio"){if(jQuery(j).is(":checked")){d[g]=jQuery(j).val()
}}else{d[g]=jQuery(j).val()}}});jQuery("#shoppingBasketForm select").each(function(h,j){var g=jQuery(j).attr("name");
d[g]=jQuery(j).val()});if(!a){alert(b.msg_main.no_items);return false}if(jQuery("#externalTax").length>0){var f=jQuery("#externalTax").val()
}else{var f=""}b.callRpc("public.checkOut",{orders:c,form:d,externalTax:f},function(j,h){e.find(".error_icon").remove();
if(!h&&j&&!j.errors){e.find(".error-hint").hide();if(j.ack_text){jQuery(".ack-dialog .dlg-text .ack_text").html(j.ack_text)
}if(j.paypal){var i="<a href='https://www.paypal.com/us/cgi-bin/webscr?business="+encodeURIComponent(jQuery("#ppForm #business").val())+"&item_name="+encodeURIComponent(jQuery("#ppForm #business").val())+"&currency_code="+escape(jQuery("#ppForm #currency_code").val())+"&amount="+encodeURIComponent(jQuery("#ppForm #amount").val())+"&cmd="+encodeURIComponent(jQuery("#ppForm #cmd").val())+"' target='_blank'>"+b.msg_main.paypal_link+"</a>";
jQuery(".ack-dialog .dlg-text").append("<br/>"+b.msg_main.paypal_link_text+"<br /><br />"+i);e.find("#ppForm").submit()
}b._showDialog("ack");return true}else{if(j&&j.errors){var g=this.msg_main.form_errors;jQuery.each(j.errors,function(k,l){jQuery.each(l,function(n,m){if(k!=="msg"){b._showValidationError(k,m)
}else{g+="<br />"+m}})});e.find(".error-hint").html(g).show();return false}}},this);return true},_showErrorDlg:function(c){var b=this.getMainJQ();
var a=this;if(a._errorDlg===null){var d=b.find(".shoppingbasket-error-dialog");b.find(document.body).append(d);
a._errorDlg=new apsinth.util.Layer(d)}},_implodeRecursive:function(c){var a="";var b=this;jQuery(c).each(function(d,f){if(typeof(f)==="string"){a+=f
}else{a+=b._implodeRecursive(f)}});return a},_showDialog:function(a){var b=this.getMainJQ().find("#shoppingBasketDialogs");
jQuery(document.body).append(b);jQuery("."+a+"-dialog").show();this.getMainJQ().find("."+a+"-dialog").show();
if(this.sbDgl===undefined){this.sbDgl=new apsinth.util.Layer(b)}b.find(".ccclose, .homepage").click(this.toHandler(function(c){b.find("[class$=dialog]").hide();
this.sbDgl.hide();if(a==="ack"){window.location.href=nonSslServerUrl}},this));this.sbDgl.showAbove(this.getMainJQ(),true,0)
},_hideDialog:function(){},_showValidationError:function(e,d){var c=this.getMainJQ();d=d.replace(/\'/g,"");
var b=document.createElement("span");jQuery(b).addClass("error_icon");jQuery(b).html(" ");var a=c.find("#"+e);
if(a.length&&jQuery(c.find("[name='"+e+"']")).attr("type")!=="radio"){if(jQuery(a).next().length){jQuery(a).next().after(b)
}else{jQuery(a).after(b)}}else{c.find("#"+e+"-label + td").append(b)}jQuery(b).bind("mouseover",this.toHandler(function(k){var n=jQuery('<span class="error_popup"></span>');
n.text(d);jQuery(k.target).append(n);var f=jQuery(window).width();jQuery(".error_popup").show();var h=jQuery(".error_popup").offset().left;
var m=jQuery(".error_popup").width();var g=h+m;if(g>=f){var l=(f-h)-20;jQuery(".error_popup").width(l);
var i=jQuery(".error_popup").html();var j=/(.*?)\s+(.*)(\s).*/;var o=j.exec(i);i=i.replace(RegExp.$1,RegExp.$1+"<br/>");
jQuery(".error_popup").html(i);jQuery(".error_popup").css({"word-wrap":"break-word","white-space":"normal"})
}},this));jQuery(b).bind("mouseout",this.toHandler(function(f){jQuery(".error_popup").hide();jQuery(".error_popup").remove()
},this))},_setTaxHandler:function(a){var d=this.getMainJQ();var c=d.find("#localeGenuine").val();Shoppingbasket.tax_activeAdress=a;
if(a=="inv"){currentCity=d.find("#inv_city");currentState=d.find("#inv_state");currentZip=d.find("#inv_pc")
}else{currentCity=d.find("#del_city");currentState=d.find("#del_state");currentZip=d.find("#del_pc")}if(c=="en_CA"||c=="en_US"){this._resetTaxHandler(a);
var b=this;d.find("div.taxContainer").css("display","block");d.find("td#taxContainer_taxValue").html("$ 0.00");
d.find("td#taxContainer_totalValue").html(d.find("td#price_total").html());currentCity.focusout(function(){b._revalidateTaxField(a,"City",currentCity,c)
});currentState.change(function(){b._revalidateTaxField(a,"State",currentState,c)});currentZip.focusout(function(){b._revalidateTaxField(a,"Zip",currentZip,c)
});if(Shoppingbasket.tax_cityCheck!=0||Shoppingbasket.tax_stateCheck!=0||Shoppingbasket.tax_zipCheck!=0){b._revalidateTaxField(a,"City",currentCity,c);
b._revalidateTaxField(a,"State",currentState,c);b._revalidateTaxField(a,"Zip",currentZip,c)}}},_revalidateTaxField:function(b,e,a,d){var c=this.getMainJQ();
switch(e){case"City":if(a.val().length>0){c.find("img#city_good").css("display","inline");Shoppingbasket.tax_cityCheck=1
}else{c.find("img#city_good").css("display","none");Shoppingbasket.tax_cityCheck=0}break;case"State":if(a.val()!="default"){c.find("img#state_good").css("display","inline");
Shoppingbasket.tax_stateCheck=1}else{c.find("img#state_good").css("display","none");Shoppingbasket.tax_stateCheck=0
}break;case"Zip":if(d=="en_CA"){regex=/^[0-9A-Z]{3}[ ]*[0-9A-Z]{3}$/i}else{if(d=="en_US"){regex=/^([0-9]{5}|[0-9]{5}[-]?[0-9]{4})$/
}}result=regex.exec(a.val());if(result){c.find("img#zip_good").css("display","inline");Shoppingbasket.tax_zipCheck=1
}else{c.find("img#zip_good").css("display","none");Shoppingbasket.tax_zipCheck=0}break}if(Shoppingbasket.tax_cityCheck==1&&Shoppingbasket.tax_stateCheck==1&&Shoppingbasket.tax_zipCheck==1){this._refreshPrices()
}else{c.find("#taxContainer_taxValue").html("$ 0.00");c.find("#taxContainer_totalValue").html(c.find("td#price_total").html())
}},_resetTaxHandler:function(a){var b=this.getMainJQ();if(a=="inv"){b.find("#del_city").focusout(function(){});
b.find("#del_state").focusout(function(){});b.find("#del_pc").focusout(function(){});b.find("div.taxContainer").css("top","-260px")
}else{b.find("#inv_city").focusout(function(){});b.find("#inv_state").focusout(function(){});b.find("#inv_pc").focusout(function(){});
b.find("div.taxContainer").css("top","-177px")}b.find("img#zip_good").css("display","none");b.find("img#state_good").css("display","none");
b.find("img#city_good").css("display","none");Shoppingbasket.tax_cityCheck=0;Shoppingbasket.tax_stateCheck=0;
Shoppingbasket.tax_zipCheck=0}});shoppingbasket.msg.main_Shoppingbasket={delete_article:"Delete item?",form_errors:"An error has occurred.",no_items:"No items in the shopping cart.",paypal_link:"Pay via PayPal",paypal_link_text:"Please click this link if your browser does not automatically open a new window for the PayPal payment:"};