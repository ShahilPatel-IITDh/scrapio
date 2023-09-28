'use strict';

class AutoComplete {
  constructor() {
    if (typeof greenmart_settings === "undefined") return;

    var _this = this;

    _this._callAjaxSearch();

    jQuery(document.body).on('search_device_mobile', event => {
      _this._callAjaxSearch();
    });
  }

  _callAjaxSearch() {
    var acs_action = 'greenmart_autocomplete_search',
        $t = jQuery("input[name=s]");

    $t.on("focus", function () {
      var _this2 = jQuery(this);

      var appendto = typeof jQuery(this).parents('form').data('appendto') !== "undefined" ? jQuery(this).parents('form').data('appendto') : '';
      jQuery(this).autocomplete({
        source: function (req, response) {
          $.ajax({
            url: greenmart_settings.ajaxurl + '?callback=?&action=' + acs_action,
            dataType: "json",
            data: {
              term: req.term,
              category: this.element.parent().find('.dropdown_product_cat').val(),
              style: this.element.data('style'),
              post_type: this.element.parent().find('.post_type').val(),
              security: greenmart_ajax.search_nonce
            },
            success: function (data, event, ui) {
              if (!data.length) {
                if (_this2.val().length > 1) {
                  if (_this2.parents('form').find(appendto).find('ul').length > 0) {
                    _this2.parents('form').find(appendto).find('ul li').remove();
                  }
                }
              }

              response(data);
            }
          });
        },
        minLength: 2,
        appendTo: appendto,
        autoFocus: true,
        search: function (event, ui) {
          jQuery(event.currentTarget).parents('.tbay-search-form').addClass('load');
        },
        select: function (event, ui) {
          window.location.href = ui.item.link;
        },
        create: function () {
          jQuery(this).data('ui-autocomplete')._renderItem = function (ul, item) {
            var string = '';

            if (item.image != '') {
              var string = '<a class="image" href="' + item.link + '" title="' + item.label + '"><img class="pull-left" src="' + item.image + '" style="margin-right:10px;"></a>';
            }

            string += '<div class="group">';
            string += '<div class="name"><a href="' + item.link + '" title="' + item.label + '">' + item.label + '</a></div>';

            if (item.price != '') {
              string += '<div class="price">' + item.price + '</div> ';
            }

            string += '</div>';
            return jQuery("<li>").append(string).appendTo(ul);
          };

          jQuery(this).data('ui-autocomplete')._renderMenu = function (ul, items) {
            var that = this;
            jQuery.each(items, function (index, item) {
              that._renderItemData(ul, item);
            });

            if (items[0].view_all) {
              ul.append('<li class="list-header ui-menu-divider">' + items[0].result + '</li>');
              ul.append('<li class="list-bottom ui-menu-divider"><a class="search-view-all" href="javascript:void(0)">' + greenmart_settings.view_all + '</a></li>');
            } else {
              ul.append('<li class="list-header ui-menu-divider">' + items[0].result + '</li>');
            }

            jQuery(document.body).trigger('greenmart_search_view_all');
          };
        },
        response: function (event, ui) {
          if (ui.content.length === 0) {
            jQuery(".tbay-preloader").text(greenmart_settings.no_results);
            jQuery(".tbay-preloader").addClass('no-results');
          } else {
            jQuery(".tbay-preloader").empty();
            jQuery(".tbay-preloader").removeClass('no-results');
          }
        },
        open: function (event, ui) {
          jQuery(event.target).parents('.tbay-search-form').removeClass('load');
          jQuery(event.target).parents('.tbay-search-form').addClass('active');
        },
        close: function () {}
      }).focus(function () {
        if (_this2.val().length > 1) {
          if (_this2.parents('form').find(appendto).find('ul li').length > 0) {
            _this2.parents('form').find(appendto).find('ul').show();
          }

          _this2.trigger(jQuery.Event("keydown"));
        }
      });
    });
    jQuery(document.body).on('greenmart_search_view_all', () => {
      jQuery('.search-view-all').on("click", function () {
        jQuery(this).parents('form').submit();
      });
    });
    jQuery('.tbay-preloader').on('click', function () {
      jQuery(this).parents('.tbay-search-form').removeClass('active');
      jQuery(this).parents('.tbay-search-form').find('input[name=s]').val('');
    });
    jQuery("input[name=s]").keyup(function () {
      if (jQuery(this).val().length == 0) {
        jQuery(this).parents('.tbay-search-form').removeClass('load');
        jQuery(this).parents('.tbay-search-form').removeClass('active');
        jQuery(this).parents('.tbay-search-form').find('.tbay-preloader').empty();
      }
    });
  }

}

jQuery(document).ready(function ($) {
  new AutoComplete();
});
