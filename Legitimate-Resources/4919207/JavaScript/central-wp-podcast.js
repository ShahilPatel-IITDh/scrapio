var centralPodcast = new function () {
	this.reduceSidebarHeight = function () {
		var height_left  = $( '.o-post .wpb_wrapper' ).outerHeight();
		var height_right = $( '.sidebar .-sidebarVideoList' ).outerHeight();

		if ( ! height_left
			|| ! height_right
			|| height_left >= height_right) {
			return;
		}

		$( '.sidebar .-sidebarVideoList article:last' ).remove();
		$( '.sidebar .-sidebarVideoList .m-videoArticleListWidget__link.-moreBtn' ).show();

		// Check again.
		this.reduceSidebarHeight();
	};

	this.setFullWidthRowMargin = function () {
		var wrapWidth = $( '.m-podcastHead' ).outerWidth();

		if ( ! wrapWidth) {
			return;
		}

		var windowWidth = $( window ).width();
		var margin      = (windowWidth - wrapWidth) / 2;

		if (margin > 0) {
			$( '.m-podcastHead__header, .m-podcastHead__contWrap' ).css( 'margin-left', '-' + margin + 'px' );
			$( '.m-podcastHead__header, .m-podcastHead__contWrap' ).css( 'margin-right', '-' + margin + 'px' );
		} else {
			$( '.m-podcastHead__header, .m-podcastHead__contWrap' ).css( 'margin-left', 'unset' );
			$( '.m-podcastHead__header, .m-podcastHead__contWrap' ).css( 'margin-right', 'unset' );
		}
	};
};

/**
 * Swiper.
 */
var centralPodcastSwiper = new function() {
	/**
	 * Initialize swiper box.
	 *
	 * @param {string} cssId
	 */
	this.init = function( cssId ) {
		var that          = this;
		var windowWidth   = $( window ).width();
		var slidesPerView = 2;

		if ( windowWidth > 768 ) {
			slidesPerView = 4;
		}

		new Swiper(
			'#video-swiper-box-' + cssId, {
				slidesPerView: slidesPerView,
				spaceBetween: 30,
				slidesPerGroup: slidesPerView,
				prevButton: '#video-swiper-box-navigation-' + cssId + ' .m-videoArticleSwiperWidget__btnPrev',
				nextButton: '#video-swiper-box-navigation-' + cssId + ' .m-videoArticleSwiperWidget__btnNext',
				pagination: '#video-swiper-box-pagination-' + cssId + '.m-videoArticleSwiperWidget__pagination',
				paginationClickable: true
			}
		);

		// Add -lastSwiper CSS modifiers.
		$( '.m-videoArticleSwiperWidget:first' ).addClass( '-firstSwiper' );
		$( '.m-videoArticleSwiperWidget:last' ).addClass( '-lastSwiper' );
		$( '.m-videoArticleSwiperWidget:last .m-videoArticleSwiperWidget__separator' ).addClass( '-lastSwiper' );
		$( '.m-videoArticleSwiperWidget:last .m-videoArticleSwiperWidget__pagination' ).addClass( '-lastSwiper' );

		// Set widget as full width.
		setTimeout(
			function() {
				that.setFullWidthRowMargin( cssId );
			}, 500
		);
	};

	/**
	 * Set full width.
	 *
	 * @param cssId {string}
	 */
	this.setFullWidthRowMargin = function( cssId ) {
		var cssFullId = '#video-swiper-box-widget-' + cssId;
		var swiperBox = $( cssFullId );

		if ( ! swiperBox ) {
			return;
		}

		swiperBox.css( 'margin-left', 'unset' );
		swiperBox.css( 'margin-right', 'unset' );

		var wrapWidth   = swiperBox.outerWidth();
		var windowWidth = $( window ).width();
		var margin      = (windowWidth - wrapWidth) / 2;

		if ( margin > 0 ) {
			swiperBox.css( 'margin-left', '-' + margin + 'px' );
			swiperBox.css( 'margin-right', '-' + margin + 'px' );
		}
	};
};
