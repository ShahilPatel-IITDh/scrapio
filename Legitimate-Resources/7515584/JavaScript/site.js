function numberWithCommas(t) {
	var e = t.toString().split(".");
	return e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), e.join(".")
}

function calculateRepayment(t, e) {
	if (t <= 2e3) return (t + .2 * t + .04 * t * e) / e;
	return (t + 400) * (.478 / 12 / (1 - Math.pow(1 + .478 / 12, -e)))
}

function addStep(t) {
	let e = document.getElementById("loan_amount"),
			n = document.getElementById("loan_amount_text"),
			a = parseInt(e.value);
	let x = new Event('change');
	var o = parseInt(document.getElementById("loan_amount").max),
			r = parseInt(document.getElementById("loan_amount").min);
	t > 0 && a + t <= o ? a += t : t < 0 && a + t >= r && (a += t), e.value = a, e.setAttribute("value", a.toString()), n.innerHTML = "$" + numberWithCommas(a.toString()), manualRedraw();
	e.dispatchEvent(x);
}

function chromeRedraw() {
	var t = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
			e = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
			n = /Edge/.test(navigator.userAgent);
	(t || e || n) && jQuery("#loan_amount").on("input change", function() {
			var t = ($(this).val() - $(this).attr("min")) / ($(this).attr("max") - $(this).attr("min"));
			jQuery(this).css("background-image", "-webkit-gradient(linear, left top, right top, color-stop(" + t + ", #FFA826), color-stop(" + t + ", #ffffff))")
	})
}

function manualRedraw() {
	var t = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
			e = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
			n = /Edge/.test(navigator.userAgent);
	if (t || e || n) {
			var a = jQuery("#loan_amount"),
					o = ($(a).val() - $(a).attr("min")) / ($(a).attr("max") - $(a).attr("min"));
			jQuery(a).css("background-image", "-webkit-gradient(linear, left top, right top, color-stop(" + o + ", #FFA826), color-stop(" + o + ", #ffffff))")
	}
}! function(t) {
	t(".loan-calculator").each(function(e, n) {
			var a = t(n),
					o = a.find('input[name="loan_amount"]'),
					r = a.find(".repayment-option.monthly output"),
					i = a.find(".repayment-option.fortnightly output"),
					l = a.find(".repayment-option.weekly output"),
					u = a.find(".medium-loan"),
					m = a.find(".small-loan"),
					p = a.find("select"),
					c = (t("#loan-term").val(), function(e) {
							var n = !1,
									a = 3,
									r = 12;
							if (parseInt(o.val()) <= 2e3 ? (n = !0, a = 3, r = 12, m.show(), u.hide()) : (n = !1, a = 13, r = 24, m.hide(), u.show()), n) {
									p.empty();
									for (var i = 3; i <= 3; ++i) i == 3? (option = t("<option selected></option>").attr("value", i).text( "91 Days"), p.append(option)) : (option = t("<option></option>").attr("value", i).text("91 Days"), p.append(option));
									for (var i = 4; i <= r; ++i) i == e? (option = t("<option selected></option>").attr("value", i).text(i + " MONTHS"), p.append(option)) : (option = t("<option></option>").attr("value", i).text(i + " MONTHS"), p.append(option));
									a
							} else {
									p.empty();
								for (var i = 3; i <= 3; ++i) i == 3? (option = t("<option selected></option>").attr("value", i).text( "91 Days"), p.append(option)) : (option = t("<option></option>").attr("value", i).text("91 Days"), p.append(option));
									for (var i = 4; i <= r; ++i) i == e? (option = t("<option selected></option>").attr("value", i).text(i + " MONTHS"), p.append(option)) : (option = t("<option></option>").attr("value", i).text(i + " MONTHS"), p.append(option));
							}
					});
			recalculate = function() {
					var t = calculateRepayment(parseInt(o.val()), jQuery("#loan-term").val());
					r.text("$" + numberWithCommas(t.toFixed(2)));
					var e = 12 * t / 26.0714;
					i.text("$" + numberWithCommas(e.toFixed(2)));
					var n = 12 * t / 52.1429;
					l.text("$" + numberWithCommas(n.toFixed(2)))
			}, p.on("change", function() {
					var t = p.val();
					c(t), recalculate()
			}), o.on("input change", function() {
					var e = parseInt(o.val());
					a.find(".loan_amount_text").text("$" + numberWithCommas(e));
					var n = t("#loan-term").val();
					c(n), recalculate()
			});
			var s = a.find(".repayment-option");
			s.click(function() {
					s.removeClass("active"), t(this).addClass("active")
			}), c(), recalculate(), chromeRedraw()
	})
}(jQuery);