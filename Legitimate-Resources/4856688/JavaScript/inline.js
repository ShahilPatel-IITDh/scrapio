
    var reviewsioUrlKey;

    var getReviewsioConfig = function () {
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", 'https://api.reviews.io/shopware/info/BC7cFCL2g5fKoUNj', true);
      xhttp.send();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            if(JSON.parse(this.response).url_key) {
              reviewsioUrlKey = JSON.parse(this.response).url_key;
            }
          }
        }
    }

    getReviewsioConfig();
    let reviewsioStoresCurrentLang = 'de-DE';
    
          var loadReviewsioRatingSnippet = function() {

        ratingSnippet("ruk_rating_snippet",{
        store: reviewsioUrlKey,
        color: "#0E1311",
        linebreak: false,
        usePolaris: true,
                                  writeButton: false,
                  lang: reviewsioStoresCurrentLang ? reviewsioStoresCurrentLang.trim().split('-')[0] : 'de-informal',
        });

      }
    
    function initialiseReviewsioWidgets(){
        if(typeof reviewsioUrlKey !== "undefined"){
            if(typeof loadReviewsioRatingSnippet !== "undefined") {
              loadReviewsioRatingSnippet();
            }
            if(typeof loadReviewsioProductWidget !== "undefined") {
              loadReviewsioProductWidget();
            }
        }
        else{
            setTimeout(initialiseReviewsioWidgets, 250);
        }
      }

    initialiseReviewsioWidgets();
  