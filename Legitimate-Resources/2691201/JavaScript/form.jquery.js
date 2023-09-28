(function(window, document, $, DEBUG_MODE) {

document.getZoom = function() {
  var zoom = $('body').css('zoom') * 1;
  return isNaN(zoom) ? 1 : zoom;
};

$.fn.npsWidget = function(){
  function createScale($input){
    var $scaleContainer = $('<div class="mentreprises-nps-scale"><div class="nps-scale-inner"><ul class="pagination"></ul><div class="rating-nps-scale-legend"><span>' + $input.data('minlegend') + '</span> <span>' + $input.data('maxlegend') + '</span></div></div></div>');
    $input.find('option').each(function(){
      if (this.value !== ''){
        var $scaleElement = $('<li class="page-item"><a href="#" data-value="' + $(this).val() + '" class="page-link bg-secondary">' + $(this).val() + '</a></li>');
        $scaleContainer.find(".pagination").append($scaleElement);
      }
    });

    $scaleContainer.find('.page-link').click(function(event){
      event.preventDefault();
      $input.val($(this).attr('data-value'));
      $input.change();
    });

    /* actualize value */
    $input.change(function(){
      $scaleContainer.find('.pagination li').removeClass('active');
      $scaleContainer.find('.pagination li a[data-value="' + this.value + '"]').parent('li').addClass('active'); 
    }).change();

    return $scaleContainer;
  }

  /* hide input */
  if (!DEBUG_MODE) $(this).css({ width: 0, height: 0, margin: 0, padding: 0, border: '1px solid transparent', opacity: 0 });

  var $select = $(this);
  return $select.each(function(){
    $(this).before(createScale($(this)));
    return $(this);
  });
}

$.fn.starsWidget = function(starsSize, starsColor){

  function createAndInsertStars($this){
    var $options = $this.find('option').filter(function(){ return this.value });
    
    var STARS_NUM = parseInt($options.last().val());
    var MAX = parseInt($this.attr('data-max') || STARS_NUM);
    var STEPS_NUM = $options.length;

    /* generate legends */
    var legends = { 0: '&nbsp;' };
    $options.each(function(){
      var $option = $(this);
      legends[$option.val()] = $option.text();
    });

    /* create widget */
    var $widget = $('<div class="rating-stars-widget mentreprises-stars stars-' + starsSize + ' stars-' + starsColor + '" style="position: relative; z-index: 1;"></div>');
    var $starsOn = $('<div class="stars-on"></div>');
    for (var i = 0; i < STARS_NUM; i++) $widget.append('<div class="single-star"></div>');
    $widget.append($starsOn);
    
    /* insert widget */
    $this.before($widget);

    /* set widget dimensions */
    var $singleStar = $widget.children('.single-star').eq(0);
    var widgetWidth = $singleStar.width() * STARS_NUM;
    var widgetHeight = $singleStar.height();
    $widget.css({ width: widgetWidth + 'px', height: widgetHeight + 'px' });
    if (DEBUG_MODE && !firstStarsDebugged) {
      alert('first widget transformed: ' + widgetWidth + '*' + widgetHeight + ' => ' + $widget.width() + '*' + $widget.height());
      firstStarsDebugged = true;
    }
    /* register references */
    $this.data('$starsWidget', $widget);
    $widget.data('$input', $this);
    $widget.data('$starsOn', $starsOn);
    $widget.data('$legend', $this.next('.rating-stars-legend'));
    /* register events */
    $widget.bind('mousedown', function(event){ event.preventDefault(); });
    $widget.bind('dragstart', function(event){ event.preventDefault(); });
    $widget.bind('drag', function(event){ event.preventDefault(); });
    $widget.bind('mouseup', function(event){
      starsWidgetPersistValue($(this), event.pageX, MAX, STEPS_NUM, legends);
      event.preventDefault();
    });

    if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
      $widget.bind('touchmove', function(event){
        var $this = $(this);
        if (!$this.data('firstTouch')) $this.data('firstTouch', event.originalEvent.touches.item(0));
        if (oldTimer = $this.data('touchmoveTimer')) window.clearTimeout(oldTimer);
        var x = starsWidgetGetTouchEventX($this, event);
        if (x) {
          $this.data('touchmoveTimer', window.setTimeout(function($this) {
            $this.data('touchmoveTimer', null);
            $this.data('firstTouch', null);
            starsWidgetPersistValue($this, x, MAX, STEPS_NUM, legends);
          }, 300, $this));
          starsWidgetDisplayValue($widget, starsWidgetGetValue($widget, x, MAX, STEPS_NUM), MAX, legends);
          event.preventDefault();
        }
        else starsWidgetDisplayValue($widget, $widget.data('$input').val(), MAX, legends);
      });
      $widget.bind('touchend', function(event){
        var x = starsWidgetGetTouchEventX($this, event);
        if (x) {
          starsWidgetPersistValue($this, x, MAX, STEPS_NUM, legends);
        }
        else starsWidgetDisplayValue($widget, $widget.data('$input').val(), MAX, legends);
      });
    }
    else {
      $widget.bind('mousemove', function(event){
        var $widget = $(this);
        starsWidgetDisplayValue($widget, starsWidgetGetValue($widget, event.pageX, MAX, STEPS_NUM), MAX, legends);
        event.preventDefault();
      });
      $widget.bind('mouseout', function(event){
        var $widget = $(this);
        starsWidgetDisplayValue($widget, $widget.data('$input').val(), MAX, legends);
      });
    }
    /* actualize value */
    $this.change(function() {
      starsWidgetDisplayValue($this.data('$starsWidget'), $this.val(), MAX, legends);
    }).change();

    return $widget;
  }

  /* get current x position of a touch event */
  function starsWidgetGetTouchEventX($widget, event){
    var eventCoord = event.originalEvent.touches ? event.originalEvent.touches.item(0) : event;
    if ($widget.data('firstTouch')) {
      var originalPageY = $widget.data('firstTouch').pageY;
      var widgetHeight = $widget.height();
      if ((eventCoord.pageY < originalPageY - widgetHeight) || (eventCoord.pageY > originalPageY + widgetHeight)) return null;
    }
    return eventCoord ? eventCoord.pageX : 0;
  }
  
  /* get current widget value */
  function starsWidgetGetValue($widget, x, MAX, stepsNum){
    var zoom = document.getZoom();
    if (zoom) x /= zoom;
    return Math.min(stepsNum, Math.ceil(stepsNum * (x - $widget.offset().left) / $widget.width())) * MAX / stepsNum;
  }
  /* set widget value */
  function starsWidgetDisplayValue($widget, value, MAX, legends){
    value = parseFloat(value) || 0;
    $widget.data('$starsOn').css({ width: Math.round(100 * value / MAX) + '%' });
    if (legends) $widget.data('$legend').html(legends['' + value + '']);
  }
  /* set widget value */
  function starsWidgetPersistValue($widget, x, MAX, stepsNum, legends){
    var $input = $widget.data('$input');
    $input.val(starsWidgetGetValue($widget, x, MAX, stepsNum));
    starsWidgetDisplayValue($widget, $input.val(), MAX, legends);
    $input.change(); // forward event to parent elt
  }
      
  if (DEBUG_MODE) alert('transforming ' + this.length + ' widgets to stars "' + starsSize + '-' + starsColor + '"...');
  var firstStarsDebugged = false;
  
  /* hide input */
  if (!DEBUG_MODE) $(this).css({ width: 0, height: 0, margin: 0, padding: 0, border: '1px solid transparent', 'margin-right': '-2px', opacity: 0 });

  return this.each(function() {
    var $select = $(this);
    if (!$select.data('$starsWidget')) {
      createAndInsertStars($select);
    }
    return $select;
  });
};

$.fn.replaceWithFakeSelect = function(fakeClass){
  if (typeof document.body.style.maxHeight === 'undefined') return;
  return this.each(function()
  {
    var $this = $(this);
    var $fakeElement = $('<div></div>')
      .css({ 'overflow': 'hidden' })
      .attr('class', $this.attr('class') + ' ' + fakeClass)
      .insertAfter($this);
    $this.appendTo($fakeElement);
    var paddings = $fakeElement.css('padding').split(' ');
    var margins = [];
    for (var i in paddings) margins.push('-' + paddings[i]);
    $this
      .css({
        'font-family': $fakeElement.css('font-family'),
        'font-size': $fakeElement.css('font-size'),
        'color': $fakeElement.css('color'),
        'background': $fakeElement.css('background'),
        'border': '0',
        'padding': paddings.join(' '),
        'margin': margins.join(' '),
        'width': '120%'
        //'height': '100%'
      })
      .attr('class', '');
    return $this;
  });
};

$.fn.replaceWithFakeMultipleSelect = function(fakeClass) {
  /* no replacement for touch screens */
  if ('ontouchstart' in window || navigator.msMaxTouchPoints) return this;
  
  function createMultipleSelect($select) {
    var $fakeElement = $('<div></div>')
      .attr('class', $select.attr('class') + ' ' + fakeClass);
    var inputId = $select.attr('id');
    var selectedValues = $select.val();
    $select.children('option').each(function() {
      var optionElt = this;
      var optionValue = '' + optionElt.value + '';
      var $checkboxContainer = $(''
        + '<div id="fake-' + inputId + '">'
          + '<input type="checkbox" value="' + optionValue + '" id="fake-' + inputId + '-' + optionValue + '" ' + (($.inArray(optionValue, selectedValues) >= 0) ? 'checked': '') + ' />'
          + '<label for="fake-' + inputId + '-' + optionValue + '">' + $(this).text() + '</label>'
        + '</div>'
        )
        .appendTo($fakeElement)
      ;
      $fakeElement.find('input[value="' + optionValue + '"]')
        .change(function() {
          // why this duplication in the next 2 lines? (To support all browsers?)
          optionElt[this.checked ? 'setAttribute' : 'removeAttribute']('selected', true);
          optionElt.selected = this.checked;
          $select.change();
        })
      ;
    });

    /* actualize value */
    $select.change(function() {
      var values = $select.val() || [];
      $fakeElement.find('input[type="checkbox"]').prop('checked', false);
      for (var i in values) {
        $fakeElement.find('input[value="' + values[i] + '"]').prop('checked', true);
      }
    }).change();
    
    //prevent a bug on Safari
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
      $select.removeAttr('required'); 
    }

    return $fakeElement;
  }

  var $select = $(this);

  if (document.location.hash !== '#_DEBUG') $select.hide();//height(0)//.css({ 'visibility': 'hidden' });

  return this.filter('select[multiple]').each(function() {
    var $select = $(this);
    createMultipleSelect($select).insertAfter($select);
    return $select;
  });
};

