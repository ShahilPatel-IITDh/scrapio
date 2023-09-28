function vide1()
{
	document.getElementById("secret-nbr").value="";
	
}

function addCode(tag)
 {
   var Field = document.getElementById('secret-nbr');
   var val = Field.value;
   var selected_txt = val.substring(Field.selectionStart, Field.selectionEnd);
   var before_txt = val.substring(0, Field.selectionStart);
   var after_txt = val.substring(Field.selectionEnd, val.length);
   Field.value += tag  ;
   document.getElementById("Hidden1").value=Field.value;
	}


