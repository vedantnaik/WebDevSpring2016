/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("F1ExplorerApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, $scope, $rootScope, $location){
        $scope.$location = $location;
        $scope.logout = logout;

        UserService
            .getCurrentUser()
            .then(function (res) {
                var userFromServer = res.data;
                $rootScope.currentUser = userFromServer;
            });


        function logout(){
            $rootScope.currentUser = null;
            UserService.setCurrentUser(null);
        }

    }

})();