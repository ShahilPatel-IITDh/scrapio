jQuery(function ($) {

	var jsModalOpen = function() {
		var startWindowScroll = 0;
		$('.js-modal-open').magnificPopup({
			fixedContentPos: true,
			fixedBgPos: true,
			overflowY: 'auto',
			mainClass: 'c-modal-wrapper',
			showCloseBtn: false,
			removalDelay: 100,
			type: 'inline',
			callbacks: {
				beforeOpen: function() {
					startWindowScroll = $(window).scrollTop();
				},
				open: function(){
					if ( $('.mfp-content').height() < $(window).height() ){
						$('body').on('touchmove', function (e) {
							e.preventDefault();
						});
					}
				},
				close: function() {
					$(window).scrollTop(startWindowScroll);
					$('body').off('touchmove');
				}
			}
		});
	};

	$('#load_more_news').click(function () {
		var button = $(this);
		var data = {
			'action': 'loadmore',
			'query': posts_ln,
			'page': current_page_ln
		};
		$.ajax({
			url: ajaxurl_ln, // AJAX handler
			data: data,
			type: 'POST',
			beforeSend: function (xhr) {
				button.text('Loading...'); // change the button text, you can also add a preloader image
				button.attr('disabled', 'disabled');
			},
			success: function (data) {
				if (data) {
					button.text('Load more latest news');
					$('#latest_news_container').append(data); // insert new posts
					button.removeAttr('disabled');
					current_page_ln++;

					if (current_page_ln == max_page_ln)
						button.remove(); // if last page, remove the button

					// you can also fire the "post-load" event here if you use a plugin that requires it
					// $( document.body ).trigger( 'post-load' );

					jsModalOpen();

				} else {
					button.remove(); // if no data, remove the button as well
				}
			}
		});
	});

	$('#load_more_archive').click(function () {
		var button = $(this);
		var data = {
			'action': 'loadmore',
			'query': posts_ar,
			'page': current_page_ar
		};
		$.ajax({
			url: ajaxurl_ar, // AJAX handler
			data: data,
			type: 'POST',
			beforeSend: function (xhr) {
				button.text('Loading...'); // change the button text, you can also add a preloader image
				button.attr('disabled', 'disabled');
			},
			success: function (data) {
				if (data) {
					button.text('Load more');
					$('#archive_container').append(data); // insert new posts
					button.removeAttr('disabled');
					current_page_ar++;

					if (current_page_ar == max_page_ar)
						button.remove(); // if last page, remove the button

					// you can also fire the "post-load" event here if you use a plugin that requires it
					// $( document.body ).trigger( 'post-load' );

					jsModalOpen();

				} else {
					button.remove(); // if no data, remove the button as well
				}
			}
		});
	});

	var $postsWrapper = $( '.js-post-items' );
	var $wrapper = $( '.js-post-items-wrapper' );

	$($wrapper).on( 'click', '#load_more_search_archive', function () {
		var $button = $(this);

		let doingAjax = false;

		if ( ! doingAjax ) {
			$.ajax({
				url: $button.attr( 'data-url' ),
				method: 'get',
				beforeSend: function () {
					doingAjax = true;
					$button.text('Loading...'); // change the button text, you can also add a preloader image
					$button.attr('disabled', 'disabled');
				},
				success: function (data) {
					const $container = $( $.parseHTML( data ) );
					const $posts = $container.find( '.js-post-item' );
	
					if ( $posts.length ) {
						$postsWrapper.append( $posts );
	
						const $newButton = $container.find( '#load_more_search_archive' );
	
						if ( $newButton.length ) {
							$button.before( $newButton );
						}
					}
	
					$button.remove();
					doingAjax = false;
				}
			});
		}
	});

	$('#load_more_archive').click(function () {
		var button = $(this);
		var data = {
			'action': 'loadmore',
			'query': posts_ar,
			'page': current_page_ar
		};
		$.ajax({
			url: ajaxurl_ar, // AJAX handler
			data: data,
			type: 'POST',
			beforeSend: function (xhr) {
				button.text('Loading...'); // change the button text, you can also add a preloader image
				button.attr('disabled', 'disabled');
			},
			success: function (data) {
				if (data) {
					button.text('Load more');
					$('#archive_container').append(data); // insert new posts
					button.removeAttr('disabled');
					current_page_ar++;

					if (current_page_ar == max_page_ar)
						button.remove(); // if last page, remove the button

					// you can also fire the "post-load" event here if you use a plugin that requires it
					// $( document.body ).trigger( 'post-load' );

					jsModalOpen();

				} else {
					button.remove(); // if no data, remove the button as well
				}
			}
		});
	});

});
