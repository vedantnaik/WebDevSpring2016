/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController(UserService, $scope, $rootScope, $location){

        $scope.$location = $location;
        $scope.logout = logout;

        function init() {
            UserService
                .getCurrentUser()
                .then(
                    function(res){
                        $rootScope.currentUser = res.data;
                    }
                );

        }

        init();

        function logout(){
            $rootScope.currentUser = null;
            UserService.logout();
        }

    }

})();