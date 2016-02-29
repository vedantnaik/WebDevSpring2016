/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $scope, $rootScope, $location  ) {
        $scope.register = register;

        function register(user) {

            var newUser = {"username": user.username, "password": user.password};
            UserService.createUser(newUser, UserService.setCurrentUser);
            $location.url("/profile");
        }
    }

})();