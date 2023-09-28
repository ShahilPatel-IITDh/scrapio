
var woof_is_permalink =1;
        var woof_shop_page = "";
                var woof_m_b_container =".woocommerce-products-header";
        var woof_really_curr_tax = {};
        var woof_current_page_link = location.protocol + '//' + location.host + location.pathname;
        /*lets remove pagination from woof_current_page_link*/
        woof_current_page_link = woof_current_page_link.replace(/\page\/[0-9]+/, "");
                        woof_current_page_link = "https://dutchgiant.de/shop/";
                        var woof_link = 'https://dutchgiant.de/wp-content/plugins/woocommerce-products-filter/';
        
        var woof_ajaxurl = "https://dutchgiant.de/wp-admin/admin-ajax.php";

        var woof_lang = {
        'orderby': "op volgorde van",
        'date': "datum",
        'perpage': "per pagina",
        'pricerange': "prijs reeks",
        'menu_order': "menuvolgorde",
        'popularity': "populariteit",
        'rating': "waardering",
        'price': "prijs van laag naar hoog",
        'price-desc': "prijs van hoog naar laag",
        'clear_all': "Wis alles"
        };

        if (typeof woof_lang_custom == 'undefined') {
        var woof_lang_custom = {};/*!!important*/
        }

        var woof_is_mobile = 0;
                    woof_is_mobile = 1;
        


        var woof_show_price_search_button = 0;
        var woof_show_price_search_type = 0;
        
        var woof_show_price_search_type = 0;

        var swoof_search_slug = "swoof";

        
        var icheck_skin = {};
                    icheck_skin = 'none';
        
        var is_woof_use_chosen =1;

                var woof_current_values = '[]';
                var woof_lang_loading = "Laden ...";

        
        var woof_lang_show_products_filter = "toon producten filter";
        var woof_lang_hide_products_filter = "verberg producten filter";
        var woof_lang_pricerange = "prijs reeks";

        var woof_use_beauty_scroll =0;

        var woof_autosubmit =1;
        var woof_ajaxurl = "https://dutchgiant.de/wp-admin/admin-ajax.php";
        /*var woof_submit_link = "";*/
        var woof_is_ajax = 0;
        var woof_ajax_redraw = 0;
        var woof_ajax_page_num =1;
        var woof_ajax_first_done = false;
        var woof_checkboxes_slide_flag = true;


        /*toggles*/
        var woof_toggle_type = "text";

        var woof_toggle_closed_text = "-";
        var woof_toggle_opened_text = "+";

        var woof_toggle_closed_image = "https://dutchgiant.de/wp-content/plugins/woocommerce-products-filter/img/plus3.png";
        var woof_toggle_opened_image = "https://dutchgiant.de/wp-content/plugins/woocommerce-products-filter/img/minus3.png";


        /*indexes which can be displayed in red buttons panel*/
                var woof_accept_array = ["min_price", "orderby", "perpage", "min_rating","brand","product_visibility","product_cat","product_tag","pa_cross_tier_id","pa_eiwitshakes","pa_energie","pa_koolhydraten","pa_maat","pa_postnl_allow_delivery_days","pa_postnl_allow_pakje_gemak","pa_postnl_allow_pakketautomaat","pa_postnl_allow_timeframes","pa_pre-workout","pa_smaak","pa_smaken","pa_smaken-productfilter","pa_voeding"];

        
        /*for extensions*/

        var woof_ext_init_functions = null;
        

        
        var woof_overlay_skin = "default";


        function woof_js_after_ajax_done() {
        jQuery(document).trigger('woof_ajax_done');
                }
