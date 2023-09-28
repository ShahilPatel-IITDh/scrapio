
   /*change shop link to Norton*/
   $(".top-bar .main-link.icon-cart a").attr("href", "https://norton.com/products?om_ext_cid=bullguard_nortoncom-products-overview");
   $('.top-bar .main-link.icon-cart a').click(function(){
      this.target = "_blank";
   });
