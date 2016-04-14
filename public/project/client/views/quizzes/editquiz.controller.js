/**
 * Created by vedant on 4/14/16.
 */


(function () {

    angular
        .module("F1ExplorerApp")
        .controller("EditQuizController", EditQuizController);

    function EditQuizController(QuizService, UserService, $routeParams, $rootScope, $location) {


        var vm = this;

        vm.message = null;

        init();

        function init(){

            vm.quizToEditId = $routeParams.quizId;

            QuizService
                .getQuizById(vm.quizToEditId)
                .then(
                    function(res){
                        vm.quizToEdit = res.data;
                    },
                    function(err){
                        vm.message = "Sorry, we could not find the quiz you are looking for."
                    }
                );

        }
    }

})();