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
            var user = UserService.findUserByCredentials({username: user.username, password: user.password});
            if(user){
                $rootScope.currentUser = user;
                UserService.setCurrentUser(user);
                $location.url("/profile");
            }
        }
    }
})();