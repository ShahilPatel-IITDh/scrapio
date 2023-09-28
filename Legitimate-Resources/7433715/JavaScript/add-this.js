(function ($) {
  function scrollSocial() {
    var socialShare = $('#addthis_share');
    if (socialShare.length > 0) {
      // If a landscape magazine layout
      if ($('body').hasClass('single-magazine')) {
        var featuredImg = $('.magazine-single__feature');
        var waypoints = $('.magazine-single__feature').waypoint(function (direction) {
          socialShare.toggleClass('fixed');
        }, {
          offset: function () {
            // trigger when the bottom of the featured image scrolls off screen
            return -featuredImg.outerHeight();
          }
        });
        var waypoints = $('.footer__adv').waypoint(function (direction) {
          socialShare.toggleClass('hide');
        }, {
          offset: '300px'
        });
      } else {
        var waypoints = $('.tags').waypoint(function (direction) {
          socialShare.toggleClass('hide');
        }, {
          offset: '300px'
        });
      }
    }
  }
  $(document).ready(function () {
    scrollSocial();
  });
})(jQuery);
//# sourceMappingURL=add-this.js.map