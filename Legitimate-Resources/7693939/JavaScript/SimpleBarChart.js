(function () {
    $(document).ready(function () {
        var i, len;

        if (MXT.charts) {
            // Radialize the colors
            Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
                return {
                    radialGradient: {
                        cx: 0.5,
                        cy: 0.3,
                        r: 0.7
                    },
                    stops: [
                        [0, color],
                        [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                    ]
                };
            });

            for (i = 0, len = MXT.charts.length; i < len; i++) {
                $('.' + MXT.charts[i].name).highcharts(MxChart(MXT.charts[i].data));
            }
        }
    });
    

    // Build the chart
    function MxChart(jsonData) {
        var i, len;
        var chartCategories = [];
        var chartData = [];

        for (i = 0, len = jsonData.length; i < len; i++) {
            chartCategories.push(jsonData[i].Name);
            chartData.push(jsonData[i].Value);
        }

        var _chart = {
            chart: {
                type: 'bar',
                animation: false,
                height: 200
            },
            title: {
                text: null
            },
            tooltip: {
                pointFormat: '<b>{point.y}</b>'
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    animation: false,
                    color: '#e39346',
                    showInLegend: false,
                    maxPointWidth: 30,
                    dataLabels: {
                        enabled: true,
                        align: 'left',
                        color: '#444444',
                        format: '{point.y}'
                    }
                }
            },
            series: [{
                data: chartData
            }],
            xAxis: {
                endOnTick: true,
                categories: chartCategories,
                labels: {
                    style: {
                        color: '#000000'
                    }
                }
            },
            yAxis: {
                allowDecimals: false,
                title: {
                    text: null
                },
                labels: {
                    style: {
                        color: '#000000'
                    }
                }
            },
            credits: {
                enabled: false
            }
        };

        return _chart;
    }
})();