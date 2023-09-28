$(document).ready(function () {
  var year = $('#year').val();
  var service_name = $('#service_name').val();
  var quarter = $('#quarter').val();
  var rank_by = $('#ranked').val();

  if(quarter != '' &&  quarter != null ){
    quarter = quarter.toUpperCase();
  }

  $('#statsTable').dataTable( {
    pageLength: 15,
    pagingType: 'full_numbers',
	  dom: 'Bfrtip',
        buttons: [
            // 'csvHtml5',
            {
              extend: 'csvHtml5',              
              customize: function (csv) {
                return service_name + ' Ranked by ' + rank_by + '\r\nRanked by ' + rank_by + ' Quarter ' + year + quarter + '\r\n\r\n'+ csv;
              }
            },
            // 'pdfHtml5',
            {
              extend: 'pdf',
              title: '',
              filename: service_name,
              messageTop: service_name + ' Ranked by ' + rank_by + '\r\n \r\n Ranked by ' + rank_by + ', Quarter ' + year + quarter,
              customize: function(doc) {
                  doc.styles.message.alignment = "center";
                  doc.styles.message.fontSize = "14";                 
              }
            }
        ]  
  } );
	
	$("#export").change(function() {
	var  export_type=$('#export').val();

     // alert('export csv clicked' +export_type);
     if(export_type=='export_csv'){
         //alert('export csv clicked');
          $(".buttons-csv").trigger("click");
                 
     }else if(export_type=='export_pdf'){
         //alert('export pdf clicked');
          $(".buttons-pdf").trigger("click");
         
     }else{
       // alert('something wrong');
     }
    } );
  
  // jQuery('.residential-right .sorting select').prepend('<option value="All" selected>Sort By</option>');
  // jQuery(".residential-right .sorting select option:first-child").attr("disabled", "disabled");
  // jQuery('.residential-right .timeframe select').prepend('<option value="All" selected>Timeframe</option>');
  // jQuery(".residential-right .timeframe select option:first-child").attr("disabled", "disabled");
});

 function bdsort_custom_dropdowns() {
  jQuery(".sort-mrgsdiv select").each(function (i, select) {
    if (!jQuery(this).next().hasClass(".sort-mrgsdiv dropdown")) {
      jQuery(this).after(
        '<div class="dropdown ' +
          (jQuery(this).attr("class") || "") +
          '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>'
      );
      var dropdown = jQuery(this).next();
      var options = jQuery(select).find("option");
      var selected = jQuery(this).find("option:selected");
      dropdown
        .find(".current")
        .html(selected.data("display-text") || selected.text());
      options.each(function (j, o) {
        var display = jQuery(o).data("display-text") || "";
        dropdown
          .find("ul")
          .append(
            '<li class="option ' +
              (jQuery(o).is(":selected") ? "selected" : "") +
              '" data-value="' +
              jQuery(o).val() +
              '" data-display-text="' +
              display +
              '">' +
              jQuery(o).text() +
              "</li>"
          );
      });
    }
  });
}


jQuery (document).on('click', function(event) {
  if (jQuery (event.target).closest('.sort-mrgsdiv .dropdown').length === 0) {
    jQuery('.sort-mrgsdiv .dropdown').removeClass('open');
    jQuery ('.sort-mrgsdiv .dropdown .option').removeAttr('tabindex');
  }
  event.stopPropagation();
});
// Event listeners

// Open/close
jQuery(document).on("click", ".sort-mrgsdiv .dropdown", function (event) {
  jQuery(".sort-mrgsdiv .dropdown").not(jQuery(this)).removeClass("open");
  jQuery(this).toggleClass("open");
  if (jQuery(this).hasClass("open")) {
    jQuery(this).find(".option").attr("tabindex", 0);
    jQuery(this).find(".selected").focus();
  } else {
    jQuery(this).find(".option").removeAttr("tabindex");
    jQuery(this).focus();
  }
});

// Option click
jQuery(document).on("click", ".sort-mrgsdiv .dropdown .option", function (event) {
  jQuery(this).closest(".list").find(".selected").removeClass("selected");
  jQuery(this).addClass("selected");
  var text = jQuery(this).data("display-text") || jQuery(this).text();
  jQuery(this).closest(".dropdown").find(".current").text(text);
  jQuery(this)
    .closest(".dropdown")
    .prev("select")
    .val(jQuery(this).data("value"))
    .trigger("change");
});

jQuery(document).ready(function () {
  bdsort_custom_dropdowns();
});
  