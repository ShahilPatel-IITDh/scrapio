
		let _umbrella_funQueue = [];

    // RECURSIVE LOAD SCRIPTS
    const _umbrella_loadScripts = ( urls, final_callback, index = 0 ) => {
      if( typeof urls[index + 1] === "undefined" ) {
        _umbrella_loadScript( urls[index], final_callback );
      }
      else {
        _umbrella_loadScript( urls[index], function() {
          _umbrella_loadScripts( urls, final_callback, index + 1 );
        } );
      }
    }

    // LOAD SCRIPT
    const _umbrella_loadScript = ( url, callback ) => {
      var script = document.createElement( "script" );
      script.type = "text/javascript";
      if(script.readyState) { // IE
        script.onreadystatechange = function() {
          if ( script.readyState === "loaded" || script.readyState === "complete" ) {
            script.onreadystatechange = null;
            callback();
          }
        };
      }
      else { // Others
        script.onload = function() { callback(); };
      }

      script.src = url;
      document.getElementsByTagName( "head" )[0].appendChild( script );
    }

		const _umbrella_pushFunctionQueue = (fn) => {
			_umbrella_funQueue.push(fn);
		}

		const _umbrella_callFunctionQueue = () => {
			while (_umbrella_funQueue.length > 0) {
					(_umbrella_funQueue.shift())();
			}
		}
  