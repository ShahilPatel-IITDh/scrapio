
    $(document).ready(function(){
        
        $("#bannersliders").owlCarousel({
            navigation:false, pagination:false, autoPlay:3000, items:1, itemsDesktop:[1199,1], itemsDesktopSmall:[979,1], itemsTablet:[768,1], itemsMobile:[479,1]
        });

        $("#brandsliders").owlCarousel({
            navigation:false, pagination:false, autoPlay:3000, items:6, itemsDesktop:[1199,5], itemsDesktopSmall:[979,4], itemsTablet:[768,3], itemsMobile:[479,2]
        });

    });
    