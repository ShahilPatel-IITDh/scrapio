function validarArquivo(campo,result){
    var x = document.getElementById(campo);
	var txt = "";
	var file;
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Selecione um arquivo!";
        } else {
            file = x.files[0];
        }
    }
    document.getElementById(result).src = URL.createObjectURL(file);
}

function validarImagem(w,h){
	var img = document.getElementById('demo');
	var texto = "";
	
	if(h>0 && img.height>h)
		texto += "Altura da imagem: "+img.height+"px.\nA imagem selecionada não deve ter mais de "+h+" pixels de altura!";
	
	if(texto!="" && w>0) texto+="\n\n";
	
	if(w>0 && img.height>w)
		texto += "Largura da imagem: "+img.width+"px.\nA imagem selecionada não deve ter mais de "+w+" pixels de largura!";
	
	alert(texto);	
}
