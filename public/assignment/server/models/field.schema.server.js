/**
 * Created by vedant on 3/30/16.
 */

module.exports = function (mongoose) {
    var FieldSchema = mongoose.Schema({
        label: "String",
        type: {
            type: "String",
            enum: ["TEXT", "TEXTAREA", "EMAIL", "PASSWORD", "OPTIONS", "DATE", "RADIOS", "CHECKBOXES"],
            default : "TEXT"
        },
        placeholder: "String",
        options: [
            {
                label: "String",
                value: "String"
            }
        ]
    }, {collection: 'assignment.field'});
    return FieldSchema;
};