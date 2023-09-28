function ocdw_form_builder_upload_file(options) {
  var element = options.a || '',
      field_id = options.b || '',
      form_id = options.c || '',
      button_text = $(element).data('upload-btn'),
      attachment_folder = $(element).next().val(),
      $main_form = $('#ocdw_form_builder-form-'+form_id);

  if (Number(field_id) <= 0 || Number(form_id) <= 0) {
    return false;
  }
  
  $('#ocdw_form_builder-form-upload-'+form_id+'-'+field_id).remove();

  $('#ocdw_form_builder-block-'+form_id).prepend('<form enctype="multipart/form-data" class="ocdw_form_builder-form-upload" id="ocdw_form_builder-form-upload-'+form_id+'-'+field_id+'" style="display: none;"><input type="file" name="file[]" multiple /></form>');
  
  $('#ocdw_form_builder-form-upload-'+form_id+'-'+field_id).find('input[name=\'file[]\']').trigger('click');

  $('#ocdw_form_builder-form-upload-'+form_id+'-'+field_id).find('input[name=\'file[]\']').on('change', function () {
    $.ajax({
      url: 'index.php?route=extension/ocdevwizard/form_builder/attachment&field_id='+field_id+'&attachment_folder='+attachment_folder,
      type: 'post',
      dataType: 'json',
      data: new FormData($(this).parent()[0]),
      cache: false,
      contentType: false,
      processData: false,
      beforeSend: function() {
        $(element).prop('disabled', true);
        $(element).html('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');
      },
      complete: function() {
        $(element).prop('disabled', false);
        $(element).html(button_text);
      },
      success: function (json) {
        $main_form.find('.error-text').remove();

        if (json['error']) {
          $(element).parent().after('<div class="error-text">'+json['error']+'</div>');
        }

        if (json['user_files']) {
          html = '';
          $.each(json['user_files'], function (i,value) {
          html += '<div class="item">';
          html += '  <div class="file-icon"><div class="number"></div><div class="inner"><span></span><span></span><span></span></div></div>';
          html += '  <div class="action-buttons">';
          if (value['file_open_status'] == 1) {
            html += '    <a class="open-file" href="' + value['view'] + '" target="_blank"><img src="/image/catalog/ocdevwizard/form_builder/eye-icon.png"></a>';
          }
          html += '    <button type="button" class="remove-file" onclick="$(this).parent().parent().remove();"><img src="/image/catalog/ocdevwizard/form_builder/trash-icon.png"></button>';
          html += '  </div>';
          html += '  <input type="hidden" name="field['+field_id+'][]" value="'+value['filename']+'" />';
          html += '</div>';
          });

          $('#file-list-'+form_id+'-'+field_id).prepend(html);
        }

        $main_form.find('input[name=\'field['+field_id+'][attachment_folder]\']').val(json['attachment_folder']);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(thrownError+"\r\n"+xhr.statusText+"\r\n"+xhr.responseText);
      }
    });
  });
}

