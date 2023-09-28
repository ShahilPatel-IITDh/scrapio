
 const officeUrl = window.location.href;
 const office = document.getElementById("office-breadcrumb");
 const officeName = document.querySelector(".Office-name");
 
 office.href = officeUrl;
 
 if (officeName == undefined) {
 	office.innerHTML = '';
   } else {
    office.innerHTML = officeName.innerText;
 }
 