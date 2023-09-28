(function($)
{
    "use strict";

    /**
     * Generalised plugin that makes a CSS flyout menu keyboard-accessible.
     *
     * Options
     * -------
     *  sSubnavSelector     a jQuery selector to grab the sub-nav element (required)
     *  sActiveClass        the class to add to the menu item when the menu is active (optional, default: 'hover')
     *
     * @param   opt an object containing configuration options for this plugin.
     * @return  the jQuery object this function was called on
     */
    $.fn.accessifyFlyout = function(opt)
    {
        // 0. options
        var _opt = $.extend(true, {
            sSubnavSelector: '',
            sActiveClass:    'hover'
        }, opt);

        // 1. check we have a subnav selector (don't care if it matches)
        if (_opt.sSubnavSelector === '')
        {
            return this;
        }

        // 2. hook everything up.
        // note: doing this in an each() so we have an absolute reference to the parent element all the time
        this.each(function()
        {
            var oParent = $(this);

            // a. individual links in the subnav
            oParent.find(_opt.sSubnavSelector+' a')
            
                .on('focus', function() {
                		oParent.addClass(_opt.sActiveClass);
            		})
            		.on('blur', function() {
		                oParent.removeClass(_opt.sActiveClass);
		            });

            // b. Toggle classname on <li /> when any nested <a /> is has focus
            //    Firstly, MSIE 7+8 doesn't seem to apply 'element:focus + .stuff'-type selectors until
            //     something else on the page changes (no idea, sorry!)
            //    Secondly, this gives us the hook to style consistently across focus and hover states.
            oParent.children('a')

		            .on('focus', function() {
		                oParent.addClass(_opt.sActiveClass);
		            })
		            .on('blur', function() {
		                oParent.removeClass(_opt.sActiveClass);
		            })
		            .on('click', function(e) {
		
		                // Don't execute the default link action if we're running a desktop-sized touch device 
		                // (an alternative link is rendered instead)
                   if(Modernizr.touch && $('body').hasClass('breakpoint-768') ) {
		                    e.preventDefault();
		                }

		            });

            oParent.on('mouseenter', function() {
                oParent.addClass(_opt.sActiveClass);
            });

            oParent.on('mouseleave', function() {
                oParent.removeClass(_opt.sActiveClass);
            });


        });

        // 3. drop out
        return this;
    };
    

    /**
     * Slightly tweaked version of existing setEqualHeight() function that’s been jQueried a little and calls itself
     * repeatedly to handle images/other content loading and pushing content out of bonk… it’s a little bit of a dirty
     * hack, but… eh.
     *
     * Options
     * --
     *  - bCallback:    whether or not to continue calling this function until the DOM is stable (default: true)
     *  - iCallTimer:   how often to call this function whilst waiting for the DOM to stabilise (default: 200ms)
     *
     * @param   opt     configuration options, as above (optional)
     */
    $.fn.equalHeight = function()
    {
        /**
         * Internal callback function.
         */
        function _judgeHeight(oEl)
        {
            // 0. setup
            var iTallest    = oEl.eq(0).data('set-height'),
                iH          = -1,
                bDirty      = false;
            
            // 1. if there’s no preset height, fall back to -1
            if ((iTallest === undefined) || (iTallest === ''))
            {
                iTallest = -1;
            }
            
            // 2. iterate through each of the elements
            oEl.css('height', 'auto').each(function()
            {
                iH = oEl.innerHeight();
                if (iH > iTallest)
                {
                    bDirty = true;
                    iTallest = iH;
                }
            });
            
            // 3. write the height back to the DOM
            oEl.css('height', iTallest).eq(0).data('set-height', iTallest);
            
            // 4. if the dirty bit is set, set the timeout to call again
            if (bDirty && _opt.bCallback)
            {
                setTimeout(function()
                {
                    _judgeHeight(oEl);
                }, _opt.iCallTimer);
            }
        }
        
        var _opt     = $.extend({
                bCallback: true,
                iCallTimer: 200
            },(arguments.length == 1) ? arguments[0] : {});
        
        _judgeHeight(this);
        return this;
        
    };
    
})(jQuery);
