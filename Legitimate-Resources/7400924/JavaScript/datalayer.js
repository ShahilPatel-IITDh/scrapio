////////////////////////////////////////////////////////
//////////////INTEGRATION ALL PAGES ////////////////////
////////////////////////////////////////////////////////


$(document).ready(function() {
    $('form[name=quickFind]').click(function(){/* barre recherche */
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'InteractionHeader',
            'eventCategory': 'Search',
            'eventAction': 'Search_Bar',
            'eventLabel': 'Click_Search_Bar'
        });
    })

    // $('form[name=quickFind]').change(function(){
    //     var content = $('#MotRech').val();
    //     console.log(content);
    // })

});
function DataLayerPushSuggestBrand(NameBrand){/*Suggest brand*/
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionHeader',
        'eventCategory': 'Search',
        'eventAction': 'TopMarques',
        'eventLabel': NameBrand
    });
}
function DataLayerPushSuggestCategories(NameCateg){/*Suggest categories*/
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionHeader',
        'eventCategory': 'Search',
        'eventAction': 'Categories',
        'eventLabel': NameCateg
    });
}
function DataLayerPushSuggestProducts(NameProd, NameCateg){ /*Suggest products */
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionHeader',
        'eventCategory': 'Search',
        'eventAction': NameCateg,
        'eventLabel': NameProd
    });
}
function DataLayerPushSuggestAll(){ /* Suggest ALL */
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionHeader',
        'eventCategory': 'Search',
        'eventAction': 'Click',
        'eventLabel': 'Tous_Les_Resultat'
    });
}
function DataLayerPushSuggestAllCateg(){ /* Suggest All Catego */
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionHeader',
        'eventCategory': 'Search',
        'eventAction': 'Click',
        'eventLabel': 'Toutes_Les_Categories'
    });
}
function DataLayerPushSlider(UrlSlider){ /* Clic slider partener */
    window.dataLayer = window.dataLayer || [];
    console.log("slider");
    window.dataLayer.push({
        'event': 'InteractionSlider',
        'eventCategory': 'InteractionSlider',
        'eventAction': 'Click',
        'eventLabel': UrlSlider
    });
}

function callDataLayer(){
    var el = document.getElementById("MotRech").value;
    DataLayerPushSearchButton(el);
}

function DataLayerPushSearchButton(SearchWord){ /* Suggest SeachButton */
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event':  'InteractionHeader',
        'eventCategory': 'Search',
        'eventAction': 'Click_Rechercher',
        'eventLabel': SearchWord
    });
}
function DataLayerPushSubNewsletter(){ /* Footer input newsletter GO ! */
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionFooter',
        'eventCategory': 'Newsletter',
        'eventAction': 'Click_Go',
        'eventLabel': 'Inscription_Newsletter'
    });
}

$(".productsSeenMiddle > .top-vente-boxes").on("click", function(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionHomepage',
        'eventCategory': 'Produits_Déjà_Vu',
        'eventAction': $(this).data("categorie"),
        'eventLabel' : $(this).data("nameprod")
    })
})

