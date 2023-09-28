if(navigator.appVersion.indexOf("MSIE 9.")!=-1 || navigator.appVersion.indexOf("MSIE 8.")!=-1 || navigator.appVersion.indexOf("MSIE 7.")!=-1){
	// no carga plugin si es ie
}else{

// enquire.js
!function(a,b,c){var d=window.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=c(d):"function"==typeof define&&define.amd?define(function(){return b[a]=c(d)}):b[a]=c(d)}("enquire",this,function(a){"use strict";function b(a,b){var c,d=0,e=a.length;for(d;e>d&&(c=b(a[d],d),c!==!1);d++);}function c(a){return"[object Array]"===Object.prototype.toString.apply(a)}function d(a){return"function"==typeof a}function e(a){this.options=a,!a.deferSetup&&this.setup()}function f(b,c){this.query=b,this.isUnconditional=c,this.handlers=[],this.mql=a(b);var d=this;this.listener=function(a){d.mql=a,d.assess()},this.mql.addListener(this.listener)}function g(){if(!a)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!a("only all").matches}return e.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(a){return this.options===a||this.options.match===a}},f.prototype={addHandler:function(a){var b=new e(a);this.handlers.push(b),this.matches()&&b.on()},removeHandler:function(a){var c=this.handlers;b(c,function(b,d){return b.equals(a)?(b.destroy(),!c.splice(d,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){b(this.handlers,function(a){a.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var a=this.matches()?"on":"off";b(this.handlers,function(b){b[a]()})}},g.prototype={register:function(a,e,g){var h=this.queries,i=g&&this.browserIsIncapable;return h[a]||(h[a]=new f(a,i)),d(e)&&(e={match:e}),c(e)||(e=[e]),b(e,function(b){d(b)&&(b={match:b}),h[a].addHandler(b)}),this},unregister:function(a,b){var c=this.queries[a];return c&&(b?c.removeHandler(b):(c.clear(),delete this.queries[a])),this}},new g});
}
$(document).ready(function () {
    if ($(window).width() >= 990) {
        resetHeight()
    }
    if ($(".lang").fancySelect) {
	$(".lang").fancySelect();
    }
    /*if ($("h3.sarrow")) {
        $("h3.sarrow").click(function () {
            $(".box-method-wr").slideToggle()
        });
    }*/
/*    if ($("h3.pagoConTarjeta")) {
	$("h3.pagoConTarjeta").click(function () {
       	 $(".datosTarjeta").slideToggle()
	});
    }*/
    function setCaretPosition(elemId, caretPos) {
        var elem = document.getElementById(elemId);

        if(elem != null) {
            if(elem.createTextRange) {
                var range = elem.createTextRange();
                range.move('character', caretPos);
                range.select();
            }
            else {
                if(elem.selectionStart) {
                    elem.setSelectionRange(caretPos, caretPos);
                }
            }
        }
    }
	
	function isInArray(value, array) {
		for (var i = 0, j = array.length; i < j; i++) {
			if (array[i] === value) { return true }
		} return false;
	}

    $(".numbersOnly").keyup(function(e){
		var ctl = document.getElementById(this.id);
		if(ctl != null){
			var okChars = [8, 16, 35, 36, 37, 38, 39, 40,45, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
			var keyNum = e.which || e.keycode;
			var okey = isInArray(keyNum,okChars);
			if (!okey) {
				var startPos = ctl.selectionStart || getInputSelection(ctl);
				var antValue = this.value;
				var posValue = this.value.replace(/[^\d]/g, '');
				this.value = this.value.replace(/[^\d]/g, '');
				if(antValue.length > posValue.length){
					startPos = startPos - 1;
				}
				setCaretPosition(this.id,startPos);
			}
		}
	});
	
	function getInputSelection(el) {
    var start = 0, end = 0, normalizedValue, range,
        textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        range = document.selection.createRange();

        if (range && range.parentElement() == el) {
            len = el.value.length;
            normalizedValue = el.value.replace(/\r\n/g, "\n");

            // Create a working TextRange that lives only in the input
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());

            // Check if the start and end of the selection are at the very end
            // of the input, since moveStart/moveEnd doesn't return what we want
            // in those cases
            endRange = el.createTextRange();
            endRange.collapse(false);

            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    }

    return start;
	}
	
    $('input[type="text"]#cad1').on("change", function () {
        var a = Math.abs(parseInt(this.value, 10) || 1);
        this.value = a > 12 ? 12 : a
    });
    $('input[type="password"]#codseg').keypress(function(e) {
	code= (e.keyCode ? e.keyCode : e.which);
       if (code == 13) {
		validar();
	}
    });
    
    $(".btn-mail").click(function () {
/*     $("#lightbox, #lightbox-panel, #close-help, #close-mob").fadeIn(300);*/
	$("#lightbox, #lightbox-panel, #close-help, #close-mob").show();
        $("html, body").animate({
            scrollTop: "70%"
        })
    });
    $(".close-panel").click(function () {
/*        $("#lightbox, #lightbox-panel, #close-help, #close-mob").fadeOut(300);*/
        $("#lightbox, #close-help, #close-mob").hide();
    });
/*    //ir a pantalla 2 
    $("button#btn01").click(function () {
        document.location.href = "pago_moneda.html"
    });
    //ir a pantalla 3
    $("button#btn02").click(function () {
        document.location.href = "pago_domiciliado.html"
    });
    //ir a pantalla 4
    $("button#btn03").click(function () {
        document.location.href = "pago_aplazado.html"
    });
    //ir a pantalla 5
    $("button#btn04").click(function () {
        document.location.href = "autentificacion_cip.html"
    });
    //ir a pantalla 5
    $("button#btn05").click(function () {
        document.location.href = "autentificacion_cvc.html"
    });
    //ir a pantalla 7
    $("button#btn06").click(function () {
        document.location.href = "transfer.html"
    }); */
    
    $( "#footer" ).prepend( $( ".powered" ) );
    
    // ***************************************************
    // CAMBIO DE ORDEN DE ELEMENTOS EN RESPONSIVE
    // ***************************************************
	if (navigator.appVersion.indexOf("MSIE 9.") != -1 || navigator.appVersion.indexOf("MSIE 8.") != -1 || navigator.appVersion.indexOf("MSIE 7.") != -1){
	} else {
		// Cambio el orden de "Datos de la operación" y de la botonera al finalizar la operación
		enquire.register("screen and (max-width: 750px)", {
	        match : function() {
	        	$('div#body>div.col-wr.right').append($('.preft'));
	        	$('div#body>div.col-wr.right').append($('.result'));
	        	$('div#body>div.col-wr.right').append($('.verified'));
	        	
	        	// Cambio estilos dependiendo si existe el logo de comercio
	        	if ($('header#header>div.container>div.logoComercio>img').attr('src') !== '/sis/graficos/logotipos/comunes/vacio.gif') {
	        		// Muevo el logo de la entidad a la derecha
	        		$('header#header>div.container>div.logoEntidad').addClass('logoEntidadTieneLogoComercio');
	        		// Muevo el selector de idiomas para darle espacio al logo de la entidad
	        		$('header#header>div.container>div.lang-wr').addClass('idiomasTieneLogoComercio');
	        		// Min-height al header para que entre todo
	        		$('body div#container header#header').addClass('headerTieneLogoComercio');
	        	} else {
	        		$('header#header>div.container>div.logoComercio').css('display', 'none'); // elimino el logo comercio
	        		$('header#header>div.container>div.logoEntidad').addClass('logoEntidadNoHayLogoComercio');
	        	}
	        },
	        unmatch : function() {
	        	$('div#body').prepend($('.result'));
	        	$('div#body').append($('.verified'));
	        	$('div#body').prepend($('.header-mobile'));
	        	$('div.col-wr.right div.preft').insertAfter('div#body div.col-wr.right result-mod-wr');
	        	
	        	if ($('header#header>div.container>div.logoComercio>img').attr('src') !== '/sis/graficos/logotipos/comunes/vacio.gif') {
	        		$('header#header>div.container>div.logoEntidad').removeClass('logoEntidadTieneLogoComercio');
	        		$('header#header>div.container>div.lang-wr').removeClass('idiomasTieneLogoComercio');
	        		$('body div#container header#header').removeClass('headerTieneLogoComercio');
	        	} else {
	        		$('header#header>div.container>div.logoComercio').css('display', 'block');
	        		$('header#header>div.container>div.logoEntidad').removeClass('logoEntidadNoHayLogoComercio');
	        	}
	        }
		});
		// Cambio el orden de los botones en la botonera de pagar de la web antigua (ticket)
		enquire.register("screen and (max-width: 700px)", {
			match : function() {
				var botoneraTicket = $('div.preft div.col-wr.buttons-wr.right');
				if (botoneraTicket.length) botoneraTicket.prepend($('button[type="button"].btn-accept'));
			},
			unmatch : function() {
				var botoneraTicket = $('div.preft div.col-wr.buttons-wr.right');
				if (botoneraTicket.length) botoneraTicket.prepend($('button[type="button"].btn-cancel'));
			}
		});
		// 
		enquire.register("screen and (max-width: 500px)", {
	        match : function() {
	        	if ($('header#header>div.container>div.logoComercio>img').attr('src') !== '/sis/graficos/logotipos/comunes/vacio.gif') {
	            	$('header#header>div.container>div.logoEntidad').css('display', 'none');
	            	$('header#header div.container div.lang-wr').css('bottom', 'auto');
	            	$('body div#container header#header').removeClass('headerTieneLogoComercio');
	            	/*$('header#header div.container div.lang-wr').css('position', 'unset');
	            	$('header#header div.container div.lang-wr').css('float', 'right');*/
	            }
	        },
	        unmatch : function() {
	        	if ($('header#header>div.container>div.logoComercio>img').attr('src') !== '/sis/graficos/logotipos/comunes/vacio.gif') {
	        		$('header#header>div.container>div.logoEntidad').css('display', 'inline');
	        		$('header#header div.container div.lang-wr').css('bottom', '5px');
	        		$('body div#container header#header').addClass('headerTieneLogoComercio');
	        		/*$('header#header div.container div.lang-wr').css('position', 'absolute');*/
	            }
	        }
		});
		// Cambio el orden de los botones al finalizar la operación
		enquire.register("screen and (max-width: 360px)", {
	        match : function() {
	        	$('div.preft div.col-wr.buttons-wr.right input[type="button"].btn-print').insertAfter('div.preft div.col-wr.buttons-wr.right input[type="button"].btn-continue');
	        },
	        unmatch : function() {
	        	$('div.preft div.col-wr.buttons-wr.right input[type="button"].btn-print').insertBefore('div.preft div.col-wr.buttons-wr.right input[type="button"].btn-continue');
	        }
		});
	}
	
});


function resetHeight() {
    var a = 0;
    $(".equal-height").height("auto").each(function () {
        a = $(this).height() > a ? $(this).height() : a
    }).height(a)
}(function (e) {
    var d = e.document;
    if (!location.hash && e.addEventListener) {
        window.scrollTo(0, 1);
        var c = 1,
            b = function () {
                return e.pageYOffset || d.compatMode === "CSS1Compat" && d.documentElement.scrollTop || d.body.scrollTop || 0
            }, a = setInterval(function () {
                if (d.body) {
                    clearInterval(a);
                    c = b();
                    e.scrollTo(0, c === 1 ? 0 : 1)
                }
            }, 15);
        e.addEventListener("load", function () {
            setTimeout(function () {
                if (b() < 20) {
                    e.scrollTo(0, c === 1 ? 0 : 1)
                }
            }, 0)
        })
    }
})(this);
(function () {
    var a;
    a = window.jQuery || window.Zepto || window.$;
    a.fn.fancySelect = function (d) {
        var c, b;
        b = a.extend({
            forceiOS: false
        }, d);
        c = !! navigator.userAgent.match(/iP(hone|od|ad)/i);
        return this.each(function () {
            var e, i, g, j, f, h, k;
            j = a(this);
            if (j.hasClass("fancified") || j[0].tagName !== "SELECT") {
                return
            }
            j.addClass("fancified");
            j.css({
                width: 1,
                height: 1,
                display: "block",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0
            });
            j.wrap('<div class="evuala-select">');
            k = j.parent();
            if (j.data("class")) {
                k.addClass(j.data("class"))
            }
            k.append('<div class="trigger">');
            if (!(c && !b.forceiOS)) {
                k.append('<ul class="options">')
            }
            f = k.find(".trigger");
            g = k.find(".options");
            i = j.prop("disabled");
            if (i) {
                k.addClass("disabled")
            }
            h = function () {
                return f.text(j.find(":selected").text())
            };
            j.on("blur", function () {
                if (f.hasClass("open")) {
                    return setTimeout(function () {
                        return f.trigger("close")
                    }, 120)
                }
            });
            f.on("close", function () {
                f.removeClass("open");
                return g.removeClass("open")
            });
            f.on("click", function () {
                var l, m;
                if (!i) {
                    f.toggleClass("open");
                    if (c && !b.forceiOS) {
                        if (f.hasClass("open")) {
                            return j.focus()
                        }
                    } else {
                        if (f.hasClass("open")) {
                            m = f.parent();
                            l = m.offsetParent();
                            if ((m.offset().top + m.outerHeight() + g.outerHeight() + 20) > a(window).height()) {
                                g.addClass("overflowing")
                            } else {
                                g.removeClass("overflowing")
                            }
                        }
                        g.toggleClass("open");
                        if (!c) {
                            return j.focus()
                        }
                    }
                }
            });
            j.on("enable", function () {
                j.prop("disabled", false);
                k.removeClass("disabled");
                i = false;
                return e()
            });
            j.on("disable", function () {
                j.prop("disabled", true);
                k.addClass("disabled");
                return i = true
            });
            j.on("change", function (l) {
                if (l.originalEvent && l.originalEvent.isTrusted) {
                    return l.stopPropagation()
                } else {
                    return h()
                }
            });
            j.on("keydown", function (n) {
                var m, o, l;
                l = n.which;
                m = g.find(".hover");
                m.removeClass("hover");
                if (!g.hasClass("open")) {
                    if (l === 13 || l === 32 || l === 38 || l === 40) {
                        n.preventDefault();
                        return f.trigger("click")
                    }
                } else {
                    if (l === 38) {
                        n.preventDefault();
                        if (m.length && m.index() > 0) {
                            m.prev().addClass("hover")
                        } else {
                            g.find("li:last-child").addClass("hover")
                        }
                    } else {
                        if (l === 40) {
                            n.preventDefault();
                            if (m.length && m.index() < g.find("li").length - 1) {
                                m.next().addClass("hover")
                            } else {
                                g.find("li:first-child").addClass("hover")
                            }
                        } else {
                            if (l === 27) {
                                n.preventDefault();
                                f.trigger("click")
                            } else {
                                if (l === 13 || l === 32) {
                                    n.preventDefault();
                                    m.trigger("click")
                                } else {
                                    if (l === 9) {
                                        if (f.hasClass("open")) {
                                            f.trigger("close")
                                        }
                                    }
                                }
                            }
                        }
                    }
                    o = g.find(".hover");
                    if (o.length) {
                        g.scrollTop(0);
                        return g.scrollTop(o.position().top - 12)
                    }
                }
            });
            g.on("click", "li", function (l) {
                j.val(a(this).data("value"));
                if (!c) {
                    j.trigger("blur").trigger("focus")
                }
                g.find(".selected").removeClass("selected");
                a(l.currentTarget).addClass("selected");
                return j.val(a(this).data("value")).trigger("change").trigger("blur").trigger("focus")
            });
            g.on("mouseenter", "li", function () {
                var m, l;
                l = a(this);
                m = g.find(".hover");
                m.removeClass("hover");
                return l.addClass("hover")
            });
            g.on("mouseleave", "li", function () {
                return g.find(".hover").removeClass("hover")
            });
            e = function () {
                var l;
                h();
                if (c && !b.forceiOS) {
                    return
                }
                l = j.find("option");
                return j.find("option").each(function (n, m) {
                    m = a(m);
                    if (m.val() && !m.prop("disabled")) {
                        if (m.prop("selected")) {
                            return g.append('<li data-value="' + (m.val()) + '" class="selected">' + (m.text()) + "</li>")
                        } else {
                            return g.append('<li data-value="' + (m.val()) + '">' + (m.text()) + "</li>")
                        }
                    }
                })
            };
            j.on("update", function () {
                k.find(".options").empty();
                return e()
            });
            return e()
        })
    }
}).call(this);