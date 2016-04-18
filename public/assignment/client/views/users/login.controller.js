/**
 * Created by vedant on 2/21/16.
 */

(function (){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController (UserService, $scope, $location, $rootScope){

        var vm = this;

        vm.message = null;

        vm.login = login;

        function login(user){
            vm.message = null;
            if(!user) {vm.message = "Enter username and password!"; return;}
            if(!user.username) {vm.message = "Enter username and password!"; return;}
            if(!user.password) {vm.message = "Enter password!"; return;}

            UserService
                .findUserByCredentials(user)
                .then(
                    function ( res ){
                        if(res.data){
                            UserService.setCurrentUser(res.data);
                            //$rootScope.currentUser = res.data;
                            $location.url("/profile");
                        } else {
                            vm.errorMessage = "Unable to Login!";
                        }
                    },
                    function ( err ){
                        console.log("Unable to login.");
                    }
                );
        }

    }

})();