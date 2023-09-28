var digitalData;
var buttonName;
var searchKey;
var rank;
var searchCount = 0;
var serviceName;
var geoCode;
var pageName = window.location.pathname;
var finalProducts = [];
var cardsCompare = [];
var cardCount = 0;
var maxCardCount = 3;
var documentTitle = document.title.split("|");
var getPath;
var finalStep = true;
var country = checkStr($("meta[name='page.country']").attr("content")) != "" ? checkStr($("meta[name='page.country']").attr("content")) : "sg";
var ccfxCount = 0;
var ccfxCountMax = 5;
var ccfxInitial = true;
var remitfxCountMax = 5;
var remitfxCount = 0;
var remitfxInitial = true;
var playedVideo = [];
var eventSet = false;

$(document).ready(function () {
  jQuery.fn.getPath = function () {
    if (this.length != 1) throw "Requires one element.";

    var path,
      node = this;
    while (node.length) {
      var realNode = node[0],
        name = realNode.localName;
      if (!name) break;

      name = name.toLowerCase();
      if (realNode.id) {
        // As soon as an id is found, there's no need to specify more.
        //return name + '#' + realNode.id + (path ? '>' + path : '');
        if (realNode.id.indexOf(" ") > -1 || realNode.id.indexOf(".") > -1) break;
        name += "#" + realNode.id.trim().split(/\s+/).join("#");
      } else if (realNode.className) {
        name += "." + realNode.className.trim().split(/\s+/).join(".");
      }
      name = name.split("..").join(".");
      var parent = node.parent(),
        siblings = parent.children(name);
      if (siblings.length > 1) name += ":eq(" + siblings.index(node) + ")";

      path = name + (path ? ">" + path : "");

      node = parent;
    }

    return path;
  };

  if (pageName.indexOf("searchresult.page") > -1 || pageName.indexOf("searchresults.page") > -1) {
    processSearchResult();
  }
  //digitalData.form.stepDetail=$('li.active').data('step');
  $("body").click(function (event) {
    if ($(event.target) != undefined) {
      buttonName = $($(event.target).getPath()).text();

      update_data_layer($(event.target).getPath(), buttonName, $(event.target));
    }

    // Apply Now and Buy Now
    if (digitalData != undefined) {
      if (digitalData.product != undefined) {
        if (digitalData.product.productInfo != undefined) {
          var productName = digitalData.product.productInfo.productName;
          if (checkStr($("meta[name='product.subCat1']").attr("content")) != undefined && checkStr($("meta[name='product.subCat1']").attr("content")) != "") {
            productName = checkStr(unescape($("meta[name='product.subCat1']").attr("content")));
            if ($(event.target).hasClass("btn btn-primary")) {
              if (productName != undefined && productName != "") {
                var text = $(event.target).text().toLowerCase();
                if (text.indexOf("apply now") > -1 || text.indexOf("buy now") > -1 || text.indexOf("立即申請") > -1) {
                  var productApplyURL = unescape($(event.target).attr("href"));
                  productApplyURL = productApplyURL.toLowerCase();
                  if (productName.indexOf(";") > 0) {
                    var finalProducts = productName.split(";");
                    for (var i = 0; i < finalProducts.length; i++) {
                      if (productApplyURL.indexOf(finalProducts[i]) > -1) {
                        dtmProductName = finalProducts[i];
                        digitalData.product.category.subCategory1 = checkStr(dtmProductName);

                        //pprimaryCat for spc-savings promotion "credit cards:debit cards"
                        primaryCategory = $("meta[name='product.primaryCat']").attr("content");
                        if (primaryCategory.indexOf(":") > 0) {
                          var finalPrimaryCat = primaryCategory.split(":");
                          for (var i = 0; i < finalPrimaryCat.length; i++) {
                            if (dtmProductName.indexOf(finalPrimaryCat[i]) > -1) {
                              pprimaryCat = finalPrimaryCat[i];
                              digitalData.product.category.primaryCategory = finalPrimaryCat[i];
                            }
                          }
                        }
                      }
                    }
                  }
                  if (dtmProductName.indexOf(":") > -1) {
                    //set value for multiple product
                    digitalData.product.productInfo.productName = checkStr(dtmProductName);
                    digitalData.product.category.subCategory1 = productName;
                  } else {
                    //set value for single product
                    digitalData.product.productInfo.productName = productType + ":" + pprimaryCat + ":" + checkStr(dtmProductName);
                  }
                  _satellite.track("pweb-apply buttonclick");
                }
              }
            }
          }
        }
      }
    }

    // Search result ranking tracking
    if (pageName.indexOf("searchresult.page") > -1 || pageName.indexOf("searchresults.page") > -1) {
      if ($(event.target).parent().parent().attr("class") == "search-info") {
        search_ranking($(event.target).attr("value"));
      }
    }

    //Card comparator addition, deletion and applyNow button
    if (window.location.pathname.search("cards-comparator.page") != -1) {
      var selectedCard = "";
      if ($(event.target).hasClass("cardContainer")) {
        var cardIndex = $(event.target).attr("data-card");
        applyNowURL = updatedData.cards_data.CardDetailsContainer.Cards[cardIndex].ApplyLinkUrl;
        applyNowURL = $("<div/>").html(decodeURIComponent(applyNowURL)).text();
        var cardName = getCardName(applyNowURL);
        card_comparator_cardList(cardName);
      } else if ($(event.target).parents(".cardContainer").length > 0) {
        var cardIndex = $(event.target).parents(".cardContainer").attr("data-card");
        applyNowURL = updatedData.cards_data.CardDetailsContainer.Cards[cardIndex].ApplyLinkUrl;
        applyNowURL = $("<div/>").html(decodeURIComponent(applyNowURL)).text();
        var cardName = getCardName(applyNowURL);
        card_comparator_cardList(cardName);
      } else if ($(event.target).hasClass("cardResultDeleteIcon")) {
        applyNowURL = $(event.target).parent().siblings(".applyNowBtnDiv").find("a").attr("href");
        var cardName = getCardName(applyNowURL);
        card_comparator_cardList(cardName);
      } else if ($(event.target).hasClass("applyNowBtn")) {
        applyNowURL = $(event.target).attr("href");
        var cardName = getCardName(applyNowURL);
        card_comparator_apply(cardName);
      } else if ($(event.target).attr("id") == "cardCompareBtn") {
        card_comparator();
      }
    }
    if (window.location.pathname.search("/investing-in-funds/default.page") != -1) {
      $(".ut-select select").off("change", handleUTSelect);
      $(".ut-select select").on("change", handleUTSelect);
    }
    // Calculator pages
    if (country == undefined) {
      country = digitalData.page.pageInfo.country;
    }
    if (country == "sg") {
      if (
        pageName.search("calculators/foreigncurrency_calc.page") != -1 ||
        pageName.search("calculators/mysavingscalculator.page") != -1 ||
        pageName.search("calculators/homeloans-calculators-repayment-schedule.page") != -1 ||
        pageName.search("calculators/homeloans-calculators-renovation-loans.page") != -1 ||
        pageName.search("calculators/retirement-calculator.page") != -1 ||
        pageName.search("calculators/insurance-myeduplan.page") != -1
      ) {
        if ($(event.target).attr("id").indexOf("btnCalculate") > -1 || $(event.target).text() == "Calculate") {
          clickCalculate();
        }
      }
    }
  });

  /**
			Entries for UT Fund search AA tagging 
			**/
  $(".ut-select select").on("change", handleUTSelect);

  //Login top nav
  $('.header-navigation a[href*="https://internet-banking.dbs.com.sg"], .navbar-header a[href*="https://internet-banking.dbs.com.sg"]').on("click", function () {
    digitalData["button"] = {
      name: "topnav:" + $(this).text(),
    };
    setTimeout(function () {
      _satellite.track("pweb-login button");
    }, 500);
    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  });

  $('.tbl-primary p a[href*="https://internet-banking.dbs.com.sg?pid=sg-dbs-pweb-insure-insurance-travelleshield-plus-textlogin-tsp-ib-login"]').on("click", function (event) {
    digitalData["button"] = {
      name: "TSP iB login",
    };
    setTimeout(function () {
      _satellite.track("pweb-generic button");
    }, 500);
    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  });

  $('.tbl-primary p a[href*="https://internet-banking.dbs.com.sg/iwealth"]').on("click", function (event) {
    digitalData["button"] = {
      name: "TSP iB login",
    };
    setTimeout(function () {
      _satellite.track("pweb-generic button");
    }, 500);
    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  });

  //Business segment
  $(".navbar-list dd a, .last-menu li a").on("click", function (event) {
    digitalData["button"] = {
      name: "topnav:" + $(this).text(),
    };
    setTimeout(function () {
      _satellite.track("pweb-generic button");
    }, 500);
    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  });
  //Country selection
  $(".country-list li a").on("click", function (event) {
    digitalData["button"] = {
      name: "footer:" + $(this).text(),
    };
    setTimeout(function () {
      _satellite.track("pweb-generic button");
    }, 500);
    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  });
  //Footer social media
  $(".footer-social-box ul li a").on("click", function (event) {
    socialIconClick($(this).find("span").attr("class"));
  });
  //Detail page social media
  $(".social-share-box a").on("click", function () {
    addThisSocialIconClick($(this).attr("class"));
  });

  $(".converter-box .Buying input, .converter-box .Selling input").on("change", initccfxProcess);
  $(".converter-box .Buying .btn-group ul.dropdown-menu li a,.converter-box .Selling .btn-group ul.dropdown-menu li a").on("click", ccfxProcess);
  $("#remitCalcRecvAmt, #remitCalcSendingAmt").on("change", initremitfxHandle);
  $("#remitCalcCountry, #remitCalcSourceSelect, #remitCalcDestSelect").on("change", remitfxProcess);

  /**
           Five start survey Submit AA tagging Start
           **/
  $(document).on("submitSurvey", function (e, id) {
    if (typeof dtmPageName != "undefined") {
      digitalData["survey"] = {
        pagename: dtmPageName + ":5 star survey",
        id: id,
      };

      if (typeof _satellite != "undefined") {
        _satellite.track("pweb-survey tracking");
      } else {
        console.log("_satellite not found");
      }
    }
  });

  $(document).on("connectedWithLiveAgent", function () {
    digitalData["button"] = { name: "Call to agent click" };
    if (typeof _satellite != "undefined") {
      _satellite.track("pweb-survey-clicks-to-agent");
    } else {
      console.log("_satellite not found");
    }
  });

  /**
           Five start survey Submit AA tagging Ends
           **/
});

