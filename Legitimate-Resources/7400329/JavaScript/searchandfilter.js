/**
 * BASE URL
 */
var getUrl  = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];


/**
 * ========================================================PRODUCTS==========================================================================
 */
/**
 * Pagination [PRODUCTS]
 */

$(document).on('click', '.page-link', function(e){
    e.preventDefault();
    
    var page_number = $(this).data('page-number');
    var current_query;
    
    if( $(this).data('query') ) {
        current_query = '?' + $(this).data('query');
    }
    else {
        current_query = '';
    }

   	$.ajax({

    	url 		: baseUrl+'/wp-content/themes/dvp/inc/searchandfilter/products.php' + current_query,
    	method 		: 'GET',
    	dataType 	: 'text',
    	data 		: {'page-number' : page_number},
    	beforeSend: function() {
            $('#all-products').addClass('beforesend');
            
        },
    	success : function(data){
    		$('#all-products').removeClass('beforesend');
    		$('#all-products').html(data);
    	}

    });
   
});

/**
 * Search and Filter [PRODUCTS]
 */
$(document).on('submit', '#filter-form', function(e){
    e.preventDefault();
    
    var form = $(this);
    
    $.ajax({

    	url 		: baseUrl+'/wp-content/themes/dvp/inc/searchandfilter/products.php',
    	method 		: 'GET',
    	dataType 	: 'text',
    	data 		: $("form#filter-form").serialize(),
    	beforeSend: function() {
            $('#all-products').addClass('beforesend');
            
        },
    	success : function(data){
    		$('#all-products').removeClass('beforesend');
    		$('#all-products').html(data);
    	}

    });
    
});

/**
 * Cancel Filter & Apply Filter [PRODUCTS]
 */
$(document).ready(function(){
	// Cancel Filter
	$('#cancel_filter, #apply-filter').on( 'click', function(){
		$('.filter-box .dropdown, .filter-box .dropdown-menu').removeClass('show');
		// $('#filter-form')[0].reset();
	});
});

/**
 * Right Filter (New Release, Popular, Top Choice, All Time Fav) [PRODUCTS]
 */
// No action when user click <a>, remove and add class active
$(document).on('click', '.container-tab.products li a img', function(e){
    e.preventDefault();

    $('.container-tab.products li a img').removeClass('active');
    $(this).addClass('active');
});


/**
 * Short Value (GetValue and passing to filter function php) [PRODUCTS]
 */
$(document).on('click', '.container-tab.products li', function(){

    var shortVal = $(this).attr('shortval');

    $.ajax({

    	url 		: baseUrl+'/wp-content/themes/dvp/inc/searchandfilter/products.php',
    	method 		: 'GET',
    	dataType 	: 'text',
    	data 		: {
    		shortVal :shortVal
    	},
    	beforeSend: function() {
            $('#all-products').addClass('beforesend');
            
        },
    	success : function(data){
    		$('#all-products').removeClass('beforesend');
    		$('#all-products').html(data);
    	}

    });

});


/**
 * ========================================================REWARDS==========================================================================
 */

/**
 * Pagination [REWARDS]
 */

$(document).on('click', '.page-link-rewards', function(e){
    e.preventDefault();
    
    var page_number = $(this).data('page-number');
    var current_query;
    
    if( $(this).data('query') ) {
        current_query = '?' + $(this).data('query');
    }
    else {
        current_query = '';
    }

    $.get(baseUrl+'/wp-content/themes/dvp/inc/searchandfilter/rewards.php' + current_query, {'page-number' : page_number}, function(data){
        $('#all-products').html(data);
    });
});

/**
 * Search and Filter [REWARDS]
 */
$(document).on('submit', '#filter-form_rewards', function(e){
    e.preventDefault();
    
    var form = $(this);
    
    $.ajax({

    	url 		: baseUrl+'/wp-content/themes/dvp/inc/searchandfilter/rewards.php',
    	method 		: 'GET',
    	dataType 	: 'text',
    	data 		: $("form#filter-form_rewards").serialize(),
    	beforeSend: function() {
            $('#all-products').addClass('beforesend');
            
        },
    	success : function(data){
    		$('#all-products').removeClass('beforesend');
    		$('#all-products').html(data);
    	}

    });
    
});

