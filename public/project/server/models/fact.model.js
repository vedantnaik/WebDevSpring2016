/**
 * Created by vedant on 3/27/16.
 */

var q = require("q");

module.exports = function (db, mongoose) {
    var DriverRaceResultSchema = require("./driver.raceresult.schema.server.js")(mongoose);
    var DriverRaceResultModel = mongoose.model("Project_DriverRaceResultFact", DriverRaceResultSchema);

    var ConstructorRaceResultSchema = require("./constructor.raceresult.schema.server.js")(mongoose);
    var ConstructorRaceResultModel = mongoose.model("Project_ConstructorRaceResultFact", ConstructorRaceResultSchema);

    var api = {
        // Driver race results
        createDriverRaceResultFact: createDriverRaceResultFact,
        updateDriverRaceResultFactById: updateDriverRaceResultFactById,
        deleteDriverRaceResultFactById: deleteDriverRaceResultFactById,

        findAllDriverRaceResultFacts: findAllDriverRaceResultFacts,
        findAllDriverRaceResultFactsForUser: findAllDriverRaceResultFactsForUser,
        findDriverRaceResultFactById: findDriverRaceResultFactById,

        // Constructor race results
        createConstructorRaceResultFact: createConstructorRaceResultFact,
        updateConstructorRaceResultFactById: updateConstructorRaceResultFactById,
        deleteConstructorRaceResultFactById: deleteConstructorRaceResultFactById,

        findAllConstructorRaceResultFacts: findAllConstructorRaceResultFacts,
        findAllConstructorRaceResultFactsForUser: findAllConstructorRaceResultFactsForUser,
        findConstructorRaceResultFactById: findConstructorRaceResultFactById
    };

    return api;

    // Create Methods
    function createDriverRaceResultFact(fact){

        var deferred = q.defer();

        DriverRaceResultModel
            .find(
                {   userId: fact.userId,
                    factType: fact.factType,
                    driverName: fact.driverName,
                    season: fact.season,
                    round: fact.round
                },
                function(err, drrFactsForUser) {
                    if (err) {
                        deferred.reject(err);
                    } else {

                        if(drrFactsForUser.length > 0){
                            // user has already stored this fact
                            deferred.reject();
                        } else {
                            DriverRaceResultModel
                                .create(fact, function(err, doc){
                                    if(err){
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(doc);
                                    }
                                });
                        }
                    }
                }
            );

        return deferred.promise;
    }

    function createConstructorRaceResultFact(fact){

        var deferred = q.defer();

        ConstructorRaceResultModel
            .find(
                {   userId: fact.userId,
                    factType: fact.factType,
                    constructorName: fact.constructorName,
                    season: fact.season,
                    round: fact.round
                },
                function(err, crrFactsForUser) {
                    if (err) {
                        deferred.reject(err);
                    } else {

                        if(crrFactsForUser.length > 0){
                            // user has already stored this fact
                            deferred.reject();
                        } else {
                            ConstructorRaceResultModel
                                .create(fact, function(err, doc){
                                    if(err){
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(doc);
                                    }
                                });
                        }
                    }
                }
            );

        return deferred.promise;
    }

    // Update methods
    function updateDriverRaceResultFactById(factId, fact){
        var deferred = q.defer();

        var updatedFact = {
            userId: fact.userId, // fact stored for user

            factType: fact.factType, // "DRR"

            driverId: fact.driverId, // fact related to this driver
            driverName: fact.driverName,
            driverNationality: fact.driverNationality,

            constructorId: fact.constructorId,
            constructorName: fact.constructorName,
            raceName: fact.raceName,

            season: fact.season,
            round: fact.round,

            gridPosition: fact.gridPosition,
            finishingPosition: fact.finishingPosition,
            pointsEarned: fact.pointsEarned,
        };

        DriverRaceResultModel
            .update(
                {_id: factId},
                {$set: updatedFact},
                function(err, doc){
                    if(err){
                        deferred.reject(err);
                    } else {
                        DriverRaceResultModel
                            .findById(factId, function(err, fact){
                               if(err){
                                   deferred.reject(err);
                               } else {
                                   deferred.resolve(fact);
                               }
                            });
                    }
                }
            );
        return deferred.promise;
    }

    function updateConstructorRaceResultFactById(factId, fact){
        var deferred = q.defer();

        var updatedFact = {
            userId: fact.userId, // fact stored for user

            factType: fact.factType, // "CRR"

            constructorId: fact.constructorId, // fact related to this constructor
            constructorNationality: fact.constructorNationality,

            driverName_1: fact.driverName_1,
            driverName_2: fact.driverName_2,

            constructorName: fact.constructorName,
            raceName: fact.raceName,

            season: fact.season,
            round: fact.round,

            bestGridPosition: fact.bestGridPosition,            // better of both drivers
            bestFinishingPosition: fact.bestFinishingPosition,  // better of both drivers
            pointsEarned: fact.pointsEarned,                    // sum of both drivers
        };

        ConstructorRaceResultModel
            .update(
                {_id: factId},
                {$set: updatedFact},
                function(err, doc){
                    if(err){
                        deferred.reject(err);
                    } else {
                        ConstructorRaceResultModel
                            .findById(factId, function(err, fact){
                                if(err){
                                    deferred.reject(err);
                                } else {
                                    deferred.resolve(fact);
                                }
                            });
                    }
                }
            );
        return deferred.promise;
    }

    // Delete Methods
    function deleteDriverRaceResultFactById(factId){
        var deferred = q.defer();
        DriverRaceResultModel
            .remove(
            {_id: factId},
            function(err, users){
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            }
        );
        return deferred.promise;
    }

    function deleteConstructorRaceResultFactById(factId){
        var deferred = q.defer();
        ConstructorRaceResultModel
            .remove(
                {_id: factId},
                function(err, users){
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(users);
                    }
                }
            );
        return deferred.promise;
    }

    // Search Methods
    function findAllDriverRaceResultFacts() {
        var deferred = q.defer();
        DriverRaceResultModel
            .find(function (err, driverRaceResultFacts){
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(driverRaceResultFacts);
            }
        });
        return deferred.promise;
    }

    function findAllConstructorRaceResultFacts() {
        var deferred = q.defer();
        ConstructorRaceResultModel
            .find(function (err, constructorRaceResultFacts){
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(constructorRaceResultFacts);
                }
            });
        return deferred.promise;
    }

    // search for user

    function findAllDriverRaceResultFactsForUser(userId){
        var deferred = q.defer();
        DriverRaceResultModel
            .find(
                { userId: userId },
                function(err, drrFactsForUser) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(drrFactsForUser);
                    }
                }
            );
        return deferred.promise;
    }

    function findAllConstructorRaceResultFactsForUser(userId){
        var deferred = q.defer();
        ConstructorRaceResultModel
            .find(
                { userId: userId },
                function(err, crrFactsForUser) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(crrFactsForUser);
                    }
                }
            );
        return deferred.promise;
    }

    // search by id
    function findDriverRaceResultFactById(factId){
        var deferred = q.defer();
        DriverRaceResultModel
            .findById(
                factId,
                function(err, doc){
                    if(err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );
        return deferred.promise;
    }

    function findConstructorRaceResultFactById(factId){
        var deferred = q.defer();
        ConstructorRaceResultModel
            .findById(
                factId,
                function(err, doc){
                    if(err){
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );
        return deferred.promise;
    }
}
