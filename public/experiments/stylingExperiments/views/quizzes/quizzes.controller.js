/**
 * Created by vedant on 2/21/16.
 */

(function () {

    angular
        .module("ProjectPOCApp")
        .controller("QuizController", QuizController);

    function QuizController(QuizService, $scope, $rootScope, $location) {
        if ($rootScope.currentUser) {
            $scope.quizzesForCurrentUser = QuizService.findAllQuizzesForUser($rootScope.currentUser._id, QuizService.doNothing);
        }

        $scope.addQuiz = addQuiz;
        $scope.updateQuiz = updateQuiz;
        $scope.deleteQuiz = deleteQuiz;
        $scope.selectQuiz = selectQuiz;

        function addQuiz(selectedQuiz){
            QuizService.createQuizForUser($rootScope.currentUser._id, selectedQuiz, QuizService.doNothing);
            $scope.quizzesForCurrentUser = QuizService.findAllQuizzesForUser($rootScope.currentUser._id, QuizService.doNothing);
        }

        function updateQuiz(selectedQuiz){
            console.log("updating " + selectedQuiz.title + "[" + selectedQuiz._id + "]" + " user " + selectedQuiz.userid);

            QuizService.updateQuizById(selectedQuiz._id, selectedQuiz, QuizService.doNothing);
            $scope.quizzesForCurrentUser = QuizService.findAllQuizzesForUser($rootScope.currentUser._id, QuizService.doNothing);
        }

        function deleteQuiz(index){
            console.log("in delete Quiz");
            QuizService.deleteQuizById($scope.quizzesForCurrentUser[index]._id, QuizService.doNothing);
            $scope.quizzesForCurrentUser = QuizService.findAllQuizzesForUser($rootScope.currentUser._id, QuizService.doNothing);
        }


        function selectQuiz(index){
            $scope.selectedQuizIndex = index;
            $scope.selectedQuiz = {};
            $scope.selectedQuiz.title = $scope.quizzesForCurrentUser[index].title;
            $scope.selectedQuiz._id = $scope.quizzesForCurrentUser[index]._id;
            $scope.selectedQuiz.userId = $scope.currentUser._id;

            console.log("selected " + $scope.selectedQuiz.title + " user " + $scope.selectedQuiz.userid);

        }
    }

})();