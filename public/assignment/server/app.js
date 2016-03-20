/**
 * Created by vedant on 3/17/16.
 */

var uuid = require('node-uuid');

module.exports = function(app){

    var userModel = require("./models/user.model.js")();
    var formModel = require("./models/form.model.js")();
    var fieldModel = require("./models/field.model.js") (uuid, formModel);


    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/form.service.server.js")(app, formModel, uuid);
    var fieldService = require("./services/field.service.server.js")(app, formModel, fieldModel);

};