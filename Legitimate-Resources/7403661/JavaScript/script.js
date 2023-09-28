var saveUtmx = "";

var linksWithRedirectKeyInHref = document.querySelectorAll('a[href*="'+redirectKey+'"]');
var inputTarget = document.querySelectorAll('input[name="target"]');

function runAds(utmx){
    setCookie('uri',utmx, 30 );
    saveUtmx = utmx;
    utmx = 'uri'+utmx;



    // jQuery('a[href*="'+redirectKey+'"]').attr('href', function(i, h) {
    //     return h + "&uri="+utmx;
    // });
    addParemeterToHrefInTheLinksList(linksWithRedirectKeyInHref, function(h){
        return  h + "&uri="+utmx;
    } );

    // jQuery('input[name="target"]').val(function(index,currentvalue){return currentvalue+"$uri="+utmx;});
    addParemeterToValueInTheInputList(inputTarget, function(h){
        return  h + "&uri="+utmx;
    } );


}