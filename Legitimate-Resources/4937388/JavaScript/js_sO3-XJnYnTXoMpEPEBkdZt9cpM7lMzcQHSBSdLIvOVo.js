/* Source and licensing information for the line(s) below can be found at https://www.autopozicovna-kosice.sk/modules/custom/car_rental_base/js/map.js. */
/**
 * @file
 * Map.
 */
(function ($, Drupal) {

  "use strict";

  Drupal.behaviors.carRentalBaseGoogleMap = {
    attach: function (context, settings) {
      var $context = $(context);
      $context.find('#block-googlemap').once('map-process').each(function () {
        if ($(window).width() > 640) {
          var mapBlock = $(this);
          mapBlock.addClass('tw-h-map')
          var mapElement = $(this)[0]
          var mapOptions = {
            zoom: 16,
            disableDefaultUI: true, // Disable controls
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            scrollwheel: false
          };

          // Create the Google Map using our element and options defined above
          var map = new google.maps.Map(mapElement, mapOptions);

          // var marker_icon = {
          //   url: "/themes/custom/autopozicovna_kosice/images/logo_mark_map.svg",
          //   scaledSize: new google.maps.Size(80,80),
          // }


          var latlngbounds = new google.maps.LatLngBounds();
          //var location = new google.maps.LatLng(48.683969, 21.265503);
          var location = new google.maps.LatLng(drupalSettings.google_map.latitude, drupalSettings.google_map.longitude);
          var marker = new google.maps.Marker({
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: location,
            title: "Remesplus Industry",
          });
          latlngbounds.extend(location);

          if ($(window).width() < 1010) {
            map.setCenter(latlngbounds.getCenter());
            map.panBy(0, 0);
          } else {
            map.setCenter(latlngbounds.getCenter());
            map.panBy(-150, 0);
          }


          $(window).bind('resize', function () {
            if ($(window).width() < 640) {
              map.setCenter(latlngbounds.getCenter());
              map.panBy(0, 0);
            } else {
              if ($(window).width() < 1024) {
                map.setCenter(latlngbounds.getCenter());
                map.panBy(-285, 0);
              } else {
                map.setCenter(latlngbounds.getCenter());
                map.panBy(-150, 0);
              }
            }
          }).trigger('resize');
        }
      });

    }
  };

})(jQuery, Drupal);

/* Source and licensing information for the above line(s) can be found at https://www.autopozicovna-kosice.sk/modules/custom/car_rental_base/js/map.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.autopozicovna-kosice.sk/themes/custom/autopozicovna_kosice/libs/owl.carousel/owl.carousel.min.js. */
/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},a.each(["onResize","onThrottledResize"],a.proxy(function(b,c){this._handlers[c]=a.proxy(this[c],this)},this)),a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a.charAt(0).toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Workers,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}e.Defaults={items:3,loop:!1,center:!1,rewind:!1,checkVisibility:!0,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,fallbackEasing:"swing",slideTransition:"",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Type={Event:"event",State:"state"},e.Plugins={},e.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(a){var b=this.settings.margin||"",c=!this.settings.autoWidth,d=this.settings.rtl,e={width:"auto","margin-left":d?b:"","margin-right":d?"":b};!c&&this.$stage.children().css(e),a.css=e}},{filter:["width","items","settings"],run:function(a){var b=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,c=null,d=this._items.length,e=!this.settings.autoWidth,f=[];for(a.items={merge:!1,width:b};d--;)c=this._mergers[d],c=this.settings.mergeFit&&Math.min(c,this.settings.items)||c,a.items.merge=c>1||a.items.merge,f[d]=e?b*c:this._items[d].width();this._widths=f}},{filter:["items","settings"],run:function(){var b=[],c=this._items,d=this.settings,e=Math.max(2*d.items,4),f=2*Math.ceil(c.length/2),g=d.loop&&c.length?d.rewind?e:Math.max(e,f):0,h="",i="";for(g/=2;g>0;)b.push(this.normalize(b.length/2,!0)),h+=c[b[b.length-1]][0].outerHTML,b.push(this.normalize(c.length-1-(b.length-1)/2,!0)),i=c[b[b.length-1]][0].outerHTML+i,g-=1;this._clones=b,a(h).addClass("cloned").appendTo(this.$stage),a(i).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var a=this.settings.rtl?1:-1,b=this._clones.length+this._items.length,c=-1,d=0,e=0,f=[];++c<b;)d=f[c-1]||0,e=this._widths[this.relative(c)]+this.settings.margin,f.push(d+e*a);this._coordinates=f}},{filter:["width","items","settings"],run:function(){var a=this.settings.stagePadding,b=this._coordinates,c={width:Math.ceil(Math.abs(b[b.length-1]))+2*a,"padding-left":a||"","padding-right":a||""};this.$stage.css(c)}},{filter:["width","items","settings"],run:function(a){var b=this._coordinates.length,c=!this.settings.autoWidth,d=this.$stage.children();if(c&&a.items.merge)for(;b--;)a.css.width=this._widths[this.relative(b)],d.eq(b).css(a.css);else c&&(a.css.width=a.items.width,d.css(a.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(a){a.current=a.current?this.$stage.children().index(a.current):0,a.current=Math.max(this.minimum(),Math.min(this.maximum(),a.current)),this.reset(a.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;c<d;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass("active"),this.$stage.children(".center").removeClass("center"),this.settings.center&&this.$stage.children().eq(this.current()).addClass("center")}}],e.prototype.initializeStage=function(){this.$stage=this.$element.find("."+this.settings.stageClass),this.$stage.length||(this.$element.addClass(this.options.loadingClass),this.$stage=a("<"+this.settings.stageElement+">",{class:this.settings.stageClass}).wrap(a("<div/>",{class:this.settings.stageOuterClass})),this.$element.append(this.$stage.parent()))},e.prototype.initializeItems=function(){var b=this.$element.find(".owl-item");if(b.length)return this._items=b.get().map(function(b){return a(b)}),this._mergers=this._items.map(function(){return 1}),void this.refresh();this.replace(this.$element.children().not(this.$stage.parent())),this.isVisible()?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)},e.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var a,b,c;a=this.$element.find("img"),b=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,c=this.$element.children(b).width(),a.length&&c<=0&&this.preloadAutoWidthImages(a)}this.initializeStage(),this.initializeItems(),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},e.prototype.isVisible=function(){return!this.settings.checkVisibility||this.$element.is(":visible")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){a<=b&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),"function"==typeof e.stagePadding&&(e.stagePadding=e.stagePadding()),delete e.responsive,e.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+d))):e=a.extend({},this.options),this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},e.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};b<c;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={},!this.is("valid")&&this.enter("valid")},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.isVisible()&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},e.prototype.registerEventHandlers=function(){a.support.transition&&this.$stage.on(a.support.transition.end+".owl.core",a.proxy(this.onTransitionEnd,this)),!1!==this.settings.responsive&&this.on(b,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",a.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",a.proxy(this.onDragEnd,this)))},e.prototype.onDragStart=function(b){var d=null;3!==b.which&&(a.support.transform?(d=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),d={x:d[16===d.length?12:4],y:d[16===d.length?13:5]}):(d=this.$stage.position(),d={x:this.settings.rtl?d.left+this.$stage.width()-this.width()+this.settings.margin:d.left,y:d.top}),this.is("animating")&&(a.support.transform?this.animate(d.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===b.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=a(b.target),this._drag.stage.start=d,this._drag.stage.current=d,this._drag.pointer=this.pointer(b),a(c).on("mouseup.owl.core touchend.owl.core",a.proxy(this.onDragEnd,this)),a(c).one("mousemove.owl.core touchmove.owl.core",a.proxy(function(b){var d=this.difference(this._drag.pointer,this.pointer(b));a(c).on("mousemove.owl.core touchmove.owl.core",a.proxy(this.onDragMove,this)),Math.abs(d.x)<Math.abs(d.y)&&this.is("valid")||(b.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},e.prototype.onDragMove=function(a){var b=null,c=null,d=null,e=this.difference(this._drag.pointer,this.pointer(a)),f=this.difference(this._drag.stage.start,e);this.is("dragging")&&(a.preventDefault(),this.settings.loop?(b=this.coordinates(this.minimum()),c=this.coordinates(this.maximum()+1)-b,f.x=((f.x-b)%c+c)%c+b):(b=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),c=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),d=this.settings.pullDrag?-1*e.x/5:0,f.x=Math.max(Math.min(f.x,b+d),c+d)),this._drag.stage.current=f,this.animate(f.x))},e.prototype.onDragEnd=function(b){var d=this.difference(this._drag.pointer,this.pointer(b)),e=this._drag.stage.current,f=d.x>0^this.settings.rtl?"left":"right";a(c).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==d.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(e.x,0!==d.x?f:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=f,(Math.abs(d.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},e.prototype.closest=function(b,c){var e=-1,f=30,g=this.width(),h=this.coordinates();return this.settings.freeDrag||a.each(h,a.proxy(function(a,i){return"left"===c&&b>i-f&&b<i+f?e=a:"right"===c&&b>i-g-f&&b<i-g+f?e=a+1:this.op(b,"<",i)&&this.op(b,">",h[a+1]!==d?h[a+1]:i-g)&&(e="left"===c?a+1:a),-1===e},this)),this.settings.loop||(this.op(b,">",h[this.minimum()])?e=b=this.minimum():this.op(b,"<",h[this.maximum()])&&(e=b=this.maximum())),e},e.prototype.animate=function(b){var c=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),c&&(this.enter("animating"),this.trigger("translate")),a.support.transform3d&&a.support.transition?this.$stage.css({transform:"translate3d("+b+"px,0px,0px)",transition:this.speed()/1e3+"s"+(this.settings.slideTransition?" "+this.settings.slideTransition:"")}):c?this.$stage.animate({left:b+"px"},this.speed(),this.settings.fallbackEasing,a.proxy(this.onTransitionEnd,this)):this.$stage.css({left:b+"px"})},e.prototype.is=function(a){return this._states.current[a]&&this._states.current[a]>0},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(b){return"string"===a.type(b)&&(this._invalidated[b]=!0,this.is("valid")&&this.leave("valid")),a.map(this._invalidated,function(a,b){return b})},e.prototype.reset=function(a){(a=this.normalize(a))!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(a,b){var c=this._items.length,e=b?0:this._clones.length;return!this.isNumeric(a)||c<1?a=d:(a<0||a>=c+e)&&(a=((a-e/2)%c+c)%c+e/2),a},e.prototype.relative=function(a){return a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=this.settings,f=this._coordinates.length;if(e.loop)f=this._clones.length/2+this._items.length-1;else if(e.autoWidth||e.merge){if(b=this._items.length)for(c=this._items[--b].width(),d=this.$element.width();b--&&!((c+=this._items[b].width()+this.settings.margin)>d););f=b+1}else f=e.center?this._items.length-1:this._items.length-e.items;return a&&(f-=this._clones.length/2),Math.max(f,0)},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2==0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c,e=1,f=b-1;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(this.settings.rtl&&(e=-1,f=b+1),c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[f]||0))/2*e):c=this._coordinates[f]||0,c=Math.ceil(c))},e.prototype.duration=function(a,b,c){return 0===c?0:Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(a,b){var c=this.current(),d=null,e=a-this.relative(c),f=(e>0)-(e<0),g=this._items.length,h=this.minimum(),i=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(e)>g/2&&(e+=-1*f*g),a=c+e,(d=((a-h)%g+g)%g+h)!==a&&d-e<=i&&d-e>0&&(c=d-e,a=d,this.reset(c))):this.settings.rewind?(i+=1,a=(a%i+i)%i):a=Math.max(h,Math.min(i,a)),this.speed(this.duration(c,a,b)),this.current(a),this.isVisible()&&this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.onTransitionEnd=function(a){if(a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0)))return!1;this.leave("animating"),this.trigger("translated")},e.prototype.viewport=function(){var d;return this.options.responsiveBaseElement!==b?d=a(this.options.responsiveBaseElement).width():b.innerWidth?d=b.innerWidth:c.documentElement&&c.documentElement.clientWidth?d=c.documentElement.clientWidth:console.warn("Can not detect viewport width."),d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(b,c){var e=this.relative(this._current);c=c===d?this._items.length:this.normalize(c,!0),b=b instanceof jQuery?b:a(b),this.trigger("add",{content:b,position:c}),b=this.prepare(b),0===this._items.length||c===this._items.length?(0===this._items.length&&this.$stage.append(b),0!==this._items.length&&this._items[c-1].after(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[c].before(b),this._items.splice(c,0,b),this._mergers.splice(c,0,1*b.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[e]&&this.reset(this._items[e].index()),this.invalidate("items"),this.trigger("added",{content:b,position:c})},e.prototype.remove=function(a){(a=this.normalize(a,!0))!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.preloadAutoWidthImages=function(b){b.each(a.proxy(function(b,c){this.enter("pre-loading"),c=a(c),a(new Image).one("load",a.proxy(function(a){c.attr("src",a.target.src),c.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",c.attr("src")||c.attr("data-src")||c.attr("data-src-retina"))},this))},e.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),a(c).off(".owl.core"),!1!==this.settings.responsive&&(b.clearTimeout(this.resizeTimer),this.off(b,"resize",this._handlers.onThrottledResize));for(var d in this._plugins)this._plugins[d].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.remove(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:a<c;case">":return d?a<c:a>c;case">=":return d?a<=c:a>=c;case"<=":return d?a>=c:a<=c}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d,f,g){var h={item:{count:this._items.length,index:this.current()}},i=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),j=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},h,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(j)}),this.register({type:e.Type.Event,name:b}),this.$element.trigger(j),this.settings&&"function"==typeof this.settings[i]&&this.settings[i].call(this,j)),j},e.prototype.enter=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]===d&&(this._states.current[b]=0),this._states.current[b]++},this))},e.prototype.leave=function(b){a.each([b].concat(this._states.tags[b]||[]),a.proxy(function(a,b){this._states.current[b]--},this))},e.prototype.register=function(b){if(b.type===e.Type.Event){if(a.event.special[b.name]||(a.event.special[b.name]={}),!a.event.special[b.name].owl){var c=a.event.special[b.name]._default;a.event.special[b.name]._default=function(a){return!c||!c.apply||a.namespace&&-1!==a.namespace.indexOf("owl")?a.namespace&&a.namespace.indexOf("owl")>-1:c.apply(this,arguments)},a.event.special[b.name].owl=!0}}else b.type===e.Type.State&&(this._states.tags[b.name]?this._states.tags[b.name]=this._states.tags[b.name].concat(b.tags):this._states.tags[b.name]=b.tags,this._states.tags[b.name]=a.grep(this._states.tags[b.name],a.proxy(function(c,d){return a.inArray(c,this._states.tags[b.name])===d},this)))},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.pointer=function(a){var c={x:null,y:null};return a=a.originalEvent||a||b.event,a=a.touches&&a.touches.length?a.touches[0]:a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:a,a.pageX?(c.x=a.pageX,c.y=a.pageY):(c.x=a.clientX,c.y=a.clientY),c},e.prototype.isNumeric=function(a){return!isNaN(parseFloat(a))},e.prototype.difference=function(a,b){return{x:a.x-b.x,y:a.y-b.y}},a.fn.owlCarousel=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){var d=a(this),f=d.data("owl.carousel");f||(f=new e(this,"object"==typeof b&&b),d.data("owl.carousel",f),a.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(b,c){f.register({type:e.Type.Event,name:c}),f.$element.on(c+".owl.carousel.core",a.proxy(function(a){a.namespace&&a.relatedTarget!==this&&(this.suppress([c]),f[c].apply(this,[].slice.call(arguments,1)),this.release([c]))},f))})),"string"==typeof b&&"_"!==b.charAt(0)&&f[b].apply(f,c)})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={autoRefresh:!0,autoRefreshInterval:500},e.prototype.watch=function(){this._interval||(this._visible=this._core.isVisible(),this._interval=b.setInterval(a.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},e.prototype.refresh=function(){this._core.isVisible()!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},e.prototype.destroy=function(){var a,c;b.clearInterval(this._interval);for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoRefresh=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type)){var c=this._core.settings,e=c.center&&Math.ceil(c.items/2)||c.items,f=c.center&&-1*e||0,g=(b.property&&b.property.value!==d?b.property.value:this._core.current())+f,h=this._core.clones().length,i=a.proxy(function(a,b){this.load(b)},this);for(c.lazyLoadEager>0&&(e+=c.lazyLoadEager,c.loop&&(g-=c.lazyLoadEager,e++));f++<e;)this.load(h/2+this._core.relative(g)),h&&a.each(this._core.clones(this._core.relative(g)),i),g++}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers)};e.Defaults={lazyLoad:!1,lazyLoadEager:0},e.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src")||f.attr("data-srcset");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):f.is("source")?f.one("load.owl.lazy",a.proxy(function(){this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("srcset",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":'url("'+g+'")',opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(c){this._core=c,this._previousHeight=null,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&"position"===a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){a.namespace&&this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._intervalId=null;var d=this;a(b).on("load",function(){d._core.settings.autoHeight&&d.update()}),a(b).resize(function(){d._core.settings.autoHeight&&(null!=d._intervalId&&clearTimeout(d._intervalId),d._intervalId=setTimeout(function(){d.update()},250))})};e.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},e.prototype.update=function(){var b=this._core._current,c=b+this._core.settings.items,d=this._core.settings.lazyLoad,e=this._core.$stage.children().toArray().slice(b,c),f=[],g=0;a.each(e,function(b,c){f.push(a(c).height())}),g=Math.max.apply(null,f),g<=1&&d&&this._previousHeight&&(g=this._previousHeight),this._previousHeight=g,this._core.$stage.parent().height(g).addClass(this._core.settings.autoHeightClass)},e.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.video&&this.isInFullScreen()&&a.preventDefault()},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"===a.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};e.Defaults={video:!1,videoHeight:!1,videoWidth:!1},e.prototype.fetch=function(a,b){var c=function(){return a.attr("data-vimeo-id")?"vimeo":a.attr("data-vzaar-id")?"vzaar":"youtube"}(),d=a.attr("data-vimeo-id")||a.attr("data-youtube-id")||a.attr("data-vzaar-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else if(d[3].indexOf("vimeo")>-1)c="vimeo";else{if(!(d[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");c="vzaar"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},e.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?"width:"+c.width+"px;height:"+c.height+"px;":"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(c){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?a("<div/>",{class:"owl-video-tn "+j,srcType:c}):a("<div/>",{class:"owl-video-tn",style:"opacity:1;background-image:url("+c+")"}),b.after(d),b.after(e)};if(b.wrap(a("<div/>",{class:"owl-video-wrapper",style:g})),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length)return l(h.attr(i)),h.remove(),!1;"youtube"===c.type?(f="//img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type?a.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}):"vzaar"===c.type&&a.ajax({type:"GET",url:"//vzaar.com/api/videos/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a.framegrab_url,l(f)}})},e.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},e.prototype.play=function(b){var c,d=a(b.target),e=d.closest("."+this._core.settings.itemClass),f=this._videos[e.attr("data-video")],g=f.width||"100%",h=f.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),e=this._core.items(this._core.relative(e.index())),this._core.reset(e.index()),c=a('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'),c.attr("height",h),c.attr("width",g),"youtube"===f.type?c.attr("src","//www.youtube.com/embed/"+f.id+"?autoplay=1&rel=0&v="+f.id):"vimeo"===f.type?c.attr("src","//player.vimeo.com/video/"+f.id+"?autoplay=1"):"vzaar"===f.type&&c.attr("src","//view.vzaar.com/"+f.id+"/player?autoplay=true"),a(c).wrap('<div class="owl-video-frame" />').insertAfter(e.find(".owl-video")),this._playing=e.addClass("owl-video-playing"))},e.prototype.isInFullScreen=function(){var b=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return b&&a(b).parent().hasClass("owl-video-frame")},e.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){a.namespace&&(this.swapping="translated"==a.type)},this),"translate.owl.carousel":a.proxy(function(a){a.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,
animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&a.support.animation&&a.support.transition){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.one(a.support.animation.end,c).css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g)),f&&e.one(a.support.animation.end,c).addClass("animated owl-animated-in").addClass(f))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this._core=b,this._call=null,this._time=0,this._timeout=0,this._paused=!0,this._handlers={"changed.owl.carousel":a.proxy(function(a){a.namespace&&"settings"===a.property.name?this._core.settings.autoplay?this.play():this.stop():a.namespace&&"position"===a.property.name&&this._paused&&(this._time=0)},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":a.proxy(function(a,b,c){a.namespace&&this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(a){a.namespace&&this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":a.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=a.extend({},e.Defaults,this._core.options)};e.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},e.prototype._next=function(d){this._call=b.setTimeout(a.proxy(this._next,this,d),this._timeout*(Math.round(this.read()/this._timeout)+1)-this.read()),this._core.is("interacting")||c.hidden||this._core.next(d||this._core.settings.autoplaySpeed)},e.prototype.read=function(){return(new Date).getTime()-this._time},e.prototype.play=function(c,d){var e;this._core.is("rotating")||this._core.enter("rotating"),c=c||this._core.settings.autoplayTimeout,e=Math.min(this._time%(this._timeout||c),c),this._paused?(this._time=this.read(),this._paused=!1):b.clearTimeout(this._call),this._time+=this.read()%c-e,this._timeout=c,this._call=b.setTimeout(a.proxy(this._next,this,d),c-e)},e.prototype.stop=function(){this._core.is("rotating")&&(this._time=0,this._paused=!0,b.clearTimeout(this._call),this._core.leave("rotating"))},e.prototype.pause=function(){this._core.is("rotating")&&!this._paused&&(this._time=this.read(),this._paused=!0,b.clearTimeout(this._call))},e.prototype.destroy=function(){var a,b;this.stop();for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(b){this._core=b,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){b.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+a(b.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,0,this._templates.pop())},this),"remove.owl.carousel":a.proxy(function(a){a.namespace&&this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"changed.owl.carousel":a.proxy(function(a){a.namespace&&"position"==a.property.name&&this.draw()},this),"initialized.owl.carousel":a.proxy(function(a){a.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":a.proxy(function(a){a.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers)};e.Defaults={nav:!1,navText:['<span aria-label="Previous">&#x2039;</span>','<span aria-label="Next">&#x203a;</span>'],navSpeed:!1,navElement:'button type="button" role="presentation"',navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},e.prototype.initialize=function(){var b,c=this._core.settings;this._controls.$relative=(c.navContainer?a(c.navContainer):a("<div>").addClass(c.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=a("<"+c.navElement+">").addClass(c.navClass[0]).html(c.navText[0]).prependTo(this._controls.$relative).on("click",a.proxy(function(a){this.prev(c.navSpeed)},this)),this._controls.$next=a("<"+c.navElement+">").addClass(c.navClass[1]).html(c.navText[1]).appendTo(this._controls.$relative).on("click",a.proxy(function(a){this.next(c.navSpeed)},this)),c.dotsData||(this._templates=[a('<button role="button">').addClass(c.dotClass).append(a("<span>")).prop("outerHTML")]),this._controls.$absolute=(c.dotsContainer?a(c.dotsContainer):a("<div>").addClass(c.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","button",a.proxy(function(b){var d=a(b.target).parent().is(this._controls.$absolute)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(d,c.dotsSpeed)},this));for(b in this._overrides)this._core[b]=a.proxy(this[b],this)},e.prototype.destroy=function(){var a,b,c,d,e;e=this._core.settings;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)"$relative"===b&&e.navContainer?this._controls[b].html(""):this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},e.prototype.update=function(){var a,b,c,d=this._core.clones().length/2,e=d+this._core.items().length,f=this._core.maximum(!0),g=this._core.settings,h=g.center||g.autoWidth||g.dotsData?1:g.dotsEach||g.items;if("page"!==g.slideBy&&(g.slideBy=Math.min(g.slideBy,g.items)),g.dots||"page"==g.slideBy)for(this._pages=[],a=d,b=0,c=0;a<e;a++){if(b>=h||0===b){if(this._pages.push({start:Math.min(f,a-d),end:a-d+h-1}),Math.min(f,a-d)===f)break;b=0,++c}b+=this._core.mergers(this._core.relative(a))}},e.prototype.draw=function(){var b,c=this._core.settings,d=this._core.items().length<=c.items,e=this._core.relative(this._core.current()),f=c.loop||c.rewind;this._controls.$relative.toggleClass("disabled",!c.nav||d),c.nav&&(this._controls.$previous.toggleClass("disabled",!f&&e<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!f&&e>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!c.dots||d),c.dots&&(b=this._pages.length-this._controls.$absolute.children().length,c.dotsData&&0!==b?this._controls.$absolute.html(this._templates.join("")):b>0?this._controls.$absolute.append(new Array(b+1).join(this._templates[0])):b<0&&this._controls.$absolute.children().slice(b).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(a.inArray(this.current(),this._pages)).addClass("active"))},e.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotsData?1:c.dotsEach||c.items)}},e.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,a.proxy(function(a,c){return a.start<=b&&a.end>=b},this)).pop()},e.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},e.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},e.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},e.prototype.to=function(b,c,d){var e;!d&&this._pages.length?(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c)):a.proxy(this._overrides.to,this._core)(b,c)},a.fn.owlCarousel.Constructor.Plugins.Navigation=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){"use strict";var e=function(c){this._core=c,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(c){c.namespace&&"URLHash"===this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){if(b.namespace){var c=a(b.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!c)return;this._hashes[c]=b.content}},this),"changed.owl.carousel":a.proxy(function(c){if(c.namespace&&"position"===c.property.name){var d=this._core.items(this._core.relative(this._core.current())),e=a.map(this._hashes,function(a,b){return a===d?b:null}).join();if(!e||b.location.hash.slice(1)===e)return;b.location.hash=e}},this)},this._core.options=a.extend({},e.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(a){var c=b.location.hash.substring(1),e=this._core.$stage.children(),f=this._hashes[c]&&e.index(this._hashes[c]);f!==d&&f!==this._core.current()&&this._core.to(this._core.relative(f),!1,!0)},this))};e.Defaults={URLhashListener:!1},e.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=e}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){function e(b,c){var e=!1,f=b.charAt(0).toUpperCase()+b.slice(1);return a.each((b+" "+h.join(f+" ")+f).split(" "),function(a,b){if(g[b]!==d)return e=!c||b,!1}),e}function f(a){return e(a,!0)}var g=a("<support>").get(0).style,h="Webkit Moz O ms".split(" "),i={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},j={csstransforms:function(){return!!e("transform")},csstransforms3d:function(){return!!e("perspective")},csstransitions:function(){return!!e("transition")},cssanimations:function(){return!!e("animation")}};j.csstransitions()&&(a.support.transition=new String(f("transition")),a.support.transition.end=i.transition.end[a.support.transition]),j.cssanimations()&&(a.support.animation=new String(f("animation")),a.support.animation.end=i.animation.end[a.support.animation]),j.csstransforms()&&(a.support.transform=new String(f("transform")),a.support.transform3d=j.csstransforms3d())}(window.Zepto||window.jQuery,window,document);
/* Source and licensing information for the above line(s) can be found at https://www.autopozicovna-kosice.sk/themes/custom/autopozicovna_kosice/libs/owl.carousel/owl.carousel.min.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.autopozicovna-kosice.sk/themes/custom/autopozicovna_kosice/js/reviews.js. */
/**
 * @file
 * "Image" paragraph javascripts.
 */
