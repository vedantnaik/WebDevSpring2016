/**
 * Created by vedant on 4/11/16.
 */

module.exports = function(mongoose) {

    var ConstructorRaceResultSchema = mongoose.Schema({

        userId: String, // fact stored for user

        factType: String, // "CRR"

        constructorId: String, // fact related to this constructor

        driverName_1: String,
        driverName_2: String,

        constructorName: String,
        raceName: String,

        season: Number,
        round: Number,

        bestGridPosition: Number,       // better of both drivers
        bestFinishingPosition: Number,  // better of both drivers
        pointsEarned: Number,           // sum of both drivers

    }, {collection: 'assignment.poc.raceresults.f1constructor'});
    return ConstructorRaceResultSchema;
};