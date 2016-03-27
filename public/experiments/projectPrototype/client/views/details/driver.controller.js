/**
 * Created by vedant on 3/6/16.
 */

(function () {

    angular
        .module("ProjectPrototypeApp")
        .controller("DriverController", DriverController);

    function DriverController(ErgastService, $scope, $rootScope, $location, $routeParams){

        // initial setup
        $scope.driverId = $routeParams.driverId;
        ErgastService.getDriverInfo($scope.driverId, function(driverInfo){
            $scope.driverInfo = driverInfo;
        })

        $scope.activeTable = null;

        // functions
        $scope.searchCircuits = searchCircuits;
        $scope.searchConstructors = searchConstructors;
        $scope.searchStatus = searchStatus;
        $scope.searchResults = searchResults;

        function searchCircuits(){
            ErgastService.getDriverCircuits($scope.driverId, function(data){
                $scope.driverCircuitsData = data;
                $scope.activeTable = "circuits";
            })
        }

        function searchConstructors(){
            ErgastService.getDriverConstructors($scope.driverId, function(data){
                $scope.driverConstructorsData = data;
                $scope.activeTable = "constructors";
            })
        }

        function searchStatus(){
            ErgastService.getDriverStatus($scope.driverId, function(data){
                $scope.driverStatusData = data;
                $scope.activeTable = "status";
            })
        }

        function searchResults(){
            ErgastService.getDriverResults($scope.driverId, function(data){
                $scope.driverResultsData = data;
                $scope.activeTable = "results";
            })
        }
    }

})();