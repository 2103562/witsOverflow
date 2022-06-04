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

//insert new user into table (not a moderator)
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

//insert new user into table (moderator)
exp.post('/register1', (req, res) => {
    connection.query("select * from registered_user where Username = ?", [req.body.USERNAME],  function (err, result, fields) {
        if(result.length > 0){
            //username already exists
            res.send({status: "fail"}); 
        } else {
            //hash password
            const hashedPassword = bcrypt.hashSync(req.body.PASSWORD, bcrypt.genSaltSync());

            database.execute(
            'INSERT INTO registered_user (Username, Email, UserPassword, Moderator) VALUES (@USERNAME, @EMAIL, @PASSWORD, @MODERATOR)',
            {
                USERNAME: req.body.USERNAME,
                EMAIL: req.body.EMAIL,
                PASSWORD: hashedPassword,
                MODERATOR: "true",
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
        //check if person is a moderator
        if(results != 0 && isValid && String(results[4]) == "true"){
            res.send({status: "truemod", userId:results[0]['Userid'], username:results[1]});
        } else if (results != 0 && isValid){
            res.send({status: "true", userId:results[0]['Userid'], username:results[1]});
        } else {
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
    connection.query("select * from answers_table2,tbl_comments where answers_table2.questions_id =? and tbl_comments.answer_id = answers_table2.Answerid",[req.body.qid], function (err, result, fields) {
        if(result){
            res.send({result: result, status: "true"});
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
        }
    );
    //question posted successfully
    res.send({status: "true"}); 
})

//answer a question (Answer.vue)
exp.post('/answer', (req, res) => {
    database.execute(
        'INSERT INTO answers_table2 (questions_id, answer, username ) VALUES (@qid, @answer_given, @username )',
        {
            answer_given: req.body.answer_given,
            qid : req.body.qid,
            username: req.body.username,//not getting inserted?
        }
    );
    res.send({status: "pass"}); //answer sent successfully
})

//comment on answer(Answer.vue)
exp.post('/comment', (req, res) => {
    database.execute(
        'INSERT INTO tbl_comments ( answer_id, comment ) VALUES (@answer_id, @comment)',
        {
            answer_id : req.body.answer_id,
            comment: req.body.comment,//not getting inserted?
        }
    );
    res.send({status: "pass"}); //answer sent successfully
})
//display questions asked by the user who is logged in (Account.vue)
exp.post("/account/questions", (req, res) => {
    connection.query(
        "select * from tbl_question where user = ?",
        [req.body.username],
        function (err, result, fields) {
            if (result) {
                res.send({
                result: result,
                status: "true",
            });
            } else {
                res.send({ status: "false" });
            }
        }
    );
});

// get user data for account page (Account.vue)
exp.post("/account/get", (req, res) => {
    connection.query(
      "select * from registered_user where Userid = ?",
      [req.body.userId],
      function (err, result, fields) {
        if (result) {
          res.send({
            result: result,
            status: "true",
          });
        } else {
          res.send({ status: "false" });
        }
      }
    );
});

//update user password (Account.vue)
exp.post("/account/set", (req, res) => {
    database.execute(
        "update registered_user set UserPassword = @PASSWORD where Username = @USERNAME",
        {
            PASSWORD: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync()),
            USERNAME: req.body.username,
        }
    );
    res.send({ status: "true" });
});

//delete user
exp.post('/DeleteAccount', (req, res) => {
    database.execute(
        'DELETE FROM registered_user WHERE Username = @username', 
        {
            username: req.body.username,
        },
    )
    res.send({status: "pass"}); //user deleted
})

//when i click an answer it must take me to a page with just the answer that I clicked (DeleteAnswer.vue)
exp.post('/DisplayAnswerToDelete', (req, res) => {
    connection.query("SELECT * FROM answers_table2 where Answerid = ?",[req.body.questionAnswers], function (err, result, fields) {
        if(result){
            res.send({result: result, status: "true"});
        } else{
            res.send({status:"false"})
        }
    });
})

//moderator can delete an answer (Answer.vue)
exp.post('/DeleteAnswer', (req, res) => {
    database.execute(
        //test if this is gna delete all the answers linked to that question id
        'DELETE FROM answers_table2 WHERE Answerid = @answerid', 
        {
            answerid : req.body.questionAnswers,
        },
    )
    res.send({status: "pass1"}); //specific answer deleted
})

//moderator can delete a question (Answer.vue)
exp.post('/DeleteQuestionAnswers', (req, res) => {
    database.execute(
        'DELETE FROM answers_table2 WHERE questions_id = @qid', 
        {
            qid : req.body.qid,
        },
    )
    res.send({status: "pass"}); //answers removed to the question deleted
})

//moderator can delete a question (Answer.vue)
exp.post('/DeleteQuestion', (req, res) => {
    database.execute(
        'DELETE FROM tbl_question WHERE id = @qid', 
        {
            qid : req.body.qid,
        },
    )
    res.send({status: "pass"}); //question deleted
})

// Start the Express server
exp.listen(4000, () => console.log('Server running on port 4000!'))