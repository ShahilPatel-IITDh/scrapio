/**
 * Our global namespace.  Create if not already created.
 */
var SFR = SFR || {};

/**
 * Namespace util functions
 */
SFR.Utils = {};

// Compartmentalise the use of strict mode to prevent errors if this javascript
// file is combined with another less well formed one.
(function() {
  "use strict";

  /**
   * Partial fix for iPhone viewport scale bug
   * https://gist.github.com/901295
   */
  SFR.Utils.scaleFix = function () {

    // Original code from http://www.blog.highub.com/mobile-2/a-fix-for-iphone-viewport-scale-bug/
    var metas = document.getElementsByTagName('meta');
    var i;
    if (navigator.userAgent.match(/iPhone/i)) {
      for (i=0; i<metas.length; i++) {
        if (metas[i].name == "viewport") {
          metas[i].content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
        }
      }
      document.getElementsByTagName('body')[0].addEventListener("gesturestart", gestureStart, false);
    }
    function gestureStart() {
      for (i=0; i<metas.length; i++) {
        if (metas[i].name == "viewport") {
          metas[i].content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
        }
      }
    }

  };

  /**
   * Clear floats in double-col list items heights
   * This is a fallback for browsers that don't support :nth-child (guess who?)
   *
   * @param {String} list
   *   Selector for he <ul /> or <ol /> containing <li>s to be cleared
   *
   * @TODO: wrap this up with into a 'fix old IE hook'
   */
  SFR.Utils.clearOddFloaters = function(list) {

    if ( $('html').hasClass('lt-ie9') ) {
	    
	    // Finds odd list items, matching the third, fifth and so on (index 0, 2, 4 etc.).
	    $.root.find(list).children('li:even').each(function() {
	    
	      $(this).addClass('odd');
	
	    });

    }

  };
  /**
   * Equal heights
   * Make things equal height, for OCD, cos it looks proper neat
   */
  SFR.setEqualHeight = function(groups) {
  
    /* descoped in favour of $.fn.equalHeight */
    
  };

  /**
   * Remove equal heights.
   *
   * @param {Object} columns
   *    JQuery selector
   */
  SFR.Utils.unSetEqualHeights = function(columns) {

    // @TODO:If window is loaded at 980 then resized down, some elements become narrower and so their height could need to change
    // So, when this function is called we need to remove any previously set inline height declaration, then set it again

  };

  /**
   * Highlight target
   * If we animate or jump to an element on the same page,
   * highlight it temporarily to make sure the user knows where to look
   *
   * Requires jquery.color.js to animate colour values
   * Note: as we're animating the background colour back to a transparent state,
   * the target should *not* be an element that has a background colour applied with CSS.
   *
   * @todo: add an optional bgColour param (passing optional settings as an object?)
   *
   * @param {Object} target
   *   ID of element to highlight.
   * @param {Number} duration
   *   Length of time to display highlight before animating back to transparent state.
   */
  SFR.Utils.highlightLocalTarget = function(target, duration) {

    var $target = $(target),

        // Set RGBa background colour to use as highlight
        bgColour = 'rgba(92,151,176,.3)',

        // Use default if no param for duration is passed by the calling function
        defaultDuration = 750,
        $duration = (duration) ? duration : defaultDuration;

    $target
      .css('backgroundColor', bgColour)
      .delay($duration)
      // animate back to *transparent* rgba colour
      .animate({'backgroundColor': 'rgba(255,255,255,0)'}, 750);
  };


  /**
   * Set keyboard focus
   * Move focus to target element so that keyboard users' next tab click doesn't return them to whence they came
   *
   * @param target
   *   Either a DOM object or selector string of element to move focus to.
   */
  SFR.Utils.setKeyboardFocus = function(target) {
    // Set tabindex on the target so IE knows it is focusable,
    // and so Webkit browsers will focus them
    $(target)
      .attr('tabindex', -1)
      .focus();
  };


  /**
   * Scroll to..
   * Animate the window to the target of any in-page anchors, nice and smooth like chocolate
   *
   * @param {String} scrollTarget
   *   ID of element to scroll to.
   * @param {String} speed
   *   speed of animation.
   * @param {Function} callback
   *   so we can trigger further events once the animation is complete
   * Currently uses Ariel Flesler's jquery.scrollTo.js for animation (flesler.blogspot.co.uk/2007/10/jqueryscrollto.html).
   */
  SFR.Utils.scrollToLocalTarget = function(scrollTarget, speed, callback) {

    // If no speed param is passed by the calling function, use default
    var $defaultSpeed = 300,
        $speed = (speed) ? speed : $defaultSpeed;

    // Only do stuff if we're not already animating the window
    if (!$(window).is(':animated')) {

      $.scrollTo(scrollTarget, $speed, function() {

        // Check if the callback exists, and is an executable function
        if (callback && typeof(callback) === 'function') {

          // Execute the callback
          callback();
        }
      });
    }
  };


  /**
   * In-page links
   * Function to trigger chain of events that nice up the interaction when
   * a user clicks a link that navigates to an element in the same page
   * @param {String} localLinkSelector
   *   classname for links to initialise.
   * It assumes presence of valid href attribute on initialised <a />s.
   */
  SFR.Utils.niceUpInPageNav = function(localLinkSelector) {

    // Attach delegated event handlers
    $.root.on('click', localLinkSelector, function() {

      // The target is identified in the href of the link we're clicking
      var $scrollTarget = $(this).attr('href');

      // Animate the window until the target is at the top of the viewport
      // (optionally specifying a speed for the animation)
      SFR.Utils.scrollToLocalTarget($scrollTarget, 500, function() {

        // Once animation is complete, temporarily highlight the target
        // (optionally specifying a duration for the highlight)
        SFR.Utils.highlightLocalTarget($scrollTarget);

        // and set focus for keyboard users
        SFR.Utils.setKeyboardFocus($scrollTarget);

      });
    });
  };


  /**
  * Collapse it / Expand it!
  *
  * Matching functions that extend the jQuery .hide() state to ensure that
  * hidden content remains accessible to Assistive Technologies
   * @param {Object} target
   *   element to be collapsed.
   * @param {Number} speed
   *   optional argument specifying speed for animation (in milliseconds).
   * @param {Function} callback
   *   Function to be executed on completion.
  * Currently it assumes slideUp/slideDown is the desired animation.
  * @TODO: develop extra arguments (and set up configuration pattern) to allow alernative animation types
  */

  SFR.Utils.collapseIt = function(target, speed, callback) {

    target.slideUp(speed, function() {

      $(this)
        .addClass('visuallyhidden')
        .css({'display': 'block'});


      // Check if the callback exists, and is an executable function, then execute it
      if (callback && typeof(callback) === 'function') {
        callback();
      }
    });


  };

  /**
   *  Expand a target element
   *
   *  @param {Object} target
   *    Target element.
   *  @param {number} speed
   *    Speed to example in milliseconds.
   *  @param {function} callback
   *    Callback function.
   */
  SFR.Utils.expandIt = function(target, speed, callback) {

    SFR.Utils.reapplyBadHiddenState(target, function() {

      target.slideDown(speed, function() {

        // slideDown() also adds an undesirable style="overflow:hidden;" to the target
        // We need to override that to ensure that absolutely positioned children remain visible

        // N.B. Andy Mantell has commented out this line because it was causing the child
        // element to be still visible in Firefox (But not Chrome, weirdly)
        // The problem appears to be a clash with the .visuallyhidden class which
        // sets overflow: hidden in order to hide the contents, but this line re-sets that
        // to visible, thereby making the collapsed contents visible!

        // $(target).css({'overflow': 'visible'});

      });

    });

    // Check if the callback exists, and is an executable function, then execute it
    if (callback && typeof(callback) === 'function') {
      callback();
    }
  };



  /**
  * Reapply bad hidden state
  * Return hidden elements to a jQuery-friendly state before animating them open again
   * @param {Object} target
   *   the element to be modified.
   * @param {Function} callback
   *   Function to be executed on completion.
  */
  SFR.Utils.reapplyBadHiddenState = function(target, callback) {

    target
      .removeClass('visuallyhidden')
      .css({'display': 'none'});

    // Check if the callback exists, and is an executable function, then execute it
    if (callback && typeof(callback) === 'function') {
      callback();
    }
  };


  /**
  * Accessibly toggle
  * Check current state of collapsible element and call expand/collapse function accordingly
   * @param {Object} container
   *   element containing trigger and collapsible elements.
   * @param {Object} target
   *   element to be collapsed.
   * @param {Number} speed
   *   optional argument specifying speed for animation (in milliseconds).
   * @TODO: use configuration pattern
  */
  SFR.Utils.accessiblyToggle = function(container, target, speed) {

    // Specify default incase no arg for animation speed is passed by the calling function
    var defaultSpeed = 300,
        $speed = (speed) ? speed : defaultSpeed;

    if (container.hasClass('is-collapsed')) {
      SFR.Utils.expandIt(target, $speed);
    } else {
      SFR.Utils.collapseIt(target, $speed);
    }
  };


  /**
  * Set up collapsibles
  * Collapse on load (if specified in HTML), and add click handlers
  * The chain of events triggered here requires the following DOM structure:

  <element class="collapsible" />   <= the container (optionally also class="is-collapsed")
    <element class="trigger" />     <= the control for the animation
    <element class="target" />      <= the element to be collapsed

  */
  SFR.Utils.setUpCollapsibles = function() {

    $.root.find('.collapsible').each(function() {

      var $ctx = $(this),
          $trigger,
          $target = $ctx.find('.target');

      // Check to see if trigger already exists in markup
      if ($ctx.find('.trigger').length) {

        $trigger = $ctx.find('.trigger');

      // If not, we need to make one
      } else {

        // Set default button text
        var defaultTxt = 'Show more';

        $trigger = $('<button />')
                     .addClass('trigger')
                     .html(defaultTxt)
                     .appendTo($ctx);

      }

      if ($ctx.hasClass('is-collapsed')) {

        SFR.Utils.collapseIt($target);

      }

      $trigger.click(function(e) {

        e.preventDefault();

        SFR.Utils.accessiblyToggle($ctx, $target);
        $ctx.toggleClass('is-collapsed');
        $ctx.toggleClass('is-expanded');

      });
        $trigger.keydown(function (event) {
            if (event.keyCode === 13) {
                $trigger.click();
            }
        });
    });
  };


  /**
  * uncheckRadios
  * Unset checked="checked" attributes from any radios nested within the passed element
  * @param {Object} $target
  *   jQuery object containing radios to uncheck.
  */
  SFR.Utils.uncheckRadios = function($target) {

    $target
      .find(':radio')
        .attr('checked', false);

  };



  /**
   * Polyfill support for HTML5 placeholder text
   * https://github.com/mathiasbynens/jquery-placeholder
   *
   * Automatically checks if the browser natively supports the HTML5 placeholder attribute
   * for input and textarea elements. If this is the case, the plugin wonâ€™t do anything.
   */
  SFR.Utils.polyfillPlaceholderText = function() {

  //  $('input, textarea').placeholder();

  };


  /**
  * Highlight a selected radio label
  * Assumes that the radio is nested inside the label and a containing .form-item
  * <div class="form-item" />
  *   <label />
  *     <input type="radio" />
  * @param {Object} radio
  *   radio input for element to be highlighted.
  */
  SFR.Utils.highlightSelectedRadioLabel = function(radio) {

    radio
      .parents('label')
        // highlight the label bg
        .addClass('selected')
        .siblings()
          // remove other highlights
          .removeClass('selected');

  };


  /**
  * Check form inputs to confirm value attr has a value
  * @param {Object} $input
  *   Input element to test.
   * @param {Function} callback
   *   Function to be executed on completion.
  */

  SFR.Utils.checkInputHasValue = function($input, callback) {

    // Set var according to whether the value attr is emtpy
    $input.data('has-value', ($input.val() === '') ? 'false' : 'true');

    // Check if the callback exists, and is an executable function
    if (callback && typeof(callback) === 'function') {

      callback();

    }
  };


  /**
  * Add 'disabled' attribiute
  * (For use with form elements)
  * @param {Object} $elem
  *   element to manipulate.
  */
  SFR.Utils.disableElem = function($elem) {

    $elem.attr('disabled', true);

  };
  /**
  * Remove 'disabled' attribiute
  * (For use with form elements)
  * @param {Object} $elem
  *   element to manipulate.
  */
  SFR.Utils.enableElem = function($elem) {

    $elem.attr('disabled', false);

  };


  /**
  * Set up disabled fieldsets
  *
  * This function handles scenarios (for logged in users) where:
  ** A page loads with pre-saved values in some form elements (eg. personal details in checkout pre-confirm)
  ** But the default render should disguise the fact that they are fields
  ** An edit button should toggle the fields' state and appearance to let the user edit them
  ** Once toggled into 'edit' view we can remove the Edit button itself
  ** (the inputs will remain in this view until the whole page is submitted)
  *
  * @param {Object} fieldset
  *   Element to disable.
  */
  SFR.Utils.setUpDisabledFieldsets = function(fieldset) {

    var $fieldset = $(fieldset),
        $trigger = $fieldset.find('button');

    // If a fieldset has class="disabled" then disable all nested elements
    $fieldset
      .find('select,input')
        .attr('disabled', 'disabled');

    // Attach event handlers
    $trigger.click(function() {

      $fieldset
        .toggleClass('disabled')
        .find('select,input')
          .attr('disabled', false);

      $(this).remove();

    });

  };


  /**
  * Set up flags
  * This is a function that should add and remove visual clues that indicate
  * which fields the user should complete in quick checkout
  * we're currently using the following markup pattern:

    <div class="user-msg flag">
      Select postage
    </div>

  * the .flag class pulls the message into the left hand column
  * we now need to add a 'highight' class to each flag on load
  * and do some inline validation to remove that class when appropriate

  */
  SFR.Utils.setUpFlags = function() {

  /* @TODO */

  };


  /**
  * Select list navigation
  *
  * This function submits a form on change, changing window.location to the value of the selected option
  * A submit button should be present in the markup (and hidden for body.js) as an .no-js fallback
  *
  * @param {String} navSelects
  *   Selector for the elements to be initialised.
  *
  * @return {boolean}
  *   Return false on navselect change .
  */
  SFR.Utils.activateSelectListNavs = function(navSelects) {

    if (navSelects.length) {

      navSelects.bind('change', function() {

        var url = $(this).val();

        if (url) {
            window.location = url;
        }
        return false;

      });
      return true;
    }
  };

}());

/**
 * Language translations
 * 
 * @param {String} str 
 *   The string to translate
 */
var _t = function(str) {
  return localisedStrings[str] !== undefined ? localisedStrings[str] : str;
};
