function changeCGV(radio) {
		if (radio.id.includes("sofinco")){
			document.getElementById("cgv-text").innerHTML = "<span class='fs15-lg fs32-sm'>Un crédit vous engage et doit être remboursé. Vérifiez vos capacités de remboursement avant de vous engager.</span>";
		} else {
			if (!radio.id.includes("woodies")){
				document.getElementById("cgv-text").innerHTML = "";
			}
		}
	}
var hipay_error;

if( document.readyState !== 'loading' ) {
	myInitCode();
} else {
	document.addEventListener('DOMContentLoaded', function () {
		myInitCode();
	});
}

// window.addEventListener("pageshow", function(evt){
//     if(evt.persisted){
//         // myInitCode();
//     }
// }, false);

function myInitCode()  {

	if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)){
		$("button[form]").click(function(el){
			if ( !HTMLFormElement.prototype.reportValidity ) {
				HTMLFormElement.prototype.reportValidity = function() {
					var submitButtons = this.querySelectorAll( "button, input[type=submit]" );
					for ( var i = 0; i < submitButtons.length; i++ ) {
						if ( submitButtons[ i ].type === "submit" ) {
							submitButtons[ i ].click();
							return;
						}
					}
				}
			}
			if(  $("input[name=shipping]:checked").length + $("input[name=shipping]:checked").parent().find("input[name=shipping-method]:checked").length + $("input[name=payment]:checked").length + $("input[name=payment]:checked").parent().find("input[name=shipping-method]:checked").length == 0){
				$(".no-select-error").show();
			}else{
				$("form#"+($(this).attr('form'))).submit();				
			}
		});
	}

	$( document ).on( "click", "label[for=cgv]", function() { $( "#tooltip" ).remove(); })
		noTooltip = "";
		if(window.matchMedia( "(max-device-width: 46.875rem)" ).matches){
			noTooltip = ":not(.notooltip-sm) ";
		}
	$( ".shipping .tooltip:not(.url)"+noTooltip+", .address .tooltip"+noTooltip+", .payment .tooltip"+noTooltip+", .form-payment .cgv .tooltip"+noTooltip+"" ).tooltipWB({ nextTo: ".shop-recap" });
	$( ".shipping .tooltip.url"+noTooltip+"" ).tooltipWB({ nextTo: ".shop-recap", url: true });
	$( ".add_custom .cgv .tooltip"+noTooltip+", .home-custom .tooltip"+noTooltip+"" ).tooltipWB({ scrollEnd : true });

	$( ".profil .tooltip"+noTooltip+"" ).tooltipWB({ avatar: true });
	$( ".detail-ticket .tooltip"+noTooltip+"" ).tooltipWB({ ticket: true });
	$( ".itemWrapper .tooltip"+noTooltip+"" ).tooltipWB({ bubbling: false });

	if ( $( ".fast-account" ).length ) {
		$( document ).on( "change", "select[name=type]", function() {
			if ( [ 'association', 'magasin' ].indexOf( $( this ).val() ) >= 0 ) {
				$(".fade-screen").removeClass("hidden").show()
				if ( $( "div[data-tooltip]" ).hasClass( "checkout" ) ) {
					$( "div[data-tooltip]" ).tooltipWB({ nextTo: ".shop-recap" }).trigger( "click" );
				} else {
					$( ".fast-account .tooltip" ).tooltipWB().trigger( "click" );
				}
			} else {
				$( "#tooltip" ).remove();
			}
		})
	}


	$("label.shipping-retrait").parent().find(">:not(.tooltip):not(.shipping-method)").click(function(event){
		event.stopPropagation();
		event.preventDefault();
		$(".no-select-error").hide();
		$(".shop-recap .address.delivery").each(function(index, el) {
			if($(el).hasClass('retrait')) {
				$(el).find(".col-12").html("");
				$(el).hide();
			}else{
				$(el).show();
			}
		});

		$(this).parent().find("input[name=shipping-method]").click(function(event) {
			if(window.matchMedia( "(max-device-width: 46.875rem)" ).matches){
				$( this ).closest( '.shipping-method' ).addClass( 'close' );
			}
			var tt = $(this).parent().find(".info").data('tooltip');
			var html_text_retrait = '<div><span class="fwb">'+tt.name+'</span></div><div class="mt20">'+tt.address+'</div>';
			$(".shop-recap .address.delivery").each(function(index, el) {
				if( $("input[name=shipping].multiple:checked").length>0 ){
					if($(el).hasClass('retrait')) {
						$(el).find(".col-12").html(html_text_retrait);
						$(el).show();
					}else{
						$(el).hide();
					}
				}else{
					if($(el).hasClass('retrait')) {
						$(el).find(".col-12").html("");
						$(el).hide();
					}else{
						$(el).show();
					}
				}
			});
		});

		var enabled = !!$(this).parent().find(".multiple:checked").length;
		if(enabled){
			$(this).parent().siblings("div").find(".shipping-method").addClass('close');
			$(this).parent().find("input#"+$(this).parent().find("label").attr("for")).prop('checked', false);
			$(this).parent().siblings("div").find("input[name=shipping-method]").prop('checked', false);
			$(this).parent().find("input[name=shipping-method]").prop('checked', false);
		}else{
			$(this).parent().siblings("div").find(".shipping-method").addClass('close');
			$(this).parent().siblings("div").find("input[name=shipping-method]").prop('checked', false);
			$(this).parent().find("input[name=shipping-method]").prop('checked', false);
			$(this).parent().find("input#"+$(this).parent().find("label").attr("for")).prop('checked', true);
			$(this).parent().find(".shipping-method").removeClass('close');
		}
		dev2908 = true;
		if(dev2908){
			var form_valid = false;
			$("#shipping_method_form").on("submit", function(ev){
				if(!form_valid) {
					ev.preventDefault();
					ev.stopPropagation();
					$.post("/shipping_tel.php", {
						tel: $("#phone_zone input[type=tel]").get(0).value.replace(/[^\dA-Z]/g, ''),
						iso: $("#phone_zone select").get(0).value
					}, function (opt) {
						if (opt.mobile) $("button[form=shipping_method_form]").attr({"disabled": false});
						else $("button[form=shipping_method_form]").attr({"disabled": "disabled"});
						$("#phone_zone .label").html(opt.label);
						status = opt.mobile ? " valid" : (opt.number != "" ? " invalid" : " missing");
						$("#phone_zone").removeClass("valid invalid missing").addClass(status);
						if (status == " valid") {
							form_valid = true;
							$("#shipping_method_form").submit();
						}
					}, "json");
				}
			})
		$("#phone_zone").remove();
		let input = $(this);
		$.post("/shipping_tel.php", {}, function (opt) {
			status = opt.mobile ? " valid" : ( opt.number != "" ? " invalid" : " missing" ) ;
			if(opt.mobile) $("button[form=shipping_method_form]").attr({"disabled":false});
			else $("button[form=shipping_method_form]").attr({"disabled":"disabled"});
			var html_phone = "<div id='phone_zone' class='col-24 p20"+status+"'>" +
				"<div class='fullW row'>" +
				"<div class='label col-14 col-sm-24'>"+opt.label+"</div>" +
				"<div class='col-10 col-sm-24 mt20-sm number_zone'><div class='input row bgBlanc'></div></div>" +
				"</div>" +
				"</div>";
			var select = "<div class='col-8 col-sm-5 select'><select>";
			$.each(opt.drop_flag, function(i,e){
				select += "<option data-img=\""+e.flag+"\""+(e.actif?"selected":"")+" data-name=\""+e.name+"\" value='"+e.iso2+"'>("+e.tel+")</option>";
			});
			select += "</select></div>";

			input.parent().append( html_phone );

			$("#phone_zone .input").append(select);
			$("#phone_zone .input").append("<div class='col-16 col-sm-19'><input type='tel' value='"+opt.number+"' class='fwb clrNoir fs18 pl10 p0 p10-sm'/></div>");
			custom_select($("#phone_zone .input .select").get(0));
			$("#phone_zone .input input[type=tel]").on('input', function (e) {
				var target = e.target, position = target.selectionEnd, length = target.value.length;
				target.value = target.value.replace(/[^\dA-Z]/g, '').replace(/(.{2})/g, '$1 ').trim();
				target.selectionEnd = position += ((target.value.charAt(position - 1) === ' ' && target.value.charAt(length - 1) === ' ' && length !== target.value.length) ? 1 : 0);


				$("#phone_zone .label").html(opt.label);
				status = " missing" ;
				$("#phone_zone").removeClass("valid invalid missing").addClass(status);
				$("button[form=shipping_method_form]").attr({"disabled":false});
				/*$.post("/shipping_tel.php", {tel : $("#phone_zone input[type=tel]").get(0).value.replace(/[^\dA-Z]/g, ''), iso : $("#phone_zone select").get(0).value}, function (opt) {
					if(opt.mobile) $("button[form=shipping_method_form]").attr({"disabled":false});
					else $("button[form=shipping_method_form]").attr({"disabled":"disabled"});
					$("#phone_zone .label").html(opt.label);
					status = opt.mobile ? " valid" : ( opt.number != "" ? " invalid" : " missing" ) ;
					$("#phone_zone").removeClass("valid invalid missing").addClass(status);

				}, "json");*/
			});

			$("#phone_zone .input input[type=tel]").trigger('input');

		}, "json");
		}else{
			$("button[form=shipping_method_form]").attr({"disabled":false})
		}

	})

	if($(".shipping.bgRouge").length > 0){		
		if($("#fancy-error").length == 0){
			$("body").after("<div id='fancy-error'></div>");
		}
		$('#fancy-error').html($('#noShipping-popup').html());
		$.fancybox({
			'autoScale': true,
			'minWidth':450,
			'maxWidth':800,
			'autoDimensions': true,
			'centerOnScroll': true,
			'href' : "#fancy-error",
			'closeBtn':false
		})
	}

	$("button[form=shipping_method_form], button[form=payment_method_form]").click(function(ev){
		if(  $("input[name=shipping]:checked").length + $("input[name=shipping]:checked").parent().find("input[name=shipping-method]:checked").length + $("input[name=customer_shopping_points_spending]:checked").length + $("input[name=payment]:checked").length + $("input[name=payment]:checked").parent().find("input[name=shipping-method]:checked").length == 0){
			$(".no-select-error").show();
		}
	})
	
	$( "div.woodies[data-tooltip]" ).tooltipWB({ nextTo: ".shop-recap" }).trigger( "click" );

	$( document ).on( "click", ".comment", function() {$( ".commentaire textarea" ).toggle(); })


	if(window.matchMedia( "(max-device-width: 61.63rem)" ).matches){
        /* Checkout Payment */
        $(".option-payment>*").on("click",function(ev){
			if ( $(this).parent().hasClass('selected') ) {
				$(this).parent().toggleClass('selected-payment');
			}else{
				$('.selected-payment').toggleClass('selected-payment');
				$(this).parent().toggleClass('selected-payment');
			}
			$(ev.currentTarget).siblings("input").click();
        });
        /* Checkout-shipping */
        $(".label-sm").on("click",function(ev){
            if($(this).hasClass('selected')){
                $('.selected').toggleClass('selected');
            }else{
                $('.selected').toggleClass('selected');
                $(this).toggleClass('selected');
                $(this).siblings('.label-sm').toggleClass('selected');
                $(this).find(".left").toggleClass('bdLeft');
                $(this).find(".right").toggleClass('bdRight');
            }
        });
    }

	$("input[name=payment]").change(function(e){
		$(".no-select-error").hide();
		methode = e.currentTarget.id;

        $("#alma-payment").remove();
        $(".alma-frag").remove();
        $('.alma-choice_installement').remove();

		if($("#hipay-form").length > 0){
			$("#hipay-form").remove();
		}

		$(".zone_btn_payment").find("button").remove();

		if(methode.startsWith("hipay_")){

			loadHipay = function(){
				jQuery.ajax({
					url: "/js/hipay.js",
					dataType: 'script',
					async: true
				});
			}
			/** chargement du SDK Hipay **/
			if(typeof  HiPay == "undefined"){
				jQuery.ajax({
					url: "https://libs.hipay.com/js/sdkjs.js",
					dataType: 'script',
					success: loadHipay,
					async: false
				});
			}else{
				loadHipay();
			}

		}else{
			// $("button[id=hipay-submit-button]").attr({"disabled": false});
			$("button[form=hipay-form]").attr({
				"id": "",
				"disabled" : false,
				"form" : "payment_method_form",
			});

            if(methode.startsWith("alma")){
                $("button[form=payment_method_form]").prop('disabled', true);

                loadAlma = function(){
                    jQuery.ajax({
                        url: "/js/alma.js",
                        dataType: 'script',
                        async: true
                    });
                }

                /** chargement du SDK Hipay **/
                if(typeof  Alma == "undefined"){
                    jQuery.ajax({
                        url: "https://unpkg.com/@alma/fragments@1.x/dist/alma-fragments.umd.js",
                        dataType: 'script',
                        success: loadAlma,
                        async: false
                    });
                }else{
                    loadAlma();
                }
            }else{
                $(this).nextAll(".zone_btn_payment").append($("button[form=payment_method_form]").clone().removeClass("btnAjouterCheckout col-sm-11").prop('disabled', false));
                $("button[form=payment_method_form]").prop('disabled', false);
            }
		}
	})

	if( $("label.shipping-retrait").length == 1 ){
        $("label.shipping-retrait").parent().find(">:not(.tooltip):not(.shipping-method)").get(0).click();
    }

	/***** Gestion retour d'erreur hipay ****/
	hipay_error = new URLSearchParams(window.location.search);
	if(hipay_error.has("hipay_error")){
		$("#hipay_default").click();
	}

};

