/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("ProjectPOCApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location){
        $scope.$location = $location;
    }

})();
