/**
 * Flow Framework frontend javascript.
 * 
 * @category Flow Framework
 * @package Frontend
 * @subpackage JavaScript
 * @author Marius Podvoiskis <marius@smbweb.lt>
 * @copyright Copyright (c) 2010, Marius Podvoiskis
 * @version Flow Framework 3.0, 2010-09-25 13:59:00
 */

function hide_sticky() {
    $('.sticky_text').hide();
    $('.sticky_close').hide();
    $('.sticky_open').show();
    setCookie('show_sticky', 0, 14, '/');
}
function show_sticky() {
    $('.sticky_open').hide();
    $('.sticky_text').show();
    $('.sticky_close').show();
    setCookie('show_sticky', 1, 14, '/');
}

$(document).ready(function () {
    $("#delivery_time").focus(function () {
        time_picker(null);
    });

    // hide when clicked anywhere on the document
    $(document).bind('click', function (e) {
        var box = $('#time_picker');
        if (box.length && e.target.id !== 'delivery_time' && e.target.id !== 'time_picker' && !$.contains(box[0], e.target)) {
            box.hide();
            $("#delivery_time").blur();
        }
    });
    
    $('#city').keyup(function() {
        if($('#city').val() == '') {
            get_zip(0);
        }
    });
    $('#zip').keyup(function() {
        if($('#zip').val() == '') {
            get_zip(0);
        }
    });

});

function apply_coupon() {
    $.fancybox.showLoading();
    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: {
            'ajax_call': '1',
            'apply_coupon': '1',
            'shop_id' : _shop_id,
            'code': $('#coupon_code').val(),
        },
        success: function (msg) {
            var response = JSON.parse(msg);
            $('#cart_con').html(response.html);
            $('#cart_con2').html(response.html2);

            if (response.cart_products_count != '') {
                $('#cart_products_count span').html(response.cart_products_count);
            }

            $.fancybox.update();
            $.fancybox.hideLoading();
        }
    });
}

function send_job_request()
{
    var url = _webroot;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=send_job_request'
                + '&' + $("#job_form").serialize()
        ,
        success: function (msg) {
            var response = $.parseJSON(msg);

            if (response.error_str) {
                $('.error_str').html(response.error_str);
            }
            else {
                document.job_form.submit();
            }
        }
    });
}

//function fix_href(sid) {
//	$( "a" ).each(function( index ) {
//		if($(this).attr('href') != '' && $(this).attr('href') != undefined) {
//			$(this).attr('href', $(this).attr('href') + '?sid=' + sid);
//		}
//	});
//}


/**
 * Saves cookie
 * 
 * @param string cookieName
 * @param string cookieValue
 * @param int days
 * @param string path
 * @return void
 */
function setCookie(cookieName, cookieValue, days, path) {
    var today = new Date();
    var expire = new Date();
    var pathStr = '';

    if (days == null || days == 0) {
        days = 1;
    }
    expire.setTime(today.getTime() + 3600000 * 24 * days);

    if (path != '') {
        pathStr = "; path=" + path;
    }

    document.cookie = cookieName + "=" + escape(cookieValue) + ";expires=" + expire.toGMTString() + pathStr;
}

/**
 * Returns cookie by cookie name
 * 
 * @param string name cookie name
 * @returns onject
 */
function getCookie(name) {
    var cookieName = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(cookieName) == 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return null;
}

