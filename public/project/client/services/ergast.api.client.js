/**
 * Created by vedant on 3/3/16.
 */

(function(){

    angular
        .module("F1ExplorerApp")
        .factory("ErgastService", ErgastService);

    // query standings
    var QUERY_DRIVER_STANDING_SEASON_ROUND = 'http://ergast.com/api/f1/SEASON/ROUND/driverStandings.json';

    var QUERY_CONSTRUCTOR_STANDING_SEASON_ROUND = 'http://ergast.com/api/f1/SEASON/ROUND/constructorStandings.json';
    // query driver details
    var QUERY_DRIVER_DETAILS = 'http://ergast.com/api/f1/drivers/DRIVERID.json';
    var QUERY_DRIVER_DETAILS_CIRCUITS = 'http://ergast.com/api/f1/drivers/DRIVERID/circuits.json';
    var QUERY_DRIVER_DETAILS_CONSTRUCTORS = 'http://ergast.com/api/f1/drivers/DRIVERID/constructors.json';
    var QUERY_DRIVER_DETAILS_RESULTS = 'http://ergast.com/api/f1/drivers/DRIVERID/results.json';

    var QUERY_DRIVER_DETAILS_STATUS = 'http://ergast.com/api/f1/drivers/DRIVERID/status.json';

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
            getDriverResults: getDriverResults,

            // generate facts (from server side ergast.api)
            // These calls involve some data processing. So we choose to move it to the server side
            generateDriverRRFact: generateDriverRRFact,
            generateConstructorRRFact: generateConstructorRRFact

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

        // SERVER CALLS

        function generateDriverRRFact(season, round, driverId) {
            return $http.get("/api/f1explorer/ergast/drrfact/"+season+"/"+round+"/"+driverId);
        }

        function generateConstructorRRFact(season, round, constructorId) {
            return $http.get("/api/f1explorer/ergast/crrfact/"+season+"/"+round+"/"+constructorId);
        }
    }

})();