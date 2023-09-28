
		$(document).ready(function() {
			var map = L.map('mapid').setView([52.4259167, -1.572303], 13);
/*			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
				maxZoom: 18,
				id: 'mapbox.streets',
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, '
			}).addTo(map);*/
            L.tileLayer('https://tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetLmap</a> contributors'
            }).addTo(map);
			var popUpText = "  <b>Britannia Coventry Hill Hotel</b><br>" +
					"  Rye Hill," +
					" Coventry  "
			L.marker([52.4259167, -1.572303]).addTo(map).bindPopup(popUpText);
		});

		function showMap() {
			var map = L.map('hotelMapModal').setView([52.4259167, -1.572303], 13);
/*			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
				maxZoom: 18,
				id: 'mapbox.streets',
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, '
			}).addTo(map);*/
            L.tileLayer('https://tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetLmap</a> contributors'
            }).addTo(map);
			var popUpText = "  <b>Britannia Coventry Hill Hotel</b><br>" +
					"  Rye Hill," +
					" Coventry  "
			L.marker([52.4259167, -1.572303]).addTo(map).bindPopup(popUpText);
		}

		$('#map_view').on('show.bs.modal', function (e) {
			if ($('#hotelMapModal').children().length < 1) {
				setTimeout(showMap, 300);
			}
		});

	