/**
		Check for undefined/null and return empty
		**/
function checkStr(val) {
  return val === undefined || val == null || val.length <= 0 ? "" : trimStr(val);
}
function processSearchResult() {
  if ($("#search-result-count").text()) {
    var numberPattern = /\d+/g;
    var totalNumber = $("#search-result-count").text().match(numberPattern);
    searchCount = totalNumber[2];
  }
  searchKey = $(".s-searchbox").val();
  if (searchKey == "" || searchKey == undefined) {
    var queryStr = window.location.search.substring(1);
    var queryStrArr = queryStr.split("=");
    searchKey = queryStrArr[1] != undefined ? queryStrArr[1] : "";
  }
  if (searchKey != "" && searchKey != undefined) {
    console.log("1-->" + searchKey);
    rank = $(".search-info a").attr("value");
    console.log("2-->" + searchCount);
    digitalData["internalSearch"] = {
      keyword: searchKey,
      results: searchCount,
    };
    "console" in window && console.log("DTM console log :::: Internal Search ::: " + digitalData.internalSearch.keyword);
    "console" in window && console.log("DTM console log :::: Internal Search ::: " + digitalData.internalSearch.results);
  }
}

function handleUTSelect() {
  console.log("clicked"); //Search
  postAASearch();
}
function search_ranking(rank) {
  var queryStr = window.location.search.substring(1);
  var queryStrArr = queryStr.split("=");
  var searchKey = queryStrArr[1] != undefined ? queryStrArr[1] : "";
  if (searchKey != "") {
    digitalData["internalSearch"] = {
      keyword: searchKey,
      rank: rank,
    };
    setTimeout(function () {
      _satellite.track("pweb-search result rank");
    }, 500);
    "console" in window && console.log("DTM console log :::: Internal Search ::: " + digitalData.internalSearch.keyword);
    "console" in window && console.log("DTM console log :::: Internal Search ::: " + digitalData.internalSearch.rank);
  }
}
function update_data_layer(eventPath, category, event) {
  //Page Level Analytics Start

  //Search changes
  if (eventPath.indexOf("btnMainSearch") > -1) {
    console.log("1-->" + $(eventPath).text());
    if ($(".m-searchbox").val() != "") {
      digitalData["button"] = {
        name: "topnav:search button",
      };
      setTimeout(function () {
        _satellite.track("pweb-generic button");
      }, 500);
      "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
    }
  }
  if (eventPath.indexOf("btnMainMobSearch") > -1) {
    console.log("1-->" + $(eventPath).text());
    if ($(".mm-searchbox").val() != "") {
      digitalData["button"] = {
        name: "topnav:search button",
      };
      setTimeout(function () {
        _satellite.track("pweb-generic button");
      }, 500);
      "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
    }
  }

  //Page Level Analytics End

  // Offer tracking
  if (event.attr("id") === "lifestyleAllCat" || event.attr("id") === "lifestyleAllSubCat" || event.attr("id") === "lifestyleAllCards") {
    offerFiltering($("#lifestyleAllCat").find(":selected").text(), $("#lifestyleAllSubCat").find(":selected").text(), $("#lifestyleAllCards").find(":selected").text(), "");
  } else if (event.parents("#btnMobSearchLifeStyle").length > 0 || event.attr("id") === "btnMobSearchLifeStyle") {
    var searchVal = event.parents(".search-box").find("input").val();
    if (searchVal != "") {
      offerFiltering("All Categories", "All Sub-categories", "All Cards", searchVal);
    }
  } else if (event.attr("id") === "btnMobApplyFilter") {
    offerFiltering(
      $("#mobLifestyleAllCat").find(":selected").text(),
      $("#mobLifestyleAllSubCat").find(":selected").text(),
      $("#mobLifestyleAllCards").find(":selected").text(),
      ""
    );
  } else if (event.parents("#btnSearchLifeStyle").length > 0 || event.attr("id") === "btnSearchLifeStyle") {
    var searchVal = event.parents(".search-boxslide").find("input").val();
    if (searchVal != "") {
      offerFiltering("All Categories", "All Sub-categories", "All Cards", searchVal);
    }
  }

  // UT Fund Search
  if (eventPath.indexOf("#utListBody>li") > -1) {
    postAAOpenDetailsPanel(category);
  }
  if (eventPath.indexOf("a.ut-detail-btn.buy-now") > -1) {
    postAAClickOnBuyNow(category);
  }
  if (eventPath.indexOf("a.ut-detail-btn.contact-me") > -1) {
    postAAOnContactMe(category);
  }
  //Mobile help icon
  if (event.hasClass("ico-help2") || event.find(".icon.ico-help2").length > 0) {
    digitalData["button"] = {
      name: "mobile:search icon",
    };
    _satellite.track("pweb-generic button");
  }

  //Country Splitter and Header dropdown tracking
  if (eventPath.indexOf("ul.dropdown-menu") > -1) {
    console.log("1-->" + $(csspath).text());
    digitalData["button"] = {
      name: "splitter:" + buttonName,
    };
    setTimeout(function () {
      _satellite.track("pweb-generic button");
    }, 500);
    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  }

  if (eventPath.indexOf("downloadLink") > -1 || eventPath.indexOf("downloadpdf") > -1) {
    "console" in window && console.log("Download link clicked");
    var url = window.location.href.split("/");
    var article = url[url.length - 1];
    article = article.substring(0, article.indexOf(".xml"));
    digitalData["button"] = {
      name: article + "_pdf_clicked",
    };
    setTimeout(function () {
      _satellite.track("pweb-generic button");
    }, 500);
    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  }
}
function offerFiltering(category, subcategory, card, searchVal) {
  digitalData["offer"] = {
    filter: category + ":" + subcategory + ":" + card + ":" + searchVal,
  };
  setTimeout(function () {
    _satellite.track("pweb-offer filter");
  }, 500);
  "console" in window && console.log("DTM console log :::: Offer Filter ::: " + digitalData.offer.filter);
}
function card_comparator_apply(selectedCard) {
  digitalData["product"] = {
    category: {
      productType: "cards",
      primaryCategory: "credit cards",
      subCategory1: "",
    },
    productInfo: {
      productName: "",
    },
  };
  var productName = selectedCard;
  if (productName != undefined && productName != "") {
    if ($.inArray(productName, cardsCompare) > -1) {
      dtmProductName = cardsCompare[$.inArray(productName, cardsCompare)];
      digitalData.product.category.subCategory1 = checkStr(dtmProductName);
    }
    digitalData.product.productInfo.productName = "cards" + ":" + "credit cards" + ":" + checkStr(dtmProductName);
    _satellite.track("pweb-apply buttonclick");
  }
}
function card_comparator_cardList(selectedCard) {
  var addCardName = "";
  var deleteCardName = "";
  if (cardsCompare != undefined && $.inArray(selectedCard, cardsCompare) > -1) {
    deleteCardName = selectedCard;
  } else {
    addCardName = selectedCard;
  }
  if (addCardName != undefined && addCardName != "") {
    if (cardCount < maxCardCount) {
      cardsCompare.push(addCardName);
      cardCount = cardCount + 1;
    } else {
      cardsCompare.splice(0, 1);
      cardsCompare.push(addCardName);
    }
  }
  if (deleteCardName != undefined && deleteCardName != "") {
    deleteCardName = deleteCardName.trim();
    var index = cardsCompare.indexOf(deleteCardName);
    cardsCompare.splice(index, 1);
    cardCount = cardCount - 1;
  }
}
function card_comparator(selectedCard) {
  digitalData["product"] = {
    category: {
      productType: "cards",
      primaryCategory: "credit cards",
    },
  };
  var values = [];
  for (var i = 0; i < cardsCompare.length; i++) {
    var item = {
      product: {
        category: {
          subCategory1: "cards:credit cards:" + cardsCompare[i],
        },
      },
    };
    values.push(item);
  }
  digitalData["item"] = values;
  digitalData["cardinteraction"] = {
    name: "compare add[" + cardCount + "]",
  };
  if ($(event.target).hasClass("cardResultDeleteIcon")) {
    setTimeout(function () {
      _satellite.track("pweb-card-comparison-btn-minus");
    }, 500);
  } else {
    setTimeout(function () {
      _satellite.track("pweb-card compare click");
    }, 500);
  }
}
function getCardName(URL) {
  //Process Applynow url to get parameter
  $.urlParam = function (name) {
    var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(URL);
    return results[1] || 0;
  };

  return $.urlParam("cardName") == null ? "" : $.urlParam("cardName");
}

