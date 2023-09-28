'use strict';
(jQuery)(function($){
  var isLinkExternal = function(linkHref,fallback) {
    if (typeof linkHref == 'undefined') {
      return fallback; // cannot determine
    }
    if (linkHref.length < 1) {
      return false; // just an empty link
    }
    if (linkHref.indexOf('#') === 0) {
      return false; // just an anchor link
    }
    if (linkHref.indexOf('/') === 0) {
      return false; // local path
    }
    // check the list of exclusions
    var exclusions = outboundLinkDisclosureSettings.exclusions;
    //console.log('exclusions',exclusions);
    for (var index in exclusions) {
      var exclusion = exclusions[index];
      //console.log('exclusion',exclusion);
      var pattern   = exclusion.pattern;
      var matchType = exclusion.match_type;
      if (matchType == 'exact') {
        if (linkHref === pattern) {
          //console.log('Matched exact exclusion pattern: ', pattern);
          return false;
        }
      } else if (matchType == 'begins-with') {
        if (linkHref.indexOf(pattern) === 0) {
          //console.log('Matched begins-with exclusion pattern: ', pattern);
          return false;
        }
      }
    }
    return true;
  }
  $(document).ready(function(){
    $('body').on('click', 'a', function(e) {
      try {
        if (typeof outboundLinkDisclosureSettings == 'undefined') {
          console.err('Cannot handle outbound link disclosure - missing settings.');
          return;
        }
        if (outboundLinkDisclosureSettings.enabled != 1) {
          console.log('Outbound link disclosure disabled in settings.');
          return;
        }
        //console.log('e',e);
        var target = e.currentTarget || e.target;
        var $target = $(target);
        var linkHref = $target.attr('href');
        if (typeof linkHref == 'undefined') {
          linkHref = '';
        }
        var linkNeedsDisclosure = isLinkExternal(linkHref,true);
        //console.log('linkHref',linkHref);
        //console.log('linkNeedsDisclosure',linkNeedsDisclosure);
        var result = false;
        var disclosureText = 'Please note you are leaving our website. We does not endorse or guarantee products, information, or recommendations provided by linked sites and we are not liable for any products or services advertised on these sites. Each third party may have a privacy policy that differs from ours. Any linked website may provide less security than our website.'
        if (typeof outboundLinkDisclosureSettings.text != 'undefined') {
          disclosureText = outboundLinkDisclosureSettings.text;
        }
        if (linkNeedsDisclosure) {
          result = confirm(disclosureText);
        }
        //console.log('result',result);
        if (linkNeedsDisclosure && ! result) {
          e.stopPropagation();
          e.preventDefault();
        }
        //console.log('you clicked', target);
      } catch (e) {
        console.err('Error handling outbound link: ', e);
        return true;
      }
    });
    //console.log('docready');
  });
});
