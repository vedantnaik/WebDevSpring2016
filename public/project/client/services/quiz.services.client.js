/**
 * Created by vedant on 2/29/16.
 */

(function (){

    angular
        .module("F1ExplorerApp")
        .factory("QuizService", QuizService);

    function QuizService($http){

        var api = {
            createQuizForUser: createQuizForUser,
            findAllQuizzesForUser: findAllQuizzesForUser,
            deleteQuizById: deleteQuizById,
            updateQuizById: updateQuizById,
            findQuizById: findQuizById
        };
        return api;


        function createQuizForUser(userId, quiz){
            return $http.post("/api/f1explorer/user/"+userId+"/quiz",quiz);
        }

        function findAllQuizzesForUser(userId){
            return $http.get("/api/f1explorer/user/"+userId+"/quiz");
        }

        function deleteQuizById(quizId){
            return $http.delete("/api/f1explorer/quiz/"+quizId);
        }

        function updateQuizById(quizId, newQuiz){

            return $http.put("/api/f1explorer/quiz/"+quizId, newQuiz);

        }

        function findQuizById(quizId){
            return $http.get("/api/f1explorer/quiz/"+quizId);
        }

    }

})();