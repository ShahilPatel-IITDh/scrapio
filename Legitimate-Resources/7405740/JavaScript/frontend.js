/*
	Document   :  frontend
	Created on :  August, 2013
	Author     :  Andrei Dinca, AA-Team http://codecanyon.net/user/AA-Team
*/

// Initialization and events code for the app
WooZone = (function ($) {
	"use strict";
	
	var ajaxurl			= woozone_vars.ajax_url,
		lang			= woozone_vars.lang;
	var current_aff		= {};
	
	// init function, autoload
	(function init() {
		
		// load the triggers
		$(document).ready(function(){
			console.log( 'WooZone frontend script is loaded!' );

			var $current_aff = $('#WooZone_current_aff');
			if ( $current_aff.length > 0 ) {
				current_aff = $current_aff.data('current_aff');
			}

			triggers();
		});

		// synchronization on frontend
		var syncfront = syncfront_func();
		syncfront.init();
		
	})();


	//====================================================
	//== :: TRIGGERS
	function triggers() {

		checkout_email();

		load_amazon_reviews();

		fix_images();
	};


	//====================================================
	//== :: OTHERS

	//:: LOAD AMAZON REVIEWS
	function load_amazon_reviews() {
		var wrapper = $('body #amzaff-amazon-review-tab');
		wrapper.each(function(){
			var data = {
				action			: 'WooZone_frontend',
				sub_action		: 'load_amazon_reviews',
				prodid 			: wrapper.data('prodid')
			};
			//if (DEBUG) console.log( data );
				
			//loading( 'show', lang.saving );

			$.post(ajaxurl, data, function(response) {
				if ( misc.hasOwnProperty(response, 'status') ) {
					if ( 'valid' == response.status ) {
						wrapper.html( response.html );
					}
				}
				//loading( 'close' );
			}, 'json')
			.fail(function() {})
			.done(function() {})
			.always(function() {});
		});
	}

	//:: FIX IMAGES
	function fix_images() {
		// fix images on https/ssl
		setInterval( function() {
			var $imgFound = $("img[src*='ssl-images']");
			
			$imgFound.each(function(){
				var that = $(this),
					src = that.attr('src');
				
				if( src.indexOf('//') == 0 ){
					if( src.indexOf("ssl-images") != false ){
						that.attr('src', "https:" + src );
						that.attr('srcset', "https:" + that.attr('srcset'));
					}
				}
			});
		}, 1000 );
	}

	//:: custom user email collecting before redirect to amazon
	function checkout_email() {
		if ( ! $('.cart_totals').length ) return false;

		var woozone_email_wrapper 		= $('.woozone_email_wrapper'),
			  woozone_checkout_email 		= $('#woozone_checkout_email'),
			  woozone_email_mandatory 	= $('#woozone_checkout_email_required');

		// checkout email is active
  
		if( woozone_checkout_email.length > 0 ) {
			woozone_email_wrapper.insertBefore( $('.wc-proceed-to-checkout') );

			var checkout_btn = $('.wc-proceed-to-checkout .checkout-button'),
				  checkout_link = checkout_btn.attr('href');
 
			if( woozone_email_mandatory.length > 0 && woozone_email_mandatory.val() == '1' ) {
				checkout_btn.addClass('disabled');
				checkout_btn.attr('href', '#amz_checkout_email');
				//console.log( checkout_btn );
				//alert('E-mail field is mandatory!');
			}

			woozone_email_wrapper.on('keyup', woozone_checkout_email, function(e) {
				var woozone_validate_email = /([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(woozone_checkout_email.val());
						 
				 if( woozone_validate_email ) {

					if( woozone_email_mandatory.length > 0 && woozone_email_mandatory.val() == '1' ) {
						checkout_btn.removeClass('disabled');
						checkout_btn.attr('href', checkout_link);
					 }

					 woozone_checkout_email.css({'border': '1px solid #d1d1d1'});

				 } else {

					if( woozone_email_mandatory.length > 0 && woozone_email_mandatory.val() == '1' ) {
						checkout_btn.addClass('disabled');
						checkout_btn.attr('href', '#amz_checkout_email');
					}

					woozone_checkout_email.css({'border': '1px solid red'});

				}
			});
		}

		$('.wc-proceed-to-checkout').on('click', '.checkout-button', function(e) {
			// checkout email is active
			if ( woozone_checkout_email.length > 0 ) {
				if( woozone_email_mandatory.length > 0 && woozone_email_mandatory.val() == '1' ) {
					if ( $(this).hasClass('disabled') ) {
						e.preventDefault();
						return false;
					}
				}

				if ( ! country_shop_checkout.allow_checkout() ) {
					//console.log( 'checkout: You must check or cancel all amazon shops!' );
					country_shop_checkout.set_msg_html( false, lang.amzcart_cancel_msg );
					return false;
				}
				else {
					//console.log( 'checkout: all good.' );
					country_shop_checkout.set_msg_html( true, lang.amzcart_checkout_msg );
				}
				//return false; // uncomment to debug

				if ( woozone_checkout_email.val() != '' ) {
					jQuery.post(woozone_vars.ajax_url, 
					{
						'action': 'WooZone_before_user_checkout',
						'_nonce': $('#woozone_checkout_email_nonce').val(),
						'email': woozone_checkout_email.val()
					}, function(data, textStatus) {
						if ( (textStatus === 'success') || (textStatus === 'email_exists') ) {
							//window.location.href = woozone_vars.checkout_url;
							$(this).prop('href', woozone_vars.checkout_url); // to be sure it does the action!
						} else {
							alert( textStatus );
						}
					});
				}
			}
			// checkout email is NOT active
			else {
				if ( ! country_shop_checkout.allow_checkout() ) {
					//console.log( 'checkout: You must check or cancel all amazon shops!' );
					country_shop_checkout.set_msg_html( false, lang.amzcart_cancel_msg );
					return false;
				}
				else {
					//console.log( 'checkout: all good.' );
					country_shop_checkout.set_msg_html( true, lang.amzcart_checkout_msg );
				}
				//return false; // uncomment to debug
				
				// update feb 2017
				// no need to do anything, as the current button action will go to checkout and do the reload itself
				$(this).prop('href', woozone_vars.checkout_url); // to be sure it does the action!

				// dageorge: i've commented this as I don't know why an ajax request is needed when email checkout is not active! (feedback from a client)
				//jQuery.post(woozone_vars.ajax_url, 
				//{
				//	'action': 'WooZone_before_user_checkout',
				//}, function(data, textStatus) {
				//	if ( (textStatus === 'success') ) {
				//		window.location.href = woozone_vars.checkout_url;
				//	}
				//});
				
			}
		});
	};
	
	//:: open popup
	function popup(url, title, params) {
		//url = 'http://www.amazon' + current_aff['user_country']['website'] + url;
		window.open(url, title, params);
	};


	//====================================================
	//== :: PRODUCT COUNTRY AVAILABILITY
	var product_country_check = (function() {
		
		var DISABLED				= false; // disable this module!
		var DEBUG					= true;
		var maincontainer			= null,
			mainloader				= null,
			product_data			= {},
			current_country			= {},
			available_countries 	= [],
			main_aff_id				= '',
			aff_ids					= [],
			cc_template 			= null,
			us_li 					= null,
			verify_interval			= 300, // verify requests: interval in miliseconds
			verify_max_steps		= 15, // verify requests: maximum number of steps
			updated_countries = false;
			  

		// Test!
		function __() { console.log('__ method'); };
		
		// get public vars
		function get_vars() {
			return $.extend( {}, {
			} );
		};
		
		// init function, autoload
		(function init() {
			
			if ( DISABLED ) return false;

			// load the triggers
			$(document).ready(function(){
				maincontainer = $(".WooZone-country-check:first");
				mainloader	  = maincontainer.find('.WooZone-country-loader');
				//console.log( 'box country maincontainer', maincontainer );

				// main box
				build_main_box();

				// small box on minicart
				build_box_minicart();
				
				triggers();
			});
		})();
		
		// triggers
		function triggers() {
			maincontainer.on('click', 'li .WooZone-cc_checkbox input[type="radio"]', function (e) {
				if (DEBUG) console.log( 'clicked', $(this) );
				//save_countries();
				save_product_country( $(this).parents('li:first').data('country') );
			});
		};
		
		function build_box_minicart() {
			var newel 	  		= null,
				  tpl				= $('#WooZone-cc-small-template'),
				  minicart		= $('div.kd_small-cart .cart-details ul.kd_small_cart_items'),
				  //minicart		= $('div.widget_shopping_cart_content .cart-details ul.kd_small_cart_items'),
				  is_kingdom = minicart.length; // theme: kingdom

			var cached = $('.WooZone-cc-small-cached').html();
			//cached = JSON.stringify(cached);
			cached = typeof cached != 'undefined'
				? JSON && JSON.parse(cached) || $.parseJSON(cached) : cached;
			if (DEBUG) console.log( 'cached', cached );

			if ( ! tpl.length ) return false;
			if ( ! is_kingdom || ! cached.length ) return false;
 
			$.each(cached, function(index, value) {
				//console.log( index, value );
				var current = minicart.find('li').filter(function(i) {
					return value['cart_item_key'] == $(this).data('prodid');
				});
 
				var __ = $( tpl.html() ).clone();
				__.find(".WooZone-cc_domain").addClass( value.product_country.replace(".", "-") ).prop('title', value.country_name);
				__.find(".WooZone-cc_status").addClass( value.country_status_css ).prop('title', value.country_status_text);

				//console.log( current.find('.kd_cart_item-details'), __ ); 
				current.find('.kd_cart_item-details').append( __ );
			});
		};

		function build_main_box( pms ) {
			var pms = pms || {};
			var do_position = misc.hasOwnProperty(pms, 'do_position') ? pms.do_position : false;

			if ( ! maincontainer.length ) {
				if (DEBUG) console.log( '!!! ERROR: main box container not found!', maincontainer );
				return false;
			}

			var _product_data = maincontainer.find('.WooZone-product-data').html();
			//_product_data = JSON.stringify(_product_data);
			_product_data = typeof _product_data != 'undefined'
				? JSON && JSON.parse(_product_data) || $.parseJSON(_product_data) : _product_data;

			// var product_pms = {
			// 	'id'					: maincontainer.data('prodid'),
			// 	'asin'				: maincontainer.data('asin'),
			// 	'country'			: maincontainer.data('prodcountry'),
			// 	'boxpos'			: maincontainer.data('boxpos'),
			// 	'do_update'		: maincontainer.data('do_update')
			// };
			var product_pms = {
				'id'					: _product_data.prodid,
				'asin'				: _product_data.asin,
				'country'			: _product_data.prodcountry,
				'boxpos'			: _product_data.boxpos,
				'do_update'		: _product_data.do_update
			};
			setTimeout( function() {
				loading( 'show', lang.loading );
				maincontainer.show();

				if (do_position) {
					position_box( product_pms );
				}

				var _update = function() {
					if (updated_countries) {
						if (DEBUG) console.log( 'countries: already updated!' );
						return true;
					}
					if (product_data['do_update']) {
						if (DEBUG) console.log( 'countries: updating...' );
						update_countries();
						return true;
					}
					if (DEBUG) console.log( 'countries: no need to update!' );
				}

				set_product_data( product_pms );
				build_countries_list();
				if (DEBUG) console.log( product_data, available_countries );

				load_template();
				//make_requests();
				build_countries_elements( _update );

			}, 0);
		}

		// position product box
		function position_box( pms ) {
			var newel 	  		= null,
				is_bravo = $('body.bravostore-body div.product#product-' + pms.id + ' form.cart').length, // theme: kingdom
				is_kingdom = $('div.product#product-' + pms.id + ' > div.row:first .kd_description').length; // theme: kingdom

			if ( 'before_add_to_cart' == pms.boxpos ) {
				// theme: kingdom
				if ( is_kingdom ) {
					newel = $('div.product#product-' + pms.id + ' > div.row:first .kd_description .cart');
				}
				
				if ( is_bravo ) {
					newel = $('div.product#product-' + pms.id + ' form.cart');
				}
				
				maincontainer.insertBefore( newel ).show();
				
			}
			else if ( 'before_title_and_thumb' == pms.boxpos ) {
				newel = $('div.product#product-' + pms.id);
				if ( newel.length )
					maincontainer.prependTo( newel ).show();
				else {
					// theme: kingdom
					if ( is_kingdom ) {
						newel = $('div.product#product-' + pms.id + ' > div.row:first');
						maincontainer.insertBefore( newel ).show();
					}
				}
			}
			else if ( 'before_woocommerce_tabs' == pms.boxpos ) {
				newel = $('div.product#product-' + pms.id + ' div.woocommerce-tabs.wc-tabs-wrapper');
				if ( newel.length )
					maincontainer.insertBefore( newel ).addClass('WooZone-boxpos-before_woocommerce_tabs').show();
				else {
					// theme: kingdom
					if ( is_kingdom ) {
						newel = $('div.product#product-' + pms.id + ' > div.row:first');
						maincontainer.insertAfter( newel ).show();
					}
				}
			}
		};
		
		// add country to countries list
		function add_country( new_country, where ) {
			var where = where || 'available';
			
			if ( 'available' == where ) {
				available_countries.push( new_country );
			}
		};
	
		// per country template - ul.li (to build the final box with all available countries)
		function load_template() {

			cc_template = maincontainer.find("#WooZone-cc-template").html();
		};
	
		// set product data
		function set_product_data( pms ) {

			product_data = pms;
		};

		// build countries list
		function build_countries_list() {
			available_countries 	= [];

			// aff ids json parse
			var cached_aff_ids = maincontainer.find('.WooZone-country-affid').html();
			//cached_aff_ids = JSON.stringify(cached_aff_ids);
			cached_aff_ids = typeof cached_aff_ids != 'undefined'
				? JSON && JSON.parse(cached_aff_ids) || $.parseJSON(cached_aff_ids) : cached_aff_ids;
			//if (DEBUG) console.log( cached_aff_ids );
			if ( cached_aff_ids && misc.hasOwnProperty(cached_aff_ids, 'main_aff_id') )
				main_aff_id = cached_aff_ids.main_aff_id;
			if ( cached_aff_ids && misc.hasOwnProperty(cached_aff_ids, 'aff_ids') )
				aff_ids = cached_aff_ids.aff_ids;

			// countries json parse
			var cached_countries = maincontainer.find('.WooZone-country-cached').html();
			//cached_countries = JSON.stringify(cached_countries);
			cached_countries = typeof cached_countries != 'undefined'
				? JSON && JSON.parse(cached_countries) || $.parseJSON(cached_countries) : cached_countries;
			//if (DEBUG) console.log( cached_countries );
			
			$.each( cached_countries, function( index, value ){
				var __ = {
					'domain'		: value.domain,
					'name'			: value.name
				};
				if ( misc.hasOwnProperty( value, 'available' ) ) {
					__['available'] = value.available;
				}
				add_country( __ );
			});
			return false;
		};

		function build_countries_elements( callback ) {

			var cc = 0;
			$.each( available_countries, function( key, value ) {
				//if ( cc >= 10 ) { return false; }
				var __ = $(cc_template).clone();

				__.data('country', value.domain);
				__.find(".WooZone-cc_domain").addClass( value.domain.replace(".", "-") ).prop('title', value.name);
				__.find(".WooZone-cc_name > a").text( value.name ).attr('href', build_product_link( value.domain, product_data['asin'], true ));
				
				var _countryflag_aslink = __.find(".WooZone-cc_domain > a");
				if ( _countryflag_aslink.length ) { // add link to country flag
					_countryflag_aslink.attr('href', build_product_link( value.domain, product_data['asin'], true ));
				}
				
				// default country
				if ( value.domain == product_data['country'] ) {
					__.find('.WooZone-cc_checkbox input[type=radio]').prop('checked', true);
					current_country['elm'] = __.find('.WooZone-cc_checkbox input[type=radio]');
					current_country['country'] = value.domain;
				}

				maincontainer.append( __ );
				//console.log( value ); return true;

				// cached
				if ( misc.hasOwnProperty( value, 'available' ) ) {
					add_country_status_html( __, value.available );
				}

				cc++;

			});
			
			setTimeout( function() {
				loading( 'close' );
				if ( $.isFunction( callback ) ) {
					callback();
				}
			}, 0);
		};

		/*
		function async_product_exist( data ) {
			console.log( 'data', data );
			console.log( 'data.NumRecords', data.NumRecords );
			var __ = data.NumRecords == 0 ? 0 : 1;
			add_country_status_html( us_li, __ );
			add_country_status( 'com', __ );
		}
		
		// product exists on amazon shops
		function product_exist( elm, domain ) {

			if ( domain === 'com' ) {
				us_li = elm;

				//console.log( product_data );

				// search api url 
				var search_api_url = 'https://ws-na.amazon-adsystem.com/widgets/q?TemplateId=PubStudio&ServiceVersion=20070822&MarketPlace=US&Operation=ItemSearch&InstanceId=5affe5b46c317&dataType=jsonp&Keywords=' + ( product_data['asin'] ) + '&SearchIndex=All&multipageStart=0&multipageCount=9&callback=check_product_asin&_=1526719917078';
				console.log('search_api_url', search_api_url); return false;

				$.ajax({
				    url: search_api_url,
				    jsonp: "check_product_asin",
				    dataType: "jsonp"
				})
				.fail(function() {})
				.done(function() {})
				.always(function() {});
			}
			else {
				var jqxhr = $.ajax({
					crossDomain: true,
					type:"GET",
					processData: false,
					contentType: "application/json; charset=utf-8",
					async: true,
					converters: {
						"* text": window.String,
						"text html": true,
						"text json": true,
						"text xml": jQuery.parseXML
					},
					url: build_product_link( domain, product_data['asin'] ),
					data: {},
					dataType: "jsonp",
					jsonp: false,
					complete: function (XMLHttpRequest, textStatus) {
						if (DEBUG) console.log( 'product_exist function', XMLHttpRequest, textStatus );
						if ( 404 == XMLHttpRequest.status ) {
							add_country_status_html( elm, 0 );
							add_country_status( domain, 0 );
						} else {
							add_country_status_html( elm, 1 );
							add_country_status( domain, 1 );
						}
					}
				})
			}
		};

		// make requests to amazon shops
		function make_requests() {
			var pending = 0;

			$.each( available_countries, function( key, value ) {
				var __ = $(cc_template).clone();

				__.data('country', value.domain);
				__.find(".WooZone-cc_domain").addClass( value.domain.replace(".", "-") ).prop('title', value.name);
				__.find(".WooZone-cc_name > a").text( value.name ).attr('href', build_product_link( value.domain, product_data['asin'], true ));
				
				var _countryflag_aslink = __.find(".WooZone-cc_domain > a");
				if ( _countryflag_aslink.length ) { // add link to country flag
					_countryflag_aslink.attr('href', build_product_link( value.domain, product_data['asin'], true ));
				}
				
				// default country
				if ( value.domain == product_data['country'] ) {
					__.find('.WooZone-cc_checkbox input[type=radio]').prop('checked', true);
					current_country['elm'] = __.find('.WooZone-cc_checkbox input[type=radio]');
					current_country['country'] = value.domain;
				}

				maincontainer.append( __ );

				//console.log( value ); return true;

				// cached
				if ( misc.hasOwnProperty( value, 'available' ) ) {
					add_country_status_html( __, value.available );
				}
				else {
					pending++;
					product_exist( __, value.domain );					
				}
			} );

			// verify all product amazon country verify requests are finished
			if ( pending ) {
				verify_requests();
			}
		};
		
		// verify status of requests to amazon shops
		function verify_requests() {
			var timer 		= null,
				  contor		= 0;

			function _verify() {
				var pending = 0,
					  is_done = contor >= verify_max_steps;

				$.each( available_countries, function( key, value ) {
					if ( ! misc.hasOwnProperty( value, 'available' ) )
						pending++;
				} );
				//if (DEBUG) console.log( contor, pending );

				if ( ! pending || is_done ) {
					clearTimeout( timer );
					timer = null;

					if ( pending && is_done ) {
						$.each( available_countries, function( key, value ) {
							if ( ! misc.hasOwnProperty( value, 'available' ) ) {
								var $current = maincontainer.find('li').filter(function(i) {
									return $(this).data('country') == value.domain;
								});

								add_country_status_html( $current, 0 );
								add_country_status( value.domain, 0 );
							}
						} );
					}

					save_countries();

					return false;
				}

				contor++;
				
				timer = setTimeout( function() {
					_verify();
				}, verify_interval );
			};

			timer = setTimeout( function() {
				_verify();
			}, verify_interval );
		};

		// add country status: available or not
		function add_country_status( country, status ) {
			var index = get_available_country_index( country );
			if ( index <= -1 ) return false;
			available_countries[ index ]['available'] = status;
			//console.log( country, index, status, available_countries );
			return true;
		};
		
		// get available country index from array of 'available_countries' based on country domain
		function get_available_country_index( country ) {
			var index = -1;
			$.each( available_countries, function( key, value ) {
				if ( country == value.domain ) {
					index = key;
					return false;
				}
			} );
			return index;
		};

		// save countries per product
		function save_countries() {
			var countries = JSON.stringify( available_countries );
			var data = {
				action					: 'WooZone_frontend',
				sub_action			: 'save_countries',
				product_id			: product_data['id'],
				product_country	: current_country['country'],
				countries				: countries
			};
			if (DEBUG) console.log( data );
			
			loading( 'show', lang.saving );
			$.post(ajaxurl, data, function(response) {

				if ( misc.hasOwnProperty(response, 'status') ) {}
				loading( 'close' );
			}, 'json')
			.fail(function() {})
			.done(function() {})
			.always(function() {});
		};
		*/

		function update_countries() {
			var countries = JSON.stringify( available_countries );
			var data = {
				action					: 'WooZone_frontend',
				sub_action			: 'update_countries',
				product_id			: product_data['id'],
				asin 						: product_data['asin'],
				product_country	: current_country['country']
			};
			if (DEBUG) console.log( data );
			
			loading( 'show', lang.updating );
			$.post(ajaxurl, data, function(response) {

				if ( misc.hasOwnProperty(response, 'status') ) {}
				if (DEBUG) console.log( 'countries: ajax update done!' );
				//if (DEBUG) console.log( response.html );
				loading( 'close' );
				maincontainer.html( response.html );
				mainloader = maincontainer.find('.WooZone-country-loader');
				build_main_box({ do_position: false });

			}, 'json')
			.fail(function() {})
			.done(function() {})
			.always(function() { updated_countries = true; });
		};

		// save countries per product
		function save_product_country( country ) {
			var data = {
				action					: 'WooZone_frontend',
				sub_action			: 'save_product_country',
				product_id				: product_data['id'],
				product_country	: country || current_country['country']
			};
			if (DEBUG) console.log( data );
			
			loading( 'show', lang.saving );
			$.post(ajaxurl, data, function(response) {

				if ( misc.hasOwnProperty(response, 'status') ) {}
				loading( 'close' );
			}, 'json')
			.fail(function() {})
			.done(function() {})
			.always(function() {});
		};

		function add_country_status_html( elm, status ) {
			//console.log( elm, status );
			if ( status ) {
				if (DEBUG) console.log( elm.data('country') , "product valid" );
				elm.find(".WooZone-cc-status").html( "<span class='WooZone-status-available'>" + lang.available_yes + "</span" );
			} else {
				if (DEBUG) console.log( elm.data('country') , "product not found" );
				elm.find(".WooZone-cc-status").html( "<span class='WooZone-status-unavailable'>" + lang.available_no + "</span" );
			}
		};

		// build product link for amazon country shop
		function build_product_link( domain, asin, add_tag ) {
			var addtag 	= add_tag || false,
				  link 			=  "https://www.amazon." + ( domain ) + "/dp/" + asin;
			
			if ( addtag )
				link += '/?tag=' + get_aff_id( domain );
			//console.log( domain, asin, link );
			return link;
		};
		
		function get_aff_id( country ) {
			var aff_id = main_aff_id;

			$.each(aff_ids, function( index, value ) {
				if ( value.country == country ) {
					aff_id = value.aff_id;
					return false;
				}
			});
			return aff_id;
		};
		
		// Loading
		function loading( status, msg ) {
			var msg = msg || '';

			if ( '' == msg && 'show' == status )
				msg = lang.loading;

			if ( '' != msg )
				mainloader.find('.WooZone-country-loader-text').html( msg );

			if ( 'show' == status )
				mainloader.fadeIn('fast');
			else
				mainloader.fadeOut('fast');
		};

		// external usage
		return {
			// attributes
			'v'               : get_vars,
			
			// methods
			'__'              : __
			//,'add_country'			: add_country
			//,'make_requests'		: make_requests
			//,'set_product_data'	: set_product_data
			//,'async_product_exist': async_product_exist
		};
	})();
	
	
	//====================================================
	//== :: AMAZON SHOPS CHECKOUT ON CART PAGE
	var country_shop_checkout = (function() {
		
		var DISABLED				= false; // disable this module!
		var DEBUG					= false;
		var maincontainer			= null,
			shops					= [],
			shops_status			= {
				'success'		: [],
				'cancel'		: []
			};
			  

		// Test!
		function __() { console.log('__ method'); };
		
		// get public vars
		function get_vars() {
			return $.extend( {}, {
			} );
		};
		
		// init function, autoload
		(function init() {
			
			if ( DISABLED ) return false;

			// load the triggers
			$(document).ready(function(){
				maincontainer = $(".WooZone-cart-checkout");

				// main box
				if ( maincontainer.length ) {
					maincontainer.find('ul li').each(function(index, value) {
						var $this 		= $(this),
							  country	= $this.data('domain');

						shops.push( country );
					});
					if (DEBUG) console.log( shops ); 	
				}

				triggers();
			});
		})();
		
		// triggers
		function triggers() {
			// checkout form
			maincontainer.on('submit', 'li .WooZone-cc_checkout form', function (e) {
				e.preventDefault();
				if (DEBUG) console.log( 'form to submit!' );
				
				var form 			= this,
					  $form			= $(form),
					  $li 				= $form.parents('li:first'),
					  country 		= $li.data('domain');

				//console.log( form, $form );
				if ( $.inArray( country, shops_status.success) <= -1 && $.inArray( country, shops_status.cancel) <= -1 )
					shops_status.success.push( country );
				//console.log( shops_status );
				set_status_html( $li, 1 );

				form.submit();

				return true;
			});

			// cancel
			maincontainer.on('click', 'li .WooZone-cc_checkout input[type="button"].cancel', function (e) {
				e.preventDefault();
				if (DEBUG) console.log( 'form canceled!' );
				
				var $form 		= $(this).parents('form:first'),
					  $li 				= $form.parents('li:first'),
					  country 		= $li.data('domain');
 
				//console.log( $form );
				if ( $.inArray( country, shops_status.success) <= -1 && $.inArray( country, shops_status.cancel) <= -1 )
					shops_status.cancel.push( country );
				//console.log( shops_status );
				set_status_html( $li, 0 );

				return true;
			});
		};
		
		function allow_checkout() {
			var __ = [].concat( shops_status.success, shops_status.cancel );
			if (DEBUG) console.log( __, __.length == shops.length );
			return __.length == shops.length;
		};
		
		function set_status_html( elm, status ) {
			var text 			= status ? lang.amzcart_checkout : lang.amzcart_cancel,
				  css_class 	= status ? 'success' : 'cancel';
			elm.find('.WooZone-cc_status').removeClass('success cancel').addClass( css_class ).text( text );
		};
		
		function set_msg_html( status, text ) {
			var elm 			= maincontainer.find('.WooZone-cart-msg'),
				  css_class 	= status ? 'success' : 'cancel';
			//elm.prepend( $('<div />').removeClass('success cancel').addClass( css_class ).text( text ) );
			var __ = $('<div />').removeClass('success cancel').addClass( css_class ).text( text );
			elm.html( __ );
		};
		
		// external usage
		return {
			// attributes
			'v'                     			: get_vars,
			
			// methods
			'__'                    			: __,
			'allow_checkout'			: allow_checkout,
			'set_msg_html'				: set_msg_html
		};
	})();


	//====================================================
	//== :: CROSS SELL BOX
	var cross_sell_box = (function() {
		
		var DISABLED				= false; // disable this module!
		var DEBUG					= false;
		var maincontainer			= null,
			mainloader				= null,
			multiple_asins 			= [];
			  

		// Test!
		function __() { console.log('__ method'); };
		
		// get public vars
		function get_vars() {
			return $.extend( {}, {
			} );
		};
		
		// init function, autoload
		(function init() {
			
			if ( DISABLED ) return false;

			// load the triggers
			$(document).ready(function(){
				maincontainer = $("body");
				mainloader	  = maincontainer.find('.WooZone-cross-sell-loader');

				triggers();

				if ( maincontainer.find('.main-cross-sell').length ) {
					load_box();
				}
			});
		})();
		
		// load box
		function load_box() {
			var box 	= maincontainer.find('.main-cross-sell'),
				  asin	= maincontainer.find('.main-cross-sell').data('asin'),
				  boxd 	= maincontainer.find('#WooZone-cross-sell-debug');

			var data = {
				action					: 'WooZone_frontend',
				sub_action			: 'load_cross_sell',
				asin						: asin
			};
			if (DEBUG) console.log( data );

			if ( boxd.length ) {
				boxd.html( 'Loading Ajax : make amazon request to retrieve products ...' ); boxd.show();
			}

			loading( 'show', lang.load_cross_sell_box );

			$.post(ajaxurl, data, function(response) {

				if ( misc.hasOwnProperty(response, 'status') ) {
					box.html( response.html ).css({
						'min-height' : 'initial'
					});
					if ( boxd.length ) {
						boxd.html( response.debug ); boxd.show();
					}
				}
				loading( 'close' );
			}, 'json')
			.fail(function() {})
			.done(function() {})
			.always(function() {});
		};
		
		// empty cache
		function empty_cache( that ) {
			var box 	= maincontainer.find('.main-cross-sell'),
				  asin	= maincontainer.find('.main-cross-sell').data('asin'),
				  boxd 	= maincontainer.find('#WooZone-cross-sell-debug');
				  
			var data = {
				action				: 'WooZone_frontend',
				sub_action			: 'cross_sell_empty_cache',
				asin				: asin
			};
			if (DEBUG) console.log( data );

			that.prop('disabled', true).after( lang.saving );

			$.post(ajaxurl, data, function(response) {

				if ( misc.hasOwnProperty(response, 'status') ) {
					window.location.reload();
				}
				loading( 'close' );
			}, 'json')
			.fail(function() {})
			.done(function() {})
			.always(function() {});
		};
		
		// triggers
		function triggers() {

			// debug mode
			$("body").on("click", '#WooZone-cross-sell-debug button', function(e) {
				empty_cache( $(this) );
			});

			// selection checkboxes
			$("body").on("change", '.cross-sell input', function(e) {
				var that				= $(this),
					row				= that.parents('li').eq(0),
					asin				= that.val(),
					the_thumb	= $('#cross-sell-thumb-' + asin).parents('li'),
					buy_block		= $('div.cross-sell-buy-btn');

				var price_dec_sep = $('.cross-sell .cross-sell-price-sep').data('price_dec_sep');

				buy_block.fadeOut('fast');
				if( that.is(':checked') ){
					row.attr('class', '');
					the_thumb.fadeIn('fast');
				}
				else{
					row.attr('class', '');
					row.addClass('cross-sale-uncheck');

					the_thumb.fadeOut('fast');
				}

				var _total_price 		= 0,
					  remaining_items	= 0;

				$(".cross-sell ul.cross-sell-items li:not(.cross-sale-uncheck)").each(function(){
					var that    = $(this);
					var price   = that.find('.cross-sell-item-price').data('item_price'); //that.find('.cross-sell-item-price').text().replace(/[^-\d\.,]/g, '')

					_total_price = _total_price + parseFloat(price);

					remaining_items++;
				});

				if ( _total_price > 0 ) {
					_total_price = _total_price.toFixed(2);
					if ( ',' == price_dec_sep ) {
						_total_price = numberFormat( _total_price );
					}
					$("#feq-products").show();
					var curr_price = $("#cross-sell-buying-price").text().match(/[\d.,]+/);
					$("#cross-sell-buying-price").text( $("#cross-sell-buying-price").text().replace(curr_price, _total_price) );
				}
				else{
					$("#feq-products").fadeOut('fast');
					var curr_price = $("#cross-sell-buying-price").text().match(/[\d.,]+/);
					$("#cross-sell-buying-price").text( $("#cross-sell-buying-price").text().replace(curr_price, _total_price) );
				}

				buy_block.fadeIn('fast');
			});

			// add to cart / checkout button
			$("body").on("click", '.cross-sell a#cross-sell-add-to-cart', function(e) {
				e.preventDefault();

				var that = $(this);

				// get all selected products
				var totals_checked  = $(".cross-sell ul.cross-sell-items li:not(.cross-sale-uncheck)").size();
				$(".cross-sell ul.cross-sell-items li:not(.cross-sale-uncheck)").each(function() {
					var that		= $(this),
						  q			= 1,
						  asin		= that.find('input').val();

					multiple_asins.push(asin);
				});

				if( totals_checked > 0 ){
					var newurl = that.attr('href') + '?amz_cross_sell=yes&asins=' + multiple_asins.join(',');

					// window.location.href seems to have inconstant behavior in some browsers & also window.location directly not working in versions of IE
					// didn't work in my chrome/jimmy
					//window.location = newurl;

					$(location).attr('href', newurl);
				}
			});
		};
		
		// Loading
		function loading( status, msg ) {
			var msg = msg || '';

			if ( '' == msg && 'show' == status )
				msg = lang.loading;

			if ( '' != msg )
				mainloader.find('.WooZone-cross-sell-loader-text').html( msg );

			if ( 'show' == status )
				mainloader.fadeIn('fast');
			else
				mainloader.fadeOut('fast');
		};

		function numberWithCommas(number) {
			var parts = number.toString().split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		};

		function numberFormat(number) {
			var formatted_number = number.replace(',', '###');
				formatted_number = formatted_number.replace('.', ',');
				formatted_number = formatted_number.replace('###', '.');
				
			return formatted_number;
		};

		// external usage
		return {
			// attributes
			'v'                     		: get_vars,

			// methods
			'__'                    		: __
		};
	})();


	//====================================================
	//== :: SYNCHRONIZATION ON FRONTEND
	function syncfront_func() {
		
		var DISABLED				= false; // disable this module!
		var DEBUG					= false;
		var maincontainer			= null,
			mod_alias 				= 'syncfront/ ',
			sync_wrapper			= '#WooZone-syncfront-wrapper',
			sync_content 			= '#WooZone-syncfront-content',
			sync_debug 				= '#WooZone-syncfront-debug',
			is_page_product 		= false,
			sync_params 			= {},
			timer 					= null;

		// init function, autoload
		function init() {

			if ( DISABLED ) return false;

			// load the triggers
			$(document).ready(function(){
				maincontainer = $("body");

				// is this a product page?
				if ( $(sync_wrapper).length ) {
					is_page_product = true;
				}

				// not a product page!
				if ( ! is_page_product ) {
					return false;
				}

				sync_params = get_sync_params();

				timer = dotimer();

				triggers();
			});
		};

		// triggers
		function triggers() {
			if (DEBUG) {
				//$(sync_wrapper).show();
				//$(sync_debug).show();
				console.log( mod_alias, 'is product page: ' + is_page_product );
			}

			//:: yes, do refresh timer
			maincontainer.on('click', '#WooZone-syncfront-content .WooZone-syncfront-action-refresh-yes', function (e) {
				e.preventDefault();

				timer.stop();
				window.location.reload();
			});

			//:: no, don't refresh timer
			maincontainer.on('click', '#WooZone-syncfront-content .WooZone-syncfront-action-refresh-no', function (e) {
				e.preventDefault();

				timer.stop();
				$(sync_wrapper).hide();
			});

			//:: last sync status info
			//set_operation_product_info();
			set_operation_time();

			//:: do ajax sync
			if ( 'yes' == sync_params.do_ajax ) {
				do_sync();
			}
			else {
				set_operation_msg( sync_params.do_msg );
			}
		};

		function get_sync_params() {
			// get params
			var _params = $(sync_wrapper).find('.WooZone-syncfront-params').html();
			//_params = JSON.stringify(_params);
			_params = typeof _params != 'undefined'
				? JSON && JSON.parse(_params) || $.parseJSON(_params) : _params;
			if (DEBUG) console.log( mod_alias, 'params', _params );

			return _params;
		};

		// load box
		function do_sync() {
			var time_start 	= new Date().getTime(),
				time_end 	= null,
				duration 	= null;

			set_operation_msg( 'STARTING AJAX TO SYNC PRODUCT...' );

			var data = {
				'action'		: 'WooZone_frontend',
				'sub_action'	: 'do_sync',
				'asin' 			: sync_params.asin,
				'product_id'	: sync_params.product_id,
				'product_type' 	: sync_params.product_type
			};
			//if (DEBUG) console.log( data );

			$.post(ajaxurl, data, function(response) {

				if ( misc.hasOwnProperty(response, 'status') ) {

					set_operation_msg( response.html );

					// main wrapper
					if ( 'yes' == response.do_refresh ) {
					//if (1) { //DEBUG
						$(sync_wrapper).show();
						timer.start();
					}

					set_operation_msg( 'FINISHED AJAX TO SYNC PRODUCT!' );
					if ( misc.hasOwnProperty(response, 'html_aftersync') ) {
						if ( $(sync_debug).length && '' != response.html_aftersync ) {
							$(sync_debug).find('table tbody').prepend( response.html_aftersync );
							set_operation_time();
						}
					}

					time_end = new Date().getTime();
					duration = ( time_end - time_start ) / 1000;
					set_operation_msg( 'AJAX SYNC DURATION: {duration} seconds'.replace('{duration}', duration) );
				}

			}, 'json')
			.fail(function() {})
			.done(function() {})
			.always(function() {});
		};

		function dotimer() {
			var _timer 		= null,
				$remained 	= $(sync_content).find('h3 span'),
				remained 	= typeof $remained !== null && $remained.length ? $remained.text() : 15;
			//console.log( 'remained = ', remained, typeof $remained, $remained );

			function start() {
				//console.log( $remained, remained  );
				
				function doit() {
					_timer = setTimeout( function() {

						//console.log( _timer, remained  );

						if ( remained ) {
							remained--;
							$remained.html( remained );
							doit();
						}
						else {
							stop();
							window.location.reload();
						}

					}, 1000 );
				}
				doit();
			}

			function stop() {
				clearTimeout( _timer );
				_timer = null;
			}

			return {
				'start' : start,
				'stop' 	: stop
			}
		};

		function set_operation_msg( msg, where ) {
			var where = where || 'prepend',
				opmsg = [];

			if ( ! $(sync_debug).length ) {
				return false;
			}

			opmsg.push( '<tr>' );
			opmsg.push( 	'<td>' + (new Date).toTimeString().slice(0,8) + '</td>' );
			opmsg.push(		'<td>' + msg + '</td>' );
			opmsg.push(	'</tr>' );
			opmsg = opmsg.join('');

			if ( 'prepend' == where ) {
				$(sync_debug).find('table tbody').prepend( opmsg );
			}
			else {
				$(sync_debug).find('table tbody').append( opmsg );
			}
			$(sync_debug).show();

			return opmsg;
		}

		function set_operation_time() {
			if ( ! $(sync_debug).length ) {
				return false;
			}

			var rows_upd = $(sync_debug).find('table tbody tr.wzsync-update-time');
			rows_upd.find('td:first').html( (new Date).toTimeString().slice(0,8) );
			rows_upd.removeClass('wzsync-update-time');
		}

		function set_operation_product_info() {
			//var prodinfo = [];
			//prodinfo.push( 'product #ID: ' + sync_params.product_id );
			//prodinfo.push( 'product asin: ' + sync_params.asin );
			//prodinfo.push( 'product type: ' + sync_params.product_type );
			//set_operation_msg( prodinfo.join('<br />'), 'append' );
		}
		
		// external usage
		return {
			'init' : init
		};
	};
		
		
	//====================================================
	//== :: UTILS



	//====================================================
	//== :: MISC
	var misc = {
	
		hasOwnProperty: function(obj, prop) {
			var proto = obj.__proto__ || obj.constructor.prototype;
			return (prop in obj) &&
			(!(prop in proto) || proto[prop] !== obj[prop]);
		}
	};

	/*function async_product_exist( data )
	{
		product_country_check.async_product_exist( data );
	}*/

	// external usage
	return {
		'popup'				: popup
		//'async_product_exist': async_product_exist
	}
})(jQuery);

/*function check_product_asin( data )
{
	WooZone.async_product_exist( data );
}*/