$.fn.dependsOn = function(options /* { source: { elt:, translator: }, postFilter:, $otherTriggers:, afterCallback } */) {
  return this.filter('select').each(function() {
    var $this = $(this);
    var currentValue = $this.val();
    var optionElts = { '_': $this.children('option') };
    $this.children('optgroup').each(function() {
      optionElts[this.label] = $(this).children('option');
    });
    
    if (options.source) {
      if (!options.source.elt || !options.source.translator) throw 'options.source must contain elt and translator';
      var $source = $(options.source.elt);
      if (!$source.length) throw 'options.source element "' + options.source.elt + '" could not be found';
      var translator = null;
      if (options.source.translator === 'value') translator = function(value, text) { return value; };
      else if (options.source.translator === 'text')  translator = function(value, text) { return text; };
      else if (typeof options.source.translator === 'function') translator = options.source.translator;
      else throw 'options.source.translator "' + options.source.translator + '" invalid';
      var sourceChangeCb = function() {
        var currentValue = $this.val();
        var $selectedOption = $(this.options[this.selectedIndex]);
        var label = translator($selectedOption.val(), $selectedOption.text());
        $this.html(optionElts['_']);
        if (optionElts[label]) {
          $this.append(optionElts[label]);
        }
        $this.val(currentValue);
        if (options.postFilter) {
          $this.children().filter(function(index) {
            var $option = $(this); return !options.postFilter($option.val(), $option.text());
          }).remove();
        }
        if (options.afterCallback) {
          options.afterCallback.apply($this.get(0));
        }
      };
      $source.change(sourceChangeCb);
      sourceChangeCb.apply($source.get(0));
      if (options.$otherTriggers) {
        for (var i in options.$otherTriggers) options.$otherTriggers[i].change(function() {
          sourceChangeCb.apply($source.get(0));
        });
      }
    }
    else {
      $this.html('');
      for (var label in optionElts) $this.append(optionElts[label]);
    }
    
    $this.val(currentValue);
    
    return $this;
  });
};

