var Myui = {
	'Comment': {
		'Init':function(){
			$('body').on('click', '.my_comment_submit', function(e){			        
		        if($(this).parent().parent().parent().find(".comment_data").val() == ''){
	                layer.msg("请输入评论内容");
	                return false;
	           }
		        Myui.Comment.Submit();
			});
			$('body').on('click', '.my_comment_report', function(e){
                var $that = $(this);
                if($(this).attr("data-id")){
                    MyTheme.Ajax(raycms.path + '/index.php/comment/report.html?id='+$that.attr("data-id"),'get','json','',function(r){
                        $that.addClass('disabled');                       
                        layer.msg(r.msg);
                    });
                }
            });
			$('body').on('click', '.my_comment_reply', function(e){
                var $that = $(this);
                if($that.attr("data-id")){
                    var str = $that.html();
                    $('.comment_reply_form').remove();
                    if (str == '取消回复') {
                        $that.html('回复');
                        return false;
                    }
                    if (str == '回复') {
                        $('.my_comment_reply').html('回复');
                    }
                    var html = $('.comment_form').prop("outerHTML");

                    var oo = $(html);
                    oo.addClass('comment_reply_form');
                    oo.find('input[name="comment_pid"]').val( $that.attr("data-id") );

                    $that.parent().after(oo);
                    $that.html('取消回复');
                }
            });
            $('body').on('click', '.my_comment_report', function(e){
                var $that = $(this);
                if($(this).attr("data-id")){
                    MyTheme.Ajax(raycms.path + '/index.php/comment/report.html?id='+$that.attr("data-id"),'get','json','',function(r){
                        $that.addClass('disabled');
                        layer.msg(r.msg);
                    });
                }
            });
		},
		'Show':function($page){
        	if($(".myui_comment").length){
                MyTheme.Ajax(raycms.path + '/index.php/comment/ajax.html?rid='+$('.myui_comment').attr('data-id')+'&mid='+ $('.myui_comment').attr('data-mid') +'&page='+$page,'get','json','',function(r){
                    $(".myui_comment").html(r);
                },function(){
                    $(".myui_comment").html('<a href="javascript:void(0)" onclick="myui_Comment_Show('+$page+')">评论加载失败，点击我刷新...</a>');
                });
            }
        },
		'Submit':function(){		        
			MyTheme.Ajax(raycms.path + '/index.php/comment/saveData','post','json',$(".comment_form").serialize() + '&comment_mid='+ $('.myui_comment').attr('data-mid') + '&comment_rid=' + $('.myui_comment').attr('data-id'),function(r){
	            if(r.code==1){ 
	            	layer.msg("评论成功，正在刷新...",{anim:5},function(){
					    Myui.Comment.Show(1);
					});
		        } else {
		        	if(RAY.Gbook.Verify==1){
		           	 	$('#verify_img').click();
		            }
		            layer.msg(r.msg);
		        }
	        });
		}
	},
	'Gbook': {
		'Init':function(){
			$('body').on('click', '.gbook_submit', function(e){
				if($(".gbook_data").val() == ''){
		            layer.msg("请输入留言内容");
		            return false;
		        }
				Myui.Gbook.Submit();
			});
		},
		'Submit':function(){
			MyTheme.Ajax(raycms.path + '/index.php/gbook/saveData','post','json',$("#myform").serialize(),function(r){
	            if(r.code==1){ 
	            	layer.msg("留言成功，正在刷新...",{anim:5},function(){
					    location.reload();
					});	            
		        } else {
		        	if(RAY.Gbook.Verify==1){
		           	 	$('#verify_img').click();
		            }
		            layer.msg(r.msg);
		        }
	        });
		}
	},
	'Score':function(){
		var hadpingfen = 0;
		$("ul.rating li").each(function(i) {
			var $title = $(this).attr("title");
			var $lis = $("ul.rating li");
			var num = $(this).index();
			var n = num + 1;
			$(this).click(function () {
					if (hadpingfen > 0) {
						layer.msg('已经评分,请务重复评分');
					}
					else {
						$lis.removeClass("active");
						$("ul.rating li:lt(" + n + ")").find(".fa").addClass("fa-star").removeClass("fa-star-o");
						$("#ratewords").html($title);
						$.getJSON(raycms.path+'/index.php/ajax/score?mid='+$('#rating').attr('data-mid')+'&id='+$('#rating').attr('data-id')+'&score='+($(this).attr('val')*2), function (r) {
							if (parseInt(r.code) == 1) {
								layer.msg(r.msg);
								hadpingfen = 1;
							}
							else {
								hadpingfen = 1;
								layer.msg(r.msg);
							}
						});
					}
				}
			).hover(function () {
				this.myTitle = this.title;
				this.title = "";
				$(this).nextAll().find(".fa").addClass("fa-star-o").removeClass("fa-star");
				$(this).prevAll().find(".fa").addClass("fa-star").removeClass("fa-star-o");
				$(this).find(".fa").addClass("fa-star").removeClass("fa-star-o");
				$("#ratewords").html($title);
			}, function () {
				this.title = this.myTitle;
				$("ul.rating li:lt(" + n + ")").removeClass("hover");
			});
		});
	},
	'Autocomplete': function() {
		$('#wd').keyup(function(){
			var keywords = $(this).val();
			if (keywords=='') { $('#word').hide(); return };
			$.ajax({
				url: raycms.path +'/vod/search/ass',
				dataType: 'json',
				data:{'wd':keywords},
				//jsonp: 'cb', //回调函数的参数名(键值)key
				// jsonpCallback: 'fun', //回调函数名(值) value
				beforeSend:function(){
					$('.wordlist').append('<li>正在加载。。。</li>');
				},
				success:function(data){
					$('#word').show();
					$('.wordlist').empty();
					if (data.s==''){
						$('.wordlist').append('<li>未找到与 "' + keywords + '"相关的结果</li>');
					}
					$.each(data.s, function(){
						$('.wordlist').append('<li style="float: none">'+ this +'</li>');
					});
				},
				error:function(){
					$('#word').show();
					$('.wordlist').empty();
					$('#word').append('<li>查找"' + keywords + '"失败</li>');
				}
			});
		});
		//点击搜索数据复制给搜索框
		$(document).on('click','.wordlist li',function(){
			var word = $(this).text();
			$('#wd').val(word);
			$('#word').hide();
			$('.submit').trigger('click');触发搜索事件
		})
		//失去焦点时隐藏
		var clear = function(){ $('#word').hide();}
		$("input").blur(function(){
			setTimeout(clear,500);
		});
	},
	'User': {
		'BuyPopedom':function(o){
            var $that = $(o);
            if($that.attr("data-id")){
                if (confirm('您确认购买此条数据访问权限吗？')) {
                    MyTheme.Ajax(raycms.path + '/index.php/user/ajax_buy_popedom.html?id=' + $that.attr("data-id") + '&mid=' + $that.attr("data-mid") + '&sid=' + $that.attr("data-sid") + '&nid=' + $that.attr("data-nid") + '&type=' + $that.attr("data-type"),'get','json','',function(r){
                        $that.addClass('disabled');
                        layer.msg($r.msg);
                        if (r.code == 1) {
                            top.location.reload();
                        }
                        $that.removeClass('disabled');
                    });
                }
            }
        }
	}
};

$(function(){	
	Myui.Comment.Init();	
	Myui.Gbook.Init();
	Myui.Autocomplete();
});