// https://bl.ocks.org/mbostock/7555321
d3.txtWrap = function(text, width) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        x = text.attr("x"),
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
};

// https://github.com/1wheel/d3-jetpack-module/commit/2c55624e7a01a32307b217af6c312eb93143d757
d3.selection.prototype.selectAppend = function(name) {
  var s = this.select(name)
  return s.size() ? s : this.append(name)
}; 

function commatize(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// where key is PP_UPDATE_DATE or NY_UPDATE_DATE
var updatedDate = function(key, withYear) {
  var date = new Date(Date.parse(COVID_NYC_V1[key]));
  var month = AP_MONTHS[date.getMonth()];
  var day = date.getDate()
  if (withYear) return month + " " + day + ", " + date.getFullYear();
  return month + " " + day;
}

AP_MONTHS = [
  "Jan.",
  "Feb.",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug.",
  "Sept.",
  "Oct.",
  "Nov.",
  "Dec."
]

COVID_NYC_V1["ZIPCODES"]["11249"] = COVID_NYC_V1["ZIPCODES"]["11211"]


propublica.views.nycGfx = propublica.View.extend({
  id : "nyc-gfx",

  bindings : {
    zipChosen : "setZipResult",
    setMapCategory : "setCategory"
  },

  render : function() {
    _.bindAll(this, "setCategory")

    this.jWin = $(window);
    this.miniGraphContainer = $("#zip-search-minigraph");
    var resizeTrigger = function() {
     $("#nyc-gfx-svg-container").empty();
     this.mkMaps(); 
    }
    var debouncedResizeTrigger = _.debounce(resizeTrigger.bind(this), 400);
    this.jWin.on('resize', debouncedResizeTrigger);
    this.mkMaps();
  },

  mkMaps : function() {
    _.templateSettings = {
      interpolate: /\{\{=(.+?)\}\}/g,
      evaluate: /\{\{(.+?)\}\}/g,
    };

    var data = COVID_NYC_GEO;
    var covidData = COVID_NYC_V1["ZIPCODES"];
    var zipBoroCrosswalk = ZIP_BORO_CROSSWALK;

    var labels = [
      {txt : "BROOKLYN",  klass : "label label-boro", ll : [-73.958126, 40.651026]},
      {txt : "MANHATTAN", klass : "label label-boro", ll : [-73.978883,40.780972]},
      {txt : "QUEENS",    klass : "label label-boro", ll : [-73.892526, 40.731578]},
      {txt : "BRONX",     klass : "label label-boro", ll : [-73.896268, 40.847595]},
      {txt : "STATEN ISLAND", klass : "label label-boro", ll : [-74.160091,40.596220]},
      {txt : "John F. Kennedy Int'l Airport", klass : "label label-poi", ll : [-73.779286,40.647519]},
      {txt : "Riker's Island", klass : "label label-poi", ll : [-73.887661,40.791978]},

    ];

    this.tmpl = _.template($("#tmpl").html());
    this.resultEl = $("#zip-search-result");
    this.covidData = covidData
    this.NA_POS = commatize(+COVID_NYC_V1["NA_POS"]); 
    this.updateDate = covidData["UPDATE_DATE"]
    this.cityAverage = covidData["CITY_AVERAGE"]

    this.w = this.el.width();
    this.h = this.el.height();

    // https://github.com/veltman/d3-stateplane#nad83--new-york-long-island-epsg32118
    var projection = d3.geoConicConformal()
      .parallels([40 + 40 / 60, 41 + 2 / 60])
      .rotate([115, 0])
      .fitSize([this.w, this.h], data)

    var path = d3.geoPath().projection(projection)

    var covidPerCapita = _.pluck(covidData, "DEA_PER_1000").map(function(it) { return +it });
    // set the legend
    var perCapitaWithoutZeros = _(covidPerCapita).select(function(q) { return _.isNumber(q) && q > 0})

    var tkThousandPositives = function() {
      var fig = commatize(+COVID_NYC_V1["CITY_POS"]);
      var thousands = fig.split(",")[0];
      var zeros = fig.split(",")[1];
      var str = thousands;
      str += ",";
      for (i = 0; i < zeros.length; i++) {
        str += "0"
      }
      return str;
    }

    // set the guff topline
    $("#guff-topline").html(tkThousandPositives())
    // set the updated date
    $("#updated-date").html(updatedDate("PP_UPDATE_DATE", true))

    var covidTestScale = d3.scaleLinear()
      .domain([d3.min(perCapitaWithoutZeros), d3.max(covidPerCapita)])
      .range([0, 1])


    $("#covid-maps-legend-min").html(Math.round(d3.min(perCapitaWithoutZeros)) + " deaths per thousand");
    $("#covid-maps-legend-max").html(Math.round(d3.max(covidPerCapita)));

    this.svg = d3.select($("#nyc-gfx-svg-container").get(0)).append("svg");
    this.pathG = this.svg.append("g");

    this.svg
      .attr("id", "nyc-map")
      .attr("width", this.w)
      .attr("height", this.h)
      .attr("viewBox", "0 0 " + this.w + " " + this.h)

    this.pathG
      .selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("stroke", '#999')
      .attr('stroke-width', "0.5")
      .attr("fill", function(d) {
        var obj = covidData[d.properties.ZIPCODE];
        if (!obj) return "#f0f0f0";
        if (obj.DEA_PER_1000 === "-") return "#f0f0f0";

        return d3.interpolateYlOrBr(covidTestScale(+obj.DEA_PER_1000))
      })
      .attr("d", function(d) {
        return path(d)
      })
      .on('mouseover', function(d) {

        if (_.isUndefined(covidData[d.properties.ZIPCODE])) return;
        if (!_.isNumber(covidData[d.properties.ZIPCODE].DEA_PER_1000)) {
          return;
        } 

        d3.select(this)
          .raise()
          .attr("stroke-width", "2")
          .attr("stroke", "#444");
        $("#zip-input").val(d.properties.ZIPCODE);
        $("#nyc-gfx").trigger("zipChosen", d.properties.ZIPCODE);
      })
      .on('mouseout', function(d) {
        d3.select("#nyc-map").selectAll("path")
          .attr("stroke", '#999')
          .attr('stroke-width', "0.5")
      })
      .on("click", function(d) {
        if (_.isUndefined(covidData[d.properties.ZIPCODE])) return;
        if (covidData[d.properties.ZIPCODE].DEA_PER_1000 < 1 || 
          !_.isNumber(covidData[d.properties.ZIPCODE].DEA_PER_1000)) {
          return;
        } 

        $("#nyc-gfx").trigger("zipChosen", d.properties["ZIPCODE"]);
      })
  // },

    var labelsOutlineG = this.svg.append("g").attr("class", "f-labels-outline");
    var labelsG = this.svg.append("g").attr("class", "f-labels");
    labelsOutlineG.selectAll("text")
      .data(labels)
      .enter()
      .append("text")
      .attr("class", function(d) {
        return d.klass;
      })
      .text(function(d) {
        return d.txt
      })
      .attr("x", function(d) {
        var x = projection([d.ll[0], d.ll[1]])[0]
        if (d.offset) { x += d.offset[0] }
        return x;
      })
      .attr("y", function(d) {
        var y = projection([d.ll[0], d.ll[1]])[1]
        if (d.offset) { y += d.offset[1] }
        return y;
      })
      .attr("dy", '.71em')
      .call(d3.txtWrap, 100)

    labelsG.selectAll("text")
      .data(labels)
      .enter()
      .append("text")
      .attr("class", function(d) {
        return d.klass;
      })
      .text(function(d) {
        return d.txt
      })
      .attr("x", function(d) {
        var x = projection([d.ll[0], d.ll[1]])[0]
        if (d.offset) { x += d.offset[0] }
        return x;
      })
      .attr("y", function(d) {
        var y = projection([d.ll[0], d.ll[1]])[1]
        if (d.offset) { y += d.offset[1] }
        return y;
      })
      .attr("dy", '.71em')
      .call(d3.txtWrap, 100)
  },

  setCategory : function(e, cat) {
    var facet = _.pluck(this.covidData, cat).map(function(it) { return +it });
    var perCapitaWithoutZeros = _(facet).select(function(q) { return _.isNumber(q) && q > 0})

    var covidTestScale = d3.scaleLinear()
      .domain([d3.min(perCapitaWithoutZeros), d3.max(facet)])
      .range([0, 1])

    // set the legend
    var legendTxt;
    if (cat.match(/pos/gi))  legendTxt = " cases per thousand";
    if (cat.match(/test/gi)) legendTxt = " tests per thousand";
    if (cat.match(/dea/gi))  legendTxt = " deaths per thousand";

    $("#covid-maps-legend-min").html(Math.round(d3.min(perCapitaWithoutZeros)) + legendTxt);
    $("#covid-maps-legend-max").html(Math.round(d3.max(facet)));

    this.svg.selectAll("path")
      .transition()
      .attr("fill", function(d) {
        var obj = this.covidData[d.properties.ZIPCODE];
        if (!obj) return "#f0f0f0";
        var catToNum = +obj[cat];
        if (catToNum === 0 || _.isNaN(catToNum)) return "#f0f0f0";
        return d3.interpolateYlOrBr(covidTestScale(catToNum))
      }.bind(this))
  },

  setZipResult : function(e, it) {
    var b, res;
    var v = true;
    if(!this.covidData[it]) {
      v = false;
    }
    
    if(this.covidData[it]) {

      if(it === "11370") {
        b = "Queens, which includes Riker's Island"
      } else {
        b = this.covidData[it]["NTA_NAME"]
      }
      var compareVal = (String((this.covidData[it]["CITY_COMPARE_VAL"]).toFixed(0))+"%")
      var compareTxt = ""
      if(compareVal == "0%") {
        compareVal = ""
        compareTxt = "equal to"
      } else {
        compareTxt = this.covidData[it]["CITY_COMPARE_TEXT"]
      }

      var deaCompareVal = (String((this.covidData[it]["CITY_COMPARE_VAL_DEA"]).toFixed(0))+"%")
      var deaCompareTxt = ""
      if(deaCompareVal == "0%") {
        deaCompareVal = ""
        deaCompareTxt = "equal to"
      } else {
        deaCompareTxt = this.covidData[it]["CITY_COMPARE_TEXT_DEA"]
      }

      res = {
        zip : it,
        date : updatedDate("NY_UPDATE_DATE"),
        deaPer1000: this.covidData[it]["DEA_PER_1000"].toFixed(1),
        posPer1000 : this.covidData[it]["POS_PER_1000"].toFixed(1),
        testPositive : this.covidData[it]["TOTAL_POSITIVE"],
        testTotal : this.covidData[it]["TOTAL_TESTS"],
        deathTotal : this.covidData[it]["TOTAL_DEATHS"],
        borough : b,
        cityCompareVal : compareVal,
        cityCompareText : compareTxt,
        cityCompareValDea : deaCompareVal,
        cityCompareTextDea: deaCompareTxt,
        posPerTest : this.covidData[it]["POS_PER_TEST"],
        isValid : v,
        posNA : this.NA_POS 
      };

      this.setChart(it);

    } else {
      res = {isValid : v}
    }
    this.resultEl.html(this.tmpl(res))

    d3.select("#nyc-map").selectAll("path")
      .attr("stroke", '#999')
      .attr('stroke-width', "0.5")

    d3.select("#nyc-map").selectAll("path")
      .filter(function(d, i) {
        return d && d.properties.ZIPCODE && d.properties.ZIPCODE === it
      })
      .raise()
      .attr("stroke-width", "2")
      .attr("stroke", "#444");
  },

  setChart : function(it) {
    var el = this.miniGraphContainer;
    var w = el.width();
    var h = el.height();
    var margin = 25;
    var data = this.covidData[it]['hist']
    var data = [];
    for (dateKey in this.covidData[it]['hist']) {
      var obj = this.covidData[it]['hist'][dateKey];
      var dateStrs = dateKey.split("-")
      obj.rawDate = dateKey
      obj.date = new Date(dateStrs[2] + "-" + dateStrs[0] + "-" + dateStrs[1] + "T00:00:00");
      data.push(obj)
    }
    data = data.sort(function(a, b) { return a.date - b.date })
    x = d3.scaleTime()
      .domain([
          d3.min(data, function(d) { return d.date}),
          d3.max(data, function(d) { return d.date}),
        ])
      .range([margin, w - margin])

    var testsPer1000 = _.pluck(this.covidData, "TEST_PER_1000").map(function(it) { return +it });
    y = d3.scaleLinear()
      .domain([
          0, d3.max(testsPer1000)
        ])
      .range([h - margin, margin])



    var svg = d3.select(this.miniGraphContainer.get(0))
      .selectAppend("svg")
      .attr("width", w)
      .attr("height", h)

    var testLine = d3.line()
      .x(function(d) {
        return x(d.date)
      })
      .y(function(d) {
        return y(+d.TEST_PER_1000)
      })

    var posLine = d3.line()
      .x(function(d) {
        return x(d.date)
      })
      .y(function(d) {
        return y(+d.POS_PER_1000)
      })

    var xAxis = d3.axisBottom(x)
        .ticks(4)
        .tickSize(0)
        .tickPadding(5)
        .tickFormat(d3.timeFormat("%-m/%-d"))

    var yAxis = d3.axisLeft(y)
        .ticks(4)
        .tickSize(0)
        .tickPadding(5)

    var gridLines = function(y) {
      return d3.axisLeft().scale(y)
      .ticks(6)
      // .tickValues([0, 100, 200, 300, 400, 500, 600, 600, 800, 900, 1000]);
    }

    if (d3.select(".g-axis").size() < 1) {
      var axisG = svg.append("g").attr("class", "g-axis");
      axisG.append("g")
        .attr("class", "minigraph-axis minigraph-axis-x")
        .attr("transform", "translate(0," + (h - margin) + ")")
        .call(xAxis);

      axisG.append("g")
        .attr("class", "minigraph-axis minigraph-axis-y")
        .attr("transform", "translate(" + margin + ", 0)")
        .call(yAxis);

      svg.append("g")
      .attr("class", "minigraph-axis-grid")
      .style("stroke-dasharray", ("2, 5"))
      .attr("transform", "translate(" + (margin + 3) + ",0)")
      .call(gridLines(y)
        .tickSize(-(w - 50))
        .tickFormat("")
      )

    }
    if (d3.select(".test-path").size() < 1) {
      svg.append("path")
        .datum(data)
        .attr("class", "test-path")
        .attr("stroke", "#444")
        .attr("stroke-width", 2)
        .attr("fill", "transparent")
        .attr("d", testLine)

      svg.append("path")
        .datum(data)
        .attr("class", "pos-path")
        .attr("stroke", "#d11800")
        .attr("stroke-width", 2)
        .attr("fill", "transparent")
        .attr("d", posLine)

      svg.append("text")
        .attr("class", "minigraph-endnum tp1000-endnum")
        .datum(data[data.length -1])
        .attr("x", w - 50)
        .attr("y", function(d) {
          return y(d.TEST_PER_1000) - 8;
        })
        .text(function(d) {
          return d.TEST_PER_1000.toFixed(1);
        })

      svg.append("text")
        .attr("class", "minigraph-endnum pp1000-endnum")
        .datum(data[data.length -1])
        .attr("x", w - 50)
        .attr("y", function(d) {
          return y(d.POS_PER_1000) - 8;
        })
        .text(function(d) {
          return d.POS_PER_1000.toFixed(1);
        })
    } else {
      d3.select(".test-path")
        .datum(data)
        .transition()
        .attr("d", testLine)

      d3.select(".pos-path")
        .datum(data)
        .transition()
        .attr("d", posLine)

      d3.select(".tp1000-endnum")
        .datum(data[data.length -1])
        .transition()
        .attr("y", function(d) {
          return y(d.TEST_PER_1000) - 10;
        })
        .text(function(d) {
          return d.TEST_PER_1000.toFixed(1);
        })

      d3.select(".pp1000-endnum")
        .datum(data[data.length -1])
        .transition()
        .attr("y", function(d) {
          return y(d.POS_PER_1000) - 10;
        })
        .text(function(d) {
          return d.POS_PER_1000.toFixed(1);
        })


    }

  }

});

propublica.views.zipLookup = propublica.View.extend({
  tag : "input",
  id : "zip-input",

  bindings : {
    change : 'findZip',
    keyup  : 'findZip',
    click  : 'findZip',
    paste  : 'findZip'
  },

  render : function() {
    $("#nyc-gfx").trigger("zipChosen", this.el.val());
  },

  findZip : function(e) {
    var cur = $(e.currentTarget);
    var curVal = cur.val();
    var inpLen = curVal.length;
    if (inpLen >= 5) {
      $("#nyc-gfx").trigger("zipChosen", curVal);
      // if (e.type === "keyup") {
      //   document.activeElement.blur();
      //   this.el.blur();
      // }
    } else {
      // didn't enter a 5 digit zip
    }
  }
});

propublica.views.mapToggle = propublica.View.extend({
  cssClass : "covid-map-toggle",

  bindings : {
    click : "clickTog"
  },

  clickTog : function(e) {
    e.preventDefault();
    var cur = $(e.currentTarget);
    var category = cur.attr("data-category");
    $("#nyc-gfx").trigger("setMapCategory", category);
    this.el.removeClass("button-on");
    cur.addClass("button-on");
  }

})