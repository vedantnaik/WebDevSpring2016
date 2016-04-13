/**
 * Created by vedant on 4/11/16.
 */

module.exports = function(mongoose) {

    var FactSchema = mongoose.Schema({

        userId: String, // fact stored for user

        driverId: String, // fact related to this driver

        numRacesFinished: Number,
        numTeamsRacedFor: Number,
        numCircuitsRacedOn: Number,

    }, {collection: 'assignment.project.fact'});
    return FactSchema;
};