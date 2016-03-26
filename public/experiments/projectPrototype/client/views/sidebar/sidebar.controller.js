/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("ProjectPrototypeApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location){
        $scope.$location = $location;
    }

})();
