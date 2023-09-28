$(function () {
  var fechaFinal = new Date()  
  var cantidadDias = 30;
  fechaFinal.setDate(fechaFinal.getDate() + cantidadDias);

  $("#datepicker").datepicker({
    autoclose: true,
    todayHighlight: true,
    language: "es",
    format: "dd/mm/yyyy",
    maxViewMode: 1,
    startDate: new Date(),
    endDate: fechaFinal

  }).datepicker('update', new Date());;
});

