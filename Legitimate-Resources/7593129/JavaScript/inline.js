

    //Change US select-region to /na/en-us.html/
        document.addEventListener('DOMContentLoaded', function() {
            const usLink = document.querySelector(".region-language-selector__region--link").querySelector('a');
            const usHref = usLink.getAttribute("href");
            if(usHref === "/na/en-us.html"){
                usLink.setAttribute("href","/na/en-us.html/");
            }
        });

    // Geo location code to get the country code. If user hits the ingredion.com it will redirect to specific regional site based on country code.
        var geocoder = new google.maps.Geocoder();
        var currentWebsite= window.location.href ;
        var websiteList= ["https://www.ingredion.com/na/en-us.html","http://www.ingredion.com/na/en-us.html","https://www.ingredion.com","http://www.ingredion.com","www.ingredion.com/","www.ingredion.com","https://stg.ingredion.com/na/en-us.html", "https://ingredion-stage65.adobecqms.net/na/en-us.html"];

        if (websiteList.indexOf(currentWebsite) != -1) {
             getLocation();
        }

    //check if the browser supports the Geolocation API
    function getLocation() {
        if (navigator.geolocation) {

            //alert("Browser will ask to allow location on next browser popup . If you wish to fetch your location and redirect to your regional site then please click Allow on next browser popup otherwise click Block");
            navigator.geolocation.watchPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    //Get latitude and longitude
    function showPosition(position) {
        //console.log("Latitude: " + position.coords.latitude +  "<br>Longitude: " + position.coords.longitude);
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        codeLatLng(lat, lng);
    }

    //Get country code, city, region from the location details obtained. These details are selected from the list where type is "locality".
    function codeLatLng(lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          //console.log(results);
            if (results[1]) {
            var indice=0;
            for (var j=0; j<results.length; j++)
            {
                if (results[j].types[0]=='locality')
                    {
                        indice=j;
                        break;
                    }
                }
            //console.log('The good number is: '+j);
            //console.log(results[j]);
            for (var i=0; i<results[j].address_components.length; i++)
                {
                    if (results[j].address_components[i].types[0] == "locality") {
                            //this is the object you are looking for City
                            city = results[j].address_components[i];
                        }
                    if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
                            //this is the object you are looking for State
                            region = results[j].address_components[i];
                        }
                    if (results[j].address_components[i].types[0] == "country") {
                            //this is the object you are looking for
                            country = results[j].address_components[i];
                        }
                }

                //city data
                //console.log("city data :"+city.long_name + " || " + region.long_name + " || " + country.short_name)

                countryCode = country.short_name;

                //Redirect user to specific regional site based on country code
                countryNavigation(countryCode);

                //console.log("countryCode ::"+ countryCode);
                //console.log("popupCookie ::"+ getCookie("popupCookie"));

			/*	document.getElementById("location").innerHTML = "It's look like your accessing this website from "+country.long_name;
                var popupCookie = getCookie("popupCookie");
                if(popupCookie != "true" && popupCookie != "false" ){
                    $('#myModal').modal('show');
                }else {
					if(popupCookie == "true"){

                    	countryNavigation(countryCode);

                    }

                }   */

                } else {
                  console.log("No results found");
                }
            }
          }

        );
    }

    //Navigate to specific regional site based on country code
    function countryNavigation(countryCode){
         //console.log("countryCode navigation method ::"+ countryCode);

	    if (countryCode == 'BR'){
	        window.location.href= "https://www.ingredion.com/sa/pt-br.html";
	        }
        if (countryCode == 'PE'){
            window.location.href= "https://www.ingredion.com/sa/es-co.html";
            }

       /* if (countryCode == 'US' || countryCode == 'PR'){
            window.location.href= "https://www.ingredion.com/na/en-us.html";
            }
        if (countryCode == 'CA'){
            window.location.href = "https://www.ingredion.com/na/en-us.html";
            } */
        if (countryCode == 'FR'){
            window.location.href = "https://www.ingredion.fr/";
            }
        if (countryCode == 'DE'){
            window.location.href = "https://www.ingredion.de/";
            }
        if (countryCode == 'IT'){
            window.location.href = "https://www.ingredion.it/";
            }
        if (countryCode == 'ES'){
            window.location.href = "https://www.ingredion.es/";
            }
        if (countryCode == 'TR'){
            window.location.href = "https://www.ingredion.com.tr/";
            }
        if (countryCode == 'UA'){
            window.location.href = "https://www.ingredion.ua/";
            }
        if (countryCode == 'PL'){
            window.location.href = "https://www.ingredion.pl/";
            }
        if (countryCode == 'CN'){
            window.location.href = "https://www.ingredion.com/apac/sc-cn.html";
            }
        if (countryCode == 'JP'){
            window.location.href = "https://www.ingredion.com/apac/ja-jp.html";
            }
        if (countryCode == 'KR'){
            window.location.href = "https://www.ingredion.com/apac/ko-kr.html";
            }

        var MexicoRegion= ["BB","CR","DO","SV","GT","HN","JM","MX","NI","PA","LC","TT"];
        if (MexicoRegion.indexOf(countryCode)!= -1) {
             window.location.href = "https://www.ingredion.com/na/es-mx.html";
        }
        var AndeanRegion= ["CO","EC"];
        if (AndeanRegion.indexOf(countryCode)!= -1) {
             window.location.href = "https://www.ingredion.com/sa/es-co.html";
        }
        var EMEARegion= ["AD","AE","AF","AL","AM","AO","AT","AX","AZ","BA","BE","BF","BG","BH","BI","BJ","BW","BY","CD","CF","CG","CH","CI","CM","CV","CY","CZ","DJ","DK","DZ","EE","EG","EH","ER","ET","FI","FO","GA","GB","GE","GG","GH","GI","GM","GN","GQ","GR","GW","HR","HU","IE","IL","IM","IQ","IR","IS","JE","JO","KE","KG","KM","KW","KZ","LB","LI","LR","LS","LT","LU","LV","LY","MA","MC","MD","ME","MG","MK","ML","MR","MT","MU","MW","MZ","NA","NE","NG","NL","NO","OM","PT","QA","RE","RO","RS","RU","RW","SA","SC","SD","SE","SH","SI","SJ","SK","SL","SM","SN","SO","SS","ST","SY","SZ","TD","TG","TJ","TM","TN","TZ","UG","UZ","VA","YE","YT","ZA","ZM","ZW"];
        if (EMEARegion.indexOf(countryCode)!= -1) {
             window.location.href = "https://www.ingredion.com/emea/en-uk.html";
        }
        var APACRegion= ["AU","BD","BT","IO","BN","KH","CX","CC","CK","FJ","PF","IN","ID","KI","KP","KG","LA","MO","MY","MV","MN","MM","NR","NP","NC","NZ","NU","NF","PK","PS","PG","PH","PN","QA","WS","SG","SB","LK","TW","TJ","TH","TL","TK","TO"];
        if (APACRegion.indexOf(countryCode)!= -1) {
             window.location.href = "https://www.ingredion.com/apac/en-sg.html";
        }
        var SothernRegion= ["AR","CL","UY"];
        if (SothernRegion.indexOf(countryCode)!= -1) {
             window.location.href = "https://www.ingredion.com/sa/es-ar.html";
        }


    }

    //Checks if cookie checkbox is selected in popup
    function checkCookie(cvalue)
    {
        if(document.getElementById("myCheck").checked == true) {
					//console.log("Cvalue" + cvalue );
                    setCookie('popupCookie',cvalue,365);
                    if(cvalue == "true")
                    {
                         countryNavigation(countryCode);
                    }
        } else
        {
         			if(cvalue == "true")
                    {
                         countryNavigation(countryCode);
                    }
        }
    }

    //Set expires cookie in the browser
    function setCookie(cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
       // countryNavigation(countryCode);
    }

    //Get cookie value of popupCookie from browser
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    