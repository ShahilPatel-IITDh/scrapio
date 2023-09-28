jQuery(window).resize(function(){
	fVideoLoop();
});

jQuery(window).load(function(){	

});

jQuery().ready(function(){	
	
	// START DIM
	jQuery('.fStartDim').delay(700).fadeOut('slow');
		
	// MENU ACTIONS	
	jQuery('.fMenuIcon').click(function() {
		jQuery('.fMenu').slideToggle('slow');
		jQuery('.fMenuIcon').toggleClass('fMenuIconClicked');
	});
	
	jQuery('#nav-icon1').click(function(){
		jQuery(this).toggleClass('open');
	});
	
	fArrowDown();
	fHeaderPos();
	fForm();
	fAddForm();
	fHomeCel();
	fHomeArt();
	fSee();
	fVideo();
	fModalUpdate();
	fVideoLoop();
	
	fSliderDesc();
	fEpisodes();
	
	jQuery('.fResendCTA').click(function() {
		jQuery('.fResendForm').slideToggle('slow');
		event.preventDefault();
	});
	
	jQuery('.fHomeInf2').find('.fDeclCTA').click(function() {
		jQuery('.fTextModal').fadeIn('slow');
		jQuery('html, body').animate({
				scrollTop: jQuery( 'body').offset().top});		
		jQuery('.fVideoClose').click(function() {
			jQuery('.fTextModal').fadeOut('slow');
		});
	});
	
	jQuery('.fSectionArrow').click(function() {
		jQuery(this).toggleClass('fClicked');
		jQuery(this).parents('.container').find('.fSlideContent').slideToggle('slow');
	});
	
});

function fArrowDown() {
	jQuery('.fArrowDown').click(function(event){
			jQuery('html, body').animate({
				scrollTop: jQuery( '.fSection2').offset().top-60}, 1000);
				event.preventDefault();
		
	});
};

function fHeaderPos() {
		jQuery(window).scroll(function () { 
			if( jQuery(window).scrollTop() > 70 ) {
				jQuery('.fHeader').addClass('fHeaderScrolled');
			} else {
				jQuery('.fHeader').removeClass('fHeaderScrolled');
			};
		});
};

function fForm() {
		if(jQuery('.home').length > 0) {
			document.addEventListener( 'wpcf7mailsent', function( event ) {
			 window.dataLayer.push({
			 "event" : "sign-up"
			 })
			}); 
			var fHash = window.location.hash; fHash = fHash.substring(1, fHash.length);
			console.log(fHash);
			if(fHash != '') {
				jQuery('.fFormHashtag').find('input').attr('value',fHash);
			};
			document.addEventListener( 'wpcf7mailsent', function( event ) {
					var fEmail = jQuery('.fForm.f1').find('.fFormMail').find('input').val();
					if ( fEmail == '') { fEmail = jQuery('.fForm.f2').find('.fFormMail').find('input').val(); };
					window.location.href = '/potwierdzenie#'+fEmail;
					//window.location.href = '/potwierdzenie';
			}, false );
		};
		if(jQuery('.page-id-13').length > 0) {
			var fHash = window.location.hash; fHash = fHash.substring(1, fHash.length);
			if(fHash != '') {
				jQuery('.fConfMail').find('input.wpcf7-email').attr('value',fHash);
				jQuery('.fConfMail').find('input.wpcf7-submit').trigger('click');
			};
		};
};

function fAddForm() {
	jQuery('.fAddForm').find('input.wpcf7-submit').click(function() {
			document.addEventListener( 'wpcf7mailsent', function( event ) {
					window.location.href = '/dziekujemy-za-zaproszenie';
			}, false );
	});
};