function addThisSocialIconClick(path) {
  if (path.indexOf("facebook") > -1) {
    console.log("1-->" + path);
    digitalData["button"] = {
      name: "social share:facebook",
    };
    setTimeout(function () {
      _satellite.track("pweb-generic button");
    }, 500);
    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  }
  if (path.indexOf("twitter") > -1) {
    console.log("1-->" + path);
    digitalData["button"] = {
      name: "social share:twitter",
    };
    setTimeout(function () {
      _satellite.track("pweb-generic button");
    }, 500);
    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  }
  if (path.indexOf("youtube") > -1) {
    console.log("1-->" + path);
    digitalData["button"] = {
      name: "social share:youtube",
    };
    setTimeout(function () {
      _satellite.track("pweb-generic button");
    }, 500);
    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  }
  if (path.indexOf("linkedin") > -1) {
    console.log("1-->" + path);
    digitalData["button"] = {
      name: "social share:linkedin",
    };
    setTimeout(function () {
      _satellite.track("pweb-generic button");
    }, 500);
    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  }
  if (path.indexOf("whatsapp") > -1) {
    console.log("1-->" + path);
    digitalData["button"] = {
      name: "social share:whatsapp",
    };
    setTimeout(function () {
      _satellite.track("pweb-generic button");
    }, 500);
    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  }
  if (path.indexOf("email") > -1) {
    console.log("1-->" + path);
    digitalData["button"] = {
      name: "social share:email",
    };
    setTimeout(function () {
      _satellite.track("pweb-generic button");
    }, 500);
    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  }
}
function socialIconClick(path) {
  if (path.indexOf("facebook") > -1) {
    console.log("1-->" + path);
    digitalData["button"] = {
      name: "footer:social share:facebook",
    };
    setTimeout(function () {
      _satellite.track("pweb-generic button");
    }, 500);
    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  }
  if (path.indexOf("twitter") > -1) {
    console.log("1-->" + path);
    digitalData["button"] = {
      name: "footer:social share:twitter",
    };
    setTimeout(function () {
      _satellite.track("pweb-generic button");
    }, 500);
    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  }
  if (path.indexOf("youtube") > -1) {
    console.log("1-->" + path);
    digitalData["button"] = {
      name: "footer:social share:youtube",
    };
    setTimeout(function () {
      _satellite.track("pweb-generic button");
    }, 500);
    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  }
  if (path.indexOf("linkedin") > -1) {
    console.log("1-->" + path);
    digitalData["button"] = {
      name: "footer:social share:linkedin",
    };
    setTimeout(function () {
      _satellite.track("pweb-generic button");
    }, 500);
    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  }
}

