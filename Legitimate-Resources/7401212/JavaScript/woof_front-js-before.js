
        var woof_is_permalink =1;
        var woof_shop_page = "";
                var woof_m_b_container =".woocommerce-products-header";
        var woof_really_curr_tax = {};
        var woof_current_page_link = location.protocol + '//' + location.host + location.pathname;
        /*lets remove pagination from woof_current_page_link*/
        woof_current_page_link = woof_current_page_link.replace(/\page\/[0-9]+/, "");
                        woof_current_page_link = "https://tiendaideal.com.ar/tienda/";
                        var woof_link = 'https://tiendaideal.com.ar/wp-content/plugins/woocommerce-products-filter/';
        
        var woof_ajaxurl = "https://tiendaideal.com.ar/wp-admin/admin-ajax.php";

        var woof_lang = {
        'orderby': "orderby",
        'date': "fecha",
        'perpage': "por página",
        'pricerange': "rango de precios",
        'menu_order': "orden del menú",
        'popularity': "popularidad",
        'rating': "clasificación",
        'price': "precio bajo a alto",
        'price-desc': "precio alto a bajo",
        'clear_all': "Vaciar todo"
        };

        if (typeof woof_lang_custom == 'undefined') {
        var woof_lang_custom = {};/*!!important*/
        }

        var woof_is_mobile = 0;
        


        var woof_show_price_search_button = 0;
        var woof_show_price_search_type = 0;
        
        var woof_show_price_search_type = 1;

        var swoof_search_slug = "swoof";

        
        var icheck_skin = {};
                    icheck_skin = 'none';
        
        var is_woof_use_chosen =1;

                var woof_current_values = '[]';
                var woof_lang_loading = "Cargando ...";

        
        var woof_lang_show_products_filter = "mostrar los filtros del producto";
        var woof_lang_hide_products_filter = "ocultar los filtros del producto";
        var woof_lang_pricerange = "rango de precios";

        var woof_use_beauty_scroll =0;

        var woof_autosubmit =1;
        var woof_ajaxurl = "https://tiendaideal.com.ar/wp-admin/admin-ajax.php";
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

        var woof_toggle_closed_image = "https://tiendaideal.com.ar/wp-content/plugins/woocommerce-products-filter/img/plus3.png";
        var woof_toggle_opened_image = "https://tiendaideal.com.ar/wp-content/plugins/woocommerce-products-filter/img/minus3.png";


        /*indexes which can be displayed in red buttons panel*/
                var woof_accept_array = ["min_price", "orderby", "perpage", "min_rating","product_visibility","product_cat","product_tag","pa_categoria","pa_color","pa_espejos","pa_fija-extensible","pa_genero","pa_marca","pa_marcas","pa_medida","pa_oficina","pa_relleno","pa_soporta-por-lado","pa_talle","pa_tamano","pa_temporada","fb_product_set","yith_product_brand"];

        
        /*for extensions*/

        var woof_ext_init_functions = null;
        

        
        var woof_overlay_skin = "default";


        function woof_js_after_ajax_done() {
        jQuery(document).trigger('woof_ajax_done');
                }

        
