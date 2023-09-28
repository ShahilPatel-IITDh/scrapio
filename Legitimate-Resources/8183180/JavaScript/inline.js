
  document.addEventListener('readystatechange', event => {
    switch (document.readyState) {
      case "complete":
         var x=document.querySelectorAll('[id^="ebDefaultImg_"]')
         if (x.length > 0 ) {
          var target = document.getElementById(x[0].id);
          target.style.borderTopLeftRadius = '15px';
          target.style.borderTopRightRadius = '15px';
          target.style.borderBottomLeftRadius = '15px';
          target.style.borderBottomRightRadius = '15px';
         }
      break;
    }
  });
