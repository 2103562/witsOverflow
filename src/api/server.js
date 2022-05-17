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


// User login route
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

// Start the Express server
exp.listen(4000, () => console.log('Server running on port 4000!'))