function fHomeCel() {
		jQuery('.fHomeCelItem.f1').click(function() {
			jQuery('.fHomeCelMob').each(function() { jQuery(this).fadeOut(); });
			setTimeout(function() { jQuery('.fHomeCelMob.f1').fadeIn('slow'); },800);
			jQuery('.fHomeCelItem').each(function() { jQuery(this).removeClass('fActive'); });
			jQuery('.fHomeCelItem.f1').addClass('fActive');			
		});
		jQuery('.fHomeCelItem.f2').click(function() {
			jQuery('.fHomeCelMob').each(function() { jQuery(this).fadeOut(); });
			setTimeout(function() { jQuery('.fHomeCelMob.f2').fadeIn('slow'); },800);
			jQuery('.fHomeCelItem').each(function() { jQuery(this).removeClass('fActive'); });
			jQuery('.fHomeCelItem.f2').addClass('fActive');			
		});
		jQuery('.fHomeCelItem.f3').click(function() {
			jQuery('.fHomeCelMob').each(function() { jQuery(this).fadeOut(); });
			setTimeout(function() { jQuery('.fHomeCelMob.f3').fadeIn('slow'); },800);
			jQuery('.fHomeCelItem').each(function() { jQuery(this).removeClass('fActive'); });
			jQuery('.fHomeCelItem.f3').addClass('fActive');			
		});
		jQuery('.fHomeCelItem.f1').trigger('click');
};

function fHomeArt() {
		jQuery('.fHomeArtBoxes .f1').click(function() {
			jQuery('.fHomeArtBoxes .f2').removeClass('fActive');
			jQuery('.fHomeArtBoxes .f3').removeClass('fActive');
			jQuery('.fHomeArtBoxes .f1').addClass('fActive');
			jQuery('.fHomeArtItem').each(function() { jQuery(this).fadeOut(); });
			jQuery('.fHomeArtItem.f1').fadeIn();
		});
		jQuery('.fHomeArtBoxes .f2').click(function() {
			jQuery('.fHomeArtBoxes .f1').removeClass('fActive');
			jQuery('.fHomeArtBoxes .f3').removeClass('fActive');
			jQuery('.fHomeArtBoxes .f2').addClass('fActive');
			jQuery('.fHomeArtItem').each(function() { jQuery(this).fadeOut(); });
			jQuery('.fHomeArtItem.f2').fadeIn();
		});
		jQuery('.fHomeArtBoxes .f3').click(function() {
			jQuery('.fHomeArtBoxes .f2').removeClass('fActive');
			jQuery('.fHomeArtBoxes .f1').removeClass('fActive');
			jQuery('.fHomeArtBoxes .f3').addClass('fActive');
			jQuery('.fHomeArtItem').each(function() { jQuery(this).fadeOut(); });
			jQuery('.fHomeArtItem.f3').fadeIn();
		});
		if(jQuery(window).width() < 1280) { jQuery('.fHomeArtBoxes .f1').trigger('click'); };
};

function fSee() {
	jQuery('a.fSeeCTA').click(function () {
		jQuery('.fMailModal').fadeIn('slow');
		jQuery('html, body').animate({
				scrollTop: jQuery( 'body').offset().top}, 10);
				event.preventDefault();
		event.preventDefault();
	});
	jQuery('.fMailClose').click(function () {
		jQuery('.fMailModal').fadeOut('slow');
		jQuery('html, body').animate({
				scrollTop: jQuery( '.fAddForm').offset().top}, 200);
				event.preventDefault();
	});
};

function fVideo() {
	jQuery('.fFilmCTA.f1').click(function() {
		jQuery('.fVideoModal.f1').addClass('fVideoModalActive');
		var fWidth = jQuery('.fVideoModal.f1').find('.video-container').width();
		jQuery('.fVideoModal.f1').find('iframe').css('width',fWidth).css('height','480px');
		jQuery('html, body').animate({
				scrollTop: jQuery( 'body').offset().top}, 10);
				event.preventDefault();
		event.preventDefault();
	});
	jQuery('.fFilmCTA.f2a').click(function() {
		jQuery('.fVideoModal.f2a').addClass('fVideoModalActive');
		jQuery('html, body').animate({
				scrollTop: jQuery( 'body').offset().top}, 10);
				event.preventDefault();
		event.preventDefault();
	});
	jQuery('.fFilmCTA.f2b').click(function() {
		jQuery('.fVideoModal.f2b').addClass('fVideoModalActive');
		jQuery('html, body').animate({
				scrollTop: jQuery( 'body').offset().top}, 10);
				event.preventDefault();
		event.preventDefault();
	});
	jQuery('.fFilmCTA.f2c').click(function() {
		jQuery('.fVideoModal.f2c').addClass('fVideoModalActive');
		jQuery('html, body').animate({
				scrollTop: jQuery( 'body').offset().top}, 10);
				event.preventDefault();
		event.preventDefault();
	});
	jQuery('.fVideoClose').click(function () {
		/*var $iframe = jQuery(this).parents('.fVideoModal').find('iframe');
        var src = $iframe.prop('src');
        $iframe.prop('src', '').prop('src', src.replace('?autoplay=1', ''));*/
		jQuery('.fVideoModal').removeClass('fVideoModalActive');
	});
};

