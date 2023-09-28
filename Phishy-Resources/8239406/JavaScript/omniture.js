(function loadSCode(undefined) {
	var lobMap = {
		DEFAULT: 'CV', //PCF
		PERSONAL_BANKING: 'CV',
		IMPERIAL_SERVICE: 'IS',
		CREDIT_ONLY: 'CC',
		PRIVATE_WEALTH: 'PWM',
		SMALL_BUSINESS_SIGNATORY: 'SB',
		SMALL_BUSINESS_CO_SIGNATORY: 'SB',
		SMALL_BUSINESS_DELEGATE: 'SB',
		SMALL_BUSINESS_UNKNOWN: 'SB'
	};

	function join(args) { return Array.prototype.join.call(args, '>'); }
	function clearVars() {
		s.linkTrackEvents = 'None';
		delete s['events'];
		//prev page name
		delete s['prop38'];
		//number of steps in the operation
		delete s['eVar43'];
		//processInlineErrors
		delete s['prop48'];
		//setPostSignonCustomLink
		delete s['eVar47'];
		delete s['prop33'];
		delete s['prop19'];
		delete s['prop49'];
		//service request
		delete s['prop40'];
		delete s['eVar40'];
		//NGA
		delete s['prop38'];
		//Navigation tracking
		delete s['eVar37'];
	}

	function setEvents() {
		var eventNames = Array.prototype.slice.call(arguments);
		return function() {
			for(var i = 0; i < eventNames.length; i++) {
				s.events = s.apl(s.events, eventNames[i], ',', 1);
			}
		};
	}

	var omniture = {
		business: ANALYTICS_DATA.brand.toUpperCase(),
		language: ANALYTICS_DATA.language.toUpperCase(),
		segment: ANALYTICS_DATA.segment,
		platform: ANALYTICS_DATA.platform,
		authentication: ANALYTICS_DATA.authenticated,
		section: ANALYTICS_DATA.section,
		currentPageName: '',
		sections: '',
		trackServiceRequest: function(stepName, steps) { 
			this.steps = steps;
			s.prop40 = 'D=v40';
			s.eVar40 = [this.platform, stepName, steps].join('>');
			s.linkTrackVars = s.apl(s.linkTrackVars, 'eVar40', ',', 1);
			s.linkTrackVars = s.apl(s.linkTrackVars, 'prop40', ',', 1);
		},
		trackTransaction: function(stepName, steps) {
			this.steps = steps;
			s.eVar43 = [this.platform, stepName, steps].join('>');
			s.prop48 = 'D=v43';
			s.linkTrackVars = s.apl(s.linkTrackVars, 'eVar43', ',', 1);
			s.linkTrackVars = s.apl(s.linkTrackVars, 'prop48', ',', 1);
		},
		setPostSignonCustomLink: function() {
			s.eVar47 = join(arguments);
			s.prop33 = 'D=v47';
			s.linkTrackVars = s.apl(s.linkTrackVars, 'eVar47', ',', 1);
			s.linkTrackVars = s.apl(s.linkTrackVars, 'prop33', ',', 1);
			s.linkTrackVars = s.apl(s.linkTrackVars, 'channel', ',', 1);
		},
		setPreSignonCustomLink: function() {
			s.eVar54 = join(arguments);
			s.prop25 = 'D=v54';
			s.linkTrackVars = s.apl(s.linkTrackVars, 'eVar54', ',', 1);
			s.linkTrackVars = s.apl(s.linkTrackVars, 'prop25', ',', 1);
			s.linkTrackVars = s.apl(s.linkTrackVars, 'channel', ',', 1);
		},
		setTransactionStep: function(currentStep, totalSteps) {
			if(currentStep == 1) {
				s.events = s.apl(s.events, 'event81', ',', 1);
				s.events = s.apl(s.events, 'event48', ',', 1);
			}

			s.events = s.apl(s.events, 'event8' + (2 + currentStep), ',', 1);

			if(currentStep == totalSteps) {
				s.events = s.apl(s.events, 'event82', ',', 1);
				s.events = s.apl(s.events, 'event49', ',', 1);
			}
		},
		setSelfserviceStep: function(currentStep, totalSteps) {
			if(currentStep == 1) {
				s.events = s.apl(s.events, 'event40', ',', 1);
				s.events = s.apl(s.events, 'event48', ',', 1);
			}

			s.events = s.apl(s.events, 'event4' + (1 + currentStep), ',', 1);

			if(currentStep == totalSteps && currentStep > 1) {
				s.events = s.apl(s.events, 'event41', ',', 1);
				s.events = s.apl(s.events, 'event49', ',', 1);
			}
		},
		transactionPurchase: setEvents('purchase', 'event90'),
		trackLink: function(selector, customizeFunc, flagAttributeName) {
			function trackLinkHandler() {
				clearVars();
				s.linkTrackVars = '';
				if(customizeFunc.call(this, omniture) !== false) {
					var linkName = s.eVar47 || s.eVar37 || s.eVar54;

					if(!linkName) {
						console.error('Omniture: link name not set');
					}

					var linkToCookie = "";
					if (linkName == s.eVar47){
						linkToCookie = 's.eVar47="'+linkName+'"';
					} else if (linkName == s.eVar37){
						linkToCookie = 's.eVar37="'+linkName+'"';
					} else if (linkName == s.eVar54){
						linkToCookie = 's.eVar54="'+linkName+'"';
					}

					var isExitLink = this.href && (this.href.indexOf(location.protocol + '//' + location.host) == -1);
					var isSsoLink = this.href && (this.href.indexOf("sso-submit") !== -1);
					var isITRC = this.href && (this.href.indexOf("itrc") !== -1);
					var doTrack = $(this).attr('doTrack') ? true : false;
					
					if ((isExitLink || isSsoLink || doTrack) && (!isITRC)){
						console.log('s.tl(', linkName, ')');
						s.tl(this, isExitLink? 'e': 'o', linkName, null, null);
					} else if (!isITRC) {
						s.Util.cookieWrite("s_linkPass", linkToCookie);
					}
					
				}
				s.linkTrackVars = '';
			}

			var links = $(selector);
			if(flagAttributeName) {
				links = links.filter(':not(' + flagAttributeName + ')').attr(flagAttributeName, true);
			}

			if(links.length == 0) {
				console.warn('Omniture: trackLink links not found', selector);
			}

			for(var link = $(links[0]), i = 0; i < links.length; i++, link = $(links[i])) {
				if(!link.data('omniture-tl')) {
					link.click(trackLinkHandler).data('omniture-tl', true);
				} //if
			} //for
		}
	};

	function omnitureSetup() {
		function startOmniture(jQuery) {
			var isAjax = !jQuery;
			clearVars();

			function continuation(params) {
			var trackMethod = processAnalyticsData(omniture, ANALYTICS_DATA, isAjax);

			//read cookie to see if "link clicked" info is passed from previous page then erase cookie
			eval(s.Util.cookieRead("s_linkPass"));
			s.Util.cookieWrite("s_linkPass","");
			
				switch(trackMethod) {
				case "page": 
					//Check that page is not Product Selector page (which has its own Omniture.js)
					if ((window.location.href.indexOf('ebm-mobile-pno/detail') == -1) && 
											(window.location.href.indexOf('ebm-mobile-pno/index') == -1) && 
											(window.location.href.indexOf('ebm-mobile-pno/bank') == -1)&& 
											(window.location.href.indexOf('ebm-mobile-pno/credit') == -1)&& 
											(window.location.href.indexOf('ebm-mobile-pno/sixty') == -1)&& 
											(window.location.href.indexOf('ebm-mobile-pno/internal') == -1)){
						console.log('s.t(', s.pageName, ')');
						s.t();
					}
					break;
				case "link":
					var customLink = s.eVar47 || s.eVar54;
				var linkToCookie = "";
				if (customLink == s.eVar47){
					linkToCookie = 's.eVar47="'+customLink+'"';
				} else if (customLink == s.eVar54){
					linkToCookie = 's.eVar54="'+customLink+'"';
				}

				var isExitLink = this.href && (this.href.indexOf(location.protocol + '//' + location.host) == -1);
				var isSsoLink = this.href && (this.href.indexOf("sso-submit") !== -1);
				var doTrack = this.attr('doTrack') ? true : false;
				
				if (isExitLink || isSsoLink || doTrack){
					console.log('s.tl(', customLink, ')');
					s.linkTrackEvents = !!s.events;
					s.tl(null, 'o', customLink, null, null);
				} else {
					s.Util.cookieWrite("s_linkPass", linkToCookie);
				}
					break;
				}
			}

			if(ANALYTICS_DATA.setData) {
				ANALYTICS_DATA.setData(ANALYTICS_DATA, continuation);
			}
			else {
				continuation();
			}
		}

		function processAnalyticsData(o, a, isAjax) {
			a.brand = a.brand.toUpperCase();
			a.language = a.language.toUpperCase();

			if(a.sections) {
				if(!isAjax) {
					a.sections.unshift(a.authenticated? 'OLB': 'PRE');
				}
				s.channel = join(a.sections);
			}
			else {
				console.error('Omniture: ANALYTICS_DATA.sections is missing');
			}

			s.pageName = join([a.brand,
			                   a.language,
			                   a.platform,
			                   s.channel,
			                   a.operation]);
			
			var isNga = a.sections && a.sections[a.sections.length - 1] == 'NGA';
			if(isNga) {
				s.events = s.apl(s.events, 'event10', ',', 1);
			}
			var isOTVCPrompt = isNga && !isAjax;
			if (isOTVCPrompt){
				//Track OTVC prompt for analytics
				trackOTVC('prompt');
			}

			var isOTVCSuccess = a.otvcStatus;
			if(isOTVCSuccess) {
				//Track OTVC success for analytics
				trackOTVC('success');
			}
			
			if(a.segment && a.segment.indexOf('SMALL_BUSINESS') == 0) {
				if (s.pageName.lastIndexOf('-SB') == -1) {
					s.pageName += '-SB';
				}
				if (s.channel.lastIndexOf('>SB') == -1) {
					s.channel += '-SB';
				}
				if (a.operation.lastIndexOf('-SB') == -1) {
					a.operation += '-SB';
				}
			}

			if(a.workflow) { //in transaction or self-service flow
				switch(a.workflow.type) {
				case "selfService":
					o.setSelfserviceStep(a.workflow.step, a.workflow.totalSteps);
					o.trackServiceRequest(a.workflow.stepName, a.workflow.totalSteps);
					break;
				case "transaction":
					o.setTransactionStep(a.workflow.step, a.workflow.totalSteps);
					o.trackTransaction(a.workflow.stepName, a.workflow.totalSteps);
					break;
				}


				if(a.data) {
					if(a.data.amount && (s.pageName.indexOf("E-TRANSFER-MONEY-REQUEST>DECLINE") == -1)) { //purchase
						o.transactionPurchase();
						//s.products=';[eVar43]>[FROM Account]_[TO Account/Company];[Quantity];[Total Price];event90=amount;'
						if(a.data.fromAccount && a.data.toAccount) { //transfer
							if(a.data.crossBorder){//crossborder transfer
								if(a.data.crossBorder == true){
									s.events = s.apl(s.events, 'event48', ',', 1);
									s.eVar41 = a.data.fromAccount+" ("+a.data.fromCurrency+"):"+a.data.toAccount+" ("+a.data.toCurrency+"):"+a.data.frequency;
								} 
							}
							//s.products=';{eVar43_[FROM ACCT TYPE]_[TO ACCT TYPE]};[quantity];[total price];event90=amount;'
							s.products = ';' + s.eVar43 + '_' + a.data.fromAccount + '_' + a.data.toAccount +
								';1;' + a.data.amount + ';event90=' + a.data.amount + ';';
						}
						else if(a.data.accountType) {
							//s.products='=;[eVar43]>[*FROM Account]_RECIPIENT;[Quantity];[Total Price];event90=amount;
							s.products = ';' + s.eVar43 + '_' + a.data.accountType + '_RECIPIENT' +
							';1;' + a.data.amount + ';event90=' + a.data.amount + ';';
						}
						else if(a.data.fromAccount) {
							//s.products=;[eVar43]>[FROM Account]_[TO Account/Company];[Quantity];[Total Price];event90=amount;
							s.products = ';' + s.eVar43 + '_' + a.data.fromAccount + '_' + a.data.payeeName +
							';1;' + a.data.amount + ';event90=' + a.data.amount + ';';
						}

						if(a.data.frequency) { //recurrency
							// {ENDING} values are: {X} TRANSFER | No End Date | {Custom Date} as FROM:YYYYMMDD-TO:YYYMMDD
							var ending = a.data.ending && a.data.ending != 'None'?
							             (!isNaN(a.data.ending) && a.data.starting? 'FROM:' + a.data.starting + '-TO:' + a.data.ending : a.data.ending) :
													 'No End Date';

							//s.prop33=s.eVar47='MWIOS>TRNSFR>TRANSFER 1>{HOW OFTEN}>{ENDING}';
							s.eVar47 = join([a.platform, a.workflow.name, a.workflow.stepName, a.data.frequency, ending]);

							s.prop33 = 'D=v47';
						}
					}
					else if(a.data.payeeName) { //upcoming transactions
						s.eVar47 = [a.platform, a.workflow.stepName, 'TO_PAYEE', a.data.fromAccount, a.data.frequency].join('>');
						s.prop33 = 'D=v47';
					}
					else if(a.data.upcomingTxType) { //cancel upcoming transaction
						//s.prop33=s.eVar47='MWIOS> CANCEL UPCOMING TRANS DETAILS 2><PAYEE>><FROM>>><FREQUENCY>'
						var txTo = ({'BILL_PAYMENT':'TO_PAYEE', 'TRANSFER':a.data.toAccount})[a.data.upcomingTxType];
						s.eVar47 = [a.platform, a.workflow.stepName, txTo, a.data.fromAccount, a.data.frequency].join('>');
						s.prop33 = 'D=v47';
					}
				} //if(a.data)
			} //if(a.workflow)

			if(a.data) {
				if(a.data.AccountTypes) {
					var lob = lobMap[a.segment];
					s.eVar18 = a.data.AccountTypes.split(',').map(function(t) { return lob + '>' + t }).join('|');
					s.prop37 = 'D=v18';
					s.linkTrackVars = s.apl(s.linkTrackVars, 'eVar18', ',', 1);
					s.linkTrackVars = s.apl(s.linkTrackVars, 'prop37', ',', 1);
				}
				if(a.data.loginState) {
					//add sections[] here
					s.eVar47 = [a.platform].concat(a.sections).concat([a.operation, a.data.loginState]).join('>');
					s.prop33 = 'D=v47';
				}
			}

			if(a.customLinks) {
				a.customLinks.forEach(function(l) {
					o.trackLink('#' + l.id, function(o) {
						var values = {'$a': ANALYTICS_DATA},
							linkName = l.name.replace(/\$[a-zA-Z\.]+/g, function(p) {
								var props = p.split('.');
								for(var i = 0, o = values;  i < props.length; i++) {
									o = o[props[i]];
								}
								return o;
							});
						
						//NGA tracking
						if(linkName.indexOf('METHOD') == 0 || linkName.indexOf('SEND') == 0 || linkName.indexOf('SENT') == 0) {
							linkName += " " + a.data.ngaContactMethod;
						}
						if(linkName.indexOf('SENT') == 0) {
							var operation = 'NGA SENT';
							if(a.segment && a.segment.indexOf('SMALL_BUSINESS') == 0) {
								operation += '-SB';					
							}
							a.operation = operation;
						}
						
						//Receive e-Transfers landing page
						if(linkName.indexOf('EMT-RECEIVE') == 0) {
							var selection = $('section > button').filter('.selected').data('value');
							o.setPreSignonCustomLink(a.platform, 'E-TRANSFER RECEIVE', selection);
							return;
						}
						
						switch(l.type) {
						case "LINK":
						case "ABANDON":
							if(a.authenticated) {
								o.setPostSignonCustomLink(a.platform, a.operation, linkName);
							}
							else {
								o.setPreSignonCustomLink(a.platform, a.operation, linkName);
							}
							break;
						case "DRAWER":
							s.eVar37 = ['DRAWER', omniture.platform, linkName].join('>');
							s.linkTrackVars = s.apl(s.linkTrackVars, 'eVar37', ',', 1);
							break;
						}
					});
				});
			} // if(a.customLinks)

			s.eVar64 = (a.authenticated? "" : "non ") + "authenticated";
			s.prop35 = 'D=v64';

			s.eVar63 = a.platform;
			s.prop34 = 'D=v63';

			var prop5 = s.c_r('s_pv');
			if(prop5) {
				if(prop5.indexOf('>NGA>') == -1) {
					s.prop38 = prop5;
					s.c_w('p38', s.prop38);
				}
				else {
					s.prop38 = s.c_r('p38');
				}
				s.linkTrackVars = s.apl(s.linkTrackVars, 'prop38', ',', 1);

				if(a.data && /\+SEARCH$/.test(prop5)) {
					s.prop27 = [s.channel,
					            'SEARCH',
											a.data.dateRange,
											'AMTRANGE-' + ((+a.data.lowerLimit || +a.data.upperLimit)? 'SET': 'NOTSET'),
											a.data['transaction-type'],
											a.data['transaction-method']
										 ].join('>');
				}
			}

			if(a.errors) {
				var isInline = a.errors.every(function(e) { return e.field });
				s.prop19 = a.errors.map(function(e) {
					return (e.type=='error'? 'E-':'W-') + e.code
				}).join('|');
				s.linkTrackVars = s.apl(s.linkTrackVars, 'prop19', ',', 1);

				if(a.authenticated) {
					o.setPostSignonCustomLink(a.platform, a.operation);
				}
				else {
					o.setPreSignonCustomLink(a.platform, a.operation);
				}

				if(a.workflow) {
					switch(a.workflow.type) {
					case "transaction":
						o.trackTransaction(a.workflow.stepName, a.workflow.totalSteps);
						break;
					case "selfService":
						o.trackServiceRequest(a.workflow.stepName, a.workflow.totalSteps);
						break;
					}
				}
				else {
					o.trackServiceRequest(a.operation, 1);
				}

				if(isInline) {
					var customLink = s.eVar47 || s.eVar54;
					console.log('s.tl(', customLink, ',', s.prop19, ')');
					s.linkTrackEvents = !!s.events;
					s.linkTrackVars = s.apl(s.linkTrackVars, 'prop5', ',', 1);
					s.linkTrackVars = s.apl(s.linkTrackVars, 'prop38', ',', 1);
					s.tl(null, 'o', customLink, null, null);
					return null;
				}
			} // if(a.errors)

			if(s.pageName.indexOf("CONFIRM") != -1){
				s.purchaseID = $('#ref-number > span:last-of-type').text();
				s.purchaseID += "_" + String(Math.floor(Date.now() / 1000));
				console.log("O purchaseID = " + s.purchaseID);
			}
			if(ANALYTICS_DATA.segment != undefined){
				var trackSegment = ANALYTICS_DATA.segment;
				if (trackSegment == "PERSONAL_BANKING"){
					trackSegment = "pb";
				} else if (trackSegment == "IMPERIAL_SERVICE"){
					trackSegment = "is";
				} else if (trackSegment == "CREDIT_ONLY"){
					trackSegment = "cc";
				} else if (trackSegment == "PRIVATE_WEALTH"){
					trackSegment = "pwm";
				} else if (trackSegment == "SMALL_BUSINESS_SIGNATORY"){
					trackSegment = "sbs";
				} else if (trackSegment == "SMALL_BUSINESS_CO_SIGNATORY"){
					trackSegment = "sbc";
				} else if (trackSegment == "SMALL_BUSINESS_DELEGATE"){
					trackSegment = "sbd";
				} else if (trackSegment == "SMALL_BUSINESS_UNKNOWN"){
					trackSegment = "sbu";
				}
				if (ANALYTICS_DATA.ccLevel != undefined){
					if (trackSegment == "cc" && ANALYTICS_DATA.ccLevel != "null"){
						trackSegment+=":"+ANALYTICS_DATA.ccLevel;
					}
				}
				s.prop19 = s.eVar19 = trackSegment;
			}

			o.trackLink('a[href^="tel:"]', function() {
				s.events = s.apl(s.events, 'event30', ',', 1);
				s.linkTrackEvents = s.apl(s.linkTrackEvents, 'event30', ',', 1);
				if(ANALYTICS_DATA.authenticated) {
					o.setPostSignonCustomLink(o.platform, this.textContent);
				}
				else {
					o.setPreSignonCustomLink(o.platform, this.textContent);
				}
			}, 'data-tracking-tel-active');

			return "page";
		} //processAnalyticsData()

		if(window.Wicket && Wicket.Event) {
			Wicket.Event.subscribe('/ajax/call/complete', function omnitureAjaxCompleteCallback(event, node, xhr) {
				if(ANALYTICS_DATA.submitData) {
					ANALYTICS_DATA.submitData = false;
					startOmniture(false);
				}
			});
		}
		
		function trackOTVC(action) {
            s.linkTrackVars='events';
            if (action == 'prompt') {
                s.linkTrackEvents = 'event111';
                s.events = 'event111';
            } else if (action == 'success') {
                s.linkTrackEvents = 'event112';
                s.events = 'event112';
            }  
            s.tl(this,'o','OTVC ' + action);
            clearVars();
        }
		
		$(document).ready(startOmniture);
	} //omnitureSetup()
	omnitureSetup();
	return omniture;
})();
