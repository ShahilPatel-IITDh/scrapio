function toReal(e, t) {
    return t + " " + e.formatMoney(2, ",", ".");
}
Number.prototype.formatMoney = function(e, t, a) {
    var r = this,
        i = ((e = isNaN((e = Math.abs(e))) ? 2 : e), (t = null == t ? "." : t), (a = null == a ? "," : a), r < 0 ? "-" : ""),
        o = parseInt((r = Math.abs(+r || 0).toFixed(e))) + "",
        n = (n = o.length) > 3 ? n % 3 : 0;
    return (
        i +
        (n ? o.substr(0, n) + a : "") +
        o.substr(n).replace(/(d{3})(?=d)/g, "$1" + a) +
        (e ?
            t +
            Math.abs(r - o)
            .toFixed(e)
            .slice(2) :
            "")
    );
};

var cart = {
    session: function() {
        return jQuery("html").attr("data-session");
    },
    idStore: function() {
        return jQuery("html").attr("data-store");
    },
    removeProduct: function(e) {
        var self = this;
        function animateCleanCart() {
            // animate loadind click button
            jQuery(e).addClass('loading');
            setTimeout(() => {
                jQuery(e).removeClass('loading');
                cart.listProduct();
            }, 1000);
        }

        var t = parseInt(jQuery(e).attr("data-id")),
            a = parseInt(jQuery(e).attr("data-variant")),
            r = 0 == a ? "" : "/" + a,
            i = "" == jQuery(e).attr("data-add") ? "" : "/?additional_information=" + jQuery(e).attr("data-add").replace(/br>/g, "br/>");
        jQuery
            .ajax({
                method: "DELETE",
                url: "/web_api/carts/" + cart.session() + "/" + t + r + i
            })
            .success(function(e) {
                console.log(e), 
                animateCleanCart();
            })
            .fail(function(e) {
                // Exibe a mensagem de erro para produtos que nao podem ser removidos
                const infoError = `<div class="btn-info al-error" role="alert" style="z-index: 10203040">
                    <div class="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                        <p class="info-response">Para remover produtos combinados, utilize a opção "Limpar carrinho" ou clique em "Finalizar compra".</p>
                    </div>
                </div>`
                
                jQuery('body').append(infoError);

                setTimeout(() => {
                    jQuery('.al-error').remove();
                }, 4000);

                console.log("error remove product: ", e.responseText), cart.listProduct();
            });
    },
    clearProduct: function() {

        function animateCleanCart() {
            // animate loadind click button
            jQuery('.clean-cart').addClass('loading');
            setTimeout(() => {
                jQuery('.clean-cart').removeClass('loading');
                cart.listProduct();
                jQuery(".cart-preview-footer .value").html("R$ 0.00");
                jQuery('.cart-preview-footer').hide();
            }, 1000);
        }

        jQuery.ajax({
            method: "DELETE",
            url: "/web_api/carts/" + cart.session()
        })
        .done(function(response) {
            animateCleanCart();
        })
        .fail(function( jqXHR, status, errorThrown ){
            var response = $.parseJSON( jqXHR.responseText );
            console.log(response);
        });

    },
    listProduct: function() {
        jQuery
            .ajax({
                method: "GET",
                url: "/web_api/cart/" + cart.session()
            })
            .success(function(e) {
                cart.forProduct(e);
            })
            .fail(function(e) {
                var t = jQuery.parseJSON(e.responseText);
                cart.forProduct([]), console.log("error list product: ", t);
            });
    },
    number: function(e) {
        jQuery(".cart-toggle .cart-quantity").text(e);
    },
    total: function(e) {
        jQuery(".plugoo-cart-preview-sidebar .total .value").text(toReal(parseFloat(e), "R$"));
    },
    filterVariantSimple: function(e, t) {
        for (var a = 0; a < e.length;) {
            if (e[a].Variant.Sku[0].value == t) return e[a].Variant.id;
            a++;
        }
        return 500;
    },
    forProduct: function(e) {
        var t = jQuery(".plugoo-cart-preview-sidebar .cart-preview-content .list");
        t.find("*").remove(), t.parent().removeClass("empty");
        var a = jQuery(".botao-commerce.buy"),
            r = (a.hasClass("https_true") ? "" : "https://" + cart.idStore() + ".commercesuite.com.br") + "/checkout?session_id=" + cart.session() + "&store_id=" + cart.idStore();
        a.attr("href", r);
        var i = 0,
            o = 0,
            n = [];
        e.length ?
            (e.forEach(function(e) {
                    (e = e.Cart), console.log(e);
                    var a = e.additional_information.replace(/\//g, "");
                    (prices = e),
                    t.append(cart.templateProduct(e.product_id, e.variant_id, e.product_name, e.product_image.thumbs[90].https, e.quantity, e.price, e.product_url.https, a, e.additional_info_kit)),
                        (i += parseInt(e.quantity)),
                        (o += parseFloat(e.price) * parseInt(e.quantity)),
                        n.push(parseInt(e.product_id));
                }),
                jQuery('.cart-preview-footer').show(),
                jQuery(".clean-cart").show(),
                cart.number(i),
                cart.total(o)) :
                (setTimeout(function() {
                    t.append('<div class="error"><div class="pg-icon-cart-empty"><svg version="1.1" class="pg-cart-empty" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999;" xml:space="preserve"><g><g><g><path d="M180.213,395.039c-32.248,0-58.48,26.232-58.48,58.48s26.233,58.48,58.48,58.48c32.248,0,58.48-26.239,58.48-58.48C238.693,421.278,212.461,395.039,180.213,395.039z M180.213,476.201c-12.502,0-22.676-10.168-22.676-22.676s10.174-22.676,22.676-22.676c12.508,0,22.676,10.168,22.676,22.676S192.721,476.201,180.213,476.201z"></path><path d="M392.657,395.039c-32.254,0-58.486,26.233-58.486,58.48c0,32.248,26.233,58.48,58.486,58.48c32.242,0,58.48-26.233,58.48-58.48S424.899,395.039,392.657,395.039z M392.657,476.195c-12.508,0-22.682-10.174-22.682-22.676s10.174-22.67,22.682-22.67c12.502,0,22.676,10.162,22.676,22.67C415.333,466.027,405.165,476.195,392.657,476.195z"></path><path d="M154.553,377.143h278.676c9.894,0,17.902-8.014,17.902-17.902c0-9.888-8.014-17.902-17.902-17.902H169.776L118.522,26.96c-1.229-7.531-7.089-13.45-14.602-14.757L35.295,0.268c-9.769-1.695-19.012,4.828-20.707,14.566c-1.701,9.745,4.828,19.012,14.566,20.707l56.075,9.751l51.653,316.825C138.298,370.788,145.775,377.143,154.553,377.143z"></path></g></g></g><g><g><path d="M494.24,115.969c-3.372-4.625-8.742-7.358-14.465-7.358H115.765v35.804h339.454l-36.825,114.573H141.425v35.804h290.02c7.769,0,14.662-5.025,17.043-12.424l48.336-150.378C498.572,126.543,497.611,120.588,494.24,115.969z"></path></g></g></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"> <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" /></svg></div>Carrinho vazio</div>')
                    jQuery('.cart-preview-footer').hide();
                },10),
                jQuery(".clean-cart").hide(),
                t.parent().addClass("empty"),
                cart.number(0),
                jQuery("body")
                .find(".add-cart .buy-product")
                .each(function() {
                    jQuery(this).hasClass("active") && jQuery(this).removeClass("active").find(".text").text("Comprar");
                }));
    },
    startCart: function() {
            jQuery(".cart-toggle").click(function() {
                cart.showCart();
            });

            // limpa carrinho
            jQuery('.clean-cart').click(function() {
                cart.clearProduct();
            });
            
            jQuery(".add-to-cart").click(function() {
                setTimeout(() => {
                    cart.listProduct();
                }, 1e3);
            });

            jQuery(".botao-continuar-comprando").click(function() {
                setTimeout(() => {
                    cart.listProduct();
                }, 1e3);
            });
            
            // jQuery(".shadow-cart, .header-cart .pg-return-cart, .close-nav,.box-fixed .close-box,.close-modal,.close-icon,.modal-theme .shadow").click(function(e) {
            //     jQuery(".plugoo-cart-preview-sidebar, .nav-mobile,.box-fixed,.modal-theme").removeClass("active");
            //     jQuery(".modal-theme").removeClass("show");

            // }),
            jQuery(".shadow-cart, .pg-return-cart, .header-cart").click(function(e) {
                jQuery(".plugoo-cart-preview-sidebar").removeClass("active");

            });
            // jQuery(".product-submit").submit(function(e) {
            //     e.preventDefault();
            //     var t = jQuery(this).find(".select").val(),
            //         a = jQuery(this).find(".quantity").val(),
            //         r = jQuery(this).find(".quantity").attr("data-id");
            //     t && cart.addVariantComplete(t, a, r);
            // });
    },
    showCart: function() {
        cart.listProduct();
        // jQuery(".modal-theme").removeClass("active");
        // jQuery(".modal-theme").removeClass("show")
        jQuery(".plugoo-cart-preview-sidebar").addClass("active");
    },
    templateProduct: function(e, t, a, r, i, o, n, s) {
        const removeIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"> <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>';
        var c = `<div class="item">
                    <div class="cart-preview-item flex align-center">
                    <div class="cartpreview-image"><a href="{url}" class="image"><img src="{image}" alt="{name}"></a><div class="cart-preview-qtd">{length}</div></div>
                    <div class="product-info">
                        <div class="product-name">
                            <a href="{url}" class="name">{name}</a>
                            <div class="remove" data-id="{id}" data-variant="{variant}" data-add="{addMsg}" onclick="cart.removeProduct(this)">${removeIcon}</div>
                        </div>
                        <div class="price">{price}</div>
                    </div>
                    </div>
                </div>
                `;
        return (
            (c = (c = (c = (c = (c = (c = (c = c.replace(/{url}/g, n)).replace(/{image}/g, r)).replace(/{name}/g, a)).replace(/{id}/g, e)).replace(/{variant}/g, t)).replace(/{length}/g, i)).replace(/{addMsg}/g, s)),
            (o = toReal(parseFloat(o), "R$")),
            (c = c.replace(/{price}/g, o))
        );
    },
    addVariantComplete: function(e, t, a) {
        var r = cart.session();
        jQuery
            .ajax({
                method: "POST",
                url: "/web_api/cart/",
                contentType: "application/json; charset=utf-8",
                data: '{"Cart":{"session_id":"' + cart.session() + '","product_id":"' + a + '","quantity":"' + t + '","variant_id":"' + e + '"}}',

            })
            .success(function(e, t, a) {
                cart.showCart();
                alert('Produto adicionado ao carrinho com sucesso!');

            })
            .fail(function(e, t, a) {
                console.log(r)
                console.log(e)
                console.log(t)
                console.log(a)
                console.log("error add product: ", t);


                // window.location.href = jQuery(".add-cart-modal").find(".image a").attr("href");
            });
    },
    addInfoModal: function(e) {
        console.log("product: ", e);
        var t = jQuery(".add-cart-modal");
        if (
            (t.addClass("active"),
                t.addClass("show"),
                t.find("#variant_modal").removeClass("required").val(0),
                t.find(".terms").remove(),
                t.find("#alert-modal-add").addClass("tray-hide"),
                t.find(".list-variants").remove(),
                t.find(".action-add .add-cart").removeAttr("disabled"),
                t.find(".quant input").val(1),
                t.find("#product_modal").val(e.id),
                t.find(".image").html('<a href="' + e.link + '"><img src="' + e.image + '" alt="' + e.name + '" /></a>'),
                t.find(".box-info > .name").text(e.name),
                t.find(".box-info > .sku").html("<strong>Sku: </strong>" + e.id),
                t.find(".box-info > .sku").html("<strong>Sku: </strong>" + e.id),
                "0" !== e.terms && t.find(".box-info form").append('<div class="terms">Clicando em comprar você aceita os termos de uso do produto</div>'),
                e.variant)
        ) {
            t.find("#variant_modal").addClass("required"), console.log("variants: ", e.variant);
            var a = [],
                r = [];
            e.variant.forEach(function(e) {
                    var t = e.Variant.Sku[0].value; -
                    1 === a.indexOf(t) && a.push(t);
                }),
                e.variant[0].Variant.Sku.length > 1 &&
                e.variant.forEach(function(e) {
                    var t = e.Variant.Sku[1].value; -
                    1 === r.indexOf(t) && r.push(t);
                }),
                console.log(a);
            var i = "";
            if (
                (a.forEach(function(e, t) {
                        i += '<option value="' + e + '">' + e + "</option>";
                    }),
                    t
                    .find(".action-add")
                    .before(
                        '            <div class="list-variants">                <div class="variant-title">' +
                        e.variant[0].Variant.Sku[0].type +
                        '</div>                <select required class=" select variants">                    <option hidden value="">Selecionar</option>                    ' +
                        i +
                        "                </select>            </div>            "
                    ),
                    r.length)
            ) {
                var o = "";
                r.forEach(function(e) {
                        o += '<option value="' + e + '">' + e + "</option>";
                    }),
                    t
                    .find(".action-add")
                    .before(
                        '                <div class="list-variants">                    <div class="variant-title">' +
                        e.variant[0].Variant.Sku[1].type +
                        '</div>                    <select required class=" select variants">                        <option hidden value="">Selecionar</option>                        ' +
                        o +
                        "                    </select>                </div>            "
                    );
            }
        }
        "number" === e.price.type ?
            e.price.promotional_price ?
            t
            .find(".box-price")
            .html(
                '                    <div class="price">De: ' +
                toReal(parseFloat(e.price.price), "R$") +
                '</div>                    <div class="price-promotion">' +
                toReal(parseFloat(e.price.promotional_price), "R$") +
                '</div>                    <div class="payment">' +
                e.price.payment +
                "</div>                "
            ) :
            t.find(".box-price").html('                    <div class="price-promotion">' + toReal(parseFloat(e.price.price), "R$") + '</div>                    <div class="payment">' + e.price.payment + "</div>                ") :
            price.type;
        var n = t.find(".select:eq(0)"),
            s = t.find(".select:eq(1)");
        n.length &&
            n.change(function() {
                console.log(jQuery(this).val()),
                    "" === jQuery(this).val() || s.length ?
                    "" !== s.val() && t.find("#variant_modal").val(cart.filterVariant(e.variant, n.val(), s.val())).removeClass("required") :
                    t.find("#variant_modal").val(cart.filterVariantSimple(e.variant, n.val())).removeClass("required");
            }),
            s.length &&
            s.change(function() {
                console.log(jQuery(this).val()), "" !== jQuery(this).val() && "" !== n.val() && t.find("#variant_modal").val(cart.filterVariant(e.variant, n.val(), s.val())).removeClass("required");
            });
    },
    filterVariant: function(e, t, a) {
        for (var r = 0; r < e.length;) {
            if ((console.log(e[r].Variant.Sku[0].value, t, e[r].Variant.Sku[1].value, a), e[r].Variant.Sku[0].value == t && e[r].Variant.Sku[1].value == a)) return e[r].Variant.id;
            r++;
        }
        return 500;
    },
    submitAdd: function() {
        jQuery(".add-cart-modal form").submit(function(e) {
            e.preventDefault();
            var t = jQuery(this).find("#product_modal").val(),
                a = jQuery(this).find("#quant_modal").val(),
                r = jQuery(this).find("#variant_modal");
            r.hasClass("required") ?
                jQuery("#alert-modal-add").removeClass("tray-hide") :
                (jQuery(".action-add .add-cart").attr("disabled"), cart.addVariantComplete(r.val(), a, t), console.log("product: ", t, "quant: ", a, "variant: ", r.val()));
        });
    },
    showModal: function(e) {
        console.log(e),
            this.ajaxGet("/web_api/products/" + e.id, function(t) {
                if (!t.error) {
                    console.log(t);
                    var a = t.Product,
                        r = a.ProductImage.length ? a.ProductImage[0].https : "";
                    "0" !== a.has_variation ?
                        cart.getVariant(a, e.list_variant, function(e) {
                            cart.addInfoModal({
                                image: r,
                                link: a.url.https,
                                name: a.name,
                                id: a.id,
                                price: {
                                    type: "number",
                                    promotional_price: "0" !== a.promotional_price && a.promotional_price,
                                    price: a.price,
                                    payment: a.payment_option_html
                                },
                                terms: a.has_acceptance_terms,
                                variant: e,
                            });
                        }) :
                        cart.addInfoModal({
                            image: r,
                            link: a.url.https,
                            name: a.name,
                            id: a.id,
                            price: {
                                type: "number",
                                promotional_price: "0" !== a.promotional_price && a.promotional_price,
                                price: a.price,
                                payment: a.payment_option_html
                            },
                            terms: a.has_acceptance_terms,
                            variant: !1,
                        });
                }
            });
    },
    addToCart: function(e, t, a) {
        var r = dataLayer[0].customerId ? dataLayer[0].customerId : 0;
        jQuery
            .ajax({
                method: "POST",
                url: "/web_api/cart/",
                contentType: "application/json; charset=utf-8",
                data: '{"Cart":{"session_id":"' + cart.session() + '","product_id":"' + e + '","quantity":"' + t + '","variant_id":"' + a + '"}}',
            })
            .success(function(e, t, a) {
                cart.showCart();
                console.log("Produto adicionado ao carrinho com sucesso!");
            })
            .fail(function(e, t, a) {
                // window.location.href = buy.parents(".product-box").find(".product-image").attr("href");
            });
    },
    ajaxGet: function(e, t) {
        jQuery
            .ajax({
                method: "GET",
                url: e
            })
            .success(function(e) {
                t(e);
            })
            .fail(function(e, a, r) {
                t({
                    error: !0
                });
                var i = $.parseJSON(e.responseText);
                console.log(i);
            });
    },
    templateInfo: function(e, t, a) {
        console.log("template:", t);
        var r = '<a href="' + e.url.https + '" class="image"><img src="' + e.ProductImage[0].thumbs[180].https + '" alt="image">        </a>';
        jQuery(".modal-product .content-product .cartpreview-image").html(r);
        var i = '<option value="{val}">{text}</option>',
            o = "";
        t.forEach(function(e) {
            parseInt(e.Variant.available) &&
                (e.Variant.Sku.length > 1 ?
                    (o += i.replace("{val}", e.Variant.id).replace("{text}", e.Variant.Sku[0].value + " - " + e.Variant.Sku[1].value)) :
                    (o += i.replace("{val}", e.Variant.id).replace("{text}", e.Variant.Sku[0].value)));
        });
        var n =
            '<input type="hidden" class="quantity" data-id="' +
            e.id +
            '" value="' +
            a +
            '"><div class="name"><a href="' +
            e.url.https +
            '">' +
            e.name +
            '</a></div>            <div class="price"></div>            <div class="vars">            <div class="var-text">Selecione uma opção:</div>            <select required class="select"><option value="">Selecione</option>' +
            o +
            '</select>            </div>            <button class="submit-product">COMPRAR</button>        ';
        jQuery(".modal-product .content-product form").html(n);
    },
    getVariant: function(e, t, a) {
        console.log(e), jQuery(".modal-product").addClass("active");
        var r = e.Variant,
            i = [];
        r.forEach(function(e, o) {
            var n = "/web_api/variants/" + e.id;
            cart.ajaxGet(n, function(e) {
                i.push(e), r.length == i.length && a(cart.orderVariant(r, i, t));
            });
        });
    },
    orderVariant: function(e, t, a) {
        console.log(e, t, a);
        var r = [];
        return (
            a.forEach(function(e, a) {
                t.forEach(function(t) {
                    e.id == t.Variant.id && (t.Variant.Sku.length > 1 || Number(t.Variant.available)) && r.push(t);
                });
            }),
            r
        );
    },
    addVariant: function(e, t) {
        console.log(e), jQuery(".modal-product").addClass("active");
        var a = e.Variant,
            r = [];
        a.forEach(function(i, o) {
            var n = "/web_api/variants/" + i.id;
            cart.ajaxGet(n, function(i) {
                r.push(i), a.length == r.length && cart.templateInfo(e, r, t);
            });
        });
    },
};

jQuery(document).ready(function() {
    cart.startCart();
});