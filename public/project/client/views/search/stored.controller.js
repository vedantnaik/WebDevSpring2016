/**
 * Created by vedant on 3/4/16.
 */

(function () {

    angular
        .module("ProjectPrototypeApp")
        .controller("StoredController", StoredController);

    function StoredController(ErgastService, FactService, $scope, $rootScope, $location) {
        console.log("in Stored Controller");

        var vm = this;

        vm.setStandingsType = setStandingsType;
        vm.displayResults = displayResults;

        vm.championshipType = 'Drivers Championship';
        vm.standingsSearchTypeDriver = true;

        function setStandingsType(typ){
            console.log("changed to " + typ);
            vm.championshipType = typ;
        }

        function displayResults(){

            FactService.findAllFactsForUser($rootScope.currentUser._id)
                .then(
                    function( res ){

                        var storedData = res.data;
                        var driverStoredResult = storedData
                                                .filter(function (rec) {return rec.factType === 'DRR';});
                        var constructorStoredResult = storedData
                                                .filter(function (rec) {return rec.factType === 'CRR';});

                        if(vm.championshipType === 'Drivers Championship') {
                            vm.standingsSearchTypeDriver = true;
                            vm.displayStoredResults = null;
                            vm.displayStoredResults = driverStoredResult;
                        } else {
                            vm.standingsSearchTypeDriver = false;
                            vm.displayStoredResults = null;
                            vm.displayStoredResults = constructorStoredResult;
                        }
                    },
                    function (err)  {
                        console.log("UNABLE TO GET STORED FACTS TO CLIENT SIDE");
                    }
                );

        }
    }

})();