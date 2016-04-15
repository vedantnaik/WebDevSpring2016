/**
 * Created by vedant on 2/29/16.
 */

(function (){

    angular
        .module("F1ExplorerApp")
        .factory("QuizService", QuizService);

    function QuizService($http){

        var api = {
            createQuizByUserId: createQuizByUserId,
            updateQuizById: updateQuizById,
            deleteQuizById: deleteQuizById,

            getAllQuizzes: getAllQuizzes,
            getQuizById: getQuizById,
            getQuizzesByTitle: getQuizzesByTitle,
            getQuizzesForUserByTitle: getQuizzesForUserByTitle,
            getAllQuizzesForUser: getAllQuizzesForUser,
            getPublishedQuizzes: getPublishedQuizzes

        };
        return api;

        function createQuizByUserId(userId, quiz){
            return $http.post("/api/f1explorer/user/"+userId+"/quiz",quiz);
        }

        function updateQuizById(quizId, updatedQuiz){
            return $http.put("/api/f1explorer/quiz/"+quizId, updatedQuiz);
        }

        function deleteQuizById(quizId){
            return $http.delete("/api/f1explorer/quiz/"+quizId);
        }

        function getAllQuizzes(){
            return $http.get("/api/f1explorer/quizzes/");
        }

        function getQuizById(quizId){
            return $http.get("/api/f1explorer/quiz/"+quizId);
        }


        function getQuizzesByTitle(quizTitle){
            return $http.get("/api/f1explorer/quizzes/quiz/"+quizTitle);
        }

        function getQuizzesForUserByTitle(userId, quizTitle){
            return $http.get("/api/f1explorer/quizzes/user/"+userId+"/quiz/"+quizTitle);
        }

        function getAllQuizzesForUser(userId){
            return $http.get("/api/f1explorer/quizzes/user/"+userId);
        }

        function getPublishedQuizzes() {
            return $http.get("/api/f1explorer/quizzes/published/");
        }
    }

})();