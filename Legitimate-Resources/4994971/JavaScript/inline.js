
      jQuery(document).ready(function($) {
          $("#Submit").click(function(event) {
              event.preventDefault();
              checkAction();
          });
  
          $(".loginInput").keypress(function(e) {
      
              if(e.keyCode === 13){
                  checkAction();
              }
          });
          $("[data-toggle=popover]").popover({html:true});
      });
  
      function checkAction() {
          
          domain = $("#username").val();
          $('#LoginErr').html("");
  
          //t=o per ovunque, t=a per axera
          $.ajax({
              url: "https://webmail.telemar.it/checkdomain_axera.php?t=a&q=" + domain
          }).done(function(data) {
  
              //AXERA
              if( data=='https://webmail.interplanet.it' || data=='https://webmail.ovunque.it')
              {
                  $('#username').attr("name", "user");
                  $('#password').attr("name", "pass");
              } else {
                  $('#username').attr("name", "username");
                  $('#password').attr("name", "password");
              }
              
              if (data !== "") {
  
                  $('#LoginForm').attr("action", data);
                  $('#LoginForm').trigger("submit");
              }else{
                  $('#LoginErr').html("Indirizzo email non valido.");
              }
          }).fail(function() {
  
              $('#LoginErr').html("Errore nella login.");
          });
      }
      