angular.module('dating.models.locations', [
])
.service('LocationsModel', function($http, $q) {
  var model = this,
      URLS = {
        GET_CURRENT_LOCATION: '/location/current',
      }


  model.getCurrent = function(user) {
    return $http.get(URLS.GET_CURRENT_LOCATION)
  }
})

