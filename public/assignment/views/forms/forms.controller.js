/**
 * Created by vedant on 2/21/16.
 */

(function () {

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope, $location) {
        $rootScope.formsForCurrentUser = FormService.findAllFormsForUser($rootScope.currentUser._id, FormService.doNothing);

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function addForm(form){
            FormService.createFormForUser($rootScope.currentUser._id, form, FormService.doNothing);
        }

        function updateForm(){
            console.log("in update form");
        }

        function deleteForm(){
            console.log("in delete form");
        }


        function selectForm(){
            console.log("in select form");
        }


    }

})();