/**
 * Created by vedant on 3/3/16.
 */

(function () {

    angular
        .module("ProjectPOCApp")
        .controller("SearchController", SearchController);

    function SearchController(ErgastService, $scope, $rootScope, $location) {
        console.log("in Quiz Controller");
        $scope.searchDrivers = searchDrivers;

        function searchDrivers(season){
            $scope.driverSearchResult = ErgastService.getDriversForSeason(season);
            console.log("in search drivers " + $scope.driverSearchResult);
        }

    }

})();