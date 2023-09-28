// JavaScript Document
  function Solo_Numeros(evt,objeto,longitud) {
      var lb_Resultado = false;  
      evt = (evt) ? evt : event;
      var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
      if (charCode > 47 && charCode < 58) { lb_Resultado = true; }
      if (longitud != undefined) { if ((objeto.value.length + 1) > longitud) { lb_Resultado = false; } }
      // SIEMPRE PERMITIR EL BACKSPACE
      if (charCode == 8) { lb_Resultado = true; }
      // SIEMPRE PERMITIR EL ENTER
      if (charCode == 13) { lb_Resultado = false; objeto.blur(); }
      // ELIMINAR LOS CEROS INICIALES
      objeto.value = objeto.value.replace(/^0/g,'');
      
      return lb_Resultado;
  }

  function Solo_Cifras(evt,objeto,longitud) {
      var lb_Resultado = false;  
      evt = (evt) ? evt : event;
      var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));
      if ((charCode > 47 && charCode < 58) || (charCode == 45 || charCode == 46 || charCode == 36 || charCode == 39)) { lb_Resultado = true; }
      if (longitud != undefined) { if ((objeto.value.length + 1) > longitud) { lb_Resultado = false; } }
      // Siempre permitir el backspace
      if (charCode == 8) { lb_Resultado = true; }
      return lb_Resultado;
  }

  // 35 (#) 36 ($) 45 (-) 46 (.) 8 (Backspace)
  function Solo_Letras(evt,objeto,longitud) {
      var lb_Resultado = false; 
      evt = (evt) ? evt : event;
      var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));

      if (charCode > 96 && charCode < 123)  { lb_Resultado = true; }
      if (charCode > 64 && charCode < 91)   { lb_Resultado = true; }
      if (charCode > 159 && charCode > 166) { lb_Resultado = true; }
      if (charCode == 130 || charCode == 32 || charCode == 35 || charCode == 45 || charCode == 46) { lb_Resultado = true; }
      
      if (longitud != undefined) { if ((objeto.value.length + 1) > longitud) { lb_Resultado = false; } }
      // Siempre permitir el backspace
      if (charCode == 8) { lb_Resultado = true; }
      return lb_Resultado;
  }  

  function Solo_Numero_Letras(evt,objeto,longitud) {
      var lb_Resultado = false; 
      evt = (evt) ? evt : event;
      var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode : ((evt.which) ? evt.which : 0));

      if (charCode > 96 && charCode < 123)  { lb_Resultado = true; }
      if (charCode > 64 && charCode < 91)   { lb_Resultado = true; }
      if (charCode > 47 && charCode < 58)   { lb_Resultado = true; }
      if (charCode == 45)                   { lb_Resultado = true; }

      if (longitud != undefined) { if ((objeto.value.length + 1) > longitud) { lb_Resultado = false; } }
      // Siempre permitir el backspace
      if (charCode == 8) { lb_Resultado = true; }
      return lb_Resultado;
  }  

  function Asignar_Evento_Validacion(lc_Nombre,lc_Evento,lc_Validacion,li_Longitud) {
      var la_Objetos         = document.getElementsByName(lc_Nombre);
      var li_Total_Objetos  = la_Objetos.length;
      
      for (li_Objeto = 0; li_Objeto < li_Total_Objetos; li_Objeto++) {
          var lo_Objeto = la_Objetos[li_Objeto];
          switch (lc_Validacion) {
              case 'numeros' :  if (String(li_Longitud) != 'undefined') {
                                    eval('lo_Objeto.' + lc_Evento + ' = function (e) { return Solo_Numeros(e,this,li_Longitud); }');
                                } else {
                                    eval('lo_Objeto.' + lc_Evento + ' = function (e) { return Solo_Numeros(e,this); }');
                                }
                                break;
              case 'letras'  :  if (String(li_Longitud) != 'undefined') {
                                    eval('lo_Objeto.' + lc_Evento + ' = function (e) { return Solo_Letras(e,this,li_Longitud); }');
                                } else {
                                    eval('lo_Objeto.' + lc_Evento + ' = function (e) { return Solo_Letras(e,this); }');
                                }
                                break;
              case 'cifras'  :  if (String(li_Longitud) != 'undefined') {
                                    eval('lo_Objeto.' + lc_Evento + ' = function (e) { return Solo_Cifras(e,this,li_Longitud); }');
                                } else {
                                    eval('lo_Objeto.' + lc_Evento + ' = function (e) { return Solo_Cifras(e,this); }');
                                }
                                break;
          }
      }
  }
  
  function Asignar_Evento_Objeto(lc_Nombre,lc_Evento,lc_Funcion) {
      var la_Objetos        = document.getElementsByName(lc_Nombre);
      var li_Total_Objetos  = la_Objetos.length;

      for (li_Objeto = 0; li_Objeto < li_Total_Objetos; li_Objeto++) {
          var lo_Objeto = la_Objetos[li_Objeto];
          eval('lo_Objeto.' + lc_Evento + ' = function (e) { ' + lc_Funcion + '; }' );
      }
  }  
  
  function Validar_Objeto_Input (lc_Nombre) {
      var la_Objetos          = lc_Nombre.split(',');
      var lb_Resultado_Global = true;
      
      for (var li_Nombre=0; li_Nombre < la_Objetos.length; li_Nombre++) {
          var la_TextArea = document.getElementsByName(la_Objetos[li_Nombre]);
          
          for (var li_Objeto=0; li_Objeto < la_TextArea.length; li_Objeto++) {
              // ADICIONAR LA CONDICIÓN DE QUE SÓLO VALIDE SI EL CAMPO ESTÁ VISIBLE
              var lb_Resultado  = (la_TextArea[li_Objeto].value == '' && la_TextArea[li_Objeto].style.display != 'none' ) ? false : true;          
              if (lb_Resultado == false) {
                  lb_Resultado_Global = false;
                  la_TextArea[li_Objeto].style.background = (arguments.length > 1) ? arguments[1] : "#00ff00";
              } else {
                  la_TextArea[li_Objeto].style.background = "#ffffff";
              }
          }
      }
      return lb_Resultado_Global;
  } 

  function Validar_Objeto_Fecha (lc_Nombre) {
      var la_Objetos          = lc_Nombre.split(',');
      var lb_Resultado_Global = true;
      
      for (var li_Nombre=0; li_Nombre < la_Objetos.length; li_Nombre++) {
          var lo_Objeto = document.getElementById(la_Objetos[li_Nombre]);
          if (lo_Objeto != null) {
              if (Es_Fecha_Menor(lo_Objeto.value,'fecha_actual') == false) {
                  lb_Resultado_Global = false;
                  lo_Objeto.style.background = "#00ff00";
              } else {
                  lo_Objeto.style.background = "#ffffff";
              }
          }
      }
      return lb_Resultado_Global;
  } 

  function Validar_Objeto_TextArea (lc_Nombre) {
      var la_Objetos          = lc_Nombre.split(',');
      var lb_Resultado_Global = true;
      
      for (var li_Nombre=0; li_Nombre < la_Objetos.length; li_Nombre++) {
          var la_TextArea = document.getElementsByName(la_Objetos[li_Nombre]);
          
          for (var li_Objeto=0; li_Objeto < la_TextArea.length; li_Objeto++) {
              var lb_Resultado  = (la_TextArea[li_Objeto].value == '') ? false : true;          
              if (lb_Resultado == false) {
                  lb_Resultado_Global = false;
                  la_TextArea[li_Objeto].style.background = (arguments.length > 1) ? arguments[1] : "#00ff00";
              } else {
                  la_TextArea[li_Objeto].style.background = "#ffffff";
              }
          }
      }
      return lb_Resultado_Global;
  } 
  
  function Validar_Objeto_Select (lc_Nombre) {
      var la_Objetos          = lc_Nombre.split(',');
      var lb_Resultado_Global = true;
      
      for (var li_Nombre=0; li_Nombre < la_Objetos.length; li_Nombre++) {
          var la_Select = document.getElementsByTagName('select');
          for (var li_Objeto=0; li_Objeto < la_Select.length; li_Objeto++) {
              if (la_Select[li_Objeto].name == la_Objetos[li_Nombre]) {
                  var lb_Resultado  = (la_Select[li_Objeto].value == '') ? false : true;
                  if (lb_Resultado == false) {
                      lb_Resultado_Global = false;
                      la_Select[li_Objeto].style.background = (arguments.length > 1) ? arguments[1] : "#00ff00";
                  } else {
                      la_Select[li_Objeto].style.background = "#ffffff";
                  }
              }
          }
      }
      return lb_Resultado_Global;
  }

  function Validar_Tipo_Documento (lc_Tipo,lc_Id_Documento) {

      var lb_Validacion = true;
      var lo_Numero_Documento = document.getElementById(lc_Id_Documento);
      var lo_Tipo_Documento   = document.getElementById(lc_Tipo);
      
      if (lo_Numero_Documento != null && lo_Tipo_Documento != null) {
          var li_Tipo_Documento = parseInt(lo_Tipo_Documento.value);
          
          var lc_RegExp_Registro = /([a-zA-Z0-9\-]{5,})/;
          var lc_RegExp_Numero   = /(^[1-9]{1}[0-9]{5,}$)/;
          
          var la_Documento_Numerico = new Array(1,2,3);
          
          if (In_Array(la_Documento_Numerico,li_Tipo_Documento) == true)  {
              var la_Resultado  = lc_RegExp_Numero.exec(lo_Numero_Documento.value);
              if (la_Resultado == null) { lb_Validacion = false; }
          } else {
              var la_Resultado  = lc_RegExp_Registro.exec(lo_Numero_Documento.value);
              if (la_Resultado == null) { lb_Validacion = false; }
          }
      }
     
      if (lb_Validacion == false) { Mostrar_Mensaje('El número del documento no corresponde al tipo de documento. Favor verificar.'); }
      
      return lb_Validacion;
  }
