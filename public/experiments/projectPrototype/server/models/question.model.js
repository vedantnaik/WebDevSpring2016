/**
 * Created by vedant on 3/20/16.
 */

var quizzes = require("./quiz.mock.json");

module.exports = function (uuid, quizModel) {

    var api = {
        createQuestionInQuiz: createQuestionInQuiz,
        deleteQuestionInQuiz: deleteQuestionInQuiz,
        findQuestionInQuiz: findQuestionInQuiz,
        updateQuestionInQuiz: updateQuestionInQuiz,
        findQuestionsByQuizId: findQuestionsByQuizId
    };

    return api;

    function createQuestionInQuiz(quizId, question){
        var quiz = quizModel.findQuizById(quizId);
        question._id = uuid.v1();
        quiz.questions.push(question);
        return quiz.questions;
    }

    function deleteQuestionInQuiz(quizId, questionId){
        var quiz = quizModel.findQuizById(quizId);
        var quizQuestions = quiz.questions;

        for(questionIndex in quizQuestions) {
            if(quizQuestions[questionIndex]._id == questionId){
                quizQuestions.splice(questionIndex, 1);
            }
        }
    }

    function findQuestionInQuiz(quizId, questionId){
        var quiz = quizModel.findQuizById(quizId);
        var quizQuestions = quiz.questions;
        for (questionIndex in quizQuestions) {
            if (quizQuestions[questionIndex]._id == questionId){
                return quizQuestions[questionIndex];
            }
        }
    }

    function updateQuestionInQuiz(quizId, questionId, questionToUpdate){
        var quiz = quizModel.findQuizById(quizId);
        var quizQuestions = quiz.questions;
        for(questionIndex in quizQuestions) {
            if (quizQuestions[questionIndex]._id == questionId){
                quizQuestions[questionIndex] = questionToUpdate;
            }
        }
    }


    function findQuestionsByQuizId(quizId){
        var quiz = quizModel.findQuizById(quizId);
        return quiz.questions;
    }


}