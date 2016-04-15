/**
 * Created by vedant on 3/17/16.
 */

var q = require("q");

module.exports = function(db, mongoose){

    var QuizSchema = require("./quiz.schema.server.js")(mongoose);
    var QuizModel = mongoose.model('QuizModel', QuizSchema);

    var api = {
        createQuiz: createQuiz,
        updateQuizById: updateQuizById,
        deleteQuizById: deleteQuizById,

        findAllQuizzes: findAllQuizzes,
        findQuizById: findQuizById,
        findQuizzesByTitle: findQuizzesByTitle,
        findQuizzesForUserByTitle: findQuizzesForUserByTitle,
        findAllQuizzesForUser: findAllQuizzesForUser,

        findAllPublishedQuizzes: findAllPublishedQuizzes
    };

    return api;

    function createQuiz(quiz){
        var deferred = q.defer();
        quiz.questions = [];
        QuizModel.create(quiz,
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function updateQuizById(quizId, updatedQuiz){

        var deferred = q.defer();
        // create new quiz without an _id field
        var newQuiz = {
            userId: updatedQuiz.userId,
            title: updatedQuiz.title,
            publishedStatus: updatedQuiz.publishedStatus
        };

        if(updatedQuiz.questions){
            newQuiz.questions = updatedQuiz.questions;
        }

        QuizModel.update(
            {_id: quizId},
            {$set: newQuiz},
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function deleteQuizById(quizId){
        var deferred = q.defer();
        QuizModel.remove(
            {_id: quizId},
            function(err, doc){
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findAllQuizzes() {

        var deferred = q.defer();
        QuizModel.find(
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;

    }


    function findQuizById(quizId){
        var deferred = q.defer();
        QuizModel.findById(quizId,
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findQuizzesByTitle(quizTitle){
        var deferred = q.defer();
        QuizModel.find(
            { title: quizTitle },
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findQuizzesForUserByTitle(userId, quizTitle){
        var deferred = q.defer();
        QuizModel.find(
            { userId: userId, title: quizTitle },
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findAllQuizzesForUser(userId){
        var deferred = q.defer();
        QuizModel.find(
            { userId: userId },
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findAllPublishedQuizzes(){
        var deferred = q.defer();
        QuizModel.find(
            { publishedStatus: "PUBLISHED" },
            function(err, doc) {
                if(err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
};