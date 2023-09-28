
  if( typeof avast === 'undefined'){
    var avast = {};
    avast.options = typeof avast.options !== 'undefined' ? avast.options : {};
    avast.rootPath = "../";
    avast.locale = "de-de";
    avast.options.rootPath = "../";
    avast.options.locale = "de-de";
    //avast.setLanguage("de-de");
    avast.numberDecimalSeparator = ",";
    avast.numberThousandSeparator = "&nbsp;";
  }