function fModalUpdate() {
	jQuery('.fModalVidTitle').click(function() {
		var fCode = jQuery(this).attr('data-title');
		jQuery('.fVideoModal.f1').find('.video-container').html('<iframe width="800" height="440" src="https://youtube.com/embed/'+fCode+'?loop=1&playlist=<?php echo $fHeaderModSrc; ?>&controls=1" frameborder="0"  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
		jQuery('.fVideoModal.f1').find('iframe').css('width','100%');
	});

};

function fVideoLoop() {
	fWidth = jQuery('.fVideoLoopContainer').width();
	jQuery('.fVideoItem').each(function() {
		jQuery(this).css('width', 0.333 * fWidth);
	});
};

function fVideoLoop() {
	jQuery('.fVideoLoop').css('margin-left',0);
	var fWidth = jQuery('.fVideoSection').find('.fVideoLoopContainer').width();
	if(jQuery(window).width() < 768) {
		fWidth = fWidth / 1; fDiv = 1;
	} else if(jQuery(window).width() < 1249) {
		fWidth = fWidth / 2; fDiv = 2;
	} else {
		fWidth = fWidth / 3; fDiv = 3;	
	};
	var fLength = jQuery('.fVideoItem').length;
	console.log(fLength);
	var fNumber = -1 * (fLength - fDiv);
	console.log(fNumber);
	fWidth = parseInt(fWidth);
	fC = 0;
	jQuery('.fVideoItem').css('width',fWidth);
	jQuery('.fVideoNav.fR').click(function() {
		fMargin = jQuery('.fVideoLoop').css('margin-left');
		fMargin = parseInt(fMargin);
		if (fC > fNumber) {
			fMargin = fMargin - fWidth;
			jQuery('.fVideoLoop').css('margin-left',fMargin);
			fC = fC - 1;
		};
	});
	jQuery('.fVideoNav.fL').click(function() {
		fMargin = jQuery('.fVideoLoop').css('margin-left');
		fMargin = parseInt(fMargin);
		if (fC < 0) {
			fMargin = fMargin + fWidth;
			jQuery('.fVideoLoop').css('margin-left',fMargin);
			fC = fC + 1;
		};
	});
}


function fSliderDesc() {
		fDescH = jQuery('.fSliderDesc').height(); fDescH1 = parseInt(fDescH * -0.6);
		jQuery('.fSliderDesc').css('margin-top',fDescH1);
}

function fEpisodes() {
		jQuery('.fPlayButton').each(function() {
			jQuery(this).click(function() {
				jQuery(this).parents('.col-lg-4').find('.fEpPopup').fadeIn('slow');
				var fCode = jQuery(this).parents('.col-lg-4').find('.fEpPopup').find('.fEpCode').html();
				jQuery(this).parents('.col-lg-4').find('.fEpPopup').find('.fEpIframe').html('<iframe width="640" height="270" src="https://www.youtube.com/embed/'+fCode+'" title="Jesteśmy rodziną" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>');
			});
			jQuery('.fEpClose').click(function() {
				jQuery('.fEpPopup').find('.fEpIframe').html('');
				jQuery('.fEpPopup').fadeOut();
			});
			jQuery('.fEpPopup').on('click', function(e) {
				if (e.target == this)
					{ jQuery('.fEpPopup').find('.fEpIframe').html(''); jQuery(this).fadeOut(); }; 
			});		
		});
}