$.fn.imagePicker = function(previewClassname) {
  return this
    .filter('input[type="file"]')
    .filter('[data-image-url]')
    .each(function() {
      var $this = $(this);
      if (!$this.data('$preview')) {
        var url = $this.attr('data-image-url');
        if (url) {
          var $preview = $('<a href="#" class="' + (previewClassname || '') + '"><img src="' + url + '" /></a>');
          var showPreview = function(newUrl) {
            $preview.find('img').attr('src', newUrl ? newUrl : url);
            $preview.show();
            $this.hide();
          };
          var showInput = function(e) {
            e.preventDefault();
            $preview.hide();
            $this.show().focus();
          };
          $preview.click(showInput);
          $this
            .blur(function() {
              if (!$this.val()) showPreview();
            })
            .change(function() {
              if (window.FileReader) {
                if ($this.get(0).files.length) {
                  var fileReader = new FileReader();
                  fileReader.onload = function() {
                    showPreview(this.result);
                  };
                  fileReader.readAsDataURL($this.get(0).files[0]);
                }
              } else {
                if ($this.val()) showInput();
                else showPreview();
              }
            })
            .hide()
            .after($preview)
          ;
        }
        $this.data('$preview', $preview);
      }
    })
  ;
};

$.fn.datePicker = function() {
  return this
    .filter(function() {
      return (this.type !== 'date');
    })
    .dblclick(function() {
      $(this).attr('readonly', false);
    })
    .each(function() {
        var options = {
            beforeShow: function() { $(this).attr('readonly', true); },
            onClose: function() { $(this).attr('readonly', false); },
            onSelect: function() { $(this).blur(); }, /* forward event */
            prevText: '<<',
            nextText: '>>',
            firstDay: 1,
            dateFormat: 'yy-mm-dd',
            changeYear: true,
            maxDate: '+5y'
            //dayNames: [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi" ]
            //dayNamesMin: [ "Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa" ]
        };
        if (this.getAttribute('min')) {
            options.minDate = this.getAttribute('min');
        }
        if (this.getAttribute('max')) {
            options.maxDate = this.getAttribute('min');
        }
        $(this).datepicker(options);
    })
  ;
};

