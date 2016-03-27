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

        function getDriversForSeason(season,callback){
            return $http.get("http://ergast.com/api/f1/"+season+"/Drivers.json");


            //$http({
            //    method: 'GET',
            //    url: 'http://ergast.com/api/f1/'+season+'/Drivers.json'
            //}).success(function(data){
            //    model.apiData = data.MRData.DriverTable.Drivers;
            //    callback(data.MRData.DriverTable.Drivers);
            //});

        }

        function getDriverStandingForSeasonRound(season, round, callback){

            return $http.get(QUERY_DRIVER_STANDING_SEASON_ROUND
                                        .replace("SEASON", season)
                                        .replace("ROUND", round));

            //$http({
            //    method: 'GET',
            //    url: QUERY_DRIVER_STANDING_SEASON_ROUND
            //        .replace("SEASON", season)
            //        .replace("ROUND", round)
            //}).success(function(data){
            //    model.apiData = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            //    callback(data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
            //
            //});

        }

        function getConstructorStandingForSeasonRound(season, round, callback){


            return $http.get(QUERY_CONSTRUCTOR_STANDING_SEASON_ROUND
                                            .replace("SEASON", season)
                                            .replace("ROUND", round));

            //$http({
            //    method: 'GET',
            //    url: QUERY_CONSTRUCTOR_STANDING_SEASON_ROUND
            //        .replace("SEASON", season)
            //        .replace("ROUND", round)
            //}).success(function(data){
            //    model.apiData = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
            //    callback(data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
            //
            //});

        }

        // driver details
        function getDriverInfo(driverId, callback){

            return $http.get(QUERY_DRIVER_DETAILS
                                    .replace("DRIVERID", driverId));

            //$http({
            //    method: 'GET',
            //    url: QUERY_DRIVER_DETAILS
            //        .replace("DRIVERID", driverId)
            //}).success(function(data){
            //    callback(data.MRData.DriverTable.Drivers[0]);
            //});
        }


        function getDriverCircuits(driverId, callback){

            return $http.get(QUERY_DRIVER_DETAILS_CIRCUITS
                                    .replace("DRIVERID", driverId));

            //$http({
            //    method: 'GET',
            //    url: QUERY_DRIVER_DETAILS_CIRCUITS
            //        .replace("DRIVERID", driverId)
            //}).success(function(data){
            //    callback(data.MRData.CircuitTable.Circuits);
            //});
        }

        function getDriverConstructors(driverId, callback){

            return $http.get(QUERY_DRIVER_DETAILS_CONSTRUCTORS
                                    .replace("DRIVERID", driverId));

            //$http({
            //    method: 'GET',
            //    url: QUERY_DRIVER_DETAILS_CONSTRUCTORS
            //        .replace("DRIVERID", driverId)
            //}).success(function (data){
            //   callback(data.MRData.ConstructorTable.Constructors);
            //});
        }

        function getDriverStatus(driverId, callback) {

            return $http.get(QUERY_DRIVER_DETAILS_STATUS
                                .replace("DRIVERID", driverId));

            //$http({
            //    method: 'GET',
            //    url: QUERY_DRIVER_DETAILS_STATUS
            //        .replace("DRIVERID", driverId)
            //}).success(function (data) {
            //    callback(data.MRData.StatusTable.Status);
            //});
        }

        function getDriverResults(driverId, callback) {

            return $http.get(QUERY_DRIVER_DETAILS_RESULTS
                                    .replace("DRIVERID", driverId));

            //$http({
            //    method: 'GET',
            //    url: QUERY_DRIVER_DETAILS_RESULTS
            //        .replace("DRIVERID", driverId)
            //}).success(function (data) {
            //    callback(data.MRData.RaceTable.Races);
            //});
        }
    }

})();