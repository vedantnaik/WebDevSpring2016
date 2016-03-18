/**
 * Created by vedant on 3/17/16.
 */
var forms = require("./form.mock.json");

module.exports = function(){

    var api = {
        createForm: createForm,
        updateFormById: updateFormById,
        deleteFormById: deleteFormById,
        findAllForms: findAllForms,
        findAllFormsForUser: findAllFormsForUser,
        findFormByTitle: findFormByTitle,
        findFormById: findFormById
    };

    return api;

    function createForm(form){
        forms.push(form);
        //callback(form);
        return forms;
    }

    function updateFormById(formId, newForm){

        for (var formIndex in forms) {
            if (forms[formIndex]._id === formId){

                console.log(forms[formIndex].userId);

                console.log("updated record  " + forms[formIndex].title + "[" + forms[formIndex]._id + "]" + " user " + forms[formIndex].userId);

                forms[formIndex]._id = newForm._id;

                if(forms[formIndex].title != newForm.title && newForm.title != "") {
                    forms[formIndex].title = newForm.title;
                }

                if(forms[formIndex].userId != newForm.userId && newForm.userId != "") {
                    forms[formIndex].userId = newForm.userId;
                }

                console.log("updated to  " + forms[formIndex].title + "[" + forms[formIndex]._id + "]" + " user " + forms[formIndex].userId);
                console.log("updated using  " + newForm.title + "[" + newForm._id + "]" + " user " + newForm.userId);

                //callback(forms[formIndex]);
                return forms[formIndex];
            }
        }

        return null;
    }

    function deleteFormById(formId){
        for (var formIndex in forms){
            if (forms[formIndex]._id === formId){
                forms.splice(formIndex, 1)
                //callback(forms.splice(formIndex, 1));
            }
        }
    }

    function findAllForms() {
        return forms;
    }

    function findAllFormsForUser(userId){
        var formsForUser = [];

        for (var formIndex in forms){
            if (forms[formIndex].userId === userId){
                formsForUser.push(forms[formIndex]);
            }
        }

        return formsForUser;
    }

    function findFormByTitle(formTitle){

        for (var formIndex in forms){
            if (forms[formIndex].title === formTitle){
                return forms[formIndex];
            }
        }

        return null;
    }

    function findFormById(formId){

        for (var formIndex in forms){
            if (forms[formIndex]._id === formId){
                return forms[formIndex];
            }
        }

        return null;
    }


};