/**
 * Cancel Filter & Apply Filter [REWARDS]
 */
$(document).ready(function(){
	// Cancel Filter
	$('#cancel_filter, #apply-filter').on( 'click', function(){
		$('.filter-box .dropdown, .filter-box .dropdown-menu').removeClass('show');
		// $('#filter-form-rewards')[0].reset();
	});
});

/**
 * Right Filter (New Release, Popular, Top Choice, All Time Fav) [REWARDS]
 */
// No action when user click <a>, remove and add class active
$(document).on('click', '.container-tab.rewards li a img', function(e){
    e.preventDefault();

    $('.container-tab.rewards li a img').removeClass('active');
    $(this).addClass('active');
});


/**
 * Short Value (GetValue and passing to filter function php) [REWARDS]
 */
$(document).on('click', '.container-tab.rewards li', function(){

    var shortVal = $(this).attr('shortval');

    $.ajax({

    	url 		: baseUrl+'/wp-content/themes/dvp/inc/searchandfilter/rewards.php',
    	method 		: 'GET',
    	dataType 	: 'text',
    	data 		: {
    		shortVal :shortVal
    	},
    	beforeSend: function() {
            $('#all-products').addClass('beforesend');
            
        },
    	success : function(data){
    		$('#all-products').removeClass('beforesend');
    		$('#all-products').html(data);
    	}

    });

});

/**
 * Popup [REWARDS]
 */
$(document).on('click', '[product-id]', function(){

	var getID = $(this).attr('product-id');

	$.ajax({

		url 	 : baseUrl+'/wp-content/themes/dvp/inc/searchandfilter/rewards_popup.php',
		method 	 : 'GET',
		dataType : 'text',
		data 	 : { rewardID:getID  },
		beforeSend 	 : function(){
			$('body').addClass('before_popup');
		},
		success  : function(data){
			$('body').removeClass('before_popup');
			$('#reward_modal').html(data);
			$('#modalRewards').modal('show');
		}

	});

});

$(document).on( 'click', '.modal-rewards-close', function(){
	$('#reward_modal').empty();
	$('.modal-backdrop').remove();
	$('body').removeClass('modal-open').removeAttr("style");
});

/**
 * ========================================================HISTORY REWARDS==========================================================================
 */

/**
 * Pagination [HISTORY REWARDS]
 */

$(document).on('click', '.page-link-rewards', function(e){
    e.preventDefault();
    
    var page_number = $(this).data('page-number');
    var current_query;
    
    if( $(this).data('query') ) {
        current_query = '?' + $(this).data('query');
    }
    else {
        current_query = '';
    }

    $.ajax({

    	url 		: baseUrl+'/wp-content/themes/dvp/inc/searchandfilter/history_rewards.php' + current_query,
    	method 		: 'GET',
    	dataType 	: 'text',
    	data 		: {'page-number' : page_number},
    	beforeSend: function() {
            $('#all-historyrewards').addClass('beforesend');
            
        },
    	success : function(data){
    		$('#all-historyrewards').removeClass('beforesend');
    		$('#all-historyrewards').html(data);
    	}

    });
    

});

/**
 * Search and Filter [HISTORY REWARDS]
 */
$(document).on('submit', '#filter-form_historyrewards', function(e){
    e.preventDefault();
    
    var form = $(this);
    
    $.ajax({

    	url 		: baseUrl+'/wp-content/themes/dvp/inc/searchandfilter/history_rewards.php',
    	method 		: 'GET',
    	dataType 	: 'text',
    	data 		: $("form#filter-form_historyrewards").serialize(),
    	beforeSend: function() {
            $('#all-historyrewards').addClass('beforesend');
            
        },
    	success : function(data){
    		$('#all-historyrewards').removeClass('beforesend');
    		$('#all-historyrewards').html(data);
    	}

    });
    
});

