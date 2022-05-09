// app.js
const express = require('express')

//mysql
const mysql = require('mysql');

//allows to interpret as json
const bodyParser = require("body-parser"); 

//cors
const cors = require('cors')

//create connection
const connection = mysql.createConnection({
    host: "eu-cdbr-west-02.cleardb.net",
    user: "b485d7053c318c",
    password: "8dcd5143",
    database: "heroku_9c5fd54c0bf4617"
});

// Create Express app
const exp = express()


exp.use(cors())

exp.use(bodyParser.urlencoded(true))
exp.use(bodyParser.json())
exp.use(bodyParser.raw())


// A test route
exp.post('/login', (req, res) => {
        connection.query("select * from register_user where Username = ? and UserPassword = ?", [req.body.username,req.body.password],  function (err, result, fields) {
            if(result){
                res.send({status: "true"});
            } else{
                res.send({status:"false"})
            }
        });
})

// questions
exp.get('/questions', (req, res) => {
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
})

// Start the Express server
exp.listen(4000, () => console.log('Server running on port 4000!'))