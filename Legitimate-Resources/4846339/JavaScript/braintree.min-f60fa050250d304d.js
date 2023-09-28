dla.payment.braintree=function(){var e,a=!1,i=!1;function t(e,a,i,t){var n={type:"POST",url:"/api/payment/braintree/CreateTokens",data:JSON.stringify({checkoutToken:e,vaultToken:a}),contentType:"application/json",dataType:"json"};$.ajax(n).done(i).fail((function(e){0===e.readyState&&0===e.status&&"error"===e.statusText?$.ajax(n).done(i).fail(t):t(e)}))}function n(a,t,n){if(dla.skin.isMobile){if(e.requiredPlayerDataMissing())return void dla.frontContent.show("addAvsPlayerData");$(".page-header").hide()}else if(!e.desktopValidation(a))return;var r;r=$('input[id*="payPalNextCompoundId"]'),jsf.ajax.render(r.attr("id")),e.check(r.val());var o={flow:n?"vault":"checkout",amount:e.model.getPrice()/100,currency:e.currency,enableShippingAddress:!1,enableBillingAddress:!0,shippingAddressEditable:!1};if(n?o.billingAgreementDescription=dla.messages.get("payment_braintree_paypal_billingAgreementDescription"):(o.intent="sale",o.useraction="commit"),i)dla.helper.log("WARNING","PayPal popup is already open. Execution stopped.");else{i=!0;var d=Date.now();t.tokenize(o,(function(e,a){if(i=!1,null===e){$('input[id*="braintreePayPalPayerId"]').val(a.details.payerId),$('input[id*="braintreePayPalPayerEmail"]').val(a.details.email),$('input[id*="braintreeNonce"]').val(a.nonce);var t=$('input[id*="braintreeNonce"]').siblings("button[id*='sendBraintreeNonce']").attr("id");jsf.ajax.request(t,"click",{execute:"@form",render:"@none","javax.faces.behavior.event":"action","javax.faces.partial.event":"click"}),$(".page-header").show()}else{var n=Date.now()-d;if(n<1e3){dla.helper.log("INFO","PayPal window closed in "+n+" ms"),$("#deactivateAll").hide();var r=dla.messages.get("payment_braintree_paypal_popUpBlockerInfo");dla.messages.showConfirm(r,(function(){location.reload()}))}else location.reload();$(".page-header").show()}}))}}function r(e,a,i,t,n){e.create({authorization:i},(function(e,r){if(e)return dla.helper.log("WARNING","initPayPalInstance client error for token "+i,e),void n();a.create({client:r},(function(e,a){if(e)return dla.helper.log("WARNING","initPayPalInstance payPal error for token "+i,e),void n();t(a)}))}))}function o(e,a,i){function t(a){(void 0!==window.ticket&&void 0!==window.ticket.model?window.ticket.model.subscription:i)&&!a?e.classList.add("disabled"):e.classList.remove("disabled")}if(dla.skin.isMobile){var n=function(){t(a.is(":checked"))};$(window).on("subscriptionChanged",n),$(window).on("ticketChanged",n)}a.change((function(){t(this.checked)})),t(a.is(":checked"))}function d(e,i,t,r){var d=$(".payPalVault");o(i,d,e.vaultRequired),i.addEventListener("click",(function(){if(!$(this).hasClass("disabled")){var e=d.is(":checked");n(this,e?r:t,e)}})),a=!1}function l(e,i){t(!0,e.vaultActive,(function(t){if(""===t.checkoutToken||""===t.vaultToken&&e.vaultActive)return $(i).addClass("disabled"),void(a=!1);!function(e,i,t){r(e.client,e.payPal,i.checkoutToken,(function(n){e.vaultActive?r(e.client,e.payPal,i.vaultToken,(function(a){d(e,t,n,a)}),(function(){$(t).addClass("disabled"),a=!1})):d(e,t,n)}),(function(){$(t).addClass("disabled"),a=!1}))}(e,t,i)}),(function(e){$(i).addClass("disabled"),a=!1,dla.helper.log("WARNING","Problems requesting braintree tokens for bootstrap PayPal",e)}))}return{initCreditCard:function(e,a){t(!1,!0,(function(i){e.create({authorization:i.vaultToken},(function(e,i){var t=document.querySelector("#"+a),n=t[a+"-pay-button"];if(e)return dla.helper.log("WARNING","client create error",e),void $(n).addClass("disabled");!function(e){for(var a=$("#"+e.id+" div.value input"),i=0;i<a.length;i++)a[i].removeAttribute("name");for(a=$("#"+e.id+" div.validity select"),i=0;i<a.length;i++)a[i].removeAttribute("name")}(t),n.addEventListener("click",(function(){dla.payment.getInstance(this).getValidator().validateAndEncryptFormData("",this),$(this).hasClass("disabled")||function(e,a){var i,t;dla.skin.isMobile?(i=e[e.id+"-expiryMonth"].options[e[e.id+"-expiryMonth"].selectedIndex].value,t=e[e.id+"-expiryYear"].options[e[e.id+"-expiryYear"].selectedIndex].value):(i=e[e.id+"-expiryMonth-input"].value,t=e[e.id+"-expiryYear-input"].value);var n={creditCard:{cardholderName:e[e.id+"-cardHolderName-input"].value,number:e[e.id+"-cardNumber-input"].value,cvv:e[e.id+"-cvcCode-input"].value,expirationMonth:i,expirationYear:t}};a.request({endpoint:"payment_methods/credit_cards",method:"post",data:n},(function(a,i){if(a)return dla.helper.log("WARNING","clientInstance request error",a),void $(".js-payment-finished-button")[0].click();var t=e.id+"-nonce",n=e.id+"-payIn";$("#"+t).val(i.creditCards[0].nonce),jsf.ajax.request(n,"click",{execute:"@form",render:"@none","javax.faces.behavior.event":"action","javax.faces.partial.event":"click"})}))}(t,i)}))}))}),(function(e){dla.helper.log("WARNING","Problems requesting braintree token for init credit card",e)}))},initPayPal:function(i,t,n){a||(a=!0,e=i,l(t,n))}}}(),$(window).trigger("available","braintreeJsLoaded");