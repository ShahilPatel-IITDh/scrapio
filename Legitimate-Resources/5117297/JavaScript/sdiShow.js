/**
*  2009-2019 ArtEinvoice 
*
*  For support feel free to contact us on our website at http://www.arteinformatica.eu
*
*  @author    Arte e Informatica <admin@arteinformatica.eu>
*  @copyright 2009-2019 Arte e Informatica
*  @license   One Paid Licence By WebSite Using This Module. No Rent. No Sell. No Share.
*  @version   1.0
*/
$(document).ready(function(){
	sdi_show();

	$(document).on('input', '#company, #company_invoice', function(){
		sdi_show();
	});
});

function sdi_show()
{
	if ($('#company').length && ($('#company').val() != ''))
		$('#sdicode_area, #sdipec_area').show();
	else
		$('#sdicode_area, #sdipec_area').hide();
	
	if ($('#company_invoice').length && ($('#company_invoice').val() != ''))
		$('#sdipec_area_invoice, #sdicode_area_invoice').show();
	else
		$('#sdipec_area_invoice, #sdicode_area_invoice').hide();
	
}