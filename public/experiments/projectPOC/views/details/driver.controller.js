/**
 * Created by vedant on 3/6/16.
 */

(function () {

    angular
        .module("ProjectPOCApp")
        .controller("DriverController", DriverController);

    function DriverController(ErgastService, $scope, $rootScope, $location, $routeParams){

        console.log("in driver controller");

        $scope.driverId = $routeParams.driverId;

        ErgastService.getDriverInfo($scope.driverId, function(driverInfo){
            $scope.driverInfo = driverInfo;
        })

        $scope.searchCircuits = searchCircuits;



        function searchCircuits(){
            ErgastService.getDriverCircuits($scope.driverId, function(data){
                $scope.driverCircuitsData = data;
            })
        }

    }

})();