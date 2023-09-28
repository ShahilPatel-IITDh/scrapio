
   $(document).ready(function () {
  
          var links = [];
          $('a').each(function () {
              links.push(this.href);
              var href = this.href;
              console.log(href);
              $.pinger({ interval: 5, url: href, pingNow: true });
     
          }
          );
      })
  