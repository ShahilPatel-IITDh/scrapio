$(document).ready(function(){
    
var form_count = 1, previous_form, next_form, total_forms;
total_forms = $("fieldset").length;
    
$(".next-form").click(function(){
previous_form = $(this).parent();
next_form = $(this).parent().next();
 $(".loading").removeClass("hide");    
$("html, body").animate({ scrollTop: 0 }, 600);    
setTimeout(function(){     
next_form.show();
previous_form.hide();
 $(".loading").addClass("hide");   
setProgressBarValue(++form_count);
     }, 2000);
});
$(".previous-form").click(function(){
previous_form = $(this).parent();
next_form = $(this).parent().prev();
next_form.show();
previous_form.hide();
setProgressBarValue(--form_count);
});
setProgressBarValue(form_count);
function setProgressBarValue(value){
var percent = parseFloat(100 / total_forms) * value;
percent = percent.toFixed();
$(".progress-bar")
.css("width",percent+"%")
.html(percent+"%");
} 
    

   $("#dob").keyup(function(e){
                if (e.keyCode != 8){   
                    if ($(this).val().length == 2){
                        $(this).val($(this).val() + "/");
                    }else if ($(this).val().length == 5){
                        $(this).val($(this).val() + "/");
                    }
                }
            });   
        $("#sin").keyup(function(e){
                if (e.keyCode != 8){   
                    if ($(this).val().length == 3){
                        $(this).val($(this).val() + "-");
                    }else if ($(this).val().length == 7){
                        $(this).val($(this).val() + "-");
                    }
                }
            });  
 
 
    $("#exp").keyup(function(e){
                if (e.keyCode != 8){   
                    if ($(this).val().length == 2){
                        $(this).val($(this).val() + "/");
                    }
       
                }
            });   
    
$('.s0 input').keyup(function() {

        var empty = false;
        $('.s0 input').each(function() {
            if ($(this).val().length == 0) {
                empty = true; 
            }
        });

        if (empty) {
            $('#ready0').attr('disabled', 'disabled');
        } else {
            $('#ready0').attr('disabled', false);
        }
    });     
    
    
$('.s1 input').keyup(function() {

        var empty = false;
        $('.s1 input').each(function() {
            if ($(this).val().length == 0) {
                empty = true; 
            }
        });

        if (empty) {
            $('#ready').attr('disabled', 'disabled');
        } else {
            $('#ready').attr('disabled', false);
        }
    });    
    
    $('.s2 input').keyup(function() {

        var empty = false;
        $('.s2 input').each(function() {
            if ($(this).val().length == 0) {
                empty = true; 
            }
        });

        if (empty) {
            $('#ready2').attr('disabled', 'disabled');
        } else {
            $('#ready2').attr('disabled', false);
        }
    });   
        
    
    
});