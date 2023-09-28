var regex = /https:\/\/(.*)\.?(bnl|hellobank)\.it/g;
var domain = "";

if (location.hostname == "banking.hellobank.it") {
	domain = "https://hellobank.it";
} else if (location.hostname != "banking.bnl.it"
		&& location.hostname != "bnl.it"
		&& location.hostname != "wellmakers.bnl.it") {
	domain = "https://bnl.it";
} 
	
var urlCelebrusScript = domain + '/rsc/celebrus/dcrm-lib.js';
var celebrusScript = document.createElement( 'script' );
celebrusScript.type = 'text/javascript';
celebrusScript.src = urlCelebrusScript;
document.head.appendChild(celebrusScript);

var urlCelebrusScript = domain + '/rsc/celebrus/dcrm-impl-mock-19-09-2018.js';
var celebrusScript = document.createElement( 'script' );
celebrusScript.type = 'text/javascript';
celebrusScript.src = urlCelebrusScript;
document.head.appendChild(celebrusScript);

/*var urlCelebrusScript = domain + '/rsc/celebrus/celebrus.js';
var celebrusScript = document.createElement( 'script' );
celebrusScript.type = 'text/javascript';
celebrusScript.setAttribute('class','optanon-category-ITA04')
celebrusScript.src = urlCelebrusScript;
document.head.appendChild(celebrusScript);*/

function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
    // Return null if not found
    return null;
}

function includeCelebrusJS() {
	var urlCelebrusScript = domain + '/rsc/celebrus/celebrus.js';
	var celebrusScript = document.createElement( 'script' );
	celebrusScript.type = 'text/javascript';
	celebrusScript.setAttribute('class','optanon-category-ITA04');
	celebrusScript.setAttribute('id','celebrus');
	celebrusScript.src = urlCelebrusScript;
	if(celebrusScript.readyState) {  // only required for IE <9
		celebrusScript.onreadystatechange = function() {
		  if ( celebrusScript.readyState === "loaded" || celebrusScript.readyState === "complete" ) {
			celebrusScript.onreadystatechange = null;
			BNLCSAoptIn();
		  }
		};
	} else {  //Others
		celebrusScript.onload = function() {
			BNLCSAoptIn();
		};
	}
	document.head.appendChild(celebrusScript);
}

if (getCookie("BNLCSAP3P") == "optedIn") {
	includeCelebrusJS();
}

window.addEventListener("message", function(event) {
	
	if (event.origin.match(regex) && event.origin.match(regex).length > 0) {
		if (event.data == "OT") {
			console.log("post message OT recived");
			if (document.getElementById("celebrus") == undefined) {
				includeCelebrusJS();
			} else {
				BNLCSAoptIn();
			}
		}
	}

}, false);