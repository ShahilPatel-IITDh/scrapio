'use strict';

jQuery(document).ready(function ($j) {
    initMenuAccordion();
});

var termClass = 'iksm-term';

var IKSM = {
    classes: {
        element: {
            current: termClass + '--current',
            expanded: termClass + '--expanded',
            expanding: termClass + '--expanding',
            collapsing: termClass + '--collapsing',
            child: termClass + '--child',
            hasChildren: termClass + '--has-children',
            expandedCurrent: termClass + '--expanded-current',
            expandedInitial: termClass + '--expanded-initial',
        },
    },
    selectors: {
        dataAttrs: '#iksm_data_args',
        container: '.iksm-container',
        treeContainer: '.iksm-terms-tree',
        treeContainerInner: '.iksm-terms-tree__inner',
        toggle: '.' + termClass + '__toggle',
        element: '.' + termClass,
        elementCurrent: '.' + termClass + '--current',
        elementInner: '.' + termClass + '__inner',
        elementLink: '.' + termClass + '__link',
        elementHasChildren: '.' + termClass + '--has-children',
        elementIsParent: '.' + termClass + '--parent',
        elementExpandedCurrent: '.' + termClass + '--expanded-current',
        elementExpandedInitial: '.' + termClass + '--expanded-initial',
    },
    dataAttrs: {
        collapseChildren: "collapse_children_terms",
        collapseOther: "collapse_other_terms",
        collapseAnimationDuration: "collapse_animation_duration",
        expandAnimationDuration: "expand_animation_duration",
        disableParentLinks: "disable_parent_links_level",
        initialExpansionDisableScreenWidth: "initial_expansion_disable_screen_width",
    },
};
jQuery( document ).on( 'elementor/popup/show', (event, id) => {
    var $ = jQuery;
    var $popupMenu = $("[data-elementor-id=" + id + "]");
    var $menuElementor = $popupMenu.find(IKSM.selectors.container);
    if ($menuElementor.length > 0 ) {
        initMenuAccordion($menuElementor);
    }
});

