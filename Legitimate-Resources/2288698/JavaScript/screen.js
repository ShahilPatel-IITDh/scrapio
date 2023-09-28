if ($(window).width() < 768) {
//alert('IPHONE');
var device = "small";
}

else if ($(window).width() < 768 || $(window).width() > 992 &&  $(window).width() <= 1024) {
//alert('IPAD');
var device = "medium";
}

else if ($(window).width() > 992 &&  $(window).width() <= 1200) {
//alert('BIG');
var device = "big";
}

else  {
//alert('ELSE');
var device = "else";
}