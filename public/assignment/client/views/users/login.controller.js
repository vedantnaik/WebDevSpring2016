/**
 * Created by vedant on 2/21/16.
 */

(function (){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController (UserService, $scope, $location, $rootScope){
        $scope.login = login;

        function login(user){
            if(!user) {return;}

            console.log("1");

            UserService.findUserByCredentials(user.username, user.password)
                .then(
                    function ( res ){
                        if(res.data){
                            $rootScope.currentUser = res.data;
                            $location.url("/profile");
                        } else {
                            $scope.errorMessage = "Unable to Login!";
                        }
                    },
                    function ( err ){
                        console.log("Unable to login.");
                    }
                );
        }

    }

})();