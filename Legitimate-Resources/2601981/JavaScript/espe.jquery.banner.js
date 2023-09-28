function espeBanner(element, opts) {
	var _baseElement = element;
	
	// Checando se a classe ja esta definida
	// if ( $(this).hasClass('espe-banner') || $(this).find('ul').length <= 0 )
	// 	return;
	
	// Alimentando as configuracoes
	var options = $.extend({
		autoSwitch: true,
		initialSlide: 0,
		onSlideIn: function(slideIndex, ulElement) { 
		},
		onSlideOut: function(slideIndex, ulElement) { 
		}
	}, opts);
	
	// Criando os elementos de navegacao
	$(_baseElement).find('ul').addClass('slider');
	$(_baseElement).addClass('espe-banner');
	
	var navElement = $("<div class='espe-banner-nav'><ul>");
	var numElements = $(_baseElement).find('ul').find('li').length;
	for ( var i = 0; i < numElements; i++ ) {
		// Obtendo o nome dos sliders (se houver)
		var sliderName = $(_baseElement).find('ul:eq(0)').find('li:eq(' + i + ')').attr('slider-name');
		if ( typeof(sliderName) == 'undefined' ) sliderName = "" + (1 + i);
		
		var liElement = $("<li title='" + sliderName + "'><a href='#' slider-index='" + i + "'><img src='/espe/imgs/dots.png'/></a></li>");
		var aElement = $(liElement).find('a');
		
		// Definindo evento de click
		$(aElement).click(function(){
			var value = $(this).attr('slider-index');
			__OpenByClick(_baseElement, value);
		});
		
		$(navElement).append(liElement);
	}
	$(navElement).append("</ul></div>");
	
	// Anexando ao elemento base
	$(_baseElement).append(navElement);
	
	// Definindo os elementos usados no control
	
	// Ativando o slider inicial
	var li = $(_baseElement).find('li:eq(' + options.initialSlide + ')');
	$(li).addClass('espe-banner-active');
	var navele = $(_baseElement).find('.espe-banner-nav');
	var navLI = $(navele).find('li:eq(' + options.initialSlide + ')');
	$(navLI).addClass('active');
	
	var timeout = $(li).attr('change-timeout');
	if ( typeof(timeout) == 'undefined' || timeout == 0 )
		timeout = 10000;
	
	// Salvando as configuracoes no elemento
	// Definindo o index atual
	jQuery.data(_baseElement, '_options.eventIn', options.onSlideIn);
	jQuery.data(_baseElement, '_options.eventOut', options.onSlideOut);
	jQuery.data(_baseElement, '_options.auto_switch', options.autoSwitch);
	jQuery.data(_baseElement, '_info.current_index', options.initialSlide);
	jQuery.data(_baseElement, '_info.total_indexes', numElements);
	
	
	// Inicializando o autoswitch
	if ( options.autoSwitch ) {
		var _timecontrol = window.setTimeout(function(){
			__SliderTimeoutTick(_baseElement);
		}, timeout);
		
		jQuery.data(_baseElement, '_controller.interval', _timecontrol);
	}
	
	// Disparando o evento do objeto atual
    options.onSlideIn(options.initialSlide, li);
}

function __OpenByClick(e, nextIndex) {
	// Obtendo os dados de evento
	var eventIn = jQuery.data(e, '_options.eventIn');
	var eventOut = jQuery.data(e, '_options.eventOut');
	
	// Posicao atual e quantidade de intens
	var currentIndex = jQuery.data(e, '_info.current_index');
	if ( currentIndex == nextIndex )
		return;
	
	// Obtendo os elementos
	var old_li = $(e).find('li:eq(' + currentIndex + ')');
	var new_li = $(e).find('li:eq(' + nextIndex + ')');
	
	// Modificando as classes e disparando os eventos
	eventOut(currentIndex, old_li);
	eventIn(nextIndex, new_li);
	
	$(old_li).removeClass('espe-banner-active');
	$(new_li).addClass('espe-banner-active');
	
	// Modificando o indicador
	var navele = $(e).find('.espe-banner-nav');
	var oldNavLi = $(navele).find('li:eq(' + currentIndex + ')');
	$(oldNavLi).removeClass('active');
	var newNavLi = $(navele).find('li:eq(' + nextIndex + ')');
	$(newNavLi).addClass('active');
	
	// Verificando o autoSwitch
	var autoSwitch = jQuery.data(e, '_options.auto_switch');
	if ( autoSwitch ) {
		var oldController = jQuery.data(e, '_controller.interval');
		clearInterval(oldController);
		var timeout = $(new_li).attr('change-timeout');
		if ( typeof(timeout) == 'undefined' || timeout == 0 )
			timeout = 10000;
		
		var _timecontrol = window.setTimeout(function(){
			__SliderTimeoutTick(e);
		}, timeout);
			
		jQuery.data(e, '_controller.interval', _timecontrol);
	}
	
	jQuery.data(e, '_info.current_index', nextIndex);
}

function __SliderTimeoutTick(e) {
	// Obtendo os dados de evento
	var eventIn = jQuery.data(e, '_options.eventIn');
	var eventOut = jQuery.data(e, '_options.eventOut');
	
	// Posicao atual e quantidade de intens
	var currentIndex = jQuery.data(e, '_info.current_index');
	var totalIndexes = jQuery.data(e, '_info.total_indexes');
	
	// Definindo o prox. index
	var nextIndex = currentIndex + 1;
	if ( nextIndex >= totalIndexes ) nextIndex = 0;
	
	// Obtendo os elementos
	var old_li = $(e).find('li:eq(' + currentIndex + ')');
	var new_li = $(e).find('li:eq(' + nextIndex + ')');
	
	// Modificando as classes
	$(old_li).removeClass('espe-banner-active');
	eventOut(currentIndex, old_li);
	$(new_li).addClass('espe-banner-active');
	eventIn(nextIndex, new_li);
	
	// Modificando o indicador
	var navele = $(e).find('.espe-banner-nav');
	var oldNavLi = $(navele).find('li:eq(' + currentIndex + ')');
	$(oldNavLi).removeClass('active');
	var newNavLi = $(navele).find('li:eq(' + nextIndex + ')');
	$(newNavLi).addClass('active');
	
	// AutoSwitch
	var timeout = $(new_li).attr('change-timeout');
	if ( typeof(timeout) == 'undefined' || timeout == 0 )
		timeout = 10000;

	var _timecontrol = window.setTimeout(function(){
		__SliderTimeoutTick(e);
	}, timeout);
		
	jQuery.data(e, '_info.current_index', nextIndex);
	jQuery.data(e, '_controller.interval', _timecontrol);
}

jQuery(document).ready(function() {
    espeBanner(jQuery('div.banner'), {
        onSlideOut: function(index, element) {
            var video = document.getElementById('banner_video_' + index);
            video.pause();
            video.currentTime = 0;
        },
        onSlideIn: function(index, element) {
            var video = document.getElementById('banner_video_' + index);
            video.currentTime = 0;
            video.play();
        }
    });
});