
  $(document).ready(function(){

    // JAVASCRIPT AJAX LOADER FOR LOCATIONS 
    var termClicked = false;
    var currentCountry = "";
    var currentRegion = "";
    var currentCity = "";
  

    // Create delay
    var delay = (function(){
      var timer = 0;
      return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
      };
    })();


    $(document).ajaxSend(function(evt, request, settings) {
      var url = settings.url;

      if (url.indexOf("ajaxLoc") >= 0) {
        $(".loc-picker, .location-picker").addClass('searching');
      }
    });

    $(document).ajaxStop(function() {
      $(".loc-picker, .location-picker").removeClass('searching');
    });



    $('body').on('keyup', '.loc-picker .term', function(e) {

      delay(function(){
        var min_length = 1;
        var elem = $(e.target);
        var term = encodeURIComponent(elem.val());

        // If comma entered, remove characters after comma including
        if(term.indexOf(',') > 1) {
          term = term.substr(0, term.indexOf(','));
        }

        // If comma entered, remove characters after - including (because city is shown in format City - Region)
        if(term.indexOf(' - ') > 1) {
          term = term.substr(0, term.indexOf(' - '));
        }

        var block = elem.closest('.loc-picker');
        var shower = elem.closest('.loc-picker').find('.shower');

        shower.html('');

        if(term != '' && term.length >= min_length) {
          // Combined ajax for country, region & city
          $.ajax({
            type: "POST",
            url: baseAjaxUrl + "&ajaxLoc=1&term=" + term,
            dataType: 'json',
            success: function(data) {
              var length = data.length;
              var result = '';
              var result_first = '';
              var countCountry = 0;
              var countRegion = 0;
              var countCity = 0;


              if(shower.find('.service.min-char').length <= 0) {
                for(key in data) {

                  // Prepare location IDs
                  var id = '';
                  var country_code = '';
                  if( data[key].country_code ) {
                    country_code = data[key].country_code;
                    id = country_code;
                  }

                  var region_id = '';
                  if( data[key].region_id ) {
                    region_id = data[key].region_id;
                    id = region_id;
                  }

                  var city_id = '';
                  if( data[key].city_id ) {
                    city_id = data[key].city_id;
                    id = city_id;
                  }
                    

                  // Count cities, regions & countries
                  if (data[key].type == 'city') {
                    countCity = countCity + 1;
                  } else if (data[key].type == 'region') {
                    countRegion = countRegion + 1;
                  } else if (data[key].type == 'country') {
                    countCountry = countCountry + 1;
                  }


                  // Find currently selected element
                  var selectedClass = '';
                  if( 
                    data[key].type == 'country' && parseInt(currentCountry) == parseInt(data[key].country_code) 
                    || data[key].type == 'region' && parseInt(currentRegion) == parseInt(data[key].region_id) 
                    || data[key].type == 'city' && parseInt(currentCity) == parseInt(data[key].city_id) 
                  ) { 
                    selectedClass = ' selected'; 
                  }


                  // For cities, get region name
                  var nameTop = data[key].name_top;

                  if(nameTop != '' && nameTop != 'null' && nameTop !== null && nameTop !== undefined) {
                    nameTop = nameTop.replace(/'/g, '');
                  } else {
                    nameTop = '';
                  }

                  if(data[key].type != 'city_more') {

                    // When classic city, region or country in loop and same does not already exists
                    if(shower.find('div[data-code="' + data[key].type + data[key].id + '"]').length <= 0) {
                      result += '<div class="option ' + data[key].type + selectedClass + '" data-country="' + country_code + '" data-region="' + region_id + '" data-city="' + city_id + '" data-code="' + data[key].type + id + '" id="' + id + '" title="' + nameTop + '"><strong>' + data[key].name + '</strong></div>';
                    }
                  }
                }


                // No city, region or country found
                if( countCity == 0 && countRegion == 0 && countCountry == 0 && shower.find('.empty-loc').length <= 0 && shower.find('.service.min-char').length <= 0) {
                  shower.find('.option').remove();
                  result_first += '<div class="option service empty-pick empty-loc">No location match to your criteria</div>';
                }
              }

              shower.html(result_first + result);
            }
          });

        } else {
          // Term is not length enough, show default content
          //shower.html('<div class="option service min-char">Enter at least ' + (min_length - term.length) + ' more letter(s)</div>');

          shower.html('<div class="option region init" data-country="us" data-region="782042" data-city="" data-code="region782042" id="782042" title="United States"><strong>Alabama</strong></div><div class="option region init" data-country="us" data-region="782043" data-city="" data-code="region782043" id="782043" title="United States"><strong>Alaska</strong></div><div class="option region init" data-country="us" data-region="782044" data-city="" data-code="region782044" id="782044" title="United States"><strong>Arizona</strong></div><div class="option region init" data-country="us" data-region="782045" data-city="" data-code="region782045" id="782045" title="United States"><strong>Arkansas</strong></div><div class="option region init" data-country="us" data-region="782046" data-city="" data-code="region782046" id="782046" title="United States"><strong>California</strong></div><div class="option region init" data-country="us" data-region="782047" data-city="" data-code="region782047" id="782047" title="United States"><strong>Colorado</strong></div><div class="option region init" data-country="us" data-region="782048" data-city="" data-code="region782048" id="782048" title="United States"><strong>Connecticut</strong></div><div class="option region init" data-country="us" data-region="782049" data-city="" data-code="region782049" id="782049" title="United States"><strong>Delaware</strong></div><div class="option region init" data-country="us" data-region="782050" data-city="" data-code="region782050" id="782050" title="United States"><strong>District of Columbia</strong></div><div class="option region init" data-country="us" data-region="782051" data-city="" data-code="region782051" id="782051" title="United States"><strong>Florida</strong></div><div class="option region init" data-country="us" data-region="782052" data-city="" data-code="region782052" id="782052" title="United States"><strong>Georgia</strong></div><div class="option region init" data-country="us" data-region="782053" data-city="" data-code="region782053" id="782053" title="United States"><strong>Hawaii</strong></div><div class="option region init" data-country="us" data-region="782054" data-city="" data-code="region782054" id="782054" title="United States"><strong>Idaho</strong></div><div class="option region init" data-country="us" data-region="782055" data-city="" data-code="region782055" id="782055" title="United States"><strong>Illinois</strong></div><div class="option region init" data-country="us" data-region="782056" data-city="" data-code="region782056" id="782056" title="United States"><strong>Indiana</strong></div><div class="option region init" data-country="us" data-region="782057" data-city="" data-code="region782057" id="782057" title="United States"><strong>Iowa</strong></div><div class="option region init" data-country="us" data-region="782058" data-city="" data-code="region782058" id="782058" title="United States"><strong>Kansas</strong></div><div class="option region init" data-country="us" data-region="782059" data-city="" data-code="region782059" id="782059" title="United States"><strong>Kentucky</strong></div><div class="option region init" data-country="us" data-region="782060" data-city="" data-code="region782060" id="782060" title="United States"><strong>Louisiana</strong></div><div class="option region init" data-country="us" data-region="782061" data-city="" data-code="region782061" id="782061" title="United States"><strong>Maine</strong></div><div class="option region init" data-country="us" data-region="782062" data-city="" data-code="region782062" id="782062" title="United States"><strong>Maryland</strong></div><div class="option region init" data-country="us" data-region="782063" data-city="" data-code="region782063" id="782063" title="United States"><strong>Massachusetts</strong></div><div class="option region init" data-country="us" data-region="782064" data-city="" data-code="region782064" id="782064" title="United States"><strong>Michigan</strong></div><div class="option region init" data-country="us" data-region="782065" data-city="" data-code="region782065" id="782065" title="United States"><strong>Minnesota</strong></div><div class="option region init" data-country="us" data-region="782066" data-city="" data-code="region782066" id="782066" title="United States"><strong>Mississippi</strong></div><div class="option region init" data-country="us" data-region="782067" data-city="" data-code="region782067" id="782067" title="United States"><strong>Missouri</strong></div><div class="option region init" data-country="us" data-region="782068" data-city="" data-code="region782068" id="782068" title="United States"><strong>Montana</strong></div><div class="option region init" data-country="us" data-region="782069" data-city="" data-code="region782069" id="782069" title="United States"><strong>Nebraska</strong></div><div class="option region init" data-country="us" data-region="782070" data-city="" data-code="region782070" id="782070" title="United States"><strong>Nevada</strong></div><div class="option region init" data-country="us" data-region="782071" data-city="" data-code="region782071" id="782071" title="United States"><strong>New Hampshire</strong></div><div class="option region init" data-country="us" data-region="782072" data-city="" data-code="region782072" id="782072" title="United States"><strong>New Jersey</strong></div><div class="option region init" data-country="us" data-region="782073" data-city="" data-code="region782073" id="782073" title="United States"><strong>New Mexico</strong></div><div class="option region init" data-country="us" data-region="782074" data-city="" data-code="region782074" id="782074" title="United States"><strong>New York</strong></div><div class="option region init" data-country="us" data-region="782075" data-city="" data-code="region782075" id="782075" title="United States"><strong>North Carolina</strong></div><div class="option region init" data-country="us" data-region="782076" data-city="" data-code="region782076" id="782076" title="United States"><strong>North Dakota</strong></div><div class="option region init" data-country="us" data-region="782077" data-city="" data-code="region782077" id="782077" title="United States"><strong>Ohio</strong></div><div class="option region init" data-country="us" data-region="782078" data-city="" data-code="region782078" id="782078" title="United States"><strong>Oklahoma</strong></div><div class="option region init" data-country="us" data-region="782079" data-city="" data-code="region782079" id="782079" title="United States"><strong>Oregon</strong></div><div class="option region init" data-country="us" data-region="782080" data-city="" data-code="region782080" id="782080" title="United States"><strong>Pennsylvania</strong></div><div class="option region init" data-country="us" data-region="782081" data-city="" data-code="region782081" id="782081" title="United States"><strong>Rhode Island</strong></div><div class="option region init" data-country="us" data-region="782082" data-city="" data-code="region782082" id="782082" title="United States"><strong>South Carolina</strong></div><div class="option region init" data-country="us" data-region="782083" data-city="" data-code="region782083" id="782083" title="United States"><strong>South Dakota</strong></div><div class="option region init" data-country="us" data-region="782084" data-city="" data-code="region782084" id="782084" title="United States"><strong>Tennessee</strong></div><div class="option region init" data-country="us" data-region="782085" data-city="" data-code="region782085" id="782085" title="United States"><strong>Texas</strong></div><div class="option region init" data-country="us" data-region="782086" data-city="" data-code="region782086" id="782086" title="United States"><strong>Utah</strong></div><div class="option region init" data-country="us" data-region="782087" data-city="" data-code="region782087" id="782087" title="United States"><strong>Vermont</strong></div><div class="option region init" data-country="us" data-region="782088" data-city="" data-code="region782088" id="782088" title="United States"><strong>Virginia</strong></div><div class="option region init" data-country="us" data-region="782089" data-city="" data-code="region782089" id="782089" title="United States"><strong>Washington</strong></div><div class="option region init" data-country="us" data-region="782090" data-city="" data-code="region782090" id="782090" title="United States"><strong>West Virginia</strong></div><div class="option region init" data-country="us" data-region="782091" data-city="" data-code="region782091" id="782091" title="United States"><strong>Wisconsin</strong></div>');
        }
      }, 500 );
    });
  });