//show the time picker
function time_picker(unixtime) {
    if (!$("#time_picker").length || !$("#time_picker").is(":visible") || unixtime !== null) {
        $.ajax({
            url: _webroot + 'time_picker/',
            type: "POST",
            data: {
                unixtime: unixtime,
                current_val: $("#delivery_time").val(),
                shop_id: _shop_id,
            },
            success: function (response) {
                // create the box
                if (!$("#time_picker").length) {
                    /*
                     var input = $("#delivery_time");
                     var x = input.offset().left;
                     var y = input.offset().top + input[0].offsetHeight;
                     $("#delivery_time").parent().append("<div id='time_picker' " + "style='left:"+x+"px;top:"+y+"px'></div>");
                     */
                    $("#delivery_time").parent().append("<div id='time_picker' " + "></div>");
                }
                $("#time_picker").html(response);
                $("#time_picker").show();

                // add events to the buttons
                $("#time_picker .asap").click(function () {
                    $("#delivery_time").val($(this).html());
                    $("#time_picker").hide();
                });
                $("#time_picker .prev").click(function () {
                    time_picker($("#time_picker .prev_time").val());
                });
                $("#time_picker .next").click(function () {
                    time_picker($("#time_picker .next_time").val());
                });
                $("#time_picker .hours span.active").click(function () {
                    var hour = $(this).html();
                    $("#time_picker .selected").removeClass('selected');
                    $(this).addClass('selected');
                    $("#time_picker .minutes").hide();
                    $("#time_picker .minutes_header").show();
                    $("#time_picker .hour_" + hour).show();
                });
                $("#time_picker .minutes span").click(function () {
                    $("#delivery_time").val($("#time_picker .date").html() + " " + $("#time_picker .selected").html() + ":" + $(this).html());
                    $("#time_picker").hide();
                });
            }
        });
    }
}

function update_size() {
    $('.products_msg').removeClass('products_msg');
    $('.products_msg').addClass('products_msg2');
    $('.fancybox-inner').css('height', 'auto');
}


function set_shop_is_closed() {
    setCookie('pizzaclosed_' + _shop_id, 1, 1, '/');
    location.reload();
}

function get_shop_is_closed() {
    $.fancybox.showLoading();

    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&get_shop_is_closed=1&shop_id=' + _shop_id,
        success: function (msg) {
            var response = JSON.parse(msg);

            // show popup
            if (response.popup != undefined) {
                open_popup('products_msg', response.popup);
            }

            $.fancybox.hideLoading();
        }
    });
}

function get_shop_closed_limited_off() {
    $.fancybox.showLoading();

    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&get_shop_closed_limited_off=1&shop_id=' + _shop_id,
        success: function (msg) {
            var response = JSON.parse(msg);

            // show popup
            if (response.popup != undefined) {
                open_popup('products_msg', response.popup);
            }

            $.fancybox.hideLoading();
        }
    });
}

function get_shop_is_off() {
    $.fancybox.showLoading();

    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&get_shop_is_off=1&shop_id=' + _shop_id,
        success: function (msg) {
            var response = JSON.parse(msg);

            // show popup
            if (response.popup != undefined) {
                open_popup('products_msg', response.popup);
            }

            $.fancybox.hideLoading();
        }
    });
}


function get_shop_is_closed2() {
    $.fancybox.showLoading();

    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&get_shop_is_closed2=1&shop_id=' + _shop_id,
        success: function (msg) {
            var response = JSON.parse(msg);

            // show popup
            if (response.popup != undefined) {
                open_popup('products_msg', response.popup);
            }

            $.fancybox.hideLoading();
        }
    });
}

/**
 * Add product to cart
 * 
 * @param int price_id price id
 */

function set_payment(value, reload) {
    $('#payment_id').val(value);
    $('#' + value).attr('checked', 'checked');

    setCookie('pizzapayment_' + _shop_id, value, 7, '/');

    if (value == 'paypal' || value == 'ueberweisung' || value == 'ec_card') {
        $('#tips_con').show();
    }
    else {
        $('#tips_con').hide();
    }

    if (reload == 1) {
        reload_cart();
    }
}

function clear_zip(reload) {
    $('#zip_id').val('-1');
    $('#zip').val('');
    $('#city').val('');
    //	$('.min_order_price').html('');

    $('#delivery_2').prop('checked', true);

    setCookie('pizzazip_' + _shop_id, '-1', 7, '/');

    if (reload == 1) {
        reload_cart();
    }

    $('.shipping_required_fields').hide();

    close_popup()
}

function select_zip(id, zip, city, min_order_price, reload) {
    $('#zip_id').val(id);
    $('#zip').val(zip);
    $('#city').val(city);
    //	$('.min_order_price').html(min_order_price);

    $('#delivery_1').attr('checked', 'checked');

    setCookie('pizzazip_' + _shop_id, id, 7, '/');

    if (reload == 1) {
        reload_cart();
    }

    $('.shipping_required_fields').show();

    close_popup()
}

