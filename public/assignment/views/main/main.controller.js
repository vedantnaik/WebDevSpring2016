/**
 * Created by vedant on 2/21/16.
 */

(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", function ($scope, $location){
            $scope.$location = $location;
        });

})();