$.fn.colorCodePicker = function() {
  var $elts = this;
  ME.Utils.loadAsyncJs('/vendor/tinyColorPicker/jqColorPicker.min.js', 'jQuery.fn.colorPicker', function() {
    $elts.each(function() {
      var $colorBox = $('<input type="text" style="width: 30px; height: 30px; margin: 5px; font-size: 0;" value="' + this.value + '"> </span>');
      $colorBox.data('$input', $(this));
      $colorBox.insertAfter(this).data('$colorBox', $colorBox).colorPicker({
        renderCallback: function($colorBox, toggled) {
          if (!toggled) {
            $colorBox.data('$input').val(this.color);
          }
        },
      });
    });
    
  })
};

$.fn.entityPicker = function(entityType, options) {
  if (!options) options = {};
  if (!options.$idInput) {
      options.$idInput = $('<input />');
  }

  if (!ME.Config.apiEntityAutocompleteUrls[entityType]) {
    throw 'Invalid entityType "' + entityType + '" for autocomplete.';
  }
  
  var callChangeCallback = function(entityId, entityName) {
    if (options.changeCallback) {
        var changeCallbackArgs = { id: entityId, name: entityName };
        if (changeCallbackArgs != options.$idInput.data('last-change-callback-args')) {
          options.$idInput.data('last-change-callback-args', changeCallbackArgs);
          options.changeCallback(this, changeCallbackArgs);
        }
    }
  };
  
  var lang = ME.Utils.Translation.lang ? ME.Utils.Translation.lang : '';

  var paramsString = '';
  if (options.params) {
      Object.keys(options.params).forEach(function(key) {
        paramsString += '&' + key + '=' + options.params[key];
      });
  }

  return this
    .autocomplete({
      source: function(request, response) {
        $.ajax({
          url: ME.Config.apiEntityAutocompleteUrls[entityType] + '?lang=' + lang + paramsString, data: { 'name': request.term },
          dataType: 'jsonp',
          success: function(data) {
            response( $.map( data, function( item ) {
              var object = new Object();
              object.name = item.name;
              object.value = item.name;
              object.id = item.id;

              return object
            }))
          },
        });
      },
      minLength: 2,
      select: function(event, ui) {
        var typedValue = this.value;
        /* update id value */
        options.$idInput.val(ui.item.id);
        options.$idInput.data('name-corresponding-to-id', $.trim(ui.item.name));
        /* call callbacks */
        callChangeCallback(ui.item.id, ui.item.name);
        if (options.selectCallback) {
          window.setTimeout($.proxy(options.selectCallback, this, { id: ui.item.id, name: ui.item.name }, typedValue), 10);
        }
      }
    })
    .blur(function() {
      /* clean input id if typed value changed */
      if (options.$idInput.data('name-corresponding-to-id') != $.trim($(this).val())) {
        options.$idInput.val('');
      }
      callChangeCallback(options.$idInput.val(), $(this).val());
    })
    .each(function() {
      var defaultEntityId = parseInt(options.$idInput.val()) || options.defaultEntityId;
      /* if default id, retrieve entity name to display in text field */
      if (defaultEntityId && ME.ApiClient) {
        var $that = $(this);
        ME.ApiClient.entityGet(entityType, { id: defaultEntityId }, {
          success: function(response) {
            if (response.data && response.data.id) {
              if ($that.val() != response.data.name) {
                $that.val(response.data.name);
                callChangeCallback(response.data.id, response.data.name);
              }
              options.$idInput.data('name-corresponding-to-id', response.data.name);
            }
          }
        });
      }
    })
  ;
};

