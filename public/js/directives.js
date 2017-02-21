angular.module('SumoLogicApp')
.directive('autocomplete', function($timeout) {
  return {
    restrict: 'AEC',
    scope: {
        items: '=',
        prompt:'@',
        title: '@',
        model: '=',
        onSelect:'&'
    },
    link:function(scope,elem,attrs){
       scope.handleSelection=function(selectedItem){
         scope.model=selectedItem;
         scope.current=0;
         scope.selected=true;        
         $timeout(function(){
             scope.onSelect();
          },200);
      };
      scope.current=0;
      scope.selected=true;
      scope.setCurrent=function(index){
         scope.current=index;
      };
    },
    templateUrl: '../partials/autocomplete.html'
  }
})