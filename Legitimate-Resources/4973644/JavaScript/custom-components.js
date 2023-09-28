var CF123_MAPS = [];

/**
 * Google Maps 'Class' for interactive map
 *
 * Contributors: Alexandru Berce
 *
 * @author     123ContactForm Development Team
 * @copyright  2008-2016 123ContactForm
 * @version    1.0
 * @todo       Fix getPositionByLocation method. I think it's buggy
 */
var CF123_MAP = function () {
	this.map        = null;
	this.marker     = null;
	this.infoWindow = null;

	/* Map Options */
	this.zoom              = 15;
	this.src               = null;
	this.canvasID          = null;
	this.controlID         = false;
	this.defaultLocation   = null;
	this.streetViewControl = false;
	this.addressFieldID    = null;
	this.inputFieldID      = null;
	this.mappedAddress     = false;
	this.pdfContext        = false;

	this.canUpdateMap = true;
	this.mapLocation  = null;
	this.googleMapKey  = null;

	this.countriesWithTypo = {
		'Bosnia and Herzegovina': 'Bosnia Herzegovina',
		'Macedonia (FYROM)': 'Macedonia',
		'Russia': 'Russian Federation',
		'North Korea': 'Korea North',
		'South Korea': 'Korea South',
		'Democratic Republic of the Congo': 'Congo',
		'Myanmar (Burma)': 'Myanmar'
	};
	//this.addressToMap;

	/**
	 * Map Object Initialization
	 * @param {Object} data
	 */
	this.init = function (data) {
		var object = this;
		for (var i in data)
			if (data.hasOwnProperty(i))
				this[i] = data[i];

		this.mappedAddress = parseInt(this.addressFieldID) > 0;
		this.initMap();
		this.initMarker();

		this.bindEvents();

		if(this.pdfContext)
			this.switchWithStaticMap();

		if(this.centerMapOnUserLocationIsEnabled){
			setTimeout(function(){
				object.centerMapOnUserLocation();
			}, 200);
		}
	};

	/**
	 * Map Initialization
	 */
	this.initMap = function () {
		this.initMapLocation();
		this.createMap();
		this.createMapListener();
	};

	/**
	 * This function sets the map to the default location
	 * @todo Fix this function, because it's buggy
	 */
	this.initMapLocation = function () {
		this.mapLocation = this.defaultLocation ?
			this.getPositionByLocation(this.defaultLocation) :
			new google.maps.LatLng(45.758930866245336, 21.223625595141584);
	};

	/**
	 * This function creates the google map object
	 */
	this.createMap = function () {
		this.map = new google.maps.Map(
			document.getElementById(this.canvasID),
			{
				zoom: this.zoom,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				center: this.mapLocation,
				streetViewControl: this.streetViewControl
			}
		);
		this.showAddress(this.defaultLocation, true);
	};

	/**
	 * This function creates the google map object listeners
	 */
	this.createMapListener = function () {
		var object = this;
		if (!object.src) {
			google.maps.event.addListenerOnce(object.map, 'idle', function () {
				if (typeof $x !== 'undefined')
					var $ = $x;
				var map_canvas_element = $('#map_canvas_' + object.controlID);
				if ($(map_canvas_element).css('opacity') == '0') {
					$(map_canvas_element).css('display', 'none')
						.css('position', 'relative')
						.css('opacity', '1');
				}
			});
		}
	};

	/**
	 * Map marker initialization
	 */
	this.initMarker = function () {
		this.createMarker();
		if (this.mappedAddress || parseInt(this.inputFieldID) > 0) {
			this.createMarkerListener();
			this.initInfoWindow();
		}
	};

	/**
	 * This function creates the google map marker
	 */
	this.createMarker = function () {
		this.marker = new google.maps.Marker({position: this.mapLocation, title: ""});
		this.marker.setMap(this.map);
		this.marker.setDraggable(true);
	};

	/**
	 * This function creates the listener for the google map marker
	 * When the marker drag ends it will update the map position
	 */
	this.createMarkerListener = function () {
		var object = this;
		google.maps.event.addListener(object.marker, 'dragend', function () {
			var position = object.marker.getPosition();
			object.map.panTo(position);
			object.geocode(position);
		});
	};

	this.centerMapOnUserLocation = function(){
		var object = this;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function(position) {
					var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};

					object.map.panTo(pos);
					object.map.setCenter(pos);
					object.marker.setPosition(pos);
					google.maps.event.trigger(object.marker, 'dragend');
				},
				function() {}
			);
		}
	};

	/**
	 * Google map info window initialization
	 */
	this.initInfoWindow = function () {
		this.createInfoWindow();
		this.createInfoWindowListener();
	};

	/**
	 * This function creates the google map info window
	 */
	this.createInfoWindow = function () {
		this.infoWindow = new google.maps.InfoWindow({
			content: '<div id="iw" style="display: none;"><strong>Instructions:</strong></div><div>You can drag this red marker anywhere on the map.</div>',
			maxWidth: '300',
			maxHeight: '300'
		});
		this.infoWindow.open(this.map, this.marker);
	};

	/**
	 * This function creates the listener for the google map info window
	 * When the marker drag starts it will hide the info window
	 */
	this.createInfoWindowListener = function () {
		var object = this;
		google.maps.event.addListener(this.marker, 'dragstart', function () {
			object.infoWindow.close();
		});
	};

	/**
	 * This function fill the address field with the google map location data
	 * @param {Object} locationData
	 */
	this.fillAddressField = function (locationData) {
		var street_number = "",
			street_name   = "",
			county        = "",
			country       = "",
			postal_code   = "",
			city          = "";

		if (locationData !== null && typeof locationData[0] == 'object')
			locationData = locationData[0];

		if(locationData == null || typeof locationData !== 'object' || locationData.length === 0)
			return;

		for (var i = 0; i < locationData['address_components'].length; i++) {
			if (locationData['address_components'][i]['types'][0] === 'street_number') // street number
				street_number = locationData['address_components'][i]['long_name'];
			else if (locationData['address_components'][i]['types'][0] === 'administrative_area_level_1') // county
				county = locationData['address_components'][i]['long_name'];
			else if (locationData['address_components'][i]['types'][0] === 'country') // country
				country = locationData['address_components'][i]['long_name'];
			else if (locationData['address_components'][i]['types'][0] === 'route') // street
				street_name = locationData['address_components'][i]['long_name'];
			else if (locationData['address_components'][i]['types'][0] === 'postal_code') // postal code
				postal_code = locationData['address_components'][i]['long_name'];
			else if (locationData['address_components'][i]['types'][0] === 'locality') // city
				city = locationData['address_components'][i]['long_name'];
		}

		if (street_name != undefined)
			$('#id123-control' + this.addressFieldID + '-1').val(street_name); // Address Line

		if (street_number != undefined && street_number != '')
			$('#id123-control' + this.addressFieldID + '-2').val('No. ' + street_number); // Address Line 2
		else
			$('#id123-control' + this.addressFieldID + '-2').val('');

		if (city != undefined)
			$('#id123-control' + this.addressFieldID + '-3').val(city); // City

		if (county != undefined)
			$('#id123-control' + this.addressFieldID + '-4').val(county); // County

		if (postal_code != undefined)
			$('#id123-control' + this.addressFieldID + '-5').val(postal_code); // Postal Code

		if (country != undefined) {
			$('#s2id_id123-control' + this.addressFieldID + '-6').removeClass('select2-updated');
			if($('#id123-control' + this.addressFieldID + '-6 option[value="' + country + '"]').length === 0 && this.countriesWithTypo[country])
				country = this.countriesWithTypo[country];

			$('#id123-control' + this.addressFieldID + '-6').val(country).trigger('change');
		}

	};

    /**
	 * Fill the mapped input with the map coordinates
     */
	this.fillInputFieldCoordonates = function () {
        if (this.marker.getPosition().lat() != '' && this.marker.getPosition().lng() != '')
            $( '#id123-control' + this.inputFieldID ).val(this.marker.getPosition().lat() + ',' + this.marker.getPosition().lng());
    };

	/**
	 * This function creates the input element for the google map search
	 * @returns {Element}
	 */
	this.createMapSearchBoxInput = function () {
		var input         = document.createElement('input');
		input.type        = 'text';
		input.id          = 'search-for-google-map-' + this.controlID;
		input.className   = 'google-map-search-control';
		input.placeholder = 'Search an address';

		input.style.margin  = '8px';
		input.style.padding = '10px';
		input.style.width   = '200px';

		input.addEventListener('keypress', function (e) {
			if (e.which === 13) {
				e.preventDefault();
				e.stopPropagation();
			}
		});

		return input;
	};

	//noinspection JSValidateJSDoc
	/**
	 * This function binds the search input to the google map
	 * @returns {google.maps.places.SearchBox}
	 */
	this.bindMapSearchBoxInput = function () {
		var input = this.createMapSearchBoxInput();
		this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

		return new google.maps.places.SearchBox(input);
	};

	/**
	 * Create the search box and links it to the UI element.
	 */
	this.createMapSearchBox = function () {
		var object    = this;
		var searchBox = this.bindMapSearchBoxInput();

		// Bias the SearchBox results towards current map's viewport.
		this.map.addListener('bounds_changed', function () {
			searchBox.setBounds(object.map.getBounds());
		});

		/**
		 * Listen for the event fired when the user selects a prediction
		 * and retrieve more details for that place.
		 */
		searchBox.addListener('places_changed', function () {
			var places = searchBox.getPlaces();

			if (places.length === 0) {
				return;
			}

			// For each place, get the icon, name and location.
			var bounds            = new google.maps.LatLngBounds();
			var newMarkerPosition = false;
			var locationData      = false;
			places.forEach(function (place) {
				if (place.geometry.viewport) {
					// Only geocodes have viewport.
					bounds.union(place.geometry.viewport);
				} else {
					bounds.extend(place.geometry.location);
					newMarkerPosition = place.geometry.location;
				}

				locationData = place;
			});
			object.map.fitBounds(bounds);
			if (!newMarkerPosition)
				newMarkerPosition = object.map.getCenter();

			object.marker.setPosition(newMarkerPosition);

			if (locationData) {
                object.fillAddressField(locationData);
                object.fillInputFieldCoordonates();
            }
		});

	};

	/**
	 * This function gets the address from the address field
	 * @returns {string}
	 */
	this.getAddressFromField = function () {
		var address = "";

		for (var i = 1; i <= 6; i++) {
			var element = $('#id123-control' + this.addressFieldID + '-' + i);
			var fieldValue = typeof element.val() === 'undefined' ? '' : element.val().trim();
			if (fieldValue !== '' && !(i === 6 && fieldValue === 'Other')) {
				address += $(element).val();
				if (i < 6)
					address += ', ';
			}
		}

		return address;
	};

	/**
	 * This function tranforms a location in coordinates
	 * @param location
	 */
	this.getPositionByLocation = function (location) {
		geocoder.geocode({'address': location},
			function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					return results[0].geometry.location;
				}
			});

	};

	/**
	 * @param {String} address
	 * @param {bool} skipAdressField
	 */
	this.showAddress = function (address, skipAdressField) {
		var object = this;
		geocoder.geocode({'address': address},
			function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					object.marker.setPosition(results[0].geometry.location);
					object.geocode(results[0].geometry.location, skipAdressField);
				}
				else {
					//alert("Sorry but Google Maps could not find this location.");
				}
			});
	};

	/**
	 * @param {Object} position
	 * @param {bool} skipAdressField
	 */
	this.geocode = function (position, skipAdressField) {
		var object = this;
		geocoder.geocode(
			{latLng: position},
			function (responses) {
				object.map.panTo(object.marker.getPosition());

                if (object.inputFieldID) {
                    object.fillInputFieldCoordonates();
                }

				if (object.addressFieldID) {
					if (object.canUpdateMap === false || skipAdressField === true) {
						return;
					}
					object.fillAddressField(responses);
				}
			});
	};

	/**
	 *
	 */
	this.refresh = function () {
		if (typeof(this.map) != "undefined") {
			var currCenter = this.map.getCenter();
			google.maps.event.trigger(this.map, 'resize');
			this.map.setCenter(currCenter);
		}
	};

	/**
	 * This function binds the google map events after the page is loaded
	 */
	this.bindEvents = function () {
		var object = this;
		$(document).ready(function () {
			if (object.mappedAddress) {
				setTimeout(
					function () {
						object.createMapSearchBox();
					},
					500
				);

				for (var i = 1; i <= 6; i++) {
					var element = $('#id123-control' + object.addressFieldID + '-' + i);
					$(element).bind("keyup change csv-connector",function () {
						object.showAddress(object.getAddressFromField());
					});

					$(element).focusin(function () {
						object.canUpdateMap = false;
					});

					$(element).focusout(function () {
						object.canUpdateMap = true;
					});
				}

				var firstControl = $("#id123-control" + object.addressFieldID + "-1");
				var firstControlValue = firstControl.val() != undefined
					? firstControl.val().trim()
					: '';

				var secondControl = $("#id123-control" + object.addressFieldID + "-2");
				var secondControlValue = secondControl.val() != undefined
					? secondControl.val().trim()
					: '';

				var thirdControl = $("#id123-control" + object.addressFieldID + "-3");
				var thirdControlValue = thirdControl.val() != undefined
					? thirdControl.val().trim()
					: '';

				var forthControl = $("#id123-control" + object.addressFieldID + "-4");
				var forthControlValue = forthControl.val() != undefined
					? forthControl.val().trim()
					: '';

				var fifthControl = $("#id123-control" + object.addressFieldID + "-5");
				var fifthControlValue = fifthControl.val() != undefined
					? fifthControl.val().trim()
					: '';

				if (firstControlValue != ""
					|| secondControlValue != ""
					|| thirdControlValue != ""
					|| forthControlValue != ""
					|| fifthControlValue != ""
				) {
					object.showAddress(object.getAddressFromField(), true);
				}
			}
		});
	};

	this.switchWithStaticMap = function () {
		(function(self) {
			setTimeout(function(){
				var mapCenter = self.marker.getPosition();
				var mapCanvas = $('#map_canvas_' + self.controlID);
				var mapCanvasBorder = mapCanvas.css('border');
				var mapCanvasBorderRadius = mapCanvas.css('border-radius');
				mapCanvas.css('border', 'none');
				mapCanvas.css('overflow-x', 'visible');
				var width     = mapCanvas.width();
				var height    = mapCanvas.height();
				var html      = '<img style="width: 100%; border:' + mapCanvasBorder +'; border-radius: '+mapCanvasBorderRadius + ';"' + ' src="https://maps.googleapis.com/maps/api/staticmap?center='
				                + mapCenter.lat() + ',' + mapCenter.lng()
				                + '&maptype=' + self.map.getMapTypeId()
				                + '&zoom=' + self.map.getZoom()
				                + '&size=' + width + 'x' + height
				                + '&sensor=false'
								+ '&key=' + self.googleMapKey
								+ '">';

				$(mapCanvas).html(html);
			}, 1000);
		})(this);
	};
};

