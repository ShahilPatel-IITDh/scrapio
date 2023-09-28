
 	var countryCode = 99;
    var SC=2;
    $jq('.btnQuickSearch').bind('click', function (pageName) {
    if(SC==3)
       indexObj.QuickSearch('defaultSC3');  
    else if(SC==2)
        indexObj.QuickSearch('defaultf');
    else
        indexObj.QuickSearch('default');
	});

 