;(function($, window) {
/*! SCROLL TO PLUGIN FOR GS
 * VERSION: beta 1.7.1
 **/
(function ($) {
  window.choppedjs = {};
  function extend(){
    for(var i=1; i<arguments.length; i++)
    for(var key in arguments[i])
      if(arguments[i].hasOwnProperty(key))
        arguments[0][key] = arguments[i][key];
    return arguments[0];
  }
  choppedjs.onEvent = function (eventType, handler, timeout, config) {
    var defaults = {
      name: 'unnamed',
      mute: false,
      immediate: true
    };
    this.options = extend({}, defaults, config);
    this.eventType = eventType;
    this.timeout = timeout;
    this.handler = handler;
    this.isExecuteTime = this.options.immediate;
    this.interval = '';
    var _this = this;
    init();
    function init() {
      //reset the execute determiner
      $(window)[_this.eventType](function () {
        _this.isExecuteTime = true;
      });
      //execute the handler based on the timeout user passed
      _this.interval = setInterval(function () {
        if (_this.isExecuteTime && !_this.options.mute) {
          try {
			/*add*/
			var body_css=$('body').attr('class');
			//console.log("choppedjs.onEvent css:"+body_css);
			if(!body_css.match(/edit/)){
				handler();
			}
          } catch (err) {
            console.log(err);
          }
          //turn off the exec time until user scroll again
          _this.isExecuteTime = false;
        }
      }, _this.timeout);
    }
  };
  choppedjs.onScroll = function (handler, timeout, options) {
    return new choppedjs.onEvent('scroll', handler, timeout, options);
  };
  choppedjs.onResize = function (handler, timeout, options) {
    return new choppedjs.onEvent('resize', handler, timeout, options);
  };
  choppedjs.onMousemove = function (handler, timeout, options) {
    return new choppedjs.onEvent('mousemove', handler, timeout, options);
  };
}(jQuery));
;


/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */
(function ($) {
        "use strict";
        $.belowthefold = function (element, settings) {
                var fold = $(window).height() + $(window).scrollTop();
                return fold <= $(element).offset().top - settings.threshold;
        };
        $.abovethetop = function (element, settings) {
                var top = $(window).scrollTop();
                return top >= $(element).offset().top + $(element).height() - settings.threshold;
        };
        $.rightofscreen = function (element, settings) {
                var fold = $(window).width() + $(window).scrollLeft();
                return fold <= $(element).offset().left - settings.threshold;
        };
        $.leftofscreen = function (element, settings) {
                var left = $(window).scrollLeft();
                return left >= $(element).offset().left + $(element).width() - settings.threshold;
        };
        $.inviewport = function (element, settings) {
                return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
        };
        $.extend($.expr[':'], {
                "below-the-fold": function (a) {
                        return $.belowthefold(a, {
                                threshold: 0
                        });
                },
                "above-the-top": function (a) {
                        return $.abovethetop(a, {
                                threshold: 0
                        });
                },
                "left-of-screen": function (a) {
                        return $.leftofscreen(a, {
                                threshold: 0
                        });
                },
                "right-of-screen": function (a) {
                        return $.rightofscreen(a, {
                                threshold: 0
                        });
                },
                "in-viewport": function (a) {
                        return $.inviewport(a, {
                                threshold: -40
                        });
                }
        });
})(jQuery);

function is_touch_device() {
    return ('ontouchstart' in document.documentElement);
}
jQuery.exists = function(selector) {
    return ($(selector).length > 0);
};

var scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop, // Updated in global event handler
    global_window_width = $(window).width(),
    global_window_height = $(window).height(),
    global_admin_bar,
    global_admin_bar_height = 0;

window.scroll = function() {
    scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}


// init
$(document).ready(function() {
var body_css=$('body').attr('class');
//console.log("choppedjs.onEvent");
//console.log( "body css:"+body_css );
	if(!body_css.match(/edit/)){
	    mk_animated_contents();
	}else{
        $('body').addClass('no-transform');
	}
    //  if (is_touch_device() || $(window).width() < 780) 
//    if (is_touch_device()) {
//        $('body').addClass('no-transform');
//    } else {
        choppedjs.onResize(mk_animated_contents, 50);
        choppedjs.onScroll(mk_animated_contents, 10);
//    }
});


/* Animated Contents */
/* -------------------------------------------------------------------- */
function mk_animated_contents() {
  "use strict";
  $(".qv-ani-ele").filter(":in-viewport").each(function (i) {
    var $this = $(this);
    if (!$this.hasClass('qv-in-viewport')) {
      setTimeout(function () {
        $this.addClass('qv-in-viewport');
      }, 1000 * i);
    }
  });
};

})(jQuery, window);