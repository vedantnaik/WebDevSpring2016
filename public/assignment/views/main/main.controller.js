/**
 * Created by vedant on 2/21/16.
 */

(function () {

    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }

})();