function initMenuAccordion($menus = null) {
    var $ = jQuery;
    var selectors = IKSM.selectors;
    var classes = IKSM.classes;
    if (!$menus) {
        $menus = $(selectors.container);
    }
    log('initMenuAccordion, $menus:', $menus);

    $menus.each(function (index, menu) {
        /*
        * FOR EACH MENU
        */

        var $menu = $(menu);
        var $toggles = $menu.find(selectors.toggle);
        var $elementsInner = $menu.find(selectors.elementInner);
        var $elementsLinks = $menu.find(selectors.elementLink);
        var data = $menu.find(selectors.dataAttrs).data() || {};

        $toggles.click(processClick);
        $toggles.keypress(function (event) {
            if (event.keyCode === 13) { // Enter
                event.target && event.target.click()
            }
        });

        $elementsInner.keypress(function (event) {
            if (event.keyCode === 13) { // Enter
                var $target = $(event.target)
                var children = $target.children(selectors.elementLink)
                if (children.length) {
                    children[0].click()
                }
            }
        });

        // Focus and Blur parent element when focusing/blurring link element

        $elementsLinks.focus(function (event) {
            var parent = getLinkContainer(event.target)
            parent && parent.focus()
        });

        $elementsLinks.blur(function (event) {
            var parent = getLinkContainer(event.target)
            parent && parent.blur()
        });

        processDisableParentLinks();

        processInitialExpansion();

        /*
        * FUNCTIONS
        */

        function processClick() {
            var $this = $(this);
            var $item = $this.closest(selectors.element);

            if (isExpanded($item)) { // Only if expanded
                collapse($item);
                if (data[IKSM.dataAttrs.collapseChildren]) {
                    collapseChildren($item);
                }
            } else {
                expand($item);
                if (data[IKSM.dataAttrs.collapseOther]) {
                    collapseOther($item);
                }
            }
        }

        function processDisableParentLinks() {
            if (data.hasOwnProperty(IKSM.dataAttrs.disableParentLinks)) {
                var $elements = $menu.find("a[data-toggle=1]");

                $elements.each(function (index, element) {
                    var $item = $(element).closest(selectors.elementInner);
                    $item.click(processClick);
                    $item.find(selectors.toggle).off('click');
                });
            }
        }

        function processInitialExpansion() {
            var $elements;

            // Initial Expansion
            $elements = $menu.find(selectors.elementExpandedInitial);
            if ($elements.length) {
                var screenWidth = parseInt(data[IKSM.dataAttrs.initialExpansionDisableScreenWidth]);

                $elements.each(function (index, element) {
                    const $element = $(element);

                    if (screenWidth && isScreenWidthLessThan(screenWidth)) {
                        var $tree = $element.children(selectors.treeContainer);
                        $tree.css("display", "");
                        $element.removeClass(classes.element.expanded);
                    }
                    $element.removeClass(classes.element.expandedInitial);
                });
            }

            // Current Terms Expansion
            $elements = $menu.find(selectors.elementExpandedCurrent);
            if ($elements.length) {
                $elements.removeClass(classes.element.expandedCurrent);
            }
        }

        function isExpanded($element) {
            return $element.hasClass(classes.element.expanded);
        }

        function hasChildren($element) {
            return $element && $element.hasClass(classes.element.hasChildren);
        }

        function expand($element, duration) {
            if (hasChildren($element)) {
                // TODO: Recalculate real-height, if children were collapsed/expanded changes
                duration = duration === undefined ? data[IKSM.dataAttrs.expandAnimationDuration] : duration;
                var isCollapsing = $element.hasClass(classes.element.collapsing);
                var $tree = $element.children(selectors.treeContainer);

                $element.addClass(classes.element.expanded);
                $element.addClass(classes.element.expanding);
                $element.removeClass(classes.element.collapsing);

                var height;
                if (isCollapsing) {
                    height = $tree.data("real-height");
                } else {
                    $tree.css('opacity', 0);
                    $tree.css('display', 'block'); // To get correct outerHeight
                    height = $tree.outerHeight();
                    $tree.css('opacity', '');
                    $tree.css('display', '');
                    $tree.data("real-height", height);
                    $tree.css("height", 0); // Required for animate
                }

                $tree.css("display", "block"); // Make it visible
                $tree.stop().animate({height: height}, duration, function () {
                    $tree.css("height", ""); // Remove unnecessary height
                    $element.removeClass(classes.element.expanding);
                });

                log('expand', $element, height);
            }
        }

        function collapse($element, duration) {
            if (hasChildren($element)) {
                duration = duration === undefined ? data[IKSM.dataAttrs.collapseAnimationDuration] : duration;
                var isExpanding = $element.hasClass(classes.element.expanding);
                var $tree = $element.children(selectors.treeContainer);

                $element.removeClass(classes.element.expanded);
                $element.removeClass(classes.element.expanding);
                $element.addClass(classes.element.collapsing);

                if (!isExpanding) {
                    var outerHeight = $tree.outerHeight();
                    $tree.data("real-height", outerHeight); // Saving real height to use it, if EXPANDING started before COLLAPSING ended
                }

                $tree.stop().animate({height: 0}, duration, function () {
                    $tree.css("display", "");
                    $tree.css("height", "");
                    $element.removeClass(classes.element.collapsing);
                });

                log('collapse', $element);
            }
        }

        function collapseOther($element) {
            log('collapseOther', $element);
            var id = $element.data("id");

            var $elements = $element
                .parent(selectors.treeContainerInner) // Collapsing SAME level items
                .children(selectors.elementHasChildren + '.' + classes.element.expanded)
                .filter(function () {
                    var $this = $(this);
                    if ($this.data("id") === id) { // Same element
                        return false;
                    }
                    if ($this.find(selectors.element + "[data-id='" + id + "']").length > 0) { // Is parent
                        return false;
                    }
                    return true;
                });

            // Collapse result elements
            $elements.each(function (index, element) {
                var $element = $(element);
                collapse($element);
                // Maybe collapse children
                if (data[IKSM.dataAttrs.collapseChildren]) {
                    collapseChildren($element);
                }
            });
        }

        function collapseChildren($element) {
            log('collapseChildren', $element);
            $element.find(selectors.elementHasChildren).each(function (index, element) {
                collapse($(element));
            });
        }
    });

    function getLinkContainer(element) {
        var $target = $(element)
        var parent = $target.closest(selectors.elementInner)
        return parent[0]
    }

    function log(/*...args*/) {
        // console.log(...args);
    }

    function isScreenWidthLessThan(width) {
        return window.matchMedia('(max-width: ' + width + 'px)').matches;
    }
}

