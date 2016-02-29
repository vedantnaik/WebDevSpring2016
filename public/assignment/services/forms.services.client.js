/**
 * Created by vedant on 2/29/16.
 */

(function (){

    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService(){

        var model = {

            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo",     "userId": 123},
                {"_id": "020", "title": "CDs",      "userId": 234},
            ],
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }

        function createFormForUser(userId, form, callback){
            form['_id'] = (new Date).getTime();
            form['userId'] = userId;
            model.forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback){
            var foundForms = [];
            for(var formIndex in model.forms){
                if(model.forms[formIndex].userId === userId){
                    foundForms.push(model.forms[formIndex]);
                }
            }
            callback(foundForms);
        }

        function deleteFormById(formId, callback){
            for(var formIndex in model.forms){
                if(model.forms[formIndex]._id === formId){
                    callback(model.forms.splice(formIndex, 1));
                }
            }
        }

        function updateFormById(formId, newForm, callback){

            for (var formIndex in model.forms) {
                if(model.forms[formIndex]._id === formId){
                    model.forms[formIndex]._id = newForm._id;

                    if(model.forms[formIndex].title != newForm.title && newForm.title != "") {
                        model.forms[formIndex].title = newForm.title;
                    }

                    if(model.forms[formIndex].userId != newForm.userId && newForm.userId != "") {
                        model.forms[formIndex].userId = newForm.userId;
                    }

                    callback(model.users[formIndex]);
                }
            }

        }

    }

})();