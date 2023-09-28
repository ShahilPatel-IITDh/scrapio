jQuery(function($){
	'use strict';

	window.SubjectGroupApi = function SubjectGroupApi(){

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
		
		this.loadData = function(data){
            var _data = $.extend({}, {
                'action':'eclass_subject_group_api',
                '_ajax_nonce':ECLASS_SUBJECT_GROUP_API._ajax_nonce
            }, data);

			var $defer = $.Deferred();
		    $.ajax({
		        url: ECLASS_SUBJECT_GROUP_API.url,
		        type: 'get',
		        data: _data,
                beforeSend: function () {
                    _self.isLoading = true;
                },
                complete: function () {
                    _self.isLoading = false;
                },
		        success: function( response ) {
                    var data = [];
                    if (
                        typeof(response['SubjectGroups']) == 'undefined' ||
                        typeof(response['SubjectGroups']['SubjectGroup']) == 'undefined'
                    ) {
                        $defer.resolve(data);
                        return;
                    }

                    //// Parse data START ////
                    if(typeof(response['SubjectGroups']['SubjectGroup']['SubjectGroupID']) == 'undefined'){
                        $.each(response['SubjectGroups']['SubjectGroup'], function(index, event){
                            data.push(event);
                        });
                    }else{
                        data.push(response['SubjectGroups']['SubjectGroup']);
                    }
                    _onDataLoad();
                    //// Parse data END ////

                    $defer.resolve(data);
                },
                error: function (err) {
                    $defer.reject(err);
                },
            });
            return $defer;
		}; // End loadData()

        this.getSubjectGroups = this.loadData;
		//// Public func END ////
	}; // End class SubjectGroupApi
	
    
});
