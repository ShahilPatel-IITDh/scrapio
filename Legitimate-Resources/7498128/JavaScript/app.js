document.addEventListener("DOMContentLoaded", function( ){
    const bioForm = document.querySelector('#bioForm');
    const divResult = document.querySelector('.GmxBiblioResult');
    let divError = document.querySelector('.GmxBiblioFormError');

    if( bioForm ){
        
        bioForm.addEventListener("submit", function( e ){

            e.preventDefault()

            const form = new FormData( bioForm )
            const formObject = gmxProcessForm( form )



            if( formObject.flag ){
                divError.innerHTML = '<p>No has rellenado un campo del formulario</p>';
                divError.style.display = 'block';
                
                if ( divResult.classList.contains('visible')) 
                    divResult.classList.toggle('visible');  
                
                return;
            }

            // If has error previously
            divError.style.display = 'none';

            switch(formObject.tipo){
                case 'libro':
                    formObject.element.innerHTML = processBookResult(formObject);
                break;
                case 'revista':
                    formObject.element.innerHTML = processMagazineResult(formObject);
                break;
                case 'periodico':
                    formObject.element.innerHTML = processPaperResult(formObject);
                break;
                case 'enciclopedia':
                    formObject.element.innerHTML = processEncyclopediaResult(formObject);
                break;
                case 'artlibro':
                    formObject.element.innerHTML = processArtBookResult(formObject);
                break;
                case 'web':
                    formObject.element.innerHTML = processWebResult(formObject);
                break;
            }
            
            gmxToggleResult(divResult);

        })

    } 

})



function gmxProcessForm( form ){

    const tipo = form.get('tipo');
    let formProcess = {};


    switch(tipo){
        case 'libro':
            formProcess = {
                tipo: tipo,
                element: document.getElementById('gmxBookResult'),
                autor:form.get('autor'),
                anio:form.get('anio'),
                titulo:form.get('titulo'),
                lugar:form.get('lugar'),
                editorial:form.get('editorial'),
            }
        break;
        case 'revista':
            formProcess = {
                tipo: tipo,
                element: document.getElementById('gmxMagazineResult'),
                autor:form.get('autor'),
                anio:form.get('anio'),
                titulo:form.get('titulo'),
                nombreRevista:form.get('nombre_revista'),
                volumen: form.get('volumen'),
                pagina:form.get('pagina'),
            }
        break;
        case 'periodico':
            formProcess = {
                tipo: tipo,
                element: document.getElementById('gmxPaperResult'),
                autor:form.get('autor'),
                anio:form.get('anio'),
                titulo:form.get('titulo'),
                nombrePeriodico:form.get('nombre_periodico'),
                pagina:form.get('pagina'),
            }
        break;
        case 'enciclopedia':
            formProcess = {
                tipo: tipo,
                element: document.getElementById('gmxEncyclopediaResult'),
                autor:form.get('autor'),
                anio:form.get('anio'),
                titulo:form.get('titulo'),
                nombreEnciclopedia:form.get('nombre_enciclopedia'),
                pagina:form.get('pagina'),
                volumen: form.get('volumen'),
                lugar:form.get('lugar'),
                editorial:form.get('editorial'),
            }
        break;
        case 'artlibro':
            formProcess = {
                tipo: tipo,
                element: document.getElementById('gmxArtBookResult'),
                autor:form.get('autor'),
                anio:form.get('anio'),
                titulo:form.get('titulo'),
                nombreLibro:form.get('nombre_libro'),
                pagina:form.get('pagina'),
                lugar:form.get('lugar'),
                editorial:form.get('editorial'),
            }
        break;
        case 'web':
            formProcess = {
                tipo: tipo,
                element: document.getElementById('gmxWebResult'),
                autor:form.get('autor'),
                anio:form.get('anio'),
                titulo:form.get('titulo'),
                fechaRecuperacion:form.get('fecha_recuperacion'),
                asociacion:form.get('asociacion'),
                url:form.get('url'),
            }
        break;
    }


    return gmxValidForm(formProcess);

}

function gmxValidForm( form ){

    let error = { flag: false};

    
    Object.values(form).map( function( value ){

        if( typeof(value) === 'string' ){
            let wS = value.trim();

            if( wS === '')
                error.flag = true;
        }
        
    });
    

    if (error.flag == true)
    {
        return error;
    }

    return form;
    
}



function processBookResult( args ){
    const {autor,anio,titulo, lugar,editorial} = args;
    return autor + ' ' + '('+ anio +').' + ' ' + '<i>' + titulo + '</i>' + '. ' + lugar + ': ' + editorial;
}

function processMagazineResult( args ){
    const {autor,anio,titulo, nombreRevista,volumen, pagina} = args;
    return autor + '. ' + '('+ anio +').' + ' ' + '<i>' + titulo + '</i>' + '. ' + nombreRevista + ', ' + volumen + ', ' + pagina + '.' ;
}

function processPaperResult( args ){
    const {autor,anio,titulo, nombrePeriodico, pagina} = args;
    return autor + '. ' + '('+ anio +').' + ' ' + '<i>' + titulo + '</i>' + '. ' + nombrePeriodico + ', ' + pagina + '.' ;
}

function processEncyclopediaResult( args ){
    const {autor,anio,titulo, nombreEnciclopedia, volumen,  pagina, lugar, editorial} = args;
    return autor + '. ' +  anio + ' ' + '<i>' + titulo + '</i>' + '. ' + nombreEnciclopedia + ' (' + volumen + ', ' + pagina + ') ' + lugar + ': ' + editorial + '.' ;
}

function processArtBookResult( args ){
    const {autor,anio,titulo, nombreLibro,  pagina, lugar, editorial} = args;
    return autor + '. (' +  anio + '). ' + '<i>' + titulo + '.</i>' + '. En ' + nombreLibro + '(' + pagina + '). ' + lugar + ': ' + editorial + '.' ;
}

function processWebResult( args ){
    const {autor,anio,titulo, fechaRecuperacion,  asociacion, url} = args;
    return autor + '. (' +  anio + '). ' + '<i>' + titulo + '.</i>. ' + fechaRecuperacion + ' de ' + asociacion + ' Sitio web:  ' + url;
}


function gmxToggleResult( elem ){
    if( ! elem.classList.contains('visible') )
        elem.classList.toggle('visible');
}