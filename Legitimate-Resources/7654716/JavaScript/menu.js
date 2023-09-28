var headerMenuClickableSegment = "header.header .submenu > li";
var headerMenuClickableSegmentAnchor = "header.header .submenu > li > a";
var iconUpClass = "icon-up-open-mini";
var iconDownClass = "icon-down-open-mini";

var speedUrlPath = (window.location.origin + window.location.pathname + window.location.hash);
jQuery(headerMenuClickableSegment).each(function(){
        var speedSubmenuAnchorElement = jQuery(this).children("a").first();
        jQuery(this).find("a").each(function(){
                if(jQuery(this).attr("href") == speedUrlPath) {
                    jQuery(speedSubmenuAnchorElement).addClass("selected-submenu-item");
                }
            }
        );
    }
);

jQuery(document).on("touchend click", function(event) {
    var activatedBySelf = false;
    // Check if click is on active submenu.
    if(!jQuery(event.target).is(headerMenuClickableSegment)) {
        // Swap arrow direction on active element to unactive (down)
        toggleUpDownIcon(jQuery(headerMenuClickableSegment).parent().find('.active a .icon'));
        // Remove active class from active element
        jQuery(headerMenuClickableSegment).removeClass("active");

        // If click on submenu or login-menu
        if(
            jQuery(event.target).parent().parent().first().hasClass('subsubmenu') ||
            jQuery(event.target).parent().parent().parent().first().hasClass('subsubmenu') ||
            jQuery(event.target).parent().parent().parent().parent().first().hasClass('login-menu-content')
        ) {
            //Click on item in subsubmenu
            jQuery(headerMenuClickableSegmentAnchor).removeClass("selected-submenu-item");
            jQuery(event.target).parent().parent().parent().parent().parent().find("a").first().addClass("selected-submenu-item");
            if (event.target.tagName.toLowerCase() === 'a' && event.target.href) {
                location.href = event.target.href;
                event.preventDefault();
            }
        } else if(jQuery(event.target).parents('.submenu').length > 0) {
            //Click on item in submenu
            jQuery(headerMenuClickableSegmentAnchor).removeClass("selected-submenu-item");
            var sel = jQuery(event.target).closest('a');
            toggleUpDownIcon(jQuery(sel).find('.icon').first());
            sel.addClass("selected-submenu-item").parent().addClass("active");
        }
    } else {
        jQuery(headerMenuClickableSegment).removeClass("active");
        jQuery(this).parent().addClass("active");
    }

    // TODO: refactor on outside click
    if (
        jQuery(headerMenuClickableSegment).hasClass("active")
    ) {
        activatedBySelf = true;
        jQuery('.s-wrap').addClass('s-wrap--overlapped')
    } else {
        if (activatedBySelf) {
            jQuery('.s-wrap').removeClass('s-wrap--overlapped')
            activatedBySelf = false;
        }
    }
});

function toggleUpDownIcon(iconSelector) {
    if (iconSelector.hasClass(iconDownClass)){
        iconSelector.removeClass(iconDownClass);
        iconSelector.addClass(iconUpClass);
    } else {
        iconSelector.removeClass(iconUpClass);
        iconSelector.addClass(iconDownClass);
    }
}

function toggleHeaderSubmenu(element) {
    jQuery(element).addClass("active")
        .siblings(".active:not(.clickable)").removeClass("active");
}
function switchHeaderBack() {
    window.switchHeaderBackTimeout = setTimeout(function() {
        toggleHeaderSubmenu(window.$activeHeaderEntry);
    }, 400);
}

function clearSwitchHeaderBackTimeout() {
    if(window.switchHeaderBackTimeout != undefined) {
        clearTimeout(window.switchHeaderBackTimeout);
        window.switchHeaderBackTimeout = undefined;
    }
}

