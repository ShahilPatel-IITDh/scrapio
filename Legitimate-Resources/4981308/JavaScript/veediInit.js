

	   var playerwidth = document.getElementById('walkthrough').offsetWidth;
	
		var _v,settings = {
			game : "Bubble Spirit",   // Game name (Variable)
			publisherId : 74653698,            // Publisher ID (provided by our side)
			onVideoFound :  function() { _v.mute();   ;},
			onVideoNotFound : function() {        document.getElementById('walkthroughtitle').style.display = "none";document.getElementById('scroll').style.display = 'none'; },
			width  :  "728",                          // Veedi player width
			lang :  "nl",
			gametitle  :  "Bubble Spirit"
		};
		(function(settings)  {
				var vScript = document.createElement('script');
				vScript.type = 'text/javascript'; vScript.async = true;
				vScript.src = 'http://www.veedi.com/player/embed/veediEmbed.js';
				vScript.onload = function(){_v = new VeediEmbed(settings);};
				var veedi = document.getElementById('veediInit'); veedi.parentNode.insertBefore(vScript, veedi);
		})(settings);            
	