/**
		Entries for UT Fund search AA tagging Starts
		**/
var getSearchParams = function () {
  var fundHouse = $("#fundHouse").val() == "All Fund Houses" ? "ALL" : $("#fundHouse").val();
  var investCategory = $("#investCategory").val() == "All Investment Categories" ? "ALL" : $("#investCategory").val();
  var region = $("#region").val() == "All Regions" ? "ALL" : $("#region").val();
  var riskProfile = $("#riskProfile").val() == "All Risk Profiles" ? "ALL" : $("#riskProfile").val();
  var currency = $("#currency").val() == "All Currencies" ? "ALL" : $("#currency").val();
  var investMedium = $("#investMedium").val() == "All Investment Mediums" ? "ALL" : $("#investMedium").val();

  //return {fundHouse, investCategory, region, riskProfile, currency, investMedium};
  return { fundHouse: fundHouse, investCategory: investCategory, region: region, riskProfile: riskProfile, currency: currency, investMedium: investMedium };
};

var postAASearch = function () {
  var params = getSearchParams();
  var search = "[fh:fhValue|invcat:invcatValue|rg:rgValue|rsp:rspValue|cur:curValue|invmed:invmedValue]";
  search = search.replace("fhValue", params.fundHouse);
  search = search.replace("invcatValue", params.investCategory);
  search = search.replace("rgValue", params.region);
  search = search.replace("rspValue", params.riskProfile);
  search = search.replace("curValue", params.currency);
  search = search.replace("invmedValue", params.investMedium);
  setTimeout(function () {
    var legend = $("#legend").text();
    if (digitalData != undefined) {
      digitalData.search = {
        filter: search,
        results: parseInt(legend),
      };
      console.log(digitalData);
      if (typeof _satellite != "undefined") {
        _satellite.track("ut-internal search filter");
      } else {
        console.log("_satellite not found");
      }
    }
  }, 100);
};

