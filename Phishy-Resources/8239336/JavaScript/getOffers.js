var app = angular.module('getOffers',['ngSanitize']);

// creat service
 
app.service('flightOffers_service',function(){
	this.getFlightOffers = function(dest,limit,counter,country){
		var req = {
	            method: 'POST',
	            url: 'https://www.orbisfliers.com/API_AMD/Api/OffersUpdate/getoffer',
	            data:{destcode:dest,limit:limit,counter:counter,countrycode:country},
	            config: 'application/json'     
           };
           return req; 
	};
	this.getwebsitetfn = function(url){
		var req = {
	            method: 'POST',
	            url: 'https://www.orbisfliers.com/API_AMD/Api/OffersUpdate/gettfn?weburl='+url,
	            //data:'weburl='+ url,
	            //config: 'application/json'     
           };
           return req; 
	}
});

app.controller('WebsiteTfn',function WebsiteTfn($scope,$http,flightOffers_service) {
    
    	$scope.loadData = function (url) { 
		 $scope.getTFN(url);
	};  

	$scope.getTFN = function(url) {
		$http(flightOffers_service.getwebsitetfn(url)).then(function (response) {
			$scope.flights = JSON.parse(response.data); 
        }); 
	}
});
// define the `FlightOfffers` controller on the `FlightOfffers` module
app.controller('FlightOfffers',function FlightOfffers($scope,$http,flightOffers_service) {
	$scope.Arr=[];
	$scope.loadData = function (dest,limit,counter,country) { 
		 $scope.getOffers(dest,limit,counter,country);
	};  

	$scope.getOffers = function(dest,limit,counter,country) {
		$http(flightOffers_service.getFlightOffers(dest,limit,counter,country,'')).then(function (response) {
			$scope.flights = JSON.parse(response.data); 
        }); 
	}
 
 	$scope.removeDuplicate = function (name) {
        if (name != undefined && name != null) {
            var myArray = name.split(' ');
            var myNewArray = myArray.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            return (myNewArray.join()).replace(/,/g, " ");
        }
        return false;
    };

    $scope.roundFigure = function(price){
    	return Math.ceil(price);
    };

    $scope.offerSearch = function (id,no)
	  {  
	    var formval = $('#offerForm_'+id).serialize(); 
	    var formjson = QueryStringToJSON(formval); 
	        formjson=formjson.replace('roundtrip','return');
	        formjson=formjson.replace('oneway','single');
	    var encjson = btoa(formjson);
	    var skey =  btoa('search'+Math.random()); 
	        window.localStorage.setItem(skey,encjson); 
	        window.location.href = '/flight-result.html?q='+skey; 
	    return false;
	  }
	  
	   $scope.offerSearch1 = function (id,no)
	  {  
	    var formval = $('#offerForm1_'+id).serialize(); 
	    var formjson = QueryStringToJSON(formval); 
	        formjson=formjson.replace('roundtrip','return');
	        formjson=formjson.replace('oneway','single');
	    var encjson = btoa(formjson);
	    var skey =  btoa('search'+Math.random()); 
	        window.localStorage.setItem(skey,encjson); 
	        window.location.href = '/flight-result.html?q='+skey; 
	    return false;
	  }
 
});

app.controller('getOfferPrices',function getOfferPrices($scope,$http,flightOffers_service){
	$scope.loadData = function (dest,limit,counter) {  
		 $http(flightOffers_service.getFlightOffers(dest,limit,counter,'')).then(function (response) {
			$scope.flightPrice = JSON.parse(response.data);   
        });
	};  

	$scope.roundFigure = function(price){
    	return Math.ceil(price);
    };

    $scope.removeDuplicate = function (name) {
        if (name != undefined && name != null) {
            var myArray = name.split(' ');
            var myNewArray = myArray.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            return (myNewArray.join()).replace(/,/g, " ");
        }
        return false;
    };

$scope.getAirportName=function(code){

 if(code.toUpperCase()=='SIN')
{
    return "Singapore";
}else if(code.toUpperCase()=='AKL')
{
    return "Auckland";
}else if(code.toUpperCase()=='DPS')
{
    return "Bali";
}else if(code.toUpperCase()=='LHR')
{
    return "London Heathrow";
}
else if(code.toUpperCase()=='LAS')
{
    return "Las Vegas";
}
else if(code.toUpperCase()=='BOS')
{
    return "Boston";
}
else if(code.toUpperCase()=='SFO')
{
    return "San Fransisco";
}
else if(code.toUpperCase()=='SEA')
{
    return "Seattle";
}

};

    $scope.splitString = function (name) {
    	return name.split(" ");
    };

      $scope.offerSearch = function (id,no)
      {  
        var formval = $('#offerForm_'+no+'_'+id).serialize(); 
        var formjson = QueryStringToJSON(formval); 
            formjson=formjson.replace('roundtrip','return');
            formjson=formjson.replace('oneway','single');
        var encjson = btoa(formjson);
        var skey =  btoa('search'+Math.random()); 
            window.localStorage.setItem(skey,encjson); 
            window.location.href = '/flight-result.html?q='+skey; 
        return false;
      }

});

app.controller('getSinglePrice',function getSinglePrice($scope,$http,flightOffers_service){
	$scope.loadData = function (dest,limit,country,counter) {  
		 $http(flightOffers_service.getFlightOffers(dest,limit,counter,country)).then(function (response) {
			$scope.flightPrice = JSON.parse(response.data);  
            console.log($scope.flightPrice);
        }); 
	};  

	$scope.roundFigure = function(price){
    	return Math.ceil(price);
    };

    $scope.removeDuplicate = function (name) {
        if (name != undefined && name != null) {
            var myArray = name.split(' ');
            var myNewArray = myArray.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            return (myNewArray.join()).replace(/,/g, " ");
        }
        return false;
    };
});
app.filter('deppoint', function () {
    return function (inputs,Code) {
        var filtered = [];
        angular.forEach(inputs, function (item) {
            if (item.DeparturePoint == Code ) {
                filtered.push(item);
            }
        });
        return filtered;
    }
});


app.service('blogList_service',function(){ 
    this.getBlogList = function(id=''){ 
        var req = {
            method: 'get',
            url: '/getData/getBlogList',
            params:{catId:id},
            headers: {
                contentType: 'application/json'
            }        
        };
        return req; 
    } 
});

// define the `BlogList` controller on the `orbisBlog` module
app.controller('BlogList',function BlogList($scope,$http,blogList_service,$location) {
    $scope.Arr=[];
    $scope.loadData = function () { 
        $http(blogList_service.getBlogList()).then(function (response) {
            $scope.blogs = response.data;
            $scope.Arr=$scope.blogs;
        }); 
    };  

    $scope.loadCat = function() {
        $http({
            method:'get',
            url:'/getData/getBlogCategory',
            headers: {
                contentType: 'application/json'
            }
        }).then(function successCallback(response){
            $scope.category = response.data;
        });
    };



    $scope.filterByCat = function (arg) {
        var result = $scope.Arr.filter(elem => elem.category_name==arg); 
        $scope.blogs = result; 
    }

    $scope.getTags = function () {
        $http({
            method:'get',
            url:'/getData/getBlogTags',
            headers: {
                contentType: 'application/json'
            }
        }).then(function successCallback(response){
            $scope.tags = response.data;
        });
    }
  

}); 