(function ($, Drupal, drupalSettings) {
  'use strict';

    Drupal.behaviors.mixer = {
      attach: function (context, settings) {
        $('.sch-mixer').once('mixer').each(function () {

          var mixerID = this.id;  
          var componentCount = $(this).find('.sch-mixer--count').attr('data-count');
          var mixerType = $(this).attr('data-type');
          var localStorageMixerIndex = 'schwab_mixer_ndx_';

          const urlParams = new URLSearchParams(window.location.search);
          const paramOverride = urlParams.get('mxr_' + mixerID);

          if (paramOverride){
            //If the "mxr" qstring param is set, use the subcomponent number with that value
            $(this).find('.sch-mixer-component#' + paramOverride).show();
          }
          else if (mixerType === "rotate") {
            // If the mixer is set to rotate get the current index from LocalStorage, display it and increment it
            var indexNum = localStorage.getItem(localStorageMixerIndex + mixerID) || 0;
            indexNum++;
            $(this).find('.sch-mixer-component#' + indexNum).show();
            indexNum = (indexNum + 1 > componentCount) ? 0 : indexNum;
            localStorage.setItem(localStorageMixerIndex + mixerID, indexNum);
          } else if(mixerType === "random"){
            // Display a random subcomponent
            $(this).find('.sch-mixer-component#' + getRandomIntInclusive(1, componentCount)).show();
          } else if(mixerType === "static"){
            // Display a static first subcomponent
            $(this).find('.sch-mixer-component:first-child').show();
          }
        });
      }

    };

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

}(jQuery, Drupal, drupalSettings));
