function gatrackevent(cat, action, label, value){
   try {
      if (pageTracker) {
         pageTracker._trackEvent((cat != null && cat.length > 0 ? cat : null), (action != null && action.length > 0 ? action : null), (label != null && label.length > 0 ? label : null), (value != null && value.length > 0 ? value : null));
      } else if (_gaq) {
         _gaq.push(['_trackEvent', (cat != null && cat.length > 0 ? cat : null), (action != null && action.length > 0 ? action : null), (label != null && label.length > 0 ? label : null), (value != null && value.length > 0 ? value : null)]);
      }
   } catch(err) {}
}

function gatrackselectvalue(cat, action, selectname, value){
   try {
      var index = document.getElementById(selectname).selectedIndex;
      var text = document.getElementById(selectname).options[index].text;
      gatrackevent(cat, action, text, value);
   } catch(err) {}
}

function gatrackradiovalue(cat, action, vRadioName, value){
   try {
      for (var i = 0; i < document.getElementsByName(vRadioName).length; i++ ){
         if (document.getElementsByName(vRadioName)[i].checked) {
            var vRadioValue = document.getElementsByName(vRadioName)[i].value;
            gatrackevent(cat, action, vRadioValue, value);
         }
      }
   } catch(err) {}
}