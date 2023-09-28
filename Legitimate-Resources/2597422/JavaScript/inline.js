

  $(function() {

    // setup_ac('ananzi-ads', 'ananzi-ads-q', 'https://www.ananzi.co.za/proxy/search_results_suggestions');

    var xhr;
    $("#ananzi-ads-q").autoComplete({
        source: function(term, response){
            try { xhr.abort(); } catch(e){}
            xhr = $.getJSON('https://www.ananzi.co.za/proxy/search_results_suggestions', { term: term }, function(data){ response(data); });
        },
        renderItem: function (item, search){
            search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
            return '<div class="autocomplete-suggestion" data-url="'+item[1]+'"  data-val="'+search+'">'+item[0].replace(re, "<b>$1</b>") + '</div>';
        },
        onSelect: function(e, term, item){
            var url = item.data('url');

            $('#ananzi-ads-q').val(item.text());

            if (typeof url != 'undefined' && url != '') {
                top.location.href=url;
            }

        }        
    });

    $('#ananzi-ads-q').keypress(function(e) {
        if (e.keyCode == '13') {
            //e.preventDefault();
            $('#ananzi-ads').submit();
        }
    });

    $('#ananzi-ads-q').on('change', function() {


    });

    $('#ananzi-ads-q').focus();

    var submitted = false;

    $('#ananzi-ads-form').on('submit', function(e) {

      if (!submitted) {
        var q = $('#ananzi-ads-q').val();

        e.preventDefault();
        $('#btn-submit-ads').attr('disabled', 'disabled');

        $.get("https://www.ananzi.co.za/proxy/search_results_suggestions?term=" + q, function(result) {
          
          if (typeof result != 'object') {
            result = jQuery.parseJSON(result);
          }
          
          var url = result[0][1];

          submitted = true;
          // $('#ananzi-ads-form').submit();
          top.location.href=url;
        });


      }
    });
  });

  function toggleSearch(activateSearch) {

    $('.form-wrappers').hide();
    $('#' + activateSearch +'-form-wrapper').show();

    if (activateSearch == 'ananzi-sadirectory') {
      currentSearchVal = $('#ananzi-ads-q').val();
      $('#ananzi-sadirectory-q').val(currentSearchVal);
    } else {
      currentSearchVal = $('#ananzi-sadirectory-q').val();
      $('#ananzi-ads-q').val(currentSearchVal);
    }


  }

  function cookieLinkSave(url){
      return $.cookie('rub_trending_pages', url, { expires: 1 });
  }

