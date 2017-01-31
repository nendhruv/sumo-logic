angular.module('FoodTruckApp.controllers', ['ngRoute', 'ui.router','ngMap'])
.controller('HomeCtrl', function($scope, NgMap, $http){
  $scope.msg = 'hello'
  console.log('dd');
  // NgMap.getMap().then(function(map) {
  //   console.log('dd');
  //   console.log(map.getCenter());
  //   console.log('markers', map.markers);
  //   console.log('shapes', map.shapes);
  // });

  $http.get('/api/initialize').success(function(data){
    console.log(data)
    $scope.data = data.body
  })
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
