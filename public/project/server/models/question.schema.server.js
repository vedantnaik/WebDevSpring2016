/**
 * Created by vedant on 4/12/16.
 */

module.exports = function(mongoose) {

    var QuestionSchema = mongoose.Schema({

        userId: String, // user who created the question
        quizId: String, // quiz to which this question belongs to

        questionContent: String, // Text asking the question

        option_A: String,
        option_B: String,
        option_C: String,
        option_D: String,

        answer: String

    }, {collection: 'project.question'});
    return QuestionSchema;
};