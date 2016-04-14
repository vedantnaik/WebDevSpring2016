/**
 * Created by vedant on 3/20/16.
 */

var q = require("q");

module.exports = function (db, mongoose, quizModel) {

    var QuestionSchema = require("./question.schema.server.js")(mongoose);
    var QuestionModel = mongoose.model('QuestionModel', QuestionSchema);

    var api = {
        createQuestion: createQuestion,
        findQuestionsByUserId: findQuestionsByUserId,
        findQuestionsByQuizId: findQuestionsByQuizId,
        findQuestionById: findQuestionById,
        updateQuestion: updateQuestion,
        deleteQuestion: deleteQuestion
    };

    return api;

    function createQuestion(question){
        var deferred = q.defer();

        QuestionModel
            .find({ questionContent: question.questionContent,
                    quizId: question.quizId },
                function(err, doc) {
                    console.log(question.quizId);
                    console.log(doc);
                    if(doc.length > 0) {
                        // similar question already exists
                        console.log("REJECT FROM Q MODEL");

                        deferred.reject();
                    } else {
                        var optionsArray = shuffleArray([question.option_A, question.option_B,
                            question.option_C, question.option_D]);

                        var newQuestion = {
                            questionContent: question.questionContent, // Text asking the question
                            answer: question.answer,

                            option_A: optionsArray[0],
                            option_B: optionsArray[1],
                            option_C: optionsArray[2],
                            option_D: optionsArray[3]
                        };

                        if(question.userId){
                            newQuestion.userId = question.userId;
                        }

                        if(question.quizId){
                            newQuestion.quizId = question.quizId;
                        }

                        QuestionModel.create(newQuestion,
                            function(err, doc){
                                if (err) {
                                    deferred.reject(err);
                                } else {

                                    quizModel
                                        .findQuizById(newQuestion.quizId)
                                        .then(
                                            function(foundQuiz){
                                                QuestionModel
                                                    .find({quizId: newQuestion.quizId},
                                                        function (err, doc) {
                                                            if (err) {

                                                            } else {
                                                                foundQuiz.questions = doc;
                                                                deferred.resolve(doc);
                                                            }
                                                        }

                                                    );
                                            },
                                            function(err){
                                                console.log("Unable to add newly created question to quiz.");
                                            }
                                        );

                                }
                            });
                    }
                });
        return deferred.promise;
    }

    function findQuestionsByUserId(userId){
        var deferred = q.defer();
        QuestionModel.find({ userId: userId },
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

    function findQuestionsByQuizId(quizId){
        var deferred = q.defer();
        QuestionModel.find({ quizId: quizId },
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

    function findQuestionById(questionId) {
        var deferred = q.defer();
        QuestionModel.findById(
            questionId,
            function(err, doc) {
                if( err ) { deferred.reject(err); }
                else { deferred.resolve(doc); }
            }
        );
        return deferred.promise;
    }

    function updateQuestion(questionId, question){

        var deferred = q.defer();

        var optionsArray = shuffleArray([question.option_A, question.option_B,
                                        question.option_C, question.option_D]);

        var newQuestion = {
            questionContent: question.questionContent, // Text asking the question
            answer: question.answer,

            option_A: optionsArray[0],
            option_B: optionsArray[1],
            option_C: optionsArray[2],
            option_D: optionsArray[3]
        };

        if(question.userId){
            newQuestion.userId = question.userId;
        }

        if(question.quizId){
            newQuestion.quizId = question.quizId;
        }

        QuestionModel.update(
            {_id: questionId},
            {$set: newQuestion},
            function(err, doc){
                if(err){
                    deferred.reject(err);
                } else {
                    QuestionModel.findById(questionId, function(err, quest) {
                        if(err){
                            deferred.reject(err);
                        } else {
                            deferred.resolve(quest);
                        }
                    });
                }
            }
        );
        return deferred.promise;
    }

    function deleteQuestion(questionId){
        var deferred = q.defer();
        QuestionModel.remove(
            {_id: questionId},
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

    // Helper functions shuffle options on create/update

    function shuffleArray(input){

        for (var i = input.length-1; i >=0; i--) {
            var randomIndex = Math.floor(Math.random()*(i+1));
            var itemAtIndex = input[randomIndex];
            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
        return input;
    }



}