var _chartStrokeLine = "#FFF";
var _chartFillLine = "#00CCAA";
var _spotlightStrokeLine = "#202A5A";
var _savingChartAnimation = true;
var _countAnimation = true;
var _showTooltip = true;
var _chartFirstText;
var _chartSecondText;
var query_string_value;
var gaugeOptionsFirst, gaugeOptionsSecond, gaugeOptionsThird, gaugeOptionsFourth;
var gaugeFirstvalue = 0,
  gaugeSecondvalue = 0;
new WOW().init();
$(window).on("load", function() {
  window.setTimeout(function() {
    if ($(".auditors_saving_leftpart").length) {
      _chartFirstText = $("#auditors_firstsaving_chart").attr("data-text");
      _chartSecondText = $("#auditors_secondsaving_chart").attr("data-text");
      if ($("#auditors_firstsaving_chart").length) {
        firstsaving_chart();
      }
      if ($("#auditors_secondsaving_chart").length) {
        secondsaving_chart();
      }
    }
    
    /*Animation countup*/
    windowView();
    if ($(".accordion_tabpart").length) {
      var _activeFlag = true;
      $(".accordion_tabpart a").each(function() {
        if ($(this).hasClass("active")) {
          _activeFlag = false;
          $(this).trigger("click");
        }
      });
      if (_activeFlag) {
        $($(".accordion_tabpart a")[0]).trigger("click");
      }
    }
    /*Animation countup*/

    /*video iframe*/
    if ($(".iframe_active,.lazy").length) {
      $(".iframe_active iframe,.lazy").each(function() {
        $(this).attr("src", $(this).attr("data-src"));
        $(this).removeAttr("data-src");
      });
    }
    /*script for custom Drop Box*/
    var x, i, j, selElmnt, a, b, c;
    /*look for any elements with the class "custom-select":*/
    if ($(".custom-select").length) {
      x = document.getElementsByClassName("custom-select");
      for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName("select")[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement("DIV");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].appendChild(a);
        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "select-items select-hide");
        for (j = 0; j < selElmnt.length; j++) {
          /*for each option in the original select element,
			    create a new DIV that will act as an option item:*/
          c = document.createElement("DIV");
          c.innerHTML = selElmnt.options[j].innerHTML;
          c.addEventListener("click", function(e) {
            /*when an item is clicked, update the original select box,
			        and the selected item:*/
            var y, i, k, s, h;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (i = 0; i < s.length; i++) {
              if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                for (k = 0; k < y.length; k++) {
                  y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
              }
            }
            h.click();
            var _getSelectedVal = $(
              ".custom-select select option:selected"
            ).val();
            var _getProtocol = window.location.protocol;
            var _getHost = window.location.host;
            var _MatchString = _getSelectedVal.includes(_getHost);
            console.log(
              ">>",
              _MatchString,
              _getProtocol + "//" + _getHost + _getSelectedVal
            );
            if (_MatchString) {
              window.location.assign(
                _getProtocol + "//" + _getHost + _getSelectedVal
              );
              return true;
            } else {
              window.location.assign(_getSelectedVal);
              return true;
            }
            /*var pattern = new RegExp(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);
					  if(pattern.test(_getSelectedVal)) {
					    
					    return true;
					  }*/
          });
          b.appendChild(c);
        }
        x[i].appendChild(b);
        a.addEventListener("click", function(e) {
          /*when the select box is clicked, close any other select boxes,
			      and open/close the current select box:*/
          e.stopPropagation();
          closeAllSelect(this);
          this.nextSibling.classList.toggle("select-hide");
          this.classList.toggle("select-arrow-active");
        });
      }
    }
    /*script for custom Drop Box*/
    if ($(".subscriber_footer_form form.hs-form").length) {
      $(".subscriber_footer_form form.hs-form .hs-input").attr(
        "placeholder",
        "Email Address"
      );
    }
    if ($(".subscribe_form_part form.hs-form").length) {
      $(".subscribe_form_part form.hs-form .hs-input").attr(
        "placeholder",
        "Email Address"
      );
    }
  }, 50);
  if (window.location.pathname == "/" || window.location.pathname == '/audit-confirmations/') {
    if ($('.marquee')[0]) {
      $('.marquee').slick({
        autoplay: true,
        autoplaySpeed: 6000,
        fade: true,
        speed: 500
      });
      $('.marquee').addClass("active");
    }
  }
  // Expands the FAQ accordion sections for the user agreement anchor links
  if ($(".faq_accordion_insection .accordion_tabpart")) {
    urlName = $(location).attr("hash");
    withoutHash = urlName.substring(1,urlName.length);
    if (~withoutHash.toLowerCase().indexOf("user-agreement")) {
      // Expands tab
      $(".faq_accordion_insection a[data-tab='tab-user']").addClass("active");
      // Expands accordion
      $(".faq_accordion_insection .accordion_row[data-rel='tab-user'] .accordion_cell").each(function(index) {
          tabLink = $(this).attr("name");
          if (~withoutHash.toLowerCase().indexOf(tabLink) && tabLink) {
            userRow = $(this);
            rowOffset = index * 55;
          }
        });
      if (userRow) {
        userRow.addClass('expanded');
        userRow.children().css( "display", "block");
        // Scrolls to accordion
        var viewportTop = $(window).scrollTop();
        $('html, body').animate({
          scrollTop: viewportTop + rowOffset + $(".faq_accordion_insection").offset().top
        }, 1000);
      }
    }
    // Expands the security section
    if (~withoutHash.toLowerCase().indexOf("security")) {
      // Expands tab
      $(".faq_accordion_insection a[data-tab='tab-security']").addClass("active");
      // Expands accordion
      $(".faq_accordion_insection .accordion_row[data-rel='tab-security'] .accordion_cell").each(function(index) {
        tabLink = $(this).attr("name");
        if (~withoutHash.toLowerCase().indexOf(tabLink) && tabLink) {
          securityRow = $(this);
          rowOffset = index * 55;
        }
      });
      if (securityRow) {
        securityRow.addClass('expanded');
        securityRow.children().css( "display", "block");
        // Scrolls to accordion
        var viewportTop = $(window).scrollTop();
        $('html, body').animate({
          scrollTop: viewportTop + rowOffset + $(".faq_accordion_insection").offset().top
        }, 1000);
      }
    }
  }
});
$(window).on("scroll", function() {
  /*Animation countup*/
  windowView();
  if ($(".platform_confirmation").length && _showTooltip) {
    if (
      $(window).scrollTop() >=
      $(".platform_confirmation .main_platform").offset().top -
        $(window).height() / 2
    ) {
      _showTooltip = false;
      $(".platform_confirmation .first-tooltip").addClass("activeTooltip");
    }
  }

  if (
    $(window).scrollTop() + $(window).height() / 5 >=
    $("html,body").height() / 5
  ) {
    $("body").addClass("active_trynow");
  } else {
    $("body").removeClass("active_trynow");
  }
  /*Auditors saving chart*/
  if ($(".auditors_saving_leftpart").length) {
    var chartOffset =
      $(".auditors_saving_leftpart").offset().top +
      $(".auditors_saving_leftpart").outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height() * 2;
    if (chartOffset > viewportTop && chartOffset < viewportBottom) {
      if (_savingChartAnimation) {
        gaugeFirstvalue = parseInt(
          $("#auditors_firstsaving_chart").attr("data-value")
        );
        gaugeSecondvalue = parseInt(
          $("#auditors_secondsaving_chart").attr("data-value")
        );
        _savingChartAnimation = false;
        setTimeout(function() {
          $("#auditors_firstsaving_chart .saving_chart_custompart big")
            .prop("Counter", 0)
            .animate(
              {
                Counter: gaugeFirstvalue
              },
              {
                duration: 1000,
                step: function(now) {
                  gaugeOptionsFirst.series[0].update({
                    data: [Math.ceil(now)]
                  });
                }
              }
            );

          $("#auditors_secondsaving_chart .saving_chart_custompart big")
            .prop("Counter", 0)
            .animate(
              {
                Counter: gaugeSecondvalue
              },
              {
                duration: 1000,
                step: function(now) {
                  gaugeOptionsSecond.series[0].update({
                    data: [Math.ceil(now)]
                  });
                }
              }
            );
        }, 50);
      }
    }
  }
});

