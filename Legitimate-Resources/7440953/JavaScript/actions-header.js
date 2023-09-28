$(window).on("load resize",function(e){
  if ($(window).width() <= 1080) {
    $('.header01').addClass('mobile-header');
    $('.header01').removeClass('desk');
    $('.header01').removeClass('no-fixed');
    $('.header01').removeClass('fixed-header');
  }
  else if ($(window).width() > 1080) {
    $('.header01').addClass('desk');
    $('.header01').addClass('no-fixed');
    $('.header01').removeClass('mobile-header');
    $('.open-menu').removeClass('menu-activo');
    $('.submenu-movil-list').removeAttr("style");
    $('.nuevo-login_header').hide();
  }
});

$(document).ready(function($) {
// ABRE EL BUSCADOR MOVIL
  $(".buscador-movil").click(function(){
    $(".buscador-movil-contenedor").slideToggle();
  });

// ABRE EL MENU HAMBURGUESA
  $('#menuHamburguesa').click(function(){
    $(this).toggleClass('open');
    $(this).stop();
  });
  $('#menuHamburguesa').on("click", function(){
      $('.menu').slideToggle('slow');
  });
// ABRE EL MENU HAMBURGUESA fin


// ROTA LAS FLECHAS
$(".arrow").click(function () {
    $(this).toggleClass('rotate');
})
// ROTA LAS FLECHAS fin

//ABRIR LOS MENUS DEL MENU MOVIL
  $("body").on("click", ".mobile-header .navigation .open-menu p", function(event){
    event.preventDefault();
    $(this).parent('.open-menu').toggleClass("menu-activo");
    $(this).parent('.open-menu').siblings('li').removeClass("menu-activo");
  });
  $("body").on("click", ".mobile-header .menu #menuSimula p", function(event){
    event.preventDefault();
    $(this).parent('.open-menu').toggleClass("menu-activo");
    $(this).parent('.open-menu').siblings('li').removeClass("menu-activo");
  });
  $("body").on("click", ".mobile-header .menu #menuTransacciones p", function(event){
    event.preventDefault();
    $(this).parent('.open-menu').toggleClass("menu-activo");
    $(this).parent('.open-menu').siblings('li').removeClass("menu-activo");
  });
//ABRIR LOS MENUS DEL MENU MOVIL fin



//ABRE LOS ULTIMOS MENUS DEL MENU MOVIL
  $("body").on("click", ".mobile-header .list h3", function(event){
    event.preventDefault();
    $(this).parent('.list').toggleClass("menu-activo");
    $(this).parent('.list').siblings('.list').removeClass("menu-activo");
  });



// FIXED HEADER
  $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      if (scroll >= 50) {
        $('.header01').addClass('fixed-header');
        $('.header01').removeClass('no-fixed');
      } else if(scroll < 50){
        $('.header01').removeClass('fixed-header');
        $('.header01').addClass('no-fixed');
      }
  });


  // FUNCIONES DEL MENU ESCRITORIO
  $("body").on("mouseenter", ".header01 .open-menu", function(){
        $(this).children('.dropdown').addClass('active');
      });
    $("body").on("mouseleave", ".header01 .open-menu", function(){
        $(this).children('.dropdown').removeClass('active');
    });


 $('.paraEmpresasMenu').on("click", function(){
      $('.subMenuEmpresas').slideToggle('slow');
  });
   $('.paraPersonasMenu').on("click", function(){
        $('.subMenuPersonas').slideToggle('slow');
    });

// ABRE PB EN MOVIL
 $('.candado').on("click", function(){
      $('.nuevo-login_header').slideToggle('slow');
  });


   $('.candado02').on("click", function(){
        $('.nuevo-login').slideToggle('slow');
    });
// ABRE PB EN MOVIL fin


});

$(".open-menu i").click(function () {
    $(this).toggleClass("down");
})

// BUSCADOR
$(function() {
  var win = $(window);
  resizeHandler();
  win.resize(resizeHandler);
  function resizeHandler() {
    if (win.width() <= 1080) {
      $('.flagOculto').css("display","none");
      if ($('.buscador-movil-contenedor').children().length == 0)
         $('.buscador').appendTo( $( ".buscador-movil-contenedor"));
         $('.buscador').removeClass('oculto-movil');
         // $('.asd').appendTo( $( ".buscador-movil-contenedor"));
    }else{
      $('.flagOculto').css("display","block");
      $('.buscador').appendTo( $(".utility-bar01"));
      $('.buscador').addClass('oculto-movil');
      $('.asd').appendTo( $(".utility-bar01"));
    }
  }
});
