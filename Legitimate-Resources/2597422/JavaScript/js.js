
    function updater(resource_id, url)
    {
        $("body").css("cursor", "progress");

        // Replace current content with animated loading image
        setLoader(resource_id);

        //alert(resource_id);

        if (resource_id.indexOf('tab_') != -1)
        {
            goToByScroll(resource_id);
        }

        $.ajax({ url: url, success: function(data){
            $("body").css("cursor", "auto");
            $('#' + resource_id).html(data);
          }}, "text");
    }

    function post_form_update(url, form_id, target_div)
    {
        if (form_id.indexOf('#') == -1)
        {
            form_id = '#' + form_id;
        }

        post_data = $(form_id).serialize();
        setLoader(target_div);
        $.post(url, post_data, function(data){
            $('#' + target_div).html(data);
          });
    }


    function goToByScroll(id){
        var pos = $("#"+id).offset().top;
        pos = pos - 40;
     	$('html,body').animate({scrollTop: pos},'slow');
    }

    function setLoader(target_id)
    {
        $('#' + target_id).html('<img src="/images/loading.gif" align="center" />');
    }

    function setSBLoader(target_id)
    {
        $('#' + target_id).html('<div id="searchbox"><div align="center" id="searchbox-content"><img src="/images/loading.gif" border="0" align="center" alt="Loading..." /></div></div>');
    }

    function setup_ac(search_form_id, input_id, lookup_url)
    {

            var xhr;
            $("#" + input_id).autoComplete({
                source: function(term, response){
                    try { xhr.abort(); } catch(e){}
                    xhr = $.getJSON(lookup_url, { q: term }, function(data){ response(data); });
                }
            });

            $('#' + input_id).keypress(function(e) {
              if (e.keyCode == '13') {
                 //e.preventDefault();
                 $('#' + search_form_id).submit();
               }
            });
    }

    function setup_q(search_form)
    {

        nav_active(search_form);

        var q = $.QueryString['q'];

        if (typeof q == 'undefined')
        {
            q = '';
        }

        search_form_url = base_url + 'main/sb/' + search_form + '?q=' + q;
        lookup_form_url = base_url + 'ajax/lookup/' + search_form;

        switch (search_form)
        {
            case 'saweb':
            {
                search_form_id = 'search_form';
                input_id = 'q';
                break;
            }

            case 'sadirectory':
            {
                search_form_id = 'search_form';
                input_id = 'q';
                break;
            }

            case 'international':
            {
                search_form_id = 'search_form';
                input_id = 'sbi';
                break;
            }


            default:
            {
                search_form_id = 'search_form';
                input_id = 'q';
                break;
            }


        }

        setSBLoader('sb-container');

        $.ajax({ url: search_form_url, success: function(data){
            $("body").css("cursor", "auto");
            $('#sb-container').html(data);
            setup_ac(search_form_id, input_id, lookup_form_url);
          }}, "html");
    }

    function setup_nav()
    {
        $('.nav a').each(
                function() {
                    var rel = $(this).attr('rel');
                    var target = $(this).attr('target');
                    if (!target)
                    {
                        $(this).click(function() { setup_q(rel); return false; });
                    }
                }
        );
    }

    function nav_active(nav)
    {
        $('.nav a').each(function(){
                $(this).removeClass('nav_active');

                if ($(this).attr('rel') == nav)
                {
                    $(this).addClass('nav_active');
                }
            }
        );

    }


(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})(jQuery);


/*
    Brabys Business Search
*/

/*
if (parent.document.all.Powersearch != null)
{
parent.document.all.Powersearch.src='../libs/powersearch.asp'
}
*/

function takemethere()
{
parent.window.location.href='http://www.brabys.com/info/listing-add.asp'
}

 function Change(ent)
{

if (ent.value == "Who?")
{
	ent.value = "";
}

if (ent.value == "What?")
{
	ent.value = "";
}

		if (ent.name == "searchcat")
			document.verifyInput.searchbus.value = "Who?";
		else
			document.verifyInput.searchcat.value = "What?";
		//alert(ent.name);
}

