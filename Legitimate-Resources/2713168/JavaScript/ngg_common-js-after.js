
var nggLastTimeoutVal = 1000;

			var nggRetryFailedImage = function(img) {
				setTimeout(function(){
					img.src = img.src;
				}, nggLastTimeoutVal);
			
				nggLastTimeoutVal += 500;
			}
