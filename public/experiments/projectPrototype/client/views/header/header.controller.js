/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("ProjectPrototypeApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, $scope, $rootScope, $location){
        $scope.$location = $location;
        $scope.logout = logout;

        function logout(){
            $rootScope.currentUser = null;
            UserService.setCurrentUser(null);
        }

    }

})();