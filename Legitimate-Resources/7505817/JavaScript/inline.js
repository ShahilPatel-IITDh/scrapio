
    var ht = new HT({
        token: "226345edc7ae6f48e21d40d78898be15",
        doNotTrack: "true"
    });
    $(document).ready(function(){
        setTimeout(function(){
            $('.sc-bdVaJa').attr('aria-label','Botão libras')
        },'2000')
        $('.ht-skip').find('button').map(function(i,el){
            $(el).attr('aria-label','Botão de libras')
        })
    })
    