/**
 * Display social counters
 * @param cid
 * @param url
 * @param items
 */
function get_social_counts(cid, url, items) {

	$.ajax({
		type: "GET",
		url: '/ajax_form.php?modulename=sf_social_actions.php&action=get_counters&items=' + items + '&url=' + url,
		dataType: "json",
		success: function (data) {
			var twitter_element = $('#id123-control-' + cid + ' a.twitter span.social-count');
			if ($(twitter_element).length > 0) {
				$(twitter_element).html(data.twitter);
			}

			var facebook_like_element = $('#id123-control-' + cid + ' a.facebook-like span.social-count');
			if ($(facebook_like_element).length > 0) {
				$(facebook_like_element).html(data.facebook_like);
			}

			var facebook_share_element = $('#id123-control-' + cid + ' a.facebook-share span.social-count');
			if ($(facebook_share_element).length > 0) {
				$(facebook_share_element).html(data.facebook_share);
			}

			var google_plus_element = $('#id123-control-' + cid + ' a.google-plus span.social-count');
			if ($(google_plus_element).length > 0) {
				$(google_plus_element).html(data.google_plus);
			}

			var linkedin_element = $('#id123-control-' + cid + ' a.linkedin span.social-count');
			if ($(linkedin_element).length > 0) {
				$(linkedin_element).html(data.linkedin);
			}

		}
	});
}