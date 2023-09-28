jQuery(function($){
	'use strict';

	window.AcademicYearTermApi = function AcademicYearTermApi(){

		//// Private var START ////
		var _self = this;
		var _onDataLoadFuncs = [];
		//// Private var END ////
		
		//// Public var START ////
		this.isLoading = false;
		//// Public var END ////
		
		
		//// Private func START ////
		var _onDataLoad = function(){
			$.each(_onDataLoadFuncs, function(index, func){
				func(_self.data);
			});
		}
		//// Private func END ////
		

		//// Public func START ////
		this.onDataLoad = function(func){
			if(typeof(func) == 'function'){
				_onDataLoadFuncs.push(func);
			}else{
				throw new TypeError('func must be a function');
			}
		}; // End onDataLoad()
		
		this.loadData = function(callback){
            var allData = [];
			var data = {
	            'action':'eclass_academic_year_term_api',
	            '_ajax_nonce':ECLASS_ACADEMIC_YEAR_TERM_API._ajax_nonce
	        };

            var $defer = $.Deferred();
		    $.ajax({
		        url: ECLASS_ACADEMIC_YEAR_TERM_API.url,
		        type: 'get',
		        data: data,
                beforeSend : function(){
                    _self.isLoading = true;
                },
                complete : function(){
                    _self.isLoading = false;
                },
		        success: function( response ) {
		        	if(!response){
                        $defer.reject(response);
		        		return;
		        	}
		        	
		        	if(typeof(callback) == 'function'){
		        		callback(response);
		        	}

                    //// Parse data START ////
					try {
						if (typeof (response['AcademicYears']['AcademicYear']['AcademicYearID']) == 'undefined') {
							$.each(response['AcademicYears']['AcademicYear'], function (index, academicYear) {
								allData.push(academicYear);
							});
						} else {
							allData.push(response['AcademicYears']['AcademicYear']);
						}
					}catch(e){
						allData = [];
					}

                    $.each(allData, function(index, academicYear){
                        if(typeof(academicYear['AcademicYearTerm']['YearTermID']) != 'undefined'){
                            academicYear['AcademicYearTerm'] = [academicYear['AcademicYearTerm']];
                        }

                        academicYear['AcademicYearTerm'].sort(function (a, b) {
                            return a['TermStart'].localeCompare(b['TermStart']);
                        });

                        allData[index] = academicYear;
                    });
                    allData.sort(function (a, b) {
                        return a['Sequence'] - b['Sequence'];
                    });
                    //// Parse data END ////

                    $defer.resolve(allData);
                },
                error: function (err) {
                    $defer.reject(err);
                },
            });
            return $defer;
		}; // End loadData()
		this.getAcademicYearTerm = this.loadData;
		//// Public func END ////
	}; // End class AcademicYearTermApi
	
    
});
