/**
 * Created by vedant on 3/4/16.
 */

(function () {

    angular
        .module("ProjectPOCApp")
        .controller("StoredController", StoredController);

    function StoredController($scope, $rootScope, $location) {
        console.log("in Stored Controller");

        $scope.setStandingsType = setStandingsType;
        $scope.displayResults = displayResults;

        $scope.championshipType = 'Drivers Championship';
        $scope.standingsSearchTypeDriver = true;

        var driverStoredResult = $rootScope.storeData.filter(function(rec) {
           return rec.recordType === 'd';
        });

        var constructorStoredResult = $rootScope.storeData.filter(function(rec) {
            return rec.recordType === 'c';
        });


        function setStandingsType(typ){
            console.log("cahnged to " + typ);
            $scope.championshipType = typ;
        }

        function displayResults(){
            if($scope.championshipType === 'Drivers Championship') {
                $scope.standingsSearchTypeDriver = true;
                $scope.displayStoredResults = null;
                $scope.displayStoredResults = driverStoredResult;
            } else {
                $scope.standingsSearchTypeDriver = false;
                $scope.displayStoredResults = null;
                $scope.displayStoredResults = constructorStoredResult;
            }
        }
    }

})();