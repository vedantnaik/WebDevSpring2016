/**
 * Created by vedant on 2/29/16.
 */

(function (){

    angular
        .module("ProjectPOCApp")
        .factory("QuizService", QuizService);

    function QuizService(){

        var model = {

            quizzes: [
                {"_id": "000", "title": "The 70s Legends", "userId": 123},
                {"_id": "010", "title": "Rookies",     "userId": 123},
                {"_id": "020", "title": "Constructors Championship",      "userId": 234}
            ],
            createQuizForUser: createQuizForUser,
            findAllQuizzesForUser: findAllQuizzesForUser,
            deleteQuizById: deleteQuizById,
            updateQuizById: updateQuizById,
            doNothing: doNothing
        };
        return model;

        function doNothing(form){
            console.log("In do nothing")
        }

        function createQuizForUser(userId, quiz, callback){
            var quizToAdd = {};
            quizToAdd['_id'] = (new Date).getTime();
            quizToAdd['userId'] = userId;
            quizToAdd['title'] = quiz['title'];
            model.quizzes.push(quizToAdd);
            callback(quiz);
        }

        function findAllQuizzesForUser(userId, callback){
            console.log("looking for quizzes for userid " + userId);
            var foundQuizzes = [];
            for(var quizIndex in model.quizzes){
                if(model.quizzes[quizIndex].userId === userId){
                    console.log("found a quiz");
                    foundQuizzes.push(model.quizzes[quizIndex]);
                }
            }
            callback(foundQuizzes);
            return foundQuizzes;
        }

        function deleteQuizById(quizId, callback){
            for (var quizIndex in model.quizzes){
                if (model.quizzes[quizIndex]._id === quizId){
                    callback(model.quizzes.splice(quizIndex, 1));
                }
            }
        }

        function updateQuizById(quizId, newQuiz, callback){

            for (var quizIndex in model.quizzes) {
                if (model.quizzes[quizIndex]._id === quizId){

                    console.log(model.quizzes[quizIndex].userId);

                    console.log("updated record  " + model.quizzes[quizIndex].title + "[" + model.quizzes[quizIndex]._id + "]" + " user " + model.quizzes[quizIndex].userId);

                    model.quizzes[quizIndex]._id = newQuiz._id;

                    if(model.quizzes[quizIndex].title != newQuiz.title && newQuiz.title != "") {
                        model.quizzes[quizIndex].title = newQuiz.title;
                    }

                    if(model.quizzes[quizIndex].userId != newQuiz.userId && newQuiz.userId != "") {
                        model.quizzes[quizIndex].userId = newQuiz.userId;
                    }

                    console.log("updated to  " + model.quizzes[quizIndex].title + "[" + model.quizzes[quizIndex]._id + "]" + " user " + model.quizzes[quizIndex].userId);
                    console.log("updated using  " + newQuiz.title + "[" + newQuiz._id + "]" + " user " + newQuiz.userId);

                    callback(model.quizzes[quizIndex]);
                }
            }

        }

    }

})();