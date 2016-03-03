/**
 * Created by vedant on 3/3/16.
 */

(function(){

    angular
        .module("ProjectPOCApp")
        .factory("ErgastService", ErgastService);

    function ErgastService($http) {

        var model = {
            apiData: [],
            getDriversForSeason: getDriversForSeason,
        };
        return model;

        function getDriversForSeason(season){
            console.log("look for drivers in " + season);
            var ergastAPI = {};
            ergastAPI.getDrivers = function() {
                return $http({
                    method: 'JSONP',
                    url: 'http://ergast.com/api/f1/'+season+'/driverStandings.json'
                });
            }
            return ergastAPI.MRData;

        }

    }

})();