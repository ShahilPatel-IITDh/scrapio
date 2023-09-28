(function(d){
            var getFile = window.TSM.fn.getFile;
            try{
              let
                getDependencies = function(){
                  return new Promise(async function( res, rej ){
                    var dependencies = ["//townsquare.media/public/dist/desktop/main.bundle.2b587ea52d7e8b53b0478a19fbac5cf6ac38d298.js?mver=15&gver=4"];
                    for(var i=0;i<dependencies.length;i++){
                      await getFile( dependencies[i] );
                    }
                    res({});
                  });
                },
                getInitialState = function(){
                  return fetch( [ location.pathname, location.search, ( location.search ? "&" : "?" ), "initialState=2b587ea52d7e8b53b0478a19fbac5cf6ac38d298" ].join( "" ) )
                    .then( response => {
                      if( !response.ok ){
                        if( response.status === 404 ){
                          return response;
                        }
                        throw Error( response.statusText );
                      }
                      return response;
                    })
                    .then( response => response.json() )
                    .catch(( err )=>{
                      console.log( "Carbon - Error in Rest response", err );
                    });
                };
              let allTasks = [ getDependencies() ];Promise.all( allTasks )
                  .then(function(results){
                    window.initCarbon && window.initCarbon();
                  });
            }catch(e){console.error(e);}
          })(document);