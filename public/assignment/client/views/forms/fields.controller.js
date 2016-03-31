/**
 * Created by vedant on 2/21/16.
 */

(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, $scope, FieldService){

        var vm = this;

        vm.addField = addField;
        vm.createField = createField;
        vm.removeField = removeField;
        vm.editField = editField;

        vm.setEditField = setEditField;

        function setEditField(field){
            vm.editHuh = true;
            vm.oldField = field;

            vm.field = field;
            var fieldOptions = [];
            for (var option in vm.field.options){
                var str = vm.field.options[option].label + ":" + vm.field.options[option].value + "\n";
                fieldOptions.push(str);
            }
            vm.field.fieldOptions = fieldOptions;
        }

        function init(){

            FieldService
                .getFieldsForForm($routeParams.formId)
                .then(
                    function( res ){
                        vm.fields = res.data;
                    },
                    function( err ){
                        console.log("ERROR IN FIELD CONTROLLER INIT");
                    }
                );
        }

        init();


        function editField(field){

            var formId = $routeParams.formId;
            var fieldId = field._id;
            FieldService
                .updateField(formId, fieldId, field)
                .then(
                    function( res ){
                        init();
                    },
                    function( err ){
                        console.log("ERROR IN FIELD UPDATE");
                    }
                );

        }

        function removeField(field){

            FieldService
                .deleteFieldFromForm($routeParams.formId, field._id)
                .then(
                    function( res ){
                        init();
                    },
                    function( err ){
                        console.log("UNABLE TO REMOVE FIELD");
                    }
                );
        }


        function addField(type){
            if (type == "singlelinetext"){
                vm.field = {
                    label: "New Text Field",
                    type : "TEXT",
                    placeholder : "New Field"
                }
            }
            else if (type == "paragraphtextfield"){
                vm.field = {
                    label: "New Text Field",
                    type : "TEXTAREA",
                    placeholder : "New Field"
                }
            }
            else if (type == "date"){
                vm.field = {
                    label: "New Date Field",
                    type : "DATE"
                }
            }
            else if (type == "dropdown"){
                vm.field = {
                    label: "New Dropdown",
                    type : "OPTIONS",
                    options : [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                }
            }
            else if (type == "checkboxes"){
                vm.field = {
                    label: "New Checkboxes",
                    type : "CHECKBOXES",
                    options : [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                }
            }
            else if (type == "radiobuttons"){
                vm.field = {
                    label: "New Radio Buttons",
                    type : "RADIOS",
                    options : [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                }
            }

            FieldService
                .createFieldForForm($routeParams.formId, vm.field)
                .then(
                    function( res ){
                        init();
                    },
                    function( err ){
                        console.log("UNABLE TO CREATE FIELD");
                    }
                );
        }


        function createField(field){

            if (vm.editHuh){
                vm.editHuh = false;
                editField(field);
            } else {

                FieldService
                    .createFieldForForm($routeParams.formId, vm.field)
                    .then(
                        function(response){
                            init();
                        },
                        function( err ){
                            console.log("UNABLE TO CREATE FIELD");
                        }
                    );
            }

        }
    }
})();