/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


$.fn.ryderCool = function (option) {
	return this.each(function () {
		var $this = $(this);

		var deFault = {
			hook: 0.9,
			repeat: false,
			enter_check: true,
			leave_check: true,
			count: 0,
			enter: function enter() {},
			leave: function leave() {}
		};

		var setting = $.extend(deFault, option);

		function ryderScrolling() {
			var scrollTop = $(window).scrollTop(),
			    elementOffset = $this.offset().top,
			    distance = elementOffset - scrollTop,
			    windowHeight = $(window).height(),
			    breakPoint = windowHeight * setting.hook,
			    leavePoint = $this.height() - windowHeight * (1 - setting.hook);

			if (distance > breakPoint || distance < -leavePoint) {

				if (setting.count >= 1) {
					setting.enter_check = setting.repeat;
				}

				setting.leave_check && setting.leave($this);
				setting.leave_check = false;
			} else if (distance < breakPoint) {

				setting.enter_check && setting.enter($this);
				setting.enter_check && setting.count++;
				setting.enter_check = false;
				setting.leave_check = true;
			}
		}

		$(window).on("scroll", ryderScrolling).trigger("scroll");
	});
};

$.fn.BtnHover = function () {
	return this.each(function () {
		var $this = $(this);
		var _w = $this.width();
		var _h = $this.height();

		var deFault = {
			friction: $this.data("friction") || .3
		};

		function mouseLeave() {
			TweenMax.to($this, .3, {
				x: 0,
				y: 0
			});
		}

		function mouseMoving(e) {
			var x = e.offsetX;
			var y = e.offsetY;

			var mx = x - _w / 2;
			var my = y - _h / 2;

			TweenMax.to($this, .1, {
				x: mx * deFault.friction,
				y: my * deFault.friction
			});
		}

		$this.on("mousemove", mouseMoving);
		$this.on("mouseleave", mouseLeave);
	});
};

$(window).on("resize", function () {
	if ($(this).width() > 1024) {
		window.device = 'desktop';
	} else {
		window.device = 'mobile';
	}
}).trigger("resize");

