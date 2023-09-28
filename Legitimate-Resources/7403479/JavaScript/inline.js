
        var latitude = 51.75319603225007;
        var longitude = -1.2656525442312458;
        var markerImage = "assets/img/map-marker.png";
        var mapElement = "map";
        var mapStyle = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#dbdbdb"},{"visibility":"on"}]}];
        google.maps.event.addDomListener(window, 'load', simpleMap(latitude, longitude, markerImage, mapStyle, mapElement));

        var smokyBG = $('#ts-waterpipe-bg').waterpipe({
            gradientStart: '#00c7ee',
            gradientEnd: '#c380ff',
            smokeOpacity: 0.1,
            numCircles: 1,
            maxMaxRad: 'auto',
            minMaxRad: 'auto',
            minRadFactor: 0,
            iterations: 8,
            drawsPerFrame: 10,
            lineWidth: .8,
            speed: 1,
            bgColorInner: "#ffffff",
            bgColorOuter: "#ededed"
        });

    