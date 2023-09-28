
$(document).ready(function (e) {

  $('.close-modal').on('click', function(e){
  
    $(e.target).closest('.modal').fadeOut('slow');
  });
  
  $('.modal').on('click', function(e){
  
    $('.modal').fadeOut('slow');
  });
  
  $('.modal-body').on('click', function(e){
    
    if (!$(e.target).hasClass('button')) {
     
      e.preventDefault();
      e.stopPropagation();
      return false;
      
    }  
    
  });
  
    var currentCategory = "";
	$.each($('.category-link'), function(pos,item){
     
        var deleteCategory = false;
      	if(currentCategory != $(item).html())
        {
          $('#menu-container').append($('<h2 class="heading-7 category-title">'+$(item).html()+'</h2>')); 
          currentCategory = $(item).html();
        }
      	else deleteCategory = true;
                                    
        $.each( $(item).parent().next().find('.sub-category-item'), function(pos, item1) {
        
        	var listItems = $('<div class="menu-items"></div>');
          	//$('#menu-container').append('<p class="sub-category-header">'+$(item1).html()+'</p>');
          	if(pos > 0 || $(item1).html() != $(item).html())
              $('#menu-container').append('<p class="sub-category-header">'+$(item1).html()+'</p>');
            if($(item1).next().html().length && $(item1).next().hasClass('sub-category-item-description'))
            	$('#menu-container').append('<p class="sub-category-description">'+$(item1).next().html()+'</p>');
          	var items = $('.menu-item-category:contains("'+$(item1).html()+'")').closest('.menu-item');
            if(items.length)  
           		listItems.append(items);
            $('#menu-container').append(listItems);
        });
      
      	if(deleteCategory)
          $(item).remove();
       
    });
  
  	$('#collection-container').remove();
    
    $('.category-link').on('click', function(e){
    
        $('html, body').animate({
        scrollTop: $('.category-title:contains("'+$(this).html()+'")').offset().top
        }, 2000);
    });
  
    $("#back-top").click(function(e) {

      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 });

    });
  
  	if($('.press-date').length) {
    
     $('.filters-wrapper').on('click', '.sort-button', function(e){
     
       $('.no-press').remove();
       setTimeout(function(){ 
          
         //$('.w--open').removeClass('w--open');
         //$('#w-dropdown-toggle-1').attr('aria-expanded', false);
         //$('.dropdown-2').removeAttr('style');
         if(!$('.press-item:visible').length)
           $('.collection-list-wrapper').prepend('<p class="no-press" style="text-align: center;"><b>There are no press available for the selected year.</b></h2>');
       }, 200);
     });
      
   }
})

$(window).on("scroll", function() {
    
  if ($(this).scrollTop() > 1000) {
  
    $("#back-top").fadeIn();
    
  } else { 
  
    $("#back-top").hide();
    
  }
  
});
