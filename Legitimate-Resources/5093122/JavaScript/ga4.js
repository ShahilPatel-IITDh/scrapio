(function($) {
    let itemAdded = [];

    $(window).on("load", function() {
        let productList = [];
        
        $('[data-ga4-id]').each(function() {
            if (verifyDuplicity($(this).attr('data-ga4-id'))) {
                return;
            }

            let product = {
                item_id: $(this).attr('data-ga4-id'),
                item_name: removeAccent($(this).attr('data-ga4-name')),
                price: $(this).attr('data-ga4-price'),
                item_brand: removeAccent($(this).attr('data-ga4-brand')),
                item_category: removeAccent($(this).attr('data-ga4-category')),
            };
            productList.push(product);
        });

        sendList(productList);

        $('#form_comprar').on('submit', function() {
            var product = $("[data-product-id]").attr('data-product-id');
            var variant = $("#selectedVariant").val();
            var value = $("#preco_atual").val();
            var quantity = $("#quant").val();

            $.ajax({
                type: 'GET',
                data: {},
                url: '/mvc/store/product/getProductToGa4/'+product+'/'+variant,
                dataType: 'html',
                async: false,
                success: function(data) {
                    response = JSON.parse(data);
                    if (response.length == 0 || response == undefined) {
                        return true;
                    }
                    sendToCart(response[0]['Product'], quantity, value);
                }
            });
        });

        $(document).delegate('[data-cart-preview-del]', 'click', function() {
            var product = $(this).attr('data-product-id');
            var quantity = $(this).parents().find('.cart-preview-quantity-tag').html();
            $.ajax({
                type: 'GET',
                data: {},
                url: '/mvc/store/product/getProductToGa4/'+product,
                dataType: 'html',
                async: false,
                success: function(data) {
                    response = JSON.parse(data);
                    if (response.length == 0 || response == undefined) {
                        return true;
                    }
                    removeToCart(response[0]['Product'], quantity);
                }
            });    
        });
    });

    function verifyDuplicity(productId) {
        if (itemAdded.indexOf(productId) === -1) {
            itemAdded.push(productId);
            return false;
        }
        return true;
    }

    function sendList(productList) {
        if (window.location.pathname !== '/' && window.location.pathname !== '/loja/') {
            return;
        }

        if (productList.length === 0) {
            return;
        }

        sendEvent("event", "view_item_list", {
            items: Object.values(productList)
        });
    }

    function sendToCart(item, quantity, value) {
        sendEvent("event", "add_to_cart", {
            currency: 'BRL',
            value: value,
            items: [
                {
                    item_id: item.id,
                    item_name: removeAccent(item.name),
                    item_brand: removeAccent(item.brand),
                    item_category: removeAccent(item.category),
                    item_variant: removeAccent(item.variant),
                    price: item.price,
                    discount: item.price - value,
                    quantity: quantity
                }
            ]
        });
    }

    function removeToCart(item, quantity) {
        sendEvent("event", "remove_from_cart", {
            currency: 'BRL',
            value: item.value,
            items: [
                {
                    item_id: item.id,
                    item_name: removeAccent(item.name),
                    item_brand: removeAccent(item.brand),
                    item_category: removeAccent(item.category),
                    price: item.price,
                    discount: item.price - item.value,
                    quantity: quantity
                }
            ]
        })
    }

    function removeAccent(string) {
        if (string == null) {
            return;
        }
        
        return string.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }

    function sendEvent() {
        dataLayerGa4.push(arguments);
    }
})(jQuery);