(function ($, Drupal) {

  "use strict";

  Drupal.behaviors.autopozicovna_kosiceReviews = {
    attach: function (context, settings) {
      var $context = $(context);
      $context.find('.view-reviews', context).once('field--name-field-content-elements').each( function () {
        var owl = $('.view-content', this);
        if ($('.views-row', owl).length > 1) {
          owl.addClass('owl-carousel');
          owl.owlCarousel({
            center: true,
            loop: true,
            margin: 0,
            dots: true,
            dotsClass: 'owl-dots tw-text-center',
            nav: false,
            autoplay: false,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
            responsive:{
              0:{
                items: 1
              },
              480:{
                items: 1,
                center: false
              },
              720:{
                items: 1,
                center: true
              },
              950:{
                items: 2,
                center: false
              },
              1200:{
                items: 2,
                center: false
              }
            }
          });
        }
      });
    }
  };

})(jQuery, Drupal);

/* Source and licensing information for the above line(s) can be found at https://www.autopozicovna-kosice.sk/themes/custom/autopozicovna_kosice/js/reviews.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.autopozicovna-kosice.sk/themes/custom/autopozicovna_kosice/js/articles.js. */
/**
 * @file
 * "Image" paragraph javascripts.
 */
(function ($, Drupal) {

  "use strict";

  Drupal.behaviors.autopozicovna_kosiceAktuality = {
    attach: function (context, settings) {
      var $context = $(context);
      $context.find('.view-articles', context).once('field--name-field-content-elements').each( function () {
        var owl = $('.view-content', this);
        if ($('.views-row', owl).length > 1) {
          owl.addClass('owl-carousel');
          owl.owlCarousel({
            center: true,
            loop: true,
            margin: 0,
            dots: true,
            dotsClass: 'owl-dots tw-text-center',
            nav: false,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
            responsive:{
              0:{
                items: 1
              },
              480:{
                items: 1,
                center: false
              },
              720:{
                items: 1,
                center: true
              },
              950:{
                items: 1,
                center: false
              },
              1200:{
                items: 1,
                center: false
              }
            }
          });
        }
      });
    }
  };

})(jQuery, Drupal);

/* Source and licensing information for the above line(s) can be found at https://www.autopozicovna-kosice.sk/themes/custom/autopozicovna_kosice/js/articles.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.autopozicovna-kosice.sk/themes/custom/autopozicovna_kosice/js/slider_items.js. */
/**
 * @file
 * "Image" paragraph javascripts.
 */
(function ($, Drupal) {

  "use strict";

  Drupal.behaviors.autopozicovna_kosiceSliderItems = {
    attach: function (context, settings) {
      var $context = $(context);
      $context.find('.paragraph--type--slider-items', context).once('field--name-field-content-elements').each( function () {
        var owl = $('.field--name-field-items', this);
        if ($('.field__item', owl).length > 1) {
          owl.addClass('owl-carousel');
          owl.owlCarousel({
            stagePadding: 0,
            center: true,
            loop: true,
            margin: 0,
            dots: false,
            nav: false,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            animateOut: 'fadeOut',
            //navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
            responsive:{
              0:{
                items: 1,
                center: false
              },
            }
          });
        }
      });
    }
  };

})(jQuery, Drupal);


/* Source and licensing information for the above line(s) can be found at https://www.autopozicovna-kosice.sk/themes/custom/autopozicovna_kosice/js/slider_items.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.autopozicovna-kosice.sk/themes/custom/autopozicovna_kosice/js/cars_block.js. */
/**
 * @file
 * "Image" paragraph javascripts.
 */
(function ($, Drupal) {

  "use strict";

  Drupal.behaviors.autopozicovna_kosiceCarsBlock = {
    attach: function (context, settings) {
      var $context = $(context);
      $context.find('.view-frontpage-cars', context).each( function () {
        var owl = $('.view-content', this);
        if ($('.views-row', owl).length > 1) {
          owl.owlCarousel({
            center: true,
            loop: true,
            dots: false,
            nav: true,
            navContainerClass: 'owl-nav tw-mx-4 tw-my-6 tw-relative',
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            navClass: [
              'owl-prev tw-absolute tw-left-0',
              'owl-next tw-absolute tw-right-0'
            ],
            navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
            itemClass: 'owl-item tw-px-4 tw-py-2',
            responsive:{
              0:{
                items: 2,
                center: false,
                autoplay: true,
              },
              480:{
                items: 2,
                center: false,
                autoplay: true,
              },
              720:{
                items: 3,
                center: false,
                autoplay: true,
              },
              950:{
                items: 3,
                center: false
              },
              1200:{
                items: 4,
                center: false
              }
            }
          });
        }
      });
    }
  };

})(jQuery, Drupal);

/* Source and licensing information for the above line(s) can be found at https://www.autopozicovna-kosice.sk/themes/custom/autopozicovna_kosice/js/cars_block.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.autopozicovna-kosice.sk/modules/contrib/antibot/js/antibot.js. */
/**
 * @file
 * Unlock protected forms.
 *
 * This works by resetting the form action to the path that It should be as well
 * as injecting the secret form key, only if the current user is verified to be
 * human which is done by waiting for a mousemove, swipe, or tab/enter key to be
 * pressed.
 */

