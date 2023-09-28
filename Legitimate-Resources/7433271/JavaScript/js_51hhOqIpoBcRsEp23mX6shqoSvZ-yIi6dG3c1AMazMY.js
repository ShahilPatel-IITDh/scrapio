// Reference: https://bootsnipp.com/snippets/ypNAe
(function ($, Drupal) {
  $.fn.extend({
      treed: function (o) {

        var openedClass = 'fa-minus-circle';
        var closedClass = 'fa-plus-circle';
        var expandAll = false;

        if (typeof o != 'undefined'){
          if (typeof o.openedClass != 'undefined'){
          openedClass = o.openedClass;
          }
          if (typeof o.closedClass != 'undefined'){
          closedClass = o.closedClass;
          }
          if (typeof o.expandAll != 'undefined'){
          expandAll = o.expandAll;
          }
        };
        
        var curUrl = window.location.pathname;
        $(this).find('a').each(function() {
            var href = $(this).attr('href'); 
            if (href == curUrl) {
              $(this).parents('li').addClass('active');
            } 
        });        

          //initialize each of the top levels
          var tree = $(this);
          tree.addClass("tree");
          tree.find('li').has("ul").each(function () {
              var branch = $(this); //li with children ul
              var initialClass = expandAll ? openedClass : closedClass;
              if(!expandAll && branch.hasClass('active')){
                initialClass = openedClass;
              }
              branch.prepend("<i class='indicator fas " + initialClass + "'></i>");
              branch.addClass('branch');
              branch.on('click', function (e) {
                  if (this == e.target) {
                      var icon = $(this).children('i:first');
                      icon.toggleClass(openedClass + " " + closedClass);
                      $(this).children().children().toggle();
                  }
              })
              if(!expandAll && !branch.hasClass('active')){
                branch.children().children().toggle();
              }
          });
          //fire event from the dynamically added icon
        tree.find('.branch .indicator').each(function(){
          $(this).on('click', function () {
              $(this).closest('li').click();
          });
        });
          //fire event to open branch if the li contains an anchor instead of text
          tree.find('.branch>a').each(function () {
              $(this).on('click', function (e) {
                  $(this).closest('li').click();
                  e.preventDefault();
              });
          });
          //fire event to open branch if the li contains a button instead of text
          tree.find('.branch>button').each(function () {
              $(this).on('click', function (e) {
                  $(this).closest('li').click();
                  e.preventDefault();
              });
          });
      }
  });
  
  Drupal.behaviors.treeView = {
    attach: function (context, settings) {
      $(document, context).once('treeView').each(function(){
        $('.jsTreeViewExpand').treed();      
      });      
    }
  };
})(jQuery, Drupal);


;
(function ($, Drupal) {
  Drupal.behaviors.popup = {
    attach: function (context, settings) {
      var medicalDomains = [
        'medical.novavax.com',
        'medical.dev.novavax.com',
        'medical.stage.novavax.com',
        'medical.prod.novavax.com',
        'medical.novavax.local'
      ];
      var medicalRedirectDomains = medicalDomains.concat([
        'novavaxhcp.com',
        'knowourvax.com'
      ]);
      var mainDomains = [
        'novavax.com',
        'novavax.local'
      ];
      var countryCodes = [
        'cz','se','de','ca','au','sg','ch','it','es','pl','uk','fr','at','nl','be','pt','ro','dk','fi','no','gr','nz','tw'
      ];
      var countryDomains = [];
      countryCodes.forEach(function(prefix){
        countryDomains.push('www.novavax.' + prefix);
        countryDomains.push('novavax.' + prefix);
        countryDomains.push(prefix + '.novavax.com');
        countryDomains.push(prefix + '.dev.novavax.com');
        countryDomains.push(prefix + '.stage.novavax.com');
        countryDomains.push(prefix + '.prod.novavax.com');
        countryDomains.push(prefix + '.novavax.local');
      });
      countryDomains.push('novavax.co.uk');      
      countryDomains.push('www.novavax.co.uk');      
      countryDomains.push('novavax.com.au');      
      countryDomains.push('www.novavax.com.au');      
      countryDomains.push('novavax.com.sg');      
      countryDomains.push('www.novavax.com.sg');      
      countryDomains.push('novavax.com.tw');      
      countryDomains.push('www.novavax.com.tw');      
      var usDomains = [
        'www.novavax.com',
        'dev.novavax.com',
        'stage.novavax.com',
        'prod.novavax.com',
        'novavax.local',
        'ir.novavax.com'
      ];      
      var whitelistDomains = [
        'novavax.widen.net',
        'novavax.widencollective.com',
        'recruiting.ultipro.com',
        'novavax.cz',
        'jobbet.se',
        'bit.ly'
      ];
      var iisDomain = [
        'novavax.envisionpharma.com'
      ];
      var curDomain = window.location.hostname;
      var isMedical = medicalDomains.includes(curDomain);
      var isCountry = countryDomains.includes(curDomain);

      $('a').each(function (e) {
        var href = $(this).attr('href');
        if (!href)
          return;
        if($('body').hasClass('node--type-nvax-splash-curtain'))
          return;
        var download = $(this)[0].hasAttribute('download');
        var pattern = /^(?!(?:javascript|data|chrome|mailto|tel|sms|callto|mms|skype):).+$/g;
        if (!pattern.exec(href))
          return;
        if (href.charAt(0) == '#' || href.charAt(0) == '?')
          return;
        if($(this).parent().hasClass('jsDisclaimerPopupLink')){
          if($(this).parent().hasClass('disable'))  return;
          $(this).attr('data-target', 'jsCountryDisclaimer').addClass('jsInterstitialTrigger');
          return;
        }
        if(isCountry){
          if(usDomains.includes(this.host)){
            $(this).attr('data-target', 'jsCountry2GlobalRedirect').addClass('jsInterstitialTrigger');
            return;
          }
        }
        
        for (var i = 0; i < whitelistDomains.length; i++) {
          if (this.host.indexOf(whitelistDomains[i]) >= 0)
            return;
        }
        for (var i = 0; i < iisDomain.length; i++) {
          if (this.host.indexOf(iisDomain[i]) >= 0) {
            $(this).addClass('jsInterstitialTrigger').data('target', 'jsIISRedirect');
            return;
          }
        }

        if (!isMedical) {
          for (var i = 0; i < medicalRedirectDomains.length; i++) {
            if (this.host.indexOf(medicalRedirectDomains[i]) >= 0) {
              $(this).addClass('jsInterstitialTrigger').data('target', 'jsMedicalRedirect');
              return;
            }
          }
          if(!isCountry){
            // from global domain, whitelist all *.novavax.com domains; from country domain to *.novavax.com, trigger popup
            for (var i = 0; i < mainDomains.length; i++) {
              if (this.host.indexOf(mainDomains[i]) >= 0)
                return;
            }
          }
        } else {
          for (var i = 0; i < medicalDomains.length; i++) {
            if (this.host.indexOf(medicalDomains[i]) >= 0)
              return;
          }
          for (var i = 0; i < mainDomains.length; i++) {
            if (this.host.indexOf(mainDomains[i]) >= 0)
              return;
          }
        }
        if (this.host !== window.location.host && !download) {
          $(this).addClass('jsInterstitialTrigger').data('target', 'jsExtRedirect');
        }
      });

      var openPopup = function(trigger, e){
        var container = $(trigger).parents('.jsPopupContainer');
        var targetClass = $(trigger).data('target');
        var lightbox = container.find('.' + targetClass);
        $(lightbox).modal();
        e.stopImmediatePropagation();
        e.preventDefault();
      }
      $(document).on('click','.jsPopupTrigger', function (e) {
        openPopup($(this), e);
      });
      $(document).on('keyup','.jsPopupTrigger', function (e) {
        if (e.which == 32) {
          openPopup($(this), e);
        }        
      });

      $('.jsInterstitialTrigger').click(function (e) {
        var targetClass = $(this).data('target');
        var targetCountry = $(this).data('targetcountry');
        var targetURL = $(this).attr('href');
        if(targetClass == 'jsCountryDisclaimer'){
          $.ajax({
            url: '/popup/disclaimer/'+$(this).data('targetlang')+'/'+$(this).data('targetcid'),
            success: function (data) {
              $('.' + targetClass + ' .jsModalContent').html(data);
              $('.' + targetClass + ' .jsTargetCountry').text(targetCountry);
              $('.' + targetClass).data('url', targetURL).modal();
            }
          });
        }else{
          $('.' + targetClass).data('url', targetURL).modal();
        }
        e.stopImmediatePropagation();
        e.preventDefault();
      });

      $(document).on('click','.jsPopCancel', function (e) {
        $(this).parents('.modal').find('.close').trigger("click");
        e.stopImmediatePropagation();
        e.preventDefault();
      });

      $(document).on('click','.jsPopRedirect', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        var href = $(this).attr('href');
        // dynamic target URL passing from the trigger
        if (href === '#')
          href = $(this).parents('.modal').data('url');
        if (href)
          window.location.href = href;
      });
      
      $(".jsVideoPopup").on("hidden.bs.modal", function () {
        // stop videos
        $(this).find('.af-video--youtube, .af-video--vimeo').each(function () {
          $(this).attr('src', $(this).attr('src'));
          return false;
        });
      });

    }
  };
})(jQuery, Drupal);

