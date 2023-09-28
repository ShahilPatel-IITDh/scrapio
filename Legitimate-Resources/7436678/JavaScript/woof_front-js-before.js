
        var woof_is_permalink =1;
        var woof_shop_page = "";
                var woof_m_b_container =".woocommerce-products-header";
        var woof_really_curr_tax = {};
        var woof_current_page_link = location.protocol + '//' + location.host + location.pathname;
        /*lets remove pagination from woof_current_page_link*/
        woof_current_page_link = woof_current_page_link.replace(/\page\/[0-9]+/, "");
                        woof_current_page_link = "https://carbontechpdrtools.com/shop/";
                        var woof_link = 'https://carbontechpdrtools.com/wp-content/plugins/woocommerce-products-filter/';
        
        var woof_ajaxurl = "https://carbontechpdrtools.com/wp-admin/admin-ajax.php";

        var woof_lang = {
        'orderby': "orderby",
        'date': "date",
        'perpage': "per page",
        'pricerange': "price range",
        'menu_order': "menu order",
        'popularity': "popularity",
        'rating': "rating",
        'price': "price low to high",
        'price-desc': "price high to low",
        'clear_all': "Clear All"
        };

        if (typeof woof_lang_custom == 'undefined') {
        var woof_lang_custom = {};/*!!important*/
        }

        var woof_is_mobile = 0;
        


        var woof_show_price_search_button = 0;
        var woof_show_price_search_type = 0;
        
        var woof_show_price_search_type = 0;

        var swoof_search_slug = "swoof";

        
        var icheck_skin = {};
                    icheck_skin = 'none';
        
        var woof_select_type = 'chosen';


                var woof_current_values = '[]';
                var woof_lang_loading = "Loading ...";

        
        var woof_lang_show_products_filter = "show products filter";
        var woof_lang_hide_products_filter = "hide products filter";
        var woof_lang_pricerange = "price range";

        var woof_use_beauty_scroll =0;

        var woof_autosubmit =1;
        var woof_ajaxurl = "https://carbontechpdrtools.com/wp-admin/admin-ajax.php";
        /*var woof_submit_link = "";*/
        var woof_is_ajax = 0;
        var woof_ajax_redraw = 0;
        var woof_ajax_page_num =1;
        var woof_ajax_first_done = false;
        var woof_checkboxes_slide_flag = 1;


        /*toggles*/
        var woof_toggle_type = "text";

        var woof_toggle_closed_text = "+";
        var woof_toggle_opened_text = "-";

        var woof_toggle_closed_image = "https://carbontechpdrtools.com/wp-content/plugins/woocommerce-products-filter/img/plus.svg";
        var woof_toggle_opened_image = "https://carbontechpdrtools.com/wp-content/plugins/woocommerce-products-filter/img/minus.svg";


        /*indexes which can be displayed in red buttons panel*/
                var woof_accept_array = ["min_price", "orderby", "perpage", "min_rating","product_visibility","product_cat","product_tag","pa_black","pa_color","yith_product_brand"];

        
        /*for extensions*/

        var woof_ext_init_functions = null;
        

        
        var woof_overlay_skin = "default";


        function woof_js_after_ajax_done() {
        jQuery(document).trigger('woof_ajax_done');
                }

        