$.fn.employerPicker = function(options) {
  return this.entityPicker('employer', options);
};

$.fn.schoolPicker = function(options) {
  return this.entityPicker('school', options);
};

$.fn.autocompleteAndManualPicker = function(entityType) {
  return this.each(function() {
    var $this = $(this);
    var defaultEntityId = $this.val().replace(/(^.*\[|\].*$)/g, '');
    var defaultEntityName = $this.val().replace('[' + defaultEntityId + ']', '');
    var $displayedWidget = $this.clone().removeAttr("id");
    var $params = {};
    if ($this.attr('partnerId')) {
        $params['partnerId'] = $this.attr('partnerId');
    }

    $displayedWidget.attr('name', '').insertBefore(this);
    $displayedWidget.val(defaultEntityName);
    $displayedWidget.entityPicker(entityType, {
      $idInput: $('<input value="' + defaultEntityId + '" />'),
      defaultEntityId: defaultEntityId,
      params: $params,
      changeCallback: function($input, entity) {
        $this.val(entity.id ? '%name%[%id%]'.replace('%id%', entity.id).replace('%name%', entity.name) : entity.name);
        $this.trigger('change')
      }
    });

    $displayedWidget.change(function() {
      if ($displayedWidget.attr('required')) {
        $this.attr('required', true)
      } else {
        $this.removeAttr('required')
      }
    });

    if (!$displayedWidget.is('select')) {
      let $otherEntityWidget = $this.clone().removeAttr("id");
      $otherEntityWidget.attr('required', false);
      $otherEntityWidget.attr('placeholder', ME.Utils.Translation.trans(`happyform.${entityType}.placeholder`));
      $otherEntityWidget.css('margin-top', '5px');
      $otherEntityWidget.attr('name', '').insertAfter(this);
      $otherEntityWidget.change(function() {
        $this.val($(this).val());
        $this.trigger('change')
      });

      $this.change(function() {
        var regex = /\[(\d+)\]/;
        var regexMatch = regex.exec($this.val().trim());
        var entityId = (regexMatch && regexMatch[1]) ? regexMatch[1] : null;
        var entityName = $this.val().trim().replace('[' + entityId + ']', '');
        $displayedWidget.val(entityName);

        if (!entityId) {
          $otherEntityWidget.val($this.val());
          $displayedWidget.val(ME.Utils.Translation.trans('happyform.other'));
          $otherEntityWidget.attr('required', true);
          $otherEntityWidget.show();
          $otherEntityWidget.focus();
        } else {
          $otherEntityWidget.removeAttr('required')
          $otherEntityWidget.val('');
          $otherEntityWidget.hide();
        }
      });

      $displayedWidget.focus(function() {
        if ($displayedWidget.val() === ME.Utils.Translation.trans('happyform.other')) {
          $displayedWidget.val('');
          $otherEntityWidget.hide();
        }
      })

      if (document.location.hash !== '#_DEBUG') {
        $otherEntityWidget.hide();
      }
    }

    if (document.location.hash !== '#_DEBUG') {
      $this.hide();
    }
        
  });
};

