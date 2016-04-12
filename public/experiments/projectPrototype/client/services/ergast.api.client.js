/**
 * Created by vedant on 3/3/16.
 */

(function(){

    // query standings
    var QUERY_DRIVER_STANDING_SEASON_ROUND = 'http://ergast.com/api/f1/SEASON/ROUND/driverStandings.json';
    var QUERY_CONSTRUCTOR_STANDING_SEASON_ROUND = 'http://ergast.com/api/f1/SEASON/ROUND/constructorStandings.json';

    // query driver details
    var QUERY_DRIVER_DETAILS = 'http://ergast.com/api/f1/drivers/DRIVERID.json';
    var QUERY_DRIVER_DETAILS_CIRCUITS = 'http://ergast.com/api/f1/drivers/DRIVERID/circuits.json';
    var QUERY_DRIVER_DETAILS_CONSTRUCTORS = 'http://ergast.com/api/f1/drivers/DRIVERID/constructors.json';
    var QUERY_DRIVER_DETAILS_RESULTS = 'http://ergast.com/api/f1/drivers/DRIVERID/results.json';
    var QUERY_DRIVER_DETAILS_STATUS = 'http://ergast.com/api/f1/drivers/DRIVERID/status.json';

    // query for facts
    var QUERY_CONSTRUCTOR_RACE_RESULT_SEASON_ROUND = "http://ergast.com/api/f1/SEASON/ROUND/constructors/CONSTRUCTORID/results.json";
    var QUERY_DRIVER_RACE_RESULT_SEASON_ROUND = "http://ergast.com/api/f1/SEASON/ROUND/drivers/DRIVERID/results.json";

    angular
        .module("ProjectPrototypeApp")
        .factory("ErgastService", ErgastService);

    function ErgastService($http) {

        var model = {

            getDriversForSeason: getDriversForSeason,

            // standings
            getDriverStandingForSeasonRound: getDriverStandingForSeasonRound,
            getConstructorStandingForSeasonRound: getConstructorStandingForSeasonRound,

            // driver details
            getDriverInfo: getDriverInfo,
            getDriverCircuits: getDriverCircuits,
            getDriverConstructors: getDriverConstructors,
            getDriverStatus: getDriverStatus,
            getDriverResults: getDriverResults

        };
        return model;

        function getDriversForSeason(season){
            return $http.get("http://ergast.com/api/f1/"+season+"/Drivers.json");
        }

        function getDriverStandingForSeasonRound(season, round){

            return $http.get(QUERY_DRIVER_STANDING_SEASON_ROUND
                                        .replace("SEASON", season)
                                        .replace("ROUND", round));
        }

        function getConstructorStandingForSeasonRound(season, round){


            return $http.get(QUERY_CONSTRUCTOR_STANDING_SEASON_ROUND
                                            .replace("SEASON", season)
                                            .replace("ROUND", round));
        }

        // driver details
        function getDriverInfo(driverId){

            return $http.get(QUERY_DRIVER_DETAILS
                                    .replace("DRIVERID", driverId));
        }


        function getDriverCircuits(driverId){

            return $http.get(QUERY_DRIVER_DETAILS_CIRCUITS
                                    .replace("DRIVERID", driverId));
        }

        function getDriverConstructors(driverId){

            return $http.get(QUERY_DRIVER_DETAILS_CONSTRUCTORS
                                    .replace("DRIVERID", driverId));

        }

        function getDriverStatus(driverId) {

            return $http.get(QUERY_DRIVER_DETAILS_STATUS
                                .replace("DRIVERID", driverId));

        }

        function getDriverResults(driverId) {

            return $http.get(QUERY_DRIVER_DETAILS_RESULTS
                                    .replace("DRIVERID", driverId));

        }

    }

})();