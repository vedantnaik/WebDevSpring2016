/**
 * Created by vedant on 4/14/16.
 */

(function () {

    angular
        .module("F1ExplorerApp")
        .controller("PlayQuizController", PlayQuizController);

    function PlayQuizController(QuizService, UserService, FactService, QuestionService, $routeParams, $rootScope, $location) {

        var vm = this;

        vm.message = null;

        init();

        function init() {

            vm.quizToPlayId = $routeParams.quizId;

            QuizService
                .getQuizById(vm.quizToPlayId)
                .then(
                    function(quizData){
                        vm.quizToPlay = quizData.data;
                        vm.questionsInThisQuiz = vm.quizToPlay.questions;
                    },
                    function(err){
                        vm.message = "Unable to find this quiz. Please try some other quiz";
                    }
                );

        }
    }

})();