var postAAOpenDetailsPanel = function (fund) {
  if (digitalData != undefined) {
    digitalData.product = {
      category: {
        productType: "investment", //based on the product type
        primaryCategory: "unit-trust", //category of the product
        subCategory1: fund, //name of the product
      },
    };
    var prodName = digitalData.product.category.productType + ":" + digitalData.product.category.primaryCategory + ":" + fund;
    digitalData.product.productInfo = {
      productName: prodName,
    };
  }
  if (typeof _satellite != "undefined") {
    _satellite.track("ut-pdp overlay");
  } else {
    console.log("_satellite not found");
  }
};

var postAAClickOnBuyNow = function (fund) {
  //var buttonName = "[fund name-buy now]";
  //buttonName = buttonName.replace("fund name", fund,fundName);
  if (digitalData != undefined) {
    digitalData.product = {
      category: {
        productType: "investment", //based on the product type
        primaryCategory: "unit-trust", //category of the product
        subCategory1: fund, //name of the product
      },
    };
    var prodName = digitalData.product.category.productType + ":" + digitalData.product.category.primaryCategory + ":" + fund;
    digitalData.product.productInfo = {
      productName: prodName,
    };
    digitalData.button = {
      name: "buy now", //name of the button clicked
    };
  }
  if (typeof _satellite != "undefined") {
    _satellite.track("ut-buy now btn");
  } else {
    console.log("_satellite not found");
  }
};

