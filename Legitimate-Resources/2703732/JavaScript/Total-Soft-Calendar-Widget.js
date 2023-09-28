function Event_Calendar(data,uniqueId,setMonth,setYear,dayQty,Ts_Calendar_id) {
	let CalData=data.split('TSCEv'),
	fullstartDate = CalData[0],
	startArr = fullstartDate.split("-"),
	startYear = startArr[0],
	startMonth = parseInt(startArr[1], 10),
	startDay = parseInt(startArr[2], 10),
	fullendDate = CalData[1],
	endArr = fullendDate.split("-"),
	endYear = endArr[0],
	endMonth = parseInt(endArr[1], 10),
	endDay = parseInt(endArr[2], 10),
	eventURL = CalData[2],
	eventTitle = CalData[3],
	eventColor = CalData[4],
	eventId = CalData[5],
	startTime = CalData[6],
	startSplit = startTime.split(":"),
	endTime = CalData[7],
	endSplit = endTime.split(":"),
	eventLink = '',
	startPeriod = 'AM',
	endPeriod = 'AM',
	eventDesc = CalData[9],
	eventImg = CalData[10],
	eventVid = CalData[11],
	eventImgP = CalData[12],
	eventTime = CalData[13],
	reccuredevent = CalData[14];
	eventColl = CalData[15];


	if(fullendDate == '--' || fullendDate == '')
	{
		fullendDate = '';
	}
	if(eventTime == '12')
	{
		if(parseInt(startSplit[0]) >= 12) {
			if(parseInt(startSplit[0]) >= 22)
			{
				 startTime = (startSplit[0] - 12)+':'+startSplit[1];
			}
			else
			{
				 startTime = '0'+(startSplit[0] - 12)+':'+startSplit[1];
			}
			 startPeriod = 'PM';
		}
		if(parseInt(startTime) == 0) {
			startTime = '12:'+startSplit[1];
		}
		if(parseInt(endSplit[0]) >= 12) {
			if(parseInt(endSplit[0]) >= 22){
				endTime = (endSplit[0] - 12)+':'+endSplit[1];
			}
			else
			{
				endTime = '0'+(endSplit[0] - 12)+':'+endSplit[1];
			}
			endPeriod = 'PM';
		}
		if(parseInt(endTime) == 0) {
			endTime = '12:'+endSplit[1];
		}
	}
	else
	{
		startPeriod = '';
		endPeriod = '';
	}
	if (eventURL){
	 	eventLink = 'href="'+eventURL+'"';
	}
	function multidaylist(){
		var timeHtml = '';
			if (startTime){
				var startTimehtml = '<div><div class="monthly-list-time-start">'+startTime+' '+startPeriod+'</div>';
				var endTimehtml = '';
				if (endTime){
					var endTimehtml = '<div class="monthly-list-time-end">'+endTime+' '+endPeriod+'</div>';
				}
				var timeHtml = startTimehtml + endTimehtml + '</div>';
			}
			jQuery('#'+uniqueId+' .monthly-list-item[data-number="'+i+'"]').addClass('item-has-event').append('<a href="'+eventURL+'" target="'+CalData[8]+'" class="listed-event listed-event-title listed-event-title'+ Ts_Calendar_id +'" data-eventid="'+ eventId +'" style="background:'+eventColor+'; color:'+eventColl+';" title="'+eventTitle+'">'+eventTitle+' '+timeHtml+'</a>');
			if(eventImg)
			{
				if(eventImgP == 'before')
				{
					if(!eventVid)
					{
						jQuery('#'+uniqueId+' .monthly-list-item[data-number="'+i+'"]').addClass('item-has-event').append('<div style="position: relative; width: 100%; margin: 10px auto; text-align: center;"><img src="'+eventImg+'" class="TotalSoftcalEvent_1_Media TotalSoftcalEvent_1_Media'+ Ts_Calendar_id +'"></div>');
					}
					else
					{
						jQuery('#'+uniqueId+' .monthly-list-item[data-number="'+i+'"]').addClass('item-has-event').append('<div style="position: relative; width: 100%; margin: 10px auto; text-align: center;"><div class="TotalSoftcalEvent_1_Mediadiv TotalSoftcalEvent_1_Mediadiv'+ Ts_Calendar_id +'"><iframe src="'+eventVid+'" class="TotalSoftcalEvent_1_Mediaiframe" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div></div>');
					}
				}
			}
			if(eventDesc)
			{
				jQuery('#'+uniqueId+' .monthly-list-item[data-number="'+i+'"]').addClass('item-has-event').append('<span class="listed-event-desc" data-eventid="'+ eventId +'" style="background:'+eventColor+'">'+eventDesc+'</span>');
			}
			if(eventImg)
			{
				if(eventImgP == 'after')
				{
					if(!eventVid)
					{
						jQuery('#'+uniqueId+' .monthly-list-item[data-number="'+i+'"]').addClass('item-has-event').append('<div style="position: relative; width: 100%; margin: 10px auto; text-align: center;"><img src="'+eventImg+'" class="TotalSoftcalEvent_1_Media TotalSoftcalEvent_1_Media'+ Ts_Calendar_id +'"></div>');
					}
					else
					{
						jQuery('#'+uniqueId+' .monthly-list-item[data-number="'+i+'"]').addClass('item-has-event').append('<div style="position: relative; width: 100%; margin: 10px auto; text-align: center;"><div class="TotalSoftcalEvent_1_Mediadiv TotalSoftcalEvent_1_Mediadiv'+ Ts_Calendar_id +'"><iframe src="'+eventVid+'" class="TotalSoftcalEvent_1_Mediaiframe" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div></div>');
					}
				}
			}
	}

	if (!fullendDate && startMonth == setMonth && startYear == setYear) {
		jQuery('#'+uniqueId+' *[data-number="'+startDay+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
		var timeHtml = '';
		if (startTime){
			var startTimehtml = '<div><div class="monthly-list-time-start">'+startTime+' '+startPeriod+'</div>';
			var endTimehtml = '';
			if (endTime){
				var endTimehtml = '<div class="monthly-list-time-end">'+endTime+' '+endPeriod+'</div>';
			}
			var timeHtml = startTimehtml + endTimehtml + '</div>';
		}
		jQuery('#'+uniqueId+' .monthly-list-item[data-number="'+startDay+'"]').addClass('item-has-event').append('<a href="'+eventURL+'" target="'+CalData[8]+'" class="listed-event listed-event-title listed-event-title'+ Ts_Calendar_id +'" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+' '+timeHtml+'</a>');
		if(eventImg)
		{
			if(eventImgP == 'before')
			{
			    if(!eventVid)
				{
					jQuery('#'+uniqueId+' .monthly-list-item[data-number="'+startDay+'"]').addClass('item-has-event').append('<div style="position: relative; width: 100%; margin: 10px auto; text-align: center;"><img src="'+eventImg+'" class="TotalSoftcalEvent_1_Media TotalSoftcalEvent_1_Media'+ Ts_Calendar_id +'"></div>');
				}
				else
				{
					jQuery('#'+uniqueId+' .monthly-list-item[data-number="'+startDay+'"]').addClass('item-has-event').append('<div style="position: relative; width: 100%; margin: 10px auto; text-align: center;"><div class="TotalSoftcalEvent_1_Mediadiv TotalSoftcalEvent_1_Mediadiv'+ Ts_Calendar_id +'"><iframe src="'+eventVid+'" class="TotalSoftcalEvent_1_Mediaiframe" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div></div>');
				}
			}
		}
	    if(eventDesc)
		{
			jQuery('#'+uniqueId+' .monthly-list-item[data-number="'+startDay+'"]').addClass('item-has-event').append('<span class="listed-event listed-event-desc" data-eventid="'+ eventId +'" style="background:'+eventColor+'">'+eventDesc+'</span>');
		}
		if(eventImg)
		{
			if(eventImgP == 'after')
			{
				if(!eventVid)
				{
					jQuery('#'+uniqueId+' .monthly-list-item[data-number="'+startDay+'"]').addClass('item-has-event').append('<div style="position: relative; width: 100%; margin: 10px auto; text-align: center;"><img src="'+eventImg+'" class="TotalSoftcalEvent_1_Media TotalSoftcalEvent_1_Media'+ Ts_Calendar_id +'"></div>');
				}
				else
				{
					jQuery('#'+uniqueId+' .monthly-list-item[data-number="'+startDay+'"]').addClass('item-has-event').append('<div style="position: relative; width: 100%; margin: 10px auto; text-align: center;"><div class="TotalSoftcalEvent_1_Mediadiv TotalSoftcalEvent_1_Mediadiv'+ Ts_Calendar_id +'"><iframe src="'+eventVid+'" class="TotalSoftcalEvent_1_Mediaiframe" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div></div>');
				}
			}
		}
	} else if (startMonth == setMonth && startYear == setYear && endMonth == setMonth && endYear == setYear){
		for(var i = parseInt(startDay); i <= parseInt(endDay); i++) {
			if (i == parseInt(startDay)) {
				jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
			} else {
				jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></div>');
			}
			multidaylist();
		}
	} else if ((endMonth == setMonth && endYear == setYear) && ((startMonth < setMonth && startYear == setYear) || (startYear < setYear))) {
		for(var i = 0; i <= parseInt(endDay); i++) {
			if (i==1){
				jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
			} else {
				jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></div>');
			}
														multidaylist();
		}
	}else if ((startMonth == setMonth && startYear == setYear) && ((endMonth > setMonth && endYear == setYear) || (endYear > setYear))){
		for(var i = parseInt(startDay); i <= dayQty; i++) {
			if (i == parseInt(startDay)) {
				jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
			} else {
				jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></div>');
			}
			multidaylist();
		}
	}else if (((startMonth < setMonth && startYear == setYear) || (startYear < setYear)) && ((endMonth > setMonth && endYear == setYear) || (endYear > setYear))){
		for(var i = 0; i <= dayQty; i++) {
			if (i == 1){
				jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
			} else {
				jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></div>');
			}
			multidaylist();
		}
	}
	if(reccuredevent == 'daily'){
		for(var i = 0; i <= dayQty; i++){
			if(startYear == setYear && startMonth == setMonth){
				if(i > parseInt(startDay)){
					jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
				}
			}
			else if((startYear == setYear && startMonth < setMonth) || startYear < setYear){
				jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
			}
			multidaylist();
		}
	}else if(reccuredevent == 'weekly'){
		sMonth = startMonth - 1;
		eMonth = endMonth - 1;
		var sdNamenum = new Date(startYear, sMonth, startDay, 0, 0, 0, 0).getDay();
		var edNamenum = new Date(endYear, eMonth, endDay, 0, 0, 0, 0).getDay();
		for(var i = 0; i <= dayQty; i++){
			if((!edNamenum && edNamenum !=0) || sdNamenum == edNamenum){
				if(startYear == setYear && startMonth == setMonth){
					if(i > parseInt(startDay)){
						if(new Date(startYear, sMonth, i, 0, 0, 0, 0).getDay() == sdNamenum){
							jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
							multidaylist();
						}
					}
				}else if((startYear == setYear && startMonth < setMonth) || startYear < setYear){
					if(new Date(setYear, setMonth-1, i, 0, 0, 0, 0).getDay() == sdNamenum){
						jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
						multidaylist();
					}
				}else{
					if(startYear == setYear && startMonth == setMonth){
						if(i > parseInt(endDay)){
							if(sdNamenum < edNamenum){
								if(new Date(startYear, sMonth, i, 0, 0, 0, 0).getDay() >= sdNamenum && new Date(endYear, eMonth, i, 0, 0, 0, 0).getDay() <= edNamenum){
									if(new Date(startYear, sMonth, i, 0, 0, 0, 0).getDay() == sdNamenum){
										jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
									}
									else
									{
										jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></div>');
									}
									multidaylist();
								}
							}else {
								if(new Date(startYear, sMonth, i, 0, 0, 0, 0).getDay() >= sdNamenum){
									if(new Date(startYear, sMonth, i, 0, 0, 0, 0).getDay() == sdNamenum){
										jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
									}
									else
									{
										jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></div>');
									}
									multidaylist();
								}
								if(new Date(endYear, eMonth, i, 0, 0, 0, 0).getDay() <= edNamenum){
									jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></div>');
									multidaylist();
								}
							}
						}
					}else if((startYear == setYear && startMonth < setMonth) || startYear < setYear){
						if(sdNamenum < edNamenum){
							if(new Date(setYear, setMonth-1, i, 0, 0, 0, 0).getDay() >= sdNamenum && new Date(setYear, setMonth-1, i, 0, 0, 0, 0).getDay() <= edNamenum){
								if(new Date(setYear, setMonth-1, i, 0, 0, 0, 0).getDay() == sdNamenum){
									jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
								}
								else
								{
									jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></div>');
								}
								multidaylist();
							}
						}else{
							if(new Date(setYear, setMonth-1, i, 0, 0, 0, 0).getDay() >= sdNamenum){
								if(new Date(setYear, setMonth-1, i, 0, 0, 0, 0).getDay() == sdNamenum){
									jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
								}else{
									jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></div>');
								}
								multidaylist();
							}
							if(new Date(setYear, setMonth-1, i, 0, 0, 0, 0).getDay() <= edNamenum){
								jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></div>');
								multidaylist();
							}
						}
					}
				}
			}
		}
	}else if(reccuredevent == 'monthly'){
		if(startDay > dayQty){
			startDay = dayQty;
		}
		if(endDay && endDay > dayQty){
			endDay = dayQty;
		}
		for(var i = 0; i <= dayQty; i++){
			if(((startYear == setYear && startMonth < setMonth) || startYear < setYear)){
				if(!endDay && i==parseInt(startDay)){
					jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
					multidaylist();
				}else if(parseInt(startDay) <= parseInt(endDay) && i >= parseInt(startDay) && i <= parseInt(endDay)){
					if (i == parseInt(startDay)) {
						jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
					} else {
						jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></div>');
					}
					multidaylist();
				}else if(parseInt(startDay) > parseInt(endDay)){
					if(i <= parseInt(endDay) && endMonth != setMonth){
						if (i==1){
							jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
						} else {
							jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></div>');
						}
						multidaylist();
					}else if(i>=parseInt(startDay)){
						if (i == parseInt(startDay)) {
							jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
						} else {
							jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></div>');
						}
						multidaylist();
					}
				}
			}
		}
	}else if(reccuredevent == 'yearly'){
		for(var i = 0; i <= dayQty; i++){
			if(startYear < setYear && (startMonth == setMonth || endMonth == setMonth)){
				if(!endDay && i==parseInt(startDay)){
					jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
					multidaylist();
				}else if(parseInt(startDay) <= parseInt(endDay) && i >= parseInt(startDay) && i <= parseInt(endDay)){
					if (i == parseInt(startDay)) {
						jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
					} else {
						jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></div>');
					}
					ultidaylist();
				}else if(parseInt(startDay) > parseInt(endDay)){
					if(i <= parseInt(endDay) && endMonth == setMonth){
						if (i==1){
							jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
						} else {
							jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></div>');
						}
						multidaylist();
					}else if(i>=parseInt(startDay) && startMonth == setMonth){
						if (i == parseInt(startDay)) {
							jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'">'+eventTitle+'</div>');
						} else {
							jQuery('#'+uniqueId+' *[data-number="'+i+'"] .monthly-indicator-wrap').append('<div class="monthly-event-indicator" data-eventid="'+ eventId +'" style="background:'+eventColor+'" title="'+eventTitle+'"></div>');
						}
						multidaylist();
					}
				}
			}
		}
	}
}