/**
 * Created by vedant on 3/6/16.
 */

(function () {

    angular
        .module("F1ExplorerApp")
        .controller("DriverController", DriverController);

    function DriverController(ErgastService, $scope, $rootScope, $location, $routeParams, $http){

        var vm  = this;

        // initial setup
        vm.driverId = $routeParams.driverId;

        ErgastService.getDriverInfo(vm.driverId)
            .then(
                function ( res ){
                    vm.driverInfo = res.data.MRData.DriverTable.Drivers[0];

                }, function( err ) {
                    console.log("UNABLE TO LOAD DRIVER INFO FROM ERGAST");
                }
            );

        vm.activeTable = null;

        // functions
        vm.searchCircuits = searchCircuits;
        vm.searchConstructors = searchConstructors;
        vm.searchStatus = searchStatus;
        vm.searchResults = searchResults;

        function init(){
            searchResults();
        }

        init();

        function searchCircuits(){
            ErgastService.getDriverCircuits(vm.driverId)
                .then(
                    function( res ) {
                        vm.driverCircuitsData = res.data.MRData.CircuitTable.Circuits;
                        vm.activeTable = "circuits";
                    },
                    function( err ){
                        console.log("UNABLE TO GET DRIVER'S CIRCUIT INFO");
                    }
                );
        }

        function searchConstructors(){

            ErgastService.getDriverConstructors(vm.driverId)
                .then(
                    function ( res ) {
                        vm.driverConstructorsData = res.data.MRData.ConstructorTable.Constructors;
                        vm.activeTable = "constructors";
                    },
                    function ( err ) {
                        console.log("UNABLE TO GET DRIVER'S CONSTRUCTORS INFO");
                    }
                );
        }

        function searchStatus(){

            ErgastService.getDriverStatus(vm.driverId)
                .then(
                    function( res ){
                        vm.driverStatusData = res.data.MRData.StatusTable.Status;
                        vm.activeTable = "status";
                    },
                    function( err ){
                        console.log("UNABLE TO GET DRIVER'S STATUS INFO");
                    }
                );
        }

        function searchResults(){

            ErgastService.getDriverResults(vm.driverId)
                .then(
                    function ( res ) {
                        vm.driverResultsData = res.data.MRData.RaceTable.Races;
                        vm.activeTable = "results";
                    },
                    function ( err ) {
                        console.log("UNABLE TO GET DRIVER'S RESULT INFO");
                    }
                );
        }

    }

})();