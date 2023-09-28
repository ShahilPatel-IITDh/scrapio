function politicaCookie(exibir = true, tempo = 300) {
	var cookie = readCookie("cookie");
	var raiz = $('footer');
	if ($('.global_popup').length){
		raiz = $('.global_popup')
	}
	if (exibir && cookie == null) {
		var url = $('#base_url').data('href');
		var html = '<div class="cookiealert">'
		html+= '<div class="content">'
		html+= '<div class="obox-header"><h4>Este website utiliza COOKIES</h4></div>'
		html+= '<div class="obox-body"><p>Utilizamos cookies para melhorar a sua experiência de navegação, personalizar conteúdos, anúncios e analizar nosso tráfego. Essas informações podem ser compartilhadas com alguns parceiros para proporcionar um conteúdo ainda mais personalizado.</p><a class="cookielink" href="'+url+'politica-de-cookies" target="_blank" title="Ler Política de Cookies">Definições de coockies</a><button class="entendi">ENTENDI</button></div>'
		html+= '</div>'
		html+= '</div>';
		
		raiz.after(html);

		$('.cookiealert .entendi').on("click",function() {
			$('.cookiealert').fadeOut(300);
			setTimeout(function() {
				$('.cookiealert').remove();
				createCookie("cookie", "true", 7);
			}, 1000);
		});
		$('.cookiealert').delay(200).fadeIn(tempo);
	} else {
		$('.cookiealert').fadeOut(tempo);
	}
}

if (typeof 'createCookie' !== 'function') {
	function createCookie(name, value, days) {
		var expires;

		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		} else {
			expires = "";
		}
		document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
	}
}

if (typeof 'readCookie' !== 'function') {
	function readCookie(name) {
		var nameEQ = encodeURIComponent(name) + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) === ' ')
				c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) === 0)
				return decodeURIComponent(c.substring(nameEQ.length, c.length));
		}
		return null;
	}
}

if (typeof 'eraseCookie' !== 'function') {
	function eraseCookie(name) {
		createCookie(name, "", -1);
	}
}

//===================== EXIBIR =====================
$(function() {
	politicaCookie();
});