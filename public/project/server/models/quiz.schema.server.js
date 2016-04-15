/**
 * Created by vedant on 4/12/16.
 */

module.exports = function(mongoose) {

    var QuestionSchema = require("./question.schema.server.js")(mongoose);

    var QuizSchema = mongoose.Schema({

        userId: String, // user who created the quiz
        title: String, // Name given to the quiz by its creator
        questions: [QuestionSchema],

        publishedStatus: { type: String, default: "NOT_PUBLISED"},

    }, {collection: 'project.quiz'});
    return QuizSchema;
};
