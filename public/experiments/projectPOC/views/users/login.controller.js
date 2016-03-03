/**
 * Created by vedant on 2/21/16.
 */

(function (){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController (UserService, $scope, $location, $rootScope){
        $scope.login = login;

        function login(user){
            var user = UserService.findUserByCredentials(user.username, user.password, UserService.setCurrentUser);
            if(user){
                $location.url("/profile");
            }
        }
    }
})();