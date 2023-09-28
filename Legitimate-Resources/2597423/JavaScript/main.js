$(function(){

    // var container = $('#box-wrapper');

    // container.imagesLoaded(function () {

    //     container.masonry({
    //       itemSelector: ".p-block",
    //     });

    //   })

	//more popular searches
	$('#more-searches').on('click', function(e){
			$('.popular-searches').addClass('open');
	});

	// $('.search-select').on('click', function(e){
	// 	var obj = $(this);
	// 	var menu = obj.find('.menu');
	// 	// alert(menu.html());

	// 	menu.slideToggle();
	// });

  //   $(document).on('mouseup', function (e) {
  //       var dropdown = $(".loggedin-drop-list");
  //       if (!dropdown.is(e.target)
  //            && dropdown.has(e.target).length === 0
  //            && !$(e.target).is('.admin-drop')) {
  //           dropdown.hide();
  //       }
  //   });

    //top menu hover
	$('.dropdown').bind('mouseover', openSubMenu);
	$('.dropdown').bind('mouseout', closeSubMenu);

		function openSubMenu() {
      console.log('dd: ' + $(this).attr('id'));
			$(this).find('ul').css('visibility', 'visible');
		};

		function closeSubMenu() {
			$(this).find('ul').css('visibility', 'hidden');
		};

  });
