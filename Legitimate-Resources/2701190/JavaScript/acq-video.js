
   $(document).ready(function () {
        /* Media Buying - Entry Popup Script */
        $(window).on("load", function () {
            var rlFlag_arr = rlFlag.split("");
            if (rlFlag_arr[3] == "1") {
                switch (rlLang) {
                    case "de":
                        alert('Spielen Sie die besten Online Casino Spiele bei 888Casino!\nSehen Sie unten Ihr Bonus Angebot');
                        break;
                    case "sv":
                        alert('Spela de bästa kasino-spelen online hos 888Casino!\nTitta på ditt bonuserbjudande nedan');
                        break;
                    default:
                        alert('Play the best online Casino games with 888Casino!\nCheck out your Bonus Offer below');
                }
            }
        });
        /* END - Media Buying - Exit Popup Script */
        /*
        //disclaimer visabilty
        ///////////////////////////////////
        function disclaimerVisibility() {
        if (ScrollHeight >= headerAndOfferHeight || ScrollHeight >= contentHeight) {
        stickyDisclaimer.addClass('floating');
        }
        else {   
        stickyDisclaimer.removeClass('floating');
        }
        }
        ///////////////////////////////////
        var offerHeight = $(".acq-offer-background").innerHeight(),
        headerHeight = $(".show-header").innerHeight(),
        stickyDisclaimer = $('.acq-sticky-disclaimer'),
        disclaimerHeight = $('.acq-sticky-disclaimer > *').innerHeight(),
        contentHeight = $('.page-wraper').innerHeight() - $(window).innerHeight(),
        pagePaddingBottom = disclaimerHeight,
        headerAndOfferHeight = offerHeight + headerHeight,
        ScrollHeight =$(window).scrollTop();

        //give the boddy padding
        $("body").css('padding-bottom' ,  pagePaddingBottom );

        //check if the page have no scroll
        function checkDocHeight() {
        if ($('.page-wraper').innerHeight()< $(window).innerHeight()){
        stickyDisclaimer.addClass('floating');
        }
        else {   
        stickyDisclaimer.removeClass('floating');
        }
        }
        checkDocHeight();

        $(window).resize(function(){
        pagePaddingBottom = $('.acq-sticky-disclaimer > *').innerHeight();
        $("body").css('padding-bottom' ,  pagePaddingBottom );	
        checkDocHeight();	
        });

        $(window).scroll(function(){
        ScrollHeight =$(window).scrollTop();
        disclaimerVisibility();
        });

        });
        ///////////////////////////////////////////////////////////////////
        */


        var disclaimerHeight = $('.acq-sticky-disclaimer > *').innerHeight();
        $("body").css('padding-bottom' ,  disclaimerHeight );

        window.onload = runOnload;
        function runOnload() {
            assignPopup();
        }
        function assignPopup() {
            if (typeof document.getElementsByClassName('toggle-link')[0] != "undefined") {
                var togleLink = document.getElementsByClassName('toggle-link')[0],
        togleLinkSpan = togleLink.getElementsByTagName('SPAN')[0],
        togleBlock = document.getElementsByClassName('toggle-container')[0],
        vShow = false;

                togleLink.onclick = function () {
                    if (vShow) {
                        togleBlock.className = "toggle-container";
                        togleLinkSpan.innerHTML = "+";
                        vShow = false;
                    } else {
                        togleBlock.className = "toggle-container show";
                        togleLinkSpan.innerHTML = "-";
                        vShow = true;
                    }
                    return false;
                };

                $(".TnCsLink").click(function () {
                    togleBlock.className = "toggle-container show";
                    togleLinkSpan.innerHTML = "-";
                    vShow = true;
                });
            }
        }    
    });

   var lockDisclaimerRevealed = false;