$(function () {

	$("#preloadWrap").delay(1000).fadeOut(1000);

	$("[data-share]").each(function (i, el) {
		var type = el.dataset.share;
		$(el).click(function (e) {
			e.preventDefault();

			var winHeight = 360;
			var winWidth = 600;
			var winTop = screen.height / 2 - winHeight / 2;
			var winLeft = screen.width / 2 - winWidth / 2;
			var url = $(this).attr("href");

			if (type == "facebook") {
				window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
			} else if (type == "twitter") {
				window.open('https://twitter.com/share?url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
			} else if (type == "pinterest") {
				window.open('https://www.pinterest.com/pin/create/button/?url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
			} else if (type == "googleplus") {
				window.open('https://plus.google.com/share?url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
			} else if (type == "linkedin") {
				window.open('https://www.linkedin.com/cws/share?url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
			} else if (type == "weibo") {
				window.open('https://service.weibo.com/share/share.php?url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
			} else if (type == "line") {
				window.open('https://line.naver.jp/R/msg/text/?' + url);
			}
		});
	});

	var wow = new WOW({
		callback: function callback(el) {}
	}).init();

	$("[data-friction]").BtnHover();

	$(".hamburger-area").click(function () {
		$(this).toggleClass("is-show");
		$(".topmenuWrap").fadeToggle(500);
	});

	function getRandom(min, max) {
		return Math.random() * (max - min) + min;
	}

	function RyderBall(el) {
		var _this = this;

		this.$el = $(el);
		this.x = getRandom(0.1, 0.5);
		this.y = 0.1;

		this.init = function () {

			if (device == 'mobile') {
				var _mobileBall = $("<div class='mobile-ball'>").css({
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					backgroundColor: '#cd7be8',
					borderRadius: '50%'
				});

				_this.$el.append(_mobileBall);

				return false;
			}

			var camera, scene, renderer;
			var uniforms;

			camera = new THREE.Camera();
			camera.position.z = 1;

			scene = new THREE.Scene();

			var geometry = new THREE.CircleBufferGeometry(1, 50);

			uniforms = {
				iTime: { value: 1.0 },
				iResolution: { value: new THREE.Vector2() },
				iMouse: { value: new THREE.Vector2() },
				ryder: { value: new THREE.Vector2(_this.x, _this.y) }
			};

			var material = new THREE.ShaderMaterial({
				uniforms: uniforms,
				vertexShader: "\n\t\t        \tvoid main() {\n\t\t        \t    gl_Position = vec4( position, 1.0 );\n\t\t        \t}\n\t\t        ",
				fragmentShader: "\n\t\t        \t#define TAU 3.2831853071\n\t\t        \t#define MAX_ITER 5\n\t\t        \tvec3 backgroundColor = vec3(0.94,0.47,0.92);\n\t\t        \tvec3 color = vec3(0.1,0.2,0.2);\n\t\t        \tfloat speed = 0.4;\n\t\t        \tfloat brightness = 0.76;\n\n\t\t        \tuniform float iTime;\n\t\t        \tuniform vec2 iResolution;\n\t\t        \tuniform vec2 iMouse;\n\t\t        \tuniform vec2 ryder;\n\n\t\t        \tvoid main()\n\t\t        \t{\n\t\t        \t    vec2 uv = gl_FragCoord.xy/iResolution.xy;\n\n\t\t        \t    uv *= ryder;\n\t\t        \t    vec2 p = mod(uv * TAU, TAU) - 33.0;\n\t        \t        vec2 i = vec2(p);\n\t        \t        float c = 0.5;\n\t        \t        float inten = 0.006;\n\t        \t        for (int n = 0; n < MAX_ITER; n++) {\n\t        \t            float t = iTime * speed * (1.0 - (1.5 / float(n + 1)));\n\t        \t            i = p + vec2(cos(t + i.x) + sin(t - i.y), sin(t + i.y) + cos(t - i.x));\n\t        \t            c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));\n\t        \t        }\n\t        \t        c /= float(MAX_ITER);\n\t        \t        c = 1.0 - pow(c, brightness);\n\t        \t        vec3 rgb = vec3(pow(abs(c), 6.0));\n\t        \t        vec4 finalcolor = vec4(rgb * color + backgroundColor, 1.0);\n\n\t\t        \t    gl_FragColor = vec4(finalcolor);\n\t\t        \t}\n\t\t        "
			});

			var mesh = new THREE.Mesh(geometry, material);
			scene.add(mesh);

			renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true
			});
			renderer.setPixelRatio(window.devicePixelRatio);

			_this.$el.append(renderer.domElement);

			var onWindowResize = function onWindowResize(event) {
				var _width = _this.$el.outerWidth(true);
				var _height = _this.$el.outerHeight(true);
				renderer.setSize(_width, _height);
				uniforms.iResolution.value.x = renderer.domElement.width;
				uniforms.iResolution.value.y = renderer.domElement.height;
			};

			var onMouseMove = function onMouseMove(event) {
				uniforms.iMouse.value.x = event.clientX / window.innerWidth * 2 - 1;
				uniforms.iMouse.value.y = -(event.clientY / window.innerHeight) * 2 + 1;
			};

			var animate = function animate() {
				requestAnimationFrame(animate);
				render();
			};

			var render = function render() {
				uniforms.iTime.value += 0.01;
				renderer.render(scene, camera);
			};

			onWindowResize();
			window.addEventListener('resize', onWindowResize, false);
			window.addEventListener('mousemove', onMouseMove, false);

			animate();
		};
	}

	$(".ball-area >div").each(function (i, el) {
		new RyderBall(el).init();

		TweenMax.to($(el).children(), 3, {
			y: "30",
			yoyo: true,
			repeat: -1,
			delay: i * 0.3,
			ease: Power1.easeInOut
		});
	});

	var entersite = anime.timeline({
		autoplay: false
	});

	entersite.add({
		targets: ".ball-area >div",
		delay: anime.stagger(200),
		opacity: {
			value: [0, 1],
			duration: 1000,
			easing: 'easeOutCubic'
		},
		translateY: [{
			value: [-200, 0],
			duration: 3000
		}],
		translateX: [{
			value: [100, 0],
			duration: 3000
		}],
		scale: [{
			value: [0, 1],
			duration: 2000
		}]
	}).add({
		targets: ".sport-area >div",
		easing: 'easeOutCubic',
		opacity: [0, 1],
		translateY: [30, 0],
		delay: anime.stagger(200)
	}, 1000);

	$(".ball-area").ryderCool({
		enter: function enter(el) {
			TweenMax.delayedCall(1, function () {
				entersite.play();
			});
		}
	});

	// index join ball 另外寫 懶得模組化了
	$(".join-ball-area >div").each(function (i, el) {
		new RyderBall(el).init();

		TweenMax.to($('canvas', el), 3, {
			y: "30",
			yoyo: true,
			repeat: -1,
			delay: i * 0.3,
			ease: Power1.easeInOut
		});
	});

	var join_entersite = anime.timeline({
		autoplay: false
	});

	join_entersite.add({
		targets: ".join-ball-area >div",
		delay: anime.stagger(200),
		opacity: {
			value: [0, 1],
			duration: 1000,
			easing: 'easeOutCubic'
		},
		translateY: [{
			value: [-200, 0],
			duration: 3000
		}],
		translateX: [{
			value: [100, 0],
			duration: 3000
		}],
		scale: [{
			value: [0, 1],
			duration: 2000
		}]
	});

	$(".join-ball-area").ryderCool({
		enter: function enter(el) {
			TweenMax.delayedCall(1, function () {
				join_entersite.play();
			});
		}
	});
});

/***/ })

/******/ });