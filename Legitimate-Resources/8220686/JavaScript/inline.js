
			//funciones utf8 encode y decode para mover al utilsis
			function encode_utf8( s ) {
			  return unescape( encodeURIComponent( s ) );
			}
			
			function decode_utf8( s ) {
			  return decodeURIComponent( escape( s ) );
			}


			// carga cadenas del idioma seleccionado:
			function cambiarIdioma(lang, page) {
			/* /sis */ 
				var laUrl = "/sis/SerSvlLiterales";
/*				var laUrl = "/sis/SerSvlLiterales?comercio=999008881&terminal=214&pagina=RSisSelFormaPago&idioma=3";*/
				var losDatos = { comercio: '', terminal: '' ,pagina: 'RSisException', idioma: lang };
				$.ajax( { url: laUrl, type: "POST", data: losDatos, dataType: "json", success: cambioIdiomaOK, error: cambioIdiomaKO} ); /* , contentType: "application/x-www-form-urlencoded;charset=UTF-" UTF-8 ISO-8859-15 */
				$('#iframeIupay').attr({'src': '/sis/html/iuPayMockUp_' + lang + '.html'});
			}

			function inicializaCambioIdioma() {
				$( ".trigger" ).changed = false;
/*				$( ".trigger" ).on( "click", cambiarIdioma($( ".lang" ).val(), 'RSisException') );*/
			}

			function cambioIdiomaOK( obj, textStatus, jqXHR ) {
				if (obj) {
						var listaLngIds = document.querySelectorAll('[lngid]');
						for (var i = 0; i < listaLngIds.length; i++) { 
							$.each( obj, function( key, value ) {
								if (listaLngIds[i].getAttribute("lngid") == key) {
//									alert(decode_utf8(value));
									if (listaLngIds[i].innerHTML) {
										if (listaLngIds[i].innerHTML.length>0 && listaLngIds[i].innerHTML[0] != '?') {
											listaLngIds[i].innerHTML = decodeURIComponent(value).replace(/\+/g, ' ' );
										} else if (listaLngIds[i].innerHTML.length == 0) {
											listaLngIds[i].innerHTML = decodeURIComponent(value).replace(/\+/g, ' ' );
										}
									}
									if (listaLngIds[i].hasAttribute("value")) {
										if (listaLngIds[i].getAttribute("value").length>0 && listaLngIds[i].getAttribute("value")[0] != '?') {
											$(listaLngIds[i]).attr({
												value: decodeURIComponent(value).replace(/\+/g, ' ' )
											});
										}
									}
									if (listaLngIds[i].hasAttribute("alt")) {
										$(listaLngIds[i]).attr({
											alt: decodeURIComponent(value).replace(/\+/g, ' ' ),
											title: decodeURIComponent(value).replace(/\+/g, ' ' )
										});
									}
								} else if (key == 'monthmonth') {
									if (document.getElementById("cad1")) {
										document.getElementById("cad1").placeholder = decodeURIComponent(value).replace(/\+/g, ' ' );
									}
									if (document.getElementById("cad1_upi")) {
										document.getElementById("cad1_upi").placeholder = decodeURIComponent(value).replace(/\+/g, ' ' );
									}
								} else if (key == 'yearyear') {
									if (document.getElementById("cad2")) {
										document.getElementById("cad2").placeholder = decodeURIComponent(value).replace(/\+/g, ' ' );
									}
									if (document.getElementById("cad2_upi")) {
										document.getElementById("cad2_upi").placeholder = decodeURIComponent(value).replace(/\+/g, ' ' );
									}
								} 
							});
						}
					//ahora actualizamos los errores
					if (errores) {
						for (var i = 0; i < errores.length; i++) { 
							$.each( obj, function( key, value ) {
								if (key.substr(0,6) == 'error-') {
									var msgerror = key.substr(6, key.length);
									if (errores[i][0] == msgerror) {
										errores[i][1] = decodeURIComponent(value).replace(/\+/g, ' ' );
									}
								}
							});
						}
					}
				}
			}

			function cambioIdiomaKO(jqXHR, textStatus, errorThrown ) {
//				alert('cambio idioma KO');
				alert(textStatus + '\n\n' + errorThrown.name + '\n\n' + errorThrown.message + '\n\n' + errorThrown.description);
			}
			
          