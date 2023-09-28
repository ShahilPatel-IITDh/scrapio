if (top!=self) top.location.href=self.location.href;

window.onload = function () {
 document.getElementById('section1').style.display = 'none';
 document.getElementById('hidejs1').setAttribute('class', '');
 document.getElementById('hidejs2').setAttribute('class', '');
 document.getElementById('mrk').innerHTML += '&nbsp;<input type="checkbox" id="editor" name="editor" /><label for="editor" accesskey="i">&nbsp;Editor</label>';

 if (document.getElementById('sendfrm').encrypt[1].checked) {
  document.getElementById('sendfrm').pubkey.disabled = false;
  document.getElementById('sendfrm').eattach.disabled = false;
 } else {
  document.getElementById('sendfrm').pubkey.disabled = true;
  document.getElementById('sendfrm').eattach.disabled = true;
 }

 if (document.getElementById('sendfrm').ctype[1].checked) {
  if (document.getElementById('sendfrm').rte.value=='1') {
   document.getElementById('sendfrm').text.setAttribute('rows', '30');
   tinymce.init({
    selector: "textarea#text",
    theme: "modern",
    auto_focus : "text",
    removed_menuitems: "newdocument",
    plugins: [
         "advlist autolink link image lists charmap preview hr anchor pagebreak spellchecker",
         "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
         "table contextmenu directionality emoticons template paste textcolor"
    ]
   });
   document.getElementById('sendfrm').editor.disabled = false;
   document.getElementById('sendfrm').editor.checked = true;
  } else {
   document.getElementById('sendfrm').text.setAttribute('rows', '15');
   document.getElementById('sendfrm').editor.disabled = false;
  }
 } else {
  document.getElementById('sendfrm').text.setAttribute('rows', '15');
  document.getElementById('sendfrm').editor.disabled = true;
 }

 if (document.getElementById('sendfrm').xmailer.value != '99')
  document.getElementById('custxm').style.display = 'none';
 if (document.getElementById('sendfrm').charset.value != '99')
  document.getElementById('sendfrm').mycharset.style.display = 'none';
 if (document.getElementById('sendfrm').current.checked) {
  document.getElementById('sendfrm').date.disabled = true;
  document.getElementById('sendfrm').later.disabled = true;
 }

 document.getElementById('sendfrm').fromname.focus();

 document.getElementById('sendfrm').onreset = function () {
  if (confirm('You are about to clear the form. Proceed?'))
   document.location.href = '/';
  else
   return false;
 }

 document.getElementById('sendfrm').highest.onchange = function () {
  if (document.getElementById('sendfrm').importance[2].checked)
   alert("This option can be recognized as junk (spam)");
 }

 document.getElementById('sendfrm').xmailer.onchange = function () {
  if (document.getElementById('sendfrm').xmailer.options[12].selected || document.getElementById('sendfrm').xmailer.options[13].selected) {
   document.getElementById('custxm').style.display = 'none';
   document.getElementById('mailer').innerHTML = 'User-Agent:';
  } else if (document.getElementById('sendfrm').xmailer.options[19].selected) {
   document.getElementById('custxm').style.display = 'none';
   document.getElementById('mailer').innerHTML = 'X-Mailer:';
   alert("This option can be recognized as junk (spam)");
  } else if (document.getElementById('sendfrm').xmailer.value != '99') {
   document.getElementById('custxm').style.display = 'none';
   document.getElementById('mailer').innerHTML = 'X-Mailer:';
  } else {
   document.getElementById('mailer').innerHTML = 'X-Mailer:';
   document.getElementById('custxm').style.display = '';
   document.getElementById('sendfrm').customxm.focus();
  }
 }

 document.getElementById('sendfrm').onsubmit = function () {
  if (!document.getElementById('sendfrm').from.value) {
   alert("Valid senders e-mail address required");
   document.getElementById('sendfrm').from.focus();
   return false;
  }

  if (!document.getElementById('sendfrm').rcpt.value && !document.getElementById('sendfrm').bcc.value) {
   alert("Valid receivers e-mail address or blind carbon copy required");
   document.getElementById('sendfrm').rcpt.focus();
   return false;
  }

  if (document.getElementById('sendfrm').xmailer.value=='99' && !document.getElementById('sendfrm').customxm.value) {
   alert("Custom X-Mailer header required");
   document.getElementById('sendfrm').customxm.focus();
   return false;
  }

  if (document.getElementById('sendfrm').charset.value=='99' && !document.getElementById('sendfrm').mycharset.value) {
   alert("Custom character set required");
   document.getElementById('sendfrm').mycharset.focus();
   return false;
  }

  if (!document.getElementById('sendfrm').current.checked && !document.getElementById('sendfrm').date.value) {
   alert("Custom date required");
   document.getElementById('sendfrm').date.focus();
   return false;
  }

  if (document.getElementById('sendfrm').later.checked && !document.getElementById('sendfrm').date.value) {
   alert("Custom date required");
   document.getElementById('sendfrm').date.focus();
   return false;
  }

  if (document.getElementById('sendfrm').encrypt[1].checked && !document.getElementById('sendfrm').pubkey.value) {
   alert("Receiver's public key required");
   document.getElementById('sendfrm').pubkey.focus();
   return false;
  }

  return true;
 }

 document.getElementById('sendfrm').charset.onchange = function () {
  if (document.getElementById('sendfrm').charset.value != '99')
   document.getElementById('sendfrm').mycharset.style.display = 'none';
  else {
   document.getElementById('sendfrm').mycharset.style.display = '';
   document.getElementById('sendfrm').mycharset.focus();
  }
 }

 document.getElementById('sendfrm').current.onchange = function () {
  if (document.getElementById('sendfrm').current.checked) {
   document.getElementById('sendfrm').date.disabled = true;
   document.getElementById('sendfrm').later.disabled = true;
  } else {
   document.getElementById('sendfrm').date.disabled = false;
   document.getElementById('sendfrm').later.disabled = false;
   document.getElementById('sendfrm').date.focus();
  }
 }

 document.getElementById('sendfrm').no.onchange = function () {
  if (document.getElementById('sendfrm').encrypt[0].checked) {
   document.getElementById('sendfrm').pubkey.disabled = true;
   document.getElementById('sendfrm').eattach.disabled = true;
  }
 }

 document.getElementById('sendfrm').yes.onchange = function () {
  if (document.getElementById('sendfrm').encrypt[1].checked) {
   document.getElementById('sendfrm').pubkey.disabled = false;
   document.getElementById('sendfrm').eattach.disabled = false;
  }
 }

 document.getElementById('sendfrm').plain.onchange = function () {
  if (document.getElementById('sendfrm').ctype[0].checked) {
   document.getElementById('sendfrm').editor.checked = false;
   document.getElementById('sendfrm').editor.disabled = true;
   document.getElementById('sendfrm').rte.value = '0';
   tinymce.editors["text"].hide();
   document.getElementById('sendfrm').text.setAttribute('rows', '15');
  }
 }

 document.getElementById('sendfrm').html.onchange = function () {
  if (document.getElementById('sendfrm').ctype[1].checked) {
   document.getElementById('sendfrm').text.setAttribute('rows', '15');
   document.getElementById('sendfrm').editor.disabled = false;
  }
 }

 document.getElementById('sendfrm').editor.onchange = function () {
  if (!tinymce.activeEditor && document.getElementById('sendfrm').editor.checked) {
   document.getElementById('sendfrm').text.setAttribute('rows', '30');
   tinymce.init({
    selector: "textarea#text",
    theme: "modern",
    auto_focus : "text",
    removed_menuitems: "newdocument",
    plugins: [
         "advlist autolink link image lists charmap preview hr anchor pagebreak spellchecker",
         "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
         "table contextmenu directionality emoticons template paste textcolor"
    ]
   });
   document.getElementById('sendfrm').rte.value = '1';
  } else if (document.getElementById('sendfrm').editor.checked) {
   tinymce.editors["text"].show();
   document.getElementById('sendfrm').text.setAttribute('rows', '30');
   document.getElementById('sendfrm').rte.value = '1';
  } else {
   tinymce.editors["text"].hide();
   document.getElementById('sendfrm').text.setAttribute('rows', '15');
   document.getElementById('sendfrm').rte.value = '0';
  }
 }

 document.getElementById('bitcoin').onclick = function () {
  prompt('Bitcoin Address', '17vu4hEWtuPXFbJLPKtg4MFQnoohRE88v6');
  return false;
 }

 document.getElementById('litecoin').onclick = function () {
  prompt('Litecoin Address', 'LYFvdibzVNGrL7KXHfUSSVM1zhsxWGjABD');
  return false;
 }

 document.getElementById('addatt').onclick = function () {
    var oldfi = document.getElementById('attachment');
    var newfi = document.createElement('input');
    
    newfi.type = 'file';
    newfi.id = oldfi.id;
    newfi.name = oldfi.name;
    newfi.className = oldfi.className;
    
    oldfi.parentNode.appendChild(newfi, oldfi);

  return false;
 }

 document.getElementById('advancedbtn').onclick = function() {
  expandSection('section1');
 };

 if (window.pop)
  pop();
};

function expandSection(id) {
 var mySection = document.getElementById(id);
 if (mySection.style.display == 'none') {
  mySection.style.display = '';
 } else {
  mySection.style.display = 'none';
 }
}

