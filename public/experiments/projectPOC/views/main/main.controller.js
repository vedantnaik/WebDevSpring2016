/**
 * Created by vedant on 2/21/16.
 */

(function(){
    angular
        .module("ProjectPOCApp")
        .controller("MainController", MainController);

    function MainController ($scope, $location){
        $scope.$location = $location;
    }
})();