function get_zip(force) {

    if($('#delivery_2').prop('checked') === true) {
        return;
    }


    if ($('#shop_closed_limited_off').val() == '1') {
        return;
    }
    if(force != 1) {
        if($('#zip').val() != '' && $('#city').val() != '') {
            return;
        }
    }
    $.fancybox.showLoading();

    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&get_zip=1&shop_id=' + _shop_id,
        success: function (msg) {
            var response = JSON.parse(msg);

            // show popup
            if (response.popup != undefined) {
                open_popup('products_msg', response.popup);
            }

            $.fancybox.hideLoading()
        }
    });
}

function checkoutForm() {
    var url = _self;

    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&show_checkout_form=1&shop_id=' + _shop_id + '&show_val=' + ($('.cart_button').length > 0),
        success: function (msg) {
            if (msg == 'true') {
                if ($('.checkoutForm').hasClass('hidden')) {
                    $('.checkoutForm').hide().removeClass('hidden').slideDown("slow");
                    $('.cart_bottom').remove();
                    setTimeout(function () {
                        location.href = _uri + '#cart_checkout'
                    }, 1000);
                }
            } else if (msg == 'false') {
                $('.checkoutForm').addClass('hidden');
            }
        }
    });
}

function checkout() {
    var submit_button = $('#cart_con2 .button01');

    if (!submit_button.hasClass('loading')) {
        var url = _self;
        
//        console.log($('#delivery_1').is(':checked'));
//        console.log($('#delivery_2').is(':checked'));

        submit_button.addClass('loading');
        submit_button.find('span.normal').addClass('hidden');
        submit_button.find('span.loading').removeClass('hidden');
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'html',
            data: 'ajax_call=1&checkout_check=1'
                    + '&name=' + $('#name').val()
                    + '&last_name=' + $('#last_name').val()
                    + '&street=' + $('#street').val()
                    + '&house_no=' + $('#house_no').val()
                    + '&zip=' + $('#zip').val()
                    + '&city=' + $('#city').val()
                    + '&phone_prefix=' + $('#phone_prefix').val()
                    + '&phone=' + $('#phone').val()
                    + '&email=' + $('#email').val()
                    + '&shop_id=' + _shop_id
                    + '&zip_id=' + $('#zip_id').val()
                    + '&payment_id=' + $('#payment_id').val()
                    + '&delivery_time=' + $('#delivery_time').val()
                    + '&shipping_type=' + $('#delivery_1').is(':checked')
                    + '&shipping_type2=' + $('#delivery_2').is(':checked')
                    + '&transfer_type=' + $('#transfer_type').val()
            ,
            success: function (msg) {
                $('#order_form input').removeClass('error');
                $('#payment_type').removeClass('error');

                if (msg == 'ok') {
                    $('#action').val('checkout');
                    document.checkout_form.submit();
                } else {								// set errors
                    var response = JSON.parse(msg);

                    var cnt = 0;
                    for (x in response) {
                        cnt++;
                        $('#' + x).addClass('error');
                        if (cnt == 1) {
                            $('#' + x).focus();
                        }
                    }

                    if (response.invalid_coupon == 1 || response.too_much_free_products == 1 || response.too_much_sticker_products == 1) {
                        reload_cart();
                    }

                    submit_button.removeClass('loading');
                    submit_button.find('span.loading').addClass('hidden');
                    submit_button.find('span.normal').removeClass('hidden');
                }
            }
        });
    }
}


function show_step(step, menu_price_id, move_prev) {
    step = parseInt(step);
    $('#step').val(step);
    //	$('#next_prev').val(next_prev);

    reload_menu_popup(menu_price_id, move_prev);

//	$('.blocks').addClass('dn');
//	$('.titles').addClass('dn');
//	
//	for(var i = 0; i <= step; i++) {
//		$('.title_' + i).removeClass('dn');
//	}
//	$('.block_' + step).removeClass('dn');
}

