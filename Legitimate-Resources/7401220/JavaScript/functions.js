// jQuery(document).ready(function () {
//     jQuery("#download_image").click(function ($) {
//         console.log('entree');
//         console.log(jQuery("#download_image").val())
//         jQuery.ajax({
//             async: true,
//             type: 'GET',
//             contentType: "application/json; charset=utf-8",
//             datatype: "json",
//             url: jQuery(location).attr('origin') + '/wp-admin/admin-post.php',
//             data: {
//                 "action": "download_image",
//                 "image_id": jQuery("#image_id").val(),
//                 "manage":'register_js'
//             },
//             beforeSend: function () {
//                 jQuery("#print_image").html('');
//             },
//             complete: function (data) {
//                 // console.log(data)
//                 // jQuery('#print_image').html(data.responseText)
//                 jQuery('#print_image').html('ok')
//             },
//         })
//     });
// })

jQuery('.carousel.carousel-multi-item.v-2 .carousel-item').each(function () {
    var next = jQuery(this).next();
    if (!next.length) {
        next = jQuery(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo(jQuery(this));

    for (var i = 0; i < 4; i++) {
        next = next.next();
        if (!next.length) {
            next = jQuery(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo(jQuery(this));
    }
});

/**
  @license html2canvas v0.34 <http://html2canvas.hertzen.com>
  Copyright (c) 2011 Niklas von Hertzen. All rights reserved.
  http://www.twitter.com/niklasvh

  Released under MIT License
 */
/*
 * jQuery helper plugin for examples and tests
 */
// (function( $ ){
//     $.fn.html2canvas = function(options) {
//         if (options && options.profile && window.console && window.console.profile) {
//             console.profile();
//         }
//         var date = new Date(),
//         html2obj,
//         $message = null,
//         timeoutTimer = false,
//         timer = date.getTime();
//         options = options || {};

//         options.onrendered = options.onrendered || function( canvas ) {
//             var $canvas = $(canvas),
//             finishTime = new Date();

//             if (options && options.profile && window.console && window.console.profileEnd) {
//                 console.profileEnd();
//             }
//             $canvas.css({
//                 position: 'absolute',
//                 left: 0,
//                 top: 0
//             }).appendTo(document.body);
//             $canvas.siblings().toggle();

//             $(window).click(function(){
//                 $canvas.toggle().siblings().toggle();
//                 throwMessage("Canvas Render " + ($canvas.is(':visible') ? "visible" : "hidden"));
//             });
//             throwMessage('Screenshot created in '+ ((finishTime.getTime()-timer)) + " ms<br />",4000);

//             // test if canvas is read-able
//             try {
//                 $canvas[0].toDataURL();
//             } catch(e) {
//                 if ($canvas[0].nodeName.toLowerCase() === "canvas") {
//                     // TODO, maybe add a bit less offensive way to present this, but still something that can easily be noticed
//                     alert("Canvas is tainted, unable to read data");
//                 }
//             }
//         };

//         html2obj = html2canvas(this, options);

//         function throwMessage(msg,duration){
//             window.clearTimeout(timeoutTimer);
//             timeoutTimer = window.setTimeout(function(){
//                 $message.fadeOut(function(){
//                     $message.remove();
//                     $message = null;
//                 });
//             },duration || 2000);
//             if ($message)
//                 $message.remove();
//             $message = $('<div />').html(msg).css({
//                 margin:0,
//                 padding:10,
//                 background: "#000",
//                 opacity:0.7,
//                 position:"fixed",
//                 top:10,
//                 right:10,
//                 fontFamily: 'Tahoma',
//                 color:'#fff',
//                 fontSize:12,
//                 borderRadius:12,
//                 width:'auto',
//                 height:'auto',
//                 textAlign:'center',
//                 textDecoration:'none',
//                 display:'none'
//             }).appendTo(document.body).fadeIn();
//             html2obj.log(msg);
//         }
//     };
// })( jQuery );


jQuery(document).ready(function () {
    jQuery("#cat_slug").change(function ($) {
        console.log('asdasdsdlunasn');
        console.log(jQuery("#cat_slug"));
        jQuery.ajax({
            async: true,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            url: jQuery(location).attr('origin') + '/wp-admin/admin-post.php',
            data: {
                "action": "get_product_arr",
                "id_cat": jQuery("#cat_slug").val(),
                "manage":'get_product_arr_share'
            },
            beforeSend: function () {
                jQuery("#products").html('cargando...');
                // console.log('loading...')
            },
            complete: function (data) {
                console.log(data.responseText)
                jQuery('#products').html(data.responseText)
                // jQuery('#print_image').html('ok')
            },
        })
    });
})