var custom_select = function(elem){
	var x, i, j, l, ll, selElmnt, a, b, c;
	/* Look for any elements with the class "custom-select": */
	x = elem;
	selElmnt = x.getElementsByTagName("select")[0];
	selElmnt.style.display = "none";
	ll = selElmnt.length;
	/* For each element, create a new DIV that will act as the selected item: */
	a = document.createElement("DIV");
	a.setAttribute("class", "select-selected");
	i = document.createElement("IMG");
	i.src = selElmnt.options[selElmnt.selectedIndex].dataset.img;
	a.innerHTML = i.outerHTML + selElmnt.options[selElmnt.selectedIndex].innerHTML;
	elem.appendChild(a);
	/* For each element, create a new DIV that will contain the option list: */
	b = document.createElement("DIV");
	b.setAttribute("class", "select-items select-hide");
	for (j = 0; j < ll; j++) {
		/* For each option in the original select element,
        create a new DIV that will act as an option item: */
		c = document.createElement("DIV");
        c_name = document.createElement("DIV");
		i = document.createElement("IMG");
		i.src = selElmnt.options[j].dataset.img;
		c_name.innerHTML = selElmnt.options[j].dataset.name;
        c_name.style.position = "absolute";
        c_name.style.left = "20%";
        c_name.style.top = "0%";
        c_name.style.whiteSpace = "nowrap";
		c.innerHTML = i.outerHTML + selElmnt.options[j].innerHTML + c_name.outerHTML;
		c.addEventListener("click", function (e) {
			/* When an item is clicked, update the original select box,
            and the selected item: */
			var y, i, k, s, h, sl, yl;
			s = this.parentNode.parentNode.getElementsByTagName("select")[0];
			sl = s.length;
			h = this.parentNode.previousSibling;
			for (i = 0; i < sl; i++) {
				s.options[i].removeAttribute("selected");
				if (s.options[i].innerHTML+s.options[i].dataset.name == this.innerHTML.replace(/(<([^>]+)>)/gi, "")) {
					s.selectedIndex = i;
					s.options[i].setAttribute("selected", "selected");
					html = $(this).clone();
					html.find("div").remove();
                    h.innerHTML = html.html();

					y = this.parentNode.getElementsByClassName("same-as-selected");
					yl = y.length;
					for (k = 0; k < yl; k++) {
						y[k].removeAttribute("class");
					}
					this.setAttribute("class", "same-as-selected");
					break;
				}
			}
			h.click();
			$("#phone_zone .input input[type=tel]").trigger('input');
		});
		// if (selElmnt.options[selElmnt.selectedIndex].innerHTML == c.innerHTML.replace(/(<([^>]+)>)/gi, "")) {
        if(selElmnt.options[j].selected){
			c.setAttribute("class", "same-as-selected");
		}
		b.appendChild(c);
	}
	elem.appendChild(b);
	a.addEventListener("click", function (e) {
		/* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
		e.stopPropagation();
		closeAllSelect(this);
		this.nextSibling.classList.toggle("select-hide");
		this.classList.toggle("select-arrow-active");
	});


	function closeAllSelect(elmnt) {
		/* A function that will close all select boxes in the document,
        except the current select box: */
		var x, y, i, xl, yl, arrNo = [];
		x = document.getElementsByClassName("select-items");
		y = document.getElementsByClassName("select-selected");
		xl = x.length;
		yl = y.length;
		for (i = 0; i < yl; i++) {
			if (elmnt == y[i]) {
				arrNo.push(i)
			} else {
				y[i].classList.remove("select-arrow-active");
			}
		}
		for (i = 0; i < xl; i++) {
			if (arrNo.indexOf(i)) {
				x[i].classList.add("select-hide");
			}
		}
	}

	/* If the user clicks anywhere outside the select box,
    then close all select boxes: */
	document.addEventListener("click", closeAllSelect);
}