var step1Selected = "";
var step2Selected = "";
function AddBodyClass(cls) {
  $("body").removeClass("tab-1");
  $("body").removeClass("tab-2");
  $("body").removeClass("tab-3");
  $("body").addClass(cls);
}
function AddBodyProduct(type) {
  $("body").removeClass("simple");
  $("body").removeClass("plus");
  $("body").removeClass("advanced");
  switch (type) {
    case "Simple Start":
      $("body").addClass("simple");
      break;
    case "Plus":
      $("body").addClass("plus");
      break;
    case "Advanced":
      $("body").addClass("advanced");
      break;
  }
}
function AddBodyPayroll(type) {
  $("body").removeClass("core");
  $("body").removeClass("premium");
  $("body").removeClass("elite");
  $("body").removeClass("no-payroll");
  switch (type) {
    case "Core":
      $("body").addClass("core");
      break;
    case "Premium":
      $("body").addClass("premium");
      break;
    case "Elite":
      $("body").addClass("elite");
      break;
    default:
      $("body").addClass("no-payroll");
      break;
  }
}
function clearAllSelection() {
  step1Selected = "";
  $("#update_plan_txt").html("");
  step2Selected = "";
  $("#update_add_ons_txt").html("");
  $("#k_plan img").hide();
  $("#step-selected-banner").hide();
  $("#step-continue").show();
  $("#step-checkout").hide();
  $(".ctab").removeClass("selected");
  $(".ctab.tab-1").addClass("selected");
  AddBodyClass("tab-1");
  $(".qblive-new-section").show();
  $("div[id=FullServicePayrollSection]:eq(1)").hide();
  $(".price-disc-link").show();
  $("#pc-content-container-3").hide();
}
function showStep0Items() {
  $("#pricecardrowcontent").show();
  $("#FullServicePayrollSection").hide();
  $("#step-continue").show();
  $("#step-checkout").hide();
  $(".ctab").removeClass("selected");
  $(".ctab.tab-1").addClass("selected");
  AddBodyClass("tab-1");
  $(".qblive-new-section").show();
  $("div[id=FullServicePayrollSection]:eq(1)").hide();
  $(".price-disc-link").show();
  $(".linkButtonSec").css("visibility", "hidden");
  $("#pc-content-container-3").hide();
  if (step2Selected == "") {
    $(".pencilTwo").hide();
  } else {
    $(".pencilTwo").show();
  }
  ScrollToSticky();
}
function intializeStep() {
  clearAllSelection();
  $("#pricecardrowcontent").show();
  $("#FullServicePayrollSection").hide();
  $("#pc-content-container-3").hide();
}
function Step1(type) {
  step1Selected = type;
  AddBodyProduct(type);
  $("#update_plan_txt").html("QuickBooks " + type);
  showStep1Items();
}
function showStep1Items() {
  $("#step-selected-banner").show();
  $("#pricecardrowcontent").hide();
  $("#FullServicePayrollSection").show();
  $("#pc-content-container-3").hide();
  $("#step-continue").show();
  $("#step-checkout").hide();
  $(".ctab").removeClass("selected");
  $(".ctab.tab-2").addClass("selected");
  AddBodyClass("tab-2");
  $(".qblive-new-section").show();
  $("div[id=FullServicePayrollSection]:eq(1)").show();
  $(".linkButtonSec").css("visibility", "visible");
  if (step2Selected == "") {
    $(".pencilTwo").hide();
  } else {
    $(".pencilTwo").show();
  }
  ScrollToSticky();
}
function Step2(type) {
  step2Selected = type;
  AddBodyPayroll(type);
  showStep2Items();
  LoadCheckout();
  CreateURL();
  if (type == "") {
    $("#update_add_ons_txt").html(" ");
    $("#k_plan img").hide();
  } else {
    $("#update_add_ons_txt").html("Payroll " + type);
    $("#k_plan img").show();
  }
}
function showStep2Items() {
  $("#step-selected-banner").show();
  $("#pricecardrowcontent").hide();
  $("#FullServicePayrollSection").hide();
  $("#pc-content-container-3").show();
  $("#step-continue").hide();
  $("#step-checkout").show();
  $(".ctab").removeClass("selected");
  $(".ctab.tab-3").addClass("selected");
  AddBodyClass("tab-3");
  $(".qblive-new-section").hide();
  $("div[id=FullServicePayrollSection]:eq(1)").hide();
  $(".price-disc-link").show();
  if (step2Selected == "") {
    $("#k_plan img").hide();
  } else {
    $("#k_plan img").show();
  }
  ScrollToSticky();
}
function update_plan(type) {
  if (type == 1) {
    showStep0Items();
  } else if (type == 2) {
    Step1(step1Selected);
  }
}
function concatenateIfNotEmpty(a, b) {
  if (b) {
    return a + "." + b;
  } else {
    return a;
  }
}
function getPrice() {
  var t, s, r = '';
  if (document.getElementById("dis-price-dollar-8715")) {
    t = document.getElementById("dis-price-dollar-8715").innerHTML;
  }
  if (document.getElementById("dis-price-cents-8715")) {
    s = document.getElementById("dis-price-cents-8715").innerHTML;
  }
  if (document.getElementById("reg-price-dollar-8715")) {
    r = document.getElementById("reg-price-dollar-8715").innerHTML;
  }
  return {
    "Simple Start": {
      "price": concatenateIfNotEmpty(document.getElementById("dis-price-dollar-6564").innerHTML, document.getElementById("dis-price-cents-6564").innerHTML),
      "org": document.getElementById("reg-price-dollar-6564").innerHTML
    },
    "Essentials": {
      "price": concatenateIfNotEmpty(t, s),
      "org": r
    },
    "Plus": {
      "price": concatenateIfNotEmpty(document.getElementById("dis-price-dollar-8113").innerHTML, document.getElementById("dis-price-cents-8113").innerHTML),
      "org": document.getElementById("reg-price-dollar-8113").innerHTML
    },
    "Advanced": {
      "price": concatenateIfNotEmpty(document.getElementById("dis-price-dollar-9252").innerHTML, document.getElementById("dis-price-cents-9252").innerHTML),
      "org": document.getElementById("reg-price-dollar-9252").innerHTML
    }
  };
}
function getPayroll() {
  return {
    "Core": {
      "price": concatenateIfNotEmpty(document.getElementById("dis-price-dollar-6930").innerHTML, document.getElementById("dis-price-cents-6930").innerHTML),
      "org": document.getElementById("reg-price-dollar-6930").innerHTML,
      "text": document.getElementById("offer-text-6930").innerHTML
    },
    "Premium": {
      "price": concatenateIfNotEmpty(document.getElementById("dis-price-dollar-9060").innerHTML, document.getElementById("dis-price-cents-9060").innerHTML),
      "org": document.getElementById("reg-price-dollar-9060").innerHTML,
      "text": document.getElementById("offer-text-9060").innerHTML
    },
    "Elite": {
      "price": concatenateIfNotEmpty(document.getElementById("dis-price-dollar-6485").innerHTML, document.getElementById("dis-price-cents-6485").innerHTML),
      "org": document.getElementById("reg-price-dollar-6485").innerHTML,
      "text": document.getElementById("offer-text-6485").innerHTML
    }
  };
}
function LoadCheckout() {
  var price = getPrice();
  var payroll = getPayroll();
  $("#right_plan_txt").html("QuickBooks " + step1Selected);
  $("#your_plan_actual_val").html("$" + price[step1Selected].org);
  $("#your_plan_final_val").html("$" + price[step1Selected].price + "/mo");
  if (step2Selected == "") {
    $(".your_add_ons.right_plan_txt").hide();
    $(".your_add_ons_value.right_business_txt").hide();
    $(".pyrl--text").hide();
    $(".total_value [id=your_add_ons_actual_val]").html("$" + price[step1Selected].org);
    $(".total_value [id=your_add_ons_final_val]").html("$" + price[step1Selected].price + "/mo");
    $(".total_value .your_add_ons_value.right_business_txt").show();
  } else {
    $(".your_add_ons.right_plan_txt").show();
    $(".your_add_ons_value.right_business_txt").show();
    $(".pyrl--text").show();
    $(".your_add_ons.right_plan_txt").html("Payroll " + step2Selected);
    $("#your_add_ons_actual_val").html("$" + payroll[step2Selected].org);
    $("#your_add_ons_final_val").html("$" + payroll[step2Selected].price + "/mo");
    $(".pyrl--text").html(payroll[step2Selected].text);
    $(".total_value [id=your_add_ons_actual_val]").html("$" + sumToDisplay(price[step1Selected].org, payroll[step2Selected].org));
    $(".total_value [id=your_add_ons_final_val]").html("$" + sumToDisplay(price[step1Selected].price, payroll[step2Selected].price) + "/mo");
  }
}
function sumToDisplay(val1, val2) {
  var val3 = parseFloat(val1) + parseFloat(val2);
  return displayDigit(val3);
}
function displayDigit(val) {
  if (val % 1 == 0) {
    return val;
  } else {
    return val + "0";
  }
}
var theNewString = "";
function CreateURL() {
  var bc, offerId, thetype;
  bc = "OBI-LL1";
  thetype = "buy";
  var data = JSON.parse(document.getElementById("billing_offers_us_json").innerHTML);
  var json_codes = JSON.parse(document.getElementById("codes_source").innerHTML);
  var path_to_offers = document.getElementById("path_to_offers").innerHTML;
  switch (step1Selected) {
    case "Simple Start":
      offerId = eval(json_codes[0][0]);
      if (json_codes[0][0].indexOf(".TRIAL.") !== -1) thetype = "trial";
      break;
    case "Plus":
      offerId = eval(json_codes[1][0]);
      if (json_codes[1][0].indexOf(".TRIAL.") !== -1) thetype = "trial";
      break;
    case "Advanced":
      offerId = eval(json_codes[2][0]);
      if (json_codes[2][0].indexOf(".TRIAL.") !== -1) thetype = "trial";
      break;
    default:
      bc = "";
      offerId = "";
      break;
  }
  var url = "https://signup.quickbooks.intuit.com/?locale=en-us&offerType=" + thetype + "&bc=" + bc + "&offerId=" + offerId;
  if (step2Selected == "") {
    //if ($('.bkp-toggle-switch').hasClass("on")) {
      url += "&additionalOfferIds=20018806,20024274";
      if (!theNewString.includes(',')) {
        if (theNewString != "") {
          url += theNewString
        }
      } else {
        url
      }
    //} else {

    //}
    $(".step-checkout").attr("href", url);
    checkoutToggleNoPayroll();
  } else {
    var product, additionalOfferIds;
    switch (step2Selected) {
      case "Core":
        product = "qbo";
        additionalOfferIds = eval(json_codes[3][0]);
        break;
      case "Premium":
        product = "qbo";
        additionalOfferIds = eval(json_codes[4][0]);
        break;
      case "Elite":
        product = "qbo";
        additionalOfferIds = eval(json_codes[5][0]);
        break;
    }
    //if ($('.bkp-toggle-switch').hasClass("on")) {
      additionalOfferIds += ",20018806,20024274";
      if (!theNewString.includes(',')) {
        if (theNewString != "") {
          additionalOfferIds += theNewString
        }
      } else {
        additionalOfferIds
      }
    //} else {

    //}
    $(".step-checkout").attr("href", url + "&product=" + product + "&additionalOfferIds=" + additionalOfferIds);
    checkoutToggle();
  }
}
function checkoutToggleNoPayroll() {
  setTimeout(() => {
    function getSecondPart(str) {
      return str.split(/offerId=[0-9]*/g)[1];
    }
    theNewString = getSecondPart($(".step-checkout").attr("href"));
    var _href = $(".step-checkout").attr("href");
    if (_href.includes(theNewString)) {
      return;
    } else {
      $(".step-checkout").attr("href", _href + theNewString);
    }
  }, 1200);
}
function checkoutToggle() {
  setTimeout(() => {
    function getSecondPart(str) {
      return str.split(/additionalOfferIds=[0-9]*/g)[1];
    }
    theNewString = getSecondPart($(".step-checkout").attr("href"));
    var _href = $(".step-checkout").attr("href");
    if (_href.includes(theNewString)) {
      return;
    } else {
      $(".step-checkout").attr("href", _href + theNewString);
    }
  }, 1200);
}
function gobackastep() {
  if ($(".ctab.selected").hasClass("tab-3")) {
    $(".ctab").removeClass("selected");
    $(".ctab.tab-2").addClass("selected");
    Step1(step1Selected);
  } else if ($(".ctab.selected").hasClass("tab-2")) {
    $(".ctab").removeClass("selected");
    $(".ctab.tab-1").addClass("selected");
    intializeStep();
  } else if ($(".ctab.selected").hasClass("tab-1")) {}
}
function ScrollToSticky() {
  $('html, body').animate({
    scrollTop: 670
  }, 0);
}
$(document).ready(function() {
  intializeStep();
  $("#simple-start-buttons, #simple-start-buttons a, #simple-start-buttons a span").off("click");
  $("#simple-start-buttons a").on('click',function(event) {
    event.preventDefault();
    Step1("Simple Start");
  });
  $("#plus-buttons, #plus-buttons a, #plus-buttons a span").off("click");
  $("#plus-buttons a").on('click',function(event) {
    event.preventDefault();
    Step1("Plus");
  });
  $("#advanced-buttons, #advanced-buttons a, #advanced-buttons a span").off("click");
  $("#advanced-buttons a").on('click',function(event) {
    event.preventDefault();
    Step1("Advanced");
  });
  $("#core-buttons, #core-buttons a, #core-buttons a span").off("click");
  $("#core-buttons a").on('click',function(event) {
    event.preventDefault();
    Step2("Core");
  });
  $("#premium-buttons, #premium-buttons a, #premium-buttons a span").off("click");
  $("#premium-buttons a").on('click',function(event) {
    event.preventDefault();
    Step2("Premium");
  });
  $("#elite-buttons, #elite-buttons a, #elite-buttons a span").off("click");
  $("#elite-buttons a").on('click',function(event) {
    event.preventDefault();
    Step2("Elite");
  });
  $("#reset-plan").off("click");
  $("#reset-plan").on('click',function() {
    gobackastep();
  });
  $("#step-continue").on('click',function() {
    event.preventDefault();
    Step2("");
  });
  $('.bkp-toggle-switch').on('click', function() {
    var currURL = $(".step-checkout").attr('href');
    if ($(this).hasClass('on')) {
      $(this).removeClass('on');
      $('.live-bookkeeping-text').hide();
    } else {
      $(this).addClass('on');
      $('.live-bookkeeping-text').show();
    }
    CreateURL();
  });
});
