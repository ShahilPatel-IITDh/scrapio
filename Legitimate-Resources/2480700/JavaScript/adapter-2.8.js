/**
 * @copyright	Copyright (C) 2015 Pluginaria.com.
 * @license     GNU/GPL v2 or later http://www.gnu.org/licenses/gpl-2.0.html
 */



window.smoothScrollGetStyle = function (x, styleProp)
{
    if (x.currentStyle)
        return x.currentStyle[styleProp];
    else 
	    return document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
}

var SmoothScrollAnchors =
{
    verticalMargin: 0,
    smoothScrollDuration: 0,
    selector: '',
    useHash: 0
};

SmoothScrollAnchors.setSelector = function(sel)
{
    this.selector = sel;
    return this;
}

SmoothScrollAnchors.setSmoothScrollDuration = function(duration)
{
    this.smoothScrollDuration = duration;
    return this;
}

SmoothScrollAnchors.setVerticalMargin = function(margin)
{
    this.verticalMargin = margin;
    return this;
}

SmoothScrollAnchors.setUseHash = function(use)
{
    this.useHash = use;
    return this;
}

SmoothScrollAnchors.smooth = function()
{
    var selector = this.selector;
    var smoothScrollDuration = this.smoothScrollDuration;
    var verticalMargin = this.verticalMargin;
    var useHash = this.useHash;
    
    jQuery(document).ready(function() {
        jQuery(window).bind("hashchange", function(event) { return false; });
        jQuery(selector).smoothScroll( {
            speed: smoothScrollDuration,
            beforeScroll: function(options)
            {
                var mediaCheck = document.getElementById("smooth-scroll-media-check");
                if (mediaCheck == undefined
                    || smoothScrollGetStyle(mediaCheck, "visibility") != "hidden")
                {
                    options.offset = verticalMargin;
                }
                
                options.futureHash = options.scrollTarget;
                if (options.scrollTarget.length > 1 && jQuery(options.scrollTarget).length === 0)
                    options.scrollTarget = "a[name=" + options.scrollTarget.substring(1)  + "]";
            },                        
            afterScroll: function(options)
            {
                if (!useHash)
                    return;
                
                if (window.history && window.history.pushState)
                {
                    window.history.pushState(undefined, undefined, options.futureHash);
                }
                else
                {
                    var scrollTop = jQuery(window).scrollTop();
                    var scrollLeft = jQuery(window).scrollLeft();
                    window.location.hash = options.futureHash;
                    jQuery("html, body").firstScrollable().scrollTop(scrollTop).scrollLeft(scrollLeft);
                }
            }
        });
    });
    
    return this;
}

SmoothScrollAnchors.smoothPageLoad = function(eventtype)
{
    var smoothScrollDuration = this.smoothScrollDuration;
    var verticalMargin = this.verticalMargin;

    if (eventtype == 0)
        return;

    var smoothOnLoad = function ()
    {
        var tgt = window.location.hash.replace(/^#\/?/,"").replace(/^smooth_\/?/,"");
                        
        if (tgt.length === 0)
            return;
            
        window.smoothStarted = 1;

        jQuery(window).scrollTop(0);
        
        var offset;
        var mediaCheck = document.getElementById("smooth-scroll-media-check");
        if (mediaCheck == undefined
            || smoothScrollGetStyle(mediaCheck, "visibility") != "hidden")
        {
            offset = verticalMargin;
        }
        else
        {
            offset = 0;
        }

        if (jQuery("#" + tgt).length === 0)
        {    
            jQuery.smoothScroll({
                speed: smoothScrollDuration,
                scrollTarget: "a[name=" + tgt + "]",
                offset: offset,
            });
        }
        else
        {
            jQuery.smoothScroll({
                speed: smoothScrollDuration,
                scrollTarget: "#" + tgt,
                offset: offset,
            });
        }
    };
    
    if (eventtype == 1)
    {
        jQuery(document).ready(smoothOnLoad);
    }
    else
    {
        jQuery(window).on("scroll", function(event) {
            var tgt = window.location.hash.replace(/^#\/?/,"").replace(/^smooth_\/?/,"");
            
            if (tgt.length === 0 || jQuery(window).scrollTop() == 0 || window.smoothStarted)
                return;
                
            jQuery(window).scrollTop(0);
        });
        jQuery(window).on("load", smoothOnLoad);
    }
    
    return this;
}
