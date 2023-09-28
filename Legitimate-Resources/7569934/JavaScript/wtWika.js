/* eslint-disable no-console */
window.wtTestActive = false;

/* For testing */
var wtShowMsg = function(args) {
  if (wtTestActive) {
    var msg = Object.keys(args)
      .map(function(key) {
        return "".concat(key, ": ").concat(args[key]);
      })
      .join("\n");
    alert(msg);
  }
};

var wtMultiTrack = function(params) {
  if (
    window.wtEventTrackingEnabled &&
    window.Webtrends &&
    window.Webtrends.multiTrack
  ) {
    params.finish = function(dcsObject) {
      Object.keys(params.args).forEach(function(a) {
        var splittedArg = a.split(".");
        if (splittedArg.length > 1) {
          delete dcsObject.d[splittedArg[1]];
        }
      });
    };

    window.Webtrends.multiTrack(params);
  } else {
    console.debug("wtMultiTrack: event tracking not enabled");
  }

  wtShowMsg(params.args);
};

/* Decorator: Check is Webtrends available */
var webtrendsGuard = function(f) {
  return function() {
    var Webtrends = window.Webtrends || null;

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    var validArgs = args.filter(function(arg) {
      return !!arg || arg === 0;
    });

    if (!Webtrends || !Webtrends.multiTrack) {
      console.error("Webtrends/Webtrends.multiTrack is not available!");
      return;
    } else if (validArgs.length < f.length) {
      throw new TypeError(
        "Argument cannot be null, undefined or empty string. - ".concat(
          JSON.stringify(args)
        )
      );
    }

    return f.apply(void 0, args);
  };
};

/* All other documents e.g. E-Book, Brochure, Flyer, Technical Information, Declaration Doc, Project Doc, Certification, ... */
var wtSimpleTrackDownload = webtrendsGuard(function(
  filename,
  doctype,
  description
) {
  var params = {
    args: {
      "DCS.dcsuri": location.href,
      "WT.dl": "20",
      "WT.s_dtype": doctype,
      "WT.s_desc": description,
      "WT.s_file": getFilename(filename)
    }
  };

  wtMultiTrack(params);
});

/* Tracking for product selector */
var wtTrackProductSelector = webtrendsGuard(function(
  selLevel1,
  selLevel2,
  selItem,
  selValue
) {
  var params = {
    args: {
      "DCS.dcsuri": location.href,
      "WT.dl": "99",
      "WT.z_toolname": "Productselector",
      "WT.z_level1": selLevel1,
      "WT.z_level2": selLevel2,
      "WT.z_Item": selItem,
      "WT.z_Value": selValue
    }
  };

  wtMultiTrack(params);
});

/* Data Sheet, 3D Data, Quick Order Sheet, Operating Instruction */
var wtTrackDownload = webtrendsGuard(function(
  cat,
  subcat,
  filename,
  doctype,
  description,
  issuenr
) {
  var filePrefix = issuenr !== "Undefined" ? issuenr + ":" : "";
  var params = {
    args: {
      "DCS.dcsuri": location.href,
      "WT.dl": "20",
      "WT.z_dtyp": doctype,
      "WT.z_dcat": cat,
      "WT.z_dscat": subcat,
      "WT.z_ddesc": description,
      "WT.z_dfile": filePrefix + getFilename(filename)
    }
  };

  wtMultiTrack(params);
});

/* Tracking for approvals */
var wtTrackApproval = webtrendsGuard(function(certBody, certType, filename) {
  var params = {
    args: {
      "DCS.dcsuri": location.href,
      "WT.dl": "20",
      "WT.z_certbody": certBody,
      "WT.z_certtype": certType,
      "WT.z_certdoc": getFilename(filename)
    }
  };

  wtMultiTrack(params);
});

/* Data Sheet from Product Results Handler */
var wtTrackProductResultsHandlerDownload = webtrendsGuard(function(
  cat,
  subcat,
  filename,
  doctype,
  description,
  issuenr
) {
  var filePrefix = issuenr !== "Undefined" ? issuenr + ":" : "";

  var params = {
    args: {
      "DCS.dcsuri": location.href,
      "WT.dl": "20",
      "WT.z_potyp": doctype,
      "WT.z_pocat": cat,
      "WT.z_porange": subcat,
      "WT.z_podesc": description,
      "WT.z_pofile": filePrefix + getFilename(filename)
    }
  };

  wtMultiTrack(params);
});

