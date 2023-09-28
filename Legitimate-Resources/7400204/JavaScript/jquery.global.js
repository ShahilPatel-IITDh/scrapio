/* pagination */
var IGlobal = {
init:function(){ 
       /* prayer submit and newsletter subcribe */
       $Jq('#ipray-share-button').click(function(e)
	   {
		   if($Jq('#ipray-prayers-container').css('display')=='block')
		   {
			   $Jq(this).text($Jq(this).data('open'));
			   $Jq(this).removeClass('open');
			   $Jq('#ipray-prayers-container,#newsletter-container').hide();
			   
		   }
		   else
		   {
			   if($Jq('#newsletter-container').css('display')=='block')
			   {
			      $Jq('#ipray-subscribe-button').trigger("click");
			   }
			   $Jq('#ipray-notifications').removeAttr('class').html('');
			   $Jq(this).text($Jq(this).data('close'));
			   $Jq(this).addClass('open');
			   $Jq('#ipray-prayers-container').show();
		   }
		   
	   });
	   $Jq('#ipray-subscribe-button').click(function(e)
	   {
		   if($Jq('#newsletter-container').css('display')=='block')
		   {
			   $Jq(this).text($Jq(this).data('open'));
			   $Jq(this).removeClass('open');
			   $Jq('#newsletter-container,#ipray-prayers-container').hide();
			    
		   }
		   else
		   {
			   if($Jq('#ipray-prayers-container').css('display')=='block')
			   {
				   $Jq('#ipray-share-button').trigger("click");
			   }
			   $Jq('#ipray-notifications').removeAttr('class').html('');
			   $Jq(this).text($Jq(this).data('close'));
			   $Jq(this).addClass('open');
			   $Jq('#newsletter-container').show();
		   }
		 
	   });
	   /* ipray submit link*/
	    $Jq('body').on( "click", ".ipray-submitlink", function(e) {
		  if($Jq(this).hasClass('active'))
		  {
				IGlobal.iPrayed($Jq(this));
		  }	
        });
	   /* prayer submit and newsletter subcribe end */
	   /* init ajax request */
	  IGlobal.PrayerList($Jq('.ipray-main-container'), $Jq('form#ipraylistHiddenForm') );
	  /* validate form */
	      $Jq("#ipray-newsletter-form").validate({ 
			  rules: {
					email: {
					  required: true,
					  email: true,
					}
			  },
			  messages: {
				/*email: {
				  required: "We need your email address to contact you",
				  email: "Your email address must be in the format of name@domain.com"
				}*/
              },
			  submitHandler: function(form) {
				  IGlobal.formNewsLetterSubmit(form);
			  }
			});
		    $Jq("#ipray-prayer-submit-form").validate({
			  rules: {
				name: "required",
				desired_share_option: "required",
				prayer: "required",
				email: {
				  required: true,
				  email: true
				}
			  },
			  /* messages: {
				name: "Please specify your name",
				email: {
				  required: "We need your email address to contact you",
				  email: "Your email address must be in the format of name@domain.com"
				}
               }*/
			  submitHandler: function(form) {
				  IGlobal.formPrayerSubmit(form);
			  }
			   
			});
   },
/* global listing helper */	
search:{ 
        action: null, 
        params:{}, 
        draw_pagination:true,
        sDiv: null,
        sFrm: null,
        sBlockType: 'item',
        sResultDiv: null,
   },
/* prayer count */
iPrayed: function(obj){
	   if(obj.hasClass('locked'))
	   {
		   return ;  
	   }
	   var link_text = obj.text();
	   obj.text($Jq('#ipray-notifications').data('sending-text'));
	   /*disable for continue click */
	   obj.addClass('locked');
	   $thisInst = this;
        $Jq.ajax({
            type: "POST",
            url: $thisInst.search.action,
            data: {prayer_id:obj.data('id'),requesturi:$Jq('#ipray-notifications').data('requesturi'),action:'iprayed'},
            dataType: 'json',
            success: function(data, textStatus){
                if(data.prayer_count)
                {
                   obj.siblings('.prayer_count').text(data.prayer_count_msg);
				   obj.removeClass('active').addClass('deactive');
				   /* release lock */
				   obj.removeClass('locked');
	               obj.text(link_text);
                }   
            },
            error: function(errorObj, textStatus, errorThrown){ 
			  $Jq('#ipray-notifications').html($Jq('#ipray-notifications').data('error-msg'));         
            }
        });
	},
/* form nesletter submit */
formNewsLetterSubmit: function(d){
	    $thisInst = this;
		
		var submit_val = $Jq(d).find("input[type=submit]").val();
		$Jq(d).find("input[type=submit]").val($Jq('#ipray-notifications').data('sending-text'));
		
        $Jq.ajax({
            type: "POST",
            url: $thisInst.search.action,
            data: $Jq(d).serialize(),
            dataType: 'json',
            success: function(data, textStatus){
                if(data.submit)
                {
					$Jq(d).find("input[type=submit]").val(submit_val);
					if(data.submit == 2)
					{
						$Jq('#ipray-notifications').addClass('error').html(data.msg);
					}
					else
					{
						$Jq(d).parent().hide();
						$Jq(d).find("input[type=text]").val("");
						$Jq('#ipray-notifications').addClass('success').html(data.msg);
						$Jq('#ipray-subscribe-button').text($Jq('#ipray-subscribe-button').data('open'));
						
					}     
                }    
                else
                {
                   $Jq('#ipray-notifications').addClass('error').html($Jq('#ipray-notifications').data('error-msg'));
                }
            },
            error: function(errorObj, textStatus, errorThrown){ 
			  $Jq('#ipray-notifications').html($Jq('#ipray-notifications').data('error-msg'));          
            }
        });
	},
/* form prayer submit */
formPrayerSubmit: function(d){
	     $thisInst = this;
	     var submit_val = $Jq(d).find("input[type=submit]").val();
		$Jq(d).find("input[type=submit]").val($Jq('#ipray-notifications').data('sending-text'));
        $Jq.ajax({
            type: "POST",
            url: $thisInst.search.action,
            data: $Jq(d).serialize(),
            dataType: 'json',
            success: function(data, textStatus){
				$Jq(d).find("input[type=submit]").val(submit_val);
				if(data.submit)
				{
					$Jq(d).parent().hide();
					$Jq(d).find("input[type=text], textarea").val("");
					$Jq('#ipray-notifications').html($Jq('#notification').data('success-msg'));
					$Jq('#ipray-share-button').text($Jq('#ipray-share-button').data('open'));
					IGlobal.PrayerList($Jq('.ipray-main-container'), $Jq('form#ipraylistHiddenForm') );     
				}    
				else
				{
				   $Jq('#ipray-notifications').html($Jq('#ipray-notifications').data('error-msg'));
				}
            },
            error: function(errorObj, textStatus, errorThrown){ 
			  $Jq('#ipray-notifications').html($Jq('#ipray-notifications').data('error-msg'));          
            }
        });
    },
/* global ajax prayer list */
ajaxListData: function(){
        $thisInst = this;
        $thisInst.search.sDiv.find('.ipray-loading').show();
        var searchPg = $thisInst.search.sDiv.find('.ipray-results-page');
        searchPg = $thisInst.search.sResultDiv || searchPg;
        searchPg.html('');
        //$thisInst.setUrlState();
        $Jq.ajax({
            type: "POST",
            url: $thisInst.search.action,
            data: $thisInst.search.sFrm.serialize(),
            dataType: 'json',
            success: function(data, textStatus){
                $thisInst.search.sDiv.find('.ipray-loading').hide();
                if( data.res_count > 0 )
                {
					$Jq.each(data.display_results, function( k, v ) {
						searchPg.append(IGlobal.prayerListTemplate(v,data.setting));  
					});
                    if($thisInst.search.draw_pagination )
                    {
						 /* restriction for pagination display on one page */
						allowForOne = Math.ceil(data.res_count/data.per_page); 
						if(allowForOne!== 0 && allowForOne >1)
						{
                          $thisInst.draw_pagination(data.res_count, data.per_page);
						}
                    }
                }    
                else
                {
                    searchPg.html('<div class="clsNoRecordsFound">'+ searchPg.attr('data-msg-data-not-found') +'</div>');
                    $Jq('.ipray-results-pagination').html('');
                }
            },
            error: function(errorObj, textStatus, errorThrown){
                $thisInst.search.sDiv.find('.iprayloading').hide(); 
                searchPg.html('<div class="NotRecordsFound">'+ searchPg.attr('data-msg-data-not-found') +'</div>');
                $Jq('.ipray-results-pagination').html('');               
            }
        });
    },
/* pagination draw */
draw_pagination: function(total_result, show_per_page){
        $thisInst = this;
        $Jq('.ipray-results-pagination').pagination({ 
            items: total_result, 
            itemsOnPage: show_per_page,
            currentPage: 1,
            onPageClick: function(p, e)
            {
                e.preventDefault();
                var start = parseInt(show_per_page*(p-1));
                $thisInst.search.sFrm.find('input[name="start"]').val(start);               
				$thisInst.search.draw_pagination = false;
				$Jq("html, body").animate({scrollTop:0}, 1300);
                $thisInst.ajaxListData();
            }
        });
  },
 /* list all prayers */
  PrayerList: function(d, f){
        $thisInst = this;
        $thisInst.search.action = f.attr('action');
        $thisInst.search.sDiv = d;
        $thisInst.search.sFrm = f;        
        $thisInst.ajaxListData();        
    },
/* convert json data to html*/
  prayerListTemplate: function(d,setting){  
	h =d.unsubscribe;
	h +='<div id="prayer'+d.ID+'" class="ipray-prayer ipray-prayer-'+d.class+' well">';
	h +='<div id="count'+d.ID+'" class="ipray-count-area pull-right text-align-center">';
	h +='<a class="btn btn-primary ipray-submitlink '+((d.is_pray_allow)?'active':'deactive')+'" ';
	h +='data-action="ipray" data-id="'+d.ID+'" href="javascript:;">';
	h +=setting.prayer_text+'</a><br>';
	h +='<span class="prayer_count">';
	if(d.prayer_count != 0)
	{
	  h +=d.prayer_count_msg;
	}
	h +='</span>';
	h +='</div>';
	h +='<h5>'+d.name+'</h5>';
	h +='<p>'+d.prayer+'</p>';
	h +='<strong style="font-size:12px;">'+setting.recieve_text+'</strong><span class="meta-data">'+d.date_time+'</span>';
	h +='</div>';
	return h;
    }, 
};