
    //$(function () {
    $("#pagination").twbsPagination({
        totalPages: 100,
        visiblePages: 10,
        startPage: 1,
        href: '/s/DXMJ-002/{{number}}.html',
        first: 'First',
        prev: 'Prev',
        next: 'Next',
        last: 'Last'
    });
    //});
function ShowImage(id1,id2,fanhaourl) 
{
    if(fanhaourl!="")
    {
        TagName = document.getElementById("ShowFanHaoImg");
        TagName.innerHTML = "look AVideos：<br/><a href=\"/fgs/" + id1 + "/" + id2 + ".html\" href=\"big image\" target=\"_blank\"><img src='"+fanhaourl+"'></a> ";
    }
}

