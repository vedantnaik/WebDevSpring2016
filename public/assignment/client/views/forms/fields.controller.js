/**
 * Created by vedant on 2/21/16.
 */

(function() {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, $scope, FieldService){

        $scope.addField = addField;
        $scope.createField = createField;
        $scope.removeField = removeField;
        $scope.editField = editField;

        function init(){
            console.log("find forms for user");
            console.log($routeParams.formId);

            FieldService
                .getFieldsForForm($routeParams.formId)
                .then(
                    function( res ){
                        $scope.fields = res.data;
                    },
                    function( err ){
                        console.log("ERROR IN FIELD CONTROLLER INIT");
                    }
                );
        }

        init();


        function editField(field){
            $scope.field = field;
            var fieldOptions = [];
            for (var optionIndex in $scope.field.options){
                var str = $scope.field.options[optionIndex].label + ":" + $scope.field.options[optionIndex].value + "\n";
                fieldOptions.push(str);
            }
            $scope.field.fieldOptions = fieldOptions;
        }

        function removeField(field){
            FieldService
                .deleteFieldFromForm($routeParams.formId, field._id)
                .then(
                    function( res ){
                        $scope.fields = res.data;
                    },
                    function( err ){

                    }
                );
        }


        function addField(type){
            if (type == "singlelinetext"){
                $scope.field = {
                    label: "New Text Field",
                    type : "TEXT",
                    placeholder : "New Field"
                }
            }
            else if (type == "paragraphtextfield"){
                $scope.field = {
                    label: "New Text Field",
                    type : "TEXTAREA",
                    placeholder : "New Field"
                }
            }
            else if (type == "date"){
                $scope.field = {
                    label: "New Date Field",
                    type : "DATE"
                }
            }
            else if (type == "dropdown"){
                $scope.field = {
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
                $scope.field = {
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
                $scope.field = {
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
                .createFieldForForm($routeParams.formId, $scope.field)
                .then(
                    function(response){
                        $scope.fields = response.data;
                    },
                    function( err ){

                    }
                );
        }


        function createField(field){
            console.log(field);
            FieldService
                .createFieldForForm($routeParams.formId, $scope.field)
                .then(
                    function(response){

                    },
                    function( err ){

                    }
                );
        }
    }
})();