/**
 * Created by vedant on 2/21/16.
 */

(function () {

    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, UserService, $scope, $rootScope, $location) {

        var vm = this;

        vm.location = $location;

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.formFields = formFields;

        function setCurrentUserForms(){

            UserService.getCurrentUser()
                .then(
                    function( res ){
                        vm.user = res.data;
                        FormService.findAllFormsForUser(vm.user._id)
                            .then(
                                function ( res  ){
                                    if (res.data) {
                                        vm.formsForCurrentUser = res.data;
                                        console.log(vm.formsForCurrentUser);
                                    }
                                },
                                function ( err ) {
                                    alert("Unable to find user's forms!");
                                }
                            );
                    }
                );
        }

        setCurrentUserForms();

        // scope functions

        function addForm(selectedForm){

            if(selectedForm){
                FormService
                    .createFormForUser(vm.user._id, selectedForm)
                    .then(
                        function( res ){
                            setCurrentUserForms();
                        },
                        function( err ){
                            alert("Unable to add form!");
                        }
                    );
            }

        }

        function updateForm(selectedForm){

            FormService
                .updateFormById(selectedForm._id, selectedForm)
                .then(
                    function( res ){
                        setCurrentUserForms();
                    },
                    function ( err ) {
                        alert("Unable to update form!");
                    }
                );



            //FormService.updateFormById(selectedForm._id, selectedForm, function(updatedForm) {
            //
            //    FormService.findAllFormsForUser($rootScope.currentUser._id, function(data){
            //        $scope.formsForCurrentUser = data;
            //    });
            //});
        }

        function deleteForm(index){
            console.log("in delete form");
            console.log(vm.formsForCurrentUser[index]._id);

            FormService.deleteFormById(vm.formsForCurrentUser[index]._id)
                .then(
                    function ( res ) {
                        setCurrentUserForms();
                    },
                    function ( err ) {
                        alert("Unable to delete form!");
                    }
                );
        }

        function selectForm(index){

            vm.selectedFormIndex = index;
            vm.selectedForm = {};
            vm.selectedForm.title = vm.formsForCurrentUser[index].title;
            vm.selectedForm._id = vm.formsForCurrentUser[index]._id;
            vm.selectedForm.userId = vm.user._id;

            console.log("selected " + vm.selectedForm.title + " user " + vm.selectedForm.userid);
        }

        function formFields(form){
            $location.url("/form/" + form._id + "/fields");
        }



    }

})();