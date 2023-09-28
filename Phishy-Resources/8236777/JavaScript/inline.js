
    var jc_webpTests = [{'uri': 'data:image/webp;base64,UklGRkQAAABXRUJQVlA4WAoAAAAQAAAAAQAAAQAAQUxQSAUAAAAAAAAAAABWUDggGAAAADABAJ0BKgIAAgACADQlpAADcAD++5QAAA=='}];
    var jc_webp = jc_webpTests.shift();

    function jc_test_webp(uri) {
      var jc_image = new Image();
      function jc_addResult(event) {
	      if (event && event.type === 'load' && jc_image.width == 2) {
	      	document.cookie = 'jetcache_webp=1; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT';
	      	console.log('WebP supported');
	      } else {
	      	document.cookie = 'jetcache_webp=0; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT';
	      	console.log('WebP NOT supported');
	      }
      }
      jc_image.onerror = jc_addResult;
      jc_image.onload = jc_addResult;
      jc_image.src = uri;
    }
    jc_test_webp(jc_webp.uri, function(e) {
      if (e && e.type === 'load') {
      	for (var i = 0; i < jc_webpTests.length; i++) {
          jc_test_webp(jc_webpTests[i].uri);
        }
      }
    });