(function (Drupal, drupalSettings) {
  "use strict";

  Drupal.antibot = {};

  Drupal.behaviors.antibot = {
    attach: function (context) {
      // Assume the user is not human, despite JS being enabled.
      drupalSettings.antibot.human = false;

      // Wait for a mouse to move, indicating they are human.
      document.body.addEventListener('mousemove', function () {
        // Unlock the forms.
        Drupal.antibot.unlockForms();
      });

      // Wait for a touch move event, indicating that they are human.
      document.body.addEventListener('touchmove', function () {
        // Unlock the forms.
        Drupal.antibot.unlockForms();
      });

      // A tab or enter key pressed can also indicate they are human.
      document.body.addEventListener('keydown', function (e) {
        if ((e.code == 'Tab') || (e.code == 'Enter')) {
          // Unlock the forms.
          Drupal.antibot.unlockForms();
        }
      });
    }
  };

  /**
   * Unlock all locked forms.
   */
  Drupal.antibot.unlockForms = function () {
    // Act only if we haven't yet verified this user as being human.
    if (!drupalSettings.antibot.human) {
      // Check if there are forms to unlock.
      if (drupalSettings.antibot.forms != undefined) {
        // Iterate all antibot forms that we need to unlock.
        Object.values(drupalSettings.antibot.forms).forEach(function (config) {
          // Switch the action.
          const form = document.getElementById(config.id);
          if (form) {
            form.setAttribute('action', form.getAttribute('data-action'));

            // Set the key.
            const input = form.querySelector('input[name="antibot_key"]');
            if (input) {
              input.value = config.key;
            }
          }
        });
      }
      // Mark this user as being human.
      drupalSettings.antibot.human = true;
    }
  };
})(Drupal, drupalSettings);

/* Source and licensing information for the above line(s) can be found at https://www.autopozicovna-kosice.sk/modules/contrib/antibot/js/antibot.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.autopozicovna-kosice.sk/core/assets/vendor/jquery-form/jquery.form.min.js. */
/*!
 * jQuery Form Plugin
 * version: 4.3.0
 * Requires jQuery v1.7.2 or later
 * Project repository: https://github.com/jquery-form/form

 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup

 * Dual licensed under the LGPL-2.1+ or MIT licenses
 * https://github.com/jquery-form/form#license

 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 */
