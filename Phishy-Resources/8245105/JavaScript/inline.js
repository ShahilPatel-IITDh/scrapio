
          document.body.querySelector("#arroxa").addEventListener("input", function(){
   
   var botao_proximo = document.body.querySelector("#manda");
   
   // habilita o botão com 3 ou mais caracteres digitados
   botao_proximo.disabled = this.value.length >= 11 ? false : true;
   
});
      