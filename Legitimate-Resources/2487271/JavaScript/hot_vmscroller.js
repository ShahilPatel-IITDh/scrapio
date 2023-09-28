/*------------------------------------------------------------------------
# "Hot VM Scroller" - Joomla Module
# Copyright (C) 2012 ArhiNet d.o.o. All Rights Reserved.
# License: http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
# Author: HotJoomlaTemplates.com
# Website: http://www.hotjoomlatemplates.com
-------------------------------------------------------------------------*/

if(!window.initvmscroller){
window.initvmscroller = function(){
(function (jQuery, undefined) {
    jQuery.widget("hjt.hotvmscroller", {
        options: {
            speed: 1500,
            delay: 5000,
            transition: 'easeOutQuad',
            direction: 'vertical',
            fade: 'no',
            onComplete: function(){},
            onStart: function(){}
        },
		items: null,
		auto: null, 
        current: 0,
		el:null,
        _create: function () {
            var self = this,
			    options = self.options;
            var el = self.el = jQuery(this.element);
			self.items = el.find('LI');
            
			var w = 0;
	        var h = 0;
			
	        if (self.options.direction.toLowerCase() == 'horizontal') {
	            h = el.innerHeight();
	            self.items.each(function (ind) {
	                w += (jQuery(this).innerWidth() + parseInt(jQuery(this).css('marginLeft')) + parseInt(jQuery(this).css('marginRight')) + 5);
	            })
	        } else {
	            w = el.innerWidth();
	            self.items.each(function (ind) {
	                h += (jQuery(this).innerHeight() + parseInt(jQuery(this).css('marginTop')) + parseInt(jQuery(this).css('marginBottom')) + 5);
	            })
	        }
			
			
			if (self.options.fade == "yes") {
	            this.el.css({
	                position: 'absolute',
	                top: 0,
	                left: 0,
	                width: w + 'px',
	                height: h + 'px',
	                opacity: 1
	            });
	            
				
	        } else {
	            this.el.css({
	                position: 'absolute',
	                top: 0,
	                left: 0,
	                width: w + 'px',
	                height: h + 'px'
	            });
				
		   }
	      self.resume();
       },
        pause: function(){
		   var self = this;
		   if(self.auto){
			   window.clearInterval(self.auto); 
			   self.auto = null;
		   }
		},
		resume: function(){
		   var self = this;
		   if(!self.auto){
		       self.auto =  window.setInterval(function () {
							self.next();
                        }, self.options.delay);
		   }	
		},
		next: function(){
		   var self = this;
		   self.current++;
	        if (self.current >= self.items.length) self.current = 0;
	        var a = jQuery(self.items[self.current]);
	        if (this.options.fade == "yes") {
	            self.el.animate({
	                top: -a[0].offsetTop,
	                left: -a[0].offsetLeft,
	                opacity: 1
	            },
				 self.options.speed	,
				 self.options.transition,
                 function () {
                    var i = (self.current == 0) ? self.items.length : self.current;
                    jQuery(self.items[i - 1]).parent().appendTo(self.el);
                    self.el.css({
                        left: 0,
                        top: 0
                    });
                 } 			
				);
		    } else {
	            self.el.animate({
	                top: -a[0].offsetTop,
	                left: -a[0].offsetLeft
	            },
				 self.options.speed	,
				 self.options.transition,
                 function () {
                    var i = (self.current == 0) ? self.items.length : self.current;
                    jQuery(self.items[i - 1]).parent().appendTo(self.el);
                    self.el.css({
                        left: 0,
                        top: 0
                    });
                 } 			
				);
		    }
		},
        _setOption: function (key, value) {
            this.options[key] = value;
        },

        destroy: function () {
            jQuery(this.element).html(this._baseHTML);
            jQuery.Widget.prototype.destroy.call(this);
        }
    }); // widget
})(jQuery);
   
   if(window.onscrollerinit){
     onscrollerinit();
   }

};

if(jQuery.widget){
  initvmscroller();
}else{
  var tmo = window.setTimeout( function(){
    if(jQuery.widget){
        initvmscroller();
		window.clearTimeout(tmo);
    } 
  },100);
}
}