;
(function ($, Drupal) {
  Drupal.behaviors.pager = {
    attach: function (context, settings) {
      var pagerItem = function(active, index){
        return '<li class="pager__item ' + (active ? 'is-active' : '') + '">'
              + '<a href="?page=' + index + '" title="Go to page ' + index + '" class="jsPager" data-page="' + index + '"><span class="visually-hidden">Page </span>' + index + '</a>';
              + '</li>';
      };
      var pagerNav = function(type, index){
        var labels = {
          'first': '« First',
          'last': 'Last »',
          'prev': '‹ Previous',
          'next': 'Next ›'
        };
        return '<li class="pager__item page__item--' + type + '">'
              + '<a href="?page=' + index + '" title="Go to '+ type + ' page" class="jsPager" data-page="' + index + '"><span class="visually-hidden">' + type + ' page</span><span aria-hidden="true">' + labels[type] + '</span></a>';
              + '</li>';
      };
      var pagerEllipsis = function(){
        return '<li class="pager__item page__item--ellipsis" role="presentation">…</li>';
      };
      var rebuildPager = function(curPage, pageCount){
        var showCount = 5;
        var startIndex, endIndex, remainP, remainN;
        if(pageCount-curPage+1 >= showCount){
          startIndex = curPage <= showCount ? 1 : curPage;
          endIndex = startIndex+showCount-1;
        }else{
          startIndex = Math.max(1, pageCount-showCount+1);
          endIndex = pageCount;
        }
        remainP = startIndex > 1;
        remainN = endIndex < pageCount;
        $('.jsPagerContainer').html('');
        $('.jsPagerContainer').append(pagerNav('first', 1));
        if (curPage-1 > 0)
          $('.jsPagerContainer').append(pagerNav('prev', curPage-1));
        if( pageCount > showCount && remainP )
          $('.jsPagerContainer').append(pagerEllipsis());
        for(i = startIndex; i <= endIndex; i++){
          $('.jsPagerContainer').append(pagerItem(i==curPage, i));
        }
        if( pageCount > showCount && remainN )
          $('.jsPagerContainer').append(pagerEllipsis());
        if( curPage+1 <= pageCount )
          $('.jsPagerContainer').append(pagerNav('next', curPage+1));
        $('.jsPagerContainer').append(pagerNav('last', pageCount));
      }
      var pagerPane = $('.jsPagerContainer');
      rebuildPager(pagerPane.data('cur'), pagerPane.data('pgcount'));
      $(document).on('click','.jsPager', function(e){
        var curPage = $(this).data('page');
        var limit = pagerPane.data('limit');
        $(this).parent('.jsPagerContainer').data('cur',curPage);
        rebuildPager(curPage, pagerPane.data('pgcount'));
        $('.jsPager[data-page='+curPage+']:first').trigger("PagerLoadContent", [curPage, limit]);          
        e.stopImmediatePropagation();
        e.preventDefault();        
      });      
      $('.jsPagerCountSelect').select2({
        minimumResultsForSearch: -1
      });
      $('.jsPagerCountSelect').change(function(e){
        var limit = $(this).val(), total = pagerPane.data('total'), curPage=1;
        var pgcount = Math.ceil(total / limit);
        pagerPane.data('pgcount', pgcount);
        pagerPane.data('limit', limit);
        pagerPane.data('cur', curPage);
        rebuildPager(curPage, pgcount);
        $('.jsPager[data-page='+curPage+']:first').trigger("PagerLoadContent", [curPage, limit]);          
      });
    }
  };
})(jQuery, Drupal);

;
!function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (!d.getElementById(id)) {
    js = d.createElement(s);
    js.id = id;
    js.src = "//sslwidgetmaster.investorroom.com/js/wd_widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
  }
}(document, "script", "prn_wjs");;
(function ($, Drupal) {
  Drupal.behaviors.secWidget = {
    attach: function (context, settings) {
      if (context === document) {
        $('.ac-secWidget').parents('body').addClass('secPage');
      }
      setTimeout(function () {
        $('.ac-secWidget .wd_sec_filings-container').addClass('table-responsive');
        $('.ac-secWidget .wd_sec_filings-container table').addClass('table');
        $('#wd_filings_year,#wd_filings_category').select2({
          minimumResultsForSearch: -1
        });
      }, 2000);
    }
  };
})(jQuery, Drupal);
;
(function ($, Drupal) {
  Drupal.behaviors.header = {
    attach: function (context, settings) {
      $('.oc-header__megaItem').on('show.bs.dropdown', function () {
        $(this).parents('.oc-header').addClass('-solid');
      })
      $('.oc-header__megaItem').on('hidden.bs.dropdown', function () {
        $(this).parents('.oc-header').removeClass('-solid');
      })
      $('.oc-header__globalItem').on('show.bs.dropdown', function () {
        $(this).parents('.oc-header').addClass('-countryOpen');
      })
      $('.oc-header__globalItem').on('hidden.bs.dropdown', function () {
        $(this).parents('.oc-header').removeClass('-countryOpen');
      })
      $('.oc-mmPane__navLink').each(function (e) {
        var href = $(this).find('a').attr('href');
        if (href == window.location.pathname + window.location.hash) {
          $(this).addClass('active');
          $(this).parents('.oc-header__megaItem').addClass('active');
        }
      });
      $(".oc-mmPane__navLink a:contains('map')").parent().addClass('globe');
      $(".jsCountryLangExpand").click(function (e) {
        $(this).parents('.jsCountryPicker').find('li.active').removeClass('active');
        $(this).parent().addClass('active');
        e.stopImmediatePropagation();
        e.preventDefault();
      });
    }
  };
})(jQuery, Drupal);



;
(function ($, Drupal) {
    Drupal.behaviors.footer = {
      attach: function (context, settings) {
        $('a[href*="#lang-picker"]').addClass('jsPopupTrigger').attr('data-target','jsLangPopup');
      }
    };
  })(jQuery, Drupal);
  
  
  
  ;
