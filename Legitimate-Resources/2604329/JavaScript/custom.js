

// maps starts

function initMap(){
	var options = {
		zoom:13,
		center:{lat:27.6897148, lng:85.3354262}
	}
	// new map
	var map = new
	 google.maps.Map(document.getElementById('map'), options);

	 /*
	 // add marker
	 var marker = new google.maps.Marker({
	 	position:{lat:27.7172, lng:-85.3240},
	 	map:map,
	 	icon:'./img/mlogo.png'
	 });
	 var infoWindow = new google.maps.InfoWindow({
	 	content:'<h3>worec</h3>'
	 });
	 marker.addListener('click',function(){
	 	infoWindow.open(map, marker);
	 });

	 */

	 addMarker({
	 	coords:{lat:27.6897148, lng:85.3354262},
	 	content:'<h4>BTI Main Building</h4><h6>Devkota Sadak, New Baneshwor,Kathmandu</h6><a href="https://bti.com.np/">Banking Training Institute</a>'
	});
// 	 addMarker({
// 	 	coords:{lat:27.6644, lng:85.3188},
// 	 	content:'<h3>Lalitpur</h3>'
// 	 });
// 	 addMarker({
// 	 	coords:{lat:27.6710, lng:85.4298},
// 	 	content:'<h3>Bhaktapur</h3>'
// 	 });
	  addMarker({
	 	coords:{lat:27.7005878, lng:85.3371482},
	 	content:'<h4>BTI Second Building</h4><h6>Devkamal Complex, New Baneshwor</h6> <a href="https://bti.com.np/" target="blank">Banking Training Institute</a>'
	 });
	 
	 // add marker function



	 function addMarker(props){
	 	var marker = new google.maps.Marker({
	 		position:props.coords,
	 		map:map,
	 		icon:props.iconImage
	 	});

	 	// check for customicon
	 	if(props.iconImage){
	 		// set imageicon
	 		marker.setIcon(props.iconImage);
	 	}
	 	// check content
	 	if(props.content){

	 	var infoWindow = new google.maps.InfoWindow({
	 	content:props.content	
	 });
	 marker.addListener('click',function(){
	 	infoWindow.open(map, marker);
	 });
	 	}
	 }


}

// maps ends