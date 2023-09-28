(function(jQuery){
jQuery.fn.char = function(chars){
	return this.each(function(){
		jQuery(this).focus(function(){
			if(chars != null){
				jQuery(this).keypress(function(e){
				var code = e.which;
				switch(code){
					case 0:
					case 8:
						return true;
						break;
				}
				var key = String.fromCharCode(code);

				if(chars.indexOf(key) != -1)
					return true;
				return false;
				});
			}
		});
	});
};
})(jQuery);