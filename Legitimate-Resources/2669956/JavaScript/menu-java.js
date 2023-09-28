
	 $(".custom_load *").click(function() {
        return (false);
    });

	 $(document).ready(function() {
                $('.province path').click(function() {
                    var province = $(this).attr('class');
                    var provinceName = $(this).attr('data-title');
                 	$('.province path').attr('data-active','');
					$(this).attr('data-active','active');
                });			
	 
	 
	 $("#menu-risponsive").prepend('<span class="fa fa-close" id="menu-close"></span> <h1> منوی سایت </h1>');
     $tci = 1;
				$("#lay").click(function() {
					if($(".null").html()==null){
						$("#lay").hide();
                    $(".img").fadeOut("fast");
                    $(this).fadeOut("fast");
                    $("#tag").attr("autoplay","");
				}
                });
					
            $(".main-menu li.menu-item-has-children span.sub-arrow").click(function() {
                if($(this).text()=="+"){
                    $(this).addClass("rotatee");
                    $(this).text("-");
                }else if($(this).text()=="-"){
                    $(this).removeClass("rotatee");
                    $(this).text("+");
                }

            });


            $("	#menu-risponsive li ul").hide();
     $("#menu-risponsive li.menu-item-has-children").prepend("<span class='arrow-nav-c'><i class='fa fa-angle-down' aria-hidden='true'></i></div>");
            $("#menu-risponsive li.menu-item-has-children span.arrow-nav-c").click(function() {
                $(this).next("a").next("ul").slideToggle('fast');
                if($(this).children("i").hasClass("fa-plus")){
                    $(this).children("i").removeClass("fa-plus");
                    $(this).children("i").addClass("fa-minus");
                }else{
                    $(this).children("i").addClass("fa-plus");
                    $(this).children("i").removeClass("fa-minus");
                }
            });
            $("#menu-close").click(function() {
				$(".bg-null").fadeOut("fast");
                    $("#menu-risponsive").toggleClass("menu-hidden");
                });
				$(".bg-null").click(function() {
				$(this).fadeOut("fast");
                    $("#menu-risponsive").toggleClass("menu-hidden");
                });
				$(".navbar-c-toggle").click(function() {
				$(".bg-null").fadeIn("fast");
                   $("#menu-risponsive").toggleClass("menu-hidden");

                });


				$(".res-select-menu").change(function() {
                    window.location.href=$(this).val();
                });
				
		   });

var xx = $(".main-menu .navbar-c-toggle").offset();

$(window).scrol(function(){
    if($(this).scrollTo() > xx.top){
        $(".main-menu .navbar-c-toggle").addClass("fixednav");
    }else{
        $(".main-menu .navbar-c-toggle").removeClass("fixednav");
    }

    
});
