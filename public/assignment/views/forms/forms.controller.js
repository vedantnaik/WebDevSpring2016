/**
 * Created by vedant on 2/21/16.
 */

(function () {

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope, $location) {
        if ($rootScope.currentUser) {
            $scope.formsForCurrentUser = FormService.findAllFormsForUser($rootScope.currentUser._id, FormService.doNothing);
        }

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(selectedForm){
            FormService.createFormForUser($rootScope.currentUser._id, selectedForm, FormService.doNothing);
            $scope.formsForCurrentUser = FormService.findAllFormsForUser($rootScope.currentUser._id, FormService.doNothing);
        }

        function updateForm(selectedForm){
            console.log("updating " + selectedForm.title + "[" + selectedForm._id + "]" + " user " + selectedForm.userid);

            FormService.updateFormById(selectedForm._id, selectedForm, FormService.doNothing);
            $scope.formsForCurrentUser = FormService.findAllFormsForUser($rootScope.currentUser._id, FormService.doNothing);
        }

        function deleteForm(index){
            console.log("in delete form");
            FormService.deleteFormById($scope.formsForCurrentUser[index]._id, FormService.doNothing);
            $scope.formsForCurrentUser = FormService.findAllFormsForUser($rootScope.currentUser._id, FormService.doNothing);
        }


        function selectForm(index){
            $scope.selectedFormIndex = index;
            $scope.selectedForm = {};
            $scope.selectedForm.title = $scope.formsForCurrentUser[index].title;
            $scope.selectedForm._id = $scope.formsForCurrentUser[index]._id;
            $scope.selectedForm.userId = $scope.currentUser._id;

            console.log("selected " + $scope.selectedForm.title + " user " + $scope.selectedForm.userid);
        }
    }

})();