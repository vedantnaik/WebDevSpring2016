/**
 * Created by vedant on 3/25/16.
 */

var uuid = require('node-uuid');
var request = require('request');

module.exports = function(app, db, mongoose){

    var userModel = require("./models/user.model.js")(db, mongoose);
    var quizModel = require("./models/quiz.model.js")();
    var questionModel = require("./models/question.model.js")(db, mongoose);
    var factModel = require("./models/fact.model.js")(db, mongoose);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var quizService = require("./services/quiz.service.server.js")(app, quizModel, uuid);
    var questionService = require("./services/question.service.server.js")(app, quizModel, questionModel, uuid);
    var factService = require("./services/fact.service.server.js")(app, factModel, uuid);

    var ergastService = require("./services/ergast.api.server.js")(app, request);
};