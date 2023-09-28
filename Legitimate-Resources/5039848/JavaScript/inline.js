
$('#SearchBoxTrigger').on("click",function()
{
$('.search_overlay').show();
window.scrollTo({top: 0});
});
$('#close-btn').on("click",function()
{
$('.search_overlay').hide();
});
