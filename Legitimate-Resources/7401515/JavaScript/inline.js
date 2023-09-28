
        ana('init', 'rocket');

        var anaParams = {
            store_id: window.merchant.id,
            store_profile: 'store_v2',
            session_id: window.Yampi.cart_token
        }

                    var anaEvent = 'view-home';
        
        ana('event', anaEvent, anaParams);
    