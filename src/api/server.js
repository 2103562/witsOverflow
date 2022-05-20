// app.js
const express = require("express");

//mysql
const mysql = require("mysql");

//allows to interpret as json
const bodyParser = require("body-parser");

//cors
const cors = require("cors");

//create connection
const connection = mysql.createConnection({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b4129b27e9a1e2",
  password: "87009bd8",
  database: "heroku_45ea15f427c56e8",
});

// Create Express app
const exp = express();

exp.use(cors());

exp.use(bodyParser.urlencoded(true));
exp.use(bodyParser.json());
exp.use(bodyParser.raw());

//login with hashed password
exp.post("/login", (req, res) => {
  if (req.body.username != "" && req.body.password != "") {
    connection.query("select UserPassword from registered_user where Username = ?", [req.body.username], function (err, results, fields) {
      const isValid = bcrypt.compare(req.body.password, String(results[0]));
      if (results != 0 && isValid) {
        res.send({ status: "true" });
        //res.end();
      } else {
        res.send({ status: "false" });
      }
    });
  }
});

// questions to display on homepage
exp.get("/questions", (req, res) => {
  connection.query(
    "select * from tbl_question",
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

// get user data for account page 
exp.post("/account/get", (req, res) => {
  connection.query("select * from registered_user where Username = ?",[req.body.dname],
    function (err, result, fields) {
      if (result != 0) {
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

//update password using account page //Zahraah
exp.post("/updatepassword", (req, res) => {
  if(req.body.password != "" && req.body.confirm != "" && req.body.password == req.body.confirm){
    connection.query("select UserPassword from registered_user where Username = ?", [req.body.dname], 
    function (err, results, fields) {
      //compare new password with old password to check if they are different
      const isValid = bcrypt.compare(req.body.password, String(results[0]));
      if (results != 0 && !isValid) {
        //hash password
        const hashedPassword1 = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());
        connection.query("UPDATE registered_user SET UserPassword = ? WHERE Username = ?", 
        [hashedPassword1 , req.body.dname], function (err, results, fields) {
          res.send({ status: "true" });
        });
      } else {
        //user clicks save but they haven't changed thier password
        res.send({ status: "false" });
      }
    });
  }
});

//registration
const { Prohairesis } = require("prohairesis"); //for mysql
const mySQLstring =
  "mysql://b4129b27e9a1e2:87009bd8@us-cdbr-east-05.cleardb.net/heroku_45ea15f427c56e8?reconnect=true";
const database = new Prohairesis(mySQLstring);
exp.use(express.static("public"));
const bcrypt = require("bcrypt");
const { request } = require("http");

//insert new user into table 
exp.post("/register", (req, res) => {
  connection.query("select * from registered_user where Username = ?", [req.body.USERNAME], function (err, result, fields) {
      if (result.length > 0) {
        res.send({ status: "fail" }); //username already exists
      } else {
        //hash password
        const hashedPassword = bcrypt.hashSync(
          req.body.PASSWORD,
          bcrypt.genSaltSync()
        );

        database.execute(
          "INSERT INTO registered_user (Username, Email, UserPassword) VALUES (@USERNAME, @EMAIL, @PASSWORD)",
          {
            USERNAME: req.body.USERNAME,
            EMAIL: req.body.EMAIL,
            PASSWORD: hashedPassword,
          }
        );
        res.send({ status: "pass" }); //registration successfull
      }
    }
  );
});

// set user details 2 //Shahil
/*exp.post("/account/set2", (req, res) => {
  connection.query(
    "select * from register_user where Username = ? and UserPassword = ?",
    [req.body.username, req.body.password],
    function (err, result, fields) {
      if (result) {
        //res.send({ status: "true" });
        database.execute(
          "update table registered_user set UserPassword = @PASSWORD where Userid = @USERID",
          {
            PASSWORD: req.body.PASSWORD,
            USERID: req.body.USERID,
          }
        );
      } else {
        res.send({ status: "false" });
      }
    }
  );
});*/

/*exp.post("/account/set", (req, res) => { //Shahil
  connection.query(
    "select * from registered_user where Userid=?",
    [req.body.userId],
    function (err, result, fields) {
      if (result) {
        database.execute(
          "update table registered_user set Username = @USERNAME,UserPassword = @PASSWORD where Userid = @USERID",
          {
            USERNAME: req.body.USERNAME,
            PASSWORD: req.body.PASSWORD,
            USERID: req.body.USERID,
          }
        );
        res.send({ status: "details updated" });
      } else {
        res.send({ status: "update failed" });
      }
    }
  );
});*/

// Start the Express server
exp.listen(4000, () => console.log("Server running on port 4000!"));