var postAAOnContactMe = function (name) {
  digitalData = {
    button: {
      name: name,
    },
  };
  if (typeof _satellite != "undefined") {
    _satellite.track("ut-contact us");
  } else {
    console.log("_satellite not found");
  }
};

/**
		Entries for UT Fund search AA tagging Ends
		**/

function ccfxProcess() {
  if (ccfxInitial == false) {
    var buyingCurr = $(".converter-box .Buying .lbl-group span").text();
    var sellingCurr = $(".converter-box .Selling .lbl-group span").text();
    digitalData = {
      button: {
        name: buyingCurr + "-" + sellingCurr,
      },
    };
    _satellite.track("pweb-generic button");

    ccfxCount++;
  }
}
function initccfxProcess() {
  if (ccfxInitial == true) {
    if (ccfxCount < ccfxCountMax) {
      var sellingAmount = $(".converter-box .Selling input").val().trim();
      var buyingAmount = $(".converter-box .Buying input").val().trim();
      if (sellingAmount != "" && buyingAmount != "") {
        ccfxInitial = false;
        ccfxProcess();
      }
    }
  }
}
function initremitfxHandle() {
  if (remitfxInitial == true) {
    if (remitfxCount < remitfxCountMax) {
      var receiveAmount = $("#remitCalcRecvAmt").val();
      var sendingAmount = $("#remitCalcSendingAmt").val();
      if (sendingAmount != "" && receiveAmount != "") {
        remitfxInitial = false;
        remitfxProcess();
      }
    }
  }
}
function remitfxProcess() {
  if (remitfxInitial == false) {
    var country = $("#remitCalcCountry option:selected").text();
    var source = $("#remitCalcSourceSelect option:selected").val();
    var dest = $("#remitCalcDestSelect option:selected").val();
    digitalData = {
      button: {
        name: country + "-" + source + "-" + dest,
      },
    };
    _satellite.track("pweb-generic button");
    remitfxCount++;
  }
}
function clickCalculate() {
  digitalData["button"] = {
    name: country + ":" + language + ":" + documentTitle[0],
  };
  setTimeout(function () {
    _satellite.track("pweb-calculator click");
  }, 500);
  "console" in window && console.log("DTM console log :::: calculator ::: " + digitalData.button.name);
}