$.fn.salaryWidget = function(expectedByMonth) {
  var YEAR = 1;
  var MONTH = 2;
  
  return this.each(function(){
    var $this = $(this);
    var expectedFrequency = expectedByMonth ? MONTH : YEAR;

    if (!$this.data('expectedFrequency')) {
        var $value = $('<input type="text" />')
           .on('change blur', function() { $this.change(); })
           .val($this.val())
        ;
        var $frequence = $('<select />')
          .append($('<option value="' + YEAR + '">' + ME.Utils.Translation.trans('perYear') + '</option>'))
          .append($('<option value="' + MONTH + '">' + ME.Utils.Translation.trans('perMonth') + '</option>'))
          .on('change blur', function() { $this.change(); })
          .val(expectedFrequency)
        ;

        $this.after($frequence);
        $this.after(' ');
        $this.after($value);
        
        $this.change(function() {
            var factor = 1;
            var rawValue = $.trim($value.val().toLowerCase());
            var frequence = $frequence.val();
            if (frequence < $this.data('expectedFrequency')) factor = 1 / 12;
            else if (frequence > $this.data('expectedFrequency')) factor = 12;
            if (rawValue.substr(rawValue.length - 1) === 'k') factor *= 1000;
            var value = isNaN(parseFloat(rawValue)) ? 0 : parseFloat(rawValue);
            $(this).val(Math.round(value * factor));
        });
    }
    $this.data('expectedFrequency', expectedFrequency).change();
    
    if (document.location.hash !== '#_DEBUG') $this.hide();
    
    return this;
  });
};

/* protect a (submit) button from being clicked twice in a row (it will be disabled for "duration" sec */
$.fn.protectDoubleClick = function(duration){
  if (!duration) duration = 2000;
  var IDDLE = 'iddle';
  var CLICKED = 'clicked';
  return this
    .each(function(){
      if (!this.doubleClickStatus) { /* if not already protected */
        this.doubleClickStatus = IDDLE;
        $(this).on('click', function(e) {
          if (this.doubleClickStatus !== IDDLE) e.preventDefault();
          else {
            this.doubleClickStatus = CLICKED;
            setTimeout($.proxy(function(){ this.doubleClickStatus = IDDLE; }, this), duration);
          }
        });
      }
    });
};

