
	(function($){
		$(document).ready(function(){
			function setW(){
					var sl = $('.swiper-banner .swiper-slide-active img'),
							sw = sl.width() || 1920,
							ww = window.innerWidth;
					$('.swiper-banner .swiper-slide img').css({marginLeft:'0px'});
					if(ww<=sw){
						sl.css({marginLeft:((ww>1200?ww:1200)-sw)/2+'px'});
					}
			}
			$(window).resize(function(){
					setW();
			});
			var swiperBanner = new Swiper('.swiper-banner', {
				effect: 'fade',
				autoplay: 5300,
				pagination: '.swiper-pagination',
				paginationClickable: true,
				onSlideChangeStart: function(swiper){
					setW(); 
				}
			});
			var swiperIndex = new Swiper('.swiper-index', {
				autoplay: 3600,
				loop: true,
				mode: 'vertical'
			});
			var swiperTranding = new Swiper('.swiper-trading', {
				pagination: '.trading-pagination',
				paginationClickable: true,
				calculateHeight : true
			});
			$('.countdown').countdown({
					initTime: 1691911955,
					over: function(){
						var t = $(this.element);
						t.text(t.attr('data-time')).siblings('a').text('立即采购').removeClass('btn-orange').addClass('btn-red').siblings('p').text('有效时间至');
					}
			});
			var modal = $('#mainModal'),
					applyForm = $('#form1'),
					applyResult = $('#applyResult');
			var validator = applyForm.validate({
				messages: {
					mobile: {
						required: '请输入手机号码'
					},
					contact: {
						required: '请输入联系人'
					},
					company: {
						required: '请输入企业名称'
					}
				},
				errorPlacement: function(error, element) {
					element.before(error);
				}
			});
			$('.btn-submit').on('click',function(){
				if (applyForm.valid()) {
					var href = modal.data('jump');
					$('body').addClass('load-open');
					$.ajax({
						type: 'POST',
						url: href,
						data: applyForm.serialize(),
						success: function(data){
							$('body').removeClass('load-open');
							applyResult.text(data).show();
						}
					});
				}
			});
			modal.on('show.bs.modal', function (event) {
				var t = $(this),
						th = t.find('#myModalLabel'),
						button = $(event.relatedTarget);
				th.text(button.data('th'));
			});
			modal.on("hidden.bs.modal", function(event) {
				validator.resetForm();
				applyForm[0].reset();
				applyResult.text('').hide();
			});
			$('.menu-panel').addClass('active');
			setW(); 

// 			$.get("/home/ajax-news.html",{},function(data){
// 				for(var i in data){
// 					var html = '';
// 					for(var j in data[i]){
// 						var date = new Date(data[i][j]['ptime']*100),
// 							ptime = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-' + date.getDate(),
// 							typeurl = "/article/list.html?name="+data[i][j]['type_en_name'],
// 							url = "/article/detail.html?id="+data[i][j]['id'];
// 						html += '<li><span class="pull-right">'+ptime+'</span><a class="ntype" href="'+typeurl+'">['+data[i][j]['type_name']+']</a><a href="'+url+'">'+data[i][j]['shorttitle']+'</a></li>';
// 					}
// 					$('#'+i).html(html);
// 				}
// 			},'json');
			
		});
	})(jQuery);