function reload_menu_popup(menu_price_id, move_prev) {
    var selected_menu = get_selected_menu();
    var step = $('#step').val();
    var coupon_id = $('#coupon_id').val();
    var free_product = $('#free_product').val();
    var sticker_product = $('#sticker_product').val();
    var price_id = 1;

    url = _self;
    var ingredients = $('#ingredients_list').val();
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&reload_menu_popup=1' + '&move_prev=' + move_prev + '&price_id=' + price_id + '&current_val=' + 0 + '&ingredients=' + ingredients + '&menu_price_id=' + menu_price_id + '&shop_id=' + _shop_id + '&selected_menu=' + selected_menu + '&step=' + step + '&coupon_id=' + coupon_id + '&free_product=' + free_product + '&sticker_product=' + sticker_product,
        success: function (msg) {
            var response = JSON.parse(msg);
            $('#popup_products_con').html(response.html);
            $('#ingredients_list').val(response.ingredients_str);

            $.fancybox.update();
        }
    });
}

function select_product(price_id, key, menu_price_id) {
    var current_val = $('#mproduct_' + key).val();
    $('#mproduct_' + key).val(price_id);
    var selected_menu = get_selected_menu();
    var step = $('#step').val();
    var coupon_id = $('#coupon_id').val();
    var free_product = $('#free_product').val();
    var sticker_product = $('#sticker_product').val();

    url = _self;
    var ingredients = $('#ingredients_list').val();
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&select_product=1' + '&price_id=' + price_id + '&current_val=' + current_val + '&ingredients=' + ingredients + '&menu_price_id=' + menu_price_id + '&shop_id=' + _shop_id + '&selected_menu=' + selected_menu + '&step=' + step + '&coupon_id=' + coupon_id + '&free_product=' + free_product + '&sticker_product=' + sticker_product,
        success: function (msg) {
            var response = JSON.parse(msg);
            $('#popup_products_con').html(response.html);
            $('#ingredients_list').val(response.ingredients_str);
            $('.ingredients').addClass('dn');
            $('.ingredients_' + price_id).removeClass('dn');

            $.fancybox.update();
        }
    });
}

function get_selected_menu() {
    var selected_items = '';
    $('.mproducts').each(function (index, value) {
        var id = getIdFromString(value.id, '_');
        selected_items = selected_items + id;
        selected_items = selected_items + '#' + value.value + ',';
    });
    return selected_items;
}

function add_ingredient(in_id, price_id, menu_price_id, key) {
    if (price_id == '') {
        price_id = $('#mproduct_' + key).val();
    }

    if (price_id == '' || price_id == undefined || price_id == 0 || price_id == 'NaN') {
        return;
    }

    var selected_menu = get_selected_menu();
    var ingredients = $('#ingredients_list').val();
    var step = $('#step').val();
    var coupon_id = $('#coupon_id').val();
    var free_product = $('#free_product').val();
    var sticker_product = $('#sticker_product').val();

    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&add_ingredient=1' + '&in_id=' + in_id + '&ingredients=' + ingredients + '&price_id=' + price_id + '&menu_price_id=' + menu_price_id + '&shop_id=' + _shop_id + '&selected_menu=' + selected_menu + '&step=' + step + '&coupon_id=' + coupon_id + '&free_product=' + free_product + '&sticker_product=' + sticker_product,
        success: function (msg) {
            var response = JSON.parse(msg);
            $('#popup_products_con').html(response.html);
            $('#ingredients_list').val(response.ingredients_str);

            $.fancybox.update();
        }
    });
}

