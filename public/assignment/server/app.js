/**
 * Created by vedant on 3/17/16.
 */

module.exports = function(app){
    var model = require("./models/user.model.js");

    var service = require("./services/user.service.server.js")(app, model);
};