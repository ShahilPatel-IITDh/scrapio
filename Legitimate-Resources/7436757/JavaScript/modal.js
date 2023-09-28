// MODALS
// Btns
function openModal(btnsArray) {
  for(var i=0; i<btnsArray.length; i++) {
    btnsArray[i].onclick = function() {
      var modalID = 'modal_' + this.getAttribute('data-modal_id');
      document.getElementById(modalID).style.display = "block";
    }
  }
}

// Sobrio Modals btns
var sobrioModalBtns = document.querySelectorAll(".-dsg_sobrio_modal_btn");
openModal(sobrioModalBtns);
// Sobrio Modals btns
var cardDetailsModalBtns = document.querySelectorAll(".-dsg_carddetails_modal_btn");
openModal(cardDetailsModalBtns);