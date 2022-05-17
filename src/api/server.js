// app.js
const express = require('express');

//mysql
const mysql = require('mysql');

//allows to interpret as json
const bodyParser = require("body-parser"); 

//cors
const cors = require('cors')

//create connection
const connection = mysql.createConnection({
    host: "us-cdbr-east-05.cleardb.net",
    user: "b4129b27e9a1e2",
    password: "87009bd8",
    database: "heroku_45ea15f427c56e8"
});

// Create Express app
const exp = express()

exp.use(bodyParser.urlencoded(true))
exp.use(bodyParser.json())
exp.use(bodyParser.raw())

// questions to display on homepage //uncomment when we have actual questions in the db
/*exp.get('/questions', (req, res) => {
    connection.query("select * from tbl_question", function (err, result, fields) {
        if(result.length > 0){
            res.send({
                result: result,
                status: "true"
        });
        } else{
            res.send({status:"false"})
        }
    });
})*/

// A test route for login
exp.post('/login', (req, res) => {
    connection.query("select * from register_user where Username = ? and UserPassword = ?", [req.body.username,req.body.password],  function (err, result, fields) {
        if(result){
            res.send({status: "true"});
        } else{
            res.send({status:"false"})
        }
    });
})

//login with hashed password
/*exp.post('/login', (req, res) => {
    connection.query("select UserPassword from register_user where Username = ?", [req.body.username],  function (err, results, fields) {
        const [hashLogin] = results[0];
        const isValid = bcrypt.compareSync(req.body.password, hashLogin);
        if(isValid){
            res.send({status: "true"});
            //res.end();
        } else{
            res.send({status:"false"})
        }
    });
})*/

//registration
const { Prohairesis } = require("prohairesis"); //for mysql
const mySQLstring = 'mysql://b4129b27e9a1e2:87009bd8@us-cdbr-east-05.cleardb.net/heroku_45ea15f427c56e8?reconnect=true';
const database = new Prohairesis(mySQLstring);
//exp.use(express.static('public'));
const bcrypt = require('bcrypt');

//insert new user into table
exp.post('/register', (req, res) => {
    connection.query("select * from register_user where Username = ?", [req.body.USERNAME],  function (err, result, fields) {
        if(result){
            res.send({status: "fail"}); //username already exists
        } else {
            //hash password
            const hashedPassword = bcrypt.hashSync(req.body.PASSWORD, bcrypt.genSaltSync());

            database.execute(
            'INSERT INTO register_user (Username, Email, UserPassword) VALUES (@USERNAME, @EMAIL, @PASSWORD)',
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