function DataLayerPushTrustPilot(UrlTP){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionFooter',
        'eventCategory': 'Avis_Trustpilot',
        'eventAction': 'Clic',
        'eventLabel': UrlTP
    })
}
function DataLayerPushBlog(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionFooter',
        'eventCategory': 'Avis_Trustpilot',
        'eventAction': 'Clic',
        'eventLabel': 'Blog'
    });
}
function DataLayerPushFacebook(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionFooter',
        'eventCategory': 'Résaux_Sociaux',
        'eventAction': 'Clic',
        'eventLabel': 'Facebook'
    });
}
function DataLayerPushInstagram(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionFooter',
        'eventCategory': 'Résaux_Sociaux',
        'eventAction': 'Clic',
        'eventLabel': 'Instagram'
    });
}
function DataLayerPushTwitter(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionFooter',
        'eventCategory': 'Résaux_Sociaux',
        'eventAction': 'Clic',
        'eventLabel': 'Twitter'
    });
}
function DataLayerPushLinkedin(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionFooter',
        'eventCategory': 'Résaux_Sociaux',
        'eventAction': 'Clic',
        'eventLabel': 'Linkedin'
    });
}
function DataLayerPushYoutube(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionFooter',
        'eventCategory': 'Résaux_Sociaux',
        'eventAction': 'Clic',
        'eventLabel': 'Youtube'
    });
}
function DataLayerPushPinterest(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionFooter',
        'eventCategory': 'Résaux_Sociaux',
        'eventAction': 'Clic',
        'eventLabel': 'Pinterest'
    });
}
function DataLayerQSCDW(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionFooter',
        'eventCategory': 'Slider_Footer',
        'eventAction': 'Clic',
        'eventLabel': 'Qui_se_Cache_Derriere_Woodbrass'
    });
}
function DataLayerFreeDeliv(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionFooter',
        'eventCategory': 'Slider_Footer',
        'eventAction': 'Clic',
        'eventLabel': 'Livraison_Gratuite'
    });
}
function DataLayerReviewsMusician(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionFooter',
        'eventCategory': 'Slider_Footer',
        'eventAction': 'Clic',
        'eventLabel': 'Lavis_des_Musicien'
    });
}
function DataLayerQuestion(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionFooter',
        'eventCategory': 'Slider_Footer',
        'eventAction': 'Clic',
        'eventLabel': 'Questions_Conseils'
    });
}
function DataLayerWbStores(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionFooter',
        'eventCategory': 'Slider_Footer',
        'eventAction': 'Clic',
        'eventLabel': 'Woodbrass_Stores'
    });
}
function DataLayerRefund(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionFooter',
        'eventCategory': 'Slider_Footer',
        'eventAction': 'Clic',
        'eventLabel': 'WB_Vous_Rembourse'
    });
}
function DataLayerGuarantiee(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionFooter',
        'eventCategory': 'Slider_Footer',
        'eventAction': 'Clic',
        'eventLabel': '3_Ans_De_Garantie'
    });
}
function DataLayerPoint(){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionFooter',
        'eventCategory': 'Slider_Footer',
        'eventAction': 'Clic',
        'eventLabel': 'Point_Retrait'
    });
}
function DataLayerUpButton(UrlPage){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionAllpages',
        'eventCategory': 'Back_To_Top',
        'eventAction': 'Clic',
        'eventLabel': UrlPage
    });
}
function DataLayerClickCategories(NameCateg, UrlPage){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionAllpages',
        'eventCategory': 'Clic_Category',
        'eventAction': NameCateg,
        'eventLabel': UrlPage
    });
}

////////////////////////////////////////////////////////
///////////// INTEGRATION PAGE D'ACCUEIL ///////////////
////////////////////////////////////////////////////////

$(".topVenteMiddle > .top-vente-boxes").on("click", function (){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionHomepage',
        'eventCategory': 'Meilleures_Ventes',
        'eventAction': $(this).data("categorie"),
        'eventLabel' : $(this).data("nameprod")
    })
});


function DataLayerClickKnowMoreStore(UrlLink){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionSlider',
        'eventCategory': 'InteractionSlider',
        'eventAction': 'Clic_Magasins',
        'eventLabel': UrlLink
    });
}

function DataLayerClickAllMarques() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionSlider',
        'eventCategory': 'InteractionSlider',
        'eventAction': 'Clic_Marques',
        'eventLabel': 'Toutes_Les_Marques'
    });
}

function DataLayerClickBlog(ArtName){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionBlog',
        'eventCategory': 'InteractionBlog',
        'eventAction': 'Clic_Lien',
        'eventLabel': ArtName
    });
}

function DataLayerClickReadMoreBlog(ArtName){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'InteractionBlog',
        'eventCategory': 'InteractionBlog',
        'eventAction': 'Clic_Lire_La_Suite',
        'eventLabel': ArtName
    });
}

function DataLayerClickSubCateg(NameCateg, NameSubCateg){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push ({
        'event': 'InteractionPageCategory',
        'eventCategory': 'Page_Category ',
        'eventAction': NameCateg,
        'eventLabel': NameSubCateg
    });
}

function DataLayerClickPurschaseGuide(UrlGuide){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push ({
        'event': 'InteractionPageCategory',
        'eventCategory': 'Page_Category',
        'eventAction': 'Clic_Guide_Achat',
        'eventLabel': UrlGuide
    });
}

function DataLayerClickSeeAllBrands(UrlBrands){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push ({
        'event': 'InteractionPageCategory',
        'eventCategory': 'Page_Category',
        'eventAction': 'Clic_Voir_Toutes_Les_Marques',
        'eventLabel': UrlBrands
    });
}


