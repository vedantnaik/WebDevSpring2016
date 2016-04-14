/**
 * Created by vedant on 4/12/16.
 */


(function(){

    angular
        .module("F1ExplorerApp")
        .factory("QuestionService", QuestionService);

    function QuestionService($http) {

        var service = {
            findQuestionById: findQuestionById,
            findQuestionsInQuizById: findQuestionsInQuizById,
            findQuestionsForUserById: findQuestionsForUserById,

            addQuestion: addQuestion,
            updateQuestion: updateQuestion,
            deleteQuestionById: deleteQuestionById,

            makeDRRFactQuestion: makeDRRFactQuestion,
            makeCRRFactQuestion: makeCRRFactQuestion
        };
        return service;

        function findQuestionById(questionId) {
            return $http.get("/api/f1explorer/question/"+questionId);
        }

        function findQuestionsInQuizById(quizId) {
            return $http.get("/api/f1explorer/quiz/"+quizId+"/question/");
        }

        function findQuestionsForUserById(userId) {
            return $http.get("/api/f1explorer/user/"+userId+"/question/");
        }

        function addQuestion(question){
            return $http.post("/api/f1explorer/question",question);
        }

        function updateQuestion(questionId, question){
            return $http.put("/api/f1explorer/question/" + questionId, question);
        }

        function deleteQuestionById(questionId){
            return $http.delete("/api/f1explorer/question/"+questionId);
        }

        function makeDRRFactQuestion(factId, quizId){
            return $http.post("/api/f1explorer/question/fromDrrFact/"+factId+"/addtoquiz/"+quizId);
        }

        function makeCRRFactQuestion(factId, quizId){
            return $http.post("/api/f1explorer/question/fromCrrFact/"+factId+"/addtoquiz/"+quizId);
        }
    }
})();