$(document).ready(function () {
  $("a[href]:not(a[href='#']):not(a[data-ajax]):not(.button-wrapper):not(.btn)").on("click", function (e) {
    if ($(event.target)[0].className.indexOf("ico-") > 0) {
      btnName = $.trim($(event.target).parents("a").text());
      callBtnClick(btnName);
    }

    if ($(event.target)[0].children[0] != undefined && $(event.target)[0].children[0].className.indexOf("ico-") > 0) {
      btnName = $.trim($($(event.target).getPath()).text());
      callBtnClick(btnName);
    }
  });

  $("a[href]:not(a[href^='#']):not(a[data-ajax]):not(a[data-toggle]):not(.button-wrapper)").on("click", function (e) {
    let btnName;
    if (e.target.dataset.name) {
      btnName = e.target.text + " " + e.target.dataset.name;
    } else {
      btnName = e.target.text;
    }

    digitalData = {
      button: {
        name: btnName,
      },
    };

    if (e.target.text.includes("Apply now")) {
      return _satellite.track("pweb-apply buttonclick");
    }

    _satellite.track("pweb-generic button");

    "console" in window && console.log("DTM console log :::: Button Click :::", digitalData.button.name);
  });

  function callBtnClick(btnName) {
    digitalData = {
      button: {
        name: btnName,
      },
    };

    _satellite.track("pweb-generic button");

    "console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name);
  }
});

