
      var GEMVENDOR = GEMVENDOR || (function(){		var _js = {};		return {			init: function(Args) {				_js = Args;			},			getLibs: function() {				return _js;			}		};	}());
      if(typeof pageLibs === 'undefined' || pageLibs === null){
        var pageLibs = [];
      }
      GEMVENDOR.init(pageLibs);
      