function speedInitializeMenuAndFooter() {
    var $window = jQuery(window);
    var $body = jQuery('body');
    var $header = jQuery('header.header');
    var headerHeight = $header.height();
    /* the required height of the visible part of the header when the page is scrolled deep down */
    var fixedHeight = 50;
    /* the header is not fixed when the page is scrolled less than lowerOffset, the value is found empirically */
    var lowerOffset = 58;
    var upperOffset = headerHeight - fixedHeight;
    /* after scrolling more than this the header stops changing its height */
    var deltaMax = upperOffset - lowerOffset;
    var $logoDiv = jQuery('.header-content > a.logo > div');
    var $speedCollapsible = jQuery('.speed-collapsible');

    $speedCollapsible.collapse("show");
    enquire.register("screen and (min-width: 640px)", {
        match: function () {
            $speedCollapsible.collapse("show");
        }, unmatch: function () {
            $speedCollapsible.collapse("show");
        }
    });
    $speedCollapsible.on('shown.bs.collapse', function (evt) {
        var $target = jQuery(evt.target || evt.srcElement);
        $target.parent().find(".footer-link-icon").removeClass("icon-right-open");
        $target.parent().find(".footer-link-icon").addClass("icon-down-open");
    });

    $speedCollapsible.on('hidden.bs.collapse', function (evt) {
        var $target = jQuery(evt.target || evt.srcElement);
        $target.parent().find(".footer-link-icon").removeClass("icon-down-open");
        $target.parent().find(".footer-link-icon").addClass("icon-right-open");
    });

    jQuery("#header .icon-mail").click(function(){
        jQuery("html, body").animate({ scrollTop: jQuery("#contractOverviewTable").offset().top }, "slow");
    });

    jQuery(document)
        .on("mouseenter", ".ui-autocomplete", function() {
            setTimeout(clearSwitchHeaderBackTimeout, 200);
        })
        .on("mouseleave", ".ui-autocomplete", function() {
            switchHeaderBack();
        });


    jQuery("#header .search .search-icon").click(function() {
        jQuery(this).parents("form:eq(0)").submit();
    });

    jQuery(".section-content.top-bar").click(function() {
        jQuery("html, body").animate({ scrollTop: jQuery(document).height() }, "slow");
    });

    jQuery(window).bind("resize scroll", function () {
        var delta = $window.scrollTop() - lowerOffset;
        var shouldFix = delta > 0;
        var isFixed = $header.hasClass("fixed-header");
        if (!shouldFix && isFixed) {
            $header.css({top: "", height: ""});
            $header.removeClass("fixed-header");
            $body.removeClass("fixed-header-body-padding");
            $logoDiv.removeClass("vsprite-logo-small");
            $logoDiv.addClass("logo-with-claim");
        } else if (shouldFix) {
            if (!isFixed) {
                $logoDiv.removeClass("logo-with-claim");
                $logoDiv.addClass("vsprite-logo-small");
                $header.addClass("fixed-header");
                $body.addClass("fixed-header-body-padding");
                $header.css({top: -lowerOffset});
            }
            var change = delta < deltaMax ? delta : deltaMax;
            var newHeight = headerHeight - change;
            if (newHeight != $header.height()) {
                $header.height(newHeight);
            }
        }
    });
    resizeOnDocumentHeightChange();
}

function resizeOnDocumentHeightChange(){
    var lastHeight = -1, newHeight, timer;
    (function run(){
        newHeight = document.body.clientHeight;
        if( lastHeight != newHeight )
            jQuery(window).resize();
        lastHeight = newHeight;
        timer = setTimeout(run, 200);
    })();
}


jQuery( document ).ready( function( jQuery ) {
    // enable only for viewports wider than 999px
    if (jQuery('#footer').length > 0) speedInitializeMenuAndFooter();
});

var leftMobileMenu;
if (document.getElementById( 'mp-menu' )) {
    /** left mobile menu init */
    leftMobileMenu = new mlPushMenu( document.getElementById( 'mp-menu' ), document.getElementById( 'trigger' ) );
    var left_menu_anchors = leftMobileMenu.el.querySelectorAll("a");
    var i;
    for (i = 0; i < left_menu_anchors.length; ++i) {
        if(left_menu_anchors[i].getAttribute("href").indexOf("#./") !== -1) {
            left_menu_anchors[i].addEventListener("click", function(event){
                leftMobileMenu._resetMenu();
            });
            left_menu_anchors[i].addEventListener("touchend", function(event){
                leftMobileMenu._resetMenu();
            });
        }
    }    enquire.register("screen and (min-width: 980px)", {
        match: function () {
            leftMobileMenu._resetMenu();
        }
    });
}