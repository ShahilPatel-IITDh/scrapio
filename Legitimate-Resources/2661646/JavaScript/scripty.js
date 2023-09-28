function Barva(f, act)
  {
  var clr1="#f6faf1";
  var clr2="#E2F4CB";
  if(typeof(document.getElementsByTagName)!='undefined')
    {
    if(act=='ovr') SetCurrColor(f.getElementsByTagName('table'), clr2)
    else NastavBarvu(f.getElementsByTagName('table'), clr1)
    }
  }

  
function NastavBarvu(obj, clr)
  {
    if(obj[0])obj[0].style.backgroundColor=clr;
    if(obj[1])obj[1].style.backgroundColor=clr;
    if(obj[2])obj[2].style.backgroundColor=clr;
    if(obj[3])obj[3].style.backgroundColor=clr;
    if(obj[4])obj[4].style.backgroundColor=clr;
  }

var stripe = function() {
  var tables = document.getElementsByTagName("table");  
  for(var i=0;i!=tables.length;i++){
    var table = tables[i];
    if (! table) { return; }
    if ((table.className != "tab_clear") && (table.className != "tab_clear")) {
      var tbodies = table.getElementsByTagName("tbody");
      
      for (var h = 0; h < tbodies.length; h++) {
        var suda = true;
        var trs = tbodies[h].getElementsByTagName("tr");
        
        for (var j = 0; j < trs.length; j++) {
          trs[j].onmouseover=function(){
            this.className += " over"; return false
          }
          trs[j].onmouseout=function(){
            this.className = this.className.replace("over", ""); return false
          }
          
          if(suda)
            trs[j].className += " suda";
          suda = !suda;
        }
      }
    }
  }
}

jQuery(document).ready(function(){
  stripe();
     
//DataGrid
    oTable = $('.dataGrid').dataTable({
      "bJQueryUI": false,
			"bPaginate": false,
			"bSort": false,
			"bInfo": false,
			"oLanguage": {
			"sSearch": "hledej",
		  }
		});
		oTable = $('.dataGridEdit').dataTable({
      "bJQueryUI": false,
			"bPaginate": false,
			"bInfo": false,
			"oLanguage": {
			"sSearch": "hledej",
		  },
//		  "aaSorting": [[ 2, "asc" ]]
		  "aaSorting": [] //pri tomhle nastaveni je aspon pocatecni setrideni ceske, zmena jsfk 20/3/2018
		});
})

function Vycisti() {
  if (document.getElementById("user").value == "login" && document.getElementById("pass").value == "heslo") {
    document.getElementById("user").value = "SHK";
    document.getElementById("pass").value = "";
  }
}  

function Prepocitej(pocet) {
  var total = 0;
  for (i=1; i <= pocet; i++) {
    if (document.getElementById("vyber_" + i).checked == true) {
      total += 1;
    }
  }
  document.getElementById("pocetZaznamu").value = parseInt(total);
}

// Funkce pro zaškrtnutí/odškrtnutí všech políček najednou.
function nastavZatr(zatr, pocet) {

  if (zatr == true) {
    document.getElementById("pocetZaznamu").value = parseInt(pocet);
  } else {
    document.getElementById("pocetZaznamu").value = parseInt("0");
  }

  for (var i=1; i <= pocet; i++) {
    //element = document.getElementById("vyber_" + i); 
    document.getElementById("vyber_" + i).checked = zatr; 
  }
  
}