//
// OPTIONAL: Enable JSAPI if it's not already on the URL
// note: this will cause the Youtube player to "flash" on the page when reloading to enable the JS API
for (var e = document.getElementsByTagName("iframe"), x = e.length; x--; )
  if (/youtube.com\/embed/.test(e[x].src)) if (e[x].src.indexOf("enablejsapi=") === -1) e[x].src += (e[x].src.indexOf("?") === -1 ? "?" : "&") + "enablejsapi=1";

var YTListeners = []; // support multiple players on the same page
// attach our YT listener once the API is loaded
function onYouTubeIframeAPIReady() {
  console.log("youtube api ready");
  for (var e = document.getElementsByTagName("iframe"), x = e.length; x--; ) {
    if (/youtube.com\/embed/.test(e[x].src)) {
      YTListeners.push(
        new YT.Player(e[x], {
          events: {
            onStateChange: onPlayerStateChange,
            onError: onPlayerError,
          },
        })
      );
      YT.LastAction = "p";
      eventSet = true;
    }
  }
}

// listen for play/pause, other states such as rewind and end could also be added
// also report % played every second
function onPlayerStateChange(e) {
  //console.log("youtube state change >>")
  e["data"] == YT.PlayerState.PLAYING;
  var video_data = e.target["getVideoData"](),
    label = video_data.video_id + ":" + video_data.title,
    url = window.location.protocol + "//www.youtube.com/embed/" + video_data.video_id;
  if (e["data"] == YT.PlayerState.PLAYING && YT.LastAction == "p") {
    console.log("youtube state change  ==> play >> " + url);
    var index = $.inArray(url, playedVideo);
    if (index == -1) {
      playedVideo.push(url);
      digitalData = {
        button: {
          name: "video_" + url, //Name of the video clicked
        },
      };
      _satellite.track("pweb-generic button");
    }
    YT.LastAction = "";
  }
  if (e["data"] == YT.PlayerState.PAUSED) {
    console.log("youtube state change ==> pause >> " + url);
    YT.LastAction = "p";
  }
}

function onPlayerError(e) {
  //console.log("Error")
}

// load the Youtube JS api and get going
var j = document.createElement("script"),
  f = document.getElementsByTagName("script")[0];
j.src = "/iwov-resources/flp/scripts/yt/iframe_api.js";
j.async = true;
f.parentNode.insertBefore(j, f);