function remove_ingredient_in_popup(in_id, price_id, menu_price_id, key) {
    if (price_id == '') {
        price_id = $('#mproduct_' + key).val();
    }

    if (price_id == '' || price_id == undefined || price_id == 0 || price_id == 'NaN') {
        return;
    }

    var selected_menu = get_selected_menu();
    var ingredients = $('#ingredients_list').val();
    //	var step = $('#step').val();
    var coupon_id = $('#coupon_id').val();
    var free_product = $('#free_product').val();
    var sticker_product = $('#sticker_product').val();

    var step = key;
    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&remove_ingredient_in_popup=1' + '&in_id=' + in_id + '&ingredients=' + ingredients + '&price_id=' + price_id + '&menu_price_id=' + menu_price_id + '&shop_id=' + _shop_id + '&selected_menu=' + selected_menu + '&step=' + step + '&coupon_id=' + coupon_id + '&free_product=' + free_product + '&sticker_product=' + sticker_product,
        success: function (msg) {
            var response = JSON.parse(msg);
            $('#popup_products_con').html(response.html);
            $('#ingredients_list').val(response.ingredients_str);

            $.fancybox.update();
        }
    });
}
function remove_product_in_popup(price_id, menu_price_id, key) {
    if (price_id == '') {
        price_id = $('#mproduct_' + key).val();
    }

    if (price_id == '' || price_id == undefined || price_id == 0 || price_id == 'NaN') {
        return;
    }

    var selected_menu = get_selected_menu();
    var ingredients = $('#ingredients_list').val();
    //	var step = $('#step').val();
    var coupon_id = $('#coupon_id').val();
    var free_product = $('#free_product').val();
    var sticker_product = $('#sticker_product').val();

    step = key;
    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&remove_product_in_popup=1' + '&ingredients=' + ingredients + '&price_id=' + price_id + '&menu_price_id=' + menu_price_id + '&shop_id=' + _shop_id + '&selected_menu=' + selected_menu + '&step=' + step + '&coupon_id=' + coupon_id + '&free_product=' + free_product + '&sticker_product=' + sticker_product,
        success: function (msg) {
            var response = JSON.parse(msg);
            $('#popup_products_con').html(response.html);
            $('#ingredients_list').val(response.ingredients_str);

            $.fancybox.update();
        }
    });
}

function remove_ingredient(key, key2, key3) {
    if (key3 == undefined) {
        key3 = '';
    }

    $.fancybox.showLoading();
    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&remove_ingredient=1' + '&key=' + key + '&key2=' + key2 + '&key3=' + key3 + '&shop_id=' + _shop_id,
        success: function (msg) {
            var response = JSON.parse(msg);
            $('#cart_con').html(response.html);
            $('#cart_con2').html(response.html2);

            if (response.cart_products_count != '') {
                $('#cart_products_count span').html(response.cart_products_count);
            }

            $.fancybox.update();

            $.fancybox.hideLoading();
        }
    });
}

function clone_product(key, price_id) {
    $.fancybox.showLoading();
    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&clone_product=1' + '&key=' + key + '&price_id=' + price_id + '&shop_id=' + _shop_id,
        success: function (msg) {
            var response = JSON.parse(msg);
            $('#cart_con').html(response.html);
            $('#cart_con2').html(response.html2);

            if (response.cart_products_count != '') {
                $('#cart_products_count span').html(response.cart_products_count);
            }

            $.fancybox.update();

            $.fancybox.hideLoading();

            check_free_product();
        }
    });
}

function remove_from_cart(key) {
    $('#free_product').val('');
    $('#sticker_product').val('');

    $.fancybox.showLoading();
    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&remove_from_basket=1' + '&key=' + key + '&shop_id=' + _shop_id,
        success: function (msg) {
            var response = JSON.parse(msg);
            $('#cart_con').html(response.html);
            $('#cart_con2').html(response.html2);

            // reload products list
            if (response.products_list != undefined) {
                //				$('#content').html(response.products_list);
                reload_page(response.products_list);
            }

            if (response.cart_products_count != '') {
                $('#cart_products_count span').html(response.cart_products_count);
            }

            $.fancybox.update();

            $.fancybox.hideLoading();
        }
    });
}

function add_to_cart_with_ingredients(price_id) {
    var string = $('#ingredients_list').val();
    var edit_key = $('#edit_key').val();
    add_to_cart(price_id, 1, string, edit_key);
}

function edit_product(price_id, key, coupon_id, free_product, sticker_product) {
    $('.mproducts').val('');
    $('#ingredients_list').val('');
    $('#edit_key').val('');
    $('#coupon_id').val('');
    $('#free_product').val('');
    $('#sticker_product').val('');
    add_to_cart(price_id, '', '', key, '', coupon_id, free_product, sticker_product);
}

