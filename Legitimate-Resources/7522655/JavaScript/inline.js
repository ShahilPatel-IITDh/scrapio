
            /* Email alert message */
      $('.alert-danger').hide();  
      $('.alert-success').hide();  

      function alert(){    
        



        var x = document.forms["myForm"]["email"].value;
        var atpos = x.indexOf("@");
        var dotpos = x.lastIndexOf(".");

        if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
             $('.alert-danger').show(1000);
             $('.alert-success').hide();
             return false;
        }else{
            
             $('.alert-success').show(1000);
             $('.alert-danger').hide(); 
        }
      }

    