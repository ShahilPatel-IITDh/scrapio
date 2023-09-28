(function () {
  // TOOLTIPS
  var toolTipsArray = [];
  toolTipsArray = document.querySelectorAll(".dsg_m_tooltip_container");
  for (i = 0; i < toolTipsArray.length; i++) {
    var _thisToolTip = toolTipsArray[i];
    _thisToolTip.querySelector(".dsg_a_tooltip_btn").onclick = function() {
      var currentToolBox = this.querySelector(".dsg_a_tooltip_box");
      currentToolBox.classList.add("-dsg_visible");

      setTimeout(function() { currentToolBox.classList.remove("-dsg_visible"); }, 2000); 
    }
    _thisToolTip.style.zIndex = (toolTipsArray.length - i);
  }

/*
* ADD THE TOOLTIPSBOX
*/
dsg_tooltipsBox();

})();



/****************
 * *
 *  DSG - TOOLTIPSBOX
 * *
 ***************/
function dsg_tooltipsBox() {

  dsg_createTooltipsBox();
  dsg_closeToolTipsBox();

  var  dsg_btnLink = document.querySelectorAll('a[data-tooltipsText]');
  var margin_top = 20;

  for (i = 0; i < dsg_btnLink.length; i++) {
    dsg_btnLink[i].onclick = function() { 
      // Get the text value
      var dsg_textTooltip = this.getAttribute('data-tooltipsText');
      // Get the button position
      var dsg_textTooltipPosition = this.getBoundingClientRect();
      // Add properties to the tooltipsbox   
      var dsg_targetTooltipBox= document.getElementById('dsg_tooltipsBox');
          dsg_targetTooltipBox.style.marginTop =margin_top+"px"; 
          dsg_targetTooltipBox.style.display ="block";
          dsg_targetTooltipBox.style.top =dsg_textTooltipPosition.top + window.scrollY+"px";
          dsg_targetTooltipBox.style.left =dsg_textTooltipPosition.left + window.scrollX+"px";
      // Change the tooltipsbox text
      var dsg_targetText = document.getElementById('dsg_tooltipsText');
          dsg_targetText.innerHTML  = dsg_textTooltip;
          
    }
  }
}

/*
* CLOSE THE TOOLTIPSBOX
*/
function dsg_closeToolTipsBox () {
  var  dsg_btnClose = document.querySelectorAll('.dsg_closeTooltips');
  for (i = 0; i < dsg_btnClose.length; i++) {
    dsg_btnClose[i].onclick = function() {
      var dsg_btnCloseParent = this.parentElement;
      dsg_btnCloseParent.style.display ="none";
    }
  }
}

/*
* CREATE THE TOOLTIPSBOX
* CONTAINER
*/
function dsg_createTooltipsBox () {
  var dsg_tooltipsContainer = '<div id="dsg_tooltipsBox" class="dsg_a_tooltip_box"><span class="dsg_closeTooltips">X</span><span id="dsg_tooltipsText">ooo</span></div>';
  var body = document.querySelector("body");
  var panel = document.createElement("div");
      panel.innerHTML = dsg_tooltipsContainer;
      body.appendChild(panel);
}