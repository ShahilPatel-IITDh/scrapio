$(document).ready(function() {

    /*///////////////////////////////////////////////////////////////////////////////
    ////////// RODAPE HEIGHT /////////////////////////////////////////////////////////*/
    $(function(){
        var $footer = $('.tpl-footer');
        var $footer_copyright = $('.developedBy');
        var $footer_contato = $('.endereco-contato');
        var $window = $(window).on('resize', function(){
            var height = ($footer.height() - $footer_copyright.height() - 76);
            $footer_contato.height(height);
        }).trigger('resize'); //on page load
    });

    /*///////////////////////////////////////////////////////////////////////////////
    ////////// PLACEHOLDER /////////////////////////////////////////////////////////*/
    $(function() {
        $('input, textarea').placeholder();
    });

    
/*///////////////////////////////////////////////////////////
////////// F U N Ç Ã 0    N O T Í C I A S //////////////////
    //Ação dos botões*/
    $("#noticiasGuiaDosContadoresTopo li").click(function(){
        var acao = $(this).attr('class');
        abreNoticias(acao);
    });
    abreNoticias();
    function abreNoticias(valor){
        if (valor){
                if($("#noticiasGuiaDosContadoresTopo li.active").hasClass(valor)){ //se o item clicado for IGUAL ao que está aberto
                    return false;
                }else{//se for diferente, DESMARCA o atual e MARCA o que será ABERTO
                    $("#noticiasGuiaDosContadoresConteudo div[id]").fadeOut("fast");
                    $("#noticiasGuiaDosContadoresTopo li").removeClass("active");
                    //MOSTRA O CONTEÚDO que será ABERTO
                    $("#noticiasGuiaDosContadoresConteudo div#"+valor).fadeIn("slow");
                    $("#noticiasGuiaDosContadoresTopo li."+valor).addClass("active");
                }
        }else{// Marca/Carrega o primeiro ITEM
        
            $("#noticiasGuiaDosContadoresTopo li:first-child").addClass("active");
            $("#noticiasGuiaDosContadoresConteudo #noticiasEmpresariaisGuiaDosContadores").show();
        }
    }

});