function Checkthis(form) {
	if (form.region[form.region.options.selectedIndex].value == "-2") {
			alert ("Please select region");
			return false;
		}
}
function changeframe(whichitem, towhat) {
  parent.document.getElementById(whichitem).src=towhat;
}

    function submit_page(form) {


        foundError = false;
        nameError = "";
        catError = "";
        genError = "";


		if (false) {
		if(((form.searchbus.value == "") || (form.searchbus.value =="Who?")) && ((form.searchcat.value != "") || (form.searchcat.value != "What?")))
  {
      genError = "Please enter either a company name, or category to search. \r";
         foundError = true;
 }
		}
	if (false){
        if(form.searchbus.value == "")
	{
	      if(form.searchcat.value == "")
		{
	       genError = "Please enter either a company name, or category to search. \r";
	      foundError = true;
	  }
     }
     if(form.searchbus.value != ""){
	   if(form.searchcat.value != ""){
	           genError = "Please enter either a company name, or category to search. \r";
	          foundError = true;
	       }
        }
		}


		if (form.region[form.region.options.selectedIndex].value == "-2") {
			alert ("Please select region");
			return false;
		}

        if(foundError == false) {
    			 return true;
            // go to specific URL here.
        }
        else { // SELECT THE FIRST PROBLEM FIELD
            errorMessage = genError
            alert (errorMessage)
            if (genError != "") {
				form.searchbus.focus()
                form.searchbus.select()
            }
            return false;
        }
    }


    function category_selector(level)
    {

        selector_id = 'l' + level;

        selected_id = $('#category_' + selector_id).val();

        $('#category').val(selected_id);

        selected_cat_text = $("#category_" + selector_id + " option[value='" + selected_id + "']").text()

        if (level > 1) {
            cat_label = 'Sub category:';
        } else {
            cat_label = 'Category:';
        }

        $('#cat_display_' + selector_id).html('<label>' + cat_label + ' </label>' + selected_cat_text + '<br />');
        $('#cat_display_' + selector_id).show();
        $('#cat_select_' + selector_id).hide();

        // request another level for category selection.
        add_selector(level, selected_id);

    }

    function add_selector(current_level, parent_id)
    {
        next_level = parseInt(current_level) + 1;
        resource_id = 'main_selector';
        url = base_url + 'submit/add_selector/' + next_level + '/' + parent_id;
        updater_append(resource_id, url);
    }

    function selector_reset()
    {
        $('#main_selector').html('');
        category_selector(1);
    }

    function updater_append(resource_id, url)
    {
        $("body").css("cursor", "progress");

        // Replace current content with animated loading image
        //setLoader(resource_id);

        $.ajax({ url: url, success: function(data){
            $("body").css("cursor", "auto");
            current_html = $('#' + resource_id).html();
            new_html = current_html + data;
            $('#' + resource_id).html(new_html);
          }}, "text");
    }

/*
    Code for tabs.
*/

// JavaScript Document
$(document).ready(function() {

    msg = '';
	//When page loads...
	$(".tab-content").hide(); //Hide all content

        // get all the tab sets IDs.
        $('.tab-container').each (
            function() {
                current_id = $(this).attr('id');

                if (current_id != '')
                {

                    msg += 'id: '+current_id+'\n';
                    $("ul.tabs li[rel='" + current_id + "']:first").addClass("active").show(); //Activate first tab
                    $("#" + current_id + " .tab-content:first").show(); //Show first tab content
                }
            }
        );


        //On Click Event
        $("ul.tabs li").click(function() {
                tab_id = $(this).attr('id');
                activate_tab(tab_id);
                return false;
        });




        //alert(msg);


});


function activate_tab(tab_id)
{
        if (tab_id.indexOf('#') == -1)
        {
            tab_id = '#' + tab_id;
        }

        obj = $(tab_id);

        current_tab_set = obj.attr('rel');

        $("ul.tabs li[rel='" + current_tab_set + "']").removeClass("active"); //Remove any "active" class
        $(obj).addClass("active"); //Add "active" class to selected tab
        $("#" + current_tab_set + " .tab-content").hide(); //Hide all tab content

        var activeTab = $(obj).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
        $(activeTab).fadeIn(); //Fade in the active ID content
}

function validate(section, f)
{
    msg = '';
    focus_field = '';

    switch (section)
    {
        case 'submit_details':
        {

            if (f.webmastername.value == '')
            {
                msg += '- Webmaster name\n';
                
                if (focus_field == '')
                    focus_field = f.webmaster;

            }

            if (f.webmasteremail.value == '')
            {
                msg += '- Webmaster email\n';

                if (focus_field == '')
                    focus_field = f.email;
            }

            if (f.url.value == '' || f.url.value == 'http://')
            {
                msg += '- a valid website URL\n';

                if (focus_field == '')
                    focus_field = f.url;
            }

            if (f.title.value == '')
            {
                msg += '- Website title\n';

                if (focus_field == '')
                    focus_field = f.title;

            }

            if (f.description.value == '')
            {
                msg += '- Description\n';

                if (focus_field == '')
                    focus_field = f.description;
            }

            if (f.keywords.value == '')
            {
                msg += '- Keywords\n';
                if (focus_field == '')
                    focus_field = f.keywords;
            }

            if (f.auth.value == '')
            {
                msg += '- Authorisation key\n';
                if (focus_field == '')
                    focus_field = f.auth;
            }

            break;
        }


    }

    if (msg != '')
    {
        msg = 'The following fields are required: \n' + msg;

        alerterr(msg);

        if (focus_field)
        {
            focus_field.focus();
        }


        return false;
    }

    return true;
}


function alerterr(msg)
{

    alert(msg);

}

/*$(function() { if ($('.ads-sadir-featured').html().indexOf('Featured') != -1) { $('.ads-sadir-featured').show(); } });*/
$(function() { $('.ads-sadir-featured').show() });
$(function() { $('.ads-sadir-top').show(); });

