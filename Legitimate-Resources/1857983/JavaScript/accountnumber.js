// var email_regex = /^[1]{1}[1]{1}[0]{1}[0-9]{13}/;

// window.onload = function () {
//     document.getElementById("aspnetForm").onsubmit = validateForm;
// }

// function validateForm(e) {
//     var error_message = validateFields();

//     if (error_message !== "")

//     {
//         e.preventDefault();
//         alert(error_message);
//         // <span id="ctl00_ContentPlaceHolder1_plcZones_lt_zoneCenter_LayoutTwoColumn_LayoutTwoColumn_zone_1_BizForm_viewBiz_Telefon_lbe" class="EditingFormErrorLabel">Dies ist ein Pflichtfeld.</span>
//     }
// }

// //Add your field validation to this function
// function validateFields()

// {
//     var result = "";
//     result += validateAccountNumber();
//     return result;
// }
// //Gets all fields with js-validation-accountnumber class and performs regex validation
// function validateAccountNumber() {
//     console.log('jep');
//     var val, str = "";
//     var inputs = document.getElementsByClassName("js-validation-accountnumber");
//     for (var i = 0; i < inputs.length; i++)

//     {
//         val = inputs[i].value;
//         if (val === "") str = addError(str, "Die Kartenkontonummer ist nicht korrekt.", inputs[i]);
//         else if (!val.match(email_regex)) str = addError(str, "Die Kartenkontonummer '" + val + "' ist nicht korrekt.", inputs[i]);
//     }
//     return str;
// }

// function addError(str, msg, element) {
//     str += "\u2022";
//     if (element !== undefined && element !== null) {
//         var label = findLableForControl(element);
//         if (label !== undefined && label !== null)

//         {
//             str += label.innerHTML;
//             if (!str.endsWith(":")) str += ":";
//         }
//     }
//     str = " " + msg + "<br/>"; //Change '\n' to '<br/>' if displaying error message in HTML
//     return str;
// }

// function findLableForControl(el) {
//     var idVal = el.id;
//     var labels = document.getElementsByTagName('label');
//     for (var i = 0; i < labels.length; i++)

//     {
//         if (labels[i].htmlFor == idVal) return labels[i];
//     }
// }

// //Custom function used to select elements with classnames using regex
// document['getElementsByClassNameWildcard'] = function (str) {
//     var arrElements = [];

//     function findRecursively(aNode)

//     {
//         if (!aNode) return;
//         if (aNode.className !== undefined && aNode.className.indexOf(str) !== -1) arrElements.push(aNode);
//         for (var idx in aNode.childNodes) findRecursively(aNode.childNodes[idx]);
//     };

//     findRecursively(document);
//     return arrElements;
// };