function disclaimerSettings() {
    var isMobile = ( /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone/i.test( navigator.userAgent ) ) ? true : false;
    var scrollHeight,
		disclaimerContent,
		isDisclaimer = $( ".disclaimer" ).length;

    if ( isDisclaimer > 0 ) {
        setPaddingBottomForDisclaimer( "open" );

        $( ".disclaimer" ).prepend( "<div class='discplamerArrowUp' /></div>" );
        $( ".disclaimer" ).prepend( "<div class='discplamerArrowDown' /></div>" );

        $( window ).scroll( function () {
            if ( window.innerWidth < 1280 ||  isMobile ) {
                setArrowsToDisclaimer ();
            } else {
                 hideArrows();
            }
        } );

        $( window ).resize( function () {
            if (  window.innerWidth < 1280 || isMobile ) {
                setArrowsToDisclaimer ();
            } else {
                 hideArrows();
            }
        } );

        $( ".disclaimer" ).off( "click" )

        $( ".discplamerArrowUp" ).click( function () {
            showDisclaimer();
            lockDisclaimerRevealed = false;
        } );

        $( ".discplamerArrowDown" ).click( function () {
            hideDisclaimer();
            lockDisclaimerRevealed = true;
        } );
    } else {
        hideArrows();
    }
}

function setArrowsToDisclaimer (){
    scrollHeight = $( window ).scrollTop();
    if ( scrollHeight > 0 && lockDisclaimerRevealed == false ) {
        showDisclaimer();
    } else if ( scrollHeight == 0 ) {
         hideDisclaimer();
     }
}
function hideArrows() {
     $( ".discplamerArrowUp" ).css( "display", "none" );
     $( ".discplamerArrowDown" ).css( "display", "none" );
}
function showDisclaimer() {
     $( ".acq-sticky-disclaimer" ).addClass( "floating" );
     $( ".discplamerArrowUp" ).css( "display", "none" );
     $( ".discplamerArrowDown" ).css( "display", "block" );
     setPaddingBottomForDisclaimer( "open" );
}
function hideDisclaimer() {
     $( ".acq-sticky-disclaimer" ).removeClass( "floating" );
     $( ".discplamerArrowUp" ).css( "display", "block" );
     $( ".discplamerArrowDown" ).css( "display", "none" );
     setPaddingBottomForDisclaimer( "closed" );
}
function setPaddingBottomForDisclaimer( disclaimerState ) {
    var disclaimerHeight = 0;
    disclaimerState = disclaimerState || "";

    if ( disclaimerState == "open" ) {
        disclaimerHeight = $( ".disclaimer" ).height() + 40;
    } else if ( disclaimerState == "closed" ) {
        disclaimerHeight = 50;
    }

    $( "body > .page-wraper" ).css( "padding-bottom", disclaimerHeight );
}


$(document).ready( function () {
    disclaimerSettings();
    $( window ).resize();
    $( ".disclaimer a" ).attr( "target", "_blank" );


	$( ".disclaimer .TnCsLink" ).off( "click.toToTerms" ).on( "click.toToTerms", function( event ) {
		var $termsTitle = $( ".showHideTermAndCond" );
		if ( !$termsTitle.length ) {
			$termsTitle = $( ".acq-tnc" );
		}
		if ( $termsTitle.length ) {
			getTermsTop = parseInt( $termsTitle.offset().top ) - 10;
			findHeader = $( ".top-header" ).length;
			if ( findHeader > 0 ) {
				getHeaderHeight = parseInt( $( ".top-header" ).height() );
				finalPos = getTermsTop - getHeaderHeight - 10;
			} else {
				finalPos = getTermsTop - 10;
			}
			$( ".slidingDiv" ).css( "display", "block" );
			$( ".plusMinus" ).text( "[-]" );
			$( 'html,body' ).animate( {
				scrollTop: finalPos + "px"
			}, 500 );
		}
	} );




} );

   $(document).ready(function () {
    if(window.location.href.indexOf("/media/") > -1) {
       SD_CLIENTS["888casino"].register.url="/register-mb/?dl={LOCATION}{SPECIFIC}{FORCEWEPAPP}{GAME}";
    }
});
      