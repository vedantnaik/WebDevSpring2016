/**
 * Created by vedant on 3/25/16.
 */

var uuid = require('node-uuid');

module.exports = function(app){

    var userModel = require("./models/user.model.js")();
    var quizModel = require("./models/quiz.model.js")();

    var userService = require("./services/user.service.server.js")(app, userModel);
    var quizService = require("./services/quiz.service.server.js")(app, quizModel, uuid);
};