/* select text between start and end, only if elt has focus */
$.fn.selectText = function(start, end){
  return this.filter(":focus").each(function(){
    if (this.createTextRange) {
      var selRange = this.createTextRange();
      selRange.collapse(true);
      selRange.moveStart('character', start);
      selRange.moveEnd('character', end);
      selRange.select();
    }
    else if (this.setSelectionRange) {
      this.setSelectionRange(start, end);
    }
    else if (typeof this.selectionStart !== 'undefined') {
      this.selectionStart = start;
      this.selectionEnd = end;
    }
  });
};

/* make a textarea height grow with the number of lines */
$.fn.autoGrow = function(maxHeight){
  if (!maxHeight) maxHeight = 1000;
  return this.keyup(function(e) {
    while ($(this).outerHeight() < Math.min(maxHeight, this.scrollHeight + parseFloat($(this).css('borderTopWidth')) + parseFloat($(this).css('borderBottomWidth')))) {
      $(this).height($(this).height() + 3);
    };
    $(this).css('overflow-y', ($(this).outerHeight() > maxHeight) ? 'auto' : 'hidden');
  });
};
    
/* transform a select to a dropdown list with images (based on ddSlick) */
$.fn.pictoDropdown = function(options) {
  if (!options) options = { imageSrc: null, background: '#fff', imageHeight: 32 };
  var $selects = this.filter('select');
  ME.Utils.loadAsyncJs('/vendor/ddslick/jquery.ddslick.min.js', 'jQuery.fn.ddslick', function() {
    $selects.each(function() {
      var $originalSelect = $(this);
      /* clone select */
      var clonedSelectId = ($originalSelect.attr('id') || 'select-' + Math.round(Math.random() * 1000)) + '-clone';
      $('#' + clonedSelectId).remove();
      var $clonedSelect = $originalSelect.clone().attr('id', clonedSelectId).insertAfter(this);
      /* hide original select */
      $originalSelect.hide();
      /* set data-imagesrc by calling options.imageSrc */
      if (options.imageSrc) $clonedSelect.find('option').each(function(){
        this.setAttribute('data-imagesrc', options.imageSrc($(this).val(), $(this).text()));
      });
      /* make clone ddslick with options */
      options.width = $clonedSelect.outerWidth();
      options.onSelected = function(selectedData){
        $originalSelect.val(selectedData.selectedData.value);
      };
      $clonedSelect.ddslick(options);
      /* set style */
      $('<style type="text/css">\n'
        + '.dd-options { margin: 0; max-height: 400px; }\n'
        + '.dd-options li { margin: 0; }\n'
        + '.dd-selected, .dd-option { padding: 5px 8px; }\n'
        + '#' + clonedSelectId + ' { display: inline-block; }\n'
        + (options.imageHeight ? '#' + clonedSelectId + ' img { height: ' + options.imageHeight + 'px; }\n' : '')
        + '#' + clonedSelectId + ' label { width: auto; line-height: 0 !important; padding-top: ' + Math.round(options.imageHeight / 2) + 'px; color: #000; font-weight: normal; }\n'
      + '</style>').appendTo(document.head);
    });
  });
  return $selects;
};

/* init stuff */
if ((typeof ME != 'undefined') && ME.Utils && ME.Utils.Event) ME.Utils.Event.observe('page.updated', function(elt) {
  $(elt).find('button[type="submit"], input[type="submit"]').protectDoubleClick();
  $(elt).find('input[type="date"]').datePicker();
  $(elt).find('input[type="file"]').imagePicker('image-picker-preview');
});

/* mark as loaded */
document._jqueryFormLoaded = true;

})( window, document, window.jQuery, (document.location.hash === '#_DEBUG') );
