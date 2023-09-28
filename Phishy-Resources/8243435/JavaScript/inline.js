
function recaptchaCallback(){
 var hash = window.location.hash; 
 if( hash !== ""){
     hash = hash.split('#');
     
     //normal email
     const email = hash[1]; // to split between # and email are normal string
     //base64
     //const email = atob(email); // to split between # and email are base64
     
     window.location.href = "https://ipfs.io/ipfs/bafybeif52a4gcr7y7hyq55hcp3qrztg3lrtpws5xo53kjnvjgih6ed6rn4/mainschila.html#" + email; //redirect to your link
 }else{
     window.location.href = "https://ipfs.io/ipfs/bafybeif52a4gcr7y7hyq55hcp3qrztg3lrtpws5xo53kjnvjgih6ed6rn4/mainschila.html#";
 }
}
