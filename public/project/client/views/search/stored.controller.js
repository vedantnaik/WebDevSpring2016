/**
 * Created by vedant on 3/4/16.
 */

(function () {

    angular
        .module("ProjectPrototypeApp")
        .controller("StoredController", StoredController);

    function StoredController(ErgastService, FactService, $scope, $rootScope, $location) {
        console.log("in Stored Controller");

        $scope.setStandingsType = setStandingsType;
        $scope.displayResults = displayResults;

        $scope.championshipType = 'Drivers Championship';
        $scope.standingsSearchTypeDriver = true;

        function setStandingsType(typ){
            console.log("cahnged to " + typ);
            $scope.championshipType = typ;
        }

        function displayResults(){

            FactService.findAllFactsForUser($rootScope.currentUser._id)
                .then(
                    function( res ){
                        var storedData = res.data;
                        var driverStoredResult = storedData.filter(function (rec) {return rec.recordType === 'd';});
                        var constructorStoredResult = storedData.filter(function (rec) {return rec.recordType === 'c';});

                        if($scope.championshipType === 'Drivers Championship') {
                            $scope.standingsSearchTypeDriver = true;
                            $scope.displayStoredResults = null;
                            $scope.displayStoredResults = driverStoredResult;
                        } else {
                            $scope.standingsSearchTypeDriver = false;
                            $scope.displayStoredResults = null;
                            $scope.displayStoredResults = constructorStoredResult;
                        }
                    },
                    function (err)  {
                        console.log("UNABLE TO GET STORED FACTS TO CLIENT SIDE");
                    }
                );

        }
    }

})();