(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.countryMap = {
    attach: function (context, settings) {
      
      if(!drupalSettings.countrySearch)
        return;
      
      if ($('#countryMap').length == 0)
        return;
      
      var langLabels = drupalSettings.countrySearch.langLabels;
      var countries = drupalSettings.countrySearch.countries;
      var notlisted = drupalSettings.countrySearch.notListed;
      var resetInfo = drupalSettings.countrySearch.resetInfo;

      var lng = $('#countryMap').data('lng');
      var lat = $('#countryMap').data('lat');
      var zoom = $('#countryMap').data('zoom');
      var map; 
      var marker, popup;
      
      // filter process
      var resetFilter = function () {
        $(".jsCountryInput").val("").attr("readonly", false).css("padding-left", "20px");
        $(".jsCountryFlag").hide();
        $('.jsCountryLangSelect').find('option').remove();
        $('.jsCountryVaxSelect').find('option').remove();
        if(marker){
          marker.remove();
        }
        $('.jsCountryDetail').html('');
        if(resetInfo.vaxStatus){
          for (var key in resetInfo.vaxStatus) {
            $(".jsVaxStatus[data-key='"+key+"']").html(resetInfo.vaxStatus[key]);             
          }
        }
        if(resetInfo.label)
          $(".jsMapVaxFieldLabel").html(resetInfo.label.vaxFieldLabel);
        map.flyTo({
          center: resetInfo.lnglat,
          zoom: resetInfo.zoom,
          essential: true // essential animation
        });        
      };
      
      var updateMap = function(countryItem){
        if(marker){
          marker.remove();
        }
        var curLang = $('.jsCountryLangSelect').val();
        $.ajax({
          url: '/api/map/'+curLang+'/' + countryItem.nid,
          success: function (data) {
            // Create a default Marker
            marker = new mapboxgl.Marker({color: 'white'})
                    .setLngLat(countryItem.lnglat); //[2.05,46.44]);
            $('.jsCountryDetail').html(data.content);
            if(data.vaxStatus){
              for (var key in data.vaxStatus) {
                $(".jsVaxStatus[data-key='"+key+"']").html(data.vaxStatus[key]);             
              }
            }
            if(data.label){
              $(".jsMapContactTitle .af-text").html(data.label.contactTitle);
              $(".jsMapPartnerTitle .af-text").html(data.label.partnerTitle);
              $(".jsMapVaxFieldLabel").html(data.label.vaxFieldLabel);
            }
            popup = new mapboxgl.Popup({offset: 40})
                    .setHTML($('.jsMarkerPopup').html());
            marker.setPopup(popup).addTo(map);
            map.flyTo({
              center: countryItem.lnglat, //[2.05,46.44],
              zoom: countryItem.zoom,
              essential: true // essential animation
            });        
          }
        });
      }

      $(".jsCountryRemove").click(function (e) {
        resetFilter();
        $(this).hide();
      });
      
      $('.jsCountryLangSelect').change(function (e){
        var curLangCode = $(this).val();
        var curCountry = $(".jsCurCountry").val();
        for (var i = 0; i < countries.length; i++) {
          if (countries[i].value == curCountry && countries[i].langs) {
            updateMap(countries[i]);
            return;
          }
        }        
      });
      
      $('.jsCountryInput').keydown(function(e){
        if(e.which == 46){
          $(".jsCountryRemove").click();
        }
      });

      // run once
      if (context === document) {
        
        $('body').addClass('mapPage');
        $('.jsCountryLangSelect,.jsCountryVaxSelect').select2({
            minimumResultsForSearch: -1
        });   
        $('.jsCountryLangSelect').next('.select2').find('.select2-selection').attr('role','listbox').attr('aria-labelledby','label-cslang');	      
        $('.jsCountryVaxSelect').next('.select2').find('.select2-selection').attr('role','listbox').attr('aria-labelledby','label-csvax');	      
        
        // TO MAKE THE MAP APPEAR YOU MUST ADD YOUR ACCESS TOKEN FROM https://account.mapbox.com
        mapboxgl.accessToken = 'pk.eyJ1Ijoibm92YXZheCIsImEiOiJja3pvajN0eDE2MDRsMnZuZno4bjhsMTdoIn0.uRGhW4kbFT9SkVyBeGL6pA';
        map = new mapboxgl.Map({
          container: 'countryMap', // container ID
          style: 'mapbox://styles/novavax/ckzydi4b0000a15mps1jfqzfr', // style URL
          center: [lng, lat], // starting position [lng, lat]
          zoom: zoom // starting zoom
        });
        
        // turn on lng/lat display
/*        map.on('mousemove', function(e){ 
          document.getElementById('lnglat-info').innerHTML = JSON.stringify(e.lngLat.wrap());
        });  */       
        
        map.on('moveend', function(){
          if(marker)
            marker.togglePopup();
        });        

        if ($('.jsMarkerPopup').length > 0) {
          // Create a default Marker
          marker = new mapboxgl.Marker({color: 'white'})
                  .setLngLat([lng, lat]);
          // create the popup
          popup = new mapboxgl.Popup({offset: 40})
                  .setHTML($('.jsMarkerPopup').html());
          marker.setPopup(popup).addTo(map).togglePopup();
        }
        
        $(".jsCountryInput").autocomplete({
          minLength: 0,
          maxResults: 10,
          source: function (request, response) {
            var results = $.ui.autocomplete.filter(countries, request.term);
            if (results.length > 0)
              results = results.slice(0, this.options.maxResults);
            if (notlisted.void) {
              if (results.length <= 0)
                results.push(notlisted);
            } else
              results.push(notlisted);
            response(results);
          },
//          source: countries,
          focus: function (event, ui) {
            $(".jsCountryInput").val(ui.item.label);
            return false;
          },
          select: function (event, ui) {
            $(".jsCountryInput").val(ui.item.label).attr("readonly", true);
            $(".jsCountryRemove").show();
            $(".jsCurCountry").val(ui.item.value);
            if (!ui.item.last) {
              $(".jsCountryFlag").attr("src", '/act-root/novavax/assets/icons/flags/' + ui.item.value + '.svg').show();
              $(".jsCountryInput").css("padding-left", "40px");
            }

            var select = $('.jsCountryLangSelect').find('option').remove().end();
            if(ui.item.langs){
              for (var langCode in ui.item.langs) {
                select.append('<option value="' + langCode + '">' + langLabels[langCode].name + '</option>');
              }
              var curLangCode = $('.jsCountryLangSelect').find('option:first').val();
              select.val(curLangCode);
            }
            
            select = $('.jsCountryVaxSelect').find('option').remove().end();
            if(ui.item.vaccines){
              for (var vaxID in ui.item.vaccines) {
                select.append('<option value="' + vaxID + '">' + ui.item.vaccines[vaxID] + '</option>');
              }
              var curVaccine = $('.jsCountryVaxSelect').find('option:first').val();
              select.val(curVaccine);
            }
            
            updateMap(ui.item);
            
            return false;
          }
        });

        $(".jsCountryInput").autocomplete("instance")._renderItem = function (ul, item) {
          ul.attr('role', 'listbox');
          if (item.last)
            return $("<li role='presentation'>")
                    .append("<div role='option'>" + item.label + "</div>")
                    .appendTo(ul);
          else
            return $("<li role='presentation'>")
                    .append("<div role='option'><img src='/act-root/novavax/assets/icons/flags/" + item.value + ".svg'>" + item.label + "</div>")
                    .appendTo(ul);
        };
      }
      
      $('.jsCountryInput').attr('autocomplete','do-not-autofill');
      
    }
  };
})(jQuery, Drupal, drupalSettings);
;
var locMapMarkers = [];
(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.locationMap = {
    attach: function (context, settings) {

      if ($('#locationMap').length == 0)
        return;

      var lng = $('#locationMap').data('lng');
      var lat = $('#locationMap').data('lat');
      var zoom = $('#locationMap').data('zoom');
      var region = $('#locationMap').data('region');
      var country = $('#locationMap').data('country');
      var lang = $('#locationMap').data('lang');
      var layerFill = 'countryFill';
      var layerSymbol = 'countrySymbol';
      var polygonSource = 'countryPolygon';
      var pointSource = 'countryCenter';
      var layerIcon = 'countryPin';
      var map;

      var resetMap = function (center, zoom, adjustMobile) {
        locMapMarkers.forEach((marker) => marker.remove())
        locMapMarkers = [];
        if (map.getLayer(layerFill))
          map.removeLayer(layerFill);
        if (map.getLayer(layerSymbol))
          map.removeLayer(layerSymbol);
        if (map.getSource(polygonSource))
          map.removeSource(polygonSource);
        if (map.getSource(pointSource))
          map.removeSource(pointSource);
        if (map.hasImage(layerIcon))
          map.removeImage(layerIcon);
        
        var mq = window.matchMedia( "(max-width: 767px)" );
        if (adjustMobile && mq.matches)
          map.setZoom(zoom-1>=0 ? zoom-1 : 0); 
        else
          map.setZoom(zoom);
        map.flyTo({
          center: [center.lng, center.lat]
        });
      };

      var refreshMapMarkers = function (markers) {
        for (const marker of markers) {
          // Create a DOM element for each marker.
          const el = document.createElement('div');
          el.className = 'marker';
          el.style.backgroundImage = `url(${marker.icon})`;
          el.style.width = '50px';
          el.style.height = '58px';
          el.style.backgroundSize = '100%';
          el.addEventListener('click', () => {
            ajaxLoadInfo(marker.country, lang);
          });

          // Add markers to the map.
          locMapMarkers.push(
            new mapboxgl.Marker(el)
            .setLngLat([marker.lng, marker.lat])
            .setOffset([0, -30])
            .addTo(map)
          );
        }
      };

      var refreshMapPolygon = function (polygon) {
        map.loadImage(
          polygon.icon,
          function (error, image) {
            if (error) throw error;
            map.addImage(layerIcon, image);

            map.addSource(polygonSource, {
              'type': 'geojson',
              'data': polygon.geojson
            });
            map.addLayer({
              'id': layerFill,
              'type': 'fill',
              'source': polygonSource,
              'paint': {
                'fill-color': '#00B6EE'
              }
            });
            map.addSource(pointSource, {
              'type': 'geojson',
              'data': {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [
                    polygon.lng, polygon.lat
                  ]
                },
                'properties': {
                  'name': polygon.name
                }
              }
            });
            map.addLayer({
              'id': layerSymbol,
              'type': 'symbol',
              'source': pointSource,
              'layout': {
                'icon-image': layerIcon,
                'icon-offset': [0, -35],
                'text-field': ['get', 'name'],
                'text-font': [
                  'Open Sans Semibold',
                  'Arial Unicode MS Bold'
                ],
                'text-anchor': 'center',
                'text-justify': 'center'
//                'text-offset': [1.5, 0]
              },
              'paint': {
                'text-color': '#FFF'
              }
            });
          }
        );
      };

      var ajaxLoadInfo = function (countryCode, langCode) {
        $.ajax({
          url: "/ajax/locinfo/" + countryCode + "/" + langCode,
          method: 'GET',
          dataType: "json",
          success: function (data) {
            if (data.markup)
              $('.jsLocInfo').html(data.markup);
            if (data.geodata) {
              var adjustMobile = data.geodata.polygon ? 0 : 1;
              resetMap(data.geodata.center, data.geodata.zoom, adjustMobile);
              if (data.geodata.polygon)
                refreshMapPolygon(data.geodata.polygon);
              if (data.geodata.markers)
                refreshMapMarkers(data.geodata.markers);
            }
          }
        });
      };


      // run once
      if (context === document) {

        // TO MAKE THE MAP APPEAR YOU MUST ADD YOUR ACCESS TOKEN FROM https://account.mapbox.com
        mapboxgl.accessToken = 'pk.eyJ1Ijoibm92YXZheCIsImEiOiJja3pvajN0eDE2MDRsMnZuZno4bjhsMTdoIn0.uRGhW4kbFT9SkVyBeGL6pA';
        map = new mapboxgl.Map({
          container: 'locationMap', // container ID
          style: 'mapbox://styles/novavax/clgo77c9a008p01pec31hh8gq', // style URL
          center: [lng, lat], // starting position [lng, lat]
          zoom: zoom // starting zoom
        });
        // disable map zoom when using scroll
        map.scrollZoom.disable();
        
        // turn on lng/lat display
        /* map.on('mousemove', function(e){ 
         document.getElementById('lnglat-info').innerHTML = JSON.stringify(e.lngLat.wrap());
         });*/

        ajaxLoadInfo(country, lang);

        $(document).on("click", '.jsLocClose', function (e) {
          ajaxLoadInfo(region, lang);
          e.stopImmediatePropagation();
          e.preventDefault();
        });

      }
    }
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal) {
  Drupal.behaviors.droplist = {
    attach: function (context, settings) {
      $('.jsDropSelect').select2({
        minimumResultsForSearch: -1
      });
      $(document).on('show.bs.collapse', '.jsDropList', function (e) {
        $(this).prev().find('i').removeClass('fa-caret-down').addClass('fa-caret-up');
      });
      $(document).on('show.bs.collapse', '.jsDropCheckList', function (e) {
        $(this).prev().find('i').removeClass('fa-caret-down').addClass('fa-caret-up');
        $(this).find("input:checked").each(function(){
          $(this).closest('ul').prepend($(this).closest('li').removeClass('inactive'));
        });
        var limit = $(this).data('showcount');
        if($(this).find('li').length > limit){
          $(this).find('li').slice(limit).addClass('inactive');
          $(this).find('.jsExpandMore').addClass('active');
          $(this).find('.jsCollapseAll').removeClass('active');
        }
      });
      $(document).on('hide.bs.collapse', '.jsDropList, .jsDropCheckList', function (e) {
        $(this).prev().find('i').removeClass('fa-caret-up').addClass('fa-caret-down');
      });
      $(document).on('click', '.jsDropCheck .jsExpandMore', function (e) {
        var container = $(this).parents('.jsDropCheckList');
        $(container).find('li').removeClass('inactive');
        $(container).find('.jsCollapseAll').addClass('active');
        $(this).removeClass('active');
        e.stopImmediatePropagation();
        e.preventDefault();        
      });
      $(document).on('click', '.jsDropCheck .jsCollapseAll', function (e) {
        var container = $(this).parents('.jsDropCheck');
        $(container).find('.jsDropCheckList').collapse('hide');
        e.stopImmediatePropagation();
        e.preventDefault();        
      });
      $('.jsDropCheckList input:checked').each(function(){
        $(this).closest('ul').prepend($(this).closest('li'));
      });       
      
      $(document).mouseup(function (e) {
        if ($(e.target).closest(".jsDropCheckList.autoCollapse.show").length=== 0) {
          $(".jsDropCheckList.autoCollapse.show").collapse('hide');
        }
      });      
    },
    checkChanged: function(checkbox){
      var container = $(checkbox).parents('.jsDropCheck');
      var targetFieldID = container.find('.jsDropTrigger').data('result-target');
      var checkedField = container.find('input:checked');
      var total = $(checkedField).length;
      var values = '';
      container.find('.jsDropTitle').text(total == 0 ? 'All' : (total == 1 ? total + ' item selected' : total + ' items selected'));
      $(checkedField).each(function () {
        values += $(this).val() + ' ';
      });
      $('input[data-drupal-selector=' + targetFieldID + ']').val(values);
    }
  };
})(jQuery, Drupal);
;
(function ($, Drupal) {
  Drupal.behaviors.basicContent = {
    attach: function (context, settings) {
      $('.jsCollapsible').click(function (e) {
        var body = $(this).parents('.mc-basicContent').find('.mc-basicContent__body');
        if ($(this).attr('aria-expanded') == 'true')
          $(this).attr('aria-expanded','false');
        else
          $(this).attr('aria-expanded','true');
        if ($(this).find('.fas').hasClass('fa-caret-up')) {
          $(this).find('.fas').removeClass('fa-caret-up').addClass('fa-caret-down');
          body.hide();
        } else {
          $(this).find('.fas').removeClass('fa-caret-down').addClass('fa-caret-up');
          body.show();
        }
        e.stopImmediatePropagation();
        e.preventDefault();
      });
    }
  };
})(jQuery, Drupal);


