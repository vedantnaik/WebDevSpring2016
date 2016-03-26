/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("ProjectPrototypeApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope, $scope) {
        $scope.user = $rootScope.currentUser;
        $scope.update = update;


        function update(user) {
            UserService
                .updateUser($rootScope.currentUser._id, user)
                .then(
                    function ( resp ) {
                        if( resp.data ) {
                            UserService.setCurrentUser( resp.data );
                        } else {
                            alert ("Unable to update user. Try again!");
                        }
                    });
        }
    }


})();