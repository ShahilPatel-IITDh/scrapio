src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"

jQuery(document).ready(function() {

var commentcon = jQuery('#comments');



if (commentcon.length) {


jQuery(commentcon).hide();

jQuery('<button/>')
  .attr('class', 'toggle-comments')
  .attr('href', '#')
  .html('Show/Write Comments <span class="icon_comment"></span>')
  .insertBefore(commentcon);


jQuery('.toggle-comments').on('click', function(e) {
  e.preventDefault();

  jQuery(commentcon).toggle('slow', function() {
    var anchor = $('.toggle-comments');
    var anchorText = anchor.html() == 'Show/Write Comments <span class="icon_comment"></span>' ? 'Hide Comments <span class="icon_comment"></span>' : 'Show/Write Comments <span class="icon_comment"></span>';
    jQuery(anchor).html(anchorText);
  });
});

}

});