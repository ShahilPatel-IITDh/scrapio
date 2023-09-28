$(document).ready(function() {
  $(".fancybox").fancybox({
    openEffect  : 'fade',
    closeEffect : 'fade',
    prevEffect    : 'fade',
    nextEffect    : 'fade',
    padding     : 5,
    helpers     : {
      title : {
      type: 'over'
      }
    }
  });
});
