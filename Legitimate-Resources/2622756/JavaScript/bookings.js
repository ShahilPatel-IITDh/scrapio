jQuery(document).ready(function() {

    function update_room_dropdowns(rooms) {

        var $nth_value;

        // convert rooms to an Int
        rooms =  parseInt(rooms);

        // return if rooms are 10, we want to show a message!
        if(rooms == 10) {
            return false;
        }

        // hide unwanted room dropdowns
        $nth_value = rooms + 1;
        jQuery('.room-details:nth-child(n+' + $nth_value +')').remove();

        var room_no = jQuery('.room-details').length + 1;
        var room_html = '';
        while(room_no <= rooms) {
            // get the room_html
            room_html = jQuery('.room-details:first').html();

            // update the label
            room_html = room_html.replace('Room 1', 'Room ' + room_no);

            // update the adults key reference
            room_html = room_html.replace('adults[1]', 'adults[' + room_no + ']');

            // update the children key reference
            room_html = room_html.replace('children[1]', 'children[' + room_no + ']');

            // update the infants key reference
            room_html = room_html.replace('infants[1]', 'infants[' + room_no + ']');

            room_html = '<div class=room-details>' + room_html + '</div>';

            jQuery('.room-details:last').after(room_html);

            room_no++;

        }

    }

    var original_booking_hotel_options = $('#booking_hotel').html();

    // Check the hotels dropdown for current location
    function check_booking_hotels() {
        var city = jQuery('#booking_city').val();
        jQuery('#booking_hotel').html(original_booking_hotel_options);
        if (city) {
            var counter = 1;

            jQuery('#booking_hotel option').each(function (index, value) {
                var hotel = jQuery(this);
                if (hotel.attr('data-city') != city) {
                    hotel.remove();
                } else if (index == 0) {
                    hotel.prop("selected", true);
                }
            });
        }
    }


    // Search dropdown
    if ( jQuery('#booking_city').length && jQuery('#booking_hotel').length ) {

        // Default filter
        if ( jQuery('#booking_city').val() !== "" ) {
            check_booking_hotels();
        } else {
            if ( jQuery('#booking_hotel').val() !== "" ) {
                var city = jQuery('#booking_hotel option:selected').attr('data-city') ;
                if ( city ) {
                    jQuery('#booking_city option[value="'+city+'"]').prop("selected", true);
                    jQuery('#booking_hotel option').each(function (index, value) {
                        var hotel = jQuery(this);
                        if (hotel.attr('data-city') != city) {
                            hotel.remove();
                        } else if (index == 0) {
                            hotel.prop("selected", true);
                        }
                    });
                }
            }
        }

        jQuery('#booking_city').on('change', function() {
            check_booking_hotels();

            /**
             * IE11 Bug Resolution
             * The below code fixes an IE11 issue where an incorrect validation message appears to the end user
             * when there is only one hotel at a chosen location.
             * Do not remove.
             * @author Dave
             */
            value_set = jQuery('#booking_hotel').val();
            jQuery('#booking_hotel').val(null);
            jQuery('#booking_hotel').val(value_set);
            /**
             * End of IE11 Bug Resolution
             */
            jQuery('#booking_hotel').trigger('change');
        });

        jQuery('#booking_hotel').on('change', function() {
            var cityId = jQuery('#booking_hotel option:selected').attr('data-city');

            if ( cityId ) {
                jQuery('#booking_city option[value="'+cityId+'"]').prop("selected", true);
            } else {
                jQuery('#booking_hotel option').show();
            }
            var hotelsInCity = jQuery('#booking_hotel').children().filter(function (i, hotel) {
                return jQuery(hotel).attr('data-city') == cityId;
            });

            var form = jQuery('#bookingEngineForm');
            if (hotelsInCity.length == 1) {
                form.attr('action', form.attr('data-rates-room'));
            } else {
                form.attr('action', form.attr('data-city-search'));
            }
        });

        jQuery('#rooms').on('change', function() {
            update_room_dropdowns(jQuery(this).val());
        });

        jQuery('.arrival-datepicker').on('change', function() {

            // get the value from the datepicker
            date_val = jQuery(this).val();

            date_val = date_val.split('-');

            // set the value of the hidden arrival element with the value of the date formatted.
            jQuery('[name=arrival]').val(date_val[2] + '-' + date_val[1] + '-' + date_val[0]);
        });

        jQuery('#rooms').trigger('change');
    }

    if(jQuery('.arrival-datepicker').length > 0 && jQuery('.arrival-datepicker').val() === '') {
        var todaysDate = new Date();
        var date = ('0'+ todaysDate.getDate()).slice(-2) + '-' + ('0'+ todaysDate.getMonth()+1).slice(-2) + '-' + todaysDate.getFullYear();
        $('.arrival-datepicker').val(date);
        $('.arrival-datepicker').trigger('change');
    }

});
//# sourceMappingURL=booking.js.map
