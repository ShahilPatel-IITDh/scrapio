(function($) {
    'use strict';

    jQuery(document).ready(function() {
        // Post loading
        var term_id = [];
        var term_id_category = [];
        var term_id_jobtype= [];
        
        $( window ).load(function() {
          clearfun();
        });
        
        $(".clearfiter").hide();
       
        $('ul.expandible').each(function(){
            var $ul = $(this),
                $lis = $ul.find('li:gt(9)'),
                isExpanded = $ul.hasClass('expanded');
            $lis[isExpanded ? 'show' : 'hide']();
            
            if($lis.length > 0){
                $ul
                    .append($('<span class="showmore"><li class="expand">' + (isExpanded ? 'Show Less' : 'Show More') + '</li></span>')
                    .click(function(event){
                        var isExpanded = $ul.hasClass('expanded');
                        event.preventDefault();
                        $(this).html(isExpanded ? 'Show More' : 'Show Less');
                        $ul.toggleClass('expanded');
                        $lis.toggle();
                    }));
            }
        });
        
        // Filter toggle menu
        $(".filter-toggle").click(function()
        {
            $(".back-bg").toggleClass("open");
        })

        function clearfun()
        {
            var $checkboxescount = $('input[type=checkbox]');
          
            var checkboxes = $checkboxescount.filter(':checked').length; 
            if(checkboxes >= 1)
            {
                $(".clearfiter").show();    
            }
            else
            {
                $(".clearfiter").hide(); 
            }

        }
        function clearArray() 
        {
            return term_id = [],term_id_category=[],term_id_jobtype=[];
        }
        $(".clearfiter").on('click',function(e){
            $("input:checkbox").prop('checked', false);
            var term_id = $('.asr_texonomy').val(); 
            var term_id_jobtype = $('.asr_texonomy_jobtype').val(); 
            var term_id_category = $('.asr_texonomy_category').val();
            asr_ajax_get_postdata(term_id_jobtype,term_id,term_id_category,$(this));
            $(this).hide();
            clearArray();
        });
        
        $('.asr_texonomy_jobtype').on('change',function(){        
            //var term_id = $(this).val(); 
            clearfun();
            if ($(this).is(':checked')) {
                term_id_jobtype.push($(this).val());
            }
            else
            {
                term_id_jobtype.pop($(this).val());
                var $checkboxescount = $('input[type=checkbox]');
                var checkboxes = $checkboxescount.filter(':checked').length; 
                if(checkboxes ==0 )
                {
                     term_id_jobtype="-1";
                     term_id="-1";
                     term_id_category="-1";
                     asr_ajax_get_postdata(term_id_jobtype,term_id,term_id_category,$(this));     
                     clearArray();
                     return false;
                }
                else
                {
                    term_id = [];
                    term_id_jobtype = [];
                    term_id_category = [];
                    if ($(".asr_texonomy").is(':checked')) {
                        var term_id_new = [];
                        $.each($("input[name='location']:checked"), function(){
                            term_id_new.push($(this).val());
                        });
                    }
                    if ($(".asr_texonomy_jobtype").is(':checked')) {
                        var term_id_jobtype_new = [];
                         $.each($("input[name='jobtype']:checked"), function(){
                            term_id_jobtype_new.push($(this).val());
                        });
                        
                    }
                    if ($(".asr_texonomy_category").is(':checked')) {
                        var term_id_category_new = [];
                         $.each($("input[name='category']:checked"), function(){
                            term_id_category_new.push($(this).val());
                        });
                    }
                    asr_ajax_get_postdata(term_id_jobtype_new,term_id_new,term_id_category_new,$(this));        
                    return true;
                }
            }

            asr_ajax_get_postdata(term_id_jobtype,term_id,term_id_category,$(this));
            
        });

        $('.asr_texonomy').on('change',function(){
            //var term_id = $(this).val(); 
            clearfun();
            //term_id.push($(this).val());
            
            if ($(this).is(':checked')) {
                term_id.push($(this).val());
            }
            else
            {
                term_id.pop($(this).val());
                var $checkboxescount = $('input[type=checkbox]');
                var checkboxes = $checkboxescount.filter(':checked').length; 
                if(checkboxes == "0" )
                {
                     term_id_jobtype="-1";
                     term_id="-1";
                     term_id_category="-1";
                     asr_ajax_get_postdata(term_id_jobtype,term_id,term_id_category,$(this));     
                     clearArray();
                     return false;
                }
                else
                {
                    term_id = [];
                    term_id_jobtype = [];
                    term_id_category = [];
                    if ($(".asr_texonomy").is(':checked')) {
                        var term_id_new = [];
                        $.each($("input[name='location']:checked"), function(){
                            term_id_new.push($(this).val());
                        });
                    }
                    if ($(".asr_texonomy_jobtype").is(':checked')) {
                        var term_id_jobtype_new = [];
                         $.each($("input[name='jobtype']:checked"), function(){
                            term_id_jobtype_new.push($(this).val());
                        });
                        
                    }
                    if ($(".asr_texonomy_category").is(':checked')) {
                        var term_id_category_new = [];
                         $.each($("input[name='category']:checked"), function(){
                            term_id_category_new.push($(this).val());
                        });
                    }
                    asr_ajax_get_postdata(term_id_jobtype_new,term_id_new,term_id_category_new,$(this));        
                    return true;
                }
            }

           //  alert(term_id);
           asr_ajax_get_postdata(term_id_jobtype,term_id,term_id_category,$(this));
            
        });
       
        $('.asr_texonomy_category').on('change',function(){
            //var term_id_category = $(this).val();   
            clearfun();
            
            if ($(this).is(':checked')) {
               term_id_category.push($(this).val());
            }
            else
            {
                term_id_category.pop($(this).val());
                var $checkboxescount = $('input[type=checkbox]');
                var checkboxes = $checkboxescount.filter(':checked').length; 
                if(checkboxes ==0 )
                {
                     term_id_jobtype="-1";
                     term_id="-1";
                     term_id_category="-1";
                     asr_ajax_get_postdata(term_id_jobtype,term_id,term_id_category,$(this));     
                     clearArray();
                     return false;
                }
                else
                {
                    term_id = [];
                    term_id_jobtype = [];
                    term_id_category = [];
                    if ($(".asr_texonomy").is(':checked')) {
                        var term_id_new = [];
                        $.each($("input[name='location']:checked"), function(){
                            term_id_new.push($(this).val());
                        });
                    }
                    if ($(".asr_texonomy_jobtype").is(':checked')) {
                        var term_id_jobtype_new = [];
                         $.each($("input[name='jobtype']:checked"), function(){
                            term_id_jobtype_new.push($(this).val());
                        });
                        
                    }
                    if ($(".asr_texonomy_category").is(':checked')) {
                        var term_id_category_new = [];
                         $.each($("input[name='category']:checked"), function(){
                            term_id_category_new.push($(this).val());
                        });
                    }
                    asr_ajax_get_postdata(term_id_jobtype_new,term_id_new,term_id_category_new,$(this));        
                    return true;
                }
            }

            if(this.checked) {
                 $(this).addClass('active');
              }else{
                 $(this).removeClass('active');
              }
            
            asr_ajax_get_postdata(term_id_jobtype,term_id,term_id_category,$(this));
            
        });

        // Pagination
        $( document ).on('click', '#am_posts_navigation_init a', function(e){
            e.preventDefault();

            var location = [];
            $.each($("input[name='location']:checked"), function(){
                location.push($(this).val());
            });

            var jobtype = [];
            $.each($("input[name='jobtype']:checked"), function(){
                jobtype.push($(this).val());
            });

            var category = [];
            $.each($("input[name='category']:checked"), function(){
                category.push($(this).val());
            });


            /*console.log("location="+location);*/
            //var term_id = $(this).closest('.am_ajax_post_grid_wrap').find('.asr_texonomy.active:last').val();  
            //var term_id_category = $(this).closest('.am_ajax_post_grid_wrap').find('.asr_texonomy_category').val();
            //var term_id_jobtype = $(this).closest('.am_ajax_post_grid_wrap').find('.asr_texonomy_jobtype').val();   
            
            //console.log(location);
            
            if(location.length !=0 )
            {
                var term_id=location;    
            }
            else
            {
                var term_id = $(this).closest('.am_ajax_post_grid_wrap').find('.asr_texonomy').val();  
                //var term_id = $(this).closest('.am_ajax_post_grid_wrap').find('.asr_texonomy').val();  
            }
            
            if(jobtype.length !=0 )
            {
                var term_id_jobtype=jobtype;
            }
            else
            {
                var term_id_jobtype = $(this).closest('.am_ajax_post_grid_wrap').find('.asr_texonomy_jobtype').val();   
            }

            if(category.length !=0 )
            {
                var term_id_category=category;
            }
            else
            {
                var term_id_category = $(this).closest('.am_ajax_post_grid_wrap').find('.asr_texonomy_category').val();
            }

            /*console.log("termid="+term_id);
            console.log("term_id_category"+term_id_category);
            console.log("term_id_jobtype"+term_id_jobtype);*/

            //var paged = $(this).text();
            // var paged = $(this).attr('href').replace(/[^0-9]/gi, '');

            // 获取分页页码 Kernel Xiao 20210301
            var paged = getUrlParam('paged', $(this).attr('href'));
            
            var theSelector = $(this).closest('.am_ajax_post_grid_wrap').find('.asr_texonomy');
            var activeSelector = $(this).closest('.am_ajax_post_grid_wrap').find('.asr_texonomy_category.active');


            if( activeSelector.length > 0 ){
                term_id = term_id;
            } else {
                activeSelector = theSelector;
            }
            
            asr_ajax_get_postdata(term_id_jobtype,term_id,term_id_category,activeSelector, paged, true);

            $('html, body').animate({
                    scrollTop: $(".back-bg").offset().top - 100
            }, 1000);

        });


        //ajax filter function
        //career页面请求后端数据
        function asr_ajax_get_postdata(term_id_jobtype,term_ID,term_id_CATEGORY, selector, paged, structed){

            var getLayout = $(selector).closest('.am_ajax_post_grid_wrap').find(".asr-filter-div").attr("data-layout");
            
            var data = {
                action: 'asr_filter_posts',
                asr_ajax_nonce: asr_ajax_params.asr_ajax_nonce,
                term_ID: term_ID,
                term_id_category:term_id_CATEGORY,
                term_id_jobtype:term_id_jobtype,
                layout: (getLayout) ? getLayout : "1",
                jsonData: $(selector).closest('.am_ajax_post_grid_wrap').attr('data-am_ajax_post_grid'),
            }

            
            if( paged ){
                data['paged'] = paged;
            }

            /**
             * 将筛选条件存储到 localstorage （
             * 用于从职位详情表返回职位列表页时保留原筛选数据，数据结构与 class="am_ajax_post_grid_wrap" 的 div 元素 data-am_ajax_post_grid 属性一致）
             * @author Kernel Xiao
             * @date 20210304
             * @type {{layout: (*|Window.jQuery|string), btn_all: string, paged: (*|number), posts_per_page: string, initial: (*|number), cat: string, show_filter: string, paginate: string, post_type: string, category: (*|number), jobtype: (*|number)}}
             */
            var careerFilterData = {
                "show_filter":"yes",
                "btn_all":"yes",
                "initial":data.term_ID ? data.term_ID : -1,
                "category":data.term_id_category ? data.term_id_category : -1,
                "jobtype":data.term_id_jobtype ? data.term_id_jobtype : -1,
                "layout":(getLayout) ? getLayout : "1",
                "post_type":"post",
                "posts_per_page":"10",
                "cat":"all",
                "paginate":"yes",
                "paged":data.paged ? data.paged : 1
            };
            if (typeof(Storage) !== 'undefined') {
                localStorage.setItem('career_filter_data', JSON.stringify(careerFilterData));
            }

            $.ajax({
                type: 'post',
                url: asr_ajax_params.asr_ajax_url,
                data: data,
                beforeSend: function(data){
                    $(selector).closest('.am_ajax_post_grid_wrap').find('.asr-loader').show();
                },
                complete: function(data){
                    $(selector).closest('.am_ajax_post_grid_wrap').find('.asr-loader').hide();
                },
                success: function(data){
                    $(selector).closest('.am_ajax_post_grid_wrap').find('.asrafp-filter-result').hide().html(data).fadeIn(0, function() {
                        //$(this).html(data).fadeIn(300);

                        // 返回查询结果顶部 Kernel Xiao 20210301
                        $('html, body').animate({
                            scrollTop: $(".back-bg").offset().top - 100
                        }, 1000);

                    });
                },
                error: function(data){
                    console.log(data);

                    // 返回查询结果顶部 Kernel Xiao 20210301
                    $('html, body').animate({
                        scrollTop: $(".back-bg").offset().top - 100
                    }, 1000);

                },

            });
        }

        $.urlParam = function(name){
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results==null) {
               return null;
            }
            return decodeURI(results[1]) || 0;
        }

        // Initial Custom Trigger
        // 页面加载后触发事件 Kernel Xiao 20210304
        $(document).on('am_ajax_post_grid_init', function(){

            // 判断页面加载类型 1-刷新 2-从别的页面返回 0-正常加载
            var pageLoadType = window.performance.navigation.type;
            if (2 == pageLoadType) {
                // 从别的页面返回则加载 localstorage 的数据
                var amPGdata = JSON.parse(localStorage.getItem('career_filter_data'));
                asr_ajax_get_postdata(amPGdata.jobtype, amPGdata.initial, amPGdata.category, $('.asr-ajax-container'), amPGdata.paged);
            } else {
                // 正常加载/刷新则加载预设的数据(原逻辑)
                $('.am_ajax_post_grid_wrap').each(function(i,el){
                    var amPGdata = $(this).data('am_ajax_post_grid');
                    var paged=$.urlParam('pages');
                    if(amPGdata && amPGdata.initial){
                        asr_ajax_get_postdata(amPGdata.jobtype,amPGdata.initial,amPGdata.category,$(this).find('.asr-ajax-container'),paged);
                    }
                });
            }
        });


    });

    $(window).load(function(){
        $(document).trigger('am_ajax_post_grid_init');        
    });

})(jQuery);

/**
 * 获取 指定 url 的参数值
 * @author Kernel Xiao
 * @date 20210301
 * @param e 参数名
 * @param url url地址
 * @returns {string|string}
 */
function getUrlParam(e, url) {
    var r = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
        i = url.substr(url.indexOf("?") + 1).match(r);
    return i != null ? i[2] : ""
}







