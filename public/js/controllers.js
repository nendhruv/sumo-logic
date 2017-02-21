angular.module('SumoLogicApp.controllers', [])
.controller('HomeCtrl', function($scope, dataFactory){
    $scope.showDialog = false;
    dataFactory.get('../js/data.json').then(function(data){
      $scope.items=data;
    });
    $scope.team="";
    $scope.onItemSelected=function(){
      for (var i = 0; i < $scope.items.length; i++) {
        if($scope.team === $scope.items[i].team){
          $scope.employee = $scope.items[i].employees;
          break
        }
      }
      $scope.teamEmployeeArr = []
      $scope.employee.forEach(function(data){
        var teamEmployee = {}
        teamEmployee['name'] = data
        $scope.teamEmployeeArr.push(teamEmployee)
      })
    }

    $scope.onEmplyeeSelected = function(){{
      console.log($scope.name)
    }}

    $scope.showEmail = function(){
      $scope.showDialog = !$scope.showDialog;
    }

    $scope.closeEmail = function(){
      alert("The dialog will be closed")
      $scope.name = ''
      $scope.team = ''
      $scope.message = ''    
      $scope.showDialog = !$scope.showDialog;
    }

    $scope.sendEmail = function(){
      if($scope.employee.indexOf($scope.name) > -1){
        $scope.message = $scope.name +' from the ' + $scope.team + ' team will receive an email.'
        $scope.name = ''
        $scope.team = ''
        $scope.showDialog = !$scope.showDialog;
      }
      else{
        alert("employee name typed does not match an employee in the data.")
      }
    }
})
.config(['$httpProvider', function ($httpProvider) {
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
}]);
