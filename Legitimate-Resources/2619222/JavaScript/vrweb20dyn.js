var _vrweb_path_prefix = 'https://assets.diepresse.com/layout/diepresse/files/nav/linguatec/player20/scripts/';
//var default path_prefix = '//vrweb15.linguatec.org/VoiceReaderWeb15User/player20/scripts/';

var _vrweb_accessibilityResources = {
	'en': {
		'vrweb_player_button_name': 'ReadButton',
		'vrweb_player_button_aria_label': 'ReadButton',
		'vrweb_player_button_image_alt': 'Read'
	},
	'de': {
		'vrweb_player_button_name': 'Vorlesetaste',
		'vrweb_player_button_aria_label': 'Vorlesetaste',
		'vrweb_player_button_image_alt': 'Vorlesen'
	}
};

function vrweb_loadExternalFile(filename, filetype){
	if (filetype == "js") {
		var fileref = document.createElement('script');
		fileref.setAttribute("type", "text/javascript");
		fileref.setAttribute("src", filename);
		fileref.onload = function() {
			setTimeout(function() {
				var icon = document.getElementsByClassName("vrweb_icon")[0];
				icon.click();
			}, 50);
		}
	} else if (filetype == "css") {
		var fileref = document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
	}
	if (typeof fileref != "undefined") {
		document.getElementsByTagName("body")[0].appendChild(fileref);
	}
}

function vrweb_loadScriptOnClick() {
	vrweb_loadExternalFile(_vrweb_path_prefix + 'readpremium20.js', 'js');
	var placeholderButton = document.getElementById("vrweb_player_button");
	placeholderButton.style.display = "none";
}

function vrweb_createPreloadButtonAttributes() {
	var guilang = vrweb_guilang || 'en';
	var placeholderButton = document.getElementById("vrweb_player_button");
	var placeholderButtonName = _vrweb_accessibilityResources[guilang]['vrweb_player_button_name'];
	var placeholderButtonAriaLabel = _vrweb_accessibilityResources[guilang]['vrweb_player_button_aria_label'];
	var placeholderButtonImage = document.getElementById("vrweb_player_button_image");
	var placeholderButtonImageSrc = _vrweb_path_prefix + '../icons/' + vrweb_iconcolor + '/VRweb_Button_' + vrweb_icon + '_' + vrweb_guilang + '.png';
	var placeholderButtonImageAlt = _vrweb_accessibilityResources[guilang]['vrweb_player_button_image_alt'];
	placeholderButton.setAttribute("name", placeholderButtonName);
	placeholderButton.setAttribute("aria-label", placeholderButtonAriaLabel);
	placeholderButtonImage.setAttribute("src", placeholderButtonImageSrc);
	placeholderButtonImage.setAttribute("alt", placeholderButtonImageAlt);
}

/* Edited by Flecki 25.7.23: Fix issue DPO-6068 */
/*window.onload = function() {
	if (typeof vrweb_path_prefix !== 'undefined') {
		_vrweb_path_prefix = vrweb_path_prefix;
	} else {
		var scripts = document.getElementsByTagName('script');
		var myPath = scripts[scripts.length-1].src.split('?')[0]; // remove any ?query
		_vrweb_path_prefix = myPath.split('/').slice(0, -1).join('/')+'/'; // remove last filename part of path
	}
	vrweb_createPreloadButtonAttributes();
}*/
window.addEventListener('load', function() {
	if (typeof vrweb_path_prefix !== 'undefined') {
          _vrweb_path_prefix = vrweb_path_prefix;
	} else {
          _vrweb_path_prefix = 'https://assets.diepresse.com/layout/diepresse/files/nav/linguatec/player20/scripts/';
	}
	vrweb_createPreloadButtonAttributes();
});
