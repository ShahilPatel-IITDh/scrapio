;(function( $, window, document, undefined ) {
    function TooltipWB( element, options ) {
        this.el      = element;
        this.$el     = $( element );
        this.options = $.extend( {}, $.fn.tooltipWB.defaults, options );

        return this.init();
    }

    TooltipWB.prototype = {

        init: function() {
            var self = this;

            self.$el.on( 'click', function( event ) {
                event.stopPropagation();
                if ( !self.options.bubbling ) { event.preventDefault(); }
                self.close();

                if ( self.options.url ) {
                    $.getJSON( "https://maps.googleapis.com/maps/api/geocode/json?address=" + self.$el.data( "tooltip" ).addr + "&key=AIzaSyCv8ksyuOhP0HtrQm5SzVHF6R5bs5PY1hk" ).done( function( data ) {
                        // $.getJSON( "https://maps.googleapis.com/maps/api/geocode/json?address=" + self.$el.data( "tooltip" ).addr + "&key=AIzaSyD539TcefQTr54EYSpw_0dA6hMlTPt7kWg" ).done( function( data ) {


                        if(window.matchMedia( "(max-width: 61.63rem)" ).matches  ) {
                            var options = {
                                center: data.results[0].geometry.location,
                                zoom: 15,
                                disableDefaultUI: true,
                                mapTypeId: 'roadmap'
                            }
                        } else {
                            var options = {
                                center: data.results[0].geometry.location,
                                zoom: 15,
                                mapTypeId: google.maps.MapTypeId.HYBRID
                            }
                        }
                        setTimeout( function() { self.display( options ); }, 200 );
                    })

                } else {
                    setTimeout( function() { self.display( self.$el.data( "tooltip" ) ); }, 200 );
                }
            });

            if ( self.$el.hasClass( "invalid" ) ) { self.$el.trigger( "click" ); }

        },

        display: function( data ) {
            var self = this;
            if ( !!self.options.nextTo ) {
                var top    = $( self.options.nextTo ).offset().top - 1;
                var width  = $( self.options.nextTo ).outerWidth( true ) + 1;
                var height = $( self.options.nextTo ).outerHeight() + 1;
                var left   = $( self.options.nextTo ).offset().left - 1;
            }
            var contenu;
            if ( typeof data === "string" ) {
                contenu = data.indexOf( "popup" ) >= 0 ? $( "#" + self.$el.data( "tooltip" ) ).html().replace( /{{ action }}/g, self.$el.data( "action" ) ) : "<div class='row mt40 mb40 mb20-sm'><div class='close hidden-lg hidden-md hidden-sm ffwi fs32-sm' style='z-index:12;' onclick='$(this).parent().parent().html(\"\");'>&#xe60e;</div><div class='col-lg-offset-1 col-lg-22 col-sm-offset-1 col-sm-22'>" + data + "</div></div>";
                if ( self.options.ticket ) { contenu = contenu.replace( /{{ ticket }}/g, self.$el.data( "ticket" ) ).replace( /{{ depart }}/g, self.$el.data( "depart" ) ) }
            } else if ( typeof data === "object" ) {
                contenu  = "<div class='row pt40 pb40 pt20-sm pb20-sm tooltip-sm'>";
                contenu += "	<div class='col-lg-offset-2 col-lg-20 col-sm-offset-0 col-sm-22 mt20-sm'>";
                contenu += "		<div class='fwb tup'>" + self.$el.data( "tooltip" ).name + "</div>";
                contenu += "		<div class='fs16-sm clrGrisCM'>" + self.$el.data( "tooltip" ).address + "</div>";
                contenu += "		<ul class='pb20 pb10-sm pl0-sm listNone-sm'>";

                for ( jour in self.$el.data( "tooltip" ).schedule ) {
                    contenu += "		<li><span class='sday in-block'>" + jour + "</span> <span class='fwb pl20-sm'>" + self.$el.data( "tooltip" ).schedule[jour] + "</span></li>";
                }

                contenu += "		</ul>";
                contenu += "	</div>";
                contenu += "</div>";
                contenu += "<br class='clear'>";
                contenu += "<div id='maps' class='fullW mb25-sm'></div>";
            } else if ( typeof data === "undefined" ) {
                return;
            }

            var template = $( self.template( contenu ) );

            console.log(self, self.options, self.options.nextTo)

            if ( !!self.options.nextTo ) {
                if(window.matchMedia( "(max-device-width: 46.875rem)" ).matches && (self.$el.parent().next(".map-sm").length > 0 || self.$el.siblings(".tooltip-retrait-sm").length > 0 || typeof self.$el.parent().nextAll(".tooltip-payment-sm")[0] != "undefined")
                ) {
                    var to_close = false;
                    if(typeof self.$el.parent().nextAll(".tooltip-payment-sm")[0] != "undefined"){
                        if($(self.$el.parent().nextAll(".tooltip-payment-sm")[0]).html() != "") to_close = true;
                    }else{

                        if(self.$el.parent().next(".map-sm").length > 0 ){
                            if(self.$el.parent().next(".map-sm").html() != "") to_close = true;
                        }
                        else{
                            if( self.$el.siblings(".tooltip-retrait-sm").html() != "") to_close = true;
                        }

                    }


                    $(".map-sm").html("");
                    if(to_close){
                        self.$el.parent().next(".map-sm").html("");
                        self.$el.siblings(".tooltip-retrait-sm").html("");
                        $(self.$el.parent().nextAll(".tooltip-payment-sm")[0]).html("");
                    }else{
                        if(typeof self.$el.parent().nextAll(".tooltip-payment-sm")[0] != "undefined"){
                            $(self.$el.parent().nextAll(".tooltip-payment-sm")[0]).html(contenu);
                        }else{
                            if(self.$el.parent().next(".map-sm").length > 0 )
                                self.$el.parent().next(".map-sm").html(contenu);
                            else
                                // self.$el.siblings(".tooltip-retrait-sm").html(contenu);
                                $(".tooltip-info").html(contenu);

                        }
                    }

                }
                else{
                    if(window.matchMedia( "(max-device-width: 46.875rem)" ).matches ){
                        tooltip($(template).get(0).innerHTML);
                    }else{

                        if($("#fancy-popup").length == 0){
                            $("body").after("<div id='fancy-popup'><span class='clrNoir close cp ffwi' onclick='$.fancybox.close()'>&#xe60e;</span><div></div></div>");
                        }

                        $('#fancy-popup>div').html(contenu);
                        $.fancybox({
                            'autoScale': true,
                            'minWidth':450,
                            'maxWidth':800,
                            'autoDimensions': true,
                            'centerOnScroll': true,
                            'href' : "#fancy-popup",
                            'closeBtn':false
                        })
                    }


                }

                template.css({ top: top + "px", left: left + "px", width: width + "px", height: height + "px" });
                template.addClass('p10');

            } else {
                $( "body" ).append( template.addClass( "centered" ) );

                if ( !!self.options.avatar ) {
                    cropAvatar();
                }

                if ( !!self.options.scrollEnd ) {
                }
            }

            if ( typeof data === "object" ) {
                var carte = new google.maps.Map( document.getElementById( "maps" ), data );
                var marker = new google.maps.Marker({
                    position: data.center,
                    title: self.$el.data( "tooltip" ).name,
                    map: carte
                });
            }

            var arrowTop = ( self.$el.offset().top ) + ( ( self.$el.outerHeight( true ) - $( ".arrow" ).outerHeight( true ) ) / 2 ) - top;
            $( ".arrow" ).css({ top: arrowTop + "px" });


            $( document ).on( "click", "#tooltip .close", function() {
                self.close();
                $(".fade-screen").remove();
            });
            $(".fade-screen").on("click", function(){
                $( "#tooltip" ).remove();
            });

            if ( self.$el.hasClass( "invalid" ) ) {
                validateForm( template.find( ".fast-account form" )[0] );
            }

            if ( $( "select[name=country]" ).length ) {
                autofillCity( $( "select[name=country]" ).val() );

                $( "select[name=country]" ).on( "change", function() { autofillCity( $( this ).val() ); });
            }
        },

        close: function() {
            while($( "#tooltip" ).length > 0)
                $( "#tooltip" ).remove();
            $( "#fade" ).hide();
        },

        template: function( infos ) {
            var self = this;
            self.tpl = $( "#tooltip-bubble" ).html();
            self.tpl = self.tpl.replace( /{{ content }}/g, infos );
            // console.log(self.tpl);
            return self.tpl;
        },

        destroy: function() { this.$el.removeData(); }
    };

    $.fn.tooltipWB = function( options ) {
        return this.each(function() {
            if ( !$.data( this, 'tooltipWB' ) ) { $.data( this, 'tooltipWB', new TooltipWB( this, options ) ); }
        });
    };

    $.fn.tooltipWB.defaults = { url: false, nextTo: false, avatar: false, ticket: false, bubbling: true, scrollEnd: false };

})( jQuery, window, document );