;
(function ($, Drupal) {
  Drupal.behaviors.a2aSocial = {
    attach: function (context, settings) {
//	  if(a2a) a2a.init_all();      
      $('.jsShareTrigger').click(function(e){
        $(this).siblings('.jsShareFlyout').addClass('active');
        e.stopImmediatePropagation();
        e.preventDefault();
      });      
      $('.jsShareClose').click(function(e){
        $(this).closest('.jsShareFlyout').removeClass('active');
        e.stopImmediatePropagation();
        e.preventDefault();
      });      
    }
  };
})(jQuery, Drupal);;
(function ($, Drupal) {
  Drupal.behaviors.a2aCalendar = {
    attach: function (context, settings) {
      var calElement =  $('.jsAddCalendar');
      if(calElement.length > 0){
        var myCalendar = createCalendar({
          options: {
            class: '',
            id: ''                               // You need to pass an ID. If you don't, one will be generated for you.
          },
          data: {
            label: 'Add to Calendar',
            title: calElement.attr("data-event-title"),     // Event title
            start: new Date(calElement.attr("data-event-start")),   // Event start date
            end: new Date(calElement.attr("data-event-end")),     // You can also choose to set an end time.
                                                      // If an end time is set, this will take precedence over duration
            address: calElement.attr("data-event-address"),
            description: calElement.attr("data-event-description")
          }
        });
        if( $('.jsAddCalendar *').length === 0 ) {
          document.querySelector('.jsAddCalendar').appendChild(myCalendar);
        }
      }
    }
  };
})(jQuery, Drupal);;
(function ($, Drupal) {
  Drupal.behaviors.socialShare = {
    attach: function (context, settings) {
      $('.jsPrint a').click(function (e) {
        window.print();
        e.stopImmediatePropagation();
        e.preventDefault();
      });
      $('.jsEmail a').click(function (e) {
        window.location.href = 'mailto:?subject=Novavax%20Investor%20Relations%20-%20'+$(this).data('title')+'&body='+encodeURIComponent(window.location.href);
        e.stopImmediatePropagation();
        e.preventDefault();
      });
    }
  };
})(jQuery, Drupal);
;
(function ($, Drupal) {
  Drupal.behaviors.jobSearch = {
    attach: function (context, settings) {
      $('.jsJobSearch').click(function(e){
        var container = $(this).parents('.jsJobSearchContainer'); 
        var rootURL = $(this).data('rooturl');
        var keywords = container.find('input.keywords').val();
        var locIDs = '', catIDs = '', country='';
        container.find('.jsDropCheck.country').find('input:checked').each(function () {
          country += $(this).val() + ' ';
        });        
        container.find('.jsDropCheck.location').find('input:checked').each(function () {
          locIDs += $(this).val() + ' ';
        });        
        container.find('.jsDropCheck.category').find('input:checked').each(function () {
          catIDs += $(this).val() + ' ';
        });        
        var searchURL = location.origin + rootURL + '?keywords=' + encodeURIComponent(keywords) 
                + '&' + 'country=' + encodeURIComponent(country) 
                + '&' + 'loc_id=' + encodeURIComponent(locIDs) 
                + '&' + 'cat_id=' + encodeURIComponent(catIDs);
        window.location.href = searchURL;
      });     
      
      $(document).on('change', '.jsJobSearchContainer .jsDropCheck input[type="checkbox"]', function (e) {
        Drupal.behaviors.droplist.checkChanged($(this));
      });
      
    }
  };
})(jQuery, Drupal);;
(function ($, Drupal) {
  Drupal.behaviors.highlightVideo = {
    attach: function (context, settings) {
      var alignHeight = function (containerClass) {
        var maxHeight = 0;
        $(containerClass + ' .af-text').each(function (index) {
          if ($(this).height() > maxHeight)
            maxHeight = $(this).height();
        });
        $(containerClass).height(maxHeight);        
      };
      var videoResize = function () {
        var wsize = $(window).width();
        if (wsize > 1024) {
          alignHeight('.mc-videoHighlight__occupation');
          alignHeight('.mc-videoHighlight__bio');
          alignHeight('.mc-videoHighlight__ctaSummary');
        }
      };
      window.addEventListener('resize', videoResize);
      videoResize();

    }
  };
})(jQuery, Drupal);


