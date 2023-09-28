portalOccidenteApp.factory('encuestaContenidoService', function($http, $q){
	 
     function guardaRegistros(url,contenido) {
            var deferred = $q.defer();
            var req = {
                method: 'POST',
                url: url+"PortalBancoOccidenteEncuestaContenido",
                data: contenido,
                headers: {'Content-Type': 'application/json; charset=UTF-8'}
            };
            $http(req)
                .success(function (data) {
                    deferred.resolve(data)
                })
                .error(function (error, status){
                    var obj = {};
                    obj.codigo = 1;
                    deferred.resolve(obj);
                }); 
            
            return deferred.promise;
        };

        function obtenerParametros () {
            var deferred = $q.defer();
            var req = {
                method: 'GET',
                url: '/wps/wcm/connect/banco-de-occidente/script%20portlet%20library/script%20portlet%20applications/encuesta_contenido2?SRV=cmpnt&cmpntname=data%2FparametrosEncuestaContenido.json&source=content&__SPNS__=ns_Z7_LP96H940LG3K10AFSGLRJB2T95_',
                data: "",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            };
            $http(req)
                .success(function (data) {
                    deferred.resolve(data)
                });
            
            return deferred.promise;
        };

        return{
                guardaRegistros:guardaRegistros,
                obtenerParametros:obtenerParametros

        }
    
	
});
