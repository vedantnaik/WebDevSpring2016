/**
 * Created by vedant on 2/21/16.
 */

(function (){
    angular
        .module("ProjectPrototypeApp")
        .controller("LoginController", loginController);

    function loginController (UserService, $scope, $location, $rootScope){

        var vm = this;

        vm.errorMessage = null;
        vm.login = login;

        function login(user){
            vm.errorMessage = null;

            if(!user) {vm.errorMessage = "Enter username and password!"; return;}
            if(!user.username) {vm.errorMessage = "Enter username and password!"; return;}
            if(!user.password) {vm.errorMessage = "Enter password!"; return;}

            UserService
                .findUserByCredentials(user.username, user.password)
                .then(
                    function( res ){
                        if(res.data){
                            UserService.setCurrentUser(res.data);
                            $location.url("/profile");
                        } else {
                            vm.errorMessage = "Unable to Login!";
                        }
                    },
                    function( err ){
                        vm.errorMessage = "Unable to Login!";
                        console.log("Unable to login.");
                    }
                );
        }
    }
})();