/* Tracking for news */
var wtTrackNews = webtrendsGuard(function(
  newstype,
  description,
  type,
  filename
) {
  var article = filename;

  if (type === "PDF" || type === "DOC" || type === "DOCX" || type === "Image") {
    article = getFilename(article);
  } else {
    article = getAbsPath(article);
  }

  var params = {
    args: {
      "DCS.dcsuri": location.href,
      "WT.dl": "99",
      "WT.z_newstyp": newstype,
      "WT.z_arttitle": description,
      "WT.z_arttype": type,
      "WT.z_article": article
    }
  };

  wtMultiTrack(params);
});

/* Tracking for to shop */
var wtTrackToOnlineShop = webtrendsGuard(function() {
  var params = {
    args: {
      "DCS.dcsuri": location.href,
      "WT.dl": "99",
      "WT.z_toolname": "To Online Shop",
      "WT.z_Value": "To Online Shop",
      "WT.z_to_shop": "1"
    }
  };

  wtMultiTrack(params);
});

/* Tracking for sales box */
var wtTrackSalesBoxClick = webtrendsGuard(function(value) {
  var noSelValue = "No value available";

  var params = {
    args: {
      "DCS.dcsuri": location.href,
      "WT.dl": "99",
      "WT.z_toolname": "Sales Contact",
      "WT.z_Value": value || noSelValue,
      "WT.z_sales_contact": value || noSelValue
    }
  };

  wtMultiTrack(params);
});

/* Tracking clicks on LiveChat button */
var wtTrackLivechatButtonClick = webtrendsGuard(function() {
  var params = {
    args: {
      "DCS.dcsuri": location.href,
      "WT.dl": "99",
      "WT.z_toolname": "Livechat Button Click",
      "WT.z_Value": "Livechat Button Click",
      "WT.z_livechat_btn": "1"
    }
  };

  wtMultiTrack(params);
});

/* Tracking for wish list */
var wtTrackWishlist = webtrendsGuard(function() {
  var params = {
    args: {
      "DCS.dcsuri": location.href,
      "WT.dl": "99",
      "WT.z_toolname": "Wish List",
      "WT.z_Value": "Wish List",
      "WT.z_send_wishlist": "1"
    }
  };

  wtMultiTrack(params);
});

/* Tracking for RFQ */
var wtTrackRFQ = webtrendsGuard(function() {
  var params = {
    args: {
      "DCS.dcsuri": location.href,
      "WT.dl": "99",
      "WT.z_toolname": "Request a Quote",
      "WT.z_Value": "Request a Quote",
      "WT.z_send_rfq": "1"
    }
  };

  wtMultiTrack(params);
});

/**
 *
 * ET
 *
 */

var getFilename = function(url) {
  var urlParts = url.split("#")[0].split("/");
  var fileName = urlParts.pop();

  if (fileName.match(/^$|.htm(l?)$/)) {
    return urlParts.pop();
  } else {
    return fileName;
  }
};

var getFileExtension = function(url) {
  var fileName = getFilename(url);
  return fileName ? fileName.split(".").pop() : null;
};

var getAbsPath = function(path) {
  var absPath =
    path.indexOf("/") === 0 || path.indexOf("http") === 0
      ? path
      : location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1) +
        path;
  return absPath;
};

var TrackingCategories = {
  UNDEFINED: ["UNDEFINED"],
  PRODUCTSELECTOR: ["PRODUCTSELECTOR"],
  SIMPLEDOWNLOAD: [
    "SIMPLEDOWNLOAD",
    "BROCHURES",
    "FLYER",
    "E_BOOK",
    "QUESTIONNAIRES",
    "SOFTWARE",
    "TECHNICAL_INFORMATION",
    "CERTIFICATES",
    "DECLARATIONS",
    "PROJECTDOCUMENTS"
  ],
  DOWNLOAD: [
    "DOWNLOAD",
    "DATASHEETS",
    "OPERATING_INSTRUCTIONS",
    "3D_DATA",
    "QUICKORDER_SHEETS"
  ],
  APPROVAL: ["APPROVALS"],
  PRODUCTRESULTSHANDLER: ["PRODUCTRESULTSHANDLER"],
  NEWS: ["NEWS", "TRADE_ARTICLE", "JOB_OFFER", "VIDEO", "BLOG", "EXHIBITION"],
  TOONLINESHOP: ["TOONLINESHOP"],
  SALESBOXCLICK: ["SALESBOXCLICK"],
  LIVECHATBUTTONCLICK: ["LIVECHATBUTTONCLICK"],
  WISHLIST: ["WISHLIST"],
  TRACKRFQ: [] // "TRACKRFQ"
};

