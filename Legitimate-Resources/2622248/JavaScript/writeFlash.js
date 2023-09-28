// Use this to properly write out the HTML for any Flash.
function FlashWriter(url, width, height)
{
	// Options here are "window", "opaque", and "transparent"
	var DEFAULT_WINDOW_SETTING = "transparent";

	// Defaults for optional stuff below
	var quality = "high";
	//var id = "flash" + GetRandomNumber(1000000, 9999999);
	var id = "flash"
	var wmode = DEFAULT_WINDOW_SETTING;
	var script_access = "sameDomain";
	var allow_fullscreen = "false";
	var params = null;
	var has_flash = LookForFlashPlugin();

	this.SetQuality = function(new_quality)
	{
		quality = new_quality;
	}

	this.SetID = function(new_id)
	{
		id = new_id;
	}

	this.SetTransparent = function(is_transparent)
	{
		wmode = is_transparent ? "transparent" : DEFAULT_WINDOW_SETTING;
	}

	this.SetFullScreen = function(fullscreen)
	{
		allow_fullscreen = fullscreen ? "true" : "false";
	}

	this.SetScriptAccess = function(new_script_access)
	{
		script_access = new_script_access;
	}

	this.SetParams = function(new_params)
	{
		params = new_params;
	}

	this.ToString = function()
	{
		var str = "";

		if(has_flash)
		{
			str += '<object align="absmiddle" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="https://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + width + '" height="' + height + '" id="' + id + '">';

			str += '<param name="menu" value="false" /><param name="allowScriptAccess" value="' + script_access + '" />';
			str += '<param name="allowFullScreen" value="' + allow_fullscreen + '" />';
			str += '<param name="movie" value="' + url + '" /><param name="quality" value="' + quality + '" />';
			str += '<param name="wmode" value="' + wmode + '" />';

			if(params != null)
			{
				// IE needs this
				str += '<param name="flashvars" value="' + params + '" />';
			}

			str += '<embed src="' + url + '" quality="' + quality + '" ';

			if(params != null)
			{
				// Non-IE browsers need this
				str += 'flashvars="' + params + '" ';
			}

			str += 'wmode="' + wmode + '" width="' + width + '" height="' + height + '" name="' + id + '" menu="false" allowScriptAccess="' + script_access + '" allowFullScreen="' + allow_fullscreen + '" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
			str += '</object>';
		}
		else
		{
			str += '<p style="text-align: center; margin-top: 2em; margin-bottom: 2em; padding-top: 3em; padding-bottom: 3em; background: #333333">You don\'t appear to have <a target="_blank" href="http://getflash.ngfiles.com">Flash</a> installed. <a target="_blank" href="http://getflash.ngfiles.com">Click here</a> to get it (it\'s free).</p>';
		}

		return(str);
	}

	this.Print = function()
	{
		document.write(this.ToString());
	}

	function LookForFlashPlugin()
	{
		var flash_versions = 12;

		// Code swiped from http://www.dangrossman.info/2007/01/03/detecting-flash-and-java-with-javascript/
		if (navigator.plugins && navigator.plugins.length) {
			// Netscape style plugin detection
			for (x = 0; x <navigator.plugins.length; x++) {
				if (navigator.plugins[x].name.indexOf('Shockwave Flash') != -1) {
					return(true);
				}
			}
		}
		else if (window.ActiveXObject) {
			// ActiveX style plugin detection
			for (x = 2; x <= flash_versions; x++) {
				try {
					oFlash = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + x + "');");
					if (oFlash) {
						return(true);
					}
				}
				catch(e) { }
			}
		}
		
		return(false);
	}
}