;
(function ($, Drupal) {
  Drupal.behaviors.curtainVideo = {
    attach: function (context, settings) {
      var curtainSlide = function(parent) {
        $(parent).find('.jsCurtain.left')[0].style.transform = "translatex(-150vw) ";
        $(parent).find('.jsCurtain.right')[0].style.transform = "translatex(150vw) ";
      };
      $('.jsCurtainBody').click(function(e){
        var curtain = $(this);
        curtainSlide(curtain);
        setTimeout(function () {
          $(curtain).siblings('.jsCurtainInner').css('z-index','2');
        }, 2000);		
      });
    }
  };
})(jQuery, Drupal);


;
(function ($, Drupal) {
  Drupal.behaviors.accordionTabs = {
    attach: function (context, settings) {
      // https://www.educba.com/jquery-keycode/
      $('.jsAccordionTab').keydown(function (e) {
        if (e.which === 39 || e.which === 40) {
          $(this).next().click().focus();
        }else if(e.which === 37 || e.which === 38){
          $(this).prev().click().focus();
        }else if(e.which === 13){
          $(this).click();
        }
      });
      $('.jsAccordionTab').click(function (e) {
        var container = $(this).parents('.jsAccordionContainer');
        var index = $(this).data('index');
        if (!$(this).hasClass('active')) {
          $(this).siblings('.jsAccordionTab').removeClass('active').attr('tabindex','-1').attr('aria-selected','false');
          container.find('.jsAccordionPane').removeClass('active');
          $(this).addClass('active').attr('tabindex','0').attr('aria-selected','true');
          container.find('.jsAccordionPane[data-index=' + index + ']').addClass('active');
        }
        e.stopImmediatePropagation();
        e.preventDefault();
      });
      $('.jsAccordionSelect').select2({
        minimumResultsForSearch: -1
      });
      $('.jsAccordionSelect').next('.select2').find('.select2-selection').attr('role','listbox').attr('aria-labelledby','accordion-label');	      
      $('.jsAccordionSelect').change(function(e){
        var container = $(this).parents('.jsAccordionContainer');
        var index = $(this).val();
        container.find('.jsAccordionPane').removeClass('active');
        container.find('.jsAccordionPane[data-index=' + index + ']').addClass('active');
      });
    }
  };
})(jQuery, Drupal);


;
(function ($, Drupal) {
  Drupal.behaviors.collapseGroup = {
    attach: function (context, settings) {
      $('.jsExpandAllToggle').click(function (e) {
        var container = $(this).parents('.jsCollapseGroup');
        if($(this).hasClass('expand')){
          // expand all
          $(container).find('.jsCollapseSwitch').attr('aria-expanded','true');
          $(container).find('.jsCollapsePane').addClass('show');
          $(this).find('span').html($(this).data('collapse'));
          $(this).removeClass('expand');          
        }else{
          // collapse all
          $(container).find('.jsCollapseSwitch').attr('aria-expanded','false');
          $(container).find('.jsCollapsePane').removeClass('show');
          $(this).find('span').html($(this).data('expand'));
          $(this).addClass('expand');          
        }
        e.stopImmediatePropagation();
        e.preventDefault();
      });
    }
  };
})(jQuery, Drupal);


;
(function ($, Drupal) {
  Drupal.behaviors.carouselSide = {
    attach: function (context, settings) {
      var prepareSlides = function (container, centerIndex) {
        var centerTile = container.find('.slick-slide[data-slick-index=' + centerIndex + ']');
        centerTile.removeClass('left right');
        //('.slick-slide.slick-cloned').removeClass('left right');
        centerTile.next('.slick-slide').removeClass('left right').addClass('right');
        centerTile.prev('.slick-slide').removeClass('left right').addClass('left');
        //('.slick-slide.slick-cloned').removeClass('left right');
      };

      $('.jsImageCarousel').slick({
        dots: true,
        centerMode: true,
        variableWidth: true,
        centerPadding: 0,
        //slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        swipe: true,
        swipeToSlide: true,
        infinite: true,
      });
      prepareSlides($('.jsImageCarousel'), 0);
      $('.jsImageCarousel').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        prepareSlides($(this), nextSlide);
      });
      $('.jsImageCarousel').on('afterChange', function (event, slick, currentSlide) {
        $(this).find('.slick-dots button').each(function (index) {
          var imageAlt = $('.slick-slide[data-slick-index=' + index + '] img').attr('alt');
          $(this).attr('aria-label', 'Display image ' + (index + 1) + ' ' + imageAlt);
          if (currentSlide == index)
            $(this).focus();
        });
      });

      $('.jsImageCarousel').find('.slick-dots button').each(function (index) {
        var imageAlt = $('.slick-slide[data-slick-index=' + index + '] img').attr('alt');
        $(this).attr('aria-label', 'Display image ' + (index + 1) + ' ' + imageAlt);
      });
    }
  };
})(jQuery, Drupal);

;
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function ($, Drupal, drupalSettings) {
  Drupal.behaviors.predictionOrb = {
    attach: function (context, settings) {
      var orb_words = [
        'Your future looks bright',
        'The sky’s the limit',
        'New possibilities are on the horizon'/*,
         'The stars are aligning',
         'Exciting things are coming',
         'Your dreams will lead you',
         'Soon you will achieve greatness',
         'You’re ready for what’s next',
         'Nothing can stop you',
         'You’ll change the world',
         'Big journeys start with a step',
         'You can and will',
         'The best is yet to come',
         'Your time is now',
         'Live your purpose',
         'Don’t pursue happiness – create it',
         'Hard work pays off',
         'Reach new heights',
         'Believe in the evolution of you'*/
      ];
      if (drupalSettings.orbMessageList) {
        orb_words = drupalSettings.orbMessageList;
      }
      var getRandomWord = function () {
        return orb_words[Math.floor(Math.random() * orb_words.length)];
      };
      var orbCallback = function (textElement) {
        var speed = 800;
        if ($(textElement).hasClass('polygon')) {
          $(textElement).fadeOut(speed, function () {
            $(textElement).find('.af-text').html(getRandomWord());
            $(textElement).fadeIn(speed);
          });
        } else {
          $(textElement).find('.af-text').html(getRandomWord());
          $(textElement).addClass("polygon");
        }
      };
      $('.oc-prOrb__startText').keypress(function (event) {
        if (event.which == 13)
          orbCallback($(this));
      });
      $('.oc-prOrb__startText').click(function (event) {
        orbCallback($(this));
      });
    }
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal) {
  Drupal.behaviors.tabContainer = {
    attach: function (context, settings) {
      var tabSwitch = function(tab){
        var container = $(tab).parents('.jsTabContainer');
        var index = $(tab).data('index');
        if (!$(tab).hasClass('active')) {
          $(tab).siblings('.jsTabTrigger').removeClass('active').attr('tabindex','-1').attr('aria-selected','false');
          container.find('.jsTabPane').removeClass('active');
          var newWindowWidth = $(window).width();
          $(tab).addClass('active').attr('tabindex','0').attr('aria-selected','true');
          container.find('.jsTabPane[data-index=' + index + ']').addClass('active')
        }
      };
      var hashChange = function(){
        var anchorHash = window.location.href.toString();
        if( anchorHash.lastIndexOf('#') != -1 ) {
          anchorHash = anchorHash.substr(anchorHash.lastIndexOf('#'));
          if( $('.jsTabTrigger[href="'+ anchorHash +'"]').length > 0 ) {
            tabSwitch($('.jsTabTrigger[href="'+ anchorHash +'"]'));
          }
        }      
      };
      
      if(context===document){
        // for mobile, active tab scroll to center
        var activeTab = document.querySelector('.jsTabLink.active');
        if (activeTab) {
          var scrollLeftPos = activeTab.offsetLeft - activeTab.parentNode.offsetLeft;
          activeTab.parentNode.scrollLeft = scrollLeftPos;
        }
      }
      
      $('.jsTabTrigger').click(function (e) {
        tabSwitch($(this));
        var href = $(this).attr('href');
        var hash = href.substr(href.indexOf('#')+1);
        if(hash != '')
          window.location.hash = hash;     
        e.stopImmediatePropagation();
        e.preventDefault();
      });      

      $('.jsTabTrigger').keydown(function (e) {
        if (e.which === 39 || e.which === 40) {
          $(this).next().click().focus();
        }else if(e.which === 37 || e.which === 38){
          $(this).prev().click().focus();
        }else if(e.which === 13){
          $(this).click();
        }
      });

      hashChange();
      window.addEventListener("hashchange", hashChange, false);      
    }
  };
})(jQuery, Drupal);