var TrackingCategoriesMapping = {
  Brochure: ["BROCHURES", "FLYER"],
  Certification: ["CERTIFICATES"],
  DeclarationDoc: ["DECLARATIONS"],
  "E-book": ["E_BOOK"],
  "Project Document": ["PROJECTDOCUMENTS"],
  Questionnaire: ["QUESTIONNAIRES"],
  Software: ["SOFTWARE"],
  "Technical information": ["TECHNICAL_INFORMATION"],
  "3D Data": ["3D_DATA"],
  "Data sheets": ["DATASHEETS"],
  "Operating instructions": ["OPERATING_INSTRUCTIONS"],
  "Quick order sheet": ["QUICKORDER_SHEETS"],
  "News (Products)": ["NEWS_PRODUCTS"],
  "News (Company)": ["NEWS_COMPANY"],
  "News (Website)": ["NEWS_WEBSITE"],
  "Trade Article": ["TRADE_ARTICLE"],
  "Job Offer": ["JOB_OFFER"],
  Video: ["VIDEO"],
  Blog: ["BLOG"],
  Exhibition: ["EXHIBITION"]
};

function mapTrackingCategories(subCategory) {
  const categoryKeys = Object.keys(TrackingCategoriesMapping);
  for (var i = 0; i < categoryKeys.length; i++) {
    if (
      TrackingCategoriesMapping[categoryKeys[i]].indexOf(
        subCategory.toUpperCase()
      ) !== -1
    ) {
      return categoryKeys[i];
    }
  }
  console.debug("mapTrackingCategories: mapping not found for " + subCategory);
}

window.wtTrackingCategories = TrackingCategories;

var Track = function(filter, params) {
  var category = filter.cat && filter.cat.toUpperCase();

  console.debug(category, params);

  try {
    if (category) {
      if (TrackingCategories.UNDEFINED.indexOf(category) !== -1) {
        // fallback if category is not set
        wtSimpleTrackDownload(
          params.filename,
          mapTrackingCategories(category),
          params.description
        );
        window.dataLayer.push({
          event: 'trackSimpleDownload',
          documentType: mapTrackingCategories(category),
          description: params.description,
          file: getFilename(params.filename),
          fileExtension: getFileExtension(params.filename)
        });
      } else if (TrackingCategories.PRODUCTSELECTOR.indexOf(category) !== -1) {
        wtTrackProductSelector(
          params.selLevel1,
          params.selLevel2,
          params.selItem,
          params.selValue
        );
        window.dataLayer.push({
          event: 'trackProductSelector',
          category: params.selLevel1,
          subCategory: params.selLevel2,
          item: params.selItem,
          value: params.selValue
        });
      } else if (TrackingCategories.DOWNLOAD.indexOf(category) !== -1) {
        wtTrackDownload(
          params.cat,
          params.subcat,
          params.filename,
          mapTrackingCategories(category),
          params.description,
          params.issuenr || "Undefined"
        );
        var issuenr = params.issuenr || "Undefined"
        var filePrefix = issuenr !== "Undefined" ? issuenr + ":" : "";
        window.dataLayer.push({
          event: 'trackDownload',
          documentType: mapTrackingCategories(category),
          category: params.cat,
          subCategory: params.subcat,
          description: params.description,
          file: filePrefix + getFilename(params.filename),
          fileExtension: getFileExtension(params.filename)
        });
      } else if (TrackingCategories.SIMPLEDOWNLOAD.indexOf(category) !== -1) {
        wtSimpleTrackDownload(
          params.filename,
          mapTrackingCategories(category),
          params.description
        );
        window.dataLayer.push({
          event: 'trackSimpleDownload',
          documentType: mapTrackingCategories(category),
          description: params.description,
          file: getFilename(params.filename),
          fileExtension: getFileExtension(params.filename)
        });
      } else if (TrackingCategories.APPROVAL.indexOf(category) !== -1) {
        if(!params.certType){
          params.certType = 'undefined'
        }
        wtTrackApproval(params.certBody, params.certType, params.filename);
        window.dataLayer.push({
          event: 'trackApproval',
          certBody: params.certBody,
          certType: params.certType,
          certDoc: getFilename(params.filename),
          fileExtension: getFileExtension(params.filename)
        });
      } else if (
        TrackingCategories.PRODUCTRESULTSHANDLER.indexOf(category) !== -1
      ) {
        wtTrackProductResultsHandlerDownload(
          params.cat,
          params.subcat,
          params.filename,
          mapTrackingCategories(params.doctype),
          params.description,
          params.issuenr || "Undefined"
        );
        var issuenr = params.issuenr || "Undefined"
        var filePrefix = issuenr !== "Undefined" ? issuenr + ":" : "";
        window.dataLayer.push({
          event: 'trackProductResultsHandlerDownload',
          documentType: mapTrackingCategories(params.doctype),
          category: params.cat,
          subCategory: params.subcat,
          description: params.description,
          file: filePrefix + getFilename(params.filename),
          fileExtension: getFileExtension(params.filename)
        });
      } else if (TrackingCategories.NEWS.indexOf(category) !== -1) {
        wtTrackNews(
          mapTrackingCategories(
            ["TRADE_ARTICLE", "BLOG", "VIDEO", "EXHIBITION"].indexOf(category) !== -1 ? category : params.newstype
          ),
          params.description,
          params.type,
          params.filename
        );
        var article = params.filename;
        if (params.type === "PDF" || params.type === "DOC" || params.type === "DOCX" || params.type === "Image") {
          article = getFilename(article);
        } else {
          article = getAbsPath(article);
        }
        window.dataLayer.push({
          event: 'trackNews',
          newsType: mapTrackingCategories(
            ["TRADE_ARTICLE", "BLOG", "VIDEO", "EXHIBITION"].indexOf(category) !== -1 ? category : params.newstype
          ),
          description: params.description,
          newsFileType: params.type,
          article: article
        });
      } else if (TrackingCategories.TOONLINESHOP.indexOf(category) !== -1) {
        wtTrackToOnlineShop();
        window.dataLayer.push({
          event: 'trackAppActions',
          toolname: 'To Online Shop',
          value: 'To Online Shop'
        });
      } else if (TrackingCategories.SALESBOXCLICK.indexOf(category) !== -1) {
        wtTrackSalesBoxClick(params.inputIdent);
        window.dataLayer.push({
          event: 'trackAppActions',
          toolname: 'Sales Contact',
          value: params.inputIdent || 'No value available'
        });
      } else if (
        TrackingCategories.LIVECHATBUTTONCLICK.indexOf(category) !== -1
      ) {
        wtTrackLivechatButtonClick();
        window.dataLayer.push({
          event: 'trackAppActions',
          toolname: 'Livechat Button Click',
          value: 'Livechat Button Click'
        });
      } else if (TrackingCategories.WISHLIST.indexOf(category) !== -1) {
        wtTrackWishlist();
        window.dataLayer.push({
          event: 'trackAppActions',
          toolname: 'Wish List',
          value: 'Wish List'
        });
      } else if (TrackingCategories.TRACKRFQ.indexOf(category) !== -1) {
        wtTrackRFQ();
        window.dataLayer.push({
          event: 'trackAppActions',
          toolname: 'Request a Quote',
          value: 'Request a Quote'
        });
      } else {
        console.debug("wtTrack: category match not found");
      }
    } else {
      console.debug("wtTrack: no category defined");
      return;
    }
  } catch (ex) {
    console.error(ex);
  }
};

