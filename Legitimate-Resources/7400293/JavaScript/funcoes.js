jQuery(document).ready(function(){
	jQuery('.cart-price-wrapper .ajax_add_to_cart').html('Adicionar ao Carrinho');
	jQuery('.collection-left-align .sorting-form-wrapper a').html('Visualizar Todos');
	jQuery('#estore_full_width_promo_widget-2 .tg-column-wrapper').children().eq(1).children().attr('href','https://www.youtube.com/channel/UCsmP0aeP_m2Ny3wCXWMDcDQ').attr('target', '_blank');
	jQuery('#estore_full_width_promo_widget-2 .tg-column-wrapper').children().eq(0).children().attr('target', '_blank');

	jQuery('.tg-column-4.collection-block a').attr('target', '_self');
	jQuery('.single_image_with_link').attr('target', '_self');


	jQuery('#top-footer .tg-column-wrapper .widget-title').css('margin-bottom', '15px');
	jQuery('#top-footer .tg-column-wrapper').children().eq(0).css('width', '18%');
	jQuery('#top-footer .tg-column-wrapper').children().eq(1).css('width', '36%');
	jQuery('#top-footer .tg-column-wrapper').children().eq(2).css('width', '16%');
	jQuery('#top-footer .tg-column-wrapper').children().eq(3).css('width', '22%');

	jQuery('#estore_vertical_promo_widget-2').children().eq(0).children().eq(1).children().attr('href','/categoria-produto/apartamentos/');
	jQuery('#estore_vertical_promo_widget-2').children().eq(1).children().eq(1).children().attr('href','/categoria-produto/consultorios/');

	for(j=0;j<=50;j++){
		jQuery('#top-footer .tg-column-wrapper').children().eq(1).children().find('ul').children().eq(j).css('float','left').css('width', '49%');
		j++;
		jQuery('#top-footer .tg-column-wrapper').children().eq(1).children().find('ul').children().eq(j).css('float','right').css('width', '49%');
	}

	setTimeout(function(){
		jQuery('.cart-price-wrapper .ajax_add_to_cart').html('Adicionar ao Carrinho');
		jQuery('.collection-left-align .sorting-form-wrapper a').html('Visualizar Todos');
		jQuery('#estore_full_width_promo_widget-2 .tg-column-wrapper').children().eq(1).children().attr('href','https://www.youtube.com/channel/UCsmP0aeP_m2Ny3wCXWMDcDQ').attr('target', '_blank');
		jQuery('#estore_full_width_promo_widget-2 .tg-column-wrapper').children().eq(0).children().attr('target', '_blank');
	}, 500);
});