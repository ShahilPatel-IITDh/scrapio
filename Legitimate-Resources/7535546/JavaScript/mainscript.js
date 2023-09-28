
//   TOGGLE FOOTER
// footer-icons-define
		var footer_icon_plus = 'icon-plus-sign';
		var footer_icon_minus = 'icon-minus-sign';
// footer-change-script
var responsiveflagFooter = false;
function accordionFooter(status){
		if(status == 'enable'){
			$('.modules .block em').on('click', function(){
				$(this).toggleClass('active').parent().find('.toggle_content').stop().slideToggle('medium', function(){
					if($(this).prev().hasClass('active')) {
						$(this).prev().children('i').removeClass(footer_icon_plus).addClass(footer_icon_minus);
					}
					else {
						$(this).prev().children('i').removeClass(footer_icon_minus).addClass(footer_icon_plus);	
					}
				});
			})
			$('.modules').addClass('accordion').find('.toggle_content').slideUp('fast');
		}else{
			$('.modules span').removeClass('active').off().parent().find('.toggle_content').removeAttr('style').slideDown('fast');
			$('.modules span i').removeClass(footer_icon_minus).addClass(footer_icon_plus);
			$('.modules').removeClass('accordion');
		}
	}		
function toDoFooter(){
	   if ($(document).width() <= 768 && responsiveflagFooter == false){
		    accordionFooter('enable');
			responsiveflagFooter = true;		
		}
		else if ($(document).width() >= 768){
			accordionFooter('disable');
	        responsiveflagFooter = false;
		}
}
$(document).ready(toDoFooter);
$(window).resize(toDoFooter);

//   TOGGLE PAGE PRODUCT (TAB)
// products-icons-define
		var product_icon_plus = 'icon-plus-sign-alt';
		var product_icon_minus = 'icon-minus-sign-alt';
var responsiveflagPage = false;
function accordionPage(status){	
		if(status == 'enable'){
			$('.page_product_box em').on('click', function(){
				$(this).toggleClass('activeTab').parent().find('.toggle_content').stop().slideToggle('medium', function(){
				  if($(this).prev().hasClass('activeTab')) {
					  $(this).prev().children('i').removeClass(product_icon_minus).addClass(product_icon_plus);
				  }
				  else {
					  $(this).prev().children('i').removeClass(product_icon_plus).addClass(product_icon_minus);	
				  }
			  });
			})
			$('#center_column .page_product_box').addClass('accordion').find('.toggle_content').slideDown('fast');
		}else{
			$('#center_column .page_product_box h3').removeClass('activeTab').off().parent().find('.toggle_content').removeAttr('style').slideDown('fast');
			$('.page_product_box h3 i').removeClass(product_icon_plus).addClass(product_icon_minus);
			$('#center_column .page_product_box').removeClass('accordion');
		}
	}		
function toDoPage(){
	   if ($(document).width() <= 768 && responsiveflagPage == false){
		    accordionPage('enable');
			responsiveflagPage = true;
				
		}
		else if ($(document).width() >= 768){
			accordionPage('disable');
	        responsiveflagPage = false;
		}
}
$(document).ready(toDoPage);
$(window).resize(toDoPage);

//   TOGGLE COLUMNS
// columns-icons-define
		var columns_icon_plus = 'icon-plus-sign';
		var columns_icon_minus = 'icon-minus-sign';
// columns-change-script
var responsiveflag = false;
function accordion(status){
		leftColumnBlocks = $('#left_column');
		if(status == 'enable'){
			$('#left_column').remove();
			$(leftColumnBlocks).insertAfter('#center_column').find('#categories_block_left ul.toggle_content').slideToggle('fast');
			$('#right_column span, #left_column span').on('click', function(){
			$(this).toggleClass('active').parent().find('.toggle_content').stop().slideToggle('medium', function(){
					  if($(this).prev().hasClass('active')) {
						  $(this).prev().children('i').removeClass(columns_icon_plus).addClass(columns_icon_minus);
					  }
					  else {
						  $(this).prev().children('i').removeClass(columns_icon_minus).addClass(columns_icon_plus);	
					  }
				  });
			})
			$('#right_column, #left_column').addClass('accordion').find('.toggle_content').slideUp('fast');
		}else{
			$('#left_column').remove();
			$(leftColumnBlocks).insertBefore('#center_column');
			$('#right_column span, #left_column span').removeClass('active').off().parent().find('.toggle_content').removeAttr('style').slideDown('fast');
			$('#right_column span i, #left_column span i').removeClass(columns_icon_minus).addClass(columns_icon_plus);
			$('#left_column, #right_column').removeClass('accordion');
		}
	}		
function toDo(){
	   if ($(document).width() <= 768 && responsiveflag == false){
		    accordion('enable');
			responsiveflag = true;
			if (typeof(categoryReload) != "undefined") { 
				categoryReload()
			}
		}
		else if ($(document).width() >= 768){
			accordion('disable');
	        responsiveflag = false;
			if (typeof(categoryReload) != "undefined") { 
				categoryReload()
			}
		}
}
$(document).ready(toDo);
$(window).resize(toDo);




//   TOGGLE FOOTER
// footer-icons-define
		var footer_icon_plus = 'icon-plus-sign';
		var footer_icon_minus = 'icon-minus-sign';
// footer-change-script
var responsiveflagFooter = false;
function accordionFooter(status){
		if(status == 'enable'){
			$('.modules .block h4').on('click', function(){
				$(this).toggleClass('active').parent().find('.toggle_content').stop().slideToggle('medium', function(){
					if($(this).prev().hasClass('active')) {
						$(this).prev().children('i').removeClass(footer_icon_plus).addClass(footer_icon_minus);
					}
					else {
						$(this).prev().children('i').removeClass(footer_icon_minus).addClass(footer_icon_plus);	
					}
				});
			})
			$('.modules').addClass('accordion').find('.toggle_content').slideUp('fast');
		}else{
			$('.modules h4').removeClass('active').off().parent().find('.toggle_content').removeAttr('style').slideDown('fast');
			$('.modules h4 i').removeClass(footer_icon_minus).addClass(footer_icon_plus);
			$('.modules').removeClass('accordion');
		}
	}		
function toDoFooter(){
	   if ($(document).width() <= 767 && responsiveflagFooter == false){
		    accordionFooter('enable');
			responsiveflagFooter = true;		
		}
		else if ($(document).width() >= 768){
			accordionFooter('disable');
	        responsiveflagFooter = false;
		}
}
$(document).ready(toDoFooter);
$(window).resize(toDoFooter);




