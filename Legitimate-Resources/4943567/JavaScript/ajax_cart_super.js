//<![CDATA[    
function AddToCartOnListProduct() {
    //'.category-products .btn-cart, .crosssell .btn-cart,.cms-home .btn-cart'
    var is_view = $j('#product_addtocart_form').attr('method');
    var is_list_compare = $j('.catalog-product-compare-index').length;
    var is_checkout_page = $j('.checkout-cart-index').length;
    var is_wishlist_page = $j('.wishlist-index-index').length;
    if(is_view || is_list_compare >0 || is_checkout_page >0 || is_wishlist_page>0) return false;
	
    $j('.price-btn').each(function(){
		var value = 1;
        var linkToCart = $j(this).find('.btn-cart').attr('onclick');
        var effectToCart = $j('.effect_to_cart').attr('value');
        if(linkToCart){
            linkToCart = linkToCart.replace("setLocation('","").replace("')","");
            //$j(this).attr('name',linkToCart);
            $j(this).find('.btn-cart').removeAttr('onclick')
            $j(this).find('.btn-cart').click(function() {
                //getProductInfoFromCart(linkToCart,'type_product=1');
                var base_url = $j('#ajaxconfig_info a').attr('href');
                if(linkToCart.search('checkout/cart/add')!= -1 || linkToCart.search('ajaxcartsuper/ajaxcart/add') !=-1) {
                    linkToCart =  linkToCart.replace('checkout/cart', 'ajaxcartsuper/ajaxcart');
					linkToCart = linkToCart+'qty/'+value;
                    ajaxToCart(linkToCart,"",$j(this),'list_add');
                    var img = $j(this).closest('li').find('img:first');
                    if(!img.length) {
                        img = $j(this).closest('.actions').parent().find('.product-image');
                        if(!img.length){
                            img = $j(this).closest('.actions').parent().parent().find('.product-image');
                        }
                        if(!img.length){
                            img = $j(this).closest('.actions').parent().parent().parent().find('.product-image');
                        }
                        if(!img.length){
                            img = $j(this).closest('.actions').parent().parent().parent().parent().find('.product-image');
                        }
                        if(!img.length){
                            img = $j(this).parent().parent().parent().parent().parent().find('.product-image');
                        }
                        if(!img.length){
                            img = $j(this).parent().parent().parent().parent().parent().parent().find('.product-image');
                        }
                        if(!img.length){
                            img = $j(this).parent().parent().parent().parent().parent().parent().parent().find('.product-image');
                        }
                        if(!img.length){
                            img = $j(this).parent().parent().parent().parent().parent().parent().parent().parent().find('.product-image');
                        }

                                            if(!img.length){
                            img = $j(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().find('.product-image');
                        }
                    }
                    if(effectToCart==1) {
                        flyToCart($j(img), $j('.top-cart-contain'));
                    }

                } else {
                    location.href = linkToCart; 
					//$j(this).target = "_blank";
					//window.open(linkToCart);
					//window.open(linkToCart,'_newtab');
                    return false;
                }
            // ajaxToCart(linkToCart,"",$j(this));
            });
        }
    });
}

function AddToCartOnListConf(form) {
	var formId = form.id;
	var url = form.action;
	if($j('.page-header-container').hasClass('on-mobile')){
		var data = form.serialize;
	}else{
		var data = form.serialize();
	}
	ajaxToCart(url,data,'view','view_add');	
}	
function AddToCartOnProductView() {
    var is_view = $j('#product_addtocart_form').attr('method');
    var effect_to_cart = $j('.effect_to_cart').attr('value');
    if(is_view) {
		console.log(effect_to_cart);
        productAddToCartForm.submit = function(button,url){
            if(this.validator && this.validator.validate()){
                var form = this.form;
                var oldUrl = form.action;
                if (url) {
                    form.action = url;
                }
                var e = null;
                // ajax code
                if(!url){
                    url = $j('#product_addtocart_form').attr('action');
                }
                var data = $j('#product_addtocart_form').serialize();
                //fly to basket
                
                var img = $j('#product_addtocart_form').find('#image-main');
                if(effect_to_cart==1) {                    
                    flyToCart($j(img), $j('.mini-cart'));
                }
                
                var fileInput = $j('#product_addtocart_form input[type="file"]');
                if(fileInput.length>0) {
                    var file = fileInput[0].files[0];
                }
                
                if(!file) {
                    $j('.loadding_ajaxcart').show();
                    ajaxToCart(url,data,'view','view_add');
                } else {
                    //$j('#product_addtocart_form').attr('target', '_blank')
                    form.submit();
                }

                
                //End ajax code
                this.form.action = oldUrl;
                if (e) {
                    throw e;
                }
            }
            return false;
        }
    }
}

function getProductIdFrom(url) {
    if(url.search('form_key')!=-1) {
        var a = url.search('/form_key/');
        var p = url.search('/product/');
        var form_key= url.substring(p,a); 
        var product_id = form_key.replace('/product/','');
        return product_id;
    }
    var myURLArray = url.split('/');
    var lastChunk = '';
    while (myURLArray.length > 0 && lastChunk == '') {
      lastChunk = myURLArray.pop();
    }
    return lastChunk;
}


function getProductInfoFromCart(linkToCart) {
	
    $j.ajax({
        url: linkToCart,
        type: 'GET',
        data: {},
        beforeSend: function(){
            showLoadingAnimation();
        },
        success: function(data) {
            hideLoadingAnimation();
            var htmlObject = $j(data);
            var formCart = htmlObject.find('.main-container').html();
            //console.log(formCart);
            showProductOption(formCart);
            return false;
        }
    });
}

//compare product
function addProductCompare() {
    $j('ul.add-to-links li a.link-compare').each(function(){
        var compareUrl = $j(this).attr('href');
       if(compareUrl.search('product_compare/add/product')!=-1){
             $j(this).bind('click',function(){
                ajaxToCart(compareUrl,'','');
                return false;
            });
       }
    });
}
//wishlist product
function addProductToCartFromWishlist() {
      $j('li .link-cart').each(function(){
        var addToCartWishlistUrl = $j(this).attr('href');
        $j(this).bind('click',function(){
                ajaxToCart(addToCartWishlistUrl,'','');
            return false;
        });
    });
}

function addProductWishlist() {
	return;
     if (self == top) {
	     $j('a.link-wishlist').each(function(){
	        var wishlistUrl = $j(this).attr('href');
			$j('a.link-wishlist').attr('target','_parent');
	      
	        $j(this).bind('click',function(){
				if(wishlistUrl.search('wishlist/index/add/product')!=-1){
					var isLogin = $j('#ajaxconfig_info input').attr('value');
					if(isLogin !=1){
						 location.href = wishlistUrl;
						return false;
					}
					$j('.loadding_ajaxcart').show();
					console.log('add');
					ajaxToCart(wishlistUrl,'','','wishlistAdd');
					$j(this).addClass('in-wishlist');
					$j(this).text('Remove from Wishlist');
					
					return false;
				}
				else{
					var isLogin = $j('#ajaxconfig_info input').attr('value');
					if(isLogin !=1){
						location.href = wishlistUrl;
						return false;
					}
					$j('.loadding_ajaxcart').show();
					ajaxToCart(wishlistUrl,'','','wishlistRemove');
					$j(this).removeClass('in-wishlist');
					$j(this).text('Add to Wishlist');
					console.log('remove');
					return false;
				}
			});
				
	      });
	}
    else {
    	$j('.product-view .link-wishlist').removeAttr('onclick').unbind('click');
    	$j('.product-view .link-wishlist').bind('click', function() {
    		parent.location.href=$j(this).attr('href');
    		parent.$j.fancybox.close();
    	});
    }
}

function addToWishlistCompareOnProductView() {
    if (self == top) {
	    var haveLogin = $j('#ajaxconfig_info input#is_login').attr('value');
		var widhListAdd = $j('#ajaxconfig_info input.widhListAdd').attr('value');
		var widhListRemove = $j('#ajaxconfig_info input.widhListRemove').attr('value');		
	    if(haveLogin ==1){
	        $j('.product-view .link-wishlist').removeAttr('onclick');
	    }
	    
	    $j('.product-view .link-wishlist,.product-grid .item .link-wishlist').bind('click',function(event){
			var wishSubmitUrl = $j(this).closest('.actions').find('span.wishlistSubmitUrl').text();
			if(haveLogin ==0){
				parent.location.href=wishSubmitUrl;
				return;
			}
	        var link = $j(this).attr('href');
			//$j('.loadding_ajaxcart').show();
			if(link.search('wishlist/index/add/product')!=-1){
				ajaxToCart(link,'','','wishlistAdd');
				$j(this).addClass('in-wishlist');
				if ($j(".product-view").length > 0) {
					$j(this).text(widhListRemove);
				}					
			}else{
				var addUrl = $j(this).closest('.actions').find('.wishlistSubmitUrl').text();
				var productId = $j(this).closest('.actions').find('.productId').text();
				ajaxToCart(link,'','','wishlistRemove',addUrl,productId);
				$j(this).removeClass('in-wishlist');
				$j(this).attr("href", wishSubmitUrl);
				if ($j(".product-view").length > 0) {
					$j(this).text(widhListAdd);
				}
			}
	        return false;
	    });
    }
    else {
    	$j('.product-view .link-wishlist').removeAttr('onclick').unbind('click');
    	$j('.product-view .link-wishlist').bind('click', function() {
    		//parent.location.href=$j(this).attr('href');
    		parent.$j.fancybox.close();
    	});
    }
}

function removeCompareProductLink(){

      $j('#compare-items li .btn-remove').each(function(){
        var removeCompareUrl = $j(this).attr('href');
        try {
            if(removeCompareUrl.search('product_compare/remove/product')!=-1) {
            $j(this).removeAttr('href');
            $j(this).removeAttr('onclick');
            $j(this).live('click',function(){ 
                var confirm_content = $j('.confirm_delete_product').attr('value');
                 if(confirm(confirm_content)){
                      ajaxToCart(removeCompareUrl,'','');
                 };
                return false;
            });
        }
        } catch (exception) { 
        }
    });
}

function removeWislishProductLink(){
    $j('#wishlist-sidebar li .btn-remove').each(function(){
        var removeWishlistUrl = $j(this).attr('href');
        if(removeWishlistUrl.search('wishlist/index/remove')!=-1) {
			$j(this).attr('href','javascript:void(0)');
			$j(this).removeAttr('onclick');
			$j(this).live('click',function(){
				 var confirm_content = $j('.confirm_delete_product').attr('value');
				 if(confirm(confirm_content)){
					ajaxToCart(removeWishlistUrl,'','','wishlistRemove');
				 }
				return false;
			});
        }
    });
}


function showLoadingAnimation(){
    var loading_bg = $j('#ajaxconfig_info button').attr('name');
    var opacity = $j('#ajaxconfig_info button').attr('value');
    var loading_image = $j('#ajaxconfig_info img').attr('src');
    var style_wrapper =  "position: fixed;top:0;left:0;filter: alpha(opacity=70); z-index:99999;background-color:"+loading_bg+"; width:100%;height:100%;opacity:"+opacity+"";
    var loading = '<div  class ="loadding_ajaxcart" style ="z-index:999999;position:absolute; top:0; right:-50px;"><img src="'+loading_image+'"/></div>';
    //if($j('#wraper_ajax').length==0) {
        $j('.add-to-box .add-to-cart').append(loading);
    //}
    //$j('.header-container').append(loading);
}

function showLoadingAnimationList(){
    var loading_bg = $j('#ajaxconfig_info button').attr('name');
    var opacity = $j('#ajaxconfig_info button').attr('value');
    var loading_image = $j('#ajaxconfig_info img').attr('src');
    var style_wrapper =  "position: fixed;top:0;left:0;filter: alpha(opacity=70); z-index:99999;background-color:"+loading_bg+"; width:100%;height:100%;opacity:"+opacity+"";
     var loading = '<div  class ="loadding_ajaxcart" style ="z-index:999999;position:fixed; top:50%; left:50%;"><img src="'+loading_image+'"/></div>';
    //if($j('#wraper_ajax').length==0) {
        $j('body').append(loading);
    //}
    //$j('.header-container').append(loading);
}

function showLoadingAnimationWishlist(){
    var loading_bg = $j('#ajaxconfig_info button').attr('name');
    var opacity = $j('#ajaxconfig_info button').attr('value');
    var loading_image = $j('#ajaxconfig_info img').attr('src');
    var style_wrapper =  "position: fixed;top:0;left:0;filter: alpha(opacity=70); z-index:99999;background-color:"+loading_bg+"; width:100%;height:100%;opacity:"+opacity+"";
    var loading = '<div id ="wraper_ajax_wishlist" style ="'+style_wrapper+'" ><div  class ="loadding_ajaxcart_wishlist" style ="z-index:999999;position:fixed; top:50%; left:50%;"><img src="'+loading_image+'"/></div></div>';
    $j('.my-wishlist').append(loading);
    //$j('.header-container').append(loading);
}

function showBoxInfo(product_info) {
    var base_url = $j('#ajaxconfig_info a').attr('href');
    var cart_url = base_url+ 'checkout/cart'
    var title_shopping_cart = $j('.title_shopping_cart').attr('value');
    var title_shopping_continue = $j('.title_shopping_continue').attr('value');
	var closeBtn = $j('.closeBtn').attr('value');	
	//hideLoadingAnimation();
	var str = '';
	str += "<div id='wraper_ajax'></div>";
    str += "<div class ='wrapper_box'>";
    str += "<div id ='product_info_box'>"+product_info+"</div>";    
	str += "<div class='closeBtn' onclick='hideLoadingAnimationClick();'><img src="+closeBtn+" /></div>";
	str += "</div>";
    //$j('.loadding_ajaxcart').html(str);
    $j(str).insertAfter('.wrapper');
}

function showBoxInfoWishlist(product_info) {
	if (self != top)parent.$j.fancybox.close();
    var base_url = $j('#ajaxconfig_info a').attr('href');
    var cart_url = base_url+ 'wishlist/'
    var str = "<div class ='wrapper_box pop_wishlist1'>";
    var title_shopping_continue = $j('.title_shopping_continue').attr('value');
    var title_shopping_wishlist = $j('.title_shopping_wishlist').attr('value');
    var title_add_to_wishlist = $j('.title_add_to_wishlist').attr('value');
	parent.$j('body').append('<div class="add-to-cart-success">'+title_add_to_wishlist+' <a href="'+cart_url+'"><span>'+title_shopping_wishlist+'</span></a></div>');
	parent.$j('.add-to-cart-success').delay(5000).slideUp(500);
    //str += "<div><p class ='info'>"+title_add_to_wishlist+"</p></div>";
    //str += "<div id ='product_info_box'>"+product_info+"</div>";
    //str += "<div><a href= 'javascript:void(0)'  id ='continue_shopping'>"+title_shopping_continue+"</a></div>";
    //str += "<div><a href='"+cart_url+"' id='shopping_cart' target='_parent'>"+title_shopping_wishlist+"</a></div></div>";
    //$j('.loadding_ajaxcart').html(str);
    //$j(str).insertAfter('#wraper_ajax');
    //$j('#wraper_ajax').css('opacity',0.8);
}

function showBoxInfoCompare(product_info) {
    var base_url = $j('#ajaxconfig_info a').attr('href');
    var cart_url = base_url+ 'catalog/product_compare/index/'
    var str = "<div class ='wrapper_box pop_compare1'>";
    var title_shopping_continue = $j('.title_shopping_continue').attr('value');
    var title_shopping_compare = $j('.title_shopping_compare').attr('value');
    var title_add_to_compare = $j('.title_add_to_compare').attr('value');
    str += "<div><p class ='info'>"+title_add_to_compare+"</p></div>";
    str += "<div id ='product_info_box'>"+product_info+"</div>";
    str += "<div><a href= 'javascript:void(0)'  id ='continue_shopping'>"+title_shopping_continue+"</a></div>";
    str += "<div><a id='shopping_cart' target='_blank' href='"+cart_url+"'>"+title_shopping_compare+"</a></div></div>";
 
    $j('.loadding_ajaxcart').html(str);
    $j(str).insertAfter('#wraper_ajax');
    $j('#wraper_ajax').css('opacity',0.8);
}

function showProductOption(product_info) {
    var str = "<div class ='wrapper_box pop_up_product_option'>";
        str += product_info ;
        str +='</div>' ;
    $j('.loadding_ajaxcart').html(str);
    $j(str).insertAfter('#wraper_ajax');
    $j('#wraper_ajax').css('opacity',0.8);
    $j('#productHaveOption').html(product_info);

}

function hideLoadingAnimation() {
    //$j('.loadding_ajaxcart,#wraper_ajax,.wrapper_box').hide();  
}
function hideLoadingAnimationClick() {
    $j('.loadding_ajaxcart,#wraper_ajax,.wrapper_box').hide();  
}

function showMiniAjaxCart() {
    $j('#header-cart').show();
}

function hideMiniAjaxCart() {
    $j('#header-cart').slideUp()
    $j('#header-cart').hide();
}

function changeDelelteUrl() {
    var str = '<script type ="text/javascript">\n\
                                   $j("#cart-sidebar a.btn-remove").each(function(){\n\
                                        var delUrl = $j(this).attr("href");\n\
                                        $j(this).attr("href","#"); \n\
                                        $j(this).live("click",function(){\n\
                                            $j(this).attr("onclick",ajaxToCart(delUrl,"","view"));\n\
                                                return false;                               \n\
                                        });   \n\
                                });\n\
                                \n\
                    </script>';
    return str;
}

function receive(saveData) {
    if (saveData == null) {
            alert("DATA IS UNDEFINED!");  // displays every time
    }
    console.log("Success is " + saveData);  // 'Success is undefined'
}

function addRecipe(btnClass) {
	var form = $j(btnClass).closest('form').attr('action');
	var data = $j(btnClass).closest('form').serialize();
	ajaxToCart(form,data,'view');
}

function ajaxToCart(url,data,mine,type_add,addUrl,productId) {
	var using_ssl = $j('.using_ssl').attr('value');
    url = url.replace('checkout/cart', 'ajaxcartsuper/ajaxcart');
	  //cross domain request possible fix
    url = url.replace(/http[^:]*:/, document.location.protocol);
	if(using_ssl==1) { 
		url = url.replace("http://", "https://");
	}
    try {
        $j.ajax({
            url: url,
            dataType: 'jsonP',
            type : 'post',
            data : data,
            crossDomain: true,
            beforeSend: function(data){
				if(type_add == 'list_add')
					showLoadingAnimationList();
				else
					showLoadingAnimation();
            },
            success: function(data){
                if(data.status==1) {
					if(type_add=="wishlistAdd"){
						$j('#item-'+data.product_id+' .link-wishlist').attr('href',data.wishlistItem);
						$j('.wish-top-link a span.counter').text(data.wish_count);
					}
					if(type_add=="wishlistRemove"){
						$j('.wish-top-link a span.counter').text(data.wish_count);	
					}
					$j('.loadding_ajaxcart').hide();
                    var base_url = $j('#ajaxconfig_info a').attr('href');
                    
                    if(data.sidebar_cart) {
						//console.log(data.sidebar_cart);
                        $j('.mini-cart').html('');
						$j('.mini-cart').replaceWith(data.sidebar_cart);										
						//$j('.mini-cart').addClass( "open" );
						//$j('.mini-cart-content').show();
						setTimeout(function() {hidePanel()},8000);
						function hidePanel(){
							hideLoadingAnimationClick();
						}
						//$j("html, body").animate({ scrollTop: 0 }, "slow");
                    }
					//if(type_add=='view_add'){
						showBoxInfo(data.product_info);
					//}                 
                    
             
                    //compare type
                    if(data.type_sidebar == 'compare'){
                        $$('.sidebar .block-compare').each(function (el){
                            el.replace(data.sidebar_compare);
                        });
						removeCompareProductLink();
                        if(data.product_info) {
                            showBoxInfoCompare(data.product_info);
                            return false;
                        }else {
                            hideLoadingAnimation();
                        }
                    }
                    
                    if(data.type_sidebar == 'wishlist'){
						if($j('.wishlist-index-index').length) {
								var wishlist_url = location.href;
								if(using_ssl==1) { 
									wishlist_url = wishlist_url.replace("http://", "https://");
								}	
								showLoadingAnimationWishlist();
								$j.get( wishlist_url, function( data ) {
									var form_wishlist = $j(data).find('.my-wishlist').html();
									$j('.my-wishlist').html(form_wishlist);
								});
						}
                        if(!$j('.sidebar .block-wishlist').length){
                            $j('<div class="block block-wishlist"></div>').insertAfter('.sidebar .block-cart');
                        }
                        $$('.sidebar .block-wishlist').each(function (el){
                            el.replace(data.wishlist_sidebar);
                        });
						
                    	$$('.quick-access ul.links').each(function (el){
                            el.replace(data.top_link);
                        });
                         
						removeWislishProductLink();
                        if(data.product_info) {
                            showBoxInfoWishlist(data.product_info);
                            return false;
                        }else {
                            hideLoadingAnimation();
                        }
						
                    }
                    if(data.product_info) {
                        //showBoxInfo(data.product_info);
						hideLoadingAnimation();
                    }else {
                        hideLoadingAnimation();
                    }
                 
                } else {  
				
					hideLoadingAnimation();
                }
                deleteCartInSidebar();
				
            return false;
            }
        });
    } catch (e) {
        alert('erreror here')
        setLocation(url);
    }
   
}


  // fly to basket  
  function flyToCart(flyer, flyingTo, callBack) {
      try {
        var $jfunc = $j(this);
        var divider = 3;
        var flyerClone = $j(flyer).clone();
        $j(flyerClone).css({
            position: 'absolute',
            top: $j(flyer).offset().top + "px",
            left: $j(flyer).offset().left + "px",
            opacity: 1,
            'z-index': 1000
        });
        $j('body').append($j(flyerClone));
        if($j(flyingTo)) {
            var gotoX = $j(flyingTo).offset().left + ($j(flyingTo).width() / 2) - ($j(flyer).width()/divider)/2;
            var gotoY = $j(flyingTo).offset().top + ($j(flyingTo).height() / 2) - ($j(flyer).height()/divider)/2;
            $j(flyerClone).animate({
                opacity: 0.7,
                left: gotoX,
                top: gotoY,
                width: 135,
                height: 135
            }, 1000,
            function () {
                $j(flyingTo).fadeOut('slowly', function () {
                    $j(flyingTo).fadeIn('slowly', function () {
                        $j(flyerClone).fadeOut('slowly', function () {
                            $j(flyerClone).remove();
                            if( callBack != null ) {
                                callBack.apply($jfunc);
                            }
                        });
                    });
                });
            });
        }
    
    } catch (exception) { 
    
    }    
}

function insertContentToParent(element,data) {
     $$('.sidebar .block-cart').each(function (el){
        el.replace(data);
    });
    //$j('.sidebar').append(changeDelelteUrl());
    return false;
}

function insertContentTopLinkToParent(element,data) {
     $$(element).each(function (el){
        el.replace(data);
    });
    return false;
}

function insertContentMiniCartToParent(element,data) {
    $j(element).html('');
    $j(element).append(data);
    $j('#mini_cart_block').show();
    deleteCartInSidebar();
    return false;
}


//delete product out of cart in checkout page
function deleteCartInCheckoutPage(){ 
    $j('.checkout-cart-index a.btn-remove').removeAttr('onclick');
    $j(".checkout-cart-index a.btn-remove2,.checkout-cart-index a.btn-remove").click(function(event) {
        event.preventDefault();
        //var confirm_content = $j('.confirm_delete_product').attr('value');
        //if(!confirm(confirm_content)){
        //    return false;
       // }
         var delUrl = $j(this).attr("href");
            delUrl = delUrl.replace("checkout/cart/delete", "ajaxcartsuper/index/cartdelete");
			
		var using_ssl = $j('.using_ssl').attr('value');
		  //cross domain request possible fix
		delUrl = delUrl.replace(/http[^:]*:/, document.location.protocol);
		if(using_ssl==1) { 
			delUrl = delUrl.replace("http://", "https://");
		}
		
        $j.ajax({
            url: delUrl,
			dataType: 'jsonP',
			crossDomain: true,
            type: 'POST',
            data: {},
            beforeSend:function(){
               showLoadingAnimation();
            },
            success: function(xhr) {
				var form_cart = xhr['form_cart'];
				var mini_cart = xhr['mini_cart'];
				var subtotal = xhr['subtotal'];
				var qty = xhr['qty'];
				var top_cart = '<div class ="top-cart-contain">'+xhr["top_cart"]+'</div>';
                $('ajaxcart-checkout-content').innerHTML = form_cart;
                $('ajaxcart-checkout-content').insert(form_cart);
                var cart_content = $('ajaxcart-checkout-content').down('.cart_content').innerHTML;
				parent.$j('.minicart-container').html('');
				parent.$j('.minicart-container').html(mini_cart);
				$j('.skip-cart .count').html(qty);
				$j('.subtotal span.price').html(subtotal);	
                 $$('.top-cart-contain').each(function (el){
                     el.replace(top_cart);
                 });
                var full_cart_content = $('ajaxcart-checkout-content').down('.ajaxcart_checkout_content').innerHTML;
                $$('.cart').each(function (el){
                    el.replace(full_cart_content);
                });
                hideLoadingAnimation();
                $j('#ajaxcart-checkout-content').html('');
            },
			complete: function(xhr) {
				//getQuote();
				//getDiscountCodes();
				//slideEffectAjax();
			}
        });
        
    });
   
    return false;
}

function getDiscountCodes() {
    $j('#discount-coupon-form').attr('id','discount-coupon-form-ajax');
    var discountFormAjax = new VarienForm('discount-coupon-form-ajax');
    discountForm.submit = function (isRemove) {
        if (isRemove) {
            $('coupon_code').removeClassName('required-entry');
            $('remove-coupone').value = "1";
        } else {
            $('coupon_code').addClassName('required-entry');
            $('remove-coupone').value = "0";
        }
        return VarienForm.prototype.submit.bind(discountFormAjax)();
    }
}

function getQuote() {
    $j('#shipping-zip-form').attr('id','shipping-zip-form-ajax');
    var coShippingMethodFormAjax = new VarienForm('shipping-zip-form-ajax');
    coShippingMethodForm.submit = function () {
        var country = $F('country');
        var optionalZip = false;

        for (i=0; i < countriesWithOptionalZip.length; i++) {
            if (countriesWithOptionalZip[i] == country) {
                optionalZip = true;
            }
        }
        if (optionalZip) {
            $('postcode').removeClassName('required-entry');
        }
        else {
            $('postcode').addClassName('required-entry');
        }
        if (this.validator.validate()) {
            this.form.submit();
        }
        console.log(countriesWithOptionalZip.length);
    }.bind(coShippingMethodFormAjax);
}

function slideEffectAjax() {
      $j('.top-cart-contain').mouseenter(function() {
            $j(this).find(".top-cart-content").stop(true, true).slideDown();
        });
        //hide submenus on exit
        $j('.top-cart-contain').mouseleave(function() {
            $j(this).find(".top-cart-content").stop(true, true).slideUp();
        });
}

function deleteCartInSidebar() {
    var is_checkout_page = $j('.checkout-cart-index').length;
    if(is_checkout_page>0) return false;
    $j('#cart-sidebar a.btn-remove, #mini_cart_block a.btn-remove').each(function(){
        var delUrl = $j(this).attr('href');
        $j(this).attr('href','#');
        $j(this).attr('onclick','');
        if(delUrl.search('checkout/cart/delete')!=-1) {
            $j(this).on('click',function(){
                  var confirm_content = $j('.confirm_delete_product').attr('value');
                  if(confirm(confirm_content)){
                        $j(this).attr('onclick',ajaxToCart(delUrl,'','view'));
                 };
                return false;
            });              
        }
    });
}  

$j(document).ready(function(){
    var enable_module = $j('#enable_module').val();
    if(enable_module==0 || !enable_module) return false;
    //add Class to wishlist link 
    $j('.quick-access ul li a').each(function(){
        var link = $j(this).attr('href');
        if(link.search('/wishlist/')!=-1){
            $j(this).addClass('top_link_wishlist');
        }
    });
    var checkout_url = $j('.top-link-checkout').attr('href')+'onepage';
    $j('.top-link-checkout').attr('href',checkout_url);
    //delete product out of cart
    //deleteCartInSidebar();
    //delete product out of cart in checkout page
    //deleteCartInCheckoutPage();
    //compare link
    addProductCompare();
    removeCompareProductLink();
      
    //wishlist link 
    addToWishlistCompareOnProductView();
    //addProductWishlist();
    //addProductToCartFromWishlist();
    //removeWislishProductLink();
    //hideMiniAjaxCart();
    //add product to cart on list product 
    AddToCartOnListProduct();
    //Add to cart in product view page
    AddToCartOnProductView();
    //hover on link cart 
//    $j('.top-link-cart').attr('href','javascript:void(0)')
//    $j('.top-link-cart').live('click',function(){
//        $j('#mini_cart_block').slideToggle('slowly')
//    })
//    $j('#continue_shopping, #shopping_cart').live('click', function(){
 //        hideLoadingAnimation();
 //       $j('#mini_cart_block').show();
 //       if($j('#ajax_cart_super_product_view').attr('class')=='popup') {
 //           if (self != top) parent.$j.fancybox.close();
 //       }
//		if (self != top) parent.$j.fancybox.close();
  //  }); 
    

 //   $j('#wraper_ajax').live('click',function(){
//        $j('#wraper_ajax, .wrapper_box').remove();
//    })
    //hide mini cart on popup
    $j('.ajaxcartsuper-index-productview #mini_cart_block').hide();
    //hover on mini cart 
    slideEffectAjax();
});

$j(document).ajaxComplete(function(){
    var enable_module = $j('#enable_module').val();
    if(enable_module==0 || !enable_module) return false;
    AddToCartOnListProduct();
    //deleteCartInSidebar();
    removeCompareProductLink();
    removeWislishProductLink();
    addProductToCartFromWishlist();
    addProductCompare();
    //addProductWishlist();
    //deleteCartInCheckoutPage();

});

//]]>