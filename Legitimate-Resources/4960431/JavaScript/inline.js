
window.addEventListener('DOMContentLoaded', function() {
  (function ($) {
    var $instagramSection = $('.instagram-collection');
    var loadImages = function($container, data, imageCount){
      for (var i = 0; i < imageCount; i++) {
        var images = data.data[i].images,
            // Thumbnail
            thumbnail = images.thumbnail.url,
            thumbnailWidth = images.thumbnail.width,
            // Low Resolution
            low_resolution = images.low_resolution.url,
            low_resolutionWidth = images.low_resolution.width,
            // Standard Resolution
            standard_resolution = images.standard_resolution.url,
            standard_resolutionWidth = images.standard_resolution.width;
        if(window.lazySizes){
          var $image = $container.find('.box-' + i + ' .card__image');
          $image.replaceWith('<div class="card__image lazyload"></div>');
          var $shotImage = $container.find('.box-' + i + ' .card__image');
          $shotImage.css({ 'background-size': 'cover' });
          $shotImage.attr('data-sizes', 'auto');
          $shotImage.attr('data-bgset', thumbnail + ' ' + thumbnailWidth + 'w, ' +
                                        low_resolution + ' ' + low_resolutionWidth + 'w, ' +
                                        standard_resolution + ' ' + standard_resolutionWidth + 'w');
        }
        if(!window.lazySizes) {
          var $image = $container.find('.box:eq(' + i + ') figure img');
          var $a = $container.find('.box:eq(' + i + ') figure a');
          $a.css({
            'padding-top': '100%',
            'position': 'relative',
            'overflow': 'hidden',
            'display': 'block'
          });
          $image.replaceWith('<div class="card__image lazyload"></div>');
          var $shotImage = $container.find('.box:eq(' + i + ') .card__image');
          $shotImage.css({
            'background-size': 'cover',
            'background-image': 'url(' + standard_resolution + ')',
            'background-position': 'center',
            'display': 'block',
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%'
          });
        }
      }
    }
    $instagramSection.each(function(i){
      var $container = $(this);
      // sections
      if(window.storeWithExpiration){
        var accessToken = $container.data('instagram-access-token'),
            imageCount = $container.data('image-count');
            
        var checkImages = setInterval(function(i){
          if($container.find('img').length > 0 && storeWithExpiration.get(accessToken) !== null){
            clearInterval(checkImages);
            var data = storeWithExpiration.get(accessToken);
            if(imageCount > data.data.length) {
              imageCount = data.data.length;
            }
            loadImages($container, data, imageCount);
          }
        }, 100);
      }
      // pre-sections
      if(!window.storeWithExpiration){
        var accessToken = $container.data('iat'),
            imageCount = '18';
        var apiURL = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + accessToken + '&count=20';
        $container.find('.box').hide();
        $.ajax({
          url: apiURL,
          dataType: "jsonp",
          timeout: 5000,
          success: function(data) {
            if(imageCount > data.data.length){
              imageCount = data.data.length;
            }
            var checkImages = setInterval(function(i){
              if($container.find('img').length !== 0){
                clearInterval(checkImages);
                loadImages($container, data, imageCount);
                $container.find('.box').show();
              }
            }, 100);
          }
        });
      }
    });
  })(jQuery);
});
