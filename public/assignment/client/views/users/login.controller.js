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


        vm.login = login;

        function login(user){
            if(!user) {return;}

            UserService
                .findUserByCredentials(user.username, user.password)
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