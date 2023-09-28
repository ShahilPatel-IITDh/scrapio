jQuery(function($){
	'use strict';

	window.HomeworkApi = function HomeworkApi(){

		//// Private var START ////
		var _self = this;
		//// Private var END ////
		
		//// Public var START ////
		this.isLoading = false;
		this.allData = [];
		//// Public var END ////
		
		
		//// Private func START ////
		//// Private func END ////
		

		//// Public func START ////
		this.getHomeworks = function(data){
			var _data = $.extend({}, {
	            'action':'eclass_homework_api',
	            '_ajax_nonce':ECLASS_HOMEWORK_API._ajax_nonce
	        }, data);

            var $defer = $.Deferred();
			$.ajax({
		        url: ECLASS_HOMEWORK_API.url,
		        type: 'get',
		        data: _data,
		        beforeSend : function(){
					_self.isLoading = true;
                    _self.allData.length = 0;
		        },
		        complete : function(){
		        	_self.isLoading = false;
		        },
		        success: function( response ) {
		        	if(ECLASS_HOMEWORK_API.school_type == 'EJ50' || ECLASS_HOMEWORK_API.school_type == 'EJ60') {
                        if (
                            typeof(response['Homeworks']) == 'undefined' ||
                            typeof(response['Homeworks']['Homework']) == 'undefined'
                        ) {
                            _self.allData.length = 0;
                            $defer.resolve(_self.allData);
                            return;
                        }

                        //// Parse data START ////
                        if (typeof(response['Homeworks']['Homework']['AssignmentID']) == 'undefined') {
                            $.each(response['Homeworks']['Homework'], function (index, course) {
                                _self.allData.push(course);
                            });
                        } else {
                            _self.allData.push(response['Homeworks']['Homework']);
                        }

                        $.each(_self.allData, function (index, homework) {
                            if (homework['WorkType'] != 18) { // Homework image
                                return;
                            }
                            _self.allData[index] = homework;
                        });
                        //// Parse data END ////
                    }else{
                        if (
                            typeof(response['IntranetHomeworks']) == 'undefined' ||
                            typeof(response['IntranetHomeworks']['IntranetHomework']) == 'undefined'
                        ) {
                            _self.allData.length = 0;
                            $defer.resolve(_self.allData);
                            return;
                        }

                        //// Parse data START ////
                        if (typeof(response['IntranetHomeworks']['IntranetHomework']['HomeworkID']) == 'undefined') {
                            $.each(response['IntranetHomeworks']['IntranetHomework'], function (index, course) {
                                _self.allData.push(course);
                            });
                        } else {
                            _self.allData.push(response['IntranetHomeworks']['IntranetHomework']);
                        }

                        $.each(_self.allData, function (index, homework) {
                            if(_.isUndefined(homework['Attachments']['Attachment'])) {
                                return true;
                            }else if(typeof(homework['Attachments']['Attachment']) == 'string'){
                                    homework['Attachments']['Attachment'] = [homework['Attachments']['Attachment']];
                            }

							for(var i=0;i<homework['Attachments']['Attachment'].length;i++){
                                homework['Attachments']['Attachment'][i] = {
                                    FileName: '',
                                    FileURL: homework['Attachments']['Attachment'][i]
								};
							}

                            _self.allData[index] = homework;
                        });
                        //// Parse data END ////
					}

                    $defer.resolve(_self.allData);
                },
                error: function (err) {
                    $defer.reject(err);
                },
            });
            return $defer;
		};
		//// Public func END ////
	}; // End class LatestNewsApi
	
    
});
