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

        ErgastService.getDriverInfo($scope.driverId)
            .then(
                function ( res ){
                    $scope.driverInfo = res.data.MRData.DriverTable.Drivers[0];
                }, function( err ) {
                    console.log("UNABLE TO LOAD DRIVER INFO FROM ERGAST");
                }
            );

        $scope.activeTable = null;

        // functions
        $scope.searchCircuits = searchCircuits;
        $scope.searchConstructors = searchConstructors;
        $scope.searchStatus = searchStatus;
        $scope.searchResults = searchResults;

        function searchCircuits(){
            ErgastService.getDriverCircuits($scope.driverId)
                then.(
                    function( res ) {
                        $scope.driverCircuitsData = res.data.MRData.CircuitTable.Circuits;
                        $scope.activeTable = "circuits";
                    },
                    function( err ){
                        console.log("UNABLE TO GET DRIVER'S CIRCUIT INFO");
                    }
                );
        }

        function searchConstructors(){

            ErgastService.getDriverConstructors($scope.driverId)
                .then(
                    function ( res ) {
                        $scope.driverConstructorsData = res.data.MRData.ConstructorTable.Constructors;
                        $scope.activeTable = "constructors";
                    },
                    function ( err ) {
                        console.log("UNABLE TO GET DRIVER'S CONSTRUCTORS INFO");
                    }
                );
        }

        function searchStatus(){

            ErgastService.getDriverStatus($scope.driverId)
                .then(
                    function( res ){
                        $scope.driverStatusData = res.data.MRData.StatusTable.Status;
                        $scope.activeTable = "status";
                    },
                    function( err ){
                        console.log("UNABLE TO GET DRIVER'S STATUS INFO");
                    }
                );
        }

        function searchResults(){

            ErgastService.getDriverResults($scope.driverId)
                .then(
                    function ( res ) {
                        $scope.driverResultsData = res.data.MRData.RaceTable.Races;
                        $scope.activeTable = "results";
                    },
                    function ( err ) {
                        console.log("UNABLE TO GET DRIVER'S RESULT INFO");
                    }
                );
        }
    }

})();