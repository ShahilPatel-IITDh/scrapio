function pixelweiche(_id){

	// Document.write muss in eine Variable zwischengespeichert werden,
	// da ansonsten beim Aufruf von document.write das ganze HTML-Dokument Ã¼berschrieben wird
	if(document.base_document_write === undefined){
		document.base_document_write = document.write;
		document.write = function (html) {
			document.base_document_write(html);
		}	
	}
	
	// Variablen initialisieren
	var params = "";
	var id = _id;

	// Parameter setzen
	this.set = function(key, value) {

		if (params.length == 0) params += "?";
		else params += "&";

		params += key + "=" + value;
	}

	// Pixelweiche feuern
	this.call = function(outputIdSelector) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', "https://mypixel.golead.systems/" + id + "/script.js" + params, false);
		xhr.onload = function () {
			if (xhr.status === 200) {
				eval(xhr.responseText);
			} else {
				console.log('Pixelweiche mit der id:' + id + " konnte nicht gefeuert werden" + xhr.status);
			}
		};
		xhr.send();
	}

}
