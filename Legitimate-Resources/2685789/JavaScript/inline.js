
		// <![CDATA[
			

			var map;
var actLat;
var actLong;


function loadMap(mapDivElementId) {

  actLat = $("#"+mapDivElementId+"-lat").val();
  actLong = $("#"+mapDivElementId+"-lon").val();

  var mapDiv = document.getElementById(mapDivElementId);

  var initialCenter = new google.maps.LatLng(30, 0);

  var mapOptions = {
    center : initialCenter,
    zoom : 2,
    mapTypeId : google.maps.MapTypeId.HYBRID,
    mapTypeControl : true,
    mapTypeControlOptions : {
      style : google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position : google.maps.ControlPosition.UPPER_RIGHT
    }
  };


  map = new google.maps.Map(mapDiv, mapOptions);

  if (isNumber(actLat) && isNumber(actLong)) {
    markPoint(5, actLat, actLong);
  }
}

function isNumber(str) {
    return (str && !(0 === str.length) && !isNaN(str));
}

function markPoint(zoomLevel, lat, long) {
  var latLng = toLatLng(lat, long);
  map.setCenter(latLng);
  map.setZoom(zoomLevel);
  var marker = new google.maps.Marker({
    position : latLng,
    map : map
  });
}

function toLatLng(lat, lng) {
  return new google.maps.LatLng(lat, lng);
}

function initialize() {
$('div[id^="map_ACT-"]').each(function() {

loadMap(this.id);
});
}

function loadGmapAPI() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=&sensor=false&callback=initialize'; 
  document.body.appendChild(script);

}

window.onload= loadGmapAPI() ;
		// ]]>
	