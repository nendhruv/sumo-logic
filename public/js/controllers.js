angular.module('FoodTruckApp.controllers', ['ngRoute', 'ui.router','ngMap', 'google.places'])
.controller('HomeCtrl', function($scope, NgMap, $http){
  $scope.loading = false;
  $scope.place = '';
  // console.log($scope.place);
  $scope.defaultLat = 37.7749;
  $scope.defaultLong = -122.4194;
  $scope.truckDetails = function(truck){
    // console.log(truck)
    $scope.truck = truck
  }

  $scope.truckList = function(){
    $scope.truck = false;
  }

  $scope.$watch('place', function(){
    if(typeof($scope.place) === "object"){
      $scope.userLat = $scope.place.geometry.location.lat();
      // console.log($scope.place.geometry.location)
      $scope.userLong = $scope.place.geometry.location.lng();
      var kmInLongitudeDegree = 111.320 * Math.cos( $scope.userLat / 180.0 * Math.PI)
      var deltaLong = 2 / kmInLongitudeDegree; // 2 is radius in km
      var deltaLat = 2 / 111.1; // 2 is radius in km

      var minLat = $scope.userLat - deltaLat;
      var maxLat = $scope.userLat + deltaLat;
      var minLong = $scope.userLong - deltaLong;
      var maxLong = $scope.userLong + deltaLong;
      $scope.loading = true;
      $http.get('/api/getfoodtrucks?minlat='+minLat+'&maxlat='+maxLat+'&minlong='+minLong+'&maxlong='+maxLong+'&type=Truck').success(function(data){
        // console.log(data)
        if(data.err){
          $scope.defaultLat = 37.7749;
          $scope.defaultLong = -122.4194;
          $scope.msg = 'Oops there is no data to display'
          $scope.data = null

        }
        else if(data.data.length === 0){
          $scope.defaultLat = 37.7749;
          $scope.defaultLong = -122.4194;
          $scope.msg = 'Oops there is no data to display'
          $scope.data = null
        }
        else{
          $scope.data = data.data
          $scope.defaultLat = $scope.userLat
          $scope.defaultLong = $scope.userLong
        }
        $scope.loading = false;
      })

    }
  })
  // NgMap.getMap().then(function(map) {
  //   console.log('dd');
  //   console.log(map.getCenter());
  //   console.log('markers', map.markers);
  //   console.log('shapes', map.shapes);
  // });
  $scope.pos = function(h){
    // console.log(h);
  }
})
.config(['$httpProvider', function ($httpProvider) {
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
}])
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "../partials/home.html",
      controller: "HomeCtrl"
  	});
});
