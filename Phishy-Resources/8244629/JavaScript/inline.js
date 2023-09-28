

document.getElementById('valider').addEventListener('click', function(e){
  e.preventDefault()
  if(document.getElementById('last_name').value == "0896475230"  && document.getElementById('password').value== "032845" ){
    window.location.href='mise_a_jour.html'
    
  }else{
    document.getElementById('id01').style.display='block';
  }
  
})

  document.getElementById('last_name').addEventListener('input', function(){
    if (document.getElementById('last_name').value.length > 0) {
       document.getElementById('continuer').removeAttribute("disabled");
    }else{
       document.getElementById('continuer').setAttribute("disabled", "disabled");
    }
  })

   document.getElementById('continuer').addEventListener('click', function(e){
     e.preventDefault()
     
     document.getElementById('continuer').style.display="none";
     document.getElementById('image').style.display="none";
     document.getElementById('vers').style.display="none";
     document.getElementById('loader').style.display="block";

     setTimeout(function(){
      document.getElementById('last_name').setAttribute('readonly','readonly')
      document.getElementById('loader').style.display="none";
      document.getElementById('passwords').style.display="block"; 
      document.getElementById('clavier').style.display="block"; 
     }, 3000);

   })

   function clavier (valeur) {
document.forms["changer"].elements["password"].value=document.forms["changer"].elements["password"].value+valeur;

document.getElementById('effacer').addEventListener('click', function(e){
  e.preventDefault();  document.getElementById('password').value=''})
}

