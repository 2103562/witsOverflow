// app.js
const express = require('express')

//mysql
const mysql = require('mysql');

//allows to interpret as json
const bodyParser = require("body-parser"); 

//cors
const cors = require('cors');

//create connection
const connection = mysql.createConnection({
    host: "us-cdbr-east-05.cleardb.net",
    user: "b4129b27e9a1e2",
    password: "87009bd8",
    database: "heroku_45ea15f427c56e8"
});

// Create Express app
const exp = express()

exp.use(cors())
exp.use(bodyParser.urlencoded(true))
exp.use(bodyParser.json())
exp.use(bodyParser.raw())

//registration (Signin.vue)
const { Prohairesis } = require("prohairesis"); //for mysql
const mySQLstring = 'mysql://b4129b27e9a1e2:87009bd8@us-cdbr-east-05.cleardb.net/heroku_45ea15f427c56e8?reconnect=true'
const database = new Prohairesis(mySQLstring)
exp.use(express.static('public'))
const bcrypt = require('bcrypt');
const { request } = require('http');

//insert new user into table
exp.post('/register', (req, res) => {
    connection.query("select * from registered_user where Username = ?", [req.body.USERNAME],  function (err, result, fields) {
        if(result.length > 0){
            //username already exists
            res.send({status: "fail"}); 
        } else {
            //hash password
            const hashedPassword = bcrypt.hashSync(req.body.PASSWORD, bcrypt.genSaltSync());

            database.execute(
            'INSERT INTO registered_user (Username, Email, UserPassword) VALUES (@USERNAME, @EMAIL, @PASSWORD)',
            {
                USERNAME: req.body.USERNAME,
                EMAIL: req.body.EMAIL,
                PASSWORD: hashedPassword,
            });
            //registration successfull
            res.send({status: "pass"}); 
        }
    });
})

//login with hashed password (Signin.vue)
exp.post('/login', (req, res) => {
  if(req.body.username != '' && req.body.password != ''){
      connection.query("select * from registered_user where Username = ?", [req.body.username], function (err, results, fields) {   
      const isValid = bcrypt.compare(req.body.password, String(results[3]));
      if(results != 0 && isValid){
          res.send({status: "true", userId:results[0]['Userid']});
      } else{
          res.send({status:"false"})
      }
    });
  }
})

// questions to display on homepage (Home.vue)
exp.get('/questionsHomepage', (req, res) => {
    connection.query("select * from tbl_question limit 3", function (err, result, fields) {
        if(result){
            res.send({
                result: result,
                status: "true"
        });
        } else{
            res.send({status:"false"})
        }
    });
})

//Ask a question (Question.vue) - insert a question into the question table
exp.post('/AskQuestion', (req, res) => {
    database.execute(
        'INSERT INTO tbl_question(description, heading, user, time, tags, votes, answers) VALUES (@description,@heading,@user,current_timestamp(),@tags,0,0)',
        {
            description: req.body.description,
            heading: req.body.heading,
            tags: req.body.tags,
            user : req.body.user,
        });
        //question posted successfully
        res.send({status: "true"}); 
})

// questions to display on question page (QuestionsTable.vue)
exp.get('/questions/all', (req, res) => {
    connection.query("select * from tbl_question", function (err, result, fields) {
        if(result){
            res.send({ result: result, status: "true" });
        } else{
            res.send({status:"false"})
        }
    });
})

/*//answer a question (Answer.vue)
exp.post('/answer', (req, res) => {
    connection.query("select * from answers_table where answer = ? and question = ?", [req.body.answer_given],  function (err, result, fields) {
        if(1 == 1){
            database.execute(
            'INSERT INTO answers_table (answer,questions_id) VALUES (@answer_given, 4)',
            {
                answer_given: req.body.answer_given,
            });
            res.send({status: "pass"}); //answer sent successfully
        }
    });
})

// question asked to display on the answer page (Answer.vue)
exp.get('/questionAsked', (req, res) => {
    connection.query("SELECT description FROM tbl_question where id = 14",[req.body.question_asked_id_1], function (err, result, fields) {
        if(result){
            res.send({result: result, status: "true"});
        } else{
            res.send({status:"false"})
        }
    });
})

//display All other ANSWERS to the question in the answer page (Answer.vue)
exp.get('/questionAnswers', (req, res) => {
    connection.query("SELECT *  FROM answers_table where questions_id = 4",[req.body.question_asked_id_1], function (err, result, fields) {
        if(result){
            res.send({result: result, status: "true"});
        } else{
            res.send({status:"false"})
        }
    });
})*/




//question asked to display on the answer page (Answer.vue)
//when clicking on a question, the question description must be displayed on the answer page
exp.post('/questionAsked', (req, res) => {
    connection.query("SELECT description FROM tbl_question where id = ?",[req.body.qid], function (err, result, fields) {
        if(result){
            res.send({result: result, status: "true"});
        } else{
            res.send({status:"false"})
        }
    });
})

//display All other ANSWERS to the question in the answer page (Answer.vue)
//when clicking on a question, all the answers to that question must be displayed on the answer page
exp.post('/questionAnswers', (req, res) => {
    connection.query("SELECT * FROM answers_table where questions_id = ?",[req.body.qid], function (err, result, fields) {
        if(result){
            res.send({result: result, status: "true"});
        } else{
            res.send({status:"false"})
        }
    });
})




//answer a question (Answer.vue)
exp.post('/answer', (req, res) => {
    /*connection.query("select * from answers_table where answer = ? and question = ?", [req.body.answer_given],  function (err, result, fields) {
        if(1 == 1){*/
            database.execute(
            'INSERT INTO answers_table (answer,questions_id) VALUES (@answer_given, @qid)',
            {
                answer_given: req.body.answer_given,
                qid : req.body.qid,
            });
            res.send({status: "pass"}); //answer sent successfully
        //}
    //});
})






// Start the Express server
exp.listen(4000, () => console.log('Server running on port 4000!'))