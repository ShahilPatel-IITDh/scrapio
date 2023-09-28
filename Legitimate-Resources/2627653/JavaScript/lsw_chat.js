var LiveChat = {};
LiveChat.loading = jQuery.Deferred();

(function() {

  function adjustChatButtons() {
    jQuery("#SnapABug_minBtn").insertBefore(jQuery("#SnapABug_CBMBtn"));
    jQuery("#SnapABug_closeBtn").insertBefore(jQuery("#SnapABug_CBMBtn"));
    jQuery("#SnapABug_CBMBtn").on('mouseenter', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
    jQuery('<div class="top-bar-overlay"></div>').insertBefore(jQuery("#SnapABug_CBMBtn"));
  }

  jQuery(document).ready(function() {
    var se = document.createElement('script');
    se.type = 'text/javascript';
    se.async = true;
    se.src = '//storage.googleapis.com/code.snapengage.com/js/d29c173d-c3d3-4d62-ad00-8dae74f0607a.js';
    var done = false;
    se.onload = se.onreadystatechange = function() {
      if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
        done = true;
        LiveChat.loading.resolve();
      }
    };

    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(se, s);

    jQuery(".bottom-chat-button, .sidebar-chat-button, .top-chat-icon").on('click', function(e) {
      e.preventDefault();
      SnapEngage.startLink();
    });
  });

})();