function ocdw_form_builder_prepare_form(options) {
  var form_id = options.a || '',
      language_code = options.b || '',
      module_type = options.c || '',
      field_id = options.d || '',
      flatpickr_close_type = 1,
      $main_form = $('#ocdw_form_builder-form-'+form_id);

  if (Number(form_id) <= 0) {
    return false;
  }
  
  if ($main_form.find('[data-ocdw-mask]').length) {
    ocdw_form_builder_load_js('catalog/view/javascript/ocdevwizard/helper/inputmask/jquery.inputmask.min.js', 'helper-inputmask-1', function () {
      setTimeout(function(){
        $main_form.find('[data-ocdw-mask]').each(function() {
          $(this).inputmask($(this).data('ocdw-mask'), {showMaskOnHover: false});
        });
      },300)
    });
  }
  
  if ($main_form.find('[data-datepick]').length) {
    $main_form.find('[data-datepick]').each(function () {
      var element = $(this);
    
      if ($(element).data('datepick') == 'time') {
        var date_format = "H:i",
          enable_time = true,
          enable_date = true;
      } else if ($(element).data('datepick') == 'datetime') {
        var date_format = "Y-m-d H:i",
          enable_time = true,
          enable_date = false;
      } else if ($(element).data('datepick') == 'date') {
        var date_format = "Y-m-d",
          enable_time = false,
          enable_date = false;
      }
    
      let input_field = $(element).find('input'),
          flatpickr_lang = (language_code == 'ru' || language_code == 'uk') ? language_code : 'en',
          default_date = $(element).find('input').val()
    
      $(input_field).on('focus', function () {
        $(input_field.next()).addClass('active');
      });
    
      ocdw_form_builder_load_css('catalog/view/javascript/ocdevwizard/helper/flatpickr/flatpickr.min.css', 'helper-flatpickr',function() {
        ocdw_form_builder_load_js('catalog/view/javascript/ocdevwizard/helper/flatpickr/flatpickr.min.js', 'helper-flatpickr-1',function() {
          ocdw_form_builder_load_js('catalog/view/javascript/ocdevwizard/helper/flatpickr/l10n/'+flatpickr_lang+'.js', 'helper-flatpickr-2',function() {
            setTimeout(function(){
              input_field.flatpickr({
                enableTime: enable_time,
                noCalendar: enable_date,
                dateFormat: date_format,
                defaultDate: (default_date) ? default_date : '',
                time_24hr: true,
                allowInput: true,
                locale: flatpickr_lang,
                inline: true,
                onChange:function(selectedDates, dateStr, instance) {
                  if (flatpickr_close_type == 1 || flatpickr_close_type == 3) {
                    $(input_field.next()).removeClass('active').blur();
                    $(input_field).blur();
                  }
                }
              });
            },400);
          });
        });
      });
    
      if (flatpickr_close_type == 2 || flatpickr_close_type == 3) {
        $(document).click(function (e) {
          if ($(e.target).parents('.inner-center').length === 0) {
            $(input_field.next()).removeClass('active');
          }
        });
      }
    });
  }

  if (module_type) {
    if (module_type == 'related_field') {
      if (Number(field_id) <= 0) {
        return false;
      }
    
      $main_form.find('.related-inner-'+field_id+' input[onchange^=\'ocdw_form_builder_related_field\']:checked, .related-inner-'+field_id+' select[onchange^=\'ocdw_form_builder_related_field\']').trigger('change');
    } else {
      $main_form.find('input[onchange^=\'ocdw_form_builder_related_field\']:checked, select[onchange^=\'ocdw_form_builder_related_field\']').trigger('change');
    }
  }
}

function ocdw_form_builder_related_field(options) {
  var element = options.a || '',
      form_id = options.b || '',
      field_id = options.c || '',
      fields_column = options.d || '',
      field_value_id = $(element).val(),
      $main_form = $('#ocdw_form_builder-form-'+form_id);

  $.ajax({
    type: 'post',
    url: 'index.php?route=extension/ocdevwizard/form_builder/related_field',
    data: {form_id:form_id,field_value_id:field_value_id,fields_column:fields_column},
    dataType: 'html',
    beforeSend: function() {
      $(element).prop('disabled', true);
    },
    complete: function() {
      $(element).prop('disabled', false);
    },
    success: function(data) {
      $main_form.find('div[data-error-row=\''+field_id+'\'] .success-text, div[data-error-row=\''+field_id+'\'] .error-text').remove();
      $main_form.find('div[data-error-row=\''+field_id+'\'].error-style').removeClass('error-style');

      if (data) {
        $(element).closest('.inner-field').parent().find('.related-inner-'+field_id).show().html(data);
      } else {
        $(element).closest('.inner-field').parent().find('.related-inner-'+field_id).hide().html('');
      }
  
      if ($main_form.find('[data-ocdw-mask]').length) {
        ocdw_form_builder_load_js('catalog/view/javascript/ocdevwizard/helper/inputmask/jquery.inputmask.min.js', 'helper-inputmask-1', function () {
          $main_form.find('[data-ocdw-mask]').each(function() {
            setTimeout(function () {
              $(this).inputmask($(this).data('ocdw-mask'), {showMaskOnHover: false});
            },300);
          });
        });
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError+"\r\n"+xhr.statusText+"\r\n"+xhr.responseText);
    }
  });
}