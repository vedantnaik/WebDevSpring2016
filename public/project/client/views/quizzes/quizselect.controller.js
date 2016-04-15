/**
 * Created by vedant on 4/14/16.
 */

(function () {

    angular
        .module("F1ExplorerApp")
        .controller("QuizSelectController", QuizSelectController);

    function QuizSelectController(QuizService, UserService, FactService, QuestionService, $routeParams, $rootScope, $location) {

        var vm = this;

        vm.message = null;

        vm.selectToPlay = selectToPlay;

        init();

        function init() {

            QuizService
                .getAllQuizzes()
                .then(
                    function(quizData){
                        vm.allQuizzes = quizData.data;
                    },
                    function(err){
                        vm.message = "Unable to find list of our quizzes. Please try after sometime. Or create one!";
                    }
                );
        }


        function selectToPlay(quizId){
            $location.url("/quizzes/playQuiz/" + quizId);
        }
    }

})();