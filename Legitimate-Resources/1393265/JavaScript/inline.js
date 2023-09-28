
var fabButtonIconLinkExists = document.getElementById('fabButtonIconLinkID');
if (typeof(fabButtonIconLinkExists) != 'undefined' && fabButtonIconLinkExists != null)
{
document.getElementById('fabButtonIconLinkID').addEventListener("click", function(){
figureOutFab();
});
}
function figureOutFab() {
$('#fabButtonPopopOuterDivID').load("https://www.HugeDomains.com/rjs/hdv3-rjs/contact.cfm", function() { $('#fabButtonPopopHeadID').html('Email us'); $('#fabButtonPopopErrorDivID').hide(); $('#hdv3FabContactSubjectID').val('StormKingMedia.com'); $('#hdv3FabContactSubjectRowID').hide(); figureOutFabContactDried = 0; figureOutFabContactDoubleDown = 0; figureOutFabContactDdp = 0; $('#hdv3FabContactNameID').focus(); } );
}
