$(function(){
	$.modal = (function(){

		var modal,
			effects = {'show': 'fadeInDown', 'hide': 'fadeOutUp'},
			prevEffect = null;

		function setModal(id, onShowCallback){
			
			var box = (typeof id == 'undefined') ? $('.modal:eq(0)') : $('#'+id),
				wrapper = box.children('.modal-wrapper:eq(0)');
				onShowCallback = onShowCallback || new Function();

			modal = {
				'box' : box,
				'mask': box.prev(),
				'wrapper' : wrapper,
				'header' : wrapper.children('.modal-header'),
				'content' : wrapper.children('.modal-content'),
				'footer' : wrapper.children('.modal-content')
			}

			$(box).on('show', function(){
				var width = $(this).outerWidth(),
					margin = width / 2,
					margin = parseInt(margin);
				
				$(this).css({ 'margin-left' : -margin });
				onShowCallback.call($.modal, box);
			});


			$(document).keyup(function(e){ if(e.which == 27){ hide(); }});
			
			$(modal.mask).click(function(){ hide(); });
			$(document).on('click', '.modal-close', function(){ hide(); });
			$(modal.box).find('.modal-close').click(hide);
			$(modal.wrapper).find('.modal-close').click(hide);
			$(modal.header).find('.modal-close').click(hide);

		}

		function refresh(effect){			
			if(prevEffect){
				modal.box.removeClass('animated').removeClass(prevEffect);
			}
		}

		function setEffect(type, name){
			effectName = type+'Effect';
			name = (typeof name == 'undefined') ? effects[effectName] : name;
			effects[effectName] = name;
		}

		function show(effect, id, onShowCallback){
			if(typeof id != 'undefined'){
				setModal(id, onShowCallback);
			}

			setEffect('show', effect);
			modal.mask.show();
			refresh(effect);
			modal.box.addClass('animated').addClass(effects.show).show();

			prevEffect = effects.show;
		}

		function hide(effect, id, callback){
			var callback = callback || function(){};

			if(typeof id != 'undefined' && id){
				setModal(id);
			}
			
			setEffect('hide', effect);
			refresh(effect);

			setTimeout(function(){
				modal.mask.hide();
				modal.box.hide(callback);
				modal.box.removeClass(effects.hide);
				$('.modal-mask').hide();
			}, 1000);

			modal.box.addClass('animated').addClass(effects.hide);

			prevEffect = effects.hide;
		}

		function get(){
			return modal.box;
		}

		setModal();

		return {show: show, hide: hide, get: get}

	})();
	
});