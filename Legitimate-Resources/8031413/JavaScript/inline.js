
        //
        var ReturncurrentControlID = 'None';
        //
        $('.row .btn').on('click', function () {
            var self = $(this);
            var selfID = self.attr('id');
            var divGrp = selfID.substring(0, 3);
            //alert(divGrp);

            $('.row .btn').each(function () {
                var self2 = $(this);
                var selfID2 = self2.attr('id');
                try {
                    if ((selfID2 != null) && (selfID2.substring(0, 3) == divGrp)) {
                        self2.removeClass('selectgreen');
                        self2.removeClass('selectgrey');
                        self2.removeClass('selectred');
                        //self.addClass('btn-primary');
                        self2.addClass('defaultSelection');
                        //alert(selfID2);
                    }
                }
                catch (msg) {
                    var sError = msg;
                }
            });
            if (self != null) {
                //
                var selfValue = selfID.substr(3, 2);
                //
                if ((self.hasClass('selectred')) ||
                    (self.hasClass('selectgrey')) ||
                    (self.hasClass('selectgreen'))
                    ) {
                    self.removeClass('selectgreen');
                    self.removeClass('selectgrey');
                    self.removeClass('selectred');
                    self.removeClass('defaultSelection');
                }
                else {
                    //alert(selfID.substr(0, 3));
                    if (selfID.substr(0, 3) == 'Q02') {
                        if (
                            (selfValue == 'Ye') ||
							(selfValue == 'So') ||
                            (selfValue == '00') ||
                            (selfValue == '01') ||
                            (selfValue == '02') ||
                            (selfValue == '03') ||
                            (selfValue == '04') ||
                            (selfValue == '05') ||
                            (selfValue == '06')

                           ) {
                            self.removeClass('defaultSelection');
                            self.addClass('selectred');
                            $(':focus').blur()
                        }
                        else if (
                            (selfValue == '07') ||
                            (selfValue == '08')
                            ) {
                            self.removeClass('defaultSelection');
                            self.addClass('selectgrey');
                            $(':focus').blur()
                        }
                        else {
                            if (
                                (selfValue == '09') ||
                                (selfValue == '10')
                                ) {
                                self.removeClass('defaultSelection');
                                self.addClass('selectgreen');
                                $(':focus').blur()
                            }
                        }
                    }
                    else {
                        if (
                            (selfValue == '00') ||
                            (selfValue == '01') ||
                            (selfValue == '02') ||
                            (selfValue == '03') ||
                            (selfValue == '04') ||
                            (selfValue == '05') ||
                            (selfValue == '06') ||
                            (selfValue == '07') ||
                            (selfValue == '08')
                           ) {
                            self.removeClass('defaultSelection');
                            self.addClass('selectgrey');
                        }
                        else if ((selfValue == 'No')) {
                            self.removeClass('defaultSelection');
                            self.addClass('selectred');
                        }
                        else {
                            if (
                                (selfValue == 'Ye') ||
								(selfValue == 'So') ||
								(selfValue == 'NA') ||
                                (selfValue == '09') ||
                                (selfValue == '10') ||
								(selfValue == '11')
                                ) {
                                self.removeClass('defaultSelection');
                                self.addClass('selectgreen');
                            }
                        }
                    }
                }
                $(':focus').blur()
                return;
            }
        });
		
		$('#btnComplaint').on('click', function () {
			$('#btnComplaint').addClass('btn btn selectbad col-sm-5');
			var respondentIDs = document.getElementById('hdnRespondentID');
            var respondentID = respondentIDs.value;

            var viewportLeft = window.screen.width / 2 - 150;
            var viewportRight = window.screen.height / 2 - 250;
            popupWindow = window.open("InterviewAlertsManagementOnline.aspx?InterviewID=0&RespondentID=" + respondentID + "&AlertTypeID=1", 'popUpWindow', 'height=350,width=500,left=' + viewportLeft + ',top=' + viewportRight + ',resizable=No,scrollbars=Yes,toolbar=no,menubar=no,location=no,directories=no, status=No');
			return false;
			
		});
		
		$('#btnCompliment').on('click', function () {
			$('#btnCompliment').addClass('btn btn selectgood col-sm-5');
			var respondentIDs = document.getElementById('hdnRespondentID');
            var respondentID = respondentIDs.value;

            var viewportLeft = window.screen.width / 2 - 150;
            var viewportRight = window.screen.height / 2 - 250;
            popupWindow = window.open("InterviewAlertsManagementOnline.aspx?InterviewID=0&RespondentID=" + respondentID + "&AlertTypeID=2", 'popUpWindow', 'height=350,width=500,left=' + viewportLeft + ',top=' + viewportRight + ',resizable=No,scrollbars=Yes,toolbar=no,menubar=no,location=no,directories=no, status=No');
			return false;
		});
		
		$('#btnComplaintDone').on('click', function () {
			$('#btnComplaintDone').addClass('btn btn selectbad col-sm-5');
			var respondentIDs = document.getElementById('hdnRespondentID');
            var respondentID = respondentIDs.value;

            var viewportLeft = window.screen.width / 2 - 150;
            var viewportRight = window.screen.height / 2 - 250;
            popupWindow = window.open("InterviewAlertsManagementOnline.aspx?InterviewID=0&RespondentID=" + respondentID + "&AlertTypeID=1", 'popUpWindow', 'height=350,width=500,left=' + viewportLeft + ',top=' + viewportRight + ',resizable=No,scrollbars=Yes,toolbar=no,menubar=no,location=no,directories=no, status=No');
			return false;
			
		});
		
		$('#btnComplimentDone').on('click', function () {
			$('#btnComplimentDone').addClass('btn btn selectgood col-sm-5');
			var respondentIDs = document.getElementById('hdnRespondentID');
            var respondentID = respondentIDs.value;

            var viewportLeft = window.screen.width / 2 - 150;
            var viewportRight = window.screen.height / 2 - 250;
            popupWindow = window.open("InterviewAlertsManagementOnline.aspx?InterviewID=0&RespondentID=" + respondentID + "&AlertTypeID=2", 'popUpWindow', 'height=350,width=500,left=' + viewportLeft + ',top=' + viewportRight + ',resizable=No,scrollbars=Yes,toolbar=no,menubar=no,location=no,directories=no, status=No');
			return false;
		});
		
		$('#Q0700').on('click', function () {
			//alert("Hallo");
			$('#showDiv2').show();
			ShowLeftRightDivs();
		});
		
		$('#Q0701').on('click', function () {
			//alert("Hallo");
			$('#showDiv2').show();
			ShowLeftRightDivs();
		});
				
		$('#Q0702').on('click', function () {
			//alert("Hallo");
			$('#showDiv2').show();
			ShowLeftRightDivs();
		});
		
		$('#Q0703').on('click', function () {
			//alert("Hallo");
			$('#showDiv2').show();
			ShowLeftRightDivs();
		});
		
		$('#Q0704').on('click', function () {
			//alert("Hallo");
			$('#showDiv2').show();
			ShowLeftRightDivs();
		});
		
		$('#Q0705').on('click', function () {
			//alert("Hallo");
			$('#showDiv2').show();
			ShowLeftRightDivs();
		});
		
		$('#Q0706').on('click', function () {
			//alert("Hallo");
			$('#showDiv2').hide();
			ShowLeftRightDivs();
		});
		
		$('#Q0707').on('click', function () {
			//alert("Hallo");
			$('#showDiv2').hide();
			ShowLeftRightDivs();
		});
		
		$('#Q0708').on('click', function () {
			//alert("Hallo");
			$('#showDiv2').hide();
			ShowLeftRightDivs();
		});
		
		$('#Q0709').on('click', function () {
			//alert("Hallo");
			$('#showDiv2').hide();
			ShowLeftRightDivs();
		});
		
		$('#Q0710').on('click', function () {
			//alert("Hallo");
			$('#showDiv2').hide();
			ShowLeftRightDivs();
		});
		
		$('#Q10Yes').on('click', function () {
			//alert("Hallo");
			$('#showDiv3').show();
			ShowLeftRightDivs();
		});
		
		$('#Q10No').on('click', function () {
			//alert("Hallo");
			$('#showDiv3').hide();
			ShowLeftRightDivs();
		});
		
		$('#Q14Yes').on('click', function () {
			//alert("Hallo");
			$('#showDiv4').hide();
			ShowLeftRightDivs();
		});
		
		$('#Q14No').on('click', function () {
			//alert("Hallo");
			$('#showDiv4').show();
			ShowLeftRightDivs();
		});
	
        // Submit the form
        $('#submitButton').on('click', function () {
            //Get form data
            //
			//alert('Hallo');
			
            var resultingData = '';
			var Q10Answer = '';
			var Q7Answer = '';
			var Q14Answer = '';

            //Q1 -
            ReturncurrentControlID = 'Q01Yes';
			
			var ValueDBS = document.getElementById('hdnDBS').value;
           
			var commentText = document.getElementById('txtComment');
            var commentTextValue = commentText.value;
			
			var commentText2 = document.getElementById('txtComment2');
            var commentTextValue2 = commentText2.value;
			
			var commentText3 = document.getElementById('txtComment3');
            var commentTextValue3 = commentText3.value;
						
			if (ReturncurrentControlID == 'Q01Yes') {
			
				for (var i = 2; i <= 15; i++) {
					ReturncurrentControlID = 'None';
					if (i < 10) {
						GetSelectedValue('Q0' + i);
					}
					else {
						GetSelectedValue('Q' + i);
					}
					
					if (i == 7)
					{
						Q7Answer = ReturncurrentControlID;
					}
					
					if (i == 10)
					{
						Q10Answer = ReturncurrentControlID;
					}
					
					if (i == 11)
					{
						if (Q10Answer == "Q10No")
						{
							ReturncurrentControlID = "Q1111";
						}
					}
					
					if (i == 14)
					{
						Q14Answer = ReturncurrentControlID;
					}
					
					if (ReturncurrentControlID == 'None') {
						alert('Please complete all fields!');
						$('#submitButton').addClass('btn btn selectgreen col-xs-12');
						return;
						
					}
					
					

					resultingData = resultingData + ReturncurrentControlID + '|';
				}
				
				commentTextValue = commentTextValue.replace(/'/g, "*apos*");
				commentTextValue = commentTextValue.replace(/\\/g, "*back*");
				
				commentTextValue2 = commentTextValue2.replace(/'/g, "*apos*");
				commentTextValue2 = commentTextValue2.replace(/\\/g, "*back*");
				
				commentTextValue3 = commentTextValue3.replace(/'/g, "*apos*");
				commentTextValue3 = commentTextValue3.replace(/\\/g, "*back*");
				
				
				if ((Q7Answer == "Q0700") || (Q7Answer == "Q0701") || (Q7Answer == "Q0702") || (Q7Answer == "Q0703") || (Q7Answer == "Q0704") || (Q7Answer == "Q0705"))
				{
					if (commentTextValue2.trim().length == 0) 
					{
						alert('Please provide us with a valid answer to the reason for your rating in question "The consultant was knowledgeable and provided the right expertise to address my banking needs."');
						$('#submitButton').addClass('btn btn selectgreen col-xs-12');
						return;
					}
				}
				else
				{
					commentTextValue2 = "";
				}
				
				if ((Q14Answer == "Q14No"))
				{
					if (commentTextValue3.trim().length == 0) 
					{
						alert('Please provide us with a valid answer to the reason for your answer to question "Was the Call Centre your first channel of choice to resolve your issue?".');
						$('#submitButton').addClass('btn btn selectgreen col-xs-12');
						return;
					}
				}
				else
				{
					commentTextValue3 = "";
				}
				
				
				
				
				
				
			
				
			
			}
			else 
			{
				commentTextValue = "";
				commentTextValue2 = "";
				commentTextValue3 = "";
				
				
			}
			
			var RespondentID = document.getElementById('hdnRespondentID');
            var RespondentIDValue = RespondentID.value;

			
            //var commentText = document.getElementById('txtComment');
            //var commentTextValue = commentText.value;
            

            //alert(resultingData);
            //alert(commentTextValue);
            //alert(RespondentIDValue);

            $.ajax({
                url: 'ABSAEBContactCenterEng.aspx/SaveInterview',
                type: 'POST',
                data: "{'commentTextValue':'" + commentTextValue + "','commentTextValue2':'" + commentTextValue2 + "','commentTextValue3':'" + commentTextValue3 + "','RespondentIDValue':'" + RespondentIDValue + "', 'resultingData':'" + resultingData + "'}",
                datatype: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (result) { success(result); },
                error: function (result) { error(result); }
            });

        });

       
		
		function success(result) {
            //alert('Completed!');
			
			var RespondentID = document.getElementById('hdnRespondentID');
            var RespondentIDValue = RespondentID.value;
			
			window.open('ABSAEBContactCenterEng.aspx?ID=-1&RespID=' + RespondentIDValue , '_self');

            //$(".panel").slideToggle("slow");

            //document.getElementById('divComplete').style.display = "none";
            //document.getElementById('tblMain').style.display = "none";
            //document.getElementById('divQuotaReached').style.display = "none";

            //document.getElementById('divQuotaReached').style.display = "block";
            ////$('divCompleted').show();


        }

        function error(result) {
            //alert('An error occured!');
            alert(result.responseText);
        }

        function GetSelectedValue(q) {
            //
            $('.row .btn').each(function () {
                var currentControl = $(this);
                var currentControlID = currentControl.attr('id');

                try {
                    if ((currentControl != null) && (currentControlID.substring(0, 3) == q)) {
                        if ((currentControl.hasClass('selectgreen')) ||
                            (currentControl.hasClass('selectgrey')) ||
                            (currentControl.hasClass('selectred'))) {
                            //alert(currentControlID);
                            ReturncurrentControlID = currentControlID;
                            return;
                        }
                    }
                }
                catch (msg) {
                    var sError = msg;
                    //alert(sError);
                }
            });
        }

        //$(document).ready(function () {
        //    alert($('#divRightMain').height);
        //    $('#divRightMain').height = $('#divCentertMain').height;
        //    $('#divLeftMain').height = $('#divCentertMain').height;
        //    alert($('#divRightMain').height);


        //});

        $(document).ready(function () {
			if(performance.navigation.type == 2){
				location.reload(true);
			}
          
			ShowLeftRightDivs();
			$('#showDiv2').hide();
			$('#showDiv3').hide();
			$('#showDiv4').hide();
			
        });
		
		$(window).bind("pageshow", function(event) {
			if (event.originalEvent.persisted) {
				window.location.reload() 
			}
		});

        function ShowLeftRightDivs() {
            var heights = $("#divCentreMain").height();
            $("#divRightMain").height(heights);
            $("#divLeftMain").height(heights);
        }

        $(window).load(function () {
            DocumentReady();
        });

        function DocumentReady() {

            var ValueCustomerName = document.getElementById('hdnValueCustomerName');
            var ValueCustomerNameData = ValueCustomerName.value;
            $('#divCustomerName').text(ValueCustomerNameData);
            //
            //.Value = BranchName;
            //
            var ValueBranchName = document.getElementById('hdnValueBranchName');
            var ValueBranchNameData = ValueBranchName.value;


            if (ValueBranchNameData == '0') {
                ValueBranchNameData = 'Absa';
            }
			
			
			

            $("*").each(function () {
                if ($(this).children().length == 0) {
                    $(this).text($(this).text().replace('{PrivateBanker}', ValueBranchNameData));
					$(this).text($(this).text().replace('{PB}', ValueBranchNameData));
                }
            });
            //


            $(window).resize(function () {
                ShowLeftRightDivs();
                $('#divComplete').height($(window).height());
                $('#divCompleted').height($(window).height());
                $('#divQuotaReached').height($(window).height());
				$('#divNotComplete').height($(window).height());
				$('#divInvalid').height($(window).height());
            });



            $(window).trigger('resize');

        }


        $(window).resize(function () {
            $('#divComplete').height($(window).height());
            $('#divCompleted').height($(window).height());
            $('#divQuotaReached').height($(window).height());
			$('#divNotComplete').height($(window).height());
			$('#divInvalid').height($(window).height());
        });

        $(window).trigger('resize');

        //$('#Q0209').on('click',function () {
        //    ChangeCss();
        //});


        //function ChangeCss() {
        //    var currentWidth = window.innerWidth;
        //    if (currentWidth < 500) {
        //        $('#Q*').;
        //        $('#Q0210').addClass('smalldefaultSelection');
        //    }

        //}
    