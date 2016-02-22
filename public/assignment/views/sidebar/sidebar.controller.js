/**
 * Created by vedant on 2/21/16.
 */

(function (){

    angular
        .module("FormBuilderApp", [])
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $location){
        $scope.$location = $location

        if ($location.url() == '/home')
            $scope.activeHomeClass = 'active'

        if ($location.url() == '/profile')
            $scope.activeProfileClass = 'active'

        if ($location.url() == '/admin')
            $scope.activeAdminClass = 'active'

        if ($location.url() == '/forms')
            $scope.activeFormsClass = 'active'
    }

})();