function getWtUrlParams() {
  var searchParams = window.location.search
    ? JSON.parse(
        '{"' +
          decodeURI(
            window.location.search
              .substring(1)
              .replace(/&/g, '","')
              .replace(/=/g, '":"')
          ) +
          '"}'
      )
    : {};

  Object.keys(searchParams).map(function(key) {
    if (key.indexOf("WT.") !== 0) {
      delete searchParams[key];
    }
  });

  return searchParams;
}

function AddMetaTag(key, content) {
  var oldMeta = document.querySelector('meta[name="' + key + '"]');
  if (oldMeta) {
    oldMeta.setAttribute("content", content);
  } else {
    var meta = document.createElement("meta");
    meta.name = key;
    meta.content = content;
    document.querySelector("body").appendChild(meta);
  }
}

var AdditionalWtParams = function(additionalParams) {
  var urlParams = getWtUrlParams();

  var productParams = {};
  if (window.isProduct) {
    productParams = {
      "WT.cg_n": urlParams["WT.cg_s"] ? "Industries" : "Products"
    };
  }

  var paramCollection = Object.assign(
    {},
    additionalParams,
    urlParams,
    productParams
  );

  Object.keys(paramCollection).forEach(function(key) {
    AddMetaTag(key, paramCollection[key]);
  });
};

function TrackPage(args) {
  var params = {
    args: args
  };

  window.dataLayer.push({
    event: 'trackSearch',
    oss: args['WT.oss'],
    oss_r: args['WT.oss_r'],
  });

  wtMultiTrack(params);
}

window.wtTrackPage = TrackPage;
window.wtAdditionalWtParams = AdditionalWtParams;
window.wtTrack = Track;
