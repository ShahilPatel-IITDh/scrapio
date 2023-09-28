/*
	Author Webmaster: ccorreia
	Atenção: Cuidado ao alterar este script, pois é usado nas seguintes páginas:
	- email.uol.com.br
	- email.bol.uol.com.br
	- zipmail.uol.com.br
	- email.folha.uol.com.br
*/

if (typeof window.console == 'undefined') window.console = {
	log: function () {}
}; // safe for old browsers
var loginApp = angular.module('loginApp', []);
loginApp.config(function ($compileProvider) {
	$compileProvider.debugInfoEnabled(false); // production mode
});
loginApp.controller('loginCtrl', function ($scope, $timeout, $sce) {
	var now = new Date();
	var anchorP = '',
		anchorParts = [];
	var productName = document.title || 'Webmail';
	var unloaded = {
		published: false
	};
	$scope.thisYear = now.getFullYear();
	$scope.user = '';
	$scope.pass = '';
	$scope.links = unloaded;
	$scope.offers = unloaded;
	$scope.banner = unloaded;
	$scope.domain = domain;

	jQuery('.base').addClass('show');

	try {
		var _0x3786 = ["\x5F\x70\x68\x61\x6E\x74\x6F\x6D", "\x63\x61\x6C\x6C\x50\x68\x61\x6E\x74\x6F\x6D", "\x6F\x6E\x4C\x69\x6E\x65", "\x70\x6C\x75\x67\x69\x6E\x73", "", "\x70\x68\x61\x6E\x74\x6F\x6D\x6A\x73", "\x5F\x5F\x70\x68\x61\x6E\x74\x6F\x6D\x61\x73", "\x50\x68\x61\x6E\x74\x6F\x6D\x4A\x53\x2D\x62\x61\x73\x65\x64\x20\x77\x65\x62\x20\x70\x65\x72\x66\x20\x6D\x65\x74\x72\x69\x63\x73\x20\x2B\x20\x6D\x6F\x6E\x69\x74\x6F\x72\x69\x6E\x67\x20\x74\x6F\x6F\x6C", "\x42\x75\x66\x66\x65\x72", "\x6E\x6F\x64\x65\x6A\x73", "\x65\x6D\x69\x74", "\x63\x6F\x75\x63\x68\x6A\x73", "\x73\x70\x61\x77\x6E", "\x72\x68\x69\x6E\x6F", "\x77\x65\x62\x64\x72\x69\x76\x65\x72", "\x73\x65\x6C\x65\x6E\x69\x75\x6D", "\x64\x6F\x6D\x41\x75\x74\x6F\x6D\x61\x74\x69\x6F\x6E", "\x64\x6F\x6D\x41\x75\x74\x6F\x6D\x61\x74\x69\x6F\x6E\x43\x6F\x6E\x74\x72\x6F\x6C\x6C\x65\x72", "\x63\x68\x72\x6F\x6D\x69\x75\x6D\x20\x62\x61\x73\x65\x64\x20\x61\x75\x74\x6F\x6D\x61\x74\x69\x6F\x6E\x20\x64\x72\x69\x76\x65\x72", "\x6F\x75\x74\x65\x72\x57\x69\x64\x74\x68", "\x6F\x75\x74\x65\x72\x48\x65\x69\x67\x68\x74", "\x68\x65\x61\x64\x6C\x65\x73\x73\x20\x62\x72\x6F\x77\x73\x65\x72"];

		function botDetect() {
			var _0xf9a3x2 = false;
			_0xf9a3x2 = _0xf9a3x2 || ((!!window[_0x3786[0]] || !!window[_0x3786[1]] || (navigator[_0x3786[2]] === false && navigator[_0x3786[3]] == _0x3786[4])) ? _0x3786[5] : false);
			_0xf9a3x2 = _0xf9a3x2 || (!!window[_0x3786[6]] ? _0x3786[7] : false);
			_0xf9a3x2 = _0xf9a3x2 || (!!window[_0x3786[8]] ? _0x3786[9] : false);
			_0xf9a3x2 = _0xf9a3x2 || (!!window[_0x3786[10]] ? _0x3786[11] : false);
			_0xf9a3x2 = _0xf9a3x2 || (!!window[_0x3786[12]] ? _0x3786[13] : false);
			_0xf9a3x2 = _0xf9a3x2 || (!!window[_0x3786[14]] ? _0x3786[15] : false);
			_0xf9a3x2 = _0xf9a3x2 || ((!!window[_0x3786[16]] || !!window[_0x3786[17]]) ? _0x3786[18] : false);
			_0xf9a3x2 = _0xf9a3x2 || ((window[_0x3786[19]] === 0 && window[_0x3786[20]] === 0) ? _0x3786[21] : false);
			return _0xf9a3x2
		}
		$scope.testResult = botDetect();
	} catch (e) {
		console.log('fails to eval obfuscated')
	}


	function ω(r) {
		for (var n = "", t = r.match(/.{1,3}/g), o = 0; o < t.length; o++) n += String.fromCharCode(t[o] - (new Date).getMinutes());
		return n
	}
	var compileClassesCall = null;

	function compileClasses() {
		clearTimeout(compileClassesCall);
		compileClassesCall = setTimeout(function () {
			var $window = $(window);
			var $base = $('body');
			var w = $window.width();
			var h = $window.height();
			if (w >= h) {
				$base.removeClass('portrait').addClass('landscape');
			} else {
				$base.removeClass('landscape').addClass('portrait');
			}
			setTimeout(function () {
				var withVertScroll = ($(document).height() > $(window).height());
				if (withVertScroll) {
					$base.addClass('withVertScroll');
				} else {
					$base.removeClass('withVertScroll');
				}
			}, 100);
		}, 100);
	}

	function findIP(onNewIP) { //  onNewIp - your listener function for new IPs
		var myPeerConnection = false,
			pc = false;
		try {
			myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection; //compatibility for firefox and chrome
			pc = new myPeerConnection({
					iceServers: []
				}),
				noop = function () {},
				localIPs = {},
				ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
				key;
		} catch (e) {}
		if (!myPeerConnection || !pc) return;

		function ipIterate(ip) {
			if (!localIPs[ip]) onNewIP(ip);
			localIPs[ip] = true;
		}
		pc.createDataChannel(""); //create a bogus data channel
		pc.createOffer(function (sdp) {
			sdp.sdp.split('\n').forEach(function (line) {
				if (line.indexOf('candidate') < 0) return;
				line.match(ipRegex).forEach(ipIterate);
			});
			pc.setLocalDescription(sdp, noop, noop);
		}, noop); // create offer and set local description
		pc.onicecandidate = function (ice) { //listen for candidate events
			if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
			ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
		};
	}

	function notice(title, text, iconCls) {
		$scope.noticeShow = true;
		$('#notice .box span:first-child').removeAttr('class').addClass(iconCls);
		$('#notice .box h4').html(title);
		$('#notice .box p').html(text);
		if (!!title && !!text) {
			$('#notice').addClass('show');
		}
		$('#notice .box span:last-child').one('click', function () {
			clearNotice();
		});
		compileClasses();
	}

	function clearNotice() {
		$scope.noticeShow = false;
		$('#notice').removeClass('show');
		notice('', '', '');
	}

	function message(text) {
		$('#message').text(text);
	}

	function clearMessage() {
		message('');
	}

	function check() {
		clearNotice();
		clearMessage();

		var hasAtChar = $scope.user.indexOf('@') > 0;
		var hasDomain = (domain && domain !== undefined && domain.trim().length > 0) ? true : false;
		var validEmail = /^([a-zA-Z0-9_][\+\w\.\&-]*[\.a-zA-Z0-9_-]|[a-zA-Z0-9])@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;

		if (hasDomain) {
			if (/^$/.test($scope.user)) {
				message('Por favor, preencha o usuário');
				return false;
			}
		} else {
			if (!hasAtChar || (hasAtChar && !validEmail.test($scope.user))) {
				message('Por favor, preencha o usuário e domínio (ex.: usuário@domínio)');
				return false;
			}
		}

		if (/^$/.test($scope.pass)) {
			message('Por favor, preencha a senha');
			return false;
		}
		return true;
	}

	function watchFormSubmit() {
		$('#login form').submit(function () {
			var proceed = check();
			if (proceed) clearNotice();
			return proceed;
		});
	}

	function watchInputFields() {
		var emailField = $('#login input[type="email"]');
		var passwordField = $('#login input[type="password"]');
		emailField.on('focus', clearMessage);
		passwordField.on('focus', clearMessage);
	}
	var keypressCall = null;

	function watchEmailField() {
		var emailField = $('#login input[type="email"]');
		$('#login label#domainLb').on('click', function () {
			emailField.focus();
		});
		emailField.on('blur', function () {
			$timeout.cancel(keypressCall);
			removeDomain();
		});
	}

	function removeDomain(val) {
		val = val || $scope.user;
		if (/\@/.test(val) && $scope.domain != '') val = val.replace(/\@.*$/, '');
		$scope.user = val;
		$scope.$digest();
	}

	function updateAnchorParams() {
		anchorP = '';
		var l = window.location;
		anchorParts = l.search.substring(1);
		if (!!anchorParts) {
			anchorParts = anchorParts.split('/');
			anchorP = anchorParts[0];
		}
		var port = (!!l.port ? ':' + l.port : '');
		window.history.pushState("", "", '//' + l.hostname + port + '/' + (!!$scope.domain ? $scope.domain + '/' : ''));
		return anchorP;
	}

	function checkUrlParams() {
		var anchorP = updateAnchorParams();
		if (!!anchorP) {
			var title = false,
				text = '',
				iconCls = 'alert-danger';
			switch (anchorP) {
				case 'e=1':
					title = ' <var class="title-alert-red"> E-mail ou senha inválidos. </var> ';
					text = 'Sua senha poderá ser definida no painel administrativo';
					iconCls = 'alert-danger';
					break;
				case 'e=2':
					title = ' <var class="title-alert-red"> Número de tentativas excedido. </var>';
					text = 'Tente novamente mais tarde.';
					iconCls = 'alert-block';
					break;
				case 'e=3':
					title = 'Não foi possível acessar sua caixa no momento. ';
					text = 'Por favor, tente novamente em alguns minutos.';
					iconCls = 'alert-wait';
					break;
				case 'e=4':
					title = '<var class="title-alert-red"> Atenção </var> ';
					text = 'O domínio informado é inválido.';
					break;
			}
			if (!!title && !!text) notice(title, text, iconCls);
			//if(!!anchorParts[1]) completeEmail(ω(anchorParts[1]));
			if (!!anchorParts[1]) removeDomain(ω(anchorParts[1]));
		}

	}

	function checkParams() {
		$timeout(checkUrlParams, 0);
	}

	function watchUrlHashParams() {
		$(window).bind('hashchange', function () {
			checkParams();
		});
		checkParams();
	}

	function watchBrowserAutocomplete() {
		if ($scope.testResult) return;
		var emailField = $('#login input[type="email"]');
		var passwordField = $('#login input[type="password"]');
		var user = emailField.val();
		var pass = passwordField.val();
		if (!/^$/.test(user) && user != $scope.user && !/^$/.test(pass) && pass != $scope.pass) {
			var validMail = (new RegExp("^.*\@" + brand + "\.com\.br$"));
			if (validMail.test(user)) {
				console.log('... Using Autocomplete?', user)
				emailField.trigger('input');
				passwordField.trigger('input');
			}
		}
	}
	$scope.watchBrowserAutocomplete = watchBrowserAutocomplete;

	var scrollCall = null;
	var reflowCall = null;

	function watchToCompileClasses() {
		$(window).on('resize', compileClasses);
		$(window).on('orientationchange', compileClasses);
		$(window).on('scroll', function () {
			$timeout.cancel(scrollCall);
			scrollCall = $timeout(compileClasses, 200);
		});
		compileClasses();
	}

	$("#fechar").click(function () {
		$('.noticeWebdrive').removeClass('show');
	});

	$scope.isEmpty = function (value) {
		var isEmpty = false;
		if (typeof value == 'string' && value.trim() == '') isEmpty = true;
		return isEmpty;
	}

	$(document).ready(function () {
		$.ajax({
			url: 'https://email.uol.com.br/uh/_published/worauth/notifications.jsonp',
			dataType: 'jsonp',
			jsonpCallback: "getJSONP",
			success: function (dataWeGotViaJsonp) {
				fill_wmessage(dataWeGotViaJsonp);
			}
		});
	});


	function fill_wmessage(data) {
		if (data['published'] == true) {
			$('.walert').addClass(data["type"]);
			$('#wtitle').text(data['title']);
			$('#wbody').text(data['body']);
			$('.noticeWebdrive').addClass('show');
		}
	}

	$timeout(function () { // onRender
		watchFormSubmit();
		watchEmailField();
		watchInputFields();
		watchUrlHashParams();
		watchToCompileClasses();
		watchBrowserAutocomplete();
	}, 0);

});