function DataLayerClickProductCata(tab){
    console.log(tab);
    window.dataLayer = window.dataLayer || [];

    let datalayer = {
        'visitorLoginState': tab.visitorLoginState,
        'dateOfRegistration' : tab.dateOfRegistration,
        'inscritNewsletter': tab.inscritNewsletter,
        'userId': tab.userId,
        'customerdateOfFirstOrder' : tab.customerdateOfFirstOrder,
        'customerdateOfLastOrder' : tab.customerdateOfLastOrder,
        'lang': tab.lang,
        'event': 'productClick',
        'eventCategory': 'Ecommerce',
        'eventAction': 'Click',
        'eventLabel': tab.productName,
        'ecommerce':
        {
            'click': {   // Product Click action
            'actionField': {'list': 'product_List'},  // product list concerned by the click
            'products': [{   // productField object
                'name': tab.productName,
                'id': tab.productId,
                'price': tab.productPrice ,
                'brand': tab.productBrand,
                'category': tab.productCateg// code sous-famille
                //'variant': '%variant'
                }]
            }
        },
    };

    console.log(datalayer);
    window.dataLayer.push (datalayer);
}

function DataLayerProductPage(tab){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push ({
        'visitorLoginState': tab.visitorLoginState,
        'dateOfRegistration' : tab.dateOfRegistration,
        'inscritNewsletter': tab.inscritNewsletter,
        'userId': tab.userId,
        'customerdateOfFirstOrder' : tab.customerdateOfFirstOrder,
        'customerdateOfLastOrder' : tab.customerdateOfLastOrder,
        'lang': tab.lang,
        'event': 'productDetail',
        'eventCategory': 'Ecommerce',
        'eventAction': 'Product Detail',
        'eventLabel': tab.productName,
        'ecommerce':
    {
        'detail':       //Product Detail action
        {
            'products': [{      // List of productFieldObjects
            'name': tab.productName,
            'id': tab.productId,
            'price': tab.productPrice,
            'category': tab.productCateg   // code sous-famille
            }]
        }
    },
    });
}

function DataLayerCartPage(tab){
    window.dataLayer = window.dataLayer || [];
    var data = {
        'visitorLoginState': tab.visitorLoginState,
        'dateOfRegistration': tab.dateOfRegistration,
        'inscritNewsletter': tab.inscritNewsletter,
        'userId': tab.userId,
        'customerdateOfFirstOrder': tab.customerdateOfFirstOrder,
        'customerdateOfLastOrder': tab.customerdateOfLastOrder,
        'lang': tab.lang,
        'event': 'checkout',
        'eventCategory': 'Ecommerce',
        'eventAction': 'Panier',
        'eventLabel': 'Confirmation_Panier',
        'ecommerce':
            {
                'checkout': {    // Checkout action
                    'actionField': {
                        'step': '1',
                        'label': 'Basket'
                    },
                    'products': []
                }
            },
        'google_tag_params': {      // Remarketing Display Object
            'ecomm_pagetype': 'cart',
            'ecomm_prodid': [],
            'ecomm_totalvalue': tab.totalInCart    // Valeur panier
        }
    };

    tab.basket.forEach(item => {
      data.ecommerce.checkout.products.push({'name': item.productName,
                                            'id': item.productId,
                                            'price': item.productPrice,
                                            'quantity': item.quantity,
                                            'category': item.productCateg });
      data.google_tag_params.ecomm_prodid.push(item.productId);
    });
    window.dataLayer.push(data);
}


function DataLayerShippingPage(tab){
    window.dataLayer = window.dataLayer || [];
    var data = {
        'visitorLoginState': tab.visitorLoginState,
        'dateOfRegistration': tab.dateOfRegistration,
        'inscritNewsletter': tab.inscritNewsletter,
        'userId': tab.userId,
        'customerdateOfFirstOrder': tab.customerdateOfFirstOrder,
        'customerdateOfLastOrder': tab.customerdateOfLastOrder,
        'lang': tab.lang,
        'event': 'checkout',
        'eventCategory': 'Ecommerce',
        'eventAction': 'Livraison',
        'eventLabel': 'Confirmation_Livraison',
        'ecommerce':
            {
                'checkout': {    // Checkout action
                    'actionField': {
                        'step': '2',
                        'label': 'Shipping'
                    },
                    'products': []
                }
            },
        'google_tag_params': {      // Remarketing Display Object
            'ecomm_pagetype': 'cart',
            'ecomm_prodid': [],  //productID
            'ecomm_totalvalue': tab.totalInCart    // Valeur panier
        }
    };

    tab.basket.forEach(item => {
        data.ecommerce.checkout.products.push({'name': item.productName,
            'id': item.productId,
            'price': item.productPrice,
            'category': item.productCateg });
        data.google_tag_params.ecomm_prodid.push(item.productId);
    });
    window.dataLayer.push(data);
}