function add_product(price_id, coupon_id, free_product) {
    $('.mproducts').val('');
    $('#ingredients_list').val('');
    $('#edit_key').val('');
    add_to_cart(price_id, '', '', '', '', coupon_id, free_product);
}

function reload_cart() {
    $.fancybox.showLoading();
    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&reload_cart=1&shop_id=' + _shop_id,
        success: function (msg) {
            var response = JSON.parse(msg);
            $('#cart_con').html(response.html);
            $('#cart_con2').html(response.html2);

            if (response.cart_products_count != '') {
                $('#cart_products_count span').html(response.cart_products_count);
            }

            $.fancybox.update();
            $.fancybox.hideLoading();
        }
    });
}

var blockAnimation = false;

function add_to_cart(price_id, force, ingredients, edit_key, animation, coupon_id, free_product, sticker_product) {
    if (force == undefined) {
        force = '';
    }
    if (ingredients == undefined) {
        ingredients = '';
    }
    if (edit_key == undefined) {
        edit_key = '';
    }
    /**
     * animation not used
     */
    //	if(animation == undefined) {
    //		animation = '';
    //	}
    if (coupon_id == undefined) {
        coupon_id = '';
    }
    if (free_product == undefined) {
        free_product = '';
    }
    if (sticker_product == undefined) {
        sticker_product = '';
    }
    //	if(menu_price_id == undefined) {
    //		menu_price_id = '';
    //	}

    var coupons_int = parseInt($('#coupon_id').val());
    if (coupons_int > 0) {
        coupon_id = coupons_int;
    }

    var free_product_int = parseInt($('#free_product').val());
    if (free_product_int > 0) {
        free_product = free_product_int;
    }

    var sticker_product_int = parseInt($('#sticker_product').val());
    if (sticker_product_int > 0) {
        sticker_product = sticker_product_int;
    }

    var selected_menu = get_selected_menu();

    $.fancybox.showLoading();

    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&add_to_basket=1&price_id=' + price_id + '&shop_id=' + _shop_id + '&force=' + force + '&ingredients=' + ingredients + '&edit_key=' + edit_key + '&selected_menu=' + selected_menu + '&coupon_id=' + coupon_id + '&free_product=' + free_product + '&sticker_product=' + sticker_product,
        success: function (msg) {
            var response = JSON.parse(msg);

            // reload cart
            if (response.html != undefined) {
                if (response.show_animation == '1' && free_product != '1') {
                    if (!blockAnimation) {
                        flight_to_cart(price_id);
                    }
                }

                $('#cart_con').html(response.html);
                $('#cart_con2').html(response.html2);

                $.fancybox.update();

                if (free_product != '1') {
                    check_free_product();
                }
            }

            // show popup
            if (response.popup != undefined) {
                open_popup('products_msg', response.popup);
            }

            // reload products list
            if (response.products_list != undefined) {
                //				$('#content').html(response.products_list);
                reload_page(response.products_list);
            }

            if (force == 1) {
                $('.mproducts').val('');
                $('#ingredients_list').val('');
                $('#edit_key').val('');
                close_popup()

                if (free_product != '1') {
                    check_free_product();
                }

                $('#coupon_id').val('');
                $('#free_product').val('');
                $('#sticker_product').val('');
            }

            if (response.cart_products_count != '') {
                $('#cart_products_count span').html(response.cart_products_count);
            }

            $.fancybox.hideLoading();
        }
    });
}

function set_tips()
{
    var tips = $('#tips').val();

    $.fancybox.showLoading();
    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&set_tips=1&shop_id=' + _shop_id + '&tips=' + tips,
        success: function (msg) {
            var response = JSON.parse(msg);

            reload_cart();

            $.fancybox.hideLoading();
        }
    });
}

function reload_page(html)
{
    if ($('#can_reload_page').val() == '1') {
        $('#content').html(html);
    }
}

function check_free_product()
{
    var exist = getCookie('pizzafreeproduct_' + _shop_id);
    if (exist == 1) {
        return;
    }

    $.fancybox.showLoading();
    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&check_free_product=1&shop_id=' + _shop_id,
        success: function (msg) {
            var response = JSON.parse(msg);

            // show popup
            if (response.popup != undefined) {
                open_popup('products_msg', response.popup);
                $.fancybox.update();
            }

            $.fancybox.hideLoading();
        }
    });
}

