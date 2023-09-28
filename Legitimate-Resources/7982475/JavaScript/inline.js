(function(){
//rnwy_comp: device_profile/v1/default
$RNWY.loader()
    .now('webshop')
    .now(function() {
      WSP.utils.deviceProfile.setDeviceProfile('SEO_AGENT');
    });

//rnwy_comp: customer_menu/v1/customer_menu
$RNWY.loader()
  .win('webshop')
  .win('offcanvas')
  .win(function () {
    
});

//rnwy_comp: basket_button/v9/basket_button
$RNWY.loader()
  .now('jquery')
  .win('basket')
  .win(function () {
    WSP.core.mediator.subscribe('wsp:accessories_helper_ensure_load_accessories_helper_dependencies', function(callback) {
      if(typeof WSP.Basket === 'undefined') {
        WSP.Basket = new WSP.core.Basket({});
      }
      if(typeof WSP.BasketButtons === 'undefined') {
        WSP.BasketButtons = new WSP.core.BasketButtons({});

        WSP.core.mediator.subscribe(WSP.events.Basket.basketUpdated, function(data) {
          WSP.AccessoriesHelper.checkSubserviceButtons(data);
        });
      }
      callback();
    });

    WSP.StickyBasket = new WSP.core.StickyBasket({
      addToCartElements   : '.js_floating_basket_btn',
      basketUrl       : '/nl/nl/basket',
      loadAccessoriesInline : true,
      stickyBasketTargetEl  : jQuery('.js_basket_wrapper'),
      showBasketOnHover     : false
    });

    if(typeof WSP.AccessoriesHelper === 'undefined') {
      WSP.AccessoriesHelper = new WSP.core.AccessoriesHelper();
    }

  });

//rnwy_comp: search_bar/v5/default
$RNWY.loader()
  .now('jquery')
  .dom(function () {
    document.querySelector('.js_main_menu_btn').addEventListener('click', function () {
      var mainNavOffcanvas = document.querySelector('wsp-main-nav-offcanvas.js_main_menu');
      if (mainNavOffcanvas) {
        mainNavOffcanvas.toggleVisibility(true);

        $RNWY.loader()
          .win('px')
          .win(function () {
            px('common.mobilemenu.open', { fromHeader: true });
          });
      }
    });
  });

//rnwy_comp: region_header/v2/region_header


//rnwy_comp: region_header/v2/region_header


//rnwy_comp: region_header/v2/region_header


//rnwy_comp: region_header/v2/region_header


//rnwy_comp: region_header/v2/region_header


//rnwy_comp: region_header/v2/region_header
 

//rnwy_comp: region_header/v2/region_header


//rnwy_comp: foot/v6/foot
window['@wsp/analytics-loader'] = window['@wsp/analytics-loader'] || {};
window['@wsp/analytics-loader'].waitForConsent = true;

$RNWY.loader()
  
  
    .win('jquery')
    .win('flex-tooltip')
    .win(function() {
    new WSP.core.TooltipController({
      tooltipElemsSelector: '.info-link'
    });
  });
    




//rnwy_comp: analyticsCommon/v1/analyticsCommon
window['@wsp/analytics-loader'] = window['@wsp/analytics-loader'] || {};
window['@wsp/analytics-loader'].waitForConsent = true;

$RNWY.loader()
  .win('analytics-loader');

//rnwy_comp: measurement/v3/bltg

  $RNWY.loader()
    .win('measurement');

//rnwy_comp: tracking/v1/pixel
$RNWY.loader()
    .win('px')
    .win(function(){
        px('common.page.view', {
  "channel" : "main",
  "eVar12" : "not logged in",
  "eVar14" : "Browse",
  "eVar16" : "customer_loyalty_status:0",
  "eVar21" : "unknown",
  "eVar51" : "www.bol.com,SEO_AGENT",
  "eVar55" : "584f5100-042f-4e84-ac70-7ab3475c1cbb",
  "eVar93" : "external-behavioural=unknown|external-transactional=unknown|internal-behavioural=unknown|internal-transactional=unknown",
  "list1" : "advertisement_banner_video,advertisement_banner,brand_page_entrances,main_banner_sync,category_entries,shopthelook_category_entries,promotion_page_banner,doormat,promotion_carousel_slot_1_and_3_sync,recently_viewed_slot,new_for_you,daydeal_promotional_banner,deals_for_you,gift_entries,email_banner",
  "list3" : "CUI-ATTACHMENTS_A,wsp-search-mopinion_control,WSP1-11214_a,CUI-OPEN-CASE-ESCALATION_b,WSP1-12432_a,atl-217_a",
  "pageName" : "\/nl\/nl\/",
  "prop1" : "main:algemeen",
  "prop2" : "no cms page",
  "prop34" : "home",
  "prop37" : "select:no|nl",
  "prop56" : "unknown:unknown:NL:nl-NL_bolcom_media_www:",
  "prop68" : "\/",
  "server" : "wspc-deployment-569f97459d-dkhjz"
});
    });

//rnwy_comp: dmp/v2/dmp


//rnwy_comp: analytics/v2/analytics
window['@wsp/analytics-loader'] = window['@wsp/analytics-loader'] || {};
window['@wsp/analytics-loader'].waitForConsent = true;
window['@wsp/analytics-loader'].fbPixId = '903451823449917';

$RNWY.loader()
    .win('analytics-loader')
    .win(function () {
        try {
            var parsedData = getAnalyticsObj();
            if (parsedData) {
                
                   WSP.utils.OfcConsent.getThirdPartyConsent().then(function (consent) {
                           if (window['@wsp/analytics-loader'] && consent) {
                                   window['@wsp/analytics-loader'].globalSiteTag.init(parsedData);
                                   window['@wsp/analytics-loader'].facebookPixel.init(parsedData);
                           }

                    });
                
            }
        } catch(error) {
            console.error(error);
        }
    });

function getAnalyticsObj() {
    var dataElement = document.getElementById('js_analytics_data_85acc0f3-610e-4788-9d00-4cf7b41008c0');
    var analyticsObj = JSON.parse(dataElement.textContent);
    if (analyticsObj) {
        analyticsObjForPage = analyticsObj.pdpAnalyticsObj || analyticsObj.listPageAnalyticsObj || analyticsObj.simplePageAnalyticsObj || {};
        return transformAnalyticsObj(analyticsObjForPage);
    }
    return {};
}

// Because rnwy doesn't support all json data structures, we have to do some manual stitching here.
function transformAnalyticsObj(analyticsObj) {
    if (analyticsObj && analyticsObj.product && analyticsObj.product.price) {
        analyticsObj.product.price = parseFloat(analyticsObj.product.price);
    }
    return analyticsObj;
}



}());