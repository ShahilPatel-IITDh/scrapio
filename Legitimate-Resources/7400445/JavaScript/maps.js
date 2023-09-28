
(function($) {

	"use strict";
	var Map = {

		init: function() {
			//Map
			this.map();
		},
		map: function(){
			$('.grve-map').each( function() {
				var map = $(this),
					gmapLat = map.attr('data-lat'),
					gmapLng = map.attr('data-lng'),
					draggable = isMobile.any() ? false : true;

				var gmapZoom = parseInt( map.attr('data-zoom') ) ? parseInt( map.attr('data-zoom') ) : 14;
				var gmapSinglePopup = map.attr('data-single-popup') ? map.attr('data-single-popup') : 'no';
				var gmapClustering = map.attr('data-clustering') ? map.attr('data-clustering') : 'no';
				var gmapLatlng = new google.maps.LatLng( gmapLat, gmapLng );
				var gmapHueEnabled = parseInt(grve_maps_data.hue_enabled);

				var styles = [];
				if ( 1 == gmapHueEnabled ) {
					styles = [
					  {
						stylers: [
						  { hue: grve_maps_data.hue },
						  { saturation: grve_maps_data.saturation },
						  { lightness: grve_maps_data.lightness },
						  { gamma: grve_maps_data.gamma }
						]
					  }
					];
				} else {
					styles = [
					  {
						stylers: [
						  { saturation: grve_maps_data.saturation },
						  { lightness: grve_maps_data.lightness },
						  { gamma: grve_maps_data.gamma }
						]
					  }
					];
				}

				var mapOptions = {
					zoom: gmapZoom,
					center: gmapLatlng,
					draggable: draggable,
					scrollwheel: false,
					mapTypeControl:false,
					zoomControl: true,
					styles: styles,
					zoomControlOptions: {
						style: google.maps.ZoomControlStyle.SMALL,
						position: google.maps.ControlPosition.LEFT_CENTER
					}
				};
				var gmap = new google.maps.Map( map.get(0), mapOptions );

				var mapBounds = new google.maps.LatLngBounds();
				var markers = [];
				var infoWindows = [];

				map.parent().children('.grve-map-point').each( function() {

					var mapPoint = $(this),
					gmapPointMarker = mapPoint.attr('data-point-marker'),
					gmapPointTitle = mapPoint.attr('data-point-title'),
					gmapPointOpen = mapPoint.attr('data-point-open'),
					gmapPointLat = parseFloat( mapPoint.attr('data-point-lat') ),
					gmapPointLng = parseFloat( mapPoint.attr('data-point-lng') );
					var pointLatlng = new google.maps.LatLng( gmapPointLat , gmapPointLng );
					var data = mapPoint.html();
					var gmapPointInfo = data.trim();

					var marker = new google.maps.Marker({
					  position: pointLatlng,
					  clickable: gmapPointInfo ? true : false,
					  map: gmap,
					  icon: gmapPointMarker,
					  title: gmapPointTitle,
					});

					if ( gmapPointInfo ) {
						var infowindow = new google.maps.InfoWindow({
							content: data
						});
						infoWindows.push(infowindow);

						google.maps.event.addListener(marker, 'click', function() {
							if ( 'yes' == gmapSinglePopup ) {
								for (var i=0;i<infoWindows.length;i++) {
									infoWindows[i].close();
								}
							}
							infowindow.open(gmap,marker);
						});
						if ( 'yes' == gmapPointOpen ) {
							setTimeout(function () {
								infowindow.open(gmap,marker);
							},2000);
						}
					}
					markers.push(marker);
					mapBounds.extend(marker.position);

				});

				if ( map.parent().children('.grve-map-point').length > 1 ) {
					gmap.fitBounds(mapBounds);
					if( 'yes' == gmapClustering ) {
						var mc = new MarkerClusterer(gmap, markers);
					}
					$(window).on( "resize", function() {
						gmap.fitBounds(mapBounds);
					});
				} else {
					$(window).on( "resize", function() {
						gmap.panTo(gmapLatlng);
					});
				}


				map.css({'opacity':0});
				map.delay(600).animate({'opacity':1});

			});
		}
	};
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	// GLOBAL VARIABLES
	//////////////////////////////////////////////////////////////////////////////////////////////////////
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	Map.init();

	$(window).on("orientationchange",function(){

		setTimeout(function () {
			Map.init();
		},500);

	});

	$('.grve-tabs-title li').on('click', function() {
		var tabRel = $(this).attr('data-rel');
		if ( '' != tabRel && $(tabRel + ' .grve-map').length ) {
			setTimeout(function () {
				Map.init();
			},500);
		}
	});

	var $tab = $('.vc_tta-tab a, .vc_tta-panel-title a');
	$tab.on('click', function(){
		var $that = $(this),
			link  = $that.attr('href'),
			$panel = $(link);
		if( $panel.find('.grve-map').length ){
			setTimeout(function () {
				Map.init();
			},500);
		}
	});

	$(window).on('load',function () {

		var userAgent = userAgent || navigator.userAgent;
		var isIE = userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1 || userAgent.indexOf("Edge/") > -1;

		if ( $('#grve-body').hasClass( 'compose-mode' ) || ( $('#grve-feature-section .grve-map').length && isIE ) ) {
			Map.init();
		}

	});

})(jQuery);