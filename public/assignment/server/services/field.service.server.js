/**
 * Created by vedant on 3/20/16.
 */

module.exports = function (app, formMode, fieldModel) {

    app.get("/api/assignment/form/:formId/field", getFieldsForFormIdById);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByIdInFormById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByIdInFormById);
    app.post("/api/assignment/form/:formId/field", addFieldInFormById);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByIdInFormById);


    function getFieldsForFormIdById (res, req) {

    }

    function getFieldByIdInFormById (res, req) {

    }

    function deleteFieldByIdInFormById (res, req) {

    }

    function addFieldInFormById (res, req) {

    }

    function updateFieldByIdInFormById(res, req) {

    }


}