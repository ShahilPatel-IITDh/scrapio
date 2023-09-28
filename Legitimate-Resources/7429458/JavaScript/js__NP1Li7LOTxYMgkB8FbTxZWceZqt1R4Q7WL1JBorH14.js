(function(Drupal){'use strict';Drupal.behaviors.addToAny={attach:function(context,settings){if(context!==document&&window.a2a)a2a.init_all()}}})(Drupal);
(function($){Drupal.behaviors.dataLayer={langPrefixes:function langPrefixes(){var languages=Drupal.settings.dataLayer.languages,langList=[];for(var lang in languages)if(languages[lang].prefix!=='')langList.push(languages[lang].prefix);return langList},attach:function(){return}}})(jQuery);
(function($,Drupal,drupalSettings){if(drupalSettings.ga4.config.container_id){window.dataLayerGA4=window.dataLayerGA4||[];function gtag(){dataLayerGA4.push(arguments)};gtag('js',new Date());gtag('config',drupalSettings.ga4.config.container_id)}})(jQuery,Drupal,drupalSettings);
(function ($, Drupal, drupalSettings) {
  'use strict';


  let iframes_info = [];
  let player = [];
  let multiDowloadTempStorage = [];

//GA4 functionality

  function createEvent(eventProperty) {
    const localEventProperty = $.extend(true, {}, eventProperty);
    if (!localEventProperty.name && !localEventProperty.parameters) {
      return;
    }

    if (localEventProperty.trigger) {
      switch (localEventProperty.trigger) {
        case 'onload':
          localEventProperty.parameters = checkTokens(this, localEventProperty.parameters);
          pushEvent(localEventProperty);
          break;

        default:
          if (localEventProperty.trigger_property) {
            setEventTriggeredBy(localEventProperty)
          }
          break;
      }
    }
  }

  function setEventTriggeredBy(eventProperty) {
    const triggerDefinition = getTriggerDefinition(eventProperty);

    //eventListener is set to âbodyâ to go around the need to reload triggers when page elements are refreshed via ajax
    $("body").click(function (e) {
      const localEventProperty = $.extend(true, {}, eventProperty);
      const target = e.target; // .target is the currently clicked element, e.g. <span>Download</span> or <svg [...]>[...]</svg>.

      if (target && $(target).is(triggerDefinition)) {
        createEventTriggeredBy(localEventProperty, target);
      }
      else {
        const parents = $(target).parentsUntil(triggerDefinition);
        const trigger = $(parents[parents.length - 1]).parent();

        if (trigger && $(trigger).is(triggerDefinition)) {
          createEventTriggeredBy(localEventProperty, trigger);
        }
      }
    });
  }

  function createEventTriggeredBy(eventProperty, element) {
    let localEventProperty = $.extend(true, {}, eventProperty);
    localEventProperty.parameters = checkTokens(element, localEventProperty.parameters);

    if (localEventProperty.trigger_property.link_type
      && localEventProperty.trigger_property.link_type === 'out') {

      if (isValidUrl($(element).attr('href'), true)) {
        pushEvent(localEventProperty);
        localEventProperty = null;
      }
      return 1;
    }

    pushEvent(localEventProperty);
    localEventProperty = null;
  }

  function getTriggerDefinition(eventProperty) {

    switch (eventProperty.trigger_property.type){
      case 'class':
        if (eventProperty.trigger_property.class !== '*') {
          if (eventProperty.trigger_property.class.startsWith('.')) {
            return eventProperty.trigger + eventProperty.trigger_property.class;
          }
          else {
            return eventProperty.trigger + '.' + eventProperty.trigger_property.class;
          }

        }
        return eventProperty.trigger;

      case 'selector':
        return `[${eventProperty.trigger_property.selector.name}="${eventProperty.trigger_property.selector.value}"]`;

      case 'id':
        if (eventProperty.trigger_property.id !== '*') {
            return eventProperty.trigger + '#' + eventProperty.trigger_property.id;
        }
        return eventProperty.trigger;
    }
    return '';
  }

  async function pushEvent(eventProperty) {
    const {name, parameters} = eventProperty;
    const event = {...{'event': name}, ...parameters};
    await new Promise(() => dataLayerGA4.push(event));
  }

  function setEventForMedia(eventProperty, config) {
    const triggerDefinition = getTriggerDefinition(eventProperty);

    //eventListener is set to âbodyâ to go around the need to reload triggers when page elements are refreshed via ajax
    $("body").click(function(e) {
      const target = $(e.target); // .target is the currently clicked element, e.g. <span>Download</span>.
      if (target && target.is(triggerDefinition)) {
        createEventForMedia(eventProperty, config, target);
      }
      else if (target && $(target).parent().is(triggerDefinition)) {
        createEventForMedia(eventProperty, config, $(target).parent());
      }
    });
  }

  function createEventForMedia(eventProperty, config, element) {
    const parents = $(element).parentsUntil('.media[data-ga4-entity-id*="media/"]');
    const mediaParent = $(parents[parents.length-1]).parent();

    if (mediaParent && $(mediaParent).attr('data-ga4-entity-id')) {
      connectMediaApi($(mediaParent).attr('data-ga4-entity-id'), eventProperty, config);
    }
    else if (eventProperty.trigger === 'a') {
      const link = $(element).attr('href');
      if (link && link.search('media/') >= 0) {
        const splitLink = link.split('media/');
        if (typeof splitLink[1] !== 'number') {
          return 0;
        }
        connectMediaApi('media/' + splitLink[1], eventProperty, config);
      }
      else if ($(element).attr('data-ga4-entity-id')) {
        connectMediaApi($(element).attr('data-ga4-entity-id'), eventProperty, config);
        if (triggerDefinition) {
          $(triggerDefinition).click(function () {
            const parents = $(this).parentsUntil('.media[data-ga4-entity-id*="media/"]');
            const mediaParent = $(parents[parents.length - 1]).parent();

            // If the attribute data-ga4-entity-id is not found,
            // check the media link for its id.
            if (mediaParent && $(mediaParent).attr('data-ga4-entity-id')) {
              connectMediaApi($(mediaParent).attr('data-ga4-entity-id'), eventProperty, config)
            } else if (eventProperty.trigger === 'a') {
              const link = $(this).attr('href');
              if (link && link.search('media/') >= 0) {
                const splitLink = link.split('media/');
                if (typeof splitLink[1] !== 'number') {
                  return 0;
                }
                connectMediaApi('media/' + splitLink[1], eventProperty, config);
              } else if (eventProperty.trigger === 'a') {
                const link = $(this).attr('href');
                if (link && link.search('media/') >= 0) {
                  const splitLink = link.split('media/');
                  if (typeof splitLink[1] !== 'number') {
                    return 0;
                  }
                  connectMediaApi('media/' + splitLink[1], eventProperty, config);
                } else if ($(this).attr('data-ga4-entity-id')) {
                  connectMediaApi($(this).attr('data-ga4-entity-id'), eventProperty, config);
                }
              }
            }
          });
        }
      }
    }
  }

  function getVideoId(element) {
    let url = $(element).attr('src');

    if (url.search('/embed/') >= 0) {
      const parted_url = url.split('/embed/');
      const videoId = parted_url[1].split('?');
      if (typeof videoId[0] === "string") {
        return videoId[0];
      }
    }
  }

   function connectMediaApi(media_id, eventProperty, config) {
    $.ajax({
      url: Drupal.url(config.url),
      type: 'POST',
      dataType: 'json',
      data: {data: {event_name: eventProperty.name, entity_id: media_id, user: drupalSettings.user.uid }},
      success: function (response) {
        if (eventProperty.trigger !== 'youtube') {
          eventProperty.parameters = response.parameters;
          pushEvent(eventProperty);
        }
        else {
          eventProperty.parameters = checkTokens(eventProperty.iframe, response.parameters, eventProperty)

          pushEvent(eventProperty);
        }
      },
      error: function (response) {
        return 0;
      },
    });
  }

  function checkTokens(element, parameters, optionalData = null) {

    const token_object = new CustomToken(element, optionalData);
    Object.keys(parameters).map(key => {
      if (parameters[key].js && parameters[key].js.search('js:') >= 0) {
        const tokenValue = token_object.tokenValue(parameters[key])

        // Checking the value of the token. If empty, delete parameter.
        if (tokenValue) {
          parameters[key] = tokenValue;
        }
        else {
          delete parameters[key];
        }
      }
    });
    return parameters;
  }

  function isValidUrl(url, checkIsNotLocal = false) {
    try {
      url = new URL(url);
    } catch (_) {
      return false;
    }

    if (checkIsNotLocal && url.hostname === window.location.hostname) {
      return false;
    }

    return true;
  }

  function createEventForYouTube(event, singlePlayer, state) {
    const iframe_trigger = event.target.getIframe();

    if (!iframe_trigger) {
      return;
    }

    let localTemp;

    if (iframes_info[state]) {
      iframes_info[state].map((iframe) => {
        if (iframe.elementId == $(iframe_trigger).attr('id')) {
          localTemp  = iframe.eventProperty;
          localTemp.eventYT = event;
          localTemp.player = singlePlayer;
          localTemp.iframe = iframe;
          return localTemp;
        }
      });

      if (localTemp) {
        const parents = $(iframe_trigger).parentsUntil('.media[data-ga4-entity-id*="media/"]');
        const mediaParent = $(parents[parents.length-1]).parent();

        if (mediaParent && $(mediaParent).attr('data-ga4-entity-id')) {
          connectMediaApi($(mediaParent).attr('data-ga4-entity-id'), localTemp, drupalSettings.ga4.config)
        }
      }
    }
  }

  function getPlayer(event) {
    const iframe = event.target.getIframe();

    if($(iframe).attr('id')) {
      return player[$(iframe).attr('id')];
    }

    return null;
  }

   function createEventForForm(eventProperty) {
    const triggerDefinition = getTriggerDefinition(eventProperty);

    if(eventProperty.trigger === 'form') {

      let isWebformSeps = false;
      let eventType = eventProperty.trigger_property.form_event_type ?? 'submit';

      if(eventType === 'webform_step') {
        eventType = 'submit';
        isWebformSeps = true;
      }

      if (eventType === 'after_reload') {

        let lastFormValue = ''
        $("body").find(triggerDefinition).map((index, form) => {

          if ($(form).find('input').attr('value') && $(form).find('input').attr('value') !== lastFormValue) {
            const eventPropertyLocal = $.extend(true, {}, eventProperty);
            eventPropertyLocal.parameters = checkTokens(form, eventPropertyLocal.parameters);

            if (Object.keys(eventPropertyLocal.parameters).length > 0) {
              pushEvent(eventPropertyLocal);
            }

            lastFormValue = $(form).find('input').attr('value');
          }
        });

        return 1;
      }

       $("body").find(triggerDefinition).on(eventType, function (element) {
         const eventPropertyLocal = $.extend(true, {}, eventProperty);

         if (eventType === 'submit' && !isWebformSeps) {
           const submit_button = $(element.target).find('.webform-button--next');

           if (submit_button.length > 0) {
             return 1;
           }
         }

         if(eventPropertyLocal.algolia_form) {
           eventPropertyLocal.parameters = checkTokens(element.target, eventPropertyLocal.parameters, 'algolia_form');
         }
         else{
           eventPropertyLocal.parameters = checkTokens(element.target, eventPropertyLocal.parameters);

           //this part removes and then renews DOM relations after ajax reload
           $(document).ajaxStop(function () {
             $("body").off(eventType, triggerDefinition);
             createEventForForm(eventProperty);
           });
         }

         pushEvent(eventPropertyLocal);
       });
     }
  }

  function asyncYouTubeMediaEvents() {
    let index = 0;
    drupalSettings.ga4.events.media.map((eventProperty) => {
      if (eventProperty.trigger === 'youtube') {
        $('.media--type-remote-video iframe').each(function() {
          $(this).attr('enablejsapi', true);

          // If the parent iframe does not have an id we give it.
          if (!$(this).parent().attr('id')){
            $(this).parent().attr('id', 'ga4-video-event-id-' + index)
          }

          // If there is no container for the trigger type we add it.
          if(!iframes_info[eventProperty.trigger_property.type]) {
            iframes_info[eventProperty.trigger_property.type] = [];
          }

          // Creating a table of trigger types with all the films that work for it.
          iframes_info[eventProperty.trigger_property.type].push({
            'elementId': $(this).parent().attr('id'),
            'videoId': getVideoId(this),
            'width': $(this).attr('width'),
            'height': $(this).attr('height'),
            'eventProperty': eventProperty,
            'type': eventProperty.trigger_property.type
          })
          index++;
        });
      }
    });
  }

  function setMultiDownload(eventProperty, config) {
    const triggerDefinition = getTriggerDefinition(eventProperty);

    $(triggerDefinition + ' .document-listing__download-all-button').click(function () {
      const checkboxes = $(this).parent().parent().find('input[type="checkbox"]:checked');
      for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        const mediaItem = $(checkbox).parent().parent().find('.media[data-ga4-entity-id*="media/"]');
        if (mediaItem.length > 0 && $(mediaItem).attr('data-ga4-entity-id')) {
          if (!multiDowloadTempStorage.includes($(mediaItem).attr('data-ga4-entity-id'))) {
            connectMediaApi($(mediaItem).attr('data-ga4-entity-id'), eventProperty, config);
            multiDowloadTempStorage.push($(mediaItem).attr('data-ga4-entity-id'));
          }
        }
      }
      multiDowloadTempStorage = [];
    });
  }

//GA4 event logic

  if (dataLayerGA4) {
    Drupal.behaviors.eventsGA4 = {
      attach: function (context, settings) {
        window.onload = function () {

          if (drupalSettings.ga4.events && !drupalSettings.path.currentPathIsAdmin) {
            const events = drupalSettings.ga4.events;
            const config = drupalSettings.ga4.config;

            if (events.node) {
              events.node.map((eventProperty) => {
                createEvent(eventProperty);
              });
            }

            if (events.paragraph) {
              events.paragraph.map((eventProperty) => {
                createEvent(eventProperty);
              });
            }

            if (events.media) {
              events.media.map((eventProperty) => {
                if(eventProperty.multi_download && eventProperty.trigger === 'form') {
                  setMultiDownload(eventProperty,config);
                }
                else {
                  setEventForMedia(eventProperty, config);
                }

              });
              if(iframes_info.length < 1 ) {
                includeYouTubeApi()
              }
            }

            if (events.form) {
              events.form.map((eventProperty) => {
                if(eventProperty.trigger !== 'onload'){
                  createEventForForm(eventProperty);
                }
                else {
                  createEvent(eventProperty);
                }
              });
            }

            if (events.form_algolia) {
              events.form_algolia.map((eventProperty) => {
                if(eventProperty.trigger !== 'onload'){
                  createEventForForm(eventProperty);
                }
                else {
                  createEvent(eventProperty);
                }
              });
            }
          }
        };
      }
    };
  }

  // YouTube api events

  //https://developers.google.com/youtube/iframe_api_reference#Getting_Started
  function includeYouTubeApi() {
    let tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  window.onYouTubeIframeAPIReady = async function() {
    await asyncYouTubeMediaEvents();

    const types = [
      'video_first_start',
      'video_complete',
      'video_change'
    ];

    types.map( (type) => {
      if (iframes_info[type]) {

        iframes_info[type].forEach(function (info) {
          if (!player[info.elementId]) {
            player[info.elementId] = new YT.Player(info.elementId, {
              videoId: info.videoId,
              width: info.width,
              height: info.height,
              playerVars: {'autoplay': info.autoplay, 'controls': 1},
              events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
              }
            });
          }
        });
      }
    });
  }

  window.onPlayerStateChange = function(event) {
    const singlePlayer = getPlayer(event);

    if (singlePlayer) {
      switch (singlePlayer.getPlayerState()) {
        case 0: //ended
          createEventForYouTube(event, singlePlayer, 'video_complete');
          break;

        case 1: //playing
          if (singlePlayer.firstStart) {
            player[$(singlePlayer.getIframe()).attr('id')].firstStart = false;
            createEventForYouTube(event, singlePlayer, 'video_first_start')
          }
          else {
            createEventForYouTube(event, singlePlayer, 'video_change')
          }
          break;

        case 2: //paused
          createEventForYouTube(event, singlePlayer, 'video_change')
          break;
      }
    }
  }

  window.onPlayerReady = function(event) {
    const iframe = event.target.getIframe();
    if ($(iframe).attr('id')) {
      player[$(iframe).attr('id')].firstStart = true;
    }
  }

  class CustomToken
  {
    constructor(element, optionalData = null) {
      this.element = element;
      this.optionalData = optionalData;
    }

    tokenValue(parameter) {
      const tokenArray = parameter.js.split(':');
      const token = tokenArray[1];

      switch (token) {
        case 'link_text':
          return this.linkText()

        case 'domain':
          return this.linkDomain();

        case 'video_current_time':
          return this.videoCurrentTime();

        case 'video_duration':
          return this.videoDuration();

        case 'video_percentage':
          return this.videoPercentage();

        case 'search_input':
          return this.formSearchInput();

        case 'form_action':
          return this.formAction();

        case 'current_language':
          return this.currentLanguage();

        case 'search_location':
          return this.searchLocation();

        case 'search_term':
          return this.searchTerm();

        default:
          if ($(this.element).attr(token)) {
            return  $(this.element).attr(token);
          }
      }
    }

    linkText() {
      if ($(this.element).text()) {
        return  $(this.element).text().trim();
      }
      return '';
    }

    linkDomain() {
      if ($(this.element).attr('href')) {
        const url = $(this.element).attr('href');
        if (this.isValidUrl(url)) {
          const domain = new URL(url);
          if (domain.hostname) {
            return  domain.hostname;
          }
        }
      }

      return 'local';
    }

    videoCurrentTime() {
      return this.optionalData.player.playerInfo.currentTime;
    }

    videoDuration() {
      return this.optionalData.player.playerInfo.duration;
    }

    videoPercentage() {
      const p = (this.optionalData.player.playerInfo.currentTime * 100)/this.optionalData.player.playerInfo.duration;
      return  Math.round(p) + '%';
    }

    formSearchInput() {
      if (this.optionalData === 'algolia_form') {
        return $(this.element).children('input.ais-SearchBox-input').val();
      }

      if ($(this.element).find('input').val()) {
        return $(this.element).find('input').val();
      }

      return $(this.element).val();
    }

    isValidUrl(url) {
      try {
        url = new URL(url);
      } catch (_) {
        return false;
      }

      return true;
    }

    formAction() {
      return $(this.element).attr('action') ?? '';
    }

    currentLanguage() {
      return drupalSettings.path.currentLanguage;
    }

    searchLocation() {
      if (this.optionalData === 'algolia_form') {
        const parents = $(this.element).parentsUntil('.instant-search__search-input_header');
        const isHeader = $(parents[parents.length-1]).parent().is('.instant-search__search-input_header');
        return (isHeader) ? 'menu-header' : 'search-page';
      }
    }

    searchTerm() {
      if (this.optionalData !== 'algolia_form') {
        const facets = $('.block-facets-ajax');

        if (facets && facets.length > 0) {
          let checked = [];
          facets.map((id, facet) => {
            const checkboxs = $(facet).find('input[type="checkbox"]:checked');
            if (checkboxs && checkboxs.length > 0 ) {
              checkboxs.map((checkbox_id, checkbox) => {
                checked.push($(checkbox).attr('id'));
              });
            }
          });
          return checked.join(', ');
        }

        return '';
      }
    }
  }

})(jQuery, Drupal, drupalSettings);
;
(function($){'use strict';window.reloadProcessed=false
function connectionCheck(){var connected=$.cookie('connected');if($('body').hasClass('user-logged-in')){if(connected===undefined||connected!=='1'){window.reloadProcessed=true;document.cookie='connected=0;expires=-1;domain=.'+location.hostname+';path='+drupalSettings.path.baseUrl}}else if(connected!==undefined&&connected==='1'){window.reloadProcessed=true;window.location.reload()}}
function reloadOnBack(){var browserNavigation=false;if(window.reloadProcessed)return;if(performance!==undefined){if(performance.navigation!==undefined&&performance.navigation.type===2){browserNavigation=true}else{var perfEntries=performance.getEntriesByType("navigation");if(perfEntries!==undefined&&perfEntries.length)for(var i=0;i<perfEntries.length;i++)if(perfEntries[i].type==='back_forward')browserNavigation=true};if(browserNavigation)connectionCheck()}}
function reloadToLogInUser(){connectionCheck()};$(document).ready(function(){reloadOnBack();reloadToLogInUser()});$(window).on('pageshow',function(){reloadOnBack();reloadToLogInUser()});$(window).on('popstate',function(){reloadOnBack();reloadToLogInUser()})})(jQuery);
/*! js-cookie v3.0.1 | MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,o=e.Cookies=t();o.noConflict=function(){return e.Cookies=n,o}}())}(this,(function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)e[o]=n[o]}return e}return function t(n,o){function r(t,r,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n.write(r,t)+c}}return Object.create({set:r,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],o={},r=0;r<t.length;r++){var i=t[r].split("="),c=i.slice(1).join("=");try{var u=decodeURIComponent(i[0]);if(o[u]=n.read(c,u),e===u)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){r(t,"",e({},n,{expires:-1}))},withAttributes:function(n){return t(this.converter,e({},this.attributes,n))},withConverter:function(n){return t(e({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(n)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}));
;
function _typeof(obj){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}
function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable})),keys.push.apply(keys,symbols)};return keys}
function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach(function(key){_defineProperty(target,key,source[key])}):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})};return target}
function _defineProperty(obj,key,value){key=_toPropertyKey(key);if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else obj[key]=value;return obj}
function _toPropertyKey(arg){var key=_toPrimitive(arg,"string");return _typeof(key)==="symbol"?key:String(key)}
function _toPrimitive(input,hint){if(_typeof(input)!=="object"||input===null)return input;var prim=input[Symbol.toPrimitive];if(prim!==undefined){var res=prim.call(input,hint||"default");if(_typeof(res)!=="object")return res;throw new TypeError("@@toPrimitive must return a primitive value.")};return(hint==="string"?String:Number)(input)};(function($,Drupal,cookies){var deprecatedMessageSuffix="is deprecated in Drupal 9.0.0 and will be removed in Drupal 10.0.0. Use the core/js-cookie library instead. See https://www.drupal.org/node/3104677",isFunction=function isFunction(obj){return Object.prototype.toString.call(obj)==='[object Function]'},parseCookieValue=function parseCookieValue(value,parseJson){if(value.indexOf('"')===0)value=value.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\');try{value=decodeURIComponent(value.replace(/\+/g,' '));return parseJson?JSON.parse(value):value}catch(e){}},reader=function reader(cookieValue,cookieName,converter,readUnsanitized,parseJson){var value=readUnsanitized?cookieValue:parseCookieValue(cookieValue,parseJson);if(converter!==undefined&&isFunction(converter))return converter(value,cookieName);return value};$.cookie=function(key){var value=arguments.length>1&&arguments[1]!==undefined?arguments[1]:undefined,options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:undefined;Drupal.deprecationError({message:"jQuery.cookie() ".concat(deprecatedMessageSuffix)});if(value!==undefined&&!isFunction(value)){var attributes=_objectSpread(_objectSpread({},$.cookie.defaults),options);if(typeof attributes.expires==='string'&&attributes.expires!=='')attributes.expires=new Date(attributes.expires);var cookieSetter=cookies.withConverter({write:function write(cookieValue){return encodeURIComponent(cookieValue)}});value=$.cookie.json&&!$.cookie.raw?JSON.stringify(value):String(value);return cookieSetter.set(key,value,attributes)};var userProvidedConverter=value,cookiesShim=cookies.withConverter({read:function read(cookieValue,cookieName){return reader(cookieValue,cookieName,userProvidedConverter,$.cookie.raw,$.cookie.json)}});if(key!==undefined)return cookiesShim.get(key);var results=cookiesShim.get();Object.keys(results).forEach(function(resultKey){if(results[resultKey]===undefined)delete results[resultKey]});return results};$.cookie.defaults=_objectSpread({path:''},cookies.defaults);$.cookie.json=false;$.cookie.raw=false;$.removeCookie=function(key,options){Drupal.deprecationError({message:"jQuery.removeCookie() ".concat(deprecatedMessageSuffix)});cookies.remove(key,_objectSpread(_objectSpread({},$.cookie.defaults),options));return!cookies.get(key)}})(jQuery,Drupal,window.Cookies);
(function ($, drupalSettings) {

  'use strict';

  /**
   * Sets/updates 'connected' cookie for the user.
   */
  function updateConnectedCookie() {
    var connected = $.cookie('connected');
    if (window.reloadProcessed) {
      if ($('body').hasClass('user-logged-in')) {
        if (connected === undefined || connected !== '1') {
          let now = new Date();
          let time = now.getTime();
          let expireTime = time + 200000;
          now.setTime(expireTime);
          document.cookie = 'connected=1;expires=' + now.toUTCString() + ';domain=.' + location.hostname + ';path=' + drupalSettings.path.baseUrl;
        }
      }
      else if (connected !== undefined && connected === '1') {
        window.location.reload();
        document.cookie = 'connected=0;expires=-1;domain=.' + location.hostname + ';path=' + drupalSettings.path.baseUrl;
      }
    }
  }

  $(document).ready(function () {
    updateConnectedCookie();
  });

})(jQuery, drupalSettings);
;
(function($,Drupal){Drupal.theme.progressBar=function(id){return"<div id=\"".concat(id,"\" class=\"progress\" aria-live=\"polite\">")+'<div class="progress__label">&nbsp;</div><div class="progress__track"><div class="progress__bar"></div></div><div class="progress__percentage"></div><div class="progress__description">&nbsp;</div></div>'};Drupal.ProgressBar=function(id,updateCallback,method,errorCallback){this.id=id;this.method=method||'GET';this.updateCallback=updateCallback;this.errorCallback=errorCallback;this.element=$(Drupal.theme('progressBar',id))};$.extend(Drupal.ProgressBar.prototype,{setProgress:function setProgress(percentage,message,label){if(percentage>=0&&percentage<=100){$(this.element).find('div.progress__bar').css('width',"".concat(percentage,"%"));$(this.element).find('div.progress__percentage').html("".concat(percentage,"%"))};$('div.progress__description',this.element).html(message);$('div.progress__label',this.element).html(label);if(this.updateCallback)this.updateCallback(percentage,message,this)},startMonitoring:function startMonitoring(uri,delay){this.delay=delay;this.uri=uri;this.sendPing()},stopMonitoring:function stopMonitoring(){clearTimeout(this.timer);this.uri=null},sendPing:function sendPing(){if(this.timer)clearTimeout(this.timer);if(this.uri){var pb=this,uri=this.uri;if(uri.indexOf('?')===-1){uri+='?'}else uri+='&';uri+='_format=json';$.ajax({type:this.method,url:uri,data:'',dataType:'json',success:function success(progress){if(progress.status===0){pb.displayError(progress.data);return};pb.setProgress(progress.percentage,progress.message,progress.label);pb.timer=setTimeout(function(){pb.sendPing()},pb.delay)},error:function error(xmlhttp){var e=new Drupal.AjaxError(xmlhttp,pb.uri);pb.displayError("<pre>".concat(e.message,"</pre>"))}})}},displayError:function displayError(string){var error=$('<div class="messages messages--error"></div>').html(string);$(this.element).before(error).hide();if(this.errorCallback)this.errorCallback(this)}})})(jQuery,Drupal);
loadjs=function(){var h=function(){},c={},u={},f={};function o(e,n){if(e){var r=f[e];if(u[e]=n,r)for(;r.length;)r[0](e,n),r.splice(0,1)}}function l(e,n){e.call&&(e={success:e}),n.length?(e.error||h)(n):(e.success||h)(e)}function d(r,t,s,i){var c,o,e=document,n=s.async,u=(s.numRetries||0)+1,f=s.before||h,l=r.replace(/[\?|#].*$/,""),a=r.replace(/^(css|img)!/,"");i=i||0,/(^css!|\.css$)/.test(l)?((o=e.createElement("link")).rel="stylesheet",o.href=a,(c="hideFocus"in o)&&o.relList&&(c=0,o.rel="preload",o.as="style")):/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(l)?(o=e.createElement("img")).src=a:((o=e.createElement("script")).src=r,o.async=void 0===n||n),!(o.onload=o.onerror=o.onbeforeload=function(e){var n=e.type[0];if(c)try{o.sheet.cssText.length||(n="e")}catch(e){18!=e.code&&(n="e")}if("e"==n){if((i+=1)<u)return d(r,t,s,i)}else if("preload"==o.rel&&"style"==o.as)return o.rel="stylesheet";t(r,n,e.defaultPrevented)})!==f(r,o)&&e.head.appendChild(o)}function r(e,n,r){var t,s;if(n&&n.trim&&(t=n),s=(t?r:n)||{},t){if(t in c)throw"LoadJS";c[t]=!0}function i(n,r){!function(e,t,n){var r,s,i=(e=e.push?e:[e]).length,c=i,o=[];for(r=function(e,n,r){if("e"==n&&o.push(e),"b"==n){if(!r)return;o.push(e)}--i||t(o)},s=0;s<c;s++)d(e[s],r,n)}(e,function(e){l(s,e),n&&l({success:n,error:r},e),o(t,e)},s)}if(s.returnPromise)return new Promise(i);i()}return r.ready=function(e,n){return function(e,r){e=e.push?e:[e];var n,t,s,i=[],c=e.length,o=c;for(n=function(e,n){n.length&&i.push(e),--o||r(i)};c--;)t=e[c],(s=u[t])?n(t,s):(f[t]=f[t]||[]).push(n)}(e,function(e){l(n,e)}),r},r.done=function(e){o(e,[])},r.reset=function(){c={},u={},f={}},r.isDefined=function(e){return e in c},r}();;
(function(Drupal){Drupal.behaviors.responsiveImageAJAX={attach:function attach(){if(window.picturefill)window.picturefill()}}})(Drupal);
function _toConsumableArray(arr){return _arrayWithoutHoles(arr)||_iterableToArray(arr)||_unsupportedIterableToArray(arr)||_nonIterableSpread()}
function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}
function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}
function _iterableToArray(iter){if(typeof Symbol!=="undefined"&&iter[Symbol.iterator]!=null||iter["@@iterator"]!=null)return Array.from(iter)}
function _arrayWithoutHoles(arr){if(Array.isArray(arr))return _arrayLikeToArray(arr)}
function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2};(function($,window,Drupal,drupalSettings,loadjs,_ref){var isFocusable=_ref.isFocusable,tabbable=_ref.tabbable;Drupal.behaviors.AJAX={attach:function attach(context,settings){function loadAjaxBehavior(base){var elementSettings=settings.ajax[base];if(typeof elementSettings.selector==='undefined')elementSettings.selector="#".concat(base);once('drupal-ajax',$(elementSettings.selector)).forEach(function(el){elementSettings.element=el;elementSettings.base=base;Drupal.ajax(elementSettings)})};Object.keys(settings.ajax||{}).forEach(function(base){return loadAjaxBehavior(base)});Drupal.ajax.bindAjaxLinks(document.body);once('ajax','.use-ajax-submit').forEach(function(el){var elementSettings={};elementSettings.url=$(el.form).attr('action');elementSettings.setClick=true;elementSettings.event='click';elementSettings.progress={type:'throbber'};elementSettings.base=el.id;elementSettings.element=el;Drupal.ajax(elementSettings)})},detach:function detach(context,settings,trigger){if(trigger==='unload')Drupal.ajax.expired().forEach(function(instance){Drupal.ajax.instances[instance.instanceIndex]=null})}};Drupal.AjaxError=function(xmlhttp,uri,customMessage){var statusCode,statusText,responseText;if(xmlhttp.status){statusCode="\n".concat(Drupal.t('An AJAX HTTP error occurred.'),"\n").concat(Drupal.t('HTTP Result Code: !status',{'!status':xmlhttp.status}))}else statusCode="\n".concat(Drupal.t('An AJAX HTTP request terminated abnormally.'));statusCode+="\n".concat(Drupal.t('Debugging information follows.'));var pathText="\n".concat(Drupal.t('Path: !uri',{'!uri':uri}));statusText='';try{statusText="\n".concat(Drupal.t('StatusText: !statusText',{'!statusText':xmlhttp.statusText.trim()}))}catch(e){};responseText='';try{responseText="\n".concat(Drupal.t('ResponseText: !responseText',{'!responseText':xmlhttp.responseText.trim()}))}catch(e){};responseText=responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi,'');responseText=responseText.replace(/[\n]+\s+/g,'\n');var readyStateText=xmlhttp.status===0?"\n".concat(Drupal.t('ReadyState: !readyState',{'!readyState':xmlhttp.readyState})):'';customMessage=customMessage?"\n".concat(Drupal.t('CustomMessage: !customMessage',{'!customMessage':customMessage})):'';this.message=statusCode+pathText+statusText+customMessage+responseText+readyStateText;this.name='AjaxError'};Drupal.AjaxError.prototype=new Error();Drupal.AjaxError.prototype.constructor=Drupal.AjaxError;Drupal.ajax=function(settings){if(arguments.length!==1)throw new Error('Drupal.ajax() function must be called with one configuration object only');var base=settings.base||false,element=settings.element||false;delete settings.base;delete settings.element;if(!settings.progress&&!element)settings.progress=false;var ajax=new Drupal.Ajax(base,element,settings);ajax.instanceIndex=Drupal.ajax.instances.length;Drupal.ajax.instances.push(ajax);return ajax};Drupal.ajax.instances=[];Drupal.ajax.expired=function(){return Drupal.ajax.instances.filter(function(instance){return instance&&instance.element!==false&&!document.body.contains(instance.element)})};Drupal.ajax.bindAjaxLinks=function(element){$('body').on('DOMSubtreeModified',function(){once('ajax','.use-ajax',element).forEach(function(ajaxLink){var $linkElement=$(ajaxLink),progress=typeof $linkElement.data('ajax-progress')!=='undefined'?$linkElement.data('ajax-progress'):'throbber',elementSettings={wrapper:$linkElement.data('ajax-wrapper')||null,method:$linkElement.data('ajax-method')||'replaceWith',progress:{type:progress},dialogType:$linkElement.data('dialog-type'),dialog:$linkElement.data('dialog-options'),dialogRenderer:$linkElement.data('dialog-renderer'),base:$linkElement.attr('id'),element:ajaxLink,focus:$linkElement.data('ajax-focus')||null},href=$linkElement.attr('href');if(href){elementSettings.url=href;elementSettings.event='click'};Drupal.ajax(elementSettings)})})};Drupal.Ajax=function(base,element,elementSettings){var defaults={event:element?'mousedown':null,keypress:true,selector:base?"#".concat(base):null,effect:'none',speed:'none',method:'replaceWith',progress:{type:'throbber',message:Drupal.t('Please wait...')},submit:{js:true},focus:null};$.extend(this,defaults,elementSettings);this.commands=new Drupal.AjaxCommands();this.instanceIndex=false;if(this.wrapper)this.wrapper="#".concat(this.wrapper);this.element=element;this.element_settings=elementSettings;this.elementSettings=elementSettings;if(this.element&&this.element.form)this.$form=$(this.element.form);if(!this.url){var $element=$(this.element);if($element.is('a')){this.url=$element.attr('href')}else if(this.element&&element.form)this.url=this.$form.attr('action')};var originalUrl=this.url;this.url=this.url.replace(/\/nojs(\/|$|\?|#)/,'/ajax$1');if(drupalSettings.ajaxTrustedUrl[originalUrl])drupalSettings.ajaxTrustedUrl[this.url]=true;var ajax=this;ajax.options={url:ajax.url,data:ajax.submit,isInProgress:function isInProgress(){return ajax.ajaxing},beforeSerialize:function beforeSerialize(elementSettings,options){return ajax.beforeSerialize(elementSettings,options)},beforeSubmit:function beforeSubmit(formValues,elementSettings,options){ajax.ajaxing=true;return ajax.beforeSubmit(formValues,elementSettings,options)},beforeSend:function beforeSend(xmlhttprequest,options){ajax.ajaxing=true;return ajax.beforeSend(xmlhttprequest,options)},success:function success(response,status,xmlhttprequest){var _this=this;if(typeof response==='string')response=$.parseJSON(response);if(response!==null&&!drupalSettings.ajaxTrustedUrl[ajax.url])if(xmlhttprequest.getResponseHeader('X-Drupal-Ajax-Token')!=='1'){var customMessage=Drupal.t('The response failed verification so will not be processed.');return ajax.error(xmlhttprequest,ajax.url,customMessage)};return Promise.resolve(ajax.success(response,status)).then(function(){ajax.ajaxing=false;$(document).trigger('ajaxSuccess',[xmlhttprequest,_this]);$(document).trigger('ajaxComplete',[xmlhttprequest,_this]);if(--$.active===0)$(document).trigger('ajaxStop')})},error:function error(xmlhttprequest,status,_error){ajax.ajaxing=false},complete:function complete(xmlhttprequest,status){if(status==='error'||status==='parsererror')return ajax.error(xmlhttprequest,ajax.url)},dataType:'json',jsonp:false,type:'POST'};if(elementSettings.dialog)ajax.options.data.dialogOptions=elementSettings.dialog;if(ajax.options.url.indexOf('?')===-1){ajax.options.url+='?'}else ajax.options.url+='&';var wrapper="drupal_".concat(elementSettings.dialogType||'ajax');if(elementSettings.dialogRenderer)wrapper+=".".concat(elementSettings.dialogRenderer);ajax.options.url+="".concat(Drupal.ajax.WRAPPER_FORMAT,"=").concat(wrapper);$(ajax.element).on(elementSettings.event,function(event){if(!drupalSettings.ajaxTrustedUrl[ajax.url]&&!Drupal.url.isLocal(ajax.url))throw new Error(Drupal.t('The callback URL is not local and not trusted: !url',{'!url':ajax.url}));return ajax.eventResponse(this,event)});if(elementSettings.keypress)$(ajax.element).on('keypress',function(event){return ajax.keypressResponse(this,event)});if(elementSettings.prevent)$(ajax.element).on(elementSettings.prevent,false)};Drupal.ajax.WRAPPER_FORMAT='_wrapper_format';Drupal.Ajax.AJAX_REQUEST_PARAMETER='_drupal_ajax';Drupal.Ajax.prototype.execute=function(){if(this.ajaxing)return;try{this.beforeSerialize(this.element,this.options);return $.ajax(this.options)}catch(e){this.ajaxing=false;window.alert("An error occurred while attempting to process ".concat(this.options.url,": ").concat(e.message));return $.Deferred().reject()}};Drupal.Ajax.prototype.keypressResponse=function(element,event){var ajax=this;if(event.which===13||event.which===32&&element.type!=='text'&&element.type!=='textarea'&&element.type!=='tel'&&element.type!=='number'){event.preventDefault();event.stopPropagation();$(element).trigger(ajax.elementSettings.event)}};Drupal.Ajax.prototype.eventResponse=function(element,event){event.preventDefault();event.stopPropagation();var ajax=this;if(ajax.ajaxing)return;try{if(ajax.$form){if(ajax.setClick)element.form.clk=element;ajax.$form.ajaxSubmit(ajax.options)}else{ajax.beforeSerialize(ajax.element,ajax.options);$.ajax(ajax.options)}}catch(e){ajax.ajaxing=false;window.alert("An error occurred while attempting to process ".concat(ajax.options.url,": ").concat(e.message))}};Drupal.Ajax.prototype.beforeSerialize=function(element,options){if(this.$form&&document.body.contains(this.$form.get(0))){var settings=this.settings||drupalSettings;Drupal.detachBehaviors(this.$form.get(0),settings,'serialize')};options.data[Drupal.Ajax.AJAX_REQUEST_PARAMETER]=1;var pageState=drupalSettings.ajaxPageState;options.data['ajax_page_state[theme]']=pageState.theme;options.data['ajax_page_state[theme_token]']=pageState.theme_token;options.data['ajax_page_state[libraries]']=pageState.libraries};Drupal.Ajax.prototype.beforeSubmit=function(formValues,element,options){};Drupal.Ajax.prototype.beforeSend=function(xmlhttprequest,options){if(this.$form){options.extraData=options.extraData||{};options.extraData.ajax_iframe_upload='1';var v=$.fieldValue(this.element);if(v!==null)options.extraData[this.element.name]=v};$(this.element).prop('disabled',true);if(!this.progress||!this.progress.type)return;var progressIndicatorMethod="setProgressIndicator".concat(this.progress.type.slice(0,1).toUpperCase()).concat(this.progress.type.slice(1).toLowerCase());if(progressIndicatorMethod in this&&typeof this[progressIndicatorMethod]==='function')this[progressIndicatorMethod].call(this)};Drupal.theme.ajaxProgressThrobber=function(message){var messageMarkup=typeof message==='string'?Drupal.theme('ajaxProgressMessage',message):'',throbber='<div class="throbber">&nbsp;</div>';return"<div class=\"ajax-progress ajax-progress-throbber\">".concat(throbber).concat(messageMarkup,"</div>")};Drupal.theme.ajaxProgressIndicatorFullscreen=function(){return'<div class="ajax-progress ajax-progress-fullscreen">&nbsp;</div>'};Drupal.theme.ajaxProgressMessage=function(message){return"<div class=\"message\">".concat(message,"</div>")};Drupal.theme.ajaxProgressBar=function($element){return $('<div class="ajax-progress ajax-progress-bar"></div>').append($element)};Drupal.Ajax.prototype.setProgressIndicatorBar=function(){var progressBar=new Drupal.ProgressBar("ajax-progress-".concat(this.element.id),$.noop,this.progress.method,$.noop);if(this.progress.message)progressBar.setProgress(-1,this.progress.message);if(this.progress.url)progressBar.startMonitoring(this.progress.url,this.progress.interval||1500);this.progress.element=$(Drupal.theme('ajaxProgressBar',progressBar.element));this.progress.object=progressBar;$(this.element).after(this.progress.element)};Drupal.Ajax.prototype.setProgressIndicatorThrobber=function(){this.progress.element=$(Drupal.theme('ajaxProgressThrobber',this.progress.message));$(this.element).after(this.progress.element)};Drupal.Ajax.prototype.setProgressIndicatorFullscreen=function(){this.progress.element=$(Drupal.theme('ajaxProgressIndicatorFullscreen'));$('body').append(this.progress.element)};Drupal.Ajax.prototype.commandExecutionQueue=function(response,status){var _this2=this,ajaxCommands=this.commands;return Object.keys(response||{}).reduce(function(executionQueue,key){return executionQueue.then(function(){var command=response[key].command;if(command&&ajaxCommands[command])return ajaxCommands[command](_this2,response[key],status)})},Promise.resolve())};Drupal.Ajax.prototype.success=function(response,status){var _this3=this;if(this.progress.element)$(this.progress.element).remove();if(this.progress.object)this.progress.object.stopMonitoring();$(this.element).prop('disabled',false);var elementParents=$(this.element).parents('[data-drupal-selector]').addBack().toArray(),focusChanged=Object.keys(response||{}).some(function(key){var _response$key=response[key],command=_response$key.command,method=_response$key.method;return command==='focusFirst'||command==='invoke'&&method==='focus'});return this.commandExecutionQueue(response,status).then(function(){if(!focusChanged&&_this3.element&&!$(_this3.element).data('disable-refocus')){var target=false;for(var n=elementParents.length-1;!target&&n>=0;n--)target=document.querySelector("[data-drupal-selector=\"".concat(elementParents[n].getAttribute('data-drupal-selector'),"\"]"));if(target)$(target).trigger('focus')};if(_this3.$form&&document.body.contains(_this3.$form.get(0))){var settings=_this3.settings||drupalSettings;Drupal.attachBehaviors(_this3.$form.get(0),settings)};_this3.settings=null}).catch(function(error){return console.error(Drupal.t('An error occurred during the execution of the Ajax response: !error',{'!error':error}))})};Drupal.Ajax.prototype.getEffect=function(response){var type=response.effect||this.effect,speed=response.speed||this.speed,effect={};if(type==='none'){effect.showEffect='show';effect.hideEffect='hide';effect.showSpeed=''}else if(type==='fade'){effect.showEffect='fadeIn';effect.hideEffect='fadeOut';effect.showSpeed=speed}else{effect.showEffect="".concat(type,"Toggle");effect.hideEffect="".concat(type,"Toggle");effect.showSpeed=speed};return effect};Drupal.Ajax.prototype.error=function(xmlhttprequest,uri,customMessage){if(this.progress.element)$(this.progress.element).remove();if(this.progress.object)this.progress.object.stopMonitoring();$(this.wrapper).show();$(this.element).prop('disabled',false);if(this.$form&&document.body.contains(this.$form.get(0))){var settings=this.settings||drupalSettings;Drupal.attachBehaviors(this.$form.get(0),settings)};throw new Drupal.AjaxError(xmlhttprequest,uri,customMessage)};Drupal.theme.ajaxWrapperNewContent=function($newContent,ajax,response){return(response.effect||ajax.effect)!=='none'&&$newContent.filter(function(i){return!($newContent[i].nodeName==='#comment'||$newContent[i].nodeName==='#text'&&/^(\s|\n|\r)*$/.test($newContent[i].textContent))}).length>1?Drupal.theme('ajaxWrapperMultipleRootElements',$newContent):$newContent};Drupal.theme.ajaxWrapperMultipleRootElements=function($elements){return $('<div></div>').append($elements)};Drupal.AjaxCommands=function(){};Drupal.AjaxCommands.prototype={insert:function insert(ajax,response){var $wrapper=response.selector?$(response.selector):$(ajax.wrapper),method=response.method||ajax.method,effect=ajax.getEffect(response),settings=response.settings||ajax.settings||drupalSettings,$newContent=$($.parseHTML(response.data,document,true));$newContent=Drupal.theme('ajaxWrapperNewContent',$newContent,ajax,response);switch(method){case'html':case'replaceWith':case'replaceAll':case'empty':case'remove':Drupal.detachBehaviors($wrapper.get(0),settings);break;default:break};$wrapper[method]($newContent);if(effect.showEffect!=='show')$newContent.hide();var $ajaxNewContent=$newContent.find('.ajax-new-content');if($ajaxNewContent.length){$ajaxNewContent.hide();$newContent.show();$ajaxNewContent[effect.showEffect](effect.showSpeed)}else if(effect.showEffect!=='show')$newContent[effect.showEffect](effect.showSpeed);if($newContent.parents('html').length)$newContent.each(function(index,element){if(element.nodeType===Node.ELEMENT_NODE)Drupal.attachBehaviors(element,settings)})},remove:function remove(ajax,response,status){var settings=response.settings||ajax.settings||drupalSettings;$(response.selector).each(function(){Drupal.detachBehaviors(this,settings)}).remove()},changed:function changed(ajax,response,status){var $element=$(response.selector);if(!$element.hasClass('ajax-changed')){$element.addClass('ajax-changed');if(response.asterisk)$element.find(response.asterisk).append(" <abbr class=\"ajax-changed\" title=\"".concat(Drupal.t('Changed'),"\">*</abbr> "))}},alert:function alert(ajax,response,status){window.alert(response.text)},announce:function announce(ajax,response){if(response.priority){Drupal.announce(response.text,response.priority)}else Drupal.announce(response.text)},redirect:function redirect(ajax,response,status){window.location=response.url},css:function css(ajax,response,status){$(response.selector).css(response.argument)},settings:function settings(ajax,response,status){var ajaxSettings=drupalSettings.ajax;if(ajaxSettings)Drupal.ajax.expired().forEach(function(instance){if(instance.selector){var selector=instance.selector.replace('#','');if(selector in ajaxSettings)delete ajaxSettings[selector]}});if(response.merge){$.extend(true,drupalSettings,response.settings)}else ajax.settings=response.settings},data:function data(ajax,response,status){$(response.selector).data(response.name,response.value)},focusFirst:function focusFirst(ajax,response,status){var focusChanged=false,container=document.querySelector(response.selector);if(container){var tabbableElements=tabbable(container);if(tabbableElements.length){tabbableElements[0].focus();focusChanged=true}else if(isFocusable(container)){container.focus();focusChanged=true}};if(ajax.hasOwnProperty('element')&&!focusChanged)ajax.element.focus()},invoke:function invoke(ajax,response,status){var $element=$(response.selector);$element[response.method].apply($element,_toConsumableArray(response.args))},restripe:function restripe(ajax,response,status){$(response.selector).find('> tbody > tr:visible, > tr:visible').removeClass('odd even').filter(':even').addClass('odd').end().filter(':odd').addClass('even')},update_build_id:function update_build_id(ajax,response,status){document.querySelectorAll("input[name=\"form_build_id\"][value=\"".concat(response.old,"\"]")).forEach(function(item){item.value=response.new})},add_css:function add_css(ajax,response,status){$('head').prepend(response.data)},message:function message(ajax,response){var messages=new Drupal.Message(document.querySelector(response.messageWrapperQuerySelector));if(response.clearPrevious)messages.clear();messages.add(response.message,response.messageOptions)},add_js:function add_js(ajax,response,status){var parentEl=document.querySelector(response.selector||'body'),settings=ajax.settings||drupalSettings,allUniqueBundleIds=response.data.map(function(script){var uniqueBundleId=script.src+ajax.instanceIndex;loadjs(script.src,uniqueBundleId,{async:false,before:function before(path,scriptEl){Object.keys(script).forEach(function(attributeKey){scriptEl.setAttribute(attributeKey,script[attributeKey])});parentEl.appendChild(scriptEl);return false}});return uniqueBundleId});return new Promise(function(resolve,reject){loadjs.ready(allUniqueBundleIds,{success:function success(){Drupal.attachBehaviors(parentEl,settings);resolve()},error:function error(depsNotFound){var message=Drupal.t("The following files could not be loaded: @dependencies",{'@dependencies':depsNotFound.join(', ')});reject(message)}})})}};var stopEvent=function stopEvent(xhr,settings){return xhr.getResponseHeader('X-Drupal-Ajax-Token')==='1'&&settings.isInProgress&&settings.isInProgress()};$.extend(true,$.event.special,{ajaxSuccess:{trigger:function trigger(event,xhr,settings){if(stopEvent(xhr,settings))return false}},ajaxComplete:{trigger:function trigger(event,xhr,settings){if(stopEvent(xhr,settings)){$.active++;return false}}}})})(jQuery,window,Drupal,drupalSettings,loadjs,window.tabbable);
(function(Drupal){Drupal.theme.ajaxProgressBar=function($element){return $element.addClass('ajax-progress ajax-progress-bar')}})(Drupal);
(function($,Drupal,debounce){var offsets={top:0,right:0,bottom:0,left:0}
function getRawOffset(el,edge){var $el=$(el),documentElement=document.documentElement,displacement=0,horizontal=edge==='left'||edge==='right',placement=$el.offset()[horizontal?'left':'top'];placement-=window["scroll".concat(horizontal?'X':'Y')]||document.documentElement["scroll".concat(horizontal?'Left':'Top')]||0;switch(edge){case'top':displacement=placement+$el.outerHeight();break;case'left':displacement=placement+$el.outerWidth();break;case'bottom':displacement=documentElement.clientHeight-placement;break;case'right':displacement=documentElement.clientWidth-placement;break;default:displacement=0};return displacement}
function calculateOffset(edge){var edgeOffset=0,displacingElements=document.querySelectorAll("[data-offset-".concat(edge,"]")),n=displacingElements.length;for(var i=0;i<n;i++){var el=displacingElements[i];if(el.style.display==='none')continue;var displacement=parseInt(el.getAttribute("data-offset-".concat(edge)),10);if(isNaN(displacement))displacement=getRawOffset(el,edge);edgeOffset=Math.max(edgeOffset,displacement)};return edgeOffset}
function calculateOffsets(){return{top:calculateOffset('top'),right:calculateOffset('right'),bottom:calculateOffset('bottom'),left:calculateOffset('left')}}
function displace(broadcast){offsets=calculateOffsets();Drupal.displace.offsets=offsets;if(typeof broadcast==='undefined'||broadcast)$(document).trigger('drupalViewportOffsetChange',offsets);return offsets};Drupal.behaviors.drupalDisplace={attach:function attach(){if(this.displaceProcessed)return;this.displaceProcessed=true;$(window).on('resize.drupalDisplace',debounce(displace,200))}};Drupal.displace=displace;$.extend(Drupal.displace,{offsets:offsets,calculateOffset:calculateOffset})})(jQuery,Drupal,Drupal.debounce);
(function($,Drupal,_ref){var isTabbable=_ref.isTabbable;$.extend($.expr[':'],{tabbable:function tabbable(element){Drupal.deprecationError({message:'The :tabbable selector is deprecated in Drupal 9.2.0 and will be removed in Drupal 11.0.0. Use the core/tabbable library instead. See https://www.drupal.org/node/3183730'});if(element.tagName==='SUMMARY'||element.tagName==='DETAILS'){var tabIndex=element.getAttribute('tabIndex');if(tabIndex===null||tabIndex<0)return false};return isTabbable(element)}})})(jQuery,Drupal,window.tabbable);
(function($){var cachedScrollbarWidth=null,max=Math.max,abs=Math.abs,regexHorizontal=/left|center|right/,regexVertical=/top|center|bottom/,regexOffset=/[+-]\d+(\.[\d]+)?%?/,regexPosition=/^\w+/,regexPercent=/%$/,_position=$.fn.position
function getOffsets(offsets,width,height){return[parseFloat(offsets[0])*(regexPercent.test(offsets[0])?width/100:1),parseFloat(offsets[1])*(regexPercent.test(offsets[1])?height/100:1)]}
function parseCss(element,property){return parseInt($.css(element,property),10)||0}
function getDimensions(elem){var raw=elem[0];if(raw.nodeType===9)return{width:elem.width(),height:elem.height(),offset:{top:0,left:0}};if($.isWindow(raw))return{width:elem.width(),height:elem.height(),offset:{top:elem.scrollTop(),left:elem.scrollLeft()}};if(raw.preventDefault)return{width:0,height:0,offset:{top:raw.pageY,left:raw.pageX}};return{width:elem.outerWidth(),height:elem.outerHeight(),offset:elem.offset()}};var collisions={fit:{left:function left(position,data){var within=data.within,withinOffset=within.isWindow?within.scrollLeft:within.offset.left,outerWidth=within.width,collisionPosLeft=position.left-data.collisionPosition.marginLeft,overLeft=withinOffset-collisionPosLeft,overRight=collisionPosLeft+data.collisionWidth-outerWidth-withinOffset,newOverRight;if(data.collisionWidth>outerWidth){if(overLeft>0&&overRight<=0){newOverRight=position.left+overLeft+data.collisionWidth-outerWidth-withinOffset;position.left+=overLeft-newOverRight}else if(overRight>0&&overLeft<=0){position.left=withinOffset}else if(overLeft>overRight){position.left=withinOffset+outerWidth-data.collisionWidth}else position.left=withinOffset}else if(overLeft>0){position.left+=overLeft}else if(overRight>0){position.left-=overRight}else position.left=max(position.left-collisionPosLeft,position.left)},top:function top(position,data){var within=data.within,withinOffset=within.isWindow?within.scrollTop:within.offset.top,outerHeight=data.within.height,collisionPosTop=position.top-data.collisionPosition.marginTop,overTop=withinOffset-collisionPosTop,overBottom=collisionPosTop+data.collisionHeight-outerHeight-withinOffset,newOverBottom;if(data.collisionHeight>outerHeight){if(overTop>0&&overBottom<=0){newOverBottom=position.top+overTop+data.collisionHeight-outerHeight-withinOffset;position.top+=overTop-newOverBottom}else if(overBottom>0&&overTop<=0){position.top=withinOffset}else if(overTop>overBottom){position.top=withinOffset+outerHeight-data.collisionHeight}else position.top=withinOffset}else if(overTop>0){position.top+=overTop}else if(overBottom>0){position.top-=overBottom}else position.top=max(position.top-collisionPosTop,position.top)}},flip:{left:function left(position,data){var within=data.within,withinOffset=within.offset.left+within.scrollLeft,outerWidth=within.width,offsetLeft=within.isWindow?within.scrollLeft:within.offset.left,collisionPosLeft=position.left-data.collisionPosition.marginLeft,overLeft=collisionPosLeft-offsetLeft,overRight=collisionPosLeft+data.collisionWidth-outerWidth-offsetLeft,myOffset=data.my[0]==='left'?-data.elemWidth:data.my[0]==='right'?data.elemWidth:0,atOffset=data.at[0]==='left'?data.targetWidth:data.at[0]==='right'?-data.targetWidth:0,offset=-2*data.offset[0],newOverRight,newOverLeft;if(overLeft<0){newOverRight=position.left+myOffset+atOffset+offset+data.collisionWidth-outerWidth-withinOffset;if(newOverRight<0||newOverRight<abs(overLeft))position.left+=myOffset+atOffset+offset}else if(overRight>0){newOverLeft=position.left-data.collisionPosition.marginLeft+myOffset+atOffset+offset-offsetLeft;if(newOverLeft>0||abs(newOverLeft)<overRight)position.left+=myOffset+atOffset+offset}},top:function top(position,data){var within=data.within,withinOffset=within.offset.top+within.scrollTop,outerHeight=within.height,offsetTop=within.isWindow?within.scrollTop:within.offset.top,collisionPosTop=position.top-data.collisionPosition.marginTop,overTop=collisionPosTop-offsetTop,overBottom=collisionPosTop+data.collisionHeight-outerHeight-offsetTop,top=data.my[1]==='top',myOffset=top?-data.elemHeight:data.my[1]==='bottom'?data.elemHeight:0,atOffset=data.at[1]==='top'?data.targetHeight:data.at[1]==='bottom'?-data.targetHeight:0,offset=-2*data.offset[1],newOverTop,newOverBottom;if(overTop<0){newOverBottom=position.top+myOffset+atOffset+offset+data.collisionHeight-outerHeight-withinOffset;if(newOverBottom<0||newOverBottom<abs(overTop))position.top+=myOffset+atOffset+offset}else if(overBottom>0){newOverTop=position.top-data.collisionPosition.marginTop+myOffset+atOffset+offset-offsetTop;if(newOverTop>0||abs(newOverTop)<overBottom)position.top+=myOffset+atOffset+offset}}},flipfit:{left:function left(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];collisions.flip.left.apply(this,args);collisions.fit.left.apply(this,args)},top:function top(){for(var _len2=arguments.length,args=new Array(_len2),_key2=0;_key2<_len2;_key2++)args[_key2]=arguments[_key2];collisions.flip.top.apply(this,args);collisions.fit.top.apply(this,args)}}};$.position={scrollbarWidth:function scrollbarWidth(){if(cachedScrollbarWidth!==undefined)return cachedScrollbarWidth;var div=$('<div '+"style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),innerDiv=div.children()[0];$('body').append(div);var w1=innerDiv.offsetWidth;div.css('overflow','scroll');var w2=innerDiv.offsetWidth;if(w1===w2)w2=div[0].clientWidth;div.remove();cachedScrollbarWidth=w1-w2;return cachedScrollbarWidth},getScrollInfo:function getScrollInfo(within){var overflowX=within.isWindow||within.isDocument?'':within.element.css('overflow-x'),overflowY=within.isWindow||within.isDocument?'':within.element.css('overflow-y'),hasOverflowX=overflowX==='scroll'||overflowX==='auto'&&within.width<within.element[0].scrollWidth,hasOverflowY=overflowY==='scroll'||overflowY==='auto'&&within.height<within.element[0].scrollHeight;return{width:hasOverflowY?$.position.scrollbarWidth():0,height:hasOverflowX?$.position.scrollbarWidth():0}},getWithinInfo:function getWithinInfo(element){var withinElement=$(element||window),isWindow=$.isWindow(withinElement[0]),isDocument=!!withinElement[0]&&withinElement[0].nodeType===9,hasOffset=!isWindow&&!isDocument;return{element:withinElement,isWindow:isWindow,isDocument:isDocument,offset:hasOffset?$(element).offset():{left:0,top:0},scrollLeft:withinElement.scrollLeft(),scrollTop:withinElement.scrollTop(),width:withinElement.outerWidth(),height:withinElement.outerHeight()}}};$.fn.position=function(options){if(!options||!options.of)return _position.apply(this,arguments);options=$.extend({},options);var within=$.position.getWithinInfo(options.within),scrollInfo=$.position.getScrollInfo(within),collision=(options.collision||'flip').split(' '),offsets={},target=typeof options.of==='string'?$(document).find(options.of):$(options.of),dimensions=getDimensions(target),targetWidth=dimensions.width,targetHeight=dimensions.height,targetOffset=dimensions.offset;if(target[0].preventDefault)options.at='left top';var basePosition=$.extend({},targetOffset);$.each(['my','at'],function(){var pos=(options[this]||'').split(' ');if(pos.length===1)pos=regexHorizontal.test(pos[0])?pos.concat(['center']):regexVertical.test(pos[0])?['center'].concat(pos):['center','center'];pos[0]=regexHorizontal.test(pos[0])?pos[0]:'center';pos[1]=regexVertical.test(pos[1])?pos[1]:'center';var horizontalOffset=regexOffset.exec(pos[0]),verticalOffset=regexOffset.exec(pos[1]);offsets[this]=[horizontalOffset?horizontalOffset[0]:0,verticalOffset?verticalOffset[0]:0];options[this]=[regexPosition.exec(pos[0])[0],regexPosition.exec(pos[1])[0]]});if(collision.length===1)collision[1]=collision[0];if(options.at[0]==='right'){basePosition.left+=targetWidth}else if(options.at[0]==='center')basePosition.left+=targetWidth/2;if(options.at[1]==='bottom'){basePosition.top+=targetHeight}else if(options.at[1]==='center')basePosition.top+=targetHeight/2;var atOffset=getOffsets(offsets.at,targetWidth,targetHeight);basePosition.left+=atOffset[0];basePosition.top+=atOffset[1];return this.each(function(){var using,elem=$(this),elemWidth=elem.outerWidth(),elemHeight=elem.outerHeight(),marginLeft=parseCss(this,'marginLeft'),marginTop=parseCss(this,'marginTop'),collisionWidth=elemWidth+marginLeft+parseCss(this,'marginRight')+scrollInfo.width,collisionHeight=elemHeight+marginTop+parseCss(this,'marginBottom')+scrollInfo.height,position=$.extend({},basePosition),myOffset=getOffsets(offsets.my,elem.outerWidth(),elem.outerHeight());if(options.my[0]==='right'){position.left-=elemWidth}else if(options.my[0]==='center')position.left-=elemWidth/2;if(options.my[1]==='bottom'){position.top-=elemHeight}else if(options.my[1]==='center')position.top-=elemHeight/2;position.left+=myOffset[0];position.top+=myOffset[1];var collisionPosition={marginLeft:marginLeft,marginTop:marginTop};$.each(['left','top'],function(i,dir){if(collisions[collision[i]])collisions[collision[i]][dir](position,{targetWidth:targetWidth,targetHeight:targetHeight,elemWidth:elemWidth,elemHeight:elemHeight,collisionPosition:collisionPosition,collisionWidth:collisionWidth,collisionHeight:collisionHeight,offset:[atOffset[0]+myOffset[0],atOffset[1]+myOffset[1]],my:options.my,at:options.at,within:within,elem:elem})});if(options.using)using=function using(props){var left=targetOffset.left-position.left,right=left+targetWidth-elemWidth,top=targetOffset.top-position.top,bottom=top+targetHeight-elemHeight,feedback={target:{element:target,left:targetOffset.left,top:targetOffset.top,width:targetWidth,height:targetHeight},element:{element:elem,left:position.left,top:position.top,width:elemWidth,height:elemHeight},horizontal:right<0?'left':left>0?'right':'center',vertical:bottom<0?'top':top>0?'bottom':'middle'};if(targetWidth<elemWidth&&abs(left+right)<targetWidth)feedback.horizontal='center';if(targetHeight<elemHeight&&abs(top+bottom)<targetHeight)feedback.vertical='middle';if(max(abs(left),abs(right))>max(abs(top),abs(bottom))){feedback.important='horizontal'}else feedback.important='vertical';options.using.call(this,props,feedback)};elem.offset($.extend(position,{using:using}))})};if(!$.hasOwnProperty('ui'))$.ui={};$.ui.position=collisions})(jQuery);
(function($,Drupal,drupalSettings){drupalSettings.dialog={autoOpen:true,dialogClass:'',buttonClass:'button',buttonPrimaryClass:'button--primary',close:function close(event){Drupal.dialog(event.target).close();Drupal.detachBehaviors(event.target,null,'unload')}};Drupal.dialog=function(element,options){var undef,$element=$(element),dialog={open:false,returnValue:undef}
function openDialog(settings){settings=$.extend({},drupalSettings.dialog,options,settings);$(window).trigger('dialog:beforecreate',[dialog,$element,settings]);$element.dialog(settings);dialog.open=true;$(window).trigger('dialog:aftercreate',[dialog,$element,settings])}
function closeDialog(value){$(window).trigger('dialog:beforeclose',[dialog,$element]);$element.dialog('close');dialog.returnValue=value;dialog.open=false;$(window).trigger('dialog:afterclose',[dialog,$element])};dialog.show=function(){openDialog({modal:false})};dialog.showModal=function(){openDialog({modal:true})};dialog.close=closeDialog;return dialog}})(jQuery,Drupal,drupalSettings);
(function($,Drupal,drupalSettings,debounce,displace){drupalSettings.dialog=$.extend({autoResize:true,maxHeight:'95%'},drupalSettings.dialog)
function resetPosition(options){var offsets=displace.offsets,left=offsets.left-offsets.right,top=offsets.top-offsets.bottom,leftString="".concat((left>0?'+':'-')+Math.abs(Math.round(left/2)),"px"),topString="".concat((top>0?'+':'-')+Math.abs(Math.round(top/2)),"px");options.position={my:"center".concat(left!==0?leftString:''," center").concat(top!==0?topString:''),of:window};return options}
function resetSize(event){var positionOptions=['width','height','minWidth','minHeight','maxHeight','maxWidth','position'],adjustedOptions={},windowHeight=$(window).height(),option,optionValue,adjustedValue;for(var n=0;n<positionOptions.length;n++){option=positionOptions[n];optionValue=event.data.settings[option];if(optionValue)if(typeof optionValue==='string'&&/%$/.test(optionValue)&&/height/i.test(option)){windowHeight-=displace.offsets.top+displace.offsets.bottom;adjustedValue=parseInt(0.01*parseInt(optionValue,10)*windowHeight,10);if(option==='height'&&event.data.$element.parent().outerHeight()<adjustedValue)adjustedValue='auto';adjustedOptions[option]=adjustedValue}};if(!event.data.settings.modal)adjustedOptions=resetPosition(adjustedOptions);event.data.$element.dialog('option',adjustedOptions).trigger('dialogContentResize')};$(window).on({'dialog:aftercreate':function dialogAftercreate(event,dialog,$element,settings){var autoResize=debounce(resetSize,20),eventData={settings:settings,$element:$element};if(settings.autoResize===true||settings.autoResize==='true'){$element.dialog('option',{resizable:false,draggable:false}).dialog('widget').css('position','fixed');$(window).on('resize.dialogResize scroll.dialogResize',eventData,autoResize).trigger('resize.dialogResize');$(document).on('drupalViewportOffsetChange.dialogResize',eventData,autoResize)}},'dialog:beforeclose':function dialogBeforeclose(event,dialog,$element){$(window).off('.dialogResize');$(document).off('.dialogResize')}})})(jQuery,Drupal,drupalSettings,Drupal.debounce,Drupal.displace);
(function($,_ref){var tabbable=_ref.tabbable,isTabbable=_ref.isTabbable;$.widget('ui.dialog',$.ui.dialog,{options:{buttonClass:'button',buttonPrimaryClass:'button--primary'},_createButtons:function _createButtons(){var opts=this.options,primaryIndex,index,il=opts.buttons.length;for(index=0;index<il;index++)if(opts.buttons[index].primary&&opts.buttons[index].primary===true){primaryIndex=index;delete opts.buttons[index].primary;break};this._super();var $buttons=this.uiButtonSet.children().addClass(opts.buttonClass);if(typeof primaryIndex!=='undefined')$buttons.eq(index).addClass(opts.buttonPrimaryClass)},_focusTabbable:function _focusTabbable(){var hasFocus=this._focusedElement?this._focusedElement.get(0):null;if(!hasFocus)hasFocus=this.element.find('[autofocus]').get(0);if(!hasFocus){var $elements=[this.element,this.uiDialogButtonPane];for(var i=0;i<$elements.length;i++){var element=$elements[i].get(0);if(element){var elementTabbable=tabbable(element);hasFocus=elementTabbable.length?elementTabbable[0]:null};if(hasFocus)break}};if(!hasFocus){var closeBtn=this.uiDialogTitlebarClose.get(0);hasFocus=closeBtn&&isTabbable(closeBtn)?closeBtn:null};if(!hasFocus)hasFocus=this.uiDialog.get(0);$(hasFocus).eq(0).trigger('focus')}})})(jQuery,window.tabbable);
(function($,Drupal){Drupal.behaviors.dialog={attach:function attach(context,settings){var $context=$(context);if(!$('#drupal-modal').length)$('<div id="drupal-modal" class="ui-front"></div>').hide().appendTo('body');var $dialog=$context.closest('.ui-dialog-content');if($dialog.length){if($dialog.dialog('option','drupalAutoButtons'))$dialog.trigger('dialogButtonsChange');$dialog.dialog('widget').trigger('focus')};var originalClose=settings.dialog.close;settings.dialog.close=function(event){for(var _len=arguments.length,args=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++)args[_key-1]=arguments[_key];originalClose.apply(settings.dialog,[event].concat(args));$(event.target).remove()}},prepareDialogButtons:function prepareDialogButtons($dialog){var buttons=[],$buttons=$dialog.find('.form-actions input[type=submit], .form-actions a.button');$buttons.each(function(){var $originalButton=$(this).css({display:'none'});buttons.push({text:$originalButton.html()||$originalButton.attr('value'),class:$originalButton.attr('class'),click:function click(e){if($originalButton.is('a')){$originalButton[0].click()}else{$originalButton.trigger('mousedown').trigger('mouseup').trigger('click');e.preventDefault()}}})});return buttons}};Drupal.AjaxCommands.prototype.openDialog=function(ajax,response,status){if(!response.selector)return false;var $dialog=$(response.selector);if(!$dialog.length)$dialog=$("<div id=\"".concat(response.selector.replace(/^#/,''),"\" class=\"ui-front\"></div>")).appendTo('body');if(!ajax.wrapper)ajax.wrapper=$dialog.attr('id');response.command='insert';response.method='html';ajax.commands.insert(ajax,response,status);if(!response.dialogOptions.buttons){response.dialogOptions.drupalAutoButtons=true;response.dialogOptions.buttons=Drupal.behaviors.dialog.prepareDialogButtons($dialog)};$dialog.on('dialogButtonsChange',function(){var buttons=Drupal.behaviors.dialog.prepareDialogButtons($dialog);$dialog.dialog('option','buttons',buttons)});response.dialogOptions=response.dialogOptions||{};var dialog=Drupal.dialog($dialog.get(0),response.dialogOptions);if(response.dialogOptions.modal){dialog.showModal()}else dialog.show();$dialog.parent().find('.ui-dialog-buttonset').addClass('form-actions')};Drupal.AjaxCommands.prototype.closeDialog=function(ajax,response,status){var $dialog=$(response.selector);if($dialog.length){Drupal.dialog($dialog.get(0)).close();if(!response.persist)$dialog.remove()};$dialog.off('dialogButtonsChange')};Drupal.AjaxCommands.prototype.setDialogOption=function(ajax,response,status){var $dialog=$(response.selector);if($dialog.length)$dialog.dialog('option',response.optionName,response.optionValue)};$(window).on('dialog:aftercreate',function(e,dialog,$element,settings){$element.on('click.dialog','.dialog-cancel',function(e){dialog.close('cancel');e.preventDefault();e.stopPropagation()})});$(window).on('dialog:beforeclose',function(e,dialog,$element){$element.off('.dialog')})})(jQuery,Drupal);
/**
 * @file
 * Provides js functions to deal with ajax links.
 */
(function ($, window, Drupal) {

  "use strict";

  /**
   * Prevents opening ajax links in new tab and opens them in popup instead.
   *
   * @type {{attach: Drupal.behaviors.comparison.attach}}
   */
  Drupal.behaviors.preventOpeningAjaxLinksInNewTab = {
    attach: function (context, settings) {
      var restrictMidMouseButtonClasses = [
        "use-ajax",
      ];
      var restrictMidAndRightMouseButtonClasses = [
        "update-node-docs-ajax",
      ];

      var $preventOpenInNewTab = function (classValue, context, restrictRightButton = false) {
        var $ajaxLink = null;
        $("." + classValue, context).once(classValue + "ClickProcessed").on("contextmenu auxclick", function (event) {
            // In case the links wraps simple text the link itself is clicked with the middle/right mouse button.
            if($(event.target).is("a[href]") && $(event.target).hasClass(classValue)) {
              $ajaxLink = $(event.target);
            }
            // In case the ajax link wraps any element rather than simple text
            // the link is not clicked with the middle/right mouse button. Instead the child element which
            // does not have the {classValue} class is clicked and therefore the link is opened in a new tab.
            else if($(event.target).parents("." + classValue).length) {
              var $parentAjaxLink = $(event.target).parents("." + classValue);
              if($parentAjaxLink.is("a[href]")) {
                $ajaxLink = $parentAjaxLink;
              }
            }
            if ($ajaxLink) {
              switch (event.button) {
                case 1:
                  event.preventDefault();
                  // Clicks on the link.
                  $ajaxLink.click();
                  break;

                case 2:
                  if (restrictRightButton) {
                    event.preventDefault();
                  }
                  break;
              }
            }
          });
      };

      $.each(restrictMidMouseButtonClasses, function (index, value) {
        $preventOpenInNewTab(value, context);
      });

      $.each(restrictMidAndRightMouseButtonClasses, function (index, value) {
        $preventOpenInNewTab(value, context, true);
      });
    }
  };

})(jQuery, window, Drupal);
;
(function(){"use strict";if(document.readyState==="complete"){document.querySelector('html').classList.add('html-loaded')}else window.addEventListener("load",function(){document.querySelector('html').classList.add('html-loaded')})})();
