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
            apiData: [],        // store data received from latest API call
            storedData: [],     // data marked by user for storing as quiz facts

            getDriversForSeason: getDriversForSeason,

            // standings
            getDriverStandingForSeasonRound: getDriverStandingForSeasonRound,
            getConstructorStandingForSeasonRound: getConstructorStandingForSeasonRound,
            addToStoredDataSet: addToStoredDataSet,
            getStoredDataSet: getStoredDataSet,

            // driver details
            getDriverInfo: getDriverInfo,
            getDriverCircuits: getDriverCircuits,
            getDriverConstructors: getDriverConstructors,
            getDriverStatus: getDriverStatus,
            getDriverResults: getDriverResults

        };
        return model;

        function getDriversForSeason(season,callback){
            console.log("look for drivers in " + season);

            $http({
                method: 'GET',
                url: 'http://ergast.com/api/f1/'+season+'/Drivers.json'
            }).success(function(data){
                model.apiData = data.MRData.DriverTable.Drivers;
                callback(data.MRData.DriverTable.Drivers);
            });

        }

        function getDriverStandingForSeasonRound(season, round, callback){

            $http({
                method: 'GET',
                url: QUERY_DRIVER_STANDING_SEASON_ROUND
                    .replace("SEASON", season)
                    .replace("ROUND", round)
            }).success(function(data){
                model.apiData = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                callback(data.MRData.StandingsTable.StandingsLists[0].DriverStandings);

            });

        }

        function getConstructorStandingForSeasonRound(season, round, callback){

            $http({
                method: 'GET',
                url: QUERY_CONSTRUCTOR_STANDING_SEASON_ROUND
                    .replace("SEASON", season)
                    .replace("ROUND", round)
            }).success(function(data){
                model.apiData = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
                callback(data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);

            });

        }

        function addToStoredDataSet(record){
            model.storedData.push(record);
        }

        function getStoredDataSet(){
            return model.storedData;
        }

        // driver details
        function getDriverInfo(driverId, callback){
            $http({
                method: 'GET',
                url: QUERY_DRIVER_DETAILS
                    .replace("DRIVERID", driverId)
            }).success(function(data){
                callback(data.MRData.DriverTable.Drivers[0]);
            });
        }


        function getDriverCircuits(driverId, callback){
            $http({
                method: 'GET',
                url: QUERY_DRIVER_DETAILS_CIRCUITS
                    .replace("DRIVERID", driverId)
            }).success(function(data){
                callback(data.MRData.CircuitTable.Circuits);
            });
        }

        function getDriverConstructors(driverId, callback){
            $http({
                method: 'GET',
                url: QUERY_DRIVER_DETAILS_CONSTRUCTORS
                    .replace("DRIVERID", driverId)
            }).success(function (data){
               callback(data.MRData.ConstructorTable.Constructors);
            });
        }

        function getDriverStatus(driverId, callback) {
            $http({
                method: 'GET',
                url: QUERY_DRIVER_DETAILS_STATUS
                    .replace("DRIVERID", driverId)
            }).success(function (data) {
                callback(data.MRData.StatusTable.Status);
            });
        }

        function getDriverResults(driverId, callback) {
            $http({
                method: 'GET',
                url: QUERY_DRIVER_DETAILS_RESULTS
                    .replace("DRIVERID", driverId)
            }).success(function (data) {
                callback(data.MRData.RaceTable.Races);
            });
        }
    }

})();