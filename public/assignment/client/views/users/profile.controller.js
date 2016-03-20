/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope, $scope) {

        //if(!$rootScope.currentUser){
        //    $location.url("/home");
        //}

        $scope.user = $rootScope.currentUser;
        console.log("PROFILE CONTROLLER");
        console.log($scope.user);

        $scope.update = update;

        function update(user) {
            console.log("PROF CONTRL: UPDATE");
            UserService
                .updateUser($rootScope.currentUser._id, user)
                .then(
                    function ( resp ) {
                        if( resp.data ) {
                            UserService.setCurrentUser( resp.data );
                        } else {
                            alert ("Unable to udpate user. Try again!");
                        }
                    });
        }

    }

})();