!function(r){"function"==typeof define&&define.amd?define(["jquery"],r):"object"==typeof module&&module.exports?module.exports=function(e,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e)),r(t),t}:r(jQuery)}(function(q){"use strict";var m=/\r?\n/g,S={};S.fileapi=void 0!==q('<input type="file">').get(0).files,S.formdata=void 0!==window.FormData;var _=!!q.fn.prop;function o(e){var t=e.data;e.isDefaultPrevented()||(e.preventDefault(),q(e.target).closest("form").ajaxSubmit(t))}function i(e){var t=e.target,r=q(t);if(!r.is("[type=submit],[type=image]")){var a=r.closest("[type=submit]");if(0===a.length)return;t=a[0]}var n,o=t.form;"image"===(o.clk=t).type&&(void 0!==e.offsetX?(o.clk_x=e.offsetX,o.clk_y=e.offsetY):"function"==typeof q.fn.offset?(n=r.offset(),o.clk_x=e.pageX-n.left,o.clk_y=e.pageY-n.top):(o.clk_x=e.pageX-t.offsetLeft,o.clk_y=e.pageY-t.offsetTop)),setTimeout(function(){o.clk=o.clk_x=o.clk_y=null},100)}function N(){var e;q.fn.ajaxSubmit.debug&&(e="[jquery.form] "+Array.prototype.join.call(arguments,""),window.console&&window.console.log?window.console.log(e):window.opera&&window.opera.postError&&window.opera.postError(e))}q.fn.attr2=function(){if(!_)return this.attr.apply(this,arguments);var e=this.prop.apply(this,arguments);return e&&e.jquery||"string"==typeof e?e:this.attr.apply(this,arguments)},q.fn.ajaxSubmit=function(M,e,t,r){if(!this.length)return N("ajaxSubmit: skipping submit process - no element selected"),this;var O,a,n,o,X=this;"function"==typeof M?M={success:M}:"string"==typeof M||!1===M&&0<arguments.length?(M={url:M,data:e,dataType:t},"function"==typeof r&&(M.success=r)):void 0===M&&(M={}),O=M.method||M.type||this.attr2("method"),n=(n=(n="string"==typeof(a=M.url||this.attr2("action"))?q.trim(a):"")||window.location.href||"")&&(n.match(/^([^#]+)/)||[])[1],o=/(MSIE|Trident)/.test(navigator.userAgent||"")&&/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",M=q.extend(!0,{url:n,success:q.ajaxSettings.success,type:O||q.ajaxSettings.type,iframeSrc:o},M);var i={};if(this.trigger("form-pre-serialize",[this,M,i]),i.veto)return N("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(M.beforeSerialize&&!1===M.beforeSerialize(this,M))return N("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var s=M.traditional;void 0===s&&(s=q.ajaxSettings.traditional);var u,c,C=[],l=this.formToArray(M.semantic,C,M.filtering);if(M.data&&(c=q.isFunction(M.data)?M.data(l):M.data,M.extraData=c,u=q.param(c,s)),M.beforeSubmit&&!1===M.beforeSubmit(l,this,M))return N("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[l,this,M,i]),i.veto)return N("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var f=q.param(l,s);u&&(f=f?f+"&"+u:u),"GET"===M.type.toUpperCase()?(M.url+=(0<=M.url.indexOf("?")?"&":"?")+f,M.data=null):M.data=f;var d,m,p,h=[];M.resetForm&&h.push(function(){X.resetForm()}),M.clearForm&&h.push(function(){X.clearForm(M.includeHidden)}),!M.dataType&&M.target?(d=M.success||function(){},h.push(function(e,t,r){var a=arguments,n=M.replaceTarget?"replaceWith":"html";q(M.target)[n](e).each(function(){d.apply(this,a)})})):M.success&&(q.isArray(M.success)?q.merge(h,M.success):h.push(M.success)),M.success=function(e,t,r){for(var a=M.context||this,n=0,o=h.length;n<o;n++)h[n].apply(a,[e,t,r||X,X])},M.error&&(m=M.error,M.error=function(e,t,r){var a=M.context||this;m.apply(a,[e,t,r,X])}),M.complete&&(p=M.complete,M.complete=function(e,t){var r=M.context||this;p.apply(r,[e,t,X])});var v=0<q("input[type=file]:enabled",this).filter(function(){return""!==q(this).val()}).length,g="multipart/form-data",x=X.attr("enctype")===g||X.attr("encoding")===g,y=S.fileapi&&S.formdata;N("fileAPI :"+y);var b,T=(v||x)&&!y;!1!==M.iframe&&(M.iframe||T)?M.closeKeepAlive?q.get(M.closeKeepAlive,function(){b=w(l)}):b=w(l):b=(v||x)&&y?function(e){for(var r=new FormData,t=0;t<e.length;t++)r.append(e[t].name,e[t].value);if(M.extraData){var a=function(e){var t,r,a=q.param(e,M.traditional).split("&"),n=a.length,o=[];for(t=0;t<n;t++)a[t]=a[t].replace(/\+/g," "),r=a[t].split("="),o.push([decodeURIComponent(r[0]),decodeURIComponent(r[1])]);return o}(M.extraData);for(t=0;t<a.length;t++)a[t]&&r.append(a[t][0],a[t][1])}M.data=null;var n=q.extend(!0,{},q.ajaxSettings,M,{contentType:!1,processData:!1,cache:!1,type:O||"POST"});M.uploadProgress&&(n.xhr=function(){var e=q.ajaxSettings.xhr();return e.upload&&e.upload.addEventListener("progress",function(e){var t=0,r=e.loaded||e.position,a=e.total;e.lengthComputable&&(t=Math.ceil(r/a*100)),M.uploadProgress(e,r,a,t)},!1),e});n.data=null;var o=n.beforeSend;return n.beforeSend=function(e,t){M.formData?t.data=M.formData:t.data=r,o&&o.call(this,e,t)},q.ajax(n)}(l):q.ajax(M),X.removeData("jqxhr").data("jqxhr",b);for(var j=0;j<C.length;j++)C[j]=null;return this.trigger("form-submit-notify",[this,M]),this;function w(e){var t,r,l,f,o,d,m,p,a,n,h,v,i=X[0],g=q.Deferred();if(g.abort=function(e){p.abort(e)},e)for(r=0;r<C.length;r++)t=q(C[r]),_?t.prop("disabled",!1):t.removeAttr("disabled");(l=q.extend(!0,{},q.ajaxSettings,M)).context=l.context||l,o="jqFormIO"+(new Date).getTime();var s=i.ownerDocument,u=X.closest("body");if(l.iframeTarget?(n=(d=q(l.iframeTarget,s)).attr2("name"))?o=n:d.attr2("name",o):(d=q('<iframe name="'+o+'" src="'+l.iframeSrc+'" />',s)).css({position:"absolute",top:"-1000px",left:"-1000px"}),m=d[0],p={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(e){var t="timeout"===e?"timeout":"aborted";N("aborting upload... "+t),this.aborted=1;try{m.contentWindow.document.execCommand&&m.contentWindow.document.execCommand("Stop")}catch(e){}d.attr("src",l.iframeSrc),p.error=t,l.error&&l.error.call(l.context,p,t,e),f&&q.event.trigger("ajaxError",[p,l,t]),l.complete&&l.complete.call(l.context,p,t)}},(f=l.global)&&0==q.active++&&q.event.trigger("ajaxStart"),f&&q.event.trigger("ajaxSend",[p,l]),l.beforeSend&&!1===l.beforeSend.call(l.context,p,l))return l.global&&q.active--,g.reject(),g;if(p.aborted)return g.reject(),g;(a=i.clk)&&(n=a.name)&&!a.disabled&&(l.extraData=l.extraData||{},l.extraData[n]=a.value,"image"===a.type&&(l.extraData[n+".x"]=i.clk_x,l.extraData[n+".y"]=i.clk_y));var x=1,y=2;function b(t){var r=null;try{t.contentWindow&&(r=t.contentWindow.document)}catch(e){N("cannot get iframe.contentWindow document: "+e)}if(r)return r;try{r=t.contentDocument?t.contentDocument:t.document}catch(e){N("cannot get iframe.contentDocument: "+e),r=t.document}return r}var c=q("meta[name=csrf-token]").attr("content"),T=q("meta[name=csrf-param]").attr("content");function j(){var e=X.attr2("target"),t=X.attr2("action"),r=X.attr("enctype")||X.attr("encoding")||"multipart/form-data";i.setAttribute("target",o),O&&!/post/i.test(O)||i.setAttribute("method","POST"),t!==l.url&&i.setAttribute("action",l.url),l.skipEncodingOverride||O&&!/post/i.test(O)||X.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),l.timeout&&(v=setTimeout(function(){h=!0,A(x)},l.timeout));var a=[];try{if(l.extraData)for(var n in l.extraData)l.extraData.hasOwnProperty(n)&&(q.isPlainObject(l.extraData[n])&&l.extraData[n].hasOwnProperty("name")&&l.extraData[n].hasOwnProperty("value")?a.push(q('<input type="hidden" name="'+l.extraData[n].name+'">',s).val(l.extraData[n].value).appendTo(i)[0]):a.push(q('<input type="hidden" name="'+n+'">',s).val(l.extraData[n]).appendTo(i)[0]));l.iframeTarget||d.appendTo(u),m.attachEvent?m.attachEvent("onload",A):m.addEventListener("load",A,!1),setTimeout(function e(){try{var t=b(m).readyState;N("state = "+t),t&&"uninitialized"===t.toLowerCase()&&setTimeout(e,50)}catch(e){N("Server abort: ",e," (",e.name,")"),A(y),v&&clearTimeout(v),v=void 0}},15);try{i.submit()}catch(e){document.createElement("form").submit.apply(i)}}finally{i.setAttribute("action",t),i.setAttribute("enctype",r),e?i.setAttribute("target",e):X.removeAttr("target"),q(a).remove()}}T&&c&&(l.extraData=l.extraData||{},l.extraData[T]=c),l.forceSync?j():setTimeout(j,10);var w,S,k,D=50;function A(e){if(!p.aborted&&!k){if((S=b(m))||(N("cannot access response document"),e=y),e===x&&p)return p.abort("timeout"),void g.reject(p,"timeout");if(e===y&&p)return p.abort("server abort"),void g.reject(p,"error","server abort");if(S&&S.location.href!==l.iframeSrc||h){m.detachEvent?m.detachEvent("onload",A):m.removeEventListener("load",A,!1);var t,r="success";try{if(h)throw"timeout";var a="xml"===l.dataType||S.XMLDocument||q.isXMLDoc(S);if(N("isXml="+a),!a&&window.opera&&(null===S.body||!S.body.innerHTML)&&--D)return N("requeing onLoad callback, DOM not available"),void setTimeout(A,250);var n=S.body?S.body:S.documentElement;p.responseText=n?n.innerHTML:null,p.responseXML=S.XMLDocument?S.XMLDocument:S,a&&(l.dataType="xml"),p.getResponseHeader=function(e){return{"content-type":l.dataType}[e.toLowerCase()]},n&&(p.status=Number(n.getAttribute("status"))||p.status,p.statusText=n.getAttribute("statusText")||p.statusText);var o,i,s,u=(l.dataType||"").toLowerCase(),c=/(json|script|text)/.test(u);c||l.textarea?(o=S.getElementsByTagName("textarea")[0])?(p.responseText=o.value,p.status=Number(o.getAttribute("status"))||p.status,p.statusText=o.getAttribute("statusText")||p.statusText):c&&(i=S.getElementsByTagName("pre")[0],s=S.getElementsByTagName("body")[0],i?p.responseText=i.textContent?i.textContent:i.innerText:s&&(p.responseText=s.textContent?s.textContent:s.innerText)):"xml"===u&&!p.responseXML&&p.responseText&&(p.responseXML=F(p.responseText));try{w=E(p,u,l)}catch(e){r="parsererror",p.error=t=e||r}}catch(e){N("error caught: ",e),r="error",p.error=t=e||r}p.aborted&&(N("upload aborted"),r=null),p.status&&(r=200<=p.status&&p.status<300||304===p.status?"success":"error"),"success"===r?(l.success&&l.success.call(l.context,w,"success",p),g.resolve(p.responseText,"success",p),f&&q.event.trigger("ajaxSuccess",[p,l])):r&&(void 0===t&&(t=p.statusText),l.error&&l.error.call(l.context,p,r,t),g.reject(p,"error",t),f&&q.event.trigger("ajaxError",[p,l,t])),f&&q.event.trigger("ajaxComplete",[p,l]),f&&!--q.active&&q.event.trigger("ajaxStop"),l.complete&&l.complete.call(l.context,p,r),k=!0,l.timeout&&clearTimeout(v),setTimeout(function(){l.iframeTarget?d.attr("src",l.iframeSrc):d.remove(),p.responseXML=null},100)}}}var F=q.parseXML||function(e,t){return window.ActiveXObject?((t=new ActiveXObject("Microsoft.XMLDOM")).async="false",t.loadXML(e)):t=(new DOMParser).parseFromString(e,"text/xml"),t&&t.documentElement&&"parsererror"!==t.documentElement.nodeName?t:null},L=q.parseJSON||function(e){return window.eval("("+e+")")},E=function(e,t,r){var a=e.getResponseHeader("content-type")||"",n=("xml"===t||!t)&&0<=a.indexOf("xml"),o=n?e.responseXML:e.responseText;return n&&"parsererror"===o.documentElement.nodeName&&q.error&&q.error("parsererror"),r&&r.dataFilter&&(o=r.dataFilter(o,t)),"string"==typeof o&&(("json"===t||!t)&&0<=a.indexOf("json")?o=L(o):("script"===t||!t)&&0<=a.indexOf("javascript")&&q.globalEval(o)),o};return g}},q.fn.ajaxForm=function(e,t,r,a){if(("string"==typeof e||!1===e&&0<arguments.length)&&(e={url:e,data:t,dataType:r},"function"==typeof a&&(e.success=a)),(e=e||{}).delegation=e.delegation&&q.isFunction(q.fn.on),e.delegation||0!==this.length)return e.delegation?(q(document).off("submit.form-plugin",this.selector,o).off("click.form-plugin",this.selector,i).on("submit.form-plugin",this.selector,e,o).on("click.form-plugin",this.selector,e,i),this):(e.beforeFormUnbind&&e.beforeFormUnbind(this,e),this.ajaxFormUnbind().on("submit.form-plugin",e,o).on("click.form-plugin",e,i));var n={s:this.selector,c:this.context};return!q.isReady&&n.s?(N("DOM not ready, queuing ajaxForm"),q(function(){q(n.s,n.c).ajaxForm(e)})):N("terminating; zero elements found by selector"+(q.isReady?"":" (DOM not ready)")),this},q.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},q.fn.formToArray=function(e,t,r){var a=[];if(0===this.length)return a;var n,o,i,s,u,c,l,f,d,m,p=this[0],h=this.attr("id"),v=(v=e||void 0===p.elements?p.getElementsByTagName("*"):p.elements)&&q.makeArray(v);if(h&&(e||/(Edge|Trident)\//.test(navigator.userAgent))&&(n=q(':input[form="'+h+'"]').get()).length&&(v=(v||[]).concat(n)),!v||!v.length)return a;for(q.isFunction(r)&&(v=q.map(v,r)),o=0,c=v.length;o<c;o++)if((m=(u=v[o]).name)&&!u.disabled)if(e&&p.clk&&"image"===u.type)p.clk===u&&(a.push({name:m,value:q(u).val(),type:u.type}),a.push({name:m+".x",value:p.clk_x},{name:m+".y",value:p.clk_y}));else if((s=q.fieldValue(u,!0))&&s.constructor===Array)for(t&&t.push(u),i=0,l=s.length;i<l;i++)a.push({name:m,value:s[i]});else if(S.fileapi&&"file"===u.type){t&&t.push(u);var g=u.files;if(g.length)for(i=0;i<g.length;i++)a.push({name:m,value:g[i],type:u.type});else a.push({name:m,value:"",type:u.type})}else null!=s&&(t&&t.push(u),a.push({name:m,value:s,type:u.type,required:u.required}));return e||!p.clk||(m=(d=(f=q(p.clk))[0]).name)&&!d.disabled&&"image"===d.type&&(a.push({name:m,value:f.val()}),a.push({name:m+".x",value:p.clk_x},{name:m+".y",value:p.clk_y})),a},q.fn.formSerialize=function(e){return q.param(this.formToArray(e))},q.fn.fieldSerialize=function(n){var o=[];return this.each(function(){var e=this.name;if(e){var t=q.fieldValue(this,n);if(t&&t.constructor===Array)for(var r=0,a=t.length;r<a;r++)o.push({name:e,value:t[r]});else null!=t&&o.push({name:this.name,value:t})}}),q.param(o)},q.fn.fieldValue=function(e){for(var t=[],r=0,a=this.length;r<a;r++){var n=this[r],o=q.fieldValue(n,e);null==o||o.constructor===Array&&!o.length||(o.constructor===Array?q.merge(t,o):t.push(o))}return t},q.fieldValue=function(e,t){var r=e.name,a=e.type,n=e.tagName.toLowerCase();if(void 0===t&&(t=!0),t&&(!r||e.disabled||"reset"===a||"button"===a||("checkbox"===a||"radio"===a)&&!e.checked||("submit"===a||"image"===a)&&e.form&&e.form.clk!==e||"select"===n&&-1===e.selectedIndex))return null;if("select"!==n)return q(e).val().replace(m,"\r\n");var o=e.selectedIndex;if(o<0)return null;for(var i=[],s=e.options,u="select-one"===a,c=u?o+1:s.length,l=u?o:0;l<c;l++){var f=s[l];if(f.selected&&!f.disabled){var d=(d=f.value)||(f.attributes&&f.attributes.value&&!f.attributes.value.specified?f.text:f.value);if(u)return d;i.push(d)}}return i},q.fn.clearForm=function(e){return this.each(function(){q("input,select,textarea",this).clearFields(e)})},q.fn.clearFields=q.fn.clearInputs=function(r){var a=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var e=this.type,t=this.tagName.toLowerCase();a.test(e)||"textarea"===t?this.value="":"checkbox"===e||"radio"===e?this.checked=!1:"select"===t?this.selectedIndex=-1:"file"===e?/MSIE/.test(navigator.userAgent)?q(this).replaceWith(q(this).clone(!0)):q(this).val(""):r&&(!0===r&&/hidden/.test(e)||"string"==typeof r&&q(this).is(r))&&(this.value="")})},q.fn.resetForm=function(){return this.each(function(){var t=q(this),e=this.tagName.toLowerCase();switch(e){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var r=t.parents("select");return r.length&&r[0].multiple?"option"===e?this.selected=this.defaultSelected:t.find("option").resetForm():r.resetForm(),!0;case"select":return t.find("option").each(function(e){if(this.selected=this.defaultSelected,this.defaultSelected&&!t[0].multiple)return t[0].selectedIndex=e,!1}),!0;case"label":var a=q(t.attr("for")),n=t.find("input,select,textarea");return a[0]&&n.unshift(a[0]),n.resetForm(),!0;case"form":return"function"!=typeof this.reset&&("object"!=typeof this.reset||this.reset.nodeType)||this.reset(),!0;default:return t.find("form,input,label,select,textarea").resetForm(),!0}})},q.fn.enable=function(e){return void 0===e&&(e=!0),this.each(function(){this.disabled=!e})},q.fn.selected=function(r){return void 0===r&&(r=!0),this.each(function(){var e,t=this.type;"checkbox"===t||"radio"===t?this.checked=r:"option"===this.tagName.toLowerCase()&&(e=q(this).parent("select"),r&&e[0]&&"select-one"===e[0].type&&e.find("option").selected(!1),this.selected=r)})},q.fn.ajaxSubmit.debug=!1});

/* Source and licensing information for the above line(s) can be found at https://www.autopozicovna-kosice.sk/core/assets/vendor/jquery-form/jquery.form.min.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.autopozicovna-kosice.sk/themes/custom/autopozicovna_kosice/libs/flatpickr/flatpickr.min.js. */
/* flatpickr v4.6.6,, @license MIT */
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e=e||self).flatpickr=n()}(this,(function(){"use strict";var e=function(){return(e=Object.assign||function(e){for(var n,t=1,a=arguments.length;t<a;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e}).apply(this,arguments)};function n(){for(var e=0,n=0,t=arguments.length;n<t;n++)e+=arguments[n].length;var a=Array(e),i=0;for(n=0;n<t;n++)for(var o=arguments[n],r=0,l=o.length;r<l;r++,i++)a[i]=o[r];return a}var t=["onChange","onClose","onDayCreate","onDestroy","onKeyDown","onMonthChange","onOpen","onParseConfig","onReady","onValueUpdate","onYearChange","onPreCalendarPosition"],a={_disable:[],_enable:[],allowInput:!1,allowInvalidPreload:!1,altFormat:"F j, Y",altInput:!1,altInputClass:"form-control input",animate:"object"==typeof window&&-1===window.navigator.userAgent.indexOf("MSIE"),ariaDateFormat:"F j, Y",autoFillDefaultTime:!0,clickOpens:!0,closeOnSelect:!0,conjunction:", ",dateFormat:"Y-m-d",defaultHour:12,defaultMinute:0,defaultSeconds:0,disable:[],disableMobile:!1,enable:[],enableSeconds:!1,enableTime:!1,errorHandler:function(e){return"undefined"!=typeof console&&console.warn(e)},getWeek:function(e){var n=new Date(e.getTime());n.setHours(0,0,0,0),n.setDate(n.getDate()+3-(n.getDay()+6)%7);var t=new Date(n.getFullYear(),0,4);return 1+Math.round(((n.getTime()-t.getTime())/864e5-3+(t.getDay()+6)%7)/7)},hourIncrement:1,ignoredFocusElements:[],inline:!1,locale:"default",minuteIncrement:5,mode:"single",monthSelectorType:"dropdown",nextArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",noCalendar:!1,now:new Date,onChange:[],onClose:[],onDayCreate:[],onDestroy:[],onKeyDown:[],onMonthChange:[],onOpen:[],onParseConfig:[],onReady:[],onValueUpdate:[],onYearChange:[],onPreCalendarPosition:[],plugins:[],position:"auto",positionElement:void 0,prevArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",shorthandCurrentMonth:!1,showMonths:1,static:!1,time_24hr:!1,weekNumbers:!1,wrap:!1},i={weekdays:{shorthand:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],longhand:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},months:{shorthand:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],longhand:["January","February","March","April","May","June","July","August","September","October","November","December"]},daysInMonth:[31,28,31,30,31,30,31,31,30,31,30,31],firstDayOfWeek:0,ordinal:function(e){var n=e%100;if(n>3&&n<21)return"th";switch(n%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},rangeSeparator:" to ",weekAbbreviation:"Wk",scrollTitle:"Scroll to increment",toggleTitle:"Click to toggle",amPM:["AM","PM"],yearAriaLabel:"Year",monthAriaLabel:"Month",hourAriaLabel:"Hour",minuteAriaLabel:"Minute",time_24hr:!1},o=function(e,n){return void 0===n&&(n=2),("000"+e).slice(-1*n)},r=function(e){return!0===e?1:0};function l(e,n,t){var a;return void 0===t&&(t=!1),function(){var i=this,o=arguments;null!==a&&clearTimeout(a),a=window.setTimeout((function(){a=null,t||e.apply(i,o)}),n),t&&!a&&e.apply(i,o)}}var c=function(e){return e instanceof Array?e:[e]};function d(e,n,t){if(!0===t)return e.classList.add(n);e.classList.remove(n)}function s(e,n,t){var a=window.document.createElement(e);return n=n||"",t=t||"",a.className=n,void 0!==t&&(a.textContent=t),a}function u(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function f(e,n){var t=s("div","numInputWrapper"),a=s("input","numInput "+e),i=s("span","arrowUp"),o=s("span","arrowDown");if(-1===navigator.userAgent.indexOf("MSIE 9.0")?a.type="number":(a.type="text",a.pattern="\\d*"),void 0!==n)for(var r in n)a.setAttribute(r,n[r]);return t.appendChild(a),t.appendChild(i),t.appendChild(o),t}function m(e){try{return"function"==typeof e.composedPath?e.composedPath()[0]:e.target}catch(n){return e.target}}var g=function(){},p=function(e,n,t){return t.months[n?"shorthand":"longhand"][e]},h={D:g,F:function(e,n,t){e.setMonth(t.months.longhand.indexOf(n))},G:function(e,n){e.setHours(parseFloat(n))},H:function(e,n){e.setHours(parseFloat(n))},J:function(e,n){e.setDate(parseFloat(n))},K:function(e,n,t){e.setHours(e.getHours()%12+12*r(new RegExp(t.amPM[1],"i").test(n)))},M:function(e,n,t){e.setMonth(t.months.shorthand.indexOf(n))},S:function(e,n){e.setSeconds(parseFloat(n))},U:function(e,n){return new Date(1e3*parseFloat(n))},W:function(e,n,t){var a=parseInt(n),i=new Date(e.getFullYear(),0,2+7*(a-1),0,0,0,0);return i.setDate(i.getDate()-i.getDay()+t.firstDayOfWeek),i},Y:function(e,n){e.setFullYear(parseFloat(n))},Z:function(e,n){return new Date(n)},d:function(e,n){e.setDate(parseFloat(n))},h:function(e,n){e.setHours(parseFloat(n))},i:function(e,n){e.setMinutes(parseFloat(n))},j:function(e,n){e.setDate(parseFloat(n))},l:g,m:function(e,n){e.setMonth(parseFloat(n)-1)},n:function(e,n){e.setMonth(parseFloat(n)-1)},s:function(e,n){e.setSeconds(parseFloat(n))},u:function(e,n){return new Date(parseFloat(n))},w:g,y:function(e,n){e.setFullYear(2e3+parseFloat(n))}},v={D:"(\\w+)",F:"(\\w+)",G:"(\\d\\d|\\d)",H:"(\\d\\d|\\d)",J:"(\\d\\d|\\d)\\w+",K:"",M:"(\\w+)",S:"(\\d\\d|\\d)",U:"(.+)",W:"(\\d\\d|\\d)",Y:"(\\d{4})",Z:"(.+)",d:"(\\d\\d|\\d)",h:"(\\d\\d|\\d)",i:"(\\d\\d|\\d)",j:"(\\d\\d|\\d)",l:"(\\w+)",m:"(\\d\\d|\\d)",n:"(\\d\\d|\\d)",s:"(\\d\\d|\\d)",u:"(.+)",w:"(\\d\\d|\\d)",y:"(\\d{2})"},D={Z:function(e){return e.toISOString()},D:function(e,n,t){return n.weekdays.shorthand[D.w(e,n,t)]},F:function(e,n,t){return p(D.n(e,n,t)-1,!1,n)},G:function(e,n,t){return o(D.h(e,n,t))},H:function(e){return o(e.getHours())},J:function(e,n){return void 0!==n.ordinal?e.getDate()+n.ordinal(e.getDate()):e.getDate()},K:function(e,n){return n.amPM[r(e.getHours()>11)]},M:function(e,n){return p(e.getMonth(),!0,n)},S:function(e){return o(e.getSeconds())},U:function(e){return e.getTime()/1e3},W:function(e,n,t){return t.getWeek(e)},Y:function(e){return o(e.getFullYear(),4)},d:function(e){return o(e.getDate())},h:function(e){return e.getHours()%12?e.getHours()%12:12},i:function(e){return o(e.getMinutes())},j:function(e){return e.getDate()},l:function(e,n){return n.weekdays.longhand[e.getDay()]},m:function(e){return o(e.getMonth()+1)},n:function(e){return e.getMonth()+1},s:function(e){return e.getSeconds()},u:function(e){return e.getTime()},w:function(e){return e.getDay()},y:function(e){return String(e.getFullYear()).substring(2)}},w=function(e){var n=e.config,t=void 0===n?a:n,o=e.l10n,r=void 0===o?i:o,l=e.isMobile,c=void 0!==l&&l;return function(e,n,a){var i=a||r;return void 0===t.formatDate||c?n.split("").map((function(n,a,o){return D[n]&&"\\"!==o[a-1]?D[n](e,i,t):"\\"!==n?n:""})).join(""):t.formatDate(e,n,i)}},b=function(e){var n=e.config,t=void 0===n?a:n,o=e.l10n,r=void 0===o?i:o;return function(e,n,i,o){if(0===e||e){var l,c=o||r,d=e;if(e instanceof Date)l=new Date(e.getTime());else if("string"!=typeof e&&void 0!==e.toFixed)l=new Date(e);else if("string"==typeof e){var s=n||(t||a).dateFormat,u=String(e).trim();if("today"===u)l=new Date,i=!0;else if(/Z$/.test(u)||/GMT$/.test(u))l=new Date(e);else if(t&&t.parseDate)l=t.parseDate(e,s);else{l=t&&t.noCalendar?new Date((new Date).setHours(0,0,0,0)):new Date((new Date).getFullYear(),0,1,0,0,0,0);for(var f=void 0,m=[],g=0,p=0,D="";g<s.length;g++){var w=s[g],b="\\"===w,C="\\"===s[g-1]||b;if(v[w]&&!C){D+=v[w];var M=new RegExp(D).exec(e);M&&(f=!0)&&m["Y"!==w?"push":"unshift"]({fn:h[w],val:M[++p]})}else b||(D+=".");m.forEach((function(e){var n=e.fn,t=e.val;return l=n(l,t,c)||l}))}l=f?l:void 0}}if(l instanceof Date&&!isNaN(l.getTime()))return!0===i&&l.setHours(0,0,0,0),l;t.errorHandler(new Error("Invalid date provided: "+d))}}};function C(e,n,t){return void 0===t&&(t=!0),!1!==t?new Date(e.getTime()).setHours(0,0,0,0)-new Date(n.getTime()).setHours(0,0,0,0):e.getTime()-n.getTime()}var M=864e5;"function"!=typeof Object.assign&&(Object.assign=function(e){for(var n=[],t=1;t<arguments.length;t++)n[t-1]=arguments[t];if(!e)throw TypeError("Cannot convert undefined or null to object");for(var a=function(n){n&&Object.keys(n).forEach((function(t){return e[t]=n[t]}))},i=0,o=n;i<o.length;i++){var r=o[i];a(r)}return e});function y(g,h){var D={config:e(e({},a),E.defaultConfig),l10n:i};function y(e){return e.bind(D)}function x(){var e=D.config;!1===e.weekNumbers&&1===e.showMonths||!0!==e.noCalendar&&window.requestAnimationFrame((function(){if(void 0!==D.calendarContainer&&(D.calendarContainer.style.visibility="hidden",D.calendarContainer.style.display="block"),void 0!==D.daysContainer){var n=(D.days.offsetWidth+1)*e.showMonths;D.daysContainer.style.width=n+"px",D.calendarContainer.style.width=n+(void 0!==D.weekWrapper?D.weekWrapper.offsetWidth:0)+"px",D.calendarContainer.style.removeProperty("visibility"),D.calendarContainer.style.removeProperty("display")}}))}function k(e){if(0===D.selectedDates.length){var n=void 0!==D.config.minDate?new Date(D.config.minDate.getTime()):new Date,t=S(),a=t.hours,i=t.minutes,l=t.seconds;n.setHours(a,i,l,0),D.setDate(n,!1)}void 0!==e&&"blur"!==e.type&&function(e){e.preventDefault();var n="keydown"===e.type,t=m(e),a=t;void 0!==D.amPM&&t===D.amPM&&(D.amPM.textContent=D.l10n.amPM[r(D.amPM.textContent===D.l10n.amPM[0])]);var i=parseFloat(a.getAttribute("min")),l=parseFloat(a.getAttribute("max")),c=parseFloat(a.getAttribute("step")),d=parseInt(a.value,10),s=e.delta||(n?38===e.which?1:-1:0),u=d+c*s;if(void 0!==a.value&&2===a.value.length){var f=a===D.hourElement,g=a===D.minuteElement;u<i?(u=l+u+r(!f)+(r(f)&&r(!D.amPM)),g&&Y(void 0,-1,D.hourElement)):u>l&&(u=a===D.hourElement?u-l-r(!D.amPM):i,g&&Y(void 0,1,D.hourElement)),D.amPM&&f&&(1===c?u+d===23:Math.abs(u-d)>c)&&(D.amPM.textContent=D.l10n.amPM[r(D.amPM.textContent===D.l10n.amPM[0])]),a.value=o(u)}}(e);var c=D._input.value;T(),we(),D._input.value!==c&&D._debouncedChange()}function T(){if(void 0!==D.hourElement&&void 0!==D.minuteElement){var e,n,t=(parseInt(D.hourElement.value.slice(-2),10)||0)%24,a=(parseInt(D.minuteElement.value,10)||0)%60,i=void 0!==D.secondElement?(parseInt(D.secondElement.value,10)||0)%60:0;void 0!==D.amPM&&(e=t,n=D.amPM.textContent,t=e%12+12*r(n===D.l10n.amPM[1]));var o=void 0!==D.config.minTime||D.config.minDate&&D.minDateHasTime&&D.latestSelectedDateObj&&0===C(D.latestSelectedDateObj,D.config.minDate,!0);if(void 0!==D.config.maxTime||D.config.maxDate&&D.maxDateHasTime&&D.latestSelectedDateObj&&0===C(D.latestSelectedDateObj,D.config.maxDate,!0)){var l=void 0!==D.config.maxTime?D.config.maxTime:D.config.maxDate;(t=Math.min(t,l.getHours()))===l.getHours()&&(a=Math.min(a,l.getMinutes())),a===l.getMinutes()&&(i=Math.min(i,l.getSeconds()))}if(o){var c=void 0!==D.config.minTime?D.config.minTime:D.config.minDate;(t=Math.max(t,c.getHours()))===c.getHours()&&(a=Math.max(a,c.getMinutes())),a===c.getMinutes()&&(i=Math.max(i,c.getSeconds()))}_(t,a,i)}}function I(e){var n=e||D.latestSelectedDateObj;n&&_(n.getHours(),n.getMinutes(),n.getSeconds())}function S(){var e=D.config.defaultHour,n=D.config.defaultMinute,t=D.config.defaultSeconds;if(void 0!==D.config.minDate){var a=D.config.minDate.getHours(),i=D.config.minDate.getMinutes();(e=Math.max(e,a))===a&&(n=Math.max(i,n)),e===a&&n===i&&(t=D.config.minDate.getSeconds())}if(void 0!==D.config.maxDate){var o=D.config.maxDate.getHours(),r=D.config.maxDate.getMinutes();(e=Math.min(e,o))===o&&(n=Math.min(r,n)),e===o&&n===r&&(t=D.config.maxDate.getSeconds())}return{hours:e,minutes:n,seconds:t}}function _(e,n,t){void 0!==D.latestSelectedDateObj&&D.latestSelectedDateObj.setHours(e%24,n,t||0,0),D.hourElement&&D.minuteElement&&!D.isMobile&&(D.hourElement.value=o(D.config.time_24hr?e:(12+e)%12+12*r(e%12==0)),D.minuteElement.value=o(n),void 0!==D.amPM&&(D.amPM.textContent=D.l10n.amPM[r(e>=12)]),void 0!==D.secondElement&&(D.secondElement.value=o(t)))}function O(e){var n=m(e),t=parseInt(n.value)+(e.delta||0);(t/1e3>1||"Enter"===e.key&&!/[^\d]/.test(t.toString()))&&Z(t)}function F(e,n,t,a){return n instanceof Array?n.forEach((function(n){return F(e,n,t,a)})):e instanceof Array?e.forEach((function(e){return F(e,n,t,a)})):(e.addEventListener(n,t,a),void D._handlers.push({element:e,event:n,handler:t,options:a}))}function N(){ge("onChange")}function A(e,n){var t=void 0!==e?D.parseDate(e):D.latestSelectedDateObj||(D.config.minDate&&D.config.minDate>D.now?D.config.minDate:D.config.maxDate&&D.config.maxDate<D.now?D.config.maxDate:D.now),a=D.currentYear,i=D.currentMonth;try{void 0!==t&&(D.currentYear=t.getFullYear(),D.currentMonth=t.getMonth())}catch(e){e.message="Invalid date supplied: "+t,D.config.errorHandler(e)}n&&D.currentYear!==a&&(ge("onYearChange"),J()),!n||D.currentYear===a&&D.currentMonth===i||ge("onMonthChange"),D.redraw()}function P(e){var n=m(e);~n.className.indexOf("arrow")&&Y(e,n.classList.contains("arrowUp")?1:-1)}function Y(e,n,t){var a=e&&m(e),i=t||a&&a.parentNode&&a.parentNode.firstChild,o=pe("increment");o.delta=n,i&&i.dispatchEvent(o)}function H(e,n,t,a){var i=Q(n,!0),o=s("span","flatpickr-day "+e,n.getDate().toString());return o.dateObj=n,o.$i=a,o.setAttribute("aria-label",D.formatDate(n,D.config.ariaDateFormat)),-1===e.indexOf("hidden")&&0===C(n,D.now)&&(D.todayDateElem=o,o.classList.add("today"),o.setAttribute("aria-current","date")),i?(o.tabIndex=-1,he(n)&&(o.classList.add("selected"),D.selectedDateElem=o,"range"===D.config.mode&&(d(o,"startRange",D.selectedDates[0]&&0===C(n,D.selectedDates[0],!0)),d(o,"endRange",D.selectedDates[1]&&0===C(n,D.selectedDates[1],!0)),"nextMonthDay"===e&&o.classList.add("inRange")))):o.classList.add("flatpickr-disabled"),"range"===D.config.mode&&function(e){return!("range"!==D.config.mode||D.selectedDates.length<2)&&(C(e,D.selectedDates[0])>=0&&C(e,D.selectedDates[1])<=0)}(n)&&!he(n)&&o.classList.add("inRange"),D.weekNumbers&&1===D.config.showMonths&&"prevMonthDay"!==e&&t%7==1&&D.weekNumbers.insertAdjacentHTML("beforeend","<span class='flatpickr-day'>"+D.config.getWeek(n)+"</span>"),ge("onDayCreate",o),o}function j(e){e.focus(),"range"===D.config.mode&&te(e)}function L(e){for(var n=e>0?0:D.config.showMonths-1,t=e>0?D.config.showMonths:-1,a=n;a!=t;a+=e)for(var i=D.daysContainer.children[a],o=e>0?0:i.children.length-1,r=e>0?i.children.length:-1,l=o;l!=r;l+=e){var c=i.children[l];if(-1===c.className.indexOf("hidden")&&Q(c.dateObj))return c}}function W(e,n){var t=X(document.activeElement||document.body),a=void 0!==e?e:t?document.activeElement:void 0!==D.selectedDateElem&&X(D.selectedDateElem)?D.selectedDateElem:void 0!==D.todayDateElem&&X(D.todayDateElem)?D.todayDateElem:L(n>0?1:-1);void 0===a?D._input.focus():t?function(e,n){for(var t=-1===e.className.indexOf("Month")?e.dateObj.getMonth():D.currentMonth,a=n>0?D.config.showMonths:-1,i=n>0?1:-1,o=t-D.currentMonth;o!=a;o+=i)for(var r=D.daysContainer.children[o],l=t-D.currentMonth===o?e.$i+n:n<0?r.children.length-1:0,c=r.children.length,d=l;d>=0&&d<c&&d!=(n>0?c:-1);d+=i){var s=r.children[d];if(-1===s.className.indexOf("hidden")&&Q(s.dateObj)&&Math.abs(e.$i-d)>=Math.abs(n))return j(s)}D.changeMonth(i),W(L(i),0)}(a,n):j(a)}function R(e,n){for(var t=(new Date(e,n,1).getDay()-D.l10n.firstDayOfWeek+7)%7,a=D.utils.getDaysInMonth((n-1+12)%12,e),i=D.utils.getDaysInMonth(n,e),o=window.document.createDocumentFragment(),r=D.config.showMonths>1,l=r?"prevMonthDay hidden":"prevMonthDay",c=r?"nextMonthDay hidden":"nextMonthDay",d=a+1-t,u=0;d<=a;d++,u++)o.appendChild(H(l,new Date(e,n-1,d),d,u));for(d=1;d<=i;d++,u++)o.appendChild(H("",new Date(e,n,d),d,u));for(var f=i+1;f<=42-t&&(1===D.config.showMonths||u%7!=0);f++,u++)o.appendChild(H(c,new Date(e,n+1,f%i),f,u));var m=s("div","dayContainer");return m.appendChild(o),m}function B(){if(void 0!==D.daysContainer){u(D.daysContainer),D.weekNumbers&&u(D.weekNumbers);for(var e=document.createDocumentFragment(),n=0;n<D.config.showMonths;n++){var t=new Date(D.currentYear,D.currentMonth,1);t.setMonth(D.currentMonth+n),e.appendChild(R(t.getFullYear(),t.getMonth()))}D.daysContainer.appendChild(e),D.days=D.daysContainer.firstChild,"range"===D.config.mode&&1===D.selectedDates.length&&te()}}function J(){if(!(D.config.showMonths>1||"dropdown"!==D.config.monthSelectorType)){var e=function(e){return!(void 0!==D.config.minDate&&D.currentYear===D.config.minDate.getFullYear()&&e<D.config.minDate.getMonth())&&!(void 0!==D.config.maxDate&&D.currentYear===D.config.maxDate.getFullYear()&&e>D.config.maxDate.getMonth())};D.monthsDropdownContainer.tabIndex=-1,D.monthsDropdownContainer.innerHTML="";for(var n=0;n<12;n++)if(e(n)){var t=s("option","flatpickr-monthDropdown-month");t.value=new Date(D.currentYear,n).getMonth().toString(),t.textContent=p(n,D.config.shorthandCurrentMonth,D.l10n),t.tabIndex=-1,D.currentMonth===n&&(t.selected=!0),D.monthsDropdownContainer.appendChild(t)}}}function K(){var e,n=s("div","flatpickr-month"),t=window.document.createDocumentFragment();D.config.showMonths>1||"static"===D.config.monthSelectorType?e=s("span","cur-month"):(D.monthsDropdownContainer=s("select","flatpickr-monthDropdown-months"),D.monthsDropdownContainer.setAttribute("aria-label",D.l10n.monthAriaLabel),F(D.monthsDropdownContainer,"change",(function(e){var n=m(e),t=parseInt(n.value,10);D.changeMonth(t-D.currentMonth),ge("onMonthChange")})),J(),e=D.monthsDropdownContainer);var a=f("cur-year",{tabindex:"-1"}),i=a.getElementsByTagName("input")[0];i.setAttribute("aria-label",D.l10n.yearAriaLabel),D.config.minDate&&i.setAttribute("min",D.config.minDate.getFullYear().toString()),D.config.maxDate&&(i.setAttribute("max",D.config.maxDate.getFullYear().toString()),i.disabled=!!D.config.minDate&&D.config.minDate.getFullYear()===D.config.maxDate.getFullYear());var o=s("div","flatpickr-current-month");return o.appendChild(e),o.appendChild(a),t.appendChild(o),n.appendChild(t),{container:n,yearElement:i,monthElement:e}}function U(){u(D.monthNav),D.monthNav.appendChild(D.prevMonthNav),D.config.showMonths&&(D.yearElements=[],D.monthElements=[]);for(var e=D.config.showMonths;e--;){var n=K();D.yearElements.push(n.yearElement),D.monthElements.push(n.monthElement),D.monthNav.appendChild(n.container)}D.monthNav.appendChild(D.nextMonthNav)}function q(){D.weekdayContainer?u(D.weekdayContainer):D.weekdayContainer=s("div","flatpickr-weekdays");for(var e=D.config.showMonths;e--;){var n=s("div","flatpickr-weekdaycontainer");D.weekdayContainer.appendChild(n)}return $(),D.weekdayContainer}function $(){if(D.weekdayContainer){var e=D.l10n.firstDayOfWeek,t=n(D.l10n.weekdays.shorthand);e>0&&e<t.length&&(t=n(t.splice(e,t.length),t.splice(0,e)));for(var a=D.config.showMonths;a--;)D.weekdayContainer.children[a].innerHTML="\n      <span class='flatpickr-weekday'>\n        "+t.join("</span><span class='flatpickr-weekday'>")+"\n      </span>\n      "}}function z(e,n){void 0===n&&(n=!0);var t=n?e:e-D.currentMonth;t<0&&!0===D._hidePrevMonthArrow||t>0&&!0===D._hideNextMonthArrow||(D.currentMonth+=t,(D.currentMonth<0||D.currentMonth>11)&&(D.currentYear+=D.currentMonth>11?1:-1,D.currentMonth=(D.currentMonth+12)%12,ge("onYearChange"),J()),B(),ge("onMonthChange"),ve())}function G(e){return!(!D.config.appendTo||!D.config.appendTo.contains(e))||D.calendarContainer.contains(e)}function V(e){if(D.isOpen&&!D.config.inline){var n=m(e),t=G(n),a=n===D.input||n===D.altInput||D.element.contains(n)||e.path&&e.path.indexOf&&(~e.path.indexOf(D.input)||~e.path.indexOf(D.altInput)),i="blur"===e.type?a&&e.relatedTarget&&!G(e.relatedTarget):!a&&!t&&!G(e.relatedTarget),o=!D.config.ignoredFocusElements.some((function(e){return e.contains(n)}));i&&o&&(void 0!==D.timeContainer&&void 0!==D.minuteElement&&void 0!==D.hourElement&&""!==D.input.value&&void 0!==D.input.value&&k(),D.close(),D.config&&"range"===D.config.mode&&1===D.selectedDates.length&&(D.clear(!1),D.redraw()))}}function Z(e){if(!(!e||D.config.minDate&&e<D.config.minDate.getFullYear()||D.config.maxDate&&e>D.config.maxDate.getFullYear())){var n=e,t=D.currentYear!==n;D.currentYear=n||D.currentYear,D.config.maxDate&&D.currentYear===D.config.maxDate.getFullYear()?D.currentMonth=Math.min(D.config.maxDate.getMonth(),D.currentMonth):D.config.minDate&&D.currentYear===D.config.minDate.getFullYear()&&(D.currentMonth=Math.max(D.config.minDate.getMonth(),D.currentMonth)),t&&(D.redraw(),ge("onYearChange"),J())}}function Q(e,n){void 0===n&&(n=!0);var t=D.parseDate(e,void 0,n);if(D.config.minDate&&t&&C(t,D.config.minDate,void 0!==n?n:!D.minDateHasTime)<0||D.config.maxDate&&t&&C(t,D.config.maxDate,void 0!==n?n:!D.maxDateHasTime)>0)return!1;if(0===D.config.enable.length&&0===D.config.disable.length)return!0;if(void 0===t)return!1;for(var a=D.config.enable.length>0,i=a?D.config.enable:D.config.disable,o=0,r=void 0;o<i.length;o++){if("function"==typeof(r=i[o])&&r(t))return a;if(r instanceof Date&&void 0!==t&&r.getTime()===t.getTime())return a;if("string"==typeof r&&void 0!==t){var l=D.parseDate(r,void 0,!0);return l&&l.getTime()===t.getTime()?a:!a}if("object"==typeof r&&void 0!==t&&r.from&&r.to&&t.getTime()>=r.from.getTime()&&t.getTime()<=r.to.getTime())return a}return!a}function X(e){return void 0!==D.daysContainer&&(-1===e.className.indexOf("hidden")&&-1===e.className.indexOf("flatpickr-disabled")&&D.daysContainer.contains(e))}function ee(e){!(e.target===D._input)||e.relatedTarget&&G(e.relatedTarget)||D.setDate(D._input.value,!0,e.target===D.altInput?D.config.altFormat:D.config.dateFormat)}function ne(e){var n=m(e),t=D.config.wrap?g.contains(n):n===D._input,a=D.config.allowInput,i=D.isOpen&&(!a||!t),o=D.config.inline&&t&&!a;if(13===e.keyCode&&t){if(a)return D.setDate(D._input.value,!0,n===D.altInput?D.config.altFormat:D.config.dateFormat),n.blur();D.open()}else if(G(n)||i||o){var r=!!D.timeContainer&&D.timeContainer.contains(n);switch(e.keyCode){case 13:r?(e.preventDefault(),k(),de()):se(e);break;case 27:e.preventDefault(),de();break;case 8:case 46:t&&!D.config.allowInput&&(e.preventDefault(),D.clear());break;case 37:case 39:if(r||t)D.hourElement&&D.hourElement.focus();else if(e.preventDefault(),void 0!==D.daysContainer&&(!1===a||document.activeElement&&X(document.activeElement))){var l=39===e.keyCode?1:-1;e.ctrlKey?(e.stopPropagation(),z(l),W(L(1),0)):W(void 0,l)}break;case 38:case 40:e.preventDefault();var c=40===e.keyCode?1:-1;D.daysContainer&&void 0!==n.$i||n===D.input||n===D.altInput?e.ctrlKey?(e.stopPropagation(),Z(D.currentYear-c),W(L(1),0)):r||W(void 0,7*c):n===D.currentYearElement?Z(D.currentYear-c):D.config.enableTime&&(!r&&D.hourElement&&D.hourElement.focus(),k(e),D._debouncedChange());break;case 9:if(r){var d=[D.hourElement,D.minuteElement,D.secondElement,D.amPM].concat(D.pluginElements).filter((function(e){return e})),s=d.indexOf(n);if(-1!==s){var u=d[s+(e.shiftKey?-1:1)];e.preventDefault(),(u||D._input).focus()}}else!D.config.noCalendar&&D.daysContainer&&D.daysContainer.contains(n)&&e.shiftKey&&(e.preventDefault(),D._input.focus())}}if(void 0!==D.amPM&&n===D.amPM)switch(e.key){case D.l10n.amPM[0].charAt(0):case D.l10n.amPM[0].charAt(0).toLowerCase():D.amPM.textContent=D.l10n.amPM[0],T(),we();break;case D.l10n.amPM[1].charAt(0):case D.l10n.amPM[1].charAt(0).toLowerCase():D.amPM.textContent=D.l10n.amPM[1],T(),we()}(t||G(n))&&ge("onKeyDown",e)}function te(e){if(1===D.selectedDates.length&&(!e||e.classList.contains("flatpickr-day")&&!e.classList.contains("flatpickr-disabled"))){for(var n=e?e.dateObj.getTime():D.days.firstElementChild.dateObj.getTime(),t=D.parseDate(D.selectedDates[0],void 0,!0).getTime(),a=Math.min(n,D.selectedDates[0].getTime()),i=Math.max(n,D.selectedDates[0].getTime()),o=!1,r=0,l=0,c=a;c<i;c+=M)Q(new Date(c),!0)||(o=o||c>a&&c<i,c<t&&(!r||c>r)?r=c:c>t&&(!l||c<l)&&(l=c));for(var d=0;d<D.config.showMonths;d++)for(var s=D.daysContainer.children[d],u=function(a,i){var c,d,u,f=s.children[a],m=f.dateObj.getTime(),g=r>0&&m<r||l>0&&m>l;return g?(f.classList.add("notAllowed"),["inRange","startRange","endRange"].forEach((function(e){f.classList.remove(e)})),"continue"):o&&!g?"continue":(["startRange","inRange","endRange","notAllowed"].forEach((function(e){f.classList.remove(e)})),void(void 0!==e&&(e.classList.add(n<=D.selectedDates[0].getTime()?"startRange":"endRange"),t<n&&m===t?f.classList.add("startRange"):t>n&&m===t&&f.classList.add("endRange"),m>=r&&(0===l||m<=l)&&(d=t,u=n,(c=m)>Math.min(d,u)&&c<Math.max(d,u))&&f.classList.add("inRange"))))},f=0,m=s.children.length;f<m;f++)u(f)}}function ae(){!D.isOpen||D.config.static||D.config.inline||le()}function ie(e){return function(n){var t=D.config["_"+e+"Date"]=D.parseDate(n,D.config.dateFormat),a=D.config["_"+("min"===e?"max":"min")+"Date"];void 0!==t&&(D["min"===e?"minDateHasTime":"maxDateHasTime"]=t.getHours()>0||t.getMinutes()>0||t.getSeconds()>0),D.selectedDates&&(D.selectedDates=D.selectedDates.filter((function(e){return Q(e)})),D.selectedDates.length||"min"!==e||I(t),we()),D.daysContainer&&(ce(),void 0!==t?D.currentYearElement[e]=t.getFullYear().toString():D.currentYearElement.removeAttribute(e),D.currentYearElement.disabled=!!a&&void 0!==t&&a.getFullYear()===t.getFullYear())}}function oe(){return D.config.wrap?g.querySelector("[data-input]"):g}function re(){"object"!=typeof D.config.locale&&void 0===E.l10ns[D.config.locale]&&D.config.errorHandler(new Error("flatpickr: invalid locale "+D.config.locale)),D.l10n=e(e({},E.l10ns.default),"object"==typeof D.config.locale?D.config.locale:"default"!==D.config.locale?E.l10ns[D.config.locale]:void 0),v.K="("+D.l10n.amPM[0]+"|"+D.l10n.amPM[1]+"|"+D.l10n.amPM[0].toLowerCase()+"|"+D.l10n.amPM[1].toLowerCase()+")",void 0===e(e({},h),JSON.parse(JSON.stringify(g.dataset||{}))).time_24hr&&void 0===E.defaultConfig.time_24hr&&(D.config.time_24hr=D.l10n.time_24hr),D.formatDate=w(D),D.parseDate=b({config:D.config,l10n:D.l10n})}function le(e){if(void 0!==D.calendarContainer){ge("onPreCalendarPosition");var n=e||D._positionElement,t=Array.prototype.reduce.call(D.calendarContainer.children,(function(e,n){return e+n.offsetHeight}),0),a=D.calendarContainer.offsetWidth,i=D.config.position.split(" "),o=i[0],r=i.length>1?i[1]:null,l=n.getBoundingClientRect(),c=window.innerHeight-l.bottom,s="above"===o||"below"!==o&&c<t&&l.top>t,u=window.pageYOffset+l.top+(s?-t-2:n.offsetHeight+2);if(d(D.calendarContainer,"arrowTop",!s),d(D.calendarContainer,"arrowBottom",s),!D.config.inline){var f=window.pageXOffset+l.left,m=!1,g=!1;"center"===r?(f-=(a-l.width)/2,m=!0):"right"===r&&(f-=a-l.width,g=!0),d(D.calendarContainer,"arrowLeft",!m&&!g),d(D.calendarContainer,"arrowCenter",m),d(D.calendarContainer,"arrowRight",g);var p=window.document.body.offsetWidth-(window.pageXOffset+l.right),h=f+a>window.document.body.offsetWidth,v=p+a>window.document.body.offsetWidth;if(d(D.calendarContainer,"rightMost",h),!D.config.static)if(D.calendarContainer.style.top=u+"px",h)if(v){var w=function(){for(var e=null,n=0;n<document.styleSheets.length;n++){var t=document.styleSheets[n];try{t.cssRules}catch(e){continue}e=t;break}return null!=e?e:(a=document.createElement("style"),document.head.appendChild(a),a.sheet);var a}();if(void 0===w)return;var b=window.document.body.offsetWidth,C=Math.max(0,b/2-a/2),M=w.cssRules.length,y="{left:"+l.left+"px;right:auto;}";d(D.calendarContainer,"rightMost",!1),d(D.calendarContainer,"centerMost",!0),w.insertRule(".flatpickr-calendar.centerMost:before,.flatpickr-calendar.centerMost:after"+y,M),D.calendarContainer.style.left=C+"px",D.calendarContainer.style.right="auto"}else D.calendarContainer.style.left="auto",D.calendarContainer.style.right=p+"px";else D.calendarContainer.style.left=f+"px",D.calendarContainer.style.right="auto"}}}function ce(){D.config.noCalendar||D.isMobile||(J(),ve(),B())}function de(){D._input.focus(),-1!==window.navigator.userAgent.indexOf("MSIE")||void 0!==navigator.msMaxTouchPoints?setTimeout(D.close,0):D.close()}function se(e){e.preventDefault(),e.stopPropagation();var n=function e(n,t){return t(n)?n:n.parentNode?e(n.parentNode,t):void 0}(m(e),(function(e){return e.classList&&e.classList.contains("flatpickr-day")&&!e.classList.contains("flatpickr-disabled")&&!e.classList.contains("notAllowed")}));if(void 0!==n){var t=n,a=D.latestSelectedDateObj=new Date(t.dateObj.getTime()),i=(a.getMonth()<D.currentMonth||a.getMonth()>D.currentMonth+D.config.showMonths-1)&&"range"!==D.config.mode;if(D.selectedDateElem=t,"single"===D.config.mode)D.selectedDates=[a];else if("multiple"===D.config.mode){var o=he(a);o?D.selectedDates.splice(parseInt(o),1):D.selectedDates.push(a)}else"range"===D.config.mode&&(2===D.selectedDates.length&&D.clear(!1,!1),D.latestSelectedDateObj=a,D.selectedDates.push(a),0!==C(a,D.selectedDates[0],!0)&&D.selectedDates.sort((function(e,n){return e.getTime()-n.getTime()})));if(T(),i){var r=D.currentYear!==a.getFullYear();D.currentYear=a.getFullYear(),D.currentMonth=a.getMonth(),r&&(ge("onYearChange"),J()),ge("onMonthChange")}if(ve(),B(),we(),i||"range"===D.config.mode||1!==D.config.showMonths?void 0!==D.selectedDateElem&&void 0===D.hourElement&&D.selectedDateElem&&D.selectedDateElem.focus():j(t),void 0!==D.hourElement&&void 0!==D.hourElement&&D.hourElement.focus(),D.config.closeOnSelect){var l="single"===D.config.mode&&!D.config.enableTime,c="range"===D.config.mode&&2===D.selectedDates.length&&!D.config.enableTime;(l||c)&&de()}N()}}D.parseDate=b({config:D.config,l10n:D.l10n}),D._handlers=[],D.pluginElements=[],D.loadedPlugins=[],D._bind=F,D._setHoursFromDate=I,D._positionCalendar=le,D.changeMonth=z,D.changeYear=Z,D.clear=function(e,n){void 0===e&&(e=!0);void 0===n&&(n=!0);D.input.value="",void 0!==D.altInput&&(D.altInput.value="");void 0!==D.mobileInput&&(D.mobileInput.value="");D.selectedDates=[],D.latestSelectedDateObj=void 0,!0===n&&(D.currentYear=D._initialDate.getFullYear(),D.currentMonth=D._initialDate.getMonth());if(!0===D.config.enableTime){var t=S(),a=t.hours,i=t.minutes,o=t.seconds;_(a,i,o)}D.redraw(),e&&ge("onChange")},D.close=function(){D.isOpen=!1,D.isMobile||(void 0!==D.calendarContainer&&D.calendarContainer.classList.remove("open"),void 0!==D._input&&D._input.classList.remove("active"));ge("onClose")},D._createElement=s,D.destroy=function(){void 0!==D.config&&ge("onDestroy");for(var e=D._handlers.length;e--;){var n=D._handlers[e];n.element.removeEventListener(n.event,n.handler,n.options)}if(D._handlers=[],D.mobileInput)D.mobileInput.parentNode&&D.mobileInput.parentNode.removeChild(D.mobileInput),D.mobileInput=void 0;else if(D.calendarContainer&&D.calendarContainer.parentNode)if(D.config.static&&D.calendarContainer.parentNode){var t=D.calendarContainer.parentNode;if(t.lastChild&&t.removeChild(t.lastChild),t.parentNode){for(;t.firstChild;)t.parentNode.insertBefore(t.firstChild,t);t.parentNode.removeChild(t)}}else D.calendarContainer.parentNode.removeChild(D.calendarContainer);D.altInput&&(D.input.type="text",D.altInput.parentNode&&D.altInput.parentNode.removeChild(D.altInput),delete D.altInput);D.input&&(D.input.type=D.input._type,D.input.classList.remove("flatpickr-input"),D.input.removeAttribute("readonly"));["_showTimeInput","latestSelectedDateObj","_hideNextMonthArrow","_hidePrevMonthArrow","__hideNextMonthArrow","__hidePrevMonthArrow","isMobile","isOpen","selectedDateElem","minDateHasTime","maxDateHasTime","days","daysContainer","_input","_positionElement","innerContainer","rContainer","monthNav","todayDateElem","calendarContainer","weekdayContainer","prevMonthNav","nextMonthNav","monthsDropdownContainer","currentMonthElement","currentYearElement","navigationCurrentMonth","selectedDateElem","config"].forEach((function(e){try{delete D[e]}catch(e){}}))},D.isEnabled=Q,D.jumpToDate=A,D.open=function(e,n){void 0===n&&(n=D._positionElement);if(!0===D.isMobile){if(e){e.preventDefault();var t=m(e);t&&t.blur()}return void 0!==D.mobileInput&&(D.mobileInput.focus(),D.mobileInput.click()),void ge("onOpen")}if(D._input.disabled||D.config.inline)return;var a=D.isOpen;D.isOpen=!0,a||(D.calendarContainer.classList.add("open"),D._input.classList.add("active"),ge("onOpen"),le(n));!0===D.config.enableTime&&!0===D.config.noCalendar&&(!1!==D.config.allowInput||void 0!==e&&D.timeContainer.contains(e.relatedTarget)||setTimeout((function(){return D.hourElement.select()}),50))},D.redraw=ce,D.set=function(e,n){if(null!==e&&"object"==typeof e)for(var a in Object.assign(D.config,e),e)void 0!==ue[a]&&ue[a].forEach((function(e){return e()}));else D.config[e]=n,void 0!==ue[e]?ue[e].forEach((function(e){return e()})):t.indexOf(e)>-1&&(D.config[e]=c(n));D.redraw(),we(!0)},D.setDate=function(e,n,t){void 0===n&&(n=!1);void 0===t&&(t=D.config.dateFormat);if(0!==e&&!e||e instanceof Array&&0===e.length)return D.clear(n);fe(e,t),D.latestSelectedDateObj=D.selectedDates[D.selectedDates.length-1],D.redraw(),A(void 0,n),I(),0===D.selectedDates.length&&D.clear(!1);we(n),n&&ge("onChange")},D.toggle=function(e){if(!0===D.isOpen)return D.close();D.open(e)};var ue={locale:[re,$],showMonths:[U,x,q],minDate:[A],maxDate:[A]};function fe(e,n){var t=[];if(e instanceof Array)t=e.map((function(e){return D.parseDate(e,n)}));else if(e instanceof Date||"number"==typeof e)t=[D.parseDate(e,n)];else if("string"==typeof e)switch(D.config.mode){case"single":case"time":t=[D.parseDate(e,n)];break;case"multiple":t=e.split(D.config.conjunction).map((function(e){return D.parseDate(e,n)}));break;case"range":t=e.split(D.l10n.rangeSeparator).map((function(e){return D.parseDate(e,n)}))}else D.config.errorHandler(new Error("Invalid date supplied: "+JSON.stringify(e)));D.selectedDates=D.config.allowInvalidPreload?t:t.filter((function(e){return e instanceof Date&&Q(e,!1)})),"range"===D.config.mode&&D.selectedDates.sort((function(e,n){return e.getTime()-n.getTime()}))}function me(e){return e.slice().map((function(e){return"string"==typeof e||"number"==typeof e||e instanceof Date?D.parseDate(e,void 0,!0):e&&"object"==typeof e&&e.from&&e.to?{from:D.parseDate(e.from,void 0),to:D.parseDate(e.to,void 0)}:e})).filter((function(e){return e}))}function ge(e,n){if(void 0!==D.config){var t=D.config[e];if(void 0!==t&&t.length>0)for(var a=0;t[a]&&a<t.length;a++)t[a](D.selectedDates,D.input.value,D,n);"onChange"===e&&(D.input.dispatchEvent(pe("change")),D.input.dispatchEvent(pe("input")))}}function pe(e){var n=document.createEvent("Event");return n.initEvent(e,!0,!0),n}function he(e){for(var n=0;n<D.selectedDates.length;n++)if(0===C(D.selectedDates[n],e))return""+n;return!1}function ve(){D.config.noCalendar||D.isMobile||!D.monthNav||(D.yearElements.forEach((function(e,n){var t=new Date(D.currentYear,D.currentMonth,1);t.setMonth(D.currentMonth+n),D.config.showMonths>1||"static"===D.config.monthSelectorType?D.monthElements[n].textContent=p(t.getMonth(),D.config.shorthandCurrentMonth,D.l10n)+" ":D.monthsDropdownContainer.value=t.getMonth().toString(),e.value=t.getFullYear().toString()})),D._hidePrevMonthArrow=void 0!==D.config.minDate&&(D.currentYear===D.config.minDate.getFullYear()?D.currentMonth<=D.config.minDate.getMonth():D.currentYear<D.config.minDate.getFullYear()),D._hideNextMonthArrow=void 0!==D.config.maxDate&&(D.currentYear===D.config.maxDate.getFullYear()?D.currentMonth+1>D.config.maxDate.getMonth():D.currentYear>D.config.maxDate.getFullYear()))}function De(e){return D.selectedDates.map((function(n){return D.formatDate(n,e)})).filter((function(e,n,t){return"range"!==D.config.mode||D.config.enableTime||t.indexOf(e)===n})).join("range"!==D.config.mode?D.config.conjunction:D.l10n.rangeSeparator)}function we(e){void 0===e&&(e=!0),void 0!==D.mobileInput&&D.mobileFormatStr&&(D.mobileInput.value=void 0!==D.latestSelectedDateObj?D.formatDate(D.latestSelectedDateObj,D.mobileFormatStr):""),D.input.value=De(D.config.dateFormat),void 0!==D.altInput&&(D.altInput.value=De(D.config.altFormat)),!1!==e&&ge("onValueUpdate")}function be(e){var n=m(e),t=D.prevMonthNav.contains(n),a=D.nextMonthNav.contains(n);t||a?z(t?-1:1):D.yearElements.indexOf(n)>=0?n.select():n.classList.contains("arrowUp")?D.changeYear(D.currentYear+1):n.classList.contains("arrowDown")&&D.changeYear(D.currentYear-1)}return function(){D.element=D.input=g,D.isOpen=!1,function(){var n=["wrap","weekNumbers","allowInput","allowInvalidPreload","clickOpens","time_24hr","enableTime","noCalendar","altInput","shorthandCurrentMonth","inline","static","enableSeconds","disableMobile"],i=e(e({},JSON.parse(JSON.stringify(g.dataset||{}))),h),o={};D.config.parseDate=i.parseDate,D.config.formatDate=i.formatDate,Object.defineProperty(D.config,"enable",{get:function(){return D.config._enable},set:function(e){D.config._enable=me(e)}}),Object.defineProperty(D.config,"disable",{get:function(){return D.config._disable},set:function(e){D.config._disable=me(e)}});var r="time"===i.mode;if(!i.dateFormat&&(i.enableTime||r)){var l=E.defaultConfig.dateFormat||a.dateFormat;o.dateFormat=i.noCalendar||r?"H:i"+(i.enableSeconds?":S":""):l+" H:i"+(i.enableSeconds?":S":"")}if(i.altInput&&(i.enableTime||r)&&!i.altFormat){var d=E.defaultConfig.altFormat||a.altFormat;o.altFormat=i.noCalendar||r?"h:i"+(i.enableSeconds?":S K":" K"):d+" h:i"+(i.enableSeconds?":S":"")+" K"}Object.defineProperty(D.config,"minDate",{get:function(){return D.config._minDate},set:ie("min")}),Object.defineProperty(D.config,"maxDate",{get:function(){return D.config._maxDate},set:ie("max")});var s=function(e){return function(n){D.config["min"===e?"_minTime":"_maxTime"]=D.parseDate(n,"H:i:S")}};Object.defineProperty(D.config,"minTime",{get:function(){return D.config._minTime},set:s("min")}),Object.defineProperty(D.config,"maxTime",{get:function(){return D.config._maxTime},set:s("max")}),"time"===i.mode&&(D.config.noCalendar=!0,D.config.enableTime=!0);Object.assign(D.config,o,i);for(var u=0;u<n.length;u++)D.config[n[u]]=!0===D.config[n[u]]||"true"===D.config[n[u]];t.filter((function(e){return void 0!==D.config[e]})).forEach((function(e){D.config[e]=c(D.config[e]||[]).map(y)})),D.isMobile=!D.config.disableMobile&&!D.config.inline&&"single"===D.config.mode&&!D.config.disable.length&&!D.config.enable.length&&!D.config.weekNumbers&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);for(u=0;u<D.config.plugins.length;u++){var f=D.config.plugins[u](D)||{};for(var m in f)t.indexOf(m)>-1?D.config[m]=c(f[m]).map(y).concat(D.config[m]):void 0===i[m]&&(D.config[m]=f[m])}i.altInputClass||(D.config.altInputClass=oe().className+" "+D.config.altInputClass);ge("onParseConfig")}(),re(),function(){if(D.input=oe(),!D.input)return void D.config.errorHandler(new Error("Invalid input element specified"));D.input._type=D.input.type,D.input.type="text",D.input.classList.add("flatpickr-input"),D._input=D.input,D.config.altInput&&(D.altInput=s(D.input.nodeName,D.config.altInputClass),D._input=D.altInput,D.altInput.placeholder=D.input.placeholder,D.altInput.disabled=D.input.disabled,D.altInput.required=D.input.required,D.altInput.tabIndex=D.input.tabIndex,D.altInput.type="text",D.input.setAttribute("type","hidden"),!D.config.static&&D.input.parentNode&&D.input.parentNode.insertBefore(D.altInput,D.input.nextSibling));D.config.allowInput||D._input.setAttribute("readonly","readonly");D._positionElement=D.config.positionElement||D._input}(),function(){D.selectedDates=[],D.now=D.parseDate(D.config.now)||new Date;var e=D.config.defaultDate||("INPUT"!==D.input.nodeName&&"TEXTAREA"!==D.input.nodeName||!D.input.placeholder||D.input.value!==D.input.placeholder?D.input.value:null);e&&fe(e,D.config.dateFormat);D._initialDate=D.selectedDates.length>0?D.selectedDates[0]:D.config.minDate&&D.config.minDate.getTime()>D.now.getTime()?D.config.minDate:D.config.maxDate&&D.config.maxDate.getTime()<D.now.getTime()?D.config.maxDate:D.now,D.currentYear=D._initialDate.getFullYear(),D.currentMonth=D._initialDate.getMonth(),D.selectedDates.length>0&&(D.latestSelectedDateObj=D.selectedDates[0]);void 0!==D.config.minTime&&(D.config.minTime=D.parseDate(D.config.minTime,"H:i"));void 0!==D.config.maxTime&&(D.config.maxTime=D.parseDate(D.config.maxTime,"H:i"));D.minDateHasTime=!!D.config.minDate&&(D.config.minDate.getHours()>0||D.config.minDate.getMinutes()>0||D.config.minDate.getSeconds()>0),D.maxDateHasTime=!!D.config.maxDate&&(D.config.maxDate.getHours()>0||D.config.maxDate.getMinutes()>0||D.config.maxDate.getSeconds()>0)}(),D.utils={getDaysInMonth:function(e,n){return void 0===e&&(e=D.currentMonth),void 0===n&&(n=D.currentYear),1===e&&(n%4==0&&n%100!=0||n%400==0)?29:D.l10n.daysInMonth[e]}},D.isMobile||function(){var e=window.document.createDocumentFragment();if(D.calendarContainer=s("div","flatpickr-calendar"),D.calendarContainer.tabIndex=-1,!D.config.noCalendar){if(e.appendChild((D.monthNav=s("div","flatpickr-months"),D.yearElements=[],D.monthElements=[],D.prevMonthNav=s("span","flatpickr-prev-month"),D.prevMonthNav.innerHTML=D.config.prevArrow,D.nextMonthNav=s("span","flatpickr-next-month"),D.nextMonthNav.innerHTML=D.config.nextArrow,U(),Object.defineProperty(D,"_hidePrevMonthArrow",{get:function(){return D.__hidePrevMonthArrow},set:function(e){D.__hidePrevMonthArrow!==e&&(d(D.prevMonthNav,"flatpickr-disabled",e),D.__hidePrevMonthArrow=e)}}),Object.defineProperty(D,"_hideNextMonthArrow",{get:function(){return D.__hideNextMonthArrow},set:function(e){D.__hideNextMonthArrow!==e&&(d(D.nextMonthNav,"flatpickr-disabled",e),D.__hideNextMonthArrow=e)}}),D.currentYearElement=D.yearElements[0],ve(),D.monthNav)),D.innerContainer=s("div","flatpickr-innerContainer"),D.config.weekNumbers){var n=function(){D.calendarContainer.classList.add("hasWeeks");var e=s("div","flatpickr-weekwrapper");e.appendChild(s("span","flatpickr-weekday",D.l10n.weekAbbreviation));var n=s("div","flatpickr-weeks");return e.appendChild(n),{weekWrapper:e,weekNumbers:n}}(),t=n.weekWrapper,a=n.weekNumbers;D.innerContainer.appendChild(t),D.weekNumbers=a,D.weekWrapper=t}D.rContainer=s("div","flatpickr-rContainer"),D.rContainer.appendChild(q()),D.daysContainer||(D.daysContainer=s("div","flatpickr-days"),D.daysContainer.tabIndex=-1),B(),D.rContainer.appendChild(D.daysContainer),D.innerContainer.appendChild(D.rContainer),e.appendChild(D.innerContainer)}D.config.enableTime&&e.appendChild(function(){D.calendarContainer.classList.add("hasTime"),D.config.noCalendar&&D.calendarContainer.classList.add("noCalendar");D.timeContainer=s("div","flatpickr-time"),D.timeContainer.tabIndex=-1;var e=s("span","flatpickr-time-separator",":"),n=f("flatpickr-hour",{"aria-label":D.l10n.hourAriaLabel});D.hourElement=n.getElementsByTagName("input")[0];var t=f("flatpickr-minute",{"aria-label":D.l10n.minuteAriaLabel});D.minuteElement=t.getElementsByTagName("input")[0],D.hourElement.tabIndex=D.minuteElement.tabIndex=-1,D.hourElement.value=o(D.latestSelectedDateObj?D.latestSelectedDateObj.getHours():D.config.time_24hr?D.config.defaultHour:function(e){switch(e%24){case 0:case 12:return 12;default:return e%12}}(D.config.defaultHour)),D.minuteElement.value=o(D.latestSelectedDateObj?D.latestSelectedDateObj.getMinutes():D.config.defaultMinute),D.hourElement.setAttribute("step",D.config.hourIncrement.toString()),D.minuteElement.setAttribute("step",D.config.minuteIncrement.toString()),D.hourElement.setAttribute("min",D.config.time_24hr?"0":"1"),D.hourElement.setAttribute("max",D.config.time_24hr?"23":"12"),D.minuteElement.setAttribute("min","0"),D.minuteElement.setAttribute("max","59"),D.timeContainer.appendChild(n),D.timeContainer.appendChild(e),D.timeContainer.appendChild(t),D.config.time_24hr&&D.timeContainer.classList.add("time24hr");if(D.config.enableSeconds){D.timeContainer.classList.add("hasSeconds");var a=f("flatpickr-second");D.secondElement=a.getElementsByTagName("input")[0],D.secondElement.value=o(D.latestSelectedDateObj?D.latestSelectedDateObj.getSeconds():D.config.defaultSeconds),D.secondElement.setAttribute("step",D.minuteElement.getAttribute("step")),D.secondElement.setAttribute("min","0"),D.secondElement.setAttribute("max","59"),D.timeContainer.appendChild(s("span","flatpickr-time-separator",":")),D.timeContainer.appendChild(a)}D.config.time_24hr||(D.amPM=s("span","flatpickr-am-pm",D.l10n.amPM[r((D.latestSelectedDateObj?D.hourElement.value:D.config.defaultHour)>11)]),D.amPM.title=D.l10n.toggleTitle,D.amPM.tabIndex=-1,D.timeContainer.appendChild(D.amPM));return D.timeContainer}());d(D.calendarContainer,"rangeMode","range"===D.config.mode),d(D.calendarContainer,"animate",!0===D.config.animate),d(D.calendarContainer,"multiMonth",D.config.showMonths>1),D.calendarContainer.appendChild(e);var i=void 0!==D.config.appendTo&&void 0!==D.config.appendTo.nodeType;if((D.config.inline||D.config.static)&&(D.calendarContainer.classList.add(D.config.inline?"inline":"static"),D.config.inline&&(!i&&D.element.parentNode?D.element.parentNode.insertBefore(D.calendarContainer,D._input.nextSibling):void 0!==D.config.appendTo&&D.config.appendTo.appendChild(D.calendarContainer)),D.config.static)){var l=s("div","flatpickr-wrapper");D.element.parentNode&&D.element.parentNode.insertBefore(l,D.element),l.appendChild(D.element),D.altInput&&l.appendChild(D.altInput),l.appendChild(D.calendarContainer)}D.config.static||D.config.inline||(void 0!==D.config.appendTo?D.config.appendTo:window.document.body).appendChild(D.calendarContainer)}(),function(){D.config.wrap&&["open","close","toggle","clear"].forEach((function(e){Array.prototype.forEach.call(D.element.querySelectorAll("[data-"+e+"]"),(function(n){return F(n,"click",D[e])}))}));if(D.isMobile)return void function(){var e=D.config.enableTime?D.config.noCalendar?"time":"datetime-local":"date";D.mobileInput=s("input",D.input.className+" flatpickr-mobile"),D.mobileInput.tabIndex=1,D.mobileInput.type=e,D.mobileInput.disabled=D.input.disabled,D.mobileInput.required=D.input.required,D.mobileInput.placeholder=D.input.placeholder,D.mobileFormatStr="datetime-local"===e?"Y-m-d\\TH:i:S":"date"===e?"Y-m-d":"H:i:S",D.selectedDates.length>0&&(D.mobileInput.defaultValue=D.mobileInput.value=D.formatDate(D.selectedDates[0],D.mobileFormatStr));D.config.minDate&&(D.mobileInput.min=D.formatDate(D.config.minDate,"Y-m-d"));D.config.maxDate&&(D.mobileInput.max=D.formatDate(D.config.maxDate,"Y-m-d"));D.input.getAttribute("step")&&(D.mobileInput.step=String(D.input.getAttribute("step")));D.input.type="hidden",void 0!==D.altInput&&(D.altInput.type="hidden");try{D.input.parentNode&&D.input.parentNode.insertBefore(D.mobileInput,D.input.nextSibling)}catch(e){}F(D.mobileInput,"change",(function(e){D.setDate(m(e).value,!1,D.mobileFormatStr),ge("onChange"),ge("onClose")}))}();var e=l(ae,50);D._debouncedChange=l(N,300),D.daysContainer&&!/iPhone|iPad|iPod/i.test(navigator.userAgent)&&F(D.daysContainer,"mouseover",(function(e){"range"===D.config.mode&&te(m(e))}));F(window.document.body,"keydown",ne),D.config.inline||D.config.static||F(window,"resize",e);void 0!==window.ontouchstart?F(window.document,"touchstart",V):F(window.document,"click",V);F(window.document,"focus",V,{capture:!0}),!0===D.config.clickOpens&&(F(D._input,"focus",D.open),F(D._input,"click",D.open));void 0!==D.daysContainer&&(F(D.monthNav,"click",be),F(D.monthNav,["keyup","increment"],O),F(D.daysContainer,"click",se));if(void 0!==D.timeContainer&&void 0!==D.minuteElement&&void 0!==D.hourElement){F(D.timeContainer,["increment"],k),F(D.timeContainer,"blur",k,{capture:!0}),F(D.timeContainer,"click",P),F([D.hourElement,D.minuteElement],["focus","click"],(function(e){return m(e).select()})),void 0!==D.secondElement&&F(D.secondElement,"focus",(function(){return D.secondElement&&D.secondElement.select()})),void 0!==D.amPM&&F(D.amPM,"click",(function(e){k(e),N()}))}D.config.allowInput&&F(D._input,"blur",ee)}(),(D.selectedDates.length||D.config.noCalendar)&&(D.config.enableTime&&I(D.config.noCalendar?D.latestSelectedDateObj||D.config.minDate:void 0),we(!1)),x();var n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent);!D.isMobile&&n&&le(),ge("onReady")}(),D}function x(e,n){for(var t=Array.prototype.slice.call(e).filter((function(e){return e instanceof HTMLElement})),a=[],i=0;i<t.length;i++){var o=t[i];try{if(null!==o.getAttribute("data-fp-omit"))continue;void 0!==o._flatpickr&&(o._flatpickr.destroy(),o._flatpickr=void 0),o._flatpickr=y(o,n||{}),a.push(o._flatpickr)}catch(e){console.error(e)}}return 1===a.length?a[0]:a}"undefined"!=typeof HTMLElement&&"undefined"!=typeof HTMLCollection&&"undefined"!=typeof NodeList&&(HTMLCollection.prototype.flatpickr=NodeList.prototype.flatpickr=function(e){return x(this,e)},HTMLElement.prototype.flatpickr=function(e){return x([this],e)});var E=function(e,n){return"string"==typeof e?x(window.document.querySelectorAll(e),n):e instanceof Node?x([e],n):x(e,n)};return E.defaultConfig={},E.l10ns={en:e({},i),default:e({},i)},E.localize=function(n){E.l10ns.default=e(e({},E.l10ns.default),n)},E.setDefaults=function(n){E.defaultConfig=e(e({},E.defaultConfig),n)},E.parseDate=b({}),E.formatDate=w({}),E.compareDates=C,"undefined"!=typeof jQuery&&void 0!==jQuery.fn&&(jQuery.fn.flatpickr=function(e){return x(this,e)}),Date.prototype.fp_incr=function(e){return new Date(this.getFullYear(),this.getMonth(),this.getDate()+("string"==typeof e?parseInt(e,10):e))},"undefined"!=typeof window&&(window.flatpickr=E),E}));
/* Source and licensing information for the above line(s) can be found at https://www.autopozicovna-kosice.sk/themes/custom/autopozicovna_kosice/libs/flatpickr/flatpickr.min.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.autopozicovna-kosice.sk/themes/custom/autopozicovna_kosice/js/datetime-flatpickr.js. */
(function ($) {
  Drupal.behaviors.DateTimeFlatPickr = {
    attach: function (context, settings) {
      var $context = $(context);
      var name = 'reservation';
      //$context.find('.paragraph--type--frontpage-products', context).once('field--name-field-content-elements').each( function () {
      $("input[flatpickr-name='" + name + "']", context).once('form-item-date').each(function () {
        var datetime = $(this);
        datetime.flatpickr({
          //noCalendar: true,
          enableTime: true,
          dateFormat: 'd.m.Y H:i',
          minDate: "today",
          time_24hr: true,
          minuteIncrement: 15,
          defaultHour: 9,

          "locale": {
            "firstDayOfWeek": 1 // start week on Monday
          }
        });
      })
    }
  };
})(jQuery);

/* Source and licensing information for the above line(s) can be found at https://www.autopozicovna-kosice.sk/themes/custom/autopozicovna_kosice/js/datetime-flatpickr.js. */;
/* Source and licensing information for the line(s) below can be found at https://www.autopozicovna-kosice.sk/themes/custom/autopozicovna_kosice/js/global.js. */
/**
 * @file
 * Global javascripts.
 */
(function ($, Drupal) {

  $('.search-toggler').on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass('open');
    $('.search-overlay-container').toggleClass('open');
    $('.region-header').toggleClass('search-open');
  });

  $('button.hamburger').on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass('is-active');
    // $('.region-sidebar-off-canvas').toggleClass('open');
    if ($('.region-sidebar-off-canvas').hasClass('toggled')) {
      $('.region-sidebar-off-canvas').removeClass("toggled");
    } else {
      // $('.toggle').removeClass('toggle-d');
      $('.region-sidebar-off-canvas').addClass('toggled');
    }
    //$('.layout-container').toggleClass('toogled');
  });

  $('#block-autopozicovna_kosice-tw-main-menu > ul.main-menu > li').hover(function () {
    var $submenu = $(this).find('ul.main-menu ');
    $submenu.toggleClass('active');
  });

  if (!$('body').hasClass('user-logged-in')) {
    var stickymenu = document.getElementById("header-wrapper")
    var stickymenu = document.getElementById("sticky-navigation")
    //var stickyNavbar = document.getElementById("sticky-navigation")
    var stickymenuoffset = stickymenu.offsetTop
    var stickymenuHeight = stickymenu.offsetHeight
    var paddingMain = stickymenuHeight + stickymenuoffset

    window.addEventListener("scroll", function (e) {
      requestAnimationFrame(function () {
        if (window.pageYOffset > stickymenuoffset) {
          stickymenu.classList.add('tw-fixed', 'tw-w-full')
          $('.region-header-bar').addClass('tw--mt-12')
          $('.region-header-navbar .background').addClass('tw-opacity-100')
          $('.region-header-navbar .background').removeClass('tw-opacity-50')

          if (!$('.region-header').length) {
          $('main').css({
            paddingTop: paddingMain + 'px',
          });
          }

          $('.region-header').css({
            paddingTop: paddingMain + 'px',
          });

        } else {
          stickymenu.classList.remove('tw-fixed', 'tw-w-full', 'tw-bg-primary-gray')
          $('.region-header-bar').removeClass('tw--mt-12')
          $('.region-header-navbar .background').removeClass('tw-opacity-100')
          $('.region-header-navbar .background').addClass('tw-opacity-50')
          $('main').css({
            paddingTop: '',
          });
          $('.region-header').css({
            paddingTop: '',
          });
        }
      })
    })
  }

  var menus = ['block-productsnavigation', 'block-productsnavigation-3'];
  menus.forEach(myFunction);

  function myFunction(item, index) {
    $('#' + item +' ul.products-menu > li.menu-item--expanded > a').append('<i class="fa fa-chevron-down"></i>');
    $('#' + item + ' ul.products-menu > li.menu-item--expanded > a > i').bind('click', function () {
      //this.preventDefault();
      var parent_element = $(this).parent().parent();

      if ($(this).hasClass('expand')) {
        $(this).removeClass('expand');
        $('> ul', parent_element).slideUp(400);
      }
      else {
        $(this).addClass('expand');
        $('> ul', parent_element).slideDown(400);
      }

      return false;

    });
  }

  // if ($(window).width() < 1024) {
  //   if ($('#block-languageswitcher').length > 0) {
  //     //$('#block-horizont-main-menu').addClass("col-xs-12 main-menu collapse");
  //     //var field_main_menu = $('#block-gtranslate');
  //     $('.region-sidebar-off-canvas').append($('#block-languageswitcher'));
  //   }
  // }
  //
  // if ($("#block-languageswitcher")[0]){
  //   $('#block-languageswitcher').addClass("col-xs-12 phone collapse");
  //   var field_phone = $('#block-languageswitcher');
  //   $('.region-sidebar-off-canvas').append(field_phone);
  // };
  //
  // var element =  document.getElementsByClassName('block-language-blocklanguage-interface');
  // $('.region-sidebar-off-canvas').append(element);

  // Set margin left for the taxonomy header.
  window.onresize = header_margin;
  window.onload = header_margin;
  function header_margin() {
    if ($('#taxonomy-content').length > 0) {
      var x = document.getElementById('taxonomy-content').getBoundingClientRect();
      var myLeftLineWidth = x.left + 'px';
      $("#taxonomy-header-content").css('marginLeft', myLeftLineWidth);
    }
    if ($('#node-content').length > 0) {
      var x = document.getElementById('node-content').getBoundingClientRect();
      var myLeftLineWidth = x.left + 'px';
      $("#node-header-content").css('marginLeft', myLeftLineWidth);
    }
  }

  var app = {
    dom: {},

    init: function () {

      // HELPERS
      app.helpers.initDom();

      // SECTIONS
      app.news.init();

    },

    news: {
      init: function () {
        if ($('.view-news').length) {
          app.news.bindExpandable();

          app.dom.$window.on('load', function () {
            $('.view-news').find('.swiper-container').each(function () {
              if ($(this)[0].swiper !== undefined) {
                $(this)[0].swiper.stopAutoplay();
                $(this)[0].swiper.slideTo(1, 0);
              }
            });
          });
        }
      },

      enableSwiper: function ($fullContent) {
        setTimeout(function () {
          var swiperInstance = $fullContent.find('.swiper-container').length
            ? $fullContent.find('.swiper-container')[0].swiper
            : undefined;

          if (swiperInstance !== undefined) {
            // centering pagination
            if ($fullContent.find('.swiper-pagination').length) {
              var $pagination = $fullContent.find('.swiper-pagination');
              $pagination.css({'margin-left': -($pagination.width() / 2) + 'px'});
            }

            swiperInstance.update(true);
            setTimeout(function () {
              swiperInstance.slideTo(1, 0);
            });

            setTimeout(function () {
              swiperInstance.startAutoplay();
            }, 500);
          }
        });
      },

      disableSwiper: function ($fullContent) {
        var swiperInstance = $fullContent.find('.swiper-container').length
          ? $fullContent.find('.swiper-container')[0].swiper
          : undefined;

        if (swiperInstance !== undefined) {
          swiperInstance.stopAutoplay();
        }
      },

      bindExpandable: function () {
        var isActive = false;

        $('.news-box-content').on('click', function () {
          var $newsBox = $(this).parents('.views-row');
          if (!$newsBox.hasClass('active')) {

            isActive = true;

            var previousOffsetTop = -1;

            $('.views-row.active').each(function () {
              var $newsBox = $(this);
              var $fullContent = $newsBox.find('.news-box-full-content');

              previousOffsetTop = $fullContent.offset().top;

              $newsBox.css({
                marginBottom: ''
              }).removeClass('active');

              $fullContent.stop().css({
                height: '',
                display: 'none'
              });

              app.news.disableSwiper($fullContent);
            });

            $newsBox.addClass('active');
            var $fullContent = $newsBox.find('.news-box-full-content');
            $fullContent.css({
              height: '',
              paddingTop: '',
              paddingBottom: '',
              overflow: 'hidden',
              display: 'block',
            });
            var h = $fullContent.outerHeight();
            var pt = parseInt($fullContent.css('paddingTop'));
            var pb = parseInt($fullContent.css('paddingBottom'));
            $fullContent.css({
              height: 0,
              paddingTop: 0,
              paddingBottom: 0
            });

            if (app.dom.$window.height() < app.dom.$header.height() + h + ($(this).height() / 4)) {
              app.helpers.animateScrollTo($fullContent.offset().top - ($(this).height() / 4));
            } else {
              app.helpers.animateScrollTo((function () {
                return ($fullContent.offset().top + h - (app.dom.$window.height() + h / 2) / 2) - app.dom.$header.height();
              })());
            }

            if (previousOffsetTop == $fullContent.offset().top) {
              $newsBox.css({
                marginBottom: h
              });

              $fullContent.css({
                height: '',
                paddingTop: '',
                paddingBottom: ''
              });
            } else {
              $newsBox.animate({
                marginBottom: h
              }, 800, 'easeInOutQuint');

              $fullContent.animate({
                height: h,
                paddingTop: pt,
                paddingBottom: pb
              }, 800, 'easeInOutQuint', function () {
                $(this).css({
                  height: '',
                  paddingTop: '',
                  paddingBottom: ''
                });
              });
            }

            $fullContent.children().css({
              opacity: 0
            }).animate({
              opacity: 1
            }, 800, 'easeOutQuint');

            app.news.enableSwiper($fullContent);
          }
        });

        // app.dom.$body.on('click', function (e) {
        $('body .view-news').on('click', function (e) {
          if (isActive && !$(e.target).is('.view-content') && !$(e.target).parents('.view-content').length) {
            isActive = false;

            $('.views-row.active').each(function () {
              var $newsBox = $(this);
              var $fullContent = $newsBox.find('.news-box-full-content');

              $newsBox.stop().animate({
                marginBottom: 0
              }, 800, 'easeInOutQuint');

              $fullContent.children().stop().animate({
                opacity: 0
              }, 800, 'easeOutQuint');

              $fullContent.stop().animate({
                height: 0,
                paddingTop: 0,
                paddingBottom: 0
              }, 800, 'easeInOutQuint', function () {
                $newsBox.css({
                  marginBottom: ''
                }).removeClass('active');

                $(this).css({
                  height: '',
                  paddingTop: '',
                  paddingBottom: ''
                });
              });

              app.news.disableSwiper($fullContent);
            });
          }
        });

        app.dom.$window.on('resize', function () {
          if (isActive) {
            $('.views-row.active').each(function () {
              var $newsBox = $(this);
              var $fullContent = $newsBox.find('.news-box-full-content');

              $fullContent.stop().css({
                height: '',
                paddingTop: '',
                paddingBottom: ''
              });

              var h = $fullContent.outerHeight();

              $newsBox.stop().css({
                marginBottom: h
              });
            });
          }
        });
      }
    },

    helpers: {
      animateScroll: function() {
        $('a[href*=#]:not([href=#])').click(function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html,body').animate({
                scrollTop: target.offset().top - app.helpers.rem(90) + 1
              }, 1000);
              return false;
            }
          }
        });
      },
      animateScrollTo: function(target) {

        if (typeof target === 'number') {

          $('html,body').animate({
            scrollTop: target - 80 + 1 // @TODO change fixed value to header height
          }, 1000);
          return false;

        } else if (typeof target === 'object') {

          var target = $(target);

          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 80 + 1 // @TODO change fixed value to header height
            }, 1000);
            return false;
          }

        }

      },
      initDom: function() {
        app.dom.$window = $(window);
        app.dom.$document = $(document);
        app.dom.$html = $('html');
        app.dom.$body = $('body');
        app.dom.$header = $('header');
        app.baseUrl = app.dom.$body.attr('data-base-href');
      },
      scrollLock: {
        vars: {
          keys: { 37: 1, 38: 1, 39: 1, 40: 1 }
        },

        _preventDefault: function (e) {
          e = e || window.event;
          if (e.preventDefault)
            e.preventDefault();
          e.returnValue = false;
        },

        _preventDefaultForScrollKeys: function (e) {
          if (app.helpers.scrollLock.vars.keys[e.keyCode]) {
            app.helpers.scrollLock._preventDefault(e);
            return false;
          }
        },

        on: function(hideScroll) {
          if (!app.helpers.scrollLock.isEnabled) {
            app.helpers.scrollLock.isEnabled = true;
            app.helpers.scrollLock.hideScroll = hideScroll;

            if (hideScroll === true || 1) {

              app.helpers.scrollLock.scrollTop = $(window).scrollTop();
              if ($(window).width() > 1024) {
                $('body').wrapInner('<div class="scrollLock-wrapper">');
                $('body').find('.scrollLock-wrapper').css({
                  position: 'absolute',
                  left: 0,
                  right: app.helpers.scrollLock.getScrollBarWidth(),
                  top: -app.helpers.scrollLock.scrollTop
                });
                $('html,body').css({
                  overflowY: 'hidden',
                  height: '100%'
                });
                $('body').append('<div class="scrollLock-scroll">');
                $('.scrollLock-scroll').css({
                  position: 'fixed',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  overflow: 'hidden',
                  overflowY: 'scroll',
                  width: app.helpers.scrollLock.getScrollBarWidth()
                });
                $(window).scrollTop(0);
              } else {
                $('html,body').css({
                  overflowY: 'hidden',
                  height: '100%'
                });
              }

            } else {
              if (window.addEventListener) {// older FF
                window.addEventListener('DOMMouseScroll', app.helpers.scrollLock._preventDefault, false);
              }
              window.onwheel = app.helpers.scrollLock._preventDefault; // modern standard
              window.onmousewheel = document.onmousewheel = app.helpers.scrollLock._preventDefault; // older browsers, IE
              window.ontouchmove  = app.helpers.scrollLock._preventDefault; // mobile
              document.onkeydown  = app.helpers.scrollLock._preventDefaultForScrollKeys;
            }

          }
        },
        off: function() {
          if (app.helpers.scrollLock.isEnabled) {
            app.helpers.scrollLock.isEnabled = false;

            if (app.helpers.scrollLock.hideScroll === true || 1) {

              $('.scrollLock-wrapper').children().unwrap();
              $('.scrollLock-scroll').remove();
              $('html,body').css({
                overflowY: '',
                height: ''
              });
              $(window).scrollTop(app.helpers.scrollLock.scrollTop);

            } else {

              if (window.removeEventListener) {
                window.removeEventListener('DOMMouseScroll', app.helpers.scrollLock._preventDefault, false);
              }
              window.onmousewheel = document.onmousewheel = null;
              window.onwheel = null;
              window.ontouchmove = null;
              document.onkeydown = null;

            }
          }
        },
        getScrollBarWidth: function() {
          var inner = document.createElement('p');
          inner.style.width = "100%";
          inner.style.height = "200px";

          var outer = document.createElement('div');
          outer.style.position = "absolute";
          outer.style.top = "0px";
          outer.style.left = "0px";
          outer.style.visibility = "hidden";
          outer.style.width = "200px";
          outer.style.height = "150px";
          outer.style.overflow = "hidden";
          outer.appendChild (inner);

          document.body.appendChild (outer);
          var w1 = inner.offsetWidth;
          outer.style.overflow = 'scroll';
          var w2 = inner.offsetWidth;
          if (w1 == w2) w2 = outer.clientWidth;

          document.body.removeChild (outer);

          return (w1 - w2);
        }
      },
    },

    run : function() {
      app.init();

      app.dom.$window.trigger('domready');
    }
  }

  $(document).ready(function() {
    app.run();
  });

})(jQuery, Drupal);

/* Source and licensing information for the above line(s) can be found at https://www.autopozicovna-kosice.sk/themes/custom/autopozicovna_kosice/js/global.js. */;
