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
  if(req.body.username != '' && req.body.password != ''){
      connection.query("select * from registered_user where Username = ?", [req.body.username], function (err, results, fields) {   
      const isValid = bcrypt.compare(req.body.password, String(results[3]));
      if(results != 0 && isValid){
          res.send({status: "true", userId:results[0]['Userid']});
          //res.end();
      } else{
          res.send({status:"false"})
      }
    });
  }
})

// questions to display on homepage
exp.get('/questions', (req, res) => {
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

//insert a question into the question table
exp.post('/register', (req, res) => {
    connection.query("select * from tbl_questions where heading = ?", [req.body.HEADING],  function (err, result, fields) {
        if(result.length > 0){
            res.send({status: "fail"}); //heading already exists
        } else {
            database.execute(
            'INSERT INTO tbl_question(description, heading, user, time, tags, votes, answers) VALUES (@DESCRIPTION,@HEADING,current_user(),current_timestamp(),@TAGS,0,0)',
            {
                DESCRIPTION: req.body.DESCRIPTION,
                HEADING: req.body.HEADING,
                TAGS: req.body.TAGS,
            });
            res.send({status: "pass"}); //question posted successfull
        }
    });
})


// Start the Express server
exp.listen(4000, () => console.log('Server running on port 4000!'))