function free_product_add(price_id)
{
    close_popup()

    add_product(price_id, 0, 1);
}

function free_product_remove()
{
    $.fancybox.showLoading();
    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&free_product_remove=1&shop_id=' + _shop_id,
        success: function (msg) {
            var response = JSON.parse(msg);

            reload_cart();

            $.fancybox.hideLoading();

        }
    });
}

function free_product_refuse()
{
    setCookie('pizzafreeproduct_' + _shop_id, 1, 1, '/');
    //	location.reload();

    close_popup()
}

function flight_to_cart(animation)
{
    blockAnimation = true;

//	if($('#new_product_layout').val() == '1') {
    var id = '.meal_' + animation;
//	}
//	else {
//		var id = '#meal_' + animation;
//	}

    if ($(id).length > 0) {
        var main = $(id).position();
        var html = $(id).html();
        var class_list = $(id).attr('class');
        /*var top = Math.round(main.top) - 450;*/
        $(id).append('<div style="top: ' + main.top + 'px; right:0px;" class="' + class_list + '" id="to_basket_block">' + html + '</div>');
        var cart = $('#cart').position();

        params = {
            top: cart.top + 'px',
            left: cart.left + 'px',
            opacity: 0.0,
            width: 250,
            height: 35
        };

        $('#to_basket_block').animate(params, 'slow', 'linear', function () {
            $('#to_basket_block').remove();
            blockAnimation = false;
        });
    }

    close_popup()
}



/**
 * save size to show param in session
 * 
 * @param size parent
 * @param size item
 */
function set_size_to_show(parent, item) {
    $.fancybox.showLoading();
    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&set_size=1&parent=' + parent + '&item=' + item + '&shop_id=' + _shop_id,
        success: function (msg) {
            var response = JSON.parse(msg);
            $('#content').html(response);
            $.fancybox.hideLoading()
        }
    });
}

/**
 * Do user action (login, logout)
 * 
 * @param string
 *            action
 * @return void
 */
function userAction(action) {
    document.user_form.user_action.value = action;
    document.user_form.submit();
}

function serach_press() {
    console.log("aa");
}

function set_to_basket(id) {
    $('#to_basket').val(id);
    $('#main_price').html($('input[name=radio_option]:checked').val() + ' Lt');
}

/**
 * Returns id from string (e.g. string "menu-9" returns 9)
 * 
 * @param string
 *            value
 * @param string
 *            separator
 * @return int
 */
function getIdFromString(value, separator) {
    var mas = value.split(separator);
    return mas[1];
}

/*
 * Auto center window script- Eric King (http://redrival.com/eak/index.shtml)
 * Permission granted to Dynamic Drive to feature script in archive For full
 * source, usage terms, and 100's more DHTML scripts, visit
 * http://dynamicdrive.com
 */

var win = null;
function NewWindow(mypage, myname, w, h, scroll) {
    LeftPosition = (screen.width) ? (screen.width - w) / 2 : 0;
    TopPosition = (screen.height) ? (screen.height - h) / 2 : 0;
    settings = 'height=' + h + ',width=' + w + ',top=' + TopPosition + ',left='
            + LeftPosition + ',scrollbars=' + scroll + ',resizable'
    win = window.open(mypage, myname, settings)
}

function show_group(id) {
    $('#group_' + id).removeClass('dn');
}

function reload_list() {
    $.fancybox.showLoading();
    url = _self;
    $.ajax({
        url: url,
        type: 'POST',
        dataType: 'html',
        data: 'ajax_call=1&reload_list=1&shop_id=' + _shop_id,
        success: function (msg) {
            var response = JSON.parse(msg);

            reload_page(response.products_list);

            setTimeout("reload_list()", 1000 * 15 * 1); // 5 sec

            $.fancybox.hideLoading();
        }
    });


}
$(function () {
    $('.expnd', this).click(function () {
        $('.additional_mobile_menu').slideToggle('fast');
        $('.expnd').toggleClass('expanded');
    });
});

