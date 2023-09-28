/*
 * $ lightbox_me
 * By: Buck Wilson
 * Version : 2.4
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function(e){e.fn.lightbox_me=function(o){return this.each(function(){var i=e.extend({},e.fn.lightbox_me.defaults,o),n=e(),t=e(this),l=e('<iframe id="foo" style="z-index: '+(i.zIndex+1)+';border: none; margin: 0; padding: 0; position: absolute; width: 100%; height: 100%; top: 0; left: 0; filter: mask();"/>');if(i.showOverlay){var s=e(".js_lb_overlay:visible");n=s.length>0?e('<div class="lb_overlay_clear js_lb_overlay"/>'):e('<div class="'+i.classPrefix+'_overlay js_lb_overlay"/>')}function d(){t[0].style;i.destroyOnClose?t.add(n).remove():t.add(n).hide(),i.parentLightbox&&i.parentLightbox.fadeIn(200),i.preventScroll&&e("body").css("overflow",""),l.remove(),t.undelegate(i.closeSelector,"click"),t.unbind("close",d),t.unbind("repositon",a),e(window).unbind("resize",c),e(window).unbind("resize",a),e(window).unbind("scroll",a),e(window).unbind("keyup.lightbox_me"),i.onClose()}function c(){e(window).height()<e(document).height()?(n.css({height:e(document).height()+"px"}),l.css({height:e(document).height()+"px"})):n.css({height:"100%"})}function a(){t[0].style;if(t.css({left:"50%",marginLeft:t.outerWidth()/2*-1,zIndex:i.zIndex+3}),t.height()+80>=e(window).height()&&"absolute"!=t.css("position")){var o=e(document).scrollTop()+40;t.css({position:"absolute",top:o+"px",marginTop:0})}else t.height()+80<e(window).height()&&(i.centered?t.css({position:"fixed",top:"50%",marginTop:t.outerHeight()/2*-1}):t.css({position:"fixed"}).css(i.modalCSS),i.preventScroll&&e("body").css("overflow","hidden"))}e("body").append(t.hide()).append(n),i.showOverlay&&(c(),n.css({position:"absolute",width:"100%",top:0,left:0,right:0,bottom:0,zIndex:i.zIndex+2,display:"none"}),n.hasClass("lb_overlay_clear")||n.css(i.overlayCSS)),i.showOverlay?n.fadeIn(i.overlaySpeed,function(){a(),t[i.appearEffect](i.lightboxSpeed,function(){c(),a(),i.onLoad()})}):(a(),t[i.appearEffect](i.lightboxSpeed,function(){i.onLoad()})),i.parentLightbox&&i.parentLightbox.fadeOut(200),e(window).resize(c).resize(a).scroll(a),e(window).bind("keyup.lightbox_me",function(e){(27==e.keyCode||27==e.DOM_VK_ESCAPE&&0==e.which)&&i.closeEsc&&d()}),i.closeClick&&n.click(function(e){d(),e.preventDefault}),t.delegate(i.closeSelector,"click",function(e){d(),e.preventDefault()}),t.bind("close",d),t.bind("reposition",a)})},e.fn.lightbox_me.defaults={appearEffect:"fadeIn",appearEase:"",overlaySpeed:250,lightboxSpeed:300,closeSelector:".close",closeClick:!0,closeEsc:!0,destroyOnClose:!1,showOverlay:!0,parentLightbox:!1,preventScroll:!1,onLoad:function(){},onClose:function(){},classPrefix:"lb",zIndex:999,centered:!1,modalCSS:{top:"40px"},overlayCSS:{background:"black",opacity:.3}}}(jQuery);