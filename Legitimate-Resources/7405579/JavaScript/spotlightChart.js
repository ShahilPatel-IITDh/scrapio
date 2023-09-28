var $ = jQuery;
var _spotlightStrokeLine = "#202A5A";
var _savingSpotlightChartAnimation = true;
var _countAnimation = true;

jQuery(window).on("load", function() {
    setTimeout(function() {
        chartViewLoad();
    },50);
});

$(window).on("scroll", function() {
    chartViewLoad();
});

function chartViewLoad() {
    // If there is a spotlight customer section
    if ($(".time_saved_counter").length) {
      var chartOffset = $(".time_saved_counter").offset().top;
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      if (chartOffset > viewportTop && chartOffset < viewportBottom) {
          setTimeout(function() {
            // Create the chart
            if (_savingSpotlightChartAnimation) {
                createSpotlightChart();
                _savingSpotlightChartAnimation = false;
            }
            // Countup the numbers
            if (_countAnimation) {
              countupSpotlightChart();
              _countAnimation = false;
            }
          }, 50);
        }
    }
}
function createSpotlightChart() {
    if (_savingSpotlightChartAnimation) {
        var chartOffset = $(".spotlight_time_savings_part").offset().top + $(".spotlight_time_savings_part").outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height() * 2;
        if (chartOffset > viewportTop && chartOffset < viewportBottom) {
            //   Create chart
            if ($(".time_saved").length) {
                $(".time_saved").each(function() {
                    let $this = $(this),
                        chartSpotlightNumber = Math.floor(parseFloat($this.attr("data-count"))),
                        chartColor = $this.attr("data-color"),
                        chartName = $this.attr("id");

                    spotlight_saving_chart(chartSpotlightNumber, chartName, chartColor);
                });
            }
        }
    }
}

function countupSpotlightChart() {
    //   Countup animation
    $(".time_saved_counter").each(function() {
        let $this = $(this),
            chartSpotlightText = $this.attr("data-text"),
            chartSpotlightNum = Math.floor(parseFloat($this.attr("data-count"))),
            chartSpotlightSymbol = $this.attr("data-prefix"),
            chartSpotlightDecimal = $this.attr("data-decimal"),
            chartColor = $this.attr("data-color"),
            displayZero = $this.attr("data-zero"),
            countTo = (chartSpotlightNum === 0 && chartSpotlightDecimal) ? chartSpotlightDecimal : chartSpotlightNum;

        $({ countNum: $this.text() }).animate(
            { countNum: countTo },
            {
                duration: 1000,
                easing: "linear",
                separator: ",",
                step: function() {
                    let thisNum = Math.floor(this.countNum),
                        formatNum = thisNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                    displayText = formatNum;
                    if (chartSpotlightSymbol) {
                        displayText = formatNum + chartSpotlightSymbol;
                    }
                    if (chartSpotlightDecimal) {
                        displayText = "." + displayText;
                    }
                    if (displayZero === "Zero") {
                        displayText = "Zero" +  chartSpotlightSymbol;
                    }
                    if (!countTo && displayZero !== "Zero") {
                        displayText = chartSpotlightSymbol;
                    }
                    if (countTo === 0 && displayZero !== "Zero" ) {
                        displayText = "0" + chartSpotlightSymbol;
                    }

                    $this.html("<big>" + displayText + "</big><p>" + chartSpotlightText + "</p>");
                },
                complete: function() {
                    let displayNum = countTo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    if (chartSpotlightSymbol) {
                        displayNum = countTo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + chartSpotlightSymbol;
                    }
                    if (chartSpotlightDecimal) {
                        displayNum = "." + displayNum;
                    }
                    if (displayZero === "Zero") {
                        displayNum = "Zero" +  chartSpotlightSymbol;
                    }
                    if (!countTo && displayZero !== "Zero") {
                        displayNum = chartSpotlightSymbol;
                    }
                    if (countTo === 0 && displayZero !== "Zero" ) {
                        displayNum = "0" + chartSpotlightSymbol;
                    }

                    $this.html("<big>" + displayNum + "</big><p>" + chartSpotlightText + "</p>");
                }
            }
        );
    });
}

function spotlight_saving_chart(chartValue, chartName, chartColor) {
    fillColor = (chartColor === 'green') ? "#00CCAA" : "#1167FA";
    gaugeSpotlightOptions = {
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
            borderWidth: 8,
            backgroundColor: "transparent",
            shape: "arc",
            borderColor: _spotlightStrokeLine,
            outerRadius: "95%",
            innerRadius: "95%"
            }
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            solidgauge: {
            borderColor: fillColor,
            borderWidth: 8.75,
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
                data: [chartValue],
                dataLabels: {
                    format:
                    '<div class="' + chartName + '_custom_part"></div>'

                }
            }
        ],
        credits: {
            enabled: false
        }
    };
    gaugeSpotlightOptions = Highcharts.chart(
        chartName,
        Highcharts.merge(gaugeSpotlightOptions)
    );
}
