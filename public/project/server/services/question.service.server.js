/**
 * Created by vedant on 3/20/16.
 */

var q = require("q");

module.exports = function (app, questionModel, quizModel, factModel, request) {

    app.get("/api/f1explorer/question/:questionId", getQuestionsById);
    app.get("/api/f1explorer/quiz/:quizId/question/", getQuestionsInQuizById);
    app.get("/api/f1explorer/user/:userId/question/", getQuestionsForUserById);

    app.post("/api/f1explorer/question", addQuestion);

    // make questions from stored facts using data from API Calls
    app.post("/api/f1explorer/question/fromDrrFact/:factId/addtoquiz/:quizId", makeDRRQuestionFromFact);
    app.post("/api/f1explorer/question/fromCrrFact/:factId/addtoquiz/:quizId", makeCRRQuestionFromFact);

    app.put("/api/f1explorer/question/:questionId", updateQuestionById);
    app.delete("/api/f1explorer/question/:questionId", deleteQuestionById);

    // for making ergast API calls
    var QUERY_LAST_RESULTS_IN_SEASON = "http://ergast.com/api/f1/SEASON/last/results.json";


    function getQuestionsById(req, res){
        var questionId = req.params.questionId;

        questionModel
            .findQuestionById(questionId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getQuestionsInQuizById(req, res){
        var quizId = req.params.quizId;

        questionModel
            .findQuestionsByQuizId(quizId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function getQuestionsForUserById(req, res){
        var userId = req.params.userId;

        questionModel
            .findQuestionsByUserId(userId)
            .then(
                function(doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function addQuestion(req, res){
        var question = req.body;
        questionModel
            .createQuestion(question)
            .then(
                function( doc ) {
                    res.json(doc);
                },
                function( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function makeDRRQuestionFromFact(req, res){
        var factId = req.params.factId;
        var quizId = req.params.quizId;

        factModel
            .findDriverRaceResultFactById(factId)
            .then(
                function(doc){
                    var factToUseForMakingQuestion = doc;
                    makeDrrQuestion(factToUseForMakingQuestion, quizId)
                        .then(
                            function(doc){
                                console.log("e le");
                                res.json(doc);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                            // this function call will not be rejected
                            // fail safe measuers have been implemented
                        );
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }


    function makeCRRQuestionFromFact(req, res){
        var factId = req.params.factId;
        var quizId = req.params.quizId;

        factModel
            .findConstructorRaceResultFactById(factId)
            .then(
                function(doc){
                    var factToUseForMakingQuestion = doc;
                    makeCrrQuestion(factToUseForMakingQuestion, quizId)
                        .then(
                            function(doc){
                                res.json(doc);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                            // this function call will not be rejected
                            // fail safe measuers have been implemented
                        );
                },
                function(err){
                    res.status(400).send(err);
                }
            );

    }


    function updateQuestionById(req, res){
        var question = req.body;
        var questionId = req.params.questionId;

        questionModel
            .updateUser(questionId, question)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteQuestionById(req, res){
        var questionId = req.params.questionId;

        console.log("DELETE QUESTION SERVICE SERVER " + questionId);

        questionModel
            .deleteQuestion(questionId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    // Helpers

    /*
    * This method takes a DRR and turns it into a question of the form
    * "Who finished at position <finalPosition> in the <season> <raceName>?"
    *
    * Option_A is the correct answer from <driverName> field of the fact
    * Other options are populated from the api
    *
    * Options are shuffled in question model everytime a question is created/updated
    * So players wont get credited always for selecting Option_A :)
    *
    *
    * This method also calls updateAllQuizzesWithNewQuestion which puts this question in the right quiz
    * */
    function makeDrrQuestion(fact, quizId){

        var deferred = q.defer();
        var questionToCreate = {};

        var finishingPosition = fact.finishingPosition;

        var season = fact.season;
        var gpName = fact.raceName;

        var questionStr = "";
        console.log("makingstart " + questionStr);
        if (finishingPosition == '1') {
            questionStr = "Who won the " + season + " " + gpName + "?";
        } else if (finishingPosition == '2') {
            questionStr = "Who finished second on podium in the " + season + " " + gpName + "?";
        } else if (finishingPosition == '3') {
            questionStr = "Who finished third on podium in the " + season + " " + gpName + "?";
        } else {
            questionStr = "Who finished at position " + finishingPosition + " in the " + season + " " + gpName + "?";
        }

        console.log("makingstart " + questionStr);


        questionToCreate.userId = fact.userId; // user who created the question
        questionToCreate.quizId = quizId; // quiz to which this question belongs to

        questionToCreate.questionContent = questionStr; // Text asking the question

        console.log("make call");
        getFourDriversFromYear(season, fact.driverName)
            .then(
                function(fourFakeOptions){

                    // remove answer from options if needed
                    for (var i=fourFakeOptions.length-1; i>=0; i--) {
                        if (fourFakeOptions[i] == fact.driverName) {
                            fourFakeOptions.splice(i, 1);
                            // break;       //<-- Uncomment  if only the first term has to be removed
                        }
                    }

                    questionToCreate.answer = fact.driverName;
                    questionToCreate.option_A = fact.driverName;
                    questionToCreate.option_B = fourFakeOptions[0];
                    questionToCreate.option_C = fourFakeOptions[1];
                    questionToCreate.option_D = fourFakeOptions[2];

                    questionModel
                        .createQuestion(questionToCreate)
                        .then(
                            function( doc ) {

                                updateAllQuizzesWithNewQuestion(questionToCreate.quizId);

                                deferred.resolve(doc);
                            },
                            function( err ) {
                                deferred.reject(err);
                            }
                        );
                },
                function(err){
                    console.log("function does not work");
                    // failed to make fake options due to API call failure
                    var failSafeOptions = ["Micheal Schumacher", "Ayrton Senna", "Niki Lauda", "Sir Stirling Moss"];

                    for (var i=failSafeOptions.length-1; i>=0; i--) {
                        if (failSafeOptions[i] == fact.driverName) {
                            failSafeOptions.splice(i, 1);
                            // break;       //<-- Uncomment  if only the first term has to be removed
                        }
                    }

                    questionToCreate.answer = fact.driverName;
                    questionToCreate.option_A = fact.driverName;
                    questionToCreate.option_B = failSafeOptions[0];
                    questionToCreate.option_C = failSafeOptions[1];
                    questionToCreate.option_D = failSafeOptions[2];

                    questionModel
                        .createQuestion(questionToCreate)
                        .then(
                            function( doc ) {

                                updateAllQuizzesWithNewQuestion(questionToCreate.quizId);

                                deferred.resolve(doc);
                            },
                            function( err ) {
                                deferred.reject(err);
                            }
                        );
                }

            );

        return deferred.promise;
    }


    /*
     * This method takes a CRR and turns it into a question of the form
     * "Which constructor finished at position <finalPosition> in the <season> <raceName>?"
     *
     * Option_A is the correct answer from <constructorName> field of the fact
     * Other options are populated from the api
     *
     * Options are shuffled in question model everytime a question is created/updated
     * So players wont get credited always for selecting Option_A :)
     *
     *
     * This method also calls updateAllQuizzesWithNewQuestion which puts this question in the right quiz
     * */
    function makeCrrQuestion(fact, quizId){

        var deferred = q.defer();
        var questionToCreate = {};

        var finishingPosition = fact.bestFinishingPosition;

        var season = fact.season;
        var gpName = fact.raceName;

        var questionStr = "";
        if (finishingPosition == '1') {
            questionStr = "Which constructor won the " + season + " " + gpName + "?";
        } else if (finishingPosition == '2') {
            questionStr = "Which constructor finished second on podium in the " + season + " " + gpName + "?";
        } else if (finishingPosition == '3') {
            questionStr = "Which constructor finished third on podium in the " + season + " " + gpName + "?";
        } else {
            questionStr = "Which constructor finished at position " + finishingPosition + " in the " + season + " " + gpName + "?";
        }

        questionToCreate.userId = fact.userId; // user who created the question
        questionToCreate.quizId = quizId; // quiz to which this question belongs to

        questionToCreate.questionContent = questionStr; // Text asking the question

        getFourConstructorsFromYear(season, fact.constructorName)
            .then(
                function(fourFakeOptions){

                    // remove answer from options if needed
                    for (var i=fourFakeOptions.length-1; i>=0; i--) {
                        if (fourFakeOptions[i] == fact.constructorName) {
                            fourFakeOptions.splice(i, 1);
                            // break;       //<-- Uncomment  if only the first term has to be removed
                        }
                    }

                    questionToCreate.answer = fact.constructorName;
                    questionToCreate.option_A = fact.constructorName;
                    questionToCreate.option_B = fourFakeOptions[0];
                    questionToCreate.option_C = fourFakeOptions[1];
                    questionToCreate.option_D = fourFakeOptions[2];

                    questionModel
                        .createQuestion(questionToCreate)
                        .then(
                            function( doc ) {

                                updateAllQuizzesWithNewQuestion(questionToCreate.quizId);

                                deferred.resolve(doc);
                            },
                            function( err ) {
                                deferred.reject(err);
                            }
                        );
                },
                function(err){
                    // failed to make fake options due to API call failure
                    var failSafeOptions = ["Ferrari", "McLaren", "Lotus", "Williams"];

                    for (var i=failSafeOptions.length-1; i>=0; i--) {
                        if (failSafeOptions[i] == fact.constructorName) {
                            failSafeOptions.splice(i, 1);
                            // break;       //<-- Uncomment  if only the first term has to be removed
                        }
                    }

                    questionToCreate.answer = fact.constructorName;
                    questionToCreate.option_A = fact.constructorName;
                    questionToCreate.option_B = failSafeOptions[0];
                    questionToCreate.option_C = failSafeOptions[1];
                    questionToCreate.option_D = failSafeOptions[2];

                    questionModel
                        .createQuestion(questionToCreate)
                        .then(
                            function( doc ) {

                                updateAllQuizzesWithNewQuestion(questionToCreate.quizId);

                                deferred.resolve(doc);
                            },
                            function( err ) {
                                deferred.reject(err);
                            }
                        );
                }

            );

        return deferred.promise;
    }


    function getFourDriversFromYear(season){
        var deferred = q.defer();
        request(
            QUERY_LAST_RESULTS_IN_SEASON
                .replace("SEASON", season),
            function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    var info = JSON.parse(body);

                    var fourFakeOptionsList = [];
                    var driverRaceResultsList = info.MRData.RaceTable.Races[0].Results;
                    for (var drresultIndex in driverRaceResultsList){
                        fourFakeOptionsList.push(driverRaceResultsList[drresultIndex].Driver.givenName
                            +  " " + driverRaceResultsList[drresultIndex].Driver.familyName);

                        if(fourFakeOptionsList.length == 4){
                            break;
                        }
                    }
                    deferred.resolve(fourFakeOptionsList);
                } else {
                    deferred.reject();
                }
            }
        );

        return deferred.promise;
    }

    function getFourConstructorsFromYear(season){
        var deferred = q.defer();
        request(
            QUERY_LAST_RESULTS_IN_SEASON
                .replace("SEASON", season),
            function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    var info = JSON.parse(body);

                    var fourFakeOptionsList = [];
                    var constructorRaceResultsList = info.MRData.RaceTable.Races[0].Results;
                    for (var drresultIndex in constructorRaceResultsList){

                        var candidateName = constructorRaceResultsList[drresultIndex].Constructor.name;

                        if(fourFakeOptionsList.indexOf(candidateName) == -1) {
                            fourFakeOptionsList.push(constructorRaceResultsList[drresultIndex].Constructor.name);
                        }

                        if(fourFakeOptionsList.length == 4){
                            break;
                        }
                    }
                    deferred.resolve(fourFakeOptionsList);
                } else {
                    deferred.reject();
                }
            }
        );

        return deferred.promise;
    }

    function updateAllQuizzesWithNewQuestion(quizId){

        quizModel
            .findQuizById(quizId)
            .then(
                function(foundQuiz){
                    questionModel
                        .findQuestionsByQuizId(foundQuiz._id)
                        .then(
                            function(questionsForQuiz){
                                foundQuiz.questions = questionsForQuiz;
                                quizModel
                                    .updateQuizById(foundQuiz._id, foundQuiz);
                            }
                        );
                },
                function(err){
                    console.log("Unable to add newly created question to quiz.");
                }
            );
    }

}