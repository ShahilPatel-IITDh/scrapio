



var rrData = {'id':'','uid':''};

function getRRdata(){
    var jar = getCookieRR('rr_sess');
    if (jar){
      rrData.id = jar;
    }else{
      createSess();
    }

   rrData.uid = getCookieRR('pedEmR');

    var zoneData = getCookieRR('locdata');
    var zoneItems = zoneData.split('|');
    var zoneItem = '';

    for (i = 0; i < zoneItems.length; i++) {
        zoneItem = zoneItems[i].split('=');

        if (zoneItem[0] == "state"){
        rrData.zone = zoneItem[1];
        }
    }

}

function pdpAddToCart(){

    var rr_page_name = rrDataGaTrackingName;

    $("#addToCart").click();
}

function createSess(){
    var str = Math.random();
    str = str.toString();
    str = str.substr(2);
    rrData.id = str;
    SetCookieRR('rr_sess', str, 180);
}


// Cookie Functions //

function SetCookieRR(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;secure;";
}

function getCookieRR(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(selectedId, currentViewId){
    var ar_value = getCookie('compare');
    if(ar_value.length == 0){
        setCookie('compare', currentViewId, 7);
    }
    setCookie('compare', selectedId, 7);
}



// Cookie Functions /

var isMobileRR = false;

function runRR (){

// Get data
getRRdata();

if(typeof r3_common === 'function'){


var R3_COMMON = new r3_common();



R3_COMMON.setApiKey('ed31055c05eee3c3');
R3_COMMON.setBaseUrl('https://recs.richrelevance.com/rrserver/');
R3_COMMON.setSessionId(rrData.id);
R3_COMMON.setClickthruServer(window.location.protocol+'//'+window.location.host);

if (rrData.uid){
    R3_COMMON.setUserId(rrData.uid);
}

if (rrData.zone){
    R3_COMMON.setRegionId(rrData.zone);
}


 R3_COMMON.setChannel('59a69a6270cecdee');

if(pageInfo !== undefined && pageInfo !== null) {

    if (pageInfo.pageType == 'category'){

        var R3_CATEGORY = new r3_category();
        // Category ID must match a category id as passed in catalog feed
        R3_CATEGORY.setId(pageInfo.cat_id);
        // If you want, you can specify the category name as it should be displayed to customers.
        // This is optional. If you pass a value, it will override the one provided in the Product Feed
        // for this Category ID.
        R3_CATEGORY.setName(pageInfo.cat_name);

    }else if (pageInfo.pageType == 'product') {

        R3_COMMON.addCategoryHintId(pageInfo.cat_id);

          var R3_ITEM = new r3_item();
          R3_ITEM.setId(pageInfo.pid);
          R3_ITEM.setName(pageInfo.pname);

    }else if (pageInfo.pageType == 'home') {

          var R3_HOME = new r3_home();

    }else if (pageInfo.pageType == 'addtocart') {

        if ( pageInfo.itemsInCart.length > 0){
            var R3_ADDTOCART = new r3_addtocart();

            for (i = 0; i < pageInfo.itemsInCart.length; i++) {

                R3_ADDTOCART.addItemIdToCart(pageInfo.itemsInCart[i]);

            }
        }

    }else if (pageInfo.pageType == 'cart') {

        if ( pageInfo.itemsInCart.length > 0){
            var R3_CART = new r3_cart();

            for (i = 0; i < pageInfo.itemsInCart.length; i++) {

                R3_CART.addItemId(pageInfo.itemsInCart[i]);

            }
        }


    }else if (pageInfo.pageType == 'brand') {

        R3_COMMON.setPageBrand(pageInfo.brand);

        var R3_BRAND = new r3_brand();


    }else if (pageInfo.pageType == 'success') {

       var R3_PURCHASED = new r3_purchased();

       R3_PURCHASED.setOrderNumber(pageInfo.orderId);


        for(var i = 0; i <pageInfo.purchasedItems.length; i++) {

            R3_PURCHASED.addItemIdPriceQuantity(pageInfo.purchasedItems[i].id, pageInfo.purchasedItems[i].price, pageInfo.purchasedItems[i].qty, pageInfo.purchasedItems[i].model);

        }

    }else if (pageInfo.pageType == 'article') {

        if (pageInfo.brand){
            R3_COMMON.setPageBrand(pageInfo.brand);
        }

        if (pageInfo.cat_id){
            R3_COMMON.addCategoryHintId(pageInfo.cat_id);
        }

    }else if (pageInfo.pageType == 'search') {

          var R3_SEARCH = new r3_search();
          R3_SEARCH.setTerms(pageInfo.searchTerm);

    }

}

if(pageInfo.rrPlacement !== undefined && pageInfo.rrPlacement !== null) {

    for(var i = 0; i <pageInfo.rrPlacement.length; i++) {
        R3_COMMON.addPlacementType(pageInfo.rrPlacement[i]);
    }

}

if(pageInfo.itemsOnPage !== undefined && pageInfo.itemsOnPage !== null) {

    for(var i = 0; i <pageInfo.itemsOnPage.length; i++) {
        R3_COMMON.addItemId(pageInfo.itemsOnPage[i]);
        if (i === 14) { break; }
    }

}

// Refinements
if(pageInfo.rrRefinements !== undefined && pageInfo.rrRefinements !== null) {
    var rrRefineData = "";

    for(var i = 0; i <pageInfo.rrRefinements.length; i++) {

        rrRefineData = new Array();
        rrRefineData = pageInfo.rrRefinements[i].split("|");

        R3_COMMON.addRefinement('\'' + rrRefineData[0] + '\'', '\'' + rrRefineData[1] + '\'');
    }

}



rr_flush_onload();



r3();

}
}
     function ratingStars(rating){
            rating = String(rating);
            if (rating=='' || rating=='0' || rating == 'No Rating'){rating='0.0';}
            var star_output = '<span class="stars" data-rating="' + rating + '">';
            var rating_num = rating.split('.')[0];
            if(rating_num > 5){rating_num = 5;}
            if(rating_num <= 0){rating_num = 0;}

            var rating_dec = rating.split('.')[1];
                rating_dec = rating_dec.substring(0,1);

            var full_stars = rating_num;

            var var_star = '';

            var blank_stars = 4 - rating_num;
            if (full_stars <= 0){full_stars=0;}
            if (blank_stars <= 0){blank_stars=0;}

            //Write total full stars
            for(var s = rating_num; s > 0; s--){
                star_output += '<span aria-hidden="true" class="icon-star"></span>';
            }

            //if rating_num < 5 calculate and write var_star
            if(rating_num < 5){

                var star_src= '';

                if(rating_dec == 0){
                    star_src = 'icon-star-o';
                }

                else if((rating_dec > 0) && (rating_dec < 5)){
                    star_src = 'icon-star-half-empty';
                }

                else if((rating_dec >= 5) && (rating_dec < 7)){
                    star_src = 'icon-star-half-empty';
                }

                else if((rating_dec >= 7) && (rating_dec <= 9)){
                    star_src = 'icon-star-half-empty';
                }

                star_output += '<span aria-hidden="true" class="' + star_src + '"></span>';
            }

            //Calculate and write blank stars
            for(var t = blank_stars; t > 0; t--){
                star_output += '<span aria-hidden="true" class="icon-star-o"></span>';
            }
            star_output += '</span>';

            return star_output;
        }



// This is keeps track of how many article calls have been called
var articlesTabTracking = 1;

function rrRender(rrData){

    for (i = 0; i < rrData.length; i++) {

        var rrInfo = '';

        if ( Array.isArray(rrData[i]) ){
            for (x = 0; x < rrData[i].length; x++) {

                rrInfo = rrGetPlacementData(rrData[i][x].placement);

                rrPlacementStuff(rrInfo.placementType, rrInfo.placement, rrData[i][x]);
            }

        } else {

            rrInfo = rrGetPlacementData(rrData[i].placement_name);

            rrPlacementStuff(rrInfo.placementType, rrInfo.placement, rrData[i]);

        }

    }

    // feature detect to make sure it has been loaded to avoid error
    if(window.helpers && 'lazyLoad' in window.helpers){
        // select the parent(s?) that encapsulates all the images to be lazy loaded    
        let parents = document.querySelectorAll('.productsRecommendsContainer, .prodPage, #articleBottomRR, div[rr]'); 
        // init the lazy loading on the containers' images    
        for(let i=0;i<parents.length;i++){
            let parent = parents[i];
            window.helpers.lazyLoad(parent);
        }
    }
}

var rrDataGaTrackingName = '';
function rrGetPlacementData(rrData){

        //Test
        //rrData = 'item_page.mvt_lmd_bottom_rec';


        var re = /(.._|..._)/;
        var storesIdTest = getStoreID();

        var rr_placement = rrData;
        var rr_page_name = rr_placement.split('.')[0];
        rrDataGaTrackingName = rr_placement;


        /*if(rr_placement.indexOf('MVT_') !== -1 && rr_placement.indexOf('bottom_rec') !== -1){
            var mvt_test = true;
        }
        else{
            mvt_test = false;
        }*/

        var rr_site_str = rr_placement.split('.')[1].replace('MVT_','');
        var rr_site_name = rr_site_str.match(re);
        var rr_placement = rr_site_str.replace(rr_site_name[0], '');
        var rr_site_name = rr_site_name[0].replace('_', '');

        var rrType = "banner";
        if (rr_placement == 'top_rec' || rr_placement == 'bottom_rec' || rr_placement == 'vanity_bottom_rec'  || rr_placement == 'listing_bottom_rec' || rr_placement == 'no_results_1' || rr_placement == 'article_rec_1'){rrType = "productHorizontal";}
        if (rr_placement == 'expert_rec'){rrType = "expertRec";}
        if (rr_page_name == "add_to_cart_page" && rr_placement == 'accessories_rec'){ rrType = "miniCart"; }
        if (rr_page_name == "purchase_complete_page" && rr_placement == 'bottom_rec'){ rrType = "checkoutSuccess"; }

        if (rr_placement == 'home_top_rec' || rr_placement == 'home_bottom_rec' || rr_placement == 'article_rec_1' || rr_placement == 'no_results_1' || rr_placement == 'bottom_rec'){

            rrType = "productHorizontalFullWidth";

            rr_placement = rr_placement.replace('home_','');
        }

        if ((rr_page_name == "category_page" || rr_page_name == "home_page") && rr_placement == 'home_hero_1'){ rr_placement = rr_placement.replace('home_',''); }
        if ((rr_page_name == "category_page" || rr_page_name == "home_page") && rr_placement == 'home_hero_2'){ rr_placement = rr_placement.replace('home_',''); rrType = "hero2"; }
        if(rr_placement.indexOf('article_tab') !== -1){rrType = 'articleTabs'; }
        if(rr_placement.indexOf('right_rail_article') !== -1){ rrType = 'rightArticles'; }
        if (rr_placement == 'home_left_rail_banner_1' && storesIdTest == 15){ rrType = 'ecd_LR_Home_1'; }
        if (rr_placement == 'home_left_rail_banner_2' && storesIdTest == 15){ rrType = 'ecd_LR_Home_2'; }
        if (rr_placement == 'vert_right_rec'){rrType = 'vertRight';}
        //if (mvt_test == true){rrType = 'productHorizontalCurrent';}

        if (rr_page_name == 'item_page'){
            rrType = 'prodHorzCurrentFW';
        }
        if (rr_placement == 'similar_products'){
            rrType = 'similarProducts';
        }

    return  {placement : rr_placement, pageName : rr_page_name, site : rr_site_str, placementType: rrType };

}


function rrPlacementStuff(type,targ,rrData){

//Add type to rrData
rrData['pageType'] = type;

var linkICNParams = '';
var linkICNParams_v2 = '';

if(rrData.srcPED == true){
    var srcICN = 'PED';
}
else{
    var srcICN = 'RichRelevance';
}

var storesIdTest = getStoreID();

// Simple Banner //
    var titleAttr = '';
    if (typeof rrData.name !== 'undefined') {
        titleAttr = ' title="' + rrData.name + '"';
    }

    if (type == 'hero2'){

        // $('.' + targ).html('<a' + titleAttr + ' href="' + rrData.link_url + '"><img' + titleAttr + altAttr + ' class="lazy PED_placeholder" data-src="' + rrData.image_url  + '"/></a>');
        // $('#ped_carousel').remove();

    }else if (type == 'banner'){


        $('.' + targ).html('<a' + titleAttr + ' href="' + rrData.link_url + '"><img' + titleAttr + altAttr + ' class="lazy PED_placeholder" data-src="' + rrData.image_url  + '"/></a>');
        $('.' + targ).css('overflow','hidden');
        $('.' + targ + ' .button').remove();

    }else if(type == 'productHorizontal'){
    // Replace this with HTML Template on page //

        //$('.bottom_rec').css('margin-bottom', '30px');


        if (Array.isArray(rrData.items)){
            if (rrData.items.length >= 1 ){

                // Write Header Bar
                if(targ == 'bottom_rec' || targ == 'top_rec' || targ == 'article_rec_1'){
                    $('.' + targ + '_title').append('<div class="expert-title article_hdng" style="width:100%" tabindex="0">' + rrData.strategy_message + '</div>');
                }
                else{
                    $('.' + targ + '.mobile-remove').append('<div class="expert-title article_hdng" style="width:100%" tabindex="0">' + rrData.strategy_message + '</div>');
                }

                var hasSalePrice = false;
                for (var sp = 0; sp < rrData.items.length; sp++) {
                    if(rrData.items[sp].sale_price != ''){
                        hasSalePrice = true;
                    }
                }
                //hasSalePrice = false;

                //Check to see if placement contains "Home to determine how many characters should show before the name is truncated"
                for (ii = 0; ii < rrData.items.length; ii++) {

                    var rr_place_res = rrData.placement_name;
                    var rr_page_site_str0 = rr_place_res.split('.')[0];
                    var rr_page_site_str = rr_place_res.split('.')[1];
                    var re = /(.._|..._)/;
                    var rr_site = rr_page_site_str.match(re);
                    var rr_page_place = rr_page_site_str.replace(rr_site[0], '');
                    var home_check = rr_page_place.indexOf('home');
                    var article_check = rr_page_place.indexOf('article');
                    var item_page_check = rr_page_site_str0.indexOf('item');
                    var search_page_check = rr_page_site_str0.indexOf('search');


                    var maxNameLength = '';
                    var storesIdTest = getStoreID();

                    if(home_check > -1){
                        maxNameLength = 50;
                        if(typeof pedRREndpoint !== "undefined" && pedRREndpoint == "true"){
                            linkICNParams = '?icn=' + srcICN + '&icl=home+page';
                            linkICNParams_v2 = '?icn=' + srcICN + '&icl=home+page';
                        }
                        else{
                            linkICNParams = '?icn=' + srcICN + '%26icl=home%2Bpage';
                            linkICNParams_v2 = '?icn=' + srcICN + '%26icl=home%2Bpage';
                        }
                    }

                    else if(article_check > -1){
                        maxNameLength = 50;
                        if(typeof pedRREndpoint !== "undefined" && pedRREndpoint == "true"){
                            linkICNParams = '?icn=' + srcICN + '&icl=article+page';
                            linkICNParams_v2 = '?icn=' + srcICN + '&icl=article+page';
                        }
                        else{
                            linkICNParams = '?icn=' + srcICN + '%26icl=article%2Bpage';
                            linkICNParams_v2 = '?icn=' + srcICN + '%26icl=article%2Bpage';
                        }
                    }
                    else if(item_page_check > -1){
                        maxNameLength = 50;
                        if(typeof pedRREndpoint !== "undefined" && pedRREndpoint == "true"){
                            linkICNParams = '?icn=' + srcICN + '&icl=product+page';
                            linkICNParams_v2 = '?icn=' + srcICN + '&icl=product+page';
                        }
                        else{
                            linkICNParams = '?icn=' + srcICN + '%26icl=product%2Bpage';
                            linkICNParams_v2 = '?icn=' + srcICN + '%26icl=product%2Bpage';
                        }
                    }
                    else if((search_page_check > -1) && (rr_page_place == 'no_results_1')){
                        maxNameLength = 50;
                        if(typeof pedRREndpoint !== "undefined" && pedRREndpoint == "true"){
                            linkICNParams = '?icn=' + srcICN + '&icl=no+results+page';
                            linkICNParams_v2 = '?icn=' + srcICN + '&icl=no+results+page';
                        }
                        else{
                            linkICNParams = '?icn=' + srcICN + '%26icl=no%2Bresults%2Bpage';
                            linkICNParams_v2 = '?icn=' + srcICN + '%26icl=no%2Bresults%2Bpage';
                        }
                    }

                    else{
                        if(storesIdTest == 13){
                            maxNameLength = 75;
                        } else if(storesIdTest == 15){

                            if(rr_page_site_str0 == 'item_page'){
                                maxNameLength = 55;
                            }
                            else{
                                maxNameLength = 70;
                            }

                        }
                        else{ maxNameLength = 65; }
                    }

                    titleAttr = '';
                    altAttr = '';
                    if (typeof rrData.items[ii].name !== 'undefined') {
                        titleAttr = ' title="' + rrData.items[ii].name + '"';
                        altAttr = ' alt="' + rrData.items[ii].name + '"';
                    }
                    else{
                        altAttr = ' alt="View Product"';
                        titleAttr = ' title="View Product"';
                    }
                    var rrItem = '';
                    rrItem = '<div class="itemCont">';
                        rrItem += '<div class="imgCont"><a' + titleAttr + ' href="' + rrData.items[ii].link_url + linkICNParams + '" tabindex="-1" aria-hidden="true"><img' + titleAttr + altAttr + ' class="richImg lazy PED_placeholder" style="width:100px; heigth:auto;" data-src="' + rrData.items[ii].image_url.replace('/600/','/100/')  + '"/></a></div>';

                        rrItem += '<div class="ratRev"><a href="' + rrData.items[ii].link_url + linkICNParams +  '#reviews">' + ratingStars(rrData.items[ii].rating) + '<span class="numRev">';
                        if(rrData.items[ii].num_reviews > 0){
                            rrItem += '(' + (isNaN(parseInt(rrData.items[ii].num_reviews)) ? 0 : parseInt(rrData.items[ii].num_reviews)) + ')</span></a>';
                        }
                        rrItem += '</span></div>';

                        var nameStr =   rrData.items[ii].name;
                        var truncName = nameStr.substring(0,maxNameLength);
                        truncName = truncName.substr(0, Math.min(truncName.length, truncName.lastIndexOf(" ")));
                        var nameLength = nameStr.length;

                        if(nameLength >= maxNameLength){
                            rrItem += '<div class="nameCont"><a href="' + rrData.items[ii].link_url + linkICNParams + '" title="' + rrData.items[ii].name.replace('"','&quot;') + '">' + truncName  + '...</a></div>';
                        }
                        else{
                            rrItem += '<div class="nameCont"><a href="' + rrData.items[ii].link_url + linkICNParams + '" title="' + rrData.items[ii].name.replace('"','&quot;') + '">' + rrData.items[ii].name  + '</a></div>';
                        }

                        rrItem += '<div class="priceCont">';


                        if(hasSalePrice){
                            //Some of them have a sale price....check for ii
                            if(rrData.items[ii].sale_price != ''){
                                rrItem += '<div><a class="richPrice onSale" data-event-label="'+truncName.replace('"','&quot;')+'" style="text-decoration: line-through;" href="' + rrData.items[ii].link_url + linkICNParams + '">$' + rrData.items[ii].price  + '</a></div>';
                                rrItem += '<div style="padding-top: 10px;"><a class="richSalePrice onSale" href="' + rrData.items[ii].link_url + linkICNParams + '">$' + rrData.items[ii].sale_price  + '</a></div>';
                            }
                            else{

                                rrItem += '<div><a class="richPrice" data-event-label="'+truncName.replace('"','&quot;')+'" href="' + rrData.items[ii].link_url + linkICNParams + '">$' + rrData.items[ii].price  + '</a></div>';
                                rrItem += '<div class="salePriceHolder" style="padding-top: 15px;">&nbsp;</div>';
                            }


                        }else if (rrData.items[ii].price != '') {
                            //None of them have sale price
                            rrItem += '<div><a class="richPrice"  data-event-label="'+truncName.replace('"','&quot;')+'" href="' + rrData.items[ii].link_url + linkICNParams + '">$' + rrData.items[ii].price  + '</a></div>';
                        }


                        /*if(hasSalePrice){
                            //Some of them have a sale price....check for ii
                            if(rrData.items[ii].sale_price != ''){
                                rrItem += '<div class="salePriceHolder"><a data-event-label="'+truncName.replace('"','&quot;')+'" class="richPrice onSale" style="text-decoration: line-through" href="' + rrData.items[ii].link_url + linkICNParams + '">$' + rrData.items[ii].price  + '</a></div>';
                                rrItem += '<div style="padding-top:10px;"><a data-event-label="'+truncName.replace('"','&quot;')+'" class="richSalePrice onSale" href="' + rrData.items[ii].link_url + linkICNParams + '">$' + rrData.items[ii].sale_price  + '</a></div>';
                            }
                            else{
                                rrItem += '<div class="salePriceHolder" style="height: 32px;">&nbsp;</div>';
                                rrItem += '<div><a data-event-label="'+truncName.replace('"','&quot;')+'" class="richPrice" href="' + rrData.items[ii].link_url + linkICNParams + '">$' + rrData.items[ii].price  + '</a></div>';
                            }


                        }else if (rrData.items[ii].price != '') {
                            //None of them have sale price
                            rrItem += '<div><a class="richPrice" data-event-label="'+truncName.replace('"','&quot;')+'" href="' + rrData.items[ii].link_url + linkICNParams + '">$' + rrData.items[ii].price  + '</a></div>';
                        }*/


                        /*if(rrData.items[ii].sale_price != ''){

                            rrItem += '<div><a class="richPrice onSale" style="text-decoration: line-through" href="' + rrData.items[ii].link_url + linkICNParams + '">$' + rrData.items[ii].price  + '</a></div>';
                            rrItem += '<div style="padding-top:10px;"><a class="richSalePrice onSale" href="' + rrData.items[ii].link_url + linkICNParams + '">$' + rrData.items[ii].sale_price  + '</a></div>';

                        }else if (rrData.items[ii].price != '') {
                            rrItem += '<div><a class="richPrice" href="' + rrData.items[ii].link_url + linkICNParams + '">$' + rrData.items[ii].price  + '</a></div>';
                        }*/

                        rrItem += '</div>';
                        rrItem += '<div class="addCartCont"><a href="' + rrData.items[ii].link_url + linkICNParams + '&action=buy_now"><span class="button ">Add To Cart</span></a></div>';
                        rrItem += '</div>';

                    // Write data to Container
                    let targetContainer = $('.' + targ + '.mobile-remove');
                    targetContainer.append(rrItem);
                    targetContainer.addClass({display: "block"});
                }
            }
        }
    }

    else if(type == 'productHorizontalFullWidth'){
    // Replace this with HTML Template on page //

        if (Array.isArray(rrData.items)){
            if (rrData.items.length >= 1 ){

                // Write Header Bar
                $('.' + targ + '_title').append('<div class="product-horizontal-title" tabindex="0">' + rrData.strategy_message + '</div>');

                //Create an array of name lengths
                var prodNameLengths = [];
                for (ii = 0; ii < rrData.items.length; ii++) {
                    var nameStr = rrData.items[ii].name;
                    var nameLength = nameStr.length;
                    prodNameLengths.push(nameLength);
                }

                var longestProdNameLength = 0;
                var x;
                for(x = 0; x < prodNameLengths.length; x++){
                    if(prodNameLengths[x] > longestProdNameLength){
                        longestProdNameLength = prodNameLengths[x];
                    }
                }


                var hasSale = false;
                for (ii = 0; ii < rrData.items.length; ii++) {
                    if(rrData.items[ii].sale_price != ''){
                        hasSale = true;
                    }
                }

                //Check to see if placement contains "Home" to determine how many characters should show before the name is truncated
                for (ii = 0; ii < rrData.items.length; ii++) {

                    var rr_place_res = rrData.placement_name;
                    var rr_page_site_str0 = rr_place_res.split('.')[0];
                    var rr_page_site_str = rr_place_res.split('.')[1];
                    var re = /(.._|..._)/;
                    var rr_site = rr_page_site_str.match(re);
                    var rr_page_place = rr_page_site_str.replace(rr_site[0], '');
                    var search_page_check = rr_page_site_str0.indexOf('search');

                    var home_check = rr_page_place.indexOf('home');
                    var article_check = rr_page_place.indexOf('article');
                    var item_page_check = rr_page_site_str0.indexOf('item');

                    var imgDataSrc = rrData.items[ii].image_url.replace('/600/','/280/');

                    if(home_check > -1){
                        if(typeof pedRREndpoint !== "undefined" && pedRREndpoint == "true"){
                            linkICNParams = '?icn=' + srcICN + '&icl=home+page';
                            linkICNParams_v2 = '?icn=' + srcICN + '&icl=home+page';
                            linkICNParams = decodeURIComponent(linkICNParams);
                        }
                        else{
                            linkICNParams = '?icn=' + srcICN + '%26icl=home%2Bpage';
                            linkICNParams_v2 = '?icn=' + srcICN + '%26icl=home%2Bpage';
                        }

                    }
                    else if(article_check > -1){
                        
                        imgDataSrc = rrData.items[ii].image_url.replace('/600/','/150/');

                        if(typeof pedRREndpoint !== "undefined" && pedRREndpoint == "true"){
                            linkICNParams = '?icn=' + srcICN + '&icl=article+page';
                            linkICNParams_v2 = '?icn=' + srcICN + '&icl=article+page';
                        }
                        else{
                            linkICNParams = '?icn=' + srcICN + '%26icl=article%2Bpage';
                            linkICNParams_v2 = '?icn=' + srcICN + '%26icl=article%2Bpage';
                        }
                    }
                    else if(item_page_check > -1){
                        if(typeof pedRREndpoint !== "undefined" && pedRREndpoint == "true"){
                            linkICNParams = '?icn=' + srcICN + '&icl=product+page';
                            linkICNParams_v2 = '?icn=' + srcICN + '&icl=product+page';
                        }
                        else{
                            linkICNParams = '?icn=' + srcICN + '%26icl=product%2Bpage';
                            linkICNParams_v2 = '?icn=' + srcICN + '%26icl=product%2Bpage';
                        }
                    }
                     else if((search_page_check > -1) && (rr_page_place == 'no_results_1')){
                        if(typeof pedRREndpoint !== "undefined" && pedRREndpoint == "true"){
                            linkICNParams = '?icn=' + srcICN + '&icl=no+results+page';
                            linkICNParams_v2 = '?icn=' + srcICN + '&icl=no+results+page';
                        }
                        else{
                            linkICNParams = '?icn=' + srcICN + '%26icl=no%2Bresults%2Bpage';
                            linkICNParams_v2 = '?icn=' + srcICN + '%26icl=no%2Bresults%2Bpage';
                        }
                    }

                    titleAttr = '';
                    altAttr = '';
                    if (typeof rrData.items[ii].name !== 'undefined') {
                        titleAttr = ' title="' + rrData.items[ii].name.replace('"','&quot;') + '"';
                        altAttr = ' alt="' + rrData.items[ii].name.replace('"','&quot;') + '"';
                    }
                    else{
                        altAttr = ' alt="View Product"';
                        titleAttr = ' title="View Product"';
                    }
                    var rrItem = '';

                    rrItem = '<div class="productHorzItem itemCont">';
                        rrItem += '<div class="imgCont"><a' + titleAttr + ' href="' + rrData.items[ii].link_url + linkICNParams + '" tabindex="-1" aria-hidden="true"><img' + titleAttr + altAttr + ' class="lazy PED_placeholder richImg" data-src="' + imgDataSrc + '"/></a></div>';


                        var nameStr =   rrData.items[ii].name;
                        var nameLength = nameStr.length;
                        var nameLengthDiff = longestProdNameLength - nameLength;
                        var productName = rrData.items[ii].name;


                        //Add extra whitespaces to even out height of names

                        //if(nameLength < longestProdNameLength){
                            //var x;
                            //for(x = 0; x < nameLengthDiff; x++){
                                //productName += '&nbsp;';
                            //}
                        //}


                        rrItem += '<div class="nameCont"><a href="' + rrData.items[ii].link_url + linkICNParams + '" title="' + rrData.items[ii].name.replace('"','&quot;') + '">' + productName + '</a></div>';

                        rrItem += '<div class="ratRev"><a href="' + rrData.items[ii].link_url + linkICNParams + '#reviews" data-event-label="Read ' + (isNaN(parseInt(rrData.items[ii].num_reviews)) ? 0 : parseInt(rrData.items[ii].num_reviews))  + ' Reviews for ' + productName.replace('"','&quot;') + '">' + ratingStars(rrData.items[ii].rating) + '<span class="numRevLink colorBlue">';
                        var reviewText = ' Reviews';
                        rrItem += '(' + (isNaN(parseInt(rrData.items[ii].num_reviews)) ? 0 : parseInt(rrData.items[ii].num_reviews)) +reviewText+')</span></a>';
                        rrItem += '</span></div>';

                        if(hasSale){
                            rrItem += '<div class="priceCont hasSale">';
                        }
                        else{
                            rrItem += '<div class="priceCont">';
                        }

                        if(rrData.items[ii].sale_price != ''){
                            
                            rrItem += '<div><a data-event-label="'+productName.replace('"','&quot;')+'" class="richPrice onSale" style="text-decoration: line-through" href="' + rrData.items[ii].link_url + linkICNParams + '">$' + rrData.items[ii].price  + '</a></div>';
                            rrItem += '<div style="margin-left:10px;">';
                            rrItem += '<a class="richSalePrice onSale" data-event-label="'+productName.replace('"','&quot;')+'" href="' + rrData.items[ii].link_url + linkICNParams + '">$' + rrData.items[ii].sale_price  + '</a></div>';
                        }else if (rrData.items[ii].price != '') {
                            rrItem += '<div><a class="richPrice" data-event-label="'+productName.replace('"','&quot;')+'" href="' + rrData.items[ii].link_url +  linkICNParams + '">$' + rrData.items[ii].price  + '</a></div>';
                        }
                        rrItem += '</div>';
                        rrItem += '<div class="spcr"></div>';
                        rrItem += '<div class="addCartCont"><a class="PED_button" href="' + rrData.items[ii].link_url + linkICNParams + '" data-event-label="View Item Details for ' + productName.replace('"','&quot;') + '">View Item Details</a></div>';
                        rrItem += '</div>';

                    // Write data to Container
                    let targetContainer = $('.' + targ + '.mobile-remove');
                    targetContainer.append(rrItem);
                    targetContainer.css({display: "block"});
                }
            }
        }
    }

    else if(type == 'prodHorzCurrentFW'){

        if(typeof pedRREndpoint !== "undefined" && pedRREndpoint == "true"){
            linkICNParams = '?icn=' + srcICN + '&icl=product+page';
            linkICNParams_v2 = '?icn=' + srcICN + '&icl=product+page';
        }
        else{
            linkICNParams = '?icn=' + srcICN + '%26icl=product%2Bpage';
            linkICNParams_v2 = '?icn=' + srcICN + '%26icl=product%2Bpage';
        }

        if (Array.isArray(rrData.items)){
            if (rrData.items.length >= 1 ){

                // Write Header Bar
                $('.' + targ + '_title').append('<div class="product-horizontal-title" tabindex="0">' + rrData.strategy_message + '</div>');
                $('.' + targ + '_title').addClass('mvt');


                var currentProdName = $('#productTitle').text();
                var ratingDom = $('.starBox .stars');
                if (ratingDom.length){
                    var currentStarsRating = ratingDom.data('rating');
                } else{
                    currentStarsRating = '0';
                }

                var pdpProdName = document.getElementById('pdpProdName');
                if (typeof(pdpProdName) != 'undefined' && pdpProdName != null){
                    var currentProdName = pdpProdName.value;
                }
                    
                var pdpRevCount = document.getElementById('pdpRevCount');
                if (typeof(pdpRevCount) != 'undefined' && pdpRevCount != null){
                    var currentNumReviews = pdpRevCount.value;
                }
                else{
                    var currentNumReviews = 0;
                }

                if ($('.reviewStarContainer2 a')[0]){
                    var currentReviewsLink = $('.reviewStarContainer2 a').attr('href');
                    if(linkICNParams){
                        currentReviewsLink = currentReviewsLink + linkICNParams_v2;
                    }
                }
                else{
                    currentReviewsLink = '';
                }

                var currentPrice = $('#priceWrapper #productsPrice').text();
                var beforeSalePrice = $('#priceWrapper .salesPrice').text();
                var currentCartProdNum = $("input[name='products_id']").val();
                var currentProdImgSrc = $('#prodImage img').attr('src');

                //Create an array of name lengths
                var prodNameLengths = [];
                var currentNameLength = currentProdName.length;
                prodNameLengths.push(currentNameLength);

                for (ii = 0; ii < rrData.items.length; ii++) {
                    var nameStr = rrData.items[ii].name;
                    var nameLength = nameStr.length;
                    prodNameLengths.push(nameLength);
                }

                var longestProdNameLength = 0;
                var x;
                for(x = 0; x < prodNameLengths.length; x++){
                    if(prodNameLengths[x] > longestProdNameLength){
                        longestProdNameLength = prodNameLengths[x];
                    }
                }


                var hasSale = false;
                for (ii = 0; ii < rrData.items.length; ii++) {
                    if(rrData.items[ii].sale_price != ''){
                        hasSale = true;
                    }
                }
                var rrItem = '';

                var altAttr = '';
                var titleAttr = '';

                if (typeof currentProdName !== 'undefined') {
                    if (currentProdName.indexOf('"') != -1) {
                        var titleTemp = currentProdName.replace(/"/g, '');
                    }
                    else{
                        var titleTemp = currentProdName;
                    }
                    titleAttr = ' title="' + titleTemp + '"';
                    altAttr = ' alt="' + titleTemp + '"';
                }
                else{
                    altAttr = ' alt="View Product"';
                    titleAttr = ' title="View Product"';
                }


                //Write content for "Currently Viewing" box

                rrItem = '<div class="productHorzItem itemCont currentlyViewing" rr>';

                        rrItem += '<div class="currentlyViewingTitle">Currently Viewing</div>';
                        rrItem += '<div class="imgCont"><img' + titleAttr + altAttr + ' class="lazy PED_placeholder richImg" data-src="' + currentProdImgSrc.replace('/600/','/150/')  + '"/></div>';


                        rrItem += '<div class="nameCont">' + currentProdName + '</div>';
                   
                        rrItem += '<div class="ratRev">';
                        rrItem += ratingStars(currentStarsRating); 
                        rrItem += '<button class="numRevLinkBtn" data-event-label="Read ' + (isNaN(parseInt(currentNumReviews)) ? 0 : parseInt(currentNumReviews)) + ' Reviews for ' + currentProdName.replace('"','&quot;') + '">';
                        rrItem += '<span class="colorBlue">';
                        if(currentNumReviews > 0){
                            var reviewText = ' Reviews';
                        }
                        else{
                            var reviewText = '';
                        }
                        rrItem += '(' + (isNaN(parseInt(currentNumReviews)) ? 0 : parseInt(currentNumReviews)) + reviewText+ ')';
                        rrItem += '</span>';
                        rrItem += '</button>';
                        
                        rrItem += '</div>';

                        if(hasSale){
                            rrItem += '<div class="priceCont hasSale">';
                        }
                        else{
                            rrItem += '<div class="priceCont">';
                        }

                        if(beforeSalePrice != ''){
                            rrItem += '<div><span class="richPrice onSale" style="text-decoration: line-through">' + beforeSalePrice  + '</span></div>';
                            rrItem += '<div style="margin-top:5px;">';
                            rrItem += '<span class="richSalePrice onSale">' + currentPrice  + '</span></div>';
                        }else{
                            rrItem += '<div><span class="richPrice">' + currentPrice  + '</span></div>';
                        }
                        rrItem += '</div>';
                        rrItem += '<div class="spcr"></div>';
                        
                        if(prodStatus != 'discontinued'){
                            rrItem += '<div class="addCartCont"><button class="PED_button mvt" onclick="pdpAddToCart();" type="button" value="Add To Cart">Add to Cart</button></div>';
                        }
                        rrItem += '</div>';


                //End Current
                $('.' + targ + '.mobile-remove').append(rrItem);

                //Check to see if placement contains "Home to determine how many characters should show before the name is truncated"
                for (ii = 0; (ii < rrData.items.length && ii < 3); ii++) {

                    var rr_place_res = rrData.placement_name;
                    var rr_page_site_str0 = rr_place_res.split('.')[0];
                    var rr_page_site_str = rr_place_res.split('.')[1];
                    var re = /(.._|..._)/;
                    var rr_site = rr_page_site_str.match(re);
                    var rr_page_place = rr_page_site_str.replace(rr_site[0], '');

                    titleAttr = '';
                    altAttr = '';
                    if (typeof rrData.items[ii].name !== 'undefined') {
                        titleAttr = ' title="' + rrData.items[ii].name.replace('"','&quot;') + '"';
                        altAttr = ' alt="' + rrData.items[ii].name.replace('"','&quot;') + '"';
                    }
                    else{
                        altAttr = ' alt="View Product"';
                        titleAttr = ' title="View Product"';
                    }
                    var rrItem = '';

                    rrItem += '<div class="productHorzItem itemCont">';
                        rrItem += '<div class="font-weight-bold font-size-16 line-height-21 font-colors-green-text">&nbsp;</div>';
                        rrItem += '<div class="imgCont"><a' + titleAttr + ' href="' + rrData.items[ii].link_url + linkICNParams + '" tabindex="-1" aria-hidden="true"><img' + titleAttr + altAttr + ' class="PED_placeholder lazy richImg" data-src="' + rrData.items[ii].image_url.replace('/600/','/150/')  + '"/></a></div>';


                        var nameStr =   rrData.items[ii].name;
                        var nameLength = nameStr.length;
                        var nameLengthDiff = longestProdNameLength - nameLength;
                        var productName = rrData.items[ii].name;

                        rrItem += '<div class="nameCont"><a href="' + rrData.items[ii].link_url + linkICNParams + '" title="' + rrData.items[ii].name.replace('"','&quot;') + '">' + productName + '</a></div>';

                        rrItem += '<div class="ratRev"><a href="' + rrData.items[ii].link_url + linkICNParams + '#reviewsContainer" data-event-label="Read ' + (isNaN(parseInt(rrData.items[ii].num_reviews)) ? 0 : parseInt(rrData.items[ii].num_reviews)) + ' Reviews for ' + productName.replace('"','&quot;') + '">' + ratingStars(rrData.items[ii].rating) + '<span class="numRevLink colorBlue">';
                        if(rrData.items[ii].num_reviews > 0){
                            var reviewText = ' Reviews';   
                        }
                        else{
                            var reviewText = ''; 
                        }
                        rrItem += '(' + (isNaN(parseInt(rrData.items[ii].num_reviews)) ? 0 : parseInt(rrData.items[ii].num_reviews)) + reviewText+')</span></a>';
                        rrItem += '</span></div>';

                        if(hasSale){
                            rrItem += '<div class="priceCont hasSale">';
                        }
                        else{
                            rrItem += '<div class="priceCont">';
                        }

                        if(rrData.items[ii].sale_price != ''){
                            rrItem += '<div><a data-event-label="'+productName.replace('"','&quot;')+'" class="richPrice onSale" style="text-decoration: line-through" href="' + rrData.items[ii].link_url + linkICNParams + '">$' + rrData.items[ii].price  + '</a></div>';
                            rrItem += '<div style="margin-top:5px;">';
                            rrItem += '<a class="richSalePrice onSale" data-event-label="'+productName.replace('"','&quot;')+'" href="' + rrData.items[ii].link_url + linkICNParams + '">$' + rrData.items[ii].sale_price  + '</a></div>';
                        }else if (rrData.items[ii].price != '') {
                            rrItem += '<div><a class="richPrice" data-event-label="'+productName.replace('"','&quot;')+'" href="' + rrData.items[ii].link_url + linkICNParams + '">$' + rrData.items[ii].price  + '</a></div>';
                        }
                        rrItem += '</div>';
                        rrItem += '<div class="spcr"></div>';
                        rrItem += '<div class="addCartCont"><a class="PED_button" href="' + rrData.items[ii].link_url + linkICNParams + '" data-event-label="View Item Details: ' + productName.replace('"','&quot;') + '">View Item Details</a></div>';
                        rrItem += '</div>';

                    // Write data to Container
                    let targetContainer = $('.' + targ + '.mobile-remove');
                    targetContainer.append(rrItem);
                    targetContainer.addClass({display: "block"});
                }
            }
        }
        $(document).ajaxComplete(function( ) {

            if ( $('.buttonDiv').text() == 'In Cart' ){
                $("button.PED_button.mvt").replaceWith("<a class=\"PED_button button special mvt\" href=\"shopping_cart.php\">In Cart</a>");
            }
            else{
                $(".PED_button.button.special.mvt").replaceWith("<button class=\"PED_button mvt\" onclick=\"pdpAddToCart();\" type=\"button\" value=\"Add To Cart\">Add to Cart</button>");
            }
        });
    }



    else if(type == 'productHorizontalCurrent'){
    // Replace this with HTML Template on page

        if(typeof pedRREndpoint !== "undefined" && pedRREndpoint == "true"){
            linkICNParams = '?icn=' + srcICN + '&icl=product+page';
            linkICNParams_v2 = '?icn=' + srcICN + '&icl=product+page';
        }
        else{
            linkICNParams = '?icn=' + srcICN + '%26icl=product%2Bpage';
            linkICNParams_v2 = '?icn=' + srcICN + '%26icl=product%2Bpage';
        }

        if (Array.isArray(rrData.items)){
            if (rrData.items.length >= 1 ){


                // Write Header Bar
                //$('.' + targ + '.mobile-remove').append('<div class="expert-title article_hdng" style="width:100%" tabindex="0">' + rrData.strategy_message + '</div>');
                $('.' + targ + '_title').append('<div class="expert-title" style="width:100%" tabindex="0">' + rrData.strategy_message + '</div>');
                $('.' + targ + '_title').addClass('mvt');

                var currentProdName = $('#productTitle').text();
                var starBoxes = $('.starBox .stars');

                if (starBoxes.length){
                    var currentStarsRating = starBoxes.data('rating');
                } else{
                    currentStarsRating = '0';
                }

                if ($('.tab_num.tn_reviews')[0]){
                    var currentNumReviews = $('.tab_num.tn_reviews').text();
                }
                else{
                    currentNumReviews = '0';
                }

                if ($('.reviewStarContainer2 a')[0]){
                    var currentReviewsLink = $('.reviewStarContainer2 a').attr('href');
                    if(linkICNParams){
                        currentReviewsLink = currentReviewsLink + linkICNParams_v2;
                    }
                }
                else{
                    currentReviewsLink = '';
                }
                var currentPrice = $('#priceWrapper #productsPrice').text();
                var beforeSalePrice = $('#priceWrapper .salesPrice').text();
                var currentCartProdNum = $("input[name='products_id']").val();
                var currentProdImgSrc = $('#prodImage img').attr('src');

                var maxNameLength = 65;

                //Write item container for current item to placement
                var rrItem = '';
                    rrItem = '<div style="border: 2px solid #138626;" class="itemCont">';
                        rrItem += '<div style="font-weight: bold; color: #138626; font-size: 16px; line-height: 21px;">Currently Viewing</div>';
                        rrItem += '<div class="imgCont"><img alt="' + currentProdName + '" class="richImg lazy PED_placeholder" style="width:100px; heigth:auto;" data-src="' + currentProdImgSrc.replace('/360/','/100/')  + '"/></div>';

                        rrItem += '<div class="ratRev">';

                        if(currentNumReviews > 0){
                            rrItem += '<a href="' + currentReviewsLink + '">' + ratingStars(currentStarsRating) + '<span class="numRev">';
                            rrItem += '(' + (isNaN(parseInt(currentNumReviews)) ? 0 : parseInt(currentNumReviews)) + ')</span></a>';
                        }
                        else{
                            rrItem += ratingStars(currentStarsRating) + '<span class="numRev">';
                            rrItem += '(' + (isNaN(parseInt(currentNumReviews)) ? 0 : parseInt(currentNumReviews)) + ')</span>';
                        }

                        rrItem += '</div>';

                        var nameStr =   currentProdName;
                        var truncName = nameStr.substring(0,maxNameLength);
                        truncName = truncName.substr(0, Math.min(truncName.length, truncName.lastIndexOf(" ")));
                        var nameLength = nameStr.length;

                        if(nameLength >= maxNameLength){
                            rrItem += '<div class="nameCont">' + truncName  + '...</div>';
                        }
                        else{
                            rrItem += '<div class="nameCont">' + currentProdName  + '</div>';
                        }

                        rrItem += '<div class="priceCont">';
                        if(beforeSalePrice != ''){
                            rrItem += '<div class="richPrice onSale" style="text-decoration: line-through;">' + beforeSalePrice  + '</div>';
                            rrItem += '<div style="padding-top:10px;" class="richSalePrice onSale">' + currentPrice  + '</div>';
                        }else if (currentPrice != '') {
                            rrItem += '<div style="height: 30px;">&nbsp;</div>';
                            rrItem += '<div class="richPrice">' + currentPrice  + '</div>';
                        }
                        rrItem += '</div>';

                        rrItem += '<div class="addCartCont"><button class="button rr_currentview_btn" onclick="pdpAddToCart();" type="button" value="Add To Cart">Add to Cart</button></div>';

                        rrItem += '</div>';

                    // Write data to Container
                    $('.' + targ + '.mobile-remove').append(rrItem);

                //Check to see if placement contains "Home to determine how many characters should show before the name is truncated"
                for (ii = 0; ii < rrData.items.length; ii++) {

                    if(ii <= 2){

                        var rr_place_res = rrData.placement_name;
                        var rr_page_site_str0 = rr_place_res.split('.')[0];
                        var rr_page_site_str = rr_place_res.split('.')[1];
                        var re = /(.._|..._)/;
                        var rr_site = rr_page_site_str.match(re);
                        var rr_page_place = rr_page_site_str.replace(rr_site[0], '');
                        var home_check = rr_page_place.indexOf('home');
                        var article_check = rr_page_place.indexOf('article');
                        var maxNameLength = '';
                        var storesIdTest = getStoreID();

                        if(home_check > -1){
                            maxNameLength = 50;
                        }

                        else if(article_check > -1){
                            maxNameLength = 50;
                        }

                        else{
                            if(storesIdTest == 13){
                                maxNameLength = 75;
                            } else if(storesIdTest == 15){

                                if(rr_page_site_str0 == 'item_page'){
                                    maxNameLength = 55;
                                }
                                else{
                                    maxNameLength = 70;
                                }

                            }
                            else{ maxNameLength = 65; }
                        }

                        titleAttr = '';
                        altAttr = '';
                        if (typeof rrData.items[ii].name !== 'undefined') {
                            titleAttr = ' title="' + rrData.items[ii].name + '"';
                            altAttr = ' alt="' + rrData.items[ii].name + '"';
                        }
                        else{
                            altAttr = ' alt="View Product"';
                            titleAttr = ' title="View Product"';
                        }

                        if(ii == 0){
                            borderStyle = '';
                        }
                        else{borderStyle = ' style="border-left: 1px solid #ccc;"';}

                        var rrItem = '';
                        rrItem = '<div' + borderStyle + ' class="itemCont">';

                            rrItem += '<div class="imgCont" style="padding-top: 34px;">';

                            if(linkICNParams){
                                rrItem += '<a' + titleAttr + ' href="' + rrData.items[ii].link_url + linkICNParams + '" tabindex="-1" aria-hidden="true">';
                            }
                            else{
                                rrItem += '<a' + titleAttr + ' href="' + rrData.items[ii].link_url + '" tabindex="-1" aria-hidden="true">';
                            }

                            rrItem += '<img' + titleAttr + altAttr + ' class="richImg lazy PED_placeholder" style="width:100px; heigth:auto;" data-src="' + rrData.items[ii].image_url.replace('/600/','/100/')  + '"/>';
                            rrItem += '</a>';
                            rrItem += '</div>';

                            if(linkICNParams){
                                rrItem += '<div class="ratRev"><a href="' + rrData.items[ii].link_url + linkICNParams + '#reviews">' + ratingStars(rrData.items[ii].rating) + '<span class="numRev">';
                            }
                            else{
                                rrItem += '<div class="ratRev"><a href="' + rrData.items[ii].link_url + '#reviews">' + ratingStars(rrData.items[ii].rating) + '<span class="numRev">';
                            }

                            if(rrData.items[ii].num_reviews > 0){
                                rrItem += '(' + (isNaN(parseInt(rrData.items[ii].num_reviews)) ? 0 : parseInt(rrData.items[ii].num_reviews)) + ')</span></a>';
                            }
                            rrItem += '</span></div>';

                            var nameStr =   rrData.items[ii].name;
                            var truncName = nameStr.substring(0,maxNameLength);
                            truncName = truncName.substr(0, Math.min(truncName.length, truncName.lastIndexOf(" ")));
                            var nameLength = nameStr.length;

                            var prodNameLink = rrData.items[ii].link_url;
                            if(linkICNParams){
                                prodNameLink += linkICNParams;
                            }

                            if(nameLength >= maxNameLength){
                                rrItem += '<div class="nameCont"><a href="' + prodNameLink + '" title="' + rrData.items[ii].name.replace('"','&quot;') + '">' + truncName  + '...</a></div>';
                            }
                            else{
                                rrItem += '<div class="nameCont"><a href="' + prodNameLink + '" title="' + rrData.items[ii].name.replace('"','&quot;') + '">' + rrData.items[ii].name  + '</a></div>';
                            }

                            var priceLink = rrData.items[ii].link_url;
                            if(linkICNParams){
                                priceLink += linkICNParams;
                            }

                            rrItem += '<div class="priceCont">';
                            if(rrData.items[ii].sale_price != ''){
                                rrItem += '<div><a data-event-label="'+truncName.replace('"','&quot;')+'" class="richPrice onSale" style="text-decoration: line-through" href="' + priceLink + '">$' + rrData.items[ii].price  + '</a></div>';
                                rrItem += '<div style="margin-left:10px;">';
                                rrItem += '<a data-event-label="'+truncName.replace('"','&quot;')+'" class="richSalePrice onSale" href="' + priceLink + '">$' + rrData.items[ii].sale_price  + '</a></div>';
                            }else if (rrData.items[ii].price != '') {
                                rrItem += '<div style="height: 30px;">&nbsp;</div>';
                                rrItem += '<div><a data-event-label="'+truncName.replace('"','&quot;')+'" class="richPrice" href="' + priceLink + '">$' + rrData.items[ii].price  + '</a></div>';
                            }
                            rrItem += '</div>';
                            //rrItem += '<div class="addCartCont"><a href="' + priceLink + '&action=buy_now"><span class="button ">Add To Cart</span></a></div>';

                           /*rrItem += '<div class="compare_box mobile-remove"><div><input type="checkbox" name="" value="' + rrData.items[ii].id + '" id="cb' + rrData.items[ii].id + '" class="cat_comp_checkbox rr_comp" onclick="checkCookie(' + rrData.items[ii].id + ', ' + currentCartProdNum + '); ToggleText();"><div class="cat_comp_txt" onclick="" title="Compare Up To 4 Products" id="cbtext' + rrData.items[ii].id + '"><a class="catCompLink" onclick="$(this).parent().prev().click(); "><label style="cursor: pointer;" for="cb' + rrData.items[ii].id + '">Add to Compare</label></a></div></div></div>';*/

                           /*rrItem += '<div class="compare_box mobile-remove"><div><input type="checkbox" name="" value="' + rrData.items[ii].id + '" id="cb' + rrData.items[ii].id + '" class="cat_comp_checkbox rr_comp" onclick="setCookie(\'compare\',' + rrData.items[ii].id + ',7); ToggleText();"><div class="cat_comp_txt" onclick="" title="Compare Up To 4 Products" id="cbtext' + rrData.items[ii].id + '"><a class="catCompLink" onclick="$(this).parent().prev().click(); "><label style="cursor: pointer;" for="cb' + rrData.items[ii].id + '">Add to Compare</label></a></div></div></div>';*/

                            rrItem += '</div>';

                        // Write data to Container

                        let targetContainer = $('.' + targ + '.mobile-remove');
                        targetContainer.append(rrItem);
                        targetContainer.addClass({display: "block"});

                        //cmp_init();


                    }
                }
            }
        }

    $(document).ajaxComplete(function( ) {
        if ( $('.buttonDiv').text() == 'In Cart' ){
            $(".rr_currentview_btn").replaceWith("<a class=\"button inv_button rr_currentview_btn\" href=\"shopping_cart.php\">In Cart</a>");
        }
        else{
            $(".rr_currentview_btn").replaceWith("<button class=\"button rr_currentview_btn\" onclick=\"pdpAddToCart();\" type=\"button\" value=\"Add To Cart\">Add to Cart</button>");
        }
    });

    $('.bottom_rec').addClass('mvt');
    //$('.bottom_rec').addClass('current_bottom_rec');
    //$('.current_bottom_rec').removeClass('bottom_rec');

    var ar_value = getCookie('compare').split("|");                     // get all 'compare' cookies' values

        $.each(ar_value, function(key, val) {
            if (val !== '') {                       // if the cookie isn't blank
                if ( $('#'+val).length == 0 ) {     // if the product is not already in the box
                    addToBox(val);

                    if($('#cb'+ val).hasClass('rr_comp')){ var compLabel = 'Add to Compare'; }
                    else{ compLabel = 'Compare'; }

                    $('#cbtext' + val).html('<span style="font-size: 14px; cursor: pointer;" onclick="return CountChecks2(); ToggleText();">Compare</span>');
                    $('#cb'+ val).prop('checked', true);

                }
            }
        });
    //End
    }

    else if(type == 'vertRight'){


        if (Array.isArray(rrData.items)){
            if (rrData.items.length >= 1 ){

                var maxNameLength = 50;
                var titleAttr = '';
                var altAttr = '';
                var rrItem = '';
                rrItem += '<div style="border:6px solid #7F7F7F; height:445px; overflow: auto;">';
                rrItem += '<div class="expert-title article_hdng" tabindex="0">' + rrData.strategy_message + '</div>';


                for (ii = 0; ii < rrData.items.length; ii++) {

                    if (typeof rrData.items[ii].name !== 'undefined') {
                        titleAttr = ' title="' + rrData.items[ii].name + '"';
                        altAttr = ' alt="' + rrData.items[ii].name + '"';
                    }
                    else{
                        altAttr = ' alt="View Product"';
                        titleAttr = ' title="View Product"';
                    }

                rrItem += '<div style="width:100%; float:left;" class="itemCont">';
                    rrItem += '<div class="imgCont" style="float:left; width: 50%;">';
                        rrItem += '<a' + titleAttr + ' href="' + rrData.items[ii].link_url + '" tabindex="-1" aria-hidden="true"><img' + titleAttr + altAttr + '" class="rich Imglazy PED_placeholder" style="width:100px; heigth:auto;" data-src="' + rrData.items[ii].image_url.replace('/600/','/100/')  + '"/></a>';
                    rrItem += '</div>';
                    rrItem += '<div class="infoCont" style="float:right; width: 50%;">';
                       rrItem += '<div class="ratRev"><a href="' + rrData.items[ii].link_url + '#reviews">' + ratingStars(rrData.items[ii].rating) + '<span class="numRev">';
                        if(rrData.items[ii].num_reviews > 0){
                            rrItem += '(' + (isNaN(parseInt(rrData.items[ii].num_reviews)) ? 0 : parseInt(rrData.items[ii].num_reviews)) + ')</span></a>';
                        }
                        rrItem += '</span></div>';
                         var nameStr =   rrData.items[ii].name;
                        var truncName = nameStr.substring(0,maxNameLength);
                        truncName = truncName.substr(0, Math.min(truncName.length, truncName.lastIndexOf(" ")));
                        var nameLength = nameStr.length;

                        if(nameLength >= maxNameLength){
                            rrItem += '<div class="nameCont"><a href="' + rrData.items[ii].link_url + '" title="' + rrData.items[ii].name.replace('"','&quot;') + '">' + truncName  + '...</a></div>';
                        }
                        else{
                            rrItem += '<div class="nameCont"><a href="' + rrData.items[ii].link_url + '" title="' + rrData.items[ii].name.replace('"','&quot;') + '">' + rrData.items[ii].name  + '</a></div>';
                        }
                        rrItem += '<div class="priceCont">';
                        if(rrData.items[ii].sale_price != ''){
                            rrItem += '<div><a data-event-label="'+truncName.replace('"','&quot;')+'" class="richPrice onSale" style="text-decoration: line-through" href="' + rrData.items[ii].link_url + '">$' + rrData.items[ii].price  + '</a></div>';
                            rrItem += '<div style="padding: 5px 0;"><a data-event-label="'+truncName.replace('"','&quot;')+'" class="richSalePrice onSale" href="' + rrData.items[ii].link_url + '">$' + rrData.items[ii].sale_price  + '</a></div>';
                        }
                        else{
                            rrItem += '<div><a data-event-label="'+truncName.replace('"','&quot;')+'" class="richPrice" href="' + rrData.items[ii].link_url + '">$' + rrData.items[ii].price  + '</a></div>';
                        }
                        rrItem += '</div>';

                    rrItem += '</div>';


                rrItem += '</div>';

                }

            rrItem += '</div>';

                $('.vert_right_rec.mobile-remove').html(rrItem);

            }
        }
    }


    else if(type == 'checkoutSuccess'){
    // Replace this with HTML Template on page //


    var storesIdTest = getStoreID();
    var expertName = getExpertName();

        if (Array.isArray(rrData.items)){

            if (rrData.items.length >= 1 ){

                $("#div_success_recommends").text(rrData.strategy_message);

                // rrItem = '<div style="margin:30px 0px;"> <div id="div_success_recommends" class="dtc vam"> ' + expertName + ' Recommends... </div> </div>';

                    for (ii = 0; ii < rrData.items.length; ii++) {

                        /*$('.cs_xsell_parent:eq('+ii+') a').attr('href', rrData.items[ii].link_url);
                        $('.cs_xsell_parent:eq('+ii+') img').attr('src', rrData.items[ii].image_url.replace('/600/','/100/'));*/
                        var $csRec_img = $('.cs_recommends_img').eq(ii),
                            $csRec_retail_price = $('.cs_recommends_price .retailPrice').eq(ii),
                            $csRec_price = $('.cs_recommends_price .productPrice').eq(ii),
                            $csRec_txt = $('.cs_recommends_txt').eq(ii),
                            $csRec_details = $('.cs_recommends_details').eq(ii);

                        $('a', $csRec_img).attr('href', rrData.items[ii].link_url);
                        $('img', $csRec_img).attr({
                            'src': rrData.items[ii].image_url.replace('/600/','/100/'),
                            'alt': rrData.items[ii].name,
                            'title': rrData.items[ii].name
                        });

                        if(rrData.items[ii].sale_price != ''){
                            $csRec_retail_price.text('$'+rrData.items[ii].sale_price);
                        }
                        else{
                            $csRec_price.text('$'+rrData.items[ii].price);
                        }

                        $('a', $csRec_txt).html(rrData.items[ii].name);
                        $('a', $csRec_txt).attr('href', rrData.items[ii].link_url);

                        $('> form', $csRec_details).remove();
                        $csRec_details.append('<div class="dib"><a href="'+rrData.items[ii].link_url+'?action=buy_now"><span style="margin-top:20px;" class="button ">Add To Cart</span></a></div?');

                        //$('.cs_xsell_parent:eq('+ii+') > .cs_recommends_details .fs18').html('$'+rrData.items[ii].price);
                        //$('.cs_xsell_parent:eq('+ii+') > .cs_recommends_details .cs_recommends_txt').html(rrData.items[ii].name);

                        //$('.cs_xsell_parent:eq('+ii+') > .cs_recommends_details form').remove();
                        //$('.cs_xsell_parent:eq('+ii+') > .cs_recommends_details').append('<div class="dib"><a href="'+rrData.items[ii].link_url+'?action=buy_now"><span style="margin-top:20px;" class="button ">Add To Cart</span></a></div?');

                    }

            }
        }
    }else if(type == 'expertRec'){
            var ac = 1;

            var storesIdTest = getStoreID();

            for (ii = 0; ii < rrData.items.length; ii++) {

                $('.expert_rec.rec_' + ac + ' .richImg img').attr('src',rrData.items[ii].image_url);
                $('.expert_rec.rec_' + ac + ' .richImg img').attr('title',rrData.items[ii].name);
                $('.expert_rec.rec_' + ac + ' .richImg a').attr('href',rrData.items[ii].link_url);
                $('.expert_rec.rec_' + ac + ' .richImg a').attr('title',rrData.items[ii].name);
                $('.expert_rec.rec_' + ac + ' .richName a').html(rrData.items[ii].name);
                $('.expert_rec.rec_' + ac + ' .richName a').attr('href',rrData.items[ii].link_url);
                $('.expert_rec.rec_' + ac + ' .richName a').attr('title',rrData.items[ii].name);
                $('.expert_rec.rec_' + ac + ' .richPrice').html('$' + rrData.items[ii].price);
                $('.expert_rec.rec_' + ac + ' .richStars a').attr('href', rrData.items[ii].link_url + '#reviews');
                $('.expert_rec.rec_' + ac + ' .richRevs a').attr('href', rrData.items[ii].link_url + '#reviews');

                if(storesIdTest !== 15){
                    $('.expert_rec.rec_' + ac + ' .exp_link a').attr('href', rrData.items[ii].link_url + '#reviews');
                }

                var starStr = ratingStars(rrData.items[ii].rating);
                $('.expert_rec.rec_' + ac + ' .richStars').html(starStr);

                if(storesIdTest !== 15){
                    if(rrData.items[ii].num_reviews > 0){
                        var revStr = '(' + (isNaN(parseInt(rrData.items[ii].num_reviews)) ? 0 : parseInt(rrData.items[ii].num_reviews)) + ' Reviews)';
                        $('.expert_rec.rec_' + ac + ' .richRevs a').html(revStr);
                    }

                }
                else{
                    if(rrData.items[ii].num_reviews > 0){
                        var revStr = '<a href ="' + rrData.items[ii].link_url + '#reviews" title="' + rrData.items[ii].name.replace('"','&quot;') + '">(' + (isNaN(parseInt(rrData.items[ii].num_reviews)) ? 0 : parseInt(rrData.items[ii].num_reviews)) + ' Reviews)</a>';
                        $('.expert_rec.rec_' + ac + ' .richRevs').html(revStr);
                    }
                }

                ac++;

            }

     }

        else if(type=='miniCart'){

            for (ii = 0; ii < rrData.items.length; ii++) {

                $("#mca" + rrData.items[ii].id).parent().parent().parent().next('div').remove();
                $("#mca" + rrData.items[ii].id).parent().parent().parent().remove();

            $(".accessories_rec_tmp").clone().prop('id', 'rrItem'+ii).removeClass('accessories_rec_tmp').css('display','table-row').prependTo($(".accessories_rec")).after('<div style="height:5px;">&nbsp;</div>');

                $('#rrItem' + ii + ' a').attr('href',rrData.items[ii].link_url);
                $('#rrItem' + ii + ' .rrImage').attr('src',rrData.items[ii].image_url);
                $('#rrItem' + ii + ' .rrName').html(rrData.items[ii].name);
                $('#rrItem' + ii + ' .rrPrice').html('$' + rrData.items[ii].price);

                $('#rrItem'+ii+' #mca0').attr('onclick','addCart(' + rrData.items[ii].id+ ');').attr('id','mca'+ rrData.items[ii].id);

           }


     }

        else if(type=='articleTabs'){

                var storesIdTest = getStoreID();
                var numProdBoxes = $('.productArticleBox').length;
                var $productArticleBox = $('.productArticleBox').eq(articlesTabTracking - 1);

                if(numProdBoxes < 3){
                    $('.productArticleBox').first().clone().appendTo('#articlesTopCont');
                }

                var numProdBoxes = $('.productArticleBox').length;
                if(numProdBoxes < 3){
                    $('.productArticleBox').first().clone().appendTo('#articlesTopCont');
                }

                $('.articleTitle a', $productArticleBox).text(rrData.sub_title);
                $('a', $productArticleBox).attr({
                    'href':rrData.link_url,
                    'title':rrData.sub_title
                });
                $('.articleImage img', $productArticleBox).attr({
                    'src':rrData.image_url,
                    'title':rrData.sub_title
                });
                $('.articleText a', $productArticleBox).html(rrData.intro);

                $('.articleAuthor a', $productArticleBox)
                    .text(rrData.expertName)
                    .attr('href', storesIdTest == '13' ? rrData.expertLinkPED : rrData.expertLink);

                articlesTabTracking++;
        }

        else if(type=='rightArticles'){

                if (articlesTabTracking==1){
                    $('#alsolike_side > div >div').eq(0).html('Expert Articles');
                }

                var appendTrac = window.location.pathname;
                appendTrac = appendTrac.replace('/stories/','').replace('.html','');
                appendTrac = '?icl=articles+rail&icn=' + appendTrac;

                $('.right_rail_article_' + articlesTabTracking + ' a.article_name').html(rrData.sub_title);
                $('.right_rail_article_' + articlesTabTracking + ' a').attr('href',rrData.link_url+appendTrac);
                $('.right_rail_article_' + articlesTabTracking + ' a').attr('title',rrData.sub_title);
                $('.right_rail_article_' + articlesTabTracking + ' .image_container img').attr('src',rrData.image_url);
                $('.right_rail_article_' + articlesTabTracking + ' .image_container img').attr('title',rrData.sub_title);

                articlesTabTracking++;

        }
        else if(type=='ecd_LR_Home_1'){

            var ecdLRStr = '<div class="RailBox home_left_rail_banner_1" style="text-align:center !important; vertical-align:middle !important; padding:0px !important;">';
            ecdLRStr += '<div><a' + titleAttr + ' href="' + rrData.link_url + '">';
            ecdLRStr += '<img' + titleAttr + altAttr + ' class="lazy PED_placeholder" data-src="' + rrData.image_url + '">';
            ecdLRStr += '</a></div></div>';

            $('.ecd_bottom_left_div').html(ecdLRStr);
            $('.ecd_bottom_left_div').css('height', 'auto');
            $('.ecd_bottom_left_div').css('max-height','initial');

        }
        else if(type=='ecd_LR_Home_2'){

            $('.' + targ).html('<a' + titleAttr + ' href="' + rrData.link_url + '"><img' + titleAttr + altAttr + ' class="lazy PED_placeholder" data-src="' + rrData.image_url  + '"/></a>');
            $('.' + targ).css('overflow','hidden');
            $('.' + targ + ' .button').remove();

            $('.ecd_bottom_left_div').css('height', 'auto');
            $('.ecd_bottom_left_div').css('max-height','initial');
            $('.home_left_rail_banner_2').css('margin-top', '25px');

        }
        else if(type=='similarProducts'){

            if(similarProductsTarg == 'top'){

                var targDiv = document.querySelector('.similar_products');
                var targTitleDiv = document.querySelector('.similar_products_title');
                var pdpSimilarProdLocation = 'top';

            }else if(similarProductsTarg == 'bottom'){

                var targDiv = document.querySelector('.bottom_rec');
                targDiv.classList.add('similar_products');
                targDiv.classList.add('bottom');
                targDiv.classList.remove('bottom_rec');
                targDiv.classList.remove('mobile-remove');

                var targTitleDiv = document.querySelector('.bottom_rec_title');
                targTitleDiv.classList.add('similar_products_title');
                targTitleDiv.classList.add('bottom');
                targTitleDiv.classList.remove('bottom_rec_title');

                var pdpSimilarProdLocation = 'bottom';
            }

            //fetch RR template
            var pdpProdId = document.getElementById('pdpProdId').value;

            var params = '?strategyType=' + type + '&currentProdId=' + pdpProdId;
                        
            fetch('../PED_RR_templates.php' + params, {
                method: 'GET',
            }).then(function (response) {
                return response.text();
            }).then(function (html) {
        
                if(html != ''){
                    //Write to target div
                    targDiv.innerHTML = html;
                    
                    //Write to target title
                    targTitleDiv.innerHTML = rrData.strategy_message;
                    targTitleDiv.classList.add('active');

                    var nextBtn = document.querySelector('.carousel-button-next');
                    if (typeof(nextBtn) != 'undefined' && nextBtn != null){ 
                        nextBtn.addEventListener('click', carouselNext);
                        nextBtn.addEventListener('keypress', carouselNext);
                    }
                    var prevBtn = document.querySelector('.carousel-button-prev');
                    if (typeof(prevBtn) != 'undefined' && prevBtn != null){ 
                        prevBtn.addEventListener('click', carouselPrev);
                        prevBtn.addEventListener('keypress', carouselPrev);
                    }

                    var mobileCarouselBtns = document.querySelectorAll('.mobile-carousel-button');
                    for(i=0; i < mobileCarouselBtns.length; i++){
                        mobileCarouselBtns[i].addEventListener('click', carouselMobileControls);
                        mobileCarouselBtns[i].addEventListener('keypress', carouselMobileControls);
                    }

                    var carousel = document.querySelector('.pedRR-carousel');
                    if (typeof(carousel) != 'undefined' && carousel != null){ 
                        window.helpers.lazyLoad(carousel);
                    }
                }
                
            }).catch(function (err) {
                // There was an error
                console.warn('Something went wrong.', err);
            }); 
        }

}

