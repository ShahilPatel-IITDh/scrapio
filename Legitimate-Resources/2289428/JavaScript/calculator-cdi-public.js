jQuery(document).ready(function ($) {
	var myDailyBarChart, myDailyDonutChart;
	var imageUploadedUrl = '';
	var default_value1 = jQuery('.amount').val();
	var default_value2 = jQuery('.rate').val();
	var default_value3 = jQuery('.days').val();
	var default_value4 = jQuery('.reinvest').val();
	var default_value5 = jQuery('.include').val();
	jQuery("#dailyStartDate").datepicker();
	jQuery("#dailyStartDate").datepicker('setDate', new Date());
	jQuery('.albert_reset').click(function () {
		jQuery('.amount').val(default_value1);
		jQuery('.rate').val(default_value2);
		jQuery('.days').val(default_value3);
		jQuery('.reinvest').val(default_value4);
		jQuery('.include').val(default_value5);
		return !1
	});
	jQuery(document).on('click', '#btn_calculate_form', function () {
		jQuery('.main-2').css('display', 'block');
		truncateDecimals = function (number, digits) {
			var multiplier = Math.pow(10, digits), adjustedNum = number * multiplier,
				truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
			return truncatedNum / multiplier
		};
		var initial_amount_first = jQuery('.amount').val();
		var initial_amount_remove_chars = initial_amount_first.slice(1);
		var initial_amount1 = initial_amount_remove_chars;
		var initial_amount_tbl = initial_amount_remove_chars;
		var initial_amount = initial_amount_remove_chars;
		jQuery('#initial-amount').text(initial_amount);
		var interest_rate_first = jQuery('.rate').val();
		var interest_rate_remove_chars = interest_rate_first.substr(0, interest_rate_first.length - 1);
		var interest_rate = jQuery('.rate').val();
		var weekends = jQuery('.include').val();
		var days_first = jQuery('.days').val();
		var days_remove_chars = days_first.substr(0, days_first.length - 5);
		var startDate = jQuery('#dailyStartDate').val();
		var days1 = jQuery('.days').val();
		jQuery('.b-days').text(days1);
		var reinvest_rate = jQuery('.reinvest').val();
		var include1 = jQuery('.include').val();
		var endDate = '';
		var total_cash_out = 0;
		for (var i = 0; i < days1; i++) {
			var amount_grew = initial_amount * (interest_rate / 100);
			amount_grew = truncateDecimals(amount_grew, 2);
			var amount_grew_res = amount_grew * (reinvest_rate / 100);
			amount_grew_res = truncateDecimals(amount_grew_res, 2);
			var amount_add = parseFloat(initial_amount) + parseFloat(amount_grew_res);
			amount_add = (amount_add).toFixed(2);
			initial_amount = amount_add
		}
		jQuery('#withdrawals').text(withdrawals);
		jQuery('#amount_to_add').text(amount_add);
		var net_profit = withdrawals * 2;
		net_profit = (net_profit).toFixed(2);
		jQuery('#net_profit').text(net_profit);
		jQuery(".tbody_values").empty();
		var count = 1;
		var count2 = 0;

		function addDays(date, days) {
			var result = new Date(date);
			result.setDate(result.getDate() + days);
			return result
		}

		ctdate_format = function date2str(x, y) {
			var z = {M: x.getMonth() + 1, d: x.getDate(), h: x.getHours(), m: x.getMinutes(), s: x.getSeconds()};
			y = y.replace(/(M+|d+|h+|m+|s+)/g, function (v) {
				return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
			});
			return y.replace(/(y+)/g, function (v) {
				return x.getFullYear().toString().slice(-v.length)
			})
		}
		var xAxisValue = [];
		var earningsValue = [];
		var totalPrincipals = [];
		var initialBalances = [];
		jQuery('.tbody_values').append('<tr><td class="count">' + 0 + '</td><td class="date_tbl">' + startDate + '</td><td class="tbl_earnings">' + 0 + '</td><td class="tbl_reinvest">' + reinvest_rate + '%' + '</td><td class="tbl_principal">(<span class="red1">' + 0 + '</span>/<span class="green1">' + 0 + '</span>)</td><td class="total_principal">' + initial_amount1 + '</td><td class="total_cash">' + 0 + '</td></tr>');
		for (var i = 1; i <= days1; i++) {
			xAxisValue.push(i);
			initialBalances.push(initial_amount1);
			var va = reinvest_rate + '%';
			if (weekends == 'Yes') {
				var days1 = jQuery('.days').val();
				var newDatetbl = addDays(new Date(startDate), i);
				jQuery('.hidden1').text(newDatetbl);
				var abc = jQuery('.hidden1').text();
				var abc2 = abc.slice(0, 16);
				var formatedDate = ctdate_format(newDatetbl, 'MM/dd/yyyy')
			}
			if (weekends == 'No') {
				function calcWorkingDays1(fromDate, days) {
					var count = 0;
					while (count < days) {
						fromDate.setDate(fromDate.getDate() + 1);
						if (fromDate.getDay() == 6 || fromDate.getDay() == 0) {
						}
						if (fromDate.getDay() != 0 && fromDate.getDay() != 6) {
							count++
						}
					}
					return fromDate
				}

				var dt1 = calcWorkingDays1(new Date(startDate), i);
				jQuery('.hidden1').text(dt1);
				var abc = jQuery('.hidden1').text();
				var abc2 = abc.slice(0, 16);
				var formatedDate = ctdate_format(dt1, 'MM/dd/yyyy')
			}
			var earnings = initial_amount_tbl * (interest_rate / 100);
			earnings = (Math.round(earnings * 100) / 100).toFixed(2);
			var principal = earnings * (reinvest_rate / 100);
			principal = (principal).toFixed(2);
			var amount_add1 = parseFloat(initial_amount_tbl) + parseFloat(principal);
			amount_add1 = (Math.round(amount_add1 * 100) / 100).toFixed(2);
			var cash_out = earnings - principal;
			cash_out = (cash_out).toFixed(2);
			total_cash_out = parseFloat(total_cash_out) + parseFloat(cash_out);
			total_cash_out = truncateDecimals(total_cash_out, 2);
			var total_ca = total_cash_out.toString().split('.');
			if (typeof total_ca[1] !== 'undefined') {
				if (total_ca[1].length == 1) {
					total_cash_out = total_cash_out + '0'
				}
			} else {
				total_cash_out = total_cash_out + '.00'
			}
			var withdrawals = total_cash_out;
			jQuery('#withdrawals').text(withdrawals);
			var additional_amount = amount_add1 - initial_amount1;
			var net_profit = parseFloat(additional_amount) + parseFloat(total_cash_out);
			net_profit = truncateDecimals(net_profit, 2);
			var net_profi = net_profit.toString().split('.');
			if (typeof net_profi[1] !== 'undefined') {
				if (net_profi[1].length == 1) {
					net_profit = net_profit + '0'
				}
			} else {
				net_profit = net_profit + '.00'
			}
			jQuery('#net_profit').text(net_profit);
			jQuery('#amount_to_add').text(amount_add1);
			jQuery('.tbody_values').append('<tr><td class="count">' + i + '</td><td class="date_tbl">' + formatedDate + '</td><td class="tbl_earnings">' + earnings + '</td><td class="tbl_reinvest">' + va + '</td><td class="tbl_principal">(<span class="red1">' + principal + '</span>/<span class="green1">' + cash_out + '</span>)</td><td class="total_principal">' + amount_add1 + '</td><td class="total_cash">' + total_cash_out + '</td></tr>');
			earningsValue.push(earnings);
			totalPrincipals.push(amount_add1);
			if (i == days1)
				endDate = formatedDate;
			initial_amount_tbl = amount_add1
		}
		let canvasDaily = document.getElementById('dailyCompoundBarChart');
		let ctxDaily = canvasDaily.getContext('2d');
		if (myDailyBarChart != null)
			myDailyBarChart.destroy();
		ctxDaily.clearRect(0, 0, canvasDaily.width, canvasDaily.height);
		myDailyBarChart = new Chart(ctxDaily, {
			type: 'bar',
			data: {
				labels: xAxisValue,
				datasets: [{
					label: 'Initial Balance',
					data: initialBalances,
					backgroundColor: 'rgb(0, 86, 137)',
				}, {
					label: 'Total Principal',
					data: totalPrincipals,
					backgroundColor: 'rgb(128, 192, 230)',
				}, {label: 'Earnings', data: earningsValue, backgroundColor: 'rgb(0, 30 ,48)',},]
			},
			options: {
				plugins: {title: {display: !1, text: 'Compound Daily Result'},},
				responsive: !0,
				scales: {x: {stacked: !0,}, y: {stacked: !0}}
			}
		});
		let canvasDailyDonut = document.getElementById("dailyDonutChart");
		let ctxDailyDonut = canvasDailyDonut.getContext("2d");
		if (myDailyDonutChart != null)
			myDailyDonutChart.destroy();
		ctxDailyDonut.clearRect(0, 0, canvasDailyDonut.width, canvasDailyDonut.height);
		myDailyDonutChart = new Chart(ctxDailyDonut, {
			plugins: [ChartDataLabels],
			type: 'doughnut',
			data: {
				labels: ['Initial Balance', 'Earnings', 'Total Principal'],
				datasets: [{
					label: 'Initial Balance',
					data: [initial_amount1, earningsValue[earningsValue.length - 1], totalPrincipals[totalPrincipals.length - 1]],
					backgroundColor: ['rgb(0,86,137)', 'rgb(0, 30 ,48)', 'rgb(128, 192, 230)'],
				}]
			},
			options: {
				plugins: {
					title: {display: !1, text: 'Compound Deluxe Result'},
					legend: {display: !0, position: 'top', labels: {fontColor: 'rgb(255, 255, 255)'}},
					datalabels: {
						display: !0, backgroundColor: function (context) {
							return context.dataset.backgroundColor
						}, color: function (context) {
							return context.dataIndex == 1 || context.dataIndex == 0 ? '#fff' : 'white'
						}, font: {weight: 'bold'}, padding: 6, formatter: (value, ctx) => {
							return "$" + value
						}
					},
				}, responsive: !0, animation: {
					onComplete: function () {
					}
				}
			}
		});
		$('#initialBalance').text(initial_amount1);
		$('#interestRate').text(interest_rate + '%');
		$('#yearsOfGrowth').text(days1);
		$('#totalBalance').text(amount_add);
		$('#totalPayment').text(withdrawals);
		$('#tottalProfit').text(net_profit);

		function addDays1(theDate, days) {
			return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)
		}

		var newDate = addDays1(new Date(), 0);
		jQuery('#new-d').text(endDate);
		var cur_date = jQuery('#new-d').text();
		var new_date = cur_date.slice(0, 16);
		var newDatetbl = addDays(new Date(startDate), 0);
		jQuery('#t-date').text(startDate);
		var days1 = jQuery('.days').val();
		if (weekends == 'Yes') {
			function addDays(theDate, days) {
				return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)
			}

			var newDate = addDays(new Date(), days1);
			jQuery('#new-d').text(newDate);
			var abc = jQuery('#new-d').text();
			var abc2 = abc.slice(0, 16);
			jQuery('#new-d').text(endDate)
		}
		if (weekends == 'No') {
			function calcWorkingDays(fromDate, days) {
				var count = 0;
				while (count < days) {
					fromDate.setDate(fromDate.getDate() + 1);
					if (fromDate.getDay() != 0 && fromDate.getDay() != 6)
						count++
				}
				return fromDate
			}

			var newDate = calcWorkingDays(new Date(), days1);
			jQuery('#new-d').text(newDate);
			var abc = jQuery('#new-d').text();
			var abc2 = abc.slice(0, 16);
			jQuery('#new-d').text(endDate)
		}
		$('#dailySocialShare').hide();
		$('#dailyGraphData').hide()
	});
	jQuery(document).on('click', '#dailyTable', function () {
		jQuery('#dailyTableData').show();
		jQuery('#dailyEmailShare').show();
		jQuery('#dailyGraphData').hide();
		jQuery('#dailySocialShare').hide()
	});
	jQuery(document).on('click', '#dailyGraph', function () {
		jQuery('#dailyTableData').hide();
		jQuery('#dailyGraphData').show();
		jQuery('#dailySocialShare').show();
		jQuery('#dailyEmailShare').hide()
	});
	jQuery(document).on('click ', '#daily-share-em', function () {
		jQuery('#mySmallModalLabel').modal("show");
		jQuery('#modalBackdrop').css("display", "block");
		console.log('Modal Open')
	});
	jQuery(document).on('click ', '#daily-share-fb', function () {
		html2canvas(document.querySelector("#dailyDonutChartContainer")).then(canvas => {
			var myImage = canvas.toDataURL("image/png");
			var d = new Date();
			var n = d.getTime();
			var imageName = 'compound_daily_' + n + '.png';
			downloadURI(myImage, imageName, '2')
		})
	});
	jQuery(document).on('click ', '#daily-share-wa', function () {
		html2canvas(document.querySelector("#dailyDonutChartContainer")).then(canvas => {
			var myImage = canvas.toDataURL("image/png");
			var d = new Date();
			var n = d.getTime();
			var imageName = 'compound_daily_' + n + '.png';
			downloadURI(myImage, imageName, '1')
		})
	});
	jQuery(document).on('click ', '#daily-share-tw', function () {
		html2canvas(document.querySelector("#dailyDonutChartContainer")).then(canvas => {
			var myImage = canvas.toDataURL("image/png");
			var d = new Date();
			var n = d.getTime();
			var imageName = 'compound_daily_' + n + '.png';
			downloadURI(myImage, imageName, '3')
		})
	});
	jQuery(document).on('click ', '#daily-share-li', function () {
		html2canvas(document.querySelector("#dailyDonutChartContainer")).then(canvas => {
			var myImage = canvas.toDataURL("image/png");
			var d = new Date();
			var n = d.getTime();
			var imageName = 'compound_daily_' + n + '.png';
			downloadURI(myImage, imageName, '4')
		})
	});
	jQuery(document).on('click ', '#daily-share-pi', function () {
		html2canvas(document.querySelector("#dailyDonutChartContainer")).then(canvas => {
			var myImage = canvas.toDataURL("image/png");
			var d = new Date();
			var n = d.getTime();
			var imageName = 'compound_daily_' + n + '.png';
			downloadURI(myImage, imageName, '5')
		})
	});
	jQuery(document).on('click ', '#daily-share-download', function () {
		html2canvas(document.querySelector("#dailyDonutChartContainer")).then(canvas => {
			var myImage = canvas.toDataURL("image/png");
			var d = new Date();
			var n = d.getTime();
			var imageName = 'compound_daily_' + n + '.png';
			var link = document.createElement("a");
			link.download = imageName;
			link.href = myImage;
			link.click()
		})
	});

	function downloadURI(uri, name, type) {
		var subject = 'Compound Daily';
		var link = document.createElement("a");
		link.download = name;
		link.href = uri;
		var shareUrl = '';
		if (type == 1) {
			shareUrl = 'whatsapp://send?text='
		} else if (type == 2) {
			shareUrl = 'http://www.facebook.com/sharer.php?u='
		} else if (type == 3) {
			shareUrl = 'https://twitter.com/intent/tweet/?text='
		} else if (type == 4) {
			shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url='
		} else if (type == 5) {
			shareUrl = 'https://www.pinterest.com/pin/create/button/?url='
		}
		if (imageUploadedUrl == '') {
			jQuery.ajax({
				type: 'POST',
				url: ctajax_object.ajax_url,
				data: {'action': 'handle_my_file_upload', 'data': {image: uri, email: 'staff@compounddaily.org'}},
				success: function (response) {
					response = JSON.parse(response);
					imageUploadedUrl = response.response;
					window.open(shareUrl + response.response, 'Compound Daily', 'toolbar=0,status=0,width=626,height=436')
				},
				error: function (req, err) {
					console.log('my message =>  ' + JSON.stringify(req))
				}
			})
		} else {
			window.open(shareUrl + imageUploadedUrl, 'Compound Daily', 'toolbar=0,status=0,width=626,height=436')
		}
	}

	jQuery(document).on('click', '.albert_hide_show', function () {
		jQuery('.tbl-values').slideToggle()
	});
	jQuery('.inp1').mask('$00000000000');
	jQuery('.inp2').mask('aaaaaaaa', {'translation': {a: {pattern: /[0-9*.]/}}});
	jQuery('.inp3').mask('aaaaaaaaaaaaaaaaaa', {'translation': {a: {pattern: /[0-9*]/}}})
});
jQuery(document).on('click', '.send_email_ajaxfunction', function (e) {
	var pdf_arr = [];
	jQuery('.main-2').css('display', 'block');
	truncateDecimals = function (number, digits) {
		var multiplier = Math.pow(10, digits), adjustedNum = number * multiplier,
			truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
		return truncatedNum / multiplier
	};
	var initial_amount_first = jQuery('.amount').val();
	var initial_amount_remove_chars = initial_amount_first.slice(1);
	var initial_amount1 = initial_amount_remove_chars;
	var initial_amount_tbl = initial_amount_remove_chars;
	var initial_amount = initial_amount_remove_chars;
	var init_amount = initial_amount;
	jQuery('#initial-amount').text(initial_amount);
	var interest_rate_first = jQuery('.rate').val();
	var interest_rate_remove_chars = interest_rate_first.substr(0, interest_rate_first.length - 1);
	var interest_rate = jQuery('.rate').val();
	var startDate = jQuery('#dailyStartDate').val();
	var weekends = jQuery('.include').val();
	var days_first = jQuery('.days').val();
	var days_remove_chars = days_first.substr(0, days_first.length - 5);
	var days1 = jQuery('.days').val();
	var endDate = '';
	jQuery('.b-days').text(days1);
	var reinvest_rate = jQuery('.reinvest').val();
	var include1 = jQuery('.include').val();
	var total_cash_out = 0;
	for (var i = 0; i < days1; i++) {
		var amount_grew = initial_amount * (interest_rate / 100);
		amount_grew = truncateDecimals(amount_grew, 2);
		var amount_grew_res = amount_grew * (reinvest_rate / 100);
		amount_grew_res = truncateDecimals(amount_grew_res, 2);
		var amount_add = parseFloat(initial_amount) + parseFloat(amount_grew_res);
		amount_add = (amount_add).toFixed(2);
		initial_amount = amount_add
	}
	jQuery('#withdrawals').text(withdrawals);
	jQuery('#amount_to_add').text(amount_add);
	var net_profit = withdrawals * 2;
	net_profit = (net_profit).toFixed(2);
	jQuery('#net_profit').text(net_profit);
	var count = 1;
	var count2 = 0;
	pdf_arr.push(`<tr>
                <td style="border-bottom: 1px solid #91adb5; border-top: 1px solid #91adb5; border-right: 1px solid #91adb5; border-left: 1px solid #91adb5; text-align: center;">
                0
                </td>
                <td style="border-bottom: 1px solid #91adb5; border-top: 1px solid #91adb5; border-right: 1px solid #91adb5; border-left: 1px solid #91adb5; text-align: center;">
                ${startDate}
                </td>
                <td style="border-bottom: 1px solid #91adb5; border-top: 1px solid #91adb5; border-right: 1px solid #91adb5; border-left: 1px solid #91adb5; text-align: center; color: #8103A1;"><strong>
                0.00</strong>
                </td>
                <td style="border-bottom: 1px solid #91adb5; border-top: 1px solid #91adb5; border-right: 1px solid #91adb5; border-left: 1px solid #91adb5; text-align: center;">
                ${reinvest_rate}%
                </td>
                <td style="border-bottom: 1px solid #91adb5; border-top: 1px solid #91adb5; border-right: 1px solid #91adb5; border-left: 1px solid #91adb5; text-align: center;">
                (<span class="red1">
                0.00
                </span>/<span class="green1">
                0.00
                </span>)
                </td>
                <td  style="border-bottom: 1px solid #91adb5; border-top: 1px solid #91adb5; border-right: 1px solid #91adb5; border-left: 1px solid #91adb5; text-align: center; color: red;">
                <strong>
                ${initial_amount1}
                </strong>
                </td>
                <td style="border-bottom: 1px solid #91adb5; border-top: 1px solid #91adb5; border-right: 1px solid #91adb5; border-left: 1px solid #91adb5; text-align: center; color: #008000;">
                <strong> 0.00 </strong>
                </td></tr>`);
	for (var i = 1; i <= days1; i++) {
		var va = reinvest_rate + '%';
		if (weekends == 'Yes') {
			function addDaystbl(theDate, days) {
				return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)
			}

			var days1 = jQuery('.days').val();
			var newDatetbl = addDaystbl(new Date(startDate), i);
			jQuery('.hidden1').text(newDatetbl);
			var abc = jQuery('.hidden1').text();
			var abc2 = abc.slice(0, 16)
		}
		if (weekends == 'No') {
			function calcWorkingDays1(fromDate, days) {
				var count = 0;
				while (count < days) {
					fromDate.setDate(fromDate.getDate() + 1);
					if (fromDate.getDay() == 6 || fromDate.getDay() == 0) {
					}
					if (fromDate.getDay() != 0 && fromDate.getDay() != 6) {
						count++
					}
				}
				return fromDate
			}

			var dt1 = calcWorkingDays1(new Date(startDate), i);
			jQuery('.hidden1').text(dt1);
			var abc = jQuery('.hidden1').text();
			var abc2 = abc.slice(0, 16)
		}
		var earnings = initial_amount_tbl * (interest_rate / 100);
		earnings = (Math.round(earnings * 100) / 100).toFixed(2);
		var principal = earnings * (reinvest_rate / 100);
		principal = (principal).toFixed(2);
		var amount_add1 = parseFloat(initial_amount_tbl) + parseFloat(principal);
		amount_add1 = (Math.round(amount_add1 * 100) / 100).toFixed(2);
		var cash_out = earnings - principal;
		cash_out = (cash_out).toFixed(2);
		total_cash_out = parseFloat(total_cash_out) + parseFloat(cash_out);
		total_cash_out = truncateDecimals(total_cash_out, 2);
		var total_ca = total_cash_out.toString().split('.');
		if (typeof total_ca[1] !== 'undefined') {
			if (total_ca[1].length == 1) {
				total_cash_out = total_cash_out + '0'
			}
		} else {
			total_cash_out = total_cash_out + '.00'
		}
		var total_ca = total_cash_out.toString().split('.');
		if (typeof total_ca[1] !== 'undefined') {
			if (total_ca[1].length == 1) {
				total_cash_out = total_cash_out + '0'
			}
		} else {
			total_cash_out = total_cash_out + '.00'
		}
		var withdrawals = total_cash_out;
		jQuery('#withdrawals').text(withdrawals);
		var additional_amount = amount_add1 - initial_amount1;
		var net_profit = parseFloat(additional_amount) + parseFloat(total_cash_out);
		net_profit = truncateDecimals(net_profit, 2);
		var net_profi = net_profit.toString().split('.');
		if (typeof net_profi[1] !== 'undefined') {
			if (net_profi[1].length == 1) {
				net_profit = net_profit + '0'
			}
		} else {
			net_profit = net_profit + '.00'
		}
		jQuery('#net_profit').text(net_profit);
		jQuery('#amount_to_add').text(amount_add1);
		pdf_arr.push(`<tr>
                <td style="border-bottom: 1px solid #91adb5; border-top: 1px solid #91adb5; border-right: 1px solid #91adb5; border-left: 1px solid #91adb5; text-align: center;">
                ${i}
                </td>
                <td style="border-bottom: 1px solid #91adb5; border-top: 1px solid #91adb5; border-right: 1px solid #91adb5; border-left: 1px solid #91adb5; text-align: center;">
                ${format_date(abc)}
                </td>
                <td style="border-bottom: 1px solid #91adb5; border-top: 1px solid #91adb5; border-right: 1px solid #91adb5; border-left: 1px solid #91adb5; text-align: center; color: #8103A1;"><strong>
                ${earnings}</strong>
                </td>
                <td style="border-bottom: 1px solid #91adb5; border-top: 1px solid #91adb5; border-right: 1px solid #91adb5; border-left: 1px solid #91adb5; text-align: center;">
                ${va}
                </td>
                <td style="border-bottom: 1px solid #91adb5; border-top: 1px solid #91adb5; border-right: 1px solid #91adb5; border-left: 1px solid #91adb5; text-align: center;">
                (<span class="red1">
                ${principal}
                </span>/<span class="green1">
                ${cash_out}
                </span>)
                </td>
                <td  style="border-bottom: 1px solid #91adb5; border-top: 1px solid #91adb5; border-right: 1px solid #91adb5; border-left: 1px solid #91adb5; text-align: center; color: red;">
                <strong>
                ${amount_add1}
                </strong>
                </td>
                <td style="border-bottom: 1px solid #91adb5; border-top: 1px solid #91adb5; border-right: 1px solid #91adb5; border-left: 1px solid #91adb5; text-align: center; color: #008000;">
                <strong> ${total_cash_out} </strong>
                </td></tr>`);
		initial_amount_tbl = amount_add1;
		if (i == days1)
			endDate = format_date(abc)
	}

	function addDays1(theDate, days) {
		return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)
	}

	var newDate = addDays1(new Date(), 0);
	jQuery('#new-d').text(endDate);
	var cur_date = jQuery('#new-d').text();
	var new_date = cur_date.slice(0, 16);
	jQuery('#t-date').text(startDate);
	var days1 = jQuery('.days').val();
	if (weekends == 'Yes') {
		function addDays(theDate, days) {
			return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000)
		}

		var newDate = addDays(new Date(), days1);
		jQuery('#new-d').text(newDate);
		var abc = jQuery('#new-d').text();
		var abc2 = abc.slice(0, 16);
		jQuery('#new-d').text(endDate)
	}
	if (weekends == 'No') {
		function calcWorkingDays(fromDate, days) {
			var count = 0;
			while (count < days) {
				fromDate.setDate(fromDate.getDate() + 1);
				if (fromDate.getDay() != 0 && fromDate.getDay() != 6)
					count++
			}
			return fromDate
		}

		var newDate = calcWorkingDays(new Date(), days1);
		jQuery('#new-d').text(newDate);
		var abc = jQuery('#new-d').text();
		var abc2 = abc.slice(0, 16);
		jQuery('#new-d').text(endDate)
	}
	var to_email = jQuery('.email').val();
	if (to_email == "") {
		swal({title: "Error!", text: "The email field is required!", type: "warning",});
		return !1
	}
	jQuery.ajax({
		type: 'POST',
		url: ajax_object.ajax_url,
		data: {
			'action': 'albert_send_email',
			'data': {
				pdf_arr: pdf_arr,
				amount: init_amount,
				date: startDate,
				amount_to_add: amount_add1,
				new_d: endDate,
				withdrawals: withdrawals,
				b_days: days1,
				net_profit: net_profit,
				email: to_email
			}
		},
		success: function (response) {
			response = JSON.parse(response);
			jQuery('#mySmallModalLabel').modal('toggle');
			swal({title: "Success!", text: response.response, type: "success"}, function () {
				jQuery('input[name=email').val('');
				location.reload()
			})
		}
	})
});
jQuery(document).ready(function () {
	jQuery('.add_modal_click').on('click', function () {
		jQuery("#mySmallModalLabel").modal("show").appendTo("body")
	})
});

function format_date(date) {
	var date = new Date(date);
	var year = date.getFullYear();
	var month = ('0' + (date.getMonth() + 1)).slice(-2);
	var day = ('0' + date.getDate()).slice(-2);
	return formatted = month + "/" + day + "/" + year
}