;
var curPRPage = 1;
var curPRLimit = 10;
(function ($, Drupal) {
  Drupal.behaviors.prList = {
    attach: function (context, settings) {
      if (context === document) {
        $('.oc-prPromoList').parents('body').addClass('prPromoPage');
      }
      $('.jsPRCatSelect').select2({
        minimumResultsForSearch: -1
      });
      $('.jsPRCatSelect').next('.select2').find('.select2-selection').attr('role','listbox').attr('aria-labelledby','pr-filter-label');	      
      $('.jsCisionApply').click(function(e){
        var rootURL = $(this).find('a').attr('href');
        var catID = $(this).siblings().find('.jsPRCatSelect').val();
        if(catID >= 0){
          window.location.href = rootURL + '?category=' + catID;
          e.stopImmediatePropagation();
          e.preventDefault();
        }
      });
      
      $(document).on('PagerLoadContent','.jsPager', function(e, curPage, limit){
        if(curPRPage != curPage || curPRLimit != limit){
          curPRPage = curPage;
          curPRLimit = limit;
          var container = $(this).parents('.jsPagerContainer');
          var offset = (curPage-1) * $(container).data('limit');
          $('.jsCisionCardList').html('<div class="loading"><i class="fas fa-spinner fa-spin"></i></div>');
          $.ajax({
            url: '/api/press/'+$(container).data('catid')+'/' + $(container).data('limit') + '/' + offset + '/' + $(container).data('cardcols'),
            success: function (data) {
              $('.jsCisionCardList').html(data.content);
            }
          });
        }
      });
      
      $('.jsEventFilterSubmit').click(function(e){
        var container = $(this).parents('.jsEventFilterContainer');
        var query = '';
        container.find('.jsDropSelect').each(function(){
          if($(this).val() !== ''){
            if (query != '') query += '&';
            query += $(this).data('key') + '=' + $(this).val();
          }
        });
        query = query=='' ? '' : ('?'+query);
        window.location.href = window.location.protocol + '//' + window.location.host + window.location.pathname + query + '#nav';
        e.stopImmediatePropagation();
        e.preventDefault();
      });

    }
  };
})(jQuery, Drupal);;
(function ($, Drupal) {
  Drupal.behaviors.contentDetail = {
    attach: function (context, settings) {
      $('.jsExpandTrigger').click(function(e){
        $(this).siblings('.jsExpandPane').addClass('active');
        $(this).removeClass('active');
        e.stopImmediatePropagation();
        e.preventDefault();
      });
      $('.jsCollapseTrigger').click(function(e){
        $(this).parents('.jsExpandPane').removeClass('active').siblings('.jsExpandTrigger').addClass('active');
        e.stopImmediatePropagation();
        e.preventDefault();
      });

      $('.oc-general__collapseButton').on('click', function () {
        if($(this).hasClass('open')) {
          $('.-collapsible').each(function() {
            $(this).find('.mc-basicContent__body').hide();
            $(this).find('.mc-basicContent__icon').removeClass('fa-caret-up').addClass('fa-caret-down');
            $(this).find('.jsCollapsible').attr('aria-expanded','false');            
          });
          $(this).toggleClass('open').find('span').text(Drupal.t('Expand all terms'));
          $(this).find('i').removeClass('fa-minus-circle').addClass('fa-plus-circle');
        }else {          
          $('.-collapsible').each(function() {
            $(this).find('.mc-basicContent__body').show();
            $(this).find('.mc-basicContent__icon').removeClass('fa-caret-down').addClass('fa-caret-up');
            $(this).find('.jsCollapsible').attr('aria-expanded','true');            
          });
          $(this).toggleClass('open').find('span').text(Drupal.t('Collapse all terms'));
          $(this).find('i').removeClass('fa-plus-circle').addClass('fa-minus-circle');
        }
      });
      if($('.-collapsible').length > 0){
        $('.oc-general__rgnButton').insertBefore($('.-collapsible').first()).addClass('active');
      }
    }
  };
})(jQuery, Drupal);
;
var counterJoinForm = 0;
(function ($, Drupal) {
  Drupal.behaviors.pageJS = {
    attach: function (context, settings) {
      var headerScroll = function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 0) {
          $('body.user-anonymous .oc-header').addClass('sticky');
        } else {
          $('body.user-anonymous .oc-header').removeClass('sticky');
        }
      };
      window.addEventListener('scroll', headerScroll);
      headerScroll();

      var btnClearFilter = $('.view-filters .form-actions input:nth-child(2)');
      if (btnClearFilter.length > 0) {
        btnClearFilter.hide();
        $('.jsViewsClearFilter').show();
      }
      $('.jsViewsClearFilter').click(function (e) {
        $(this).parents('.view-filters').find('.form-actions input:nth-child(2)').click();
        e.stopImmediatePropagation();
        e.preventDefault();
      });

      $(document).on('change', '.view-filters .jsDropCheck input[type="checkbox"]', function (e) {
        Drupal.behaviors.droplist.checkChanged($(this));
      });

      $('.jsJobFilterRaw .jsDropCheck').each(function () {
        var targetFieldID = $(this).find('.jsDropTrigger').data('result-target');
        var values = $('input[data-drupal-selector=' + targetFieldID + ']').val();
        var total = values != '' ? values.split(" ").length - 1 : 0;
        $(this).find('.jsDropTitle').text(total == 0 ? 'All' : (total == 1 ? total + ' item selected' : total + ' items selected'));
        $(this).find('input').each(function (e) {
          if (values.indexOf($(this).val()) != -1) {
            $(this).prop('checked', true);
          } else {
            $(this).prop('checked', false);
          }
        });
        if ($('input[data-drupal-selector=' + targetFieldID + ']').parent('.js-form-item').next('.jsDropCheck').length <= 0)
          $('input[data-drupal-selector=' + targetFieldID + ']').parent('.js-form-item').after($(this).clone().addClass('cloned'));
      });


      $(document).on('change', '.view-filters .jsCheckbox input[type="checkbox"]', function (e) {
        var targetFieldID = $(this).data('result-target');
        $('input[data-drupal-selector=' + targetFieldID + ']').val($(this).is(':checked') ? '1' : '');
      });

      $('.jsJobFilterRaw .jsCheckbox').each(function () {
        var checkbox = $(this).find('input[type="checkbox"]');
        var targetFieldID = $(checkbox).data('result-target');
        var value = $('input[data-drupal-selector=' + targetFieldID + ']').val();
        if (value)
          $(checkbox).prop('checked', true);
        else
          $(checkbox).prop('checked', false);
        if ($('input[data-drupal-selector=' + targetFieldID + ']').parent('.js-form-item').next('.jsCheckbox').length <= 0)
          $('input[data-drupal-selector=' + targetFieldID + ']').parent('.js-form-item').after($(this).clone().addClass('cloned'));
      });

      $('.view-filters .jsDropCheckList').collapse('hide');
      if (window.screen.width > 1024) {
        // disable auto collapse for desktop
        $('.view-filters .jsDropCheckList').removeClass('autoCollapse');
      }

      $('.jsSRResultCount').html($('.jsViewsResultCount').html());

      // select2 patch for jquery 3.6+
      $(document).on('select2:open', () => {
        document.querySelector('.select2-search__field').focus();
      });

      var ifJoinForm = document.getElementById("ifJoinForm");
      if(ifJoinForm){
        ifJoinForm.onload = function () {
          if (counterJoinForm++ > 0 ) {
            $("#ifJoinForm").addClass("confirm");
          }
        }
      }
      
    }

  };

})(jQuery, Drupal);;
(function ($, Drupal) {
  Drupal.behaviors.webformJS = {
    attach: function (context, settings) {
      var zipFormat = function (input, format, hyphen) {
        var output = "";
        var idx = 0;
        for (var i = 0; i < format.length && idx < input.length; i++) {
          output += input.substr(idx, format[i]);
          if (idx + format[i] < input.length)
            output += hyphen;
          idx += format[i];
        }
        output += input.substr(idx);
        return output;
      }

      $('#edit-country').change(function () {
        var countryCode = $(this).val().toLowerCase();
        $('span[aria-labelledby="select2-edit-country-container"] .select2-selection__rendered').css({'background-image': 'url("/act-root/novavax/assets/icons/flags/' + countryCode + '.svg")', 'background-repeat': 'no-repeat', 'padding-left': '60px'});
      });

      $('#edit-zip-code').keyup(function () {
        var zipCode = $(this).val().replace(/-/g, ""); // remove hyphens
        var zipCode = $(this).val().replace(/\D/g, ""); // remove alphabet
        if (zipCode.length > 0) {
          zipCode = zipFormat(zipCode, [5, 4], "-");
        }
        $(this).val(zipCode);
      });
      var errMsg = $('div[aria-label="Error message"]').html();
      if (errMsg) {
        if (errMsg.indexOf('CAPTCHA') != -1) {
          $('.captcha').append('<div class="invalid-captcha">'+Drupal.t("Verification is required.")+'</div>');
        }
      }
      setTimeout(function () {
        $('select[name="what_best_describes_you"]').prev('label').attr('id', 'what-best-describes-you');
        if ($('select[name="what_best_describes_you"]').hasClass('error')) {
          $('#what-best-describes-you').append('<span class="sr-only"> '+Drupal.t("is required")+'</span>');
        }
        $('select[name="what_best_describes_you"]').next('.select2').find('.select2-selection').attr('role', 'listbox').attr('aria-labelledby', 'what-best-describes-you');
        $('select[name="country"]').prev('label').attr('id', 'country-label');
        if ($('select[name="country"]').hasClass('error')) {
          $('#country-label').append('<span class="sr-only"> '+Drupal.t("is required")+'</span>');
        }
        $('select[name="country"]').next('.select2').find('.select2-selection').attr('role', 'listbox').attr('aria-labelledby', 'country-label');
        $('select[name="inquiry_topic"]').prev('label').attr('id', 'inquiry-topic');
        if ($('select[name="inquiry_topic"]').hasClass('error')) {
          $('#inquiry-topic').append('<span class="sr-only"> '+Drupal.t("is required")+'</span>');
        }
        $('select[name="inquiry_topic"]').next('.select2').find('.select2-selection').attr('role', 'listbox').attr('aria-labelledby', 'inquiry-topic');
        $('textarea[name="message"]').parent().parent().find('label').attr('id', 'message');
        if ($('textarea[name="message"]').hasClass('error')) {
          $('#message').append('<span class="sr-only"> '+Drupal.t("is required")+'</span>');
        }
        var messageLabelValue = $('#edit-message--description').text();
        $('#message').append('<span class="sr-only">'+Drupal.t(messageLabelValue)+'</span>');
      }, 500);
      if ($(".has-error").html()) {
        $('.required.error.is-invalid').each(function () {
          $(this).attr('aria-label', $(this).parent().find('.invalid-feedback').text().trim());
        });
        if ($(".has-error").length) {
          setTimeout(function () {

            if ($(".has-error").length) {
              $('html, body').animate({
                scrollTop: $(".has-error").first().offset().top - 150
              }, 2000);
            }
            $(".has-error").first().find('input').focus();
            $(".has-error").first().find('select').focus();
            $(".has-error").first().find('textarea').focus();
          }, 500);
        }
      } else {
        if ($(".has-error").length) {
          $('html, body').animate({
            scrollTop: $(".webform-progress").first().offset().top
          }, 2000);
        }
      }
      if($(".webform-submission-clinical-inquiry-form .webform-progress__status .step").length<=0){
        $(".webform-submission-clinical-inquiry-form .webform-progress__status").prepend($("<span class='step'>Step </span>"));
      }
      $(".webform-submission-clinical-inquiry-form .description.text-muted").each(function () {
        $(this).parents('.js-webform-type-radios').find('legend').append($(this));
      });
      $(".page-clinical-inquiry input[data-drupal-selector='edit-preview-prev']").attr('value', 'Back to Step 3');
      $(".page-clinical-inquiry input[data-drupal-selector='edit-submit']").attr('value', 'Submit form');
      $(".page-clinical-inquiry .webform-button--preview").attr('value', 'Review summary');

      //var clinicalButtons = document.querySelectorAll('.form-actions .btn');
      //console.log(clinicalButtons.length);
      if($('.clinical-next').length<=0){
        $('.page-clinical-inquiry .webform-button--next').wrap('<div class="clinical-next"></div>');
        $('.page-clinical-inquiry .webform-button--preview').wrap('<div class="clinical-next"></div>');
      }
      if($('.clinical-prev').length<=0){
        $('.page-clinical-inquiry .webform-button--previous').wrap('<div class="clinical-prev"></div>');
      }
      if($('.clinical-submit').length<=0){
        $('.page-clinical-inquiry .webform-button--submit').wrap('<div class="clinical-submit"></div>');
      }
      $(".page-clinical-inquiry select[data-drupal-selector='edit-country-region']").removeAttr('aria-hidden');
    }
  };

})(jQuery, Drupal);;
/**
 * @file
 * External links js file.
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  Drupal.extlink = Drupal.extlink || {};

  Drupal.extlink.attach = function (context, drupalSettings) {
    if (typeof drupalSettings.data === 'undefined' || !drupalSettings.data.hasOwnProperty('extlink')) {
      return;
    }

    // Define the jQuery method (either 'append' or 'prepend') of placing the
    // icon, defaults to 'append'.
    var extIconPlacement = 'append';
    if (drupalSettings.data.extlink.extIconPlacement && drupalSettings.data.extlink.extIconPlacement != '0') {
          extIconPlacement = drupalSettings.data.extlink.extIconPlacement;
        }

    // Strip the host name down, removing ports, subdomains, or www.
    var pattern = /^(([^\/:]+?\.)*)([^\.:]{1,})((\.[a-z0-9]{1,253})*)(:[0-9]{1,5})?$/;
    var host = window.location.host.replace(pattern, '$2$3$6');
    var subdomain = window.location.host.replace(host, '');

    // Determine what subdomains are considered internal.
    var subdomains;
    if (drupalSettings.data.extlink.extSubdomains) {
      subdomains = '([^/]*\\.)?';
    }
    else if (subdomain === 'www.' || subdomain === '') {
      subdomains = '(www\\.)?';
    }
    else {
      subdomains = subdomain.replace('.', '\\.');
    }

    // Whitelisted domains.
    var whitelistedDomains = false;
    if (drupalSettings.data.extlink.whitelistedDomains) {
      whitelistedDomains = [];
      for (var i = 0; i < drupalSettings.data.extlink.whitelistedDomains.length; i++) {
        whitelistedDomains.push(new RegExp('^https?:\\/\\/' + drupalSettings.data.extlink.whitelistedDomains[i].replace(/(\r\n|\n|\r)/gm,'') + '.*$', 'i'));
      }
    }

    // Build regular expressions that define an internal link.
    var internal_link = new RegExp('^https?://([^@]*@)?' + subdomains + host, 'i');

    // Extra internal link matching.
    var extInclude = false;
    if (drupalSettings.data.extlink.extInclude) {
      extInclude = new RegExp(drupalSettings.data.extlink.extInclude.replace(/\\/, '\\'), 'i');
    }

    // Extra external link matching.
    var extExclude = false;
    if (drupalSettings.data.extlink.extExclude) {
      extExclude = new RegExp(drupalSettings.data.extlink.extExclude.replace(/\\/, '\\'), 'i');
    }

    // Extra external link CSS selector exclusion.
    var extCssExclude = false;
    if (drupalSettings.data.extlink.extCssExclude) {
      extCssExclude = drupalSettings.data.extlink.extCssExclude;
    }

    // Extra external link CSS selector explicit.
    var extCssExplicit = false;
    if (drupalSettings.data.extlink.extCssExplicit) {
      extCssExplicit = drupalSettings.data.extlink.extCssExplicit;
    }

    // Find all links which are NOT internal and begin with http as opposed
    // to ftp://, javascript:, etc. other kinds of links.
    // When operating on the 'this' variable, the host has been appended to
    // all links by the browser, even local ones.
    // In jQuery 1.1 and higher, we'd use a filter method here, but it is not
    // available in jQuery 1.0 (Drupal 5 default).
    var external_links = [];
    var mailto_links = [];
    $('a:not([data-extlink]), area:not([data-extlink])', context).each(function (el) {
      try {
        var url = '';
        if (typeof this.href == 'string') {
          url = this.href.toLowerCase();
        }
        // Handle SVG links (xlink:href).
        else if (typeof this.href == 'object') {
          url = this.href.baseVal;
        }
        if (url.indexOf('http') === 0
          && ((!internal_link.test(url) && !(extExclude && extExclude.test(url))) || (extInclude && extInclude.test(url)))
          && !(extCssExclude && $(this).is(extCssExclude))
          && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
          && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
          var match = false;
          if (whitelistedDomains) {
            for (var i = 0; i < whitelistedDomains.length; i++) {
              if (whitelistedDomains[i].test(url)) {
                match = true;
                break;
              }
            }
          }
          if (!match) {
            external_links.push(this);
          }
        }
        // Do not include area tags with begin with mailto: (this prohibits
        // icons from being added to image-maps).
        else if (this.tagName !== 'AREA'
          && url.indexOf('mailto:') === 0
          && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
          && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
          mailto_links.push(this);
        }
      }
      // IE7 throws errors often when dealing with irregular links, such as:
      // <a href="node/10"></a> Empty tags.
      // <a href="http://user:pass@example.com">example</a> User:pass syntax.
      catch (error) {
        return false;
      }
    });

    if (drupalSettings.data.extlink.extClass !== '0' && drupalSettings.data.extlink.extClass !== '') {
      Drupal.extlink.applyClassAndSpan(external_links, drupalSettings.data.extlink.extClass, extIconPlacement);
    }

    if (drupalSettings.data.extlink.mailtoClass !== '0' && drupalSettings.data.extlink.mailtoClass !== '') {
      Drupal.extlink.applyClassAndSpan(mailto_links, drupalSettings.data.extlink.mailtoClass, extIconPlacement);
    }

    if (drupalSettings.data.extlink.extTarget) {
      // Apply the target attribute to all links.
      $(external_links).filter(function () {
        // Filter out links with target set if option specified.
        return !(drupalSettings.data.extlink.extTargetNoOverride && $(this).is('a[target]'));
      }).attr({target: '_blank'});

      // Add noopener rel attribute to combat phishing.
      $(external_links).attr('rel', function (i, val) {
        // If no rel attribute is present, create one with the value noopener.
        if (val === null || typeof val === 'undefined') {
          return 'noopener';
        }
        // Check to see if rel contains noopener. Add what doesn't exist.
        if (val.indexOf('noopener') > -1) {
          if (val.indexOf('noopener') === -1) {
            return val + ' noopener';
          }
          // Noopener exists. Nothing needs to be added.
          else {
            return val;
          }
        }
        // Else, append noopener to val.
        else {
          return val + ' noopener';
        }
      });
    }

    if (drupalSettings.data.extlink.extNofollow) {
      $(external_links).attr('rel', function (i, val) {
        // When the link does not have a rel attribute set it to 'nofollow'.
        if (val === null || typeof val === 'undefined') {
          return 'nofollow';
        }
        var target = 'nofollow';
        // Change the target, if not overriding follow.
        if (drupalSettings.data.extlink.extFollowNoOverride) {
          target = 'follow';
        }
        if (val.indexOf(target) === -1) {
          return val + ' nofollow';
        }
        return val;
      });
    }

    if (drupalSettings.data.extlink.extNoreferrer) {
      $(external_links).attr('rel', function (i, val) {
        // When the link does not have a rel attribute set it to 'noreferrer'.
        if (val === null || typeof val === 'undefined') {
          return 'noreferrer';
        }
        if (val.indexOf('noreferrer') === -1) {
          return val + ' noreferrer';
        }
        return val;
      });
    }

    Drupal.extlink = Drupal.extlink || {};

    // Set up default click function for the external links popup. This should be
    // overridden by modules wanting to alter the popup.
    Drupal.extlink.popupClickHandler = Drupal.extlink.popupClickHandler || function () {
      if (drupalSettings.data.extlink.extAlert) {
        return confirm(drupalSettings.data.extlink.extAlertText);
      }
    };

    $(external_links).off("click.extlink");
    $(external_links).on("click.extlink", function (e) {
      return Drupal.extlink.popupClickHandler(e, this);
    });
  };

  /**
   * Apply a class and a trailing <span> to all links not containing images.
   *
   * @param {object[]} links
   *   An array of DOM elements representing the links.
   * @param {string} class_name
   *   The class to apply to the links.
   * @param {string} icon_placement
   *   'append' or 'prepend' the icon to the link.
   */
  Drupal.extlink.applyClassAndSpan = function (links, class_name, icon_placement) {
    var $links_to_process;
    if (drupalSettings.data.extlink.extImgClass) {
      $links_to_process = $(links);
    }
    else {
      var links_with_images = $(links).find('img, svg').parents('a');
      $links_to_process = $(links).not(links_with_images);
    }

    if (class_name !== '0') {
      $links_to_process.addClass(class_name);
    }

    // Add data-extlink attribute.
    $links_to_process.attr('data-extlink', '');

    var i;
    var length = $links_to_process.length;
    for (i = 0; i < length; i++) {
      var $link = $($links_to_process[i]);
      if (drupalSettings.data.extlink.extUseFontAwesome) {
        if (class_name === drupalSettings.data.extlink.mailtoClass) {
          $link[icon_placement]('<span class="fa-' + class_name + ' extlink"><span class="' + drupalSettings.data.extlink.extFaMailtoClasses + '" aria-label="' + drupalSettings.data.extlink.mailtoLabel + '"></span></span>');
        }
        else {
          $link[icon_placement]('<span class="fa-' + class_name + ' extlink"><span class="' + drupalSettings.data.extlink.extFaLinkClasses + '" aria-label="' + drupalSettings.data.extlink.extLabel + '"></span></span>');
        }
      }
      else {
        if (class_name === drupalSettings.data.extlink.mailtoClass) {
          $link[icon_placement]('<svg focusable="false" class="' + class_name + '" role="img" aria-label="' + drupalSettings.data.extlink.mailtoLabel + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 10 70 20"><metadata><sfw xmlns="http://ns.adobe.com/SaveForWeb/1.0/"><sliceSourceBounds y="-8160" x="-8165" width="16389" height="16384" bottomLeftOrigin="true"/><optimizationSettings><targetSettings targetSettingsID="0" fileFormat="PNG24Format"><PNG24Format transparency="true" filtered="false" interlaced="false" noMatteColor="false" matteColor="#FFFFFF"/></targetSettings></optimizationSettings></sfw></metadata><title>' + drupalSettings.data.extlink.mailtoLabel + '</title><path d="M56 14H8c-1.1 0-2 0.9-2 2v32c0 1.1 0.9 2 2 2h48c1.1 0 2-0.9 2-2V16C58 14.9 57.1 14 56 14zM50.5 18L32 33.4 13.5 18H50.5zM10 46V20.3l20.7 17.3C31.1 37.8 31.5 38 32 38s0.9-0.2 1.3-0.5L54 20.3V46H10z"/></svg>');
        }
        else {
          $link[icon_placement]('<svg focusable="false" class="' + class_name + '" role="img" aria-label="' + drupalSettings.data.extlink.extLabel + '" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 40"><metadata><sfw xmlns="http://ns.adobe.com/SaveForWeb/1.0/"><sliceSourceBounds y="-8160" x="-8165" width="16389" height="16384" bottomLeftOrigin="true"/><optimizationSettings><targetSettings targetSettingsID="0" fileFormat="PNG24Format"><PNG24Format transparency="true" filtered="false" interlaced="false" noMatteColor="false" matteColor="#FFFFFF"/></targetSettings></optimizationSettings></sfw></metadata><title>' + drupalSettings.data.extlink.extLabel + '</title><path d="M48 26c-1.1 0-2 0.9-2 2v26H10V18h26c1.1 0 2-0.9 2-2s-0.9-2-2-2H8c-1.1 0-2 0.9-2 2v40c0 1.1 0.9 2 2 2h40c1.1 0 2-0.9 2-2V28C50 26.9 49.1 26 48 26z"/><path d="M56 6H44c-1.1 0-2 0.9-2 2s0.9 2 2 2h7.2L30.6 30.6c-0.8 0.8-0.8 2 0 2.8C31 33.8 31.5 34 32 34s1-0.2 1.4-0.6L54 12.8V20c0 1.1 0.9 2 2 2s2-0.9 2-2V8C58 6.9 57.1 6 56 6z"/></svg>');
        }
      }
    }
  };

  Drupal.behaviors.extlink = Drupal.behaviors.extlink || {};
  Drupal.behaviors.extlink.attach = function (context, drupalSettings) {
    // Backwards compatibility, for the benefit of modules overriding extlink
    // functionality by defining an "extlinkAttach" global function.
    if (typeof extlinkAttach === 'function') {
      extlinkAttach(context);
    }
    else {
      Drupal.extlink.attach(context, drupalSettings);
    }
  };

})(jQuery, Drupal, drupalSettings);
;
/*! js-cookie v3.0.1 | MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,o=e.Cookies=t();o.noConflict=function(){return e.Cookies=n,o}}())}(this,(function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)e[o]=n[o]}return e}return function t(n,o){function r(t,r,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n.write(r,t)+c}}return Object.create({set:r,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],o={},r=0;r<t.length;r++){var i=t[r].split("="),c=i.slice(1).join("=");try{var u=decodeURIComponent(i[0]);if(o[u]=n.read(c,u),e===u)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){r(t,"",e({},n,{expires:-1}))},withAttributes:function(n){return t(this.converter,e({},this.attributes,n))},withConverter:function(n){return t(e({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(n)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}));
;
