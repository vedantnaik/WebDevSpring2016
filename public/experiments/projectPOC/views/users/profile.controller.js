/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $rootScope, $scope) {
        $scope.user = $rootScope.currentUser;
        $scope.update = update;

        function update(user) {
            UserService.updateUser(user._id, user, UserService.setCurrentUser);
        }
    }


})();