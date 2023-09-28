(function() {
	jQuery(document).ready(function($) {
		// initial resize of [cusrev_reviews_grid] and Trust Badges
		crResizeAllGridItems();
		crResizeTrustBadges();
		//enable attachment of images to comments
		jQuery("form#commentform").attr( "enctype", "multipart/form-data" ).attr( "encoding", "multipart/form-data" );
		//prevent review submission if captcha is not solved
		jQuery("#commentform").on( "submit", function(event) {
			if( cr_ajax_object.ivole_recaptcha === '1' ) {
				var recaptcha = jQuery("#g-recaptcha-response").val();
				if (recaptcha === "") {
					event.preventDefault();
					alert("Please confirm that you are not a robot");
				}
			}
			var cr_ajax_comment = jQuery("#cr-ajax-reviews-review-form form#commentform textarea#comment");
			if( cr_ajax_comment.length > 0 ) {
				if( cr_ajax_object.ivole_allow_empty_comment === '0' && cr_ajax_comment.val().trim().length === 0 ) {
					event.preventDefault();
					alert(cr_ajax_object.ivole_allow_empty_comment_alert);
				}
			}
		} );
		//show lightbox when click on images attached to reviews
		jQuery("ol.commentlist").on("click", ".cr-comment-a", function(t) {
			if(cr_ajax_object.ivole_disable_lightbox === '0') {
				//only if lightbox is not disabled in settings of the plugin
				t.preventDefault();
				var o = jQuery(".pswp")[0];
				var pics = jQuery(this).parent().parent().find(".cr-comment-a img");
				var this_pic = jQuery(this).find("img");
				var inx = 0;
				if (pics.length > 0 && this_pic.length > 0) {
					var a = [];
					for (i = 0; i < pics.length; i++) {
						a.push({
							src: pics[i].src,
							w: pics[i].naturalWidth,
							h: pics[i].naturalHeight,
							title: pics[i].alt
						});
						if (this_pic[0].src == pics[i].src) {
							inx = i;
						}
					}
					var r = {
						index: inx
					};
					new PhotoSwipe(o, PhotoSwipeUI_Default, a, r).init();
				}
			}
		});
		//show lightbox when click on images in reviews grid
		jQuery(".cr-reviews-grid").on("click", ".image-row-img, .image-row-count", function(t) {
			if(cr_ajax_object.ivole_disable_lightbox === '0') {
				//only if lightbox is not disabled in settings of the plugin
				t.preventDefault();
				var o = jQuery(".pswp")[0];
				var pics = jQuery(this).parent().find("img.image-row-img");
				var this_pic = jQuery(this);
				var inx = 0;
				if (pics.length > 0 && this_pic.length > 0) {
					var a = [];
					for (i = 0; i < pics.length; i++) {
						a.push({
							src: pics[i].src,
							w: pics[i].naturalWidth,
							h: pics[i].naturalHeight,
							title: pics[i].alt
						});
						if (this_pic[0].src == pics[i].src) {
							inx = i;
						}
					}
					var r = {
						index: inx
					};
					new PhotoSwipe(o, PhotoSwipeUI_Default, a, r).init();
				}
			}
		});
		//register a listener for votes on for reviews
		initVoteClick("ol.commentlist", ".cr-voting-a", "cr_vote_review");
		//register a listener for the voting buttons on modal
		initVoteClick(".cr-ajax-reviews-cus-images-modal", ".cr-voting-a", "cr_vote_review");
		//register a listener for the voting buttons on Q & A
		initVoteClick(".cr-qna-block .cr-qna-list-block", ".cr-voting-a", "cr_vote_question");

		//show a lightbox when click on videos attached to reviews
		jQuery("ol.commentlist").on("click", ".cr-video-a, .cr-comment-videoicon", function(t) {
			if( ! jQuery(this).closest(".cr-comment-videos").hasClass( "cr-comment-videos-modal" ) ) {
				let tt = jQuery(this).closest("[class*='cr-comment-video-']");
				jQuery(this).closest(".cr-comment-videos").addClass( "cr-comment-videos-modal" );
				tt.addClass( "cr-comment-video-modal" );
				tt.find( "video" ).prop( "controls", true );
				tt.find( ".cr-comment-videoicon" ).hide();
				tt.find( "video" ).get(0).play();
				tt.css({
					"top": "50%",
					"margin-top": function() { return -$(this).outerHeight() / 2 }
				});
				return false;
			}
			return false;
		} );
		//close a video lightbox
		jQuery("ol.commentlist").on( "click", ".cr-comment-videos", function(t) {
			if( jQuery(this).hasClass( "cr-comment-videos-modal" ) ) {
				jQuery(this).removeClass( "cr-comment-videos-modal" );
				jQuery(this).find("[class*='cr-comment-video-']").each(function(index, element){
					if( jQuery(element).hasClass( "cr-comment-video-modal" ) ) {
						jQuery(element).removeClass( "cr-comment-video-modal" );
						jQuery(element).find( "video").get(0).pause();
						jQuery(element).find( "video" ).prop( "controls", false );
						jQuery(element).find( ".cr-comment-videoicon" ).show();
						jQuery(element).removeAttr("style");
					}
				});
				return false;
			}
		} );
		//show more ajax reviews
		jQuery(".cr-show-more-reviews-prd").on( "click", function(t) {
			t.preventDefault();
			var cr_product_id = jQuery(this).parents(".cr-reviews-ajax-comments").find(".commentlist.cr-ajax-reviews-list").attr("data-product");
			var cr_nonce = jQuery(this).attr("data-nonce");
			var cr_page = jQuery(this).attr("data-page");
			var cr_sort = jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-ajax-reviews-sort").children("option:selected").val();
			var cr_rating = jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-summaryBox-ajax tr.ivole-histogramRow.ivole-histogramRow-s a.ivole-histogram-a").attr("data-rating");
			var cr_search = jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-ajax-search input").val();
			var cr_tags = [];
			jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-review-tags-filter .cr-tags-filter.cr-tag-selected").each(function() {
				cr_tags.push(jQuery(this).attr("data-crtagid"));
			});
			if(!cr_rating){
				cr_rating = 0;
			}
			var cr_data = {
				"action": "cr_show_more_reviews",
				"productID": cr_product_id,
				"page": cr_page,
				"sort": cr_sort,
				"rating": cr_rating,
				"search": cr_search,
				"tags": cr_tags,
				"security": cr_nonce
			};
			jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-summaryBox-ajax").addClass("cr-summaryBar-updating");
			jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-ajax-reviews-sort").addClass("cr-sort-updating");
			jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-review-tags-filter").addClass("cr-review-tags-filter-disabled");
			jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-search-no-reviews").hide();
			jQuery(this).hide();
			jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-show-more-review-spinner").show();
			jQuery.post( {
				url: cr_ajax_object.ajax_url,
				data: cr_data,
				context: this,
				success: function(response) {
					jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-show-more-review-spinner").hide();
					jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-summaryBox-ajax").removeClass("cr-summaryBar-updating");
					jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-ajax-reviews-sort").removeClass("cr-sort-updating");
					jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-review-tags-filter").removeClass("cr-review-tags-filter-disabled");
					if(response.page > 0){
						jQuery(this).parents(".cr-reviews-ajax-comments").find(".commentlist.cr-ajax-reviews-list").append(response.html);
						jQuery(this).attr("data-page",response.page);
						if( response.show_more_label ) {
							jQuery(this).text( response.show_more_label );
						}
						if ( response.count_row ) {
							jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-count-row .cr-count-row-count").html( response.count_row );
						}
						if(!response.last_page){
							jQuery(this).show();
						}
						cr_maybe_download_media_frontend();
					}
					if(response.html == null && response.page === 1){
						jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-search-no-reviews").show();
					}
				},
				dataType: "json"
			} );
		} );

		// ajax sorting of reviews
		jQuery(".cr-ajax-reviews-sort").on( "change", function(t) {
			t.preventDefault();

			if ( jQuery(this).parents(".cr-all-reviews-shortcode").length ) {
				// sorting in the all reviews block
				let attributes = jQuery(this).parents(".cr-all-reviews-shortcode").data("attributes"),
				cr_rating = jQuery(this).parents(".cr-all-reviews-shortcode").find(".ivole-summaryBox .ivole-histogramRow.ivole-histogramRow-s .cr-histogram-a").attr("data-rating"),
				cr_search = jQuery(this).parents(".cr-all-reviews-shortcode").find(".cr-ajax-search input").val(),
				cr_sort = jQuery(this).children("option:selected").val();
				let cr_data = {
					"action": "cr_show_more_all_reviews",
					"attributes": attributes,
					"rating": cr_rating,
					"page": 0,
					"search": cr_search,
					"sort": cr_sort
				};
				cr_filter_all_reviews( cr_data, jQuery(this) );
			} else {
				// sorting on a product page
				var cr_product_id = jQuery(this).parents(".cr-reviews-ajax-comments").find(".commentlist.cr-ajax-reviews-list").attr("data-product");
				var cr_sort = jQuery(this).children("option:selected").val();
				var cr_rating = jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-summaryBox-ajax tr.ivole-histogramRow.ivole-histogramRow-s a.ivole-histogram-a").attr("data-rating");
				if(!cr_rating){
					cr_rating = 0;
				}
				var cr_data = {
					"action": "cr_sort_reviews",
					"productID": cr_product_id,
					"sort": cr_sort,
					"rating": cr_rating
				};
				jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-search-no-reviews").hide();
				jQuery(this).parents(".cr-reviews-ajax-comments").find('.cr-ajax-search input').val("").trigger("change");
				jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-show-more-reviews-prd").hide();
				jQuery(this).parents(".cr-reviews-ajax-comments").find(".commentlist.cr-ajax-reviews-list").hide();
				jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-show-more-review-spinner").show();
				jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-summaryBox-ajax").addClass("cr-summaryBar-updating");
				jQuery(this).addClass("cr-sort-updating");
				jQuery.post( {
					url: cr_ajax_object.ajax_url,
					data: cr_data,
					context: this,
					success: function(response) {
						jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-show-more-review-spinner").hide();
						jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-summaryBox-ajax").removeClass("cr-summaryBar-updating");
						jQuery(this).removeClass("cr-sort-updating");
						if(response.page > 0){
							jQuery(this).parents(".cr-reviews-ajax-comments").find(".commentlist.cr-ajax-reviews-list").empty();
							jQuery(this).parents(".cr-reviews-ajax-comments").find(".commentlist.cr-ajax-reviews-list").append(response.html);
							jQuery(this).parents(".cr-reviews-ajax-comments").find(".commentlist.cr-ajax-reviews-list").show();
							jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-show-more-reviews-prd").attr("data-page",response.page);
							if( response.show_more_label ) {
								jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-show-more-reviews-prd").text( response.show_more_label );
							}
							if ( response.count_row ) {
								jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-count-row .cr-count-row-count").html( response.count_row );
							}
							if(!response.last_page){
								jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-show-more-reviews-prd").show();
							}
						}
					},
					dataType: "json"
				} );
			}
		} );
		//ajax filtering of reviews
		jQuery(".cr-reviews-ajax-comments").on("click", "a.ivole-histogram-a, .cr-seeAllReviews", function(t){
			t.preventDefault();
			let tmpParent = jQuery(this).parents(".cr-reviews-ajax-comments");
			let cr_product_id = tmpParent.find(".commentlist.cr-ajax-reviews-list").attr("data-product");
			let cr_nonce = tmpParent.find(".cr-summaryBox-ajax").attr("data-nonce");
			let cr_rating = jQuery(this).attr("data-rating");
			let cr_sort = tmpParent.find(".cr-ajax-reviews-sort").children("option:selected").val();
			let cr_data = {
				"action": "cr_filter_reviews",
				"productID": cr_product_id,
				"rating": cr_rating,
				"sort": cr_sort,
				"security": cr_nonce
			};
			tmpParent.find(".cr-summaryBox-ajax tr.ivole-histogramRow.ivole-histogramRow-s").removeClass("ivole-histogramRow-s");
			if( cr_rating > 0 ) {
				jQuery(this).closest("tr.ivole-histogramRow").addClass("ivole-histogramRow-s");
			}
			tmpParent.find(".cr-search-no-reviews").hide();
			tmpParent.find('.cr-ajax-search input').val("").trigger("change");
			tmpParent.find(".cr-show-more-reviews-prd").hide();
			tmpParent.find(".commentlist.cr-ajax-reviews-list").hide();
			tmpParent.find(".cr-show-more-review-spinner").show();
			tmpParent.find(".cr-summaryBox-ajax").addClass("cr-summaryBar-updating");
			tmpParent.find(".cr-ajax-reviews-sort").addClass("cr-sort-updating");
			jQuery.post( {
				url: cr_ajax_object.ajax_url,
				data: cr_data,
				context: tmpParent,
				success: function(response) {
					this.find(".cr-show-more-review-spinner").hide();
					this.find(".cr-summaryBox-ajax").removeClass("cr-summaryBar-updating");
					this.find(".cr-ajax-reviews-sort").removeClass("cr-sort-updating");
					if(response.page > 0) {
						this.find(".commentlist.cr-ajax-reviews-list").empty();
						this.find(".commentlist.cr-ajax-reviews-list").append(response.html);
						this.find(".commentlist.cr-ajax-reviews-list").show();
						this.find(".cr-show-more-reviews-prd").attr("data-page",response.page);
						if( response.show_more_label ) {
							this.find( ".cr-show-more-reviews-prd" ).text( response.show_more_label );
						}
						if ( response.count_row ) {
							this.find(".cr-count-row .cr-count-row-count").html( response.count_row );
						}
						if(!response.last_page){
							this.find(".cr-show-more-reviews-prd").show();
						}
					}
				},
				dataType: "json"
			} );
		} );
		// ajax search typing
		jQuery('.cr-ajax-search input').on("keyup", function(e){
			if(e.keyCode == 13){
				jQuery(this).parents(".cr-ajax-search").find("button").trigger("click");
			}
			// show clear icon
			if(jQuery(this).val() !== "") {
				jQuery(this).parents(".cr-ajax-search").find(".cr-clear-input").css("display", "inline-block");
			} else {
				jQuery(this).parents(".cr-ajax-search").find(".cr-clear-input").css("display", "none");
			}
		}).on("change", function(){
			if(jQuery(this).val() === "") jQuery(this).parents(".cr-ajax-search").find(".cr-clear-input").hide();
		});
		// clear search field
		jQuery(".cr-ajax-search .cr-clear-input").on("click", function () {
			if( jQuery(this).parents(".cr-all-reviews-shortcode:not(.cr-all-reviews-no-pagination)").length ) {
				// clear search in paginated version of the All Reviews block / shortcode
				window.location.href = encodeURI(window.location.href.split('?')[0] );
			} else {
				// clear search in other cases
				jQuery(this).prev("input").val("");
				jQuery(this).parents(".cr-ajax-search").find(".cr-clear-input").hide();
				jQuery(this).parents(".cr-ajax-search").find("button").trigger("click");
			}
		});
		// ajax search of reviews
		jQuery(".cr-ajax-search button").on("click", function (e) {
			e.preventDefault();

			//search in the all reviews block
			if( jQuery(this).parents(".cr-all-reviews-shortcode.cr-all-reviews-no-pagination").length ){
				// search in ajax version of the All Reviews block / shortcode
				let attributes = jQuery(this).parents(".cr-all-reviews-shortcode").data("attributes"),
				cr_rating = jQuery("div.ivole-summaryBox tr.ivole-histogramRow.ivole-histogramRow-s a.cr-histogram-a").attr("data-rating"),
				cr_search = jQuery(".cr-ajax-search input").val(),
				cr_sort = jQuery(this).parents(".cr-all-reviews-shortcode").find(".cr-ajax-reviews-sort").children("option:selected").val();
				let cr_data = {
					"action": "cr_show_more_all_reviews",
					"attributes": attributes,
					"rating": cr_rating,
					"page": 0,
					"search": cr_search,
					"sort": cr_sort
				};
				cr_filter_all_reviews( cr_data, jQuery(this) );
			} else if( jQuery(this).parents(".cr-all-reviews-shortcode").length ) {
				// search in paginated version of the All Reviews block / shortcode
				let cr_search = jQuery(this).parents(".cr-all-reviews-shortcode").find(".cr-ajax-search input").val();
				window.location.href = encodeURI(jQuery(this).parents(".cr-all-reviews-shortcode").data("baseurl") + "?crsearch=" + cr_search );
			} else {
				jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-show-more-reviews-prd").attr("data-page", 0);
				jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-ajax-reviews-list").empty();
				jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-show-more-reviews-prd").trigger("click");
			}
		});
		jQuery("button.cr-ajax-reviews-add-review").on( "click", function(t) {
			t.preventDefault();
			jQuery("#comments.cr-reviews-ajax-comments").hide();
			jQuery("#cr-ajax-reviews-review-form").show();
		} );
		jQuery("a#cr-ajax-reviews-cancel").on( "click", function(t) {
			t.preventDefault();
			jQuery("#cr-ajax-reviews-review-form").hide();
			jQuery("#comments.cr-reviews-ajax-comments").show();
		} );
		// click to filter reviews by tags
		jQuery(".cr-review-tags-filter span.cr-tags-filter").on( "click", function (e) {
			e.preventDefault();
			jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-show-more-reviews-prd").attr("data-page", 0);
			jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-ajax-reviews-list").empty();
			if(jQuery(this).hasClass("cr-tag-selected")) {
				jQuery(this).removeClass("cr-tag-selected");
			} else {
				jQuery(this).addClass("cr-tag-selected");
			}
			jQuery(this).parents(".cr-reviews-ajax-comments").find(".cr-show-more-reviews-prd").trigger("click");
		} );
		//open popup window with pictures
		jQuery(".cr-comment-image-top img").on( "click", function(t) {
			t.preventDefault();
			var slide_no = jQuery(this).data("slide");
			jQuery("#reviews.cr-reviews-ajax-reviews div.cr-ajax-reviews-cus-images-modal-cont").addClass("cr-mask-active");
			jQuery("body").addClass("cr-noscroll");
			jQuery("#reviews.cr-reviews-ajax-reviews div.cr-ajax-reviews-cus-images-modal div.cr-ajax-reviews-cus-images-slider-main").slick('setPosition');
			jQuery("#reviews.cr-reviews-ajax-reviews div.cr-ajax-reviews-cus-images-modal div.cr-ajax-reviews-cus-images-slider-nav").slick('setPosition');
			if(typeof slide_no !== 'undefined') {
				jQuery("#reviews.cr-reviews-ajax-reviews div.cr-ajax-reviews-cus-images-modal div.cr-ajax-reviews-cus-images-slider-main").slick('slickGoTo',slide_no,true);
				jQuery("#reviews.cr-reviews-ajax-reviews div.cr-ajax-reviews-cus-images-modal div.cr-ajax-reviews-cus-images-slider-nav").slick('slickGoTo',slide_no,true);
			}
		} );
		//close popup window with pictures
		jQuery("#reviews.cr-reviews-ajax-reviews div.cr-ajax-reviews-cus-images-modal-cont, #reviews.cr-reviews-ajax-reviews div.cr-ajax-reviews-cus-images-modal button.cr-ajax-reviews-cus-images-close").on( "click", function(t) {
			t.preventDefault();
			jQuery("#reviews.cr-reviews-ajax-reviews .cr-mask-active div.cr-ajax-reviews-cus-images-modal div.cr-ajax-reviews-cus-images-slider-main").slick('slickGoTo',0,true);
			jQuery("#reviews.cr-reviews-ajax-reviews .cr-mask-active div.cr-ajax-reviews-cus-images-modal div.cr-ajax-reviews-cus-images-slider-nav").slick('slickGoTo',0,true);
			jQuery("#reviews.cr-reviews-ajax-reviews div.cr-ajax-reviews-cus-images-modal-cont").removeClass("cr-mask-active");
			jQuery("body").removeClass("cr-noscroll");
		} );
		jQuery("#reviews.cr-reviews-ajax-reviews div.cr-ajax-reviews-cus-images-modal").on( "click", function(t) {
			t.stopPropagation();
		} );
		//Product variations
		jQuery(".single_variation_wrap").on( "show_variation", function ( event, variation ) {
			if(jQuery(".cr_gtin").length){
				jQuery(".cr_gtin_val").text(variation._cr_gtin);
			}
			if(jQuery(".cr_mpn").length){
				jQuery(".cr_mpn_val").text(variation._cr_mpn);
			}
			if(jQuery(".cr_brand").length){
				jQuery(".cr_brand_val").text(variation._cr_brand);
			}
		});
		//Reset Product variations
		jQuery(document).on('reset_data', function () {
			var cr_gtin = jQuery(".cr_gtin"),
			cr_mpn = jQuery(".cr_mpn"),
			cr_brand = jQuery(".cr_brand");

			if(cr_gtin.length){
				jQuery(".cr_gtin_val").text(cr_gtin.data("o_content"));
			}
			if(cr_mpn.length){
				jQuery(".cr_mpn_val").text(cr_mpn.data("o_content"));
			}
			if(cr_brand.length){
				jQuery(".cr_brand_val").text(cr_brand.data("o_content"));
			}
		});
		// show more ajax reviews in the all reviews block
		jQuery('.cr-all-reviews-shortcode .cr-show-more-button').on("click", function (e) {
			e.preventDefault();

			let attributes = jQuery(this).parents(".cr-all-reviews-shortcode").data("attributes"),
			cr_rating = jQuery("div.ivole-summaryBox.cr-all-reviews-ajax tr.ivole-histogramRow.ivole-histogramRow-s a.cr-histogram-a").attr("data-rating"),
			cr_search = jQuery(".cr-ajax-search input").val(),
			cr_sort = jQuery(this).parents(".cr-all-reviews-shortcode").find(".cr-ajax-reviews-sort").children("option:selected").val();

			var cr_data = {
				"action": "cr_show_more_all_reviews",
				"attributes": attributes,
				"rating": cr_rating,
				"page": jQuery( this ).data( "page" ),
				"search": cr_search,
				"sort": cr_sort
			};

			cr_filter_all_reviews( cr_data, jQuery(this), true );
		});
		// filter ajax reviews in the all reviews block
		jQuery(".cr-all-reviews-shortcode.cr-all-reviews-no-pagination").on("click", "a.cr-histogram-a, .cr-seeAllReviews", function(t){
			t.preventDefault();
			var cr_rating = jQuery(this).data("rating");
			var attributes = jQuery(this).parents(".cr-all-reviews-shortcode").data("attributes");
			var cr_search = jQuery(".cr-ajax-search input").val();
			let cr_sort = jQuery(this).parents(".cr-all-reviews-shortcode").find(".cr-ajax-reviews-sort").children("option:selected").val();
			var cr_data = {
				"action": "cr_show_more_all_reviews",
				"attributes": attributes,
				"page": 0,
				"rating": cr_rating,
				"search": cr_search,
				"sort": cr_sort
			};
			jQuery("div.ivole-summaryBox tr.ivole-histogramRow.ivole-histogramRow-s").removeClass("ivole-histogramRow-s");
			if( cr_rating > 0 ) {
				jQuery(this).closest("tr.ivole-histogramRow").addClass("ivole-histogramRow-s");
			}

			cr_filter_all_reviews( cr_data, jQuery(this) );
		});

		// show more ajax reviews in the grid
		jQuery( ".cr-reviews-grid .cr-show-more-button" ).on( "click", function (e) {
			e.preventDefault();

			let $this = jQuery(this),
			$spinner =  $this.next(".cr-show-more-spinner"),
			cr_rating = $this.parents(".cr-reviews-grid").find(".ivole-summaryBox.cr-grid-reviews-ajax tr.ivole-histogramRow.ivole-histogramRow-s a.cr-histogram-a").attr("data-rating"),
			attributes = $this.parents(".cr-reviews-grid").data("attributes");

			attributes.comment__not_in = $this.parents(".cr-reviews-grid").find(".cr-review-card.cr-card-product").map( function() {
				return jQuery(this).data("reviewid");
			} ).get();
			attributes.comment__not_in = attributes.comment__not_in.concat(
				$this.parents(".cr-reviews-grid").find(".cr-review-card.cr-card-shop").map(function(){
					return jQuery(this).data("reviewid");
				}).get() );

			var grid_data = {
				'action': "ivole_show_more_grid_reviews",
				'rating': cr_rating,
				'attributes': attributes
			};

			$this.hide();
			$spinner.show();

			jQuery.post(cr_ajax_object.ajax_url, grid_data, function(response) {
				$spinner.hide();
				$reviews = jQuery(response.html).find(".cr-review-card");
				if($reviews.length){
					$this.parents(".cr-reviews-grid").find(".cr-reviews-grid-inner").colcade("append", $reviews);
					$this.show();
				} else {
					$this.hide();
				}
			}).fail(function(response) {
				$spinner.hide();
				$this.show();
				$this.parent().append('<div style="color:#cd2653;text-align:center;display:block;">'+response.responseText+'</div>');
			});
		});

		jQuery(".cr-reviews-grid .cr-summaryBox-wrap").on("click", "a.cr-histogram-a, .cr-seeAllReviews", function(e){
			e.preventDefault();

			let $this = jQuery(this),
			$grid =  $this.parents(".cr-reviews-grid"),
			$spinner =  $grid.find(".cr-show-more-spinner"),
			cr_rating = $this.attr("data-rating"),
			attributes = $grid.data("attributes");

			attributes.show_more = attributes.count + attributes.count_shop_reviews;
			attributes.comment__not_in = [];

			if(!cr_rating) cr_rating = 0;

			var grid_data = {
				'action': "ivole_show_more_grid_reviews",
				'rating': cr_rating,
				'attributes': attributes
			};

			$grid.find("div.ivole-summaryBox tr.ivole-histogramRow.ivole-histogramRow-s").removeClass("ivole-histogramRow-s");
			if( cr_rating > 0 ) {
				$this.closest("tr.ivole-histogramRow").addClass("ivole-histogramRow-s");
			}
			$grid.find(".cr-reviews-grid-inner").hide();
			$grid.find(".cr-show-more-button").hide();
			$spinner.show();
			$grid.find("div.ivole-summaryBox").addClass("cr-summaryBar-updating");

			jQuery.post(cr_ajax_object.ajax_url, grid_data, function(response) {
				$spinner.hide();
				$grid.find(".cr-show-more-button").show();
				$grid.find(".cr-summaryBox-wrap .cr-count-filtered-reviews").empty();
				$reviews = jQuery(response.html).find(".cr-review-card");
				if($reviews.length){
					$grid.find(".cr-reviews-grid-inner").colcade("empty");
					$grid.find(".cr-reviews-grid-inner").show();
					$grid.find(".cr-reviews-grid-inner").colcade("append", $reviews);
					$grid.find("div.ivole-summaryBox").removeClass("cr-summaryBar-updating");
					$grid.find(".cr-summaryBox-wrap .cr-count-filtered-reviews").append(jQuery(response.html).find(".cr-count-filtered-reviews").html());
				}
			}).fail(function(response) {
				$spinner.hide();
				$this.parent().append('<div style="color: #cd2653;text-align: center;display: block;">'+response.responseText+'</div>');
			});

		});
		jQuery('#cr_floatingtrustbadge').on( "click", function() {
			if( !jQuery(this).hasClass( 'cr-floatingbadge-big' ) ) {
				jQuery(this).find('div.cr-badge.badge_size_compact').hide();
				jQuery(this).find('div.cr-badge.badge--wide-mobile').css( 'display', 'block' );
				jQuery(this).find('div.cr-floatingbadge-close').css( 'display', 'block' );
				jQuery(this).addClass( 'cr-floatingbadge-big' );
				//update colors
				var crcolors = jQuery(this).data('crcolors');
				if (typeof crcolors !== 'undefined') {
					jQuery(this).css( 'border-color', crcolors['big']['border'] );
					jQuery(this).find('div.cr-floatingbadge-background-top').css( 'background-color', crcolors['big']['top'] );
					jQuery(this).find('div.cr-floatingbadge-background-middle').css( 'background-color', crcolors['big']['middle'] );
					jQuery(this).find('div.cr-floatingbadge-background-bottom').css( 'background-color', crcolors['big']['bottom'] );
					jQuery(this).find('div.cr-floatingbadge-background-bottom').css( 'border-color', crcolors['big']['border'] );
				}
			}
		} );
		jQuery('#cr_floatingtrustbadge .cr-floatingbadge-close').on( "click", function(event) {
			if( jQuery('#cr_floatingtrustbadge').hasClass( 'cr-floatingbadge-big' ) ) {
				jQuery(this).closest('#cr_floatingtrustbadge').find('div.cr-badge.badge--wide-mobile').hide();
				jQuery(this).closest('#cr_floatingtrustbadge').find('div.cr-badge.badge_size_compact').css( 'display', 'block' );
				jQuery(this).closest('#cr_floatingtrustbadge').removeClass( 'cr-floatingbadge-big' );
				//update colors
				var crcolors = jQuery(this).closest('#cr_floatingtrustbadge').data('crcolors');
				if (typeof crcolors !== 'undefined') {
					jQuery(this).closest('#cr_floatingtrustbadge').css( 'border-color', crcolors['small']['border'] );
					jQuery(this).closest('#cr_floatingtrustbadge').find('div.cr-floatingbadge-background-top').css( 'background-color', crcolors['small']['top'] );
					jQuery(this).closest('#cr_floatingtrustbadge').find('div.cr-floatingbadge-background-middle').css( 'background-color', crcolors['small']['middle'] );
					jQuery(this).closest('#cr_floatingtrustbadge').find('div.cr-floatingbadge-background-bottom').css( 'background-color', crcolors['small']['bottom'] );
					jQuery(this).closest('#cr_floatingtrustbadge').find('div.cr-floatingbadge-background-bottom').css( 'border-color', crcolors['small']['border'] );
				}
			} else {
				jQuery('#cr_floatingtrustbadge').hide();
				document.cookie = 'cr_hide_trustbadge=true; path=/; max-age='+60*60*24+';';
			}
			event.stopPropagation();
		} );
		jQuery('.cr-slider-read-more a').each( function() {
			this.onclick = function(e) {
				e.preventDefault();
				let parent = jQuery(this).parents(".review-text");
				parent.find(".cr-slider-read-more").hide();
				parent.find(".cr-slider-details").css("display", "inline");
				jQuery(this).parents(".cr-reviews-slider").slick('setPosition');
			}
		});
		jQuery('.cr-slider-read-less a').each( function() {
			this.onclick = function(e) {
				e.preventDefault();
				let parent = jQuery(this).parents(".review-text");
				parent.find(".cr-slider-details").hide();
				parent.find(".cr-slider-read-more").css("display", "inline");
				jQuery(this).parents(".cr-reviews-slider").slick('setPosition');
			}
		});
		jQuery('#cr_qna.cr-qna-block .cr-qna-search-block button.cr-qna-ask-button').on( 'click', function (e) {
			e.preventDefault();
			jQuery( this ).closest( '.cr-qna-block' ).find( '.cr-qna-new-q-overlay .cr-qna-new-q-form' ).addClass( 'cr-q-modal' );
			jQuery( this ).closest( '.cr-qna-block' ).find( '.cr-qna-new-q-overlay .cr-qna-new-q-form.cr-qna-new-a-form' ).removeClass( 'cr-q-modal' );
			jQuery( this ).closest( '.cr-qna-block' ).find( '.cr-qna-new-q-overlay').addClass( 'cr-q-modal' );
			jQuery( 'body' ).addClass( 'cr-noscroll' );
		} );
		jQuery("#cr_qna.cr-qna-block .cr-qna-list-block .cr-qna-list-block-inner").on( "click", ".cr-qna-ans-button", function (e) {
			e.preventDefault();
			let parent = jQuery(this).parents(".cr-qna-list-q-cont");
			let question = parent.find("span.cr-qna-list-question").text();
			if( question.length ) {
				jQuery( "#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-qna-new-a-form .cr-qna-new-q-form-input .cr-qna-new-q-form-text").text(question);
			}
			let question_id = jQuery(this).attr( "data-question" );
			if( question_id.length ) {
				jQuery( "#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-input .cr-qna-new-q-form-s-b").attr( "data-question", question_id );
			}
			let post_id = jQuery(this).attr( "data-post" );
			if( post_id.length ) {
				jQuery( "#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-input .cr-qna-new-q-form-s-b").attr( "data-post", post_id );
			}
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form').removeClass( "cr-q-modal" );
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-qna-new-a-form').addClass( "cr-q-modal" );
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay').addClass( "cr-q-modal" );
			jQuery("body").addClass("cr-noscroll");
		} );
		jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay').on( "click", function (e) {
			e.preventDefault();
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-ok').css( 'display', 'none' );
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-error').css( 'display', 'none' );
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-input').css( 'display', 'block' );
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form').removeClass( 'cr-q-modal' );
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay').removeClass( 'cr-q-modal' );
			jQuery("body").removeClass("cr-noscroll");
		} );
		jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-close').on( "click", function (e) {
			e.preventDefault();
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-ok').css( 'display', 'none' );
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-error').css( 'display', 'none' );
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-input').css( 'display', 'block' );
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form').removeClass( 'cr-q-modal' );
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay').removeClass( 'cr-q-modal' );
			jQuery("body").removeClass("cr-noscroll");
		} );
		jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form').on( "click", function (e) {
			e.stopPropagation();
		} );
		jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-q, #cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-name, #cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-email').on( "input", function (e) {
			jQuery(this).addClass( 'cr-qna-new-q-form-notinit' );
			crValidateQna( jQuery( this ) );
		} );
		jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-input .cr-qna-new-q-form-s-b').on( "click", function (e) {
			if( crValidateQnaHelper( jQuery( this ) ) ) {
				var cr_cptcha = jQuery(this).attr("data-crcptcha");
				if( cr_cptcha && cr_cptcha.length > 0 ) {
					grecaptcha.ready(function() {
						grecaptcha.execute(cr_cptcha, {action: 'submit'}).then(function(token) {
							crNewQna(token)
						});
					});
				} else {
					crNewQna('');
				}
			}
		} );
		jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-ok .cr-qna-new-q-form-s-b').on( "click", function (e) {
			e.preventDefault();
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-ok').css( 'display', 'none' );
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-error').css( 'display', 'none' );
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-input').css( 'display', 'block' );
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form').removeClass( 'cr-q-modal' );
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay').removeClass( 'cr-q-modal' );
			jQuery("body").removeClass("cr-noscroll");
		} );
		//show more questions and answers
		jQuery("#cr_qna.cr-qna-block #cr-show-more-q-id").on( "click", function(t) {
			t.preventDefault();
			let qna_block = jQuery(this).parents(".cr-qna-block").eq(0);
			let cr_product_id = jQuery(this).attr("data-product");
			let cr_page = jQuery(this).attr("data-page");
			let cr_attributes = qna_block.data("attributes");
			let cr_search = qna_block.find(".cr-ajax-qna-search input").val();
			let cr_data = {
				"action": "cr_show_more_qna",
				"productID": cr_product_id,
				"page": cr_page,
				"search": cr_search,
				"cr_attributes": cr_attributes
			};
			qna_block.find(".cr-search-no-qna").hide();
			jQuery(this).hide();
			qna_block.find("#cr-show-more-q-spinner").show();
			jQuery.post(cr_ajax_object.ajax_url, cr_data, function(response) {
				jQuery("#cr_qna.cr-qna-block #cr-show-more-q-spinner").hide();
				if(response.page >= 0){
					jQuery("#cr_qna.cr-qna-block .cr-qna-list-block .cr-qna-list-block-inner").append(response.html);
					jQuery("#cr_qna.cr-qna-block #cr-show-more-q-id").attr("data-page",response.page);
					if(!response.last_page){
						jQuery("#cr_qna.cr-qna-block #cr-show-more-q-id").show();
					}
				}
				if(response.html === "" && response.page === 0){
					jQuery("#cr_qna.cr-qna-block .cr-search-no-qna").show();
				}
			}, "json");
		} );
		//search questions and answers
		jQuery("#cr_qna.cr-qna-block .cr-ajax-qna-search input").on("keyup", cr_keyup_delay(function(e) {
			// do nothing if it's an arrow key
			var code = (e.keyCode || e.which);
			if(code == 37 || code == 38 || code == 39 || code == 40) {
				return;
			}
			jQuery("#cr_qna.cr-qna-block #cr-show-more-q-id").attr("data-page", -1);
			jQuery("#cr_qna.cr-qna-block .cr-qna-list-block .cr-qna-list-block-inner").empty();
			jQuery("#cr_qna.cr-qna-block #cr-show-more-q-id").trigger("click");
		}, 500));
		jQuery("#cr_qna.cr-qna-block .cr-ajax-qna-search input").on("keyup", function(e){
			//show clear icon
			if(jQuery(this).val() !== "") {
				jQuery("#cr_qna.cr-qna-block .cr-ajax-qna-search .cr-clear-input").css("display", "inline-block");
			} else {
				if(jQuery(this).val() === "") jQuery("#cr_qna.cr-qna-block .cr-ajax-qna-search .cr-clear-input").hide();
			}
		}).on("change", function(){
			if(jQuery(this).val() === "") jQuery("#cr_qna.cr-qna-block .cr-ajax-qna-search .cr-clear-input").hide();
		});
		jQuery("#cr_qna.cr-qna-block .cr-ajax-qna-search .cr-clear-input").on("click", function () {
			jQuery(this).prev("input").val("");
			jQuery("#cr_qna.cr-qna-block .cr-ajax-qna-search .cr-clear-input").hide();
			jQuery("#cr_qna.cr-qna-block #cr-show-more-q-id").attr("data-page", -1);
			jQuery("#cr_qna.cr-qna-block .cr-qna-list-block .cr-qna-list-block-inner").empty();
			jQuery("#cr_qna.cr-qna-block #cr-show-more-q-id").trigger("click");
		});
		//show QnA tab
		jQuery("body").on("click", "a.cr-qna-link", function () {
			const cr_qna_tab = jQuery( '.cr_qna_tab a' );
			if( cr_qna_tab.length ) {
				cr_qna_tab.click();
			} else {
				jQuery( '.cr-qna-block' ).parents( ':hidden' ).show();
			}
			return true;
		});

		// upload images with a review
		jQuery("#cr_review_image").on("change", function () {
			jQuery(".cr-upload-images-status").removeClass("cr-upload-images-status-error");
			jQuery(".cr-upload-images-status").text(cr_ajax_object.cr_upload_initial);
			let allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'video/mp4', 'video/mpeg', 'video/ogg', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
			let uploadFiles = jQuery("#cr_review_image");
			let countFiles = uploadFiles[0].files.length;
			let countUploaded = jQuery(".cr-upload-images-preview .cr-upload-images-containers").length;
			let lastIndex = 1;
			let cr_captcha = "";
			if(jQuery(this).attr("data-lastindex")) {
				lastIndex = parseInt(jQuery(this).attr("data-lastindex"));
			}
			if( countFiles + countUploaded > cr_ajax_object.cr_images_upload_limit ) {
				jQuery(".cr-upload-images-status").addClass("cr-upload-images-status-error");
				jQuery(".cr-upload-images-status").text(cr_ajax_object.cr_upload_error_too_many);
				jQuery(".cr-upload-images-preview .cr-upload-images-containers").not(".cr-upload-ok").remove();
				uploadFiles.val("");
				return;
			}
			for(let i = 0; i < countFiles; i++) {
				if(!allowedTypes.includes(uploadFiles[0].files[i].type) ) {
					jQuery(".cr-upload-images-status").addClass("cr-upload-images-status-error");
					jQuery(".cr-upload-images-status").text(cr_ajax_object.cr_upload_error_file_type);
					jQuery(".cr-upload-images-preview .cr-upload-images-containers").not(".cr-upload-ok").remove();
					uploadFiles.val("");
					return;
				} else if(uploadFiles[0].files[i].size && uploadFiles[0].files[i].size > cr_ajax_object.cr_images_upload_max_size) {
					jQuery(".cr-upload-images-status").addClass("cr-upload-images-status-error");
					jQuery(".cr-upload-images-status").text(cr_ajax_object.cr_upload_error_file_size);
					jQuery(".cr-upload-images-preview .cr-upload-images-containers").not(".cr-upload-ok").remove();
					uploadFiles.val("");
					return;
				} else {
					let container = jQuery("<div/>", {class:"cr-upload-images-containers cr-upload-images-container-" + (lastIndex + i)});
					let progressBar = jQuery("<div/>", {class:"cr-upload-images-pbar"});
					progressBar.append(
						jQuery("<div/>", {class:"cr-upload-images-pbarin"})
					);
					if( -1 === uploadFiles[0].files[i].type.indexOf( 'image' ) ) {
						container.append(
							jQuery( "<svg class='cr-upload-video-thumbnail' viewBox='0 0 576 512'><path d='M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z'></path></svg>" )
						);
					} else{
						container.append(
							jQuery("<img>", {class:"cr-upload-images-thumbnail",src:URL.createObjectURL(uploadFiles[0].files[i])})
						);
					}
					container.append(
						progressBar
					);
					let removeButton = jQuery("<button/>", {class:"cr-upload-images-delete"});
					removeButton.append(
						'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="0" fill="none" width="20" height="20"/><g><path class="cr-no-icon" d="M12.12 10l3.53 3.53-2.12 2.12L10 12.12l-3.54 3.54-2.12-2.12L7.88 10 4.34 6.46l2.12-2.12L10 7.88l3.54-3.53 2.12 2.12z"/></g></svg>'
					);
					container.append(
						removeButton
					);
					container.append(
						jQuery("<input>", {name:"cr-upload-images-ids[]",type:"hidden",value:""})
					);
					container.append(
						jQuery("<span/>", {class:"cr-upload-images-delete-spinner"})
					);
					jQuery(".cr-upload-images-preview").append(container);
				}
			}
			for(let i = 0; i < countFiles; i++) {
				let formData = new FormData();
				formData.append("action", "cr_upload_local_images_frontend");
				formData.append("cr_nonce", jQuery(this).attr("data-nonce"));
				formData.append("cr_postid", jQuery(this).attr("data-postid"));
				formData.append("cr_file", uploadFiles[0].files[i]);
				if(typeof grecaptcha !== "undefined" && cr_ajax_object.ivole_recaptcha === '1') {
					cr_captcha = grecaptcha.getResponse();
					grecaptcha.reset();
				}
				formData.append("cr_captcha", cr_captcha);
				jQuery.ajax({
					url: cr_ajax_object.ajax_url,
					data: formData,
					processData: false,
					contentType: false,
					dataType: "json",
					type: "POST",
					beforeSend: function() {
					},
					xhr: function() {
						var myXhr = jQuery.ajaxSettings.xhr();
						if ( myXhr.upload ) {
							myXhr.upload.addEventListener( 'progress', function(e) {
								if ( e.lengthComputable ) {
									let perc = ( e.loaded / e.total ) * 100;
									perc = perc.toFixed(0);
									jQuery(".cr-upload-images-preview .cr-upload-images-containers.cr-upload-images-container-" + (lastIndex + i) + " .cr-upload-images-pbar .cr-upload-images-pbarin").width(perc + "%");
								}
							}, false );
						}
						return myXhr;
					},
					success: function(response) {
						if(200 === response["code"]) {
							let idkey = JSON.stringify({ id: response["attachment"]["id"], key: response["attachment"]["key"] });
							jQuery(".cr-upload-images-preview .cr-upload-images-containers.cr-upload-images-container-" + (lastIndex + i) + " input").val(idkey);
							jQuery(".cr-upload-images-preview .cr-upload-images-containers.cr-upload-images-container-" + (lastIndex + i)).addClass("cr-upload-ok");
							jQuery(".cr-upload-images-preview .cr-upload-images-containers.cr-upload-images-container-" + (lastIndex + i) + " button").attr("data-delnonce",response["attachment"]["nonce"]);
						} else if(500 <= response["code"]) {
							jQuery(".cr-upload-images-preview .cr-upload-images-containers.cr-upload-images-container-" + (lastIndex + i)).remove();
							jQuery(".cr-upload-images-status").addClass("cr-upload-images-status-error");
							jQuery(".cr-upload-images-status").text(response["message"]);
						}
					}
				});
			}
			jQuery(this).attr("data-lastindex", lastIndex + countFiles);
			uploadFiles.val("");
		});

		// delete uploaded image
		jQuery(".cr-upload-images-preview").on("click", ".cr-upload-images-delete", function (e) {
			e.preventDefault();
			jQuery(".cr-upload-images-status").removeClass("cr-upload-images-status-error");
			jQuery(".cr-upload-images-status").text(cr_ajax_object.cr_upload_initial);
			let classList = jQuery(this).parent().eq(0).attr("class").split(/\s+/);
			let classes = "";
			jQuery.each(classList, function(index, item) {
				classes += "." + item;
			});
			let ajaxData = {
				"action": "cr_delete_local_images_frontend",
				"cr_nonce": jQuery(this).attr("data-delnonce"),
				"image": jQuery(this).parent().children("input").eq(0).val(),
				"class": classes
			}
			jQuery(this).parent().addClass("cr-upload-delete-pending");
			jQuery.post(cr_ajax_object.ajax_url, ajaxData, function(response) {
				if(200 === response["code"] && response["class"]) {
					jQuery(".cr-upload-images-preview " + response["class"]).remove();
				}
				jQuery(".cr-upload-images-preview " + response["class"]).removeClass("cr-upload-delete-pending");
			}, "json");
		});

		// update star rating on an add-a-review form hover
		jQuery( ".cr-review-form-rating .cr-review-form-rating-inner" ).hover(
			function() {
				let rating = parseInt( jQuery( this ).data( "rating" ) );
				let ratingActv = parseInt( jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-actv" ).data( "rating" ) );
				if( isNaN( ratingActv ) ) {
					ratingActv = 0;
				}
				for( r = 1; r < 6; r++ ) {
					if( r > rating && r > ratingActv ) {
						jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-inner[data-rating=" + r + "] .cr-rating-act" ).hide();
						jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-inner[data-rating=" + r + "] .cr-rating-deact" ).show();
					} else {
						jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-inner[data-rating=" + r + "] .cr-rating-deact" ).hide();
						jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-inner[data-rating=" + r + "] .cr-rating-act" ).show();
					}
				}
				jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-nbr" ).text( rating + "/5" );
			},
			function() {
				let ratingActv = parseInt( jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-actv" ).data( "rating" ) );
				if( isNaN( ratingActv ) ) {
					ratingActv = 0;
				}
				for( r = 1; r < 6; r++ ) {
					if( r > ratingActv ) {
						jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-inner[data-rating=" + r + "] .cr-rating-act" ).hide();
						jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-inner[data-rating=" + r + "] .cr-rating-deact" ).show();
					} else {
						jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-inner[data-rating=" + r + "] .cr-rating-deact" ).hide();
						jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-inner[data-rating=" + r + "] .cr-rating-act" ).show();
					}
				}
				jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-nbr" ).text( ratingActv + "/5" );
			}
		);

		// update star rating on an add-a-review form click
		jQuery( ".cr-review-form-rating .cr-review-form-rating-inner" ).on( "click", function( e ) {
			e.preventDefault();
			let rating = parseInt( jQuery( this ).data( "rating" ) );
			jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-inner" ).removeClass( "cr-review-form-rating-actv" );
			jQuery( this ).addClass( "cr-review-form-rating-actv" );
			for( r = 1; r < 6; r++ ) {
				if( r > rating ) {
					jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-inner[data-rating=" + r + "] .cr-rating-act" ).hide();
					jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-inner[data-rating=" + r + "] .cr-rating-deact" ).show();
				} else {
					jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-inner[data-rating=" + r + "] .cr-rating-deact" ).hide();
					jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-inner[data-rating=" + r + "] .cr-rating-act" ).show();
				}
			}
			jQuery( this ).closest( ".cr-review-form-rating-cont" ).find( ".cr-review-form-rating-nbr" ).text( rating + "/5" );
			jQuery( this ).closest( ".cr-review-form-rating" ).find( ".cr-review-form-rating-inp" ).val( rating );
			jQuery( this ).closest( ".cr-review-form-rating" ).removeClass( "cr-review-form-error" );
		} );

		// close the review form
		jQuery( ".cr-all-reviews-shortcode .cr-nav-left svg, .cr-all-reviews-shortcode .cr-nav-right svg, .cr-all-reviews-shortcode .cr-review-form-cancel" ).on( "click", function( e ) {
			jQuery( this ).closest( ".cr-all-reviews-shortcode" ).removeClass( "cr-all-reviews-new-review" );
			jQuery( this ).closest( ".cr-review-form-wrap" ).removeClass( "cr-review-form-res" );
			cr_reset_review_form( jQuery( this ) );
		} );
		jQuery( ".cr-all-reviews-shortcode .cr-review-form-wrap" ).on( "click", ".cr-review-form-success", function( e ) {
			jQuery( this ).closest( ".cr-all-reviews-shortcode" ).removeClass( "cr-all-reviews-new-review" );
			jQuery( this ).closest( ".cr-review-form-wrap" ).removeClass( "cr-review-form-res" );
			cr_reset_review_form( jQuery( this ) );
		} );
		jQuery( ".cr-all-reviews-shortcode .cr-review-form-wrap" ).on( "click", ".cr-review-form-error", function( e ) {
			jQuery( this ).closest( ".cr-review-form-wrap" ).removeClass( "cr-review-form-res" );
		} );

		// submit the review form
		jQuery( ".cr-all-reviews-shortcode .cr-review-form-submit" ).on( "click", function( e ) {
			jQuery( this ).closest( ".cr-review-form-wrap" ).find( ".cr-review-form-rating" ).removeClass( "cr-review-form-error" );
			jQuery( this ).closest( ".cr-review-form-wrap" ).find( ".cr-review-form-comment" ).removeClass( "cr-review-form-error" );
			jQuery( this ).closest( ".cr-review-form-wrap" ).find( ".cr-review-form-name" ).removeClass( "cr-review-form-error" );
			jQuery( this ).closest( ".cr-review-form-wrap" ).find( ".cr-review-form-email" ).removeClass( "cr-review-form-error" );
			if( cr_validate_review_form( jQuery( this ) ) ) {
				// submit the form if the validation is successful
				let cr_data = {
					"action": "cr_submit_review",
					"rating": jQuery( this ).closest( ".cr-review-form-wrap" ).find( ".cr-review-form-rating-actv" ).data( "rating" ),
					"review": jQuery( this ).closest( ".cr-review-form-wrap" ).find( ".cr-review-form-comment-txt" ).val().trim(),
					"name": jQuery( this ).closest( ".cr-review-form-wrap" ).find( ".cr-review-form-name .cr-review-form-txt" ).val().trim(),
					"email": jQuery( this ).closest( ".cr-review-form-wrap" ).find( ".cr-review-form-email .cr-review-form-txt" ).val().trim()
				};
				jQuery( this ).closest( ".cr-review-form-wrap" ).addClass( "cr-review-form-submitting" );
				jQuery( this ).closest( ".cr-review-form-wrap" ).find( ".cr-review-form-continue" ).removeClass( "cr-review-form-success" );
				jQuery( this ).closest( ".cr-review-form-wrap" ).find( ".cr-review-form-continue" ).removeClass( "cr-review-form-error" );
				jQuery.post(
					{
						url: cr_ajax_object.ajax_url,
						data: cr_data,
						context: jQuery( this ),
						success: function( response ) {
							this.closest( ".cr-review-form-wrap" ).removeClass( "cr-review-form-submitting" );
							this.closest( ".cr-review-form-wrap" ).addClass( "cr-review-form-res" );
							this.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-result span" ).html( response.description );
							this.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-continue" ).html( response.button );
							if( 0 === response.code ) {
								this.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-continue" ).addClass( "cr-review-form-success" );
							} else {
								this.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-continue" ).addClass( "cr-review-form-error" );
							}
						},
						dataType: "json"
					}
				);
			};
		} );

		// validate custom questions and ratings on submission of a review form on a product page
		jQuery( ".cr-single-product-review" ).on( "click", ".cr-single-product-rev-submit", function(t) {
			let validationResult = true;
			let reviewForm = jQuery( this ).closest( ".cr-single-product-review" );

			// validate ratings
			reviewForm.find( ".cr-review-form-rating-cont.cr-review-form-rating-req" ).each( function( index ) {
				if( 1 > jQuery( this ).find( ".cr-review-form-rating-actv" ).length ) {
					jQuery( this ).closest( ".cr-review-form-rating" ).addClass( "cr-review-form-error" );
					validationResult = false;
				}
			} );

			// validate custom questions
			reviewForm.find( ".cr-onsite-question.cr-review-form-que-req" ).each( function( index ) {
				if( 1 > jQuery( this ).find( "input[type=text]" ).val().trim().length ) {
					jQuery( this ).closest( ".cr-onsite-question" ).addClass( "cr-review-form-error" );
					validationResult = false;
				} else {
					jQuery( this ).closest( ".cr-onsite-question" ).removeClass( "cr-review-form-error" );
				}
			} );

			// validate the comment field
			reviewForm.find( ".cr-review-form-textbox" ).each( function( index ) {
				if( 1 > jQuery( this ).val().trim().length ) {
					jQuery( this ).addClass( "cr-review-form-error" );
					validationResult = false;
				} else {
					jQuery( this ).removeClass( "cr-review-form-error" );
				}
			} );

			if( ! validationResult ) {
				t.preventDefault();
			}
		} );

		// open the review form
		jQuery( ".cr-all-reviews-add-review" ).on( "click", function(t) {
			t.preventDefault();
			jQuery( this ).closest( ".cr-all-reviews-shortcode" ).addClass( "cr-all-reviews-new-review" );
		} );

		cr_maybe_download_media_frontend();

		if( "object" === typeof elementorFrontend && "hooks" in elementorFrontend ) {
			elementorFrontend.hooks.addAction( "frontend/element_ready/widget", function( $scope ) {
				if( -1 !== $scope.data( "widget_type" ).indexOf( "shortcode" ) ) {
					if( 0 < $scope.find( ".cr-reviews-grid-inner" ).length ) {
						crResizeAllGridItems();
					}
				}
			} );
		}

	} );

	function initVoteClick(sel1, sel2, action) {
		jQuery(sel1).on("click", sel2, function(e) {
			e.preventDefault();

			let reviewIDhtml = jQuery(this).data("vote");
			let parent = jQuery(this).parents(".cr-voting-cont-uni");

			if(reviewIDhtml != null) {
				let reviewID = reviewIDhtml;
				let data = {
					"action": action,
					"reviewID": reviewID,
					"upvote": jQuery(this).data("upvote")
				};

				parent.find(".cr-voting-a").removeClass("cr-voting-active");
				parent.find(".cr-voting-a").addClass("cr-voting-update");
				jQuery.post(cr_ajax_object.ajax_url, data, function(response) {
					parent.find(".cr-voting-a").removeClass("cr-voting-update");
					if( response.code === 0 ) {
						if( response.votes ) {
							parent.find(".cr-voting-upvote-count").text("(" +  response.votes.upvotes + ")");
							parent.find(".cr-voting-downvote-count").text("(" +  response.votes.downvotes + ")");
						}
						if( 0 !== response.votes.current ) {
							if( 0 < response.votes.current ) {
								parent.find(".cr-voting-upvote").addClass("cr-voting-active");
							} else {
								parent.find(".cr-voting-downvote").addClass("cr-voting-active");
							}
						}
					}
				}, "json");
			}
		});
	}

	function crValidateQnaHelper( refElement ) {
		let ret = true;
		let modal = refElement.closest( '.cr-qna-block' ).find( '.cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal' );
		if( modal.find( '.cr-qna-new-q-form-q' ).val().trim().length <= 0 ) {
			modal.find( '.cr-qna-new-q-form-q' ).addClass( 'cr-qna-new-q-form-invalid' );
			ret = false;
		} else {
			modal.find( '.cr-qna-new-q-form-q' ).removeClass( 'cr-qna-new-q-form-invalid' );
		}
		if( modal.find( '.cr-qna-new-q-form-name' ).val().trim().length <= 0 ) {
			modal.find( '.cr-qna-new-q-form-name' ).addClass( 'cr-qna-new-q-form-invalid' );
			ret = false;
		} else {
			modal.find( '.cr-qna-new-q-form-name' ).removeClass( 'cr-qna-new-q-form-invalid' );
		}
		if( ! crValidateEmail( modal.find( '.cr-qna-new-q-form-email' ).val().trim() ) ) {
			modal.find( '.cr-qna-new-q-form-email' ).addClass( 'cr-qna-new-q-form-invalid' );
			ret = false;
		} else {
			modal.find( '.cr-qna-new-q-form-email' ).removeClass( 'cr-qna-new-q-form-invalid' );
		}
		return ret;
	}

	function crValidateQna( refElement ) {
		if( crValidateQnaHelper( refElement ) ) {
			refElement.closest( '.cr-qna-block' ).find( '.cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-s button.cr-qna-new-q-form-s-b' ).addClass( 'cr-q-active' );
		} else {
			refElement.closest( '.cr-qna-block' ).find( '.cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-s button.cr-qna-new-q-form-s-b' ).removeClass( 'cr-q-active' );
		}
	}

	function crValidateEmail(email) {
		var re = /\S+@\S+\.\S+/;
		return re.test(email);
	}

	function crNewQna(token) {
		var cr_nonce = jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-input .cr-qna-new-q-form-s-b').attr("data-nonce");
		var cr_post_id = jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-input .cr-qna-new-q-form-s-b').attr("data-post");
		var cr_current_post_id = jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-input .cr-qna-new-q-form-s-b').attr("data-product");
		var cr_text = jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-q').val().trim();
		var cr_name = jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-name').val().trim();
		var cr_email = jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-email').val().trim();
		var cr_question_id = jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-input .cr-qna-new-q-form-s-b').attr("data-question");
		var cr_data = {
			"action": "cr_new_qna",
			"productID": cr_post_id,
			"currentPostID": cr_current_post_id,
			"questionID": cr_question_id,
			"text": cr_text,
			"name": cr_name,
			"email": cr_email,
			"security": cr_nonce,
			"cptcha": token
		};
		jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-input .cr-qna-new-q-form-s-b').css( 'display', 'none' );
		jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-input .cr-qna-new-q-form-s-p').css( 'display', 'inline-block' );
		jQuery.post(cr_ajax_object.ajax_url, cr_data, function(response) {
			if( 0 === response.code ) {
				jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-error').css( 'display', 'none' );
				jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-input').css( 'display', 'none' );
				jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-ok').css( 'display', 'block' );
			} else {
				if( response.description && response.description.length > 0 ) {
					jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-error p.cr-qna-new-q-form-text span.cr-qna-new-q-form-text-additional').text( response.description );
				}
				jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-ok').css( 'display', 'none' );
				jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-input').css( 'display', 'none' );
				jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-error').css( 'display', 'block' );
			}
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-q').val('');
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-q, #cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-name, #cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form .cr-qna-new-q-form-email').removeClass( 'cr-qna-new-q-form-notinit' );
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-input .cr-qna-new-q-form-s-b').css( 'display', 'inline-block' );
			jQuery('#cr_qna.cr-qna-block .cr-qna-new-q-overlay .cr-qna-new-q-form.cr-q-modal .cr-qna-new-q-form-input .cr-qna-new-q-form-s-p').css( 'display', 'none' );
		}, "json");
	}

	function cr_keyup_delay(fn, ms) {
		let timer = 0;
		return function(...args) {
			clearTimeout(timer);
			timer = setTimeout(fn.bind(this, ...args), ms || 0);
		};
	}

	function cr_filter_all_reviews( cr_data, refElement, show_more = false ) {
		if( show_more ) {
			// click on 'show more' button or filters by rating in the summary box
			jQuery(".cr-search-no-reviews").hide();
			jQuery('.cr-show-more-button').hide();
			refElement.closest( ".cr-all-reviews-shortcode" ).find( ".cr-show-more-review-spinner" ).show();

			jQuery.post(
				{
					url: cr_ajax_object.ajax_url,
					data: cr_data,
					context: refElement,
					success: function(response) {
						jQuery( this ).closest( ".cr-all-reviews-shortcode" ).find( ".cr-show-more-review-spinner" ).hide();
						if( response.html !== "" ) {
							jQuery( this ).closest( ".cr-all-reviews-shortcode" ).find(".commentlist").append(response.html);
							if( ! response.last_page ) {
								jQuery(".cr-all-reviews-shortcode .cr-show-more-button").text( response.show_more_label );
								jQuery("#cr-show-more-all-reviews").show();
							}
							jQuery("#cr-show-more-all-reviews").data( "page", response.page );
							jQuery(".cr-all-reviews-shortcode .cr-count-row .cr-count-row-count").html( response.count_row );
						} else {
							jQuery( "#cr-show-more-all-reviews" ).hide();
						}
						if( response.html == "" && response.page === 1 ){
							jQuery( this ).closest( ".cr-all-reviews-shortcode" ).find( ".cr-search-no-reviews" ).show();
						}
					},
					dataType: "json"
				}
			);
		} else {
			// click on 'search' button
			jQuery(".cr-search-no-reviews").hide();
			jQuery("#cr-show-more-all-reviews").hide();
			jQuery("#cr_all_reviews_shortcode .commentlist").hide();
			refElement.closest( ".cr-all-reviews-shortcode" ).find( ".cr-show-more-review-spinner" ).show();
			jQuery("div.ivole-summaryBox").addClass("cr-summaryBar-updating");
			jQuery(".cr-seeAllReviews").addClass("cr-seeAll-updating");
			jQuery(".cr-ajax-reviews-sort").addClass("cr-sort-updating");
			jQuery.post(
				{
					url: cr_ajax_object.ajax_url,
					data: cr_data,
					context: refElement,
					success: function(response) {
						jQuery( this ).closest( ".cr-all-reviews-shortcode" ).find( ".cr-show-more-review-spinner" ).hide();
						jQuery("div.ivole-summaryBox").removeClass("cr-summaryBar-updating");
						jQuery(".cr-seeAllReviews").removeClass("cr-seeAll-updating");
						jQuery(".cr-ajax-reviews-sort").removeClass("cr-sort-updating");
						if(response.html !== ""){
							jQuery("#cr_all_reviews_shortcode .commentlist").empty();
							jQuery("#cr_all_reviews_shortcode .commentlist").append(response.html);
							jQuery("#cr_all_reviews_shortcode .commentlist").show();
							jQuery("#cr-show-more-all-reviews").data("page",response.page);
							if( !response.last_page ){
								jQuery(".cr-all-reviews-shortcode .cr-show-more-button").text( response.show_more_label );
								jQuery("#cr-show-more-all-reviews").show();
							}
						} else {
							jQuery(".cr-search-no-reviews").show();
						}
						jQuery(".cr-all-reviews-shortcode .cr-count-row .cr-count-row-count").html( response.count_row );
					},
					dataType: "json"
				}
			);
		}
	}

	function cr_maybe_download_media_frontend() {
		jQuery(".cr-comment-image-ext,.cr-comment-video-ext").each(function() {
			let ajaxData = {
				"action": "cr_auto_download_media_frontend",
				"reviewID": jQuery(this).data("reviewid")
			}
			jQuery.post(cr_ajax_object.ajax_url, ajaxData, function(response) {
				// do nothing
			}, "json");
			return false;
		});
	}

	function cr_validate_review_form( submitBtn ) {
		const validateEmail = (email) => {
			return email.match(
				/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
		};

		let validationResult = true;

		if( 1 > submitBtn.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-rating-actv" ).length ) {
			submitBtn.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-rating" ).addClass( "cr-review-form-error" );
			validationResult = false;
		}
		if( 1 > submitBtn.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-comment-txt" ).val().trim().length ) {
			submitBtn.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-comment" ).addClass( "cr-review-form-error" );
			validationResult = false;
		}
		if( 1 > submitBtn.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-name .cr-review-form-txt" ).val().trim().length ) {
			submitBtn.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-name" ).addClass( "cr-review-form-error" );
			validationResult = false;
		}
		if( ! validateEmail( submitBtn.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-email .cr-review-form-txt" ).val().trim() ) ) {
			submitBtn.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-email" ).addClass( "cr-review-form-error" );
			validationResult = false;
		}

		return validationResult;
	}

	function cr_reset_review_form( refElement ) {
		// reset the rating bar
		refElement.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-rating-cont .cr-review-form-rating-inner" ).removeClass( "cr-review-form-rating-actv" );
		refElement.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-rating-cont .cr-review-form-rating-inner .cr-rating-act" ).hide();
		refElement.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-rating-cont .cr-review-form-rating-inner .cr-rating-deact" ).show();
		refElement.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-rating-cont .cr-review-form-rating-nbr" ).text( "0/5" );
		refElement.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-rating" ).removeClass( "cr-review-form-error" );

		// reset the comment field
		refElement.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-comment-txt" ).val('');
		refElement.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-comment" ).removeClass( "cr-review-form-error" );

		// reset the name field
		refElement.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-name .cr-review-form-txt" ).val('');
		refElement.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-name" ).removeClass( "cr-review-form-error" );

		// reset the email field
		refElement.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-email .cr-review-form-txt" ).val('');
		refElement.closest( ".cr-review-form-wrap" ).find( ".cr-review-form-email" ).removeClass( "cr-review-form-error" );
	}

})();

function crResizeAllGridItems() {
	jQuery(".cr-reviews-grid-inner").each( function() {
		if(800 > jQuery(this).width()) {
			jQuery(this).find(".cr-reviews-grid-col3").addClass("cr-reviews-grid-col-none");
		}
		if(550 > jQuery(this).width()) {
			jQuery(this).find(".cr-reviews-grid-col2").addClass("cr-reviews-grid-col-none");
		}
		jQuery(this).colcade( {
			columns: ".cr-reviews-grid-col",
			items: ".cr-review-card"
		} );
	} );
}

function crResizeTrustBadges() {
	jQuery(".cr-trustbadgef").each(function() {
		let badge = jQuery(this).find(".cr-badge").eq(0);
		let scale = jQuery(this).width() / badge.outerWidth();
		if( 1 > scale ) {
			badge.css("transform", "scale(" + scale + ")");
		}
		badge.css("visibility", "visible");
	});
}