$(document).ready(function(e) {
  if ($(".resources_cards_part .cards_column_contentpart").length) {
    $(".resources_cards_part .cards_column_contentpart h4").dotdotdot({});
    $(".resources_cards_part .cards_column_contentpart p").dotdotdot({});
    $(
      ".resources_cards_part .cards_columnpart.no_image .cards_column_contentpart p"
    ).dotdotdot({});
    $(
      ".resources_cards_part .cards_columnpart.no_image .cards_column_contentpart h4"
    ).dotdotdot({});
  }
  if ($(".article_part .press_article_part .p_article_part").length) {
    $(
      ".article_part .press_article_part .p_article_part.large_article p"
    ).dotdotdot({});
    $(
      ".article_part .press_article_part .p_article_part.small_article p"
    ).dotdotdot({});
    $(
      ".article_part .press_article_part .p_article_part.no_image_article p"
    ).dotdotdot({});
  }

  $(document).on("mouseover", ".tooltip", function() {
    $(".tooltip").removeClass("activeTooltip");
  });

  $(document).on("click", "#timeDifference .tooltip", function() {
    if ($("#timeDifference .tooltip").hasClass("activeTooltip")) {
      $("#timeDifference .tooltip").removeClass("activeTooltip");
      $("#timeDifference .tooltip").addClass("hiddenTooltip");
    } else {
      $("#timeDifference .tooltip").addClass("activeTooltip");
      $("#timeDifference .tooltip").removeClass("hiddenTooltip");
    }
  });

  $(document).on("click", function(event) {
    if ($(".select-items").length && !$(event.target).is(".select_dropdown*")) {
      closeAllSelect();
    }
  });
  $(document).on("click", ".accordion_cell > a", function() {
    var _this = $(this);
    $(".faq_accordion_insection .accordion_row").css({ height: "auto" });
    if (_this.parents(".accordion_cell").hasClass("expanded")) {
      _this.parents(".accordion_cell").removeClass("expanded");
      _this
        .parents(".accordion_cell")
        .find(".accordion_expandpart")
        .stop(true)
        .slideUp();
    } else {
      _this.parents(".accordion_cell").addClass("expanded");
      _this
        .parents(".accordion_cell")
        .find(".accordion_expandpart")
        .stop(true)
        .slideDown();
    }
  });
  $(document).on("click", ".accordion_tabpart a", function() {
    var _this = $(this);
    var _getvalue = $(this).attr("data-tab");
    _this
      .parents(".accordion_tabpart")
      .find("a")
      .removeClass("active");
    _this.addClass("active");
    _this
      .parents(".faq_accordion_insection")
      .find(".accordion_row")
      .stop(true)
      .slideUp(function() {
        _this
          .parents(".faq_accordion_insection")
          .find(".accordion_row[data-rel=" + _getvalue + "]")
          .stop(true)
          .slideDown();
      });
  });

  $(document).on("click", ".menu-item-has-children a", function() {
    var _submenu = $(this).next(".submenu");
    if (_submenu.length) {
      if ($(window).width() <= 960) {
        if (
          $(this)
            .parents(".menu-item-has-children")
            .hasClass("active_submenu")
        ) {
          $(this)
            .parents(".menu-item-has-children")
            .removeClass("active_submenu");
        } else {
          $(this)
            .parents(".menu-item-has-children")
            .addClass("active_submenu");
          return false;
        }
      }
    }
  });
  if ($(window).width() <= 960) {
    var window_height = $(window).height();
    var header_height = $("header").height();
    var menu_height = window_height - header_height;
    $(".navigation_part .header_menupart")
      .css("max-height", menu_height + "px")
      .css("overflow", "auto");
  } else {
    console.log("More than 960");
  }
  $(document).on("click", ".nav_toggle", function() {
    if (
      $(this)
        .parents(".navigation_part")
        .hasClass("active")
    ) {
      $(this)
        .parents(".navigation_part")
        .find(".menu-item-has-children")
        .removeClass("active_submenu");
      $(this)
        .parents(".navigation_part")
        .removeClass("active");
    } else {
      $(this)
        .parents(".navigation_part")
        .addClass("active");
    }
  });

  var _slider = $(".tab_slider .slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  });
  _slider.on("beforeChange", function(event, slick, currentSlide, nextSlide) {
    var _getActiveTab = parseInt(
      $(".testimonial_content[data-slick-index=" + nextSlide + "]").attr(
        "data-rel"
      )
    );

    $(".tab_slider")
      .find(".tab_logo")
      .removeClass("active");
    $(".tab_slider")
      .find(".tab_logo[data-slide=" + _getActiveTab + "]")
      .addClass("active");
  });
  $(document).on("click", ".tab_logo", function(e) {
    var get_slide = $(this).attr("data-slide");
    $(".tab_slider .slider-for").slick("goTo", parseInt(get_slide) - 1);
  });

  if ($(".download_cards_part").length) {
    $(".download_cards_row").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      infinite: false,
      responsive: [
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }
  if ($(".client_video_play_popup").length) {
    $(".client_video_play_popup").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
  }
  if ($(".modal_video_play").length) {
    $(".modal_video_play").magnificPopup({
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
  }

  if ($(".confirmation_popup_form").length) {
    $(window).load(function() {
      openpopup(this.className);
    });
  }
});
function openpopup() {
  $.magnificPopup.open({
    items: {
      src: "#popup_form"
    },
    type: "inline",
    closeOnBgClick: false
  });
}

function firstsaving_chart() {
  gaugeOptionsFirst = {
    chart: {
      type: "solidgauge",
      margin: [0, 0, 0, 0],
      backgroundColor: "transparent"
    },
    title: null,
    animation: {
      duration: 500
    },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickWidth: 0,
      minorTickLength: 0,
      labels: {
        enabled: false
      }
    },
    pane: {
      size: "100%",
      center: ["50%", "50%"],
      startAngle: 0,
      endAngle: 360,
      background: {
        borderWidth: 5,
        backgroundColor: "transparent",
        shape: "arc",
        borderColor: _chartStrokeLine,
        outerRadius: "95%",
        innerRadius: "95%"
      }
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      solidgauge: {
        borderColor: _chartFillLine,
        borderWidth: 5,
        radius: 95,
        innerRadius: "95%",
        dataLabels: {
          y: 0,
          borderWidth: 0,
          useHTML: true
        }
      }
    },
    series: [
      {
        name: "windSpeed",
        data: [gaugeFirstvalue],
        dataLabels: {
          format:
            '<div class="saving_chart_custompart"><big>{y}</big><p>' +
            _chartFirstText +
            "</p></div>"
        }
      }
    ],
    credits: {
      enabled: false
    }
  };
  gaugeOptionsFirst = Highcharts.chart(
    "auditors_firstsaving_chart",
    Highcharts.merge(gaugeOptionsFirst)
  );
  //$('#auditors_firstsaving_chart').highcharts(gaugeOptionsFirst);
}
function secondsaving_chart() {
  gaugeOptionsSecond = {
    chart: {
      type: "solidgauge",
      margin: [0, 0, 0, 0],
      backgroundColor: "transparent"
    },
    title: null,
    animation: {
      duration: 500
    },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickWidth: 0,
      minorTickLength: 0,
      labels: {
        enabled: false
      }
    },
    pane: {
      size: "100%",
      center: ["50%", "50%"],
      startAngle: 0,
      endAngle: 360,
      background: {
        borderWidth: 5,
        backgroundColor: "transparent",
        shape: "arc",
        borderColor: _chartStrokeLine,
        outerRadius: "95%",
        innerRadius: "95%"
      }
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      solidgauge: {
        borderColor: _chartFillLine,
        borderWidth: 5,
        radius: 95,
        innerRadius: "95%",
        dataLabels: {
          y: 0,
          borderWidth: 0,
          useHTML: true
        }
      }
    },
    series: [
      {
        name: "windSpeed",
        data: [gaugeSecondvalue],
        dataLabels: {
          format:
            '<div class="saving_chart_custompart"><big>{y}</big><p>' +
            _chartSecondText +
            "</p></div>"
        }
      }
    ],
    credits: {
      enabled: false
    }
  };
  gaugeOptionsSecond = Highcharts.chart(
    "auditors_secondsaving_chart",
    Highcharts.merge(gaugeOptionsSecond)
  );
  //$('#auditors_secondsaving_chart').highcharts(gaugeOptionsSecond);
}

function kFormatter(num) {
  return num > 999 ? (num / 1000).toFixed(0) + "<i>K</i>" : num;
}
function countupanimation() {
  $(".counter").each(function() {
    var $this = $(this),
      countTo = $this.attr("data-count");
    $({ countNum: $this.text() }).animate(
      { countNum: countTo },
      {
        duration: 500,
        easing: "linear",
        step: function() {
          $this.text(Math.floor(this.countNum));
        },
        complete: function() {
          if ($(".client_brand_box .counter").hasClass("coma")) {
            x = countTo.toString();
            var lastThree = x.substring(x.length - 3);
            var otherNumbers = x.substring(0, x.length - 3);
            if (otherNumbers != "") lastThree = "," + lastThree;
            var _simplecount =
              otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            //var _simplecount = Math.floor(this.countNum);
            var _postfix = $this.attr("data-prefix");
            if (_postfix === undefined) {
              _postfix = "";
            }
            $this.html(
              _simplecount + '<i class="percentage">' + _postfix + "</i>"
            );
          } else {
            var _countValue = kFormatter(Math.floor(this.countNum));
            var _postfix = $this.attr("data-prefix");
            if (_postfix === undefined) {
              _postfix = "";
            }
            $this.html(_countValue + '<i class="plus">' + _postfix + "</i>");
          }
        }
      }
    );
  });
}
function windowView() {
  if ($(".counter").length) {
    var chartOffset = $(".counter").offset().top;
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    if (chartOffset > viewportTop && chartOffset < viewportBottom) {
      if (_countAnimation) {
        _countAnimation = false;
        countupanimation();
      }
    }
  }
}
function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href
    .slice(window.location.href.indexOf("?") + 1)
    .split("&");
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split("=");
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x,
    y,
    i,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

var pageNumber = 1;

function load_more_post() {
  pageNumber++;
  var category = $(".resources_post_filter a.active").attr("data-slug");
  var adminurl = $("#adminurl").val();

  $.ajax({
    type: "GET",
    dataType: "html",
    url: adminurl,
    data: {
      category: category,
      pageNumber: pageNumber,
      action: "load_more_post_ajax"
    },
    success: function(data) {
      if (data.length != 0) {
        $(".cards_rowpart").append(data);
      } else {
        $(".learn_more_button").hide();
        $(".Empty_block").text("No more posts found.");
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("error");
    }
  });
}
