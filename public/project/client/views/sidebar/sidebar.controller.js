/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("ProjectPrototypeApp")
        .controller("SidebarController", SidebarController);

    function SidebarController(UserService, $scope, $rootScope, $location){
        $scope.$location = $location;

        UserService
            .getCurrentUser()
            .then(function (res) {
                var userFromServer = res.data;
                $rootScope.currentUser = userFromServer;
            });
    }

})();
