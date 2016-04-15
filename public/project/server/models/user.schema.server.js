/**
 * Created by vedant on 4/8/16.
 */

module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        quizzesTakenListOfIds: { type: [String], default: []},
        score: { type: Number, default: 0},
        level: { type: Number, default: 1}
    }, {collection: 'project.user'});
    return UserSchema;
};


// user score
// quizes taken list