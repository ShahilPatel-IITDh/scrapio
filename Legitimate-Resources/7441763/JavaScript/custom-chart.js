$(document).ready(function () {
  if ($(window).width() > 1023) {
    $(".mobile-container").hide();
    $(".desktop-container").show();
  } else {
    $(".desktop-container").hide();
    $(".mobile-container").show();
  }

  window.addEventListener("resize", function () {
    if ($(window).width() > 1023) {
      $(".mobile-container").hide();
      $(".desktop-container").show();
    } else {
      $(".desktop-container").hide();
      $(".mobile-container").show();
    }
  });

  if (window.location.pathname === "/") {
    // RESIDENTIAL LENDERS CHART
    const trNameDataArrayResidentialLender = $(
      ".desktop-container #residential-lenders-table tr td:nth-child(2)"
    );
    const trValueDataArrayResidentialLender = $(
      ".desktop-container #residential-lenders-table tr td:nth-child(3)"
    );
    let trNameDataResidentialLender = [];
    let trValueDataResidentialLender = [];

    trNameDataArrayResidentialLender.map((i, item) => {
      trNameDataResidentialLender = [
        ...trNameDataResidentialLender,
        $(item).text(),
      ];
      trValueDataResidentialLender = [
        ...trValueDataResidentialLender,
        parseInt(
          $(trValueDataArrayResidentialLender[i])
            .text()
            .substring(1)
            .replace(/\,/g, "")
        ),
      ];
    });
    Highcharts.setOptions({
      lang: {
        thousandsSep: ",",
      },
    });
    // CHART
    Highcharts.chart("residentialLendingChart", {
      exporting: {
        enabled: false,
      },
      chart: {
        type: "column",
        reflow: false,
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: trNameDataResidentialLender,
        gridLineColor: "transparent",
        lineWidth: 1,
        title: {
          text: "Company",
          style: {
            color: "#005d9e",
            fontSize: "16px",
            fontWeight: "bold",
          },
          margin: 50,
        },
        accessibility: {
          description: "Company",
        },
        labels: {
          x: 15,
          rotation: 0,
          padding: 0,
          // overflow: 'allow'
          // allowOverlap: false,
          style: {
            textOverflow: "none",
          },
        },
      },
      yAxis: {
        startOnTick: false,
        endOnTick: false,
        lineWidth: 1,
        // min: 0,
        tickInterval: 5000,
        gridLineColor: "transparent",
        title: {
          text: "Dollars in Millions",
          style: {
            color: "#005d9e",
            fontSize: "16px",
            fontWeight: "bold",
          },
        },
        labels: {
          overflow: "justify",
          // format: "${value:point.y/1000:,.-3f}",
          formatter: function () {
            return "$" + this.value / 1000 + "k";
          },
        },
      },
      plotOptions: {
        column: {
          // stacking: 'normal',
          dataLabels: {
            rotation: -90,
            y: -35,
            enabled: true,
            format: "${point.y:,.0f}",
            style: {
              fontWeight: "600",
              fontSize: "12px",
              textOverflow: "ellipsis",
              textOutline: "none",
              color: "#808080"
            }
          },
          pointWidth: 20,
          borderRadius: 2,
        },
      },
      tooltip: {
        valuePrefix: "$",
        // stickOnContact: true,
        backgroundColor: "rgba(255, 255, 255, 0.93)",
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          name: "dummy data",
          data: [
            Math.max(...trValueDataResidentialLender) + 35000,
            Math.max(...trValueDataResidentialLender) + 35000,
            Math.max(...trValueDataResidentialLender) + 35000,
            Math.max(...trValueDataResidentialLender) + 35000,
            Math.max(...trValueDataResidentialLender) + 35000,
            Math.max(...trValueDataResidentialLender) + 35000,
            Math.max(...trValueDataResidentialLender) + 35000,
            Math.max(...trValueDataResidentialLender) + 35000,
            Math.max(...trValueDataResidentialLender) + 35000,
            Math.max(...trValueDataResidentialLender) + 35000,
          ],
          showInLegend: false,
          enableMouseTracking: false,
          color: "rgb(244,244,244)",
        },
        {
          name: "Investments in Dollars",
          data: trValueDataResidentialLender,
          color: "rgba(0,93,158, 0.93)",
        },
      ],
    });

    // RESIDENTIAL SERVICER CHART

    const trNameDataArrayResidentialServicer = $(
      ".desktop-container #residential-servicer-table tr td:nth-child(2)"
    );
    const trValueDataArrayResidentialServicer = $(
      ".desktop-container #residential-servicer-table tr td:nth-child(3)"
    );

    let trNameDataResidentialServicer = [];
    let trValueDataResidentialServicer = [];

    trNameDataArrayResidentialServicer.map((i, item) => {
      trNameDataResidentialServicer = [
        ...trNameDataResidentialServicer,
        $(item).text(),
      ];
      trValueDataResidentialServicer = [
        ...trValueDataResidentialServicer,
        parseInt(
          $(trValueDataArrayResidentialServicer[i])
            .text()
            .substring(1)
            .replace(/\,/g, "")
        ),
      ];
    });

    // CHART
    Highcharts.chart("residentialServicerChart", {
      exporting: {
        enabled: false,
      },
      chart: {
        type: "column",
        reflow: false,
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: trNameDataResidentialServicer,
        lineWidth: 1,
        title: {
          text: "Company",
          style: {
            color: "#005d9e",
            fontSize: "16px",
            fontWeight: "bold",
          },
          margin: 50,
        },
        accessibility: {
          description: "Company",
        },
        labels: {
          x: 15,
          rotation: 0,
          // allowOverlap: true
          style: {
            textOverflow: "none",
          },
        },
      },
      yAxis: {
        startOnTick: false,
        endOnTick: false,
        lineWidth: 1,
        // min: 0,
        tickInterval: 2000,
        gridLineColor: "transparent",
        title: {
          text: "Dollars in Millions",
          style: {
            color: "#005d9e",
            fontSize: "16px",
            fontWeight: "bold",
          },
        },
        labels: {
          overflow: "justify",
          // format: "{value}",
          formatter: function () {
            return "$" + this.value / 1000 + "k";
          },
        },
      },
      plotOptions: {
        column: {
          dataLabels: {
            rotation: -90,
            y: -35,
            enabled: true,
            format: "${point.y:,.0f}",
            style: {
              fontWeight: "600",
              fontSize: "12px",
              textOverflow: "ellipsis",
              textOutline: "none",
              color: "#808080"
            }
          },
          pointWidth: 20,
          borderRadius: 2,
        },
      },
      tooltip: {
        valuePrefix: "$",
        // stickOnContact: true,
        backgroundColor: "rgba(255, 255, 255, 0.93)",
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          name: "dummy data",
          data: [
            Math.max(...trValueDataResidentialServicer) + 5000,
            Math.max(...trValueDataResidentialServicer) + 5000,
            Math.max(...trValueDataResidentialServicer) + 5000,
            Math.max(...trValueDataResidentialServicer) + 5000,
            Math.max(...trValueDataResidentialServicer) + 5000,
            Math.max(...trValueDataResidentialServicer) + 5000,
            Math.max(...trValueDataResidentialServicer) + 5000,
            Math.max(...trValueDataResidentialServicer) + 5000,
            Math.max(...trValueDataResidentialServicer) + 5000,
            Math.max(...trValueDataResidentialServicer) + 5000,
          ],
          showInLegend: false,
          enableMouseTracking: false,
          color: "rgb(244,244,244)",
        },
        {
          name: "Investments in Dollars",
          data: trValueDataResidentialServicer,
          color: "rgba(0,93,158, 0.93)",
        },
      ],
    });

    // SERVICING CHART
    const trNameDataArraySubServicing = $(
      ".desktop-container #sub-servicing-table tr td:nth-child(2)"
    );
    const trValueDataArraySubServicing = $(
      ".desktop-container #sub-servicing-table tr td:nth-child(3)"
    );

    let trNameDataSubServicing = [];
    let trValueDataSubServicing = [];

    trNameDataArraySubServicing.map((i, item) => {
      trNameDataSubServicing = [...trNameDataSubServicing, $(item).text()];
      trValueDataSubServicing = [
        ...trValueDataSubServicing,
        parseInt(
          $(trValueDataArraySubServicing[i])
            .text()
            .substring(1)
            .replace(/\,/g, "")
        ),
      ];
    });

    // CHART
    Highcharts.chart("subServicingChart", {
      exporting: {
        enabled: false,
      },
      chart: {
        type: "column",
        reflow: false,
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: trNameDataSubServicing,
        lineWidth: 1,
        title: {
          text: "Company",
          style: {
            color: "#005d9e",
            fontSize: "16px",
            fontWeight: "bold",
          },
          margin: 50,
        },
        accessibility: {
          description: "Company",
        },
        labels: {
          x: 15,
          rotation: 0,
          // allowOverlap: true
          style: {
            textOverflow: "none",
          },
        },
      },
      yAxis: {
        startOnTick: false,
        endOnTick: false,
        lineWidth: 1,
        // min: 0,
        tickInterval: 150000,
        gridLineColor: "transparent",
        title: {
          text: "Dollars in Millions",
          style: {
            color: "#005d9e",
            fontSize: "16px",
            fontWeight: "bold",
          },
        },
        labels: {
          overflow: "justify",
          // format: "{value}",
          formatter: function () {
            return "$" + this.value / 1000 + "k";
          },
        },
      },
      plotOptions: {
        column: {
          dataLabels: {
            rotation: -90,
            y: -45,
            enabled: true,
            format: "${point.y:,.0f}",
            style: {
              fontWeight: "600",
              fontSize: "12px",
              textOverflow: "ellipsis",
              textOutline: "none",
              color: "#808080"
            }
          },
          pointWidth: 20,
          borderRadius: 2,
        },
      },
      tooltip: {
        valuePrefix: "$",
        // stickOnContact: true,
        backgroundColor: "rgba(255, 255, 255, 0.93)",
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          name: "dummy data",
          data: [
            Math.max(...trValueDataSubServicing) + 600000,
            Math.max(...trValueDataSubServicing) + 600000,
            Math.max(...trValueDataSubServicing) + 600000,
            Math.max(...trValueDataSubServicing) + 600000,
            Math.max(...trValueDataSubServicing) + 600000,
            Math.max(...trValueDataSubServicing) + 600000,
            Math.max(...trValueDataSubServicing) + 600000,
            Math.max(...trValueDataSubServicing) + 600000,
            Math.max(...trValueDataSubServicing) + 600000,
            Math.max(...trValueDataSubServicing) + 600000,
          ],
          showInLegend: false,
          enableMouseTracking: false,
          color: "rgb(244,244,244)",
        },
        {
          name: "Investments in Dollars",
          data: trValueDataSubServicing,
          color: "rgba(0,93,158, 0.93)",
        },
      ],
    });

    // WHOLESALE LENDERS CHART
    const trNameDataArrayWholeSaleLenders = $(
      ".desktop-container #wholesale-lenders-table tr td:nth-child(2)"
    );
    const trValueDataArrayWholeSaleLenders = $(
      ".desktop-container #wholesale-lenders-table tr td:nth-child(3)"
    );

    let trNameDataWholeSaleLenders = [];
    let trValueDataWholeSaleLenders = [];

    trNameDataArrayWholeSaleLenders.map((i, item) => {
      trNameDataWholeSaleLenders = [
        ...trNameDataWholeSaleLenders,
        $(item).text(),
      ];
      trValueDataWholeSaleLenders = [
        ...trValueDataWholeSaleLenders,
        parseInt(
          $(trValueDataArrayWholeSaleLenders[i])
            .text()
            .substring(1)
            .replace(/\,/g, "")
        ),
      ];
    });

    // CHART
    Highcharts.chart("wholesaleLendersChart", {
      exporting: {
        enabled: false,
      },
      chart: {
        type: "column",
        reflow: false,
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: trNameDataWholeSaleLenders,
        lineWidth: 1,
        title: {
          text: "Company",
          style: {
            color: "#005d9e",
            fontSize: "16px",
            fontWeight: "bold",
          },
          margin: 50,
        },
        accessibility: {
          description: "Company",
        },
        labels: {
          x: 15,
          rotation: 0,
          // allowOverlap: true
          style: {
            textOverflow: "none",
          },
        },
      },
      yAxis: {
        startOnTick: false,
        endOnTick: false,
        lineWidth: 1,
        // min: 0,
        tickInterval: 5000,
        gridLineColor: "transparent",
        title: {
          text: "Dollars in Millions",
          style: {
            color: "#005d9e",
            fontSize: "16px",
            fontWeight: "bold",
          },
        },
        labels: {
          overflow: "justify",
          // format: "{value}",
          formatter: function () {
            return "$" + this.value / 1000 + "k";
          },
        },
      },
      plotOptions: {
        column: {
          dataLabels: {
            rotation: -90,
            y: -35,
            enabled: true,
            format: "${point.y:,.0f}",
            style: {
              fontWeight: "600",
              fontSize: "12px",
              textOverflow: "ellipsis",
              textOutline: "none",
              color: "#808080"
            }
          },
          pointWidth: 20,
          borderRadius: 2,
        },
      },
      tooltip: {
        valuePrefix: "$",
        // stickOnContact: true,
        backgroundColor: "rgba(255, 255, 255, 0.93)",
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          name: "dummy data",
          data: [
            Math.max(...trValueDataWholeSaleLenders) + 18000,
            Math.max(...trValueDataWholeSaleLenders) + 18000,
            Math.max(...trValueDataWholeSaleLenders) + 18000,
            Math.max(...trValueDataWholeSaleLenders) + 18000,
            Math.max(...trValueDataWholeSaleLenders) + 18000,
            Math.max(...trValueDataWholeSaleLenders) + 18000,
            Math.max(...trValueDataWholeSaleLenders) + 18000,
            Math.max(...trValueDataWholeSaleLenders) + 18000,
            Math.max(...trValueDataWholeSaleLenders) + 18000,
            Math.max(...trValueDataWholeSaleLenders) + 18000,
          ],
          showInLegend: false,
          enableMouseTracking: false,
          color: "rgb(244,244,244)",
        },
        {
          name: "Investments in Dollars",
          data: trValueDataWholeSaleLenders,
          color: "rgba(0,93,158, 0.93)",
        },
      ],
    });
    //
    let yTickMax = $(
      "g.highcharts-axis-labels.highcharts-yaxis-labels text:last-child"
    ).text();

    let extraBar = $(
      "g.highcharts-series.highcharts-series-0.highcharts-column-series rect"
    );
    let xArray = [];
    extraBar.map((index, item) => {
      xArray = [...xArray, parseInt($(item).attr("x")) + 19];
    });
    xArray.map((item, index) => {
      $(extraBar[index]).attr({ x: item });
    });
    $(
      "#residential-service-button",
      "#servicing-button",
      "#wholesale-lenders-button"
    ).click(function () {
      alert("Clicked");
      console.log("Button Clicked");
      if ($("#residential-lenders-button").hasClass("active")) {
        console.log("Inside If Condition");
        $("#residential-lenders-button").removeClass("active");
      }
    });
  }

  $(".mobile-container .accordion-item").click(function () {
    $(".mobile-container .accordion-item").removeClass("active-item");
    // DON'T REMOVE
    // $(".accordion-item").on("show.bs.collapse hide.bs.collapse", function (e) {
    //   if (e.type == "show") {
    //     $(this).addClass("active");
    //   } else {
    //     $(this).removeClass("active");
    //   }
    // });
  });

  $(".mobile-container #residential-lenders-button").click(function(){
    $(this).toggleClass("active")
    $(".mobile-container #residential-service-button").removeClass("active");
    $(".mobile-container #servicing-button").removeClass("active");
    $(".mobile-container #wholesale-lenders-button").removeClass("active")
  });

  $(".mobile-container #residential-service-button").click(function(){
    $(this).toggleClass("active")
    $(".mobile-container #residential-lenders-button").removeClass("active");
    $(".mobile-container #servicing-button").removeClass("active");
    $(".mobile-container #wholesale-lenders-button").removeClass("active")
  });

  $(".mobile-container #servicing-button").click(function(){
    $(this).toggleClass("active")
    $(".mobile-container #residential-service-button").removeClass("active");
    $(".mobile-container #residential-lenders-button").removeClass("active");
    $(".mobile-container #wholesale-lenders-button").removeClass("active")
  });

  $(".mobile-container #wholesale-lenders-button").click(function(){
    $(this).toggleClass("active")
    $(".mobile-container #residential-service-button").removeClass("active");
    $(".mobile-container #servicing-button").removeClass("active");
    $(".mobile-container #residential-lenders-button").removeClass("active")
  });
});
