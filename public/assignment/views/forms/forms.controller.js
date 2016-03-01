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
            console.log("in update form selected form id " + selectedForm._id);
            FormService.updateFormById(selectedForm._id, selectedForm, FormService.doNothing);
            $scope.formsForCurrentUser = FormService.findAllFormsForUser($rootScope.currentUser._id, FormService.doNothing);
        }

        function deleteForm(index){
            console.log("in delete form");
            FormService.deleteFormById($scope.formsForCurrentUser[$scope.selectedFormIndex], FormService.doNothing);
        }


        function selectForm(index){
            console.log("in select form");
            $scope.selectedFormIndex = index;
            $scope.selectedForm = {};
            $scope.selectedForm.title = $scope.formsForCurrentUser[index].title;
            $scope.selectedForm._id = $scope.formsForCurrentUser[index]._id;
            $scope.selectedForm.userid = $scope.formsForCurrentUser[index].userid;

        }
    }

})();