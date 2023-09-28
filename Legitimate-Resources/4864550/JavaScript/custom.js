jQuery(document).ready( function() {





    jQuery('.ripple, .ncs-vc-blockbox-bg').on('click', function (event) {

      // event.preventDefault();



      var $div = jQuery('<div/>'),

          btnOffset = jQuery(this).offset(),

          xPos = event.pageX - btnOffset.left,

          yPos = event.pageY - btnOffset.top;



      $div.addClass('ripple-effect');

      var $ripple = jQuery(".ripple-effect");



      $ripple.css("height", jQuery(this).height());

      $ripple.css("width", jQuery(this).height());

      $div

        .css({

          top: yPos - ($ripple.height()/2)-10,

          left: xPos - ($ripple.width()/2)-20,

          background: jQuery(this).data("ripple-color")

        })

        .appendTo(jQuery(this));



      window.setTimeout(function(){

        $div.remove();

      }, 2000); /* duration of animation */

    });





    setTimeout(function(){jQuery('.ff-filter.ff-type-all').addClass('ff-filter--active')}, 1000); // set socialwall filter "Alle" to "active"



    // if .togglebutton is added on an element, check if the following class exists on a wpb-text block - then trigger the collapse/expand process on click
    jQuery('.togglebutton').each(function(index, el) {
      var cls = el.className;
      cls = cls.substring(cls.indexOf('togglebutton')+13).trim();
      if(cls != '') {
        var ct = jQuery('.wpb_text_column.'+cls+', .wpb_row.'+cls);
        if(ct.length > 0) {
          ct.each(function(ctIndex, ctEl) {
            ctEl.style.display = 'flex';
            ctEl.style.height = ctEl.clientHeight+'px';
            ctEl.className += ' togglecontent collapsed';
          });
          el.setAttribute('data-ct', cls);
          jQuery(el).on('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            var cls = this.getAttribute('data-ct');
            var bIsCurrentExpanded = (jQuery('.togglecontent.expanded.'+cls).length > 0);
            jQuery('.togglecontent.expanded').each(function(ctIndex, ctEl) {
              ctEl.className = ctEl.className.replace('expanded', 'collapsed');
            });
            if(!bIsCurrentExpanded) {
              jQuery('.togglecontent.collapsed.'+cls).each(function(ctIndex, ctEl) {
                ctEl.className = ctEl.className.replace('collapsed', 'expanded');
              });
            }
          });
        }
      }
    });

});

// (function (window) {

// })(window);

// jQuery('.wpcf7-form > p > label > span > *')
//
//   .focus(function(event){
//
//        jQuery(event.currentTarget).parent().parent().addClass('focused');
//
//        jQuery(event.currentTarget).parent().find('.wpcf7-not-valid-tip').addClass('focused');
//
//   })
//
//   .blur(function(event){
//
//     if(jQuery(event.currentTarget).val() != ''){
//
//           jQuery(event.currentTarget).addClass('gotcontent');
//
//     }
//
//     else if(jQuery(event.currentTarget).is("select")){
//
//       console.log(jQuery(event.currentTarget).find("option"));
//
//       if(jQuery(event.currentTarget).find("option")[0].value == ""){
//
//         jQuery(event.currentTarget).addClass('gotcontent');
//
//       }
//
//     }
//
//     else{
//
//       jQuery(event.currentTarget).parent().parent().removeClass('focused');
//
//       jQuery(event.currentTarget).parent().find('.wpcf7-not-valid-tip').removeClass('focused');
//
//       jQuery(event.currentTarget).removeClass('gotcontent');
//
//     }
//
// });



jQuery(".boxes-pdf").appendTo(".default_sidebar");


jQuery( document ).ready(function() {
	if (jQuery(".lang-fr")[0]){
    	jQuery(".ush_image_6 a").attr('href', 'https://www.swiss-athletics.ch/fr/');
		console.log("Testtesttest");
	}

  jQuery(".testjqueryright").appendTo(".formleft .l-section-h .g-cols");
});


// jQuery( document ).ready(function() {
  // jQuery(".dkpdf-button-container").appendTo(".l-titlebar-content");
// });
