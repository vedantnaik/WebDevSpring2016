/**
 * Created by vedant on 2/21/16.
 */

(function () {

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope, $location) {
        if ($rootScope.currentUser) {
            FormService.findAllFormsForUser($rootScope.currentUser._id, function (data) {
                $scope.formsForCurrentUser = data;
            });
        }

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(selectedForm){
            FormService.createFormForUser($rootScope.currentUser._id, selectedForm, function(newForm){

                FormService.findAllFormsForUser($rootScope.currentUser._id, function (data) {
                    $scope.formsForCurrentUser = data;
                });
            });
        }

        function updateForm(selectedForm){
            console.log("updating " + selectedForm.title + "[" + selectedForm._id + "]" + " user " + selectedForm.userid);

            FormService.updateFormById(selectedForm._id, selectedForm, function(updatedForm) {

                FormService.findAllFormsForUser($rootScope.currentUser._id, function(data){
                    $scope.formsForCurrentUser = data;
                });
            });
        }

        function deleteForm(index){
            console.log("in delete form");
            FormService.deleteFormById($scope.formsForCurrentUser[index]._id, function(updatedListOfForms){

                FormService.findAllFormsForUser($rootScope.currentUser._id, function(data){
                    $scope.formsForCurrentUser = data;
                });
            });

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