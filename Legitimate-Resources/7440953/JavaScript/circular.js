
jQuery(document).ready(function($){
   $.ajax({
    type: "GET" ,
    url: "/banco-de-occidente/circular-028/datos.xml" ,
    dataType: "xml" ,
    success: function(xml) {

    //var xmlDoc = $.parseXML( xml );   <------------------this line
    //if single item
    var estado = $(xml).find('estado').text();
    var titulo = $(xml).find('titulo').text();
    var parrafo = $(xml).find('parrafo').text();
    var link = $(xml).find('link').text();
    var textoeventos = $(xml).find('textoeventos').text();
    var textomantenimiento = $(xml).find('textomantenimiento').text();



    if (estado == 'activo') {
        $('.popup-nuevo-028').fadeIn(350);
        $('.titulo-popup-028').text(titulo)
        $('.texto-popup-028').text(parrafo)
        $('.link-popup-028').attr('href', link)
        $('.texto-eventos').text(textoeventos)
        $('.texto-mantenimientos').text(textomantenimiento)
    }else{
        console.log(".");

    }


    }
})
   .done(function() {
    console.log( "success" );
  })
  .fail(function() {
    console.log( "error" );
    //fallback en caso de que no sea posible cargar de
    //manera correcta el xml
    $('.texto-eventos').html('En este momento todos nuestros canales estÃ¡n disponibles y se encuentran funcionando con normalidad.')
    $('.texto-mantenimientos').html('En este momento no hay mantenimientos programados.')
  })
  .always(function() {
    console.log( "complete" );
  });
});
