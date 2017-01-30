angular.module('FoodTruckApp.controllers', ['ngRoute', 'ui.router','ngMap'])
.controller('HomeCtrl', function($scope, NgMap){
  $scope.msg = 'hello'
  console.log('dd');
  NgMap.getMap().then(function(map) {
    console.log('dd');
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });

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
      templateUrl: "../partial/home.html",
      controller: "HomeCtrl"
  	});
});
