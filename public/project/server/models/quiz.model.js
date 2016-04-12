/**
 * Created by vedant on 3/17/16.
 */
var quizzes = require("./quiz.mock.json");

module.exports = function(){

    var api = {
        createQuiz: createQuiz,
        updateQuizById: updateQuizById,
        deleteQuizById: deleteQuizById,
        findAllQuizs: findAllQuizs,
        findAllQuizsForUser: findAllQuizsForUser,
        findQuizByTitle: findQuizByTitle,
        findQuizById: findQuizById
    };

    return api;

    function createQuiz(quiz){
        quizzes.push(quiz);
        //callback(quiz);
        return quizzes;
    }

    function updateQuizById(quizId, newQuiz){

        for (var quizIndex in quizzes) {
            if (quizzes[quizIndex]._id == quizId){

                quizzes[quizIndex]._id = newQuiz._id;

                if(quizzes[quizIndex].title != newQuiz.title && newQuiz.title != "") {
                    quizzes[quizIndex].title = newQuiz.title;
                }

                if(quizzes[quizIndex].userId != newQuiz.userId && newQuiz.userId != "") {
                    quizzes[quizIndex].userId = newQuiz.userId;
                }

                return quizzes[quizIndex];
            }
        }

        return null;
    }

    function deleteQuizById(quizId){
        for (var quizIndex in quizzes){
            if (quizzes[quizIndex]._id == quizId){
                quizzes.splice(quizIndex, 1)
            }
        }
    }

    function findAllQuizs() {
        return quizzes;
    }

    function findAllQuizsForUser(userId){
        var quizzesForUser = [];

        for (var quizIndex in quizzes){
            if (quizzes[quizIndex].userId == userId){
                quizzesForUser.push(quizzes[quizIndex]);
            }
        }

        return quizzesForUser;
    }

    function findQuizByTitle(quizTitle){

        for (var quizIndex in quizzes){
            if (quizzes[quizIndex].title == quizTitle){
                return quizzes[quizIndex];
            }
        }

        return null;
    }

    function findQuizById(quizId){

        for (var quizIndex in quizzes){
            if (quizzes[quizIndex]._id == quizId){
                return quizzes[quizIndex];
            }
        }

        return null;
    }


};