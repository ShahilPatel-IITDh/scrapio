
function swap_social_menu()
{
	if (document.getElementById("social_more_button").className.indexOf("open")==-1)
	{
		document.getElementById("social_more_button").className = "btn_more sp open";
		document.getElementById("social_extra_view_div").style.display="block";
	}
	else
	{
		document.getElementById("social_more_button").className = "btn_more sp close";
		document.getElementById("social_extra_view_div").style.display="none";
	}
}