function DataLayerPaymentPage(tab){
    console.log(tab);
    window.dataLayer = window.dataLayer || [];
    var data = {
        'visitorLoginState': tab.visitorLoginState,
        'dateOfRegistration': tab.dateOfRegistration,
        'inscritNewsletter': tab.inscritNewsletter,
        'userId': tab.userId,
        'customerdateOfFirstOrder': tab.customerdateOfFirstOrder,
        'customerdateOfLastOrder': tab.customerdateOfLastOrder,
        'lang': tab.lang,
        'event': 'checkout',
        'eventCategory': 'Ecommerce',
        'eventAction': 'Payment',
        'eventLabel': 'Confirmation_Payment',
        'ecommerce':
            {
                'checkout': {    // Checkout action
                    'actionField': {
                        'step': '3',
                        'label': 'Payment'
                    },
                    'products': []
                }
            },
        'google_tag_params': {      // Remarketing Display Object
            'ecomm_pagetype': 'cart',
            'ecomm_prodid': [],  //productID
            'ecomm_totalvalue': tab.totalInCart    // Valeur panier
        }
    };

    tab.basket.forEach(item => {
        data.ecommerce.checkout.products.push({'name': item.productName,
            'id': item.productId,
            'price': item.productPrice,
            'dimension1': item.shippingMethod,
            'category': item.productCateg });
        data.google_tag_params.ecomm_prodid.push(item.productId);
    });

    console.log(data);
    window.dataLayer.push(data);
}

// function DataLayerSuccessPage(tab){
//     window.dataLayer = window.dataLayer || [];
//     var data = {
//         'visitorLoginState': tab.visitorLoginState,
//         'dateOfRegistration': tab.dateOfRegistration,
//         'inscritNewsletter': tab.inscritNewsletter,
//         'userId': tab.userId,
//         'customerdateOfFirstOrder': tab.customerdateOfFirstOrder,
//         'customerdateOfLastOrder': tab.customerdateOfLastOrder,
//         'lang': tab.lang,
//         'event': 'Confirmation-Transaction',
//         'eventCategory': 'Ecommerce',
//         'eventAction': 'Transaction',
//         'eventLabel': tab.transactionId,
//         'ecommerce':
//             {
//                 'purchase': {
//                     'actionField': {
//                         'id': tab.transactionId,
//                         'revenue': '%transactionRevenue',  // TTC et livraison
//                         'tax': '%transactionTax',
//                         'paymentType': tab.payementMethod
//                     },
//                     'products': []
//                 }
//             },
//         'google_tag_params': {       // Object => Remarketing Display
//             'ecomm_pagetype': 'purchase',
//             'ecomm_prodid': '%productId',       // productID
//             'ecomm_totalvalue': '%transactionRevenue'
//         }
//     };
//
//     tab.basket.forEach(item => {
//         data.ecommerce.checkout.products.push({'name': item.productName,
//             'id': item.productId,
//             'price': item.productPrice,
//             'category': item.productCateg })
//     });
//
//     window.dataLayer.push(data);
// }

function DataLayerClickAddToCart(ProductName, ProductId, ProductPrice, ProductCateg, ProductQuantity){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push ({
        'event': 'addToBasket',
        'eventCategory': 'Ecommerce',
        'eventAction': 'Add To Basket',
        'eventLabel': ProductName,
        'ecommerce':
            {
                'add':          // Product add action
                    {
                        'products': [{     // List of productFieldObjects
                            'name': ProductName,
                            'id': ProductId,
                            'price': ProductPrice,
                            'category': ProductCateg,
                            'quantity': ProductQuantity   // 1
                        }]
                     }
            }
    });
}

function DataLayerClickAddPlusToCart(ProductName,ProductId,ProductPrice,ProductCateg,ProductQuantity){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push ({
        'event': 'addToBasket',
        'eventCategory': 'Ecommerce',
        'eventAction': 'Add To Basket',
        'eventLabel': ProductName,
        'ecommerce':
            {
                'add':          // Product add action
                    {
                        'products': [{     // List of productFieldObjects
                            'name': ProductName,
                            'id': ProductId,
                            'price': ProductPrice,
                            'category': ProductCateg,
                            'quantity': ProductQuantity   // 1
                        }]
                    }
            }
    });
}


function DataLayerClickRemoveToCart(ProductName,ProductId,ProductPrice,ProductCateg,ProductQuantity){
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push ({
        'event': 'RemoveFromBasket',
        'eventCategory': 'Ecommerce',
        'eventAction': 'RemoveFromBasket',
        'eventLabel': ProductName,
        'ecommerce':
            {
                'remove':          // Product add action
                    {
                        'products': [{     // List of productFieldObjects
                            'name': ProductName,
                            'id': ProductId,
                            'price': ProductPrice,
                            'category': ProductCateg,
                            'quantity': ProductQuantity   // 1
                        }]
                    }
            }
    });
}


