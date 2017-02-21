angular.module('SumoLogicApp')
.factory('dataFactory', function($http) {
  return {
    get: function(url) {
      return $http.get(url).then(function(resp) {
        employeedData = resp.data
        return resp.data;
      });
    }
  };
});