
	(function($){
	    $(document).on('facetwp-loaded', function() {
	        var $parent = $('.facetwp-facet-product_category');
	        $parent.find('.facetwp-radio').each(function() {
	            var $this = $(this);
	            var daVal = $this.attr('data-value');
	            // var counter = $this.find('.facetwp-counter').text().replace('(', '').replace(')', '');
	            if ( false == daVal) {
	            	var daVal = 'New Release';
			        var img = 'https://mydigitalvoucher.com/wp-content/themes/dvp/assets/img/tab-icon/icon-game.png';
			    }else if ('all-time-fav' == daVal) {
			    	var daVal = daVal.replace(/-/g, ' ');
			        var img = 'https://mydigitalvoucher.com/wp-content/themes/dvp/assets/img/tab-icon/icon-popular.png';
			    }else if ('popular' == daVal) { 
			        var img = 'https://mydigitalvoucher.com/wp-content/themes/dvp/assets/img/tab-icon/icon-topchoices.png';
			    }else if ('top-choice' == daVal) { 
			    	var daVal = daVal.replace(/-/g, ' ');
			        var img = 'https://mydigitalvoucher.com/wp-content/themes/dvp/assets/img/tab-icon/icon-alltimefavorite.png';
			    }

	            $this.html('<img src="'+ img +'" /> <p>'+ daVal +'</p>');

	            	            		$('.facetwp-radio[data-value=""] p').text('Nouvelles entrées');
	            		$('.facetwp-radio[data-value="all-time-fav"] p').text('Favoris');
		            	$('.facetwp-radio[data-value="popular"] p').text('Promo');
		            	$('.facetwp-radio[data-value="top-choice"] p').text('Tous les Produits');
		            	// User Click
		            	$('[data-value=""]').on('click', function(){
				    			$('.dynamic_title').text('Nouvelles entrées');
			    		});
			    		$('[data-value="all-time-fav"]').on('click', function(){
			    			$('.dynamic_title').text('Favoris');
			    		});
			    		$('[data-value="popular"]').on('click', function(){
			    			$('.dynamic_title').text('Promo');
			    		});
			    		$('[data-value="top-choice"]').on('click', function(){
			    			$('.dynamic_title').text('Tous Les Produits');
			    		});
		        
		        

	        });
	    });

	})(jQuery);
