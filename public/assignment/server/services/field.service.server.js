/**
 * Created by vedant on 3/20/16.
 */

module.exports = function (app, formModel, fieldModel) {

    app.get("/api/assignment/form/:formId/field", getFieldsForFormIdById);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldByIdInFormById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByIdInFormById);
    app.post("/api/assignment/form/:formId/field", addFieldInFormById);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldByIdInFormById);


    function getFieldsForFormIdById (req, res) {
        //console.log(req.params);
        var formId = req.params.formId;
        res.json(fieldModel.findFieldsByFormId(formId));
    }

    function getFieldByIdInFormById (req, res) {
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        res.json(fieldModel.findFieldInForm(formId,fieldId));
    }

    function deleteFieldByIdInFormById (req, res) {
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        fieldModel.deleteFieldInForm(formId, fieldId);
        res.send(200);
    }

    function addFieldInFormById (req, res) {
        var formId = req.params.formId;
        var field = req.body;
        res.json(fieldModel.createFieldInForm(formId, field));
    }

    function updateFieldByIdInFormById(req, res) {
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        var fieldToUpdate = req.body;
        res.json(fieldModel.updateFieldInForm(formId, fieldId, fieldToUpdate))
    }


}