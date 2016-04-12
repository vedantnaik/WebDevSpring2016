/**
 * Created by vedant on 2/21/16.
 */

(function(){
    angular
        .module("F1ExplorerApp")
        .controller("MainController", MainController);

    function MainController ($scope, $location){
        $scope.$location = $location;
    }
})();