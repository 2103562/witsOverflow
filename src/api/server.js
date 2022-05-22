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

//login with hashed password
exp.post('/login', (req, res) => {
    connection.query("select UserPassword from registered_user where Username = ?", [req.body.username], function (err, results, fields) {
        const isValid = bcrypt.compare(req.body.password, String(results[0]));
        if(isValid){
            res.send({status: "true"});
            //res.end();
        } else{
            res.send({status:"false"})
        }
    });
})
//answer questions
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

// questions to display on homepage
exp.get('/questions', (req, res) => {
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

// questions to display on question page
exp.get('/questions/all', (req, res) => {
    connection.query("select * from tbl_question", function (err, result, fields) {
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



// question asked to display on the answer page

exp.get('/questionAsked', (req, res) => {
    connection.query("SELECT description FROM tbl_question where id = 14",[req.body.question_asked_id_1], function (err, result, fields) {
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


//display All other ANSWERS to the question in the answer page

exp.get('/questionAnswers', (req, res) => {
    connection.query("SELECT *  FROM answers_table where questions_id = 4",[req.body.question_asked_id_1], function (err, result, fields) {
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
            res.send({status: "fail"}); //username already exists
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
            res.send({status: "pass"}); //registration successfull
        }
    });
})


// Start the Express server
exp.listen(4000, () => console.log('Server running on port 4000!'))